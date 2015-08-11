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

# uexLoadingView
   

### 方法：

* [open](#open)
* [close](#close)

---

### open 
打开loading

```
uexLoadingView.open(jsonstr)
```
**参数**
```
    "x": 
    "y":  
    "w": 宽(宽度需要跟圆点数量相适应，太短会显示不完整)
    "h": 高
    "style": {
        "styleId": //loading的样式，取值为0或1
        "pointNum": //圆点的数量
        "pointColor": [
            "#ffffff" //圆点的颜色
        ]
    }

```
**示例：**
```
var jsonstr = '{
    "x": 200, 
    "y": 500, 
    "w": 150, 
    "h": 40, 
    "style": {
        "styleId": 1, 
        "pointNum": 4, 
        "pointColor": [
            "#ffffff"
        ]
    }
}';
uexLoadingView.open(jsonstr);
```

### close
关闭loading

**示例：**

```
uexLoadingView.close();
```
