[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
## 1.1、说明

## 1.2、UI展示

## 1.3、开源源码
插件测试用例与源码下载：[点击](xxxx ) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

## 2.2、回调方法

## 2.3、监听方法

# 3、更新历史
API 版本：uexXXX-3.0.X(iOS) uexXXX-3.0.X(Android)
最近更新时间：2015-xx-xx

| 历史发布版本 | iOS更新 | 安卓更新 |
| ------------ | ------------ | ------------ |
| 3.0.0 | 插件 | 插件|

#uexInputTextFieldView
提供评论输入相关的功能，集成了表情输入功能，只需简单的widget配置即可实现自定义表情集


##方法
* [open](#open)打开评论输入
* [close](#close)关闭评论输入

##回调方法
* [onCommit](#oncommit)点击评论按钮时的回调






###open
打开评论输入

uexInputTextFieldView.open(json)

**参数**
```
var json = {
"emojicons":,//emojicons.xml文件路径（详细说明见下）
    "placeHold":,//输入框提示语
}
```

自定义表情的配置文件配置步骤：
1、在widget的wgtRes目录下创建emojicons目录；
2、在emojicons中放入表情以及删除的图片资源，表情的默认命名格式：
ace_emoji_1，删除的默认命名格式：ace_emoji_delete.png；
3、在emojicons中创建emojicons.xml文件，格式如下：


<?xml version="1.0" encoding="utf-8"?>
<emojicons delete="ace_emoji_delete.png ">
  <key>[微笑]</key>
   <string> ace_emoji_1.png</string>
   <key>[憋嘴]</key>
   <string> ace_emoji_2.png</string>
</emojicons>




* delete:删除对应的图片名；
* key:表情对应的文字；
* string:表情对应的图片名
    * 说明:表情目录、图片名以及配置文件名都可以自定义命名，但是必须保证配置文件中的图片名与资源图片对应。

**平台支持**

Android 2.2+
iOS 6.1+

**版本支持**

Android 3.0.0+
iOS 3.0.0+

**示例**
```
var data ={
    emojicons: "res://emojicons/emojicons.xml",
    placeHold: "请输入内容"
};
var jsonStr = JSON.stringify(data)
uexInputTextFieldView.open(jsonStr);

```
###close
 关闭评论输入

uexInputTextFieldView.close()
**参数**

```
无
```
**平台支持**
Android 2.2+
iOS 6.1+
**版本支持**
Android 3.0.0+
iOS 3.0.0+
**示例**
```
uexInputTextFieldView.close()

```

###onCommit
 点击评论按钮时的监听方法

uexInputTextFieldView.onCommit(json)
**参数**

```
var json = {
emojiconsText:,//用户所输入内容
}

```
**平台支持**
Android 2.2+
iOS 6.1+
**版本支持**
Android 3.0.0+
iOS 3.0.0+
**示例**
```
uexInputTextFieldView.onCommit = function(data){
alert(data);
}

```
