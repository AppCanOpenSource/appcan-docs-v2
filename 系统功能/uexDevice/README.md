/*
Sort: 10
Toc: 1
Tips: 设备信息与设置
keywords: appcan开发文档,插件API,系统功能,uexDevice
description: uexDevice插件主要封装了设备硬件参数相关信息和硬件状态相关信息.更多appcan开发文档，请见http://newdocx.appcan.cn
Show: /newdocx/docx?type=1398_975
*/

- [1、简介](#-1-http-appcan-download-oss-cn-beijing-aliyuncs-com-e5-85-ac-e6-b5-8b-2fgf-png-ignore- "1、简介")
- [2、API概览](#-2-api-ignore- "2、API概览")
- [3、更新历史](#-3-ignore- "3、更新历史")
#### **1、简介** *[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() *<ignore>
设备信息插件

###### **1.1、说明**<ignore>
 本类封装了设备硬件参数相关信息和硬件状态相关信息.

###### **1.2、UI展示**<ignore>
*![](http://newdocx.appcan.cn/docximg/104339w2015d6d16t.jpg) *

###### **1.3、开源源码**<ignore>
插件测试用例与源码下载:<a href="http://plugin.appcan.cn/details.html?id=167_index" target="_blank">点击</a>插件中心至插件详情页 (插件测试用例与插件源码已经提供)


###### **1.4、平台版本支持**<ignore>
本插件的所有API默认支持**Android4.3+**和**iOS10.0+**操作系统.
有特殊版本要求的API会在文档中额外说明.

###### **1.5、接口有效性**<ignore>
本插件所有API默认在插件版本**4.0.0+**可用.
在后续版本中新添加的接口会在文档中额外说明.

#### **2、API概览**<ignore>

###### **2.1、方法**<ignore>

> ######  **vibrate //开启设备震动** 

`uexDevice.vibrate(milliseconds)`

**说明:**

开启设备震动,iOS平台中,ipad,ipod不支持震动.

**参数:**


| 参数名称         | 参数类型   | 是否必选 | 说明          |
| ------------ | ------ | ---- | ----------- |
| milliseconds | Number | 是    | 震动持续时长,单位毫秒 |


**示例:**

```
    uexDevice.vibrate(500);
```

> ######  **cancelVibrate //关闭设备震动** 

`uexDevice.cancelVibrate()`

**说明:**

关闭设备震动

**参数:**

  无


**示例:**

```
    uexDevice.cancelVibrate();
```

> ######  **getInfo //获取设备信息** 

`uexDevice.getInfo(infoID)`

**说明:**

获取设备信息

**参数:**


| 参数名称   | 参数类型   | 是否必选 | 说明                                       |
| ------ | ------ | ---- | ---------------------------------------- |
| infoID | Number | 是    | 设备信息类型,详见[CONSTANT](/plugin-API/·Constant#-device-info-types- "CONSTANT")中设备信息类型. |

**返回值:**

String类型对应设备信息.


**示例:**

```
 var systemVersion = uexDevice.getInfo('1');//获取系统版本
 alert(systemVersion);
```
> ######  **screenCapture //获取当前屏幕截图** 

`uexDevice.screenCapture(quality, callbackFunction)`

**说明:**

获取当前屏幕截图

**参数:**


| 参数名称             | 参数类型     | 是否必选 | 说明                        |
| ---------------- | -------- | ---- | ------------------------- |
| quality          | Number   | 是    | 图片压缩质量,取值范围[0,1] 为0时压缩率最大 |
| callbackFunction | Function | 是    | 回调函数,用来获取相关业务数据           |
**回调参数:**

```javascript
var callbackFunction = function(error,data){
}
```

| 参数名称  | 参数类型   | 说明              |
| ----- | ------ | --------------- |
| error | Number | 为0时表示成功,非0时表示失败 |
| data  | Object | 返回数据,形式见下       |
```
var data = { 
   savePath://String,屏幕截图的路径,error非零为空字符串
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
  });
```

> ######  **setVolume //设置系统音量值** 

`uexDevice.setVolume(volume)`

**说明:**

设置系统音量值.特别说明,iOS需关闭**设置—>声音—>用按钮调整**,才有效.

**参数:**


| 参数名称   | 参数类型   | 是否必选 | 说明                    |
| ------ | ------ | ---- | --------------------- |
| volume | Number | 是    | 音量大小,取值范围0~1 为1时音量为最大 |

**示例:**

```
    uexDevice.setVolume(0.5);//设置系统音量
```
######  **getVolume //获取系统音量值** 

`uexDevice.getVolume()`

**说明:**

获取系统音量值

**参数:**

无

**返回值:**

Number类型音量值


**示例:**

```
 var volume = uexDevice.getVolume();//获取系统音量值
 alert(volume);
```
> ######  **setScreenAlwaysBright //屏幕常亮控制** 

`uexDevice.setScreenAlwaysBright(data)`

**说明:**

屏幕常亮控制(应用在前台时有效)

**参数:**


| 参数名称 | 参数类型   | 是否必选 | 说明                         |
| ---- | ------ | ---- | -------------------------- |
| data | Number | 是    | 屏幕常亮控制值,0 为取消常亮控制;1为设置屏幕常亮 |


**示例:**

```
    uexDevice.setScreenAlwaysBright(1);//设置屏幕常亮
```

> ######  **setScreenBrightness //调整屏幕亮度** 

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

> ######  **getScreenBrightness //获取屏幕亮度值** 

`uexDevice.getScreenBrightness()`

**说明:**

获取屏幕亮度值

**参数:**

无

**返回值:**

Number类型屏幕亮度值

**示例:**

```
 var brightness = uexDevice.getScreenBrightness();//获取屏幕亮度
 alert(brightness);
```

> ######  **openWiFiInterface //打开WIFI设置页面** 

`uexDevice.openWiFiInterface()`

**说明:**

打开WIFI设置页面

**参数:**

无


**示例:**

```
    uexDevice.openWiFiInterface();//打开WIFI设置页面
```

> ######  **isFunctionEnable //判断某功能是否开启** 

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
| setting          | String | 是    | 功能名称,详情请参考[功能](#-settings-ignore-) |
| callbackFunction | 函数     | 必选   | 回调函数,用来获取相关业务数据           |

**回调参数:**

```javascript
var callbackFunction = function(data){
}
```

| 参数名称 | 参数类型    | 说明              |
| ---- | ------- | :-------------- |
| data | Boolean | true开启,false未开启 |

**示例:**

```
var params = {
 	setting:"GPS"//位置服务功能
};
var data = JSON.stringify(params);
uexDevice.isFunctionEnable(data, function(data) {
   if (data) {
           alert('已开启');
       } else {
           alert('未开启');
		   }
});
```
> ######  **getIP //获取系统IP**

`uexDevice.getIP()`

**说明:**

获取系统IP，同步返回内网地址

**参数:**

无

**返回值:**

String 内网IP


**示例:**

```
 var ip = uexDevice.getIP();
 alert(ip);
```
> ######  **openSetting //打开设置界面** 

`uexDevice.openSetting(params)`

**说明:**

打开设置界面,iOS统一打开系统设置里App的页面

**参数:**

```
var params = {
    setting:
}
```

各字段含义如下:

| 字段名称    | 类型     | 是否必选 | 说明                                    |
| ------- | ------ | ---- | ------------------------------------- |
| setting | String | 否    | 功能名称,详情请参考[功能](#-settings-ignore-),不传时打开设置入口界面 |

**示例:**

```
var params = {
 	setting:"GPS"//位置服务功能
};
var data = JSON.stringify(params);
uexDevice.openSetting(data);
```
> ######  **startNetStatusListener //打开网络状态监听器**

`uexDevice.startNetStatusListener(params)`

**说明:**

- 打开网络状态监听器。
- 为避免内存泄露，在不需要监听网络状态时，必须调用stopNetStatusListener关闭网络状态监听器。

**参数:**

无

**版本支持:**

- iOS 4.0.3+
- Android 4.0.2+

**示例:**

```
uexDevice.startNetStatusListener();
```


> ######  **stopNetStatusListener //关闭网络状态监听器**

`uexDevice.stopNetStatusListener(params)`

**说明:**

关闭网络状态监听器。

**参数:**

无

**版本支持:**

- iOS 4.0.3+
- Android 4.0.2+

**示例:**

```
uexDevice.stopNetStatusListener();
```


###### **2.2、监听方法**<ignore>

> ######  **onOrientationChange //屏幕旋转的监听方法** 

`uexDevice.onOrientationChange(mode)`

**说明:**

该监听方法需要注册在主窗口中,注册在浮动窗口中无效.

**参数:**


| 参数名称 | 参数类型   | 是否必选 | 说明                |
| ---- | ------ | ---- | ----------------- |
| mode | Number | 是    | 屏幕方向,1-正竖屏;2-左横屏. |


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
> ######  **onNetStatusChanged //网络状态变化的监听方法**

`uexDevice.onNetStatusChanged(data)`

**说明:**

网络状态变化的监听方法。

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| data | String | 是 | 网络状态，-1：无网络连接；0：wifi网络；1:3G网络；3:4G网络。 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**


```
 uexDevice.onNetStatusChanged = function(data){
    alert(data);
};
```
#### **3、更新历史**<ignore>

###### **iOS**<ignore>

API版本: `uexDevice-4.0.8`

最近更新时间:`2019-09-09`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
| 4.0.8 |回调方法调整，放入主线程处理|
| 4.0.7 |添加iPhone XS、iPhone XS Max和iPhone XR机型model|
| 4.0.6 |网络监测回调方法不成功修改|
| 4.0.4 |plugin.xml文件配置startNetStatusListener和stopsNetStatusListener方法 |
| 4.0.3 |增加onNetStatusChanged,startNetStatusListener和stopsNetStatusListener网络监听方法  |
| 4.0.1 |添加接口getIP(),可以获取本地IP地址 |


###### **Android**<ignore>

API版本: `uexDevice-4.4.8`

最近更新时间:`2019-10-28`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
| 4.4.8 |修改广播动态根据包名去生成定制权限，避免权限冲突|
| 4.3.7 |修改部分手机获取IMEI号为空|
| 4.3.4 |添加动态权限申请|
| 4.0.4 |开启关闭屏幕常亮失效|
| 4.0.2 | 增加网络状态监听的功能    |
| 4.0.1 | 添加接口getIP(),可以获取本地IP地址     |
####  **4、附录**<ignore>

 ###### **Settings**<ignore>

| value        | 说明           |
| ------------ | ------------ |
| GPS          | GPS功能        |
| BLUETOOTH    | 蓝牙功能         |
| NOTIFICATION | 推送通知设置(仅iOS) |
| CAMERA       | 摄像头权限是否开启    |

