[TOC]
# 1、简介
管理当前应用

# 2、API概览

* 以下的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统
* 以下的所有API默认在引擎版本**4.0.0+**可用.
* 特殊情况会单独进行说明.


## 2.1、方法

### 🍭 startWidget 加载一个widget 

`uexWidget.startWidget(data,cb)`

**说明:**

在当前widget加载一个子widget	

**参数:**

data为Object类型,包含要加载的widget的一些信息,各字段含义如下

| 参数名称         | 参数类型   | 是否必选 | 说明                                       |
| ------------ | ------ | ---- | ---------------------------------------- |
| appId        | String | 是    | 子widget的appId                            |
| animId       | String | 是    | 子widget载入时的动画id,详见CONSTANT中WindowAnimiID |
| funcName     | String | 否    | 方法名,子widget结束时将String型的任意字符回调给该方法,可为空. 注意:只在主窗口中有效,浮动窗口中无效 |
| info         | String | 否    | 传给子widget的信息                             |
| animDuration | String | 否    | 动画持续时长,单位为毫秒,默认200毫秒                     |

cb为加载widget的回调函数,拥有一个Number类型的参数error,error为0表示加载成功,非0时表示加载失败


**返回值:**

Bool类型,true表示成功,false表示失败

**示例:**

```javascript
var data = {
  appId:'12345',
  animId:'1',
  funcName:'widgetDidFinish',
  info:'open a widget',
  animDuration:300
}

uexWidget.startWidget(data,function(error){
	if(!error){
		alert("加载成功!");
	}
});
```


### 🍭 finishWidget 退出一个widget

  

`  uexWidget.finishWidget(json)`

**说明:**

  退出一个widget.

**参数:**


| 参数名称       | 参数类型   | 是否必选 | 说明                                       |
| ---------- | ------ | ---- | ---------------------------------------- |
| resultInfo | String | 否    | 此widget结束时,传递给opener的信息                  |
| appId      | String | 否    | 要结束的widget的appId,为空时退出的是当前的widget        |
| finishMode | Number | 否    | 结束此widget的方式,0表示销毁该widget,下次再调 用startWidget时,重新打开;1表示把该widget置于后 台,下次再调用startWidget时,不重新打开,操作数据 全部保存.不传或为空时,默认为0. |

**示例:**

```javascript

  uexWidget.finishWidget({
    resultInfo:"finish a widget",
    appId:"12345",
    finishMode:0
  });

```
### 🍭 removeWidget 删除一个widget

`  uexWidget.removeWidget(appId)`

**说明:**

删除一个widget.

**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明                         |
| ----- | ------ | ---- | -------------------------- |
| appId | String | 是    | widget的appId,主widget不能被删除. |

**返回值:**

Bool 类型,true表示成功,false表示失败

**示例:**


```javascript
var result=uexWidget.removeWidget("12345");
```

### 🍭 checkUpdate 检查更新

`  uexWidget.checkUpdate(callback)`

**说明:**

检查当前widget是否有更新.

**参数:**

| 参数名称     | 参数类型     | 是否必选 | 说明   |
| -------- | -------- | ---- | ---- |
| callback | Function | 是    |      |

**回调参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明                             |
| ----- | ------ | ---- | ------------------------------ |
| error | Json对象 | 是    | error 为对象,!error表示请求成功         |
| data  | Json对象 | 是    | data.result : 0- 需要更新 1- 不需要更新 |

**data 参数:**

| 参数名称    | 参数类型     | 是否必选 | 说明               |
| ------- | -------- | ---- | ---------------- |
| result  | Number类型 | 是    | 0- 需要更新 1- 不需要更新 |
| name    | String类型 | 是    |                  |
| size    | String类型 | 是    |                  |
| url     | String类型 | 是    |                  |
| version | String类型 | 是    |                  |

**示例:**

```javascript
uexWidget.checkUpdate(function(error,data){
  	//error 为对象,!error表示请求成功
  	if(!error){
      if(data.result==0){
        //需要更新
      }else{
        //不需要更新
      }
  	}
});
```
### 🍭 loadApp 启动第三方应用(iOS)

 ` uexWidget.loadApp(scheme)`

**说明:**

* 根据URLScheme启动一个第三方应用 .
* 对于AppCan应用,可以根据[UrlScheme配置](http://newdocx.appcan.cn/newdocx/docx?type=1505_1291#type="URLSCHEME" urlScheme管理(仅iOS) "UrlScheme配置")配置URLScheme
* 假设应用A中拥有一个`scheme1`的URLScheme,在另一个应用B中,通过方法`uexWidget.loadApp('scheme1://');`即可打开应用A
* **此接口仅支持*iOS*平台**

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明              |
| ------ | ------ | ---- | --------------- |
| scheme | String | 是    | 第三方应用的URLScheme |

**返回值:**

Boolean类型,true为成功,false为失败

**示例:**


```javascript
var scheme = "weixin://";//微信的URLScheme
uexWidget.loadApp(scheme);
```
### 🍭 startApp 启动第三方应用(Android)

`uexWidget.startApp(startMode,mainInfo,addInfo,optInfo,extra)`

**说明:**

根据相关信息启动一个第三方应用.

* **此接口仅支持*Android*平台**

**参数:**

| 参数名称      | 参数类型   | 是否必选 | 说明                                       |
| --------- | ------ | ---- | ---------------------------------------- |
| startMode | String | 是    | 启动方式,0表示通过包名和类名启动,1表示通过Action启动.         |
| optInfo   | String | 否    | 附加参数,键值对,{key:value}格式多个用英文","隔开,如:"{'key1':'value1'},{'key2':'value1'}". |

**startMode为0**

| 参数名称     | 参数类型   | 是否必选 | 说明            |
| -------- | ------ | ---- | ------------- |
| mainInfo | String | 是    | 包名            |
| addInfo  | String | 否    | 类名,为空时启动应用入口类 |
| extra    | String | 否    | json格式如下:     |
```
{
    "data": "http://www.baidu.com",
    "isNewTask": "0"
}
```
各字段含义如下:

| 参数        | 是否必须 | 说明                                       |
| --------- | ---- | ---------------------------------------- |
| data      | 否    | data属性                                   |
| isNewTask | 否    | 启动第三方Activity时,值为0,不使用NEW_TASK,值不为0,使用NEW_TASK,默认使用NEW_TASK |

**startMode为1**

| 参数名称     | 参数类型   | 是否必选 | 说明                      |
| -------- | ------ | ---- | ----------------------- |
| mainInfo | String | 是    | action                  |
| addInfo  | String | 否    | category或data,json格式如下: |
```json
{
    "category": [
        "android.intent.category.WID",
        "android.intent.category.WID1"
    ],
    "data": {
        "mimeType": "image/png",//可选
        "scheme": "sip"
    }
}
```
各字段含义如下:

| 参数       | 是否必须 | 说明         |
| -------- | ---- | ---------- |
| category | 否    | category属性 |
| data     | 否    | data属性     |
| mimeType | 否    | mimeType属性 |
| scheme   | 否    | scheme属性   |

**注意事项:**

如果通过包名类名启动AppCan应用,而且需要监听onLoadByOtherApp回调方法,则addInfo为必选.调用方法如下:
若包名为com.appcan.develop(开发者在使用时只需要更换包名即可),则调用代码如下:

```javascript
var packageName = "com.appcan.develop";
var className = "org.zywx.wbpalmstar.engine.EBrowserActivity";
var optInfo = "{'key1':'value1'},{'key2':'value1'}";
uexWidget.startApp(0,packageName,className,optInfo);
```


**返回值:**

Boolean类型,true为成功,false为失败

**示例:**
  1.要启动的AndroidManifest.xml文件如下:

```xml
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
//通过包名启动,<intent-filter>标签非必须
            <intent-filter>
                <action android:name="com.djf.test.second" ></action>
//通过action启动时,category DEFAULT属性必须,否则无法调起
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
  2.启动该应用对应界面示例如下:

```html
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
3.指定用QQ浏览器打开链接:

```javascript
var optInfo = "{'key1':'value1'},{'key2':'value1'}";
var extra='{data:"http://www.appcan.cn/"}';
uexWidget.startApp(0, "com.tencent.mtt","com.tencent.mtt.MainActivity",optInfo,extra);
```
4.指定用 系统浏览器（android） 打开链接：
```javascript
var value;
       appcan.ready(function() {
       value = uexWidgetOne.platformName;
function openth() {
            if (value == "android") {
                uexWidget.startApp("1", "android.intent.action.VIEW", '{"data":{"mimeType":"text/html","scheme":"http://www.appcan.cn"}}');
            } else {
                uexWidget.loadApp("http://www.appcan.cn");
            }
        }
        })
//注意：mimeType参数可选，不传则会弹出一个选择框，提示用户选择哪个浏览器打开，但是会兼容所有的系统；如果加上此参数，就可以实现直接启动系统浏览器打开，但是有可能不兼容华为设备系统；
```
### 🍭 getOpenerInfo 获取widget的相关信息

 ` uexWidget.getOpenerInfo()`

**说明:**

获取打开者传入此widget的相关信息.即调用startWidget时传入的info参数值.

**参数:**

无

**返回值:**

String类型 本widget的打开者通过startWidget函数打开本widget时传入的info参数值



**示例:**

```javascript
 var result=uexWidget.getOpenerInfo()
```

### 🍭 installApp 安装apk

 ` uexWidget.installApp(appPath)`

**说明:**

  根据安装包所在路径安装一个apk.

* **此接口仅支持*Android*平台**

**参数:**

| 参数名称    | 参数类型   | 是否必选 | 说明      |
| ------- | ------ | ---- | ------- |
| appPath | String | 是    | apk所在路径 |

**示例:**

```javascript
 var path = "res://pay.apk"; 
 uexWidget.installApp(path);
```
### 🍭 getPushInfo 获取推送消息  

 ` uexWidget.getPushInfo(type)`

**说明:**

获取推送消息,上报消息到管理后台

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明                                       |
| ---- | ------ | ---- | ---------------------------------------- |
| type | String | 否    | 想要获取的推送消息内容类型,0:具体的推送内容,1:包含推送标题等其他推送消息的JSON字符串,默认值为0 |

**返回值:**

String类型,返回的数据 json格式字符串

```javascript
根据iOS平台推送的特殊性,推送服务器发出的推送的json格式为
var data={
    aps{
        alert:,//推送消息的标题
        badge:,//应用图标上显示的通知数
        sound:,//收到推送消息的声音文件
        userInfo:,//推送收到的数据
    }
}
```

**示例:**

```javascript
var data=uexWidget.getPushInfo();
```
### 🍭 setPushNotifyCallback 设置Push消息到达时的回调函数

 `   uexWidget.setPushNotifyCallback(cbFunction)`

**说明:**

如果应用开启了推送功能,那么当有消息推送进来时,平台将调用指定的cbFunction函数通知页面.

**参数:**

| 参数名称       | 参数类型     | 是否必选 | 说明   |
| ---------- | -------- | ---- | ---- |
| cbFunction | Function | 是    | 回调函数 |

**示例:**

```javascript
uexWidget.setPushNotifyCallback(function pushCallback(){
	alert("收到推送消息");
});
```
### 🍭setPushInfo 设置推送用户信息

`  uexWidget.setPushInfo(json)`

**说明:**

设置推送用户信息

**参数:**

| 参数名称     | 参数类型   | 是否必选 | 说明   |
| -------- | ------ | ---- | ---- |
| userId   | String | 是    | 用户ID |
| userName | String | 是    | 用户昵称 |

**示例:**

```javascript
uexWidget.setPushInfo({
  userId:'user10001',
  userName:'姓名'
});
```

### 🍭 setPushState 设置推送服务的状态

  `uexWidget.setPushState(state)`

**说明:**

设置推送服务的状态

**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明              |
| ----- | ------ | ---- | --------------- |
| state | Number | 是    | 推送服务状态0-关闭 1-开启 |


**示例:**

```
uexWidget.setPushState(0);

```
### 🍭 getPushState 获取推送服务的状态

 ` uexWidget.getPushState()` 

**说明:**

获取推送服务的状态

**参数:**

无

**返回值:**

Bool 类型,true为开启,false为关闭

**示例:**

```javascript
var reuslt=uexWidget.getPushState()
```

### 🍭 isAppInstalled 是否安装某第三方应用

 ` uexWidget.isAppInstalled(json)`

**说明:**

  是否安装某第三方应用

* 在iOS9.0+的系统上,只有在URLScheme白名单内的应用才会被正确的检测是否安装.检测在URLScheme白名单外的应用会一律返回未安装的结果.

**参数:**


````javascript
 var json = {
    appData://(必选) 第三方应用数据,android平台为第三方应用包名;iOS平台为 Scheme Url
 } 
````

**返回值:**

Boolean类型返回值:当应用已安装时会返回`true`,当应用未安装或者调用接口的参数错误时会返回`false`


**示例:**

````javascript
 var param1 = {
        appData:'com.tencent.mobileqq'//判断手机上是否安装qq应用
    };
 var data1 = JSON.stringify(param1);
 uexWidget.isAppInstalled(data1);
````


### 🍭 closeLoading 关闭loading图

 ` uexWidget.closeLoading()`

**说明:**

关闭启动图.用于应用启动期间需要做页面跳转等逻辑.需要在config.xml 添加 `<removeloading>true</removeloading>`配置. 添加之后引擎不会关闭启动图,由前端调用此接口关闭,超时(时间为3秒)之后引擎才会关闭启动图.

**参数:**

无

**版本支持:**

4.0.0+

**示例:**

```
  uexWidget.closeLoading();
```

### 🍭 moveToBack 运行到后台,不退出程序

 ` uexWidget.moveToBack()`

**说明:**

  程序将会在后台运行,不退出.

* **此接口仅支持*Android*平台**

**参数:**

无

**示例:**

  ````
    uexWidget.moveToBack();
  ````

### 🍭 reloadWidgetByAppId 根据appId重载widget

`uexWidget.reloadWidgetByAppId(appId);`

**说明**

在子widget更新完成时调用可加载更新的html、js、css

**参数**

   appId:子widget对应的appId(必选)


**示例**

````
uexWidget.reloadWidgetByAppId(sdk2015);
````

### 🍭 setKeyboardMode 设置键盘模式

`uexWidget.setKeyboardMode(json)`

**说明:**

设置键盘模式.

* **此接口仅支持*Android*平台**

**参数:**

````javascript
 var json = {
    mode://(必选) Number类型 0:压缩模式 1:平移模式
 } 
````

**示例:**

````javascript
uexWidget.setKeyboardMode({
    mode:0
};);
````

### 🍭 getMBaaSHost 获取MBaaS主机内容

 ` uexWidget.getMBaaSHost()`

**说明:**

  获取MBaaS主机内容


**返回值:**

String类型,MBaaS主机内容

**示例:**

```javascript
  var result = uexWidget.getMBaaSHost()
```

### 2.2 监听方法

* ***所有的监听方法都得在root页面进行监听***

### 🍭 onLoadByOtherApp 被第三方应用调起的监听方法

  

`  uexWidget.onLoadByOtherApp(jsonData)`

**参数:**

jsonData:(String类型) 必选  传递的数据,json格式为:

```
{
"key1":"value1",
"key2":"value2",
"key3":"value3",
"key4":"value4"
}
```

**示例:**

第三方应用调用appcan应用示例代码:

```java

    //Android调用方式:
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
```
```swift
    
    //iOS调用方式:
    NSString * url = @"scheme1://AppCan?key1=value1&key2=value2&key3=value3&key4=value4";
    //'scheme1'是appcan应用设置的的URLScheme
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]];

```
应用入口页面注册监听代码:
```
function onLoadByOtherApp(jsonData){
	alert(jsonData);
} 
```
### 🍭 onSuspend 程序挂起的监听方法

`uexWidget.onSuspend()`

**参数:**
  无

**示例:**

```
uexWidget.onSuspend = function(){
	//程序挂起
}
```

### 🍭 onResume 程序恢复的监听方法

`uexWidget.onResume()`

**参数:**
  无

**示例:**

```
uexWidget.onResume = function(){
	//程序恢复
}

```



