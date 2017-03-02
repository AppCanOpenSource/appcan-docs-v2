[TOC]
#1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
环信插件
##1.1、 说明
本插件是基于环信API封装的AppCan平台的插件模块,用户可以使用本插件实现基本的即时通讯功能,包括——

* 单聊功能:支持发送语音,图片,表情,文字,位置,附件;
* 群聊功能:支持500人到2000人大群,拥有完善的群组权限管理;
* 实时语音:基于IP网络的点对点实时语音,适应低带宽要求;
* 客服功能(iOS 3.0.22,Android 3.0.23及以上支持):基于新一代移动互联网技术的全媒体智能客户关系中心系统,详情见[环信移动客服文档](http://docs.easemob.com/cs/300visitoraccess/10nativeapp)
* 支持小米推送功能
> **使用前说明:**

本插件为单例插件 ——

* 在任何网页调用本插件,调用的是同一个插件实例;
* 所有的API都是异步方法,不会直接返回值;
* 所有的回调都会传到"**root页面**"(config.xml中配置的App起始页面即为root页面)

**以上内容非常重要**

root页面收到回调后,可以通过uexWindow的相关方法传递到各个网页去,
以下方法是您可能要用到的——

````
 传递给某个窗口
uexWindow.evaluateScript;
uexWindow.evaluatePopoverScript
uexWindow.evaluateMultiPopoverScript
 传递给某些窗口:
uexWindow.publishChannelNotification
uexWindow.subscribeChannelNotification
````
这些方法具体用法在[uexWindow文档](https://github.com/AppCanOpenSource/appcan-docs-v2/tree/master/%E5%BA%94%E7%94%A8%E5%BC%95%E6%93%8E/uexWindow) 内有描述



##1.2、 UI展示
暂无

##1.3、 开源源码
插件测试用例与自定义插件下载:[点击此处](http://plugin.appcan.cn/details.html?id=406_index)  (插件测试用例与插件源码已经提供)


##1.4、 术语表

Path Types  

| 协议头             | Android对应路径 (其中"/sdcard/"等 同于"/storage/emulated/0/") | iOS对应路径                           |
| --------------- | ---------------------------------------- | --------------------------------- |
| res://          | widget/wgtRes/                           | widget/wgtRes                     |
| wgts://         | /storage/emulated/0/widgetone/apps/ xxx(widgetAppId)/ | /Documents/apps/xxx(widgetAppId)/ |
| wgts://         | /storage/emulated/0/widgetone/widgets/   | /Documents/widgets/               |
| file:///sdcard/ | /storage/emulated/0/                     | 无                                 |

## 1.5、平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS8.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.6、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.

在后续版本中新添加的接口会在文档中额外说明. 

## 1.7、 接入小米推送（环信目前已经不支持）

正常情况下应用在小米手机上被杀之后是无法收到消息的，现在可以通过接入小米推送来收消息，步骤如下：

- 进入[小米推送的后台](http://dev.xiaomi.com/mipush/xmpush/app/applist?userId=913566583)，创建一个应用，完成后得到 AppID、AppKey、AppSecret。然后，登录[环信管理后台](http://console.easemob.com/)，选择你的应用—>选择推送证书—>Xiaomi—>新增证书。

  证书名称为刚从小米推送后台拿到的 AppID，证书密钥为 AppSecret，以及填上你当前应用的包名，点击上传即可。

- 打包勾选小米推送

- `uexEasemob.initEasemob`增加参数`miPushAppId` `miPushAppKey`

- `config.xml` 添加配置（以下配置只用更改“此处填写你的包名“为你的包名，其他不要更改）

  ```xml
  <config desc="uexMiPush" type="KEY">
        <param name="$packageName$" platform="Android" value="此处填写你的包名"/>
  </config>
  <config desc="uexMiPush" type="KEY">
      <param name="org.zywx.wbpalmstar.plugin.uexmipush.MiBroadcastReceiver" platform="Android" value="com.hyphenate.chat.EMMipushReceiver"/>
  </config> 
  ```

  ​

  ​


## 1.8、接入华为推送

正常情况下应用在华为手机上被杀之后是无法收到消息的，现在可以通过接入华为推送来收消息，步骤如下：

- 进入[华为开发者后台](http://developer.huawei.com/cn/consumer/devunion/openPlatform/html/memberCenter.html#appManage#)，创建一个应用，完成后配置push权益。创建完成后，会自动生成的APP ID及APP SECRET，进入[环信管理后台](http://console.easemob.com/)，选择你的应用—>选择推送证书—>Huawei—>新增证书。

  证书名称为刚从华为后台拿到的 APP ID，证书密钥为 APP SECRET，点击上传即可。

- 打包勾选华为推送（如果应用有百度地图的插件，需要使用华为推送无百度地图版本的，否则会打包失败）

- `uexEasemob.initEasemob`增加参数`huaweiPushAppId`

- `config.xml` 添加配置

  ```xml
  <config desc="uexHuaweiPush" type="KEY">
          <param name="org.zywx.wbpalmstar.plugin.uexhuaweipush.MyReceiver" platform="Android" value="com.hyphenate.chat.EMHuaweiPushReceiver"/>
  </config>
  ```

- 所有发送消息的接口都添加了`ignoreNotification`(bool类型，发送静默消息)、`forceNotification`(bool类型，发送强制推送)、`pushTitle`(String类型，自定义推送的标题)

  对应于http://docs.easemob.com/im/200androidclientintegration/115thirdpartypush三种华为推送类型。

# 2、API概述



##2.1、Initialization
***
### 🍭 initEasemob  初始化

`uexEasemob.initEasemob(param)`

**说明:**

初始化环信SDK

* 调用环信其他任意接口前必须先保证已调用此方法
* 在整个应用生命周期中,此方法只需调用一次即可

**参数**

```js
//param为初始化信息,Object类型,必选
var param = {
	appKey:,//String,环信官网申请的appKey   
	apnsCertName:,//String,可选 环信官网后台配置的iOS推送证书(仅iOS)
	isAutoLoginEnabled:,//Number,可选 是否开启自动登录功能 1-开启 2-关闭 默认为开启
	isAutoAcceptGroupInvitation:,//Number,可选 是否开启用户自动同意群邀请,1-开启 2-关闭 默认为开启
	miPushAppId:,//String,可选 小米推送的appId(仅Android)
    miPushAppKey:,//String,可选 小米推送的appKey(仅Android)
};
```
* apnsCertName不传时,无法使用环信的APNs推送功能





### 🍭 registerCallback  注册监听

`uexEasemob.registerCallback()`

**说明**

- 调用了此接口的页面都会受到环信的回调
- 调用了此接口的页面在关闭前,请先调用取消注册监听的方法
- 请尽量少的在页面调用该接口,会影响效率
- Root页面默认自动调用了此接口

### 🍭 unRegisterCallback 取消注册监听

`uexEasemob.unRegisterCallback()`

**说明**

取消该页面的监听

如果要取消所有页面的监听，请调用`uexEasemob.unRegisterCallback(-1)`



### 🍭 login   登录

`uexEasemob.login(param,callback)`

**说明:**

用户登录环信

**参数**

param为登录信息,Object类型,必选

```js
var param = {
	username:,//String,必选,用户名
	password:,//String,必选,密码
};
```

**回调参数**

callback是回调函数,Function类型


callback拥有一个参数data,Object 类型

```js
var data = {
	result:,//1-成功,2-失败
	msg:,//提示信息
};
```



### 🍭 logout   退出登录

`uexEasemob.logout(callback)`

**说明:**

用户登出环信

**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型 

```js
var data = {
	result:,//1-登出成功,2-登出失败
	msg:,//提示信息
};
```

### 🍭 registerUser 注册新用户

`uexEasemob.registerUser(param,callback)`

**说明:**

注册新用户

**参数**

param为登录信息,Object类型,必选

```js
var param = {
	username:,//String,必选,用户名
	password:,//String,必选,密码
};
```
**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型 

```js
var data = {
	result:,//1-成功,2-失败
	msg:,//提示信息
};
```

### 🍭 updateCurrentUserNickname   更新当前用户的昵称

`uexEasemob.updateCurrentUserNickname(param)`

**说明:**

更新当前用户的昵称

**参数**

param为登录信息,Object类型,必选

```js
var param = {	
	nickname:,//String 必选 用户昵称
};
```

* 此方法主要为了在苹果推送时能够推送昵称(nickname)而不是userid,一般可以在登陆成功后从自己服务器获取到个人信息,然后拿到nick更新到环信服务器.并且,在个人信息中如果更改个人的昵称,也要把环信服务器更新下nickname 防止显示差异.

### 🍭 getLoginInfo 获取当前登录信息(仅iOS可用)

`uexEasemob.getLoginInfo(callback)`

**说明:**

获取当前登录信息

仅iOS可用

**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型 

```js
 var data ={
	userInfo:{//当前登陆用户信息,已登录时才有此值
      	username:,//String 当前登录用户账号
    	nickname:,//String 当前用户昵称
    },
	isLoggedIn:,//是否已有登录用户  1-是 2-否
	isConnected:,//是否连上聊天服务器   1-是 2-否
	isAutoLoginEnabled://是否开启自动登录  1-是 2-否
};
```



> ### 回调方法

### 🍭 onConnected() 连接成功的回调方法

`uexEasemob.onConnected()`

**说明:**

当连接上环信服务器时会触发此方法



### 🍭 onDisconnected() 链接断开的回调方法

`uexEasemob.onDisconnected(param)`

**说明:**

当与环信服务器的连接断开时会触发此方法

**参数**

param为JSON字符串,String类型

```js
var param = {
	error:,//1-账号被移除,2-账号其他设备登陆,3-连接不到聊天服务器,4-当前网络不可用 
};
```

##2.2、Message
***
### 🍭 sendText 发送文本消息

`uexEasemob.sendText(param)`

**说明:**

发送一条文本消息

* 本接口支持环信移动客服功能,详情见[环信移动客服文档](http://docs.easemob.com/cs/300visitoraccess/10nativeapp)

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,单聊时聊天人的userid或者群聊时groupid
	chatType:,//Number,必选,0-单聊,1-群聊
	content:,//String,必选,文本内容
	ext:,//String,可选,扩展属性. 
	extObj:,//Object,可选,扩展参数,用于环信移动客服功能.传此参数时,ext将会被忽略
};
```

### 🍭 sendFile 发送文件

`uexEasemob.sendFile(param)`

**说明:**

发送一条文件消息

- 本接口支持环信移动客服功能,详情见[环信移动客服文档](http://docs.easemob.com/cs/300visitoraccess/10nativeapp)

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,单聊时聊天人的userid或者群聊时groupid
	chatType:,//Number,必选,0-单聊,1-群聊
	filePath:,//String,必选,文件路径
	displayName:,//String,可选,对方接收时显示的文件名
	ext:,//String,可选,扩展属性(可选参数,String)
	extObj:,//Object,可选,扩展参数,用于环信移动客服功能.传此参数时,ext将会被忽略
};
```

### 🍭 sendPicture 发送图片

`uexEasemob.sendPicture(param)`

**说明:**

发送一条图片消息

- 本接口支持环信移动客服功能,详情见[环信移动客服文档](http://docs.easemob.com/cs/300visitoraccess/10nativeapp)

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,单聊时聊天人的userid或者群聊时groupid
	chatType:,//Number,必选,0-单聊,1-群聊
	filePath:,//String,必选,图片路径
	displayName:,//String,可选,对方接收时显示的文件名
	ext:,//String,可选,扩展属性(可选参数,String)
	extObj:,//Object,可选,扩展参数,用于环信移动客服功能.传此参数时,ext将会被忽略
};
```

### 🍭 sendLocationMsg 发送地理位置信息

`uexEasemob.sendLocationMsg(param)`

**说明:**

发送一条地理位置消息

- 本接口支持环信移动客服功能,详情见[环信移动客服文档](http://docs.easemob.com/cs/300visitoraccess/10nativeapp)

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,单聊时聊天人的userid或者群聊时groupid
	chatType:,//Number,必选,0-单聊,1-群聊
	locationAddress:,//String,必选,地理位置信息
	latitude:,//Number,必选,纬度
	longitude:,//Number,必选,经度
	ext:,//String,可选,扩展属性(可选参数,String)
	extObj:,//Object,可选,扩展参数,用于环信移动客服功能.传此参数时,ext将会被忽略
};
```

### 🍭 sendVoice 发送语音

`uexEasemob.sendVoice(param)`

**说明:**

发送一条语音消息

- 本接口支持环信移动客服功能,详情见[环信移动客服文档](http://docs.easemob.com/cs/300visitoraccess/10nativeapp)

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,单聊时聊天人的userid或者群聊时groupid
	chatType:,//Number,必选,0-单聊,1-群聊
	filePath:,//String,必选,语音文件路径
	length:,//Number,必选,语音长度(秒)
	displayName:,//String,可选,对方接收时显示的文件名
	ext:,//String,可选,扩展属性(可选参数,String)
	extObj:,//Object,可选,扩展参数,用于环信移动客服功能.传此参数时,ext将会被忽略
};
```

### 🍭 sendVideo 发送视频

`uexEasemob.sendVideo(param)`

**说明:**

发送一条视频消息

- 本接口支持环信移动客服功能,详情见[环信移动客服文档](http://docs.easemob.com/cs/300visitoraccess/10nativeapp)

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,单聊时聊天人的userid或者群聊时groupid
	chatType:,//Number,必选,0-单聊,1-群聊
	filePath:,//String,必选,语音文件路径
	length:,//Number,必选,语音长度(秒)
	displayName:,//String,可选,对方接收时显示的文件名
	ext:,//String,可选,扩展属性(可选参数,String)
	extObj:,//Object,可选,扩展参数,用于环信移动客服功能.传此参数时,ext将会被忽略
};
```

### 🍭 sendCmdMessage(param) 发送透传消息

`uexEasemob.sendCmdMessage(param)`

**说明:**

发送一条透传消息

- 本接口支持环信移动客服功能,详情见[环信移动客服文档](http://docs.easemob.com/cs/300visitoraccess/10nativeapp)

**参数**

param为Object类型

```js
var param = {
	chatType:,//Number,必选,0-单聊,1-群聊
	action:,//String,必选,透传内容
	toUsername:,//String,必选,单聊时聊天人的userid或者群聊时groupid
	ext:,//String,可选,扩展属性(可选参数,String)
	extObj:,//Object,可选,扩展参数,用于环信移动客服功能.传此参数时,ext将会被忽略
};
```

### 🍭 setNotifyBySoundAndVibrate 消息提醒相关配置

`uexEasemob.`setNotifyBySoundAndVibrate(param)

**说明:**

配置消息提醒

**参数**

param为Object类型

```js
var param = {
  	//以下字段均为可选,不传时不会改变当前配置
	enable:,//0-关闭,1-开启.默认为1 开启新消息提醒
	soundEnable:,// 0-关闭,1-开启.默认为1 开启声音提醒
	vibrateEnable:,// 0-关闭,1-开启.默认为1 开启震动提醒
	userSpeaker:,// 0-关闭,1-开启.默认为1 开启扬声器播放(仅Android可用)
	acceptInvitationAlways:,// 0-关闭,1-开启.默认添加好友时为1,是不需要验证的,改成需要验证为0(仅Android可用)
	deliveryNotification:,// 0-关闭 1-开启  默认为1 开启消息送达通知	(仅iOS可用)
};
```



### 🍭 getMessageById 获取一条消息记录 

`uexEasemob.getMessageById(param,callback)`

**说明**

根据消息id获取消息详细信息

**参数**

param为Object类型

```js
var param = {
	msgId:,//String,必选,消息ID
};
```
**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型 

```js
var data = {
	msg:,//EMMessage对象
};
```

### 🍭 sendHasReadResponseForMessage 发送消息已读回执

`uexEasemob.sendHasReadResponseForMessage(param)`

**说明**

发送消息已读回执

**参数**

param为Object类型

```js
var param = {
	msgId:,//String,必选,消息ID
};
```



> ### 回调方法



### 🍭 onNewMessage 收到新消息监听

`uexEasemob.onNewMessage(msg)`

**说明**

收到**非透传消息**时,会触发此监听

所有离线期间收到的消息,会在下次登录时通过此监听方法传递

**参数**

msg,String类型,是由EMMessage对象(详细结构见附录)转换而成的JSON字符串



### 🍭 onCmdMessageReceive 透传消息监听

`uexEasemob.onCmdMessageReceive(param)`

**说明**

收到**透传消息**时,会触发此监听

所有离线期间收到的消息,会在下次登录时通过此监听方法传递

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	msgId:,//String 消息Id
	message:,//EMMessage对象
	action:,//String 透传内容
};
```

### 🍭 onAckMessage 消息已读监听

`uexEasemob.onAckMessage(param)`

**说明**

收到消息已读回执时,会触发此方法

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	msgId:,//String 消息Id
	username:,//String 消息来源
};
```

### 🍭 onDeliveryMessage 消息送达监听

`uexEasemob.onDeliveryMessage(param)`

**说明**

收到消息送达回执时,会触发此方法

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	msgId:,//String 消息Id
	username:,//String 消息来源
};
```

### 

### 🍭 onMessageSent 消息已发送监听

`uexEasemob.onMessageSent(param)`

**说明**

消息发送后,会触发此方法

* 所有send开头的发送消息的API均会触发此监听


* 此监听仅表示消息是否成功发送至环信服务器,不能以此判断接收人是否收到消息

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	isSuccess:,//Boolean 消息是否发生成功
	errorStr:,//String 发送失败的原因 当isSuccess为false时才有此项
	message:,//EMMessage对象 被发送的消息
};
```



##2.3、Conversation
***
### 🍭 getConversationByName 根据用户名获取会话对象

`uexEasemob.getConversationByName(param,callback)`

**说明**

根据用户名获取会话对象

**参数**

param为Object类型

```js
var param = {
	username:,//String 用户名或者群组id
	chatType:,//Number 聊天类别 0-个人 1-群组
};
```

**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型 

```js
var data = {
	conversation:,// EMConversation 对象,详细结构见附录
};
```

### 🍭 getMessageHistory 获取聊天记录

`uexEasemob.getMessageHistory(param,callback)`

**说明**

获取聊天记录

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,单聊时聊天人的userName或者群聊时groupid
	chatType:,//Number,必选,0-单聊,1-群聊
	startMsgId:,//String,可选,获取startMsgId之前的pagesize条消息,不传时表示获取最近的信息
	pagesize:,//Number,必选,分页大小
};
```
**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型 

```js
var data = {
	messages:,//Array<EMMessage> 由EMMessage对象构成的数组
};
```

### 🍭 getUnreadMsgCount 获取未读消息数量

`uexEasemob.getUnreadMsgCount(param,callback)`

**说明**

获取未读消息数量

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,单聊时聊天人的userName或者群聊时groupid
    chatType:,//Number,必选,0-单聊,1-群聊
};
```
**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型 

```js
var data = {
	count:,//Number,未读消息数
};
```

### 🍭 resetUnreadMsgCount 指定会话未读消息数清零

`uexEasemob.resetUnreadMsgCount(param) `

**说明**

指定会话未读消息数清零

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,单聊时聊天人的userName或者群聊时groupid
    chatType:,//Number,必选,0-单聊,1-群聊
};
```

### 🍭 resetAllUnreadMsgCount  所有未读消息数清零(仅Android可用)

`uexEasemob.resetAllUnreadMsgCount()`

**说明**

所有未读消息数清零,仅Android可用


### 🍭 getMsgCount 获取消息总数(仅Android可用) 

`uexEasemob.getMsgCount(param,callback)`

**说明**

获取消息总数,仅Android可用

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,单聊时聊天人的userName或者群聊时groupid
};
```

**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型 

```js
var data = {
	msgCount:,//Number,消息总数
};
```


### 🍭 clearConversation 清空会话聊天记录(仅Android可用)

`uexEasemob.clearConversation(param) `

**说明**

清空会话聊天记录,仅Android可用

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,单聊时聊天人的userName或者群聊时groupid
    chatType:,//Number,必选,0-单聊,1-群聊
};
```

### 🍭 deleteConversation 删除聊天记录

`uexEasemob.deleteConversation(param) `

**说明**

删除和某个用户或者群组的聊天记录,包括云端和本地

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,单聊时聊天人的userName或者群聊时groupid
    chatType:,//Number,必选,0-单聊,1-群聊
};
```

### 🍭 removeMessage  删除当前会话的某条聊天记录

`uexEasemob.removeMessage(param)`

**说明**

删除当前会话的某条聊天记录

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,单聊时聊天人的userName或者群聊时groupid
    chatType:,//Number,必选,0-单聊,1-群聊
	msgId:,//String,必选,要删除的消息的Id
};
```

**返回值**

Boolean类型,表示删除操作是否成功



### 🍭 deleteAllConversation  删除所有会话记录

`uexEasemob.deleteAllConversation()`

**说明**

删除所有会话记录,包括本地和云端



### 🍭 getChatterInfo 获取聊天对象信息

`uexEasemob.getChatterInfo(callback)`

**说明**

获取聊天对象信息

**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,`Array<EMChatterInfo>`类型 ,一个由EMChatterInfo对象组成的数组,详见附录.

data包含包含所有好友和群组的聊天对象信息



### 🍭 getTotalUnreadMsgCount 获取总计未读消息数

`uexEasemob.getTotalUnreadMsgCount(callback)`

**说明**

获取总计未读消息数

**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型 

```js
var data = {
	count:,//Numberm,总计未读消息数
};
```

### 🍭 getRecentChatters  获取近期聊天对象信息

`uexEasemob.getRecentChatters(callback)`

**说明**

获取近期聊天对象信息

**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,`Array<EMChatterInfo>`类型 一个由EMChatterInfo对象组成的数组

* 仅包含有聊天记录的聊天对象(包括非好友)
* param已按lastMsg的时间戳排序,最后接收消息的时间越新,排序越靠前
* EMChatterInfo对象结构说明见附录


##2.4、Friend
***


### 🍭 getContactUserNames 获取好友列表

`uexEasemob.getContactUserNames(callback)`

**说明**

获取好友列表

**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Array<String>类型 用户姓名字符串构成的数组	



​   
### 🍭 addContact 添加好友

`uexEasemob.addContact(param)`

**说明**

添加好友

**参数**

param为Object类型

```js
var param = {
	toAddUsername:,//String,必选,要添加的好友用户名
	reason:,//String,必选,好友申请信息
};
```

### 🍭 deleteContact 删除好友

`uexEasemob.deleteContact(param)`

**说明**

删除好友

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,要删除的好友用户名
};
```

### 🍭 acceptInvitation 同意好友请求

`uexEasemob.acceptInvitation(param)`

**说明**

同意好友请求

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,同意请求的对象用户名
};
```

### 🍭 refuseInvitation 拒绝好友请求

`uexEasemob.refuseInvitation(param)`

**说明**

拒绝好友请求

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,拒绝请求的对象用户名
};
```

### 🍭 getBlackListUsernames 获取黑名单列表

`uexEasemob.getBlackListUsernames(callback)`

**说明**

获取黑名单列表

**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型 

```js
var data = {
	usernames:,//Array<String> 由黑名单中的用户名构成的数组
};
```



### 🍭 addUserToBlackList 把用户加入到黑名单

`uexEasemob.addUserToBlackList(param)`

**说明**

把用户加入到黑名单

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,要加入黑名单的对象用户名
};
```

### 🍭 deleteUserFromBlackList 把用户从黑名单中移除

`uexEasemob.deleteUserFromBlackList(param)`

**说明**

把用户从黑名单中移除

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选,要移出黑名单的对象用户名
};
```



> ### 回调方法

### 🍭 onContactAdded 新增联系人监听

`uexEasemob.onContactAdded(param)`

**说明**

添加联系人成功时会触发此方法

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	userNameList:,//Array<String> 添加的联系人列表
};
```

### 🍭 onContactDeleted 删除联系人监听

`uexEasemob.onContactDeleted(param)`

**说明**

删除联系人成功时会触发此方法

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	userNameList:,//json格式的List<String>
};
```

### 🍭 onContactInvited 收到好友申请

`uexEasemob.onContactInvited(param)`

**说明**

收到好友申请时会触发此方法

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	username:,//String,申请好友的用户名
	reason:,//String,好友申请信息
};
```

### 🍭 onContactAgreed 好友请求被同意

`uexEasemob.onContactAgreed(param)`

**说明**

发出的好友申请被同意时会触发此方法

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

param为json字符串

```js
var param = {
	username:,//String,同意好友申请的用户名
};
```

### 🍭 onContactRefused 好友请求被拒绝

`uexEasemob.onContactRefused(param)`

**说明**

发出的好友申请被拒绝时会触发此方法

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

param为json字符串

```js
var param = {
	username:,//String,拒绝好友申请的用户名
};
```

### 





##2.5、Group

### 🍭 createPrivateGroup 创建私有群

`uexEasemob.createPrivateGroup(param)`

**说明**

创建私有群

**参数**

param为Object类型

```js
var param = {
	groupName:,//String,必选,群名称
	desc://String,必选,群简介
	members://Array<String>,可选,群聊成员,为空时这个创建的群组只包含自己
	allowInvite://Boolean,必选,是否允许群成员邀请人进群
	maxUsers://Number,可选,最大群聊用户数,默认为200,最大为2000
	initialWelcomeMessage://String,必选,群组创建时发送给每个初始成员的欢迎信息
};
```

### 🍭 createPublicGroup 创建公开群

`uexEasemob.createPublicGroup(param)`

**说明**

创建公开群

**参数**

param为Object类型

```js
var param = {
	groupName:,//String,必选,群名称
	desc://String,必选,群简介
	members://Array<String>,可选,群聊成员,为空时这个创建的群组只包含自己
	needApprovalRequired://Boolean,必选,如果创建的公开群用需要户自由加入,就传false;如果需要申请,等群主批准后才能加入,传true
	maxUsers://Number,可选,最大群聊用户数,默认为200,最大为2000
	initialWelcomeMessage://String,必选,群组创建时发送给每个初始成员的欢迎信息
};
```

### 🍭 addUsersToGroup 添加用户至群聊中

`uexEasemob.addUsersToGroup(param)`

**说明**

添加用户至群聊中

**参数**

param为Object类型

```js
var param = {
	isGroupOwner:,//Boolean,必选,当前用户是否是群主
	groupId:,//String,必选,群聊Id
	newmembers:,//Array<String>,必选,要添加的群聊新成员的用户名构成的数组
    inviteMessage:,//String,必选 发送给被邀请人员的邀请信息
};
```

### 🍭 removeUserFromGroup 从群聊中移除用户

`uexEasemob.removeUsersToGroup(param)`

**说明**

从群聊中移除用户

* 只有群主才有权限进行此操作

**参数**

param为Object类型

```js
var param = {
	groupId:,//String,必选,群聊Id
	username:,//String,必选,要移除的用户名
};
```



### 🍭 joinGroup 加入某个公开群

`uexEasemob.joinGroup(param)`

**说明**

加入某个群聊

仅限于加入公开群

**参数**

param为Object类型

```js
var param = {
	groupId://String,必选,群聊Id
	reason:,//String,可选,入群申请信息. 此参数为可选,当且仅当群是自由加入的,即isMembersOnly属性为false,
    groupName://String,必选,群聊名称
};
```

### 🍭 exitFromGroup 退出群聊

`uexEasemob.exitFromGroup(param)`

**说明**

退出一个已经加入的群组

**参数**

param为Object类型

```js
var param = {
	groupId://String,必选,群聊Id
};
```

### 🍭 exitAndDeleteGroup 解散群聊

`uexEasemob.exitFromGroup(param)`

**说明**

解散一个群组

仅群主才能调用此接口

**参数**

param为Object类型

```js
var param = {
	groupId://String,必选,群聊Id
};
```

### 🍭 getGroupsFromServer 从服务器获取自己加入的群聊列表

`uexEasemob.getGroupsFromServer(param,callback)`

**说明**

从服务器获取自己加入的群聊列表

包括自己加入的群和自己创建的群

**参数**

param为Object类型

```js
var param = {
	loadCache:,//Boolean,可选,是否从本地加载缓存,默认为false,表示从网络获取
};
```
**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型 

```js
var data = {
	result:，//Number,操作结果 0-成功,1-失败
	grouplist:,//Array<EMGroup> 由EMGroup构成的数组 操作成功时才有此值
	errorMsg:,//String,失败原因 操作失败时才有此值
};
```


### 🍭 getAllPublicGroupsFromServer 获取公开群列表

`uexEasemob.getAllPublicGroupsFromServer(param,callback)`

**说明**

获取公开群列表

**参数**

param为Object类型

```js
var param = {
	pageSize://Number,必选,期望结果的数量,必须大于0
	cursor://String,可选,获取公开群的cursor,首次调用传空即可
};
```

* 首次调用此接口时,cursor不用传
* 当pageSize较大时,请求只会返回部分结果并返回一个请求cursor. 此时应再次调用此接口并将回调获得的cursor传入,以获取剩下的结果.持续进行此操作,直至已获取到pageSize个群信息为止

**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型 

```js
var data = {
	result:,//Number,操作结果 0-成功,1-失败
	grouplist:,//Array<EMGroup> 公开群信息 由EMGroup对象构成的数组 
	errorMsg://String ,错误信息,仅操作失败时有此值
	cursor:,//String,可选,当前操作的cursor
};
```


### 🍭 getGroup 获取群详情

`uexEasemob.getGroup(param,callback)`

**说明**

获取公开群列表

**参数**

param为Object类型

```js
var param = {
	groupId:,//String,必选,要获取详情的群Id
	loadCache://Boolean,可选,是否从本地加载缓存;默认为false,从网络获取
};
```

**回调参数**

callback是回调函数,Function类型

callback拥有一个参数group,是EMGroup对象,结构详见附录




### 🍭 blockGroupMessage 屏蔽群消息

`uexEasemob.blockGroupMessage(param)`

**说明**

屏蔽群消息

**参数**

param为Object类型

```js
var param = {
	groupId:,//String,必选,要屏蔽的群Id
};
```

### 🍭 unblockGroupMessage 解除屏蔽群消息

`uexEasemob.unblockGroupMessage(param)`

**说明**

解除屏蔽群消息

**参数**

param为Object类型

```js
var param = {
	groupId:,//String,必选,要解除屏蔽的群Id
};
```

### 🍭 changeGroupName 修改群组名称

`uexEasemob.changeGroupName(param)`

**说明**

修改群组名称

**参数**

param为Object类型

```js
var param = {
	groupId:,//String,必选,要修改的群Id
	changedGroupName:,//String,必选,改变后的群组名称
};
```

### 🍭 blockUser 将群成员加入群组的黑名单

`uexEasemob.blockUser(param)`

**说明**

将群成员加入群组的黑名单

**参数**

param为Object类型

```js
var param = {
	groupId:,//String,必选,群Id
	username:,//String,必选,要屏蔽的用户名
};
```

### 🍭 unblockUser 将黑名单中的群成员移除

`uexEasemob.unblockUser(param)`

**说明**

将黑名单中的群成员移除

**参数**

param为Object类型

```js
var param = {
	groupId:,//String,必选,群Id
	username:,//String,必选,要解除屏蔽的用户名
};
```

### 🍭 getBlockedUsers 获取群组的黑名单用户列表

`uexEasemob.getBlockedUsers(param,callback)`

**说明**

获取群组的黑名单用户列表

**参数**

param为Object类型

```js
var param = {
	groupId:,//String,必选,群Id
};
```

**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型 

```js
var data = {
	usernames:,// Array<String> 黑名单中的用户名构成的数组
};
```

### 🍭 acceptJoinApplication 批准入群申请

`uexEasemob.acceptJoinApplication(param)`

**说明**

批准入群申请

仅群主才能调用此接口

**参数**

param为Object类型

```js
var param = {
	groupId:,//String,必选,批准加入的群Id
	username:,//String,必选,入群申请的发起人
};
```

### 🍭 declineJoinApplication 拒绝入群申请

`uexEasemob.declineJoinApplication(param)`

**说明**

拒绝入群申请

仅群主才能调用此接口

**参数**

param为Object类型

```js
var param = {
	groupId:,//String,必选,拒绝加入的群Id
	username:,//String,必选,入群申请的发起人
	reason:,//String,必选,拒绝理由
};
```

### 🍭 acceptInvitationFromGroup 接受入群邀请

`uexEasemob.acceptInvitationFromGroup(param)`

**说明**

接受入群邀请

**参数**

param为Object类型

```js
var param = {
	groupId:,//String,必选,拒绝加入的群Id
	username:,//String,必选,入群邀请的发起人
};
```

### 🍭 declineInvitationFromGroup 拒绝入群邀请

`uexEasemob.declineInvitationFromGroup(param)`

**说明**

拒绝入群邀请

**参数**

param为Object类型

```js
var param={
	groupId:,//String,必选,拒绝加入的群Id
	username:,//String,必选,入群邀请的发起人
	reason:,//String,必选,拒绝理由
};
```


> ### 回调方法



### 🍭 onGroupCreated 群组建立监听

`uexEasemob.onGroupCreated(param)`

**说明**

调用创建群的接口后会触发此监听

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	isSuccess:,//Boolean,群组是否创建成功 true/false
	errorStr:,//String,创建失败的原因 仅创建失败时会有此参数
	group:,//EMGroup对象,被建立的群组信息
};
```

### 

### 🍭 onInvitationDeclined 群聊邀请被拒绝

`uexEasemob.onInvitationDeclined(param)`

**说明**

群聊邀请被拒绝时会触发此监听

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	groupId:,//String,群组id
	invitee:,//String,被邀请的用户
	reason:,//String,被拒绝的原因
};
```

### 🍭 onInvitationAccpted 群聊邀请被同意

`uexEasemob.onInvitationAccpted(param)`

**说明**

群聊邀请被同意时会触发此监听

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	groupId:,//String,群组id
	inviter:,//String,被邀请的用户
};
```

### 🍭 onUserRemoved 当前用户被移出群聊

`uexEasemob.onUserRemoved(param)`

**说明**

当前用户被群主移除出群聊时会触发此监听

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	groupId:,//String,群组id
	groupName:,//String,群组名称
};
```

### 🍭 onGroupDestroy 群聊被创建者解散

`uexEasemob.onGroupDestroy(param)`

**说明**

当群主解散群聊时会触发此监听

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	groupId:,//String,群组id
	groupName:,//String,群组名称
};
```

### 🍭 onApplicationReceived 收到加群申请

`uexEasemob.onApplicationReceived(param)`

**说明**

当有用户申请加入群聊时会触发此监听

只有群主才会收到此监听

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	groupId:,//String,群组id
	groupName:,//String,群组名称
	applyer:,//String,申请人
	reason:,//String,申请信息
};
```

### 🍭 onApplicationAccept 加群申请被同意

`uexEasemob.onApplicationAccept(param)`

**说明**

当加入群聊申请被同意时会触发此监听

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	groupId:,//String,群组id
	groupName:,//String,群组名称
};
```

### 🍭 onApplicationDeclined 加群申请被拒绝

`uexEasemob.onApplicationDeclined(param)`

**说明**

当加入群聊申请被拒绝时会触发此监听

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	groupId:,//String,群组id
	groupName:,//String,群组名称
	reason:,//String,被拒原因
};
```



### 🍭 onDidJoinedGroup 自动加入群组监听 

`uexEasemob.onDidJoinedGroup(param)`

**说明**

SDK自动同意了用户A的加B入群邀请后，用户B会接收到该回调

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	groupId:,//String,群组id
	groupName:,//String,群组名称
    username:,//String,邀请者
    message:,//String,邀请消息
};
```

### 🍭 onReceiveGroupInvitation 收到群组邀请监听

`uexEasemob.onReceiveGroupInvitation(param)`

**说明**

收到群组邀请时会触发此监听

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	groupId:,//String,群组id
    username:,//String,邀请者
    message:,//String,邀请消息
};
```

### 

##2.6、Call

***

### 🍭 makeVoiceCall 拨打语音通话

`uexEasemob.makeVoiceCall(param)`

**说明**

拨打语音通话

**参数**

param为Object类型

```js
var param = {
	username:,//String,必选 通话对象的用户名
};
```



### 🍭 answerCall 接听通话

`uexEasemob.answerCall(param)`

**说明**

接听通话



### 🍭 rejectCall 拒绝接听

`uexEasemob.rejectCall(param)`

**说明**

拒绝通话



### 🍭 endCall 挂断通话

`uexEasemob.endCall(param)`

**说明**

挂断通话

> ### 回调方法

### 🍭 onCallReceive 收到通话请求

`uexEasemob.onCallReceive(param)`

**说明**

 收到通话请求时,会触发此监听

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	from:,//String,拨打方username
};
```

### 🍭 onCallStateChanged 通话状态变化

`uexEasemob.onCallStateChanged(param)`

**说明**

 通话状态发生改变时,会触发此监听

* 一个成功的语音通话流程为: A发送通话请求给B ==> AB建立语音通话连接 ==> B同意语音通话 ==> 开始语音通话

**参数**

param,String类型,是由下列结构转换而得的JSON字符串

```js
var param = {
	state:,//Number,通话状态 1-正在连接对方,2-双方已经建立连接,3-同意语音申请,建立语音通话中,4-连接中断 5-电话暂停中 6-电话等待对方同意接听 7-通话中 
  };
```

​  

##2.7、Apns

* 以下方法全部仅限iOS
* 当启用其他包含APNs功能测插件时,不建议使用环信自带的APNs时功能


***
### 🍭 registerRemoteNotification 注册APNs推送

`uexEasemob.registerRemoteNotification(callback)`

**说明**

注册APNs推送

**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型 

```js
 var data = {
	result;//Number,1-成功 2-失败
	errorInfo;//String,错误信息,注册失败时才有此参数
 };
```




### 🍭 updatePushOptions 更新APNs配置

`uexEasemob.updatePushOptions(param,callback)`

**说明**

更新APNs配置

**参数**

param为Object类型

```js
var param = {
	nickname;//String,昵称
	displayStyle;//Number,推送显示类型 0-提示"您有一条新消息" 1- 显示详细消息内容 
	noDisturbingStyle;//Number,是否开启免打扰模式 0-全天免打扰 1-自定义时段免打扰 2- 关闭免打扰
	noDisturbingStartH;//Number,免打扰模式开始时间,必须传整数,代表 小时
	noDisturbingEndH;//Number,免打扰模式结束时间,必须传整数,代表 小时
};
```

- 所有的参数均为可选参数,不传表示不进行改动
- param可以传空对象,用以获取当前的APNs配置

**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型 表示当前的APNs配置

```js
var data = {
	nickname;//String,昵称
	displayStyle;//Number,推送显示类型 0-提示"您有一条新消息" 1- 显示详细消息内容 
	noDisturbingStyle;//Number,是否开启免打扰模式 0-全天免打扰 1-自定义时段免打扰 2- 关闭免打扰
	noDisturbingStartH;//Number,免打扰模式开始时间,必须传整数,代表 小时
	noDisturbingEndH;//Number,免打扰模式结束时间,必须传整数,代表 小时
 };
```






### 🍭 ignoreGroupPushNotification 设置指定群组是否发送APNs推送

`uexEasemob.ignoreGroupPushNotification(param,callback)`

**说明**

设置指定群组是否发送APNs推送

**参数**

param为Object类型

```js
 var param = {
	groupId;//String,指定的群组Id
	isIgnore;//Number,1-屏蔽 2-取消屏蔽
};
```

**回调参数**

callback是回调函数,Function类型

callback拥有一个参数data,Object类型

```js
var data = {
	groupIds;//Array<String>, 已屏蔽接收推送消息的群列表
};
```

> ### 回调方法

### 🍭 onApnsLaunch 应用由于点击APNs推送被打开

`uexEasemob.onApnsLaunch`

**说明**

 当应用由于点击APNs推送被打开时,会触发此回调

**参数**

param,String类型,是由推送的内容转换而得的JSON字符串



#3、附录

## EMMessage对象结构

```js
var EMMessage = {
  from:,//String,消息的发送者
  to:,//String,消息的接收者
  messageId:,//String,消息的唯一标示
  messageTime:,//Number,时间戳.对于发送方表示消息发送的时间;对于接收方表示收到消息的时间
  isAcked:,//Boolean,对于发送方,表示是否接收到了接收方的阅读回执;对于接收方,表示否已发送了阅读回执给发送方
  isRead:,//Boolean,是否已读
  isDelivered:,//Boolean,对于发送方,表示接收方是否收到了消息;对于接收方,表示是否已发送已收到回执给对方
  chatType:,//Number,聊天类型 0-个人 1-群组
  messageType:,//String,消息类型 取值范围: "text","video","audio","image","location","file","cmd"
  ext:,//String,扩展属性
  extObj:,//Object,扩展属性对象,可用于环信移动客服功能
  messageBody:,//Object,消息主体对象,根据不同的消息类型有着不同的结构,详见下
}
```

### 文本消息

```js
var messageBody = {
  text:,//String,文本内容
}
```

### 透传消息

```js
var messageBody = {
  action:,//String,透传命令
}
```



### 位置消息

```js
var messageBody = {
  longitude:,//Number 经度
  latitude:,//Number 纬度
  address:,//String 地理位置信息
}
```



### 视频/语音/图片/文件消息

```js
var messageBody = {
  displayName:,//String 文件名
  remotePath:,//String 服务器远程文件路径
  secretKey:,//String 远端文件的密钥
  length:,// Number 长度(秒),仅语音/视频消息有此值
  thumbnailRemotePath:,//String 预览图文件的服务器远程路径,仅视频/图片消息有此值
  thumbnailSecretKey:,//String 预览图文件的密钥,仅视频/图片消息有此值
}
```

* 由于`Android SDK`不能获取***已发送消息***的`remotePath`和`thumbnailRemotePath`,因此改用`本地文件路径`(file://开头)代替

## EMConversation 对象结构

```js
var EMConversattion = {
  chatter:,//String,conversation识别名
  chatType:,//Number 聊天类别  0-个人 1-群组
  messages:,//Array<EMMessage> 会话消息列表 由EMMessage对象构成的数组
}
```



## EMGroup 对象结构

```js
var EMGroup = {
  groupId:,//String 群组Id
  groupName:,//String 群组名称
  groupDescription:,// String 群组简介
  members:,//Array<String> 群组成员
  owner:,//String 群主
  isPushNotificationEnable:,//Boolean 是否允许推送提醒
  isBlock:,//Boolean 是否被用户屏蔽
  isPublic:,//Boolean 是否是公开群
  groupMaxUserCount:,// Numebr 群组最大人数
  allowInvites:,//Boolean 是否允许群成员邀请人进群
  membersOnly:,//Boolean 是否需要申请和验证才能加入
}
```

* 受SDK所限,部分接口的members属性会有误
  * 只有getGroup接口才会返回完整的members信息
  * **Android的members包含群组的owner,而iOS并不包含**,此问题已反馈给环信官方,待解决中

## EMChatterInfo 对象结构

```js
var EMChatterInfo = {
  chatter:,//String 联系人的username或群组的groupId
  groupName:,//String 群组名(仅群组有此值)
  chatType:,//Number 联系人类型 0-个人 1-群组
  unreadMsgCount:,//Number 未读消息数
  lasgMsg:,//EMMessage,最近一条消息
}
```





#4、更新历史

### iOS

API版本: `uexEasemob-4.0.0`

最近更新时间:`2016-6-22`

| 历史发布版本 | 更新内容 |
| ------ | ---- |
|        |      |



### Android

API版本: `uexEasemob-4.0.0`

最近更新时间:`2016-6-22`

| 历史发布版本 | 更新内容 |
| ------ | ---- |
|        |      |




