
[TOC]

# 1､简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

高德导航插件

## 1.1､说明
高德导航 SDK 是一款针对在线导航的产品,产品功能涵盖路径规划､模拟导航､获取导航播报信息等.此外,该产品的导航路径计算与实时交通信息相结合,力求为用户提供更加合理､准确､人性化的导航服务.
高德导航没有内置的语音播报,可以选择官网的云知声或者讯飞插件来播报语音
## 1.2､UI展示
 ![](/docImg/975/134442r2016e3z30rb&#40;1&#41;.png)
## 1.3､开源源码
自定义beta版插件与源码下载:[点击](http://plugin.appcan.cn/details.html?id=580_index) 插件中心至插件详情页 (插件测试用例已经提供)

## 1.4､平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

#2､ API预览

##2.1､ 方法

### 🍭 init  初始化

`uexGaodeNavi.init(param,cb)`

**说明**

初始化高德导航

**参数**

| 参数名称  | 参数类型     | 是否必选 | 说明             |
| ----- | -------- | ---- | -------------- |
| param | Object   | 否    | param是初始化需要的参数 |
| cb    | Function | 否    | 初始化的回调函数       |

```javascript
var param = {
	appKey:
};
```

各字段含义如下:

| 字段名称   | 类型     | 是否必选 | 说明             |
| ------ | ------ | ---- | -------------- |
| appKey | String | 否    | 仅iOS,高德的appKey |


* iOS 在线打包支持`通过init传入AppKey`或者`通过config.xml配置appKey`
* iOS IDE打包只支持`通过init传入AppKey`
* Android 在线打包只支持`通过config.xml配置appKey`
* Android 不支持IDE打包使用

**回调参数:**

```javascript
var cb = function(error){}
```

| 参数名称  | 参数类型   | 说明                          |
| ----- | ------ | --------------------------- |
| error | Number | 初始化结果,为0表示初始化成功,非0时表示初始化失败; |

**示例**

```
uexGaodeNavi.init();
```

### 🍭 calculateWalkRoute  开始步行路径规划

`uexGaodeNavi.calculateWalkRoute(param,cb)`

**说明**

通过输入起点与终点,可以发起路径规划.

**参数**

| 参数名称  | 参数类型     | 是否必选 | 说明                   |
| ----- | -------- | ---- | -------------------- |
| param | Object   | 是    | param是路径规划需要的参数,详情见下 |
| cb    | Function | 是    | 路径规划的回调函数            |

```javascript
var param = {
	startPoint:,
	endPoint:
};
```

各字段含义如下:

| 字段名称       | 类型    | 是否必选 | 说明                                       |
| ---------- | ----- | ---- | ---------------------------------------- |
| startPoint | Array | 否    | [latitude,longitude]起点 经纬度坐标 ,不传时以当前位置为起点 |
| endPoint   | Array | 是    | [latitude,longitude]终点 经纬度坐标             |

**回调参数:**

```javascript
var cb = function(error){}
```

| 参数名称  | 参数类型   | 说明                      |
| ----- | ------ | ----------------------- |
| error | Number | 为0表示路径规划成功,非0时表示路径规划失败; |

**示例**

```javascript
uexGaodeNavi.calculateWalkRoute({
		startPoint:[39.925846, 116.432765],
    	endPoint:[39.925041, 116.437901]
	},
    function(error){
  		alert(error);
	});
```

### 🍭 calculateDriveRoute  开始驾车路径规划

`uexGaodeNavi.calculateDriveRoute(param,cb)`

**说明**

通过输入起点与终点,可以发起路径规划.

**参数**

| 参数名称  | 参数类型     | 是否必选 | 说明                   |
| ----- | -------- | ---- | -------------------- |
| param | Object   | 是    | param是路径规划需要的参数,详情见下 |
| cb    | Function | 是    | 路径规划的回调函数            |

```javascript
var param = {
		startPoint:,
		startPoints:,
		endPoint:,
		endPoints:,
		wayPoints:,
		driveMode:
};
```

各字段含义如下:

| 字段名称        | 类型     | 是否必选            | 说明                                       |
| ----------- | ------ | --------------- | ---------------------------------------- |
| startPoint  | Array  | 否               | [latitude,longitude]起点 经纬度坐标 ,不传时以当前位置为起点 |
| startPoints | Array  | 否               | 起点,由[latitude,longitude]组成的数组            |
| endPoint    | Array  | 否               | [latitude,longitude]终点 经纬度坐标             |
| endPoints   | Array  | 否,与endPoint必传一个 | 终点,由[latitude,longitude]组成的数组            |
| wayPoints   | Array  | 否               | 途径地点,由[latitude,longitude]组成的数组          |
| driveMode   | Number | 否               | 0.速度优先 1.花费最少 2.距离最短 3.不走高速 4.时间最短且躲避拥堵 5.不走收费道路且躲避拥堵,默认为0 |

* 起点列表的尾点为实际导航起点,其他坐标点为辅助信息,带有方向性,可有效避免算路到马路的另一侧.
* 终点列表的尾点为实际导航终点,其他坐标点为辅助信息,带有方向性,可有效避免算路到马路的另一侧.
* 支持最多3个途经点的路径规划

**回调参数:**

```javascript
var cb = function(error){}
```

| 参数名称  | 参数类型   | 说明                      |
| ----- | ------ | ----------------------- |
| error | Number | 为0表示路径规划成功,非0时表示路径规划失败; |

**示例**

```javascript
uexGaodeNavi.calculateDriveRoute({
		startPoint:[39.925846, 116.432765],
		wayPoints:[[39.925846, 116.432345],[39.925846, 116.432789]],
		endPoint:[39.925041, 116.437901]
 	},
	function(error){
  		alert(error);
	});
```

### 🍭 startNavi  开始导航

`uexGaodeNavi.startNavi(param)`

**说明**

成功发起路径规划后,即可以进入真实GPS导航或模拟导航.

* **成功发起路径规划后,才能调用此方法**

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | Object | 否    | param是导航的配置参数,详情见下 |

```javascript
var param = {
	type:
};
```

各字段含义如下:

| 字段名称 | 类型     | 是否必选 | 说明                 |
| ---- | ------ | ---- | ------------------ |
| type | Number | 否    | 导航模式 0-真实导航 1-模拟导航 |

**示例**

```javascript
uexGaodeNavi.startNavi({
	type:1
});
```

### 🍭 stopNavi 停止导航

`uexGaodeNavi.stopNavi()`

**说明**

停止导航,同时关闭导航界面

* 不会触发[onNaviCancel 导航取消的回调](#onNaviCancel)

**参数**

无

**示例**

```
uexGaodeNavi.stopNavi();
```

##2.2､ 监听方法

### 🍭 onArriveDestination 到达目的地

`uexGaodeNavi.onArriveDestination()`

**说明**

到达目的地时会触发此监听

**参数**

无

**示例**

```javascript
uexGaodeNavi.onArriveDestination = function(){
	alert("onExitNavi!");
};
```

### 🍭 onGetNavigationText 导航播报的监听方法

`uexGaodeNavi.onGetNavigationText()`

**说明**

回调导航信息播报的文本内容,需要通过其他语音插件来播放导航内容,如云知声插件和讯飞插件

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | String | 否    | param是json字符串,详情见下 |

```javascript
var param = {
	text:,//播报文字
};
```

**示例**

```javascript
uexGaodeNavi.onGetNavigationText = function(param){
  	var data = JSON.parse(param);
	alert(data.text);
}
```

### 🍭 onReCalculateRouteForTrafficJam 驾车导航时,如果前方遇到拥堵时重新计算路径的回调

`uexGaodeNavi.onReCalculateRouteForTrafficJam()`

**说明**

驾车导航时,如果前方遇到拥堵时会重新计算路径,同时触发此回调函数

* 仅Android有此回调,iOS不支持此方法

**参数**

无


**示例**

```javascript
uexGaodeNavi.onReCalculateRouteForTrafficJam = function(){
	alert("onReCalculateRouteForTrafficJam");
}
```

### 🍭 onReCalculateRouteForYaw 步行或驾车导航时,出现偏航后重新计算路径的回调函数

`uexGaodeNavi.onReCalculateRouteForYaw()`

**说明**

步行或驾车导航时,出现偏航后会重新计算路径,同时触发此回调函数

**参数**

无

**示例**

```javascript
uexGaodeNavi.onReCalculateRouteForYaw = function(){
	alert("onReCalculateRouteForYaw");
}
```

### 🍭 onStartNavi 导航开始的回调

`uexGaodeNavi.onStartNavi()`

**说明**

导航开始的回调

**参数**

无

**示例**

```javascript
uexGaodeNavi.onStartNavi = function(){
	alert("onStartNavi");
}
```

### 🍭 onNaviCancel 导航取消的回调

`uexGaodeNavi.onNaviCancel()`

**说明**

导航取消的回调

* 点击导航页面内的取消按钮时会触发此方法
* 调用接口[stopNavi 停止导航](#stopNavi)取消导航时**不会**触发此方法

**参数**

无

**示例**

```javascript
uexGaodeNavi.onNaviCancel = function(){
	alert("onNaviCancel");
}
```

#3､ 附录

## AppKEY 申请

可以参考[高德地图的AppKEY申请指引](http://lbs.amap.com/api/android-navi-sdk/summary/)
​	
## iOS 插件配置指引
在线打包时,可以在config.xml里配置key,也可以在init方法中直接传入key
IDE打包只支持init方法传入key

config.xml配置方法:将如下所示的value对应的值换成自己在高德上申请的秘钥即可.

```xml
<config desc="uexGaodeNavi" type="KEY">
    <param name="$uexGaodeNavi_appKey$" platform="iOS" value="209883bc35ae7d04176febb72a856afe"/>
</config>
```

## Android插件配置指引
安卓只支持在线打包正常使用,将如下所示的value对应的值换成自己在高德上申请的秘钥即可.

```xml
<config desc="uexGaodeNavi" type="KEY">
    <param name="$uexGaodeNavi_appKey$" platform="Android" value="209883bc35ae7d04176febb72a856afe"/>
</config>
```
# 4､更新历史

### iOS

API版本: `uexGaodeNavi-4.0.1`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.1 | SDK 升级,支持ATS |
| 4.0.0 | uexGaodeNavi for iOS |

### Android

API版本: `uexGaodeNavi-4.0.2`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.2 | 更新SDK |
| 4.0.1 | 4.0 |
| 4.0.0 | init |
