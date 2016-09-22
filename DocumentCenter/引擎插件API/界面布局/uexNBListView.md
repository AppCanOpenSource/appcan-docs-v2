/*
Sort: 1
Toc: 1
*/

[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() <ignore>

自定义布局列表插件

## 1.1、说明<ignore>

该插件封装了自定义布局的功能,开发者可通过该插件实现原生布局.

## 1.2、UI展示<ignore>

## 1.3、开源源码<ignore>

插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=631_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持<ignore>
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.
有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性<ignore>
本插件所有API默认在插件版本**4.0.0+**可用.
在后续版本中新添加的接口会在文档中额外说明.

# 2、API概览<ignore>

## 2.1、方法<ignore>

### 🍭 initLayout 初始化布局

`uexNBListView.initLayout(params, callbackFunction);`

**说明:**

初始化布局,动态数据定义方式,请参考[数据载入方式](#数据载入方式),该方法需要在所有方法之前调用.

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明        |
| ---------------- | -------- | ---- | --------- |
| params           | String   | 是    | 初始化布局所需参数 |
| callbackFunction | Function | 是    | 回调函数      |

```javascript
var params ={
    listViewId:,
    layout:{
        center:[],
        left:[],
        right:[]
    }
}
```

各字段含义如下:

| 参数名称       | 参数类型   | 是否必选 | 说明              |
| ---------- | ------ | ---- | --------------- |
| listViewId | String | 是    | 唯一标识符           |
| layout     | Json   | 是    | 布局关键字           |
| center     | Array  | 是    | 主布局             |
| left       | Array  | 否    | 列表项向右滑动时左侧显示的布局 |
| right      | Array  | 否    | 列表项向左滑动时右侧显示的布局 |

**回调参数:**

```javascript
var callbackFunction = function(error){}
```

| 参数名称  | 参数类型   | 说明                                       |
| ----- | ------ | ---------------------------------------- |
| error | Number | 错误码,0-成功，非0-失败，请参考[errorCode](#ErrorCode) |

**示例:**

```javascript
var params = {
 	listViewId:"0",
 	layout:{
 		center:["res://case1/layout_item1.xml","res://case1/layout_item2.xml"],
 		left:["res://case1/layout_left.xml"],
 		right:["res://case1/layout_right.xml"]
 	}
};
var data = JSON.stringify(params);
uexNBListView.initLayout(data, function(error){
    alert(error);
});
```

### 🍭 setItems 设置列表数据

`uexNBListView.setItems(params, callbackFunction);`

**说明:**

设置列表数据,也可以刷新列表数据.原列表数据会被清空.该方法需要在initLayout方法之后调用.

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明       |
| ---------------- | -------- | ---- | -------- |
| params           | String   | 是    | 设置列表相关参数 |
| callbackFunction | Function | 是    | 回调函数     |

```javascript
var params ={
    listViewId:,
    dataList:[//列表数据
        {
            center:{},
            left:{},
            right:{}
        }
    ]
}
```

各字段含义如下:

| 参数名称       | 参数类型   | 是否必选 | 说明                                       |
| ---------- | ------ | ---- | ---------------------------------------- |
| listViewId | String | 是    | 唯一标识符                                    |
| dataList   | Json数组 | 是    | 列表数据关键字                                  |
| center     | Json   | 是    | 主布局数据,键值对,与相应的布局文件中的变量key对应,至少包含指定布局唯一标识符id键值对,详见示例 |
| left       | Json   | 否    | 列表项向右滑动时,左侧布局数据,键值对,与相应的布局文件中的变量key对应,至少包含指定布局唯一标识符id键值对,详见示例 |
| right      | Json   | 否    | 列表项向左滑动时,右侧布局数据,键值对,与相应的布局文件中的变量key对应,至少包含指定布局唯一标识符id键值对,详见示例 |

**回调参数**

```javascript
var callbackFunction = function(error){}
```

| 参数名称  | 参数类型   | 说明                                       |
| ----- | ------ | ---------------------------------------- |
| error | Number | 错误码,0-成功，非0-失败，请参考[errorCode](#ErrorCode) |

**示例:**

layout_item1布局代码:

```xml
<?xml version="1.0" encoding="utf-8"?>
<root layoutId = "1" layoutType = "${type1}">
    <linearlayout width = "-1" height = "250" background = "#ffffff"
                  gravity = "centerY">
        <linearlayout orientation = "horizontal" width = "-1"
                      height = "-2">
            <linearlayout orientation = "vertical" width = "-1"
                          height = "-1" weight = "1"  gravity = "centerX">
                <img width = "-2" height = "-2" src = "${img1}"
                     onClick = "onListViewItemClick" id = "img1"/>
                <text id = "txt1" width = "-2" height = "-2" text="${text1}" textSize = "${text1-size}"
                      margin = "0 5" textColor = "${text1-color}"/>
            </linearlayout>
            <linearlayout orientation = "vertical" width = "-1"
                          height = "-1" weight = "1" gravity = "centerX">
                <img width = "-2" height = "-2" src = "res://case1/005.png"
                     onClick = "onListViewItemClick" id = "img2"/>
                <text id = "txt2" width = "-2" height = "-2" text="${text2}" textSize = "13" visible = "${visible2}"
                      margin = "0 5" textColor = "#000000"/>
            </linearlayout>
            <linearlayout orientation = "vertical" width = "-1"
                          height = "-1" weight = "1"  gravity = "centerX">
                <img width = "-2" height = "-2" src = "res://case1/006.png"
                     onClick = "onListViewItemClick" id = "img3"/>
                <text id = "txt3" width = "-2" height = "-2" text="${text3}" textSize = "13"
                      margin = "0 5" textColor = "#000000"/>
            </linearlayout>
            <linearlayout orientation = "vertical" width = "-1"
                          height = "-1" weight = "1"  gravity = "centerX">
                <button width = "-2" height = "-2" background = "${button-bg}"
                        text="${button-text}" textSize = "${button-textSize}"
                        textColor = "${button-textColor}"
                     onClick = "onListViewItemClick" id = "img4"/>
                <text id = "txt4" width = "-2" height = "-2" text="${text4}" textSize = "13"
                      margin = "0 5" textColor = "#000000"/>
            </linearlayout>
        </linearlayout>
    </linearlayout>
</root>
```

layout_item2布局代码:

```xml
<?xml version="1.0" encoding="utf-8"?>
<root layoutId = "2">
    <linearlayout id = "content" orientation = "horizontal" width = "-1"
                  height = "400" background="${content_bg}">
        <linearlayout id = "linearlayout2-1" width = "-1" height = "-1" weight = "1"  gravity = "bottom"
                      background="${left_pic}" margin = "20"
                      onClick = "onListViewItemClick">
            <linearlayout orientation = "horizontal" width = "-1"
                          height = "-2"  background = "#66000000"
                          gravity="centerX">
                <text id = "txt2-1" width = "-2" height = "-2" text="东圣九州国际大饭店" textSize = "14"
                      margin = "0 0" textColor = "#ffffff"/>
            </linearlayout>
        </linearlayout>
        <linearlayout id = "linearlayout2-2" width = "-1" height = "-1" weight = "1"  gravity = "bottom"
                      background="res://case1/BaDongQian.jpg" margin = "20"
                      onClick = "onListViewItemClick">
            <linearlayout orientation = "horizontal" width = "-1"
                          height = "-2"  background = "#66000000"
                          gravity="centerX">
                <text id = "txt2-2" width = "-2" height = "-2" text="大面山" textSize = "14"
                      margin = "0 0" textColor = "#ffffff"/>
            </linearlayout>
        </linearlayout>
    </linearlayout>
</root>
```

layout_left布局代码:

```xml
<?xml version="1.0" encoding="utf-8"?>
<root layoutId = "left">
    <linearlayout id = "content" orientation = "horizontal" width = "300" height = "-2">
        <button id = "txt" width = "-1" height = "-1" text="${left-button}" textSize = "14"
              onClick = "onLeftClick" textColor = "#ffffff"/>
    </linearlayout>
</root>
```

layout_right布局代码:

```xml
<?xml version="1.0" encoding="utf-8"?>
<root layoutId = "right">
    <linearlayout id = "content" orientation = "horizontal" width = "400" height = "-2">
        <button id = "txt" width = "-1" height = "-1" text="${right-button}" textSize = "14"
              onClick = "onRightClick" textColor = "#ffffff"/>
    </linearlayout>
</root>
```

setItems接口数据传入方式:

```javascript
var params = {
 	listViewId:"0",
 	dataList:[
 		{
 		center:{
 			"type1":"1",//指定布局id,这里对应initLayout接口的layout_item1布局,该布局文件定义了layoutType的属性值为${type1},则需要在这里通过type1关键字指定布局id.值1和layout_item1布局文件中的layoutId属性值一致.
 			//以下键值对中键是与layout_item1布局文件中定义的变量值(形如:${变量值})对应,值即是相对应的属性值.
 			"text1" : "测试1",
 			"text2" : "测试2",
 			"text3" : "测试3",
 			"text4" : "测试4",
 			"img1":"res://case1/006.png",
 			"text1-color":"#ff0000",
 			"text1-size":15,
 			"visible2":0,
 			"button-text":"btn1",
 			"button-textSize":20,
 			"button-textColor":"#00ff00",
 			"button-bg":"#dddddd"
 		},
  		left:{
 				"layoutId" : "left",//指定布局id,这里对应initLayout接口的layout_left布局,该布局文件没有定义layoutType属性,则需要在这里通过layoutId关键字指定布局id.值left和layout_left布局文件中的layoutId属性值一致.
 				"left-button" : "left1"
 		},
 		right:{
 			"layoutId" : "right",//指定布局id,这里对应initLayout接口的layout_right布局,该布局文件没有定义layoutType属性,则需要在这里通过layoutId关键字指定布局id.值right和layout_right布局文件中的layoutId属性值一致.
 			"right-button" : "right1"
 		}
 	},
 		{
 		center:{
 			"layoutId":"2",
 			"content_bg":"#ff0000",
 			"left_pic":"res://case1/BaDongQian.jpg"
 		},
 		left:{
 			"layoutId" : "left",
 			"left-button" : "left3"
 		},
 		right:{
 			"layoutId" : "right",
 			"right-button" : "right3"
 		}
 	}
	]
};
var data = JSON.stringify(params);
uexNBListView.setItems(data, function(error){
    alert(error);
});
```

### 🍭 open 打开自定义布局列表

`uexNBListView.open(params, callbackFunction);`

**说明:**

打开自定义布局列表,该方法需要在initLayout方法之后调用,若在调用该方法之前,设置了数据,则会直接显示列表内容,否则不显示.

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明       |
| ---------------- | -------- | ---- | -------- |
| params           | String   | 是    | 打开列表所需数据 |
| callbackFunction | Function | 是    | 回调函数     |

```javascript
var params ={
    listViewId:,
    left:,
    top:,
    width:,
    height:,
    swipeMode:,
    offsetLeft:,
    offsetRight:,
    refreshMode:,
    refreshTimeout:,
    openType:,
    containerID:,
    containerIndex:,
    backgroundColor:,
    header:{
        url:
    },
    footer:{
        url:
    }
}
```

各字段含义如下:

| 参数名称            | 参数类型   | 是否必选 | 说明                                       |
| --------------- | ------ | ---- | ---------------------------------------- |
| listViewId      | String | 是    | 唯一标识符                                    |
| left            | Number | 是    | 左间距                                      |
| top             | Number | 是    | 上间距                                      |
| width           | Number | 是    | 宽                                        |
| height          | Number | 是    | 高                                        |
| swipeMode       | Number | 否    | 侧滑模式,参考[SwipeType](#SwipeType),默认3       |
| offsetLeft      | Number | 否    | 向左滑动时右侧布局显示的宽度,swipeMode支持左滑时必选. <br>**建议和右侧布局的宽度一致.** |
| offsetRight     | Number | 否    | 向右滑动时左侧布局显示的宽度,swipeMode支持右滑时必选.<br>  **建议和左侧布局的宽度一致**. |
| refreshMode     | Number | 否    | 刷新模式,参考[RefreshMode](#RefreshMode),默认0   |
| refreshTimeout  | Number | 否    | 刷新超时时间,单位毫秒.在refreshMode非等于0有效,默认为3000   |
| openType        | Number | 否    | 打开方式,参考[OpenType](#OpenType)             |
| containerID     | String | 否    | 只在openType为2时有效且必选,并且该容器已经通过uexWindow中的 [createPluginViewContainer](http://newdocx.appcan.cn/newdocx/docx?type=1390_1249#createPluginViewContainer 创建插件容器 "createPluginViewContainer")方法创建成功 |
| containerIndex  | Number | 否    | 只在openType为2时有效且必选.指定该列表视图在容器中的索引        |
| backgroundColor | String | 否    | listView的背景色,不传默认为透明                     |
| header          | json   | 否    | listView头部网页,固定位于listView的顶端,不随listView滚动 |
| footer          | json   | 否    | listView底部网页,固定位于listView的底部,不随listView滚动 |
| url             | String | 是    | 网页地址,该网页中不能调用插件和引擎的任何方法,只能通过[sendHtmlEvent](#sendHtmlEvent 头部或底部网页向主网页发送数据方法)和[onHtmlEvent](#onHtmlEvent 头部或底部网页元素被点击的监听方法)与主网页之间进行数据传递 |

**回调参数**

```javascript
var callbackFunction = function(error){}
```

| 参数名称  | 参数类型   | 说明                                       |
| ----- | ------ | ---------------------------------------- |
| error | Number | 错误码,0-成功，非0-失败，请参考[errorCode](#ErrorCode) |

**示例:**

```javascript
var params = {
 	listViewId:"0",
 	left: 0,
 	top: 0,
 	width:800,
 	height:800,
 	offsetLeft:400,//建议为右侧布局的宽度,这里为layout_right布局文件的宽度
 	offsetRight:300,//建议为左侧布局的宽度,这里为layout_left布局文件的宽度
 	swipeMode:3,
 	refreshMode:0
 };
 var data = JSON.stringify(params);
 uexNBListView.open(data, function(error){
    alert(error);
});
```

### 🍭 close 关闭自定义布局列表

`uexNBListView.close(params);`

**说明:**

关闭自定义布局列表

**参数:**

```javascript
var params = []//唯一标识符数组
```

**示例:**

```javascript
        var params = [0];
        var data = JSON.stringify(params);
        uexNBListView.close(data);
```

### 🍭 insert 插入数据

`uexNBListView.insert(params,callbackFunction);`

**说明:**

根据索引插入一条或连续的多条数据,若索引大于或等于当前列表长度,则直接插入到列表末尾.注意dataList数据结构需要和setItems中的dataList数据结构保持一致.

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明     |
| ---------------- | -------- | ---- | ------ |
| params           | String   | 是    | 接口所需数据 |
| callbackFunction | Function | 是    | 回调函数   |

```javascript
var params ={
    listViewId:,
    index:,
    dataList:[
        {
            center:{},
            left:{},
            right:{}
        }
    ]
}
```

各字段含义如下:

| 参数名称       | 参数类型   | 是否必选 | 说明                                       |
| ---------- | ------ | ---- | ---------------------------------------- |
| listViewId | String | 是    | 唯一标识符                                    |
| index      | Number | 是    | 数据插入的位置索引,取值范围大于等于0,小于等于当前列表长度,若值大于当前列表长度<br>则默认插入到列表末尾 |
| dataList   | Json数组 | 是    | 列表数据关键字                                  |
| center     | Json   | 是    | 主布局数据,键值对,与相应的布局文件中的变量key对应,至少包含指定布局唯一标识符id<br>键值对,详见示例 |
| left       | Json   | 否    | 列表项向右滑动时,左侧布局数据,键值对,与相应的布局文件中的变量key对应,至少包含<br>指定布局唯一标识符id键值对,详见示例 |
| right      | Json   | 否    | 列表项向左滑动时,右侧布局数据,键值对,与相应的布局文件中的变量key对应,至少包含<br>指定布局唯一标识符id键值对,详见示例 |

**回调参数:**

```javascript
var callbackFunction = function(error){}
```

| 参数名称  | 参数类型   | 说明                                       |
| ----- | ------ | ---------------------------------------- |
| error | Number | 错误码,0-成功，非0-失败，请参考[errorCode](#ErrorCode) |

**示例:**

```javascript
var params = {
	listViewId:"0",
	index:1,
	dataList:[
 		{
 			center:{
 			"type1":"1",
 			"text1" : "add1",
 			"text2" : "add2",
 			"text3" : "add3",
 			"text4" : "add4",
 			"img1":"res://case1/006.png",
 			"text1-color":"#000000",
 			"text1-size":15,
 			"visible2":0,
 			"button-text":"btn1",
 			"button-textSize":12,
 			"button-textColor":"#00ff00",
 			"button-bg":"res://case1/005.png"
	  		},
 			left:{
				"layoutId" : "left",
 				"left-button" : "addleft1"
 			},
 			right:{
 				"layoutId" : "right",
 				"right-button" : "addright1"
 			}
 		},
 		{
 			center:{
 				"layoutId":"2",
 				"content_bg":"#00ff00",
 				"left_pic":"res://case1/BaDongQian.jpg"
 			},
 			left:{
 				"layoutId" : "left",
 				"left-button" : "addleft2"
		 	},
 			right:{
 				"layoutId" : "right",
 				"right-button" : "addright2"
 			}
 		}
 	]
 };
 var data = JSON.stringify(params);
 uexNBListView.insert(data, function(error){
    alert(error);
});
```

### 🍭 update 更新数据

`uexNBListView.update(params,callbackFunction);`

**说明:**

根据索引更新数据.

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明     |
| ---------------- | -------- | ---- | ------ |
| params           | String   | 是    | 接口所需数据 |
| callbackFunction | Function | 是    | 回调函数   |

```javascript
var params ={
    listViewId:,
    index:,
    data:{
            center:{},
            left:{},
            right:{}
    }
}
```

各字段含义如下:

| 参数名称       | 参数类型   | 是否必选 | 说明                                       |
| ---------- | ------ | ---- | ---------------------------------------- |
| listViewId | String | 是    | 唯一标识符                                    |
| index      | Number | 是    | 数据插入的位置索引,取值范围大于等于0,小于等于当前列表长度,若值大于当前列表长度<br>则默认插入到列表末尾 |
| data       | Json   | 是    | item数据关键字                                |
| center     | Json   | 否    | 主布局数据,键值对,此处不能指定布局id,只需传入要更新的数据即可        |
| left       | Json   | 否    | 列表项向右滑动时,左侧布局数据,键值对                      |
| right      | Json   | 否    | 列表项向左滑动时,右侧布局数据,键值对                      |

**回调参数:**

```javascript
var callbackFunction = function(error){}
```

| 参数名称  | 参数类型   | 说明                                       |
| ----- | ------ | ---------------------------------------- |
| error | Number | 错误码,0-成功，非0-失败，请参考[errorCode](#ErrorCode) |

**示例:**

```javascript
var params = {
	listViewId:"0",
	index:0,
	data:{
		center:{
			"text1":"更新我" + index
			}
		}
	};
var data = JSON.stringify(params);
uexNBListView.update(data, function(error){
    alert(error);
});
```

### 🍭 delete 删除数据

`uexNBListView.delete(params,callbackFunction);`

**说明:**

根据唯一标识符和索引删除数据.

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明     |
| ---------------- | -------- | ---- | ------ |
| params           | String   | 是    | 接口所需数据 |
| callbackFunction | Function | 是    | 回调函数   |

```javascript
var params ={
    listViewId:,//(必选) 唯一标识符
    indexes:[]//(必选) 索引数组
}
```
各字段含义如下:

| 参数名称       | 参数类型   | 是否必选 | 说明    |
| ---------- | ------ | ---- | ----- |
| listViewId | String | 是    | 唯一标识符 |
| indexes    | Array  | 是    | 索引数组  |

**回调参数:**

```javascript
var callbackFunction = function(error){}
```

| 参数名称  | 参数类型   | 说明                                       |
| ----- | ------ | ---------------------------------------- |
| error | Number | 错误码,0-成功，非0-失败，请参考[errorCode](#ErrorCode) |

**示例:**

```javascript
var params = {
	listViewId:"0",
	indexes:[0,1]
};
var data = JSON.stringify(params);
uexNBListView.delete(data, function(error){
    alert(error);
});
```

### 🍭 show 显示自定义列表

`uexNBListView.show(params);`

**说明:**

根据唯一标识符显示自定义列表.

**参数:**

```javascript
var params ={
    listViewId://(必选) 唯一标识符
}
```

**示例:**

```javascript
var params = {
	listViewId:"0"
};
var data = JSON.stringify(params);
uexNBListView.show(data);
```

### 🍭 hide 隐藏自定义列表

`uexNBListView.hide(params);`

**说明:**

根据唯一标识符隐藏自定义列表.

**参数:**

```javascript
var params ={
    listViewId://(必选) 唯一标识符
}
```

**示例:**

```javascript
var params = {
	listViewId:"0"
};
var data = JSON.stringify(params);
uexNBListView.hide(data);
```

### 🍭 setRefreshStatusCompleted 设置刷新完成状态

`uexNBListView.setRefreshStatusCompleted(params);`

**说明:**

在用户执行上拉或者下拉操作后可通过该方法设置刷新完成状态.若当前用户没有执行上拉或下拉操作,则调用该方法无效.

**参数:**

```javascript
var params = {
    listViewId://(必选) 唯一标识符
}
```

**示例:**

```javascript
var params = {
	listViewId:"0"
};
var data = JSON.stringify(params);
uexNBListView.setRefreshStatusCompleted(data);
```

### 🍭 sendHtmlEvent 头部或底部网页向主网页发送数据方法

`uexNBListView.sendHtmlEvent(data);`

**说明:**

该方法只能在头部或者底部html内调用,其他网页内调用该方法无效.该方法主要实现头部网页或者底部网页和主网页(打开listView的网页)之间的交互.调用该方法传递任意字符型参数,该参数会原样通过监听方法[onHtmlEvent](#onHtmlEvent 主网页收到头部或底部网页发送的数据的监听方法)传递给主网页.

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明          |
| ---- | ------ | ---- | ----------- |
| data | String | 是    | 需要传递给主网页的数据 |

**示例:**

```javascript
uexNBListView.sendHtmlEvent(data);
```

## 2.2、监听方法<ignore>

### 🍭 onPullRefreshHeader 下拉刷新的监听方法

`uexNBListView.onPullRefreshHeader(params);`

**参数:**

```javascript
var params ={
    status:
}
```

字段含义如下:

| 参数名称   | 参数类型   | 是否必选 | 说明                                      |
| ------ | ------ | ---- | --------------------------------------- |
| status | Number | 是    | 刷新状态,请参考[RefreshStatus](#RefreshStatus) |

**示例:**

```javascript
uexNBListView.onPullRefreshHeader = function(data){
	//alert("onPullRefreshHeader->" + data);
}
```

### 🍭 onPullRefreshFooter 上拉刷新的监听方法

`uexNBListView.onPullRefreshFooter(params);`

**参数:**

```javascript
var params ={
    status:
}
```

字段含义如下:

| 参数名称   | 参数类型   | 是否必选 | 说明                                      |
| ------ | ------ | ---- | --------------------------------------- |
| status | Number | 是    | 刷新状态,请参考[RefreshStatus](#RefreshStatus) |

**示例:**

```javascript
uexNBListView.onPullRefreshFooter = function(data){
	//alert("onPullRefreshFooter->" + data);
}
```

### 🍭 XXX 自定义布局内的元素被点击的监听方法

`uexNBListView.XXX(params);`

**说明:**

XXX表示名称,开发者可自定义.给在布局中的元素设置onClick属性值,在该元素被点击时该监听方法被触发.

**参数:**

```javascript
var params ={
    listViewId:,
    index:,
    id:
}
```

字段含义如下:

| 参数名称       | 参数类型   | 是否必选 | 说明         |
| ---------- | ------ | ---- | ---------- |
| listViewId | String | 是    | 列表唯一标识符    |
| index      | String | 是    | 元素所在列表中的项数 |
| id         | String | 是    | 元素的唯一标识符   |

**示例:**

在布局文件中设置元素及其onClick属性,如下:

```javascript
<?xml version="1.0" encoding="utf-8"?>
<root layoutId = "left">
    <linearlayout id = "content" orientation = "horizontal" width = "300" height = "-2">
        <button id = "txt" width = "-1" height = "-1" text="${left-button}" textSize = "14" onClick = "onLeftClick" textColor = "#ffffff"/>
    </linearlayout>
</root>
```

则需要在调用open的网页的uexOnload方法中添加如下注册:
```javascript
uexNBListView.onLeftClick = function(data){
	alert("onLeftClick->" + data);
};
```
其中onLeftClick方法在id为txt的元素被点击时触发.

### 🍭 onHtmlEvent 主网页收到头部或底部网页发送的数据的监听方法

`uexNBListView.onHtmlEvent(info);`

**参数:**
```javascript
var info = {
    listViewId:,
    data:
}
```
各字段含义如下:

| 参数名称       | 参数类型   | 是否必选 | 说明                                       |
| ---------- | ------ | ---- | ---------------------------------------- |
| listViewId | String | 是    | listView的唯一标识符                           |
| data       | String | 是    | 头部或底部网页通过[sendHtmlEvent](#sendHtmlEvent 头部或底部网页向主网页发送数据方法)传递的参数 |

**平台支持:**

Android2.2+    

**版本支持:**

Android3.0.1+    

**示例:**

```javascript
uexNBListView.onHtmlEvent = function(data){
	//alert("onHtmlEvent->" + data);
}
```

# 3、更新历史<ignore>

### iOS<ignore>

**uexNBListView目前不支持iOS**

### Android<ignore>

API版本: `uexNBListView-4.0.0`

最近更新时间:`2016-7-27`

| 历史发布版本 | 更新内容                  |
| ------ | --------------------- |
# 4、附录<ignore>

### SwipeType<ignore>

| value | 说明      |
| ----- | ------- |
| 0     | 可以向右滑动  |
| 1     | 可以向左滑动  |
| 2     | 左右都可以滑动 |
| 3     | 左右都不能滑动 |

### RefreshMode<ignore>

| value | 说明        |
| ----- | --------- |
| 0     | 无刷新模式     |
| 1     | 只支持下拉刷新   |
| 2     | 只支持上拉刷新   |
| 3     | 上拉下拉刷新都支持 |

### RefreshStatus<ignore>

| value | 说明   |
| ----- | ---- |
| 0     | 开始刷新 |
| 1     | 刷新完成 |
| 2     | 刷新超时 |

### OpenType<ignore>

| value | 说明                         |
| ----- | -------------------------- |
| 0     | 可以跟随网页滚动                   |
| 1     | 不随网页滚动                     |
| 2     | 列表添加到容器中,可实现容器中视图的左右滑动切换功能 |

### ErrorCode<ignore>

| errorCode | 说明       |
| --------- | -------- |
| 0         | 成功       |
| 1         | 失败,未知错误  |
| -1        | 参数错误     |
| -2        | 未初始化布局错误 |
| -3        | 未打开列表错误  |

### VariableSupport<ignore>

| 属性名        | 说明   |
| ---------- | ---- |
| textSize   | 字体大小 |
| textColor  | 字体颜色 |
| text       | 文本内容 |
| src        | 图片地址 |
| background | 背景   |
| visible    | 是否可见 |

# 5、技术专题<ignore>

### 数据载入方式<ignore>
uexNBListView在使用过程中,需要优先调用initLayout初始化布局方法,布局在定义时需要指定哪些数据在列表中是动态的,然后在setItems,insert或者update接口时对应的传入相应的数据.举例如下:
布局文件:

```xml
<?xml version="1.0" encoding="utf-8"?>
<root layoutId = "2" layoutType = "${type}">
    <linearlayout id = "content" orientation = "horizontal" width = "-1"
                  height = "-2" background="${backgroundColor}" gravity = "center">
        <text id = "text" width = "-2" height = "-2" text="${title}"
              textColor = "#000000" weight = "1"/>
        <button width = "-2" height = "-2" text="查看详情" onClick = "onButtonClick"/>
    </linearlayout>
</root>
```

其中定义了两个控件元素,一个text显示标题,一个button显示操作按钮.
其中跟根布局linearlayout的背景颜色和text的文本内容需要动态变化,则定义id为content的linearlayout的background属性为:${自定义变量名},这里的"自定义变量名"为backgroundColor.同理定义id为text的text属性为${title}.
则在设置数据的时候,传入如下代码:

```javascript
        var params = {
            listViewId:0,
            dataList:[
                {
                    center:{
                        "type":2,//指定布局id
                        "backgroundColor":"#dddddd",//定义背景颜色为灰色
                        "title":"平凡的世界"//定义标题
                    }
                },
                {
                    center:{
                        "type":2,//指定布局id
                        "backgroundColor":"#ffffff",//定义背景颜色为白色
                        "title":"三国演义"//定义标题
                    }
                }
            ]
        };
        var data = JSON.stringify(params);
        uexNBListView.setItems(data);
```
则运行效果为:

![](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexNBListView/ScreenShoot/data.png)

**注意事项**
>  1、 需要动态更新的数据,必须唯一指定该元素的id,如上例中的linearlayout的id为content,text的id为text.
>  2.、定义变量名时必须是形如${XXX},XXX表示自定义的名称,该名称不能再包含"$"、"{"和"}"符号,并且和传入数据时的key一一对应;

>1. 目前只支持部分属性的动态更新,详情请参考[附录](#VariableSupport),属性的取值范围及规则参考"[自定义布局指引文档](http://newdocx.appcan.cn/newdocx/docx?type=1788_975 "自定义布局指引文档")"中的各属性介绍.

