/*
Sort: 1
Toc: 1
*/

[TOC]

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>

自定义编辑框插件
## 1.1、说明<ignore>
 实现自定义编辑框,获取输入框内内容数据进行复制粘贴等操作
## 1.2、UI展示<ignore>

 ![](http://newdocx.appcan.cn/docximg/141950m2015c6g16o.jpg)
## 1.3、开源源码<ignore>
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=170_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持<ignore>
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统. 
有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性<ignore>
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明. 

# 2、API概览<ignore>

## 2.1、方法<ignore>
### 🍭 create 创建自定义的输入框对象

` var editDialog = uexEditDialog.create(params)`

**说明:**

创建自定义的输入框对象, 创建失败返回NULL.

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明           |
| ------ | ------ | ---- | ------------ |
| params | String | 是    | 接口所需数据，形式见下： |

```javascript
var params = {
    "x":,  
    "y":,  
    "width":,  
    "height":,  
    "fontSize":,  
    "fontColor":,
    "inputType":,
    "inputHint":,
    "defaultText":,
    "maxNum":
}
```

| 参数名称        | 参数类型   | 是否必选 | 说明                                       |
| ----------- | ------ | ---- | ---------------------------------------- |
| x           | Number | 是    | x坐标                                      |
| y           | Number | 是    | y坐标                                      |
| w           | Number | 是    | 宽度                                       |
| h           | Number | 是    | 高度                                       |
| fontSize    | Number | 是    | 字体大小,建议16-18                             |
| fontColor   | String | 是    | 字体颜色                                     |
| inputType   | Number | 是    | 键盘类型,见文档[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Keyboard Types "CONSTANT")中KeyboardType; |
| inputHint   | String | 是    | 提示文字                                     |
| defaultText | String | 是    | 默认显示文字                                   |
| maxNum      | maxNum | 否    | 最大字数,如果为0,或者缺省长度无限制,并且不回调uexEditDialog.onNum方法; |

**示例:**

```javascript
var params = {
	"x": 0,
	"y": 0,
	"width": 150,
	"height": 150,
	"fontSize": 18,
	"fontColor": "#ffff00",
	"inputType": 0,
	"inputHint": "提示文字",
	"defaultText": "默认",
	"maxNum": 200
}
var editDialog = uexEditDialog.create(JSON.stringify(params));
```

### 🍭 close 关闭编辑框

`uexEditDialog.close(editDialog)`

**说明:**

关闭编辑框.

**参数:**

| 参数名称       | 参数类型   | 是否必选 | 说明                   |
| ---------- | ------ | ---- | -------------------- |
| editDialog | Object | 是    | 由create接口创建自定义的输入框对象 |

**返回值:**

Boolean类型，表示操作成功或失败.

**示例:**

```javascript
var result = uexEditDialog.close(editDialog);
if(result){
  alert("关闭成功！");
}
```
### 🍭 insert 插入数据

`uexEditDialog.insert(editDialog,text)`

**说明:**

插入数据

**参数:**

| 参数名称       | 参数类型   | 是否必选 | 说明                   |
| ---------- | ------ | ---- | -------------------- |
| editDialog | Object | 是    | 由create接口创建自定义的输入框对象 |
| text       | Sting  | 是    | 要插入的数据               |

**返回值:**

Boolean类型，插入成功后返回true, 失败返回false

**示例:**

```javascript
uexEditDialog.insert(editDialog,"这是5个字");
```
### 🍭 cleanAll 清除所有数据

`uexEditDialog.cleanAll(editDialog)`

**说明:**

清除所有数据

**参数:**

| 参数名称       | 参数类型   | 是否必选 | 说明                   |
| ---------- | ------ | ---- | -------------------- |
| editDialog | Object | 是    | 由create接口创建自定义的输入框对象 |

**返回值:**

Boolean类型，表示操作成功或失败.

**示例:**

```javascript
var result = uexEditDialog.cleanAll(editDialog);
if(result){
  alert("清除成功！");
}
```

### 🍭 getContent 获取编输入框内所有数据

`var data = uexEditDialog.getContent(editDialog)`

**说明:**

获取编辑输入框内所有数据

**参数:**

| 参数名称       | 参数类型   | 是否必选 | 说明                   |
| ---------- | ------ | ---- | -------------------- |
| editDialog | Object | 是    | 由create接口创建自定义的输入框对象 |

**返回值:**

String类型，数据.

**示例:**

```javascript
var data = uexEditDialog.getContent(editDialog)
```


## 2.2、监听方法<ignore>

### 🍭 onNum 文本框字数改变时返回的剩余字数的回调函数

`uexEditDialog.onNum(editDialog, num)`

**参数:**

| 参数名称       | 参数类型   | 是否必选 | 说明                   |
| ---------- | ------ | ---- | -------------------- |
| editDialog | Object | 是    | 由create接口创建自定义的输入框对象 |
| num        | Number | 是    | 剩余字数                 |

**示例:**

```javascript
uexEditDialog.onNum = function(editDialog, num){
	alert(num);
};
```

# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexEditDialog-4.0.0`

最近更新时间:`2016-7-29`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android<ignore>

API版本: `uexEditDialog-4.0.0`

最近更新时间:`2016-7-29`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
