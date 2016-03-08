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
	username:,//用户名
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

和手动登录不同,自动登录是通过委托通知登录状态.APP通过onLogin通知登录状态(手动登录也会收到同样的委托回调)。自动登录过程不需要 APP 加以干预,SDK 会不停重试(在有网络的情况下)直到登录为止。但下面两种异常情况需要 APP 处理:被踢和特殊的登录错误。

param为json字符串

```
var param = {
	username:,//用户名
	password:,//密码
};
```
>###onLogin(param)  被踢的回调(自动登录)

自动登录过程不需要 APP 加以干预,SDK 会不停重试(在有网络的情况下)直到登录为止。但下面两种异常情况需要 APP 处理:被踢和特殊的登录错误。

param为json字符串

```
var param = {
	step:,//
};
```
| step | 登录步骤枚举|
| ----- | ----- |
| 1 | 连接服务器 |
| 2 | 连接服务器成功 |
| 3 | 连接服务器失败 |
| 4 | 登录 |
| 5 | 登录成功 |
| 6 | 登录失败 |
| 7 | 开始同步 |
| 8 | 同步完成 |
| 9 | 网络切换:这个并不是登录步骤的一种,但是UI有可能需要通过这个状态进行UI展现 |
>###onKick(param)  被踢的回调(自动登录)

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
| 2 | 被服务器踢下线 |
| 3 | 被另外一个客户端手动选择踢下线 |
>###onAutoLoginFailed(param)  自动登录失败的回调(自动登录)

大部分自动登录回调错误 APP 并不需要关心,只需注意如下两种情况:

* 用户名密码错误导致自动登录失败,error code 为 302。这种情况一般发生于用户在其他设备上修改了密码。
* 已有一端登录导致自动登录失败,error code 为 417。这种情况发生于已有一端在线而当前设备进行自动登录(设置为只允许一端同时登录时),出于安全方面的考虑,云信服务器判定当前端需要重新手动输入用户密码进行登录,故拒绝登录。

一旦发生如上情况,APP 同样需要进行注销并切换到登录界面。

param为json字符串

```
var param = {
	error:,
};
```
>###onAutoLoginFailed(param)   多端登录监听

云信内置踢人策略为:移动端(Android,iOS)互踢,桌面端(PC,Web)互踢,移动端和桌面端共存。

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

>###registerUser(param)  注册(网易云信不能通过客户端sdk创建账号)

云信的账号体系和应用的账号体系是一个业务绑定的关系,创建账号在应用服务器进行可以有效控制账号的创建行为,任何应用的客户端都存在被破解的风险,如果直接通过客户端就可以创建云信账号可能会使您的应用出现被盗刷账号的情况。可能友商提供类似的客户端接口,使您在开发的时候节省了几行代码,但是为您的应用安全埋下了风险的种子。

* 只有网易云信提供的测试appKey 才能够使用这个注册接口
appKey:45c6af3c98409b18a84451215d0bdd6e;
apnsCertName:ENTERPRISE;

param为json字符串

```
var param = {
	username:,//用户名
	nickname:,//昵称
	password:,//密码
};
```

>###cbRegisterUser(param) 注册回调

param为json字符串

```
var param = {
	result:,//true or false
	error:,//提示信息,result为true时为空
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

>###sendLocationMsg(param)//发送地理位置信息

param为json字符串

```
var param = {
	sessionId:,//单聊时聊天人的userid或者群聊时groupid
	sessionType:,//0-单聊,1-群聊
	title:,//位置的地址名
	latitude:,
	longitude:,

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

>###onSendMessageWithProgress(param) 消息发送进度回调监听

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
	progress:,//发送进度
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
>###resendMessage 重发

因为网络原因等导致的发送消息失败而需要重发的情况,直接调用,此时如果再次调用 sendMessage,则会被 NIM SDK 认作新消息。(发送成功了得消息,调用此接口无效)
>###cbResendMessage(param) 重发

```
var param = {
	result:,//true or false
};
```
>###onRecvMessages(param) 收到新消息监听

如果收到的是图片,视频等需要下载附件的消息,会自动下载。在监听的处理中会调用onFetchMessageAttachment和cbFetchMessageAttachment这两个回调返回进度和结果。
>###onFetchMessageAttachment(param) 收到新消息下载进度监听 

```
var param = {
	message:,
	progress:,
};
```
>###cbFetchMessageAttachment(param) 收到新消息下载结果回调

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
	error:,//失败原因,如果发送成功则error为空
	path:,//本地路径
	url:,//远程路径
	fileLength:,//文件大小(音频文件没有这个字段)
	thumbPath://缩略图本地路径(图片)
	thumbPath:,//缩略图远程路径(图片)
	duration:,//时长,毫秒为单位(音频,视频)
	coverUrl:,//视频封面的远程路径(视频)
	coverPath:,//视频封面的本地路径(视频)
};
```
>###allRecentSession 获取最近会话

获取最近会话,一般用于首页显示会话列表 .开发者无法自己添加最近消息,最近消息会在发送或者收到消息的时候自动添加,并触发增加最近会话的回调。
>###cbAllRecentSession 获取最近会话会话的回调

```
var param = {
	lastMessage:,//最后一条消息
	unreadCount:,//未读消息数
	sessionId:,//当前会话id
	sessionType:,//当前会话type
};
```
>###cbAddRecentSession 最近增加会话的回调

```
var param = {
	lastMessage:,//最后一条消息
	unreadCount:,//未读消息数
	sessionId:,//当前会话id
	sessionType:,//当前会话type
	totalUnreadCount:,//总未读消息数
};
```
>###cbUpdateRecentSession 最近修改会话的回调

```
var param = {
	lastMessage:,//最后一条消息
	unreadCount:,//未读消息数
	sessionId:,//当前会话id
	sessionType:,//当前会话type
	totalUnreadCount:,//总未读消息数
};
```
>###cbRemoveRecentSession 最近删除会话的回调

```
var param = {
	lastMessage:,//最后一条消息
	unreadCount:,//未读消息数
	sessionId:,//当前会话id
	sessionType:,//当前会话type
	totalUnreadCount:,//总未读消息数
};
```
>###deleteMessage 会话的删除 单条消息的删除

调用此方法时,如果删除的是最后一条消息,消息所属的最近会话的 lastMessage 属性会自动变成上一条消息(没有则为空消息),同时触发最近消息修改的回调。删除成功cbUpdateRecentSession会有回调

```
var param = {
	sessionId:,
	sessionType:,
	messageId:,
};
```
>###deleteAllmessagesInSession 单个会话批量消息删除 

removeRecentSession 标记了最近会话是否会被保留,会话内消息将会标记为已删除。调用此方法会触发最近消息修改的回调,如果选择保留最近会话,lastMessage 属性将会被置成一条空消息。删除成功触发cbRemoveRecentSession

```
var param = {
	sessionId:,
	sessionType:,
	removeRecentSession:,//标记了最近会话是否会被保留 true:保留,false:删除。
};
```
>###deleteAllMessages 清空所有会话的消息 

调用这个接口只会触发cbAllMessagesDeleted 回调,其他针对单个recentSession的回调都不会被调用。

```
var param = {
	removeRecentSession:,//标记了最近会话是否会被保留 true:保留,false:删除。
};
```
>###cbAllMessagesDeleted 清空所有会话的消息回调
 
>###allUnreadCount 总未读数获取
>###cbAllUnreadCount 总未读数获取回调

```
var param = {
	count:,
};
```
>###markAllMessagesReadInSession 标记某个会话为已读 

调用这个方法时,会将所有属于这个会话的消息都置为已读状态。相应的最近会话(如果有的话)未读数会自动置 0 并且触发最近消息修改的回调cbUpdateRecentSession.

```
var param = {
	session:,
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
	limit:,//检索条数, 最大限制100条
	order:,//检索顺序,0:从新消息往旧消息查询,1:从旧消息往新消息查询
	sync:,//同步数据: 是否在远程获取消息成功之后同步到本地数据库,如果选择同步,则同步之后不会触发消息添加的回调。默认不同步(false),true为同步。
};
```
>###cbFetchMessageHistory(param) 云端记录回调 

```
var param = {
	messages:,
	error:,
};
```
>###messagesInSession(param) 本地记录 

支持本地查询消息,传入一个已知的消息,返回比这个消息更早的消息集合。如果没有已知的消息,则传入 nil,返回最新的消息集合。

```
var param = {
	sessionId:,
	messageType:,
	limit:,
};
```
>###cbMessagesInSession(param) 本地记录回调 

```
var param = {
	messages:,
};
```
>###searchMessages(param) 本地历史记录 

搜索将返回: 时间在(startTime,endTime)内(不包含),类型为messageType,且 匹配searchContent或fromIds 的一定数量(limit)消息

```
var param = {
	sessionId:,
	sessionType:,
	startTime:,//起始时间,默认为0
	endTime:,//结束时间,默认为0,搜索的结束时间,0表示最大时间戳
	limit:,//检索条数, 最大限制100条
	order:,//检索顺序,0:从新消息往旧消息查询,1:从旧消息往新消息查询
};
```
>###cbSearchMessages(param) 本地历史记录回调 

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

>###isRecording  判断是否正在录制音频
>###cbIsRecording(param)  判断是否正在录制音频回调

```
var param = {
	isPlaying:,
};
```
>###recordAudioForDuration(param)  录制音频

```
var param = {
	duration:,// 限制了录音的最大时长,单位s
	updateTime:, //录制音频进度回调频率,默认为 0.3 秒
};
```
>###cbBeganRecordAudio(param)  开始录制音频回调

当初始化工作完成,准备开始录制的时候会触发

```
var param = {
	filePath:,//音频文件的路径
	error:,
};
```
>###cbCompletedRecordAudio(param)  停止录制音频回调

当到录音时长达到设置的最大时长,或者手动停止录音会触发

```
var param = {
	filePath:,//音频文件的路径
	error:,
};
```
>###onRecordAudioProgress(param)  当前的录音时长回调

其中 currentTime 为当前的录音时长,触发该回调的时间间隔可以通过recordProgressUpdateTimeInterval设置,默认为 0.3 秒

```
var param = {
	currentTime:,
};
```
>###stopRecord  停止录制音频

该操作会触发cbCompletedRecordAudio
>###cancelRecord  取消录音

该操作会触发cbCecordAudioDidCancelled
>###cbCecordAudioDidCancelled(param)  取消录音回调

当到录音时长达到设置的最大时长,或者手动停止录音会触发
>###onPlayAudioInterruptionBegin  来电打断监听

来电时会根据正在播放音频触发
>###onRecordAudioInterruptionBegin  来电打断监听

来电时会根据正在录音触发
>###onPlayAudioInterruptionEnd  通话结束监听

来电时会根据正在播放音频,通话结束返回应用触发
>###onRecordAudioInterruptionEnd  通话结束监听

来电时会根据正在录音,通话结束返回应用触发

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
>###fetchTeamInfo(param)  远程获取群组信息

```
var param = {
	teamId:,//
};
```

>###cbTeamById(param)  获取群组信息回调

```
var param = {
	team:,//team内详细参数见下表；
	error:,//获取成功,error为空.
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
>###createTeam(param)  创建群组

```
var param = {
	name:,//群名称;
	type:,//创建群类别,普通群:0,高级群:1,默认为普通群;
	joinMode:,//群验证方式,只有高级群才有群验证模式,普通群一律不需要验证.默认为不需要,允许所有人加入:0,需要验证:1,不允许任何人加入:2;
	postscript:,//邀请附言,当创建的群为高级群需要带上,普通群没有认证过程,所以不需要;
	intro:,//群介绍,可选参数;
	announcement:,//群公告,可选参数;
	
	users:,//array类型,邀请群成员.不能为空,不邀请人时传自己的userId;
};
```
创建成功将触发回调cbTeamAdded.
>###cbCreateTeam(param)  创建群组回调

```
var param = {
	teamId:,//
	error:,//
};
```
>###cbTeamAdded(param)  创建群组成功回调

```
var param = {
	team:,//
};
```
>###addUsers(param)  邀请用户入群

请求完成后,如果是普通群,被邀请者将直接入群；如果是高级群,云信服务器会下发一条系统消息到目标用户,目标用户可以选择同意或者拒绝入群。

```
var param = {
	teamId:,//群Id
	users:,//
	postscript:,//
};
```
>###cbAddUsers(param)  邀请用户入群回调

```
var param = {
	error:,//发送成功,error为空。
};
```
>###acceptInviteWithTeam(param)  同意群邀请(仅限高级群)

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
	applyStatus:,//0:无效状态,1:已经在群里,2:申请等待通过.
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
>###addManagersToTeam(param)  提升管理员(仅限高级群)

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
| invitor | 邀请者 |
| type | 群成员类型,0:普通群员,1:群拥有者,2:群管理员,3:申请加入用户 |
| 群昵称 | nickname |
>###quitTeam(param)  用户退群

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
>###updateNotifyState(param)  修改群消息通知

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
>###cbUpdateNotifyState(param)  修改群消息通知回调

```
var param = {
	error:,//成功error为空。
};
```
>###updateTeamCustomInfo(param)  修改自定义拓展

SDK 提供了群信息的拓展接口,开发者可以自行定义内容。开发者可以通过 serverCustomInfo,clientCustomInfo 的两个属性读取拓展信息

```
var param = {
	info:,//拓展信息 string
	teamId:,//
};
```
>###cbUpdateTeamCustomInfo(param)  修改自定义拓展回调

```
var param = {
	error:,//成功error为空。
};
```
>###onTeamUpdated(param)  群信息更新监听

用户的群信息会在以下条件下更新:

* 同意入群申请(或不需验证自动入群)；
* 移除成员；
* 任命管理员；
* 移交群主；
* 修改群组名称；
* 更改群验证方式；
* 更改群介绍；
* 更改群公告；

这些操作成功后,云信服务器会推送一条群通知。

```
var param = {
	team:,//
};
```
>###onTeamRemoved(param)  群信息移除监听

用户的群信息会在以下条件下移除:

* 群解散；
* 退群；
* 被踢出群；

这些操作成功后,云信服务器会推送一条群通知。

```
var param = {
	team:,//
};
```
>###onTeamRemoved(param)  群组通知

用户在创建群或者进入群成功之后,任何关于群的变动,云信服务器都会下发一条群通知消息。

* SDK 在收到群通知之后,会对本地缓存的群信息做出对应的修改,然后触发与修改相对应的委托事件回调。
* 群通知是接收型的消息,开发者不应该自己手动去创建和发送群通知消息。
* 群消息通知设置 SDK 提供了修改群消息通知的接口,上层可以通过设置这个选项以影响群消息的通知行为。当设置 notify 为 NO 时,群内消息将不会有 APNS 通知。当然上层也可以使用这一属性来决定收到在线消息时的 APP 表现 (是否响铃等)。

```
var param = {
	teamId:,//
	notify:,//当设置 notify 为 false 时,群内消息将不会有 APNS 通知
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
| postscript | 附言 |
| read | 是否已读 |
>###fetchSystemNotifications(param)  获取本地存储的内置系统通知

```
var param = {
	limit:,//最大获取数
};
```
>###cbFetchSystemNotifications(param)  获取本地存储的内置系统通知回调

```
var param = {
	notification:,// 内置系统通知
};
```
>###allNotificationsUnreadCount  获取本地存储的内置系统未读数
>###cbAllNotificationsUnreadCount(param)  获取本地存储的内置系统未读数回调

```
var param = {
	count:,// 
};
```
>###deleteAllNotifications  删除本地存储的全部内置系统通知
>###markAllNotificationsAsRead  标记本地存储的全部内置系统通知为已读
>###markAllNotificationsAsRead  标记本地存储的全部内置系统通知为已读回调

```
var param = {
	result:,// 
};
```
>###sendCustomNotification(param)  发送自定义通知(客户端)

除了内置系统通知外,NIM SDK 也额外提供了自定义系统给开发者,方便开发者进行业务逻辑的通知。这个通知既可以由客户端发起也可以由开发者服务器发起。

注意:自定义通知和自定义消息的不同之处在于,自定义消息归属于网易云信的消息体系内,适用于会话,由 SDK 存储在消息数据库中,与网易云信的其他内建消息类型一同展现给用户。而自定义通知主要用于第三方的一些事件状态通知,SDK 不存储,也不解析这些通知。SDK 仅仅负责替第三方传递和通知这些事件,起到透传的作用。

```
var param = { 
	sessionType:,//
	sessionId:,//
	sendToOnlineUsersOnly:,//是否只发送给在线用户,默认为TRUE 如果这个值为FALSE,通知接受者如果在通知投递时不在线,那么他会在下次登录时收到这个通知。如果消息接受者是群,则只允许投递到当前在线的用户
	content:,//透传的消息体内容
	apnsContent:,//apns推送文案,默认为nil,用户可以设置当前通知的推送文案
	shouldBeCounted:,//系统通知是否需要被计入苹果推送通知的未读计数,默认为TRUE。默认情况下,用户收到的自定义系统通知会在应用图标上累计未读。
	apnsEnabled:,//消息是否需要苹果推送,默认为TRUE。将这个字段设为FALSE,消息将不再有苹果推送通知。
	apnsWithPrefix:,//苹果推送是否需要带前缀(一般为昵称),默认为FALSE。将这个字段设为TRUE,推送消息将带有前缀(xx:)。
};
```
客户端发起的自定义通知目前支持自定义如下字段:通知内容,推送文案(如果没有则不进行 APNS 推送),是否只发给在线用户。最后一个字段的意义在于区分自定义通知的使用场景。sendToOnlineUsersOnly选择只发给在线用户,当目标用户不在线时这条通知会被云信服务器丢弃,这种实现比较适合发送即时通知,如正在输入。反之云信服务器会缓存当前通知(有上限),并在目标用户上线后推送给目标用户。
>###cbSendCustomNotification(param)  发送自定义通知回调(客户端)

```
var param = {
	error:,// 
};
```
>###onReceiveCustomSystemNotification(param)  接受自定义通知监听

除了内置系统通知外,NIM SDK 也额外提供了自定义系统给开发者,方便开发者进行业务逻辑的通知。这个通知既可以由客户端发起也可以由开发者服务器发起。

注意:自定义通知和自定义消息的不同之处在于,自定义消息归属于网易云信的消息体系内,适用于会话,由 SDK 存储在消息数据库中,与网易云信的其他内建消息类型一同展现给用户。而自定义通知主要用于第三方的一些事件状态通知,SDK 不存储,也不解析这些通知。SDK 仅仅负责替第三方传递和通知这些事件,起到透传的作用。

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

##2.8、APNS 推送(以下方法全部仅限iOS)
***
NIM SDK 提供全局 APNS 属性设置,用于设置免打扰时间和推送样式
>### registerAPNS(param)  初始化
>### cbRegisterAPNS(param)  初始化回调

param为json字符串

```
  var param{
	result:,//true ,false
	error:,//result为false时才有
};
```
>###getApnsSetting(param) 获取推送设置
>###cbGetApnsSetting(param) 获取推送设置回调

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
>###updateApnsSetting(param) 修改推送设置

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
>###cbUpdateApnsSetting(param) 修改推送设置回调

param为json字符串

```
var param = {
	error:,
}
```
##2.9、用户资料托管
***
网易云信提供了用户帐号资料管理。以下几个接口仅当选择云信托管用户资料时有效,如果开发者不希望云信获取自己的用户数据,则需自行维护用户资料。

>###userInfo(param) 获取本地用户资料

用户资料除自己之外,不保证其他用户资料实时更新。其他用户数据更新时机为:

* 调用fetchUserInfos:completion方法刷新用户
* 收到此用户发来消息
* 程序再次启动,此时会同步好友资料

当用户资料更新时,会触发监听onUserInfoChanged。

param为json字符串

```
var param = {
	userId:,
}
```
>###cbUserInfo(param) 获取本地用户资料回调

```
var param = {
	userId:,
	alias:,//备注名,长度限制为128个字符
	notifyForNewMsg:,//是否需要消息提醒
	isInMyBlackList:,//是否在黑名单中
	userInfo:,//详细参数见下表
}
```
| 参数 | 参数详情 |
| ----- | ----- |
| nickName | 用户昵称 |
| avatarUrl | 用户头像 |
| thumbAvatarUrl | 用户头像缩略图,仅适用于使用云信上传服务进行上传的资源。否则为和用户头像原图值一致。 |
| sign | 用户签名 |
| gender | 用户性别0:未知性别,1:男,2:女 |
| email | 邮箱 |
| birth | 生日 |
| mobile | 电话号码 |
| ex | 用户自定义扩展字段 |
>###onUserInfoChanged(param) 用户资料更新监听

param为json字符串

```
var param = {
	user:,
}
```
>###fetchUserInfos(param) 获取服务器用户资料

此接口可以批量从服务器获取用户资料,出于用户体验和流量成本考虑,不建议应用频繁调用此接口。对于用户数据实时性要求不高的页面,应尽量调用读取本地缓存接口。当获取用户成功后,会触发监听onUserInfoChanged。

param为json字符串

```
var param = {
	userIds:,//用户id列表
}
```
>###cbFetchUserInfos(param) 获取服务器用户资料回调

```
var param = {
	users:,
}
```
>###updateMyUserInfo(param)   更新当前用户信息

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

	注:此方法主要为了在苹果推送时能够推送昵称(nickname)而不是userid,一般可以在登陆成功后从自己服务器获取到个人信息,然后拿到nick更新到网易云信服务器。并且,在个人信息中如果更改个人的昵称,也要把网易云信服务器更新下nickname 防止显示差异。
>###cbUpdateMyUserInfo(param)   更新当前用户信息回调

```
var param = {
	error:,
}
```
##2.10、用户关系托管
***
网易云信提供了用户用户关系管理,以及对用户会话的消息设置。在云信中,不是好友也允许聊天。用户关系如果不托管给云信,开发者需要自己在应用服务器维护。
>###myFriends   获取好友列表
>###cbMyFriends(param)   获取好友列表回调

好友列表有本地缓存,缓存会在手动/自动登录后与服务器自动进行同步更新。接口返回的是 User 列表。 User 封装了开发者向云信托管的好友ID,对此好友的会话设置(是否需要消息提醒,是否是拉黑用户等), 以及用户的详细信息 UserInfo (需要将用户信息交给云信托管)。

param为json字符串

```
var param = {	
	users:,
};
```
>###requestFriend(param)   好友请求

好友请求包括请求添加好友以及同意/拒绝好友请求两种；
验证方式有不需要验证方式(一旦请求后双方直接互为好友)和需要验证的两种。

param为json字符串

```
var param = {	
	userId:,//目标用户ID
	operation:,//1:添加好友(直接添加为好友,无需验证) 2:请求添加好友 3:通过添加好友请求 4:拒绝添加好友请求
	message:,//自定义验证消息
};
```
>###cbRequestFriend(param)   好友请求发送回调

```
var param = {	
	error:,
};
```
>###onFriendChanged(param)   好友添加成功监听

param为json字符串

```
var param = {	
	user:,
};
```
>###deleteFriend(param)   删除好友

解除成功后,会同时修改本地的缓存数据,并触发onFriendChanged

param为json字符串
```
var param = {	
	userId:,
};
```
>###cbDeleteFriend(param)   删除好友回调

```
var param = {	
	error:,
};
```
>###myBlackList(param)   获取黑名单成员列表

云信中,黑名单和好友关系是互相独立的,即修改好友关系不会影响黑名单关系,同时,修改黑名单也不会对好友关系进行操作。
黑名单列表有本地缓存,缓存会在手动/自动登录后与服务器自动进行同步更新。接口返回的是User 列表

>###cbMyBlackList(param)   获取黑名单成员列表回调

param为json字符串

```
var param = {	
	users:,
};
```
>###addToBlackList(param)   添加用户到黑名单

拉黑成功后,会同时修改本地缓存,并触发回调onBlackListChanged

param为json字符串

```
var param = {	
	userId:,
};
```
>###cbAddToBlackList(param)   添加用户到黑名单回调

```
var param = {	
	error:,
};
```
>###removeFromBlackBlackList(param)   将用户从黑名单移除

移除成功后,会同时修改本地缓存,并触发回调onBlackListChanged

param为json字符串

```
var param = {	
	userId:,
};
```
>###cbRemoveFromBlackBlackList(param)   将用户从黑名单移除

```
var param = {	
	error:,
};
```
>###onBlackListChanged   用户黑名单更新监听
>###isUserInBlackList(param)   将判断用户是否在自己的黑名单内

此接口是根据本地缓存数据来判断是否拉黑的,在调用时请保证本地缓存是正确的(登录后有正常完成数据同步)。

param为json字符串

```
var param = {	
	userId:,
};
```
>###cbIsUserInBlackList(param)   将判断用户是否在自己的黑名单内回调

param为json字符串

```
var param = {	
	result:, //true,false
};
```
>###myMuteUserList   获取静音成员列表

云信中,可以单独设置是否开启某个用户的消息提醒,即对某个用户静音。静音关系和好友关系是互相独立的,修改好友关系不会影响静音关系,同时,修改静音关系也不会对好友关系进行操作。

静音列表有本地缓存,缓存会在手动/自动登录后与服务器自动进行同步更新。接口返回的是 User 列表。 User 封装了开发者向云信托管的好友ID,对此好友的会话设置(是否需要消息提醒,是否是拉黑用户等), 以及用户的详细信息 UserInfo (需要将用户信息交给云信托管)。
>###cbMyMuteUserList(param)   获取静音成员列表回调

param为json字符串

```
var param = {	
	users:, //
};
```
>###updateNotifyStateForUser(param)   设置消息提醒

设置成功之后,同时更新本地缓存数据。

param为json字符串

```
var param = {	
	userId:, //
	notify:, //true,false
};
```
>###cbUpdateNotifyStateForUser(param)   设置消息提醒回调

设置成功之后,同时更新本地缓存数据。

param为json字符串

```
var param = {	
	error:,//
};
```
>###notifyForNewMsg(param)   设置是否需要消息通知

此接口是根据本地缓存数据来判断是否是拉黑的,在调用时请保证本地缓存是正确的(登录后有正常完成数据同步)。当设置成功后,会触发监听onUserInfoChanged

param为json字符串

```
var param = {	
	userId:, //
};
```
>###cbNotifyForNewMsg(param)   设置是否需要消息通知回调

param为json字符串

```
var param = {	
	result:, //true,false
};
```
##2.11、音视频通话
***
网易云信提供基于网络的点对点视频通话和语音通话功能,支持通话中音视频设备控制,并支持通话中实时音视频模式切换。
>###start(param)   主叫发起通话请求

发起通话需要指定类型,在成功建立通话之前不允许进行通话类型切换。

```
var param = {	
	userId:, // 被叫帐号
	type:,// 呼叫类型1:音频,2:视频
};
```
>###cbStart(param)   主叫发起通话请求回调

如果发起成功,返回的 error为空,Call ID 用于唯一标识一通网络通话,后续对该通话的操作及回调均由 Call ID 区分。

```
var param = {	
	error:, // 如果发起成功,返回的 error 为空
	callID:,// Call ID 用于唯一标识一通网络通话,后续对该通话的操作及回调均由 Call ID 区分
};
```
>###onReceive(param)   被叫收到通话请求监听

在成功建立通话之前不允许进行通话类型切换。

```
var param = {	
	userId:, // 主叫帐号
	callID:,// Call ID 用于唯一标识一通网络通话,后续对该通话的操作及回调均由 Call ID 区分
	type:,// 呼叫类型1:音频,2:视频
};
```
>###response(param)   被叫响应通话请求

请在发起视频通话或同意视频通话前调用initRemoteView初始化视频通话界面。

```
var param = {	
	accept:, // 是否同意true,false
	callID:,// Call ID 用于唯一标识一通网络通话,后续对该通话的操作及回调均由 Call ID 区分
};
```
>###cbResponse(param)   被叫响应通话请求回调

如果响应成功,返回的 error 为空,如果该通话已被该帐号其他端处理,error 携带错误码。

```
var param = {	
	error:, // 
};
```
>###onResponse(param)   主叫收到被叫响应监听

请在发起视频通话或同意视频通话前调用initRemoteView初始化视频通话界面

```
var param = {	
	userId:, // 被叫帐号
	accept:, // 是否同意true,false
	callID:,// Call ID 用于唯一标识一通网络通话,后续对该通话的操作及回调均由 Call ID 区分
};
```
>###onResponsedByOther(param)   呼入的通话已经被该帐号其他端处理监听

已经其他端处理过的通话本端不能再做接听、拒绝或挂断操作。

```
var param = {	
	accept:, // 是否同意true,false
	callID:,// 
};
```
>###onCall(param)   连接建立结果监听

收到已断开状态时无需调用 hangup挂断该通话。

```
var param = {	
	status:, // 网络通话状态1:已连接,2:已断开
	callID:,// 
};
```
>###control(param)   发送通话控制信息

通话控制信息用于方便通话双方沟通,可以选择性使用

```
var param = {	
	type:, // 控制类型,详建下表
	callID:,// 
};
```
| type | 控制类型|
| ----- | ----- |
| 1 | 通知对方本端取消了静音 |
| 2 | 通知对方本端开启了静音 |
| 3 | 通知对方本端打开了摄像头 |
| 4 | 通知对方本端关闭了摄像头 |
| 5 | 请求对方切换到视频模式 |
| 6 | 同意切换到视频模式,用于切到视频模式需要对方同意的场景 |
| 7 | 拒绝切换到视频模式,用于切到视频模式需要对方同意的场景 |
| 8 | 通知对方本端切换到了音频模式 |
| 9 | 被叫通知主叫本端占线,用于主叫需要播放忙音的场景 |
| 10 | 通知对方本端摄像头不可用 |
| 11 | 通知对方本端切换到了后台 |
| 12 | 被叫通知主叫已经收到了通话请求,用于主叫需要确认被叫收到请求再播放回铃 |
>###cbControl(param)   发送通话控制信息结果回调

```
var param = {	
	result:, // 
};
```
>###onControl(param)   收到通话控制信息回调

```
var param = {	
	type:, // 控制类型,详建上表
	callID:,// 
	userId: //对方账号
};
```
>###hangup(param)   结束通话

```
var param = {	
	callID:,// 
};
```
>###cbHangup(param)   结束通话发送回调

```
var param = {	
	result:, // 
};
```
>###onHangup(param)   收到对方结束通话监听

收到该回调后无需调用 hangup结束通话

```
var param = {	
	callID:,// 
	userId: //对方账号
};
```
>###currentCallID   获取当前通话 CallID
>###cbCurrentCallID   获取当前通话 CallID回调

```
var param = {	
	callID:,// 如果没有正在进行中的通话则返回0
};
```
>###onCallNetStatus   当前通话网络状况监听

通常用于在UI上展现网络信号

```
var param = {	
	callID:,// 
	netStatus:,//网络非常好:0,网络好:1,网络差:2,网络非常差:3
};
```
>###callNetStatus   获取当前通话网络状况
>###cbCallNetStatus   获取当前通话网络状况回调

```
var param = {	
	netStatus:,//网络非常好:0,网络好:1,网络差:2,网络非常差:3
};
```
>###initRemoteView   初始化视频通话界面

请在发起视频通话或同意视频通话前调用

```
var param = {	
	remoteViewX:,//远程视频界面X
	remoteViewY:,//远程视频界面Y
	remoteViewW:,//远程视频界面W
	remoteViewH:,//远程视频界面H
	localViewX:,//本地视频界面相对于远程视频界面X
	localViewY:,//本地视频界面相对于远程视频界面Y
	localViewW:,//本地视频界面相对于远程视频界面W
	localViewH:,//本地视频界面相对于远程视频界面H
};
```
>###cbInitRemoteView   初始化视频通话界面回调

```
var param = {	
	result:,// true,false
};
```
>###removeRemoteView   移除视频通话界面

请在通话结束后调用此接口

>###cbRemoveRemoteView   移除视频通话界面回调

```
var param = {	
	result:,// true,false
};
```
>###setMute   通话中的设备控制-设置静音

静音后对端将听不到本端的声音。

```
var param = {	
	mute:,// 是否静音true,false
};
```
>###cbSetMute   通话中的设备控制-设置静音回调

静音后对端将听不到本端的声音。

```
var param = {	
	result:,// true,false
};
```
>###setSpeaker   通话中的设备控制-设置扬声器

用于在扬声器和听筒间切换。

```
var param = {	
	useSpeaker:,// 扬声器为true
};
```
>###cbSetSpeaker   通话中的设备控制-设置扬声器回调

```
var param = {	
	result:,// true,false
};
```
>###switchCamera   通话中的设备控制-切换摄像头

用于在前后摄像头之间切换

```
var param = {	
	camera:,// 1:前置,2:后置
};
```
>###setCameraDisable   通话中的设备控制-关闭摄像头功能设置

关闭摄像头以后对方将收不到自己的视频画面

```
var param = {	
	disable:,// true,false
};
```
>###cbSetCameraDisable   通话中的设备控制-关闭摄像头功能设置回调

```
var param = {	
	result:,// true,false
};
```

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

最近更新时间:`2016-1-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 网易云信(uexNIM)插件 |
#5 文档更新记录

