
[TOC]

# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

高德导航插件

## 1.1、说明
高德导航 SDK 是一款针对在线导航的产品,产品功能涵盖路径规划、模拟导航、获取导航播报信息等。此外,该产品的导航路径计算与实时交通信息相结合,力求为用户提供更加合理、准确、人性化的导航服务。
高德导航没有内置的语音播报,可以选择官网的云知声或者讯飞插件来播报语音
## 1.2、UI展示
 ![](/docImg/975/134442r2016e3z30rb&#40;1&#41;.png)
## 1.3、开源源码
自定义beta版插件与源码下载:[点击](http://plugin.appcan.cn/details.html?id=580_index) 插件中心至插件详情页 (插件测试用例已经提供)

#2、 API预览

##2.1、 方法

>### init  初始化

`uexGaodeNavi.init(param)`

**说明**

初始化高德导航

回调 [cbInit](#cbInit 初始化完成的回调方法)

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|是|param是json字符串,详情见下|

```
var param={
	appKey;//(可选,String,仅iOS)高德的appKey
}

```

* iOS 在线打包支持`通过init传入AppKey`或者`通过config.xml配置appKey`
* iOS IDE打包只支持`通过init传入AppKey`
* Android 在线打包只支持`通过config.xml配置appKey`
* Android 不支持IDE打包使用

**平台支持**

Android 4.0+    
iOS 6.0+    

**版本支持**

Android 3.2.0+    
iOS 3.0.0+    

**示例**

```
uexGaodeNavi.init();

```

>### calculateWalkRoute  开始步行路径规划

`uexGaodeNavi.calculateWalkRoute(param)`

**说明**

通过输入起点与终点,可以发起路径规划。

回调 [cbCalculateRoute](#cbCalculateRoute 开始路径规划的回调方法) 开始路径规划的回调方法

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|是|param是json字符串,详情见下|

```
var param={
		startPoint;//(可选,Array)[latitude,longitude]起点 经纬度坐标 ,不传时以当前位置为起点
		endPoint;//(必选,Array)[latitude,longitude]终点 经纬度坐标
}

```

**平台支持**

Android 4.0+    
iOS 6.0+    

**版本支持**

Android 3.2.0+    
iOS 3.0.0+    

**示例**

```
 var data={
		 startPoint:[39.925846, 116.432765],
        endPoint:[39.925041, 116.437901]
}
      var data = JSON.stringify(params);
      uexGaodeNavi.calculateWalkRoute(data);

```

>### calculateDriveRoute  开始驾车路径规划

`uexGaodeNavi.calculateDriveRoute(param)`

**说明**

通过输入起点与终点,可以发起路径规划。

回调 [cbCalculateRoute](#cbCalculateRoute 开始路径规划的回调方法) 开始路径规划的回调方法

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|是|param是json字符串,详情见下|

```
var param={
		startPoint;//(可选,Array)[latitude,longitude]起点 经纬度坐标 ,不传时以当前位置为起点
		startPoints;//(可选,由[latitude,longitude]组成的数组) 
		endPoint;//(与endPoints必传一个,Array)[latitude,longitude]终点 经纬度坐标
		endPoints;//(与endPoint必传一个,由[latitude,longitude]组成的数组)终点
		wayPoints;//(可选,由[latitude,longitude]组成的数组)途径地点
		driveMode://(可选,Number,默认为0)0.速度优先 1.花费最少 2.距离最短 3.不走高速 4.时间最短且躲避拥堵 5.不走收费道路且躲避拥堵
}

```

* 起点列表的尾点为实际导航起点,其他坐标点为辅助信息,带有方向性,可有效避免算路到马路的另一侧。
* 终点列表的尾点为实际导航终点,其他坐标点为辅助信息,带有方向性,可有效避免算路到马路的另一侧。
* 支持最多3个途经点的路径规划

**平台支持**

Android 4.0+    
iOS 6.0+    

**版本支持**

Android 3.2.0+    
iOS 3.0.0+    

**示例**

```
 var data={
		startPoint:[39.925846, 116.432765],
		wayPoints:[[39.925846, 116.432345],[39.925846, 116.432789]],
		endPoint:[39.925041, 116.437901]
 }
 var data = JSON.stringify(params);
 uexGaodeNavi.calculateDriveRoute(data);

```

>### startNavi  开始导航

`uexGaodeNavi.startNavi(param)`

**说明**

成功发起路径规划后,即可以进入真实GPS导航或模拟导航。

* **成功发起路径规划后,才能调用此方法**

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|否|param是json字符串,详情见下|

```
var param={
		type;//(可选,Number)导航模式 0-真实导航 1-模拟导航
}

```

**平台支持**

Android 4.0+    
iOS 6.0+    

**版本支持**

Android 3.2.0+    
iOS 3.0.0+    

**示例**

```
   var params = {
            type:1
        };
        var data = JSON.stringify(params);
        uexGaodeNavi.startNavi(data);
```

>### stopNavi 停止导航

`uexGaodeNavi.stopNavi()`

**说明**

停止导航,同时关闭导航界面

* 不会触发[onNaviCancel 导航取消的回调](#onNaviCancel)

**参数**

无

**平台支持**

Android 4.0+    
iOS 6.0+    

**版本支持**

Android 3.2.0+    
iOS 3.0.0+    

**示例**

```
uexGaodeNavi.stopNavi();
```

## 2.2、 回调方法

>### cbInit 初始化完成的回调方法

`uexGaodeNavi.cbInit(param)`

**说明**

初始化完成之后会触发此回调

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| param |String|否|param是json字符串,详情见下|

```
var param={
		result:,// true/false 初始化是否成功
}

```

**平台支持**

Android 4.0+    
iOS 6.0+    

**版本支持**

Android 3.2.0+    
iOS 3.0.0+    

**示例**

```
uexGaodeNavi.cbInit=function(json){
	alert(json);
}
```

>### cbCalculateRoute 路径规划的回调方法

`uexGaodeNavi.cbCalculateRoute(param)`

**说明**

路径规划完成之后会触发此回调

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|否|param是json字符串,详情见下|

```
var param={
		result;//bool类型 true 成功 ,false失败
}

```

**平台支持**

Android 4.0+    
iOS 6.0+    

**版本支持**

Android 3.2.0+    
iOS 3.0.0+    

**示例**

```
uexGaodeNavi.cbCalculateRoute=function(json){
	alert(json);
}
```

##2.3、 监听方法

>### onArriveDestination 到达目的地

`uexGaodeNavi.onArriveDestination()`

**说明**

到达目的地时会触发此监听

**参数**

无

**平台支持**

Android 4.0+    
iOS 6.0+    

**版本支持**

Android 3.2.0+    
iOS 3.0.0+    

**示例**

```
uexGaodeNavi.onArriveDestination =function(){
	alert("onExitNavi");
}
```

>### onGetNavigationText 导航播报的监听方法

`uexGaodeNavi.onGetNavigationText()`

**说明**

回调导航信息播报的文本内容,需要通过其他语音插件来播放导航内容,如云知声插件和讯飞插件

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|否|param是json字符串,详情见下|

```
var param={
		text;//播报文字
}

```

**平台支持**

Android 4.0+    
iOS 6.0+    

**版本支持**

Android 3.2.0+    
iOS 3.0.0+    

**示例**

```
uexGaodeNavi.onGetNavigationText =function(param){
	alert(param);
}
```

>### onReCalculateRouteForTrafficJam 驾车导航时,如果前方遇到拥堵时重新计算路径的回调

`uexGaodeNavi.onReCalculateRouteForTrafficJam()`

**说明**

驾车导航时,如果前方遇到拥堵时会重新计算路径,同时触发此回调函数

* iOS不支持此回调

**参数**

无

**平台支持**

Android 4.0+    

**版本支持**

Android 3.2.0+    
 

**示例**

```
uexGaodeNavi.onReCalculateRouteForTrafficJam()=function(){
	alert("onReCalculateRouteForTrafficJam");
}
```

>### onReCalculateRouteForYaw 步行或驾车导航时,出现偏航后重新计算路径的回调函数

`uexGaodeNavi.onReCalculateRouteForYaw()`

**说明**

步行或驾车导航时,出现偏航后会重新计算路径,同时触发此回调函数

**参数**

无

**平台支持**

Android 4.0+    
iOS 6.0+    

**版本支持**

Android 3.2.0+    
iOS 3.0.0+     

**示例**

```
uexGaodeNavi.onReCalculateRouteForYaw=function(){
	alert("onReCalculateRouteForYaw");
}
```

>### onStartNavi 导航开始的回调

`uexGaodeNavi.onStartNavi()`

**说明**

导航开始的回调

**参数**

无

**平台支持**

Android 4.0+    
iOS 6.0+    

**版本支持**

Android 3.2.0+    
iOS 3.0.0+    

**示例**

```
uexGaodeNavi.onStartNavi=function(){
	alert("onStartNavi");
}
```

>### onNaviCancel 导航取消的回调

`uexGaodeNavi.onNaviCancel()`

**说明**

导航取消的回调

* 点击导航页面内的取消按钮时会触发此方法
* 调用接口[stopNavi 停止导航](#stopNavi)取消导航时**不会**触发此方法

**参数**

无

**平台支持**

Android 4.0+    
iOS 6.0+    

**版本支持**

Android 3.2.0+    
iOS 3.0.0+    

**示例**

```
uexGaodeNavi.onNaviCancel=function(){
	alert("onNaviCancel");
}
```

#3、 附录

## AppKEY 申请

可以参考[高德地图的AppKEY申请指引](http://lbs.amap.com/api/android-navi-sdk/summary/)
	
## iOS 插件配置指引
在线打包时,可以在config.xml里配置key,也可以在init方法中直接传入key
IDE打包只支持init方法传入key

config.xml配置方法:将如下所示的value对应的值换成自己在高德上申请的秘钥即可。

```
<config desc="uexGaodeNavi" type="KEY">
    <param name="$uexGaodeNavi_appKey$" platform="iOS" value="209883bc35ae7d04176febb72a856afe"/>
</config>
```

## Android插件配置指引
安卓只支持在线打包正常使用,将如下所示的value对应的值换成自己在高德上申请的秘钥即可。

```
<config desc="uexGaodeNavi" type="KEY">
    <param name="$uexGaodeNavi_appKey$" platform="Android" value="209883bc35ae7d04176febb72a856afe"/>
</config>
```
# 4、更新历史

### iOS

API版本:`uexGaodeNavi-3.0.0`

最近更新时间:`2015-12-30`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | uexGaodeNavi for iOS |

### Android

API版本:`uexGaodeNavi-3.0.0`

最近更新时间:`2015-12-16`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 高德导航插件 |
