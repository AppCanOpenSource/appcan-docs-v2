[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
ActionSheet插件
## 1.1、说明
自定义ActionSheet原生UI界面，通过调用open接口传入资源文件，配置参数，使其效果更能满足应用的需求和ui设计
## 1.2、UI展示
![](http://plugin.appcan.cn/pluginimg/162850y2015o8u11og.jpg)![](http://plugin.appcan.cn/pluginimg/170136f2015b8u11na.jpg)![](http://plugin.appcan.cn/pluginimg/170127y2015d8y11kf.jpg)![](http://plugin.appcan.cn/pluginimg/165111f2015o8w11la.jpg)
 
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=417_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
# 2、API概览

## 2.1、方法

> ### [open](#open) 打开菜单

`uexActionSheet.open(x,y,width,height,jsonData)`

**说明:**

打开菜单,高度由内容决定。
点击item时会触发监听[onClickItem](#onClickItem) 

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
| x | Number | 是 | x坐标 |
| y | Number | 是 | y坐标(已失效,请传0) |
| width | Number | 是 | 宽度 |
|height|Number|是|高度(已失效,请传0)|
|jsonData|String|是|按钮内容|

* 现在插件会自动在屏幕底部生成
* 现在插件高度会根据按钮内容自动计算获取
* jsonData是json字符串,结构如下：
自定义图片资源，图片路径支持 wgt:// wgts:// res:// file://  路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes

```
jsonData{
	actionSheet_style:{
		frameBgColor:,//背景色	
		frameBroundColor:,//边框颜色
		frameBgImg:,//背景图
		btnSelectBgImg:,//一般按钮,被选中的背景图
		btnUnSelectBgImg:,//一般按钮,未被选中的背景图
		cancelBtnSelectBgImg:,//取消按钮,被选中的背景图
		cancelBtnUnSelectBgImg:,//取消按钮,未被选中的背景图
		textSize:,//文字字号
		textNColor,//一般按钮,未被选中状态下的文字颜色
		textHColor,//一般按钮,被选中状态下的文字颜色
		cancleTextNColor,//取消按钮,未被选中状态下的文字颜色
		cancleTextHColor,//取消按钮,被选中状态下的文字颜色
		actionSheetList:[//按钮数据数组
			{
			name://item名称
			}
		]
			
	}
}
	
```

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

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
		textSize:"17",//文字字号
		textNColor:"#ffffff",//一般按钮,未被选中状态下的文字颜色
		textHColor:"#ffff00",//一般按钮,被选中状态下的文字颜色
		cancleTextNColor:"#ff00ff",//取消按钮,未被选中状态下的文字颜色
		cancleTextHColor:"#000ffff",//取消按钮,被选中状态下的文字颜色
		actionSheetList:[//按钮数据数组
			{
			name:"新浪微博"//item名称
			}
			{
			name:"腾讯微博"//item名称
			}
			{
			name:"分享"//item名称
			}
		]
			
	}
} 
var JsonData =JSON.stringify(data);   
uexActionSheet.open(x,y,width,height,JsonData);           

```

## 2.2、监听方法

> ###  [onClickItem](#onClickItem) 点击item的监听方法

`uexActionSheet.onClickItem(index)	`	

**参数:**

 
|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
| index | Number | 必选 |索引 |
 

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    uexActionSheet.onClickItem = function(data){
        alert("onClickItem" + data);
    }
```
# 3、更新历史

### iOS

API版本:`uexActionSheet-3.0.7`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.7 | .添加IDE支持 |
| 3.0.6 | 修正textNColor不能正常识别的bug |
| 3.0.5 | 增加颜色边框 |
| 3.0.4 | 修复ActionSheet框和底部间存在间隙 |
| 3.0.3 | 解决uexActionSheet"取消"按钮字体正常与高亮颜色无法设置问题 |
| 3.0.2 | 解决字体颜色,高亮颜色无法设置的问题 |
| 3.0.1 | 修复uexActionSheet打不开问题 |
| 3.0.0 | ActionSheet插件 |

### Android

API版本:`uexActionSheet-3.0.3`

最近更新时间:`2015-11-06`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.3 | 去掉插件中的ActivityGroup,配合引擎升级 |
| 3.0.2 | 修复背景图片太大时,列表太高的问题 |
| 3.0.1 | 修改设置的字体高亮颜色不生效的问题 |
| 3.0.0 | ActionSheet插件 |
