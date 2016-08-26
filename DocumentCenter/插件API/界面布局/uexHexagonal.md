/*
Sort: 1
Toc: 1
*/



[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() <ignore>
六棱柱插件
## 1.1、说明<ignore>
 旋转六棱柱的相关功能,用来在主页进行导航
## 1.2、UI展示<ignore>
 ![](http://newdocx.appcan.cn/docximg/142201n2015u6l16o.jpg)
 
## 1.3、开源源码<ignore>
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=173_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
# 2、API概览<ignore>

## 2.1、方法<ignore>

### 🍭 [setPrismParam](#setPrismParam) 设置数据

`uexHexagonal.setPrismParam(param)  `

**说明:**

设置六棱柱的数据,图片路径支持 wgt:// wgts:// res:// file://  路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes
必须在open方法之前调用此方法

**参数:**

```
param是String类型的json字符串
var param={
    value:[//数据数组
        {
        pic:,//图片路径,只支持res://协议头
        text:,//文本内容
        }
        …   
    ]
}

```
    
* value里包含6个字典,分别包含了六棱柱6个侧面的数据

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
var data={
        value:[
            {
            pic:"res://xx0.png",
            text:"text0"}
            },
            {
            pic:"res://xx1.png",
            text:"text1"}
            },
            {
            pic:"res://xx2.png",
            text:"text2"}
            },
            {
            pic:"res://xx3.png",
            text:"text3"}
            },
            {
            pic:"res://xx4.png",
            text:"text4"}
            },
            {
            pic:"res://xx5.png",
            text:"text5"}
            }
        ]
    };
                                
var jsonData=JSON.stringify(data);   
uexHexagonal.setPrismParam(jsonData)    

```

### 🍭 [open](#open) 打开

`uexHexagonal.open(x,y,width,height);`

**说明:**

打开  

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
| x | Number | 是 | x坐标 |
| y | Number | 是 | y坐标 |
| width | Number | 是 | 宽度 |
|height|Number|是|高度|

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
var x = 0;     
var y = 0;      
var width = 200; 
var height = 200;                               
uexHexagonal.open(x,y,width,height);

```
### 🍭 [close](#close) 关闭

`uexHexagonal.close();`

**说明:**

关闭

**参数:**

无

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```                         
uexHexagonal.close();

```
## 2.2、监听方法<ignore>

### 🍭 onClickItem  点击item的监听方法

`uexHexagonal.onItemClick(index)    `   

** 参数:**
 
|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
| index | Number | 必选 |索引 |
 

**平台支持:**

Android2.2+
iOS6.0+

** 版本支持:**
3.0.0+

**  示例:**
```
    uexHexagonal.onItemClick = function(data){
        alert("onItemClick" + data);
    }
```

        
        
# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexHexagonal-4.0.0`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android<ignore>

API版本: `uexHexagonal-4.0.0`

最近更新时间:`2016-3-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
