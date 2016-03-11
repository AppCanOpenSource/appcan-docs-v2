[TOC]

# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
新浪分享插件

## 1.1 说明
调用新浪分享文字,图片。

**iOS 9 以后,为了预防APP通过非正常渠道获取用户的某些隐私信息,Apple启用了URLScheme白名单机制。**
    
* **为了正常使用插件的所有功能还需要配置URLScheme白名单**([什么是URLScheme白名单](http://bbs.appcan.cn/forum.php?mod=viewthread&tid=29503&extra=))
* 配置白名单方法请参考[这里](http://newdocx.appcan.cn/newdocx/docx?type=1505_1291#设置urlScheme白名单)
* uexSina需要进白名单添加的URLScheme如下

```
<string>sinaweibohd</string>
<string>sinaweibo</string>
<string>sinaweibosso</string>
<string>sinaweibohdsso</string>
<string>weibosdk</string>
<string>weibosdk2.5</string>
```

* iOS App用过uexSina插件打开新浪客户端进行授权、分享过程完成后,新浪客户端通过应用自定义的UrlScheme返回到本App,并传回授权、分享结果时,需要配置UrlScheme值。通过config.xml配置插件的方法如下

```
<config desc="uexSina" type="URLSCHEME">
    <urlScheme name="uexSina" schemes="['wb407216840']"/>
</config>
```
其中'wb407216840'的'407216840'改成您自己申请到的新浪appkey,`需要是wb+appkey的形式`

## 1.2 UI展示
 ![](http://newdocx.appcan.cn/docximg/164911i2015y6i16c.png)
 
## 1.3 开源源码:
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=186_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4 术语表
-----
Path Types

|  协议头 |  Android对应路径 (其中"/sdcard/"等 同于"/storage/emulated/0/") | iOS对应路径  |
| ----- | ----- | ----- |
| res:// |widget/wgtRes/   |widget/wgtRes   |
|  wgts:// | /storage/emulated/0/widgetone/apps/ xxx(widgetAppId)/  |  /Documents/apps/xxx(widgetAppId)/ |
|  wgts:// |  /storage/emulated/0/widgetone/widgets/ |  /Documents/widgets/ |
|  file:///sdcard/ | /storage/emulated/0/  | 无  |

# 2、API概览
##  2.1 方法

> ### registerApp 用户授权

`uexSina.registerApp(appKey,appSecret,registerURL) `

**说明:**

用户授权,用户授权后可以进行调用分享等接口,如果手机上端有微博客户端,会直接调用客户端进行授权。如果没有,则开启网页让用户授权。
回调 [cbRegisterApp](#cbregisterapp 用户授权的回调方法 "用户授权的回调方法")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| appKey| String类型| 必选 | 通过开放平台注册的appKey,appKey申请点击跳转   |
| appSecret|String类型 | 必选 | 通过开放平台注册的appSecret |
| registerURL|String类型 | 必选 | 通过开放平台注册的registerURL |
  

**平台支持:**

Android2.2+  
iOS6.0+ 

**版本支持:**

3.0.0+  

**示例:**

见sendImageContent方法示例 

> ### login 登录

`uexSina.login(appKey,registerUrl); `

**说明:**

用户登录, 支持SSO登录。如果手机上端有微博客户端,会直接调用客户端进行登录授权。如果没有,则开启网页让用户登录授权。

回调[cbLogin](#cbLogin 用户登录回调方法 "用户登录回调方法")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| appKey| String类型| 必选 | 通过开放平台注册的appKey,appKey申请点击跳转   |
| registerURL|String类型 | 必选 | 通过开放平台注册的registerURL |

**平台支持:**

Android2.2+  
iOS6.0+ 

**版本支持:**

Android 3.0.9+ 
iOS 3.0.6+

**示例:**

见sendImageContent方法示例 

> ### getUserInfo 获取用户基本信息

`uexSina.getUserInfo(); `

**说明:**

返回该用户的新浪微博相关信息,如用户名,姓别,所在地等。
回调[cbGetUserInfo](#cbGetUserInfo 获取用户信息的回调方法 "获取用户信息的回调方法")

**参数:**

无

**平台支持:**

  
Android2.2+  
iOS6.0+ 

**版本支持:**

  
Android 3.0.9+ 
iOS 3.0.6+

**示例:**

见sendImageContent方法示例 

> ### logout 退出

`uexSina.logout(); `

**说明:**

注销该新浪微博帐号
回调[cbLogout](#cbLogout 用户退出的回调方法 "用户退出的回调方法")

**参数:**

无

**平台支持:**

Android2.2+  
iOS6.0+ 

**版本支持:**

  
Android 3.0.9+ 
iOS 3.0.6+

**示例:**

见sendImageContent方法示例 

> ### sendTextContent 分享文字

`uexSina.sendTextContent(txt)`

**说明:**

分享文字 回调 [cbShare](#cbshare 分享后的回调方法 "分享后的回调方法")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
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
| ----- | ----- | ----- | ----- |
| imagePath| String类型| 必选 | 图片路径,路径协议详见CONSTANT中PathTypes。   |
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
                   uexSina.cbLogin = function(opCode,dataType,data) {
                        document.getElementById("selectItem").innerHTML = data;
                   }
                  uexSina.cbGetUserInfo = function(opCode, dataType, data) {
                         alert(data);
                   }
                  uexSina.cbLogout = function(opCode, dataType, data){
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
            function login() {
                var appKey = "4072168403";
                var registerUrl = "http://www.dotlink.com";
                uexSina.login(appKey,registerUrl);
            }
            function getUserInfo() {
                uexSina.getUserInfo();
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
</div><br>
            <input class="btn" type="button" value="获取用户信息" onclick="getUserInfo();">
            <br>
            <input class="btn" type="button" value="登出" onclick="uexSina.logout();">
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
| ----- | ----- | ----- | ----- |
| opId| Number类型| 必选 | 操作ID,此函数中不起作用,可忽略。  |
| dataType|Number类型 | 必选 | 数据类型详见CONSTANT中Callback方法数据类型     |
| data|Number类型 | 必选 | 注册结果,0-成功,1-失败。  |
  

**版本支持**

3.0.0+  

> ### cbLogin 用户登录回调方法

`uexSina.cbLogin(opCode,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number类型| 必选 | 操作ID,此函数中不起作用,可忽略。  |
| dataType|Number类型 | 必选 | 数据类型详见CONSTANT中Callback方法数据类型     |
| data|String类型 | 必选 | 登录后返回的用户相关信息,包括uid, access_token |

**版本支持**

Android 3.0.9+  
iOS 3.0.6+

> ### cbGetUserInfo 获取用户信息的回调方法

`uexSina.cbGetUserInfo(opCode,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number类型| 必选 | 操作ID,此函数中不起作用,可忽略。  |
| dataType|Number类型 | 必选 | 数据类型详见CONSTANT中Callback方法数据类型     |
| data|String类型 | 必选 | 用户的信息,返回一个json String  |

**版本支持**

Android 3.0.9+  
iOS 3.0.6+

> ### cbLogout 用户退出的回调方法

`uexSina.cbLogout(opCode,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number类型| 必选 | 操作ID,此函数中不起作用,可忽略。  |
| dataType|Number类型 | 必选 | 数据类型详见CONSTANT中Callback方法数据类型     |
| data|Number类型 | 必选 | 分享结果,0-成功,1-失败。  |

**版本支持**

Android 3.0.9+  
iOS 3.0.6+

> ### cbShare 分享后的回调方法

`uexSina.cbShare(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number类型| 必选 | 操作ID,此函数中不起作用,可忽略。     |
| dataType|Number类型 | 必选 | 数据类型详见CONSTANT中Callback方法数据类型     |
| data|Number类型 | 必选 | 分享结果,成功:0,失败:状态码。 |
 

**版本支持:**

3.0.0+  

# 3、更新历史

### iOS

API版本:`uexSina-3.0.7`

最近更新时间:`2016-01-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.7 | uexSina添加分享图片可以分享网络图片的功能 |
| 3.0.6 | 替换SinaSDK3.1.1,重写授权登陆相关接口；新增login、logout、getUserInfo接口 |
| 3.0.5 | 注册回调方法名统一修改为uexSina.cbRegisterApp |
| 3.0.4 | 增加新浪授权登录 |
| 3.0.3 | 取消用户新浪微博对appcan的自动关注 |
| 3.0.2 | 统一回调方法名,统一回调参数 |
| 3.0.1 | 添加uexSina.registerCallBack成功的回调,修复点击分享黑屏的bug |
| 3.0.0 | 新浪分享功能插件 |

### Android

API版本:`uexSina-3.0.11`

最近更新时间:`2016-01-25`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.11 | 修复了分享图片不能读取wgts://格式的文件问题 |
| 3.0.10 | cbRegisterApp回调openId和token |
| 3.0.9 | 添加login, getUserInfo, logout接口 |
| 3.0.8 | 去掉插件中的ActivityGroup,配合引擎升级 |
| 3.0.7 | 新增login登陆接口接口 |
| 3.0.6 | 修改uexSina插件中的代码错误 |
| 3.0.5 | 修改uexSina插件中registerCallBack和cbShare回调方法返回值:成功为0,失败为1 |
| 3.0.4 | 修复分享图片时路径解析错误问题 |
| 3.0.3 | 修复适配3.0新引擎的问题 |
| 3.0.2 | 修复回调数据与文档不一致的问题 |
| 3.0.1 | 修复插件配置问题 |
| 3.0.0 | 新浪分享功能插件 |
