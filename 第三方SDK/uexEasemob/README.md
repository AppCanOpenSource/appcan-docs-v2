[TOC]
#1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
环信插件
##1.1、 说明
本插件是基于环信API封装的AppCan平台的插件模块，用户可以使用本插件实现基本的即时通讯功能，包括——
单聊功能：支持发送语音，图片，表情，文字，位置，附件；
群聊功能：支持500人到2000人大群，拥有完善的群组权限管理；
实时语音 ：基于IP网络的点对点实时语音，适应低带宽要求；

> **使用前说明：**

本插件为单例插件 ——

* 在任何网页调用本插件，调用的是同一个插件实例;
* 所有的API都是异步方法，不会直接返回值;
* 所有的回调都会传到root页面（config.xml中配置的App起始页面）

**以上内容非常重要**

root页面收到回调后，可以通过uexWindow的相关方法传递到各个网页去，
以下方法是您可能要用到的——

 传递给某个窗口:
 
* uexWindow.evaluateScript;
* uexWindow.evaluatePopoverScript
* uexWindow.evaluateMultiPopoverScript

 传递给某些窗口:
 
* uexWindow.publishChannelNotification
* uexWindow.subscribeChannelNotification

这些方法具体用法在[uexWindow文档](http://newdocx.appcan.cn/newdocx/ejsTemplate?type=1318_1249) 内有描述

当然，也可[下载Demo](http://plugin.appcan.cn/details.html?id=406_index) 参考Demo内的调用。
 
##1.2、 UI展示
暂无
 
##1.3、 开源源码
插件测试用例与自定义插件下载：[点击此处](http://plugin.appcan.cn/details.html?id=406_index)  （插件测试用例与插件源码已经提供）

 
##1.4、 术语表

Path Types

 | 协议头 | Android对应路径 (其中"/sdcard/"等 同于"/storage/emulated/0/") | iOS对应路径 | 
 | ------------ | ------------ | ------------ | 
 | res:// | widget/wgtRes/ | widget/wgtRes | 
 | wgts:// | /storage/emulated/0/widgetone/apps/ xxx(widgetAppId)/ | /Documents/apps/xxx(widgetAppId)/ | 
 | wgts:// | /storage/emulated/0/widgetone/widgets/ | /Documents/widgets/ | 
 | file:///sdcard/ | /storage/emulated/0/ | 无 | 
 


 


#2、API概述		
##2.1、Initialization
***
>### initEasemob(param)  初始化


param为json字符串

```
  var param{
  
	appKey:,//区别app的标识（仅iOS）     
	apnsCertName:,//iOS中推送证书名称（仅iOS）
	isAutoLoginEnabled:,//可选参数 是否开启自动登录功能 1-开启 2-关闭
     
	
};
```

	注：Android中 初始化需要在AndroidManifest.xml中配置；
	   自动登录功能Android SDK 默认开启，iOS SDK默认关闭。
	
>### login(param)   登录



param为json字符串

```
var param = {
	username:,//用户名
	password:,//密码
};
```

>###cbLogin(param)  登陆回调

param为json字符串

```
var param = {
	result:,//1-成功，2-失败
	msg:,//提示信息
};
```

>###logout()   退出登录

>###registerUser(param)  注册

param为json字符串

```
var param = {
	username:,//用户名
	password:,//密码
};
```

>###cbRegisterUser(param) 注册回调

param为json字符串

```
var param = {
	result:,//1-成功，2-失败
	msg:,//提示信息
};
```

>###updateCurrentUserNickname(param)   更新当前用户的昵称

param为json字符串

```
var param = {	
	
	nickname:,
};
```

	注：此方法主要为了在苹果推送时能够推送昵称(nickname)而不是userid,一般可以在登陆成功后从自己服务器获取到个人信息，然后拿到nick更新到环信服务器。并且，在个人信息中如果更改个人的昵称，也要把环信服务器更新下nickname 防止显示差异。


>###getLoginInfo() 获取当前登陆信息(仅iOS可用)


 

>###cbGetLoginInfo(param 获取当前登陆信息的回调（仅iOS）

param为json字符串

```
 var param={
 	
	userInfo://当前登陆用户信息
	isLoggedIn://当前是否已有登录用户  1-是 2-否
	isConnected://是否连上聊天服务器   1-是 2-否
	isAutoLoginEnabled://是否自动登录  1-是 2-否
};
```

>###onConnected(); 已连接上
>###onDisconnected(param) 链接断开

param为json字符串

```
var param = {
	error:,//1-账号被移除，2-账号其他设备登陆，3-连接不到聊天服务器，4-当前网络不可用 
};
```

##2.2、Message
***
>###onNewMessage（param） 收到新消息监听



	注：param为EMMessage的json格式对象
	EMMessage具体结构见文末附录
	所有离线和在线时接受到的的非透传消息，都通过此回调传递
	   
>###onCmdMessageReceive(param) 透传消息监听

param为json字符串

```
var param = {
	msgId:,
	message:,//EMMessage 对象json格式
	action:,
};
```

>###onAckMessage(param) 消息已读监听

param为json字符串

```
var param = {
	msgId:,//消息ID
	username:,//来源
};
```

>###onDeliveryMessage(param) 消息送达监听

param为json字符串

```
var param = {
	msgId:,//消息ID
	username:,//来源
};
```

>###sendText(param) 发送文本消息及表情

param为json字符串

```
var param = {
	username:,//单聊时聊天人的userid或者群聊时groupid
	chatType:,//0-单聊，1-群聊
	content:,//文本内容
	ext:,//扩展属性（可选参数，String)
};
```

>###sendFile(param) 发送文件

param为json字符串

```
var param = {
	username:,//单聊时聊天人的userid或者群聊时groupid
	chatType:,//0-单聊，1-群聊
	filePath:,//文件路径
	displayName:,//对方接收时显示的文件名（仅iOS需要）
	ext:,//扩展属性（可选参数，String)
};
```

>###sendPicture(param)//发送图片

param为json字符串

```
var param = {
	username:,//单聊时聊天人的userid或者群聊时groupid
	chatType:,//0-单聊，1-群聊
	filePath:,//图片文件路径
	displayName:,//对方接收时显示的文件名（仅iOS需要）
	ext:,//扩展属性（可选参数，String)
};
```

>###sendLocationMsg(param)//发送地理位置信息

param为json字符串

```
var param = {
	username:,//单聊时聊天人的userid或者群聊时groupid
	chatType:,//0-单聊，1-群聊
	locationAddress:,//图片文件路径
	latitude:,
	longitude:,
	ext:,//扩展属性（可选参数，String)

};
```

>###sendVoice(param)//发送语音

param为json字符串

```
var param = {
	
	username:,//单聊时聊天人的userid或者群聊时groupid
	chatType:,//0-单聊，1-群聊
	filePath:,//语音文件路径
	length:,//长度(Android必选，iOS可选)
	displayName：//对方接收时显示的文件名（仅iOS需要）
	ext:,//扩展属性（可选参数，String)
};
```

>###sendVideo(param) 发送视频

param为json字符串

```
var param = {
	
	username:,//单聊时聊天人的userid或者群聊时groupid
	chatType:,//0-单聊，1-群聊
	filePath:,//视频文件路径
	length:,//长度(Android必选，iOS可选)
	displayName：//对方接收时显示的文件名（仅iOS需要）
	ext:,//扩展属性（可选参数，String)
};
```

>###sendCmdMessage(param) 发送透传消息

param为json字符串

```
var param = {
	chatType:,//0-单聊，1-群聊
	action:,//
	toUsername:,//
	ext:,//扩展属性（可选参数，String)
};
```

>###setNotifyBySoundAndVibrate(param) 消息提醒相关配置

param为json字符串

```
var param = {
	enable:,//0-关闭，1-开启。默认为1 开启新消息提醒
	soundEnable:,// 0-关闭，1-开启。默认为1 开启声音提醒
	vibrateEnable:,// 0-关闭，1-开启。默认为1 开启震动提醒
	userSpeaker:,// 0-关闭，1-开启。默认为1 开启扬声器播放（仅Android可用）
	showNotificationInBackgroud:// 0-关闭，1-开启。默认为1。设置后台接收新消息时是否通过通知栏提示 （仅Android可用）
	acceptInvitationAlways:,// 0-关闭，1-开启。默认添加好友时为1，是不需要验证的，改成需要验证为0（仅Android可用）
	deliveryNotification:，// 0-关闭 1-开启  默认为1 开启消息送达通知	（仅iOS可用）
};
```

>###getMessageById(param) 根据id获取消息记录 

param为json字符串

```
var param = {
	msgId:,//消息ID
};
```

>###cbGetMessageById(param) 得到一条消息记录 

param为json字符串

```
var param = {
	msg:,// EMMessage的json格式对象
};
```

>###sendHasReadResponseForMessage(param) 发送消息已读回执

param为json字符串

```
var param ={
	
	msgId:,//消息Id
};
```

>### onMessageSent(param) 消息已发送监听

param为json字符串

```
var param ={

	isSuccess:,//消息是否发生成功 true/false
	errorStr:,//发送失败的原因 当isSuccess为false时才有此项
	message:,//被发送的消息 EMMessage结构的json
};
```

* 所有send开头的发送消息的API均会触发此监听
* 此监听仅表示消息是否成功发送至环信服务器，不能以此判断接收人是否收到消息



##2.3、Conversation
***
>###getConversationByName(param) 根据用户名获取conversation对象

param为json字符串

```
var param = {
	username:,
	chatType:,//聊天类别 0 - 个人 1 - 群组(仅iOS需要，默认0)
}
```

>###cbGetConversationByName(param) 回调

param为json字符串

```
var param = {
	conversation:,// EMConversation的json格式对象，格式见附录
};
```

>###getMessageHistory(param) 获取聊天记录

param为json字符串

```
var param = {
	username:,//单聊时聊天人的userName或者群聊时groupid
	chatType:,//0-单聊，1-群聊
	startMsgId:,//获取startMsgId之前的pagesize条消息
	pagesize:,//分页大小，为0时获取所有消息，startMsgId可不传
};
```

>###cbGetMessageHistory(param) 获取聊天记录回调

param为json字符串

```
var param = {
	messages:,//List<EMMessage>的json格式对象
};
```

>###getUnreadMsgCount(param) 获取未读消息数量

param为json字符串

```
var param = {
	username:,//username | groupid
    chatType:,//聊天类别 0-单聊 1-群聊(仅iOS需要，默认0)
};
```

>###cbGetUnReadMsgCount(param) 获取未读消息数量回调

param为json字符串

```
var param = {
	count:,//未读消息数
};
```

>###resetUnreadMsgCount(param) 指定会话未读消息数清零

param为json字符串

```
var param = {
	username:,//username | groupid
    chatType:,//聊天类别 0-单聊 1-群聊(仅iOS需要，默认0)
};
```

>###resetAllUnreadMsgCount(); 所有未读消息数清零（仅Android可用）

	
>###getMsgCount(param)获取消息总数（仅Android可用） 

param为json字符串

```
var param = {
	username:,//username | groupid
};
```

>###cbGetMsgCount(param) 获取消息总数回调（仅Android可用）

param为json字符串

```
var param = {
	msgCount:,//消息总数
};
```

>###clearConversation(param) 清空会话聊天记录（仅Android可用）

param为json字符串

```
var param = {
	username:,//username | groupid
};
```

>###deleteConversation(param) 删除和某个user的整个的聊天记录(包括本地)

param为json字符串

```
var param = {
	username:,//username | gr	oupid
	chatType:,//0-个人 1-群组（默认0，此参数仅iOS需要）
};
```

>###removeMessage(param) 删除当前会话的某条聊天记录

param为json字符串

```
var param = {
	username:,//username | groupid
	msgId:,
    chatType:,//0-个人 1-群组（默认0，此参数仅iOS需要）
};
```

>###deleteAllConversation(); 删除所有会话记录(包括本地)

>###getChatterInfo(); 获取聊天对象信息

>###cbGetChatterInfo(param); 获取聊天对象信息回调

	param为list<EMChatterInfo>,一个由EMChatterInfo结构组成的数组。
	
* 包含所有好友和群组的聊天对象信息
* EMChatterInfo结构说明见附录


>###getTotalUnreadMsgCount(); 获取总计未读消息数

>###cbGetTotalUnreadMsgCount(param); 获取总计未读消息数回调

param为json字符串

```
var param ={
	count:,//总计未读消息数
};
```

>###getRecentChatters(); 获取近期聊天对象信息
>###cbGetRecentChatters(param);

	param为list<EMChatterInfo>,一个由EMChatterInfo结构组成的数组。
	
* 仅包含有聊天记录的聊天对象(包括非好友)
* param已按lastMsg的时间戳排序，最后接收消息的时间越新，排序越靠前
* EMChatterInfo结构说明见附录

##2.4、Friend
***
>###onContactAdded(param)//新增联系人监听（仅Android）

param为json字符串

```
var param = {
	userNameList:,//json格式的List<String>
};
```

>###onContactDeleted(param)//删除联系人监听（仅Android）

param为json字符串

```
var param = {
	userNameList:,//json格式的List<String>
};
```

>###onContactInvited(param)//接到好友申请

param为json字符串

```
var param = {
	username:,//
	reason:,//
};
```

>###onContactAgreed(param)//好友请求被同意

param为json字符串

```
var param = {
	username:,//
};
```

>###onContactRefused(param)//好友请求被拒绝

param为json字符串

```
var param = {
	username:,//
};
```

>###getContactUserNames();//获取好友列表


>###cbGetContactUserNames(param)//获取好友列表回调

param为json字符串

```
var param = {
	usernames:,//用户姓名字符串构成的数组	
	
};
```

	

    		
    		
>###addContact(param)//添加好友

param为json字符串

```
var param = {
	toAddUsername:,//要添加的好友
	reason:
};
```

>###deleteContact(param)//删除好友

param为json字符串

```
var param = {
	username:,//
};
```

>###acceptInvitation(param)//同意username的好友请求

param为json字符串

```
var param = {
	username:,//
};
```

>###refuseInvitation(param)//拒绝username的好友请求

param为json字符串

```
var param = {
	username:,//
	reason:,//拒绝好友请求原因（仅iOS需要）
};
```

>###getBlackListUsernames();//获取黑名单列表

>###cbGetBlackListUsernames(param)//获取黑名单列表回调

param为json字符串

```
var param = {
	usernames:,//List<String> json格式
};
```

>###addUserToBlackList(param)//把用户加入到黑名单

param为json字符串

```
var param = {
	username:,//
};
```

>###deleteUserFromBlackList(param)//把用户从黑名单中移除

param为json字符串

```
var param = {
	username:,//
};
```

##2.5、Group

>###onInvitationDeclined(param)//群聊邀请被拒绝

param为json字符串

```
var param = {
	groupId:,
	invitee:,
	reason:,
};
```


>###onUserRemoved(param)//当前用户被管理员移除出群聊

param为json字符串

```
var param = {
	groupId:,
	groupName:,
};
```

>###onGroupDestroy(param)//群聊被创建者解散

param为json字符串

```
var param = {
	groupId:,
	groupName:,
};
```

>###onApplicationReceived(param)//用户申请加入群聊，收到加群申请

param为json字符串

```
var param = {
	groupId:,
	groupName:,
	applyer:,
	reason:,
};
```

>###onApplicationAccept(param)// // 加群申请被同意

param为json字符串

```
var param = {
	groupId:,
	groupName:,
	accepter:,
};
```

>###onApplicationDeclined(param)//加群申请被拒绝

param为json字符串

```
var param = {
	groupId:,//（仅Android）
	groupName:,
	decliner:,
	reason:,
};
```

>###createPrivateGroup(param)//创建私有群

param为json字符串

```
var param = {
	groupName:,//要创建的群聊的名称
	desc://群聊简介
	members://群聊成员,为空时这个创建的群组只包含自己
	allowInvite://是否允许群成员邀请人进群
	maxUsers://最大群聊用户数，可选参数，默认为200，最大为2000
	initialWelcomeMessage://群组创建时发送给每个初始成员的欢迎信息（仅iOS需要）
};
```

>###createPublicGroup(param)//创建公开群

param为json字符串

```
var param = {
	groupName:,//要创建的群聊的名称
	desc://群聊简介
	members://群聊成员,为空时这个创建的群组只包含自己
	needApprovalRequired://如果创建的公开群用需要户自由加入，就传false。否则需要申请，等群主批准后才能加入，传true
	maxUsers://最大群聊用户数，可选参数，默认为200，最大为2000
  	initialWelcomeMessage://群组创建时发送给每个初始成员的欢迎信息（仅iOS需要）
};
```

>###onGroupCreated(param)//群组建立监听

param为json字符串

```
var param = {
	isSuccess:,//群组是否创建成功 true/false
	errorStr:,//创建失败的原因 仅isSuccess传false时会有此参数
	group:,//EMGroup的json字符串，被建立的群组信息
};
```

>###addUsersToGroup(param)//群聊加人

param为json字符串

```
var param = {
	isGroupOwner:,//是否群主(仅Android需要)
	groupId://
	newmembers://群聊新成员，List<String> Json格式
    inviteMessage:// 新增参数 邀请信息
};
```

>###removeUserFromGroup(param)//群聊减人

param为json字符串

```
var param = {
	groupId://
	username://
};
```
 

	只有owner才有权限进行此操作
>###joinGroup(param)//加入某个群聊，只能用于加入公开群

param为json字符串

```
var param = {
	groupId://
	reason:// //如果群开群是自由加入的，即group.isMembersOnly()为false，此参数不传
    groupName://群组名称
};
```

>###exitFromGroup(param)//退出群聊

param为json字符串

```
var param = {
	groupId://
};
```

>###exitAndDeleteGroup(param)//解散群聊

param为json字符串

```
var param = {
	groupId://
};
```

>###getGroupsFromServer(param)//从服务器获取自己加入的和创建的群聊列表

param为json字符串

```
var param = {
	loadCache://是否从本地加载缓存，（默认为false，从网络获取）
};
```

>###cbGetGroupsFromServer(param)//从服务器获取自己加入的和创建的群聊列表回调

param为json字符串

```
var param = {
	result://0-成功，1-失败
	grouplist://List<EMGroup> json格式
	errorMsg:
};
```

>###getAllPublicGroupsFromServer(param);//获取所有公开群列表

param为json字符串

```
var param = {
	pageSize://期望结果的数量, 如果 < 0 则一次返回所有结果
	cursor://获取公开群的cursor，首次调用传空即可
};
```

>###cbGetAllPublicGroupsFromServer(param)//获取所有公开群列表回调

param为json字符串

```
var param = {
	result://0-成功，1-失败
	grouplist:List< EMGroup> json格式 见附录
	errorMsg:
	cursor:,//
};
```

>###getGroup(param)//获取群详情

param为json字符串

```
var param = {
	groupId:,//
	loadCache://是否从本地加载缓存，（默认为false，从网络获取）
};
```

>###cbGetGroup(param)//获取群详情回调

param为json字符串

```
var param = {
	group://EMGroup 对象json格式  
};
```

>###blockGroupMessage(param)//屏蔽群消息

param为json字符串

```
var param = {
	groupId:// 
};
```

>###unblockGroupMessage(param)//解除屏蔽群

param为json字符串

```
var param = {
	groupId:// 
};
```

>###changeGroupName(param)//修改群组名称

param为json字符串

```
var param = {
	groupId:// 
	changedGroupName:,//改变后的群组名称
};
```

>###setReceiveNotNoifyGroup(param)//群聊不提醒只显示数目（仅Android可用）

param为json字符串

```
var param = {
	groupIds:// List<String> 
};
```

>###blockUser(param)//将群成员拉入群组的黑名单（仅Android可用）

param为json字符串

```
var param = {
	groupId:,// 
	username://待屏蔽的用户名
};
```

>###unblockUser(param)//将拉入黑名单的群成员移除（仅Android可用）

param为json字符串

```
var param = {
	groupId:,// 
	username://待解除屏蔽的 用户名
};
```

>###getBlockedUsers(param)//获取群组的黑名单用户列表（仅Android可用）

param为json字符串

```
var param = {
	groupId:,// 
};
```

>###cbGetBlockedUsers(param)//获取群组的黑名单用户列表回调（仅Android）

param为json字符串

```

	var param = {
	usernames:,// List<String> json格式 
};
```

>###onGroupUpdateInfo(param)//群组信息更新的监听（仅iOS）

param为json字符串

```
var param={
	group:,//EMGroup对象的json格式字符串
};
```

* 每当添加/移除/更改角色/更改主题/更改群组信息之后,都会触发此回调


##2.6、Call
***
>###onCallReceive(param)// 实时语音监听

param为json字符串

```
var param = {
	
	from;//拨打方username
	callType;//0-语音电话 1-视频电话
  	callId;//本次通话的EMSessionId
};
```

>###onCallStateChanged(param)//通话状态监听

param为json字符串

```
var param = {
	state:,//1-正在连接对方，2-双方已经建立连接，3-同意语音申请，建立语音通话中，4-连接中断 5-电话暂停中 6-电话等待对方同意接听 7-通话中 
  };
```

        
        
	eg. 一个成功的语音通话流程为 ：A发送通话请求给B ==> AB建立语音通话连接 ==> B同意语音通话 ==> 开始语音通话



>###makeVoiceCall(param)//拨打语音通话

param为json字符串

```
var param = {
	username:,//
};
```

>###answerCall();//接听通话

>###rejectCall();//拒绝接听

>###endCall();//挂断通话

##2.7、Apns（以下方法全部仅限iOS）
***
>###registerRemoteNotification();//注册Apns推送

>### cbRegisterRemoteNotification(param);//回调

param为json字符串

```
 var param{
 
	result;//1-成功 2-失败
	errorInfo;//注册失败时的错误信息
 };
```

 
>###onApnsLaunch(param);

	若APP是通过点击apns推送调起的，当插件初始化时会触发此回调。
	param为此条推送的内容，json格式。

 
>###updatePushOptions(param);//设置apns全局属性

param为json字符串

```
var param{
	nickname;//昵称
	displayStyle;//推送显示类型 0-提示"您有一条新消息" 1- 显示详细消息内容 
	noDisturbingStyle;//是否开启免打扰模式 0-全天免打扰 1-自定义时段免打扰 2- 关闭免打扰
	noDisturbingStartH;//免打扰模式开始时间  小时（int）
	noDisturbingEndH;//免打扰模式结束时间  小时（int）
};
```
 

>###cbUpdatePushOptions(param);//设置apns全局属性回调

param为json字符串

```
var param{
	nickname;//昵称
	displayStyle;//推送显示类型 0-提示"您有一条新消息" 1- 显示详细消息内容 
	noDisturbingStyle;//是否开启免打扰模式 0-全天免打扰 1-自定义时段免打扰 2- 关闭免打扰
	noDisturbingStartH;//免打扰模式开始时间  小时（int）
	noDisturbingEndH;//免打扰模式结束时间  小时（int）
 };
```

 
	说明：updatePushOptions全为可选参数，当传入空值时，即可通过回调获得当前apns全局属性
	
>###ignoreGroupPushNotification(param)://设置指定群组是否接收

param为json字符串

```
 var param{
	groupId;//指定的群组Id
	isIgnore;//1-屏蔽  2-取消屏蔽
};
```

 
>###cbIgnoreGroupPushNotification(param)://回调
param为json字符串

```
var param{
	groupIds;//已屏蔽接收推送消息的群列表
};
```

#3、附录

>###EMMessage json字符串返回值结构  


key | 说明         
------------ | ------------- 
from | 发送者        
to | 接受者  
messageId | 消息id
messageTime | 消息发送或接收的时间
isAcked | 是否接收到了接收方的阅读回执, 或是否已发送了阅读回执给对方
isDelivered | 对于发送方来说, 该值表示:接收方是否已收到了消息, 对于接收方来说, 表示:接收方是否已发送了"已接收回执" 给对方
isRead	 | 是否已读
chatType: | 聊天类别 0-个人 1-群组
messageType | 消息类型  text/video/audio/image/location/file/cmd
ext | 扩展属性 String格式
messageBody | 消息主体json

messageBody的结构为

>###普通文本消息
	
key | 说明         
-------- | ------
text | 文本内容

>###透传消息
	
key | 说明         
-------- | ------
action | 具体命令 

>###位置消息
key | 说明         
-------- | ------ 
longitute | 经度
latitude | 纬度
address | 地理位置信息


>###视频/语音/图片/文件消息
	
	
key | 说明         
-------- | ------
displayName | 显示名
remotePath	 | 服务器远程文件路径 	
secretKey	 | 远端文件的密钥
length | 长度 （单位:秒 仅语音/视频消息）	
thumbnailRemotePath | 预览图文件的服务器远程路径(仅视频/图片消息)
thumbnailSecretKey | 预览图文件的密钥(仅视频/图片消息)
 


* 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略
* 由于`Android SDK`不能获取`已发送消息`的`remotePath`和`thumbnailRemotePath`，因此改用`本地文件路径`（file://开头）代替

>###EMConversation json字符串返回值结构 


key | 说明         
------------ | -------------
chatter	 | conversation识别名
chatType	 | 聊天类别 0-个人 1-群组
messages	 | "conversation所包含的message列表，表内元素为EMMessage的json字符串"
	
	
* 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略


	
>###EMGroup json字符串返回值结构 


key | 说明         
------------ | -------------
groupName	 | 群组名称
groupDescription | 群组描述
members	 | 包含的成员
owner	 | 群主
isPushNotificationEnable	 | 是否允许推送提醒
isBlock	 | 是否被用户屏蔽
groupMaxUserCount	 | 群组最大人数
groupId	 | 群组Id
isPublic | 群组类型
allowInvites | 是否允许群成员邀请人进群
membersOnly | 需要申请和验证才能加入

* 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略
* 受SDK所限，部分接口的members属性会有误
	* 群组的members属性以cbGetGroup回调为准
	* **`Android的members包含群组的owner，而iOS并不包含`**，此问题已反馈给环信官方，待解决中

>###EMChatterInfo json字符串返回值结构 

key | 说明         
------------ | -------------
chatter	 | 联系人的username或群组的groupId
groupName | 群组名(仅群组有此值)
chatType | 联系人类型 0-个人 1-群组
unreadMsgCount | 未读消息数
lastMsg | 最后一条消息 EMMessage格式的json字符串



>### "isGroup"参数废弃 改用“chatType”的相关说明

由于环信插件即将添加`聊天室功能`，**isGroup参数即将不能满足需求**，因此做如下修改:

* 所有的调用API中，入参里的isGroup改为chatType
* 所有的回调API中，isGroup属性改为chatType



#4、更新历史
API 版本：uexEasemob-3.0.12(iOS) uexEasemob-3.0.11（Android）
最近更新时间：2015-08-18

  历史发布版本 | iOS更新 | 安卓更新
  ------------ | ------------ | ------------ 
  3.0.13 | 修复若干bugs| |
  3.0.12 | 新增API:onGroupCreated | 
  3.0.11 | 新增API:getRecentChatters，onMessageSent |添加创建群回调onGroupCreated  
  3.0.10 | SDK更新；EMGroup回调结构优化；支持IDE打包 | 添加getRecentChatters接口 
  3.0.9 | SDK更新，代码优化等，详见文档 | 支持离线消息 | 
  3.0.8 | 新增方法 发送视频消息等，详见文档 | getGroup添加groupName,groupDescription 字段 
  3.0.7 | 优化了本地数据库的相关设置 | getChatterInfo增加返回新加好友的聊天记录 
  3.0.6 | 自动登录功能改在 初始化 中进行设置 | 添加getTotalUnreadMsgCount接口 
  3.0.5 | 针对新版本做了一些代码优化 | 升级环信SDK 
  3.0.4 | 支持自动登录，更新环信iOS SDK版本至V2.1.6 | 升级环信SDK 
  3.0.3 | 新增了一个获取聊天对象信息的方法 | 发送语音添加length参数 
  3.0.2 | 修复了回调信息不全引起程序崩溃的bug | 添加sendHasReadResponseForMessage 等接口 
  3.0.1 | 修正了多次初始化会导致程序卡死的bug | 添加getChatterInfo接口  
  3.0.0 | 环信(Easemob)插件 for iOS | 环信插件 

## 文档更新

**2015-8-18**

- 新增API: onGroupCreated 群组已建立的回调
- 修复若干bugs

**2015-8-3**

- 新增了如下API:
  * onMessageSent 消息已发送的监听
  * getRecentChatters 获取最近联系人
  * cbGetRecentChatters 获取最近联系人回调

**2015-7-7**

- iOS SDK更新至2.1.8；
- EMGroup中 groupSubject属性废弃，改用groupName和GroupDescription来获取相应信息；

**2015-6-18**

- iOS插件版本更新至3.0.9，用以支持新版SDK （iOS V2.1.7）
- Android插件版本更新至3.0.6 用以支持新版SDK（AndroidV2.1.9）
- 方法getAllPublicGroupsFromServer添加的参数，变得更加实用了（详情见接口说明）
- 新增方法getTotalUnreadMsgCount() 获取总计未读消息数 及其回调
- 开放Apns离线推送相关接口(仅限iOS)
- 所有参数中的"isGroup"即将废弃，改用"chatType"(详见附录)

**2015-5-25**

- iOS插件版本更新至3.0.8
- 新增方法sendVedio 发送视频消息；
- EMMessage回调中，添加length 长度（单位：秒，仅语音、视频消息）；
- EMMessage回调中，添加ext 扩展属性；发送消息的各个API也添加此项作为可选参数；（扩展属性为一个自定义的字符串，用以携带开发者可能需要的其他参数）
- 新增方法sendHasReadResponseForMessage 发送已读回执;(对方会触发回调onAckMessage，插件不再自动发送此回执)
- 方法getMessageById根据消息id获取消息记录及其回调也支持iOS了

**2015-05-06**
 
- 删去方法 设置是否自动登录 ，改为在 init初始化 中添加相关参数

**2015-05-05**
 
- 更新环信iOS SDK版本至V2.1.6(2015-04-30版)，部分代码做了优化以支持此新版本;
- 现在所有的回调函数都会返回给进行 init初始化 操作的那个网页了。
- cbGetLoginInfo现在也会返回 是否开启自动登录 的信息了。

**2015-05-04**
  
- 新增方法 设置是否自动登录;
- 现在iOS也支持回调 [1.10]onConnected 了。
**2015-04-28**
   
- 新增方法getChatterInfo获取聊天对象信息及其回调;

**2015-04-20**
   
- 新增 getMessageById 方法及回调;
- 修改了onNewMessage的回调值的结构;
- 统一了Android和iOS返回的json对象的结构，对附录做了大量修订。

**2015-04-17**
- 初稿
