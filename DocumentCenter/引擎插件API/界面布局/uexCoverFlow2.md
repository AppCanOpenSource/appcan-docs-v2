/*
Sort: 1
Toc: 1
*/

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>
3D图片轮播
## 1.1、说明<ignore>
CoverFlow 功能,封装的HTML5代码片段,通过配合的样式和JS对象 ,使开发者在界面中可以快速引用,并可以快速的完成按键事件的监听和控制.
## 1.2、UI展示<ignore>

 ![](http://newdocx.appcan.cn/docximg/140050b2015n6c16e.png)
## 1.3、开源源码<ignore>
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=163_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4、平台版本支持<ignore>

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性<ignore>

本插件所有API默认在插件版本**4.0.0+**可用.

在后续版本中新添加的接口会在文档中额外说明.
# 2、API概览<ignore>

## 2.1、方法<ignore>

###  create 打开视图

`uexCoverFlow2.create(params)`

**说明:**

创建视图对象

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明           |
| ------ | ------ | ---- | ------------ |
| params | String | 是    | 接口所需数据，形式见下： |

```javascript
var params = {                                    
      x: ,
      y: ,
      width: ,
      height: ,
      isScrollWithWeb: ,
      placeholderImage: ,
      imageUrl:[]
  };
```
各字段含义如下:

| 参数名称             | 参数类型   | 是否必选 | 说明                                       |
| ---------------- | ------ | ---- | ---------------------------------------- |
| x                | Number | 是    | x坐标                                      |
| y                | Number | 是    | y坐标                                      |
| width            | Number | 是    | 宽                                        |
| height           | Number | 是    | 高                                        |
| isScrollWithWeb  | bool   | 否    | 是否随网页滚动,默认为false                         |
| placeholderImage | String | 是    | 默认图片路径,图片路径支持 wgt:// wgts:// res:// file://  路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| imageUrl         | Array  | 是    | 网络路径                                     |

**返回值:**

返回视图对象 创建失败时返回null

**示例:**

```javascript
var params = {
    x: 0,
    y: 150,
    width: screen.availWidth,
    height: 200,
    isScrollWithWeb: true,
    placeholderImage: "res://uexCoverFlow2_tupian.png",
    imageUrl: [
        "http://img3.duitang.com/uploads/item/201411/08/20141108002929_dV5Ba.thumb.700_0.jpeg",
        "http://82238.com/uploads/allimg/110519/2-110519130404.jpg",
        "http://www.qqhead.com/UploadFiles/2010-04/2010458740103062.gif",
        "http://a4.att.hudong.com/06/63/01300001216886130487639263274.jpg"
    ]
};
var coverFlow = uexCoverFlow2.create(JSON.stringify(params));
```
###  close 关闭视图

`uexCoverFlow2.close(coverFlow)`

**说明:**

关闭视图

**参数:**

| 参数名称      | 参数类型   | 是否必选 | 说明                          |
| --------- | ------ | ---- | --------------------------- |
| coverFlow | Object | 否    | 由create接口创建的视图对象,不传关闭所有视图对象 |

**示例:**

```
uexCoverFlow2.close(coverFlow);
```
##2.2、监听方法<ignore>

###  onItemSelected 点击item的监听方法

`uexCoverFlow2.onItemSelected(coverFlow,index)`

**参数:**

| 参数名称      | 参数类型     | 是否必选 | 说明               |
| --------- | -------- | ---- | ---------------- |
| coverFlow | Object   | 必选   | 由create接口创建的视图对象 |
| index     | Number类型 | 必选   | 索引               |

**示例:**

```javascript
window.uexOnload = function(){
  uexCoverFlow2.onItemSelected = function(coverFlow, index){
  alert("coverFlow:" + coverFlow + "index:" + index)
 }
}
```
# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexCoverFlow2-4.0.0`

最近更新时间:`2016-8-02`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android<ignore>

API版本: `uexCoverFlow2-4.0.0`

最近更新时间:`2016-8-02`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
