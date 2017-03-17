[TOC]
# 1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 

带安全键盘的输入框插件

## 1.1､说明

创建一个带安全键盘的输入框插件,提供纯数字键盘,数字､字母和符号可切换的键盘,同时输入框位置､键盘描述信息可以定制,具体见下面.

## 1.2､UI展示

![纯数字键盘](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexSecurityKeyboard/ScreenShoot/1.png) ![可切换字母键盘](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexSecurityKeyboard/ScreenShoot/2.png)
![可切换数字键盘](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexSecurityKeyboard/ScreenShoot/3.png) ![可切换符号键盘](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexSecurityKeyboard/ScreenShoot/4.png)

## 1.3､开源源码

插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=566_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4､平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.
# 2､API概览

## 2.1､方法

### 🍭 open 创建带安全键盘的输入框

`uexSecurityKeyboard.open(params);`

**说明:**

创建带安全键盘的输入框对象

**参数:**

```javascript
    var params = {
         "keyboardType": ,
         "keyboardDescription": ,
         "x": ,
         "y": ,
         "width": ,
         "height": ,
         "isScrollWithWeb":,
         "showClearText":,
         "showInputBox":,
         "maxInputLength":,
         "hintText":,
         "textColor":,
         "hintTextColor":,
         "backgroundColor":,
         "textSize":,
         "isRandom":,
         "isHighlight":,
         "logoPath":,
         "isCleanPassword":
    }
```

各字段含义如下:

| 名称                  | 类型     | 是否必选 | 说明                                       |
| ------------------- | ------ | ---- | ---------------------------------------- |
| keyboardType        | Number | 否    | 键盘类型,参考[KeyboardType](#KeyboardType) ,默认为0 |
| keyboardDescription | String | 否    | 键盘描述信息,如UI展示中显示在键盘顶部的文字描述"正益移动安全输入"      |
| x                   | Number | 是    | 输入框距屏幕左边缘的距离                             |
| y                   | Number | 是    | 输入框距屏幕顶部的距离                              |
| width               | Number | 是    | 输入框的宽度                                   |
| height              | Number | 是    | 输入框的高度                                   |
| isScrollWithWeb     | bool   | 否    | 是否随网页滚动,默认为false  |
| showClearText | bool | 否 | 是否显示明文输入,默认为true |
| showInputBox | bool | 否 | 是否显示插件输入框,默认为true |
| maxInputLength | Number | 否 | 键盘输入的最大字符数(一个汉字为两个字符),默认不设限制 |
| hintText | String | 否 | 输入框提示语,只有显示插件输入框时才有效,默认值为空 |
| textColor | String | 否 | 输入框字体颜色(RGB色值),只有显示插件输入框时才有效,默认值为系统默认 |
| hintTextColor | String | 否 | 输入框提示语字体颜色(RGB色值),只有显示插件输入框时才有效,默认值为系统默认 |
| backgroundColor | String | 否 | 输入框背景颜色(RGB色值),只有显示插件输入框时才有效,默认值为透明 |
| textSize | String | 否 | 输入框字体大小,只有显示插件输入框时才有效,默认值为系统默认 |
| isRandom | bool | 否 | 是否键盘数字随机,默认为false,仅对纯数字键盘有效 |
| isHighlight | bool | 否 | 是否在点击按键时显示高亮效果,默认为true |
| logoPath | String | 否 | 需要显示logo图标的路径,支持appcan路径协议|
| isCleanPassword | bool | 否 | 是否在应用退出时清空输入框,默认为false |


**返回值:**

返回带安全键盘的输入框对象,创建失败时返回null.

**示例:**

```javascript
    var params = {
        "keyboardType":1,
        "keyboardDescription": "正益移动安全输入",
        "x":100,
        "y":100,
        "width":250,
        "height":50,
        "isScrollWithWeb":true,
        "showClearText":false,
        "showInputBox":false,
        "maxInputLength":1000,
        "hintText":,
        "textColor":"#00ff00",
        "hintTextColor":"#ffff00",
        "backgroundColor":"#ff0000",
        "textSize": 16,
        "isRandom":true,
        "isHighlight":false,
        "logoPath":"res://keyboard_logo@2x.png",
        "isCleanPassword":true
    };
    var securityKeyboard = uexSecurityKeyboard.open(JSON.stringify(params));
```

### 🍭 close 销毁带安全键盘的输入框

`uexSecurityKeyboard.close(securityKeyboard);`

**说明:**

销毁带安全键盘的输入框

**参数:**

| 名称               | 类型     | 是否必选 | 说明                          |
| ---------------- | ------ | ---- | --------------------------- |
| securityKeyboard | Object | 否    | 由open接口创建的输入框对象,不传关闭所有输入框对象 |


**示例:**

```javascript
    uexSecurityKeyboard.close(securityKeyboard);
```

### 🍭 getData 获取输入框中的内容

`var content = uexSecurityKeyboard.getData(securityKeyboard);`

**说明:**

获取输入框对象中的内容,支持同步回调.

**参数:**


各字段含义如下:

| 参数名称             | 参数类型   | 是否必选 | 说明              |
| ---------------- | ------ | ---- | --------------- |
| securityKeyboard | Object | 是    | 由open接口创建的输入框对象 |

**返回值:**

输入框中的内容.

**示例:**

```javascript
   var content = uexSecurityKeyboard.getData(securityKeyboard);
```

## 2.2､监听方法

### 🍭 onKeyPress 键盘点击的监听方法

`uexSecurityKeyboard.onKeyPress(param);`

**说明**

键盘点击的监听方法

**参数**

param为json字符串:

```
var param ={
        "inputType":
    }

```

各字段含义如下:

| 名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| inputType | Number | 是 | 输入类型, 0:输入文本,包括数字､字母､特殊字符等;1:退格;2:完成｡只有当showInputBox为false,即不显示插件输入框时,才会回调文本和退格的输入;输入完成的回调,两种情况都会有｡|


**示例**

```
window.uexOnload=function(type){
    uexSecurityKeyboard.onKeyPress=function(info){
        alert(info);
    }
}
```

### 🍭 onShowKeyboard 显示键盘的监听方法

`uexSecurityKeyboard.onShowKeyboard(param);`

**说明:**
- 显示键盘的监听方法
- 前端收到该监听后,可根据需求调整输入框位置,防止键盘盖住输入框等问题｡

**参数:**

param为json字符串:

```
var param ={
        "id":
    }

```

各字段含义如下:

| 名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | String | 是 | 显示键盘唯一标识符,与open方法中的id对应|


**示例:**

```
window.uexOnload=function(type){
    uexSecurityKeyboard.onShowKeyboard=function(info){
        alert(info);
    }
}
```

### 🍭 onHideKeyboard 键盘消失的监听方法

`uexSecurityKeyboard.onHideKeyboard(param);`

**说明**

显示键盘的监听方法

**参数**

param为json字符串:

```
var param ={
        "id":
    }

```

各字段含义如下:

| 名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | String | 是 | 消失键盘唯一标识符,与open方法中的id对应|


**示例**

```
window.uexOnload=function(type){
    uexSecurityKeyboard.onHideKeyboard=function(info){
        alert(info);
    }
}
```

# 3､附录

### KeyboardType

| value | 描述            |
| ----- | ------------- |
| 0     | 纯数字键盘,不可切换    |
| 1     | 数字､字母､符号可切换键盘 |
| 2     | 系统默认键盘        |

# 4､更新历史

### iOS

API版本: `uexSecurityKeyboard-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 带安全键盘的输入框4.0插件 |

### Android

API版本: `uexSecurityKeyboard-4.0.1`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.1 | 增加自定义输入框样式､随机展示数字键盘等功能 |
| 4.0.0 | 带安全键盘的输入框 4.0 插件 |
