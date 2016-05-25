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

# 2、API概览

## 2.1、方法
> ### open 创建一个请求对象

`uexXmlHttpMgr.open(id, method, url, timeOut)`

**说明:**

创建一个请求对象,同一id只能被创建一次。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
|  id | Number | 是 | 请求对象的唯一标识符 |
| method | String | 是 |  请求方式,get或post |
| url | String | 是 |  请求地址 |
| timeOut | String | 是 | 请求的超时时间,单位为毫秒,超时时间是1000的整数倍。 不能设置小于1000,默认30\*1000毫秒。为空或等于0时,取默认值 |

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
var url =  "http://www.kedo.gov.cn/mobile/index/GetIndexInfo.jsp?jsoncallback=?&type=1";
uexXmlHttpMgr.open(1, "get", url, "");
```

> ### send 发送请求

`uexXmlHttpMgr.send(id, flag)`

**说明:**

发送请求,请求执行的状态可以通过监听方法[onData](#onData 请求发送完成的监听方法 "onData") 和 [onPostProgress](#onPostProgress Post请求的监听方法 "onPostProgress") 获取到。

**参数:**

| 参数名称 | 参数类型  | 是否必选 |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 请求对象的唯一标识符 |
| flag | Number | 否 | 本次请求的flag。取值范围:1、2、3。(仅Android支持)  当flag传入1时,表示通知底层,将本次请求的header、状态码、结果等输出log到日志文件。  当flag传入2时,表示通知底层,如果本次请求发生了异常,就将本次请求的异常输出log到日志文件。 当flag传入3时,表示通知底层,0x1和0x2的操作均需要。|

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

  

```
uexXmlHttpMgr.send(1);
```

> ### close 关闭一个请求对象

`uexXmlHttpMgr.close(id)`

**说明:**

根据唯一标识符关闭请求对象。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 请求对象的唯一标识符 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

** 示例:**

```
uexXmlHttpMgr.close(1);
```

> ### setPostData 设置post请求数据

`uexXmlHttpMgr.setPostData(id, dataType, key, value)`

**说明:**

设置post请求,可以发送一次或多次。(仅post方式支持)

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 请求对象的唯一标识符 |
| dataType | Number | 是 |  请求中要发送的数据格式, 详见[CONTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#XmlHttpRequest "CONTANT")中XmlHtttextareaquestDataType |
| key | String | 是 | 请求数据中的对应的键 |
| value | String | 是 | 请求数据中的对应的值 |

**平台支持:**

Android2.2+
iOS6.0+

** 版本支持:**
3.0.0+

**  示例:**

```
uexXmlHttpMgr.setPostData(2, "0", "field1", "Hello");
```

> ### setInputStream 设置一个本地文件地址

`uexXmlHttpMgr.setInputStream(id, filePath)`

**说明:**

设置一个本地文件地址,uexXmlHttpMgr对象向服务器发起POST请求时,直接将此文件二进制流提交至服务器,中间不带任何文件分割符、Mimeype等form表单中的元素。(仅post方式请求支持)

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 |  请求对象的唯一标识符 |
| filePath | String | 是 | 文件路径,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path%20Types "CONSTANT")中PathTypes |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
var file = "/storage/emulated/0/widgetone/tmp/12.jpg";
uexXmlHttpMgr.setInputStream(2, file);
```

> ### setBody 设置post请求发送的数据体

`uexXmlHttpMgr.setBody(id, data)`

**说明:**

设置post请求发送的数据体。(仅post方式请求支持)

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 |  请求对象的唯一标识符 |
| data | String | 是 | 请求中要发送的数据体 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexXmlHttpMgr.setBody(2, "body content");
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

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexXmlHttpMgr.setAppVerify(1, "1");
```

> ### setHeaders 设置请求头

`uexXmlHttpMgr.setHeaders(id, json)`

**说明:**

设置请求头

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 |  请求对象的唯一标识符 |
| json | String | 是 | 发送请求之前设置http的协议头, json数据格式。|

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
var headJson = '{"Content-type":"application/json;charset=utf-8"}';
uexXmlHttpMgr.setHeaders(1, headJson);
```

> ### setCertificate 设置本次请求使用的数字证书

`uexXmlHttpMgr.setCertificate(id, psw, path)`

**说明:**

设置本次异步请求使用的数字证书

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 |  请求对象的唯一标识符 |
| psw | String | 是 | 数字证书密码。当使用appcan默认证书时,此参数为空(或"")|
| path | String | 是 | 证书路径,支持 file://,res://,wgt://等协议路径,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path%20Types "CONSTANT")中PathTypes。 当传入'default'时,本次请求将取appcan默认数字证书。|

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexXmlHttpMgr.setCertificate(1, "" , "default");
```

## 2.2、监听方法
> ### onData 请求发送完成的监听方法

`uexXmlHttpMgr.onData(id,status,result,requestCode,response)`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number| 是 |  请求对象的唯一标识符 |
| status | Number | 是 | 返回的状态详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#XmlHttpRequest "CONSTANT")中XmlHtttextareaquestStatus |
| result | Number | 是 | 服务器返回的任意数据,包含错误 |
| requestCode | Number | 否 | http请求返回的状态码 |
| response | String | 否 | 服务器返回的信息,该字符串为JSON格式,如下:          {"responseHeaders":"","responseStatusCode":"", "responseStatusMessage":"","responseError":""} |
关于response json字符串的说明

| 参数名称 | 参数类型 | 说明 |
|-----|-----|-----|
| responseHeaders | String | 请求头 |
| responseStatusCode | String | 状态码 |
| responseStatusMessage | String | 状态码的信息 |
| responseError | String | 错误信息 |

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
