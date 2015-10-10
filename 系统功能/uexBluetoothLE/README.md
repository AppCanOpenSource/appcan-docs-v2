# uexBluetoothLE 蓝牙BLE插件接口文档

最后修改时间：`2015-7-28`

### 平台支持

```
Android 4.3+(API 18)
iOS 7.1+
```


### 初始化接口

```
init()

```
* 所有的回调都会传给执行init()的页面，请务必不要关闭此页面；
* 建议在root页面执行init()；

### 初始化回调

```
cnInit(param);
var param={
	resultCode://0-BLE启动成功，1-BLE启动失败
}
```


### 扫描蓝牙设备
扫描到设备后通过onLeScan回调结果

```
scanDevice (serviceUUIDs);

var serviceUUIDs=list<string>是一个由service的UUID字符串组成的数组

  

```

* serviceUUIDs为可选参数
	* serviceUUIDs不传时，插件会扫描所有蓝牙设备；
	* 否则，插件会只扫描包含数组中的指定service的蓝牙设备；
	* iOS系统 进行后台蓝牙设备扫描时，必须传参数。

### 扫描到设备回调
每扫描到一个设备都会回调一次，找到需要链接设备时应停止扫描

```
onLeScan(param)
var param={
	address:,//见下
	name://蓝牙设备名称
}
```
* Android 的address参数传回的是设备的mac地址
* iOS的address参数传回的是设备的UUID

### 停止扫描设备

```
stopScanDevice();
```
* 连接设备成功时，插件会自动调用此方法

### 连接指定蓝牙设备
```
connect(param)
var param={
    address://要连接的蓝牙地址
};
```



###连接指定蓝牙设备回调
```
cbConnect(param)
var param={
	services:,//list<string> service的UUID构成的数组
}
```


### 断开蓝牙连接
```
disconnect();
```

### 连接状态变化回调

```
onConnectionStateChange(param)
var param={
	resultCode://0-已连接上，1-已断开
}
```


###从指定service中搜索characteristic
```
searchForCharacteristic(param)
var param={
	serviceUUID:,//string，要搜索的service的UUID
	}

```

###从指定service中搜索characteristic回调
```
cbSearchForCharacteristic(param)
var param={
	serviceUUID:,//被扫描的service的UUID
	characteristics:,//list<uexBLECharacteristic> 此service下的uexBLECharacteristic结构构成的数组,
}


```
* uexBLECharacteristic结构说明见附录

###从指定characteristic中搜索descriptor
```
searchForDescriptor(param)
var param={
	serviceUUID://(必选)被搜索的characteristic所在的service的UUID
	characteristicUUID:,//(必选)string 要搜索的characteristics的UUID
	}
```

###从指定characteristic中搜索descriptor回调
```
cbSearchForDescriptor(param)
var param={
	serviceUUID://被搜索的characteristic所在的service的UUID
	characteristicUUID:,//被搜索的characteristic的UUID
	descriptors:,//list<uexLBEDescriptor> 此characteristic下的uexBLEDescriptor结构构成的数组,
}
```
* uexBLEDescriptor结构说明见附录
***

### 读取Characteristic


```
readCharacteristic(param)
var param={
	serviceUUID://service的UUID
	characteristicUUID://characteristic的UUID
}
```

### 写入数据到Characteristic

```
writeCharacteristic(param)
var param={
	serviceUUID://service的UUID
	characteristicUUID://characteristic的UUID
	value://要写入的值，
}
```
* 用户需要将实际要写入的值先base64编码成String，再调用此方法

### cbReadCharacteristic回调

```
cbReadCharacteristic(param)
var param={
	resultCode://0-成功，1-失败
	data://uexBLECharacteristic的Json格式
}

```
* uexBLECharacteristic结构说明见附录

### cbWriteCharacteristic回调

```
cbWriteCharacteristic(param)
var param={
	resultCode://0-成功，1-失败
	data:uexBLECharacteristic的Json格式
}

```
* uexBLECharacteristic结构说明见附录
### onCharacteristicChanged回调

```
onCharacteristicChanged(param);
返回内容为uexBLECharacteristic 的Json格式

```
* uexBLECharacteristic结构说明见附录


***
### 读取Descriptor


```
readDescriptor(param)
var param={
	serviceUUID://service的UUID
	characteristicUUID://characteristic的UUID
	descriptorUUID://descriptor的UUID
}
```

### 写入数据到Descriptor

```
writeDescriptor(param)
var param={
	serviceUUID://service的UUID
	characteristicUUID://characteristic的UUID
	descrtiptorUUID://descriptor的UUID
	value://要写入的值
}
```

* 用户需要将实际要写入的值先base64编码成String，再调用此方法

### cbReadDescriptor回调

```
cbReadDescriptor(param)
var param={
	resultCode://0-成功，1-失败
	data://uexBLEDescriptor的Json格式
}

```
* uexBLEDescriptor结构说明见附录

### cbWriteDescriptor回调

```
cbWriteDescriptor(param)
var param={
	resultCode://0-成功，1-失败
	data:uexBLEDescriptor的Json格式
}

```
* uexBLEDescriptor结构说明见附录



##附录
###uexBLECharacteristic结构说明

	var uexBLECharacteristic{
		serviceUUID://string，此Characteristic所属的service的UUID
		UUID,://string,此Characteristic的UUID 
		value,://string,此Characteristic的值，base64编码
		permissions,://int,此Characteristic的权限说明
		writeType,;//(仅Android)int，此Characteristic的写入方式
		descriptors;//list<uexBLEDescriptor> uexBLEDescriptor结构的数组，描述了此Characteristic下所有的Descriptor
	}

* 用户获取到value之后，需要先进行base64解码

#####permissions 含义待补

######iOS permissions

flag|desription
---|---
1|Permits broadcasts of the characteristic value using a characteristic configuration descriptor.
2|Permits reads of the characteristic value.
4|Permits writes of the characteristic value, without a response.
8|Permits writes of the characteristic value.
16|Permits notifications of the characteristic value, without a response.
32|Permits indications of the characteristic value.
64|Permits signed writes of the characteristic value
128|If set, additional characteristic properties are defined in the characteristic extended properties descriptor.
256|If set, only trusted devices can enable notifications of the characteristic value.
512|If set, only trusted devices can enable indications of the characteristic value.


#####writeType含义待补


###uexBLEDescriptor 结构说明
	var uexBLEDescriptor{
		serviceUUID://此descriptor所属的service的UUID
		characteristicUUID://此descriptor所属的characteristic的UUID
		UUID,://string,此descriptor的UUID 
		value,://string,此descriptor的值
		permissions,://(仅Android)int,此descriptor的权限说明
		needDecode,://是否需要base64解码  true/false
	}
	
	* 当needDecode为true时，用户需要将value进行base64解码，

#####permissions 含义待补



###iOS 后台蓝牙功能须知
* iOS设备要在后台使用蓝牙功能，必须首先设置相应的后台蓝夜权限；
* 如果要在后台进行音频操作，还需要设置后台音乐权限;
* 在后台扫描蓝牙设备时，serviceUUIDs参数必传，不能无限制扫描；
* 后台获取到数据如要通知前台，请用LocalNotification；
