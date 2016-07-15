[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/公测/gf.png)]()
## 1.1、说明
分段选择器插件
## 1.2、UI展示

## 1.3、开源源码
插件测试用例与源码下载:[点击]( ) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

> ### open 打开分段选择器

`uexSegmentControl.open(jsonStr)`

**说明:**

打开分段选择器

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| jsonStr | String | 是 | 选择器相关参数设置 |

```
var jsonStr = {
    left:,//(可选) 左间距,默认0
    top:,//(可选) 上间距,默认0
    width:,//(可选) 宽度,默认屏幕宽度
    height:,//(可选) 高度,默认屏幕高度
    dataInfo:{//(必选) 数据
        allData:[],//(必选) 所有选择项的集合
        showData:[],//(必选) 导航条上显示的选择项的集合
        maxShow:,//(必选) 导航条上最多显示的选择项的个数
        isExpand:,//(可选) 是否支持可扩展的功能,0不会出现扩展按钮,默认1.
        expandOpenIcon:,//(可选) 导航条上扩展打开扩展功能的按钮图标
        expandCloseIcon:,//(可选) 导航条上扩展关闭扩展功能的按钮图标
        showedLable:,//(可选) 扩展栏目的已展示栏目标题
        addLable://(可选) 扩展栏目的可添加栏目标题
    }
}
```

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

Android 3.0.0+
iOS 3.0.0+

**示例:**

```
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
    var data1 = JSON.stringify(param1);
    uexSegmentControl.open(data1);
```
**运行效果:**
默认打开状态:
![](http://i.imgur.com/ryLSVMU.png)

点击按钮进入选择编辑状态:
![](/docImg/975/BrllwtC.png)

> ### close 关闭分段选择器

`uexSegmentControl.close()`

**说明:**

关闭分段选择器

**参数:**

无

**平台支持:**

Android 2.2+

iOS 6.0+

**版本支持:**

Android 3.0.0+

iOS 3.0.0+

**示例:**

```
    uexSegmentControl.close()
```

> ### setCurrentItem 设置当前选中项

`uexSegmentControl.setCurrentItem(jsonStr)`

**说明:**

设置当前选中项

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| jsonStr | String | 是 | 设置当前选中项相关参数 |

```
var jsonStr = {
    index://(必选) 索引
}
```

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

Android 3.0.0+
iOS 3.0.0+

**示例:**

```
    var param = {
        index:0
    };
    var data = JSON.stringify(param);
    uexSegmentControl.setCurrentItem(data);
```

## 2.2、监听方法

> ### onItemClick item被点击的监听方法

`uexSegmentControl.onItemClick(jsonObj);`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| jsonObj | jsonObject | 是 |  回调数据 |

```
var json = {
    index:,//(必选) 被点击的元素的索引
    name://(必选) 被点击的元素的名称
}
```

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

Android 3.0.0+
iOS 3.0.0+

**示例:**

```
    uexSegmentControl.onItemClick = function(jsonObj){
        var index = jsonObj.index;
        var name = jsonObj.name;
        alert(JSON.stringify(jsonObj));
    }
```

> ### onDataChange 数据发生变化的监听方法

`uexSegmentControl.onDataChange(jsonObj);`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| jsonObj | jsonObject | 是 |  回调数据 |

```
var jsonObj = {
    shows:[]//(必选) 当前显示在导航条上的选择项集合
}
```

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

Android 3.0.0+
iOS 3.0.0+

**示例:**

```
    uexSegmentControl.onDataChange = function(jsonObj){
        alert(JSON.stringify(jsonObj));
    }
```

# 3、更新历史

### iOS

API版本:`uexSegmentControl-3.0.4`

最近更新时间:`2016-7-5`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.4 | 修复BUG,和安卓统一参数 |
| 3.0.3 | 修复onItemClick接口回调参数与文档及安卓不一致的BUG |
| 3.0.2 | 按要求修改结构布局 |
| 3.0.1 | 修改资源图片不显示问题,适配iOS5以上的版本 |
| 3.0.0 | 分段选择器插件 |

### Android

API版本:`uexSegmentControl-3.0.4`

最近更新时间:`2016-4-13`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.4 | 修正无选中效果的问题,优化选中逻辑 |
| 3.0.3 | 修正资源命名隐患,修正部分部分bug,参照文档修正接口逻辑,修正回调类型,添加开源声明. |
| 3.0.2 | 更新适配机型使用的方法 |
| 3.0.0 | 分段选择器插件 |
