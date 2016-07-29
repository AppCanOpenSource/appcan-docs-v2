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
         "isScrollWithWeb":
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
| isScrollWithWeb | bool | 否 | 是否随网页滚动，默认为false |

**平台支持:**

Android 2.2+    
iOS 6.0+

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+

**示例:**

```
    var params = {
        "id":"1",
        "keyboardType":1,
        "keyboardDescription": "正益移动安全输入",
        "x":100,
        "y":100,
        "width":250,
        "height":50,
        "isScrollWithWeb":true
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

**平台支持:**

Android 2.2+    
iOS 6.0+

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+

**示例:**

```
    var params = ["1"];
    uexSecurityKeyboard.close(JSON.stringify(params));
```

> ### getContent 获取输入框中的内容

`uexSecurityKeyboard.getContent(params);`

**说明:**

获取输入框中的内容,回调方法[cbGetContent](#cbGetContent 获取输入框中的内容的回调方法)

**参数:**

```
    var params = []//(可选) 输入框id数组,不传时,获取全部输入框中的内容
```

**平台支持:**

Android 2.2+    
iOS 6.0+

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+

**示例:**

```
    //获取id为1的输入框内容
    var params = ["1"];
    uexSecurityKeyboard.getContent(JSON.stringify(params));

    //获取所有输入框中的内容
    uexSecurityKeyboard.getContent();
```

## 2.2、回调方法

> ### cbGetContent 获取输入框中的内容的回调方法

`uexSecurityKeyboard.cbGetContent(param);`

**说明**

获取输入框中的内容的回调方法

**参数**

```
var param = [//输入框数据列表
    {
        id:,
        content:
    }
]
```

各字段含义如下:

| 名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | String | 是 | 唯一标识符,与open方法中的id对应 |
| content | String | 否 | 输入的内容,仅当传入的id标识的输入框已打开的有效 |

**平台支持**

Android 2.2+    
iOS 6.1+ 

**版本支持**

Android 3.0.0+    
iOS 3.0.0+ 

**示例**

```
window.uexOnload=function(type){
    uexSecurityKeyboard.cbGetContent=function(info){
        alert(info);
    }
}
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

API版本:`uexSecurityKeyboard-3.0.2`

最近更新时间:`2016-7-27`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.2 | 新增isScrollWithWeb参数控制是否随网页滚动|
| 3.0.1 | 修复一处与nblistview相冲突的问题 |
| 3.0.0 | 带安全键盘的输入框插件 |

### Android

API版本:`uexSecurityKeyboard-3.0.0`

最近更新时间:`2016-07-27`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.1 | 新增isScrollWithWeb参数控制是否随网页滚动|
| 3.0.0 | 带安全键盘的输入框插件 |
