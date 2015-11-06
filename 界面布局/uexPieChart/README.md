[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
 旋转饼状图功能插件
## 1.1、说明
 旋转饼状图功能插件。
## 1.2、公告 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fnew.gif)]() 
此插件官方停止维护（**插件源码已经开放**），请开发者及时做好更新准备，欢迎使用新插件uexChart，详情查看对应文档
## 1.3、UI展示
 
 ![](http://newdocx.appcan.cn/docximg/143815g2015p6b16x.png)
## 1.4、开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=183_index) 插件中心至插件详情页 （插件测试用例与插件源码已经提供）

# 2、API概览
## 2.1、方法

> ### open 打开饼状图

`uexPieChart.open(id,x,y,w,h)`

**说明:**
打开饼状图，回调方法[cbOpen](#cbOpen 打开饼状图的回调方法 "cbOpen")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id | String | 是 | 唯一标识符 |
| x | Number | 是 | x坐标 |
| y | Number | 是 | y坐标 |
| w | Number | 是 | 宽度，为0时为屏幕宽度 |
| h | Number | 是 | 高度，为0时为屏幕高度 |
 
**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
    uexPieChart.open(1,100,500,800,800);
```

> ### close 关闭饼状图

`uexPieChart.close()`

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
    uexPieChart.close();
```

> ### setJsonData 设置饼状图的数据源

`uexPieChart.setJsonData(jsonStr)`

**说明:**
设置饼状图的数据源

**参数:**
```
var jsonStr = {
    "id":,//必选,唯一标识符
    "data": [//必选,数据数组
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
        "id": "500",
        "data": [
            {
                "title": "",
                "value": "10",
                "color": "#FF6600"
            },
            {
                "title": "",
                "value": "20",
                "color": "#660099"
            },
            {
                "title": "",
                "value": "50",
                "color": "#FF33FF"
            },
            {
                "title": "",
                "value": "60",
                "color": "#66CCFF"
            },
            {
                "title": "",
                "value": "40",
                "color": "#FFFF00"
            },
            {
                "title": "",
                "value": "80",
                "color": "#009933"
            },
            {
                "title": "",
                "value": "70",
                "color": "#FF3333"
            },
            {
                "title": "",
                "value": "100",
                "color": "#00CCFF"
            }
        ]
    };
    uexPieChart.setJsonData(JSON.stringify(jsonStr));
```
## 2.2、回调方法
> ### cbOpen 打开饼状图的回调方法

`uexPieChart.cbOpen(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | String | 是 | 饼状图的唯一标识符 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | Number | 是 | 返回uex.cSuccess或者uex.cFailed，详见CONSTANT中Callbackint类型数据 |
 
**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
    uexPieChart.cbOpen = function(opId, dataType, data){
        alert(opId + "," + data);
    }
```

## 2.3、监听方法
> ### onTouchUp 手指离开时的监听方法

`uexPieChart.onTouchUp(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | String | 是 | 饼状图的唯一标识符 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | Number | 是 | 返回当手指离开时，当前90度线（最下方的竖线）所在的区域的数据 |
 
**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
    uexPieChart.onTouchUp = function(opId, dataType, data){
        console.log("onTouchUp:" + data);
    }
```
> ### onData 旋转时的监听方法

`uexPieChart.onData(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | String | 是 | 饼状图的唯一标识符 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | Number | 是 | 返回当前90度线（最下方的竖线）所在的区域的数据 |
 
**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
    uexPieChart.onData = function(opId, dataType, data){
        console.log("onData:" + data);
    }
```

# 3、更新历史

API 版本：uexPieChart-3.0.2(iOS) uexPieChart-3.0.1（Android）
最近更新时间：2015-11-06

|  历史发布版本 | iOS更新  | 安卓更新  |
| ------------ | ------------ | ------------ |
| 3.0.2  |  使用新版Xcode重新编译,支持arm64 |   |
| 3.0.1  | 统一回调方法名，统一回调参数| 去掉插件中的ActivityGroup,配合引擎升级 |
| 3.0.0  | 旋转饼状图功能插件  | 旋转饼状图功能插件|
