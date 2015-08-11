[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
## 1.1、说明

## 1.2、UI展示

## 1.3、开源源码
插件测试用例与源码下载：[点击](xxxx ) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

## 2.2、回调方法

## 2.3、监听方法

# 3、更新历史
API 版本：uexXXX-3.0.X(iOS) uexXXX-3.0.X(Android)
最近更新时间：2015-xx-xx

| 历史发布版本 | iOS更新 | 安卓更新 |
| ------------ | ------------ | ------------ |
| 3.0.0 | 插件 | 插件|

# uexSideMenu
   侧边菜单插件

## 方法：
### [open](#open) 打开菜单
### [close](#close) 关闭菜单

## 监听方法：
### [onItemClick](#onitemclick) item被点击的监听方法

### open
  打开菜单
```
uexSideMenu.open(json)
```
**参数：**
```
var json = {
    left:,//(必选) 菜单左间距
    top:,//(必选) 菜单上间距
    width:,//(可选) 菜单item宽度，默认为bgImg图片的宽度
    height:,//(可选) 菜单item高度，默认为bgImg图片的高度
    menuItems:[//(必选) 菜单数据
        {
            buttonImg:,//(必选) 菜单item图标
            bgImg://(必选) 菜单item背景图片
        }
    ]
}
```
**平台支持：**
```
Android 2.2+
iOS 6.0+
```
**版本支持：**
```
Android 3.0.0+
iOS 3.0.0+
```
**示例：**

```
    var param1 = {
            left:0,
            top:500,
            width:237,
            height:135,
            menuItems:[
                {
                    buttonImg:"res://s1.png",
                    bgImg:"res://bg.png"
                },
                {
                    buttonImg:"res://s2.png",
                    bgImg:"res://bg.png"
                },
                {
                    buttonImg:"res://s3.png",
                    bgImg:"res://bg.png"
                },
                {
                    buttonImg:"res://s4.png",
                    bgImg:"res://bg.png"
                },
                {
                    buttonImg:"res://s5.png",
                    bgImg:"res://bg.png"
                }
            ]
    };
    var data1 = JSON.stringify(param1);
    uexSideMenu.open(data1);
```
运行效果：
![](http://i.imgur.com/ketvg8l.png)


### close
  关闭菜单
```
uexSideMenu.close()
```
**参数：**
```
无
```
**平台支持：**
```
Android 2.2+
iOS 6.0+
```
**版本支持：**
```
Android 3.0.0+
iOS 3.0.0+
```
**示例：**

```
    uexSideMenu.close()
```

### onItemClick
item被点击的监听方法
```
uexSideMenu.onItemClick(json);
```
**参数：**
```
var json = {
    index://(必选) 索引
}
```
**平台支持：**
```
Android 2.2+
iOS 6.0+
```
**版本支持：**
```
Android 3.0.0+
iOS 3.0.0+
```
**示例：**
```
    uexSideMenu.onItemClick = function(data){
        alert(data);
    }
```
