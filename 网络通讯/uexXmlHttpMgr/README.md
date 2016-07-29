[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
 跨域异步请求插件
## 1.1、说明
本插件一般与官方提供的JSSDK关联使用,即对appcan私有的异步请求进行封装的[网络请求 Request接口](http://newdocx.appcan.cn/newdocx/docx?type=1263_1254 "网络请求 Request接口")
官方默认提供的是最新插件,同时提供的最新的jssdk文件是兼容最新版本插件,如有问题可优先排查此处。
## 1.2、UI展示
![](http://newdocx.appcan.cn/docximg/134211l2015p6p16w.png)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=197_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)


## 1.4、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。  
有特殊版本要求的API会在文档中额外说明。

## 1.5、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用。  
在后续版本中新添加的接口会在文档中额外说明。


# 2、API概览

## 2.1、方法

> ### create 创建请求对象

`uexXmlHttpMgr.create(param)`

**说明:**

创建一个请求对象

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
|  param | Object | 是 | 请求的相关设置，相关字段见下 |

```
var param = {
	method:,//String,必选.请求的方法,请传"POST"或者"GET"
	url:,//String,必选.请求的URL
	timeout:,//Number,可选.请求超时时间,单位毫秒,默认为30000
}

```

**返回值: **

返回XmlHttp请求对象
如果创建失败,返回null

**示例:**

```
var req = uexXmlHttpMgr.create({
	method:"GET",
	url:"http://192.168.1.4:45678/get?key1=value1&key2=value2&arr[]=aaa&arr[]=bbb&arr[]=ccc",
	timeout:15000,
});
if(!req){
	alert("创建请求失败！");
}
```



> ### send 发送请求

`uexXmlHttpMgr.send(req, flag,onResult,onProgress)`

**说明:**

发送请求

**参数:**

| 参数名称 | 参数类型  | 是否必选 |  说明 |
| ----- | ----- | ----- | ----- |
| req | Request | 是 | 由`create`接口创建的请求对象,见[create](# create 创建请求对象) |
| flag | Number | 是 | 本次请求的flag。取值范围:0、1、2、3。(仅Android支持)  当flag传入1时,表示通知底层,将本次请求的header、状态码、结果等输出log到日志文件。  当flag传入2时,表示通知底层,如果本次请求发生了异常,就将本次请求的异常输出log到日志文件。 当flag传入3时,表示通知底层,0x1和0x2的操作均需要。|
| onResult | Function | 是 | 请求状态有变化时,将调用此回调函数 | 
| onProgress | Function | 否 | 当发送Post请求进行文件上传时,会通过此函数来回调上传进度 |



**onResult的回调参数**:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| status | Number | 是 | 当前请求状态  -1:请求失败 0:请求进行中 1:请求成功|
| resStr | String | 是 | 服务器返回的文本数据 |
| resCode | Number | 是 | http请求返回的状态码 |
| resInfo | Object | 否 | 服务器返回的信息,详细结构见下|

```
var resInfo = {
	responseHeaders:,//Object类型,必选,response请求头信息
	responseStatusCode:,//Number类型,必选,response状态码
	responseStatusMessage:,//String类型,必选,response状态码的含义
	responseError:,//String类型,可选,若请求失败,此项为失败的原因
}
```


**onProgress的回调参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| progress | Number | 是 | 上传进度百分比,取值范围为0~100|


**示例:**

  

```
var req = ...;//之前通过create接口创建的Request对象

uexXmlHttpMgr.send(req,0,
					function(state,resStr,resCode,resInfo){
                   		alert("state:" + state  + "\nresult:" + resStr + "\nresCode:" + resCode + "\nresInfo:" + JSON.stringify(resInfo));
                   },
                   function(progress){
                    	document.getElementById('progress').innerHTML =  "上传进度:" + progress;
                   });
```

> ### close 关闭一个请求对象

`uexXmlHttpMgr.close(req)`

**说明:**

关闭请求对象。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| req | Request | 是 | 由`create`接口创建的请求对象,见[create](# create 创建请求对象) |

**返回值:**

此方法拥有一个Boolean类型的返回值,代表是否关闭

**示例:**

```
var req = ...;//之前通过create接口创建的Request对象
var ret = uexXmlHttpMgr.close(req);
alert(ret);
```

> ### setPostData 设置post请求数据

`uexXmlHttpMgr.setPostData(req, dataType, key, value)`

**说明:**

设置POST请求内容,可以进行多次操作。(仅POST方式支持)

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| req | Request | 是 | 由`create`接口创建的请求对象,见[create](# create 创建请求对象) |
| dataType | Number | 是 |  请求中要发送的数据格式. 0-文本 1-文件 |
| key | String | 是 | 请求数据中的对应的键 |
| value | String | 是 | dataType为0时,value为要发送的文本数据,dataType为1时,value为要发送的文件的路径,路径支持res:// ,wgt://  ,wgts:// ,file:// 协议|


**返回值:**

此方法拥有一个Boolean类型的返回值,代表是否设置成功

**示例:**

```
var req = ...;//之前通过create接口创建的Request对象
uexXmlHttpMgr.setPostData(req,0, "field1", "Hello");
uexXmlHttpMgr.setPostData(req,1, "field2", "res://image.jpg");
```

> ### setInputStream 根据本地文件设置请求体

`uexXmlHttpMgr.setInputStream(req, filePath)`

**说明:**

仅POST方式支持
将指定请求的POST body设置为指定文件的二进制流
此操作会覆盖其他设置POST请求内容的操作

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| req | Request | 是 | 由`create`接口创建的请求对象,见[create](# create 创建请求对象) |
| filePath | String | 是 | 文件路径,支持res:// ,wgt://  ,wgts:// ,file:// 协议 |

**返回值:**
此方法拥有一个Boolean类型的返回值,代表是否设置成功

**示例:**

```
var req = ...;//之前通过create接口创建的Request对象
var file = "res://12.jpg";
var ret = uexXmlHttpMgr.setInputStream(req, file);
alert(ret);
```

> ### setBody 设置post请求发送的数据体

`uexXmlHttpMgr.setBody(req, data)`

**说明:**

仅POST方式支持
将指定请求的POST body设置为传入的文本数据

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| req | Request | 是 | 由`create`接口创建的请求对象,见[create](# create 创建请求对象) |
| data | String | 是 | 请求中要发送的数据体 |



**示例:**

```
var req = ...;//之前通过create接口创建的Request对象
var ret = uexXmlHttpMgr.setBody(req, "body content");
alert(ret);
```

> ### setAppVerify 设置是否在请求头中加入appVerify字段

`uexXmlHttpMgr.setAppVerify(req,isVerify)`

**说明:**

设置是否在请求头中加入appVerify字段,字段格式如下`appVerify:md5=appid:appKey:ts；ts=`本次请求的时间戳,这些是插件内部处理。

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| req | Request | 是 | 由`create`接口创建的请求对象,见[create](# create 创建请求对象) |
| isVerify | String | 是 | 0:不在请求头中增加appVerify字段,对本次请求不做任何处理 1:在请求头中增加appVerify字段,get、post都会增加 |

**返回值:**

此方法拥有一个Boolean类型的返回值,代表是否设置成功

**示例:**

```
var req = ...;//之前通过create接口创建的Request对象
var ret = uexXmlHttpMgr.setAppVerify(req, "1");
alert(ret);
```

> ### setHeaders 设置请求头

`uexXmlHttpMgr.setHeaders(req, json)`

**说明:**

设置请求头

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| req | Request | 是 | 由`create`接口创建的请求对象,见[create](# create 创建请求对象) |
| json | String | 是 | 要设置的请求头, json数据格式。|

**返回值:**

此方法拥有一个Boolean类型的返回值,代表是否设置成功

**示例:**

```
var req = ...;//之前通过create接口创建的Request对象
var header = {
	Content-type:"application/json;charset=utf-8",
	testHeaderField:"testHeaderValue"
}
var ret = uexXmlHttpMgr.setHeaders(req, JSON.stringify(header));
alert(ret);
```

> ### setCertificate 设置本次请求使用的数字证书

`uexXmlHttpMgr.setCertificate(req, passsword, path)`

**说明:**

设置本次异步请求使用的数字证书

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| req | Request | 是 | 由`create`接口创建的请求对象,见[create](# create 创建请求对象) |
| password | String | 是 | 数字证书密码。当使用appcan默认证书时,此参数应为null或者""|
| path | String | 是 | 证书路径,支持 file://,res://,wgt://等协议路径, 当传入'default'时,本次请求将取appcan默认数字证书。|

**返回值:**

此方法拥有一个Boolean类型的返回值,代表是否设置成功

**示例:**

```
var req = ...;//之前通过create接口创建的Request对象
var ret = uexXmlHttpMgr.setCertificate(req, "" , "default");
alert(ret);
```

> ### getCookie 获取指定url的cookie信息

`uexXmlHttpMgr.getCookie(url)`

**说明:**

获取指定url的cookie信息

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| url | String | 是 | 想要获取的cookie所属对应的url |

**返回值:**

该方法拥有一个String类型的返回值,包含了该URL的所有cookie信息

**示例:**

```
var ret = uexXmlHttpMgr.getCookie("http://www.baidu.com/");
alert(ret);
```

> ### clearCookie 清空cookie信息

`uexXmlHttpMgr.clearCookie()`

**说明:**

清空cookie信息

**参数:**

无

**示例:**

```
uexXmlHttpMgr.clearCookie()
```


# 3、更新历史

### iOS

API版本:`uexXmlHttpMgr-4.0.0`

最近更新时间:`2016-7-29`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 跨域异步请求功能插件 |

### Android

API版本:`uexXmlHttpMgr-4.0.0`

最近更新时间:`2016-7-29`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 跨域异步请求功能插件 |
