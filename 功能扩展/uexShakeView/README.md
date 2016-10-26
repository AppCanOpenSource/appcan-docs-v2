[TOC]

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
摇一摇插件

##1.1、说明
仿微信摇一摇插件

##1.2、UI展示

##1.3、开源源码
插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)


#2、API概览

##2.1、方法

### 🍭 open 打开摇一摇页面

`uexShakeView.open(params)`

**说明:**

通过此方法打开摇一摇页面

**参数:**

| 参数名称     | 参数类型     | 是否必选 | 说明           |
| -------- | -------- | ---- | ------------ |
| params   | Object   | 是    | 接口所需数据，形式见下： |


```javascript
var params = {
	x:,
	y:,
	w:,
	h:
}
```

各字段含义如下:

| 字段名称 | 类型     | 是否必选 | 说明                   |
| ---- | ------ | ---- | -------------------- |
| x    | Number | 是    | view距离当前网页左边框的距离(px) |
| y    | Number | 是    | view距离当前网页顶部的距离(px)  |
| w    | Number | 是    | view宽度(px)           |
| h    | Number | 是    | view高度(px)           |
**示例**

```
var params ={
    x:0,
    y:0,
    w:300,
    h:300
};
uexShakeView.open(params);
```

**平台支持:**

Android2.2+  
iOS6.0+

**版本支持:**

3.0.0+

### 🍭close  关闭摇一摇页面

`uexShakeView.close()`

**说明**

 关闭摇一摇页面

**参数**

无


**示例**

```
uexShakeView.close()
```

**平台支持:**

Android2.2+  
iOS6.0+

**版本支持:**

3.0.0+

## 2.2、监听方法

### onShake  用户摇晃设备后的监听方法

`uexShakeView.onShake()`

**说明**

用户摇晃设备后的监听方法

**参数**
无

**示例**

```javascript
uexShakeView.onShake = function(){
	alert('shake');
}
```

**平台支持:**

Android2.2+  
iOS6.0+

**版本支持:**

3.0.0+

#3、更新历史 

### iOS

API版本: `uexShakeView-3.0.0`

最近更新时间:`2016-10-26`

| 历史发布版本 | 更新内容  |
| ------ | ----------------- |
| 3.0.0 | 摇一摇插件 |

### Android

API版本: `uexShakeView-3.0.0`

最近更新时间:`2016-10-26`

| 历史发布版本 | 更新内容 |
| ------ | ---- |
| 3.0.0 | 摇一摇插件 |
