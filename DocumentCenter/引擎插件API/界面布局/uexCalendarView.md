/*
Sort: 1
Toc: 1
*/

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>
## 1.1、说明<ignore>

提供日历功能

## 1.2、UI展示<ignore>

## 1.3、开源源码<ignore>
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=450_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持<ignore>
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统. 
有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性<ignore>
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明. 


# 2、API概览<ignore>

## 2.1、方法 <ignore>

### open 打开日历

`uexCalendarView.open(params)`

**说明**

打开日历

**参数**

| 参数名称 | 参数类型   | 是否必选 | 说明           |
| ---- | ------ | ---- | ------------ |
| params | Object | 是    | 接口所需数据,形式见下: |

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
uexCalendarView.open(params);
```

### close  关闭日历

`uexCalendarView.close()`

**说明**

 关闭日历

**参数**

无


**示例**

```
uexCalendarView.close()
```
### setSelectedDate 设置被选中的日期

`uexCalendarView.setSelectedDate(params)`

**说明**

设置被选中的日期

**参数**

| 参数名称 | 参数类型   | 是否必选 | 说明           |
| ---- | ------ | ---- | ------------ |
| params | Object | 是    | 接口所需数据,形式见下: |

```javascript
var params = {
	date:{
		year:,
		month:,
		day:
	} 
}
```

各字段含义如下:

| 字段名称  | 类型     | 是否必选 | 说明     |
| ----- | ------ | ---- | ------ |
| date  | Object | 是    | 所设置的日期 |
| year  | Number | 是    | 年      |
| month | Number | 是    | 月      |
| day   | Number | 是    | 日      |

**示例**

```javascript
var params ={
	date:{  
		year:2014,
		month:11,
		day:11
	}
};
uexCalendarView.setSelectedDate(params);
```

## 2.2、监听方法<ignore>

### onItemClick  点击日期时的监听方法

`uexCalendarView.onItemClick(params)`

**说明**

 点击日期时的监听方法

**参数**

```javascript
var params = {
	date:{  //返回的日期
		year:,//年
		month:,//月
		day://日
	} 
}
```

**示例**

```javascript
uexCalendarView.onItemClick = function(params){
	alert(params);
}
```

# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexCalendarView-4.0.0`

最近更新时间:`2016-6-24`

| 历史发布版本 | 更新内容                                |
| ------ | ----------------------------------- |

### Android<ignore>

API版本: `uexCalendarView-4.0.0`

最近更新时间:`2016-6-24`

| 历史发布版本 | 更新内容           |
| ------ | -------------- |
