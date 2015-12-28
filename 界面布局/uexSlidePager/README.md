
[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
 滑动切换插件
## 1.1、说明
uexSlidePager滑动切换页面的相关功能...... 通过创建滑动页面,以及提供的内容页、图标、设置颜色制定ui界面,同时提供了点击页面、颜色改变的监听方法,可以快速的完成事件的监听和控制
## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/151024w2015s6p16u.jpg)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=187_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

> ### openSlidePager 创建滑动页面

`uexSlidePager.openSlidePager(topMargin,contents,icons,colors)`

**说明:**

创建滑动页面  

**参数:**


|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
|topMargin|Number|是|距离顶部的距离|
|contents | Array | 是 | 内容页数组 |
|icons| Array | 是 |图标数组 |
|colors | Array| 是 | 颜色数组 |
<<<<<<< HEAD
=======
|option | Json| 否 | 参数配置项,json格式如下: |
>>>>>>> AppCanOpenSource/master


<<<<<<< HEAD

=======
各字段含义如下:

|  字段名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| isShowIcon | Boolean | 否 | 是否显示页面底部图标,默认为true,若为false,则icons参数无效 |
>>>>>>> AppCanOpenSource/master

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
var topMargin = 0;
var contents = ["res://pages/page1.html","res://pages/page2.html","res://pages/page3.html","res://pages/page4.html","res://pages/page5.html","res://pages/page6.html","res://pages/page7.html","res://pages/page8.html","res://pages/page9.html"];
var icons = ["res://img/icon1.png","res://img/icon2.png","res://img/icon3.png","res://img/icon4.png","res://img/icon5.png","res://img/icon6.png","res://img/icon7.png","res://img/icon8.png","res://img/icon9.png"];
var colors = ["#D0D0D0","#4A4AFF","#82D900","#B87070","#B9B973","#95CACA","#FFD306","#EA7500","#FF8F59"];
uexSlidePager.openSlidePager(topMargin, contents, icons, colors);         

```
> ### closeSlidePager移除滑动页面

`uexSlidePager.closeSlidePager()    `

**说明:**

移除滑动页面
 

**参数:**

无

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexSlidePager.closeSlidePager()
```
> ### setCurrentPage 设置当前页

`uexSlidePager.setCurrentPage(index)    `

**说明:**

设置当前页
 

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
|index|Number|是|索引|

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexSlidePager.setCurrentPage(1)
```

## 2.2、监听方法
> ### onPageClick 点击页面的监听方法

`uexSlidePager.onPageClick(index)   `

**说明:**

点击页面的监听方法   
 

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
|index|Number|是|索引|

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexSlidePager.onPageClick = function(data){
    alert("onPageClickck"+data);
}  

```
> ### onChangeColor 点击页面的监听方法

`uexSlidePager.onChangeColor(color) `

**说明:**

点击页面的监听方法   
 

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
|color|String|是|颜色字符串|

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexSlidePager.onChangeColor = function(data){
    alert("onChangeColor"+data);
}  

```

# 3、更新历史
<<<<<<< HEAD
 API 版本：uexSlidePager-3.0.11(iOS) uexSlidePager-3.0.15（Android）
 最近更新时间：2015-11-06
 
|  历史发布版本 | iOS更新  | 安卓更新  |
| ------------ | ------------ | ------------ |
| 3.0.15  |   | 去掉插件中的ActivityGroup,配合引擎升级   |
| 3.0.14  |   | 修改jar文件   |
| 3.0.13  |   | 修改解密路径   |
| 3.0.12  |   |  修改用新引擎打包闪退问题  |
| 3.0.11  | 适配iPhone6和iPhone6 Plus  | 修改插件包中的plugin.xml文件  |
| 3.0.10  | 修复打开白屏问题  | 修复加载加密网页乱码的问题  |
| 3.0.9  |修复动态库生成不成功的问题   | 修改dimens.xml文件中标签name值  |
| 3.0.8  | 允许加载加密网页  | 修复removeView之前窗口已关闭的问题   |
| 3.0.7  |  修复反复打开关闭插件时的显示错误 | 实现插件中的clean方法销毁activity  |
| 3.0.6  |   增加closeSlidePager方法| 实现插件中的clean方法销毁activity  |
| 3.0.5  | 修复显示bug  | 添加webview弹出alert框功能  |
| 3.0.4 | 修改界面效果  | 修复webview不支持本地缓存的问题  |
| 3.0.3  |  修改界面效果 | 修复部分机型webview不透明的问题  |
| 3.0.2  |  修改界面效果 | 修改webview的背景为透明  |
| 3.0.1  | 修改界面效果| 增加setCurrentPage接口以及点击item的回调方法onPageClick|
| 3.0.0  | uexSlidePager滑动切换插件  | uexSlidePager滑动切换插件|

=======
>>>>>>> AppCanOpenSource/master

### iOS

API版本:`uexSlidePager-3.0.12`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.12 | 添加IDE支持 |
| 3.0.11 | 适配iPhone6和iPhone6 Plus |
| 3.0.10 | 修复打开白屏问题 |
| 3.0.9 | 修复动态库生成不成功的问题 |
| 3.0.8 | 允许加载加密网页 |
| 3.0.7 | 修复反复打开关闭插件时的显示错误 |
| 3.0.6 | 增加closeSlidePager方法 |
| 3.0.5 | 修复显示bug |
| 3.0.4 | 修改界面效果 |
| 3.0.3 | 修改界面效果 |
| 3.0.2 | 修改界面效果 |
| 3.0.1 | 修改界面效果 |
| 3.0.0 | uexSlidePager滑动切换插件 |

### Android

API版本:`uexSlidePager-3.0.16`

最近更新时间:`2015-12-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.16 | 打开接口新增配置是否显示底部图标参数 |
| 3.0.15 | 去掉插件中的ActivityGroup,配合引擎升级 |
| 3.0.14 | 修改jar文件 |
| 3.0.13 | 修改解密路径 |
| 3.0.12 | 修改用新引擎打包闪退问题 |
| 3.0.11 | 修改插件包中的plugin.xml文件 |
| 3.0.10 | 修复加载加密网页乱码的问题 |
| 3.0.9 | 修改dimens.xml文件中标签name值 |
| 3.0.8 | 修复removeView之前窗口已关闭的问题 |
| 3.0.7 | 实现插件中的clean方法销毁activity |
| 3.0.6 | 实现插件中的clean方法销毁activity |
| 3.0.5 | 添加webview弹出alert框功能 |
| 3.0.4 | 修复webview不支持本地缓存的问题 |
| 3.0.3 | 修复部分机型webview不透明的问题 |
| 3.0.2 | 修改webview的背景为透明 |
| 3.0.1 | 增加setCurrentPage接口以及点击item的回调方法onPageClick |
| 3.0.0 | uexSlidePager滑动切换插件 |
