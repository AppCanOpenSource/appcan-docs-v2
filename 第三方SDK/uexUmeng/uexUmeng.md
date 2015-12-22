[TOC]

# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

友盟插件

## 1.1、说明
封装了友盟sdk的相关功能，事件的发送

**config.xml配置插件的方法**，示例配置代码如下： 

```
<config desc="uexUmeng" type="KEY">
	<param platform="iOS" name="$uexUmeng_APPKey$" value="562df76b67e58e0592003544"/>  
	<param platform="iOS" name="$uexUmeng_channel$" value="uex_umeng_plugin_channel"/> 
</config>

<config desc="uexUmeng" type="KEY">
	<param platform="Android" name="$uexUmeng_APPKey$" value="562df76b67e58e0592003544"/>  
	<param platform="Android" name="$uexUmeng_channel$" value="uex_umeng_plugin_channel"/> 
</config>
```

其中`562df76b67e58e0592003544`改成您自己申请到的友盟应用AppKey，`uex_umeng_plugin_channel`为应用推广渠道

## 1.2、开源源码
[点击](http://plugin.appcan.cn/details.html?id=286_index)至插件详情页（插件测试用例与插件包已经提供）

***

#2、 API预览

##2.1、 方法



> ### onEvent 发送事件

`uexUmeng.onEvent(eventName, jsonString);`

**说明**

* onEvent方法是向友盟平台发送自定义事件


**参数**

param为json字符串，包含的参数如下

| 参数名称 | 参数类型 | 是否必选 | 说明 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| eventName | String | 是 | 事件的名称| 无 | 
| jsonString | String | 否| 事件的属性 | 无| 


**平台支持**

Android 2.2+ 
iOS 7.0+ 

**版本支持**

Android 3.0.0+ 
iOS 3.0.0+ 

**示例**

```
var eventName = "sell_event"
var data = {"item":"apple"}

var json = JSON.stringify(data);
uexUmeng.onEvent(eventName, json)

```

> ### getDeviceInfo 获取设备的基本信息

`uexUmeng.getDeviceInfo();`

**说明**
获取设备的基本信息，根据用户的需求，可以将某个设备指定为测试设备，测试设备所产生的数据不会污染真实数据。测试设备的配置在http://www.umeng.com/test_devices/new

相关 [cbGetDeviceInfo](#cbGetDeviceInfo 返回设备信息) 返回设备信息的回调方法

**参数**
无

**平台支持**

Android 2.2+ 
iOS 7.0+ 

**版本支持**

Android 3.0.0+ 
iOS 3.0.0+ 

**示例**

```
uexUmeng.getDeviceInfo();

```


##2.2、 回调方法

>### cbGetDeviceInfo 返回设备信息

`uexUmeng.cbGetDeviceInfo(param);`

**说明**

* 获取设备基本信息的回调

**参数** 

param为json字符串，包含的参数如下

| 参数名称 | 参数类型 | 是否必选 | 说明 | 
| --- | --- | --- | --- | --- |
| param | String | 是 | 设备基本信息，格式如：Android格式:{"device_id": "your_device_id", "mac": "your_device_mac"} ;iOS格式:{"oid": "your_device_id"}|


**平台支持**

Android 2.2+ 
iOS 7.0+ 

**版本支持**

Android 3.0.0+ 
iOS 3.0.0+ 

**示例**

```
window.uexOnload=function(type){
  uexUmeng.cbGetDeviceInfo = function(info){
    alert(info);
  }
}
```



# 3、更新历史
 

`API 版本:uexUmeng-3.0.0(iOS) uexUmeng-3.0.0(Android)`

`最近更新时间:2015-10-23`

| 历史发布版本 | iOS更新 | 安卓更新 |
| ----- | ----- | ----- |
| 3.0.0 | uexUmeng 发布 | uexUmeng 发布 |
