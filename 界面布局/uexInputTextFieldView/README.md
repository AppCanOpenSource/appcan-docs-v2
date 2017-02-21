[TOC]
# 1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
评论输入框插件

## 1.1､说明
 提供评论输入相关的功能,集成了表情输入功能,只需简单的widget配置即可实现自定义表情集
## 1.2､UI展示
![](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexInputTextFieldView/img/1.png)        ![](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexInputTextFieldView/img/2.png)

## 1.3､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=452_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)


## 1.4､平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

# 2､API概览

## 2.1､方法

### 🍭 open 打开评论输入

`uexInputTextFieldView.open(json)`

**说明:**

打开评论输入

**参数**

| 参数名称 | 参数类型   | 是否必选 | 说明           |
| ---- | ------ | ---- | ------------ |
| json | Object | 是    | 接口所需数据,形式见下: |

```javascript
var json = {
    emojicons:,
    placeHold:
}
```
各字段含义如下:

| 字段名称      | 类型     | 是否必选 | 说明                        |
| --------- | ------ | ---- | ------------------------- |
| emojicons | String | 是    | emojicons.xml文件路径(详细说明见下) |
| placeHold | String | 否    | 输入框提示语                    |

>参数emojicons的自定义表情配置文件为:"res://emojicons/emojicons.xml",详细配置步骤:

1､在widget的wgtRes目录下创建emojicons目录;
2､在emojicons中放入表情以及删除的图片资源,表情的默认命名格式:
ace_emoji_1,删除的默认命名格式:ace_emoji_delete.png;
3､在emojicons中创建emojicons.xml文件,格式如下:

```xml
<?xml version="1.0" encoding="utf-8"?>
<emojicons delete="ace_emoji_delete.png ">
  <key>[微笑]</key>
   <string> ace_emoji_1.png</string>
   <key>[憋嘴]</key>
   <string> ace_emoji_2.png</string>
</emojicons>
```

*   delete:删除对应的图片名;
*   key:表情对应的文字;
*   string:表情对应的图片名
    * 说明:表情目录､图片名以及配置文件名都可以自定义命名,但是必须保证配置文件中的图片名与资源图片对应.


**示例**

```javascript
var data ={
    emojicons: "res://emojicons/emojicons.xml",
    placeHold: "请输入内容"
};
uexInputTextFieldView.open(data);
```

### 🍭 close 关闭评论输入

`uexInputTextFieldView.close()`

**说明:**

关闭评论输入

**参数**

```
无
```


**示例**

```javascript
uexInputTextFieldView.close();
```

### 🍭 setInputFocused 输入框自动获取焦点

`uexInputTextFieldView.setInputFocused()`

**说明:**

输入框自动获取焦点

**参数**

```
无
```

**示例**

```
uexInputTextFieldView.setInputFocused();
```


### 🍭 getInputBarHeight 获取输入工具条高度 

`uexInputTextFieldView.getInputBarHeight();  `

**说明**

获取输入工具条高度 

**参数:**

无

**返回值:**

Number类型,工具条高度.


**示例:**

```javascript
var result=uexInputTextFieldView.getInputBarHeight();
alert(result);
```

## 2.2､监听方法

### 🍭 onCommitJson 点击发送的监听方法

`uexInputTextFieldView.onCommitJson(json)`

**参数:**

```javascript
var json = {
	emojiconsText:
}
```

| 参数名称          | 参数类型   | 是否必选 | 说明      |
| ------------- | ------ | ---- | ------- |
| emojiconsText | String | 是    | 输入框里的内容 |

**示例:**

```javascript
function onCommitJson(data) {
	alert(data);
}
window.uexOnload = function(){
	uexInputTextFieldView.onCommitJson = onCommitJson;
}
```
### 🍭 onKeyBoardShow 键盘弹出或收起时的监听方法

`uexInputTextFieldView.onKeyBoardShow(json)`

**参数:**

```javascript
var json = {
	status:
}
```

| 参数名称   | 参数类型   | 是否必选 | 说明               |
| ------ | ------ | ---- | ---------------- |
| status | Number | 是    | 键盘状态  0-收起  1-弹出 |



**示例:**

```javascript
function onKeyBoardShow(data) {
	alert(data);
}
window.uexOnload = function(){
	uexInputTextFieldView.onKeyBoardShow = onKeyBoardShow;
}
```

 

# 3､更新历史

### iOS

API版本: `uexInputTextFieldView-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | :uexInputTextFieldView for iOS |

### Android

API版本: `uexInputTextFieldView-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 4.0 |
