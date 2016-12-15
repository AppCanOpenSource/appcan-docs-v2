[TOC]
# 1､简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
 mqtt 插件
## 1.1､说明
本插件封装了mqtt 
## 1.3､开源源码
插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)


## 1.4､平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.


# 2､API概览


## 2.1､ 方法


### 🍭 init 初始化

`uexMQTT.init()`

**说明:**

会触发[onStatusChange](#🍭 onStatusChange)

**参数:**

无

**示例:**

```javascript
uexMQTT.init();
```


### 🍭 connect 连接到MQTT服务器

`uexMQTT.connect(param,callback)`

**说明:**

* 目前不支持SSL验证.
* 会触发[onStatusChange](#🍭 onStatusChange)


**参数:**

`param`是JSON Object

```javascript
var param = {
    clientId:,//String,可选,客户端Id,此参数不传时,将随机生成一个
    server:,//String,必选,服务器地址
	port:,//Number,必选,服务器端口
	username:,//String,可选,用户名(如果服务器允许匿名登录,此参数可为空)
	password:,//String,可选,用户密码(传username时,此参数必传,不传username时,此参数将被忽略)
	keepAliveInterval:,//Number,必选,心跳包发送频率,单位:秒
	LWT:{//Object,可选,Last Will and Testament相关设置
		enable:,//Boolean, 是否启用LWT
		topic:,//String,willMessage的topic
		qos:,//Number,willMessage的qos
		data:,//String,willMessage的data
		retainFlag:,//Boolean,willMessage的retainFlag
	}
}
```

`callback`是一个Function

```javascript
var callback=function(error,data){
  	//error 为0时表示成功,其他表示失败
  	//data 错误时返回相关的错误信息
}
```

**示例**

```javascript
     uexMQTT.connect({
         server: "test.mosquitto.org", //String,必选,服务器地址
         port: 1883, //Number,必选,服务器端口
         keepAliveInterval: 30, //Number,必选,心跳包发送频率,单位:秒
         // LWT:{//Object,可选,Last Will and Testament相关设置
         //   enable:true,//Boolean, 是否启用LWT
         //   topic:"willTopic",//String,willMessage的topic
         //   qos:1,//Number,willMessage的qos
         //   data:"willData",//String,willMessage的data
         //   retainFlag:true,//Boolean,willMessage的retainFlag
         // }
     },function (error, data) {
         if (!error){
             alert("connect success...")
         }else{
             alert("failed. "+data)
         }
     });
```



### 🍭 subscribe 订阅一个topic

`uexMQTT.subscribe(param,callback)`

**说明:**

无

**参数:**

param是JSON Object

```
var param = {
	topic:,//String,必选,要订阅的topic
	qos:,//Number,必选 此topic的qos
	
}
```

`callback`是一个Function

```javascript
var callback=function(error,topic){
  	//error 为0时表示成功,其他表示失败
  	//topic String,要订阅的topic,error非0(即错误)时返回相关的错误信息
}
```

**示例**

```javascript
     uexMQTT.subscribe({
         topic: "b1e57467c92140e299022deb808cdd24/000000/get", //String,必选,要订阅的topic
         qos: 1, //Number,必选 此topic的qos
     },function (error, data) {
         if (!error){
             alert("subscribe success..."+data)
         }else{
             alert("failed. "+data)
         }
     });
```



### 🍭 unsubscribe 取消订阅一个topic

`uexMQTT.unsubscribe(param,callback)`

**说明:**

无

**参数:**

param是JSON Object

```
var param = {
	topic:,//String,必选,要取消订阅的topic
}
```

`callback`是一个Function

```javascript
var callback=function(error,topic){
  	//error 为0时表示成功,其他表示失败
  	//topic String,要订阅的topic,error非0(即错误)时返回相关的错误信息
}
```

**示例**

```javascript
     uexMQTT.unsubscribe({
         topic: "b1e57467c92140e299022deb808cdd24/000000/get", //String,必选,要订阅的topic
     },function (error, data) {
         if (!error){
             alert("unsubscribe success..."+data)
         }else{
             alert("failed. "+data)
         }
     });
```



### 🍭 publish 发布一条消息

`uexMQTT.publish(param,callback)`

**说明:**

无

**参数:**

param是JSON Object

```javascript
var param = {
	topic:,//String,必选,发布消息的topic
	qos:,//Number,必选,要发布消息的qos
	data:,//String,必选,要发布的消息数据
	retainFlag:,//Boolean,可选. MQTT broker是否要保留此消息,默认false
}
```

`callback`是一个Function

```javascript
var callback=function(error,data){
  	//error 为0时表示成功,其他表示失败
  	//topic error非0(即错误)时返回相关的错误信息
}
```

**返回值**

* qos = 0时,返回0
* qos = 1或者2时, 返回此消息的mid


**示例**

```javascript
     uexMQTT.publish({
         id: "uid123456", //String,必选,自定义id,用于在cbPublish中区分消息
         topic: "b1e57467c92140e299022deb808cdd24/000000/set", //String,必选,发布消息的topic
         qos: 0, //Number,必选,要发布消息的qos
         data: "heeello!", //String,必选,要发布的消息数据
         retainFlag: false //Boolean,可选. MQTT broker是否要保留此消息,默认false
     },function (error, data) {
         if (!error){
             alert("publish success...")
         }else{
             alert("failed. "+data)
         }
     });
```



### 🍭 disconnect 中断与服务器的连接

`uexMQTT.disconnect(callback)`

**说明:**

* 会触发[onStatusChange]()


**参数:**

`callback`是一个Function

```javascript
var callback=function(error,data){
  	//error 为0时表示成功,其他表示失败
  	//data 错误时返回相关的错误信息
}
```

**示例**

```javascript
 var disconnect = function() {
     uexMQTT.disconnect(function (error, data) {
         if (!error){
             alert("disconnect success...")
         }else{
             alert("disconnect failed...")
         }
     });
 }
```



## 2.2､监听方法


### 🍭 onStatusChange MQTT状态变化的监听

`uexMQTT.onStatusChange(param)`

**参数**

param是JSON Object

```javascript
var param = {
	status:,//MQTT状态,详见附录
}
```

**示例**

```javascript
 window.uexOnload = function() {

     uexMQTT.onStatusChange = function(data) {
		alert("status: "+data.status);
     }
 }
```



### 🍭 onNewMessage 收到新消息的监听

`uexMQTT.onNewMessage(param)`

**参数**

param是JSON Object

```javascript
var param = {
	data:,//String,必选,消息数据内容
	topic:,//String,必选, 消息的topic
	qos:,//Number,必选,消息的qos
	retainFlag:,//Boolean,必选,此消息是否来自于broker的storage
	mid:,//Number,必选,消息的mid
}
```

**示例**

```javascript
 window.uexOnload = function() {
     uexMQTT.onNewMessage = function(data) {
         alert("receive message!\nmid: " + data.mid + "\non topic: " + data.topic + "\nqos: " + data.qos + "\nretainFlag: " + data.retainFlag + "\ndata: " + data.data);
     }
 }
```



## 2.3､附录

### MQTTStatus


| status | desc          |
| ------ | ------------- |
| 0      | Initialized   |
| 1      | Connecting    |
| 2      | Connected     |
| 3      | Disconnecting |
| 4      | Closed        |


### MQTTErrorCode

| errCode | desc                     |
| ------- | ------------------------ |
| -255    | Unknown Error            |
| -6      | Socket Error             |
| -5      | Connection Already Exist |
| -4      | Connection Refused       |
| -3      | No Response              |
| -2      | Invalid Connack Received |
| -1      | No Connack Received      |
| 1~255   | MQTT Protocol ErrorCode  |

* MQTT协议错误码详见[这里](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html)

# 3､ 更新历史


