
[TOC]

# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

高德导航插件

## 1.1、说明
高德导航 SDK 是一款针对在线导航的产品，产品功能涵盖路径规划、模拟导航、获取导航播报信息等。此外，该产品的导航路径计算与实时交通信息相结合，力求为用户提供更加合理、准确、人性化的导航服务。
高德导航没有内置的语音播报，可以选择官网的云知声或者讯飞插件来播报语音

## 1.2、开源源码
插件测试用例与插件包已经提供

***

#2、 API预览

##2.1、 方法

>### init  初始化


`uexGaodeNavi.init(param)`

**说明**

初始化高德导航

回调 [cbInit](#cbInit 初始化完成的回调方法)

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

通过输入起点与终点，可以发起路径规划。

回调 [cbCalculateRoute](#cbCalculateRoute 开始路径规划的回调方法) 开始路径规划的回调方法




**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|是|param是json字符串，详情见下|

```
var param={
		startPoint;//(可选，Array)[latitude,longitude]起点 经纬度坐标 ，不传时以当前位置为起点
		endPoint;//(必选，Array)[latitude,longitude]终点 经纬度坐标
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



>### startNavi  开始导航


`uexGaodeNavi.startNavi(param)`



**说明**

成功发起路径规划后，即可以进入真实GPS导航或模拟导航。

* **成功发起路径规划后，才能调用此方法**

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|否|param是json字符串，详情见下|


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

停止导航，同时关闭导航界面

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
| param |String|否|param是json字符串，详情见下|


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
|param|String|否|param是json字符串，详情见下|


```
var param={
		result;//bool类型 true 成功 ，false失败
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



`uexGaodeNavi. onArriveDestination()`



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

回调导航信息播报的文本内容，需要通过其他语音插件来播放导航内容，如云知声插件和讯飞插件

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|否|param是json字符串，详情见下|


```
var param={
		type;//Number 播报类型，包含导航播报、前方路况播报和整体路况播报
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

>### onReCalculateRouteForTrafficJam 驾车导航时，如果前方遇到拥堵时需要重新计算路径的回调



`uexGaodeNavi. onReCalculateRouteForTrafficJam()`



**说明**

驾车导航时，如果前方遇到拥堵时需要重新计算路径的回调

**参数**

无

**平台支持**
 
iOS 6.0+    

**版本支持**
  
iOS 3.0.0+    

**示例**

```
`uexGaodeNavi. onReCalculateRouteForTrafficJam()`=function(){
	alert("onReCalculateRouteForTrafficJam");
}
```

>### onReCalculateRouteForYaw 步行或驾车导航时,出现偏航后需要重新计算路径的回调函数



`uexGaodeNavi.onReCalculateRouteForYaw()`



**说明**

步行或驾车导航时,出现偏航后需要重新计算路径的回调函数

**参数**

无

**平台支持**
 
iOS 6.0+    

**版本支持**
  
iOS 3.0.0+    

**示例**

```
`uexGaodeNavi.onReCalculateRouteForYaw`=function(){
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
 
iOS 6.0+    

**版本支持**
  
iOS 3.0.0+    

**示例**

```
`uexGaodeNavi.onStartNavi`=function(){
	alert("onStartNavi");
}
```

>### onNaviCancel 导航取消的回调



`uexGaodeNavi.onNaviCancel()`



**说明**

导航取消的回调

**参数**

无

**平台支持**
 
iOS 6.0+    

**版本支持**
  
iOS 3.0.0+    

**示例**

```
`uexGaodeNavi.onNaviCancel`=function(){
	alert("onNaviCancel");
}
```

#3、 附录

## AppKEY 申请

可以参考[高德地图的AppKEY申请指引](http://lbs.amap.com/api/android-navi-sdk/summary/)
	
## iOS 插件配置指引


## Android插件配置指引
将如下所示的value对应的值换成自己在高德上申请的秘钥即可。
```
    <config desc="uexGaodeNavi" type="KEY">
        <param name="$uexGaodeNavi_appKey$" platform="Android" value="209883bc35ae7d04176febb72a856afe"/>
    </config>
```
# 4、更新历史

`API 版本:uexGaodeNavi-3.0.0(iOS) uexGaodeNavi-3.0.2(Android)`

`最近更新时间:2015-12-16`

| 历史发布版本 | iOS更新 | 安卓更新 |
| 3.0.0 |  | 高德导航插件 |
