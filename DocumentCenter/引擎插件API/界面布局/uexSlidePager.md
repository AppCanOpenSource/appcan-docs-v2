/*
Sort: 1
Toc: 1
*/


# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() <ignore>
 滑动切换插件
## 1.1、说明<ignore>
uexSlidePager滑动切换页面的相关功能...... 通过创建滑动页面,以及提供的内容页、图标、设置颜色制定ui界面,同时提供了点击页面、颜色改变的监听方法,可以快速的完成事件的监听和控制
## 1.2、UI展示<ignore>
 ![](http://newdocx.appcan.cn/docximg/151024w2015s6p16u.jpg)
## 1.3、开源源码<ignore>
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=187_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持<ignore>
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性<ignore>
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

# 2、API概览<ignore>

## 2.1、方法<ignore>

###  openSlidePager 创建滑动页面

`uexSlidePager.openSlidePager(topMargin, contents, icons, colors, option)`

**说明:**

创建滑动页面  


**参数:**

| 参数名称      | 参数类型   | 是否必选 | 说明                                       |
| --------- | ------ | ---- | ---------------------------------------- |
| topMargin | Number | 是    | 距离顶部的距离                                  |
| contents  | Array  | 是    | 内容页数组,路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| icons     | Array  | 是    | 图标数组路,径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| colors    | Array  | 是    | 颜色数组                                     |
| option    | Json   | 否    | 参数配置项,json格式如下:                          |

```javascript
var option = {
    isShowIcon:,
    isShowContent:
}
```

各字段含义如下:

| 字段名称          | 类型      | 是否必选 | 说明                                       |
| ------------- | ------- | ---- | ---------------------------------------- |
| isShowIcon    | Boolean | 否    | 是否显示页面底部图标,默认为true,若为false,则icons参数无效,且监听方法onIconClick无效 |
| isShowContent | Boolean | 否    | 是否显示上方内容页,默认为true,若为false,则contents参数无效,且监听方法onPageClick无效 |

**示例:**

```javascript
var topMargin = 0;
var contents = [
    "res://pages/page1.html",
    "res://pages/page2.html",
    "res://pages/page3.html",
    "res://pages/page4.html",
    "res://pages/page5.html",
    "res://pages/page6.html",
    "res://pages/page7.html",
    "res://pages/page8.html",
    "res://pages/page9.html"
];
var icons = [
    "res://img/icon1.png",
    "res://img/icon2.png",
    "res://img/icon3.png",
    "res://img/icon4.png",
    "res://img/icon5.png",
    "res://img/icon6.png",
    "res://img/icon7.png",
    "res://img/icon8.png",
    "res://img/icon9.png"
];
var colors = [
    "#D0D0D0",
    "#4A4AFF",
    "#82D900",
    "#B87070",
    "#B9B973",
    "#95CACA",
    "#FFD306",
    "#EA7500",
    "#FF8F59"
];
var option = {
    isShowIcon:true,
    isShowContent:true
}
uexSlidePager.openSlidePager(topMargin, contents, icons, colors, JSON.stringify(option));
```
###  closeSlidePager 移除滑动页面

`uexSlidePager.closeSlidePager()    `

**说明:**

移除滑动页面


**参数:**

无

**示例:**

```
uexSlidePager.closeSlidePager()
```
###  setCurrentPage 设置当前页

`uexSlidePager.setCurrentPage(index)    `

**说明:**

设置当前页


**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明   |
| ----- | ------ | ---- | ---- |
| index | Number | 是    | 索引   |


**示例:**

```javascript
uexSlidePager.setCurrentPage(1)
```

## 2.2、监听方法<ignore>
###  onPageClick 点击页面的监听方法

`uexSlidePager.onPageClick(index)   `

**说明:**

点击页面的监听方法,openSlidePager方法中option参数中isShowContent为false时,该方法无效.


**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明   |
| ----- | ------ | ---- | ---- |
| index | Number | 是    | 索引   |


**示例:**

```javascript
uexSlidePager.onPageClick = function(data){
    alert("onPageClick:"+data);
}  
```

###  onIconSelected  选择底部图标的监听方法

`uexSlidePager.onIconSelected(index)   `

**说明:**

选择底部图标的监听方法,openSlidePager方法中option参数中isShowIcon为false时,该方法无效.


**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明   |
| ----- | ------ | ---- | ---- |
| index | Number | 是    | 索引   |


**示例:**

```javascript
uexSlidePager.onIconSelected = function(data){
    alert("onIconSelected:"+data);
}  
```

###  onChangeColor 页面切换背景色的监听方法

`uexSlidePager.onChangeColor(color) `

**说明:**

页面切换背景色的监听方法   


**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明    |
| ----- | ------ | ---- | ----- |
| color | String | 是    | 颜色字符串 |

**示例:**

```javascript
uexSlidePager.onChangeColor = function(color){
    alert("onChangeColor:"+color);
}  
```

# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexSlidePager-4.0.0`

最近更新时间:`2016-3-2`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android<ignore>

API版本: `uexSlidePager-4.0.0`

最近更新时间:`2016-01-06`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
