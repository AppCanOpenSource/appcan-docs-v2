[TOC]

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
蓝牙BLE插件

## 1.1、说明
蓝牙BLE插件。
iOS 后台蓝牙功能须知
* iOS设备要在后台使用蓝牙功能，必须首先设置相应的后台蓝夜权限；
* 如果要在后台进行音频操作，还需要设置后台音乐权限;
* 在后台扫描蓝牙设备时，serviceUUIDs参数必传，不能无限制扫描；
* 后台获取到数据如要通知前台，请用LocalNotification；

**注：由于本插件的特殊性，暂时没法提供方法的示例，整体示例请参考开源源码中的示例**


## 1.2、开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=465_index) 插件中心至插件详情页 （插件测试用例与插件源码已经提供）

# 2、API概览

## 2.1、方法

> ### init 初始化接口

`uexBluetoothLE.init()`

**说明:**
回调方法[cbInit](#cbInit 初始化的回调方法 "cbInit")
* 所有的回调都会传给执行init()的页面，请务必不要关闭此页面；
* 建议在root页面执行init()；

**参数:**
 无

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**

> ### scanDevice 扫描蓝牙设备

`uexBluetoothLE.scanDevice(serviceUUIDs)`

**说明:**
扫描到设备后通过[onLeScan](#onLeScan 扫描到设备的回调方法 "onLeScan")回调结果

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| serviceUUIDs | Array | 否 | 由service的UUID字符串组成的数组。	serviceUUIDs不传时，插件会扫描所有蓝牙设备；否则，插件会只扫描包含数组中的指定service的蓝牙设备；iOS系统，在进行后台蓝牙设备扫描时，该参数必须，若前台扫描则该参数为可选。 |

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**


> ### stopScanDevice 停止扫描设备

`uexBluetoothLE.stopScanDevice()`

**说明:**
停止扫描设备

**参数:**
无

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**


> ### connect 连接指定蓝牙设备

`uexBluetoothLE.connect(param)`

**说明:**
连接指定蓝牙设备。回调方法[cbConnect](#cbConnect 连接指定蓝牙设备的回调方法 "cbConnect")

**参数:**
```
var param={
    address://(必选)要连接的蓝牙地址
};
```

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**


> ### disconnect 断开蓝牙连接

`uexBluetoothLE.disconnect()`

**说明:**
断开蓝牙连接。成功断开后会回调[onConnectionStateChange](#onConnectionStateChange 连接状态改变的监听方法 "onConnectionStateChange")方法

**参数:**
无

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**


> ### searchForCharacteristic 从指定service中搜索characteristic

`uexBluetoothLE.searchForCharacteristic(param)`

**说明:**
从指定service中搜索characteristic。回调方法[cbSearchForCharacteristic](#cbSearchForCharacteristic 从指定service中搜索characteristic的回调方法 "cbSearchForCharacteristic")

**参数:**
```
var param={
	serviceUUID://(必选)string，要搜索的service的UUID
}
```

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**


> ### searchForDescriptor 从指定characteristic中搜索descriptor

`uexBluetoothLE.searchForDescriptor(param)`

**说明:**
从指定characteristic中搜索descriptor。回调方法[cbSearchForDescriptor](#cbSearchForDescriptor 从指定characteristic中搜索descriptor的回调方法 "cbSearchForDescriptor")

**参数:**
```
var param={
	serviceUUID:,//(必选)被搜索的characteristic所在的service的UUID
	characteristicUUID://(必选)string 要搜索的characteristics的UUID
}
```

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**


> ### readCharacteristic 读取Characteristic

`uexBluetoothLE.readCharacteristic(param)`

**说明:**
读取Characteristic。回调方法[cbReadCharacteristic](#cbReadCharacteristic 读取Characteristic的回调方法 "cbReadCharacteristic")

**参数:**
```
var param={
	serviceUUID://(必选)service的UUID
	characteristicUUID://(必选)characteristic的UUID
}
```

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**


> ### writeCharacteristic 写入数据到Characteristic

`uexBluetoothLE.writeCharacteristic(param)`

**说明:**
写入数据到Characteristic。回调方法[cbWriteCharacteristic](#cbWriteCharacteristic 写入数据到Characteristic的回调方法 "cbWriteCharacteristic")。监听方法[onCharacteristicChanged](#onCharacteristicChanged Characteristic内容改变的监听方法 "onCharacteristicChanged")
用户需要将实际要写入的值先base64编码成String，再调用此方法.

**参数:**
```
var param={
	serviceUUID:,//service的UUID
	characteristicUUID:,//characteristic的UUID
	value://要写入的值
}
```

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**


> ### readDescriptor 读取Descriptor

`uexBluetoothLE.readDescriptor(param)`

**说明:**
读取Descriptor。回调方法[cbReadDescriptor](#cbReadDescriptor 读取Descriptor的回调方法 "cbReadDescriptor")。

**参数:**
```
var param={
	serviceUUID://service的UUID
	characteristicUUID://characteristic的UUID
	descriptorUUID://descriptor的UUID
}
```

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**


> ### writeDescriptor 写入数据到Descriptor

`uexBluetoothLE.writeDescriptor(param)`

**说明:**
写入数据到Descriptor。回调方法[cbWriteDescriptor](#cbWriteDescriptor 写入数据到Descriptor的回调方法 "cbWriteDescriptor")。
用户需要将实际要写入的值先base64编码成String，再调用此方法.

**参数:**
```
var param={
	serviceUUID://service的UUID
	characteristicUUID://characteristic的UUID
	descrtiptorUUID://descriptor的UUID
	value://要写入的值
}
```

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**

## 2.2、回调方法

> ### cbInit 初始化的回调方法

`uexBluetoothLE.cbInit(data)`

**参数:**
```
var data={
	resultCode://(必选) 0-BLE启动成功，1-BLE启动失败
}
```

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**

```
    window.uexOnload = function(type){
        uexBluetoothLE.cbInit = cbInit;
    }
    function cbInit(data){
        alert("cbInit:" + data);
    }
```

> ### cbConnect 连接指定蓝牙设备的回调方法

`uexBluetoothLE.cbConnect(data)`

**参数:**
```
var data={
	services://(必选) service的UUID构成的数组
}
```

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**

```
    window.uexOnload = function(type){
        uexBluetoothLE.cbConnect = cbConnect;
    }
    function cbConnect(data){
        alert("cbConnect:" + data);
    }
```

> ### cbSearchForCharacteristic 从指定service中搜索characteristic的回调方法

`uexBluetoothLE.cbSearchForCharacteristic(data)`

**参数:**
```
var data={
	serviceUUID:,//(必选)被搜索的service的UUID
	characteristics://(必选)list<uexBLECharacteristic> 此service下的uexBLECharacteristic结构构成的数组
}
```
uexBLECharacteristic结构说明见[附录](#3.2 uexBLECharacteristic结构说明)

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**

```
    window.uexOnload = function(type){
        uexBluetoothLE.cbSearchForCharacteristic = cbSearchForCharacteristic;
    }
    function cbSearchForCharacteristic(data){
        alert("cbSearchForCharacteristic:" + data);
    }
```

> ### cbSearchForDescriptor 从指定characteristic中搜索descriptor的回调方法

`uexBluetoothLE.cbSearchForDescriptor(data)`

**参数:**
```
var data={
	serviceUUID://被搜索的characteristic所在的service的UUID
	characteristicUUID:,//被搜索的characteristic的UUID
	descriptors:,//list<uexLBEDescriptor> 此characteristic下的uexBLEDescriptor结构构成的数组,
}
```
uexBLEDescriptor结构说明见[附录](#3.1 uexBLEDescriptor结构说明)

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**

```
    window.uexOnload = function(type){
        uexBluetoothLE.cbSearchForDescriptor = cbSearchForDescriptor;
    }
    function cbSearchForDescriptor(data){
        alert("cbSearchForDescriptor:" + data);
    }
```

> ### cbReadCharacteristic 读取Characteristic的回调方法

`uexBluetoothLE.cbReadCharacteristic(data)`

**参数:**
```
var data={
	resultCode://0-成功，1-失败
	data://uexBLECharacteristic的Json格式
}
```
uexBLECharacteristic结构说明见[附录](#3.2 uexBLECharacteristic结构说明)

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**

```
    window.uexOnload = function(type){
        uexBluetoothLE.cbReadCharacteristic = cbReadCharacteristic;
    }
    function cbReadCharacteristic(data){
        alert("cbReadCharacteristic:" + data);
    }
```

> ### cbWriteCharacteristic 写入数据到Characteristic的回调方法

`uexBluetoothLE.cbWriteCharacteristic(data)`

**参数:**
```
var data={
	resultCode://0-成功，1-失败
	data:uexBLECharacteristic的Json格式
}
```
uexBLECharacteristic结构说明见[附录](#3.2 uexBLECharacteristic结构说明)

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**

```
    window.uexOnload = function(type){
        uexBluetoothLE.cbWriteCharacteristic = cbWriteCharacteristic;
    }
    function cbWriteCharacteristic(data){
        alert("cbWriteCharacteristic:" + data);
    }
```

> ### cbReadDescriptor 读取Descriptor的回调方法

`uexBluetoothLE.cbReadDescriptor(data)`

**参数:**
```
var data={
	resultCode://0-成功，1-失败
	data://uexBLEDescriptor的Json格式
}
```
uexBLEDescriptor结构说明见[附录](#3.1 uexBLEDescriptor结构说明)

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**

```
    window.uexOnload = function(type){
        uexBluetoothLE.cbReadDescriptor = cbReadDescriptor;
    }
    function cbReadDescriptor(data){
        alert("cbReadDescriptor:" + data);
    }
```

> ### cbWriteDescriptor 写入数据到Descriptor的回调方法

`uexBluetoothLE.cbWriteDescriptor(data)`

**参数:**
```
var data={
	resultCode://0-成功，1-失败
	data:uexBLEDescriptor的Json格式
}
```
uexBLEDescriptor结构说明见[附录](#3.1 uexBLEDescriptor结构说明)

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**

```
    window.uexOnload = function(type){
        uexBluetoothLE.cbWriteDescriptor = cbWriteDescriptor;
    }
    function cbWriteDescriptor(data){
        alert("cbWriteDescriptor:" + data);
    }
```

## 2.3、监听方法

> ### onLeScan 扫描到设备的回调方法

`uexBluetoothLE.onLeScan(data)`

**参数:**
```
var data={
	address:,
	name:
}
```
各字段含义如下：

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| address | String | 是 | Android的address参数传回的是设备的mac地址；iOS的address参数传回的是设备的UUID |
| name | String | 是 | 蓝牙设备名称 |

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**

```
    window.uexOnload = function(type){
        uexBluetoothLE.onLeScan = onLeScan;
    }
    function onLeScan(data){
        alert("onLeScan:" + data);
    }
```

> ### onConnectionStateChange 连接状态改变的监听方法

`uexBluetoothLE.onConnectionStateChange(data)`

**参数:**
```
var data={
	resultCode://(必选)0-已连接上，1-已断开
}
```

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**

```
    window.uexOnload = function(type){
        uexBluetoothLE.onConnectionStateChange = onConnectionStateChange;
    }
    function onConnectionStateChange(data){
        alert("onConnectionStateChange:" + data);
    }
```

> ### onCharacteristicChanged Characteristic内容改变的监听方法

`uexBluetoothLE.onCharacteristicChanged(data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| data | Json | 是 | uexBLECharacteristic的Json格式数据，uexBLECharacteristic结构说明见[附录](#3.2 uexBLECharacteristic结构说明) |

**平台支持:**
Android 4.3+
iOS 7.1+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**

```
    window.uexOnload = function(type){
        uexBluetoothLE.onCharacteristicChanged = onCharacteristicChanged;
    }
    function onCharacteristicChanged(data){
        alert("onCharacteristicChanged:" + data);
    }
```

# 3、附录
## 3.1 uexBLEDescriptor结构说明
```
	var uexBLEDescriptor{
		serviceUUID:,//此descriptor所属的service的UUID
		characteristicUUID:,//此descriptor所属的characteristic的UUID
		UUID:,//string,此descriptor的UUID 
		value:,//string,此descriptor的值
		needDecode://是否需要base64解码  true/false，为true时，用户需要将value进行base64解码
	}
```
`permissions`权限说明请参考[permissions权限说明](#3.3 permissions权限说明)
``

## 3.2 uexBLECharacteristic结构说明
```
	var uexBLECharacteristic{
		serviceUUID:,//string，此Characteristic所属的service的UUID
		UUID:,//string,此Characteristic的UUID 
		value:,//string,此Characteristic的值，base64编码,用户获取到value之后，需要先进行base64解码
		permissions:,//(仅iOS)Number,此Characteristic的权限说明
		writeType;,//(仅Android)Number，此Characteristic的写入方式
		descriptors://list<uexBLEDescriptor> uexBLEDescriptor结构的数组，描述了此Characteristic下所有的Descriptor
	}
```
`permissions`权限说明请参考[permissions权限说明](#3.3 permissions权限说明)
`writeType`写入方式请参考[writeType](3.4 writeType)

## 3.3 permissions权限说明

### 3.3.1 iOS权限说明

|flag|desription|
|---|---|
|1|Permits broadcasts of the characteristic value using a characteristic configuration descriptor.|
|2|Permits reads of the characteristic value.|
|4|Permits writes of the characteristic value, without a response.|
|8|Permits writes of the characteristic value.|
|16|Permits notifications of the characteristic value, without a response.|
|32|Permits indications of the characteristic value.|
|64|Permits signed writes of the characteristic value|
|128|If set, additional characteristic properties are defined in the characteristic extended properties descriptor.|
|256|If set, only trusted devices can enable notifications of the characteristic value.|
|512|If set, only trusted devices can enable indications of the characteristic value.|

## 3.4 writeType
    待补充