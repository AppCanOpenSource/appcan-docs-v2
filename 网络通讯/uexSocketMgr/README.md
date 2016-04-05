[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
 
 socket插件
## 1.1、说明
 socket管理接口API,该对象主要封装了tcp,udp的创建以及传输数据文件等接口。
## 1.2、UI展示
 
 ![](http://newdocx.appcan.cn/docxapi/getCImg?img=133440g2015x6r16i.jpg)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=189_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览
## 2.1、方法
> ### createUDPSocket 创建UDP对象

`uexSocketMgr.createUDPSocket(id,port,dataType)`

**说明:**

创建UDP对象,同一id只能被创建一次,回调方法[cbCreateUDPSocket](#cbCreateUDPSocket 创建UDP对象的回调方法 "cbCreateUDPSocket")

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 唯一标识符 |
| port | Number | 是 | 本地端口号 |
| dataType | Number | 否 | 数据类型 取值范围{0,1,2},详见下方说明。**默认为0** |

* dataType应该根据Socket服务器端的情况进行设置
	* dataType == 0 时, 收发的数据应该是以UTF-8编码的字符串。
	* dataType == 1 时, 收到的数据会以base64编码后再返回给前端。前端传入的数据会先经过base64解码后再发送给服务器。
	* dataType == 2 时, 收发的数据应该是以GBK编码的字符串。

**平台支持:**

  Android2.2+
  iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    uexSocketMgr.createUDPSocket(1,45666);
```
> ### createTCPSocket 创建TCP对象

`uexSocketMgr.createTCPSocket(id,dataType)`

**说明:**

创建TCP对象,同一id只能被创建一次,回调方法[cbCreateTCPSocket](#cbCreateTCPSocket 创建TCP对象的回调方法 "cbCreateTCPSocket")

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 唯一标识符 |
| dataType | Number | 否 | 数据类型 取值范围{0,1,2},详见下方说明。**默认为0** |

* dataType应该根据Socket服务器端的情况进行设置
	* dataType == 0 时, 收发的数据应该是以UTF-8编码的字符串。
	* dataType == 1 时, 收到的数据会以base64编码后再返回给前端。前端传入的数据会先经过base64解码后再发送给服务器。
	* dataType == 2 时, 收发的数据应该是以GBK编码的字符串。

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexSocketMgr.createTCPSocket(2);
```
> ### closeSocket 关闭Socket对象

`uexSocketMgr.closeSocket(id)`

**说明:**

关闭Socket对象

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 唯一标识符 |

**平台支持:**

Android2.2+
iOS6.0+

**示例:**

```
uexSocketMgr.closeSocket(1);
```
> ### setTimeOut 设置超时时间

`uexSocketMgr.setTimeOut(id,timeOut)`

**说明:**

设置超时时间

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 唯一标识符 |
| timeOut | Number | 是 | 超时时间 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexSocketMgr.setTimeOut(1, 30000);
```

> ### setInetAddressAndPort 设置接收方的IP地址和端口

`uexSocketMgr.setInetAddressAndPort(id,ip,port)`

**说明:**

设置接收方的IP地址和端口,回调方法[cbConnected](#cbConnected 设置接收方的IP地址和端口的回调方法 "cbConnected")

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 唯一标识符 |
| ip | String | 是 | 接收方IP地址 |
| port | Number | 是 | 接收方端口 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexSocketMgr.setInetAddressAndPort(1,"192.168.1.255",3001);
```

> ### sendData 发送数据

`uexSocketMgr.sendData(id,msg)`

**说明:**

发送数据，回调方法[cbSendData](#cbSendData 发送数据的回调方法 "cbSendData")

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 唯一标识符 |
| msg | String | 是 | 要发送的数据 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexSocketMgr.sendData(1,"test");
```

## 2.2、回调方法
> ### cbCreateUDPSocket 创建UDP对象的回调方法

`uexSocketMgr.cbCreateUDPSocket(opId,dataType,data)`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | UDP对象的唯一标识符 |
| dataType | Number | 是 | 详见CONSTANT中Callback方法数据类型 |
| data | Number | 是 | 返回uex.cSuccess或者uex.cFailed,详见CONSTANT中Callbackint类型数据 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
	uexSocketMgr.cbCreateUDPSocket = function(opId,dataType,data){
	    if(data == 0){
	    	alert("创建UDP成功");
	    }else{
	    	alert("创建UDP失败");
	    }
	}
```

> ### cbCreateTCPSocket 创建TCP对象的回调方法

`uexSocketMgr.cbCreateTCPSocket(opId,dataType,data)`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | TCP对象的唯一标识符 |
| dataType | Number | 是 | 详见CONSTANT中Callback方法数据类型 |
| data | Number | 是 | 返回uex.cSuccess或者uex.cFailed,详见CONSTANT中Callbackint类型数据 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
	uexSocketMgr.cbCreateTCPSocket = function(opId,dataType,data){
	    if(data == 0){
	    	alert("创建TCP成功");
	    }else{
	    	alert("创建TCP失败");
	    }
	}
```
> ### cbSendData 发送数据的回调方法

`uexSocketMgr.cbSendData(opId,dataType,data)`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | UDP对象的唯一标识符 |
| dataType | Number | 是 | 详见CONSTANT中Callback方法数据类型 |
| data | Number | 是 | 返回uex.cSuccess或者uex.cFailed,详见CONSTANT中Callbackint类型数据 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
	uexSocketMgr.cbSendData = function(opId,dataType,data){
	    if(data == 0){
			alert("UDP发送成功");
	    }else{
			alert("UDP发送失败");
	    }
	}
```
> ### cbConnected 设置接收方的IP地址和端口的回调方法

`uexSocketMgr.cbConnected(opId,dataType,data)`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | UDP对象的唯一标识符 |
| dataType | Number | 是 | 详见CONSTANT中Callback方法数据类型 |
| data | Number | 是 | 返回uex.cSuccess或者uex.cFailed,详见CONSTANT中Callbackint类型数据 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
	uexSocketMgr.cbConnected = function(opId,dataType,data){
		if(data == 0){
			alert("opId:" + "设置对方的ip和端口成功");
		}else{
			alert("opId:" + "设置对方的ip和端口失败");
 		}
    }
```
## 2.3、监听方法
> ### onData 接收数据的监听方法

`uexSocketMgr.onData(opId,data)`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | UDP对象的唯一标识符 |
| data | String | 是 | 接收到的数据,json字符串,格式为: {"host":"192.168.1.188","port":"3000","data":"接收到的消息"} |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
	uexSocketMgr.onData = function(opId,dataType,data){
		alert("onData:" + data);
    }
```
> ### onDisconnected 连接断开的监听方法

`uexSocketMgr.onDisconnected(opId)`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | UDP对象的唯一标识符 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
	uexSocketMgr.onDisconnected = function(opId){
		alert("onDisconnected:" + opId);
    }
```

# 3、更新历史

### iOS

API版本:`uexSocketMgr-3.0.7`

最近更新时间:`2016-3-23`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.7 | 收发数据支持base64以及GBK编码 |
| 3.0.6 | 添加IDE支持 |
| 3.0.5 | 解决使用base64格式传输数据ios发送不成功的问题 |
| 3.0.4 | 调整onData方法的回调参数 |
| 3.0.3 | 修复问题 |
| 3.0.2 | 修复问题 |
| 3.0.1 | 修复问题 |
| 3.0.0 | Socket功能插件 |

### Android

API版本:`uexSocketMgr-3.0.4`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.4 | 添加设置编码格式的接口 |
| 3.0.3 | 修改直接点击发送DUP或发送TCP系统崩溃问题 |
| 3.0.2 | 修改onData回调方法的参数 |
| 3.0.1 | 修复内部检测网络状态的bug,添加组播地址的配置 |
| 3.0.0 | Socket功能插件 |
