#!/usr/bin/env xcrun swift -target x86_64-apple-macosx10.10 -F Carthage/Build/Mac

import Foundation
import SWXMLHash
import ReactiveSwift
import Rainbow
import enum Result.NoError



// MARK: -  URL Operator

infix operator ++ : AdditionPrecedence

func ++ (left: URL, right: String) -> URL {
    return left.appendingPathComponent(right)
}

// MARK: - String Extension

extension String{
    var entireRange: NSRange {
        return NSRange(location: 0, length: utf16.count)
    }
    var cleared: String{
        return self.trimmingCharacters(in: CharacterSet.whitespacesAndNewlines)
    }
    func substring(from: Int) -> String{
        return (self as NSString).substring(from: from)
    }
}



// MARK: - Log

func logVerbose(_ message: String) -> Void{
    print(message);
}
func logInfo(_ message: String) -> Void{
    print(message.lightCyan);
}
func logWarning(_ message: String) -> Void{
    print(message.lightRed);
}

func logError(_ message: String) -> Void{
    print(message.red);
}

// MARK: - Regex

struct Regex{
    let regularExpression: NSRegularExpression
    
    init(string pattern: String, options: NSRegularExpression.Options = []){
        do{
            regularExpression = try NSRegularExpression(pattern: pattern,options: options)
        }catch let e{
            logError(e.localizedDescription)
            fatalError()
        }
    }
    
    func matches(_ string: String) -> [String] {
        let nsString = string as NSString
        let results = regularExpression.matches(in: string, range: string.entireRange)
        return results.map { nsString.substring(with: $0.range)}
    }
    func isMatch(_ string: String) -> Bool {
        return matches(string).count > 0
    }
    func firstMatch(_ string: String) -> NSTextCheckingResult?{
        return regularExpression.firstMatch(in: string, options: [], range: string.entireRange)
    }
}

extension Regex{
    static let numbers = Regex(string: "\\d+")
    static let historyTableLine = Regex(string: "\\|.*\\|.*\\|")
}


// MARK: - History

class History{
    struct Node {
        let build: Int
        let info: String
        let version: Version?
    }
    struct Version {
        let major: Int
        let minor: Int
        let patch: Int
        init(major: Int = 4,minor: Int = 0,patch: Int = 0) {
            self.major = major
            self.minor = minor
            self.patch = patch
        }
        init?(versionString: String){
            var minor = 0,patch = 0
            let vers: [Int] = versionString.components(separatedBy: ".").flatMap{($0 as NSString).integerValue}
            if vers.count > 0 && vers[0] != 4 {
                return nil
            }
            if vers.count > 1{
                minor = vers[1]
            }
            if vers.count > 2 {
                patch = vers[2]
            }
            self.major = 4
            self.minor = minor
            self.patch = patch
        }
        func presentation() -> String{
            return "\(major).\(minor).\(patch)"
        }
    }
    var build = -1
    var nodes = [Node]()
    var version: Version?
    var available: Bool{
        get{
            return nodes.count > 0
        }
    }
    var lastUpdate = ""
}



extension History{
    
    func add(node: Node,override: Bool = false){
        if let exist = Array(0..<nodes.count).filter({nodes[$0].build == node.build}).first{
            if override{
                nodes.remove(at: exist)
            }else{
                return
            }
        }
        nodes.append(node);
    }
    func update(withInfoXml xml: XMLIndexer) {
        let xml = xml["uexplugins"]["plugin"]
        guard
            let versionAttr = xml.element?.attribute(by: "version"),
            let uexName = xml.element?.attribute(by: "uexName")?.text,
            let xmlVersion = Version(versionString: versionAttr.text),
            let buildAttr = xml.element?.attribute(by: "build"),
            let xmlBuild = Int(buildAttr.text),
            let info: String = try? xml["info"].value()
            else{
                return
        }
        
        
        nodes = nodes.filter{$0.build <= xmlBuild}
        if build >= xmlBuild {
            return
        }
        build = xmlBuild
        version = xmlVersion
        if xmlVersion.major < 4 {
            logWarning("\(uexName): legacy version xml!")
        }
        
        var nodeStrings = [info.cleared]
        if let buildStrings: [String] = try? xml["build"].value() {
            nodeStrings = nodeStrings + buildStrings.map{$0.cleared}
        }
        var currentBuild = build
        var currentPatch = xmlVersion.patch
        
        for nodeString in nodeStrings{
            var nodeString = nodeString
            if
                let nodeBuildMatch = Regex.numbers.firstMatch(nodeString),
                nodeBuildMatch.range.location == 0,
                nodeBuildMatch.range.length > 0,
                let nodeBuild = Int((nodeString as NSString).substring(with: nodeBuildMatch.range))
            {
                currentBuild = nodeBuild
                nodeString = nodeString.substring(from: nodeBuildMatch.range.length).cleared
                if [",",":",".",";"].filter({nodeString.hasPrefix($0)}).count > 0{
                    nodeString = nodeString.substring(from: 1).cleared
                }
            }
            let version = (currentPatch >= 0) ? Version(major: xmlVersion.major, minor: xmlVersion.minor, patch: currentPatch) : nil
            add(node: Node(build: currentBuild, info: nodeString, version: version), override: false)
            currentBuild -= 1
            currentPatch -= 1
        }
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
        lastUpdate = dateFormatter.string(from: Date())
    }
    
    
    func update(withMarkdownSource source: [String]){
        
        for line in source{
            if line.contains("最近更新时间"){
                let numbers = Regex.numbers.matches(line)
                if numbers.count > 2 {
                    lastUpdate = "\(numbers[0])-\(numbers[1])-\(numbers[2])"
                }
                break;
            }
        }
        
        
        var tableLines = source.filter{Regex.historyTableLine.isMatch($0)}
        guard tableLines.count > 2 else {
            return
        }
        tableLines = Array(tableLines[2..<tableLines.count])
        var build = 0
        for line in tableLines.reversed(){
            let strings = line.components(separatedBy: "|").map{$0.cleared}.filter{$0.utf16.count > 0}
            if strings.count < 2{
                continue
            }
            add(node: Node(build: build, info: strings[1], version: Version(versionString: strings[0])))
            build += 1
        }
        version = nodes.sorted{$0.build > $1.build}.flatMap{$0.version}.first
        
    }
    
    
    func presentaion(withUexName uexName: String,platform: String) -> [String]{
        guard available else{
            logWarning("\(uexName)-\(platform): unavailable!")
            return ["**暂不支持!**"]
        }
        var lines = [String]()
        lines.append("API版本: `\(uexName)-\(version?.presentation() ?? "unkonwn")`")
        lines.append("")
        lines.append("最近更新时间:`\(lastUpdate)`")
        lines.append("")
        lines.append("| 历史发布版本 | 更新内容 |")
        lines.append("| ----- | ----- |")
        var unknownVersionExist = false
        for node in nodes.sorted(by: {$0.build > $1.build}){
            let versionString: String
            if let version = node.version{
                versionString = version.presentation()
            }else{
                versionString = "unknown"
                unknownVersionExist = true
            }
            lines.append("| \(versionString) | \(node.info) |")
        }
        if unknownVersionExist{
            logWarning("\(uexName)-\(platform): unknown version!")
        }
        return lines
    }
}



// MARK: - Plugin


class Plugin{
    
    static let blacklist = ["uexDataAnalysis","uexMMS","uexNBListView","uexESurfingRtc","uexCamera360","uexTent","uexAreaPickerView","uexBrokenLine","uexCityListView","uexHexagonal","uexPathArcMenu","uexPie","uexPieChart","uexSideMenu","uexPopTipsView","uexTimeMachine","uexWheel","uexMultiDownloader","uexProgressView"]
    static let gitBaseURL: URL = {
        //script url
        var url = URL(fileURLWithPath: FileManager.default.currentDirectoryPath) ++ CommandLine.arguments.last!
        url.standardize()

        while(url.lastPathComponent != "appcan-docs-v2"){
            var length = url.path.utf16.count
            url.deleteLastPathComponent()
            if (url.path.utf16.count >= length){
                fatalError()
            }
        }
        return url
    }()
    
    enum Category: String{
        case 第三方SDK
        case 界面布局
        case 开发指导
        case 网络通讯
        case 系统功能
        
        static let all: [Category] = {
            return [.第三方SDK, .界面布局, .开发指导, .网络通讯, .系统功能]
        }()
    }
    let name: String
    var category: Category
    var iOSHistory = History()
    var AndroidHistory = History()
    var readmeSource: [String]
    
    
    init?(name: String,category: Category,readmeURL: URL){
        self.name = name
        self.category = category
        guard let string = try? String(contentsOf: readmeURL) else{
            return nil
        }
        readmeSource = string.components(separatedBy: "\n").map{$0.trimmingCharacters(in: CharacterSet.newlines)}
    }
    
    
    
    static let all: [Plugin] = {
        var plugins = [Plugin]()
        let fm = FileManager.default
        for category in Category.all{
            let subURL = gitBaseURL ++ category.rawValue
            guard let names = try? fm.contentsOfDirectory(atPath: subURL.path) else{
                continue
            }
            
            for uexName in names.filter({$0.hasPrefix("uex") && !blacklist.contains($0)}){
                if let plugin = Plugin(name: uexName.substring(from: 3), category: category, readmeURL: subURL ++ uexName ++ "README.md"){
                    plugins.append(plugin)
                }
            }
        }
        
        return plugins
    }()
    
    static func named(_ aName: String) -> Plugin?{
        var name = aName
        if aName.hasPrefix("uex") {
            name = aName.substring(from: 3)
        }
        if aName.hasPrefix("EUEx") {
            name = aName.substring(from: 4)
        }
        return all.filter({$0.name == name}).first
    }
    
    
}

extension Plugin{
    
    var uexName: String{
        get{
            return "uex" + name
        }
    }
    var EUExName: String{
        get{
            return "EUEx" + name
        }
    }
    
    var readmeURL: URL{
        get{
            return Plugin.gitBaseURL ++ category.rawValue ++ uexName ++ "README.md"
        }
    }
    private var historyRange: (startIndex: Int,endIndex: Int)? {
        get{
            var startIndex = readmeSource.count - 1;
            var endIndex = 0
            while startIndex >= 0 {
                let line = readmeSource[startIndex].cleared
                if line.hasPrefix("#") && !line.hasPrefix("##") && line.contains("更新历史"){
                    break
                }
                startIndex -= 1
            }
            if startIndex < 0 {
                return nil
            }
            endIndex = startIndex + 1
            while endIndex < readmeSource.count {
                let line = readmeSource[endIndex].cleared
                if line.hasPrefix("#") && !line.hasPrefix("##"){
                    break
                }
                endIndex += 1
            }
            return (startIndex,endIndex)
        }
    }
    
    
    
    
    
    private func updateHistoryPresentation() -> [String]{
        var lines = [String]()
        lines.append("")
        lines.append("### iOS")
        lines.append("")
        lines += iOSHistory.presentaion(withUexName: uexName,platform: "iOS")
        lines.append("")
        lines.append("### Android")
        lines.append("")
        lines += AndroidHistory.presentaion(withUexName: uexName,platform: "Android")
        lines.append("")
        return lines
    }
    private func saveReadme(){
        var markdown = readmeSource.joined(separator: "\n")
        let tmp = NSMutableString(string: markdown) as CFMutableString
        CFStringTransform(tmp, nil, kCFStringTransformFullwidthHalfwidth, false)
        markdown = tmp as String
        
        do{
            try markdown.write(to: readmeURL, atomically: true, encoding: .utf8)
            logInfo("\(uexName) update done!")
        }catch let error{
            logError(error.localizedDescription)
        }
        
    }
    
    private func updateHistoryFromReadmeSignal()-> SignalProducer<Int,NoError>{
        return SignalProducer<Int,NoError>{observer,_ in
            defer{
                observer.sendCompleted()
            }
            guard let (startIndex,endIndex) = self.historyRange else{
                return;
            }
            var iOSStartIndex = startIndex + 1
            while iOSStartIndex < endIndex {
                let line = self.readmeSource[iOSStartIndex].cleared
                if line.hasPrefix("###") {
                    break
                }
                iOSStartIndex += 1
            }
            if iOSStartIndex >= endIndex{
                return
            }
            var AndroidStartIndex = iOSStartIndex + 1
            while AndroidStartIndex < endIndex {
                let line = self.readmeSource[AndroidStartIndex].cleared
                if line.hasPrefix("###") {
                    break
                }
                AndroidStartIndex += 1
            }
            self.iOSHistory.update(withMarkdownSource: Array(self.readmeSource[iOSStartIndex..<AndroidStartIndex]))
            if AndroidStartIndex < endIndex{
                
                self.AndroidHistory.update(withMarkdownSource: Array(self.readmeSource[AndroidStartIndex..<endIndex]))
            }
        }
    }
    
    private func updateHistoryFromGithubSignal() -> SignalProducer<Int,NoError>{
        let branch = "master"
        let iOSInfoURL = URL(string: "https://raw.githubusercontent.com/ios-plugin")! ++ uexName ++ branch ++ EUExName ++ uexName ++ "info.xml"
        let AndroidInfoURL = URL(string: "https://raw.githubusercontent.com/android-plugin")! ++ uexName ++ branch ++ uexName ++ "info.xml"
        let updateSignal: (History,URL) -> SignalProducer<Int,NoError> = { history,url in
            return SignalProducer<Int,NoError>{ observer,disposable in
                let task = URLSession.shared.dataTask(with: url){ data , _ , e in
                    if let data = data{
                        history.update(withInfoXml: SWXMLHash.parse(data))
                    }else{
                        logWarning("failed to fetch info.xml from url: \(url)")
                    }
                    observer.sendCompleted()
                }
                task.resume()
            }
        }
        
        return SignalProducer<Int,NoError>.merge(
            updateSignal(iOSHistory,iOSInfoURL),
            updateSignal(AndroidHistory,AndroidInfoURL)
        )
        
        
    }
    
    private func rewriteReadmeSignal() -> SignalProducer<Int,NoError>{
        return SignalProducer<Int,NoError>{observer, disposable in
            defer{
                observer.sendCompleted()
            }
            guard let (startIndex,endIndex) = self.historyRange else{
                logError("\(self.uexName): update history not found!")
                return;
            }
            self.readmeSource = Array(self.readmeSource[0...startIndex]) + self.updateHistoryPresentation() + Array(self.readmeSource[endIndex..<(self.readmeSource.count)])
            
        }
    }
    
    func updateHistorySignal() -> SignalProducer<Int,NoError>{
        
        return updateHistoryFromReadmeSignal()
            .then(updateHistoryFromGithubSignal())
            .then(rewriteReadmeSignal())
            .on( completed: {
                self.saveReadme()
            })
    }
}







// MARK: - Main

func main(){
    let sema = DispatchSemaphore(value: 0);
    //let pluginList = [Plugin.named("FileMgr")].flatMap{$0}
    let pluginList = Plugin.all
    let mainSignal = SignalProducer<Int,NoError>.merge(pluginList.map{$0.updateHistorySignal()})
    
    mainSignal
        .start(on: QueueScheduler())
        .on(disposed: {
            sema.signal()
        })
        .start()
    
    
    sema.wait();
    logInfo("Mission Completed!");
}



main()


