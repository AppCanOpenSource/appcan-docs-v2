[TOC]

# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
新浪分享插件

## 1.1 说明
调用新浪分享文字，图片。

## 1.2 UI展示
 ![](http://newdocx.appcan.cn/docximg/164911i2015y6i16c.png)
 
## 1.3 开源源码：
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=186_index) 插件中心至插件详情页 （插件测试用例与插件源码已经提供）

## 1.4 术语表
------------
Path Types

|  协议头 |  Android对应路径 (其中"/sdcard/"等 同于"/storage/emulated/0/") | iOS对应路径  |
| ------------ | ------------ | ------------ |
| res:// |widget/wgtRes/   |widget/wgtRes   |
|  wgts:// | /storage/emulated/0/widgetone/apps/ xxx(widgetAppId)/  |  /Documents/apps/xxx(widgetAppId)/ |
|  wgts:// |  /storage/emulated/0/widgetone/widgets/ |  /Documents/widgets/ |
|  file:///sdcard/ | /storage/emulated/0/  | 无  |

# 2、API概览
##  2.1 方法

> ### registerApp 用户授权

`uexSina.registerApp(appKey,appSecret,registerURL) `

**说明:**
用户授权    
回调 [cbRegisterApp](#cbregisterapp 用户授权的回调方法 "用户授权的回调方法")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| appKey| String类型| 必选 | 通过开放平台注册的appKey，appKey申请点击跳转   |
| appSecret|String类型 | 必选 | 通过开放平台注册的appSecret |
| registerURL|String类型 | 必选 | 通过开放平台注册的registerURL |
  
**平台支持:**
Android2.2+  
iOS6.0+ 

**版本支持:**
3.0.0+  

**示例:**
见sendImageContent方法示例 

> ### sendTextContent 分享文字

`uexSina.sendTextContent(txt)`

**说明:**
分享文字 回调 [cbShare](#cbshare 分享后的回调方法 "分享后的回调方法")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| txt| String类型| 必选 | 文本内容   |
 
**平台支持:**
Android2.2+  
iOS6.0+ 
**版本支持:**
3.0.0+  

**示例:**
见sendImageContent方法示例 

> ### sendImageContent 分享图片

`uexSina.sendImageContent(imagePath,txt)`

**说明:**
如果要分享网络图片需要申请新浪微博高级权限
回调 [cbShare](#cbshare 分享后的回调方法 "分享后的回调方法")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| imagePath| String类型| 必选 | 图片路径，路径协议详见CONSTANT中PathTypes。   |
| txt|String类型 | 必选 | 文本内容 |
 
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
        <link rel="stylesheet" type="text/css" href="../css/index.css">
            <title>新浪功能</title>
            <script type="text/javascript">
                window.uexOnload = function(){
                    uexSina.cbShare = function(opCode, dataType, data){
                     document.getElementById("showStatus").innerHTML = "返回分享状态码:"+data;
                    };
                   uexSina.cbRegisterApp = function(opCode, dataType, data){
                        alert(data);
                    }
                }
            function shareText(){
                var txt = "这是来自appcan平台对新浪微博分享支持测试";
                uexSina.sendTextContent(txt);
            }
            function sharePic(){
                var content = "这是来自appcan平台对新浪微博分享支持测试";
                var realImgPath = "res://Icon.png";//http:// 本地
                uexSina.sendImageContent(realImgPath, content);
            }
            function register23(){
                var appKey = "3101073421";
                var appSecret = "2f5acd0e39889f9965c86c743afdda04";
                var registerUrl = "http://mp.ceair.com/";
                uexSina.registerApp(appKey,appSecret,registerUrl);
            }
            </script>
            </head>
    <body>
        <div class="tit">新浪功能</div>
        <div class="conbor">
            <div class="consj">
                <span>1.注册app id</span>
                <input class="btn" type="button" value="注册App" onClick="register23();">
                    <div class="tcxx" id="selectItem"> </div>
                    <span>2.发表状态</span>
                    <input class="btn" type="button" value="分享文本" onClick="shareText();">
                        <div class="tcxx" id="showStatus"></div><br>
                        <span>3.分享图片</span>
                        <input class="btn" type="button" value="分享图片" onClick="sharePic

();">
                            <div class="tcxx" id="showPicStatus">
</div>
</div>
</div>
    </body>
</html>
```

##  2.1 回调方法
> ### cbRegisterApp 用户授权的回调方法

`uexSina.cbRegisterApp(opId,dataType,data)  `

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number类型| 必选 | 操作ID，此函数中不起作用，可忽略。  |
| dataType|Number类型 | 必选 | 数据类型详见CONSTANT中Callback方法数据类型     |
| data|Number类型 | 必选 | 分享结果，0-成功，1-失败。  |
  
**版本支持**
3.0.0+  

> ### cbShare 分享后的回调方法

`uexSina.cbShare(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number类型| 必选 | 操作ID，此函数中不起作用，可忽略。     |
| dataType|Number类型 | 必选 | 数据类型详见CONSTANT中Callback方法数据类型     |
| data|Number类型 | 必选 | 分享结果，成功:0，失败:状态码。 |
 
**版本支持:**
3.0.0+  

# 3、更新历史
API 版本：uexSina-3.0.5(iOS) uexSina-3.0.8（Android）
最近更新时间：2015-11-06
 
|  历史发布版本 | iOS更新  | 安卓更新  |
| ------------ | ------------ | ------------ |
| 3.0.8  |   | 去掉插件中的ActivityGroup,配合引擎升级  |
| 3.0.7  |   | 新增login登陆接口接口  |
| 3.0.6  |   | 修改uexSina插件中的代码错误  |
| 3.0.5  | 注册回调方法名统一修改为uexSina.cbRegisterApp| 修改uexSina插件中registerCallBack和cbShare回调方法返回值：成功为0，失败为1  |
| 3.0.4 | 增加新浪授权登录  | 修复分享图片时路径解析错误问题  |
| 3.0.3  |  取消用户新浪微博对appcan的自动关注| 修复适配3.0新引擎的问题  |
| 3.0.2  |  统一回调方法名，统一回调参数 | 修复回调数据与文档不一致的问题  |
| 3.0.1  | 添加uexSina.registerCallBack成功的回调,修复点击分享黑屏的bug| 修复插件配置问题|
| 3.0.0  | 新浪分享功能插件  | 新浪分享功能插件|
