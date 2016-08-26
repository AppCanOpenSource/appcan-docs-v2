[TOC]

# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
腾讯分享插件

## 1.1、说明
调用腾讯分享文字,图片.

## 1.2、UI展示
![](http://newdocx.appcan.cn/docximg/165128c2015g6x16g.jpg)

## 1.3、 开源源码:
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=190_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
 
## 1.4、 术语表
-----
Path Types

|  协议头 |  Android对应路径 (其中"/sdcard/"等 同于"/storage/emulated/0/") | iOS对应路径  |
| ----- | ----- | ----- |
| res:// |widget/wgtRes/   |widget/wgtRes   |
|  wgts:// | /storage/emulated/0/widgetone/apps/ xxx(widgetAppId)/  |  /Documents/apps/xxx(widgetAppId)/ |
|  wgts:// |  /storage/emulated/0/widgetone/widgets/ |  /Documents/widgets/ |
|  file:///sdcard/ | /storage/emulated/0/  | 无  |

#2、API概览
## 2.1、方法:

### 🍭 registerApp 授权本应用访问用户微博账号       

`uexTent.registerApp(appKey,appSecret,registerUrl)`

**说明:**

 
请先到腾讯微博开放平台注册 回调 [cbRegisterApp](#cbregisterapp 注册应用的回调方法 "注册应用的回调方法")

**参数:**

 

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| appKey| String类型| 必选 | 通过腾讯开放平台注册的appKey   |
| appSecret|String类型 | 必选 | 通过腾讯开放平台注册的appSecret |
| registerURL|String类型 | 必选 | 通过腾讯开放平台注册的registerURL |
 

**平台支持:**

 
Android2.2+                 
iOS6.0+    
             

**版本支持:**

 
3.0.0+ 
                 

**示例:**

 
见sendImageContent方法示例 
                
### 🍭 sendTextContent 分享文本到腾讯微博

`uexTent.sendTextContent(txt)`

**说明:**

 
分享文本到腾讯微博                   
回调 [cbShare](#cbShare 分享后的回调方法 "分享后的回调方法")

**参数:**

 

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| txt| String类型| 必选 | 分享的文本内容   |
 

**平台支持:**

 
Android2.2+                 
iOS6.0+
           

**版本支持:**

 
3.0.0+  
                

**示例:**

 
见sendImageContent方法示例                 
### 🍭 sendImageContent 分享图片到腾讯微博   

`uexTent.sendImageContent(imagePath,txt))`

**说明:**

 

分享图片到腾讯微博
回调 [cbShare](#cbshare 分享后的回调方法 "分享后的回调方法")

**参数:**

 

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| imagePath| String类型| 必选 | 分享的图片的路径,本接口不支持网络图片  |
| txt|String类型 | 必选 | 分享的文本内容 |
 

**平台支持:**

 
Android2.2+         
iOS6.0+    
     

**版本支持:**

 
3.0.0+    
      

**示例:**

 

```
<!DOCTYPE HTML>
<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1.0, user-scalable=no" /><link rel="stylesheet" type="text/css" href="css/index.css">
<title>腾讯微博功能</title>
<script type="text/javascript">
var cText = 0;
var cJson = 1;
var cInt = 2;
    window.uexOnload = function(){
        uexTent.cbShare=function(opCode,dataType,data){
            document.getElementById("showStatus").innerHTML = "返回分享状态码:"+data;
        };
        uexTent.cbRegisterApp = function(opId,dataType,data){
			document.getElementById("cbRegister").innerHTML = "返回注册状态码:"+data;
		};
    }
    function shareText(){
        //分享文字
        var txt = "这是来自AppCan中国最大的移动中间键平台对腾讯微博分享支持测试";
        uexTent.sendTextContent(txt);
    }
    function sharePic(){
        var content = "这是来自AppCan中国最大的移动中间键平台对腾讯微博分享支持测试";
        var realImgPath = "res://test.png";
        uexTent.sendImageContent(realImgPath,content);
    }
    function register(){
        alert("register");
        var appKey  = "801338244";
        var appSecret = "2428aa8e7478f6ea2c6171b48f5adcf7";
        var registerUrl = "http://www.3g2win.com/";
        uexTent.registerApp(appKey,appSecret,registerUrl);
        alert(2222);
    }
</script>
</head>
<body>
    <div class="tit">腾讯微博功能</div>
    <div class="conbor">
        <div class="consj">
            <span>1.注册app id</span>
            <input class="btn" type="button" value="注册App" onclick="register();">
            <div class="tcxx" id="selectItem"></div><br>
            <span>2.发表状态</span>
            <input class="btn" type="button" value="分享文本" onclick="shareText();">
            <div class="tcxx" id="showStatus"></div><br>
                <span>3.分享图片,以及文字</span>
            <input class="btn" type="button" value="分享图片" onclick="sharePic();">
            <div class="tcxx" id="showPicStatus"></div><br>     
        </div>
    </div>
</body>
</html>

```
##2.2、回调方法:

### 🍭cbRegisterApp 注册应用的回调方法        

`uexTent.cbRegisterApp(opId,dataType,data)`   

**参数:**

 

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number类型| 必选 | 操作ID,在此函数中不起作用,可忽略   |
| dataType|Number类型 | 必选 | 数据类型详见CONSTANT中Callback方法数据类型 |
| data|Number类型 | 必选 | 分享结果,成功:0,失败:1. |
 

**版本支持:**

 
3.0.0+                  
### 🍭 cbShare 分享后的回调方法   

`uexTent.cbShare(opId,dataType,data);`

**参数:**

 

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number类型| 必选 | 操作ID,在此函数中不起作用,可忽略   |
| dataType|Number类型 | 必选 |  数据类型详见CONSTANT中Callback方法数据类型 |
| data|Number类型 | 必选 | 分享结果,成功:0,失败:1. |
 

**版本支持:**

 
3.0.0+      
            
#3、更新历史

### iOS

API版本: `uexTent-4.0.0`

最近更新时间:`2015-11-23`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android

API版本: `uexTent-4.0.0`

最近更新时间:`2015-11-23`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
