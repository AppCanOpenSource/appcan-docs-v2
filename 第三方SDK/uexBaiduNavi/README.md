
[TOC]

#1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

百度导航插件

##1.1、 说明
封装了百度导航的相关功能:您可以使用该插件开发适用于iOS/Android系统移动设备的导航应用，通过调用插件的相关接口，您可以轻松访问百度导航的服务和数据，构建功能丰富、交互性强的导航类应用程序。

##1.2、 当前版本插件下载
[点击]()至插件详情页（插件测试用例与插件包已经提供）

***

#2、 API预览

##2.1、 方法

>### init  初始化


`uexBaiduNavi.init(param)`

**说明**

初始化百度导航

回调 [cbInit](#cbInit 初始化完成的回调方法)



**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|是|param是json字符串，详情见下|

```
var param = {
	baiduAPIKey;//(必选，String)百度APIKey
}

```
* 百度APIKey由用户在在百度LBS开放平台申请得来


**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
var data={
		baiduAPIKey:"cCfq6oSxA8SKsHB7FopAocyX"
}
uexBaiduNavi.initBaiduNavi(JSON.stringify(data));

```

>### startRoutePlan  开始路径规划


`uexBaiduNavi.startRoutePlan(param)`

**说明**

通过输入起点与终点，可以发起路径规划。

回调 [cbStartRoutePlan](#cbStartRoutePlan 开始路径规划的回调方法) 开始路径规划的回调方法




**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|是|param是json字符串，详情见下|

```
var param={
		startNode;//(必选，Array)[longitude,latitude]起点 经纬度坐标
		endNode;//(必选，Array)[longitude,latitude]终点 经纬度坐标
		throughNodes;//(可选，Array)由[longitude,latitude]组成的数组 途经点坐标
 		mode;//(可选，Number)路径规划模式 1-默认 2-高速优先 3-少走高速
}


```



**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
 var data={
		startNode:[113.948222,22.549555],
		endNode:[114.089863,22.546236],
		throughNodes:[[113.977004,22.556393]],
		mode:2
}
uexBaiduNavi.startRoutePlan(JSON.stringify(data));

```



>### startNavi  开始导航


`uexBaiduNavi.startNavi(param)`



**说明**

成功发起路径规划后，即可以进入真实GPS导航或模拟导航。真实导航中点击转向标可以切换到文字导航模式，文字导航界面点击HUD按钮可以进入HUD导航。

监听 [onExitNavi](#onExitNavi 退出导航的监听方法) 退出导航的监听方法

* **成功发起路径规划后，才能调用此方法**

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|否|param是json字符串，详情见下|


```
var param={
		naviType;//(可选,Number)导航模式 1-真实导航 2-模拟导航
		isNeedLandscape;// (可选,Number) 是否需要横竖屏切换 (导航默认竖屏) 1-需要(默认) 2-不需要
}


```



**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
var data={
		naviType:1,
		isNeedLandscape:2
}
    
uexBaiduNavi.startNavi(JSON.stringify(data));
```


>### startDigitDog  开始巡航



`uexBaiduNavi.startDigitDog(param)`



**说明**

巡航功能：也即电子狗功能，不用输入起点终点，一键即可进行巡航模式，准确发现前方电子眼信息。


监听 [onExitDigitDog](#onExitDigitDog 退出巡航的监听方法) 退出巡航的监听方法


**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|否|param是json字符串，详情见下|


```
var param={
		isNeedLandscape;// (可选,Number) 是否需要横竖屏切换 (导航默认竖屏) 1-需要(默认) 2-不需要
}


```



**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
var data={
		isNeedLandscape:2
}
    
uexBaiduNavi.startDigitDog(JSON.stringify(data));
```


## 2.2、 回调方法

>### cbInit 初始化完成的回调方法



`uexBaiduNavi.cbInit(param)`



**说明**

初始化完成之后会触发此回调

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|否|param是json字符串，详情见下|


```
var param={
		isSuccess:,// true/false 百度导航插件初始化是否成功
}


```



**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
uexBaiduNavi.cbInit=function(json){
	alert(json);
}
```


>### cbStartRoutePlan 开始路径规划的回调方法



`uexBaiduNavi.cbStartRoutePlan(param)`



**说明**

路径规划完成之后会触发此回调

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|否|param是json字符串，详情见下|


```
var param={
		resultCode;//1-路径规划成功 2-路径规划失败 3-路径规划被取消
		errorInfo;//当且仅当路径规划失败时会包含此项，具体说明见下
}


```

|errorInfo值|对应原因|
|---|---|
|1|获取地理位置失败|
|2|无法发起算路|
|3|定位服务未开启|
|4|节点之间距离太近|
|5|节点输入有误|
|6|上次算路取消了，需要等一会儿|


**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
uexBaiduNavi.cbStartRoutePlan=function(json){
	alert(json);
}
```


##2.3、 监听方法


>### onExitNavi 退出导航的监听方法



`uexBaiduNavi.onExitNavi()`



**说明**

退出导航时会触发此监听

**参数**

无

**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
uexBaiduNavi.onExitNavi=function(){
	alert("onExitNavi");
}
```


>### onExitDeclaration 退出导航声明页面的监听方法



`uexBaiduNavi.onExitDeclaration()`



**说明**

退出导航声明页面时会触发此监听

* 仅在第一次进入导航页面时，会显示导航声明页面

**参数**

无

**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
uexBaiduNavi.onExitDeclaration=function(){
	alert("onExitDeclaration");
}
```

>### onExitDigitDog 退出巡航的监听方法



`uexBaiduNavi.onExitDigitDog()`



**说明**

退出巡航时会触发此监听

**参数**

无

**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
uexBaiduNavi.onExitDigitDog=function(){
	alert("onExitDigitDog");
}
```


#3、 附录

## iOS 插件配置指引

* iOS 直接传入AppKEY即可在**前台**正常使用导航功能
* 如果您的应用需要用到**后台导航**，需要在[config.xml中添加以下**后台权限**](http://newdocx.appcan.cn/newdocx/docx?type=1492_1291#Authority)
	* 后台音乐播放   
	* 后台定位
* 如果您没有用到其他后台权限，那么可以参考如下配置

```
<config desc="bgConfig" type="AUTHORITY">
<permission platform="iOS" info="backGroundMode" flag="3"/>
</config>
```


## Android插件配置指引


## AppKEY 申请

可以参考[百度地图的AppKEY申请指引](http://newdocx.appcan.cn/newdocx/docx?type=1384_975)
	
## TTS语音平台授权
SDK内置百度TTS语音播报功能，需要对应用进行授权验证才能够使用，因此需要主动注册应用相关信息。

可以在[导航TTS平台](http://app.navi.baidu.com/ttsregister/appinfo)中进行注册申请

