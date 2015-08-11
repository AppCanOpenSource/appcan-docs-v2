[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
ActionSheet插件
## 1.1、说明
ActionSheet插件
## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/164426l2015g6r16d.jpg)
 
## 1.3、开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=417_index) 插件中心至插件详情页 （插件测试用例与插件源码已经提供）
# 2、API概览

## 2.1、方法

> ### [open](#open) 打开菜单

`uexActionSheet.open(x,y,width,height,jsonData)`

**说明:**
打开菜单,高度由内容决定。
点击item时会触发监听[onClickItem](#onClickItem) 


**参数:**


|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|------- |
| x | Number | 是 | x坐标 |
| y | Number | 是 | y坐标(已失效，请传0) |
| width | Number | 是 | 宽度 |
|height|Number|是|高度(已失效，请传0)|
|jsonData|String|是|按钮内容|

* 现在插件会自动在屏幕底部生成
* 现在插件高度会根据按钮内容自动计算获取
* jsonData是json字符串，结构为

```
jsonData{
	actionSheet_style:{
		frameBgColor:,//背景色	
		frameBroundColor:,//边框颜色
		frameBgImg:,//背景图
		btnSelectBgImg:,//一般按钮被选中的背景图
		btnUnSelectBgImg:,//一般按钮未被选中的背景图
		cancelBtnSelectBgImg:,//取消按钮 被选中的背景图
		cancelBtnUnSelectBgImg:,//取消按钮 未被选中的背景图
		textSize:,//文字字号
		textColor,//文字颜色
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
        
var width = 0;//如果传0，默认是屏幕宽度
        
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
		textColor:"#ffffff",//文字颜色
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

** 参数:**
 
|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|------- |
| index | Number | 必选 |索引 |
 

**平台支持:**
Android2.2+
iOS6.0+

** 版本支持:**
3.0.0+

**  示例:**
```
    uexActionSheet.onClickItem = function(data){
        alert("onClickItem" + data);
    }
```
# 3、更新历史
API 版本：uexActionSheet-3.0.5(iOS) uexActionSheet-3.0.2（Android）
 最近更新时间：2015-06-19
 

|  历史发布版本 | iOS更新  | 安卓更新  |
| ------------ | ------------ | ------------ |
| 3.0.5  | 增加颜色边框 |    | 
| 3.0.4 | 修复ActionSheet框和底部间存在间隙 |   |
| 3.0.3  |  解决uexActionSheet"取消"按钮字体正常与高亮颜色无法设置问题 |   |
| 3.0.2  |  解决字体颜色,高亮颜色无法设置的问题| 修复背景图片太大时，列表太高的问题  |
| 3.0.1  | 修复uexActionSheet打不开问题| 修改设置的字体高亮颜色不生效的问题|
| 3.0.0  | ActionSheet插件  | ActionSheet插件|
