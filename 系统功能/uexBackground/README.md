
[TOC]

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 

后台插件

## 1.1、说明

此插件内置了一个可以后台执行的JS上下文,用于进行一些后台操作。

## 1.2、UI展示

无

## 1.3、开源源码

插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

> ### start() 开始运行后台JS

`uexBackground.start(param)`

**说明**

* 开始运行后台JS。
* 你可以在此JS上下文中中调用引擎和其他插件来进行一些需要在后台也需要执行的事件,比如后台定位并上报到服务器等等。

注意:

* 此JS上下文独立于任何一个网页,不包含UI元素,所以不要调用任何包含UI或者UI操作的插件/接口,也不要执行一些网页独有的JS命令,比如dom操作,否则会产生不可预知的后果。
* 如果要获取网页中的变量的值,用`uexWindow.putLocalData`和`uexWindow.getLocalData`进行,不要用localStorage!

对于iOS系统,额外需要注意如下事项

* 需要在config.xml中配置后台权限 app才能在后台运行。具体配置方法见[这里](http://newdocx.appcan.cn/newdocx/docx?type=1505_1291#设置APP后台权限)。
* **不当的后台权限配置可能会影响上架AppStore!**
	

**参数**

param 是JSON字符串，路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes

```
var param = {
	jsPath:,//String必选,js文件路径
	jsResourcePaths:,//Array,可选, 由String构成的字符串,依赖的js文件路径,依赖的JS文件会被先执行
}
```
**返回值**

Boolean 

* js文件查找失败会返回false;
* 全局只允许唯一的后台运行JS,因此如果已经有正在运行的后台JS,此接口会返回false;

**平台支持:**

Android 4.0+
iOS 7.0+

**版本支持:**

3.3.0+

**示例**

```
var data = {
 	jsPath:"res://background.js",
 	jsResourcePaths:["res://../js/constant.js","res://../js/CCLog.js"]
}
var result = uexBackground.start(JSON.stringify(data));
```

* 此示例中,用`"res://../"`获得了`widget`目录的路径,**这种方式仅本插件支持!**

> ###stop() 停止当前正在运行的后台JS

`uexBackground.stop()`

**说明**

停止当前正在运行的后台JS

**参数**

无

**返回值**

Boolean 是否stop成功

* 如果没有正在运行的后台JS,会返回false;
* 成功被停止运行的JS上下文将会被销毁,下次调用start时,会生成一个全新的JS上下文

**平台支持:**

Android 4.0+
iOS 7.0+

**版本支持:**

3.3.0+

**示例**

```
var result = uexBackground.stop();
```

###addTimer 设置一个定时器

`uexBackground.addTimer(param)`

**说明**

设置一个定时器

**参数**

param 是JSON字符串

```
var param = {
	id:,//String,必选,唯一标识符
	callbackName:,//String,必选,不可重复,回调方法名
	repeatTimes:,//Number,必选,重复次数,传0表示无限循环
	timeInterval:,//Number,必选 单位毫秒
}
```

* 设置成功之后,**会立即开始第一次回调**,而不是等过了timeInterval毫秒之后才开始第一次;
* callbackName不能为`"onLoad"`;
* 由于系统限制,实际使用时,回调触发间隔可能会有毫秒级的误差;
* 当调用uexBackground.stop()接口时,所有的定时器将会被安全的取消:)

**返回值**

Boolean 是否add成功 

* 参数缺失/不正确会返回false;
* 没有正在运行的后台JS会返回false;
	* 因此,建议在uexBackground.onLoad()中去设置第一个timer ;
* 使用已有的id/functionName会返回false;

**平台支持:**

Android 4.0+
iOS 7.0+

**版本支持:**

3.3.0+

**示例**

```
var param = {
	id:"timer",
	callbackName:"cbTimer",
	repeatTimes:0,
	timeInterval:1000
}
var result = uexBackground.addTimer(JSON.stringify(param));
```

###cancelTimer 取消定时器

`uexBackground.cancelTimer(param)`

**说明**

取消定时器

**参数**

param 是**数组**转换而成的JSON字符串

```
var param = []//Array,必选由id构成的数组,传[]代表取消所有timer
```

**返回值**

无

**平台支持:**

Android 4.0+
iOS 7.0+

**版本支持:**

3.3.0+

**示例**

```
var param = ["timer"];
var result = uexBackground.cancelTimer(JSON.stringify(param));
```

## 2.2、监听方法

**重要:以下监听方法均需要在后台的JS文件中声明并使用!**

###onLoad 后台JS开始运行的监听方法

`uexBackground.onLoad()`

**说明**

* 后台JS开始运行时,会调用此监听方法

**参数**

无

**平台支持:**

Android 4.0+
iOS 7.0+

**版本支持:**

3.3.0+

**示例**

```
uexBackground.onLoad = function(){
	alert("后台JS开始运行!");
}
```

###XXX 定时器的监听方法

`uexBackground.XXX()`

**说明**

* addTimer后定时器的监听方法
* XXX为在addTimer接口中指定的callbackName方法名

**参数**

Number类型,为当前已经执行的次数。从1开始计数。

**平台支持:**

Android 4.0+
iOS 7.0+

**版本支持:**

3.3.0+

**示例**

```
uexBackground.XXX = function(count){
	alert("定时器执行次数:" + count);
}
```

# 3、更新历史

### iOS

API版本:`uexBackground-3.0.0`

最近更新时间:`2016-3-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | uexBackground for iOS |

### Android

API版本:`uexBackground-3.3.0`

最近更新时间:`2016-3-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.3.0 | 后台运行插件 |
