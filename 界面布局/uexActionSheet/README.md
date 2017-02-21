[TOC]
# 1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
ActionSheet插件
## 1.1､说明
自定义ActionSheet原生UI界面,通过调用open接口传入资源文件,配置参数,使其效果更能满足应用的需求和ui设计
## 1.2､UI展示
![](http://plugin.appcan.cn/pluginimg/162850y2015o8u11og.jpg)![](http://plugin.appcan.cn/pluginimg/170136f2015b8u11na.jpg)![](http://plugin.appcan.cn/pluginimg/170127y2015d8y11kf.jpg)![](http://plugin.appcan.cn/pluginimg/165111f2015o8w11la.jpg)

## 1.3､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=417_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4､平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.

在后续版本中新添加的接口会在文档中额外说明.
# 2､API概览

## 2.1､方法

### 🍭 open 打开菜单

`uexActionSheet.open(x,y,width,height,jsonData)`

**说明:**

打开菜单,高度由内容决定.
点击item时会触发监听[onClickItem](#onClickItem) 

**参数:**

| 参数名称     | 参数类型   | 是否必选 | 说明           |
| -------- | ------ | ---- | ------------ |
| x        | Number | 是    | x坐标          |
| y        | Number | 是    | y坐标(已失效,请传0) |
| width    | Number | 是    | 宽度           |
| height   | Number | 是    | 高度(已失效,请传0)  |
| jsonData | String | 是    | 按钮内容,形式见下:   |

* 现在插件会自动在屏幕底部生成
* 现在插件高度会根据按钮内容自动计算获取
* jsonData是json字符串,结构如下:
  自定义图片资源,图片路径支持 wgt:// wgts:// res:// file://  路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes

```javascript
var jsonData = {
	actionSheet_style:{
		frameBgColor:,
		frameBroundColor:,
		frameBgImg:,
		btnSelectBgImg:,
		btnUnSelectBgImg:,
		cancelBtnSelectBgImg:,
		cancelBtnUnSelectBgImg:,
		textSize:,
		textNColor,
		textHColor,
		cancleTextNColor,
		cancleTextHColor,
		actionSheetList:[
			{
				name:
			}
		]
			
	}
}
	
```

各字段含义如下:

| 字段名称                   | 类型     | 是否必选 | 说明                |
| ---------------------- | ------ | ---- | ----------------- |
| actionSheet_style      | Object | 是    | 菜单样式关键字           |
| frameBgColor           | String | 是    | 背景色               |
| frameBroundColor       | String | 是    | 边框颜色              |
| frameBgImg             | String | 是    | 背景图               |
| btnSelectBgImg         | String | 是    | 一般按钮,被选中的背景图      |
| btnUnSelectBgImg       | String | 是    | 一般按钮,未被选中的背景图     |
| cancelBtnSelectBgImg   | String | 是    | 取消按钮,被选中的背景图      |
| cancelBtnUnSelectBgImg | String | 是    | 取消按钮,未被选中的背景图     |
| textSize               | Number | 是    | 文字字号              |
| textNColor             | String | 是    | 一般按钮,未被选中状态下的文字颜色 |
| textHColor             | String | 是    | 一般按钮,被选中状态下的文字颜色  |
| cancelTextNColor       | String | 是    | 取消按钮,未被选中状态下的文字颜色 |
| cancelTextHColor       | String | 是    | 取消按钮,被选中状态下的文字颜色  |
| actionSheetList        | Array  | 是    | 菜单选项文字集合          |
| name                   | String | 是    | 菜单项名称             |

**示例:**

```
var x = 0;
        
var y = 0;//没有用
        
var width = 0;//如果传0,默认是屏幕宽度
        
var height = 0;//没用的高度
        
var data={
	actionSheet_style:{
		frameBgColor:"#ffffff",//背景色	
		frameBroundColor:"#ff0000",//边框颜色
		frameBgImg:"",//背景图
		btnSelectBgImg:"res://btn-act.png",//一般按钮被选中的背景图
		btnUnSelectBgImg:"res://btn.png",//一般按钮未被选中的背景图
		cancelBtnSelectBgImg:"res://cancel-act.png",//取消按钮 被选中的背景图
		cancelBtnUnSelectBgImg:"res://cancel.png",//取消按钮 未被选中的背景图
		textSize:17,//文字字号
		textNColor:"#ffffff",//一般按钮,未被选中状态下的文字颜色
		textHColor:"#ffff00",//一般按钮,被选中状态下的文字颜色
		cancelTextNColor:"#ff00ff",//取消按钮,未被选中状态下的文字颜色
		cancelTextHColor:"#000ffff",//取消按钮,被选中状态下的文字颜色
		actionSheetList:[//按钮数据数组
			{
			name:"新浪微博"//item名称
			},
			{
			name:"腾讯微博"//item名称
			},
			{
			name:"分享"//item名称
			}
		]
			
	}
} 
var JsonData =JSON.stringify(data);   
uexActionSheet.open(x,y,width,height,JsonData);           
```

## 2.2､监听方法

### 🍭  onClickItem 点击item的监听方法

`uexActionSheet.onClickItem(index)	`	

**参数:**


| 参数名称  | 参数类型   | 是否必选 | 说明   |
| ----- | ------ | ---- | ---- |
| index | Number | 必选   | 索引   |




**示例:**

```javascript
    uexActionSheet.onClickItem = function(data){
        alert("onClickItem" + data);
    }
```
# 3､更新历史

### iOS

API版本: `uexActionSheet-4.0.1`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.1 | 优化参数获取 |
| 4.0.0 | ActionSheet插件 |

### Android

API版本: `uexActionSheet-4.0.1`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.1 | 去掉多余资源,解决编译错误 |
| 4.0.0 | ActionSheet插件 |
