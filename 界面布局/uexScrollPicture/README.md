[TOC]

#1. 简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
轮播图插件
##1.1 业务限制资源规格限制说明
轮播图插件,实现图片自动滚动联播
## 1.2 UI展示
##1.3 开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=433_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供) 


## 1.4、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。 
有特殊版本要求的API会在文档中额外说明。

## 1.5、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用。  
在后续版本中新添加的接口会在文档中额外说明。 

# 2.API概览  
##2.1、方法  
>### createNewScrollPicture   新建一个轮播图
`uexScrollPicture.createNewScrollPicture(param)`

**说明**  
新建一个轮播图

**参数**

```
var param={
	interval;//自动滚动的间隔时间,单位为毫秒,默认3000
	anchor;//float数对[X,Y] 轮播图的左上角锚点的坐标
	height;//轮播图高度
	width;//轮播图宽度
	urls;//List<String> 的json字符串
	viewId;//轮播图id
};

```

**示例**

```
var param={
	interval:2000,
	anchor:["0", "0"],
	height:400,
	width:1080,
	urls:["res://1-1.jpg","res://1-2.jpg","res://1-3.jpg","res://1-4.jpg"],
	viewId:1
};
uexScrollPicture.createNewScrollPicture(JSON.stringify(param));

```

>### startAutoScroll   开始图片轮播

`uexScrollPicture.startAutoScroll(param);`

**说明**  
开始图片轮播

**参数**

```
var param={
	viewId;//轮播图id
};
```

**示例**

```
var param={
	viewId:1
};
uexScrollPicture.startAutoScroll(JSON.stringify(param));
```

>### stopAutoScroll   停止图片轮播
`uexScrollPicture.stopAutoScroll(param)`

**说明**  
停止图片轮播

**参数**
```
var param={
	viewId;//轮播图id
};
```

**示例**

```
var param={
	viewId:1
};
uexScrollPicture.stopAutoScroll(JSON.stringify(param));
```

>### removeView   删除view
`uexScrollPicture.removeView(param)`

**说明**  
删除view

**参数**
```
var param={
	viewId;//轮播图id
};
```

**示例**

```
var param={
	viewId:1
};
uexScrollPicture.removeView(JSON.stringify(param));
```


##2.2、监听方法

>### onPicItemClick 轮播图点击事件

`uexScrollPicture.onPicItemClick(data)`

**说明**
点击时的监听函数，`onPicItemClick`的参数data是`String`类型

**参数**

```
var param={
	index:,//第几个图片被点击,从0开始
	viewId://轮播图id
}
```
 

**示例**

```
window.uexOnload=function(type){
	
	uexScrollPicture.onPicItemClick=function(data){
		alert(data);
	}

	...(其他回调或监听)
}
```

#3. 更新历史

### iOS

API版本:`uexScrollPicture-4.0.0`

最近更新时间:`2016-6-24`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 4.0插件|
| 3.0.4 | 修复手滑动的时候下面轮播点不变的bug;修改为不自动轮播、轮播点颜色 |
| 3.0.3 | 修复回调可能会被错误触发的bug |
| 3.0.2 | 添加IDE支持 |
| 3.0.1 | 图片支持网络路径 |
| 3.0.0 | 轮播图(ScrollPicture)插件 for iOS |

### Android
API版本:`uexScrollPicture-4.0.0`

最近更新时间:`2016-6-24`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 4.0插件|
| 3.0.2 | .修复闪退的问题 |
| 3.0.1 | 图片轮播图 |
