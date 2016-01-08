[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
3D图片轮播
## 1.1、说明
CoverFlow 功能,封装的HTML5代码片段,通过配合的样式和JS对象 ,使开发者在界面中可以快速引用,并可以快速的完成按键事件的监听和控制。
## 1.2、UI展示
  
 ![](http://newdocx.appcan.cn/docximg/140050b2015n6c16e.png)
## 1.3、开源源码:
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=163_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法
> ### setJsonData 设置数据

`uexCoverFlow2.setJsonData(json,img)`

**说明:**

必须先设置数据才能打开界面

**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| json  | String类型  |必选   | json数据  |
| img  | img  |必选   | 默认图片路径  |
 
````
  json 格式为:  '{"id":"500","selectColor":"#FFFFFF","alpha":"0.2","data":  [{"title":"10","imageUrl":"res://***.png"},  {"title":"20","imageUrl":"res://xxx.png"}]}';
  
````
各字段含义如下:

|参数|是否必须|说明|
|-----|-----|-----|
|id|是|唯一标识符|
|data|是|数据|
|imageUrl|是|图片地址|
 

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
var jsonStr = '{"id":"' + id + '","data":[{"title":"123","imageUrl":"http://www.cmkjz.com/uploads/allimg/100116/0134423.jpg"},{"title":"456","imageUrl":"http://82238.com/uploads/allimg/110519/2-110519130404.jpg"},{"title":"789","imageUrl":"http://www.qqhead.com/UploadFiles/2010-04/2010458740103062.gif"},{"title":"000","imageUrl":"http://a4.att.hudong.com/06/63/01300001216886130487639263274.jpg"}]}';
uexCoverFlow2.setJsonData(jsonStr, "res://Default.png");
```
> ### open 打开视图

`uexCoverFlow2.open(id,x,y,width,height,addToWebView)`

**说明:**

打开视图

**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id  | Number类型  |必选   | 唯一标识符  |
| x  | Number类型  |必选   | x坐标  |
| y  | Number类型  |必选   | y坐标  |
| width  | Number类型  |必选   | 宽  |
| height  | Number类型  |必选   | 高  |
| addToWebView  | Number类型  |可选   | 是否添加到webview跟随webview滚动.0正常打开,不跟随.1为添加到webview,跟随滚动  |
 

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexCoverFlow2.open("510", "20", "200", "240", "250","0");
```
> ### close 关闭视图

`uexCoverFlow2.close(id)`

**说明:**

关闭视图

**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id  | Number类型  |必选   | 唯一标识符  |
 

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
var idarr = ["500", "510"]; //  var idarr = ["500"];
uexCoverFlow2.close(idarr);
```
##2.2监听方法

> ### onItemSelected 点击item的监听方法

`
uexCoverFlow2.onItemSelected(id,index)`

**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id  | Number类型  |必选   | 唯一标识符  |
| index  | Number类型  |必选   | 索引  |
 

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
  uexCoverFlow2.onItemSelected = function(opId, index){
  alert("opId:" + opId + "index:" + index)
 }
}
```
# 3、更新历史

### iOS

API版本:`uexCoverFlow2-3.0.3`

最近更新时间:`2015-12-07`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.3 | 修改View可以跟随网页滑动 |
| 3.0.2 | 使用新版Xcode重新编译,支持arm64 |
| 3.0.1 | 去掉图片底部的标题栏 |
| 3.0.0 | 旋转木马功能插件 |

### Android

API版本:`uexCoverFlow2-3.0.7`

最近更新时间:`2015-12-07`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.7 | open接口添加跟随webview滚动参数,部分逻辑优化 |
| 3.0.6 | 去掉插件中的ActivityGroup,配合引擎升级 |
| 3.0.5 | 修复open接口传入小数时异常的问题 |
| 3.0.4 | 1.修复图片小于4张一直显示默认图片的问题；2.修复开启硬件加速后,图片歪的问题。 |
| 3.0.3 | 修复图片倒影问题 |
| 3.0.2 | 修复图片显示被截断的问题 |
| 3.0.1 | 修改网络图片不显示,去掉白色边框和倒影 |
| 3.0.0 | 旋转木马功能插件 |
