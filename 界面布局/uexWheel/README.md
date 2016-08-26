[TOC]
 
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
 
 轮盘菜单插件
## 1.1、 业务限制资源规格限制说明
轮盘菜单插件,可以创建全圆轮盘菜单、创建半圆轮盘菜单、创建四分之一圆轮盘菜单,通过api提供的设置创建轮盘菜单的数据源,传入数据、图片等资源,制定ui界面,同时并可以快速的完成事件的监听和控制
## 1.2、UI展示
 
 ![](http://newdocx.appcan.cn/docximg/152422q2015s6i16y.png)
## 1.3、 开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=196_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
# 2、API概览
## 2.1、方法

### 📦 openCircle 创建全圆轮盘菜单

`uexWheel.openCircle(x,y,w,h,jsonData)`

**说明:**

创建全圆轮盘菜单
回调 [cbSelect](#cbSelect 点击按钮的监听方法 "点击按钮的监听方法")

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
|x|Number类型|必选|x坐标|
|y|Number类型|必选|y坐标|
|w|Number类型|必选|宽度|
|h|Number类型|必选|高度|
|jsonData|String类型|必选|按钮内容,图片路径支持 wgt:// wgts:// res:// file://  路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中 PathTypes json格式数据如下:|
```
{
    "button": "res://circle/button.png",
    "menuBg": "res://circle/tabbg.png",
    "subMenuBg": "res://circle/iconbg.png",
    "select_1": "res://circle/tabmenufirstbg.png",
    "select_2": "res://circle/tbmenubg.png",
    "menu": [
        {
            "img": "res://circle/tab1.png",
            "subMenu": [
                "res://circle/icon2.png",
                "res://circle/icon1.png",
                "res://circle/icon3.png"
            ]
        },
        {
            "img": "res://circle/tab2.png",
            "subMenu": [
                "res://circle/icon3.png",
                "res://circle/icon2.png",
                "res://circle/icon1.png",
                "res://circle/icon4.png"
            ]
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
<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
            <link rel="stylesheet" type="text/css" href="css/index.css">
                <script type="text/javascript">
                    window.uexOnload = function(type){
                        if(type == 0){
                            uexWheel.cbSelect = function(index1,index2){
                                alert("index1=="+index1+"index2=="+index2);
                            };
                            uexWheel.onClick = function(data){
                                alert("index=="+data);
                            };
                        }
                    }
                function openCircleMenu(){
                    var data;
                    data = '{"button":"res://circle/button.png","menuBg":"res://circle/tabbg.png","subMenuBg":"res://circle/iconbg.png","select_1":"res://circle/tabmenufirstbg.png","select_2":"res://circle/tbmenubg.png","menu":[{"img":"res://circle/tab1.png","subMenu":["res://circle/icon2.png","res://circle/icon1.png","res://circle/icon3.png"]},{"img":"res://circle/tab2.png","subMenu":["res://circle/icon3.png","res://circle/icon2.png","res://circle/icon1.png","res://circle/icon4.png"]},{"img":"res://circle/tab3.png","subMenu":["res://circle/icon4.png","res://circle/icon2.png","res://circle/icon3.png","res://circle/icon1.png","res://circle/icon5.png"]},{"img":"res://circle/tab4.png","subMenu":["res://circle/icon1.png","res://circle/icon2.png","res://circle/icon3.png","res://circle/icon4.png","res://circle/icon5.png","res://circle/icon6.png"]},{"img":"res://circle/tab5.png","subMenu":["res://circle/icon5.png","res://circle/icon2.png","res://circle/icon3.png","res://circle/icon4.png","res://circle/icon1.png","res://circle/icon6.png"]}]}';
                    uexWheel.openCircle('0','0','0','320','460',data);
                }
                </script>
    </head>
    <body>
        <div class="tit">uexWheel</div>
        <div class="conbor">
            <div class="consj">
                <input class="btn" type="button" value="打开全圆菜单" onclick="openCircleMenu();">
                    <input class="btn" type="button" value="关闭全圆菜单" onclick="uexWheel.closeCircle();">
                        </div>
        </div>
    </body>
</html>

```
### 📦 closeCircle 移除全圆轮盘菜单

`uexWheel.closeCircle()`

**说明:**

移除全圆轮盘菜单

**参数:**

```
无
```

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

3.0.0+  

**示例:**

见openCircle方法示例

### 📦 openSemicircle 创建半圆轮盘菜单

`uexWheel.openSemicircle(x,y,w,h,jsonData)  `

**说明:**

创建半圆轮盘菜单
回调 [cbSelect](#cbSelect 点击按钮的监听方法 "点击按钮的监听方法")

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
|x|Number类型|必选|x坐标|
|y|Number类型|必选|y坐标|
|w|Number类型|必选|宽度|
|h|Number类型|必选|高度|
|jsonData|String类型|必选|按钮内容,图片路径支持 wgt:// wgts:// res:// file://  路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中 PathTypes json格式数据如下:|

```
{
    "data": [
        {
            "image": "res://semicircle/plugin_uexwheel1_1.png",
            "title": "短信"
        },
        {
            "image": "res://semicircle/plugin_uexwheel1_2.png",
            "title": "列表"
        },
        {
            "image": "res://semicircle/plugin_uexwheel1_3.png",
            "title": "拍照"
        },
        {
            "image": "res://semicircle/plugin_uexwheel1_4.png",
            "title": "相册"
        },
        {
            "image": "res://semicircle/plugin_uexwheel1_5.png",
            "title": "视频"
        },
        {
            "image": "res://semicircle/plugin_uexwheel1_3.png",
            "title": "其他"
        }
    ],
    "background": "res://semicircle/plugin_uexwheel1_bg.png"
} 
```

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
            <link rel="stylesheet" type="text/css" href="css/index.css">
                <script type="text/javascript">
                    window.uexOnload = function(type){
                        if(type == 0){
                            uexWheel.cbSelect = function(opId, dataType, data){
                                alert("index=="+data);
                            };
                        }
                    }
                function openSemicircleMenu(style){
                    var data;
                    data = '{"data":[{"image": "res://semicircle/plugin_uexwheel1_1.png","title": "短信"},{"image": "res://semicircle/plugin_uexwheel1_2.png","title": "列表"},{"image": "res://semicircle/plugin_uexwheel1_3.png","title": "拍照"},{"image": "res://semicircle/plugin_uexwheel1_4.png","title": "相册"},{"image": "res://semicircle/plugin_uexwheel1_5.png","title": "视频"},{"image": "res://semicircle/plugin_uexwheel1_3.png","title": "其他"}],"background": "res://semicircle/plugin_uexwheel1_bg.png"}';
                    uexWheel.openSemicircle('0','0','320','400',data);
                }
                </script>
    </head>
    <body>
        <div class="tit">uexWheel插件测试</div>
        <div class="conbor">
            <div class="consj">
                <input class="btn" type="button" value="打开半圆轮盘菜单" onclick="openSemicircleMenu();">
                    <input class="btn" type="button" value="关闭半圆轮盘菜单" onclick="uexWheel.closeSemicircle();">
                        </div>
        </div>
    </body>
</html>
```
### 📦 closeSemicircle 移除半圆轮盘菜单

`uexWheel.closeSemicircle()`

**说明:**

移除半圆轮盘菜单

**参数:**

无

**平台支持:**

Android2.2+    
iOS6.0+ 

**版本支持:**

3.0.0+  

**示例:**

              见openSemicircle方法示例  
 
### 📦 openQuartercircle 创建四分之一圆轮盘菜单

`uexWheel.openQuartercircle(x,y,w,h,jsonData)`

**说明:**

创建四分之一圆轮盘菜单
回调 [cbSelect](#cbSelect 点击按钮的监听方法 "点击按钮的监听方法")

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
|x|Number类型|必选|x坐标|
|y|Number类型|必选|y坐标|
|w|Number类型|必选|宽度|
|h|Number类型|必选|高度|
|jsonData|String类型|必选|按钮内容,图片路径支持 wgt:// wgts:// res:// file://  路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中 PathTypes json格式数据如下:|

```
{
    "data": [
        {
            "image": "res://quartercircle/plugin_uexwheel2_1.png",
            "title": "视频"
        },
        {
            "image": "res://quartercircle/plugin_uexwheel2_2.png",
            "title": "图片"
        },
        {
            "image": "res://quartercircle/plugin_uexwheel2_3.png",
            "title": "拍照"
        }
    ],
    "openImg": "res://quartercircle/plugin_uexwheel2_bt_plus.png",
    "openTitle": "open",
    "closeImg": "res://quartercircle/plugin_uexwheel2_bt_close.png",
    "closeTitle": "close",
    "rootBg": "res://quartercircle/plugin_wheel2_bg.png",
    "subBg": "res://quartercircle/plugin_uexwheel2_bt_bg.png",
    "textColor": "#cccccc"
}
```

**平台支持:**

Android2.2+    
iOS6.0+ 

**版本支持:**

3.0.0+  

**示例:**

```
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
        <link rel="stylesheet" type="text/css" href="css/index.css">
            <script type="text/javascript">
                window.uexOnload = function(type){
                    if(type == 0){
                        uexWheel.cbSelect = function(opId, dataType, data){
                            alert("index=="+data);
                        };
                    }
                }
            function openQuartercircleMenu(style){
                var data;
                data = '{"data":[{"image":"res://quartercircle/plugin_uexwheel2_1.png","title":"视频"},{"image":"res://quartercircle/plugin_uexwheel2_2.png","title":"图片"},{"image":"res://quartercircle/plugin_uexwheel2_3.png","title":"拍照"},{"image":"res://quartercircle/plugin_uexwheel2_4.png","title":"排序"},{"image":"res://quartercircle/plugin_uexwheel2_5.png","title":"信息"},{"image":"res://quartercircle/plugin_uexwheel2_3.png","title":"拍照"}],"openImg":"res://quartercircle/plugin_uexwheel2_bt_plus.png","openTitle":"open","closeImg":"res://quartercircle/plugin_uexwheel2_bt_close.png","closeTitle":"close","rootBg":"res://quartercircle/plugin_wheel2_bg.png","subBg":"res://quartercircle/plugin_uexwheel2_bt_bg.png","textColor":"#cccccc"}';
                uexWheel.openQuartercircle('0','0','320','460',data);
            }
            </script>
</head>
<body>
    <div class="tit">uexWheel插件测试</div>
    <div class="conbor">
        <div class="consj">
            <input class="btn" type="button" value="打开四分之一圆" onclick="openQuartercircleMenu(4);">
                <input class="btn" type="button" value="关闭四分之一圆" onclick="uexWheel.closeQuartercircle();">
                    </div>
    </div>
</body>
</html>

```
### 📦 closeQuartercircle 移除四分之一圆轮盘菜单

`uexWheel.closeQuartercircle()`

**说明:**

移除四分之一圆轮盘菜单 

**参数:**

无

**平台支持:**

Android2.2+    
iOS6.0+ 

**版本支持:**

3.0.0+  

**示例:**

              见openQuartercircle方法示例    

## 2.2、回调方法
### 📦 cbSelect 点击按钮的监听方法

`uexWheel.cbSelect(index1,index2)`

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
|index1|Number类型|必选|索引|
|index2|Number类型|必选|索引,仅在全圆轮盘菜单有效|
 

**版本支持:**

3.0.0+

##2.3、监听方法

### 📦 onClick 全圆轮盘菜单中心圆被点击的监听方法

`uexWheel.onClick(index)`

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
|index|Number类型|必选|索引,为0.|
 

**版本支持:**

3.0.0+

# 3、更新历史

### iOS

API版本: `uexWheel-4.0.0`

最近更新时间:`2016-1-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android

API版本: `uexWheel-4.0.0`

最近更新时间:`2015-11-06`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
