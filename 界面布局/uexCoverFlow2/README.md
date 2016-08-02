[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
3D图片轮播
## 1.1、说明
CoverFlow 功能,封装的HTML5代码片段,通过配合的样式和JS对象 ,使开发者在界面中可以快速引用,并可以快速的完成按键事件的监听和控制。
## 1.2、UI展示
  
 ![](http://newdocx.appcan.cn/docximg/140050b2015n6c16e.png)
## 1.3、开源源码:
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=163_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4、平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。

有特殊版本要求的API会在文档中额外说明。

## 1.5、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用。

在后续版本中新添加的接口会在文档中额外说明。
# 2、API概览

## 2.1、方法

> ### create 打开视图

`uexCoverFlow2.create(params)`

**说明:**

创建视图对象

**返回值:**

返回视图对象 创建失败时返回null


**参数:**
params为json对象

```
var params = {                                    
      "x": ,
      "y": ,
      "width": ,
      "height": ,
      "isScrollWithWeb": ,
      "placeholderImage": ,
      "imageUrl":[]
  };
```
各字段含义如下:

|   参数名称|参数类型   | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| x  | Number  |必选   | x坐标  |
| y  | Number  |必选   | y坐标  |
| width  | Number  |必选   | 宽  |
| height  | Number  |必选   | 高  
| isScrollWithWeb | bool  | 可选   | 是否随网页滚动，默认为false  |
| placeholderImage | String  | 必选   | 默认图片路径,图片路径支持 wgt:// wgts:// res:// file://  路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes  |
| imageUrl | Array  | 必选   | 网络路径  |

**示例:**

```
var params = {                                    
      "x": 0,
      "y": 150,
      "width":screen.availWidth,
      "height":200,
      "isScrollWithWeb":true,
      "placeholderImage":"res://uexCoverFlow2_tupian.png",
      "imageUrl":["http://img3.duitang.com/uploads/item/201411/08/20141108002929_dV5Ba.thumb.700_0.jpeg","http://82238.com/uploads/allimg/110519/2-110519130404.jpg","http://www.qqhead.com/UploadFiles/2010-04/2010458740103062.gif","http://a4.att.hudong.com/06/63/01300001216886130487639263274.jpg"]
  };
var coverFlow = uexCoverFlow2.create(params);
```
> ### close 关闭视图

`uexCoverFlow2.close(coverFlow)`

**说明:**

关闭视图

**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| coverFlow  | Object  |可选   | 由create接口创建的视图对象，不传关闭所有视图对象  |
 
**示例:**

```
uexCoverFlow2.close(coverFlow);
```
##2.2监听方法

> ### onItemSelected 点击item的监听方法

`
uexCoverFlow2.onItemSelected(coverFlow,index)`

**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| coverFlow  | Object  |必选   | 由create接口创建的视图对象  |
| index  | Number类型  |必选   | 索引  |
 

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
  uexCoverFlow2.onItemSelected = function(coverFlow, index){
  alert("coverFlow:" + coverFlow + "index:" + index)
 }
}
```
# 3、更新历史

### iOS

API版本:`uexCoverFlow2-4.0.0`

最近更新时间:`2016-8-02`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 插件4.0 |
| 3.0.3 | 修改View可以跟随网页滑动 |
| 3.0.2 | 使用新版Xcode重新编译,支持arm64 |
| 3.0.1 | 去掉图片底部的标题栏 |
| 3.0.0 | 旋转木马功能插件 |

### Android

API版本:`uexCoverFlow2-4.0.0`

最近更新时间:`2016-8-02`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 插件4.0 |
| 3.0.7 | open接口添加跟随webview滚动参数,部分逻辑优化 |
| 3.0.6 | 去掉插件中的ActivityGroup,配合引擎升级 |
| 3.0.5 | 修复open接口传入小数时异常的问题 |
| 3.0.4 | 1.修复图片小于4张一直显示默认图片的问题；2.修复开启硬件加速后,图片歪的问题。 |
| 3.0.3 | 修复图片倒影问题 |
| 3.0.2 | 修复图片显示被截断的问题 |
| 3.0.1 | 修改网络图片不显示,去掉白色边框和倒影 |
| 3.0.0 | 旋转木马功能插件 |
