/*
Sort: 1
Toc: 1
*/

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() <ignore>

带安全键盘的输入框插件

## 1.1、说明<ignore>

创建一个带安全键盘的输入框插件,提供纯数字键盘,数字、字母和符号可切换的键盘,同时输入框位置、键盘描述信息可以定制,具体见下面.

## 1.2、UI展示<ignore>

![纯数字键盘](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexSecurityKeyboard/ScreenShoot/1.png) ![可切换字母键盘](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexSecurityKeyboard/ScreenShoot/2.png)
![可切换数字键盘](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexSecurityKeyboard/ScreenShoot/3.png) ![可切换符号键盘](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexSecurityKeyboard/ScreenShoot/4.png)

## 1.3、开源源码<ignore>

插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4、平台版本支持<ignore>

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性<ignore>

本插件所有API默认在插件版本**4.0.0+**可用.
# 2、API概览<ignore>

## 2.1、方法<ignore>

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
         "isScrollWithWeb":
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
| isScrollWithWeb     | bool   | 否    | 是否随网页滚动,默认为false                         |

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
        "isScrollWithWeb":true
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


# 3、附录<ignore>

### KeyboardType<ignore>

| value | 描述            |
| ----- | ------------- |
| 0     | 纯数字键盘,不可切换    |
| 1     | 数字、字母、符号可切换键盘 |
| 2     | 系统默认键盘        |

# 4、更新历史<ignore>

### iOS<ignore>

API版本: `uexSecurityKeyboard-4.0.0`

最近更新时间:`2016-07-29`

| 历史发布版本 | 更新内容         |
| ------ | ------------ |

### Android<ignore>

API版本: `uexSecurityKeyboard-4.0.0`

最近更新时间:`2016-07-29`

| 历史发布版本 | 更新内容         |
| ------ | ------------ |
