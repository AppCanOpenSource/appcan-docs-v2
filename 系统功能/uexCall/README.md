[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
打电话功能插件
## 1.1、说明
 本对象封装了用于调用系统通话功能的方法,可以调用系统拨号界面连接打电话。
 视频通话功能接口只适用iOS系统,其他接口功能支持跨平台使用
## 1.2、UI展示
![](http://newdocx.appcan.cn/docximg/151357a2015e6s7w.jpg)
## 1.3、公告 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fnew.gif)]() 
 (公告:直接拨号接口由于涉及隐私权限,官方已废弃)
 原因如下:
    uexCall的call直接拨打电话接口和uexSMS的send直接发送短信接口都需要预先配置相应的权限。而这些权限对于手机系统来说,属于敏感权限。因此如果应用中带有这些权限,在上某些应用市场审核时,会被驳回。(已有开发者反馈该问题)但不影响功能使用,可以使用跳到拨号或者短信界面,使用`uexCall.dial(number) uexSMS.open(phoneNum, content)`方法
## 1.4、开源源码
插件测试用例与源码下载:<a href="http://plugin.appcan.cn/details.html?id=158_index" target="_blank">点击此处</a>
#2、API概览
## 2.1、方法

> ###dial  调用系统拨号界面

``
uexCall.dial(number)
``

**说明**

调用系统拨号界面并显示要拨打的电话号码

**参数**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| number | String | 是 | 电话号码 |

**平台支持**

Android2.2+
iOS6.0+

**版本支持**

3.0.0+

**示例**

```
uexCall.dial("10086");
```
> ### faceTime   视频通话

`uexCall.faceTime(number)`

**说明**

调用faceTime进行视频通话

**参数**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| number | String | 是 | 对方电话号码或AppleID |

**平台支持**

iOS6.0+

**版本支持**

3.0.0+

**示例**

```
uexCall.faceTime("10086");
```

 
 # 3、更新历史

### iOS

API版本:`uexCall-3.0.3`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.3 | 添加IDE支持 |
| 3.0.2 | uexCall.call方法取消"应用程序需要 拨打电话,是否确定拨号?"的提示 |
| 3.0.1 | 使用新版Xcode重新编译,支持arm64 |
| 3.0.0 | 打电话功能插件 |

### Android

API版本:`uexCall-3.0.3`

最近更新时间:`2015-08-31`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.3 | plugin文件中添加call接口,兼容老版本插件 |
| 3.0.2 | 兼容老版本插件 |
| 3.0.1 | 去掉直接拨打电话的接口 |
| 3.0.0 | 打电话功能插件 |
