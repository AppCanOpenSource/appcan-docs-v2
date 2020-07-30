[TOC]
/*
Sort: 5
Toc: 1
Tips: 系统照相机功能
keywords: appcan开发文档,插件API,系统功能,uexCamera 
description: uexCamera 插件调用设备照相机拍摄照片,成功后返回相关图片存储地址.自定义相机功能接口只适用安卓平台系统,其他接口功能支持跨平台使用更多appcan开发文档，请见http://newdocx.appcan.cn
Show: /newdocx/docx?type=1393_975
*/

- [1、简介](#-1-http-appcan-download-oss-cn-beijing-aliyuncs-com-e5-85-ac-e6-b5-8b-2fgf-png-ignore- "1、简介")
- [2、API概览](#-2-api-ignore- "2、API概览")
- [3、更新历史](#-3-ignore- "3、更新历史")

#### **1、简介** *[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() *<ignore>
 照相机插件
###### **1.1、说明**<ignore>
 调用设备照相机拍摄照片,成功后返回相关图片存储地址.
 自定义相机功能接口只适用安卓平台系统,其他接口功能支持跨平台使用
 <div class="alert alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button> 注意!
 Android因内存问题,调用系统相机会导致APP崩溃,需调用自定义相机接口或使用参数压缩下图片.
主要是因为,系统相机和调用系统相机的APP不在同一进程,因内存过低,系统将APP杀死.
</div>

###### **1.2、UI展示**<ignore>
*![](http://newdocx.appcan.cn/docximg/151400o2015o6w7s.jpg) *
###### **1.3、开源源码**<ignore>
插件测试用例与源码下载:<a href="http://plugin.appcan.cn/details.html?id=159_index" target="_blank">点击</a>插件中心至插件详情页 (插件测试用例与插件源码已经提供)

###### **1.4、平台版本支持**<ignore>
本插件的所有API默认支持**Android4.3+**和**iOS10.0+**操作系统.
有特殊版本要求的API会在文档中额外说明.

###### **1.5、接口有效性**<ignore>
本插件所有API默认在插件版本**4.0.0+**可用.
在后续版本中新添加的接口会在文档中额外说明.

#### **2、API概览**<ignore>
###### **2.1、方法**<ignore>

> ###### **open //调用系统相机**

`uexCamera.open(comtextareass, quality, callbackFunction)`

**说明:**

通过此方法调用系统相机,进入拍照界面.

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明                                    |
| ---------------- | -------- | ---- | ------------------------------------- |
| comtextareass    | Number类型 | 可选   | 图片是否压缩,0表示压缩,非0或者不传表示不压缩              |
| quality          | Number类型 | 可选   | 图片压缩质量,comtextareass为0时有效,取值范围[0,100] |
| callbackFunction | 函数       | 必选   | 回调函数,用来获取相关业务数据                       |



**回调参数:**

```javascript
var callbackFunction = function(picPath){}
```

| 参数名称    | 类型     | 说明           |
| ------- | ------ | ------------ |
| picPath | String | 拍照完成后图片的存储路径 |

**示例:**

```
var comtextareass = 0;
var quality = 100;
uexCamera.open(comtextareass, quality, function(picPath) {
  alert(picPath);
});
```

> ###### **openInternal //打开自定义相机**

`uexCamera.openInternal(comtextareass, quality, callbackFunction)`

**说明:**

通过此方法打开自定义相机,进入拍照界面.

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明                                    |
| ---------------- | -------- | ---- | ------------------------------------- |
| comtextareass    | Number类型 | 可选   | 图片是否压缩,0表示压缩,非0或者不传表示不压缩              |
| quality          | Number类型 | 可选   | 图片压缩质量,comtextareass为0时有效,取值范围[0,100] |
| callbackFunction | 函数       | 必选   | 回调函数,用来获取拍照后图片的存储路径                   |

**回调参数:**

```javascript
var callbackFunction = function(picPath){}
```

| 参数名称    | 类型     | 说明           |
| ------- | ------ | ------------ |
| picPath | String | 拍照完成后图片的存储路径 |


**示例:**

```
var comtextareass = 0;
var quality = 100;
uexCamera.openInternal(comtextareass, quality, function(data) {
  alert(data);
});
```

> ######  **openViewCamera //打开自定义View照相机** 

`uexCamera.openViewCamera(x, y, width, heigth, label, quality, callbackFunction)`

**说明:**

通过此方法打开自定义View照相机.

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明                                      |
| ---------------- | -------- | ---- | --------------------------------------- |
| x                | Number类型 | 必选   | 照相机View起始位置x坐标,x为0时有效,取值范围[0,屏幕分辨率最大宽度] |
| y                | Number类型 | 必选   | 照相机View起始位置y坐标,y为0时有效,取值范围[0,屏幕分辨率最大高度] |
| width            | Number类型 | 必选   | 照相机View宽度,width为0时有效,取值范围[0,屏幕分辨率最大宽度]  |
| heigth           | Number类型 | 必选   | 照相机View起始位置y坐标,y为0时有效,取值范围[0,屏幕分辨率最大高度] |
| label            | String类型 | 必选   | 拍照时显示在界面中的提示语或标签                        |
| quality          | Number类型 | 必选   | 图片压缩质量,comtextareass为0时有效,取值范围[0,100]   |
| callbackFunction | 函数       | 必选   | 回调函数,用来获取拍照后图片的存储路径                     |

**回调参数:**

```javascript
var callbackFunction = function(data){}
```

| 参数名称 | 类型     | 说明            |
| ---- | ------ | ------------- |
| data | Object | 返回的图片信息,形式见下: |

```javascript
var data = {
    "photoPath": "/storage/emulated/0/widgetone/apps/11352882/uexViewCameraPhotos/2016-06-06_19-52-13.jpg",
    "location": "奥格瑞玛",
    "label": "奥格瑞玛"  //拍照时显示在界面中的提示语或标签
}
```


**示例:**

```
uexCamera.openViewCamera(x, y, w, h,label,quality, function(data) {
  alert(JSON.stringify(data));
});
```

> ######  **removeViewCameraFromWindow //从屏幕上移除自定义View相机** 

`uexCamera.removeViewCameraFromWindow()`

**说明:**

通过此方法从屏幕上移除自定义View相机.

**参数:**

 无


**示例:**

```
uexCamera.removeViewCameraFromWindow();
```

> ######  **changeFlashMode //改变自定义相机View的闪光灯模式** 

`uexCamera.changeFlashMode(flashMode)`

**说明:**

通过此方法将改变自定义相机View的闪光灯模式,0代表自动,1代表打开闪光灯,2代表关闭闪光灯.如果设置changeCameraPosition为前置摄像头则闪光灯无效.

**参数:**

| 参数名称      | 参数类型   | 是否必选 | 说明                                  |
| --------- | ------ | ---- | ----------------------------------- |
| flashMode | Number | 是    | 照相机View的闪光灯模式,x为0、1、2时有效,取值范围[0,2]. |

**返回值:**

Number类型,更改闪光灯模式成功后当前闪光灯模式.

**示例:**

```
var mode = uexCamera.changeFlashMode(0);
alert(mode);
```

> ######  **changeCameraPosition //改变自定义相机View的摄像头位置** 

`uexCamera.changeCameraPosition(cameraPosition)`

**说明:**

通过此方法改变自定义相机View的摄像头位置,0代表后置,1代表前置.

**参数:**

````
 cameraPosition:(Number类型) 必选  照相机View的摄像头位置,x为0、1时有效,取值范围[0,1].
````

**返回值:**

Number类型,返回更改前后摄像头成功后当前摄像头的位置.

**示例:**

```
var position = uexCamera.changeCameraPosition(cameraPosition);
alert(position);
```

#### **3、更新历史** <ignore>

###### **iOS**<ignore>

API版本: `uexCamera-4.0.5`

最近更新时间:`2019-02-13`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
|     4.0.5  |相机拍摄的图片存储的时候按照拍摄方向旋转|
|     4.0.4  |添加权限检测回调onPermissionDenied|
|     4.0.3  |openViewCamera支持JSON传参|
|     4.0.2  |修复横屏打开展示图片的界面会导致UI错乱的问题|
|     4.0.1  |open接口修改为不对图片尺寸进行压缩|

###### **Android**<ignore>

API版本: `uexCamera-4.3.9`

最近更新时间:`2019-09-12`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
|     4.3.9  |修复自定义相机前置摄像头拍照，竖拍照片是横着的|
|     4.3.7  |修改openViewCamera接口增加打开摄像头位置参数|
|     4.3.5  |引擎升级，动态申请相机权限|
|     4.0.3  |去掉自定义取消按钮|
|     4.0.2  |支持拍照不显示预览|
|     4.0.1  |修复open和openInternal接口兼容3.0回调问题|