[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
加载视图的动画
## 1.1、说明
实现了加载视图的动画效果,提供了两种加载的视图动画样式,用户可以自定义View的颜色以及加载点个数。
## 1.2、UI展示
 ![](/docImg/975/loading.png)  ![](/docImg/975/loading1&#40;1&#41;.png)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=453_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4、平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。

有特殊版本要求的API会在文档中额外说明。

## 1.5、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用。
# 2、API概览

## 2.1、方法

> ### open 打开loading

`uexLoadingView.open(jsonstr)`

**说明:**

打开loading

**参数**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| jsonstr | String | 是 |json 格式的字符串,如下 |

```
 {  
    "x": //x坐标
    "y": //y坐标
    "w": //宽(宽度需要跟圆点数量相适应,太短会显示不完整)
    "h": //高
    "style": {
        "styleId": //loading的样式,取值为0或1,0-大小渐变样式；1-颜色渐变样式。
        "pointNum": //圆点的数量
        "pointColor": [//颜色数组,数组个数为1或者等于圆点的数量
            "#ffffff" //圆点的颜色
        ]
    }
}
```



**示例:**

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

> ### openCircleLoading 打开带有圆形加载动画的loading view.

`uexLoadingView.openCircleLoading()`

**说明:**

打开带有圆形加载动画的loading view. 同时会显示遮罩层。

**参数**

无


**示例:**

```
uexLoadingView.openCircleLoading();
```

> ### close 关闭Loading

`uexLoadingView.close()`

**说明:**

关闭Loading

**参数**

无



**示例:**

```
uexLoadingView.close();
```

# 3、更新历史

### iOS

API版本:`uexLoadingView-4.0.0`

最近更新时间:`2016-6-29`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持引擎4.0，函数入参 |
| 3.0.6 | 添加IDE支持 |
| 3.0.5 | 修复openCircleLoading在ios7上背景不透明的BUG |
| 3.0.4 | 新增openCircleLoading接口 |
| 3.0.3 | uexLoadingView插件,修改open接口 |
| 3.0.2 | 修改配置文件 |
| 3.0.1 | 适配iOS5的版本 |
| 3.0.0 | uexLoadingView插件 |

### Android

API版本:`uexLoadingView-4.0.0`

最近更新时间:`2016-6-29`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持引擎4.0，函数入参 |
| 3.0.6 | 解决空指针报错问题 |
| 3.0.5 | 添加圆形loading 动画效果 |
| 3.0.4 | 去掉插件中的ActivityGroup,配合引擎升级 |
| 3.0.3 | 修改open接口 |
| 3.0.2 | 修复第二次打开界面空指针问题 |
| 3.0.1 | clean函数中调用close方法 |
| 3.0.0 | uexLoadingView插件 |
