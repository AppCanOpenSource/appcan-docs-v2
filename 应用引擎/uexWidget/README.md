[TOC]
# 1、简介
管理当前应用

# 2、API概览

## 2.1、方法

> ### startWidget 加载一个widget 

`uexWidget.startWidget(appId,animiId,funName,info,animDuration)`

**说明:**
在当前widget加载一个子widget	
**参数:**


|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|------- |
|appId|String|是|子widget的appId|
|animiId|String | 是 |子widget载入时的动画id,详见CONSTANT中WindowAnimiID |
|funName| String| 是 |方法名，子widget结束时将String型的任意字符回调给该方法，可为空。 注意：只在主窗口中有效，浮动窗口中无效|
|info | String| 是 |  传给子widget的信息 |
|animDuration| String| 否 |动画持续时长，单位为毫秒，默认200毫秒|

**平台支持:**
Android 2.2+
iOS 6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexWidget.startWidget('12345','1','widgetDidFinish','open a widget',300)
```


> ### finishWidget 退出一个widget

  
  
`  uexWidget.finishWidget(resultInfo,appId,isWgtBG)`

**说明:**
  退出一个widget。
  
**参数:**




|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|------- |
|resultInfo|String|否|此widget结束时，传递给opener的信息|
|appId|String | 否| 要结束的widget的appId，为空时退出的是当前的widget|
|isWgtBG| Number| 否 |结束此widget的方式，0表示销毁该widget，下次再调 用startWidget时，重新打开；1表示把该widget置于后 台，下次再调用startWidget时，不重新打开，操作数据 全部保存。不传或为空时，默认为0。注意传该参数时，必须要传appId参数。|



**平台支持:**
  Android2.2+
  iOS6.0+
**版本支持:**
  3.0.0+
**示例:**

```

  uexWidget.finishWidget("finish a widget","12345",0);

```
> ### removeWidget 删除一个widget

  
  
`  uexWidget.removeWidget(appId)`
**说明:**

  删除一个widget。
  
**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|------- |
|appId|String|是|widget的appId，主widget不能被删除。|

     
**平台支持:**

  Android2.2+
 
  iOS6.0+
  
**版本支持:**

  3.0.0+
  
**示例:**


```
  uexWidget.removeWidget(“12345”);
```

> ### checkUpdate 检查更新

`  uexWidget.checkUpdate()`

**说明:**
  检查当前widget是否有更新。
**参数:**
     无
**平台支持:**
  Android2.2+
  iOS6.0+
**版本支持:**
  3.0.0+
**示例:**

```
uexWidget.checkUpdate();
```
> ### loadApp 启动第三方应用（iOS）

 ` uexWidget.loadApp(appInfo)`
 
**说明:**

  根据相关信息启动一个第三方应用 。
  假设应用A中有进行此[UrlScheme配置](http://newdocx.appcan.cn/newdocx/docx?type=1505_1291#type=”URLSCHEME” urlScheme管理（仅iOS） "UrlScheme配置")，在另一个应用B中，通过引擎的JS方法`uexWidget.loadApp('scheme1:');`即可打开应用A（注意不要漏掉冒号!）
  
**参数:**

    appInfo:(String类型) 必选  第三方应用的[URLSchemes](http://newdocx.appcan.cn/newdocx/docx?type=1505_1291#type=”URLSCHEME” urlScheme管理（仅iOS） "此属性可以通过AppCan平台生成的ipa包里的Info.plist文件中找到") 
  
**平台支持:**

  iOS6.0+
  
**版本支持:**

  3.0.0+
  
**示例:**


```
var appInfo = "http://www.baidu.com";
uexWidget.loadApp(appInfo);

```
> ### startApp 启动第三方应用（Android）

`uexWidget.startApp(startMode,mainInfo,addInfo,optInfo,extra)`
**说明:**
  根据相关信息启动一个第三方应用。
**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|------- |
|startMode|String|是|启动方式，0表示通过包名和类名启动，1表示通过Action启动。|
|optInfo|String|否|附加参数，键值对，{key:value}格式多个用英文","隔开，如："{'key1':'value1'},{'key2':'value1'}"。|

**startMode为0**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|------- |
|mainInfo|String|是|包名|
|addInfo|String|否|类名，为空时启动应用入口类|
|extra|String|否|json格式如下：|
```
{
    "data": "http://www.baidu.com",
    "isNewTask": "0"
}
```
各字段含义如下:

|参数|是否必须|说明|
|-----|-----|-----|
|data|否|data属性|
|isNewTask|否|启动第三方Activity时，值为0，不使用NEW_TASK，值不为0，使用NEW_TASK，默认使用NEW_TASK|

**startMode为1**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|------- |
|mainInfo|String|是|action|
|addInfo|String|否|category或data，json格式如下：|
```
{
    "category": [
        "android.intent.category.WID",
        "android.intent.category.WID1"
    ],
    "data": {
        "mimeType": "image/png",
        "scheme": "sip"
    }
}
```
各字段含义如下:

|参数|是否必须|说明|
|-----|-----|-----|
|category|否|category属性|
|data|否|data属性|
|mineType|否|mineType属性|
|scheme|否|scheme属性|

**注意事项：**
如果通过包名类名启动AppCan应用，而且需要监听onLoadByOtherApp回调方法，则addInfo为必选。调用方法如下：
若包名为com.appcan.develop(开发者在使用时只需要更换包名即可),则调用代码如下：
```
var packageName = "com.appcan.develop";
var className = "org.zywx.wbpalmstar.engine.EBrowserActivity";
var optInfo = "{'key1':'value1'},{'key2':'value1'}";
uexWidget.startApp(0,packageName,className,optInfo);
```

**平台支持:**
  Android2.2+

**版本支持:**
  3.0.0+

**示例:**
  1.要启动的AndroidManifest.xml文件如下：

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.dongjf.mytest"//com.dongjf.mytest即为包名
    android:versionCode="1"
    android:versionName="1.0" >
    <uses-sdk
        android:minSdkVersion="11"
        android:targetSdkVersion="18" ></uses>
    
  <application
        android:allowBackup="true"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
        <activity
            android:name="MainActivity"
            android:label="@string/app_name"
            android:icon="@drawable/icon1"
            android:windowSoftInputMode="stateHidden|adjustResize"
             >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" ></action>
                <category android:name="android.intent.category.LAUNCHER" ></category>
            </intent-filter>
            <intent-filter>
                <action android:name="com.djf.test.main" ></action>
                <category android:name="android.intent.category.DEFAULT" ></category>
            </intent-filter>
        </activity>
        <activity android:name="com.dongjf.mytest.SecondActivity">
//通过包名启动，<intent-filter>标签非必须
            <intent-filter>
                <action android:name="com.djf.test.second" ></action>
//通过action启动时，category DEFAULT属性必须，否则无法调起
                <category android:name="android.intent.category.DEFAULT" ></category>
                <data android:scheme="tel"></data>
            </intent-filter>
        </activity>
        <activity android:name="com.dongjf.mytest.ThirdActivity">
            <intent-filter>
                <action android:name="com.djf.test.second" ></action>
                <category android:name="android.intent.category.DEFAULT" ></category>
                <category android:name="android.intent.category.WID" ></category>
                <category android:name="android.intent.category.WID1" ></category>
                <data android:scheme="sip" android:mimeType="image/png"></data>
            </intent-filter>
       </activity>
       <activity  android:name="com.dongjf.mytest.ForthActivity">
            <intent-filter>
                <action android:name="com.djf.test.second" ></action>
                <category android:name="android.intent.category.WID" ></category>
                <category android:name="android.intent.category.DEFAULT" ></category>
                <data android:mimeType="text/html"></data>
            </intent-filter>
        </activity>
   </application>
</manifest>

```
  2.启动该应用对应界面示例如下：

```
<!DOCTYPE HTML>
<HTML>
<head>      
<meta charset="utf-8">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
  <style>
    input{
      margin:.4em;
      font-size: 1.2em !important;
    }
    input[type="text"]{
      color: black;
    }
    p{
      font-size: 14px !important;
    }
  </style>
<script type="text/javascript">
function startAppP(mode){
  var main,add,opt;
  main = "com.dongjf.mytest";
  switch(mode){
    case 0:
      uexWidget.startApp(0, main);//启动应用的入口主类
      break;
    case 1:
      add = "com.dongjf.mytest.SecondActivity";
      uexWidget.startApp(0, main, add);//启动应用的SecondActivity类
      break;
    case 2:
      add = "com.dongjf.mytest.ThirdActivity";
      opt = "{'key1': 'value1'},{'key2': 'value2'}";
      uexWidget.startApp(0, main, add, opt);//启动应用的ThirdActivity类
      break;
  }
}
function startAppA(mode){
  var main,add,opt;
  switch(mode){
    case 0:
      main = "com.djf.test.main";
      uexWidget.startApp(1, main);//启动应用的MainActivity类
      break;
    case 1:
      main = "com.djf.test.second";
      add = '{"data":{"scheme":"tel"}}';
      uexWidget.startApp(1, main, add);//启动应用的SecondActivity类
      break;
    case 2:
      main = "com.djf.test.second";
      add = '{"data":{"mimeType":"text/html"}}';
      opt = "{'key1': 'value1'},{'key2': 'value2'}";
      uexWidget.startApp(1, main, add, opt);//启动应用的ForthActivity类
      break;
    case 3:
      main = "com.djf.test.second";
      add = '{"data":{"mimeType":"image/png","scheme":"sip"}}';
      opt = "{'key1': 'value1'},{'key2': 'value2'}";
      uexWidget.startApp(1, main, add, opt);//启动应用的ThirdActivity类
      break;
    case 4:
      main = "com.djf.test.second";
      add = '{"category":["android.intent.category.WID","android.intent.category.WID1"],"data":{"mimeType":"image/png","scheme":"sip"}}';
      uexWidget.startApp(1, main, add);//启动应用的ThirdActivity类
      break;
  }
}
</script>
</head>
<body>
  <input class="btn" type="button" value="通过包名启动0" onclick=startAppP(0)>
    <input class="btn" type="button" value="通过包名启动1" onclick=startAppP(1)>
    <input class="btn" type="button" value="通过包名启动2" onclick=startAppP(2)>
    <br><br>
   <input class="btn" type="button" value="通过Action启动0" onclick=startAppA(0)>
    <input class="btn" type="button" value="通过Action启动1" onclick=startAppA(1)>
    <input class="btn" type="button" value="通过Action启动2" onclick=startAppA(2)>
   <input class="btn" type="button" value="通过Action启动3" onclick=startAppA(3)>
    <input class="btn" type="button" value="通过Action启动4" onclick=startAppA(4)>  
</body>
</html>
```
3.指定用QQ浏览器打开链接：
  
```
var optInfo = "{'key1':'value1'},{'key2':'value1'}";
var extra='{data:"http://www.appcan.cn/"}';
uexWidget.startApp(0, "com.tencent.mtt","com.tencent.mtt.MainActivity",optInfo,extra);

```

> ### getOpenerInfo 获取widget的相关信息

  
  
 ` uexWidget.getOpenerInfo()`
**说明:**
  获取打开者传入此widget的相关信息。即调用startWidget时传入的info参数值。
**参数:**
    无
**平台支持:**
  Android2.2+
  iOS6.0+
**版本支持:**
  3.0.0+
**示例:**

```
 uexWidget.getOpenerInfo()

```

> ### installApp 安装apk

  
  
 ` uexWidget.installApp(appPath)`
 
**说明:**

  根据安装包所在路径安装一个apk。
  
**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|------- |
|appPath|String|是| apk所在路径|


**平台支持:**
  Android2.2+
**版本支持:**
  3.0.0+
**示例:**

```
 var path = "res://pay.apk"; 
 uexWidget.installApp(path);
```
> ### getPushInfo 获取推送消息

  
  
 ` uexWidget.getPushInfo()`
**说明:**

  获取推送消息,上报消息到管理后台
  
**参数:**

 无
 
**平台支持:**

  Android2.2+
  iOS6.0+
  
**版本支持:**
  3.0.0+
  
**示例:**

```
uexWidget.getPushInfo();

```
> ### setPushNotifyCallback 设置Push消息到达时的回调函数

  
  
 `   uexWidget.setPushNotifyCallback(cbFunction)`
**说明:**

  如果应用开启了推送功能，那么当有消息推送进来时，平台将调用指定的cbFunction函数通知页面。
  
**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|------- |
|cbFunction|String|是| 回调函数方法名|

**平台支持**:
  Android2.2+
  iOS6.0+
**版本支持**:
  3.0.0+
**示例:**

```
uexWidget.setPushNotifyCallback('pushCallback');

function pushCallback(){
alert("收到推送消息");
}

```
> ###setPushInfo 设置推送用户信息

  
  
`  uexWidget.setPushInfo(uId,uNickName)`

**说明:**

  设置推送用户信息
  
**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|------- |
|uId|String|是|  用户ID|
|uNickName|String|是| 用户昵称|

**平台支持:**

  Android2.2+
  iOS6.0+
  
**版本支持:**

  3.0.0+
  
**示例:**

  uexWidget.setPushInfo('user10001','姓名');
  
> ### setPushState 设置推送服务的状态

  
  
  `uexWidget.setPushState(state)`
  
**说明:**

  设置推送服务的状态

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|-------|
|state|Number|是|推送服务状态0-关闭 1-开启|

**平台支持:**

  Android2.2+
  iOS6.0+
  
**版本支持:**

  3.0.0+
  
**示例:**

```
uexWidget.setPushState(0);

```
> ### getPushState 获取推送服务的状态


  
 ` uexWidget.getPushState()`
 
**说明:**

  获取推送服务的状态
  
**参数:**

  无
  
**平台支持:**

  Android2.2+
  iOS6.0+
  
**版本支持:**

  3.0.0+
  
**示例:**

```
  uexWidget.getPushState()
```
  
> ### isAppInstalled 是否安装某第三方应用

  
  
 ` uexWidget.isAppInstalled(json)`
 
**说明:**

  是否安装某第三方应用
  
**参数:**


  ````
   var json = {
    appData://(必选) 第三方应用数据,android平台为第三方应用包名；iOS平台为 Scheme Url
 } 
  ````
  
**平台支持:**

  Android2.2+
  iOS6.0+
  
**版本支持:**

  3.0.0+
  
**示例:**

  ````
 var param1 = {
        appData:'com.tencent.mobileqq'//判断手机上是否安装qq应用
    };
    var data1 = JSON.stringify(param1);
    uexWidget.isAppInstalled(data1);
  ````
  

> ### closeLoading 关闭loading图
  
 ` uexWidget.closeLoading()`
 
**说明:**

  关闭启动图。用于应用启动期间需要做页面跳转等逻辑。需要在config.xml 添加配置 `<removeloading>true</removeloading>`。添加之后引擎不会关闭启动图，由前端调用此接口关闭。超时（时间为3秒）之后引擎才会关闭启动图。
  
  
**参数:**

  无
  
**平台支持:**

  Android2.2+
  
**版本支持:**

  3.2.0+
  
**示例:**

```
  uexWidget.closeLoading()
```
 
> ### moveToBack 运行到后台,不退出程序

 ` uexWidget.moveToBack()`
 
**说明:**

  程序将会在后台运行，不退出。只支持Android。
  
**参数:**

无
  
**平台支持:**

Android2.2+  
  
**版本支持:**

3.2.2+  
  
**示例:**

  ````
    uexWidget.moveToBack();
  ````

> ### reloadWidgetByAppId 根据appId重载widget

`uexWidget.reloadWidgetByAppId(appId);`

**说明**

在子widget更新完成时调用可加载更新的html、js、css

**参数**

appId：子widget对应的appId

**平台支持**

Android 2.2+
iOS 5.1.1+

**版本支持**

3.1.0+

**示例**

`uexWidget.reloadWidgetByAppId(sdk2015);`


> ### setKeyboardMode 设置键盘模式

`uexWidget.setKeyboardMode(json)`
  
**参数:**

````
   var json = {
    mode://(必选) Number类型 0:压缩模式 1：平移模式
 } 
````
  
**平台支持:**

  Android2.2+  
  
**版本支持:**

  3.2.0+
  
**示例:**

````
var json = {
    mode:0
};
var data1 = JSON.stringify(json);
uexWidget.setKeyboardMode(data1);
````

> ### getMBaaSHost 获取MBaaS主机内容
  
 ` uexWidget.getMBaaSHost()`
 
**说明:**

  获取MBaaS主机内容
  
**参数:**

  无
  
**平台支持:**

  Android2.2+
  iOS6.0+
  
**版本支持:**

  3.3.1+
  
**示例:**

```
  uexWidget.getMBaaSHost()
```

## 2.2 回调方法
  
> ### cbStartWidget 加载widget完成时的回调方法



` uexWidget.cbStartWidget(opId,dataType,data)`
 
**参数:**


|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|-------|
|opId|Number|是|操作ID，在此函数中不起作用，可忽略|
|dataType|Number|是|参数类型|
|data|Number|是|0-成功 1-失败|


**平台支持:**

  Android2.2+
  iOS6.0+
  
**版本支持:**
  3.0.0+
  
 **示例:**

  ````
uexWidget.cbStartWidget=function(opId,dataType,data){
	alert('opid:'+opId+',dataType:'+dataType+',data:'+data);
}
  ````
> ### cbRemoveWidget 删除widget完成时的回调方法

  
  
 ` uexWidget.cbRemoveWidget(opId,dataType,data)`
 
**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|-------|
|opId|Number|是|操作ID，在此函数中不起作用，可忽略|
|dataType|Number|是|参数类型|
|data|Number|是|0-成功 1-失败|

**平台支持:**

  Android2.2+
  iOS6.0+
  
**版本支持:**
  3.0.0+
  
**示例:**

  ````
uexWidget.cbRemoveWidget=function(opId,dataType,data){
	alert('opid:'+opId+',dataType:'+dataType+',data:'+data);
}
  ````
> ### cbCheckUpdate 检查更新完成时的回调方法

  
  
`  uexWidget.cbCheckUpdate(opId,dataType,data)`

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|-------|
|opId|Number|是|操作ID，在此函数中不起作用，可忽略|
|dataType|Number|是|参数类型|
|data|String|是|检查结果 json格式|

```
var data={
	result:,//0- 需要更新 1- 不需要更新 2- 错误
	}
```
**平台支持:**

  Android2.2+
  iOS6.0+
  
**版本支持:**

  3.0.0+
**示例:**

  ````
uexWidget.cbCheckUpdate=function(opId,dataType,data){
	alert('opid:'+opId+',dataType:'+dataType+',data:'+data);
}
  ````
> ### cbGetOpenerInfo 获取widget相关信息的回调方法

  
  
`  uexWidget.cbGetOpenerInfo(opId,dataType,data)`

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|-------|
|opId|Number|是|操作ID，在此函数中不起作用，可忽略|
|dataType|Number|是|参数类型|
|data|String|是|返回的数据 本widget的打开者通过startWidget函数打开本widget时传入的info参数值|


**平台支持:**

  Android2.2+
  iOS6.0+
  
**版本支持:**

  3.0.0+
  
**示例:**

  ````
uexWidget.cbGetOpenerInfo=function(opId,dataType,data){
	alert('opid:'+opId+',dataType:'+dataType+',data:'+data);
}
  ````
  
> ### cbGetPushInfo 获取推送消息的回调方法

  
  
 ` uexWidget.cbGetPushInfo(opId,dataType,data)`
 
**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|-------|
|opId|Number|是|操作ID，在此函数中不起作用，可忽略|
|dataType|Number|是|参数类型|
|data|String|是|返回的数据 json格式字符串|

```
根据iOS平台推送的特殊性，推送服务器发出的推送的json格式为
var data={
	aps{
		alert:,//推送消息的标题
		badge:,//应用图标上显示的通知数
		sound:,//收到推送消息的声音文件
		userInfo:,//推送收到的数据
	}
}
```

**平台支持:**

  Android2.2+
  iOS6.0+
  
**版本支持:**

  3.0.0+
**示例:**

  ````
uexWidget.cbGetPushInfo=function(opId,dataType,data){
	alert('opid:'+opId+',dataType:'+dataType+',data:'+data);
}
  ````
> ### cbGetPushState 获取推送状态的回调方法

  
  
`  uexWidget.cbGetPushState(opId,dataType,data)`

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|-------|
|opId|Number|是|操作ID，在此函数中不起作用，可忽略|
|dataType|Number|是|参数类型|
|data|Number|是|0-关闭 1-开启|

**平台支持:**

  Android2.2+
  
  iOS6.0+
  
**版本支持:**

  3.0.0+
**示例:**

  ````
uexWidget.cbGetPushState=function(opId,dataType,data){
	alert('opid:'+opId+',dataType:'+dataType+',data:'+data);
}
  ````

> ### cbIsAppInstalled 是否安装某第三方应用的回调方法

  
  
`  uexWidget.cbIsAppInstalled(json);`

**参数:**

   ````
   var json = {
    installed://返回结果，0-已安装；1-未安装。
}
   ````
   
 **平台支持:**
 
  Android 2.2+
  iOS 6.0+
  
**版本支持:**

  3.0.0+
  
**示例:**

   ````
   uexWidget.cbIsAppInstalled = function(info){
        var result = JSON.parse(info);
        if(result.installed == 0){
            alert('installed');
        }else{
            alert('not installed');
        }
    }
   ````
   
> ### cbStartApp 启动第三方应用的回调方法

  启动第三方应用的回调方法，该方法在未成功调用第三方应用时回调。
  
`uexWidget.cbStartApp(info);`

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|-------|
|info|String|是|回调信息内容|
  
 **平台支持:**
 
  Android 2.2+
  
  
**版本支持:**

  3.0.0+
  
**示例:**  

  ````
  	uexWidget.cbStartApp = function(info){
        alert(info);
    }
  ````

> ### cbGetMBaaSHost 获取MBaaS主机内容的回调方法
  
`  uexWidget.cbGetMBaaSHost(opId,dataType,data)`

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|-------|
|opId|Number|是|操作ID，在此函数中不起作用，可忽略|
|dataType|Number|是|参数类型|
|data|String|是|返回的MBaaS主机内容|

**平台支持:**

  Android2.2+
  
  iOS6.0+
  
**版本支持:**

  3.3.1+

**示例:**

  ````
uexWidget.cbGetMBaaSHost=function(opId,dataType,data){
	alert('opid:'+opId+',dataType:'+dataType+',data:'+data);
}
  ````
  
## 2.3 监听方法

* 所有的监听方法都得在root页面进行监听
  
> ### onLoadByOtherApp 被第三方应用调起的监听方法

  
  
`  uexWidget.onLoadByOtherApp(jsonData)`

**参数:**

      jsonData:(String类型) 必选  传递的数据，json格式为：{"key1":"value1","key2":"value2","key3":"value3","key4":"value4"}
      
**版本支持:**
  3.0.0+
**示例:**


```
第三方应用调用appcan应用示例代码：
    Android调用方式:
    Intent intent = new Intent(Intent.ACTION_MAIN); 
    intent.addCategory(Intent.CATEGORY_LAUNCHER); 
    ComponentName cn = new ComponentName("org.zywx.wbpalmstar.widgetone.uex11352778", "org.zywx.wbpalmstar.engine.EBrowserActivity"); 
    //其中"org.zywx.wbpalmstar.widgetone.uex11352778"为appcan应用的包名
    intent.setComponent(cn);
    Bundle bd=new Bundle();
    bd.putString("key1","value1");
    bd.putString("key2","value2");
    bd.putString("key3","value3");
    bd.putString("key4","value4");
    intent.putExtras(bd);
    startActivity(intent);
  
    iOS调用方式:
    NSString * url = @"AppCanPlugin://AppCan?k1=v1&k2=v2&k3=v3&k4=v4";
    //AppCanPlugin是appcan应用的scheme
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]];

```
```
应用入口页面注册监听代码：

    function onLoadByOtherApp(jsonData){
        alert(jsonData);
    } 

```
> ### onSuspend 程序挂起的监听方法

  
  
  `uexWidget.onSuspend()`
  

**参数:**
  无
  
**平台支持:**
 
  Android 2.2+
  iOS 6.0+
  
**版本支持:**

  3.0.0+
  
**示例:**

```
uexWidget.onSuspend = function(){
	alert("程序挂起");
}
```
  
> ### onResume 程序恢复的监听方法

  
  
`  uexWidget.onResume()`

**参数:**
  无
 
   **平台支持:**
 
  Android 2.2+
  
  iOS 6.0+
  
**版本支持:**

  3.0.0+
  
  **示例:**
  
```
uexWidget.onResume = function(){
	alert("程序恢复");
}

```
  

  
