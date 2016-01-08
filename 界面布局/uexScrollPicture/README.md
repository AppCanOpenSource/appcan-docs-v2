[TOC]

#1. 简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
轮播图插件
##1.1 业务限制资源规格限制说明
轮播图插件,实现图片自动滚动联播
## 1.2 UI展示
##1.3 开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=433_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供) 

# 2.API概览
##2.1.新建一个轮播图

```
createNewScrollPicture(param)
var param={
	interval;//自动滚动的间隔时间,单位为毫秒,默认3000
	anchor;//float数对[X,Y] 轮播图的左上角锚点的坐标
	height;//轮播图高度
	width;//轮播图宽度
	urls;//List<String> 的json字符串
	viewId;//轮播图id
};

```

## 2.2.开始图片轮播

```
startAutoScroll(param);
var param={
	viewId;//轮播图id
};
```

## 2.3.停止图片轮播
```
stopAutoScroll(param);
var param={
	viewId;//轮播图id
};
```

## 2.4.删除view
```
removeView(param)
var param={
	viewId://轮播图id
}
```

## 2.5.轮播图点击事件

```
onPicItemClick(param)
var param={
	index:,//第几个图片被点击,从0开始
	viewId://轮播图id
}
```
#3. 更新历史

### iOS

API版本:`uexScrollPicture-3.0.2`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.2 | 添加IDE支持 |
| 3.0.1 | 图片支持网络路径 |
| 3.0.0 | 轮播图(ScrollPicture)插件 for iOS |

### Android

API版本:`uexScrollPicture-3.0.2`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.2 | .修复闪退的问题 |
| 3.0.1 | 图片轮播图 |
