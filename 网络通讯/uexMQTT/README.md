# uexMQTT


## 方法


### init 初始化

`uexMQTT.init()`

* 会触发[onStatusChange]()





### connect 连接到MQTT服务器

`uexMQTT.connect(param)`

* 目前不支持SSL验证.
* 会触发[onStatusChange]()，[cbConnect]()


param是JSON Object

```
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

**返回值**
	如果当前已经有一个连接存在,则会返回false,其他情况返回true






### subscribe 订阅一个topic


`uexMQTT.subscribe(param)`


* 会触发[cbSubscribe]()


param是JSON Object

```
var param = {
	topic:,//String,必选,要订阅的topic
	qos:,//Number,必选 此topic的qos
	
}
```

### unsubscribe 取消订阅一个topic


`uexMQTT.unsubscribe(param)`

* 会触发[cbUnsubscribe]()，


param是JSON Object

```
var param = {
	topic:,//String,必选,要取消订阅的topic
}
```

### publish 发布一条消息

`uexMQTT.publish(param)`

* 会触发[cbPublish]()

param是JSON Object

```
var param = {
	id:,//String,必选,自定义id,用于在cbPublish中区分消息
	topic:,//String,必选,发布消息的topic
	qos:,//Number,必选,要发布消息的qos
	data:,//String,必选,要发布的消息数据
	retainFlag:,//Boolean,可选. MQTT broker是否要保留此消息,默认false
}
```

**返回值**

 * qos = 0时,返回0
 * qos = 1或者2时, 返回此消息的mid
 
 
 
### disconnect 中断与服务器的连接
`uexMQTT.disconnect()`

* 会触发[onStatusChange]()，[cbDisconnect]()



## 回调方法

### cbConnect

`uexMQTT.cbConnect(param)`

param是JSON Object

```
var param = {
	isSuccess:,//Boolean,必选,是否连接成功
	errCode:,//Number,连接失败时才会有此参数,错误码
}
```

### cbSubscribe

`uexMQTT.cbSubscribe(param)`

param是JSON Object

```
var param = {
	topic:,//String,必选,要订阅的topic
	isSuccess:,//Boolean,必选,是否订阅成功
	errCode:,//Number,订阅失败时才会有此参数,错误码
}
```
### cbUnsubscribe

`uexMQTT.cbUnsubscribe(param)`

param是JSON Object

```
var param = {
	topic:,//String,必选,要取消订阅的topic
	isSuccess:,//Boolean,必选,是否取消订阅成功
	errCode:,//Number,取消订阅失败时才会有此参数,错误码
}
```


### cbPublish

`uexMQTT.cbPublish(param)`

param是JSON Object

```
var param = {
	id:,//String,必选,被发送消息的自定义id
	isSuccess:,//Boolean,必选,是否发布成功
	errCode:,//Number,发布失败时才会有此参数,错误码
}
```

### cbDisconnect

`uexMQTT.cbDisconnect(param)`

param是JSON Object

```
var param = {
	isSuccess:,//Boolean,必选,是否断开连接成功
	errCode:,//Number,断开连接失败时才会有此参数,错误码
}
```

## 监听方法


### onStatusChange MQTT状态变化的监听

`uexMQTT.onStatusChange(param)`

param是JSON Object

```
var param = {
	status:,//MQTT状态,详见附录
}
```

### onNewMessage 收到新消息的监听
`uexMQTT.onNewMessage(param)`

param是JSON Object

```
var param = {
	data:,//String,必选,消息数据内容
	topic:,//String,必选, 消息的topic
	qos:,//Number,必选,消息的qos
	retainFlag:,//Boolean,必选,此消息是否来自于broker的storage
	mid:,//Number,必选,消息的mid
}
```

## 附录

### MQTTStatus


| status | desc   |
| ------ | ------ | 
| 0 | Initialized | 
| 1 | Connecting |
| 2 | Connected |
| 3 | Disconnecting |
| 4 | Closed | 


### MQTTErrorCode

| errCode | desc |
| ----- | -----  |
| -255 | Unknown Error |
| -6 | Socket Error |
| -5 | Connection Already Exist |
| -4 | Connection Refused |
| -3 | No Response |
| -2 | Invalid Connack Received |
| -1 | No Connack Received |
| 1~255 | MQTT Protocol ErrorCode |

* MQTT协议错误码详见[这里](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html)