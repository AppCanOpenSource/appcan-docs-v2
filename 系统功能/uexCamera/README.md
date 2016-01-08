[TOC]

 # 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
 照相机插件
##1.1、说明
 调用设备照相机拍摄照片,成功后返回相关图片存储地址。
 自定义相机功能接口只适用安卓平台系统,其他接口功能支持跨平台使用
##1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/151400o2015o6w7s.jpg)
##1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=159_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
#2、API概览
 ##2.1、方法

> ### open 打开相机

`uexCamera.open(comtextareass,quality)`

**说明:**

通过此方法调用系统相机,进入拍照界面。

**参数:**

 comtextareass:(Number类型) 可选  图片是否压缩,0表示压缩,非0或者不传表示不压缩。
 quality:(Number类型) 可选  图片压缩质量,comtextareass为0时有效,取值范围[0,100]。

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

通过此方法打开自定义相机,进入拍照界面。

**参数:**

 comtextareass:(Number类型) 可选  图片是否压缩,0表示压缩,非0或者不传表示不压缩。
 quality:(Number类型) 可选  图片压缩质量,comtextareass为0时有效,取值范围[0,100]。

**平台支持:**

Android2.2+

**版本支持:**

3.0.0+

**示例:**

```
uexCamera.openInternal();
```
##2.2、回调方法
> ### cbOpen　拍照的回调方法

`uexCamera.cbOpen(opId,dataType,data)`

**参数:**

  opId:(Number类型) 必选  操作ID,此函数中不起作用,可忽略。
  dataType:(Number类型) 必选  数据类型详见CONSTANT中Callback方法数据类型
  data:(String类型) 必选  拍照成功后图片的保存路径

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

  opId:(Number类型) 必选  操作ID,在此函数中不起作用,可忽略
  dataType:(Number类型) 必选  数据类型详见CONSTANT中Callback方法数据类型
  data:(String类型) 必选  拍照成功后图片的保存路径

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
#3、更新历史 

### iOS

API版本:`uexCamera-3.0.2`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.2 | 添加IDE支持 |
| 3.0.1 | 使用新版Xcode重新编译,支持arm64 |
| 3.0.0 | 照相机功能插件 |

### Android

API版本:`uexCamera-3.0.13`

最近更新时间:`2015-11-13`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
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
