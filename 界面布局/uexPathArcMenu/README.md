[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
弧形菜单
## 1.1、说明
提供弧形菜单基本功能,包括打开、关闭菜单,设置菜单的样式.
## 1.2、UI展示
![](http://i.imgur.com/KlIr0ps.png)

![](http://i.imgur.com/t05xQJE.png)

## 1.3、开源源码
暂无

# 2、API概览

## 2.1、方法

### 📦 open 打开弧形菜单

`uexPathArcMenu.open(json)`

**参数:**

```
var json = {
    bgColor:,//(可选) 背景颜色,默认半透明
    position:,//(可选) 菜单显示位置,0-中间;1-左边.默认0
    icon:,//(必选) 菜单的控制开关图标
    data:[]//(必选) 菜单图片数组,数组个数为5个
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
var param1 = {
    position:0,
    bgColor:"#00000000",
    icon:"res://black_icon.png",
    data:[
        "res://black_menu_1.png",
        "res://black_menu_2.png",
        "res://black_menu_3.png",
        "res://black_menu_5.png",
        "res://black_menu_4.png"
    ]
};
var data1 = JSON.stringify(param1);
uexPathArcMenu.open(data1);
```

### 📦 close 关闭弧形菜单

`uexPathArcMenu.close()`

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
uexPathArcMenu.close();
```

### 📦 setStyle 设置弧形菜单显示位置

`uexPathArcMenu.setStyle(json)`

**参数:**

```
var json = {
    position://(必选) 菜单显示位置,0-中间;1-左边.
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
var param1 = {
    position:1
};
var data1 = JSON.stringify(param1);
uexPathArcMenu.setStyle(data1);
```

## 2.2、回调方法

### 📦 onItemClick 菜单中元素被点击的监听方法

`uexPathArcMenu.onItemClick(json);`

**参数:**

```
var json = {
    index://被点击的元素的索引
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
uexPathArcMenu.onItemClick = function(data){
    var index = JSON.parse(data).index;
    alert("点击了第" + (index + 1) + "个元素");
}
```

# 3、更新历史

### iOS

API版本: `uexPathArcMenu-4.0.0`

最近更新时间:`2015-08-11`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android

API版本: `uexPathArcMenu-4.0.0`

最近更新时间:`2015-08-11`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
