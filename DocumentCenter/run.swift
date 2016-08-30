#!/usr/bin/env xcrun swift

import Foundation


typealias MarkDownSource = [String]
typealias MarkDownEditResult = (result: MarkDownSource,hasChanged: Bool)





struct PluginMarkDown {
    struct Constant {
        static let gitPath       = "/Users/appcan_git/dev/appcan_git/appcan-docs-v2"
        static let pluginType    = ["系统功能","网络通讯","界面布局","功能扩展","第三方SDK","应用引擎"]
        static let ignorePlugins = []
    }
    
    let name: String
    let path: String
    var source: MarkDownSource?{
        get{
            return try? String(contentsOfFile: path).componentsSeparatedByString("\n")
        }
    }
    init?(name aName: String,path aPath: String){
        guard NSFileManager.defaultManager().fileExistsAtPath(aPath) else{
            return nil
        }
        name = aName
        path = aPath
    }
    static func allAvailable() -> [PluginMarkDown]{
        let fm = NSFileManager.defaultManager()
        guard let allPaths = try? fm.contentsOfDirectoryAtPath(Constant.gitPath) else{
            fatalError()
        }
        let result: [PluginMarkDown] = allPaths
                .filter{Constant.pluginType.contains($0)}
                .map{Constant.gitPath.stringByAppendingPathComponent($0)}
                .flatMap{path in
                    try? fm
                        .contentsOfDirectoryAtPath(path)
                        .map{path.stringByAppendingPathComponent($0)}
                }
                .flatten()
                .flatMap{ path in
                    let name = path.lastPathComponent()
                    
                    let newPath = path.stringByAppendingPathComponent("README.md")
                    return PluginMarkDown(name: name, path: newPath)
                }
        return result
    }
}

struct functionEmoji{
    private struct Emoji {
        static let normal = "🍭"
        static let new = "🆕"
        static let deprecated = "🚫"
        static let allEmoji = [normal,new,deprecated]
    }
    static func isFunctionLine(str: String) -> Bool {
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
    func stringByAppendingPathComponent(str: String) -> String {
        return (self as NSString).stringByAppendingPathComponent(str)
    }
    func lastPathComponent() -> String {
        return (self as NSString).lastPathComponent
    }
    func stringByDeletingLastPathComponent() -> String {
        return (self as NSString).stringByDeletingLastPathComponent
    }
    func removeBlankPrefix() -> String {
        var newStr = self;
        while newStr.hasPrefix(" ") {
            newStr = newStr.substringFromIndex(newStr.startIndex.advancedBy(1));
        }
        return newStr;
    }
    
    func removePoundPrefix() -> String {
        var newStr = self;
        while newStr.hasPrefix("#") {
            newStr = newStr.substringFromIndex(newStr.startIndex.advancedBy(1));
        }
        return newStr;
    }
}


for md in PluginMarkDown.allAvailable(){
    guard let source = md.source else{
        continue
    }
    var editedSource: MarkDownSource = source.map{
        var line = $0
        let ignoreMark = "<ignore>"
        if line.hasSuffix(ignoreMark){
            line = line.substringToIndex(line.endIndex.advancedBy(-ignoreMark.characters.count));
        }
        guard line.removeBlankPrefix().hasPrefix("#") && !functionEmoji.isFunctionLine(line) else{
            return line
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
    let fm = NSFileManager.defaultManager()
    if !fm.fileExistsAtPath(requiredPath) {
            fm.createFileAtPath(requiredPath, contents: nil, attributes: nil);
    }
    do{
        try editedSource
            .joinWithSeparator("\n")
            .writeToFile(requiredPath, atomically: true, encoding: NSUTF8StringEncoding)
    }catch{
        exit(1)
    }
}

