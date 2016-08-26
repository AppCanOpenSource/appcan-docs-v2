
[TOC]

#1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

极光推送插件
##1.1、 说明
封装了极光推送的相关功能:您可以主动、及时地向您的用户发起交互,向其发送聊天消息、日程提醒、活动预告、进度提示、动态更新等,精准的目标用户和有价值的推送内容可以提升用户忠诚度,提高留存率与收入.

* 集成打包之前需要在 config.xml 配置参数,否则打包失败.若打包平台不支持config.xml配置,用户需要自定义插件进行使用,详见**[附录](#3、附录 "附录")**
* 插件需要用到证书/包名,因此IDE打包下部分功能无法正常使用,**调试使用本插件时,请使用在线打包**.
* 本插件为单例插件,用户可以在任意界面调用插件的接口,但回调始终传回给root页面.

##1.2、 开源源码
[点击](http://plugin.appcan.cn/details.html?id=432_index)插件中心至插件详情页(测试用例与插件源码已经提供)


## 1.3、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统. 
有特殊版本要求的API会在文档中额外说明.

## 1.4、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明. 


#2、API概览
##2.1、方法

### 🍭 <del>   init  初始化 </del>(已废弃,插件现在自动初始化)

`uexJPush.init()`

**参数**

```
无
```

**示例**

```
uexJPush.init();
```
### 🍭 stopPush  停止推送服务

`uexJPush.stopPush()`

**参数**

```
无
```

**平台支持**  
Android 2.2+

**版本支持**  
Android 3.0.0+


**示例**

```
uexJPush.stopPush();
```

### 🍭 resumePush  恢复推送服务

`uexJPush.resumePush()`

**参数**

```
无
```

**平台支持**  
Android 2.2+

**版本支持**  
Android 3.0.0+


**示例**

```
uexJPush.resumePush();
```

### 🍭 setAlias   设置别名

`uexJPush.setAlias(json, callbackFunction)`

**说明**

设置别名, 操作完成后会回调`callbackFunction`

**参数**

```
var json={
	alias:,//String 设置的别名
};
说明:传""(空字符串)表示取消之前的设置.
	每次调用设置有效的别名,覆盖之前的设置.
	有效的别名组成:字母(区分大小写)、数字、下划线、汉字.
	限制:alias 命名长度限制为 40 字节.(判断长度需采用UTF-8编码)
```

`callbackFunction`的参数是JSON对象类型,格式如下:

```
{
    result://0-成功,其他-失败 具体失败代码解释见文末附录
    alias://设置的别名
};
```

**示例**

```
var params = {
	alias:"alias22"
};
var data = JSON.stringify(params);
uexJPush.setAlias(data, function(data) {
	alert(JSON.stringify(data));
});
```

### 🍭 setTags  设置标签

`uexJPush.setTags(json, callbackFunction)`

**说明**

设置标签, 操作完成后会回调`callbackFunction`

**参数**

```
var json={
	tags:,//Set<String>  设置的标签
};
说明:空数组或列表表示取消之前的设置.
	每次调用设置有效的标签,覆盖之前的设置.
	有效的标签组成:字母(区分大小写)、数字、下划线、汉字.
	限制:每个tag命名长度限制为 40 字节,最多支持设置 100 个 tag,但总长度不得超过1K字节.(判断长度需采用UTF-8编码)
```

`callbackFunction`的参数是JSON对象类型,格式如下:

```
{
    result://0-成功,其他-失败 具体失败代码解释见文末附录
    tags://设置的标签
}
```

**示例**

```
var tags=new Array("tag1","tag2","tag3");
var params = {
	tags:tags
};
var data = JSON.stringify(params);
uexJPush.setTags(data, function(data) {
	alert(JSON.stringify(data));
});
```

### 🍭 setAliasAndTags  同时设置别名与标签

`uexJPush.setAliasAndTags(json, callbackFunction)`

**说明**

同时设置别名与标签, 执行完成后回调`callbackFunction`

**参数**

```
var json={
	alias:,//string 设置的别名
	tags:,//Set<String> 设置的标签
	}
```

`callbackFunction`的参数是JSON对象类型,格式如下:

```
{
    result://0-成功,其他-失败 具体失败代码解释见文末附录
    alias://设置的别名
    tags://设置的标签
};
```

**示例**

```
var tags=new Array("tag4","tag5","tag6");
var params = {
	alias:"alias66",
	tags:tags
};
var data = JSON.stringify(params);
uexJPush.setAliasAndTags(data, function(data) {
	alert(JSON.stringify(data));
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

```
var id = uexJPush.getRegistrationID();
alert(id);
```

### 🍭 clearAllNotifications 清除所有通知

`uexJPush.clearAllNotifications()`

**参数**

```
无
```

**平台支持**

Android 2.2+    

**版本支持**

Android 3.0.0+    

**示例**

```
uexJPush.clearAllNotifications();
```

### 🍭 clearNotificationById  根据Id清除某条通知

`uexJPush.clearNotificationById(json)`

**参数**

```
var json={
	notificationId:,//int 通知Id
}
```

**平台支持**  
Android 2.2+

**版本支持**  
Android 3.0.0+

**示例**

```
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
`callbackFunction`的参数是`Number`类型, 0: 已连上, 1: 未连接

**示例**

```
uexJPush.getConnectionState(function(data) {
	alert(data);
});
```

### 🍭 addLocalNotification  添加一个本地通知

`uexJPush.addLocalNotification(json)`

**参数**

```
var json={
	builderId:,//long 设置本地通知样式(仅Android有效)
	title:,//本地通知的title
	content:,//设置本地通知的content
	extras:,//额外的数据信息extras为json字符串
	notificationId:,//int 设置本地通知的ID
	broadCastTime:,//long 设置本地通知延迟触发时间,毫秒为单位,如设置10000为延迟10秒添加通知
};
```

**示例**

```
var params = {
	builderId:0,
	title:"这是title",
	content:"这是内容",
	extras:{"key":"value"},
	notificationId:3,
	broadCastTime:10000
};
var data = JSON.stringify(params);
uexJPush.addLocalNotification(data);
```

### 🍭 removeLocalNotification 移除一个本地通知

`uexJPush.removeLocalNotification(json)`

**参数**

```
var json={
	notificationId://int 通知id
};
```

**示例**

```
var notificationId=3;
var params = {
	notificationId:notificationId
};
var data = JSON.stringify(params);
uexJPush.removeLocalNotification(data);
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

### 🍭 setBadgeNumber  设置badge值

`uexJPush.setBadgeNumber(badgeNumber)`

**参数**

| 参数名称        | 参数类型   | 是否必选 | 说明              |
| ----------- | ------ | ---- | --------------- |
| badgeNumber | Number | 是    | 要设置的badge值,非负整数 |

**平台支持**  
iOS 6.0+

**版本支持**  
iOS 3.0.4+

**示例**

```

uexJPush.setBadgeNumber(0);

```

### 🍭 disableLocalNotificationAlertView  禁止前台本地通知提示框

`uexJPush.disableLocalNotificationAlertView(flag)`

**说明**

和Android系统不同,在iOS系统中,当APP处于前台时,收到本地通知后,系统不会在屏幕顶部弹出气泡显示通知内容.
于是极光SDK自己设置了一个本地通知提示框,在APP在前台收到本地通知后弹出,显示通知内容.

通过调用此接口,可以禁止或者重新启动此本地通知提示框.

**参数**

| 参数名称 | 参数类型   | 是否必选 | 说明          |
| ---- | ------ | ---- | ----------- |
| flag | Number | 是    | 1-禁止  其他-允许 |

**平台支持**  
iOS 6.0+

**版本支持**  
iOS 3.0.4+


**示例**

```

uexJPush.disableLocalNotificationAlertView(1);

```

##2.2、监听方法

### 🍭 onReceiveMessage 收到了自定义消息

`uexJPush.onReceiveMessage(json)`

**参数**

```
var json={
	message:,//String 对应 Portal 推送消息界面上的"自定义消息内容"字段
	extras:,// 对应 Portal 推送消息界面上的"可选设置"里的附加字段	
};
```


**示例**

```
window.uexOnload=function(type){
	
	uexJPush.onReceiveMessage=function(data){
		alert(data);
	}

	...(其他回调或监听)
}
```

### 🍭 onReceiveNotification 收到了通知

`uexJPush.onReceiveNotification(json)`

**参数**

```
var json={
	content:,//对应 Portal 推送通知界面上的"通知内容"字段.
	extras:,//对应 Portal 推送消息界面上的"可选设置"里的附加字段.
	notificationId:,//(仅Android以及iOS本地通知) 消息Id,用于清除通知
	isAPNs:,//(仅iOS)本通知是否由APNs服务发出 true/false  
};
```

* isAPNs 
  * iOS 3.0.5添加此参数 用以区分是APNs推送(true)还是本地推送(false)
  * Android无此参数,因为Android推送永远不会由APNs服务发出
* iOS 3.0.5+的版本才能捕获本地通知


**示例**

```
window.uexOnload=function(type){
	
	uexJPush.onReceiveNotification=function(data){
		alert(data);
	}

	...(其他回调或监听)
}
```

### 🍭 onReceiveNotificationOpen  用户点击了通知

`uexJPush.onReceiveNotificationOpen(json)`

**参数**

```
var param={
	content:,//对应 Portal 推送通知界面上的"通知内容"字段.
	extras:,//对应 Portal 推送消息界面上的"可选设置"里的附加字段.
	notificationId:,//(仅Android)消息Id,可以用于清除通知
	isAPNs:,//(仅iOS)本通知是否由APNs服务发出 true/false 
};
```

* <del>iOS仅点击APNs推送或者本地推送打开应用时,才会触发此监听</del>
  *  iOS 3.0.7之后的版本已经可以正常获取到全部点击事件
* <del>由于iOS APP退出后缓存可能会被清除,所以本地通知的extras可能获取不到</del>
  * iOS 3.0.7之后的版本已经可以正常获取到extras
* iOS 3.0.5+的版本才能捕获本地通知,才会有isAPNs这个参数

**示例**

```
window.uexOnload=function(type){
	
	uexJPush.onReceiveNotificationOpen=function(data){
		alert(data);
	}

	...(其他回调或监听)
}
```

### 🍭 onReceiveConnectionChange  连接状态变化

`uexJPush.onReceiveConnectionChange(json)`

**参数**

```
var json={
	connect:,//0-已连接上,1-未连接
};
```


**示例**

```

window.uexOnload=function(type){
	
	uexJPush.onReceiveConnectionChange=function(data){
		alert(data);
	}

	...(其他回调或监听)
}
```

### 🍭 onReceiveRegistration  应用程序注册监听

`uexJPush.onReceiveRegistration(json)`

**参数**

```
var json={
	title:,//RegistrationID
};
```

**示例**


```
window.uexOnload=function(type){
	
	uexJPush.onReceiveRegistration=function(data){
		alert(data);
	}

	...(其他回调或监听)
}
```
#3、附录

##3.1、别名/标签 错误代码解释
|result|描述|详细解释|
|-----|-----|-----|
|6001|无效的设置,tag/alias 不应参数都为 null	
|6002|	设置超时	|建议重试
|6003|	alias 字符串不合法	|有效的别名、标签组成:字母(区分大小写)、数字、下划线、汉字.
|6004|	alias超长.最多 40个字节	|中文 UTF-8 是 3 个字节
|6005|	某一个 tag 字符串不合法	|有效的别名、标签组成:字母(区分大小写)、数字、下划线、汉字.
|6006|	某一个 tag 超长.一个 tag 最多 40个字节	|中文 UTF-8 是 3 个字节
|6007|	tags 数量超出限制.最多 100个	|这是一台设备的限制.一个应用全局的标签数量无限制.
|6008|	tag/alias 超出总长度限制	|总长度最多 1K 字节
|6011|	10s内设置tag或alias大于10次|	短时间内操作过于频繁

##3.2、 通知/自定义消息/本地通知的接收情况
|操作系统|通知|自定义消息|本地通知|
|-----|-----|-----|
|Andriod|前台/后台 均能接收|前台/后台 均能接收|前台/后台 均能接收	
|iOS|	前台/后台/进程关闭状态 均能接收	|仅前台|前台/后台 均能接收


##3.3、 Android插件配置说明
**如果不使用config.xml配制方法,那么本插件需要下载插件包配置`AndroidManifest.xml`文件后作为自定义插件上传才能正常使用.(只针对未升级打包服务的企业用户)**

插件需要在`AndroidManifest.xml`中查找替换所有的`$UEXJPUSH_PACKAGE$`改为自己的包名(一共应该是五处).

并将`$UEXJPUSH_APPKEY$`替换为自己在极光推送申请的appkey

##3.4、 iOS插件配置说明
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
* 详见[打包服务器公测](http://newdocx.appcan.cn/newdocx/docx?type=1472_1291)
* 该公测已完成,现在也支持正式版大众打包服务器

#### Android

示例配置代码如下:

```
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

```
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

#4、更新历史

### iOS

API版本: `uexJPush-4.0.0`

最近更新时间:`2016-6-15`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |

### Android

API版本: `uexJPush-4.0.0`

最近更新时间:`2016-6-15`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
