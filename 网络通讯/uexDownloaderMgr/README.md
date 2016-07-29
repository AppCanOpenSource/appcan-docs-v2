[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
文件下载插件
## 1.1、说明
文件下载管理接口API,该对象主要封装了下载数据的接口,支持多个文件下载,断点续传下载,下载文件大小无限制。
 
## 1.2、UI展示
![](http://newdocx.appcan.cn/docximg/133313p2015r6s16g.png)

## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=169_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。  
有特殊版本要求的API会在文档中额外说明。

## 1.5、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用。  
在后续版本中新添加的接口会在文档中额外说明。

# 2、API概览
## 2.1、方法
> ### create 创建下载对象

`uexDownloaderMgr.create()`

**说明:**

创建一个下载对象.

**参数:**

无

**返回值:**

下载对象
创建失败时返回null

**示例:**

```
var downloader = uexDownloaderMgr.create();
if(!downloader){
	alert("下载失败!");
}
```

> ### setHeaders 设置请求头

`uexDownloaderMgr.setHeaders(downloader, json)`

**说明:**

设置请求头

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| downloader | Object | 是 | 由[create](# create 创建下载对象)接口创建的下载对象 |
| json | JSON字符串 | 是 | 请求头信息 |



**示例:**

```
var downloader = ...//由create接口创建的下载对象
var headJson = '{"Content-type":"application/json;charset=utf-8"}';
uexDownloaderMgr.setHeaders(downloader, headJson);
```

> ### download 下载文件

`uexDownloaderMgr.download(downloader,serverURL,savePath,mode,cb)`

**说明:**

开始下载文件

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| downloader | Object | 是 | 由[create](# create 创建下载对象)接口创建的下载对象 |
| serverURL | String | 是 | 服务器地址 |
| savePath | String | 是 | 本地保存地址 |
| mode | Number | 是 | 是否支持断点续传,0:不支持,1:支持|
| cb | Function | 是 | 下载进度回调,详见下|


**回调函数参数:**

```
var cb = function(fileSize,percent,status){}
```

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| fileSize | Number | 是 | 要下载的文件大小 |
| percent | Number | 是 | 下载进度百分比 取值为0~100 |
| status | Number | 是 | 下载状态 0-下载中 1-下载完成 2-下载发送错误 |



**示例:**

```
var downloader = ...//由create接口创建的下载对象

uexDownloaderMgr.download(downloader,
	 "http://wallpaper.pocketdigi.com/upload/1/bigImage/1284565196.jpg", 
	 "wgt://data/down/1284565196.jpg",
	 1, 
	 function(fileSize, percent, status){
              switch (status) {
                  case 0:
                  document.getElementById('percentage').innerHTML = "文件大小：" + fileSize + "字节<br>下载进度：" + percent;
                  return;
                  break;
                  case 1:
                  alert("下载完成");
                  break;
                  case 2:
                  alert("下载失败");
                  break;
});
```

> ### cancelDownload 取消下载

`uexDownloaderMgr.cancelDownload(serverURL,clearMode)`

**说明:**

取消指定下载地址的下载任务

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| serverURL | String | 是 | 服务器下载地址     |
| clearMode | String | 否 | 默认为0。0-只取消此次下载任务,不清除已经下载的临时文件。 1-取消此次下载任务并清除已经下载的临时文件 |

    

**示例:**

```
uexDownloaderMgr.cancelDownload("http://wallpaper.pocketdigi.com/upload/1/bigImage/1284565196.jpg");
```

> ### closeDownloader 关闭下载对象

`uexDownloaderMgr.closeDownloader(downloader)`

**说明:**

关闭下载对象

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| downloader | Object | 是 | 由[create](# create 创建下载对象)接口创建的下载对象 |



**示例:**

```
var downloader = ...//由create接口创建的下载对象

uexDownloaderMgr.closeDownloader(downloader);
```

> ### getInfo 获取下载对象的相关信息

`uexDownloaderMgr.getInfo(serverURL)`

**说明:**

获取下载对象的相关信息

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| serverURL | String | 是 | 服务器下载地址    |

**返回值**

返回值info是JSON Object类型,包含的字段如下

```
var info = {
	savePath:,//String, 文件存储路径
	fileSize:,//Number, 文件总大小
	currentSize:,//Number, 已下载大小
	lastTime://String, 文件最后修改时间
}
```

**示例:**

```
var info = uexDownloaderMgr.getInfo("http://wallpaper.pocketdigi.com/upload/1/bigImage/1284565196.jpg");
alert(JSON.stringify(info));
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
