[TOC]
#1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
NIM(网易云信)插件
##1.1、 说明
本插件是基于NIM(网易云信)API封装的AppCan平台的插件模块,用户可以使用本插件实现基本的即时通讯功能,包括——
单聊功能:支持发送语音,图片,表情,文字,位置,附件；
群聊功能:提供了普通群 (Normal) 以及高级群 (Advanced) 两种形式的群聊功能。高级群拥有更多的权限操作,两种群聊形式在共有操作上保持了接口一致。推荐 APP 开发时只选择一种群类型进行开发。普通群和高级群在原则上是不能互相转换的,他们的群类型在创建时就已经确定；
音视频通话:提供基于网络的点对点视频通话和语音通话功能,支持通话中音视频设备控制,并支持通话中实时音视频模式切换；

> **使用前说明:**

本插件为单例插件 ——

* 在任何网页调用本插件,调用的是同一个插件实例;
* 所有的API都是异步方法,不会直接返回值;
* 所有的回调都会传到root页面(config.xml中配置的App起始页面)

**以上内容非常重要**

root页面收到回调后,可以通过uexWindow的相关方法传递到各个网页去,
以下方法是您可能要用到的——

 传递给某个窗口:
 
* uexWindow.evaluateScript;
* uexWindow.evaluatePopoverScript
* uexWindow.evaluateMultiPopoverScript

 传递给某些窗口:
 
* uexWindow.publishChannelNotification
* uexWindow.subscribeChannelNotification

这些方法具体用法在[uexWindow文档](http://newdocx.appcan.cn/newdocx/ejsTemplate?type=1318_1249) 内有描述

当然,也可[下载Demo]() 参考Demo内的调用。

需要注意,对于Android 版插件,开发者需要在 config.xml中配置`appKey`和`packageName`。如下

```
<config desc="uexNIM" type="KEY">
	<param name="$appKey$" platform="Android" value="8ce4f10b741de88e2b6bd86fb9c27cc3"/>
    <param name="$packageName$" platform="Android" value="com.appcan.test"/>
</config>
```
 
##1.2、 UI展示
暂无
 
##1.3、 开源源码
插件测试用例与自定义插件下载:[点击此处]()  (插件测试用例与插件源码已经提供)

 
##1.4、 术语表

Path Types

| 协议头 | Android对应路径 (其中"/sdcard/"等 同于"/storage/emulated/0/") | iOS对应路径 | 
| ----- | ----- | ----- | 
| res:// | widget/wgtRes/ | widget/wgtRes | 
| wgts:// | /storage/emulated/0/widgetone/apps/ xxx(widgetAppId)/ | /Documents/apps/xxx(widgetAppId)/ | 
| wgts:// | /storage/emulated/0/widgetone/widgets/ | /Documents/widgets/ | 
| file:///sdcard/ | /storage/emulated/0/ | 无 | 
 

#2、API概述		
##2.1、初始化
***
>### registerApp(param)  初始化

param为json字符串

```
  var param{
	appKey:,//区别app的标识   
	apnsCertName:,//iOS中推送证书名称(仅iOS)
};
```
>### cbRegisterApp(param)  初始化

param为json字符串

```
  var param{
	result:,//true ,false
	error:,//result为false时才有,0:已经初始化,1:参数错误
};
```

##2.2、登录与登出
***
>### login(param)   手动登录

param为json字符串

```
var param = {
	userId:,//用户名
	password:,//密码
};
```

>###cbLogin(param)  手动登录回调

param为json字符串

```
var param = {
	result:,//true ,false
	error:,//失败错误码
	userId:,//成功返回userId,失败返回为空
};
```
| error | 错误信息|
| ----- | ----- |
| 408 | 请求超时。引起这个错误的原因往往是客户端网络状 况不良,请检查网络状况 |
| 415 | 连接服务器出错 |
| 302 | 认证失败。登录的用户名和密码不匹配。请检查输入的 用户名密码是否和服务器设置的有出入 |
>### autoLogin(param)  自动登录

NIM SDK 有两种自动登录的场景:

* SDK 发起的自动登录:因为网络发生切换,断网等原因需要重连,SDK 都会自动进行重连重登,不需要 APP 进行干预。
* APP 发起的自动登录:APP 启动时,如果已保存用户名和密码可以选择调用自动登录接口,并立刻打开主界面。此时 APP 可以在无网络,未登录的状态下直接访问用户本地数据。

和手动登录不同,自动登录是通过委托通知登录状态.APP通过onLogin通知登录状态(手动登录也会收到同样的委托回调)。自动登录过程不需要 APP 加以干预,SDK 会不停重试(在有网络的情况下)直到登录为止。但下面两种异常情况需要 APP 处理:被踢onKick和特殊的登录错误onAutoLoginFailed。

param为json字符串

```
var param = {
	userId:,//用户名
	password:,//密码
};
```

>###onKick(param)  被踢的监听(自动登录)

APP收到被踢回调后需要进行注销并切换到登录界面。

param为json字符串

```
var param = {
	code:,//
};
```

| code | 被踢下线的原因|
| ----- | ----- |
| 1 | 被另外一个客户端踢下线 (互斥客户端一端登录挤掉上一个登录中的客户端) |
| 2 | 被服务器踢下线, 仅iOS支持 |
| 3 | 被另外一个客户端手动选择踢下线 |

>###onMultiLoginClientsChanged(param)   多端登录监听

云信内置踢人策略为:移动端(Android,iOS)互踢,桌面端(PC,Web)互踢,移动端和桌面端共存。[Web端登录地址](https://app.netease.im/webdemo/index.html)(网易云信的Web Demo)

如果当前的互踢策略无法满足业务需求的话,可以联系网易云信取消内置互踢,根据多端登录的回调和当前的设备列表,判断本设备是否需要被踢出。如果需要踢出,直接调用登出接口并在界面上给出相关提示即可。

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
>###logout()   退出登录
>###cbLogout()   退出登录回调

```
var param = {
	error:,
};
```

##2.3、基础消息功能
***
SDK 中用户与同一个对象的聊天信息集合,称为一个会话,用 NIMSession 来表示。会话有单人会话和群组会话两种类型。如果会话为单人类型,会话 ID 为聊天用户的 ID；如果会话为群组类型,会话 ID 为群组 ID。

>###sendText(param) 发送文本消息及表情

param为json字符串

```
var param = {
	sessionId:,//单聊时聊天人的userid或者群聊时groupid
	sessionType:,//0-单聊,1-群聊
	content:,//文本内容
};
```
>###sendImage(param)//发送图片

param为json字符串

```
var param = {
	sessionId:,//单聊时聊天人的userid或者群聊时groupid
	sessionType:,//0-单聊,1-群聊
	filePath:,//图片文件路径
};
```

>###sendAudio(param)//发送音频消息

param为json字符串

```
var param = {
	sessionId:,//单聊时聊天人的userid或者群聊时groupid
	sessionType:,//0-单聊,1-群聊
	filePath:,//语音文件路径
};
```

>###sendVideo(param) 发送视频

param为json字符串

```
var param = {
	sessionId:,//单聊时聊天人的userid或者群聊时groupid
	sessionType:,//0-单聊,1-群聊
	filePath:,//视频文件路径
};
```
>###sendFile(param) 发送文件

param为json字符串

```
var param = {
	sessionId:,//单聊时聊天人的userid或者群聊时groupid
	sessionType:,//0-单聊,1-群聊
	filePath:,//文件路径
};
```

>###willSendMessage(param) 即将发送消息回调

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

>###onSendMessageWithProgress(param) 消息发送进度监听

图片,视频等需要上传附件的消息会有比较详细的进度回调,文本消息则没有这个回调。
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
>###cbDidSendMessage(param) 消息发送完毕回调

如果消息发送成功 error为空,反之 error 会被填充具体的失败原因。
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
	isDeleted:, //消息是否标记为已删除.已删除的消息在获取本地消息列表时会被过滤掉,只有根据messageId获取消息的接口可能会返回已删除消息。
	error:,//失败原因,如果发送成功则error为空
};
```

>###onRecvMessages(param) 收到新消息监听

如果收到的是图片,视频等需要下载附件的消息,会自动下载。在监听的处理中会调用onFetchMessageAttachment和cbFetchMessageAttachment这两个回调返回进度和结果。

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

>###allRecentSession 获取最近会话

获取最近会话,一般用于首页显示会话列表 .开发者无法自己添加最近消息,最近消息会在发送或者收到消息的时候自动添加,并触发增加最近会话的回调。
>###cbAllRecentSession 获取最近会话会话的回调
返回最近会话信息组成的一列数组sessions,

```
var param = {sessions:[{
	lastMessage:,//最后一条消息
	unreadCount:,//未读消息数
	sessionId:,//当前会话id,仅iOS支持
	sessionType:,//当前会话type
	},{
	}
};
```

##2.4、历史记录
***
>###fetchMessageHistory(param) 云端记录 

支持从云信服务器上远程获取之前的聊天历史记录。

```
var param = {
	sessionId:,
	sessionType:,
	messageId:,//起始查询消息的消息Id
	limit:,//检索条数, 最大限制100条
	startTime:,//起始时间,默认为0
	endTime:,//结束时间,默认为0,
	order:,//检索顺序,0:从新消息往旧消息查询,1:从旧消息往新消息查询
	sync:,//同步数据: 是否在远程获取消息成功之后同步到本地数据库,如果选择同步,则同步之后不会触发消息添加的回调。默认同步(true),false为不同步。
};
```
>###cbFetchMessageHistory(param) 云端记录回调 

```
var param = {
	messages:,
	error:,
};
```

 
##2.5、语音录制及回放
***
多媒体管理 NIMMediaManager 提供了音频播放、高清语音录制的功能。需要注意的是 NIM SDK 中的语音播放和录制仅支持 aac ,如果需要更多格式的支持,APP 需要自己实现,但并不推荐。
>###switchAudioOutputDevice  切换音频的输出设备

```
var param = {
	outputDevice:,//0:听筒,1:扬声器
};
```
>###cbSwitchAudioOutputDevice  切换音频的输出设备回调

```
var param = {
	result:,//true,false
};
```
>###isPlaying  判断是否正在播放音频
>###cbIsPlaying(param)  判断是否正在播放音频回调

```
var param = {
	result:,
};
```
>###playAudio(param)  播放音频

```
var param = {
	filePath:,//音频文件的路径
};
```
>###cbBeganPlayAudio(param)  开始播放音频回调

```
var param = {
	filePath:,//音频文件的路径
	error:,
};
```
>###cbCompletedPlayAudio(param)  播放音频结束回调

```
var param = {
	filePath:,//音频文件的路径
	error:,
};
```
>###stopPlay  停止播放音频

该操作会触发回调cbCompletedPlayAudio。

##2.6、群组功能
***
群组功能提供了普通群 (Normal) 以及高级群 (Advanced) 两种形式的群聊功能。高级群拥有更多的权限操作,两种群聊形式在共有操作上保持了接口一致。推荐 APP 开发时只选择一种群类型进行开发。普通群和高级群在原则上是不能互相转换的,他们的群类型在创建时就已经确定。

* 普通群:
普通群没有权限操作,适用于快速创建多人会话的场景,类似于讨论组。每个普通群只有一个管理员。管理员可以对群进行增减员操作,普通成员只能对群进行增员操作。在添加新成员的时候,并不需要经过对方同意。

* 高级群:
高级群在权限上有更多的限制,权限分为群主、管理员、以及群成员。

>###allMyTeams  获取群组

NIM SDK 在程序启动时会对本地群信息进行同步,所以只需要调用本地缓存接口获取群就可以了。 SDK 提供了批量获取自己的群接口、以及根据单个群 ID 查询的接口。同样 SDK 也提供了远程获取群信息的接口。
>###cbAllMyTeams(param)  获取群组回调

```
var param = {
	teams:,  //team array,team内详细参数见cbTeamById下表；
};
```
>###teamById(param)  本地获取群组信息

```
var param = {
	teamId:,//
};
```
>###cbTeamById(param)  获取群组信息回调

```
var param = {
	team:,//team内详细参数见下表；
    error:,// 出错信息
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
| memberNumber | 群成员人数,这个值表示是上次登录后同步下来群成员数据,并不实时变化,必要时需要调用fetchTeamInfo:completion:进行刷新 |
| level | 群等级,目前群人数主要是限制群人数上限 |
| createTime | 群创建时间 |
| joinMode | 群验证方式,允许所有人加入:0,需要验证:1,不允许任何人加入:2 |
| serverCustomInfo | 群服务端自定义信息,应用方可以自行拓展这个字段做个性化配置,客户端不可以修改这个字段 |
| clientCustomInfo | 群客户端自定义信息,应用方可以自行拓展这个字段做个性化配置,客户端可以通过updateTeamCustomInfo接口修改这个字段 |
| notifyForNewMsg | 群消息是否需要通知,这个设置影响群消息的APNS推送 |

>###fetchTeamInfo(param)  远程获取群组信息

```
var param = {
	teamId:,//
};
```

>###cbFetchTeamInfo(param)  远程获取群组信息回调

```
var param = {
	team:,//team内详细参数见cbTeamById表；
	error:,//获取成功,error为空.
};
```
>###createTeam(param)  创建群组

```
var param = {
	name:,//群名称;
	type:,//创建群类别,普通群:0,高级群:1,默认为普通群;
	joinMode:,//群验证方式,只有高级群才有群验证模式,普通群一律不需要验证.默认为不需要,允许所有人加入:0,需要验证:1,不允许任何人加入:2;
	postscript:,//邀请附言,当创建的群为高级群需要带上,普通群没有认证过程,所以不需要;
	intro:,//群介绍,可选参数;
	announcement:,//群公告,可选参数;
	
	users:,//array类型,邀请群成员.不能为空,不邀请人时传自己的userId; 当创建普通群时,必须要添加一个其它成员。
};
```
在创建群组成功后,邀请的群成员会收到系统通知,可以从 `onReceiveSystemNotification(param)` 回调中获取相关的信息。

>###cbCreateTeam(param)  创建群组回调

```
var param = {
	teamId:,//
	error:,//
};
```
>###addUsers(param)  邀请用户入群

请求完成后,如果是普通群,被邀请者将直接入群；如果是高级群,云信服务器会下发一条系统消息到目标用户,目标用户可以选择同意或者拒绝入群。

```
var param = {
	teamId:,//群Id
	users:,//
	postscript:,//(仅ios有效,android不支持)
};
```
>###cbAddUsers(param)  邀请用户入群回调

```
var param = {
	error:,//发送成功,error为空。 
};
对于android,如果返回的error为810,表示发出邀请成功了,但是还需要对方同意
```
>###acceptInviteWithTeam(param)  同意群邀请(仅限高级群)
被邀请通知通过onReceiveSystemNotification收到系统通知接口监听

```
var param = {
	teamId:,//群Id
	invitorId:,//邀请者Id(不是被邀请者)
};
```
>###cbAcceptInviteWithTeam(param)  同意群邀请回调(仅限高级群)

```
var param = {
	error:,//发送成功,error为空。
};
```
>###rejectInviteWithTeam(param)  拒绝群邀请(仅限高级群)

```
var param = {
	teamId:,//群Id
	invitorId:,//邀请者Id(不是被邀请者)
	rejectReason:,//拒绝原因
};
```
>###cbRejectInviteWithTeam(param)  拒绝群邀请回调(仅限高级群)

```
var param = {
	error:,//发送成功,error为空。
};
```
>###applyToTeam(param)  主动申请入群

请求完成后,如果是普通群,将直接入群；如果是高级群,云信服务器会下发一条系统消息给群管理员,管理员可以选择通过或者拒绝申请。

```
var param = {
	teamId:,//群Id
	message:,//加群信息
};
```
>###cbApplyToTeam(param)  主动申请入群回调

请求完成后,如果是普通群,将直接入群；如果是高级群,云信服务器会下发一条系统消息给群管理员,管理员可以选择通过或者拒绝申请。

```
var param = {
	error:,//发送成功,error为空。
	applyStatus:,//0:无效状态,1:已经在群里,2:申请等待通过.
};

```
>###passApplyToTeam(param)  通过申请(仅限高级群)

```
var param = {
	teamId:,//群Id
	userId:,//
};
```
>###cbPassApplyToTeam(param)  发送通过申请回调(仅限高级群)

```
var param = {
	error:,//发送成功,error为空。
	applyStatus:,//0:无效状态,1:已经在群里
};

```

>###rejectApplyToTeam(param)  拒绝申请(仅限高级群)

```
var param = {
	teamId:,//群Id
	userId:,//
	rejectReason:,//
};
```
>###cbRejectApplyToTeam(param)  发送拒绝申请回调(仅限高级群)

```
var param = {
	error:,//发送成功,error为空。
};
```
>###updateTeamName(param)  修改群名称

```
var param = {
	teamId:,//群Id
	teamName:,//
};
```
>###cbUpdateTeamName(param)  修改群名称

```
var param = {
	error:,//修改成功,error为空。
};
```
>###updateTeamIntro(param)  修改群介绍(仅限高级群)

```
var param = {
	teamId:,//群Id
	intro:,//
};
```
>###cbUpdateTeamIntro(param)  修改群介绍回调(仅限高级群)

```
var param = {
	error:,//修改成功,error为空。
};
```
>###updateTeamAnnouncement(param)  修改群公告(仅限高级群)

```
var param = {
	teamId:,//群Id
	announcement:,//
};
```
>###cbUpdateTeamAnnouncement(param)  修改群公告回调(仅限高级群)

```
var param = {
	error:,//修改成功,error为空。
};
```
>###updateTeamJoinMode(param)  修改群验证方式(仅限高级群)

```
var param = {
	teamId:,//群Id
	joinMode:,//
};
```
>###cbUpdateTeamJoinMode(param)  修改群验证方式回调(仅限高级群)

```
var param = {
	error:,//成功error为空。
};
```
>###addManagersToTeam(param)  提升管理员(仅限高级群),参数中的用户必须是已经加入了该群

```
var param = {
	teamId:,//群Id
	users:,//
};
```
>###cbAddManagersToTeam(param)  提升管理员回调(仅限高级群)

```
var param = {
	error:,//成功error为空。
};
```
>###removeManagersFromTeam(param)  移除管理员(仅限高级群)

```
var param = {
	teamId:,//群Id
	users:,//
};
```
>###cbRemoveManagersFromTeam(param)  移除管理员回调(仅限高级群)

```
var param = {
	error:,//成功error为空。
};
```
>###transferManagerWithTeam(param)  转让群(仅限高级群)

```
var param = {
	teamId:,//群Id
	newOwnerId:,//新群主ID
	isLeave:,//是否同时离开群组,true离开
};
```
>###cbTransferManagerWithTeam(param)  转让群回调(仅限高级群)

```
var param = {
	error:,//成功error为空。
};
```
>###fetchTeamMembers(param)  获取群成员

获取到的群成员只有云信服务器托管的群相关数据,需要开发者结合自己管理的用户数据进行界面显示

```
var param = {
	teamId:,//群Id
};
```
>###cbFetchTeamMembers(param)  获取群成员

获取到的群成员只有云信服务器托管的群相关数据,需要开发者结合自己管理的用户数据进行界面显示

```
var param = {
	members:,//
	error:,//成功error为空
};
```
| members | 参数信息|
| ----- | ----- |
| teamId | 群ID |
| userId | 群成员ID |
| invitor | 邀请者,仅ios支持, android不支持|
| type | 群成员类型,0:普通群员,1:群拥有者,2:群管理员,3:申请加入用户 |
| nickname | 群昵称 |

> ###quitTeam(param)  用户退群

用户退群成功后,相关会话信息仍然会保留,但不再能接收关于此群的消息。

```
var param = {
	teamId:,//群Id
};
```
>###cbQuitTeam(param)  用户退群回调

```
var param = {
	error:,//成功error为空。
};
```
>###kickUsers(param)  踢出用户

被踢出的用户相关会话信息仍然会保留,但不再能接收关于此群的消息。
当前android只支持每次踢一个用户,故参数users对应的只能是一个用户id.
```
var param = {
	teamId:,//群Id
	users:,
};
```
>###cbKickUsers(param)  踢出用户回调

```
var param = {
	error:,//成功error为空。
};
```
>###dismissTeam(param)  解散群

群解散后,所有群用户关于此群会话会被保留,但是不能能够在此群会话里收发消息

```
var param = {
	teamId:,//群Id
};
```
>###cbDismissTeam(param)  解散群回调

```
var param = {
	error:,//成功error为空。
};
```
>###updateNotifyStateForTeam(param)  修改群消息通知状态

群组通知是一种消息类型 ( NIMMessageTypeNotification ) ,用户在创建群或者进入群成功之后,任何关于群的变动,云信服务器都会下发一条群通知消息。群通知消息和其他消息一样,可从 NIMConverationManager 提供的消息查询接口中获取.

* SDK 在收到群通知之后,会对本地缓存的群信息做出对应的修改,然后触发与修改相对应的委托事件回调。

* 群通知是接收型的消息,开发者不应该自己手动去创建和发送群通知消息。

* 群消息通知设置 SDK 提供了修改群消息通知的接口,上层可以通过设置这个选项以影响群消息的通知行为。当设置 notify 为 false 时,群内消息将不会有 APNS 通知。当然上层也可以使用这一属性来决定收到在线消息时的 APP 表现 (是否响铃等)。

```
var param = {
	teamId:,//群Id
	notify:,//notify为 false 时,群内消息将不会有 APNS 通知
};
```
>###cbUpdateNotifyStateForTeam(param)  修改群消息通知状态回调

```
var param = {
	error:,//成功error为空。
};
```

##2.7、系统通知
***
除消息通道外,NIM SDK 还提供系统通知这种通道用于消息之外的通知分发。目前有两种类型:内置系统通知和自定义系统通知。

内置:这是由 NIM SDK 预定义的通知类型,目前仅支持几种群操作的通知,如被邀请入群,SDK 负责这些通知的持久化。所有的内置系统通知都是通过onReceiveSystemNotification下发给 APP。为了保证整个程序逻辑的一致性,APP 需要针对不同类型的系统通知进行相应的操作。

>###onReceiveSystemNotification(param)  内置系统通知监听

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

#3、附录
>###iOS端状态码

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

>###Android端状态码

| code | 详细描述 |
| ----- | ----- |
| 408 | 超时 |
| 1000 | 本地操作异常 |

>###服务器端状态码

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
#4、更新历史

### iOS

API版本:`uexNIM-3.0.0`

最近更新时间:`2016-01-16`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 网易云信(uexNIM)插件 for iOS |

### Android

API版本:`uexNIM-3.0.0`

最近更新时间:`2016-4-11`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 网易云信(uexNIM)插件 |
#5 文档更新记录

