[TOC]

#1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
 照相机插件
##1.1、说明
 调用设备照相机拍摄照片,成功后返回相关图片存储地址。
 自定义相机功能接口只适用安卓平台系统,其他接口功能支持跨平台使用
 <div class="alert alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button> 注意!
 Android因内存问题,调用系统相机会导致APP崩溃,需调用自定义相机接口或使用参数压缩下图片。
主要是因为,系统相机和调用系统相机的APP不在同一进程,因内存过低,系统将APP杀死。
</div>

##1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/151400o2015o6w7s.jpg)
##1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=159_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。
有特殊版本要求的API会在文档中额外说明。

## 1.5、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用。
在后续版本中新添加的接口会在文档中额外说明。

#2、API概览
 ##2.1、方法

> ### open 打开相机

`uexCamera.open(comtextareass, quality, callbackFunction)`

**说明:**

通过此方法调用系统相机,进入拍照界面。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| comtextareass | Number类型 | 可选 | 图片是否压缩,0表示压缩,非0或者不传表示不压缩 |
| quality | Number类型 | 可选 | 图片压缩质量,comtextareass为0时有效,取值范围[0,100] |
| callbackFunction|函数 | 必选 | 回调函数，用来获取相关业务数据|

callbackFunction的参数是String类型，返回拍照完成后图片的存储路径。
 


**示例:**

```
var comtextareass = '0';
var quality = '100';
uexCamera.open(comtextareass, quality, function(picPath) {
  alert(picPath);
});
```

> ### openInternal　打开自定义相机

`uexCamera.openInternal(comtextareass, quality, callbackFunction)`

**说明:**

通过此方法打开自定义相机,进入拍照界面。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| comtextareass | Number类型 | 可选 | 图片是否压缩,0表示压缩,非0或者不传表示不压缩 |
| quality | Number类型 | 可选 | 图片压缩质量,comtextareass为0时有效,取值范围[0,100] |
| callbackFunction|函数 | 必选 | 回调函数，用来获取拍照后图片的存储路径|

callbackFunction的参数是String类型，返回拍照完成后图片的存储路径。


**示例:**

```
var comtextareass = '0';
var quality = '100';
uexCamera.openInternal(comtextareass, quality, function(data) {
  alert(data);
});
```

> ### openViewCamera 打开自定义View照相机

`openViewCamera(x, y, width, heigth, label, quality, callbackFunction)`

**说明:**

通过此方法打开自定义View照相机。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| x | Number类型 | 必选 | 照相机View起始位置x坐标,x为0时有效,取值范围[0,屏幕分辨率最大宽度]|
| y | Number类型 | 必选 | 照相机View起始位置y坐标,y为0时有效,取值范围[0,屏幕分辨率最大高度] |
| width | Number类型 | 必选 | 照相机View宽度,width为0时有效,取值范围[0,屏幕分辨率最大宽度] |
| heigth | Number类型 | 必选 | 照相机View起始位置y坐标,y为0时有效,取值范围[0,屏幕分辨率最大高度] |
| label | String类型 | 必选 | 拍照时显示在界面中的提示语或标签 |
| quality | Number类型 | 必选 | 图片压缩质量,comtextareass为0时有效,取值范围[0,100] |
| callbackFunction|函数 | 必选 | 回调函数，用来获取拍照后图片的存储路径|

callbackFunction 的参数是JSON 对象类型。格式如下：

```
{
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

> ### removeViewCameraFromWindow 从屏幕上移除自定义View相机

`removeViewCameraFromWindow()`

**说明:**

通过此方法从屏幕上移除自定义View相机。

**参数:**

 无


**示例:**

```
uexCamera.removeViewCameraFromWindow();
```

> ### changeFlashMode 改变自定义相机View的闪光灯模式

`changeFlashMode(flashMode)`

**说明:**

通过此方法将改变自定义相机View的闪光灯模式,0代表自动,1代表打开闪光灯,2代表关闭闪光灯。如果设置changeCameraPosition为前置摄像头则闪光灯无效。
返回更改闪光灯模式成功后当前闪光灯的模式

**参数:**

````
 flashMode:(Number类型) 必选  照相机View的闪光灯模式,x为0、1、2时有效,取值范围[0,2]。
````


**示例:**

```
var mode = uexCamera.changeFlashMode(flashMode);
alert(mode);
```

> ### changeCameraPosition 改变自定义相机View的摄像头位置

`changeCameraPosition(cameraPosition)`

**说明:**

通过此方法改变自定义相机View的摄像头位置,0代表后置,1代表前置。返回更改前后摄像头成功后当前摄像头的位置

**参数:**

````
 cameraPosition:(Number类型) 必选  照相机View的摄像头位置,x为0、1时有效,取值范围[0,1]。
````

**示例:**

```
var position = uexCamera.changeCameraPosition(cameraPosition);
alert(position);
```

#3、更新历史 

### iOS

API版本:`uexCamera-4.0.0`

最近更新时间:`2016-6-6`

| 历史发布版本| 更新内容 |
| ----- | ----- |
| 4.0.0|支持function传入|
| 3.0.8 | cbOpenViewCamera回调方法,返回的JSON中增加字段label,替换之前的location |
| 3.0.7 | 创建bundle存储资源文件,适配国际化 |
| 3.0.6 | 修改IDE |
| 3.0.5 | 修改openViewCamera接口适配地址长度,修改openInternal崩溃bug,修改第一次切换镜头无效 |
| 3.0.4 | 修改openViewCamera不传照片质量崩溃bug,修改changeFlashMode闪光灯接口 |
| 3.0.3 | 插件改为arc,添加openInternal自定义相机接口,添加openViewCamera自定义view模式相机 |
| 3.0.2 | 添加IDE支持 |
| 3.0.1 | 使用新版Xcode重新编译,支持arm64 |
| 3.0.0 | 照相机功能插件 |

### Android

API版本:`uexCamera-4.0.0`

最近更新时间:`2016-6-6`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0|支持function传入|
| 3.0.21 | 修复了小内存手机压缩图片时发生OOM的问题 |
| 3.0.20 | 修复了open时选择不压缩导致的拍照不能保存的问题 |
| 3.0.19 | 优化了EUExCamera代码逻辑,优化了压缩图片算法,增加注释,规范代码；在cbOpenViewCamera的返回JSON中增加字段label,替换之前的location |
| 3.0.18 | 优化了CameraView代码逻辑,优化了照片处理,优化了OOM问题处理,并做了为null判断,避免程序因空指针崩溃 |
| 3.0.17 | 修复Activity拒绝服务漏洞的问题,修复了openViewCamera拒绝使用系统拍照权限后程序崩溃的问题 |
| 3.0.16 | 修复了在三星手机上照片旋转方向不一致的问题;修复了多次点击照相按钮,再点重拍照相按钮失效的问题 |
| 3.0.15 | 修复了少写mCamera.setPreviewCallback(null)导致崩溃的问题 |
| 3.0.14 | 新增自定义View相机功能,可自行设置大小、位置,可传入地理位置,可调整闪光灯模式和前后置摄像头切换 |
| 3.0.13 | 修复新引擎不能用的问题 |
| 3.0.12 | 修改自定义相机crash问题 |
| 3.0.11 | 修改低分辨率手机自定义相机拍照照片尺寸过小问题 |
| 3.0.10 | 修改自定义相机横屏拍照显示问题 |
| 3.0.9 | 修改自定义相机拍完的照片模糊问题 |
| 3.0.8 | 修改自定义相机拍照时图片 模糊以及拍照后崩溃问题 |
| 3.0.7 | 修改自定义相机空指针异常问题 |
| 3.0.6 | 修改自定义相机拍照后崩溃问题 |
| 3.0.5 | 修改调用系统相机大尺寸图片的处理内存溢出问题 |
| 3.0.4 | 添加自定义相机点击屏幕聚焦的功能 |
| 3.0.3 | 修改相机参数 |
| 3.0.2 | 修改相机拍照数量限制 |
| 3.0.1 | 自定义camera,已解决使用系 统camera内存不足应用被杀死的bug |
| 3.0.0 | camera插件基础版 |
