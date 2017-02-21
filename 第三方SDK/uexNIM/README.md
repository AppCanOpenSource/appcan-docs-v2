[TOC]
#1､简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
NIM(网易云信)插件
##1.1､ 说明
本插件是基于NIM(网易云信)API封装的AppCan平台的插件模块,用户可以使用本插件实现基本的即时通讯功能,包括——
单聊功能:支持发送语音,图片,表情,文字,位置,附件;
群聊功能:提供了普通群 (Normal) 以及高级群 (Advanced) 两种形式的群聊功能.高级群拥有更多的权限操作,两种群聊形式在共有操作上保持了接口一致.推荐 APP 开发时只选择一种群类型进行开发.普通群和高级群在原则上是不能互相转换的,他们的群类型在创建时就已经确定;
音视频通话:提供基于网络的点对点视频通话和语音通话功能,支持通话中音视频设备控制,并支持通话中实时音视频模式切换;

> **使用前说明:**

本插件为单例插件 ——

* 在任何网页调用本插件,调用的是同一个插件实例;
* 所有的API都是异步方法,不会直接返回值;
* 所有的回调都会传到root页面(config.xml中配置的App起始页面)

**以上内容非常重要**

root页面收到回调后,可以通过uexWindow的相关方法传递到各个网页去,
以下方法是您可能要用到的
````
 传递给某个窗口:
uexWindow.evaluateScript
uexWindow.evaluatePopoverScript
uexWindow.evaluateMultiPopoverScript
 传递给某些窗口:
 uexWindow.publishChannelNotification
 uexWindow.subscribeChannelNotification
````

这些方法具体用法在[uexWindow文档](http://newdocx.appcan.cn/newdocx/docx?type=1390_1249) 内有描述,当然,也可[下载Demo](#1.3､开源源码) 参考Demo内的调用.

需要注意,对于Android 版插件,开发者需要在 config.xml中配置`appKey`和`packageName`.如下

```
<config desc="uexNIM" type="KEY">
	<param name="$appKey$" platform="Android" value="8ce4f10b741de88e2b6bd86fb9c27cc3"/>
    <param name="$packageName$" platform="Android" value="com.appcan.test"/>
</config>
```
 
##1.2､UI展示
暂无
 
##1.3､开源源码
插件测试用例与自定义插件下载:[点击此处](http://plugin.appcan.cn/details.html?id=614_index)  (插件测试用例与插件源码已经提供)

 
##1.4､ 术语表

Path Types

| 协议头 | Android对应路径 (其中"/sdcard/"等 同于"/storage/emulated/0/") | iOS对应路径 | 
| ----- | ----- | ----- | 
| res:// | widget/wgtRes/ | widget/wgtRes | 
| wgts:// | /storage/emulated/0/widgetone/apps/ xxx(widgetAppId)/ | /Documents/apps/xxx(widgetAppId)/ | 
| wgts:// | /storage/emulated/0/widgetone/widgets/ | /Documents/widgets/ | 
| file:///sdcard/ | /storage/emulated/0/ | 无 | 
 

#2､API概述		
##2.1､初始化

### 🍭 registerApp 初始化

`registerApp(param, callbackFunction)`

**说明:**
初始化  

**参数**

| 参数名称             | 参数类型     | 是否必选 | 说明                               |
| ---------------- | -------- | ---- | -------------------------------- |
| param            | JSON String   | 是    | 配置参数 |
| callbackFunction | Function | 是    | 回调函数,用来获取操作结果                 |

param为json字符串

```
var param = {
	appKey:,//区别app的标识   
	apnsCertName:,//iOS中推送证书名称(仅iOS)
};
```

各字段含义如下:

| 参数名称           | 是否必选 | 说明                      |
| ----------------  | ---- | -------------------------------- |
| appKey            | 是    | 区别app的标识 |
| apnsCertName | 是    | iOS中推送证书名称(仅iOS)  |

**回调参数:**

```
var callbackFunction = function(error){}
```

| 参数名称  | 类型     | 说明                |
| ----- | ------ | ----------------- |
| error | Number | 0表示注册成功,非0表示注册失败  |

**示例:**

```
var param={
		appKey:"8ce4f10b741de88e2b6bd86fb9c27cc3",
		apnsCertName:"ENTERPRISE",//iOS中推送证书名称(仅iOS)
};
uexNIM.registerApp(JSON.stringify(param), function(error) {
		if (!error) {
				alert('registerApp success');
		} else {
				alert('registerApp fail');
		}
});
```

##2.2､登录与登出

### 🍭 login(param,function(error, data){})  手动登录

param为json字符串

```
var param = {
	userId:,//用户名
	password:,//密码
};
```
**回调函数** 
```
var callbackFunction = function(error, data){}
```

| 参数名称  | 类型     | 说明                |
| ----- | ------ | ----------------- |
| error | Number | 0 表示成功, 其它表示失败,error代码及说明见下方  |
| data | 对象| 成功时返回userId, 格式如下:  |

```
var param = {
	userId:,//成功返回userId
};
```
| error | 错误信息|
| ----- | ----- |
| 408 | 请求超时.引起这个错误的原因往往是客户端网络状 况不良,请检查网络状况 |
| 415 | 连接服务器出错 |
| 302 | 认证失败.登录的用户名和密码不匹配.请检查输入的 用户名密码是否和服务器设置的有出入 |

### 🍭 autoLogin(param)  自动登录

NIM SDK 有两种自动登录的场景:

* SDK 发起的自动登录:因为网络发生切换,断网等原因需要重连,SDK 都会自动进行重连重登,不需要 APP 进行干预.
* APP 发起的自动登录:APP 启动时,如果已保存用户名和密码可以选择调用自动登录接口,并立刻打开主界面.此时 APP 可以在无网络,未登录的状态下直接访问用户本地数据.

和手动登录不同,自动登录是通过委托通知登录状态.APP通过onLogin通知登录状态(手动登录也会收到同样的委托回调).自动登录过程不需要 APP 加以干预,SDK 会不停重试(在有网络的情况下)直到登录为止.但下面两种异常情况需要 APP 处理:被踢onKick和特殊的登录错误onAutoLoginFailed.

param为json字符串

```
var param = {
	userId:,//用户名
	password:,//密码
};
```

### 🍭onKick(param)  被踢的监听(自动登录)

APP收到被踢回调后需要进行注销并切换到登录界面.

param为json字符串

```
var param = {
	code:,//被踢下线code,见下表
};
```

| code | 被踢下线的原因|
| ----- | ----- |
| 1 | 被另外一个客户端踢下线 (互斥客户端一端登录挤掉上一个登录中的客户端) |
| 2 | 被服务器踢下线, 仅iOS支持 |
| 3 | 被另外一个客户端手动选择踢下线 |

### 🍭onMultiLoginClientsChanged(param)   多端登录监听

云信内置踢人策略为:移动端(Android,iOS)互踢,桌面端(PC,Web)互踢,移动端和桌面端共存.[Web端登录地址](https://app.netease.im/webdemo/index.html)(网易云信的Web Demo)

如果当前的互踢策略无法满足业务需求的话,可以联系网易云信取消内置互踢,根据多端登录的回调和当前的设备列表,判断本设备是否需要被踢出.如果需要踢出,直接调用登出接口并在界面上给出相关提示即可.

```
var param = {
	clients:,//参数见下表
};
```
| 参数 | 参数详情 |
| ----- | ----- |
| type | Android:1, iOS:2, PC:4, WEB:16, REST API:32 |
| os | 操作系统 |
| timestamp | 登录时间 |
### 🍭logout(function(error, msg)   退出登录

| 参数 | 参数详情 |
| ----- | ----- |
| error | 0:成功, 1:失败 |
| msg | 失败时的错误消息 |

##2.3､基础消息功能
***
SDK 中用户与同一个对象的聊天信息集合,称为一个会话,用 NIMSession 来表示.会话有单人会话和群组会话两种类型.如果会话为单人类型,会话 ID 为聊天用户的 ID;如果会话为群组类型,会话 ID 为群组 ID.

### 🍭sendText(param) 发送文本消息及表情

param为json字符串

```
var param = {
	sessionId:,//单聊时聊天人的userid, 群聊时groupid, 聊天室的id
	sessionType:,//0-单聊,1-群聊, 2- 聊天室
	content:,//文本内容
	ext://扩展字段, Object类型
};
```
### 🍭sendImage(param) 发送图片

param为json字符串

```
var param = {
	sessionId:,//单聊时聊天人的userid, 群聊时groupid, 聊天室的id
	sessionType:,//0-单聊,1-群聊, 2- 聊天室
	filePath:,//图片文件路径
	displayName:,//显示名称,非必须
	ext://扩展字段, Object类型
};
```

### 🍭sendLocationMsg(param)//发送地理位置信息

param为json字符串

```
var param = {
	sessionId:,//单聊时聊天人的userid, 群聊时groupid, 聊天室的id
	sessionType:,//0-单聊,1-群聊, 2- 聊天室
	title:,//位置的地址名
	latitude:,
	longitude:,
	ext://扩展字段, Object类型

};
```

### 🍭sendAudio(param) 发送音频消息

param为json字符串

```
var param = {
	sessionId:,//单聊时聊天人的userid, 群聊时groupid, 聊天室的id
	sessionType:,//0-单聊,1-群聊, 2- 聊天室
	filePath:,//语音文件路径
	ext://扩展字段, Object类型
};
```

### 🍭sendVideo(param) 发送视频

param为json字符串

```
var param = {
	sessionId:,//单聊时聊天人的userid, 群聊时groupid, 聊天室的id
	sessionType:,//0-单聊,1-群聊, 2- 聊天室
	filePath:,//视频文件路径
	displayName:,//显示名称,非必须
	ext://扩展字段, Object类型
};
```
### 🍭sendFile(param) 发送文件

param为json字符串

```
var param = {
	sessionId:,//单聊时聊天人的userid, 群聊时groupid, 聊天室的id
	sessionType:,//0-单聊,1-群聊, 2- 聊天室
	filePath:,//文件路径
	displayName:,//显示名称,非必须
	ext://扩展字段, Object类型
};
```

### 🍭willSendMessage(param) 即将发送消息回调

param为json字符串

```
var param = {
	messageId:, //消息ID,唯一标识
	messageType:, //消息类型,详见下表
	from:, //消息来源
	text:, //消息文本
	timestamp:, //消息发送时间
	sessionId:, //会话ID,如果当前session为team,则sessionId为teamId,如果是P2P则为对方帐号
	sessionType:, //会话类型,当前仅支持P2P(单聊)和Team(群聊)
	senderName:, //消息发送者名字,当发送者是自己时,这个值为空,这个值表示的是发送者当前的昵称,而不是发送消息时的昵称
};
```
| messageType | 消息类型|
| ----- | ----- |
| 0 | 文本类型消息 |
| 1 | 图片类型消息 |
| 2 | 声音类型消息 |
| 3 | 视频类型消息 |
| 4 | 位置类型消息 |
| 5 | 通知类型消息 |
| 6 | 文件类型消息 |
| 10 | 提醒类型消息 |
| 100 | 自定义类型消息 |

### 🍭onSendMessageWithProgress(param) 消息发送进度监听

图片,视频等需要上传附件的消息会有比较详细的进度回调,文本消息则没有这个回调.
param为json字符串

```
var param = {
	messageId:, //消息ID,唯一标识
	messageType:, //消息类型,详见上表
	from:, //消息来源
	timestamp:, //消息发送时间
	sessionId:, //会话ID,如果当前session为team,则sessionId为teamId,如果是P2P则为对方帐号
	sessionType:, //会话类型,当前仅支持P2P(单聊)和Team(群聊)
	progress:,//发送进度(0~1)
};
```
### 🍭onMessageSend(param) 消息发送完毕回调

如果消息发送成功 error为空,反之 error 会被填充具体的失败原因.
param为json字符串

```
var param = {
	messageId:, //消息ID,唯一标识
	messageType:, //消息类型,详见上表
	from:, //消息来源
	text:, //消息文本
	timestamp:, //消息发送时间
	sessionId:, //会话ID,如果当前session为team,则sessionId为teamId,如果是P2P则为对方帐号
	sessionType:, //会话类型,当前仅支持P2P(单聊)和Team(群聊)
	senderName:, //消息发送者名字,当发送者是自己时,这个值为空,这个值表示的是发送者当前的昵称,而不是发送消息时的昵称
	isReceivedMsg:, //是否是收到的消息.由于有漫游消息的概念,所以自己发出的消息漫游下来后仍旧是"收到的消息",这个字段用于消息出错是时判断需要重发还是重收
	isOutgoingMsg:, //是否是往外发的消息. 由于能对自己发消息,所以并不是所有来源是自己的消息都是往外发的消息,这个字段用于判断头像排版位置(是左还是右)
	isDeleted:, //消息是否标记为已删除.已删除的消息在获取本地消息列表时会被过滤掉,只有根据messageId获取消息的接口可能会返回已删除消息.
	error:,//失败原因,如果发送成功则error为空
};
```

### 🍭onRecvMessages(param) 收到新消息监听

```
var param = {
	error:,//失败原因,如果发送成功则error为空
	messageId:, //消息ID,唯一标识
	messageType:, //消息类型,详见上表
	from:, //消息来源
	text:, //消息文本
	timestamp:, //消息发送时间
	sessionId:, //会话ID,如果当前session为team,则sessionId为teamId,如果是P2P则为对方帐号
	sessionType:, //会话类型,当前仅支持P2P(单聊)和Team(群聊)
	senderName:, //消息发送者名字,当发送者是自己时,这个值为空,这个值表示的是发送者当前的昵称,而不是发送消息时的昵称
	path:,//本地路径
	url:,//远程路径
	fileLength:,//文件大小(音频文件没有这个参数)
	thumbPath://缩略图本地路径(图片)
	thumbUrl:,//缩略图远程路径(图片)
	duration:,//时长,毫秒为单位(音频,视频)
	coverUrl:,//视频封面的远程路径(视频)
	coverPath:,//视频封面的本地路径(视频)
    latitude:,//纬度(位置消息)
	longitude:,//经度(位置消息)
	title:,//标题(位置消息)
};
```

### 🍭allRecentSession(function(error, data){}) 获取最近会话

获取最近会话,一般用于首页显示会话列表 .开发者无法自己添加最近消息,最近消息会在发送或者收到消息的时候自动添加,并触发增加最近会话的回调.

| 参数 | 参数详情 |
| ----- | ----- |
| error | 0:成功, 1:失败 |
| data | 成功时返回的最近会话信息数据信息,JSON 对象格式; 失败时则返回错误信息 |

data为最近会话信息数据信息时,格式如下:

```
var data = {
	sessions:[{
		lastMessage:,//最后一条消息
		unreadCount:,//未读消息数
		sessionId:,//当前会话id,仅iOS支持
		sessionType:,//当前会话type
		},
		{
		}
	]
};
```

##2.4､历史记录
***
### 🍭fetchMessageHistory(param, function(error, data) {}) 云端记录 

支持从云信服务器上远程获取之前的聊天历史记录.

**参数**

```
var param = {
    sessionId:, //会话ID,如果当前session为team,则sessionId为teamId,如果是P2P则为对方帐号
    sessionType:, //会话类型,当前仅支持P2P(单聊)和Team(群聊)
    messageId:,//起始查询消息的消息Id
    limit:,//检索条数, 最大限制100条
    startTime:,//起始时间,默认为0
    endTime:,//结束时间,默认为0,
    order:,//检索顺序,0:从新消息往旧消息查询,1:从旧消息往新消息查询
    sync:,//同步数据: 是否在远程获取消息成功之后同步到本地数据库,如果选择同步,则同步之后不会触发消息添加的回调｡默认同步(true),false为不同步｡
};
```


**回调函数参数**

| 参数 | 参数详情 |
| ----- | ----- |
| error | 0:成功, 1:失败 |
| data | 成功时返回的聊天历史记录数据信息,JSON 对象格式; 失败时则返回错误信息 |

data为聊天历史记录数据信息时,格式如下:

```
var data = {
	messages:[ 
	
	]
};
```

 
##2.5､语音录制及回放
***
多媒体管理 NIMMediaManager 提供了音频播放､高清语音录制的功能.需要注意的是 NIM SDK 中的语音播放和录制仅支持 aac ,如果需要更多格式的支持,APP 需要自己实现,但并不推荐.
### 🍭switchAudioOutputDevice  切换音频的输出设备

**说明**:同步返回切换是否成功, 返回值为boolean类型

```
var param = {
	outputDevice:,//0:听筒,1:扬声器
};
```

**示例**

```
var param = {
    outputDevice: 1,
    //0:听筒,1:扬声器
};
var result = uexNIM.switchAudioOutputDevice(JSON.stringify(param));
```

### 🍭isPlaying  判断是否正在播放音频
**说明**:同步返回是否正在播放音频状态, 返回值为boolean类型

**示例**

``` 
var isPlaying = uexNIM.isPlaying();
console.log('isPlaying:' + isPlaying);
```

### 🍭playAudio(param)  播放音频

```
var param = {
	filePath:,//音频文件的路径
};
```

播放状态的监听见`onBeganPlayAudio`, `onCompletedPlayAudio`

### 🍭onBeganPlayAudio(param) 开始播放

```
var param = {
	filePath:,//音频文件的路径
};
```
### 🍭onCompletedPlayAudio(param) 播放结束

```
var param = {
	filePath:,//音频文件的路径
};
```


### 🍭stopPlay  停止播放音频

该操作会触发回调cbCompletedPlayAudio.


##2.6､群组功能
***
群组功能提供了普通群 (Normal) 以及高级群 (Advanced) 两种形式的群聊功能.高级群拥有更多的权限操作,两种群聊形式在共有操作上保持了接口一致.推荐 APP 开发时只选择一种群类型进行开发.普通群和高级群在原则上是不能互相转换的,他们的群类型在创建时就已经确定.

* 普通群:
普通群没有权限操作,适用于快速创建多人会话的场景,类似于讨论组.每个普通群只有一个管理员.管理员可以对群进行增减员操作,普通成员只能对群进行增员操作.在添加新成员的时候,并不需要经过对方同意.

* 高级群:
高级群在权限上有更多的限制,权限分为群主､管理员､以及群成员.

### 🍭allMyTeams(function(error,data)  获取群组

NIM SDK 在程序启动时会对本地群信息进行同步,所以只需要调用本地缓存接口获取群就可以了. SDK 提供了批量获取自己的群接口､以及根据单个群 ID 查询的接口.同样 SDK 也提供了远程获取群信息的接口.

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data|成功时返回的具体数据, JSON对象; 失败时返回错误信息|

```
var data = {
	teams:,  //team array,team内详细参数如下
};
```

| team参数 | 参数信息|
| ----- | ----- |
| teamId | 群ID |
| teamName | 群名称 |
| type | 群类型 |
| owner | 群拥有者ID, 普通群拥有者就是群创建者,但是高级群可以进行拥有信息的转让 |
| intro | 群介绍 |
| announcement | 群公告 |
| memberNumber | 群成员人数,这个值表示是上次登录后同步下来群成员数据,并不实时变化,必要时需要调用fetchTeamInfo进行刷新 |
| level | 群等级,目前群人数主要是限制群人数上限 |
| createTime | 群创建时间 |
| joinMode | 群验证方式,允许所有人加入:0,需要验证:1,不允许任何人加入:2 |
| serverCustomInfo | 群服务端自定义信息,应用方可以自行拓展这个字段做个性化配置,客户端不可以修改这个字段 |
| clientCustomInfo | 群客户端自定义信息,应用方可以自行拓展这个字段做个性化配置,客户端可以修改这个字段 |
| notifyForNewMsg | 群消息是否需要通知,这个设置影响群消息的APNS推送 |

### 🍭teamById(param, function(error,data) {})  本地获取群组信息

```
var param = {
	teamId:,//群组Id
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data|成功时返回的Team信息, JSON对象,数据结构参看allMyTeams中的定义; 失败时返回错误信息|
data格式如下:
```
var data = {
	team:,
}
```



### 🍭fetchTeamInfo(param, function(error, data){})  远程获取群组信息

```
var param = {
	teamId:,//群组Id
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data|成功时返回的Team信息, JSON对象,数据结构参看allMyTeams中的定义; 失败时返回错误信息|
data格式如下:

```
var param = {
	team:,
};
```

### 🍭createTeam(param, function(error, data) {})  创建群组

```
var param = {
	name:,//群名称;
	type:,//创建群类别,普通群:0,高级群:1,默认为普通群;
	joinMode:,//群验证方式,只有高级群才有群验证模式,普通群一律不需要验证.默认为不需要,允许所有人加入:0,需要验证:1,不允许任何人加入:2;
	postscript:,//邀请附言,当创建的群为高级群需要带上,普通群没有认证过程,所以不需要;
	intro:,//群介绍,可选参数;
	announcement:,//群公告,可选参数;
	
	users:,//array类型,邀请群成员.不能为空,不邀请人时传自己的userId; 当创建普通群时,必须要添加一个其它成员.
};
```
在创建群组成功后,邀请的群成员会收到系统通知,可以从 [onReceiveSystemNotification](#onReceiveSystemNotification内置系统通知监听 "onReceiveSystemNotification") 回调中获取相关的信息.

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data|成功时返回的Team信息, JSON对象,数据结构参看allMyTeams中的定义; 失败时返回错误信息|
data格式如下:

```
var data = {
	teamId:,//群Id
	error:,//错误信息,如果成功则error为空
};
```

### 🍭addUsers(param, function(error, msg) {})  邀请用户入群

请求完成后,如果是普通群,被邀请者将直接入群;如果是高级群,云信服务器会下发一条系统消息到目标用户,目标用户可以选择同意或者拒绝入群.

```
var param = {
	teamId:,//群Id
	users:,//userId组成的数组
	postscript:,//附言(仅ios有效,android不支持)
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|msg |失败时的错误信息|


### 🍭acceptInviteWithTeam(param, function(error, msg) {})  同意群邀请(仅限高级群)

被邀请通知通过 [onReceiveSystemNotification](#onReceiveSystemNotification内置系统通知监听 "onReceiveSystemNotification") 收到系统通知接口监听

```
var param = {
	teamId:,//群Id
	invitorId:,//邀请者Id(不是被邀请者)
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|msg |失败时的错误信息|



### 🍭rejectInviteWithTeam(param, function(error, msg) {})  拒绝群邀请(仅限高级群)

```
var param = {
	teamId:,//群Id
	invitorId:,//邀请者Id(不是被邀请者)
	rejectReason:,//拒绝原因
};
```
**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|msg |失败时的错误信息|



### 🍭applyToTeam(param, function(error,data) {})  主动申请入群

请求完成后,如果是普通群,将直接入群;如果是高级群,云信服务器会下发一条系统消息给群管理员,管理员可以选择通过或者拒绝申请.

```
var param = {
	teamId:,//群Id
	message:,//加群信息
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时的错误信息|

data的数据格式如下:

```
var param = {
	error:,//错误代码
	applyStatus:,//1:已经在群里,2:申请等待通过.
};

```

### 🍭passApplyToTeam(param, function(error, data){})  通过申请(仅限高级群)

```
var param = {
	teamId:,//群Id
	userId:,//用户Id
};
```
**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时的错误信息|

data的数据格式如下:

```
var data = {
	error:,//错误代码
	applyStatus:,//0:无效状态,1:已经在群里
};

```

### 🍭rejectApplyToTeam(param)  拒绝申请(仅限高级群)

```
var param = {
	teamId:,//群Id
	userId:,//用户Id
	rejectReason:,//拒绝原因
};
```
**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时的错误信息|

```
var data = {
	error:,//错误信息
};

```

### 🍭updateTeamName(param, function(error, data){})  修改群名称

```
var param = {
	teamId:,//群Id
	teamName:,//群组名称
};
```
**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时的错误信息|

```
var data = {
	error:,//错误信息
};
```


### 🍭updateTeamIntro(param, function(error, data){})  修改群介绍(仅限高级群)

```
var param = {
	teamId:,//群Id
	intro:,//群介绍
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时的错误信息|

```
var data = {
	error:,//错误信息
};
```
### 🍭updateTeamAnnouncement(param, function(error, data){})  修改群公告(仅限高级群)

```
var param = {
	teamId:,//群Id
	announcement:,//群公告
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时的错误信息|

```
var data = {
	error:,//错误信息
};
```

### 🍭updateTeamJoinMode(param , function(error, data){})  修改群验证方式(仅限高级群)

```
var param = {
	teamId:,//群Id
	joinMode:,//群验证方式,允许所有人加入:0,需要验证:1,不允许任何人加入:2
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时的错误信息|

```
var data = {
	error:,//错误信息
};
```

### 🍭addManagersToTeam(param, , function(error, data){})  提升管理员(仅限高级群),参数中的用户必须是已经加入了该群

```
var param = {
	teamId:,//群Id
	users:,//userId组成的数组
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时的错误信息|

```
var data = {
	error:,//错误信息
};
```

### 🍭removeManagersFromTeam(param, function(error, data) {})  移除管理员(仅限高级群)

```
var param = {
	teamId:,//群Id
	users:,//userId组成的数组
};
```
**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时的错误信息|

```
var data = {
	error:,//错误信息
};
```


### 🍭transferManagerWithTeam(param,function(error, data) {})  转让群(仅限高级群)

```
var param = {
	teamId:,//群Id
	newOwnerId:,//新群主ID
	isLeave:,//是否同时离开群组,true离开
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时的错误信息|

```
var data = {
	error:,//错误信息
};
```

### 🍭fetchTeamMembers(param, function(error, data) {})  获取群成员

获取到的群成员只有云信服务器托管的群相关数据,需要开发者结合自己管理的用户数据进行界面显示

```
var param = {
	teamId:,//群Id
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |JSON对象类型,成功时返回成员信息,失败时返回错误信息|

成功时data的数据结构:
```
var data = {
	members:,//member组成的数组,member详细参数见下表
};
```
| member | 参数信息|
| ----- | ----- |
| teamId | 群ID |
| userId | 群成员ID |
| invitor | 邀请者,仅ios支持, android不支持|
| type | 群成员类型,0:普通群员,1:群拥有者,2:群管理员,3:申请加入用户 |
| nickname | 群昵称 |

失败时data的数据结构:

```
var data = {
	error:,//
};
```


### 🍭quitTeam(param, function(error, data) {})  用户退群

用户退群成功后,相关会话信息仍然会保留,但不再能接收关于此群的消息.

```
var param = {
	teamId:,//群Id
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时的错误信息|

```
var data = {
	error:,//错误信息
};
```

### 🍭kickUsers(param, function(error, data){})  踢出用户

被踢出的用户相关会话信息仍然会保留,但不再能接收关于此群的消息.
当前android只支持每次踢一个用户,故参数users对应的只能是一个用户id.
```
var param = {
	teamId:,//群Id
	users:,userId组成的数组
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时的错误信息|

```
var data = {
	error:,//错误信息
};
```


### 🍭dismissTeam(param, function(error,data) {})  解散群

群解散后,所有群用户关于此群会话会被保留,但是不能能够在此群会话里收发消息

```
var param = {
	teamId:,//群Id
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时的错误信息|

```
var data = {
	error:,//错误信息
};
```


### 🍭updateNotifyStateForTeam(param, function(error, data) {})  修改群消息通知状态

群组通知是一种消息类型 ,用户在创建群或者进入群成功之后,任何关于群的变动,云信服务器都会下发一条群通知消息.群通知消息和其他消息一样,可从提供的消息查询接口中获取.

* SDK 在收到群通知之后,会对本地缓存的群信息做出对应的修改,然后触发与修改相对应的委托事件回调.

* 群通知是接收型的消息,开发者不应该自己手动去创建和发送群通知消息.

* 群消息通知设置 SDK 提供了修改群消息通知的接口,上层可以通过设置这个选项以影响群消息的通知行为.当设置 notify 为 false 时,群内消息将不会有 APNS 通知.当然上层也可以使用这一属性来决定收到在线消息时的 APP 表现 (是否响铃等).

```
var param = {
	teamId:,//群Id
	notify:,//notify为 false 时,群内消息将不会有 APNS 通知
};
```
**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时的错误信息|

```
var data = {
	error:,//错误信息
};
```

##2.7､系统通知
除消息通道外,NIM SDK 还提供系统通知这种通道用于消息之外的通知分发.目前有两种类型:内置系统通知和自定义系统通知.

内置:这是由 NIM SDK 预定义的通知类型,目前仅支持几种群操作的通知,如被邀请入群,SDK 负责这些通知的持久化.所有的内置系统通知都是通过onReceiveSystemNotification下发给 APP.为了保证整个程序逻辑的一致性,APP 需要针对不同类型的系统通知进行相应的操作.
自定义系统通知:开发中....

### 🍭onReceiveSystemNotification内置系统通知监听

`uexNIM.onReceiveSystemNotification(param);`
```
var param = {
	notification:,//内置系统通知详细参数见下表
};
```
| 参数 | 参数描述 |
| ----- | ----- |
| type | 申请入群:0,拒绝入群:1,邀请入群:2,拒绝入群邀请:3,添加好友:5 |
| timestamp | 时间戳 |
| sourceID | 操作者 |
| targetID | 目标ID,群ID或者是用户ID |
| postscript | 附言 , 仅iOS支持 | 
| read | 是否已读 |


### 🍭fetchSystemNotifications(param,function(error, data) {})  获取本地存储的内置系统通知

```
var param = {
	limit:,//最大获取数
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |成功时,返回系统通知消息;失败时返回错误信息|

```
var data = {
	notifications:,// 内置系统通知array
};
```


### 🍭allNotificationsUnreadCount  获取本地存储的内置系统未读数
**说明**: 同步返回消息数,返回值是number类型
**示例**
```
var count = uexNIM.allNotificationsUnreadCount();
```
### 🍭deleteAllNotifications  删除本地存储的全部内置系统通知
### 🍭markAllNotificationsAsRead  标记本地存储的全部内置系统通知为已读
**说明**: 同步返回操作是否成功｡返回值为boolean型
**示例**
```
var result = uexNIM. markAllNotificationsAsRead();
```

### 🍭sendCustomNotification(param)  发送自定义通知(客户端)

除了内置系统通知外,NIM SDK 也额外提供了自定义系统给开发者,方便开发者进行业务逻辑的通知.这个通知既可以由客户端发起也可以由开发者服务器发起.

注意:自定义通知和自定义消息的不同之处在于,自定义消息归属于网易云信的消息体系内,适用于会话,由 SDK 存储在消息数据库中,与网易云信的其他内建消息类型一同展现给用户.而自定义通知主要用于第三方的一些事件状态通知,SDK 不存储,也不解析这些通知.SDK 仅仅负责替第三方传递和通知这些事件,起到透传的作用.

```
var param = { 
	sessionType:,//
	sessionId:,//
	sendToOnlineUsersOnly:,//是否只发送给在线用户,默认为TRUE 如果这个值为FALSE,通知接受者如果在通知投递时不在线,那么他会在下次登录时收到这个通知.如果消息接受者是群,则只允许投递到当前在线的用户
	content:,//透传的消息体内容
	apnsContent:,//apns推送文案,默认为nil,用户可以设置当前通知的推送文案
	shouldBeCounted:,//系统通知是否需要被计入苹果推送通知的未读计数,默认为TRUE.默认情况下,用户收到的自定义系统通知会在应用图标上累计未读.
	apnsEnabled:,//消息是否需要苹果推送,默认为TRUE.将这个字段设为FALSE,消息将不再有苹果推送通知.
	apnsWithPrefix:,//苹果推送是否需要带前缀(一般为昵称),默认为FALSE.将这个字段设为TRUE,推送消息将带有前缀(xx:).
};
```
客户端发起的自定义通知目前支持自定义如下字段:通知内容,推送文案(如果没有则不进行 APNS 推送),是否只发给在线用户.最后一个字段的意义在于区分自定义通知的使用场景.sendToOnlineUsersOnly选择只发给在线用户,当目标用户不在线时这条通知会被云信服务器丢弃,这种实现比较适合发送即时通知,如正在输入.反之云信服务器会缓存当前通知(有上限),并在目标用户上线后推送给目标用户.

**说明**: 同步返回发送是否成功,返回boolean类型数据

### 🍭onReceiveCustomSystemNotification(param)  接受自定义通知监听

除了内置系统通知外,NIM SDK 也额外提供了自定义系统给开发者,方便开发者进行业务逻辑的通知.这个通知既可以由客户端发起也可以由开发者服务器发起.

注意:自定义通知和自定义消息的不同之处在于,自定义消息归属于网易云信的消息体系内,适用于会话,由 SDK 存储在消息数据库中,与网易云信的其他内建消息类型一同展现给用户.而自定义通知主要用于第三方的一些事件状态通知,SDK 不存储,也不解析这些通知.SDK 仅仅负责替第三方传递和通知这些事件,起到透传的作用.

```
var param = {
	notification:,//自定义通知详细参数见下表
};
```
| 参数 | 参数描述 |
| ----- | ----- |
| timestamp | 时间戳 |
| sender | 通知发起者id |
| receiver | 通知接受者id |
| receiverType | 通知接受者类型,0:点对点,1:群组 |
| content | 透传的消息体内容 |
| apnsContent | apns推送文案 |

##2.8､APNS 推送(以下方法全部仅限iOS)
***
NIM SDK 提供全局 APNS 属性设置,用于设置免打扰时间和推送样式
### 🍭 registerAPNS(param)  初始化
### 🍭 cbRegisterAPNS(param)  初始化回调

param为json字符串

```
  var param{
	result:,//true ,false
	error:,//result为false时才有
};
```
### 🍭getApnsSetting(param) 获取推送设置
### 🍭cbGetApnsSetting(param) 获取推送设置回调

param为json字符串

```
var param = {
	type:,//推送消息显示类型,显示详情:1,不显示详情:2
	noDisturbing:,//推送消息是否开启免打扰 TRUE表示开启免打扰
	noDisturbingStartH:,//免打扰开始时间:小时
	noDisturbingStartM:,//免打扰开始时间:分
	noDisturbingEndH:,//免打扰结束时间:小时
	noDisturbingEndM:,//免打扰结束时间:分
}
```
### 🍭updateApnsSetting(param) 修改推送设置

param为json字符串

```
var param = {
	type:,//推送消息显示类型,显示详情:1,不显示详情:2
	noDisturbing:,//推送消息是否开启免打扰 TRUE表示开启免打扰
	noDisturbingStartH:,//免打扰开始时间:小时
	noDisturbingStartM:,//免打扰开始时间:分
	noDisturbingEndH:,//免打扰结束时间:小时
	noDisturbingEndM:,//免打扰结束时间:分
}
```
### 🍭cbUpdateApnsSetting(param) 修改推送设置回调

param为json字符串

```
var param = {
	error:,
}
```

## 2.9 聊天室
### 🍭 enterChatRoom(param, function(error, data) {})  用户加入聊天室

用户加入聊天室

```
var param = {
	roomId:,//聊天室Id, 必须
	nickName://用户在聊天室中的呢称
	avatar: //头像url
	extension:, //扩展字段,非必须.json对象类型,进入聊天室后展示用户信息的扩展字段,长度限制4K 
	notifyExtension:, //通知的扩展字段, 非必须.json对象类型, 进入聊天室通知消息扩展字段,长度限制1K(进入聊天室后,聊天室成员都会收到一条通知消息)
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时的错误信息|

```
var data = {
	error:,// 失败时的错误信息
};
```


### 🍭 exitChatRoom(param)  用户退出聊天室

用户退出聊天室,该方法无回调

```
var param = {
	roomId:,//聊天室Id, 必须
};
```

### 🍭 getChatRoomHistoryMsg(param, function(error, data) {})  获取聊天室历史消息

聊天室支持获取云端消息记录的功能.以 startTime(单位毫秒) 为时间戳,拉取 limit 条消息.拉取到的消息中也包含成员操作的通知消息.

```
var param = {
	roomId:,//聊天室Id, 必须
	startTime: //起始时间,非必须,默认为0
	limit// 消息条数,非必须,默认为10
};
```
**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |成功时返回message 列表,失败时返回错误信息|

成功时data的数据结构:
```
var data = {
	messages:, //message组成的数组
}
```

失败时:
```
var data = {
	error:, //错误码
}
```


### 🍭 getChatRoomInfo(param, function(error, msg) {])  获取聊天室信息

聊天室支持获取云端消息记录的功能.以 startTime(单位毫秒) 为时间戳,拉取 limit 条消息.拉取到的消息中也包含成员操作的通知消息.

```
var param = {
	roomId:,//聊天室Id, 必须
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|msg |成功时返回聊天室信息,失败时返回错误信息|

成功时msg的数据结构:
```
var msg = {
	data:, //聊天室信息
}
```

失败时:
```
var msg = {
	error:, //错误码
}
```


data的结构为:

```
{
	roomId: //聊天室id, String 
	name: //聊天室名称, String
	creator: //创建者id, String
	announcement: //公告, String
	onLineUserCount: //当前在线人数, Number
	broadcastUrl: //广播流url, String
	extention: //扩展属性,Object
	
}

```

### 🍭 getChatRoomMembers(param, function(error, msg) {}) 查询聊天室中的成员
```
var param = {
	roomId:,//聊天室Id, 必须
	type: //类别,非必须,默认为0.type只会有三个值,即 0:聊天室在线的固定成员, 1: 聊天室临时成员, 2: 在线固定成员
	time: //查询固定成员列表用ChatRoomMember.getUpdateTime, 查询游客列表用ChatRoomMember.getEnterTime,默认是0,会使用当前服务器最新时间开始查询,即第一页,单位毫秒
	userId:, //iOS以userId为瞄点进行查询
	limit// 条数,非必须,默认为10, 最大100
};
```


**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|msg |成功时返回聊天室中的成员信息,失败时返回错误信息|


```
var msg = {
	data:, //聊天室成员信息
}
```

data的结构为:

```
[
	{
		userId: //用户id, String 
		avatar: //用户头像url, String
		enterTime: //进入的时间, String
		nick: //呢称, String
		roomId: //聊天室id, String
		updateTime: //更新时间, Number
		isInBlackList: //是否在黑名单中,boolean
		isMuted: //是否被禁言, boolean
		isOnline://是否在线, boolean
		isValid://是否有效, boolean, 仅Android支持
		memberType://成员类型, Number. 游客: -2, 受限用户: -1, 普通用户:0, 创建者:1, 管理员: 2
		extention://进聊天室时提交的扩展字段,Object				
	}
]
```

失败时:

```
var msg = {
	error:, //错误码
}
```


### 🍭 getChatRoomMembersByIds(param, function(error,data){})  根据id获取聊天室成员

通过用户id 批量获取指定成员在聊天室中的信息

```
var param = {
	roomId:,//聊天室Id, 必须
	userIds://用户的account, 数组类型,必须, 数组长度最大20
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |成功时返回聊天室中的成员信息,失败时返回错误信息|

data数据结构参看`getChatRoomMembers `

### 🍭 onChatRoomStatusChanged 聊天室在线状态变化的监听

```
var param = {
	roomId:,//聊天室id
	status:,//状态代码
};
```
|status| 说明|
|------|------|
| 0 | 正在进入 |
| 1 | 进入聊天室成功 |
| 2 | 进入聊天室失败 |
| 3 | 和聊天室失去链接 |

### 🍭 addUserToBlackList(param, function(error, data) {}) 加入/移出黑名单

将用户加入或移出黑名单单.加入或移出黑名单时,都会收到聊天室通知消息
```
var param = {
	roomId:,//聊天室id
	userId:,//用户的帐号
	isAdd:,//默认true, 即将用户加入黑名单,非必须.
};
```
**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时错误信息|




### 🍭 muteUser(param, function(error, data){}) 加入用户到禁言名单/取消某用户的禁言

加入用户到禁言名单/取消某用户的禁言时,都会收到聊天室通知消息

```
var param = {
	roomId:,//聊天室id
	userId:,//用户的帐号
	isMute:,//默认true, 即将用户加入到禁言名单,非必须.
};
```
**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时错误信息|



### 🍭 setAdmin(param, function(error, data){}) 设置/取消管理员

将某用户设置为管理员或者取消某用户的管理员资格, 操作成功后会收到聊天室通知消息

```
var param = {
	roomId:,//聊天室id
	userId:,//用户的帐号
	isAdmin:,//默认true, 将用户设置为管理员,非必须.
};
```
**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时错误信息|



### 🍭 setNormal(param, function(error, data){}) 设置/移除普通成员

即将游客变为固定成员中的普通成员身份.可以将游客设置为普通成员或者移除某个普通成员,将其变成游客

```
var param = {
	roomId:,//聊天室id
	userId:,//用户的帐号
	isNormal:,//默认true, 将用户设置为普通成员,非必须.
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时错误信息|


### 🍭 kickMemberFromChatRoom(param, function(error, data) {}) 从聊天室中移除某个用户

踢出成员,仅管理员可以踢;如目标是管理员仅创建者可以踢.

```
var param = {
	roomId:,//聊天室id
	userId:,//用户的帐号
	reason:,//原因,非必须.
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时错误信息|


### 🍭 onChatRoomKickOutEvent 被踢出聊天室的监听

当用户被主播或者管理员踢出聊天室､聊天室被关闭(被解散),会收到通知.注意:收到被踢出通知后,不需要再调用退出聊天室接口,SDK 会负责聊天室的退出工作.可以在踢出通知中做相关缓存的清理工作和界面操作.

返回数据

```
var param = {
	roomId:,//聊天室id
	code:// 状态代码, Number
};
```
| code | 代码 | 
|--------|------|
| 1 | 聊天室已经被解散|
| 2 | 被管理员踢出|
| 3 | 被其他端踢出|
| 4 | 当前连接状态异常|
| 5 | 被加黑了|


##2.10､用户资料托管
***
网易云信提供了用户帐号资料管理.以下几个接口仅当选择云信托管用户资料时有效,如果开发者不希望云信获取自己的用户数据,则需自行维护用户资料.

### 🍭userInfo(param, function(error, data) {}) 获取本地用户资料

用户资料除自己之外,不保证其他用户资料实时更新.其他用户数据更新时机为:

* 调用fetchUserInfos:completion方法刷新用户
* 收到此用户发来消息
* 程序再次启动,此时会同步好友资料

当用户资料更新时,会触发监听onUserInfoChanged.

param为json字符串

```
var param = {
	userId:, //用户帐号
}
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |成功时返回本地用户资料,失败时返回错误信息|

成功时`data`的数据结构
```
var data = {
	userId:,
	alias:,//备注名,长度限制为128个字符
	notifyForNewMsg:,//是否需要消息提醒
	isInMyBlackList:,//是否在黑名单中
	userInfo:,//详细参数见下表
}
```

### 🍭onUserInfoChanged(param) 用户资料更新监听

param为json字符串

```
var param = {
	user:, //user对象, 对象类型
}
```
### 🍭fetchUserInfos(param, function(error, data) {]) 获取服务器用户资料

此接口可以批量从服务器获取用户资料,出于用户体验和流量成本考虑,不建议应用频繁调用此接口.对于用户数据实时性要求不高的页面,应尽量调用读取本地缓存接口.当获取用户成功后,会触发监听onUserInfoChanged.

param为json字符串

```
var param = {
	userIds:,//用户id列表
}
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |成功时返回本地用户资料,失败时返回错误信息|
成功时`data`的数据结构

```
var data = {
	users:,//user array用户信息列表
}
```

### 🍭updateMyUserInfo(param, function(error, data){})   更新当前用户信息

param为json字符串

```
var param = {	
	
	nickname:,//用户昵称
	avatar:,//用户头像
	sign:,//用户签名
	gender:,//用户性别 0:未知 ,1:男 ,2:女,
	email:,//只支持合法邮箱
	birth:,//用户生日yyyy-MM-dd
	mobile:,//合法手机号
	ex:,//拓展字段
};
```
当用户资料更新时,会触发回调:onUserInfoChanged

	注:此方法主要为了在苹果推送时能够推送昵称(nickname)而不是userid,一般可以在登陆成功后从自己服务器获取到个人信息,然后拿到nick更新到网易云信服务器.并且,在个人信息中如果更改个人的昵称,也要把网易云信服务器更新下nickname 防止显示差异.
	
**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时错误信息|


##2.11､用户关系托管
***
网易云信提供了用户用户关系管理,以及对用户会话的消息设置.在云信中,不是好友也允许聊天.用户关系如果不托管给云信,开发者需要自己在应用服务器维护.
### 🍭myFriends(function(error,data){})   获取好友列表

好友列表有本地缓存,缓存会在手动/自动登录后与服务器自动进行同步更新.接口返回的是 User 列表. User 封装了开发者向云信托管的好友ID,对此好友的会话设置(是否需要消息提醒,是否是拉黑用户等), 以及用户的详细信息 UserInfo (需要将用户信息交给云信托管).

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |成功时返回用户信息列表,失败时错误信息|

成功时`data`的数据结构:

```
var data = {	
	users:,//用户信息列表
};
```
### 🍭requestFriend(param, function(error, data){})   好友请求

好友请求包括请求添加好友以及同意/拒绝好友请求两种;
验证方式有不需要验证方式(一旦请求后双方直接互为好友)和需要验证的两种.

param为json字符串

```
var param = {	
	userId:,//目标用户ID
	operation:,//1:添加好友(直接添加为好友,无需验证) 2:请求添加好友 3:通过添加好友请求 4:拒绝添加好友请求
	message:,//自定义验证消息
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时错误信息|


### 🍭onFriendChanged(param)   好友状态发生变化监听

param为json字符串

```
var param = {	
	user:,
};
```
### 🍭deleteFriend(param,function(error, data){})   删除好友

解除成功后,会同时修改本地的缓存数据,并触发onFriendChanged

param为json字符串
```
var param = {	
	userId:,
};
```
**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时错误信息|

### 🍭myBlackList(param, function(error, data){})   获取黑名单成员列表

云信中,黑名单和好友关系是互相独立的,即修改好友关系不会影响黑名单关系,同时,修改黑名单也不会对好友关系进行操作.
黑名单列表有本地缓存,缓存会在手动/自动登录后与服务器自动进行同步更新.接口返回的是User 列表

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |成功时返回黑名单列表,失败时返回错误信息|

成功时`data`的数据结构

```
var param = {	
	users:,//用户信息列表
};
```
### 🍭addToBlackList(param, function(error, data) {})   添加用户到黑名单

拉黑成功后,会同时修改本地缓存,并触发回调onBlackListChanged

param为json字符串

```
var param = {	
	userId:,
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时返回错误信息|


### 🍭removeFromBlackBlackList(param, function(error, data){})   将用户从黑名单移除

移除成功后,会同时修改本地缓存,并触发回调onBlackListChanged

param为json字符串

```
var param = {	
	userId:,
};
```
**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时返回错误信息|


### 🍭onBlackListChanged   用户黑名单更新监听
### 🍭isUserInBlackList(param, function(error, data) {})   将判断用户是否在自己的黑名单内

此接口是根据本地缓存数据来判断是否拉黑的,在调用时请保证本地缓存是正确的(登录后有正常完成数据同步).

param为json字符串

```
var param = {	
	userId:,
};
```
**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |成功时返回具体业务数据,失败时返回错误信息|
成功时`data`为boolean类型数据,true 表示在黑名单中,false 不在黑名单中

### 🍭myMuteUserList(function(error, data){})   获取静音成员列表

云信中,可以单独设置是否开启某个用户的消息提醒,即对某个用户静音.静音关系和好友关系是互相独立的,修改好友关系不会影响静音关系,同时,修改静音关系也不会对好友关系进行操作.

静音列表有本地缓存,缓存会在手动/自动登录后与服务器自动进行同步更新.接口返回的是 User 列表. User 封装了开发者向云信托管的好友ID,对此好友的会话设置(是否需要消息提醒,是否是拉黑用户等), 以及用户的详细信息 UserInfo (需要将用户信息交给云信托管).

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |成功时返回具体业务数据,失败时返回错误信息|
成功时`data`的数据结构如下:

```
var data = {	
	users:, //用户信息列表
};
```

### 🍭updateNotifyStateForUser(param, function(error, data) {})   设置消息提醒

设置成功之后,同时更新本地缓存数据.

param为json字符串

```
var param = {	
	userId:, //
	notify:, //true,false
};
```

**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |失败时返回错误信息|


### 🍭notifyForNewMsgForUser(param, funtion(error, data){})   判断是否需要消息通知

此接口是根据本地缓存数据来判断是否是拉黑的,在调用时请保证本地缓存是正确的(登录后有正常完成数据同步).当设置成功后,会触发监听onUserInfoChanged

param为json字符串

```
var param = {	
	userId:, //
};
```
**回调函数参数**

|参数|说明|
|----|----|
|error|0:成功, 1: 失败|
|data |操作成功返回具体的业务信息, 失败时返回错误信息|

成功时`data`是boolean类型数据,true代表需要消息通知,false表示不需要消息通知


#3､附录
### 🍭iOS端状态码

| code | 详细描述 |
| ----- | ----- |
| 1 | 错误的参数 |
| 2 | 多媒体文件异常 |
| 3 | 图片异常 |
| 4 | url异常 |
| 5 | 读取/写入文件异常 |
| 6 | 无效的token |
| 7 | HTTP请求失败 |
| 16 | 用户信息缺失 (未登录 或 未提供用户资料) |
| 14 | SQL语句执行失败 |
| 音频错误码 |  |
| 8 | 无录音权限 |
| 9 | 录音初始化失败 |
| 10 | 录音失效 |
| 11 | 播放初始化失败 |
| 网络电话错误码 |  |
| 12 | 有正在进行的网络通话 |
| 13 | 这一通网络通话已经被其他端处理过 |
| 15 | 音频设备初始化失败 |

### 🍭Android端状态码

| code | 详细描述 |
| ----- | ----- |
| 408 | 超时 |
| 1000 | 本地操作异常 |

### 🍭服务器端状态码

| code | 详细描述 |
| ----- | ----- |
| 200 | 操作成功 |
| 201 | 客户端版本不对,需升级sdk |
| 302 | 用户名或密码错误 |
| 403 | 非法操作或没有权限 |
| 404 | 对象不存在 |
| 405 | 参数长度过长 |
| 406 | 对象只读 |
| 408 | 客户端请求超时 |
| 414 | 参数错误 |
| 415 | 客户端网络问题 |
| 416 | 频率控制 |
| 422 | 账号被禁用 |
| 500 | 服务器内部错误 |
| 503 | 服务器繁忙 |
| 509 | 无效协议 |
| 998 | 解包错误 |
| 999 | 打包错误 |
| 群相关错误码 |  |
| 801 | 群人数达到上限 |
| 802 | 没有权限 |
| 803 | 群不存在 |
| 804 | 用户不在群 |
| 805 | 群类型不匹配 |
| 806 | 创建群数量达到限制 |
| 807 | 群成员状态错误 |
| 808 | 申请成功 |
| 809 | 已经在群内 |
| 810 | 邀请成功 |
| 特定业务相关错误码 |  |
| 10431 | 输入email不是邮箱 |
| 10432 | 输入mobile不是手机号码 |
| 10433 | 注册输入的两次密码不相同 |
| 10434 | 企业不存在 |
| 10435 | 登陆密码或账号不对 |
| 10436 | app不存在 |
| 10437 | email已注册 |
| 10438 | 手机号已注册 |
| 10441 | app名字已经存在 |
#4､更新历史

### iOS

API版本: `uexNIM-4.0.1`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.1 | 网易云信插件升级SDK支持ATS |
| 4.0.0 | 网易云信 |

### Android

API版本: `uexNIM-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | allRecentSession接口新增sessionId属性 |

#5 文档更新记录

