[TOC]

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
设备信息插件

## 1.1、说明
 本类封装了设备硬件参数相关信息和硬件状态相关信息。

## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/104339w2015d6d16t.jpg)

## 1.3、开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=167_index) 插件中心至插件详情页 （插件测试用例与插件源码已经提供）

# 2、API概览

## 2.1、方法

> ### vibrate 开启设备震动

`uexDevice.vibrate(milliseconds)`

**说明:**
开启设备震动，iOS平台中，ipad，ipod不支持震动。

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| milliseconds | Number | 是 | 震动持续时长，单位毫秒 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
    uexDevice.vibrate(500);
```

> ### cancelVibrate 关闭设备震动

`uexDevice.cancelVibrate()`

**说明:**
关闭设备震动

**参数:**
  无

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
    uexDevice.cancelVibrate();
```

> ### getInfo 获取设备信息

`uexDevice.getInfo(infoID)`

**说明:**
获取设备信息,回调方法[cbGetInfo](#cbGetInfo 获取设备信息的回调方法 "cbGetInfo")

** 参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| infoID | Number | 是 | 设备信息类型，详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975 "CONSTANT")中设备信息类型。 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
    uexDevice.getInfo('1');//获取系统版本
```

## 2.2、回调方法

> ### cbGetInfo 获取设备信息的回调方法

`uexDevice.cbGetInfo(opId,dataType,data)`

** 参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | Number | 是 | 操作ID，在此函数中不起作用，可忽略 |
| dataType | Number | 是 | 数据类型，详见[CONSTENT](http://newdocx.appcan.cn/newdocx/docx?type=978_975 "CONSTENT")中Callback方法数据类型 |
| data | String | 是 | 返回设备的相关信息，json格式数据，参数说明详见[CONSTAN](http://newdocx.appcan.cn/newdocx/docx?type=978_975 "CONSTAN")T中设备信息类型 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
    uexDevice.cbGetInfo=function (opCode,dataType,data){
        alert(data);
    };
```

## 2.3、监听方法

> ### onOrientationChange 屏幕旋转的监听方法

`uexDevice.onOrientationChange(mode)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| mode | Number | 是 | 屏幕方向，1-正竖屏；2-左横屏；4-倒竖屏；8-右横屏。 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:** 

```
    uexDevice.onOrientationChange = function(mode){
        if(mode == 1){
            alert("正竖屏");
        }else if(mode == 2){
            alert("左横屏");
        }else if(mode == 4){
            alert("倒竖屏");
        }else if(mode == 8){
            alert("右横屏");
        }
    };
```

# 3、更新历史
API 版本：uexDevice-3.0.2(iOS) uexDevice-3.0.0（Android）
最近更新时间：2015-06-19

|  历史发布版本 | iOS更新  | 安卓更新  |
| ------------ | ------------ | ------------ |
| 3.0.2  |  支持获取4G网络状态 |   |
| 3.0.1  | 修复在不显示状态栏时无法获取当前网络状态的bug  | |
| 3.0.0  | 设备能力功能插件  | 设备能力功能插件|
