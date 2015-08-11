[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
设备传感器插件
## 1.1、 说明
设备传感器。
## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/124447l2015i6u16n.png)
## 1.3 、 开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=185_index) 插件中心至插件详情页 （插件测试用例与插件源码已经提供）

# 2、API概览

## 2.1、方法

> ### open 打开传感器

`uexSensor.open(type, rate)`

**说明:**
传感器依赖硬件，各机型支持的传感器请参考厂家说明

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
|  type  | Number | 否 | 传感器类型，详见CONSTANT中SensorType |
|  rate  | Number | 否 | 传感器速率，详见CONSTANT中SensorRate |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexSensor.open(1,3);
```

> ### close 关闭传感器

`uexSensor.close(type)`

**说明:**
关闭传感器

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
|  type | Number | 否 | 传感器类型，详见CONSTANT中SensorType |

**平台支持:**
Android2.2+	
iOS6.0+	

**版本支持:**
3.0.0+	

**示例:**
```
uexSensor.close(1);
```
			  
## 2.3、监听方法

> ### onAccelerometerChange 加速度传感器的监听方法

`uexSensor.onAccelerometerChange(x,y,z)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------ --- | ---------- | ---------- | ----- |
| x | Number | 是 | x方向上的值 |
| y | Number | 是 | y方向上的值 |
| z | Number | 是 | z方向上的值 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
window.uexOnload = function(){
	uexSensor.onAccelerometerChange = accelerometerChange;
}
function accelerometerChange(x, y, z){
	document.getElementById('accelerometer').innerHTML = "X=" + x + ";<br>Y=" + y + ";<br>Z=" + z;
}
```

> ###  onOrientationChange 方向传感器的监听方法

`uexSensor.onOrientationChange(x,y,z)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------ --- | ---------- | ---------- | ----- |
| x | Number | 是 | x方向上的值 |
| y | Number | 是 | y方向上的值 |
| z | Number | 是 | z方向上的值 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
window.uexOnload = function(){
	uexSensor.onOrientationChange = orientation;
}
function orientation(x, y, z){
	document.getElementById('orientation').innerHTML = "X=" + x + ";<br>Y=" + y + ";<br>Z=" + z;
}
```

> ### onMagneticChange 磁场传感器的监听方法

`uexSensor.onMagneticChange(x,y,z)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------ --- | ---------- | ---------- | ----- |
| x | Number | 是 | x方向上的值 |
| y | Number | 是 | y方向上的值 |
| z | Number | 是 | z方向上的值 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
window.uexOnload = function(){
	uexSensor.onMagneticChange = magneticChange;
}
function magneticChange(x, y, z){
	document.getElementById('field').innerHTML = "X=" + x + ";<br>Y=" + y + ";<br>Z=" + z;
}
```

> ### onLightChange 亮度传感器的监听方法

`uexSensor.onLightChange(light)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------ --- | ---------- | ---------- | ----- |
| light | Number | 是 | 亮度的变化值 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
window.uexOnload = function(){
	uexSensor.onLightChange = light;
}
function light(data){
	document.getElementById('light').innerHTML = data;
}
```

# 3、更新历史
 API 版本：uexSensor-3.0.2(iOS) uexSensor-3.0.0（Android）
最近更新时间：2015-06-19

|  历史发布版本 | iOS更新  | 安卓更新  |
| ------------ | ------------ | ------------ |
| 3.0.2  |  修改dealloc方法 |   |
| 3.0.1  | 使用新版Xcode重新编译,支持arm64  | |
| 3.0.0  | 传感器功能插件  | 传感器功能插件|
 