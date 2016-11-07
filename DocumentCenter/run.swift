#!/usr/bin/env xcrun swift

import Foundation


typealias MarkDownSource = [String]
typealias MarkDownEditResult = (result: MarkDownSource,hasChanged: Bool)





struct PluginMarkDown {
    struct Constant {
        static let gitPath       = "/Users/appcan_git/dev/appcan_git/appcan-docs-v2/"
        static let pluginType    = ["系统功能","网络通讯","界面布局","功能扩展","第三方SDK","应用引擎"]
        static let ignorePlugins = [String]()
    }
    
    let name: String
    let path: String
    var source: MarkDownSource?{
        get{
            return try? String(contentsOfFile: path).components(separatedBy: "\n")
        }
    }
    init?(name aName: String,path aPath: String){
        guard FileManager.default.fileExists(atPath: aPath) else{
            return nil
        }
        name = aName
        path = aPath
    }
    static func allAvailable() -> [PluginMarkDown]{
        let fm = FileManager.default
        guard let allPaths = try? fm.contentsOfDirectory(atPath: Constant.gitPath) else{
            fatalError()
        }
        
        let pluginPaths: [String] = allPaths
            .filter{Constant.pluginType.contains($0)}
            .map{Constant.gitPath.appending($0)}
            .reduce([]){ arr,dir in
                var tmp = [String]()
                if let subPaths = try? fm
                        .contentsOfDirectory(atPath: dir)
                        .map({ str in
                            return dir.stringByAppendingPathComponent(str)
                        }){
                    tmp = subPaths
                }
                return arr + tmp
            }
        let result: [PluginMarkDown] = pluginPaths
            .flatMap{ path in
                let name = path.lastPathComponent()
                let newPath = path.stringByAppendingPathComponent("README.md")
                return PluginMarkDown(name: name, path: newPath)
        }
        return result
    }
}

struct functionEmoji{
    fileprivate struct Emoji {
        static let normal = "🍭"
        static let new = "🆕"
        static let deprecated = "🚫"
        static let allEmoji = [normal,new,deprecated]
    }
    static func isFunctionLine(_ str: String) -> Bool {
        guard str.hasPrefix("###") && !str.hasPrefix("####") else{
            return false
        }
        for emoji in Emoji.allEmoji{
            if str.removePoundPrefix().removeBlankPrefix() .hasPrefix(emoji) {
                return true
            }
        }
        return false
    }
}

extension String{
    func stringByAppendingPathComponent(_ str: String) -> String {
        return (self as NSString).appendingPathComponent(str)
    }
    func lastPathComponent() -> String {
        return (self as NSString).lastPathComponent
    }
    func stringByDeletingLastPathComponent() -> String {
        return (self as NSString).deletingLastPathComponent
    }
    func removeBlankPrefix() -> String {
        var newStr = self;
        while newStr.hasPrefix(" ") {
            
            newStr = newStr.substring(from: newStr.index(startIndex, offsetBy: 1)) //newStr.substringFromIndex(newStr.startIndex.advancedBy(1));
        }
        return newStr;
    }
    
    
    func removePoundPrefix() -> String {
        var newStr = self;
        while newStr.hasPrefix("#") {
            newStr = newStr.substring(from: newStr.index(startIndex, offsetBy: 1));
            
        }
        return newStr;
    }
}


for md in PluginMarkDown.allAvailable(){
    guard let source = md.source else{
        continue
    }
    
    
    var editedSource: MarkDownSource = source.flatMap{
        
        var line: String = $0
        let ignoreMark = "<ignore>"
        
        
        let cleanedLine = (line as NSString).trimmingCharacters(in: NSCharacterSet.whitespacesAndNewlines) as String
        if cleanedLine == "[TOC]" {
            return nil
        }
        
        
        
        if line.hasSuffix(ignoreMark){
            line = line.substring(to: line.index(line.endIndex , offsetBy: -ignoreMark.characters.count))
        }
        if !line.removeBlankPrefix().hasPrefix("#"){
            return line
        }
        if functionEmoji.isFunctionLine(line){
            var lineStr = line
            for emoji in functionEmoji.Emoji.allEmoji{
                
                lineStr = lineStr.replacingOccurrences(of: emoji, with: "")
            }
            return lineStr
        }
        return line + ignoreMark
    }
    editedSource = ["/*","Sort: 1","Toc: 1","*/",""] + editedSource
    var requiredPath = md.path
        .stringByDeletingLastPathComponent()
        .stringByDeletingLastPathComponent()
    let type = requiredPath.lastPathComponent()
    requiredPath  = requiredPath
        .stringByDeletingLastPathComponent()
        .stringByAppendingPathComponent("DocumentCenter")
        .stringByAppendingPathComponent("引擎插件API")
        .stringByAppendingPathComponent(type)
        .stringByAppendingPathComponent(md.name + ".md")
    let fm = FileManager.default
    if !fm.fileExists(atPath: requiredPath) {
        fm.createFile(atPath: requiredPath, contents: nil, attributes: nil);
    }
    do{
        try editedSource
            .joined(separator: "\n")
            .write(toFile: requiredPath, atomically: true, encoding: String.Encoding.utf8)
    }catch{
        exit(1)
    }
}

