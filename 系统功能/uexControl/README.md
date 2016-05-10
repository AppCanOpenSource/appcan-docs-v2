[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
日期选择器插件
## 1.1、说明
 得到日期和时间
## 1.2、UI展示
 
 ![](http://newdocx.appcan.cn/docximg/152401w2015b6c7f.jpg)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=162_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
# 2、API概览
## 2.1、方法

> ### openDatePicker 打开日期选择器

`uexControl.openDatePicker(year,month,day)`

**说明:**

打开日期选择器 回调方法[cbOpenDatePicker](#cbOpenDatePicker 获取日期的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| year | Number | 是 | 年 |
| month | Number | 是 | 月 |
| day | Number | 是 | 日 |

**支持平台:**
Android2.2+
iOS6.0+

**版本支持:**

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
| ----- | ----- | ----- | ----- |
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

**说明:**

打开输入对话框 回调方法[cbOpenInputDialog](#cbOpenInputDialog 输入对话框的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| type | Number | 是 | 键盘类型,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Keyboard Types "CONSTANT")中KeyboardTypes |
| inputHint | String | 是 | 默认数据 |
|btnText | String | 是 | 输入框按钮上标题 |

**支持平台:**
Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexControl.openInputDialog(0,"默认数据","按钮")
```

> ### openDatePickerWithoutDay 打开只有年月的日期选择器

`uexControl.openDatePickerWithoutDay(year,month)`

**说明:**

打开日期选择器 回调方法[cbOpenDatePickerWithoutDay](#cbOpenDatePickerWithoutDay 打开只有年月的日期选择器的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| year | Number | 是 | 年 |
| month | Number | 是 | 月 |

**支持平台:**
Android3.0+    
iOS6.0+

**版本支持:**

Android 3.0.4+    
iOS 3.0.8+

**示例:**

```
uexControl.openDatePickerWithoutDay(1990,8);
```

> ### openDatePickerWithConfig 打开带配置的日期选择器

`uexControl.openDatePickerWithConfig(params)`

**说明:**

打开带配置的日期选择器
回调方法[cbOpenDatePickerWithConfig](#cbOpenDatePickerWithConfig 打开带配置的日期选择器的回调方法)
监听方法[onError](#onError 参数传递错误时的监听方法)

**参数:**

```
var params = {
    datePickerId:,
    initDate:{
        year:,
        month:,
        day:
    },
    minDate:{
        limitType:,
        data:{
            year:,
            month:,
            day:
        }
    },
    maxDate:{
        limitType:,
        data:{
            year:,
            month:,
            day:
        }
    }
}
```
各字段含义如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| datePickerId | String | 是 | 日期选择器唯一标识符 |
| initDate | Json | 否 | 初始化日期,默认为当前日期 |
| minDate | Json | 否 | 最小日期值 |
| maxDate | Json | 否 | 最大日期值 |
| limitType | Number | 是 | 限制方式,0-表示具体日期限制,此种方式年月日参数必选；1-表示相对于初始化日期的前后天数,月数或年数,此种方式年月日参数有且只有一个有效,有效的优先级为日>月>年。具体用法请参考示例。 |
| data | Json | 是 | 限制数据 |
| year | Number | 是 | 年,当limitType为0时,必传,表示具体年份。当limitType为1时,可选(但年,月,日有且只有一个有效)表示相对于初始化日期中年的相对值x,负数表示小于初始化年份x年,正数表示大于初始化年份x年 |
| month | Number | 是 | 月,当limitType为0时,必传,表示具体月份。当limitType为1时,可选(但年,月,日有且只有一个有效)表示相对于初始化日期中月的相对值x,负数表示小于初始化月份x月,正数表示大于初始化月份x月 | 
| day | Number | 是 | 日,当limitType为0时,必传,表示具体日期。当limitType为1时,可选(但年,月,日有且只有一个有效)表示相对于初始化日期中日的相对值x,负数表示小于初始化日期x天,正数表示大于初始化日期x天 | 

**支持平台:**

Android3.0+    

**版本支持:**

Android 3.0.6+    

**示例:**

示例1、通过具体日期限制日期范围:
```
        var params = {
            datePickerId:1,
            initDate:{
                year:2016,
                month:3,
                day:4
            },
            minDate:{
                limitType:0,
                data:{
                    year:2013,
                    month:12,
                    day:23
                }
            },
            maxDate:{
                limitType:0,
                data:{
                    year:2016,
                    month:3,
                    day:8
                }
            }
        }
        var data = JSON.stringify(params);
        uexControl.openDatePickerWithConfig(data);
```

示例2、通过相对日期限制日期范围:
```
        var params = {
            datePickerId:1,
            initDate:{
                year:2016,
                month:3,
                day:4
            },
            minDate:{
                limitType:1,
                data:{
                    day:-3
                }
            },
            maxDate:{
                limitType:1,
                data:{
                    month:1
                }
            }
        }
        var data = JSON.stringify(params);
        uexControl.openDatePickerWithConfig(data);
```

示例3、单范围限制,即只限制最大日期:
```
        var params = {
            datePickerId:1,
            initDate:{
                year:2016,
                month:3,
                day:4
            },
            maxDate:{
                limitType:1,
                data:{
                    month:1
                }
            }
        }
        var data = JSON.stringify(params);
        uexControl.openDatePickerWithConfig(data);
```

## 2.2、回调方法

> ### cbOpenDatePicker 获取日期的回调方法

`uexControl.cbOpenDatePicker(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType| Number | 是 | 参数类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback方法数据类型 |
| data | String | 是 | 选择的日期,格式为:{"month":10,"second":0,"day":19,"year":1900,"hour":0,"minute":0} | 

 各字段含义如下:

|参数|是否必须|说明|
|-----|-----|-----|
|year|是|年|
|month|是|月|
|day|是|日|
|hour|是|时|
|minute|是|分|
|second|是|秒|

**版本支持:**

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
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType| Number | 是 | 参数类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback方法数据类型 |
| data | String | 是 | 选择的日期,格式为:{"month":10,"second":0,"day":19,"year":1900,"hour":0,"minute":0} |

|参数|是否必须|说明|
|-----|-----|-----|
|year|是|年|
|month|是|月|
|day|是|日|
|hour|是|时|
|minute|是|分|
|second|是|秒|

**版本支持:**

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
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType| Number | 是 | 参数类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback方法数据类型 |
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
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType| Number | 是 | 参数类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback方法数据类型 |
| data | String | 是 | 选择的日期,格式为:{"year":1900,"month":10} |

|参数|是否必须|说明|
|-----|-----|-----|
|year|是|年|
|month|是|月|

**支持平台:**
Android2.2+    
iOS6.0+

**版本支持:**

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

> ### cbOpenDatePickerWithConfig 打开带配置的日期选择器的回调方法

`uexControl.cbOpenDatePickerWithConfig(data)`

**参数:**

```
var data = {
    datePickerId:,
    year:,
    month:,
    day:
}
```

各字段含义如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| datePickerId | String | 是 | 日期选择器的唯一标识符 |
| year| Number | 是 | 年 |
| month | Number | 是 | 月 |
| day | Number | 是 | 日 |

**支持平台:**
Android3.0+    
iOS6.0+

**版本支持:**

Android 3.0.6+    
iOS 3.0.12+

**示例:**

```
function cbOpenDatePickerWithConfig(data) {
    alert(data);
}
window.uexOnload = function(){
    uexControl.cbOpenDatePickerWithConfig = cbOpenDatePickerWithConfig;
}
```

## 2.3、监听方法

> ### onError 参数传递错误时的监听方法

`uexControl.onError(data)`

**参数:**

```
var data = {
    errorCode:
}
```

各字段含义如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| errorCode | Number | 是 | 错误码,详情请参考附录[onError](#onError) |

**支持平台:**
Android3.0+    
iOS6.0+

**版本支持:**

Android 3.0.6+    
iOS 3.0.12+

**示例:**

```
function onError(data) {
    alert(data);
}
window.uexOnload = function(){
    uexControl.onError = onError;
}
```

# 3、更新历史

### iOS

API版本:`uexControl-3.0.16`

最近更新时间:`2016-3-23`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.16 | 对3.3引擎下非string参数造成闪退的情况进行了处理 |
| 3.0.15 | 修改无法打开带配置的日期选择器的BUG |
| 3.0.14 | 添加IDE支持 |
| 3.0.13 | 删除info.plist |
| 3.0.12 | 添加国际化支持 |
| 3.0.11 | 插件现在支持iPad |
| 3.0.10 | 修复doRotate时的崩溃问题 |
| 3.0.9 | 新增一个接口 允许设置取消按钮和确认按钮的标题字体颜色 |
| 3.0.8 | 新增接口openDatePickerWithoutDay,打开只有年月的日历选择器 |
| 3.0.7 | uexControl插件适配iphone6和6 |
| 3.0.6 | 同一时间只允许打开一个picker |
| 3.0.5 | uexControl插件和安卓统一 |
| 3.0.4 | 修复uexControl.openTimePicker方法调不起的bug |
| 3.0.3 | 修复错误使用时的崩溃问题 |
| 3.0.2 | 彻底修复输入框被键盘遮挡 |
| 3.0.1 | 修复输入框被键盘遮挡 |
| 3.0.0 | 时间日期选择功能插件 |

### Android

API版本:`uexControl-3.0.7`

最近更新时间:`2016-3-2`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.7 | 修复日期不在范围内时,点击"确定"按钮能获取日期的问题 |
| 3.0.6 | 6:修复华为手机上输入日期不生效的问题;新增openDatePickerWithConfig可配置日期范围的日期选择器接口。 |
| 3.0.5 | 在openInputDialog接口中添加参数 |
| 3.0.4 | 新增接口openDatePickerWithoutDay,打开只有年月的日历选择器 |
| 3.0.3 | 修改不显示当前日期问题 |
| 3.0.2 | 增加弹出输入框输入完成的回调方法cbOpenInputDialog |
| 3.0.1 | 修改魅族手机点击日期和软键盘同时弹出问题 |
| 3.0.0 | 时间日期选择功能插件 |
# 4、附录

### onError
|  errorCode | 说明 |
| ----- | ----- |
| -1 | 无参数错误 |
| -2 | 最小日期参数错误 |
| -3 | 最小日期大于初始化日期错误 |
| -4 | 最大日期参数错误 |
| -5 | 最大日期大于初始化日期错误 |

