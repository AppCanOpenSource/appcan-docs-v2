[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
## 1.1、说明

提供日历功能

## 1.2、UI展示

## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=450_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法 

>###open 打开日历

`uexCalendarView.open(json)`

**说明**

打开日历

**参数**

```
var json = {
x:,//view距离当前网页顶部的距离(px)
y:,//view距离当前网页左边框的距离(px)
w:,//view宽度(px)
h:,//view高度(px)
}
```

**平台支持**

Android 2.2+
iOS 6.1+

**版本支持**

Android 3.0.0+
iOS 3.0.0+

**示例**

```
var data ={
    x:0,
y:0,
    w:300,
h:300
};
var jsonStr = JSON.stringify(data)
uexCalendarView.open(jsonStr);

```

>###close  关闭日历

`uexCalendarView.close()`

**说明**

 关闭日历


**参数**

无

**平台支持**

Android 2.2+
iOS 6.1+

**版本支持**

Android 3.0.0+
iOS 3.0.0+

**示例**

```
uexCalendarView.close()

```
>###setSelectedDate 设置被选中的日期

`uexCalendarView.setSelectedDate(json)`

**说明**

设置被选中的日期

**参数**

```
var json = {
	date:{  //所设置的日期
		year:,//年
		month:,//月
		day:,//日
	} 
}
```

**平台支持**

Android 2.2+
iOS 6.1+

**版本支持**

Android 3.0.0+
iOS 3.0.0+

**示例**

```
var data ={
	date:{  
		year:2014,
		moth:11,
		day:11
	}
};
var jsonStr = JSON.stringify(data)
uexCalendarView.setSelectedDate(jsonStr);

```

## 2.2、监听方法

>###onItemClick  点击日期时的监听方法

`uexCalendarView.onItemClick(jsonString)`

**说明**

 点击日期时的监听方法


**参数**

```javascript
var json = {
	date:{  //返回的日期
		year:,//年
		month:,//月
		day:,//日
	} 
}
```

**平台支持**

Android 2.2+
iOS 6.1+

**版本支持**

Android 3.0.0+
iOS 3.0.0+

**示例**

```
uexCalendarView.onItemClick = function(jsonString){
alert(jsonString);
}
```

# 3、更新历史

### iOS

API版本:`uexCalendarView-3.0.5`

最近更新时间:`2016-3-2`

| 历史发布版本 | 更新内容                                |
| ------ | ----------------------------------- |
| 3.0.5  | 修复uexCalendarView切换年份时触发click事件的bug |
| 3.0.4  | 修复uexCalendarView切换月份时执行click事件的bug |
| 3.0.3  | 添加IDE支持                             |
| 3.0.2  | 删除info.plist                        |
| 3.0.1  | 添加国际化支持                             |
| 3.0.0  | 日历插件                                |

### Android

API版本:`uexCalendarView-3.0.3`

最近更新时间:`2015-11-30`

| 历史发布版本 | 更新内容           |
| ------ | -------------- |
| 3.0.3  | 修复month拼写错误的问题 |
| 3.0.2  | 国际化            |
| 3.0.1  | 修复日历界面弹动的问题    |
| 3.0.0  | 日历插件           |
