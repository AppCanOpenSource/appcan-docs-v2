[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
日期选择器插件
## 1.1、说明
 得到日期和时间
## 1.2、UI展示
 
 ![](http://newdocx.appcan.cn/docximg/152401w2015b6c7f.jpg)
## 1.3、开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=162_index) 插件中心至插件详情页 （插件测试用例与插件源码已经提供）
#2、API概览
##2.1、方法

> ### openDatePicker 打开日期选择器

`uexControl.openDatePicker(year,month,day)`
**说明：**
打开日期选择器 回调方法[cbOpenDatePicker](#cbOpenDatePicker 获取日期的回调方法)
** 参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| year | Number | 是 | 年 |
| month | Number | 是 | 月 |
| day | Number | 是 | 日 |

** 支持平台:**
Android2.2+
iOS6.0+
**版本支持：**
3.0.0+
**示例:**
```
uexControl.openDatePicker(1990,8,1);
```

> ### openTimePicker 打开时间选择器

`uexControl.openTimePicker(hour,minute)`
**说明:**
打开时间选择器 回调方法[cbOpenTimePicker](#cbOpenTimePicker 获取时间的回调方法)
**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| hour | Number | 是 | 小时 |
| minute | Number | 是 | 分钟 |

**支持平台:**
Android2.2+
iOS6.0+
**版本支持:**
3.0.0+
**示例:**
```
uexControl.openTimePicker(10,23);
```

> ### openInputDialog 打开输入对话框

`uexControl.openInputDialog(type,inputHint,btnText)`
**说明：**
打开输入对话框 回调方法[cbOpenInputDialog](#cbOpenInputDialog 输入对话框的回调方法)
**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| type | Number | 是 | 键盘类型，详见CONSTANT中KeyboardTypes |
| inputHint | String | 是 | 默认数据 |
|btnText | String | 是 | 输入框按钮上标题 |

**支持平台:**
Android2.2+
iOS6.0+
**版本支持:**
3.0.0+
**示例:**

```
uexControl.openInputDialog(0,"默认数据",“按钮”)
```


> ### openDatePickerWithoutDay 打开只有年月的日期选择器

`uexControl.openDatePickerWithoutDay(year,month)`

**说明：**
打开日期选择器 回调方法[cbOpenDatePickerWithoutDay](#cbOpenDatePickerWithoutDay 打开只有年月的日期选择器的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| year | Number | 是 | 年 |
| month | Number | 是 | 月 |

**支持平台:**
Android2.2+    
iOS6.0+

**版本支持：**
Android 3.0.4+    
iOS 3.0.8+

**示例:**
```
uexControl.openDatePickerWithoutDay(1990,8);
```

## 2.2、回调方法

> ### cbOpenDatePicker 获取日期的回调方法

`uexControl.cbOpenDatePicker(opId,dataType,data)`
**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | Number | 是 |  操作ID，在此函数中不起作用，可忽略 |
| dataType| Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | String | 是 | 选择的日期，格式为：{"month":10,"second":0,"day":19,"year":1900,"hour":0,"minute":0} | 

 各字段含义如下:

|参数|是否必须|说明|
|-----|-----|-----|
|year|是|年|
|month|是|月|
|day|是|日|
|hour|是|时|
|minute|是|分|
|second|是|秒|
**版本支持：**
3.0.0+
**示例:**

```
function cbOpenDatePicker(opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexControl.cbOpenDatePicker = cbOpenDatePicker;
}
```

> ### cbOpenTimePicker 获取时间的回调方法

`uexControl.cbOpenTimePicker(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | Number | 是 |  操作ID，在此函数中不起作用，可忽略 |
| dataType| Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | String | 是 | 选择的日期，格式为：{"month":10,"second":0,"day":19,"year":1900,"hour":0,"minute":0} |

|参数|是否必须|说明|
|-----|-----|-----|
|year|是|年|
|month|是|月|
|day|是|日|
|hour|是|时|
|minute|是|分|
|second|是|秒|

**版本支持：**
3.0.0+

**示例:**

```
function cbOpenTimePicker(opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexControl.cbOpenTimePicker = cbOpenTimePicker;
}
```

> ### cbOpenInputDialog 输入对话框的回调方法

`uexControl.cbOpenInputDialog(opId,dataType.data)`
**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | Number | 是 |  操作ID，在此函数中不起作用，可忽略 |
| dataType| Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | String | 是 | 文字内容 | 

**版本支持:**
3.0.0+
**示例:**

```
function cbOpenInputDialog(opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexControl.cbOpenInputDialog = cbOpenInputDialog;
}
```


> ### cbOpenDatePickerWithoutDay 打开只有年月的日期选择器的回调方法

`uexControl.cbOpenDatePickerWithoutDay(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | Number | 是 |  操作ID，在此函数中不起作用，可忽略 |
| dataType| Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | String | 是 | 选择的日期，格式为：{"year":1900,"month":10} |

|参数|是否必须|说明|
|-----|-----|-----|
|year|是|年|
|month|是|月|

**支持平台:**
Android2.2+    
iOS6.0+

**版本支持：**
Android 3.0.4+
iOS 3.0.8+

**示例:**

```
function cbOpenDatePickerWithoutDay(opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexControl.cbOpenDatePickerWithoutDay = cbOpenDatePickerWithoutDay;
}
```

#3、更新历史
API 版本：uexControl-3.0.8(iOS) uexControl-3.0.5（Android）
最近更新时间：2015-06-19

|  历史发布版本 | iOS更新  | 安卓更新  |
| ------------ | ------------ | ------------ |
| 3.0.8  | 新增接口openDatePickerWithoutDay，打开只有年月的日历选择器  |    |
| 3.0.7  |  uexControl插件适配iphone6和6 |   |
| 3.0.6  | 同一时间只允许打开一个picker  |   |
| 3.0.5  | uexControl插件和安卓统一  | 在openInputDialog接口中添加参数  |
| 3.0.4 | 修复uexControl.openTimePicker方法调不起的bug  | 新增接口openDatePickerWithoutDay，打开只有年月的日历选择器   |
| 3.0.3  |  修复错误使用时的崩溃问题 | 修改不显示当前日期问题  |
| 3.0.2  | 彻底修复输入框被键盘遮挡  | 增加弹出输入框输入完成的回调方法cbOpenInputDialog  |
| 3.0.1  | 修复输入框被键盘遮挡 | 修改魅族手机点击日期和软键盘同时弹出问题|
| 3.0.0  | 时间日期选择功能插件  | 时间日期选择功能插件|
