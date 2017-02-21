[TOC]
# 1､简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 

 socket插件
## 1.1､说明
 socket管理接口API,该对象主要封装了tcp,udp的创建以及传输数据文件等接口.
## 1.2､UI展示

 ![](http://newdocx.appcan.cn/docxapi/getCImg?img=133440g2015x6r16i.jpg)
## 1.3､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=189_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供) 

## 1.4､平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统. 
有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明. 

# 2､API概览
## 2.1､方法


### 🍭 createUDP 创建UDP对象

`uexSocketMgr.createUDP(param,onData)`

**说明:**

创建一个UDP对象.

**参数:**

| 参数名称   | 参数类型     | 是否必选 | 说明             |
| ------ | -------- | ---- | -------------- |
| param  | Object   | 是    | 包含创建UDP对象所需的参数 |
| onData | Function | 是    | 收到数据的监听函数      |

```javascript
var param = {
  port:,
  dataType:
}
```

各字段含义如下:

| 参数名称     | 参数类型   | 是否必选 | 说明                                       |
| -------- | ------ | ---- | ---------------------------------------- |
| port     | Number | 是    | 要绑定的本地端口                                 |
| dataType | Number | 否    | 通讯数据类型 取值范围{0,1,2},详见[附录-DataType](#dataType 通讯数据类型) .**默认为0** |

**回调参数:**

```javascript
var onData = function(info){
}
```

| 参数名称 | 类型     | 说明            |
| ---- | ------ | ------------- |
| info | Object | 收到的数据信息,形式见下: |

```javascript
var info = {
  port:,
  host:,
  data:
}
```

各字段含义如下:

| 参数名称 | 参数类型   | 是否必选 | 说明        |
| ---- | ------ | ---- | --------- |
| port | Number | 是    | 数据来源的端口号  |
| host | String | 是    | 数据来源的主机地址 |
| data | String | 是    | 收到的数据内容   |

**返回值:**

创建的UDP对象,若创建失败,返回null.

**示例:**

```javascript
var udp = uexSocketMgr.createUDP({
		dataType: 0,
		port: 10000
	},
	function(info){
		alert(JSON.stringify(info));
});
if(!udp){
	alert("创建udp对象失败");
}
```

### 🍭 send UDP对象发送数据

`uexSocketMgr.send(udp,param,cb)`

**说明:**

UDP对象发送数据.

**参数:**

| 参数名称  | 参数类型     | 是否必选 | 说明                     |
| ----- | -------- | ---- | ---------------------- |
| udp   | UDP对象    | 是    | 由createUDP方法创建得到的UDP对象 |
| param | Object   | 是    | 包含发送数据所需数据             |
| cb    | Function | 是    | 发送数据的回调函数              |

```javascript
var param = {
  host:,
  port:,
  data:,
  timeout:
}
```

各字段含义如下:

| 参数名称    | 参数类型   | 是否必选 | 说明                               |
| ------- | ------ | ---- | -------------------------------- |
| host    | String | 是    | 目标IP地址                           |
| port    | Number | 是    | 目标端口号                            |
| data    | String | 是    | 要发送的数据                           |
| timeout | Number | 否    | 发送超时时限,单位毫秒.不传或者传小于等于0的值表示没有超时时限 |

**回调参数:**

```javascript
var cb = function(error){}
```

| 参数名称  | 类型     | 说明                       |
| ----- | ------ | ------------------------ |
| error | Number | 为0时表示发送成功,非0时表示发生错误,发送失败 |

**示例:**

```javascript
var udp = ...//之前由`createUDP`方法创建得到的UDP对象
uexSocketMgr.send(udp,
	{
		host: "192.168.1.4",
		port: 30001,
		data: "udp数据",
		timeout: 10000
	},
	function(error){
		alert(error ? "发送失败" : "发送成功")
});
```


### 🍭 createTCP 创建TCP对象

`uexSocketMgr.createTCP(param,onStatus,onData)`

**说明:**

创建一个TCP对象.

**参数:**

| 参数名称     | 参数类型     | 是否必选 | 说明               |
| -------- | -------- | ---- | ---------------- |
| param    | Object   | 是    | 包含创建TCP对象所需的参数   |
| onStatus | Function | 是    | TCP连接状态发生变化的监听函数 |
| onData   | Function | 是    | 收到数据的监听函数        |

```javascript
var param = {
  dataType:
}
```

各字段含义如下:

| 参数名称     | 参数类型   | 是否必选 | 说明                                       |
| -------- | ------ | ---- | ---------------------------------------- |
| dataType | Number | 否    | 通讯数据类型 取值范围{0,1,2},详见[附录-DataType](#dataType 通讯数据类型) .**默认为0** |

**回调参数:**

```javascript
var onStatus = function(status){
}
```

| 参数名称   | 类型     | 说明                   |
| ------ | ------ | -------------------- |
| status | Number | 0 - 已连接上服务器 1 - 连接中断 |

```javascript
var onData = function(info){
}
```

| 参数名称 | 类型     | 说明            |
| ---- | ------ | ------------- |
| info | Object | 收到的数据信息,形式如下: |

```javascript
var info = {
  data:
}
```

各字段含义如下:

| 参数名称 | 参数类型   | 说明      |
| ---- | ------ | ------- |
| data | String | 收到的数据内容 |

**返回值:**

创建的TCP对象,若创建失败,返回null.

**示例:**

```javascript
var tcp = uexSocketMgr.createTCP(
	{dataType: 2},
	function(status){
		alert(status == 0 ? "已连接上服务器" : "连接中断");
	},
	function(info){
		alert(info.data);
});
if(!tcp){
	alert("创建tcp对象失败");
}
```

### 🍭 connect TCP对象连接服务器

`uexSocketMgr.connect(tcp,param,cb)`

**说明:**

TCP对象连接至指定的TCP服务器.

**参数:**

| 参数名称  | 参数类型     | 是否必选 | 说明                     |
| ----- | -------- | ---- | ---------------------- |
| tcp   | TCP对象    | 是    | 由createTCP方法创建得到的TCP对象 |
| param | Object   | 是    | 包含接口所需的参数              |
| cb    | Function | 是    | 连接的回调函数                |

```javascript
var param = {
  host:,
  port:,
  timeout:
}
```

各字段详细解释如下:

| 参数名称    | 参数类型   | 是否必选 | 说明                               |
| ------- | ------ | ---- | -------------------------------- |
| host    | String | 是    | TCP服务器IP地址                       |
| port    | Number | 是    | TCP服务器端口号                        |
| timeout | Number | 否    | 发送超时时限,单位毫秒.不传或者传小于等于0的值表示没有超时时限 |

**回调参数:**

```javascript
var cb = function(error){
}
```

| 参数名称  | 类型     | 说明                                       |
| ----- | ------ | ---------------------------------------- |
| error | Number | 为0时表示发送成功,非0时表示发生错误,发送失败,连接成功时,也会触发TCP对象本身的onStatus监听 |

**示例:**

```javascript
var tcp = ...//之前由`createTCP`方法创建得到的tcp对象
uexSocketMgr.connect(tcp,
	{
		host: "192.168.1.4",
		port: 30000,
		timeout: 10000
	},
	function(error){
		alert(error ? "连接失败" : "连接成功")
});
```


### 🍭 write TCP对象写入数据

`uexSocketMgr.write(tcp,param,cb)`

**说明:**

 TCP对象写入数据.

**参数:**

| 参数名称  | 参数类型     | 是否必选 | 说明                     |
| ----- | -------- | ---- | ---------------------- |
| tcp   | TCP对象    | 是    | 由createTCP方法创建得到的TCP对象 |
| param | Object   | 是    | 写入时所需参数                |
| cb    | Function | 是    | 写入数据的回调函数              |

```javascript
var param = {
  data:,
  timeout:
}
```

各字段详细解释如下:

| 参数名称    | 参数类型   | 是否必选 | 说明                               |
| ------- | ------ | ---- | -------------------------------- |
| data    | String | 是    | 要写入的数据                           |
| timeout | Number | 否    | 写入超时时限,单位毫秒.不传或者传小于等于0的值表示没有超时时限 |

**回调参数:**

```javascript
var cb = function(error){
}
```

| 参数名称  | 类型     | 说明                       |
| ----- | ------ | ------------------------ |
| error | Number | 为0时表示写入成功,非0时表示发生错误,写入失败 |

**示例:**

```javascript
var tcp = ...//之前由`createTCP`方法创建得到的tcp对象
uexSocketMgr.write(tcp,
	{
		data: "tcp数据",
		timeout: 10000
	},
	function(error){
		alert(error ? "写入失败" : "写入成功")
});
```


### 🍭 close 关闭Socket

`uexSocketMgr.close(socket,param,cb)`

**说明:**

 关闭Socket.

**参数:**

| 参数名称   | 参数类型     | 是否必选 | 说明                                       |
| ------ | -------- | ---- | ---------------------------------------- |
| socket | Object   | 是    | 由createUDP方法创建得到的UDP对象,或是由createTCP方法创建得到的TCP对象 |
| param  | Object   | 是    | 接口所需数据                                   |
| cb     | Function | 是    | 关闭Socket的回调函数                            |

```javascript
var param = {
  flag:
}
```

各字段详细解释如下:

| 参数名称 | 参数类型   | 是否必选 | 说明                                       |
| ---- | ------ | ---- | ---------------------------------------- |
| flag | number | 否    | 0 - 立即关闭socket(默认) 1 - 如果存在当前正在进行的读写操作,会等待这些操作结束后再关闭socket |

**回调参数:**

```javascript
var cb = function(error){
}
```

| 参数名称  | 类型     | 说明                       |
| ----- | ------ | ------------------------ |
| error | Number | 为0时表示关闭成功,非0时表示发生错误,关闭失败 |

**示例:**

```javascript
var socket = ...//之前由`createTCP`方法创建得到的tcp对象,或者是由`createUDP`方法创建得到的UDP对象
uexSocketMgr.close(socket,
	{
		flag: 0
	},
	function(error){
		alert(error ? 关闭失败" : "关闭成功")
});
```



# 3､附录


###dataType 通讯数据类型

此值表示与对方(TCP服务端,或者其他UDP客户端)通讯时采用的数据类型,是一个Number类型的枚举值


| dataType | 数据类型   | 说明                                       |
| -------- | ------ | ---------------------------------------- |
| 0        | utf-8  | 双方均采用utf-8编码的字符串进行通讯                     |
| 1        | base64 | 此选项多用于二进制流通讯.前端应传入base64编码后的字符串,插件会对其进行解码并发送给对方;收到数据时,插件会对数据进行base64编码,并将编码后的字符串返回给前端. |
| 2        | gbk    | 当对方要求gbk编码时选择此项.前端应传入utf-8数据,插件会将数据重新按gbk编码后发送给对方; 收到对方的gbk数据时,插件会将数据重新按utf-8编码后返回给前端 |


# 4､更新历史

### iOS

API版本: `uexSocketMgr-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | Socket功能插件 |

### Android

API版本: `uexSocketMgr-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持function传入 |
