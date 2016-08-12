[TOC]

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
设备信息插件

## 1.1、说明
 本类封装了设备硬件参数相关信息和硬件状态相关信息。

## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/104339w2015d6d16t.jpg)

## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=167_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)


## 1.4、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。
有特殊版本要求的API会在文档中额外说明。

## 1.5、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用。
在后续版本中新添加的接口会在文档中额外说明。

# 2、API概览

## 2.1、方法

> ### vibrate 开启设备震动

`uexDevice.vibrate(milliseconds)`

**说明:**

开启设备震动,iOS平台中,ipad,ipod不支持震动。

**参数:**


| 参数名称         | 参数类型   | 是否必选 | 说明          |
| ------------ | ------ | ---- | ----------- |
| milliseconds | Number | 是    | 震动持续时长,单位毫秒 |


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


**示例:**

```
    uexDevice.cancelVibrate();
```

> ### getInfo 获取设备信息

`uexDevice.getInfo(infoID)`

**说明:**

获取设备信息

**参数:**


| 参数名称   | 参数类型   | 是否必选 | 说明                                       |
| ------ | ------ | ---- | ---------------------------------------- |
| infoID | Number | 是    | 设备信息类型,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975 "CONSTANT")中设备信息类型。 |

**返回值:**

| 参数类型   | 是否必选 | 说明   |
| ------ | ---- | ---- |
| String | 是    | 设备信息 |




**示例:**

```
 var systemVersion = uexDevice.getInfo('1');//获取系统版本
 alert(systemVersion);
```
> ### screenCapture 屏幕截图

`uexDevice.screenCapture(quality, callbackFunction)`

**说明:**

获取当前屏幕截图

**参数:**


| 参数名称             | 参数类型   | 是否必选 | 说明                        |
| ---------------- | ------ | ---- | ------------------------- |
| quality          | Number | 是    | 图片压缩质量,取值范围[0,1] 为0时压缩率最大 |
| callbackFunction | 函数     | 必选   | 回调函数，用来获取相关业务数据           |
**回调参数:**

```javascript
var callbackFunction = function(error,data){
}
```

| 参数名称  | 参数类型   | 说明              |
| ----- | ------ | --------------- |
| error | Number | 为0时表示成功,非0时表示失败 |
| data  | Object | 返回数据，形式见下       |
```
var data = { 
   savePath: ,//String，屏幕截图的路径，error非零为空字符串
}
```
**示例:**

```
    uexDevice.screenCapture(0.8,function(error,data){
          if (!error) {
              alert('截屏成功:' + data.savePath);
          } else {
              alert('截屏失败');
  }
```

> ### setVolume 调整音量 

`uexDevice.setVolume(volume)`

**说明:**

设置系统音量值。特别说明,iOS需关闭**设置—>声音—>用按钮调整**，才有效。

**参数:**


| 参数名称   | 参数类型   | 是否必选 | 说明                      |
| ------ | ------ | ---- | ----------------------- |
| volume | Number | 是    | 音量大小,取值范围[0,1] 为1时音量为最大 |



**示例:**

```
    uexDevice.setVolume(0.5);//设置系统音量
```
> ### getVolume 获取系统音量值

`uexDevice.getVolume()`

**说明:**

获取系统音量值

**参数:**

无

**返回值:**

| 参数类型   | 是否必选 | 说明                      |
| ------ | ---- | ----------------------- |
| Number | 是    | 系统音量值,取值范围[0,1],为1时音量最大 |




**示例:**

```
 var volume = uexDevice.getVolume();//获取系统音量值
 alert(volume);
```
> ### setScreenAlwaysBright 屏幕常亮控制 

`uexDevice.setScreenAlwaysBright(data)`

**说明:**

屏幕常亮控制(应用在前台时有效)

**参数:**


| 参数名称 | 参数类型   | 是否必选 | 说明                         |
| ---- | ------ | ---- | -------------------------- |
| data | Number | 是    | 屏幕常亮控制值,0 为取消常亮控制；1为设置屏幕常亮 |


**示例:**

```
    uexDevice.setScreenAlwaysBright(1);//设置屏幕常亮
```

> ### getScreenBrightness 获取屏幕亮度

`uexDevice.getScreenBrightness(brightness)`

**说明:**

获取屏幕亮度值

**参数:**

无

**返回值:**

| 参数类型   | 是否必选 | 说明                       |
| ------ | ---- | ------------------------ |
| Number | 是    | 屏幕亮度值,取值范围[0,1],为1时屏幕最亮。 |

* 在3.3+引擎版本下,此方法具有返回值,可以直接获得屏幕亮度值。


**示例:**

```
 var brightness = uexDevice.getScreenBrightness();//获取屏幕亮度
 alert(brightness);
```

> ### setScreenBrightness 调整屏幕亮度

`uexDevice.setScreenBrightness(brightness)`

**说明:**

调整屏幕亮度

**参数:**


| 参数名称       | 参数类型   | 是否必选 | 说明                        |
| ---------- | ------ | ---- | ------------------------- |
| brightness | Number | 是    | 屏幕亮度值,取值范围[0,1] 为1时屏幕亮度最大 |


**示例:**

```
    uexDevice.setScreenBrightness(0.5);//设置屏幕亮度
```

> ### openWiFiInterface 打开WIFI设置页

`uexDevice.openWiFiInterface()`

**说明:**

打开WIFI设置页面

**参数:**

无


**示例:**

```
    uexDevice.openWiFiInterface();//打开WIFI设置页面
```

> ### isFunctionEnable 判断某功能是否开启

`uexDevice.isFunctionEnable(params, callbackFunction)`

**说明:**

判断某功能是否开启

**参数:**

```
var params = {
    setting:
}
```

各字段含义如下:

| 字段名称             | 类型     | 是否必选 | 说明                        |
| ---------------- | ------ | ---- | ------------------------- |
| setting          | String | 是    | 功能名称,详情请参考[功能](#Settings) |
| callbackFunction | 函数     | 必选   | 回调函数，用来获取相关业务数据           |

**回调参数:**

```javascript
var callbackFunction = function(error){
}
```

| 参数名称  | 参数类型   | 说明               |
| ----- | ------ | :--------------- |
| error | Number | 为0时表示开启，非0时表示未开启 |

**示例:**

```
var params = {
 	setting:"GPS"//位置服务功能
};
var data = JSON.stringify(params);
uexDevice.isFunctionEnable(data, function(error) {
   if (!error) {
           alert('已开启');
       } else {
           alert('未开启');
});
```

> ### openSetting 打开设置界面

`uexDevice.openSetting(params, callbackFunction)`

**说明:**

打开设置界面,iOS统一打开系统设置里App的页面

**参数:**

```
var params = {
    setting:
}
```

各字段含义如下:

| 字段名称             | 类型     | 是否必选 | 说明                                    |
| ---------------- | ------ | ---- | ------------------------------------- |
| setting          | String | 否    | 功能名称,详情请参考[功能](#Settings),不传时打开设置入口界面 |
| callbackFunction | 函数     | 必选   | 回调函数，用来获取相关业务数据                       |

**回调参数:**

```javascript
var callbackFunction = function(error,data){
}
```

| 参数名称  | 参数类型   | 说明              |
| ----- | ------ | --------------- |
| error | Number | 为0时表示成功,非0时表示失败 |
| data  | Object | 返回数据，形式见下       |
```
var data = { 
   setting: ,//String，功能名称,详情请参考附录
}
```

**示例:**

```
var params = {
 	setting:"GPS"//位置服务功能
};
var data = JSON.stringify(params);
uexDevice.openSetting(data, function(error,data) {
   if (!error) {
           alert('打开成功:' + data.setting);
       } else {
           alert('打开失败');
});
```



## 2.2、监听方法

> ### onOrientationChange 屏幕旋转的监听方法

`uexDevice.onOrientationChange(mode)`

**说明:**

该监听方法需要注册在主窗口中，注册在浮动窗口中无效。

**参数:**


| 参数名称 | 参数类型   | 是否必选 | 说明                |
| ---- | ------ | ---- | ----------------- |
| mode | Number | 是    | 屏幕方向,1-正竖屏；2-左横屏。 |


**示例:**

```
 uexDevice.onOrientationChange = function(mode){
	if(mode == 1){
		alert("正竖屏");
	}else if(mode == 2){
		alert("左横屏");
	}
};
```

# 3、更新历史

### iOS

API版本:`uexDevice-4.0.0`

最近更新时间:`2016-6-6`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
| 4.0.0  | 支持function传入                             |
| 3.0.9  | 修改获取设备型号的方式,添加设备型号                       |
| 3.0.8  | 修改工程为arc;部分接口支持同步回调;设备型号现在可以识别iPad Pro   |
| 3.0.7  | openSetting接口支持打开推送通知设置                  |
| 3.0.6  | 添加判断功能是否开启,以及打开设置界面接口                    |
| 3.0.5  | 添加IDE支持                                  |
| 3.0.4  | 新增屏幕截图、调节屏幕亮度、调节系统音量、屏幕常亮控制、跳转WIFI界面相关接口 |
| 3.0.3  | 设备列表更新                                   |
| 3.0.2  | 支持获取4G网络状态                               |
| 3.0.1  | 修复在不显示状态栏时无法获取当前网络状态的bug                 |
| 3.0.0  | 设备能力功能插件                                 |

### Android

API版本:`uexDevice-4.0.0`

最近更新时间:`2016-6-6`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
| 4.0.0  | 支持function传入                             |
| 3.0.6  | Android6.0支持获取wifi mac地址                 |
| 3.0.5  | 修复多次截图都是同一张图片的问题                         |
| 3.0.4  | 解决多次截屏失效的问题                              |
| 3.0.3  | 添加判断功能是否开启,以及打开设置界面接口                    |
| 3.0.2  | 添加截图,听筒和扩音器切换, 设置/获取音量等接口                |
| 3.0.1  | 新增屏幕截图、调节屏幕亮度、调节系统音量、屏幕常亮控制、跳转WIFI界面相关接口 |
| 3.0.0  | 设备能力功能插件                                 |
# 4、附录

### Settings
| value        | 说明           |
| ------------ | ------------ |
| GPS          | GPS功能        |
| BLUETOOTH    | 蓝牙功能         |
| NOTIFICATION | 推送通知设置(仅iOS) |

