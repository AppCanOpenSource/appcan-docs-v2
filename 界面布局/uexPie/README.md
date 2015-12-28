[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
 饼状图功能插件
## 1.1、说明
 饼状图功能插件。
## 1.2、公告 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fnew.gif)]() 
此插件官方停止维护(**插件源码已经开放**),请开发者及时做好更新准备,欢迎使用新插件uexChart,详情查看对应文档
## 1.3、UI展示
 
 ![](http://newdocx.appcan.cn/docximg/142634y2015o6f16s.jpg)
## 1.4、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=182_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
#2、API概述
## 2.1、方法

> ### open　打开饼状图

`uexPie.open(id,x,y,w,h)`

**说明:**

打开饼状图,回调方法[cbOpen](#cbOpen　打开饼状图的回调方法 "cbOpen")

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 唯一标识符 |
| x | Number | 是 | x坐标 |
| y | Number | 是 | y坐标 |
| w | Number | 是 | 宽度,为0时为屏幕宽度 |
| h | Number | 是 | 高度,为0时为屏幕高度 |
 

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    uexPie.open(1,100,500,800,800);
```

> ### close　关闭饼状图

`uexPie.close()`

**说明:**

关闭饼状图

**参数:**

  无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    uexPie.close();
```

> ### setJsonData　设置饼状图的数据源

`uexPie.setJsonData(jsonStr)`

**说明:**

设置饼状图的数据源

**参数:**

```
var jsonStr = {
    "id": ,//必选,唯一标识符
    "data": [//必选,数据关键字
        {
            "title":,//必选,标题
            "value":,//必选,y轴步幅
            "color"://必选,标题背景色及所对应的饼状图的扇形背景色
        }
    ]
}
```

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    var jsonStr ={
        "id": "1",
        "data": [
            {
                "title": "高美梅",
                "value": "10",
                "color": "#FF6600",
                "subTitle": "189345"
            },
            {
                "title": "瑞吉",
                "value": "20",
                "color": "#660099",
                "subTitle": "12345"
            },
            {
                "title": "铂尔曼",
                "value": "50",
                "color": "#FF33FF",
                "subTitle": "12345"
            },
            {
                "title": "仙人掌",
                "value": "60",
                "color": "#66CCFF",
                "subTitle": "12345"
            },
            {
                "title": "苏州街",
                "value": "40",
                "color": "#FFFF00",
                "subTitle": "12345"
            },
            {
                "title": "银川市",
                "value": "80",
                "color": "#009933",
                "subTitle": "12345"
            },
            {
                "title": "李丽珍",
                "value": "70",
                "color": "#FF3333",
                "subTitle": "12345"
            },
            {
                "title": "唐老二三",
                "value": "120",
                "color": "#00CCFF",
                "subTitle": "189345"
            }
        ]
    };
    uexPie.setJsonData(JSON.stringify(jsonStr));
```
## 2.2、回调方法
> ### cbOpen　打开饼状图的回调方法

`uexPie.cbOpen(opId,dataType,data)`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | 饼状图的唯一标识符 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | Number | 是 | 返回uex.cSuccess或者uex.cFailed,详见CONSTANT中Callbackint类型数据 |
 

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    uexPie.cbOpen = function(opId,dataType,data){
        alert("cbOpen:" + data);
    }
```

#3、更新历史

### iOS

API版本:`uexPie-3.0.3`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.3 | 添加IDE支持 |
| 3.0.2 | 使用新版Xcode重新编译,支持arm64 |
| 3.0.1 | 统一回调方法名,统一回调参数 |
| 3.0.0 | 饼状图功能插件 |

### Android

API版本:`uexPie-3.0.5`

最近更新时间:`2015-11-06`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.5 | 去掉插件中的ActivityGroup,配合引擎升级 |
| 3.0.4 | 更新适配机型使用的方法 |
| 3.0.3 | 修复按返回键崩溃的问题 |
| 3.0.2 | 修复多个饼状图不能并存显示的问题 |
| 3.0.1 | 修复饼状图打开后无法关闭的问题 |
| 3.0.0 | 饼状图功能插件 |
