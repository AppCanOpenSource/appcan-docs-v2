
[TOC]

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 

后台插件

## 1.1、说明

此插件内置了一个可以后台执行的JS上下文,用于进行一些后台操作.你可以在此JS上下文中中调用引擎和其他插件来进行一些需要在后台也需要执行的事件,比如后台定位并上报到服务器等,对于iOS系统,额外需要注意的事项,具体使用说明[查看](#start 开始运行后台JS "查看")API接口.

## 1.2、UI展示

无

## 1.3、开源源码

插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
小贴士：

为了保证项目正常应用该插件接口，插件集成前请先参考以下手册测试 
**测试用例使用手册：**[请参考](/docAttach/975/uexBackground测试手册.doc "参考")
## 1.4、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

1、config配置加密情况下，须使用4.0引擎版本和4.0插件版本（仅android），其修复了3.0插件加密无效的问题
# 2、API概览

## 2.1、方法

### 🍭start 开始运行后台JS

`uexBackground.start(param)`

**说明**

* 开始运行后台JS.
* 你可以在此JS上下文中中调用引擎和其他插件来进行一些需要在后台也需要执行的事件,比如后台定位并上报到服务器等等.

注意:

* 此JS上下文独立于任何一个网页,不包含UI元素,所以不要调用任何包含UI或者UI操作的插件/接口,也不要执行一些网页独有的JS命令,比如dom操作,否则会产生不可预知的后果.
* 如果要获取网页中的变量的值,用`uexWindow.putLocalData`和`uexWindow.getLocalData`进行,不要用localStorage!

对于iOS系统,额外需要注意如下事项

* 需要在config.xml中配置后台权限 app才能在后台时正常运行.具体配置方法见[这里](http://newdocx.appcan.cn/dev-guide/config%C2%B7xml).
* **不当的后台权限配置可能会影响上架AppStore!**


**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明           |
| ----- | ------ | ---- | ------------ |
| param | Object | 是    | 接口所需数据,形式见下: |

```javascript
var param = {
  jsPath:,
  jsResourcePaths:
}
```

各字段含义如下:

| 字段名称            | 字段类型   | 是否必选 | 说明                                   |
| --------------- | ------ | ---- | ------------------------------------ |
| jsPath          | String | 是    | 后台js文件路径                             |
| jsResourcePaths | Array  | 否    | 由String构成的字符串,依赖的js文件路径,依赖的js文件会被先执行 |


**返回值**

Boolean 类型

* js文件查找失败会返回false;
* 全局只允许唯一的后台运行JS,因此如果已经有正在运行的后台JS,此接口会返回false;


**示例**

```javascript
var data = {
 	jsPath:"res://background.js",
 	jsResourcePaths:["res://../js/constant.js","res://../js/CCLog.js"]
}
var result = uexBackground.start(data);
```

* 此示例中,用`"res://../"`获得了`wgtRes`的上级目录的路径,**这种方式仅本插件支持!**

### 🍭stop 停止当前正在运行的后台JS

`uexBackground.stop()`

**说明**

停止当前正在运行的后台JS

**参数**

无

**返回值**

Boolean 是否stop成功

* 如果没有正在运行的后台JS,会返回false;
* 成功被停止运行的JS上下文将会被销毁,下次调用start时,会生成一个全新的JS上下文

**示例**

```javascript
var result = uexBackground.stop();
```

### 🍭 addTimer 设置一个定时器

`uexBackground.addTimer(param, cb)`

**说明**

设置一个定时器

**参数**

| 参数名称  | 参数类型     | 是否必选 | 说明           |
| ----- | -------- | ---- | ------------ |
| param | Object   | 是    | 接口所需数据,形式见下: |
| cb    | Function | 是    | 回调方法         |

```javascript
var param = {
	id:,
	repeatTimes:,
	timeInterval:
}
```

各字段含义如下:

| 字段名称         | 字段类型   | 是否必选 | 说明            |
| ------------ | ------ | ---- | ------------- |
| id           | String | 是    | 唯一标识符         |
| repeatTimes  | Number | 是    | 重复次数,传0表示无限循环 |
| timeInterval | Number | 是    | 间隔时间,单位毫秒     |

* 设置成功之后,**会立即开始第一次回调**,而不是等过了timeInterval毫秒之后才开始第一次;
* 由于系统限制,实际使用时,回调触发间隔可能会有毫秒级的误差;
* 当调用uexBackground.stop()接口时,所有的定时器将会被安全的取消.

**回调参数**

```javascript
var cb = function(count){}
```

| 参数名称  | 类型     | 说明                |
| ----- | ------ | ----------------- |
| count | Number | 当前已经执行的次数.从1开始计数. |

**返回值**

Boolean 是否add成功 

* 参数缺失/不正确会返回false;
* 没有正在运行的后台JS会返回false;
  * 因此,建议在uexBackground.onLoad()中去设置第一个timer ;
* 使用已有的id/functionName会返回false;


**示例**

```javascript
var param = {
	id:"timer",
	repeatTimes:0,
	timeInterval:1000
}
var result = uexBackground.addTimer(param,function(count){
	alert("定时器执行次数:" + count);
});
alert(result);
```

### 🍭 cancelTimer 取消定时器

`uexBackground.cancelTimer(param)`

**说明**

取消定时器

**参数**

| 参数名称  | 参数类型    | 是否必选 | 说明                      |
| ----- | ------- | ---- | ----------------------- |
| param | JSON字符串 | 是    | 由id构成的数组,传[]代表取消所有timer |

```javascript
var param = []
```

**示例**

```javascript
var param = ["timer"];
uexBackground.cancelTimer(JSON.stringify(param));
```

## 2.2、监听方法

**重要:以下监听方法均需要在后台的JS文件中声明并使用!**

### 🍭 onLoad 后台JS开始运行的监听方法

`uexBackground.onLoad()`

**说明**

* 后台JS开始运行时,会调用此监听方法

**参数**

无

**示例**

```
uexBackground.onLoad = function(){
	alert("后台JS开始运行!");
}
```



# 3、更新历史

### iOS

API版本: `uexBackground-4.0.0`

最近更新时间:`2016-8-18`

| 历史发布版本 | 更新内容   |
| ------ | ------ |

### Android

API版本: `uexBackground-4.0.0`

最近更新时间:`2016-8-18`

| 历史发布版本 | 更新内容   |
| ------ | ------ |
