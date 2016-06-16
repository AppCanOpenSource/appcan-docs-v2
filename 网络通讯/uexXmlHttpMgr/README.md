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
> ### open 创建一个请求对象

`uexXmlHttpMgr.open(id, method, url, timeout)`

**说明:**

创建一个请求对象,同一id只能被创建一次。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
|  id | Number | 是 | 请求对象的唯一标识符 |
| method | String | 是 |  请求方式,get或post |
| url | String | 是 |  请求地址 |
| timeout | String | 是 | 请求的超时时间,单位为毫秒,超时时间是1000的整数倍。 不能设置小于1000,默认30\*1000毫秒。为空或等于0时,取默认值 |

**返回值:**

此方法拥有一个Boolean类型的返回值,代表是否创建成功


**示例:**

```
var url =  "http://www.kedo.gov.cn/mobile/index/GetIndexInfo.jsp?jsoncallback=?&type=1";
var ret = uexXmlHttpMgr.open(1, "get", url, "");
alert(ret);
```

> ### send 发送请求

`uexXmlHttpMgr.send(id, flag,onResult,onProgress)`

**说明:**

发送请求

**参数:**

| 参数名称 | 参数类型  | 是否必选 |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 请求对象的唯一标识符 |
| flag | Number | 是 | 本次请求的flag。取值范围:1、2、3。(仅Android支持)  当flag传入1时,表示通知底层,将本次请求的header、状态码、结果等输出log到日志文件。  当flag传入2时,表示通知底层,如果本次请求发生了异常,就将本次请求的异常输出log到日志文件。 当flag传入3时,表示通知底层,0x1和0x2的操作均需要。|
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
```


**onProgress的回调参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| progress | Number | 是 | 上传进度百分比,取值范围为0~100|


**示例:**

  

```
uexXmlHttpMgr.send(2,0,function(state,resStr,resCode,resInfo){
                   alert("state:" + state  + "\nresult:" + resStr + "\nresCode:" + resCode + "\nresInfo:" + JSON.stringify(resInfo));
                   },function(progress){
                    document.getElementById('progress').innerHTML =  "上传进度:" + progress;
                   });
```

> ### close 关闭一个请求对象

`uexXmlHttpMgr.close(id)`

**说明:**

根据唯一标识符关闭请求对象。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 请求对象的唯一标识符 |

**返回值:**

此方法拥有一个Boolean类型的返回值,代表是否关闭

**示例:**

```
var ret = uexXmlHttpMgr.close(1);
alert(ret);
```

> ### setPostData 设置post请求数据

`uexXmlHttpMgr.setPostData(id, dataType, key, value)`

**说明:**

设置post请求,可以发送一次或多次。(仅post方式支持)

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 请求对象的唯一标识符 |
| dataType | Number | 是 |  请求中要发送的数据格式. 0-文本 1-文件 |
| key | String | 是 | 请求数据中的对应的键 |
| value | String | 是 | dataType为0时,value为要发送的文本数据,dataType为1时,value为要发送的文件的路径,路径支持res:// ,wgt://  ,wgts:// ,file:// 协议|


**返回值:**

此方法拥有一个Boolean类型的返回值,代表是否设置成功

**示例:**

```
uexXmlHttpMgr.setPostData(2,0, "field1", "Hello");
uexXmlHttpMgr.setPostData(2,1, "field2", "res://image.jpg");
```

> ### setInputStream 根据本地文件设置请求体

`uexXmlHttpMgr.setInputStream(id, filePath)`

**说明:**

仅POST方式支持
将指定请求的POST body设置为指定文件的二进制流


**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 |  请求对象的唯一标识符 |
| filePath | String | 是 | 文件路径,支持res:// ,wgt://  ,wgts:// ,file:// 协议 |

**返回值:**
此方法拥有一个Boolean类型的返回值,代表是否设置成功

**示例:**

```
var file = "res://12.jpg";
var ret = uexXmlHttpMgr.setInputStream(2, file);
alert(ret);
```

> ### setBody 设置post请求发送的数据体

`uexXmlHttpMgr.setBody(id, data)`

**说明:**

仅POST方式支持
将指定请求的POST body设置为传入的文本数据

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 |  请求对象的唯一标识符 |
| data | String | 是 | 请求中要发送的数据体 |



**示例:**

```
var ret = uexXmlHttpMgr.setBody(2, "body content");
alert(ret);
```

> ### setAppVerify 设置是否在请求头中加入appVerify字段

`uexXmlHttpMgr.setAppVerify(id,isVerify)`

**说明:**

设置是否在请求头中加入appVerify字段,字段格式如下`appVerify:md5=appid:appKey:ts；ts=`本次请求的时间戳,这些是插件内部处理。

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 |  请求对象的唯一标识符 |
| isVerify | String | 是 | 0:不在请求头中增加appVerify字段,对本次请求不做任何处理 1:在请求头中增加appVerify字段,get、post都会增加 |

**返回值:**

此方法拥有一个Boolean类型的返回值,代表是否设置成功

**示例:**

```
var ret = uexXmlHttpMgr.setAppVerify(1, "1");
alert(ret);
```

> ### setHeaders 设置请求头

`uexXmlHttpMgr.setHeaders(id, json)`

**说明:**

设置请求头

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 |  请求对象的唯一标识符 |
| json | String | 是 | 要设置的请求头, json数据格式。|

**返回值:**

此方法拥有一个Boolean类型的返回值,代表是否设置成功

**示例:**

```
var header = {
	Content-type:"application/json;charset=utf-8",
	testHeaderField:"testHeaderValue"
}
var ret = uexXmlHttpMgr.setHeaders(1, JSON.stringify(header));
alert(ret);
```

> ### setCertificate 设置本次请求使用的数字证书

`uexXmlHttpMgr.setCertificate(id, psw, path)`

**说明:**

设置本次异步请求使用的数字证书

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 |  请求对象的唯一标识符 |
| psw | String | 是 | 数字证书密码。当使用appcan默认证书时,此参数应为null或者""|
| path | String | 是 | 证书路径,支持 file://,res://,wgt://等协议路径, 当传入'default'时,本次请求将取appcan默认数字证书。|

**返回值:**

此方法拥有一个Boolean类型的返回值,代表是否设置成功

**示例:**

```
var ret = uexXmlHttpMgr.setCertificate(1, "" , "default");
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

## 2.2、监听方法
> ### onData 请求发送完成的监听方法

`uexXmlHttpMgr.onData(id,status,result,requestCode,response)`

**参数:**

 


**平台支持:**

Android2.2+
iOS6.0+

** 版本支持:**
3.0.0+

** 示例:**
```
window.uexOnload = function(){
    uexXmlHttpMgr.onData = httpSuccess;
}

function httpSuccess(opid,state,result,requestCode,response){
    uexXmlHttpMgr.close(opid);
    alert("OPID:"+opid+"\nSTATE:"+state+"\nRESULT:"+result+"\nREQUESTCODE:"+requestCode+"\nRESPONSE:"+response);
}
```

> ### onPostProgress Post请求的监听方法

`uexXmlHttpMgr.onPostProgress(id, progress)`

**说明:**

发送Post请求,发送进度改变的监听方法

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number| 是 |  请求对象的唯一标识符 |
| progress | Number | 是 | 当有文件通过POST方式上传时, 该值表示上传进度 |

**平台支持:**

Android2.2+
iOS6.0+

** 版本支持:**
3.0.0+

** 示例:**

```
uexXmlHttpMgr.onPostProgress = function (inOpCode,inProgress){
    if(inOpCode == 2){
        document.getElementById('adre2').innerHTML =  "opCode:" + inOpCode + "; 上传进度:" + inProgress;
    }
}
```

> ### cbGetCookie 回调指定url的cookie信息

`uexXmlHttpMgr.cbGetCookie(opId,dataTpye,data)`

**说明:**

回调指定url的cookie信息

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number| 是 | 下载对象的唯一标识符 |
| dataType|Number | 是 | 参数类型详见[CONTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975 "CONTANT")中Callback方法dataType数据类型 |
| data|String | 是 | 包含具体的cookie信息Json字符串，其中key为cookie的对应value就是cookie信息 |

**平台支持:**

Android2.2+
iOS6.0+

** 版本支持:**

Android: 3.0.13+
iOS: 3.0.6+

** 示例:**

```
uexXmlHttpMgr.cbGetCookie = function(opCode,dataType,data){
    switch(dataType){
    case cText:
        alert("uex.cText");
        break;
    case cJson:
        alert("cookie信息是：" + data);
        break;
    case cInt:
        alert("uex.cInt");
        break;
    default:
        alert("error");
}
```
# 3、更新历史

### iOS

API版本:`uexXmlHttpMgr-3.0.15`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.15 | 添加IDE支持 |
| 3.0.14 | 删除info.plist |
| 3.0.13 | 添加国际化支持 |
| 3.0.12 | setAppVerify新增加appId的信息 |
| 3.0.11 | plugin目录下的子widget使用主widget的id和key做校验 |
| 3.0.10 | 修改获取appkey的方法 |
| 3.0.9 | 时间戳改为毫秒 |
| 3.0.8 | 新增clearCookie接口 |
| 3.0.7 | onData添加第五个参数是服务器response的数据,方 便调试 |
| 3.0.6 | 新增getCookie接口 |
| 3.0.5 | uexXmlHttpMgr.open第四个参数timeOut为空或 为0时默认请求超时时间为30\*1000 |
| 3.0.4 | 使用新版Xcode重新编译,支持arm64 |
| 3.0.3 | uexXmlHttpMgr修改PUT请求DELETE请求 |
| 3.0.2 | 修改上药项目的bug,去掉对https的判断 |
| 3.0.1 | 去掉对url特殊处理的代码 |
| 3.0.0 | 跨域异步请求功能插件 |

### Android

API版本:`uexXmlHttpMgr-3.0.22`

最近更新时间:`2016-3-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.22 | 支持后台运行插件。 |
| 3.0.21 | 修改请求对象唯一标识符按String类型处理。 |
| 3.0.20 | 增加新的 header以及plugin里面的子应用的appId和appkey都按照主应用为准 |
| 3.0.19 | 增加clearCookie接口,用于删除cookie信息 |
| 3.0.18 | 修复Https无证书时OutOfMemoryError问题 |
| 3.0.17 | 修复子应用默认证书密码解密错误的问题 |
| 3.0.16 | 修复证书路径解析错误问题 |
| 3.0.15 | onData回调函数参数修改 |
| 3.0.14 | 处理网络超时,并回调给网页端 |
| 3.0.13 | 添加getCookie接口 |
| 3.0.12 | 修复网络出错时的Status code |
| 3.0.11 | 修复退出应用时ANR问题 |
| 3.0.10 | 修改onData回调方法中result参数的返回值信息 |
| 3.0.9 | 修改timeOut为空或者为0的时候的默认 请求超时时间为30\*1000 |
| 3.0.8 | 修复请求设置证书不成功的问题 |
| 3.0.7 | 修改onData回调方法参数requestCode为必选参数 |
| 3.0.6 | 修复请求不到数据的问题 |
| 3.0.5 | 新增put请求和delete请求 |
| 3.0.4 | 修复没有调用setAppVerify方法而导致的空指针问题 |
| 3.0.3 | 修复变量未定义的问题 |
| 3.0.2 | 修复不能在请求头中加入appVerify字段的问题 |
| 3.0.1 | 修复增加了对重定向url的处理 |
| 3.0.0 | 跨域异步请求功能插件 |
