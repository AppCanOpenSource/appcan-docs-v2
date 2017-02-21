
[TOC]

#1､简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

极光推送插件
##1.1､说明
封装了极光推送的相关功能:您可以主动､及时地向您的用户发起交互,向其发送聊天消息､日程提醒､活动预告､进度提示､动态更新等,精准的目标用户和有价值的推送内容可以提升用户忠诚度,提高留存率与收入.

**温馨提示:**
* 集成打包之前需要在 config.xml 配置参数,否则打包失败.若打包平台不支持config.xml配置,用户需要自定义插件进行使用,详见**[附录](#-3-ignore- "附录")**
* 插件需要用到证书/包名,因此IDE打包下部分功能无法正常使用,**调试使用本插件时,请使用在线打包**.
* 本插件为单例插件,用户可以在任意界面调用插件的接口,但回调始终传回给root页面.
* iOS版极光插件,使用之前须在config.xml配置推送权限,[配置文档](http://newdocx.appcan.cn/newdocx/docx?type = 1812_1291#推送配置)

**插件集成使用说明:**(已集成到平台[公共插件](/dev-guide/platform-services/app-dev#-4-5-ignore-),直接勾选打包)

##1.2､开源源码
[点击](http://plugin.appcan.cn/details.html?id = 432_index)插件中心至插件详情页(测试用例与插件源码已经提供)


## 1.3､平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统. 
有特殊版本要求的API会在文档中额外说明.

## 1.4､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明. 


#2､API概览
##2.1､方法

### 🍭 stopPush  停止推送服务,仅支持Android

`uexJPush.stopPush()`

**参数**

```
无
```

**平台支持**

Android 4.0+

**示例**

```javascript
uexJPush.stopPush();
```

### 🍭 resumePush  恢复推送服务,仅支持Android

`uexJPush.resumePush()`

**参数**

```
无
```

**平台支持**

Android 4.0+

**示例**

```javascript
uexJPush.resumePush();
```

### 🍭 setAlias   设置别名

`uexJPush.setAlias(json, callbackFunction)`

**说明**

设置别名, 操作完成后会回调`callbackFunction`

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明   |
| ---------------- | -------- | ---- | ---- |
| json             | Object   | 是    | 传入参数 |
| callBackFunction | Function | 是    | 回调函数 |

```javascript
var json = {
	alias:,//String 设置的别名
}
```
说明:传""(空字符串)表示取消之前的设置.
  每次调用设置有效的别名,覆盖之前的设置.
  有效的别名组成:字母(区分大小写)､数字､下划线､汉字.
  限制:alias 命名长度限制为 40 字节.(判断长度需采用UTF-8编码)

**回调参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明                       |
| ----- | ------ | ---- | ------------------------ |
| error | Number | 是    | 0-成功,非0-失败 具体失败代码解释见文末附录 |
| data  | Object | 是    | 回调数据,形式见下:               |

```javascript
var data = {
       alias://设置的别名
  };
```

**示例**

```javascript
var json = {
	alias:"alias22"
};
uexJPush.setAlias(json, function(error,data) {
   if(!error){
        alert(JSON.stringify(data));
   }else{
        alert("设置失败");
   }
});
```

### 🍭 setTags  设置标签

`uexJPush.setTags(json, callbackFunction)`

**说明**

设置标签, 操作完成后会回调`callbackFunction`

**参数**

| 参数名称             | 参数类型     | 是否必选 | 说明   |
| ---------------- | -------- | ---- | ---- |
| json             | Object   | 是    | 传入参数 |
| callBackFunction | Function | 是    | 回调函数 |

```javascript
var json = {
	tags:,//Set<String>  设置的标签
};
```
说明:空数组或列表表示取消之前的设置.
每次调用设置有效的标签,覆盖之前的设置.
有效的标签组成:字母(区分大小写)､数字､下划线､汉字.
限制:每个tag命名长度限制为 40 字节,最多支持设置 100 个 tag,但总长度不得超过1K字节.(判断长度需采用UTF-8编码)


**回调参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明                       |
| ----- | ------ | ---- | ------------------------ |
| error | Number | 是    | 0-成功,非0-失败 具体失败代码解释见文末附录 |
| data  | Object | 是    | 回调数据,形式见下:               |

```javascript
var data = {
    tags://设置的标签
}
```

**示例**

```javascript
var tags = new Array("tag1","tag2","tag3");
var json = {
	tags:tags
};
uexJPush.setTags(json, function(error,data) {
	if(!error){
        alert(JSON.stringify(data));
   }else{
        alert("设置失败");
   }
});
```

### 🍭 setAliasAndTags  同时设置别名与标签

`uexJPush.setAliasAndTags(json, callbackFunction)`

**说明**

同时设置别名与标签, 执行完成后回调`callbackFunction`

**参数**

| 参数名称             | 参数类型     | 是否必选 | 说明   |
| ---------------- | -------- | ---- | ---- |
| json             | Object   | 是    | 传入参数 |
| callBackFunction | Function | 是    | 回调函数 |

```javascript
var json = {
	alias:,//string 设置的别名
	tags:,//Set<String> 设置的标签
}
```

**回调参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明                       |
| ----- | ------ | ---- | ------------------------ |
| error | Number | 是    | 0-成功,非0-失败 具体失败代码解释见文末附录 |
| data  | Object | 是    | 回调数据,形式见下:               |

```javascript
var data = {
    alias://设置的别名
    tags://设置的标签
};
```

**示例**

```javascript
var tags = new Array("tag4","tag5","tag6");
var json = {
	alias:"alias66",
	tags:tags
};
uexJPush.setAliasAndTags(json, function(error,data) {
	if(!error){
        alert(JSON.stringify(data));
   }else{
        alert("设置失败");
   }
});
```

### 🍭 getRegistrationID 取得应用程序对应的 RegistrationID

`uexJPush.getRegistrationID()`

**说明**

取得应用程序对应的 RegistrationID, 调用后同步返回结果, 返回值是`String`类型

**参数**

```
无
```

**示例**

```javascript
var id = uexJPush.getRegistrationID();
alert(id);
```

### 🍭 clearAllNotifications 清除所有通知,仅支持Android

`uexJPush.clearAllNotifications()`

**参数**

```
无
```

**平台支持**

Android 4.0+

**示例**

```
uexJPush.clearAllNotifications();
```

### 🍭 clearNotificationById  根据Id清除某条通知,仅支持Android

`uexJPush.clearNotificationById(json)`

**参数**

```javascript
var json = {
	notificationId:,//int 通知Id
}
```

**平台支持**

Android 4.0+

**示例**

```javascript
var params = {
	notificationId:123456789
};
var data = JSON.stringify(params);
uexJPush.clearNotificationById(data);
```

### 🍭 getConnectionState 获取推送连接状态

`uexJPush.getConnectionState(callbackFunction)`

**说明**
获取推送连接状态,获取状态成功后回调`callbackFunction`

**参数**

```
无
```

**回调参数:**

```javascript
var callbackFunction = function(error){}
```

| 参数名称  | 参数类型   | 是否必选 | 说明             |
| ----- | ------ | ---- | -------------- |
| error | Number | 是    | 0: 已连上, 1: 未连接 |

**示例**

```javascript
uexJPush.getConnectionState(function(error) {
	if(!error){
        alert("已连上");
   }else{
        alert("未连接");
   }
});
```

### 🍭 addLocalNotification  添加一个本地通知

`uexJPush.addLocalNotification(json)`

**参数**

| 参数名称 | 参数类型   | 是否必选 | 说明   |
| ---- | ------ | ---- | ---- |
| json | Object | 是    | 传入参数 |

```javascript
var json = {
	builderId:,//long 设置本地通知样式(仅Android有效)
	title:,//本地通知的title
	content:,//设置本地通知的content
	extras:,//额外的数据信息extras为json字符串
	notificationId:,//int 设置本地通知的ID
	broadCastTime:,//long 设置本地通知延迟触发时间,毫秒为单位,如设置10000为延迟10秒添加通知
};
```

**示例**

```javascript
var json = {
	builderId:0,
	title:"这是title",
	content:"这是内容",
	extras:{"key":"value"},
	notificationId:3,
	broadCastTime:10000
};
uexJPush.addLocalNotification(json);
```

### 🍭 removeLocalNotification 移除一个本地通知

`uexJPush.removeLocalNotification(json)`

**参数**

| 参数名称 | 参数类型   | 是否必选 | 说明   |
| ---- | ------ | ---- | ---- |
| json | Object | 是    | 传入参数 |

```javascript
var json = {
	notificationId://int 通知id
};
```

**示例**

```javascript
var notificationId = 3;
var json = {
	notificationId:notificationId
};
uexJPush.removeLocalNotification(json);
```

### 🍭 clearLocalNotifications  移除所有的通知

`uexJPush.clearLocalNotifications()`

**参数**

```
无
```

**示例**

```
uexJPush.clearLocalNotifications();
```

### 🍭 setBadgeNumber  设置badge值,仅支持iOS

`uexJPush.setBadgeNumber(badgeNumber)`

**参数**

| 参数名称        | 参数类型   | 是否必选 | 说明              |
| ----------- | ------ | ---- | --------------- |
| badgeNumber | Number | 是    | 要设置的badge值,非负整数 |

**示例**

```
uexJPush.setBadgeNumber(0);
```

### 🍭 showNotificationAlertInForeground 设置应用在前台时是否显示通知气泡

`uexJPush.showNotificationAlertInForeground(flag)`

**说明**

***此接口仅 iOS 拥有,仅在iOS 10.0+系统上有效*** , 

对于IOS 10之前的系统版本,收到通知不会有任何提示

对于iOS 10及之后的系统版本,默认应用在前台时显示通知气泡

本接口可以更改此默认设置

**参数**

| 参数名称 | 参数类型    | 是否必选 | 说明                      |
| ---- | ------- | ---- | ----------------------- |
| flag | Boolean | 是    | true - 显示 , false - 不显示 |

**平台支持**

iOS 4.0.1+



**示例**

```
uexJPush.showNotificationAlertInForeground(true);
```

##2.2､监听方法

### 🍭 onReceiveMessage 收到了自定义消息

`uexJPush.onReceiveMessage(json)`

**参数**

```javascript
var json = {
	message:,//String 对应 Portal 推送消息界面上的"自定义消息内容"字段
	extras:,// 对应 Portal 推送消息界面上的"可选设置"里的附加字段	
};
```


**示例**

```javascript
window.uexOnload = function(type){
	uexJPush.onReceiveMessage = function(data){
		alert(data);
	}
}
```

### 🍭 onReceiveNotification 收到了通知

`uexJPush.onReceiveNotification(json)`

**参数**

```javascript
var json = {
	content:,//对应 Portal 推送通知界面上的"通知内容"字段.
	extras:,//对应 Portal 推送消息界面上的"可选设置"里的附加字段.
	notificationId:,//(仅Android以及iOS本地通知) 消息Id,用于清除通知
	isAPNs:,//(仅iOS)本通知是否由APNs服务发出 true/false  
};
```

**示例**

```javascript
window.uexOnload = function(type){
	uexJPush.onReceiveNotification = function(data){
		alert(data);
	}
}
```

### 🍭 onReceiveNotificationOpen  用户点击了通知

`uexJPush.onReceiveNotificationOpen(json)`

**参数**

```javascript
var param = {
	content:,//对应 Portal 推送通知界面上的"通知内容"字段.
	extras:,//对应 Portal 推送消息界面上的"可选设置"里的附加字段.
	notificationId:,//(仅Android)消息Id,可以用于清除通知
	isAPNs:,//(仅iOS)本通知是否由APNs服务发出 true/false 
};
```

**示例**

```javascript
window.uexOnload = function(type){
	uexJPush.onReceiveNotificationOpen = function(data){
		alert(data);
	}
}
```

### 🍭 onReceiveConnectionChange  连接状态变化

`uexJPush.onReceiveConnectionChange(json)`

**参数**

```javascript
var json = {
	connect:,//0-已连接上,1-未连接
};
```


**示例**

```javascript
window.uexOnload = function(type){
	uexJPush.onReceiveConnectionChange = function(data){
		alert(data);
	}
}
```

### 🍭 onReceiveRegistration  应用程序注册监听

`uexJPush.onReceiveRegistration(json)`

**参数**

```javascript
var json = {
	title:,//RegistrationID
};
```

**示例**


```javascript
window.uexOnload = function(type){
	uexJPush.onReceiveRegistration = function(data){
		alert(data);
	}
}
```
#3､附录

##3.1､别名/标签 错误代码解释
| error | 描述                   | 详细解释                        |
| ----- | -------------------- | --------------------------- |
| 6001  | 无效的设置                | tag/alias 不应参数都为 null       |
| 6002  | 设置超时                 | 建议重试                        |
| 6003  | alias 字符串不合法         | alias必须只包含字母､数字､下划线､汉字      |
| 6004  | alias超长              | alias的utf8编码最多为40个字节        |
| 6005  | 某一个 tag 字符串不合法       | tag必须只包含字母､数字､下划线､汉字        |
| 6006  | 某一个 tag 超长           | tag的utf8编码最多为40个字节          |
| 6007  | tags 数量超出限制          | 每台设备最多拥有100个标签              |
| 6008  | tags/alias 设置超出总长度限制 | 单次设置tags/alias的总长度最多 1K 字节 |
| 6011  | 短时间内操作过于频繁           | 10s内设置tag或alias大于10次        |




##3.2､ 通知/自定义消息/本地通知的接收情况
| 操作系统    | 通知                | 自定义消息      | 本地通知              |
| ------- | ----------------- | ---------- | ----------------- |
| Andriod | 前台/后台 均能接收        | 前台/后台 均能接收 | 前台/后台 均能接收        |
| iOS     | 前台/后台/进程关闭状态 均能接收 | 仅前台能接收     | 前台/后台/进程关闭状态 均能接收 |






##3.3､ Android插件配置说明
**如果不使用config.xml配制方法,那么本插件需要下载插件包配置`AndroidManifest.xml`文件后作为自定义插件上传才能正常使用.(只针对未升级打包服务的企业用户)**

插件需要在`AndroidManifest.xml`中查找替换所有的`$UEXJPUSH_PACKAGE$`改为自己的包名(一共应该是五处).

并将`$UEXJPUSH_APPKEY$`替换为自己在极光推送申请的appkey

##3.4､ iOS插件配置说明
**如果不使用config.xml配制方法,那么本插件需要下载插件包配置`PushConfig.plist`文件后作为自定义插件上传才能正常使用.**

所需配置的文件为插件包解压缩后的文件夹中的`uexJPushGroup\PushConfig.plist`.
键值说明:

```
CHANNEL
指明应用程序包的下载渠道,为方便分渠道统计.根据你的需求自行定义即可.

APP_KEY
在管理Portal上创建应用时自动生成的(AppKey)用以标识该应用.请确保应用内配置的 AppKey 与在 Portal 上创建应用时生成的 AppKey 一致,AppKey 可以在应用详情中查询.

APS_FOR_PRODUCTION
表示应用是否采用生产证书发布( Ad_Hoc 或 APP Store ),0 (默认值)表示采用的是开发者证书,1 表示采用生产证书发布应用.请注意此处配置与 Web Portal 应用环境设置匹配.

```

##3.5 通过config.xml配置插件的方法

* 将配置代码添加到`config.xml`中即可完成插件配置,无需进行自定义插件相关步骤
* 详见[打包服务器公测](http://newdocx.appcan.cn/newdocx/docx?type = 1472_1291)
* 该公测已完成,现在也支持正式版大众打包服务器

#### Android

示例配置代码如下:

```xml
<config desc="uexJPush" type="KEY">
	<param platform="Android" name="$UEXJPUSH_PACKAGE$" value="org.zywx.wbpalmstar.widgetone.uexJPushDemo"/>
	<param platform="Android" name="$UEXJPUSH_APPKEY$" value="e905af7390a3413439d24377"/>
</config>
```
**只需修改value的值**即可完成相应key的配置,其中

```
$UEXJPUSH_PACKAGE$  ----->packageName 填自己应用的包名
$UEXJPUSH_APPKEY$ -----> AppKey 填极光推送官网申请的AppKey

```

#### iOS
示例配置代码如下:

```xml
<config desc="uexJPush" type="KEY">
    <param platform="iOS"  file="uexGroupfolder/PushConfig.plist" name="$UEXJPUSH_APP_KEY$" value="29f3d28136125dad137a42df"/>
    <param platform="iOS"  file="uexGroupfolder/PushConfig.plist" name="$UEXJPUSH_PUSH_CHANNEL$" value="TestPush"/>
    <param platform="iOS"  file="uexGroupfolder/PushConfig.plist" name="$UEXJPUSH_APS_ENVIRONMENT$" value="1"/>
</config>
```
**只需修改value的值**即可完成相应key的配置,其中

```
$UEXJPUSH_APP_KEY$  ----->AppKey 填在极光推送官网上注册后得到的AppKey
$UEXJPUSH_PUSH_CHANNEL$ -----> apns推送频道 填任意字符串
$UEXJPUSH_APS_ENVIRONMENT$ ----->推送证书类型   0-开发者证书(developement)  1-发布证书(distribution)
```

#4､更新历史

### iOS

API版本: `uexJPush-4.0.1`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.1 | 更新JPush SDK至3.0.0 |
| 4.0.0 | 极光推送插件 |

### Android

API版本: `uexJPush-4.0.1`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.1 | 修复onReceiveNotificationOpen回调两次的问题 |
| 4.0.0 | 支持function参数传入 |
