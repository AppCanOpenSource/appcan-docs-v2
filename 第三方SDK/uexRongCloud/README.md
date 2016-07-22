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
| ----- | ----- | ----- |
| res://          | widget/wgtRes/                           | widget/wgtRes                     |
| wgts://         | /storage/emulated/0/widgetone/apps/ xxx(widgetAppId)/ | /Documents/apps/xxx(widgetAppId)/ |
| wgts://         | /storage/emulated/0/widgetone/widgets/   | /Documents/widgets/               |
| file:///sdcard/ | /storage/emulated/0/                     | 无                                 |
#2、API概述		

使用该插件需要先在[融云官网](http://www.rongcloud.cn/)申请AppKey。

##2.1、初始化
***
>### init  初始化
`uexRongCloud.init(param)`

**说明:**

初始化融云sdk。

**参数:**

param为json字符串

```
var param = {
	appKey:   
};
```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  appKey   | String | 是 | 融云官网申请的appKey |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+

**示例:**

```
var param = {
      appKey:'bmdehs6pdprts'
  };
var data = JSON.stringify(param);
uexRongCloud.init(data);                   
```
>### cbInit  初始化的回调方法
`uexRongCloud.cbInit(param)`

**说明:**

初始化融云sdk(init)的回调方法。

**参数:**

param为json字符串

```
  var param = {
	result:
};
```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  result   | bool | 是 |true为初始化成功，false为初始化失败  |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+

**示例:**

```
window.uexOnload = function() {
    uexRongCloud.cbInit = cbInit;
};
function cbInit(param) {
  alert('cbInit:' + info.result);
}                  
```
**注意：Android 版本的AppKey需要在`config.xml`中配置,把`value`对应的值替换成自己的AppKey即可。示例如下:**

```xml
<config desc="uexRongCloud" type="KEY">
	<param name="$uexRongCloud_APPKEY$" platform="Android" value="e5t4ouvptdhca"/>
</config>
```

##2.2、登录与登出

***
>### connect  与融云服务器建立连接
`uexRongCloud.connect(param)`

**说明:**

与融云服务器建立连接。

**注意：在App整个生命周期,您只需要调用一次此方法与融云服务器建立连接。之后无论是网络出现异常或者App有前后台的切换等,SDK都会负责自动重连。除非您已经手动将连接断开,否则您不需要自己再手动重连。**

**参数:**

param为json字符串

```
var param = {
	token:
};
```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  token   | String | 是 | 从您服务器端获取的token(用户身份令牌) |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
var param = {
      token:'g3fqLjRWtJdOkUCd+uqMRFYLsaBj7tK6QZ9/KFrx+0H22Ki0yw2VryZSnIEN2vTPv9T56shgMwGSAC9SfCY27A=='
  };
var data = JSON.stringify(param);
uexRongCloud.connect(data);                   
```


>###cbConnect  与融云服务器建立连接回调
`uexRongCloud.cbConnect(param)`

**说明:**

与融云服务器建立连接的回调。

**参数:**

param为json字符串

```
var param = {
	resultCode:,
	userId:
};
```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  resultCode   | Number | 是 | 错误标示码,成功返回为0。token错误返回-1。其他错误码信息参见附录 |
|  userId   | String | 是 | 成功返回userId,失败不返回 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
window.uexOnload = function() {
   uexRongCloud.cbConnect = cbConnect;
};
function cbConnect(info) {
  alert('cbConnect: resultCode' + info.resultCode);
  alert('cbConnect: userId' + info.userId);
}                  
```
>### disconnect   断开与融云服务器建立连接
`uexRongCloud.disconnect(param)`

**说明:**

断开与融云服务器建立连接。

**注意：因为SDK在前后台切换或者网络出现异常都会自动重连,会保证连接的可靠性。 所以除非您的App逻辑需要登出,否则一般不需要调用此方法进行手动断开。**

**参数:**
param为json字符串

```
var param = {
	isReceivePush:
};
```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  isReceivePush   | bool | 是 | 断开与融云服务器的连接之后,是否还接收远程推送。true:接收,false:不接收 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
var param = {
      isReceivePush:false
  };
var data = JSON.stringify(param);
uexRongCloud.disconnect(data);                   
```
##2.3、基础消息功能
***

>### sendMessage(param) 发送消息
`uexRongCloud.sendMessage(param)`

**说明:**

发送消息,包括文字消息、语音消息、图片消息、图文消息、位置消息、命令消息，并根据objectName字段区分。

**参数:**
param为json字符串

```
var param = {

    ---公共参数---
    objectName:,
    conversationType:,
    targetId:,
    extra:,
    localId:,
     
     ---私有参数---
    //objectName 为"RC:TxtMsg"时(文字消息) 需要传以下参数
    text:,//String,消息的文字内容
    
    //objectName 为"RC:VcMsg"时(语音消息) 需要传以下参数
    voicePath:, //String,语音文件的路径 
    duration:, //Number,语音消息的时长,单位为秒
      
    
    //objectName 为"RC:ImgMsg"时(图片消息) 需要传以下参数
    imgPath:,  //String,图片的本地路径
      
    //objectName 为"RC:ImgTextMsg"时(图文消息) 需要传以下参数
    title:, //String,消息的标题
    description:, //String,消息的内容描述
    imgPath:, //String,图文消息的图片URL
    url: //String,图文消息中包含的需要跳转到的URL
      
    //objectName 为"RC:LBSMsg"时(位置消息) 需要传以下参数
    latitude:, //String,维度
    longitude:, //String,经度
    poi:, //String,地理位置的名称
    imgPath:, //String,地图略缩图的路径
      
      
    //objectName 为"RC:CmdNtf"时(命令消息) 需要传以下参数
    name:, //String,命令的名称
    data:, //String,命令的数据
      
};
```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  objectName   | String | 是 |消息类型, "RC:TxtMsg":文字消息;"RC:VcMsg":语音消息;"RC:ImgMsg":图片消息;"RC:ImgTextMsg":图文消息;"RC:LBSMsg":位置消息;"RC:CmdMsg":命令消息|
|  conversationType   | String | 是 | 会话类型, 'PRIVATE':单聊 ;'DISCUSSION':讨论组 'GROUP':群组 ;'CHATROOM':聊天室 ;'CUSTOMER_SERVICE':客服 ;'SYSTEM':系统 |
|  targetId   | String | 是 | 消息的接收方Id。根据不同的 conversationType,可能是用户Id、讨论组Id、群组Id或聊天室Id等 |
|  extra   | String | 否 | 消息的附加字段 |
|  localId   | Number | 否 | 消息的唯一id,用于标识接收发送回调的处理,不传返回0 |


**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```

var params = {
    objectName: "RC:ImgMsg",//发图片消息
    conversationType: "PRIVATE",
    targetId: "55666",
    extra: "extra info ...", 
    localId: 111, 
    imgPath: 'res://img.png' //图片的本地路径
  };
  var data = JSON.stringify(params);
  uexRongCloud.sendMessage(data); 
   
    或  
    var params = {
    objectName: "RC:TxtMsg",//发文字消息
    conversationType: "PRIVATE",
    targetId: "55666",
    extra: "extra info ...",
    localId: 111, 
    text: "text content ...", //消息的文字内容
  };
  var data = JSON.stringify(params);
  uexRongCloud.sendMessage(data);              
```
>### cbSendMessage 发送消息的回调  
`uexRongCloud.cbSendMessage(param)`

**说明:**

发送消息的回调。

**参数:**
param为json字符串

```
var params={
     localId:,
     resultCode:, 
     messageId:,
     progress:
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  localId   | Number | 否 | 消息的唯一id,用于标识接收发送回调的处理 |
|  resultCode   | Number | 是 | 发送结果, 0:准备发送 1.发送成功, 2:发送失败,3:发送进度 |
|  messageId   | Number | 是 | 发送消息的ID |
|   progress   | Number | 否 | 发送图片的进度，当objectName为 "RC:ImgMsg"时存在 |


**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
window.uexOnload = function() {
   uexRongCloud.cbSendMessage = cbSendMessage;
};
function cbSendMessage(info) {
  if (info.resultCode == 0) {
    alert('准备发送 localId: ' + info.localId + "  messageId: " + info.messageId);
  } else if (info.resultCode == 1) {
    alert("发送成功 messageId: " + info.messageId);
  }
}                
```

>### onMessageReceived 收到消息
`uexRongCloud.onMessageReceived(param)`

**说明:**

发送消息的回调。

**参数:**
param为json字符串

```
var params={
    message:
        {
            content: { //格式见:message -> content字段， 如：文字消息内容
                text: ,
                extra:
            }, 
            conversationType: , 
            messageDirection:, 
            targetId: ,
            objectName:, 
            sentStatus:, 
            senderUserId:, 
            messageId:, 
            sentTime:, 
            receivedTime: 
        },
        left:  
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  content   | JSON对象 | 是 | 消息内容,格式见:message -> content字段 |
|  conversationType   | String | 是 | 会话类型, 'PRIVATE':单聊 ;'DISCUSSION':讨论组 'GROUP':群组 ;'CHATROOM':聊天室 ;'CUSTOMER_SERVICE':客服 ;'SYSTEM':系统 |
|  messageDirection   | JSON对象 | String | 消息方向,发送:SEND  接收:RECEIVE |
|  targetId   | String | 是 | 对应消息发送者的 userId |
|  objectName   | String | 是 |消息类型, "RC:TxtMsg":文字消息;"RC:VcMsg":语音消息;"RC:ImgMsg":图片消息;"RC:ImgTextMsg":图文消息;"RC:LBSMsg":位置消息;"RC:CmdMsg":命令消息|
|  sentStatus   | String | 是 | 发送状态，DESTROYED:对方已销毁 ;FAILED:发送失败; READ:对方已读; RECEIVED:对方已接收; SENDING:发送中; SENT:已发送 |
|  senderUserId  | String | 是 | 发送者userId |
|  messageId   | Number | 是 | 消息的ID,本地存储的消息的唯一值（数据库索引唯一值） |
|  sentTime   | Number | 是 | 发送消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数 |
|  receivedTime   | Number | 是 | 收到消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数 |
|  left   | Number | 是 | 剩余的未接收的消息数 |

### message -> content字段

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
    imgPath:,//图文消息图片URL
    url://图文消息中包含的需要跳转到的URL 
    extra:,//消息的附加字段
      
    //objectName 为"RC:LBSMsg"时(位置消息) 
    latitude:,//维度
    longitude:,//经度
    poi:,//地理位置的名称
    imgPath:,//地图略缩图的路径
    extra:,//消息的附加字段
      
      
    //objectName 为"RC:CmdNtf"时(命令消息) 
    name:,//命令的名称
    data:,//命令的数据
    
```

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
window.uexOnload = function() {
   uexRongCloud.onMessageReceived = onMessageReceived;
};
function onMessageReceived(info) {
  alert('onMessageReceived: ' + JSON.stringify(info));
}                
```
##2.3、会话功能
***

>### getConversationList 获取会话列表
`var param = getConversationList();`

**说明:**

获取会话列表,同步返回。

**参数:**

param为json字符串

```
var params={
    resultCode:,// Number  0 返回成功,其他为失败
    conversations:[
        {
            conversationTitle:, 
            conversationType:, 
            draft:, 
            targetId:, 
            latestMessage: {
                text:,
                extra:
            }, // 最后一条消息的内容，格式和onMessageReceived的message -> content字段相同
            sentStatus:, 
            objectName:, 
            receivedStatus: , 
            senderUserId:, 
            unreadMessageCount:, 
            receivedTime:, 
            sentTime:
            isTop:,  
            latestMessageId:
        }
        ....
    ]
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  resultCode   | Number | 是 | 0为返回成功,其他为失败 |
|  conversationTitle   | String | 是 |  会话的标题 |
|  draft   | String | 是 | 文字消息草稿的内容 |
|  targetId   | String | 是 | 目标会话ID |
|  latestMessage   | JSON对象 | 是 | 最后一条消息的内容，格式和onMessageReceived的message -> content字段相同 |
|  sentStatus   | String | 是 | 发送状态:DESTROYED:对方已销毁 ;FAILED:发送失败; READ:对方已读; RECEIVED:对方已接收; SENDING:发送中; SENT:已发送; |
|  objectName   | String | 是 |会话中最后一条消息的类型, "RC:TxtMsg":文字消息;"RC:VcMsg":语音消息;"RC:ImgMsg":图片消息;"RC:ImgTextMsg":图文消息;"RC:LBSMsg":位置消息;"RC:CmdMsg":命令消息|
|  receivedStatus   | String | 是 | 会话中最后一条消息的接收状态,"UNREAD":未读；"READ":已读；"LISTENED":已听，仅用于语音消息;"DOWNLOADED":已下载 |
|  senderUserId   | String | 是 | 会话中最后一条消息的发送者用户ID |
| unreadMessageCount   | Number | 是 | 本会话的未读消息数 |
| receivedTime   | Number | 是 | 会话中最后一条消息的接收时间,从1970年1月1日0点0分0秒开始到现在的毫秒数 |
| sentTime   | Number | 是 | 会话中最后一条消息的发送时间,从1970年1月1日0点0分0秒开始到现在的毫秒数 |
| isTop   | bool | 是 | 是否置顶，true为置顶，false为不置顶 |
| latestMessageId   | Number | 是 | 会话中最后一条消息的消息ID |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
var params = uexRongCloud.getConversationList();
  alert(params);     
          
```

>### getConversation 获取某一会话信息
>
`var result = uexRongCloud.getConversation(param);`

**说明:**

获取某一会话信息,同步返回。

**参数:**

param为json字符串

```
var param = {
     conversationType:,//消息的会话类型
     targetId:,//目标会话ID
}

```
result为json字符串

```
var result = {
    resultCode:,//Number, 0为返回成功,其他为失败
    conversationTitle:, // String，会话标题
    conversationType:, // String，会话类型
    draft:, // String，文字消息草稿的内容
    targetId:, // String，消息目标 Id
    latestMessage: {
    }, //JSON对象，消息的内容，格式和onMessageReceived的message -> content字段相同
    sentStatus:, //String, 发送状态:DESTROYED:对方已销毁 ;FAILED:发送失败; READ:对方已读; RECEIVED:对方已接收; SENDING:发送中; SENT:已发送;
    objectName:, // String，消息的类型, "RC:TxtMsg":文字消息;"RC:VcMsg":语音消息;"RC:ImgMsg":图片消息;"RC:ImgTextMsg":图文消息;"RC:LBSMsg":位置消息;"RC:CmdMsg":命令消息  
    recievedStatus: , //String，消息的接收状态,"UNREAD":未读；"READ":已读；"LISTENED":已听，仅用于语音消息;"DOWNLOADED":已下载
    senderUserId: , // String，消息的发送者用户ID
    unreadMessageCount: , //Number，本会话的未读消息数
    receivedTime: , //Number， 消息的接收时间,从1970年1月1日0点0分0秒开始到现在的毫秒数
    sentTime: , //Number， 消息的发送时间,从1970年1月1日0点0分0秒开始到现在的毫秒数
    isTop:, //bool，是否置顶，true为置顶，false为不置顶
    latestMessageId: // Number，消息ID
} 
```

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
var params = {
    conversationType: "PRIVATE",
    targetId: "55666"
  };
  var data = JSON.stringify(params);
  var result = uexRongCloud.getConversation(data);
  alert(result);


```
>### removeConversation 从会话列表中移除某一会话,但是不删除会话内的消息
`uexRongCloud.removeConversation(param);`

**说明:**

从会话列表中移除某一会话,但是不删除会话内的消息。

**参数:**
param为json字符串

```
var params={
    conversationType:,//消息的会话类型
    targetId:,//消息目标 Id
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  conversationType   | String | 是 | 会话类型, 'PRIVATE':单聊 ;'DISCUSSION':讨论组 'GROUP':群组 ;'CHATROOM':聊天室 ;'CUSTOMER_SERVICE':客服 ;'SYSTEM':系统 |
|  targetId   | String | 是 |  消息目标 Id |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
var params = {
    conversationType: "PRIVATE",
    targetId: "55666"
  };
  var data = JSON.stringify(params);
  uexRongCloud.removeConversation(data);


```
>### cbRemoveConversation removeConversation的回调
`uexRongCloud.cbRemoveConversation(param);`

**说明:**

removeConversation的回调。

**参数:**
param为json对象

```
var params={
    resultCode:
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  resultCode   | Number | 是 | 0表示成功,其他为失败 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
window.uexOnload = function() {
   uexRongCloud.cbRemoveConversation = cbRemoveConversation;
};
function cbRemoveConversation(info) {
  alert('cbRemoveConversation: ' + JSON.stringify(info));
}                
```

>### clearConversations 清空所有会话及会话消息
`uexRongCloud.clearConversations(param);`

**说明:**

清空所有会话及会话消息。

**参数:**

param为json字符串

```
var params={
    conversationTypes:
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  conversationTypes   | Array | 是 | 消息的会话类型数组,内部元素由conversationType构成 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
 var types = new Array();
 types[0] = "PRIVATE";
 var params = {
    conversationTypes: types
 };
 var data = JSON.stringify(params);
 uexRongCloud.clearConversations(data);              
```

>### cbClearConversations  clearConversations的回调
`uexRongCloud.cbClearConversations(param);`

**说明:**

clearConversations的回调。

**参数:**
param为json对象

```
var params={
    resultCode:
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  resultCode   | Number | 是 | 0表示成功,其他为失败 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
window.uexOnload = function() {
   uexRongCloud.cbClearConversations = cbClearConversations;
};
function cbClearConversations(info) {
  alert('cbRemoveConversation: ' + JSON.stringify(info));
}                
```

>### setConversationToTop 设置会话置顶
`uexRongCloud.setConversationToTop(param);`

**说明:**

设置会话置顶。

**参数:**

param为json字符串

```
var params={
    conversationType:,
    targetId:,
    isTop:
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  conversationType   | String | 是 | 消息的会话类型 |
|  targetId   | String | 是 | 消息目标 Id |
|  isTop   | bool | 是 | true 或false 是否置顶 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+



**示例:**

```
var params = {
    conversationType: "PRIVATE",
    targetId: "55666",
    isTop: true
  };
  var data = JSON.stringify(params);
  uexRongCloud.setConversationToTop(data);
            
```
>### cbSetConversationToTop   setConversationToTop 的回调
`uexRongCloud.cbSetConversationToTop(param);`

**说明:**

setConversationToTop 的回调。

**参数:**
param为json对象

```
var params={
    resultCode://Number 0表示成功,其他为失败
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  resultCode   | Number | 是 | 0表示成功,其他为失败 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+



**示例:**

```
window.uexOnload = function() {
   uexRongCloud.cbSetConversationToTop = cbSetConversationToTop;
};
function cbSetConversationToTop(info) {
  alert('cbRemoveConversation: ' + JSON.stringify(info));
}                
```

>### getConversationNotificationStatus 获取某一会话的通知状态 
`uexRongCloud.getConversationNotificationStatus(param);`

**说明:**

获取某一会话的通知状态。

**参数:**
param为json字符串

```
var params={
    conversationType:,
    targetId:
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  conversationType   | String | 是 | 消息的会话类型 |
|  targetId   | String | 是 | 消息目标 Id |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+



**示例:**

```
var params = {
    conversationType: "PRIVATE",
    targetId: "55666"
  };
  var data = JSON.stringify(params);
  uexRongCloud.getConversationNotificationStatus(data);
            
```

>### cbGetConversationNotificationStatus  getConversationNotificationStatus 的回调
`uexRongCloud.cbGetConversationNotificationStatus(param);`

**说明:**

getConversationNotificationStatus 的回调。

**参数:**

param为json对象

```
var params={
    resultCode://Number 
    status:,//Number 状态码,0:免打扰 / 1:提醒
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  resultCode   | Number | 是 | 0表示成功,其他为失败 |
|  status   | Number | 是 | 状态码,0:免打扰 ; 1:新消息提醒 ,resultCode为0存在|

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
window.uexOnload = function() {
   uexRongCloud.cbGetConversationNotificationStatus = cbGetConversationNotificationStatus;
};
function cbGetConversationNotificationStatus(info) {
  alert('cbGetConversationNotificationStatus:' + JSON.stringify(info));
}                
```
>### setConversationNotificationStatus 设置某一会话的通知状态
`uexRongCloud.setConversationNotificationStatus(param);`

**说明:**

设置某一会话的通知状态。

**参数:**
param为json字符串

```
var params={
    conversationType:,
    targetId:,
    status:
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  conversationType   | String | 是 | 消息的会话类型 |
|  targetId   | String | 是 | 消息目标 Id |
|  status   | Number | 是 | 状态码,0:免打扰 ; 1:新消息提醒 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
var params = {
    conversationType: "PRIVATE",
    targetId: "55666",
    status: 1
  };
  var data = JSON.stringify(params);
  uexRongCloud.setConversationNotificationStatus(data);              
```
>### cbSetConversationNotificationStatus  setConversationNotificationStatus 的回调
`uexRongCloud.cbSetConversationNotificationStatus(param);`

**说明:**

setConversationNotificationStatus 的回调。

**参数:**
param为json对象

```
var params={
    resultCode:
    status:
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  resultCode   | Number | 是 | 0表示成功,其他为失败 |
|  status   | Number | 是 | 会话设置的消息提醒状态,0:免打扰 ; 1:新消息提醒 ,resultCode为0存在|

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
window.uexOnload = function() {
   uexRongCloud.cbSetConversationNotificationStatus = cbSetConversationNotificationStatus;
};
function cbSetConversationNotificationStatus(info) {
  alert('cbSetConversationNotificationStatus:' + JSON.stringify(info));
}                
```

>### getLatestMessages 获取某一会话的最新消息记录
`uexRongCloud.getLatestMessages(param);`

**说明:**

获取某一会话的最新消息记录。

**参数:**
param为json字符串

```
var params={
    conversationType:,//消息的会话类型
    targetId:,//消息目标 Id
    count:,//Number 要获取的消息数量
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  conversationType   | String | 是 | 消息的会话类型 |
|  targetId   | String | 是 | 消息目标 Id |
|  count   | Number | 是 | 要获取的消息数量 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
var params = {
    conversationType: "PRIVATE",
    targetId: "55666",
    count: 20
  };
  var data = JSON.stringify(params);
  uexRongCloud.getLatestMessages(data);              
```

>### cbGetLatestMessages  getLatestMessages 的回调
`uexRongCloud.cbGetLatestMessages(param);`

**说明:**

getLatestMessages 的回调。

**参数:**
param为json对象

```
var params=[
        {
            content: {
                text: ,
                extra: 
            }, // 消息内容,格式和onMessageReceived的message -> content字段相同
            extra:, // String，消息的附加信息,此信息只保存在本地
            conversationType:, //String，会话类型
            messageDirection:, //String 消息方向 发送:SEND  接收:RECEIVE
            targetId:, // String，这里对应消息发送者的 userId
            objectName:, //String， 消息类型 
            sentStatus:, // String, 发送状态:DESTROYED:对方已销毁 ;FAILED:发送失败; READ:对方已读; RECEIVED:对方已接收; SENDING:发送中; SENT:已发送;
            senderUserId:, // String，消息发送者 userId
            messageId:,// Number，消息 Id
            sentTime:,// Number，发送消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数
            receivedTime: //Number， 收到消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数
    }
    ...
]

```

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
window.uexOnload = function() {
   uexRongCloud.cbGetLatestMessages = cbGetLatestMessages;
};
function cbGetLatestMessages(info) {
  alert('cbGetLatestMessages:' + JSON.stringify(info));
}                
```
>### getHistoryMessages 获取某一会话的历史消息记录
`uexRongCloud.getHistoryMessages(param);`

**说明:**

获取某一会话的历史消息记录。

**参数:**
param为json字符串

```
var params={
    conversationType:,
    targetId:,
    count:,
    oldestMessageId:
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  conversationType   | String | 是 | 消息的会话类型 |
|  targetId   | String | 是 | 消息目标 Id |
|  count   | Number | 是 | 要获取的消息数量 |
|  oldestMessageId   | Number | 是 |截止的消息ID,获取此消息之前的 count 条消息,没有消息第一次调用应设置为: -1。如：oldestMessageId为10，count为2，会返回messageId为9和8的消息列表 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
  var params = {
    conversationType: "PRIVATE",
    targetId: "55666",
    count: 2,
    oldestMessageId: 10
  };
  var data = JSON.stringify(params);
  uexRongCloud.getHistoryMessages(data);
      
```
>### cbGetHistoryMessages   getHistoryMessages 的回调
`uexRongCloud.cbGetHistoryMessages(param);`

**说明:**

getHistoryMessages 的回调。

**参数:**
param为json对象

```
var params=[
        {
            content: {
                text: ,
                extra: 
            }, // 消息内容,格式和onMessageReceived的message -> content字段相同
            extra:, // String,消息的附加信息,此信息只保存在本地
            conversationType:, //String,会话类型
            messageDirection:, //String, 消息方向 发送:SEND  接收:RECEIVE
            targetId:, //String, 这里对应消息发送者的 userId
            objectName:, //String, 消息类型 
            sentStatus:, //String, 发送状态:DESTROYED:对方已销毁 ;FAILED:发送失败; READ:对方已读; RECEIVED:对方已接收; SENDING:发送中; SENT:已发送;
            senderUserId:, // String,发送者 userId
            messageId:,//Number, 本地消息 Id
            sentTime:,// Number,发送消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数
            receivedTime: //Number, 收到消息的时间戳,从1970年1月1日0点0分0秒开始到现在的毫秒数
        }
        ...
]

```

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
window.uexOnload = function() {
   uexRongCloud.cbGetHistoryMessages = cbGetHistoryMessages;
};
function cbGetHistoryMessages(info) {
  alert('cbGetHistoryMessages:' + JSON.stringify(info));
}                
```
>### deleteMessages 删除消息
`uexRongCloud.deleteMessages(param);`

**说明:**

删除消息。

**参数:**
param为json字符串

```
var params={
    messageIds:
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  messageIds   | Array | 是 | 要删除的消息Id数组,内部元素由messageId构成 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+



**示例:**

```
  var ids = new Array();
  ids[0]= 12;
  var params = {
   messageIds: ids
  };
  var data = JSON.stringify(params);
  uexRongCloud.deleteMessages(data);
      
```

>### cbDeleteMessages deleteMessages 的回调
`uexRongCloud.cbDeleteMessages(param);`

**说明:**

deleteMessages 的回调。

**参数:**
param为json对象

```
var params={
    resultCode:
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  resultCode   | Number | 是 | 0表示成功,其他为失败 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
window.uexOnload = function() {
   uexRongCloud.cbDeleteMessages = cbDeleteMessages;
};
function cbDeleteMessages(info) {
  alert('cbDeleteMessages:' + JSON.stringify(info));
}                
```

>### clearMessages   清空某一会话的所有聊天消息记录
`uexRongCloud.clearMessages(param);`

**说明:**

清空某一会话的所有聊天消息记录。

**参数:**
param为json字符串

```
var params={
    conversationType:,
    targetId:
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  conversationType   | String | 是 | 消息的会话类型 |
|  targetId   | String | 是 | 消息目标 Id |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
  var params = {
    conversationType: "PRIVATE",
    targetId: "55666"
  };
  var data = JSON.stringify(params);
  uexRongCloud.clearMessages(data);
      
```
>### cbClearMessages  clearMessages 的回调
`uexRongCloud.cbClearMessages(param);`

**说明:**

clearMessages 的回调。

**参数:**
param为json对象

```
var params={
    resultCode:
}

```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  resultCode   | Number | 是 | 0表示成功,其他为失败 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
window.uexOnload = function() {
   uexRongCloud.cbClearMessages = cbClearMessages;
};
function cbClearMessages(info) {
  alert('cbClearMessages:' + JSON.stringify(info));
}                
```
>### getTotalUnreadCount() 获取所有未读消息数
`var count = uexRongCloud.getTotalUnreadCount();`

**说明:**

获取所有未读消息数。

**参数:**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  count   | Number | 是 | 所有的未读消息数 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
var count = uexRongCloud.getTotalUnreadCount();
alert(count);             
```
>### getUnreadCount  获取来自某用户(某会话)的未读消息数
`var count = uexRongCloud.getUnreadCount(param);`

**说明:**

获取来自某用户(某会话)的未读消息数。

**参数:**
param为json字符串

```
var params={
    conversationType:,
    targetId:
}
```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  conversationType   | String | 是 | 消息的会话类型 |
|  targetId   | String | 是 | 消息目标 Id |
|  count   | Number | 是 | 返回来自某用户(某会话)的未读消息数 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
var params = {
    conversationType:"PRIVATE",
    targetId:"55666"
  };
  var data = JSON.stringify(params);
  var count = uexRongCloud.getUnreadCount(data);
  alert(count);              
```
>### getUnreadCountByConversationTypes  获取某(些)会话类型的未读消息数
`var count = uexRongCloud.getUnreadCountByConversationTypes(param);`

**说明:**

获取某(些)会话类型的未读消息数。

**参数:**
param为json字符串

```
var params={
    conversationTypes:,//消息的会话类型,是conversationType的数组
}
```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  conversationTypes   | Array | 是 | 消息的会话类型数组,由conversationType构成 |
|  count   | Number | 是 | 返回某(些)会话类型的未读消息数 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
  var types = new Array();
    types[0]= "PRIVATE";
    var params = {
    conversationTypes: types
    };
    var data = JSON.stringify(params);
    var count = uexRongCloud.getUnreadCountByConversationTypes(data);
    alert(count);    
```
>### setMessageReceivedStatus  设置接收到的消息状态
`uexRongCloud.setMessageReceivedStatus(param);`

**说明:**

设置接收到的消息状态。

**参数:**
param为json字符串

```
var params={
    messageId:,
    receivedStatus:
}
```

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  messageId   | Number | 是 | 消息的Id |
|  receivedStatus   | String | 是 | 消息的接收状态,"UNREAD":未读；"READ":已读；"LISTENED":已听，仅用于语音消息;"DOWNLOADED":已下载 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+


**示例:**

```
  var params = {
    messageId: 12, 
    receivedStatus: "READ"
  };
  var data = JSON.stringify(params);
  uexRongCloud.setMessageReceivedStatus(data);
     
```
>### clearMessagesUnreadStatus   清除某一会话的消息未读状态，iOS不支持
`uexRongCloud.clearMessagesUnreadStatus(param);`

**说明:**

清除某一会话的消息未读状态。

**参数:**
param为json字符串

```
var params={
    conversationType:,
    targetId:
}
```
| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  conversationType   | String | 是 | 消息的会话类型 |
|  targetId   | String | 是 | 消息目标 Id |

**平台支持:**

Android2.2+    


**版本支持:**

Android3.0.0+    



**示例:**

```
  var params = {
    conversationType: "PRIVATE",
    targetId: "55666"
  };
  var data = JSON.stringify(params);
  uexRongCloud.clearMessagesUnreadStatus(data);
     
```

#3、附录
>### 建立连接返回的错误码

| error | 错误信息                                     |
| ----- | ----- |
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
| ----- | ----- |
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

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 融云IM(uexRongCloud)插件 for iOS |

### Android

API版本:`uexRongCloud-3.0.0`

最近更新时间:`2016-4-11`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 融云IM(uexRongCloud)插件 |
#5 文档更新记录

