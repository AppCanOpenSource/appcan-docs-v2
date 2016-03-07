
[TOC]

#uexBackground






##方法


###start(param);

**说明**

开始运行后台JS


**参数**


param 是JSON字符串

```
var param = {
	jsPath:,//String必选，js文件路径
}
```
**返回值**

Boolean 

* js文件查找失败会返回false;
* 全局只允许唯一的后台运行JS，因此如果已经有正在运行的后台JS，此接口会返回false;
* 对于iOS系统，仅当设置了后台权限时才能运行后台JS。因此若没有后台权限，此接口返回false;


###stop();//调用stop之后，所有的timer将会被取消

**说明**

停止当前正在运行的后台JS

**参数**

无

**返回值**

Boolean 是否stop成功

* 如果没有正在运行的后台JS，会返回false;




###addTimer(param)

**说明**

设置一个定时器



**参数**

param 是JSON字符串


```
var param = {
	id:,//String,必选,唯一标识符
	callbackName://String,必选,不可重复,回调方法名
	repeatTimes://Number,必选，重复次数,传0表示无限循环
	timeInterval://Number,必选 单位毫秒
}
```

* 设置成功之后，**会立即开始第一次回调**，而不是等过了timeInterval毫秒之后才开始第一次
* callbackName不能为`"onLoad"`

**返回值**

Boolean 是否add成功 


* 参数缺失/不正确会返回false;
* 没有正在运行的后台JS会返回false;
	* 因此，建议在uexBackground.onLoad()中去设置第一个timer ;
* 使用已有的id/functionName会返回false;

###cancelTimer(param);

**说明**

取消一个定时器

**参数**

param 是JSON字符串

```
var param = []//Array,必选由id构成的数组，传[]代表取消所有timer
```

**返回值**

无

## 监听方法

**重要:以下监听方法均需要在后台的JS文件中声明并使用!**

###onLoad()

**说明**

* 后台JS开始运行时，会调用此监听方法


**参数**

无


###XXX(param)

**说明**

* addTimer后定时器的监听方法
* XXX为在addTimer接口中指定的callbackName方法名


**参数**

param 是JSON字符串


```
var param = {
	currentTimes://Number,当前已经执行的次数。从1开始计数。
}
```