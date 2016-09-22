[TOC]

# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

友盟插件

## 1.1、说明
封装了友盟sdk的相关功能，事件的发送

**config.xml配置插件的方法**，示例配置代码如下： 

```xml
<config desc="uexUmeng" type="KEY">
	<param platform="iOS" name="$uexUmeng_APPKey$" value="562df76b67e58e0592003544"/>  
	<param platform="iOS" name="$uexUmeng_channel$" value="uex_umeng_plugin_channel"/> 
</config>

<config desc="uexUmeng" type="KEY">
	<param platform="Android" name="$uexUmeng_APPKey$" value="562df76b67e58e0592003544"/>  
	<param platform="Android" name="$uexUmeng_channel$" value="uex_umeng_plugin_channel"/> 
</config>
```

其中`562df76b67e58e0592003544`改成您自己申请到的友盟应用AppKey，`uex_umeng_plugin_channel`为应用推广渠道，用户自定义，替换为您应用的推广渠道名称。  
注意：渠道会作为一个数据细分的维度,例如在豌豆荚渠道推广此包，代码示例
`<param platform="Android" name="$uexUmeng_channel$" value="Wandoujia"/>`默认不填为unknown  

渠道命名规范：  
1.可以由英文字母、阿拉伯数字、下划线、中划线、空格、括号组成，可以含汉字以及其他明文字符，但是不建议使用中文命名，会出现乱码。  
2.首尾字符不可以为空格  
3.不要使用纯数字作为渠道ID  
4.最多256个字符  
5."unknown" 及其各种大小写形式，作为友盟保留的字段，不可以作为渠道名


## 1.2、开源源码
[点击](http://plugin.appcan.cn/details.html?id=286_index)至插件详情页（插件测试用例与插件包已经提供）

## 1.3、平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统

有特殊版本要求的API会在文档中额外说明

## 1.4、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用

在后续版本中新添加的接口会在文档中额外说明
***

#2、 API预览

##2.1、 方法



### 🍭 onEvent 发送事件

`uexUmeng.onEvent(eventName, jsonString);`

**说明**

* onEvent方法是向友盟平台发送自定义事件


**参数**

| 参数名称       | 参数类型   | 是否必选 | 说明    | 默认值  |
| ---------- | ------ | ---- | ----- | ---- |
| eventName  | String | 是    | 事件的名称 | 无    |
| jsonString | String | 否    | 事件的属性 | 无    |

**示例**

```javascript
var eventName = "sell_event"
var data = {
  "item":"apple"
}
uexUmeng.onEvent(eventName, data)
```

###🍭  getDeviceInfo 获取设备的基本信息

`uexUmeng.getDeviceInfo();`

**说明**
获取设备的基本信息，根据用户的需求，可以将某个设备指定为测试设备，测试设备所产生的数据不会污染真实数据。测试设备的配置在http://www.umeng.com/test_devices/new
**参数**

无

**返回值**

Object类型设备的基本信息，返回的数据格式如下:

```javascript
{
	"device_id":, //设备id
	"mac": //设备Mac地址，仅Android支持
}
```


**示例**

```javascript
var info = uexUmeng.getDeviceInfo();
alert(JSON.stringify(info));
```

# 3、更新历史


### iOS

API版本:`uexUmeng-4.0.0`

最近更新时间:`2016-8-16`

| 历史发布版本 | 更新内容        |
| ------ | ----------- |
| 4.0.0  | uexUmeng 发布 |

### Android

API版本:`uexUmeng-4.0.0`

最近更新时间:`2016-8-16`

| 历史发布版本 | 更新内容        |
| ------ | ----------- |
| 4.0.0  | uexUmeng 发布 |
