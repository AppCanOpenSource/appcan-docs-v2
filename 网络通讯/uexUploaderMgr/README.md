[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
文件上传管理接口插件
## 1.1、说明
 文件上传管理接口API
## 1.2、UI展示
![](http://newdocx.appcan.cn/docximg/133734g2015g6g16d.png)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=193_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4、平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统

有特殊版本要求的API会在文档中额外说明

## 1.5、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用

在后续版本中新添加的接口会在文档中额外说明



# 2、API概览

## 2.1、方法
> ### createUploader 创建上传对象

`uexUploaderMgr.createUploader(id, serverURL,extraInfo)`

**说明:**

创建上传对象,同一id只能被创建一次。获取该方法执行的结果,可以利用回调方法[cbCreateUploader](#cbCreateUploader 创建上传对象是否成功的回调方法 "cbCreateUploader")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
|  id | String | 是 | 唯一标识符 |
| serverURL | String | 是 |  服务器地址 |
| extraInfo | JSON String | 否 | 额外的一些设置,详细见下 |

```
var extraInfo = {
	type:,//Number,可选,uploader类型 0: 一般上传对象 1: 全局上传对象 2: 后台上传对象
}
```
* type:
	* 全局上传对象在当前网页关闭时不会停止上传
	* 后台上传对象是全局上传对象,且当应用处于后台时,仍然可以进行上传
	* 创建全局上传对象或者后台上传对象时,id需保证全局唯一

**返回值:**

Boolean类型,是否创建成功

**示例:**

```
var ret = uexUploaderMgr.createUploader(1, "http://te.3g2win.com/pidginimg/upload.php",JSON.stringify({type:2}));
alert(ret);
```

> ### closeUploader 关闭上传对象

`uexUploaderMgr.closeUploader(id)`

**说明:**

关闭上传对象

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
|  id | String | 是 | 唯一标识符 |

**返回值:**

Boolean类型,是否关闭成功


**示例:**

```
var ret = uexUploaderMgr.closeUploader(1);
alert(ret);
```

> ### setHeaders 设置请求头

`uexUploaderMgr.setHeaders(id, json)`

**说明:**

设置http请求头

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | String | 是 | 上传对象的唯一标识符     |
| json | JSON字符串 | 是 | 请求头信息 |

**返回值:**

Boolean类型,是否设置成功

**示例:**

```
var headJson = {"myHeaderKey":"myHeaderValue"};
var ret = uexUploaderMgr.setHeaders(1, JSON.stringify(headJson)); 
alert(ret);
```

> ### uploadFile 上传文件

`uexUploaderMgr.uploadFile(id, filePath, field, quality, maxWidth,cb)`

**说明:**

上传文件,调用该接口时需确保创建过唯一标识符为id的上传对象。

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | String | 是 | 上传对象的唯一标识符     |
| filePath | String | 是 | 需要上传的文件路径。支持`wgt://`,`res://`,`file://` |
| field | String | 是 | 文件数据所在的field |
| quality | Number | 是 | 类型如果为图片,表示是否需要压缩及压缩质量。 0:不压缩 1:高质量压缩 2:中质量压缩 3:低质量压缩|
| maxWidth | Number | 是 | 类型如果为图片,图片按尺寸等比压缩的最大宽度 |
| cb | Function | 是 | 文件上传中的信息会通过此函数回调|



**回调参数:**

```
cb = function(packageSize, percent, responseString, status){
	//...
}
```

|  参数名称 | 参数类型  |  说明 |
| ----- | ----- | ----- |
| packageSize| Number | 是 | 上传包的总大小,单位:字节 |
| percent| Number | 是 | 上传的百分比|
| resonseString| String | 是 | 服务器的response|
| status| Number | 是 | 上传的状态,0-上传中 1-上传成功 2-上传失败|

**示例:**

```
uexUploaderMgr.uploadFile('1',"res://uexCoverFlow2_tupian.png","inputName",1,640,function(packageSize, percent, responseString, status){
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

# 3、更新历史

### iOS

API版本:`uexUploaderMgr-3.0.15`

最近更新时间:`2016-5-17`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.15 | 用AFNetWorking重写;支持多文件上传;支持后台上传 |
| 3.0.14 | 添加IDE支持 |
| 3.0.13 | 修改了上传进度条达不到100% |
| 3.0.12 | 修改clean方法,setAppVerify新增加appId的信息 |
| 3.0.11 | 验证的请求头的中的appid与key不匹配 |
| 3.0.10 | 判断当前的验证的请求头的属于的应用 |
| 3.0.9 | 当调用setHeader接口时,设置的请求头会为空 |
| 3.0.8 | 修改验证appkey的方法 |
| 3.0.7 | 修改了请求头的验证 |
| 3.0.6 | 支持https |
| 3.0.5 | 统一uexUploaderMgr插件Android和iOS的请求超时时间 |
| 3.0.4 | 修复uexUploaderMgr插件设置请求头不成功的问题 |
| 3.0.3 | uexUploaderMgr插件新增setHeaders接口 |
| 3.0.2 | 修复uexUploaderMgr.uploadFile接口不传"可选"参数会奔溃的bug |
| 3.0.1 | 修复上传过程中关闭window崩溃问题 |
| 3.0.0 | 上传功能插件 |

### Android

API版本:`uexUploaderMgr-3.0.10`

最近更新时间:`2016-5-17`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.10 | :支持uexBackground。 |
| 3.0.9 | :兼容http请求返回数据编码格式不是utf-8的情况；修复上传进度回调过快的问题。 |
| 3.0.8 | 修正plugin文件错误,导致uexFileMgr的plugin方法被覆盖的问题 |
| 3.0.7 | 增加新的 header以及plugin里面的子应用的appId和appkey都按照主应用为准 |
| 3.0.6 | 增加appVerify校验头 |
| 3.0.5 | 修复个别图片压缩导致的上传失败问题 |
| 3.0.4 | 修复不支持HTTPS问题 |
| 3.0.3 | 替换插件中引擎包及新增必要资源文件 |
| 3.0.2 | 新增setHeaders方法 |
| 3.0.1 | 修改UPLOAD上传慢问题 |
| 3.0.0 | 上传功能插件 |
