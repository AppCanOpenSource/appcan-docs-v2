[TOC]
# 1､简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
设备传感器插件
## 1.1､说明
设备传感器.
## 1.2､UI展示
 ![](http://newdocx.appcan.cn/docximg/124447l2015i6u16n.png)
## 1.3 ､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=185_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4､平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.
# 2､API概览

## 2.1､方法

### 🍭 open 打开传感器

`uexSensor.open(type, rate)`

**说明:**

传感器依赖硬件,各机型支持的传感器请参考厂家说明

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明                                       |
| ---- | ------ | ---- | ---------------------------------------- |
| type | Number | 否    | 传感器类型,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Sensor "CONSTANT")中SensorType |
| rate | Number | 否    | 传感器速率,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Sensor "CONSTANT")中SensorRate |


**示例:**

```
uexSensor.open(1,3);
```

### 🍭 close 关闭传感器

`uexSensor.close(type)`

**说明:**

关闭传感器

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明                                       |
| ---- | ------ | ---- | ---------------------------------------- |
| type | Number | 否    | 传感器类型,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Sensor "CONSTANT")中SensorType |


**示例:**

```
uexSensor.close(1);
```

## 2.2､监听方法

### 🍭 onAccelerometerChange 加速度传感器的监听方法

`uexSensor.onAccelerometerChange(x,y,z)`


**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明     |
| ---- | ------ | ---- | ------ |
| x    | Number | 是    | x方向上的值 |
| y    | Number | 是    | y方向上的值 |
| z    | Number | 是    | z方向上的值 |



**示例:**

```javascript
window.uexOnload = function(){
	uexSensor.onAccelerometerChange = accelerometerChange;
}
function accelerometerChange(x, y, z){
     alert("onAccelerometerChange:" + "x=" + x + ",y" + y + ",z" + z);
}
```

### 🍭  onOrientationChange 方向传感器的监听方法(仅支持Android)

`uexSensor.onOrientationChange(x,y,z)`

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明     |
| ---- | ------ | ---- | ------ |
| x    | Number | 是    | x方向上的值 |
| y    | Number | 是    | y方向上的值 |
| z    | Number | 是    | z方向上的值 |

**平台支持:**

Android 4.0+

**示例:**

```javascript
window.uexOnload = function(){
	uexSensor.onOrientationChange = orientation;
}
function orientation(x, y, z){
	alert("onOrientationChange:" + "x=" + x + ",y" + y + ",z" + z);
}
```

### 🍭 onMagneticChange 磁场传感器的监听方法

`uexSensor.onMagneticChange(x,y,z)`

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明     |
| ---- | ------ | ---- | ------ |
| x    | Number | 是    | x方向上的值 |
| y    | Number | 是    | y方向上的值 |
| z    | Number | 是    | z方向上的值 |


**示例:**

```javascript
window.uexOnload = function(){
	uexSensor.onMagneticChange = magneticChange;
}
function magneticChange(x, y, z){
    alert("onMagneticChange:" + "x=" + x + ",y" + y + ",z" + z);
}
```

### 🍭 onLightChange 亮度传感器的监听方法(仅支持Android)

`uexSensor.onLightChange(light)`

**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明     |
| ----- | ------ | ---- | ------ |
| light | Number | 是    | 亮度的变化值 |

**平台支持:**

Android 4.0+

**示例:**

```javascript
window.uexOnload = function(){
	uexSensor.onLightChange = light;
}
function light(light){
    alert("onLightChange:light=" + light);
}
```

# 3､更新历史

### iOS

API版本: `uexSensor-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | uexSensor支持引擎4.0 |

### Android

API版本: `uexSensor-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 4.0插件 |
