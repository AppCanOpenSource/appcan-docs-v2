[TOC]
# 1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
加载视图的动画
## 1.1､说明
实现了加载视图的动画效果,提供了两种加载的视图动画样式,用户可以自定义View的颜色以及加载点个数.
## 1.2､UI展示
 ![](/docImg/975/loading.png)  ![](/docImg/975/loading1&#40;1&#41;.png)
## 1.3､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=453_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4､平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.
# 2､API概览

## 2.1､方法

### 🍭 open 打开loading

`uexLoadingView.open(jsonstr)`

**说明:**

打开loading

**参数**

| 参数名称    | 参数类型   | 是否必选 | 说明             |
| ------- | ------ | ---- | -------------- |
| jsonstr | String | 是    | json 格式的字符串,如下 |

```javascript
 {  
    "x":,
    "y":,
    "w":,
    "h":,
    "style": {
        "styleId":,
        "pointNum":,
        "pointColor": [
            "#ffffff"
        ]
    }
}
```

各字段含义如下:

| 字段名称       | 类型     | 是否必选 | 说明                                   |
| ---------- | ------ | ---- | ------------------------------------ |
| x          | Number | 是    | x坐标                                  |
| y          | Number | 是    | y坐标                                  |
| w          | Number | 是    | 宽(宽度需要跟圆点数量相适应,太短会显示不完整)             |
| h          | Number | 是    | 高                                    |
| style      | Object | 是    | 圆点样式关键字                              |
| styleId    | Number | 是    | loading的样式,取值为0或1,0-大小渐变样式;1-颜色渐变样式. |
| pointNum   | Number | 是    | 圆点的数量                                |
| pointColor | Array  | 是    | 颜色数组,数组个数为1或者等于圆点的数量                 |

**示例:**

```javascript
var jsonstr = {
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
};
uexLoadingView.open(JSON.stringify(jsonstr));
```

### 🍭 openCircleLoading 打开带有圆形加载动画的loading view

`uexLoadingView.openCircleLoading()`

**说明:**

打开带有圆形加载动画的loading view. 同时会显示遮罩层.

**参数**

无


**示例:**

```javascript
uexLoadingView.openCircleLoading();
```

### 🍭 close 关闭Loading

`uexLoadingView.close()`

**说明:**

关闭Loading

**参数**

无

**示例:**

```javascript
uexLoadingView.close();
```

# 3､更新历史

### iOS

API版本: `uexLoadingView-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | uexLoadingView支持引擎4.0 |

### Android

API版本: `uexLoadingView-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | LoadingView插件基础版 |
