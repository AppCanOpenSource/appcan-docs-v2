[TOC]
 
#1、 简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
 
 旋转木马动画功能插件
##1.1、 业务限制资源规格限制说明
旋转木马功能,打开旋转动画效果,通过api提供的设置旋转动画的数据源,传入数据、图片等资源,制定ui界面,同时并可以快速的完成事件的监听和控制
##1.2、UI展示
 
 ![](http://newdocx.appcan.cn/docximg/151226n2015e6x16g.png)
##1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=191_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
#2、API概览
 ##2.1              方法

### 🍭           open 打开旋转动画

        

`uexTimeMachine.open(id,x,y,w,h)                    `
**说明:       **
打开旋转动画                  
回调 [cbOpen](#cbOpen 打开旋转动画的回调方法 "打开旋转动画的回调方法")
**      参数:     **

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
|id|Number类型|必选|唯一标识符|
|x|Number类型|必选|x坐标|
|y|Number类型|必选|y坐标|
|w|Number类型|必选|宽度|
|h|Number类型|必选|高度|
 
**  平台支持:       **
Android2.2+                 
iOS6.0+                 
**          版本支持:       **
3.0.0+                  
**          示例:     **
      见setJsonData的示例                   
### 🍭       close 关闭旋转动画

    

`uexTimeMachine.close(id)           `
**      说明: **
关闭旋转动画          
**  参数: **

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
|opId|Array类型|可选|旋转动画的唯一标识符数组,不传时关闭所有|
 
 
**  平台支持:   **
Android2.2+         
iOS6.0+         
**      版本支持:   **
3.0.0+          
**      示例: **
                      见setJsonData的示例           
### 🍭   setJsonData　

设置旋转动画的数据源

`uexTimeMachine.setJsonData(jsonStr)    `
**  说明:**
设置旋转动画的数据源  
**  参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
|jsonStr|String类型|必选|设置旋转动画的数据源 |
````
      jsonStr格式为:{"id":"500","data":[{"title":"10","imageUrl":"res://***.png"},{"title":"20","image":"res://***png"}]}  
            各字段含义如下:    
````
|               参数          |               是否必须            |               说明          |
|-----|-----|-----|
|               id          |               是           |               唯一标示符           |
|               data            |               是           |               数据关键字           |
|               imageUrl            |               是           |               图片路径,路径协议详见 [CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT") 中PathTypes         |
**      平台支持:**
Android2.2+ 
iOS6.0+ 
**      版本支持:**
3.0.0+  
**      示例:**

```
<!DOCTYPE HTML>
<html>
<head>
<title>旋转木马之Inverted Time Machine功能</title>
<script type="text/javascript">
    function pieOpen(){
        var x=document.getElementById("aa").value;
        var y=document.getElementById("bb").value;
        var w=document.getElementById("cc").value;
        var h=document.getElementById("dd").value;
        uexTimeMachine.open("500",x,y,w,h);
    }
    function pieOpen1(){
        var x=document.getElementById("aa").value;
        var y=document.getElementById("bb").value;
        var w=document.getElementById("cc").value;
        var h=document.getElementById("dd").value;
        uexTimeMachine.open("510",x,y,w,h);
    }
    function pieClose(){
        var idarr = ["500","510"];
        uexTimeMachine.close(idarr);
    }
    window.uexOnload = function(){
        uexTimeMachine.cbOpen = function(id, dataType, data){
            var jsonStr ='{"id":"'+id+'","data":[{"title":"title1","imageUrl":"res://uexTimeMachine_cunhuo.png"},{"title":"title2","imageUrl":"res://uexTimeMachine_daiban.png"}]}';
            uexTimeMachine.setJsonData(jsonStr);
        }
        uexTimeMachine.onItemSelected = function(opId,index){
            alert("opId:"+opId+"index:"+index)
        }
    }
</script>
</head>
<body>
    x<input type="text" id="aa" value="300"/>
    y<input type="text" id="bb" value="300"/>
    w<input type="text" id="cc" value="300"/>
    h<input type="text" id="dd" value="300"/>
    <input class="btn" type="button" value="打开Time Machine 1" onclick="pieOpen();">
        <input class="btn" type="button" value="打开Time Machine 2" onclick="pieOpen1();">
        <input class="btn" type="button" value="关闭" onclick="pieClose();">
</body>
</html>

```
## 2.2、回调方法

### 🍭cbOpen 打开旋转动画的回调方法

    

`uexPie.cbOpen(opId,dataType,data)          `
**          参数: **

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
|opId|Number类型|必选|旋转动画的唯一标识符 |
|dataType|Number类型|必选|参数类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback方法数据类型 |
|data|String类型|必选|返回uex.cSuccess或者uex.cFailed,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Int Values "CONSTANT")中Callbackint类型数据 |
 

**版本支持:**

3.0.0+    

## 2.3、监听方法
### 🍭 onItemSelected　点击item的监听方法

`uexTimeMachine.onItemSelected(opId,index)`

**参数:**

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
|opId|Number类型|必选|旋转动画的唯一标识符 |
|index|Number类型|必选|被选中item的索引值 |
 

**版本支持:**

3.0.0+    

# 3、更新历史

### iOS

API版本: `uexTimeMachine-4.0.0`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android

API版本: `uexTimeMachine-4.0.0`

最近更新时间:`2015-12-07`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
