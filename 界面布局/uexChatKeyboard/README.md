[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
## 1.1、说明
提供聊天输入相关的功能，集成了表情、拍照、从相册选取图片等分享功能，只需简单的widget配置即可实现自定义表情集和分享选项内容。
## 1.2、UI展示

## 1.3、开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=451_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法


>### open  
 
`uexChatKeyboard.open(viewInfo) `  

**说明:**
   在界面的底部打开聊天输入框界面

**参数: ** 



```
var viewInfo={
    "emojicons":,//(必选)自定义表情配置文件的widget路径
    "shares":,//(必选)自定义分享选项配置文件的widget路径
    "placeHold":,//(可选)输入框提示语
    "touchDownImg": ,//(可选)录音按钮按下时提示控件的背景
    "dragOutsideImg": ,//(可选)按下录音按钮后滑动到录音范围之外时提示控件的背景
    "textColor": ,//(可选)录音时间文字颜色
    "textSize": ,//(可选)录音时间文字大小
}
```


自定义表情的配置文件配置步骤：

1. 在widget的wgtRes目录下创建emojicons目录；

2. 在emojicons中放入表情以及删除的图片资源，表情的默认命名格式：
ace_emoji_1，删除的默认命名格式：ace_emoji_delete.png；

3. 在emojicons中创建emojicons.xml文件，格式如下：

```
<?xml version="1.0" encoding="utf-8"?>
<emojicons delete="ace_emoji_delete.png ">
   <key>[微笑]</key>
   <string> ace_emoji_1.png</string>
   <key>[憋嘴]</key>
   <string> ace_emoji_2.png</string>
</emojicons>
```

* `delete`：删除对应的图片名；
* `key`：表情对应的文字；
* `string`：表情对应的图片名；
* 表情目录、图片名以及配置文件名都可以自定义命名，但是必须保
证配置文件中的图片名与资源图片对应。

自定义分享选项的配置文件配置步骤:

1. 在widget的wgtRes目录下创建shares目录；
2. 在shares中放入分享选项的图片资源，图片的默认命名格式：
ace_share_1；
3. 在shares中创建shares.xml文件，格式如下：

~~~
<?xml version="1.0" encoding="utf-8"?>
<shares>
<key>拍照</key>
<string>ace_share_1.png</string>
<key>图片</key>
<string>ace_share_2.png</string>
<key>位置</key>
<string>ace_share_3.png</string>
</shares>
~~~

* `key`：分享选项显示的文字  
* `string`：分享选项对应的图片名说明;
* 分享目录、图片名以及配置文件名都可以自定义命名，但是必须保
证配置文件中的图片名与资源图片对应。  
  
**平台支持: ** 

Android 2.2+  
iOS 6.0+    

**版本支持**：  
    3.0.0+    

**示例:**

```
var jsonstr =
'{
    "emojicons": "res://emojicons/emojicons.xml",
    "shares": "res://shares/shares.xml",
    "placeHold": "请输入内容",
    "touchDownImg": "res://1.png",
    "dragOutsideImg": "res://2.png",
    "textColor": "#FFF",
    "textSize": "15.5"
}';
uexChatKeyboard.open(jsonstr);
```
>### close

 ` uexChatKeyboard.close() `
  
**说明:**   

关闭聊天输入 
   
**参数:**
  无  
  
**平台支持: ** 

Android 2.2+  
iOS 6.0+  
  
**版本支持：**  

3.0.0+  

**示例:**

```
uexChatKeyboard.close();
```  

>### getInputBarHeight
 
`uexChatKeyboard.getInputBarHeight();  `

**说明**

获取输入工具条高度 
通过回调`uexChatKeyboard.cbGetInputBarHeight(data);`返回结果

**参数:**

无

**平台支持: ** 

Android 2.2+  
iOS 6.0+  
  
**版本支持：**  

3.0.7+  

**示例:**

```
uexChatKeyboard.getInputBarHeight();
```  


## 2.2、回调方法

>### cbGetInputBarHeight
 
`uexChatKeyboard.cnGetInputBarHeight(data);  `

**说明**

getInputBarHeight获取输入工具条高度的回调方法


**参数:**

```
var data={
	"height":100
}
```

**平台支持: ** 

Android 2.2+  
iOS 6.0+  
  
**版本支持：**  

iOS 3.0.4+
Android 3.0.7+  


示例

```
uexChatKeyboard.cbGetInputBarHeight = function(json) {
alert(json); 
}
```
 
## 2.3、监听方法



>### onCommit

`uexChatKeyboard.onCommit (data)`

**参数: **
：

```  
var data={
    "emojiconsText": "[微笑] [憋嘴]"
}
```

**平台支持: ** 

Android 2.2+  
iOS 6.0+  
  
**版本支持：**  

3.0.0+  

**示例**

```
uexChatKeyboard.onCommit = function(data){
alert(data);
}

```

>### onShareMenuItem

 

`uexChatKeyboard. onShareMenuItem (data)  `


**说明**

点击分享里选项的监听方法   
  
**参数: **

|参数名称 | 参数类型| 是否必选|  说明 |
| ------------ | ------------ | ------------ | ------------ |
| data| Number | 是 | 享里各选项对应的位置 |


  
**平台支持: ** 

Android 2.2+  
iOS 6.0+  
  
**版本支持：**  

3.0.0+  

**示例**

```
uexChatKeyboard.onShareMenuItem = function(data){
alert(data);
}

```

>### onVoiceAction
 
`uexChatKeyboard. onVoiceAction (data) `

**说明** 

录音按钮的监听方法 

**参数:**  
 
```
var data={
    "status":,//录音按钮的状态，0--开始录音，1--录音完成，-1--取消录音
}

```


**平台支持: ** 

Android 2.2+  
iOS 6.0+  
  
**版本支持：**  

3.0.0+  

**示例**

```
uexChatKeyboard.onVoiceAction = function(data){
alert(data);
}

```

 
 
 
 
# 3、更新历史
API 版本：uexChatKeyboard-3.0.4(iOS) uexChatKeyboard-3.0.7(Android)
最近更新时间：2015-xx-xx

| 历史发布版本 | iOS更新 | 安卓更新 |
| ------------ | ------------ | ------------ |
| 3.0.0 | 插件 | 插件|


## 方法:
### [open](#open) 打开聊天输入
###[close](#close) 关闭聊天输入
### [getInputBarHeight](#getinputbarheight) 获取输入工具条高度

## 监听方法：

### [onCommit](#oncommit)  点击发送的监听方法
### [onShareMenuItem](#onsharemenuitem)  点击分享里选项的监听方法
### [onVoiceAction](#onvoiceaction)  录音按钮的监听方法



 



