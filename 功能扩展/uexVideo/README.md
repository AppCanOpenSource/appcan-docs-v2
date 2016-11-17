[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
视频播放插件
## 1.1、说明
 封装视频播放和录制相关操作.
视频播放时可实现指定播放进度及播放关闭后回调返回播放进度,支持本地路径和网络地址(支持所有H264编码的常见格式);视频插件可实现自定义录制时间功能,录制后能压缩,Android 平台上支持的的视频文件格式有:MP4、3gp;IOS 平台上支持的视频文件格式有:MOV,MP4,M4V.
## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/152402p2015k6n7f.jpg)![](http://newdocx.appcan.cn/docximg/151401g2015e6r7v.jpg)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=194_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

# 2、API概览

## 2.1、方法

### 🍭 openPlayer 打开视频播放器

`uexVideo.openPlayer(param)`

**说明:**

打开视频播放器,查看视频播放状态触发[onPlayerStatusChange](#onPlayerStatusChange 播放器状态改变的监听方法 "onPlayerStatusChange")
在播放器被关闭时会触发监听[onPlayerClosed](#onPlayerClosed 播放器被关闭时的监听方法)

* 注意,一个网页内只允许存在一个视频播放器,
* 如果已经打开了一个视频播放器,那么在打开新的播放器之前,会关闭已经打开的播放器,同时触发onPlayerClosed监听

**参数:**

| 参数名称  | 参数类型    | 是否必选 | 说明           |
| ----- | ------- | ---- | ------------ |
| param | JSON字符串 | 是    | 接口所需数据,形式见下: |

```javascript
var param = {
	src:,
	startTime:,
	autoStart:,
	forceFullScreen:,
	showCloseButton:,
	showScaleButton:,
	width:,
	height:,
	x:,
	y:,
 	scrollWithWeb:,
}
```

各字段含义如下:

| 字段名称            | 类型      | 是否必选 | 说明                                       |
| --------------- | ------- | ---- | ---------------------------------------- |
| src             | String  | 是    | 播放文件路径. 支持本地路径wgt://,res://,file://和网络路径http://,https:// |
| startTime       | Number  | 否    | 视频开始播放时间,单位为s(秒).默认为0.                   |
| autoStart       | Boolean | 否    | 是否自动开始.默认为false.                         |
| forceFullScreen | Boolean | 否    | 是否强制全屏,详见下方说明.默认为false.                  |
| showCloseButton | Boolean | 否    | 是否显示关闭按钮,用户可以通过点击此按钮关闭播放器.默认为false.      |
| showScaleButton | Boolean | 否    | 是否显示缩放按钮,用户可以通过点击此按钮切换全屏/非全屏模式.默认为true.  |
| width           | Number  | 否    | 播放器宽度,单位px.默认为屏幕宽度.                      |
| height          | Number  | 否    | 播放器高度,单位px.默认为屏幕高度.                      |
| x               | Number  | 否    | 播放器左边距,单位px.默认为0.                        |
| y               | Number  | 否    | 播放器上边距,单位px.默认为0.                        |
| scrollWithWeb   | Boolean | 否    | 普通状态下播放器是否跟随网页滑动.默认为true.                |

* forceFullScreen参数说明
  * 此参数传true时播放器会默认进入全屏状态,**且不能切换回普通状态**.
  * 此参数传true时showCloseButton会被强制设置为true,传入的参数将被忽略.
  * 此参数传true时showScaleButton会被强制设置为false,传入的参数将被忽略.
  * 此参数传true时,width,height,x,y,scrollWithWeb 这5个参数无效.


**示例:**

```javascript
var param = {
	src:"res://1.mp4",
	startTime:3,
	autoStart:true,
	forceFullScreen:false,
	showCloseButton:false,
	showScaleButton:true,
	width:320,
	height:240,
	x:10,
	y:400, 
	scrollWithWeb:true,
}
uexVideo.openPlayer(JSON.stringify(param))
```

### 🍭 closePlayer 关闭视频播放器

`uexVideo.closePlayer()`

**说明:**

关闭视频播放器,此操作会触发[onPlayerClosed 播放器被关闭时的监听方法](#onPlayerClosed 播放器被关闭时的监听方法)

**参数:**

无

**示例:**

```
uexVideo.closePlayer();
```

### 🍭 record 打开视频录制界面

`uexVideo.record(params)`

**说明:**

 打开视频录制界面,监听方法 [onRecordFinish](#onRecordFinish 录制结束的回调方法)

**参数:**

| 参数名称   | 参数类型    | 是否必选 | 说明           |
| ------ | ------- | ---- | ------------ |
| params | JSON字符串 | 是    | 接口所需数据,形式见下: |

```javascript
var param = {
	maxDuration:,
	qualityType:,
	bitRateType:,
	fileType:
}
```

各字段含义如下:

| 参数名称        | 参数类型   | 是否必选 | 说明                                       |
| ----------- | ------ | ---- | ---------------------------------------- |
| maxDuration | Number | 否    | 视频录制最大时间,单位s(秒)                          |
| qualityType | Number | 否    | 视频分辨率类型,**取值为0,1,2,默认为0**.0:1920x1080, 1:1280x720, 2:640x480 |
| bitRateType | Number | 否    | 视频录制时采样率类型,**取值为0, 1, 2, 默认为0**, 0: 高采样率, 1: 中采样率, 2: 低采样率 |
| fileType    | String | 否    | 输出的视频文件格式,**默认为mp4**.Android 平台上支持的的视频文件格式有:`mp4`、`3gp`; IOS支持的压缩视频文件格式有:`mp4`,`mov` |

* 说明:bitRateType 视频录制时使用的采样率,采样率越高,视频越清晰,质量越高,视频文件越大.



**示例:**

```javascript
var params = {
 	maxDuration:15,
 	qualityType:1,
 	bitRateType:2,
 	fileType:"mp4"
}
uexVideo.record(JSON.stringify(params));
```

## 2.2、监听方法

### 🍭 onPlayerClose 播放器被关闭时的监听方法

`uexVideo.onPlayerClose(info)`

**参数:**

info是JSON字符串

```
var info = {
	src:,
	currentTime:
}
```

各字段含义如下:

| 字段名称        | 类型     | 说明             |
| ----------- | ------ | -------------- |
| src         | String | 视频文件路径         |
| currentTime | Number | 被关闭时视频正在播放的时间. |

**示例**

```
window.uexOnload = function(){
    uexVideo.onPlayerClose = function(info){
    	alert(info);
    };
}
```

### 🍭 onPlayerStatusChange 播放器状态改变的监听方法

`uexVideo.onPlayerStatusChange(info)`

**参数:**

param 是JSON字符串

```
var info = {
	status:
}
```

| 字段名称   | 类型     | 说明                               |
| ------ | ------ | -------------------------------- |
| status | Number | 播放器状态  0-暂停中 1-缓冲中 2-播放中 3-发生错误. |

**示例**

```
window.uexOnload = function(){
    uexVideo.onPlayerStatusChange = function(info){
    	alert(info);
    };
}
```

### 🍭 onRecordFinish 录制结束的监听方法

`uexVideo.onRecordFinish(info)`

**参数:**

param 是JSON字符串

```
var info = {
	result:,
	path:
}
```

| 字段名称   | 类型     | 说明                                     |
| ------ | ------ | -------------------------------------- |
| result | Number | 录制结果. 0-录制成功 1-用户取消录制 2-视频录制或者压缩过程发送错误 |
| path   | String | 仅录制成功时才会有此参数,录制压缩得到的视频文件路径             |



**示例**

```

window.uexOnload = function(){
    uexVideo.onRecordFinish = function(info){
    	alert("onRecordFinish:" + info);
    };
}
```

### 🍭 onExportWithProgress 视频压缩进度的监听方法

此接口仅限iOS,可以用于等待压缩时的UI展示.
`uexVideo.onExportWithProgress(progress)`

**参数:**

| 参数名称     | 参数类型   | 说明             |
| -------- | ------ | -------------- |
| progress | Number | 压缩进度值,取值范围为0~1 |

**平台支持:**

iOS7.0+

**示例:**

```
uexVideo.onExportWithProgress = function(progress){
 	console.log(progress);
}
```

# 3、更新历史

### iOS

API版本: `uexVideo-4.0.0`

最近更新时间:`2016-5-10`

| 历史发布版本 | 更新内容                  |
| ------ | --------------------- |

### Android

API版本: `uexVideo-4.0.0`

最近更新时间:`2016-3-23`

| 历史发布版本 | 更新内容                               |
| ------ | ---------------------------------- |
