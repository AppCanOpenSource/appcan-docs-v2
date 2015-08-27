[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
评论输入框插件

## 1.1、说明
 提供评论输入相关的功能，集成了表情输入功能，只需简单的widget配置即可实现自定义表情集
## 1.2、UI展示
![](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexInputTextFieldView/img/1.png)        ![](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexInputTextFieldView/img/2.png)

## 1.3、开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=452_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

> ### open 打开评论输入

`uexInputTextFieldView.open(json)`

**说明:**
打开评论输入

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

> ### close 关闭评论输入

`uexInputTextFieldView.close()`

**说明:**
关闭评论输入

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

## 2.2、监听方法

> ### onCommit 点击评论按钮时的监听方法

`uexInputTextFieldView.onCommit(json)`

**参数**
```
var json = {
    emojiconsText://用户所输入内容
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

# 3、更新历史
API 版本：uexInputTextFieldView-3.0.3(iOS) uexInputTextFieldView-3.0.8(Android)
最近更新时间：2015-08-21

| 历史发布版本 | iOS更新 | 安卓更新 |
| ------------ | ------------ | ------------ |
| 3.0.8 |  | 修改EditText和webview中的输入框抢焦点的问题|
| 3.0.7 |  | 修改open接口，可设置发送按钮颜色和按钮字体的颜色。|
| 3.0.6 |  | 修改发送按钮为默认显示|
| 3.0.5 |  | 修复点击输入框再点击物理返回键，直接退出插件问题|
| 3.0.4 |  | 修改open接口|
| 3.0.3 | open接口参数改为json类型，添加placehold参数，可以设置输入框里默认显示的文字 | 修复插件关闭时系统键盘还显示问题|
| 3.0.2 | 动画优化 | 修复第二次打开界面空指针问题|
| 3.0.1 | onCommit接口的参数使用json格式 | clean函数中调用close方法|
| 3.0.0 | EUExInputTextFieldView插件 | InputTextFieldView插件基础版|
