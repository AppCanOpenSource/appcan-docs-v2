[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
Button插件
## 1.1、说明
创建一个Button,同时AppCan jssdk通过配合的样式和JS对象appcan.button,使开发者在界面中可以快速引用、定位按钮控件,并可以快速的完成按键事件的监听和控制。按钮支持Font awesome字图图标,可直接使用。
## 1.2、UI展示
  ![](http://newdocx.appcan.cn/docximg/135359g2015q6o16i.png)

## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=157_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法
> ### [open](#open)  创建按钮

`uexButton.open(id,x,y,width,height,jsonData)`  

**说明:**

创建按钮    

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
| id | Number | 是 | 按钮唯一标示符 |
| x | Number | 是 | x坐标 |
| y | Number | 是 | y坐标 |
| width | Number | 是 | 宽 |
| height | Number | 是 | 高 |
| jsonData |String | 是 | 按钮内容 |

* jsonData是json字符串,结构为

```
jsonData={
    title:,//按钮内容
    titleColor:,//按钮内容颜色
    textSize:,//按钮内容字号
    bgImage:,//按钮背景图
}
```

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
var id = 1001;
var x = 100;
var y = 100;
var width = 100;
var height = 100;
var data={
    title:"AppCan",
    titleColor:"#111111",
    bgImage:"res://a1.png",
    textSize:"18"
    }
var jsonData = JSON.stringify(data);
uexButton.open(id,x,y,width,height,jsonData);
```

> ### [close](#close)  移除按钮

`uexButton.close(id)`

**说明:**

移除按钮

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
| id | Number | 是 | 按钮唯一标示符 |

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
var id = 1001;

uexButton.close(id);
```

## 2.2、监听方法

> ###       onClick 点击按钮的监听方法   

`uexButton.onClick(id)  `

** 参数:**    

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
| id | Number | 是 | 按钮唯一标示符 |

**  版本支持:**
3.0.0+

**示例:**

```
uexButton.onClick = function(data){
     alert("onClick" + data);
}
```
#3、更新历史

### iOS

API版本:`uexButton-3.0.5`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.5 | 添加IDE支持 |
| 3.0.4 | 修复uexButton动态库在低版本手机上无法调用的问题 |
| 3.0.3 | 修复可以创建同一id按钮的BUG |
| 3.0.2 | 添加设置字体大小,点击的回调方法改为onClick |
| 3.0.1 | 创建一个Button插件 |
| 3.0.0 | 系统按钮插件 |

### Android

API版本:`uexButton-3.0.0`

最近更新时间:`2015-06-19`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 创建一个Button插件 |
