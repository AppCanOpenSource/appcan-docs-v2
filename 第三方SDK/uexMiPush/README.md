
[TOC]

#1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

小米推送插件
##1.1、 说明
*  在使用小米推送服务前，开发者需要先登录小米开发者网站http://developer.xiaomi.com ，注册app，申请AppId, AppKey,AppSecret。其中AppId和AppKey是客户端的身份标识，在客户端SDK初始化时使用；AppSecret是服务器端的身份标识，在使用Server SDK向客户端发送消息时使用。

*  客户端在注册成功后，会得到服务器颁发的regId，然后可以通过订阅topic、设置alias来接收推送消息。详见小米推送文档[基础概念](http://dev.xiaomi.com/doc/p=6724/index.html "基础概念")

*  小米推送目前支持两种消息传递方式：透传方式和通知栏方式。透传消息到达手机端后，SDK会将消息通过广播方式传给onReceivePassThroughMessage；对于通知栏消息，SDK会根据消息中设置的信息弹出通知栏通知，通知消息到达时会到达onNotificationMessageArrived方法,用户点击之后再传给onNotificationMessageClicked方法；对于应用在前台时不弹出通知的通知消息，SDK会将消息通过广播方式传给onNotificationMessageArrived方法(在MIUI上，如果没有收到onNotificationMessageArrived回调，是因为使用的MIUI版本还不支持该特性，需要升级到MIUI7之后。非MIUI手机都可以收到这个回调)。

*  Android需要在`config.xml`中配置相应的参数，如下：

   ```xml
     <config desc="uexMiPush" type="KEY">
        	<param name="$packageName$" platform="Android" value="此处填写你的包名"/>
     </config>
   ```


##1.2、 开源源码

[点击](http://plugin.appcan.cn/details.html?id=673_index)插件中心至插件详情页(测试用例与插件源码已经提供)，beta版本自定义插件下载

## 1.3、接口有效性

插件默认支持的最低引擎版本为3.3，插件初始版本为3.3.0 。如果有特殊情况会在接口单独说明


#2、API概览
##2.1、方法

> ### registerCallback 注册回调

`uexMiPush.registerCallback()`

**说明**

所有的回调和监听函数都会发到调用了该接口的页面。如在`index.html`页面调用该接口，则所有的`cbGetAllAlias`,`onNotificationMessageClicked`等接口都会回调到该页面

**参数**

无

**示例**

```javascript
uexMiPush.registerCallback();
```

>### registerPush 注册推送服务

`uexMiPush.registerPush(params)`

**参数**

params 为JSON对象

```javascript
var params={
  appId,
  appKey
}
```

| 参数名称   | 参数类型   | 是否必选 | 说明              |
| ------ | ------ | ---- | --------------- |
| appId  | String | 是    | 小米推送官网申请的appId  |
| appKey | String | 是    | 小米推送官网申请的appKey |

**示例**

```javascript
 var params={
     appKey:"5421750944616",
     appId:"2882303761517509616"
 };
 uexMiPush.registerPush(params);
```

>### unregisterPush   取消推送服务

`uexMiPush.unregisterPush()`

**参数**

无

**示例**

```javascript
uexMiPush.unregisterPush();
```
> ### setAlias   设置别名

`uexMiPush.setAlias(alias)`

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明   |
| ----- | ------ | ---- | ---- |
| alias | String | 是    | 别名   |

**示例**

```javascript
uexMiPush.setAlias("test");
```



> ### setAlias   取消别名

`uexMiPush.unsetAlias(alias)`

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明   |
| ----- | ------ | ---- | ---- |
| alias | String | 是    | 别名   |

**示例**

```javascript
uexMiPush.unsetAlias("test");
```



> ### setUserAccount 设置userAccount

`uexMiPush.setUserAccount(account)`

**参数**

| 参数名称    | 参数类型   | 是否必选 | 说明          |
| ------- | ------ | ---- | ----------- |
| account | String | 是    | userAccount |

**示例**

```javascript
uexMiPush.setUserAccount("123456");
```



> ### unsetUserAccount 取消userAccount

`uexMiPush.unsetUserAccount(account)`

**参数**

| 参数名称    | 参数类型   | 是否必选 | 说明          |
| ------- | ------ | ---- | ----------- |
| account | String | 是    | userAccount |

**示例**

```javascript
uexMiPush.unsetUserAccount("123456");
```



> ### subscribe 设置订阅主题

`uexMiPush.subscribe(topic)`

**说明**

为某个用户设置订阅主题；根据用户订阅的不同主题，开发者可以根据订阅的主题实现分组群发。

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明   |
| ----- | ------ | ---- | ---- |
| topic | String | 是    |   　   |

**示例**

```javascript
uexMiPush.subscribe("AppCan");
```



> ### unsubscribe 取消订阅主题

`uexMiPush.unsubscribe(topic)`

**说明**

为某个用户取消某个订阅主题

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明   |
| ----- | ------ | ---- | ---- |
| topic | String | 是    |    　  |

**示例**

```javascript
uexMiPush.unsubscribe("AppCan");
```



> ### setAcceptTime 设置接收服务推送的时段

`uexMiPush.setAcceptTime(params)`

**说明**

设置接收MiPush服务推送的时段，不在该时段的推送消息会被缓存起来，到了合适的时段再向app推送原先被缓存的消息。

这里采用24小时制，如果开始时间早于结束时间，则这个时段落在一天内；否则，这个时间将会跨越凌晨0点。

这里使用与regId相关联的alias和topic推送消息，也会受到限制。

如果时间设置为0 : 00-0 :00，就是暂停push推送服务，
如果时间设置为0: 00-23 :59，就是恢复push推送服务，即全天接收push推送消息

**参数**

```javascript
var params={
  startHour,
  startMin,
  endHour,
  endMin
}
```

| 参数名称      | 参数类型   | 是否必选 | 说明          |
| --------- | ------ | ---- | :---------- |
| startHour | Number | 是    | 接收时段开始时间的小时 |
| startMin  | Number | 是    | 接收时段开始时间的分钟 |
| endHour   | Number | 是    | 接收时段结束时间的小时 |
| endMin    | Number | 是    | 接收时段结束时间的分钟 |

**示例**

```javascript
 var params={
     startHour:1,
     startMin:0,
     endHour:23,
     endMin:0
 };
 uexMiPush.setAcceptTime(params);
```



> ### getRegId 获取客户端的RegId

`uexMiPush.getRegId()`
**说明**
获取客户端的RegId，支持同步返回。
**参数**

无

**返回值**

String类型

**示例**

```javascript
var regId=uexMiPush.getRegId();
```



> ### getAllAlias 获取客户端所有设置的别名

`uexMiPush.getAllAlias()`
**说明**
取客户端所有设置的别名。回调cbGetAllAlias
**参数**

无

**示例**

```javascript
uexMiPush.getAllAlias();
```



> ### cbGetAllAlias getAllAlias的回调函数

`uexMiPush.cbGetAllAlias()`

**说明**

getAllAlias获取客户端所有设置的别名的回调函数

**参数**

| 参数名称 | 参数类型   | 是否必选 | 说明           |
| ---- | ------ | ---- | ------------ |
| data | String | 是    | 数组的JSON格式字符串 |

**示例**

```javascript
uexMiPush.cbGetAllAlias=function (data) {
}
```



> ### getAllTopic 获取客户端所有订阅的主题

`uexMiPush.getAllTopic()`
**说明**
获取客户端所有订阅的主题，回调cbGetAllTopic
**参数**

无

**示例**

```javascript
uexMiPush.getAllTopic();
```



> ### cbGetAllTopic getAllTopic的回调函数

`uexMiPush.cbGetAllTopic()`
**说明**
获取客户端所有订阅的主题的回调函数
**参数**

| 参数名称 | 参数类型   | 是否必选 | 说明           |
| ---- | ------ | ---- | ------------ |
| data | String | 是    | 数组的JSON格式字符串 |

**示例**

```javascript
uexMiPush.cbGetAllTopic=function (data) {
  
}
```



### 2.3、监听方法



> ### onReceivePassThroughMessage 接收服务器推送的透传消息

`uexMiPush.onReceivePassThroughMessage(params)`

**参数**

`params`是JSON对象

```javascript
var params={
  messageId:,//String类型 消息的id
  messageType:,//Number类型 消息的类型，分为三种:0:MESSAGE_TYPE_REG、1:MESSAGE_TYPE_ALIAS、2:MESSAGE_TYPE_TOPIC
  content:,//String类型 消息的内容
  alias:,//String类型 别名
  topic:,//String类型 话题
  userAccount:,//String类型 
  passThrough:,//Number类型 服务器端推送的消息类型。如果passThrough值为1,则是透传消息；如果passThrough值为0,则是通知栏消息
  notifyType:,//Number类型 消息的提醒方式，如震动、响铃和闪光灯。
  notifyId:,//Number类型 通知的Id
  isNotified:,//BOOL类型 消息是否通过通知栏传给app的。如果为true，表示消息在通知栏出过通知；如果为false，表示消息是直接传给app的，没有弹出过通知。
  description:,//String类型 消息描述
  title:,//String类型 消息的标题
  arrived:,//BOOL类型 是否到达
  extra:{
    
  }//包含一些附加信息，如自定义通知栏铃声的URI、通知栏的点击行为等等
}
```

**示例**

```javascript
uexMiPush.onReceivePassThroughMessage=function (data) {
  	//data.title
}
```



> ### onNotificationMessageClicked 用户点击后触发

`uexMiPush.onNotificationMessageClicked(params)`

**参数**

同`onReceivePassThroughMessage`

**示例**

```javascript
uexMiPush.onNotificationMessageClicked=function (data) {
  	//data.title
}
```



> ### onNotificationMessageArrived 消息到达客户端时触发

`uexMiPush.unsubscribe(params)`

**参数**

同`onReceivePassThroughMessage`

**示例**

```javascript
uexMiPush.onNotificationMessageArrived=function (data) {
  	//data.title
}
```



> ### onCommandResult 获取给服务器发送命令的结果

`uexMiPush.onCommandResult(params)`

**参数**

`params`是JSON对象

```javascript
var params={
/**
调用registerPush(),返回"register"
调用setAlias()，返回"set-alias"
调用unsetAlias()，返回"unset-alias"
调用subscribe()，返回"subscribe-topic"
调用unsubscribe()，返回"unsubscibe-topic"
调用setAcceptTime()，返回"accept-time"
**/
  command:,//String类型 ，如上说明描述
  resultCode:,//Number类型 表示调用命令的结果。如果成功，返回0；否则返回错误类型值。
  reason:,//String类型 表示调用命令失败的原因。如果失败，则返回失败原因，否则返回为null。
  commandArguments://String 数组类型  表示命令的参数。例如:注册app就会返回app本次初始化所对应MiPush推送服务的唯一标识regId，alias就会返回alias的内容，订阅和取消订阅主题就会返回topic，setAcceptTime就会返回时间段。
}
```



**示例**

```javascript
uexMiPush.onCommandResult=function (data) {
  //data.command
}
```



> ### onReceiveRegisterResult 获取给服务器发送注册命令的结果

`uexMiPush.onReceiveRegisterResult(params)`

**参数**

同`onCommandResult`

**示例**

```javascript
uexMiPush.onReceiveRegisterResult=function (data) {
  //data.command
}
```

#3、更新历史


### Android

| 历史发布版本 | 更新内容  |
| ------ | ----- |
| 3.3.0  | 初始化版本 |
