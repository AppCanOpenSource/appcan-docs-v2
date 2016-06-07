[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
定位插件
## 1.1、说明
定位功能。同时使用GPS,GPRS,WIFI三种方式联合定位,取最先返回值。
## 1.2、UI展示
![](http://newdocx.appcan.cn/docximg/160943n2015l6y16l.jpg)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=177_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。
有特殊版本要求的API会在文档中额外说明。

## 1.5、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用。
在后续版本中新添加的接口会在文档中额外说明。

# 2、API概览

## 2.1、方法
> ### openLocation 打开定位功能,监听并返回设备所在地经纬度信息

`uexLocation.openLocation(callBackFunction)`

**说明:**

位置信息将通过手机GPS、WIFI或移动网络信号获取。成功打开定位功能时会执行回调方法,成功获取到位置信息时通过[onChange](#onChange 设备位置变化的监听方法 "onChange")回调方法返回。

**参数:**

 无

**示例:**

```
uexLocation.openLocation(function(data) {
    alert(data); //data值为  0: 成功  1: 失败
});
```



> ### closeLocation 关闭定位功能

`uexLocation.closeLocation()`

**说明:**

关闭定位功能,不再监听位置信息。

**参数:**

 无

**示例:**

```
    uexLocation.closeLocation();
```

> ### getAddress 获取经纬度对应的具体地址信息

`uexLocation.getAddress(inLatitude,inLongitude,flag, callbackFunction)`

** 说明:**
根据经纬度获取对应的地址信息，执行完成后会回调传入的函数`callbackFunction`

**参数:**


|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| inLatitude | Number | 是 | 纬度 |
| inLongitude | Number | 是 | 经度 |
| flag | Number | 是 | 返回地址类型,默认是地址名称。值为1时返回地址详情(JSON格式)|
|callbackFunction|Function|是| 获取地址成功后的回调函数|

回调函数中返回的数据是JSON对象(如果出错会返回ErrorCode)，格式如下:

```
{
    "formatted_address": "北京市海淀区海淀中街15号",
    "location": {
        "lat": 39.983197,
        "lng": 116.317383
    },
    "addressComponent": {
        "province": "北京市",
        "street_number": "15号",
        "district": "海淀区",
        "street": "海淀中街",
        "city": "北京市"
    }
}
```

**  示例:**

```
    var callbackFunction = function (data) {
      alert(JSON.stringify(data));
    }
    uexLocation.getAddress("30.475798", "114.402815"，1，callbackFunction);
```

> ### convertLocation 转换坐标的方法

`var data = uexLocation.convertLocation(params);`

**说明:**

通过此方法转换坐标,支持同步返回。

**参数:**

```
var params ={
    latitude:,
    longitude:,
    from:,
    to:
}
```
```
同步返回结果:
data = {
    latitude:,
    longitude:
}
```

各字段含义如下:

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|  latitude   | Number | 是 |  纬度|
| longitude    | Number | 是 | 经度 |
| from | String | 是 | 源坐标类型,具体含义请参考[附录](#4、附录)|
| to | String | 是 | 目的坐标类型,具体含义请参考[附录](#4、附录)|

**示例:**

```
var params = {
     latitude:30.595997,
     longitude:114.312047,
     from:"wgs84",
     to:"bd09"
 };
var data = uexLocation.convertLocation(JSON.stringify(params));
var obj = JSON.parse(data)
alert(obj.latitude+","+obj.longitude);//同步返回json字符串
//alert(data);                  
```


## 2.2、监听方法
> ### onChange 设备位置变化的监听方法

  uexLocation.onChange(lat, log)

**参数:**


|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| lat| Number| 是 |  纬度 |
| log|Number | 是 | 经度 |


**  示例:**
```
    uexLocation.onChange = function(lat, log){
        alert(lat + "," + log);
    }
```

# 3、更新历史

### iOS

API版本:`uexLocation-4.0.0`

最近更新时间:`2016-6-6`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持function传入 |
| 3.0.26 | 新增坐标转换接口 |
| 3.0.25 | 修复3.3引擎下的参数问题;修复用户未决定是否支持定位时会回调可以定位的问题 |
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

API版本:`uexLocation-4.0.0`

最近更新时间:`2016-6-6`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持function传入 |
| 3.0.8 | 新增坐标系转换接口,支持wgs84,gcj02,bd09格式相互转换 |
| 3.0.7 | 修复bug支持后台定位插件 |
| 3.0.6 | sdk升级 |
| 3.0.5 | 修复getAddress方法flag为1时返回json格式不 正确的问题 |
| 3.0.4 | 移动插件包中的定位jar包和so文件至引擎中 |
| 3.0.3 | 新增getAddress接口参数 |
| 3.0.2 | 修改uexLocation不能在关闭gprs 和wifi的 时候使用gps 获取坐标 |
| 3.0.1 | 修改配置文件兼容IDE |
| 3.0.0 | 定位功能插件 |
# 4、附录

|  String | 说明  |
| ----- | ----- |
| wgs84 | GPS设备获取的角度坐标,世界标准地理坐标 |
| bd09 | 百度地图采用的经纬度坐标 |
| gcj02 | google地图、soso地图、aliyun地图、mapabc地图和amap地图所用坐标,中国国测局地理坐标 |
