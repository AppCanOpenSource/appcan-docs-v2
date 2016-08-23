[TOC]
#1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()  
uexRongCloud(融云)插件  

## 1.1、 说明
融云是国内首家专业的即时通讯云服务提供商,专注为互联网、移动互联网开发者提供免费的即时通讯基础能力和云端服务。通过融云平台,开发者不必搭建服务端硬件环境,就可以将即时通讯、实时网络能力快速集成至应用中。融云SDK包括两部分:IM界面组件和 IM通讯能力库。

本插件封装的是IM通讯能力库-IMLib,IMLib 是不含界面的基础 IM 通讯能力库,封装了通信能力和会话、消息等对象。

> **使用前说明:**  

**该插件需要引擎3.3以上版本**

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

| 协议头             | Android对应路径 (其中"/sdcard/"等 同于"/storage/emulated/0/") | iOS对应路径                           |
| --------------- | ---------------------------------------- | --------------------------------- |
| res://          | widget/wgtRes/                           | widget/wgtRes                     |
| wgts://         | /storage/emulated/0/widgetone/apps/ xxx(widgetAppId)/ | /Documents/apps/xxx(widgetAppId)/ |
| wgts://         | /storage/emulated/0/widgetone/widgets/   | /Documents/widgets/               |
| file:///sdcard/ | /storage/emulated/0/                     | 无                                 |

#2、API概述		

使用该插件需要先在[融云官网](http://www.rongcloud.cn/)申请AppKey。

如果无特殊说明，本文档的回调函数全部是如下格式：

```javascript
var callback=function (error,data){
  //error为0表示成功，其他表示失败
}
```



##2.1、初始化
***
>### init 初始化

`uexRongCloud.init(json,callback)`

**说明：**

**Android 版本的AppKey需要在`config.xml`中配置,把`value`对应的值替换成自己的AppKey即可。示例如下:**

```xml
<config desc="uexRongCloud" type="KEY">
	<param name="$uexRongCloud_APPKEY$" platform="Android" value="e5t4ouvptdhca"/>
</config>
```

**参数：**

`json`为JSON对象，各字段如下：

| 参数名称   | 参数类型   | 是否必选 | 说明       |
| ------ | ------ | ---- | -------- |
| appKey | String | 是    | 区别app的标识 |

**回调参数：**

```javascript
var callback=function (error,data){}
```

| 参数名称  | 类型     | 说明           |
| ----- | ------ | ------------ |
| error | Number | 0表示成功，非0表示失败 |
| data  | String | 失败时返回相关的原因   |

**示例：**

```javascript
uexRongCloud.init({
  appKey:""
},function(error,data){
  if(error==0){
    alert("初始化成功")!
  }
});
```

##2.2、登录与登出

***
>### connect(param)   与融云服务器建立连接

`uexRongCloud.connect(json,callback)`

**说明：**

在App整个生命周期,您只需要调用一次此方法与融云服务器建立连接。之后无论是网络出现异常或者App有前后台的切换等,SDK都会负责自动重连。除非您已经手动将连接断开,否则您不需要自己再手动重连。
param为json字符串

**参数：**

`json`为JSON对象，各字段如下：

| 参数名称  | 参数类型   | 是否必选 | 说明                     |
| ----- | ------ | ---- | ---------------------- |
| token | String | 是    | 从您服务器端获取的token(用户身份令牌) |

**回调参数：**

```javascript
var callback=function (error,data){}
```

| 参数名称  | 类型     | 说明                     |
| ----- | ------ | ---------------------- |
| error | Number | 0表示成功，非0表示失败           |
| data  | String | 失败时返回相关的原因， 成功返回userId |

**示例：**

```javascript
uexRongCloud.connect({
  token:""
},function(error,data){
  if(error==0){
    alert("userId为："+data)!
  }
});
```

>### disconnect  断开与融云服务器建立连接

`uexRongCloud.disconnect(json)`

**说明：**

因为SDK在前后台切换或者网络出现异常都会自动重连,会保证连接的可靠性。 所以除非您的App逻辑需要登出,否则一般不需要调用此方法进行手动断开。

**参数：**

`json`为JSON对象，各字段如下：

| 参数名称          | 参数类型    | 是否必选 | 说明                                       |
| ------------- | ------- | ---- | ---------------------------------------- |
| isReceivePush | Boolean | 是    | 断开与融云服务器的连接之后,是否还接收远程推送。true:接收,false:不接收 |



**示例：**

```javascript
uexRongCloud.disconnect({
  isReceivePush:""
});
```

##2.3、基础消息功能
***

>### sendMessage 发送消息

`uexRongClound.sendMessage(json,callback)`

**说明：**

无

**参数：**

`json`为JSON对象，各字段如下：

**公共参数：**

| 参数名称             | 参数类型   | 是否必选 | 说明                                       |
| ---------------- | ------ | ---- | ---------------------------------------- |
| objectName       | String | 是    | 消息类型   "RC:TxtMsg":文字消息     "RC:VcMsg":语音消息  "RC:ImgMsg":图片消息     "RC:ImgTextMsg":图文消息    "RC:LBSMsg":位置消息     "RC:CmdNtf":命令消息 |
| conversationType | String | 是    | 会话类型 'PRIVATE'-单聊  'DISCUSSION'-讨论组 'GROUP'-群组 'CHATROOM'-聊天室 'CUSTOMER_SERVICE'-客服 'SYSTEM'-系统 |
| targetId         | String | 是    | 消息的接收方 Id。根据不同的 conversationType,可能是用户Id、讨论组Id、群组Id或聊天室Id等 |
| extra            | String | 否认   | 消息的附加字段                                  |
| localId          | String | 是    | 消息的唯一id,用于标识接收发送回调的处理                    |

**objectName 为"RC:TxtMsg"时(文字消息) 需要传以下参数：**

| 参数名称 | 参数类型   | 是否必选 | 说明      |
| ---- | ------ | ---- | ------- |
| text | String | 是    | 消息的文字内容 |

**objectName 为"RC:VcMsg"时(语音消息) 需要传以下参数：**

| 参数名称      | 参数类型   | 是否必选 | 说明           |
| --------- | ------ | ---- | ------------ |
| voicePath | String | 是    | 语音文件的路径      |
| duration  | Number | 是    | 语音消息的时长,单位为秒 |

**objectName 为"RC:ImgMsg"时(图片消息) 需要传以下参数：**

| 参数名称    | 参数类型   | 是否必选 | 说明      |
| ------- | ------ | ---- | ------- |
| imgPath | String | 是    | 图片的本地路径 |

**objectName 为"RC:ImgTextMsg"时(图文消息) 需要传以下参数：**

| 参数名称        | 参数类型   | 是否必选 | 说明                |
| ----------- | ------ | ---- | ----------------- |
| title       | String | 是    | 消息的标题             |
| description | String | 是    | 消息的内容描述           |
| imgPath     | String | 是    | 发送图片的网络路径         |
| url         | String | 是    | 图文消息中包含的需要跳转到的URL |

**objectName 为"RC:LBSMsg"时(位置消息) 需要传以下参数：**

| 参数名称      | 参数类型   | 是否必选 | 说明       |
| --------- | ------ | ---- | -------- |
| latitude  | String | 是    | 纬度       |
| longitude | String | 是    | 经度       |
| poi       | String | 是    | 地理位置的名称  |
| imgPath   | String | 是    | 地图略缩图的路径 |

**objectName 为"RC:CmdNtf"时(命令消息) 需要传以下参数：**

| 参数名称 | 参数类型   | 是否必选 | 说明    |
| ---- | ------ | ---- | ----- |
| name | String | 是    | 命令的名称 |
| data | String | 是    | 命令的数据 |

**回调参数：**

```javascript
var callback=function (error,data){}
```

`data`为JSON对象，相关字段如下：

| 参数名称       | 类型     | 说明                                |
| ---------- | ------ | --------------------------------- |
| resultCode | Number | 发送结果 0:准备发送 1.发送成功, 2:发送失败,3:发送进度 |
| messageId  | String | 发送消息的ID                           |
| progress   | Number | 发送图片时，发送图片的进度 （RC:ImgMsg）         |

**示例：**

```javascript
uexRongCloud.sendMessage({
  	objectName: "RC:CmdNtf",
    conversationType: "PRIVATE",
    targetId: globalTargetId,
    // targetId: "55666",
    extra: "extra info ...", //消息的附加字段
    //objectName 为"RC:TxtMsg"时(文字消息)
    text: "text content ...", //消息的文字内容
},function(error,data){
  if(error==0){
    if (data.resultCode == 0) {
    	alert("准备发送 messageId: " + data.messageId);
  	}else if (data.resultCode == 1) {
    	alert("发送成功 messageId: " + data.messageId);
  	}
  }
});
```

>### onMessageReceived(param) 收到消息

param为json字符串

```
var params={
    message:
        {
        //
            content: {
                text: ,//文本内容
                extra://消息的附加字段
            }, // 消息内容
            conversationType: , // 会话类型
            messageDirection:, // String 消息方向 发送:SEND  接收:RECEIVE
            targetId: , // 对应消息发送者的 userId
            objectName:, //消息类型
            sentStatus:, //Number,发送状态, 10:发送中,20:发送失败,30:已发送成功,40:对方已接收,50: 对方已阅读,60:对方已销毁
            senderUserId:, // 发送者 userId
            messageId:, // 本地消息 Id
            sentTime:, // 发送消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数
            receivedTime: // 收到消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数
        },
        left: 0 // 剩余未拉取的消息数目
}

```
### message content字段

```
    //objectName 为"RC:TxtMsg"时(文字消息)
    text:,//消息的文字内容
    extra:,//消息的附加字段
   
    //objectName 为"RC:VcMsg"时(语音消息) 
    voicePath:,//语音文件的路径  
    duration:,//Number类型 语音消息的时长,单位为秒
    extra:,//消息的附加字段
     
    
    //objectName 为"RC:ImgMsg"时(图片消息) 
    imgPath:,//图片的本地路径  
    thumbPath:,//缩略图
    extra:,//消息的附加字段
      
    //objectName 为"RC:ImgTextMsg"时(图文消息) 
    title:,//消息的标题
    description:,//消息的内容描述
    imgPath:,//发送图片的网络路径 
    url://图文消息中包含的需要跳转到的URL 
    extra:,//消息的附加字段
      
    //objectName 为"RC:LBSMsg"时(位置消息) 
    latitude:,//维度
    longitude:,//经度
    poi:,//地理位置的名称
    imgPath:,//地图略缩图的路径
    extra:,//消息的附加字段
      
      
    //objectName 为"RC:CmdMsg"时(命令消息) 
    name:,//命令的名称
    data:,//命令的数据
    
```

##2.3、会话功能
***

>### getConversationList() 获取会话列表

```
var param=getConversationList();

```

param为json字符串

```
var params={
    resultCode:,// Number  0 返回成功,其他为失败
    conversations:[
        {
            conversationTitle:, // 会话标题
            conversationType:, // 会话类型
            draft:, // 文字消息草稿的内容
            targetId:, // 消息目标 Id
            latestMessage: {
                text:,
                extra:
            }, // 最后一条消息的内容
            sentStatus:, // 发送状态
            objectName:, // 消息类型
            receivedStatus: , // 
            senderUserId:, // 发送消息的用户 Id
            unreadMessageCount:, // 本会话的未读消息数
            receivedTime:, // 发送消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数
            sentTime:// 收到消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数
            isTop:, // true或false 置顶状态 
            latestMessageId:// 本会话最后一条消息 Id
        }
    ]
}

```

>### getConversation(json) 获取某一会话信息

param为json字符串

```
var json={
     conversationType:,//消息的会话类型
     targetId:,//消息目标 Id
}

```

```
var param=getConversation(json);

```

param为json字符串

```
var params={
    resultCode:,// 0 返回成功,其他为失败
    conversationTitle:, // 会话标题
    conversationType:, // 会话类型
    draft:, // 文字消息草稿的内容
    targetId:, // 消息目标 Id
    latestMessage: {
            content:,
            extra:
    }, // 最后一条消息的内容
    sentStatus:, // 发送状态
    objectName:, // 消息类型  
    recievedStatus: , // 
    senderUserId: , // 发送消息的用户 Id
    unreadMessageCount: , //Number类型 本会话的未读消息数
    receivedTime: , // 发送消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数
    sentTime: , // 收到消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数
    isTop:, //true 或false 置顶状态
    latestMessageId: // 本会话最后一条消息 Id
} 
```

>### removeConversation(param) 从会话列表中移除某一会话,但是不删除会话内的消息

param为json字符串

```
var params={
    conversationType:,//消息的会话类型
    targetId:,//消息目标 Id
}

```

>### cbRemoveConversation(param) removeConversation的回调

param为json字符串

```
var params={
    resultCode://Number 0表示成功,其他为失败
}

```

>### clearConversations(param) 清空所有会话及会话消息

param为json字符串

```
var params={
    conversationTypes:,//消息的会话类型
}

```

>### cbClearConversations(param) clearConversations的回调

param为json字符串

```
var params={
    resultCode://Number 0表示成功,其他为失败
}

```

>### setConversationToTop(param) 清空所有会话及会话消息

param为json字符串

```
var params={
    conversationType:,//消息的会话类型
    targetId:,//消息目标 Id
    isTop:,//true 或false 是否置顶
}

```

>### cbSetConversationToTop(param) setConversationToTop 的回调

param为json字符串

```
var params={
    resultCode://Number 0表示成功,其他为失败
}

```

>### getConversationNotificationStatus(param) 获取某一会话的通知状态 

param为json字符串

```
var params={
    conversationType:,//消息的会话类型
    targetId:,//消息目标 Id
}

```

>### cbGetConversationNotificationStatus(param) getConversationNotificationStatus 的回调

param为json字符串

```
var params={
    resultCode://Number 0表示成功,其他为失败
    status:,//Number 状态码,0:免打扰 / 1:提醒
}

```

>### setConversationNotificationStatus(param) 设置某一会话的通知状态

param为json字符串

```
var params={
    conversationType:,//消息的会话类型
    targetId:,//消息目标 Id
    status:,//Number 状态码,0:免打扰 / 1:提醒
}

```

>### cbSetConversationNotificationStatus(param) setConversationNotificationStatus 的回调

param为json字符串

```
var params={
    resultCode://Number 0表示成功,其他为失败
    status:,//Number 状态码,0:免打扰 / 1:提醒
}

```

>### getLatestMessages(param) 获取某一会话的最新消息记录

param为json字符串

```
var params={
    conversationType:,//消息的会话类型
    targetId:,//消息目标 Id
    count:,//Number 要获取的消息数量
}

```

>### cbGetLatestMessages(param) getLatestMessages 的回调

param为json字符串

```
var params=[
        {
            content: {
                text: ,
                extra: 
            }, // 消息内容
            extra:, // 消息的附加信息,此信息只保存在本地
            conversationType:, //会话类型
            messageDirection:, //String 消息方向 发送:SEND  接收:RECEIVE
            targetId:, // 这里对应消息发送者的 userId
            objectName:, // 消息类型 
            sentStatus:, // 发送状态
            senderUserId:, // 发送者 userId
            messageId:,// 本地消息 Id
            sentTime:,// 发送消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数
            receivedTime: // 收到消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数
    }
]

```

>### getHistoryMessages(param) 获取某一会话的历史消息记录

param为json字符串

```
var params={
    conversationType:,//消息的会话类型
    targetId:,//消息目标 Id
    count:,//Number 要获取的消息数量
    oldestMessageId:,// Number 最后一条消息的 Id,获取此消息之前的 count 条消息,没有消息第一次调用应设置为: -1
}

```

>### cbGetHistoryMessages(param) getHistoryMessages 的回调

param为json字符串

```
var params=[
        {
            content: {
                text: ,
                extra: 
            }, // 消息内容
            extra:, // 消息的附加信息,此信息只保存在本地
            conversationType:, //会话类型
            messageDirection:, //String 消息方向 发送:SEND  接收:RECEIVE
            targetId:, // 这里对应消息发送者的 userId
            objectName:, // 消息类型 
            sentStatus:, // 发送状态:DESTROYED // 对方已销毁 FAILED // 发送失败 READ // 对方已读 RECEIVED // 对方已接收 SENDING // 发送中 SENT // 已发送
            senderUserId:, // 发送者 userId
            messageId:,// 本地消息 Id
            sentTime:,// 发送消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数
            receivedTime: // 收到消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数
        }
]

```

>### deleteMessages(param) 获取某一会话的历史消息记录

param为json字符串

```
var params={
    messageIds:,//要删除的消息 Id 数组
}

```

>### cbDeleteMessages(param) deleteMessages 的回调

param为json字符串

```
var params={
    resultCode://Number 0表示成功,其他为失败
}

```

>### clearMessages(param) 清空某一会话的所有聊天消息记录

param为json字符串

```
var params={
    conversationType:,//消息的会话类型
    targetId:,//消息目标 Id
}

```

>### cbClearMessages(param) clearMessages 的回调

param为json字符串

```
var params={
    resultCode://Number 0表示成功,其他为失败
}

```

>### getTotalUnreadCount() 获取所有未读消息数

```
var count=uexRongCloud.getTotalUnreadCount();
```

>### getUnreadCount(param) 获取来自某用户(某会话)的未读消息数

param为json字符串

```
var params={
    conversationType:,//消息的会话类型
    targetId:,//消息目标 Id
}
var count=uexRongCloud.getUnreadCount(JSON.stringify(params));
```

>### getUnreadCountByConversationTypes(param) 获取某(些)会话类型的未读消息数

param为json字符串

```
var params={
    conversationTypes:,//消息的会话类型,是ConversationType的数组
}
var count=uexRongCloud.getUnreadCountByConversationTypes(JSON.stringify(params));
```

>### setMessageReceivedStatus(param) 设置接收到的消息状态

param为json字符串

```
var params={
    messageId:,// Number 消息 Id
    receivedStatus:,//"UNREAD","READ","LISTENED","DOWNLOADED"
}

```

>### clearMessagesUnreadStatus(param) 清除某一会话的消息未读状态

param为json字符串

```
var params={
    conversationType:,//消息的会话类型
    targetId:,//消息目标 Id
}

```

#3、附录
>### 建立连接返回的错误码

| error | 错误信息                                     |
| ----- | ---------------------------------------- |
| 30000 | 导航路由失败,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。    |
| 30001 | 连接已被释放, 建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。   |
| 30002 | 连接不可用,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。     |
| 30003 | 请求响应超时,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。    |
| 30004 | 导航HTTP发送失败,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。 |
| 30005 | 导航HTTP请求超时,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。 |
| 30006 | 导航HTTP接收失败,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。 |
| 30007 | 导航HTTP请求失败,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。 |
| 30008 | 导航HTTP返回数据格式错误,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。 |
| 30009 | 导航HTTP返回数据不可用,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。 |
| 30010 | 创建Socket连接失败,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。 |
| 30011 | Socket断开,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。  |
| 30012 | PING失败,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。    |
| 30013 | PING超时,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。    |
| 30014 | 信令发送失败,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。    |
| 31000 | 连接ACK超时,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。   |
| 31001 | 信令版本错误,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。    |
| 31002 | AppKey错误,请检查您使用的AppKey是否正确。              |
| 31003 | 服务器当前不可用(预留),建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。 |
| 31004 | Token无效,Token无效一般有以下两种原因。一是token错误,请您检查客户端初始化使用的AppKey和您服务器获取token使用的AppKey是否一致；二是token过期,是因为您在开发者后台设置了token过期时间,您需要请求您的服务器重新获取token并再次用新的token建立连接。 |
| 31005 | AppKey与Token不匹配,请检查您使用的AppKey与Token是否正确,是否匹配。一般有以下两种原因。一是token错误,请您检查客户端初始化使用的AppKey和您服务器获取token使用的AppKey是否一致；二是token过期,是因为您在开发者后台设置了token过期时间,您需要请求您的服务器重新获取token并再次用新的token建立连接。 |
| 31006 | 连接重定向,建立连接的临时错误码,SDK会做好自动重连,开发者无须处理。     |
| 31007 | BundleID不正确,请检查您App的BundleID是否正确。        |
| 31008 | AppKey被封禁或已删除,请检查您使用的AppKey是否正确。         |
| 31009 | 用户被封禁,请检查您使用的Token是否正确,以及对应的UserId是否被封禁。 |
| 31010 | 当前用户在其他设备上登陆,此设备被踢下线                     |
| 32001 | 信令数据无效,建立连接的临时状态,SDK会做好自动重连,开发者无须处理。     |
| 32002 | 信令数据错误,建立连接的临时状态,SDK会做好自动重连,开发者无须处理。     |
| 33001 | SDK没有初始化,在使用SDK任何功能之前,必须先Init。           |
| 33003 | 开发者接口调用时传入的参数错误,请检查接口调用时传入的参数类型和值。       |
| -1000 | 开发者接口调用时传入的参数错误,请检查接口调用时传入的参数类型和值。       |

>### 具体业务错误码

| code  | 详细描述                               |
| ----- | ---------------------------------- |
| -1    | 未知错误(预留)                           |
| 405   | 已被对方加入黑名单                          |
| 5004  | 超时                                 |
| 20604 | 发送消息频率过高,1秒钟最多只允许发送5条消息            |
| 21406 | 不在该讨论组中                            |
| 22406 | 不在该群组中                             |
| 22408 | 在群组中已被禁言                           |
| 23409 | 已被踢出聊天室                            |
| 23410 | 聊天室不存在                             |
| 23411 | 聊天室成员超限                            |
| 30001 | 当前连接不可用(连接已经被释放)                   |
| 30002 | 当前连接不可用                            |
| 33001 | SDK没有初始化,在使用SDK任何功能之前,必须先Init。     |
| 33002 | 数据库错误,请检查您使用的Token和userId是否正确。     |
| 33003 | 开发者接口调用时传入的参数错误,请检查接口调用时传入的参数类型和值。 |
| 33007 | 历史消息云存储业务未开通                       |

#4、更新历史

### iOS

API版本:`uexRongCloud-3.0.0`

最近更新时间:`2016-01-16`

| 历史发布版本 | 更新内容                         |
| ------ | ---------------------------- |
| 3.0.0  | 融云IM(uexRongCloud)插件 for iOS |

### Android

API版本:`uexRongCloud-3.0.0`

最近更新时间:`2016-4-11`

| 历史发布版本 | 更新内容                 |
| ------ | -------------------- |
| 3.0.0  | 融云IM(uexRongCloud)插件 |
#5 文档更新记录

