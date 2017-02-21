
[TOC]

# 1､简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

百度导航插件

## 1.1､说明
封装了百度导航的相关功能:您可以使用该插件开发适用于iOS/Android系统移动设备的导航应用,通过调用插件的相关接口,您可以轻松访问百度导航的服务和数据,构建功能丰富､交互性强的导航类应用程序.
>注:暂不支持IDE使用,使用此插件之前需要进行config.xml相关配置且在线打包,否则无法正常编译,详见[附录](#3､ 附录 "附录")

## 1.2､开源源码
[点击]()至插件详情页(插件测试用例与插件包已经提供)

## 1.3､平台版本支持

本插件的所有API默认支持**Android4.4+**和**iOS7.1+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.4､接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

#2､ API预览

##2.1､ 方法

### 🍭 init  初始化

`uexBaiduNavi.init(param,callback)`

**说明**

初始化百度导航

**参数**

| 参数名称     | 参数类型     | 是否必选 | 说明                 |
| -------- | -------- | ---- | ------------------ |
| param    | Object   | 是    | param是json字符串,详情见下 |
| callback | Function | 否    | init的回调函数          |

```
var param = {
	baiduAPIKey:
}
```
各字段含义如下:

| 字段名称        | 类型     | 是否必选 | 说明       |
| ----------- | ------ | ---- | -------- |
| baiduAPIKey | String | 是    | 百度APIKey |

* 百度APIKey由用户在在百度LBS开放平台申请得来

**回调参数**

```javascript
var callback=function(error,data){}
```

| 参数名称  | 参数类型   | 说明           |
| ----- | ------ | ------------ |
| error | Number | 0表示成功,其他表示失败 |
| data  | String | 失败时返回相关错误信息  |

**示例**

```javascript
var data={
	baiduAPIKey:"cCfq6oSxA8SKsHB7FopAocyX"
}
uexBaiduNavi.init(data,function(error,data){
  	if(!error){
      	elert("初始化成功");
  	}
});
```

### 🍭 startRoutePlan  开始路径规划

`uexBaiduNavi.startRoutePlan(param,callback)`

**说明**

通过输入起点与终点,可以发起路径规划.百度导航使用gps坐标系,使用前需要转换成百度坐标系(百度地图)防止定位偏差.

**参数**

| 参数名称     | 参数类型     | 是否必选 | 说明                 |
| -------- | -------- | ---- | ------------------ |
| param    | Object   | 是    | param是json字符串,详情见下 |
| callback | Function | 否    | 规划完成的回调            |

```javascript
var param={
		startNode:,
		endNode:,
		throughNodes:,
 		mode:
}
```

各字段含义如下:

| 字段名称         | 类型     | 是否必选 | 说明                               |
| ------------ | ------ | ---- | -------------------------------- |
| startNode    | Array  | 是    | [longitude,latitude]起点 经纬度坐标     |
| endNode      | Array  | 是    | [longitude,latitude]终点 经纬度坐标     |
| throughNodes | Array  | 否    | 由[longitude,latitude]组成的数组 途经点坐标 |
| mode         | Number | 否    | 路径规划模式 1-默认 2-高速优先 3-少走高速        |

**回调参数**

```javascript
var callback=function(error,data){}
```

| 参数名称  | 参数类型   | 说明           |
| ----- | ------ | ------------ |
| error | Number | 0表示成功,其他表示失败 |
| data  | String | 失败时返回相关错误信息  |

| error值 | 对应原因           |
| ------ | -------------- |
| 1      | 获取地理位置失败       |
| 2      | 无法发起算路         |
| 3      | 定位服务未开启        |
| 4      | 节点之间距离太近       |
| 5      | 节点输入有误         |
| 6      | 上次算路取消了,需要等一会儿 |

**示例**

```javascript
 var data={
	startNode:[113.948222,22.549555],
	endNode:[114.089863,22.546236],
	throughNodes:[[113.977004,22.556393]],
	mode:2
}
uexBaiduNavi.startRoutePlan(data,function(error,data){
  	if(!error){
      //路径规划成功
  	}
});
```

### 🍭 startNavi  开始导航

`uexBaiduNavi.startNavi(param)`

**说明**

成功发起路径规划后,即可以进入真实GPS导航或模拟导航.真实导航中点击转向标可以切换到文字导航模式,文字导航界面点击HUD按钮可以进入HUD导航.

监听 [onExitNavi](#onExitNavi 退出导航的监听方法) 退出导航的监听方法

* **成功发起路径规划后,才能调用此方法**

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | Object | 否    | param是json字符串,详情见下 |

```javascript
var param={
	naviType:,
	isNeedLandscape:
}
```

各字段含义如下:

| 字段名称            | 类型     | 是否必选 | 说明                                |
| --------------- | ------ | ---- | --------------------------------- |
| naviType        | Number | 否    | 导航模式 1-真实导航 2-模拟导航                |
| isNeedLandscape | Number | 否    | 是否需要横竖屏切换 (导航默认竖屏) 1-需要(默认) 2-不需要 |

**示例**

```javascript
var data={
	naviType:1,
	isNeedLandscape:2
}
uexBaiduNavi.startNavi(data);
```

### 🍭 exitNavi  退出导航

`uexBaiduNavi.exitNavi()`

**说明**

安静退出导航,不会有提示框出现

监听 [onExitNavi](#onExitNavi 退出导航的监听方法) 退出导航的监听方法

**参数**

无

**示例**

```
uexBaiduNavi.exitNavi();
```

### 🍭 startDigitDog  开始巡航

`uexBaiduNavi.startDigitDog(param)`

**说明**

巡航功能:也即电子狗功能,不用输入起点终点,一键即可进行巡航模式,准确发现前方电子眼信息.

监听 [onExitDigitDog](#onExitDigitDog 退出巡航的监听方法) 退出巡航的监听方法

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | Object | 否    | param是json字符串,详情见下 |

```javascript
var param={
		isNeedLandscape:
}
```

各字段含义如下:

| 字段名称            | 类型     | 是否必选 | 说明                                |
| --------------- | ------ | ---- | --------------------------------- |
| isNeedLandscape | Number | 否    | 是否需要横竖屏切换 (导航默认竖屏) 1-需要(默认) 2-不需要 |

**示例**

```javascript
var data={
	isNeedLandscape:2
}
uexBaiduNavi.startDigitDog(data);
```

##2.2､ 监听方法

### 🍭 onExitNavi 退出导航的监听方法

`uexBaiduNavi.onExitNavi()`

**说明**

退出导航时会触发此监听

**参数**

无

**示例**

```
uexBaiduNavi.onExitNavi=function(){
	alert("onExitNavi");
}
```

### 🍭 onExitDeclaration 退出导航声明页面的监听方法

`uexBaiduNavi.onExitDeclaration()`

**说明**

退出导航声明页面时会触发此监听

* 仅在第一次进入导航页面时,会显示导航声明页面

**参数**

无

**示例**

```
uexBaiduNavi.onExitDeclaration=function(){
	alert("onExitDeclaration");
}
```

### 🍭 onExitDigitDog 退出巡航的监听方法

`uexBaiduNavi.onExitDigitDog()`

**说明**

退出巡航时会触发此监听

**参数**

无

**示例**

```
uexBaiduNavi.onExitDigitDog=function(){
	alert("onExitDigitDog");
}
```

#3､ 附录

## AppKEY 申请

可以参考[百度地图的AppKEY申请指引](http://newdocx.appcan.cn/newdocx/docx?type=1384_975)
​	
## TTS语音平台授权
SDK内置百度TTS语音播报功能,需要对应用进行授权验证才能够使用,因此需要主动注册应用相关信息.

可以在[导航TTS平台](http://app.navi.baidu.com/ttsregister/appinfo)中进行注册申请

## iOS 插件配置指引

* iOS 直接传入AppKEY即可在**前台**正常使用导航功能
* 如果您的应用需要用到**后台导航**,需要在[config.xml中添加以下**后台权限**](http://newdocx.appcan.cn/newdocx/docx?type=1492_1291#Authority)
  * 后台音乐播放   
  * 后台定位
* 如果您没有用到其他后台权限,那么可以参考如下配置

```xml
<config desc="bgConfig" type="AUTHORITY">
	<permission platform="iOS" info="backGroundMode" flag="3"/>
</config>
```

## Android插件配置指引
将如下所示的value对应的值换成自己在百度上申请的秘钥即可.
```xml
<config desc="uexBaiduNavi" type="KEY">
   <param name="$uexBaiduNavi_ApiKey$" platform="Android" value="BMZtlp2EMfWQgMG8nOqu6KzG"/>
</config>
```

附:[百度私钥申请地址](http://developer.baidu.com/map/index.php?title=android-navsdk/guide/key)
[安全码生成流程](http://newdocx.appcan.cn/newdocx/docx?type=1384_975)

如果需要使用语音播报,需要按照如下指引申请TTS白名单注册:
http://developer.baidu.com/map/index.php?title=android-navsdk/guide/voice

# 4､更新历史

### iOS

API版本: `uexBaiduNavi-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| unknown | ----- |

### Android

API版本: `uexBaiduNavi-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 4.0 |
