/*
Sort: 2
Toc: 1
Tips: 文件下载
keywords: appcan开发文档,插件API,网络通讯,uexDownloaderMgr 
description: uexDownloaderMgr即文件下载插件，文件下载管理接口API,该对象主要封装了下载数据的接口,支持多个文件下载,断点续传下载,下载文件大小无限制.更多appcan开发文档，请见http://newdocx.appcan.cn
Show: /newdocx/docx?type=1445_975
*/

- [1、简介](#-1-http-appcan-download-oss-cn-beijing-aliyuncs-com-e5-85-ac-e6-b5-8b-2fgf-png-ignore- "1、简介")
- [2、API概览](#-2-api-ignore- "2、API概览")
- [3、更新历史](#-3-ignore- "3、更新历史")
#### **1、简介** *[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() *<ignore>
文件下载插件
###### **1.1、说明**<ignore>
文件下载管理接口API,该对象主要封装了下载数据的接口,支持多个文件下载,断点续传下载,下载文件大小无限制.
>本文的目的是为了开发能够更好更快地将API集成到自己的项目中，在使用前最好先使用好我们提供的[demo](#-1-3-ignore-)并对照文档运行看看效果。
></br>这里可以【[参考](http://newdocx.appcan.cn/quickstart/create-app)教程】下载AppCan IDE为开发者工具开发，然后集成到自己的项目上。
 

###### **1.2、UI展示**<ignore>
*![](http://newdocx.appcan.cn/docximg/133313p2015r6s16g.png) *

###### **1.3、开源源码**<ignore>
插件测试用例与源码下载:<a href="http://plugin.appcan.cn/details.html?id=169_index" target="_blank">点击</a>插件中心至插件详情页 (插件测试用例与插件源码已经提供)

###### **1.4、平台版本支持**<ignore>
本插件的所有API默认支持**Android4.3+**和**iOS10.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

###### **1.5、接口有效性**<ignore>
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

#### **2、API概览**<ignore>
###### **2.1、方法**<ignore>

> ######  **create //创建下载对象** 

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
if(!downloader){
	alert("创建失败!");
}
```

> ######  **setHeaders //设置请求头**

`uexDownloaderMgr.setHeaders(downloader, json)`

**说明:**

设置请求头

**参数:**

| 参数名称       | 参数类型    | 是否必选 | 说明                                  |
| ---------- | ------- | ---- | ----------------------------------- |
| downloader | Object  | 是    | 由[create](#-create-)接口创建的下载对象 |
| json       | JSON字符串 | 是    | 请求头信息                               |

**示例:**

```javascript
var downloader = ...//由create接口创建的下载对象
var headJson = '{"Content-type":"application/json;charset=utf-8"}';
uexDownloaderMgr.setHeaders(downloader, headJson);
```

> ######  **download //下载文件** 

`uexDownloaderMgr.download(downloader,serverURL,savePath,mode,cb)`

**说明:**

开始下载文件

**参数:**

| 参数名称       | 参数类型     | 是否必选 | 说明                                  |
| ---------- | -------- | ---- | ----------------------------------- |
| downloader | Object   | 是    | 由[create](#-create-)接口创建的下载对象 |
| serverURL  | String   | 是    | 服务器地址                               |
| savePath   | String   | 是    | 本地保存地址                              |
| mode       | Number   | 是    | 是否支持断点续传,0:不支持,1:支持                 |
| cb         | Function | 是    | 下载进度回调,详见下                          |


**回调参数:**

```
var cb = function(fileSize,percent,status){}
```

| 参数名称     | 参数类型   | 是否必选 | 说明                         |
| -------- | ------ | ---- | -------------------------- |
| fileSize | Number | 是    | 要下载的文件大小                   |
| percent  | Number | 是    | 下载进度百分比 取值为0~100           |
| status   | Number | 是    | 下载状态 0-下载中 1-下载完成 2-下载发生错误 |

**示例:**

```javascript
var downloader = ...//由create接口创建的下载对象

uexDownloaderMgr.download(downloader,
	 "http://wallpaper.pocketdigi.com/upload/1/bigImage/1284565196.jpg", 
	 "wgt://data/down/1284565196.jpg",
	 1, 
	 function(fileSize, percent, status){
              switch (status) {
                  case 0:
                      document.getElementById('percentage').innerHTML = "文件大小:" + fileSize + "字节<br>下载进度:" + percent;
                      return;
                  break;
                  case 1:
                      alert("下载完成");
                  break;
                  case 2:
                      alert("下载失败");
                  break;
				  }				  
});
```

> ######  **cancelDownload //取消下载** 

`uexDownloaderMgr.cancelDownload(serverURL,clearMode)`

**说明:**

取消指定下载地址的下载任务

**参数:**

| 参数名称      | 参数类型   | 是否必选 | 说明                                       |
| --------- | ------ | ---- | ---------------------------------------- |
| serverURL | String | 是    | 服务器下载地址                                  |
| clearMode | Number | 否    | 默认为0.0-只取消此次下载任务,不清除已经下载的临时文件. 1-取消此次下载任务并清除已经下载的临时文件 |

​    

**示例:**

```
uexDownloaderMgr.cancelDownload("http://wallpaper.pocketdigi.com/upload/1/bigImage/1284565196.jpg");
```

> ######  **closeDownloader //关闭下载对象** 

`uexDownloaderMgr.closeDownloader(downloader)`

**说明:**

关闭下载对象

**参数:**

| 参数名称       | 参数类型   | 是否必选 | 说明                                  |
| ---------- | ------ | ---- | ----------------------------------- |
| downloader | Object | 是    | 由[create](#-create-)接口创建的下载对象 |



**示例:**

```
var downloader = ...//由create接口创建的下载对象

uexDownloaderMgr.closeDownloader(downloader);
```

> ######  **getInfo //获取下载对象的相关信息**

`uexDownloaderMgr.getInfo(serverURL)`

**说明:**

获取下载对象的相关信息

**参数:**

| 参数名称      | 参数类型   | 是否必选 | 说明      |
| --------- | ------ | ---- | ------- |
| serverURL | String | 是    | 服务器下载地址 |

**返回值:**

返回值info是JSON Object类型,形式如下:

```javascript
var info = {
	savePath:,
	fileSize:,
	currentSize:,
	lastTime:
}
```

各字段含义如下:

| 参数名称        | 参数类型   | 说明       |
| ----------- | ------ | -------- |
| savePath    | String | 文件存储路径   |
| fileSize    | Number | 文件总大小    |
| currentSize | Number | 已下载大小    |
| lastTime    | String | 文件最后修改时间 |

**示例:**

```
var info = uexDownloaderMgr.getInfo("http://wallpaper.pocketdigi.com/upload/1/bigImage/1284565196.jpg");
alert(JSON.stringify(info));
```


#### **3、更新历史**<ignore>

###### **iOS**<ignore>

API版本: `uexDownloaderMgr-4.3.3.2`

最近更新时间:`2019-8-26`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
|   4.3.3.2  |初步适配iOS13,解决闪退问题|
|   4.0.2    |关闭网页后,会正确停止当前网页的下载任务 |
|   4.0.1    |修复一个会导致崩溃的问题 |
###### **Android**<ignore>

API版本: `uexDownloaderMgr-4.3.8`

最近更新时间:`2019-10-09`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
|   4.3.8    |（需要引擎4.1.0以上）部分手机下载没有回调问题|
|   4.3.6    |添加动态权限申请|
|   4.1.6    |（需要引擎4.1.0以上）修复含有空格不能下载的问题|
|   4.1.5    |（需要引擎4.1.0以上）修复重定向链接不能下载的问题 |
|   4.1.4    |（需要引擎4.1.0以上）修复某些url不能下载的问题 |
|   4.1.3    |修复服务器返回2XX（非200、206）导致下载失败的问题，并修改自动处理重定向 |
|   4.1.2    | （需要引擎4.1.0以上）修复不能下载中文链接的问题|                                   
|   4.0.1    | 解决回调过快导致卡死的问题|
