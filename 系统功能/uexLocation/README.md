[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
定位插件
## 1.1、说明
定位功能。同时使用GPS,GPRS,WIFI三种方式联合定位,取最先返回值。
## 1.2、UI展示
![](http://newdocx.appcan.cn/docximg/160943n2015l6y16l.jpg)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=177_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法
> ### openLocation 打开定位功能,监听并返回设备所在地经纬度信息

`uexLocation.openLocation()`

**说明:**

位置信息将通过手机GPS、WIFI或移动网络信号获取。成功打开定位功能时回调[cbOpenLocation](#cbOpenLocation 定位功能是否成功打开的回调方法 "cbOpenLocation")方法,成功获取到位置信息时通过[onChange](#onChange 设备位置变化的监听方法 "onChange")回调方法返回。

**参数:**

 无

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexLocation.openLocation();
```

> ### closeLocation 关闭定位功能

`uexLocation.closeLocation()`

**说明:**

关闭定位功能,不再监听位置信息。

**参数:**

 无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    uexLocation.closeLocation();
```

> ### getAddress 获取经纬度对应的具体地址信息

`uexLocation.getAddress(inLatitude,inLongitude,flag)`

** 说明:**
根据经纬度获取对应的地址信息
回调 [cbGetAddress](#cbGetAddress 获取到位置信息返回经纬度数据的回调方法 "cbGetAddress")

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| inLatitude | Number | 是 | 纬度 |
| inLongitude | Number | 是 | 经度 |
| flag | Number | 否 | 返回地址类型,默认是地址名称。值为1时返回地址详情(JSON格式),|
````
格式如下: {"formatted_address":"北京市海淀区海淀中街15号","location":{"lat":39.983197,"lng":116.317383},"addressComponent":{"province":"北京市","street_number":"15号","district":"海淀区","street":"海淀中街","city":"北京市"}} 
````

**平台支持:**

Android2.2+
iOS6.0+

** 版本支持:**
3.0.0+

**  示例:**

```
    uexLocation.getAddress("30.475798", "114.402815");
```

## 2.2、回调方法
> ### cbOpenLocation 定位功能是否成功打开的回调方法

`uexLocation.cbOpenLocation(opId, dataType, data)`

** 参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number| 是 | 操作ID,在此函数中不起作用,可忽略 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|Number | 是 | 返回uex.cSuccess或uex.cFailed,详见CONTANT中CallbackInt类型数据 |
 

**平台支持:**

Android2.2+
iOS6.0+

** 版本支持:**
3.0.0+

**  示例:**
```
    uexLocation.cbOpenLocation = function(opCode, dataType, data){
        alert(opCode + "," + dataType + "," + data);
    }
```

> ### cbGetAddress 获取到位置信息返回经纬度数据的回调方法

`uexLocation.cbGetAddress(opCode,dataType,data)`

** 参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number| 是 | 操作ID,在此函数中不起作用,可忽略 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|String | 是 | 返回获取的地址或者错误信息ErrorCode。|
 

**平台支持:**

Android2.2+
iOS6.0+

**  版本支持:**
3.0.0+

**  示例:**
```
    uexLocation.cbGetAddress = function(opCode, dataType, data){
        alert(opCode + "," + dataType + "," + data);
    }
```

## 2.3、监听方法
> ### onChange 设备位置变化的监听方法

  uexLocation.onChange(lat, log)

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| lat| Number| 是 |  纬度 |
| log|Number | 是 | 经度 |
 

**平台支持:**

Android2.2+
iOS6.0+

**  版本支持:**
3.0.0+

**  示例:**
```
    uexLocation.onChange = function(lat, log){
        alert(lat + "," + log);
    }
```

# 3、更新历史

### iOS

API版本:`uexLocation-3.0.24`

最近更新时间:`2016-3-9`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.24 | 修改定位权限,支持后台定位 |
| 3.0.23 | 添加IDE支持 |
| 3.0.22 | 更改为ARC工程 |
| 3.0.21 | 删除info.plist |
| 3.0.20 | 添加国际化支持 |
| 3.0.19 | 修复点击返回按钮应用闪退的问题 |
| 3.0.18 | 防止数组越界 |
| 3.0.17 | 修复定位过程中出现的崩溃问题 |
| 3.0.16 | 设备未开启定位服务时,跳转到系统 的定位设置页面 |
| 3.0.15 | 定位模式更改为NSLocationWhenIn UseUsageDescription |
| 3.0.14 | 修改plugin.xml文件 |
| 3.0.13 | 修复city字段获取不到的BUG |
| 3.0.12 | 增加getBaiduFromGoogle接口以 及修改返回地址的json格式 |
| 3.0.11 | 修改返回地址的格式 |
| 3.0.10 | 修复在iOS5上获取地址失败的bug |
| 3.0.9 | 返回的json格式地址与Android保持统一 |
| 3.0.8 | 修复uexLocation定位闪退 |
| 3.0.7 | 添加定位所需要的plist文件 |
| 3.0.6 | 支持iOS8.0定位 |
| 3.0.5 | 支持iOS6.0以下版本 |
| 3.0.4 | 添加json格式地址的参数 |
| 3.0.3 | 重写uexLocation定位功能 |
| 3.0.2 | 重写uexLocation定位功能 |
| 3.0.1 | 修复经纬度反向解析地址时,无法获取地址的BUG |
| 3.0.0 | 获取当前定位和地址功能插件 |

### Android

API版本:`uexLocation-3.0.6`

最近更新时间:`2015-12-07`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.6 | sdk升级 |
| 3.0.5 | 修复getAddress方法flag为1时返回json格式不 正确的问题 |
| 3.0.4 | 移动插件包中的定位jar包和so文件至引擎中 |
| 3.0.3 | 新增getAddress接口参数 |
| 3.0.2 | 修改uexLocation不能在关闭gprs 和wifi的 时候使用gps 获取坐标 |
| 3.0.1 | 修改配置文件兼容IDE |
| 3.0.0 | 定位功能插件 |
