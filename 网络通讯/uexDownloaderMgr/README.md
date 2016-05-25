[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
文件下载插件
## 1.1、说明
文件下载管理接口API,该对象主要封装了下载数据的接口,支持多个文件下载,断点续传下载,下载文件大小无限制。
 
## 1.2、UI展示
![](http://newdocx.appcan.cn/docximg/133313p2015r6s16g.png)

## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=169_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览
## 2.1、方法
> ### createDownloader     创建下载对象

`uexDownloaderMgr.createDownloader(id)`

**说明:**

创建下载对象,同一id只能被创建一次。此方法执行后会回调[cbCreateDownload](#cbCreateDownloader 创建下载对象是否成功的回调方法 "cbCreateDownload")方法。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 下载对象唯一标识符     |

**平台支持:**

Android2.2+                    
iOS7.0+    

**版本支持:**

3.0.0+

**示例:**

```
uexDownloaderMgr.createDownloader(1);
```

> ### setHeaders     设置请求头

`uexDownloaderMgr.setHeaders(1, json)`

**说明:**

设置请求头

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 上传对象的唯一标识符     |
| json | Json类型 | 是 | 请求头信息 |

**平台支持:**

Android2.2+  
iOS7.0+  

**版本支持:**

3.0.0+

**示例:**

```
var headJson = '{"Content-type":"application/json;charset=utf-8"}';
uexDownloaderMgr.setHeaders(1, headJson);
```

> ### download     下载文件

`uexDownloaderMgr.download(id,serverURL,savePath,mode)`

**说明:**

调用该接口时需确保创建过唯一标识符为id的下载对象。获取下载过程中的状态信息,可以采用监听方法[onStatus](#onStatus 下载状态改变的监听方法 "onStatus")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 用户自定义的下载对象唯一标识符 |
| serverURL | String | 是 | 服务器地址 |
| savePath | String | 是 | 本地保存地址 |
| mode | Number | 是 | 是否支持断点续传,0:不支持,1:支持|

**平台支持:**

Android2.2+                    
iOS7.0+    

**版本支持:**

3.0.0+

**示例:**

```
uexDownloaderMgr.download(1, "http://wallpaper.pocketdigi.com/upload/1/bigImage/1284565196.jpg", "wgt://data/down/1284565196.jpg",'1');
```

> ### cancelDownload     取消下载

`uexDownloaderMgr.cancelDownload(serverURL,clearMode)`

**说明:**

取消指定下载地址的下载任务

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| serverURL | String | 是 | 服务器下载地址     |
| clearMode | String | 否 | 默认为0。0-只取消此次下载任务,不清除已经下载的临时文件。 1-取消此次下载任务并清除已经下载的临时文件 |

    

**平台支持:**

Android2.2+                    
iOS7.0+    

**版本支持:**

3.0.0+

**示例:**

```
uexDownloaderMgr.cancelDownload("http://wallpaper.pocketdigi.com/upload/1/bigImage/1284565196.jpg");
```

> ### closeDownloader 关闭下载对象

`uexDownloaderMgr.closeDownloader(id)`

**说明:**

关闭下载对象

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 下载对象唯一标识符     |

    

**平台支持:**

Android2.2+                    
iOS7.0+    

**版本支持:**

3.0.0+

**示例:**

```
uexDownloaderMgr.closeDownloader(1);
```

> ### getInfo     获取下载对象的相关信息

`uexDownloaderMgr.getInfo(serverURL)`

**说明:**

获取下载对象的相关信息, 其回调函数是[cbGetInfo](#cbGetInfo 获取下载信息的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| serverURL | String | 是 | 服务器下载地址    |

**平台支持:**

Android2.2+  
iOS7.0+  

**版本支持:**

3.0.0+

**示例:**

```
uexDownloaderMgr.getInfo("http://wallpaper.pocketdigi.com/upload/1/bigImage/1284565196.jpg");
```

> ### createBackgroundTask 创建后台下载任务

`uexDownloaderMgr.createBackgroundTask(param)`

**说明:**

创建一个后台下载任务

* 后台任务是全局对象,不会受到网页关闭影响
* 当App退到后台时,后台任务可以继续进行下载,有着如下的特点
	* 在iOS端,后台下载无需后台权限,不受后台应用冻结机制的限制,但若用户从AppSwitcher结束应用进程,后台任务会停止
	* 在iOS端,后台任务仅当WIFI环境下,网络空闲时(即当前在前台的应用没有大量占用网络资源时),才会进行下载

**参数:**

param 是JSON字符串,各字段含义如下

```
var param = {
	identifier:,//String,必选,任务唯一标识符
	resumeFromCache:,//Boolean,可选,默认false,是否尝试从缓存恢复
}
```

**返回值:**

该方法在3.3+引擎上具有返回值returnValue,returnValue是一个JSON字符串

```
var returnValue = {
    result:,//Boolean,必须 是否创建成功;
    serverURL:,//String,可选,从缓存恢复成功时会有此值,缓存的服务器地址
    savePath:,//String,可选,从缓存恢复成功时会有此值,缓存的本地储存地址,
    headers:,//JSON Object,可选,从缓存恢复成功时会有此值,缓存的http请求头
    canResume:,//Boolean,可选,从缓存恢复成功时会有此值,缓存的是否支持断点续传
}
```

**平台支持:**

iOS7.0+  

**版本支持:**

iOS 3.3.14+

**示例:**

```
var uid = "MyBGTask1";
var param = {
	identifier:uid,
	resumeFromCache:true
};
var ret = uexDownloaderMgr.createBackgroundTask(JSON.stringify(param));
alert("create:" + ret);
```

> ### startBackgroundTask 开始后台下载任务

`uexDownloaderMgr.startBackgroundTask(param)`

**说明:**

开始一个后台下载任务

**参数:**

param 是JSON字符串,各字段含义如下

```
param = {
	identifier:,//String,必选,任务唯一标识符
	serverURL:,//String,可选,服务器地址
	savePath:,//String,可选,本地储存地址,
	headers:,//JSON Object,可选,http请求头
	canResume:,//Boolean,可选,默认false,是否支持断点续传
}
```

* 当identifier对应的后台下载任务是从缓存中恢复时,serverURL,savePath,headers,canResume 这4个参数均为可选参数,传参会更新此任务中的相应的配置
* 当identifier对应的后台下载任务不是从缓存中恢复时,serverURL,savePath为必选参数,headers为可选参数,默认为空,canResume为可选参数,默认为false;

**返回值:**

该方法在3.3+引擎上具有返回值returnValue,returnValue是一个Boolean
如果identifier对应的下载任务不存在,或者下载任务缺少必要的参数导致无法开始下载,会返回false,否则返回true

**平台支持:**

iOS7.0+  

**版本支持:**

iOS 3.3.14+

**示例:**

```
var dlPath = "http://download.appcan.cn/Demo/HiAppCan/hiappcan.ipa";
var uid = "MyBGTask1";
var savePath = "wgt://BGDownloadTest/test";
var headers = {
    key:"value"
};
var param = {
	identifier:uid,
	serverURL:dlPath,
	savePath:savePath,
	headers:headers
	canResume:true
}
var ret = uexDownloaderMgr.startBackgroundTask(JSON.stringify(param));
alert(ret);
```

> ### cancelBackgroundTask 取消后台下载任务

`uexDownloaderMgr.cancelBackgroundTask(param)`

**说明:**

取消一个后台下载任务

**参数:**

param 是JSON字符串,各字段含义如下

```
param = {
	identifier:,//String,必选,任务唯一标识符
	option:,//Number 可选,取消的设置(详见下方说明),默认为0
}
```

| option | 解释 |
| ----- | ----- |
| 1 | 清除断点下载数据,传此值时会清除断点下载的缓存数据 |

**返回值:**

该方法在3.3+引擎上具有返回值returnValue,returnValue是一个Boolean
如果identifier对应的下载任务不存在,会返回false,否则返回true

**平台支持:**

iOS7.0+  

**版本支持:**

iOS 3.3.14+

**示例:**

```
var uid = "MyBGTask1";
var param = {
	identifier:uid,
	option:0
}
var ret = uexDownloaderMgr.cancelBackgroundTask(JSON.stringify(param));
alert(ret);
```

> ### observeBackgroundTask 设置监听一个后台下载任务

`uexDownloaderMgr.observeBackgroundTask(param)`

**说明:**

设置当前网页监听一个后台下载任务

* **调用此接口的网页**会收到此后台下载任务发出的onBackgroundTaskStatusChange监听回调
* 一个后台任务只会被一个网页监听,当设置新的监听网页时,之前的设置会被覆盖

**参数:**

param 是JSON字符串,各字段含义如下

```
param = {
	identifier:,//String,必选,任务唯一标识符
}
```

**返回值:**

该方法在3.3+引擎上具有返回值returnValue,returnValue是一个Boolean
如果identifier对应的下载任务不存在,会返回false,否则返回true

**平台支持:**

iOS7.0+  

**版本支持:**

iOS 3.3.14+

**示例:**

```
var uid = "MyBGTask1";
var param = {
	identifier:uid,
}
var ret = uexDownloaderMgr.observeBackgroundTask(JSON.stringify(param));
alert(ret);
```

> ### getBackgroundTaskInfo 获取后台下载任务信息

`uexDownloaderMgr.getBackgroundTaskInfo(param)`

**说明:**

根据唯一标识符获取对应的后台下载任务的信息
* 此方法仅限3.3+引擎

**参数:**

param 是JSON字符串,各字段含义如下

```
param = {
	identifier:,//String,必选,任务唯一标识符
}
```

**返回值:**

该方法在3.3+引擎上具有返回值returnValue,returnValue是一个JSON字符串

```
var returnValue = {
	identifier:,//String,必选.唯一标识符
	serverURL:,//String,必选.下载地址
	savePath:,//String,必选.储存地址
	status:,//Number,必选.0-任务下载中 1-任务下载完成 2-任务下载失败 3-任务被挂起
	fileSize:,//Number,必选.文件大小,单位Byte
	percent:,//Number,必选.下载进度 0~100
}
```

returnValue可能会包含一些额外的信息,这些信息均可以忽略。

**平台支持:**

iOS7.0+  

**版本支持:**

iOS 3.3.14+

**示例:**

```
var uid = "MyBGTask1";
var param = {
	identifier:uid
}
var info = uexDownloaderMgr.getBackgroundTaskInfo(JSON.stringify(param));
alert(info);
```

> ### clearCache 清除下载信息记录

`uexDownloaderMgr.clearCache(param)`

**说明:**

清除下载信息记录
	* 如果有断点续传的缓存数据,这些数据也会被一并清除

**参数:**

param 是JSON字符串,各字段含义如下

```
param = {
	downloaderServerURLs:,//Array,可选,Array是下载对象的服务器地址serverURL的字符串构成的数组
	bachgroundTaskIdentifiers:,//Array,可选,Array是由后台下载任务的唯一标识符identifier构成的数组
}
```

* downloaderServerURLs会清除由createDownloader生成的下载对象记录
	* 此参数不传时,不做任何操作
	* 当前正在进行的downloader不会受此接口影响
	* 传空数组[]时,会清除所有下载对象记录
	* 传非空数组时,对数组中的每一个serverURL,会清除所有服务器地址为此URL的下载对象记录
* bachgroundTaskIdentifiers会清除由createBackgroundTask生成的后台下载任务记录
	* 此参数不传时,不做任何操作
	* 当前正在进行的后台下载任务不会受此接口影响
	* 传空数组[]时,会清除所有后台下载任务记录
	* 传非空数组时,会清除数组中的每一个identifier对应的后台下载任务的记录

**返回值:**

无

**平台支持:**

iOS7.0+  

**版本支持:**

iOS 3.3.14+

**示例:**

```
//清除所有下载记录
var param = {
	downloaderServerURLs:[],
	bachgroundTaskIdentifiers:[]
};
uexDownloaderMgr.clearCache(JSON.stringify(param));
```

## 2.2、回调方法

> ### cbCreateDownloader 创建下载对象是否成功的回调方法

`uexDownloaderMgr.cbCreateDownloader(opId,dataTpye,data)`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number| 是 | 下载对象的唯一标识符 |
| dataType|Number | 是 | 参数类型详见[CONTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975 "CONTANT")中Callback方法dataType数据类型 |
| data|Number | 是 | 回调的int型的数据,0-成功,1-失败 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexDownloaderMgr.cbCreateDownloader = function(opCode,dataType,data){
    switch(dataType){
    case cText:
        alert("uex.cText");
        break;
    case cJson:
        alert("uex.cJson");
        break;
    case cInt:
        if(data == 0){
            alert("创建成功");
        }else{
            alert("创建失败");
        }
        break;
    default:
        alert("error");
}
```

> ### cbGetInfo 获取下载信息的回调方法

`uexDownloaderMgr.cbGetInfo(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number| 是 | 下载对象的唯一标识符 |
| dataType|Number | 是 | 参数类型详见[CONTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975 "CONTANT")中Callback方法dataType数据类型 |
| data| String | 是 | json格式数据 |

**平台支持:**

Android2.2+
iOS6.0+

** 版本支持:**
3.0.0+

**示例:**

```
uexDownloaderMgr.cbGetInfo = function(opCode,dataType,data){
    switch(dataType){
    case cText:
        alert("uex.cText");
        break;
    case cJson:
        if(data == null || data.length == 0){
            alert("无数据");
            return;
        }
        alert(data);
        var info = eval('('+data+')');
        document.getElementById('fileInfo').innerHTML ="文件路径:"+info.savePath+"<br>文件大小:"+info.fileSize+"<br>已下载:"+info.currentSize+"<br>下载时间:"+info.lastTime;
        break;
    case cInt:
        alert("uex.cInt");
        break;
    default:
        alert("error");
    }
}
```

## 2.3、监听方法

> ### onStatus 下载对象下载状态改变的监听方法

`uexDownloaderMgr.onStatus(opId,fileSize,percent,status)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number| 是 | 下载对象的唯一标识符id |
| fileSize|Number | 是 | 文件大小 |
| percent|Number | 是 | 下载文件的百分比|
| status|Number | 是 | 下载的状态,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#DownLoad "CONSTANT")中DownloadStatus|

**平台支持:**

Android2.2+    
iOS7.0+  

**版本支持:**

3.0.0+    

**示例:**

```
uexDownloaderMgr.onStatus = function(opCode,fileSize,percent,status){
    switch (status) {
        case 0:
            document.getElementById('percentage').innerHTML ="文件大小:"+fileSize+"字节<br>下载进度:"+percent;
            break;
        case 1:
            alert("下载完成");
            uexDownloaderMgr.closeDownloader(opCode);
            break;
        case 2:
            alert("下载失败");
            uexDownloaderMgr.closeDownloader(opCode);
            break;
        case 3:
            alert("已取消下载");
            break;
    }
}
```

> ### onBackgroundTaskStatusChange 后台下载任务的状态改变的监听方法

`uexDownloaderMgr.onBackgroundTaskStatusChange(param)`

**参数:**

param 是JSON字符串,各字段含义如下

```
param = {
	identifier:,//String,必选.唯一标识符
	serverURL:,//String,必选.下载地址
	status:,//Number,必选.0-任务下载中 1-任务下载完成 2-任务下载失败 3-任务被挂起
	fileSize:,//Number,必选.文件大小,单位Byte
	percent:,//Number,必选.下载进度 0~100
}
```

**平台支持:**

iOS7.0+  

**版本支持:**

3.3.14+    

**示例:**

```
//假设网页中有id为status的div用于展示下载进度

uexDownloaderMgr.onBackgroundTaskStatusChange = function(json){
	var info = JSON.parse(json);
	document.getElementById('status').innerHTML ="status:" + info.status + "<br>文件大小:" + info.fileSize + "字节<br>下载进度:" + info.percent + "%";
}
```

# 3、更新历史

### iOS

API版本:`uexDownloaderMgr-3.3.15`

最近更新时间:`2016-5-10`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.3.15 | 用AFNetworking重构;添加后台下载的相关接口 |
| 3.0.14 | 修复在复用窗口中使用时回调丢失的bug |
| 3.0.13 | 添加IDE支持 |
| 3.0.12 | 修改了下载时进度条不动的BUG |
| 3.0.11 | 修改请求的变量 |
| 3.0.10 | 修改clean方法 |
| 3.0.9 | 验证的请求头的中的appid与key不匹配 |
| 3.0.8 | 判断当前的验证的请求头的属于的应用 |
| 3.0.7 | xcode7修正 |
| 3.0.6 | 兼容打包脚本 |
| 3.0.5 | 修改了请求头的验证 |
| 3.0.4 | 支持https,导入证书。 |
| 3.0.3 | 支持https |
| 3.0.2 | 为和文档保持统一增加uexDownloader Mgr.cancelDownload接口 |
| 3.0.1 | 新增setHeaders接口 |
| 3.0.0 | 下载管理功能插件 |

### Android

API版本:`uexDownloaderMgr-3.0.14`

最近更新时间:`2016-3-2`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.14 | 修复下载过程中下载进度过快导致应用异常的问题。 |
| 3.0.13 | 修复有些url被encode不能下载的问题 |
| 3.0.12 | 修复下载过程中崩溃的问题(由于与其他插件使用的数据库同名造成的)。 |
| 3.0.11 | 修复调用cancelDownload之后,即使不清除已下载的临时文件,下次下载时不能断点续传的问题 |
| 3.0.10 | 增加新的 header以及plugin里面的子应用的appId和appkey都按照主应用为准 |
| 3.0.9 | 增加appVerify校验头 |
| 3.0.8 | https下载时可以支持预置证书；增大下载缓冲区；支持中文url;增强稳定性 |
| 3.0.7 | 修复不支持HTTPS问题 |
| 3.0.6 | 新增setHeaders接口 |
| 3.0.5 | 引擎更新后,修复取消下载提示不准确的问题 |
| 3.0.4 | 修复下载速度慢的问题,修复取消下载提示不准确问题 |
| 3.0.3 | 新增接口cancelDownload |
| 3.0.2 | 修复下载速度的问题 |
| 3.0.1 | 修复下载完成之后,无法打开,文件不存在的问题 |
| 3.0.0 | 下载管理功能插件 |
