[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

自定义编辑框插件
## 1.1、说明
 自定义编辑框
## 1.2、UI展示
 
 ![](http://newdocx.appcan.cn/docximg/141950m2015c6g16o.jpg)
## 1.3、开源源码：
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=170_index) 插件中心至插件详情页 （插件测试用例与插件源码已经提供）

# 2、API概览

## 2.1、方法
> ### open 打开自定义的输入框

`uexEditDialog.open(id,x,y,w,h,fontSize,fontColor,inputType,inputHint,defaultText,maxNum)`
**说明:**
打开自定义的输入框
**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id  | Number类型  |必选   | 唯一标识符  |
| num  | Number类型  |必选   | 剩余字数  |
| x  | Number类型  |必选   | x坐标  |
| y  | Number类型  |必选   | y坐标  |
| z  | Number类型  |必选   | z坐标  |
| w  | Number类型  |必选   | 宽度  |
| h  | Number类型  |必选   | 高度  |
| fontSize  | Number类型  |必选   |   字体大小，建议16-18  |
| fontColor  | String类型  |必选   | 字体颜色  |
| inputType  | Number类型  |必选   |  键盘类型，见文档CONSTANT中KeyboardType；  |
| inputHint  | String类型  |必选   | 提示文字  |
| defaultText  | String类型  |必选   | 默认显示文字  |
| maxNum  | maxNum  |可选   | 最大字数，如果为0，或者缺省长度无限制，并且不回调uexEditDialog.onNum方法；  |
 
**平台支持:**
Android2.2+
iOS6.0+
**版本支持:**
3.0.0+
**示例:**
```
uexEditDialog.open(1, 0, 0, 200, 200, 16,"#ffff00", 0, "提示文字", “默认”, 200);
```
> ### close 关闭编辑框

`uexEditDialog.close(id)`
**说明:**
关闭编辑框
**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id  | Number类型  |必选   | 输入框的唯一标识符  |
 
**平台支持:**
Android2.2+
iOS6.0+
**版本支持:**
3.0.0+
**示例:**
```
uexEditDialog.close(1);
```
> ### insert 插入数据

`uexEditDialog.inset(id,text)`
**说明:**
插入数据
**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id  | Number类型  |必选   | 输入框的唯一标识符  |
| text  | Number类型  |必选   | 要插入的数据  |
 
 
**平台支持:**
Android2.2+
iOS6.0+
**版本支持:**
3.0.0+
**示例:**
```
uexEditDialog.inset(1,"aaa")
```
> ### cleanAll 清除所有数据

`uexEditDialog.cleanAll(id)`

**说明:**
清除所有数据
**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id  | Number类型  |必选   | 输入框的唯一标识符  |
 
 
**平台支持:**
Android2.2+
iOS6.0+
**版本支持:**
3.0.0+
**示例:**
```
uexEditDialog.cleanAll(1)
```
> ### getContent 获取编输入框内所有数据

`uexEditDialog.getContent(id)`
**说明:**
获取编输入框内所有数据
**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id  | Number类型  |必选   | 输入框的唯一标识符  |
 
**平台支持:**
Android2.2+
iOS6.0+
**版本支持:**
3.0.0+
**示例:**
```
uexEditDialog.getContent(1)
```
## 2.2、回调方法
> ### cbOpen open的回调方法，打开输入框时被调用
> ### cbClose 关闭输入框的回调方法
> ### cbInsert 插入字符的回调方法
> ### cbCleanAll 清除所有内容的回调方法
> ### cbGetContent 获取内容的回调方法

以上回调均为如下
`uexEditDialog.cbXXX(id,dataType,data)`
**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id  | Number类型  |必选   | 打开输入框的id  |
| dataType  | Number类型  |必选   | 返回uex.cInt类型。 详见CONSTANT中CallbackDataTypes。  |
| data  | Number类型  |必选   | 返回uex.cSuccess或uex.cFailed。 详见CONSTANT中CallbackIntValues  |
 
**版本支持:**
3.0.0+
**示例:**
```
function cbXXX(id,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexEditDialog.cbXXX = cbXXX;
}
```
## 2.2、监听方法

> ### onNum 文本框字数改变时返回的剩余字数的回调函数

`uexEditDialog.onNum(opId, num)`
**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId  | Number类型  |必选   | 打开输入框的id  |
| num  | Number类型  |必选   | 剩余字数  |

**版本支持:**
3.0.0+
**示例:**
```
uexEditDialog.onNum = function(opId, num){
alert(num);
};
```
# 3、更新历史
API 版本：uexEditDialog-3.0.1(iOS) uexEditDialog-3.0.0（Android）
最近更新时间：2015-06-19

|  历史发布版本 | iOS更新  | 安卓更新  |
| ------------ | ------------ | ------------ |
| 3.0.1  | 使用新版Xcode重新编译,支持arm64| |
| 3.0.0  | 自定义编辑框功能插件  | 自定义编辑框功能插件|
