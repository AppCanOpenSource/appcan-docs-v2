[TOC]

 # 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
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
#2、API概览
 ##2.1、方法

> ### open 打开相机

`uexCamera.open(comtextareass,quality)`

**说明:**

通过此方法调用系统相机,进入拍照界面。调方法[cbOpen　](#cbOpen　拍照的回调方法 "cbOpen　")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| comtextareass | Number类型 | 可选 | 图片是否压缩,0表示压缩,非0或者不传表示不压缩 |
| quality | Number类型 | 可选 | 图片压缩质量,comtextareass为0时有效,取值范围[0,100] |
 

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexCamera.open();
```
> ### openInternal　打开自定义相机

`uexCamera.openInternal(comtextareass,quality)`

**说明:**

通过此方法打开自定义相机,进入拍照界面。回调方法[cbOpenInternal](#cbOpenInternal　自定义相机拍照成功的回调方法 "cbOpenInternal")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| comtextareass | Number类型 | 可选 | 图片是否压缩,0表示压缩,非0或者不传表示不压缩 |
| quality | Number类型 | 可选 | 图片压缩质量,comtextareass为0时有效,取值范围[0,100] |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexCamera.openInternal();
```

> ### openViewCamera 打开自定义View照相机

`openViewCamera(x,y,width,heigth,label,quality)`

**说明:**

通过此方法打开自定义View照相机。回调方法 [cbOpenViewCamera](#cbOpenViewCamera　自定义相机View拍照成功的回调方法 "cbOpenViewCamera")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| x | Number类型 | 必选 | 照相机View起始位置x坐标,x为0时有效,取值范围[0,屏幕分辨率最大宽度]|
| y | Number类型 | 必选 | 照相机View起始位置y坐标,y为0时有效,取值范围[0,屏幕分辨率最大高度] |
| width | Number类型 | 必选 | 照相机View宽度,width为0时有效,取值范围[0,屏幕分辨率最大宽度] |
| heigth | Number类型 | 必选 | 照相机View起始位置y坐标,y为0时有效,取值范围[0,屏幕分辨率最大高度] |
| label | String类型 | 必选 | 拍照时显示在界面中的提示语或标签 |
| quality | Number类型 | 可选 | 图片压缩质量,comtextareass为0时有效,取值范围[0,100] |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexCamera.openViewCamera(x, y, w, h,label,quality);
```

> ### removeViewCameraFromWindow 从屏幕上移除自定义View相机

`removeViewCameraFromWindow()`

**说明:**

通过此方法从屏幕上移除自定义View相机。

**参数:**

 无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexCamera.removeViewCameraFromWindow();
```

> ### changeFlashMode 改变自定义相机View的闪光灯模式

`changeFlashMode(flashMode)`

**说明:**

通过此方法将改变自定义相机View的闪光灯模式,0代表自动,1代表打开闪光灯,2代表关闭闪光灯。如果设置changeCameraPosition为前置摄像头则闪光灯无效。
回调方法 [cbChangeFlashMode](#cbChangeFlashMode　返回更改闪光灯模式成功后当前闪光灯的模式 "cbChangeFlashMode")　
**参数:**

````
 flashMode:(Number类型) 必选  照相机View的闪光灯模式,x为0、1、2时有效,取值范围[0,2]。
````

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexCamera.changeFlashMode(flashMode);
```

> ### changeCameraPosition 改变自定义相机View的摄像头位置

`changeCameraPosition(cameraPosition)`

**说明:**

通过此方法改变自定义相机View的摄像头位置,0代表后置,1代表前置。回调方法[cbChangeCameraPosition](#cbChangeCameraPosition　返回更改前后摄像头成功后当前摄像头的位置 "cbChangeCameraPosition")　

**参数:**

````
 cameraPosition:(Number类型) 必选  照相机View的摄像头位置,x为0、1时有效,取值范围[0,1]。
````

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexCamera.changeCameraPosition(cameraPosition);
```

##2.2、回调方法
> ### cbOpen　拍照的回调方法

`uexCamera.cbOpen(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number类型 | 必选 | 操作ID,此函数中不起作用,可忽略|
| dataType | Number类型 | 必选 | 数据类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback dataType数据类型 |
| data | String类型 | 必选 | 拍照成功后图片的保存路径 |
 

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
  uexCamera.cbOpen = function(opCode, dataType, data){
     alert(data)；
  }
}
```
> ### cbOpenInternal　自定义相机拍照成功的回调方法

`uexCamera.cbOpenInternal(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number类型 | 必选 | 操作ID,此函数中不起作用,可忽略|
| dataType | Number类型 | 必选 | 数据类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback dataType数据类型 |
| data | String类型 | 必选 | 拍照成功后图片的保存路径 |
 

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
  uexCamera.cbOpenInternal = function(opCode, dataType, data){
     alert(data)；
  }
}
```

> ### cbOpenViewCamera　自定义相机View拍照成功的回调方法

`uexCamera.cbOpenViewCamera(opId,dataType,data)`
**说明:**
返回拍照成功后图片的保存路径和之前传入的地理位置
**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number类型 | 必选 | 操作ID,此函数中不起作用,可忽略|
| dataType | Number类型 | 必选 | 数据类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback dataType数据类型 |
| data | String类型 | 必选 | JSON字符串,格式如下: |
   
```
data:
  {
    "photoPath": "/storage/emulated/0/widgetone/apps/11352882/uexViewCameraPhotos/2015-11-27_14-41-34.jpg",
    "label": "北京"
  }
```
各字段含义如下

| 参数 | 是否必须 | 说明 |
|-----|-----|-----|
| photoPath | 是 | 图片的保存路径 |
| label | 是 | 拍照时显示在界面中的提示语或标签 |

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
  uexCamera.cbOpenViewCamera = function(opCode, dataType, data){
     alert(data)；
  }
}
```

> ### cbChangeFlashMode　返回更改闪光灯模式成功后当前闪光灯的模式

`uexCamera.cbChangeFlashMode(opId,dataType,data)`
**说明:**
 0表示自动,1表示开启,2表示关闭,-1表示更改失败
**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number类型 | 必选 | 操作ID,此函数中不起作用,可忽略|
| dataType | Number类型 | 必选 | 数据类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback dataType数据类型 |
| data | Number类型 | 必选 | 返回一个int型,闪光灯模式,0表示自动,1表示开启,2表示关闭,-1表示更改失败 |

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
  uexCamera.cbChangeFlashMode = function(opCode, dataType, data){
     alert(data)；
  }
}
```

> ### cbChangeCameraPosition　返回更改前后摄像头成功后当前摄像头的位置

`uexCamera.cbChangeCameraPosition(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number类型 | 必选 | 操作ID,此函数中不起作用,可忽略|
| dataType | Number类型 | 必选 | 数据类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback dataType数据类型 |
| data | Number类型 | 必选 | 返回一个int型,摄像头位置,0表示后置,1表示前置,-1表示更改失败 |
 

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
  uexCamera.cbChangeCameraPosition = function(opCode, dataType, data){
     alert(data)；
  }
}
```

#3、更新历史 

### iOS

API版本:`uexCamera-3.0.8`

最近更新时间:`2016-5-10`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
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

API版本:`uexCamera-3.0.19`

最近更新时间:`2016-03-07`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
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
