/*
Sort: 4
Toc: 1
Tips: 文件上传管理
keywords: appcan开发文档,插件API,网络通讯,uexUploaderMgr
description: uexUploaderMgr 即文件上传管理接口插件，主要提供文件上传管理接口API，更多appcan开发文档，请见http://newdocx.appcan.cn
Show: /newdocx/docx?type=1447_975
*/
- [1、简介](#-1-http-appcan-download-oss-cn-beijing-aliyuncs-com-e5-85-ac-e6-b5-8b-2fgf-png-ignore- "1、简介")
- [2、API概览](#-2-api-ignore- "2、API概览")
- [3、更新历史](#-3-ignore- "3、更新历史")

#### **1、简介** *[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() *<ignore>
文件上传管理接口插件
###### **1.1、说明**<ignore>
 文件上传管理接口API
 >本文的目的是为了开发能够更好更快地将API集成到自己的项目中，在使用前最好先使用好我们提供的[demo](#-1-3-ignore-)并对照文档运行看看效果。
></br>这里可以【[参考](http://newdocx.appcan.cn/dev-guide/create-app)教程】下载AppCan IDE为开发者工具开发，然后集成到自己的项目上。
 

###### **1.2、UI展示**<ignore>
*![](http://newdocx.appcan.cn/docximg/133734g2015g6g16d.png) *
###### **1.3、开源源码**<ignore>
插件测试用例与源码下载:<a href="http://plugin.appcan.cn/details.html?id=193_index" target="_blank">点击</a>插件中心至插件详情页 (插件测试用例与插件源码已经提供)
###### **1.4、平台版本支持**<ignore>

本插件的所有API默认支持**Android4.3+**和**iOS10.0+**操作系统

有特殊版本要求的API会在文档中额外说明

###### **1.5、接口有效性**<ignore>

本插件所有API默认在插件版本**4.0.0+**可用

在后续版本中新添加的接口会在文档中额外说明



#### **2、API概览**<ignore>

###### **2.1、方法**<ignore>

>  ######  **create //创建上传对象** 

`uexUploaderMgr.create(param)`

**说明:**

创建上传对象

**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明      |
| ----- | ------ | ---- | ------- |
| param | Object | 是    | 上传对象的设置 |

```
var param = {
	url:,
	type:
}
```

各字段含义如下:

| 字段名称 | 类型     | 是否必选 | 说明                                       |
| ---- | ------ | ---- | ---------------------------------------- |
| url  | String | 是    | 要上传的服务器地址                                |
| type | Number | 否    | uploader类型, 0: 一般上传对象 1: 全局上传对象 2: 后台上传对象.此参数不传时默认为0. |

* type:
  * 全局上传对象在当前网页关闭时不会停止上传
  * 后台上传对象是全局上传对象,且当应用处于后台时,仍然可以进行上传


**返回值:**

上传对象实例
创建失败时返回null

**示例:**

```javascript
var uploader = uexUploaderMgr.create({
	  url: "http://192.168.1.4:45678/post",
      type: 1
});
if(!uploader){
	alert("创建失败!");
}
```

> ######  **closeUploader //关闭上传对象** 

`uexUploaderMgr.closeUploader(uploader)`

**说明:**

关闭上传对象

**参数:**

| 参数名称     | 参数类型     | 是否必选 | 说明                                  |
| -------- | -------- | ---- | ----------------------------------- |
| uploader | Uploader | 是    | 由[create](#-create-)接口创建的上传对象 |

**返回值:**

Boolean类型,是否关闭成功


**示例:**

```
var uploader = ...//之前创建的上传对象
var ret = uexUploaderMgr.closeUploader(uploader);
alert(ret);
```

> ######  **setHeaders //设置请求头** 

`uexUploaderMgr.setHeaders(uploader, json)`

**说明:**

设置http请求头

**参数:**

| 参数名称     | 参数类型     | 是否必选 | 说明                                  |
| -------- | -------- | ---- | ----------------------------------- |
| uploader | Uploader | 是    | 由[create](#-create-)接口创建的上传对象 |
| json     | JSON字符串  | 是    | 请求头信息                               |

**返回值:**

Boolean类型,是否设置成功

**示例:**

```
var uploader = ...//之前创建的上传对象
var headJson = {"myHeaderKey":"myHeaderValue"};
var ret = uexUploaderMgr.setHeaders(uploader, JSON.stringify(headJson)); 
alert(ret);
```

> ######  **uploadFile //上传文件** 

`uexUploaderMgr.uploadFile(uploader, filePath, field, quality, maxWidth,cb)`

**说明:**

上传文件

**参数:**


| 参数名称     | 参数类型     | 是否必选 | 说明                                       |
| -------- | -------- | ---- | ---------------------------------------- |
| uploader | Uploader | 是    | 由[create](#-create-)接口创建的上传对象      |
| filePath | String   | 是    | 需要上传的文件路径.支持`wgt://`,`res://`,`file://`  |
| field    | String   | 是    | 文件数据所在的field                             |
| quality  | Number   | 是    | 类型如果为图片,表示是否需要压缩及压缩质量. 0:不压缩 1:高质量压缩 2:中质量压缩 3:低质量压缩 |
| maxWidth | Number   | 是    | 类型如果为图片,图片按尺寸等比压缩的最大宽度                   |
| cb       | Function | 是    | 文件上传中的信息会通过此函数回调                         |



**回调参数:**

```javascript
cb = function(packageSize, percent, responseString, status){}
```

| 参数名称          | 参数类型   | 说明                        |
| ------------- | ------ | ------------------------- |
| packageSize   | Number | 上传包的总大小,单位:字节             |
| percent       | Number | 上传的百分比                    |
| resonseString | String | 服务器的response              |
| status        | Number | 上传的状态,0-上传中 1-上传成功 2-上传失败 |

**示例:**

```javascript
var uploader = ...//之前创建的上传对象
uexUploaderMgr.uploadFile(uploader,"res://uexCoverFlow2_tupian.png","imageField",1,640,function(packageSize, percent, responseString, status){
	switch (status) {
    case 0:
        document.getElementById('percentage').innerHTML = "上传包大小:"+packageSize+"<br>上传进度:"+percent+"%";
        break;
    case 1:
        alert("上传成功,服务器response:"+responseString);
        break;
    case 2:
        alert("上传失败");
        break;
    }
});
```

#### **3、更新历史**<ignore>

###### **iOS**<ignore>

API版本: `uexUploaderMgr-4.0.4`

最近更新时间:`2019-09-09`

| 历史发布版本 | 更新内容   |
| ------ | ------ |
| 4.0.4  |回调方法调整，放入主线程处理|
| 4.0.2.1|修复文件上传时候setHeaders传入数字类型参数会崩溃的问题（修改为自动转为字符串）|
| 4.0.1 | 修复上传原图图片变大问题 |

###### **Android**<ignore>

API版本: `uexUploaderMgr-4.0.7`

最近更新时间:`2019-04-17`

| 历史发布版本 | 更新内容   |
| ------ | ------ |
|    4.0.7  |修复文件上传文件较大时，上传进度回调异常|
|    4.3.4  |添加动态权限申请|
|    4.0.4  |修复图片压缩后文件变大的问题 |
|    4.0.3  |修复服务器返回2XX（非200）导致上传失败的问题，并修改自动处理重定向 |
|    4.0.2  |修复文件名有汉字时出错的问题|
|    4.0.1  |修复uploadFile压缩参数失效的问题 |