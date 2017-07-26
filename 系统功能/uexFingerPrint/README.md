
[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
指纹识别插件

## 1.1、说明
指纹识别插件，识别系统设置中的指纹并返回识别结果。

* 仅支持Android


## 1.2、UI展示


## 1.3、开源源码
插件测试用例与源码下载:[点击](https://github.com/android-plugin/uexFingerPrint) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持
本插件的所有API默认支持**Android6.0+**操作系统. 
有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明. 

#    2、API概览

##  2.1. 方法

###   🍭  init 插件初始化

`uexFingerPrint.init(callbackFunction)    `

**说明:**

使用插件之前，必须先调用此接口，初始化指纹识别功能，若初始化失败则不能进行指纹识别操作。


**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明   |
| ---------------- | -------- | ---- | ---- |
| callbackFunction | Function | 是    | 回调方法 |

**回调参数:**

```javascript
var callbackFunction=function(error,data){}
```

| 参数名称  | 参数类型   | 说明                                       |
| ----- | ------ | ---------------------------------------- |
| error | Number | 0表示成功,其他表示失败时的错误码，详情请参考[ErrorCode](#ErrorCode) |
| data  | String | 失败时的错误信息                                 |


**示例:**

```javascript
uexFingerPrint.init(function(error, data){
    if(!error){
        alert("init success!");
    }else{
        alert("init failed:" + data);
    }
});
```

###   🍭  authenticate 指纹识别

`uexFingerPrint.authenticate(params,callbackFunction)    `

**说明:**

调用该接口前，必须先调用init接口。


**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明                 |
| ---------------- | -------- | ---- | ------------------ |
| params           | Object   | 否    | 指纹识别相关参数，json格式如下： |
| callbackFunction | Function | 是    | 回调方法               |

```javascript
var params = {
    maxTries:
}
```
各字段含义如下:

| 字段名称     | 类型     | 是否必选 | 说明              |
| -------- | ------ | ---- | --------------- |
| maxTries | Number | 否    | 指纹识别最大尝试次数，默认为3 |

**回调参数:**

```javascript
var callbackFunction=function(error,data){}
```

| 参数名称  | 参数类型   | 说明                                       |
| ----- | ------ | ---------------------------------------- |
| error | Number | 0表示成功,其他表示失败时的错误码，详情请参考[ErrorCode](#ErrorCode) |
| data  | String | 失败时的错误信息                                 |


**示例:**

```javascript
alert("请验证指纹......");
var params = {
    maxTries:4
};
uexFingerPrint.authenticate(params,function(error, data){
    if(!error){
        alert("authenticate success!");
    }else{
        if(error == 5){//指纹不匹配，可继续验证
			alert(data);
			alert("请继续验证指纹......");
        }else{//验证失败，次数达上限，或者其他错误
			alert("authenticate failed:" + data);
        }
    }
});
```

# 3、附录

### ErrorCode

| ErrorCode | 描述                  |
| --------- | ------------------- |
| 0         | 初始化成功或者指纹识别成功       |
| -1        | 指纹识别接口回调，识别失败，未知错误  |
| 1         | 初始化接口回调，设备硬件不支持指纹识别 |
| 2         | 初始化接口回调，未注册指纹       |
| 3         | 初始化接口回调，指纹识别不可用     |
| 4         | 指纹识别接口回调，未初始化       |
| 5         | 指纹识别接口回调，指纹不匹配      |

# 4、更新历史

### Android

API版本:`uexFingerPrint-4.0.0`

最近更新时间:`2017-06-14`

| 历史发布版本 | 更新内容   |
| ------ | ------ |
| 4.0.0  | 指纹识别插件 |

