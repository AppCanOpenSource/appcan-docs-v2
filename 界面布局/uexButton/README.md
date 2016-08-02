[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
Button插件
## 1.1、说明
创建一个Button,同时AppCan jssdk通过配合的样式和JS对象appcan.button,使开发者在界面中可以快速引用、定位按钮控件,并可以快速的完成按键事件的监听和控制。按钮支持Font awesome字图图标,可直接使用。
## 1.2、UI展示
  ![](http://newdocx.appcan.cn/docximg/135359g2015q6o16i.png)

## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=157_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。 
有特殊版本要求的API会在文档中额外说明。

## 1.5、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用。  
在后续版本中新添加的接口会在文档中额外说明。 

# 2、API概览

## 2.1、方法
> ### [create](#create)  创建按钮

`var btnObj = uexButton.create(param)`  

**说明:**

创建按钮,同步返回    

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
| param | Object | 是 | 对象信息 |
```
var param = {
       x: ,
       y: ,
       width: ,
       height: ,
       data:{
           title: ,
           titleColor: ,
           bgImage: ,
           textSize:
       }
   }
```
**内部字段:**

|内部字段|字段类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
| x | Number | 是 | x坐标 |
| y | Number | 是 | y坐标 |
| width | Number | 是 | 宽 |
| height | Number | 是 | 高 |
| data |Object | 是 | 按钮数据 |
| title |String | 是 | 按钮内容 |
| titleColor |String | 是 | 按钮内容颜色 |
| textSize |String | 是 | 按钮内容字号 |
| bgImage |String | 是 | 按钮背景图的路径，支持 wgt:// wgts:// res:// file://  路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes|

**返回值:**

|返回值|返回值类型 |  说明 |
|-----|-----|----- |
| btnObj | Object |  创建成功，返回button, 失败时返回null |

**示例:**

```
var param = {
        x:0,
        y:300,
        width:200,
        height:90,
        data:{
           title:"AppCan",
           titleColor:"#111111",
           bgImage:"res://btn.png",
           textSize:"18.789"
        }
    }
   var btnOjb =  uexButton.create(param);
```

> ### [close](#close)  移除按钮

`uexButton.close(btnOjb)`

**说明:**

移除按钮

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
| btnOjb | Object | 是 | create方法返回的button对象 |

**示例:**

```
var btnObj = uexButton.create(param);
uexButton.close(btnObj);
```

## 2.2、监听方法

> ### onClick 点击按钮的监听方法   

`uexButton.onClick(buttonId)  `

** 参数:**    

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
| buttonId | String | 是 | uexButton对象ID |

**示例:**

```
uexButton.onClick = function(buttonId){
     alert("onClick" + buttonId);
}
```
#3、更新历史

### iOS

API版本:`uexButton-4.0.0`

最近更新时间:`2016-7-29`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 4.0 插件 |


### Android

API版本:`uexButton-4.0.0`

最近更新时间:`2016-7-29`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 4.0 插件 |

