[TOC]
# 1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/公测/gf.png)]()
## 1.1､说明
分段选择器插件
## 1.2､UI展示

## 1.3､开源源码
插件测试用例与源码下载:[点击]( ) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4､平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.

# 2､API概览

## 2.1､方法

### 🍭 open 打开分段选择器

`uexSegmentControl.open(jsonStr)`

**说明:**

打开分段选择器

**参数:**

| 参数名称    | 参数类型   | 是否必选 | 说明        |
| ------- | ------ | ---- | --------- |
| jsonStr | String | 是    | 选择器相关参数设置 |

```javascript
var jsonStr = {
    left:,
    top:,
    width:,
    height:,
    dataInfo:{
        allData:[],
        showData:[],
        maxShow:,
        isExpand:,
        expandOpenIcon:,
        expandCloseIcon:,
        showedLable:,
        addLable:
    }
}
```

各字段含义如下:

| 字段名称            | 类型     | 是否必选 | 说明                        |
| --------------- | ------ | ---- | ------------------------- |
| left            | Number | 否    | 左间距,默认0                   |
| top             | Number | 否    | 上间距,默认0                   |
| width           | Number | 否    | 宽度,默认屏幕宽度                 |
| height          | Number | 否    | 高度,默认屏幕高度                 |
| dataInfo        | Object | 是    | 数据关键字                     |
| allData         | Array  | 是    | 所有选择项的集合                  |
| showData        | Array  | 是    | 导航条上显示的选择项的集合             |
| maxShow         | Number | 是    | 导航条上最多显示的选择项的个数           |
| isExpand        | Number | 否    | 是否支持可扩展的功能,0不会出现扩展按钮,默认1. |
| expandOpenIcon  | String | 否    | 导航条上扩展打开扩展功能的按钮图标         |
| expandCloseIcon | String | 否    | 导航条上扩展关闭扩展功能的按钮图标         |
| showedLable     | String | 否    | 扩展栏目的已展示栏目标题              |
| addLable        | String | 否    | 扩展栏目的可添加栏目标题              |

**示例:**

```javascript
    var width = window.screen.width;
    var height = window.screen.height - 300;
    var param1 = {
        left:0,
        top:200,
        width:width,
        height:height,
        dataInfo:{
            allData:["头条", "娱乐", "体育", "北京", "财经", "科技", "段子", "图片", "汽车", "时尚",
        "轻松一刻", "军事", "历史", "房产", "游戏", "彩票", "原创", "电台", "论坛", "博客",
        "社会", "电影", "NBA", "中国足球", "国际足球", "CBA", "跑步", "手机",
                        "数码", "移动互联", "家居", "旅游", "健康", "读书", "酒香", "教育", "亲子", "葡萄酒",
                        "暴雪游戏", "情感", "政务"],
            showData:["头条", "娱乐", "体育", "北京", "NBA","科技", "段子", "旅游", "汽车", "时尚"],
            maxShow:25,
            isExpand:1,
            expandOpenIcon:'res://openIcon.png',
            expandCloseIcon:'res://closeIcon.png',
            showedLable:'我的频道',
            addLable:'点击添加'
        }
    };
    uexSegmentControl.open(param1);
```
**运行效果:**
默认打开状态:
![](http://i.imgur.com/ryLSVMU.png)

点击按钮进入选择编辑状态:
![](/docImg/975/BrllwtC.png)

### 🍭 close 关闭分段选择器

`uexSegmentControl.close()`

**说明:**

关闭分段选择器

**参数:**

无

**示例:**

```javascript
    uexSegmentControl.close()
```

### 🍭 setCurrentItem 设置当前选中项

`uexSegmentControl.setCurrentItem(jsonStr)`

**说明:**

设置当前选中项

**参数:**

| 参数名称    | 参数类型   | 是否必选 | 说明                |
| ------- | ------ | ---- | ----------------- |
| jsonStr | String | 是    | 设置当前选中项相关参数,形式见下: |

```javascript
var jsonStr = {
    index:
}
```

各字段含义如下:

| 字段名称  | 类型     | 是否必选 | 说明   |
| ----- | ------ | ---- | ---- |
| index | Number | 是    | 索引   |

**示例:**

```javascript
    var param = {
        index:0
    };
    uexSegmentControl.setCurrentItem(param);
```

## 2.2､监听方法

### 🍭 onItemClick item被点击的监听方法

`uexSegmentControl.onItemClick(jsonObj);`

**参数:**

| 参数名称    | 参数类型       | 是否必选 | 说明   |
| ------- | ---------- | ---- | ---- |
| jsonObj | jsonObject | 是    | 回调数据 |

```javascript
var jsonObj = {
    index:,
    name:
}
```

各字段含义如下:

| 字段名称  | 类型     | 说明        |
| ----- | ------ | --------- |
| index | Number | 被点击的元素的索引 |
| name  | String | 被点击的元素的名称 |

**示例:**

```javascript
    uexSegmentControl.onItemClick = function(jsonObj){
        var index = jsonObj.index;
        var name = jsonObj.name;
        alert(index + "," + name);
    }
```

### 🍭 onDataChange 数据发生变化的监听方法

`uexSegmentControl.onDataChange(jsonObj);`

**参数:**

| 参数名称    | 参数类型       | 是否必选 | 说明   |
| ------- | ---------- | ---- | ---- |
| jsonObj | jsonObject | 是    | 回调数据 |

```
var jsonObj = {
    shows:[]
}
```

各字段含义如下:

| 字段名称  | 类型    | 说明              |
| ----- | ----- | --------------- |
| shows | Array | 当前显示在导航条上的选择项集合 |

**示例:**

```javascript
    uexSegmentControl.onDataChange = function(jsonObj){
        alert(JSON.stringify(jsonObj));
    }
```

# 3､更新历史

### iOS

API版本: `uexSegmentControl-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | uexSegmentControl适配4.0引擎 |

### Android

API版本: `uexSegmentControl-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 4.0 |
