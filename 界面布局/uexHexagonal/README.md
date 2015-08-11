

[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
六棱柱插件
## 1.1、说明
 旋转六棱柱的相关功能，用来在主页进行导航
## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/142201n2015u6l16o.jpg)
 
## 1.3、开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=173_index) 插件中心至插件详情页 （插件测试用例与插件源码已经提供）
# 2、API概览

## 2.1、方法

> ### [setPrismParam](#setPrismParam) 设置数据

`uexHexagonal.setPrismParam(param)  `

**说明:**
设置六棱柱的数据
必须在open方法之前调用此方法


**参数:**

```
param是String类型的json字符串
var param={
    value:[//数据数组
        {
        pic:,//图片路径，只支持res://协议头
        text:,//文本内容
        }
        …   
    ]
}

```
    
* value里包含6个字典，分别包含了六棱柱6个侧面的数据
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



> ### [open](#open) 打开

`uexHexagonal.open(x,y,width,height);`

**说明:**
打开  


**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|------- |
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
> ### [close](#close) 关闭

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
## 2.2、监听方法

> ### onClickItem  点击item的监听方法

`uexHexagonal.onItemClick(index)    `   

** 参数:**
 
|参数名称|参数类型 | 是否必选|  说明 |
|------|-----|--------|------- |
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

        
        
# 3、更新历史
API 版本：uexHexagonal-3.0.2(iOS) uexHexagonal-3.0.2（Android）
 最近更新时间：2015-06-19
 

|  历史发布版本 | iOS更新  | 安卓更新  |
| ------------ | ------------ | ------------ |
| 3.0.2  |  使用新版Xcode重新编译,支持arm64 | 增加cbOpenHexagonal函数回调接口  |
| 3.0.1  | 统一回调方法名，统一回调参数| 修复图片顺序问题|
| 3.0.0  | 六面体功能插件  | 六面体功能插件|
