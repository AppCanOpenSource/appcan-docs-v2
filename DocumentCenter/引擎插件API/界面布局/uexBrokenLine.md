/*
Sort: 1
Toc: 1
*/

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>
折线图功能插件
## 1.1、说明<ignore>
 折线图功能插件
## 1.2、公告 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fnew.gif)]() <ignore>
此插件官方停止维护(**插件源码已经开放**),请开发者及时做好更新准备,欢迎使用新插件uexChart,详情查看对应文档
## 1.3、UI展示<ignore>
 
 ![](http://newdocx.appcan.cn/docximg/135211q2015h6p16c.png)
## 1.4、开源源码:<ignore>
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=156_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览<ignore>
## 2.1方法:<ignore>
###  setData 设置数据

`uexBrokenLine.setData(json)`

**说明:**

必须先设置数据后再打开界面

**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| json  |  String  |必选   | 折线数据  |
 

```
  格式为:
　{"y":{"min":"10","max":"70","step":"5"},"x":["0801","0802","0803","0804","0805","0806","0807","今天","0809"],"actx":"8","data":["25","34","41","52","25","31","15","47","26"],"compareY":[{"s":"0","e":"4","v":"30"},{"s":"4","e":"8","v":"26"}],"xCount":"7"}
```
 各字段含义如下:

|参数|是否必须|说明|
|-----|-----|-----|
|y|是|y轴|
|min|是|y轴最小值|
|max|是|y轴最大值|
|step|是|y轴步幅|
|x|是|x轴|
|actx|是|x轴特别标注点的索引|
|data|是|各点的值|
|compareY|是|红线信息|
|s|是|起始点索引|
|e|是|结束点索引|
|v|是|红线值|
|xCount|是|每屏显示纵轴个数|

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
var jsd='{"y":{"min":"10","max":"70","step":"5"},"x":
["0801","0802","0803","0804","0805","0806","0807", "今天","0809"],"actx":"7","data":
["25","34","41","52","25","31","15","47","26"],"compareY":[{"s": "0","e":"4","v":"30"},
{"s":"4","e":"8","v":"26"}],"xCount":"7"}';
uexBrokenLine.setData(jsd);
```

###  open  打开界面

`  uexBrokenLine.open(x,y,width,height,id)`

**说明:**

同一个页面可以打开多个界面.

**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| x  | Number类型  |必选   | x坐标  |
| y  | Number类型  |必选   | y坐标  |
| width  | Number类型  |必选   | 宽  |
| height  | Number类型  |必选   | 高  |
| id  | Number类型  |必选   | 唯一标识符  |
 

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexBrokenLine.open(10,100,460,700,1); 
```

###  close  关闭界面

`uexBrokenLine.close(id)`

**说明:**

根据id关闭界面

**参数:**

|   参数名称|参数类型   | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id  | Number类型  |必选   | 唯一标识符  |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexBrokenLine.close(1); 
```
# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexBrokenLine-4.0.0`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android<ignore>

API版本: `uexBrokenLine-4.0.0`

最近更新时间:`2015-06-19`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
