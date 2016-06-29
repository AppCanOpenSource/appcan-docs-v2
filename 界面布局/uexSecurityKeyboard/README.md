[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 

带安全键盘的输入框插件

## 1.1、说明

创建一个带安全键盘的输入框插件,提供纯数字键盘,数字、字母和符号可切换的键盘,同时输入框位置、键盘描述信息可以定制,具体见下面。

## 1.2、UI展示

![纯数字键盘](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexSecurityKeyboard/ScreenShoot/1.png) ![可切换字母键盘](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexSecurityKeyboard/ScreenShoot/2.png)
![可切换数字键盘](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexSecurityKeyboard/ScreenShoot/3.png) ![可切换符号键盘](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexSecurityKeyboard/ScreenShoot/4.png)

## 1.3、开源源码

插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4、平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。

有特殊版本要求的API会在文档中额外说明。

## 1.5、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用。
# 2、API概览

## 2.1、方法

> ### open 创建带安全键盘的输入框

`uexSecurityKeyboard.open(params);`

**说明:**

该方法创建带安全键盘的输入框

**参数:**

```
    var params = {
         "id": ,
         "keyboardType": ,
         "keyboardDescription": ,
         "x": ,
         "y": ,
         "width": ,
         "height":
    }
```

各字段含义如下:

| 名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | String | 是 | 唯一标识符,与监听方法中的id对应 |
| keyboardType | Number | 否 | 键盘类型,参考[KeyboardType](#KeyboardType) ,默认为0|
| keyboardDescription | String | 否 | 键盘描述信息,如UI展示中显示在键盘顶部的文字描述"正益移动安全输入" |
| x | Number | 是 | 输入框距屏幕左边缘的距离 |
| y | Number | 是 | 输入框距屏幕顶部的距离 |
| width | Number | 是 | 输入框的宽度 |
| height | Number | 是 | 输入框的高度 |

**示例:**

```
    var params = {
        "id":"1",
        "keyboardType":1,
        "keyboardDescription": "正益移动安全输入",
        "x":100,
        "y":100,
        "width":250,
        "height":50
    };
    uexSecurityKeyboard.open(JSON.stringify(params));
```

> ### close 销毁带安全键盘的输入框

`uexSecurityKeyboard.close(params);`

**说明:**

销毁带安全键盘的输入框

**参数:**

```
    var params = []//(可选) 输入框id数组,不传时,销毁全部输入框
```


**示例:**

```
    var params = ["1"];
    uexSecurityKeyboard.close(JSON.stringify(params));
```

> ### getContent 获取输入框中的内容

`var info = uexSecurityKeyboard.getContent(params);`

**说明:**

获取输入框中的内容,支持同步回调。

**参数:**


各字段含义如下:

| 名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| params | json字符串数组 | 否 | 输入框id数组,不传时,获取全部输入框中的内容 |
| info | json对象 | 否 | 返回数据 |
| id | String | 是 | 唯一标识符,与open方法中的id对应 |
| content | String | 否 | 输入的内容,仅当传入的id标识的输入框已打开的有效 |
```
var info = [//输入框数据列表
    {
        id:,
        content:
    }
]
```

**示例:**

```
   //获取id为1的输入框内容
   var params = '["1"]';
   var info = uexSecurityKeyboard.getContent(params);
   alert(JSON.stringfy(info));
   
   //获取所有输入框中的内容
   var info = uexSecurityKeyboard.getContent();
   alert(JSON.stringfy(info)); 
```


# 3、附录

### KeyboardType

|value|描述|
|-----|-----|
| 0 | 纯数字键盘,不可切换 |
| 1 | 数字、字母、符号可切换键盘 |
| 2 | 系统默认键盘 |

# 4、更新历史

### iOS

API版本:`uexSecurityKeyboard-4.0.0`

最近更新时间:`2016-06-29`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持引擎4.0，函数入参 |
| 3.0.0 | 带安全键盘的输入框插件 |

### Android

API版本:`uexSecurityKeyboard-4.0.0`

最近更新时间:`2016-06-29`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持引擎4.0，函数入参 |
| 3.0.0 | 带安全键盘的输入框插件 |
