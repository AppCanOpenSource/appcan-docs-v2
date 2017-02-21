[TOC]
# 1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>
定位插件
## 1.1､说明
定位功能.同时使用GPS,GPRS,WIFI三种方式联合定位,取最先返回值.
## 1.2､UI展示
![](http://newdocx.appcan.cn/docximg/160943n2015l6y16l.jpg)
## 1.3､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=177_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4､平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.
有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.
在后续版本中新添加的接口会在文档中额外说明.

# 2､API概览

## 2.1､方法
### 🍭 openLocation 打开定位功能,监听并返回设备所在地经纬度信息

`uexLocation.openLocation(type,callBackFunction)`

**说明:**

位置信息将通过手机GPS､WIFI或移动网络信号获取.成功打开定位功能时会执行回调方法,成功获取到位置信息时通过[onChange](#onChange 设备位置变化的监听方法 "onChange")回调方法返回,并通过type指定采用何种坐标系返回.

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明                                       |
| ---------------- | -------- | ---- | ---------------------------------------- |
| type             | String   | 否    | 指定坐标系类型,"wgs84":采用世界标准经纬度坐标;"bd09":采用百度地图的经纬度坐标;"gcj02":采用高德地图的经纬度坐标.不传,iOS默认返回高德地图的经纬度坐标,Android默认返回百度地图的经纬度坐标 |
| callBackFunction | Function | 是    | 回调函数,返回打开定位功能是否成功                        |

**回调参数:**

```javascript
var callBackFunction = function(error){
}
```

| 参数名称  | 参数类型   | 是否必选 | 说明                  |
| ----- | ------ | ---- | ------------------- |
| error | Number | 是    | 为0时,打开定位成功;非0时,打开失败 |

**示例:**

```javascript
uexLocation.openLocation("bd09",function(error) {
    if(!error){
      alert("打开成功");
    }else{
      alert("打开失败")
    }
});
```



### 🍭 closeLocation 关闭定位功能

`uexLocation.closeLocation()`

**说明:**

关闭定位功能,不再监听位置信息.

**参数:**

 无

**示例:**

```
    uexLocation.closeLocation();
```

### 🍭 getAddressByType 获取经纬度对应的具体地址信息

`uexLocation.getAddressByType(params, callbackFunction)`

**说明:**
根据经纬度获取对应的地址信息,并通过type指定传入经纬度所采用坐标系类型,执行完成后会回调传入的函数`callbackFunction`

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明                 |
| ---------------- | -------- | ---- | ------------------ |
| params           | Object   | 是    | 接口所需数据             |
| callbackFunction | Function | 是    | 获取地址成功后的回调函数,形式见下: |

```javascript
var params = {
   latitude: ,
   longitude: ,
   type: ,
   flag:
}
```

各字段含义如下:

| 参数名称      | 参数类型   | 是否必选 | 说明                                       |
| --------- | ------ | ---- | ---------------------------------------- |
| latitude  | Number | 是    | 纬度                                       |
| longitude | Number | 是    | 经度                                       |
| type      | String | 否    | 指定传入经纬度所采用坐标系类型,"wgs84":采用世界标准经纬度坐标;"bd09":采用百度地图的经纬度坐标;"gcj02":采用高德地图的经纬度坐标.不传,iOS默认采用世界标准的经纬度坐标,Android默认采用百度地图的经纬度坐标 |
| flag      | Number | 是    | 值为1时返回地址详情(JSON格式), 非 1 时返回地址名称          |

**回调参数:**

```javascript
var callbackFunction = function(error, data){}
```

| 参数名称  | 类型     | 说明                                       |
| ----- | ------ | ---------------------------------------- |
| error | Number | 0表示获取成功,非0表示获取失败                         |
| data  | Json   | 获取成功时的具体地址信息,flag非1时,返回地址名称字符串;为1时,返回Json对象,形式见下: |

```javascript
var data = {
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



**示例:**

```javascript
    var callbackFunction = function (error, data) {
      if(!error){
        alert(JSON.stringify(data));
      }else{
        alert(error);
      }
    }
    var params = {
            latitude: 30.475798,
            longitude: 114.402815,
            type:"gcj02",
            flag:2
    };
    uexLocation.getAddressByType(params,callbackFunction);
```

### 🍭 convertLocation 转换坐标的方法

`var data = uexLocation.convertLocation(params);`

**说明:**

通过此方法转换坐标,支持同步返回.

**参数:**

| 参数名称   | 参数类型 | 是否必选 | 说明         |
| ------ | ---- | ---- | ---------- |
| params | Json | 是    | 相关数据,形式见下: |

```
var params ={
    latitude:,
    longitude:,
    from:,
    to:
}
```
各字段含义如下:

| 参数名称      | 参数类型   | 是否必选 | 说明                        |
| --------- | ------ | ---- | ------------------------- |
| latitude  | Number | 是    | 纬度                        |
| longitude | Number | 是    | 经度                        |
| from      | String | 是    | 源坐标类型,具体含义请参考[附录](#4､附录)  |
| to        | String | 是    | 目的坐标类型,具体含义请参考[附录](#4､附录) |

**返回值:**

Json对象,表示转换完成后的位置信息,形式如下:

```
var data = {
    latitude:,
    longitude:
}
```

**示例:**

```javascript
var params = {
     latitude:30.595997,
     longitude:114.312047,
     from:"wgs84",
     to:"bd09"
 };
var data = uexLocation.convertLocation(JSON.stringify(params));
var obj = JSON.parse(data);
alert(obj.latitude+","+obj.longitude);//同步返回json字符串
//alert(data);                  
```


## 2.2､监听方法
### 🍭 onChange 设备位置变化的监听方法

  uexLocation.onChange(lat, log)

**参数:**


| 参数名称 | 参数类型   | 是否必选 | 说明   |
| ---- | ------ | ---- | ---- |
| lat  | Number | 是    | 纬度   |
| log  | Number | 是    | 经度   |


**示例:**
```
    uexLocation.onChange = function(lat, log){
        alert(lat + "," + log);
    }
```

# 3､更新历史

### iOS

API版本: `uexLocation-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 定位插件 |

### Android

API版本: `uexLocation-4.0.2`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.2 | 提高定位服务的存活率 |
| 4.0.1 | 更换AppKey |
| 4.0.0 | 定位功能插件 |

# 4､附录

| String | 说明                                       |
| ------ | ---------------------------------------- |
| wgs84  | GPS设备获取的角度坐标,世界标准地理坐标                    |
| bd09   | 百度地图采用的经纬度坐标                             |
| gcj02  | 高德地图､google地图､soso地图､aliyun地图､mapabc地图和amap地图所用坐标,中国国测局地理坐标 |
