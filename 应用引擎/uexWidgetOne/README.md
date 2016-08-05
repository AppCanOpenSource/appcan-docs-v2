[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
系统全局对象
## 1.1、属性  
> ### platformName 系统名称

` uexWidgetOne.platformName`

**说明:**

同步获取系统名称，如Android，iOS等。

**版本支持:**

4.0.0+

**示例:**

```
alert('系统为:' + uexWidgetOne.platformName);    
```

> ### platformVersion 系统版本

`uexWidgetOne.platformVersion`

**说明:**

同步获取系统版本，如2.3.4，4.3.1等。

**版本支持:**

4.0.0+

**示例:**

```
alert('系统版本为:' + uexWidgetOne.platformVersion);
```
> ### iOS7Style 应用iOS7风格判断

`uexWidgetOne.iOS7Style`

**说明:**

判断当前应用是否为iOS7风格.0为非iOS7风格,1为iOS7风格.

**平台支持:**

 iOS6.0+

**版本支持:**

4.0.0+

**示例:**

```
alert('应用是否为iOS7风格:' + uexWidgetOne. iOS7Style)";
```
> ### isFullScreen 应用全屏判断

` uexWidgetOne.isFullScreen`
**说明:**

判断当前应用是否为全屏.0非全屏(显示状态栏),1是全屏(不显示状态栏).

**平台支持:**

iOS6.0+

**版本支持:**

4.0.0+

**示例:**

```
alert('应用是否为全屏:' + uexWidgetOne.isFullScreen)";
```
#2、方法
##2.1、方法


> ### getPlatform 获取平台信息

`uexWidgetOne.getPlatform()`

**说明:**

 获取平台信息

**参数:**

无

**返回值：**

Number类型，0为iOS，1为Android

**版本支持:**

3.0.0+

**示例:**

```
uexWidgetOne.getPlatform();
```
> ### exit 退出

`uexWidgetOne.exit(flag)`

**说明:**

退出程序

**参数:**

    flag:(Number类型) 可选  是否弹出关闭提示框，0-不弹，否则弹提示框。
**版本支持:**

3.0.0+

**示例:**

```
uexWidgetOne.exit(0);
```
> ### getCurrentWidgetInfo 获取当前widget信息

` uexWidgetOne.getCurrentWidgetInfo()`

**说明:**

获取当前widget信息

**参数:**

无

**返回值：**

Json对象，各参数如下：

|  参数名称   |  参数类型  |   说明    |
| :-----: | :----: | :-----: |
|  appId  | String |         |
| version | String |         |
|  name   | String |         |
|  icon   | String | icon的路径 |

**版本支持:**

4.0.0+

**示例:**

```javascript
var widgetInfo=uexWidgetOne.getCurrentWidgetInfo();
console.log(widgetInfo.name)
```
> ### cleanCache 清除缓存

`uexWidgetOne.cleanCache()`
**说明:**
清除当前应用的缓存，仅主widget调用此接口有效。
**参数:**
 无
**版本支持:**
 3.0.0+
**示例:**

```
uexWidgetOne.cleanCache();
```
> ### getMainWidgetId 获取主widget的appId

`uexWidgetOne.getMainWidgetId()`

**说明:**

获取主widget的appId

**参数:**

无

**返回值：**

String类型

**版本支持:**

4.0.0+

**示例:**

```javascript
var appId=uexWidgetOne.getMainWidgetId();
```


> ### getEngineVersion 获取当前引擎版本

`uexWidgetOne.getEngineVersion()`

**说明:**

获取当前引擎版本

**参数:**

无

**返回值:**

返回值是String类型的字符串,代表当前的引擎版本。比如"3.4.0"

**平台支持:**

Android2.2+
iOS7.0+

**版本支持:**

3.4.0+

**示例:**

```
alert("engine version:" + uexWidgetOne.getEngineVersion());
```

> ### getEngineVersionCode 获取当前引擎版本号

`uexWidgetOne.getEngineVersionCode()`

**说明:**

获取当前引擎版本号

**参数:**

无

**返回值:**

返回值是Number类型

	引擎版本和引擎版本号的转换规则如下所示:
	"3.4.0"  => 30400
	"3.5.2"  => 30502
	"3.16.13" => 31613


**平台支持:**

Android2.2+
iOS7.0+

**版本支持:**

3.4.0+

**示例:**

```
alert("engine version code:" + uexWidgetOne.getEngineVersionCode());
```


##2.2、回调方法
> ### cbError 出现异常时的回调方法

`uexWidgetOne.cbError(opId,errorCode,errorInfo)`

**参数:**

````
opId:(Number类型) 必选  操作ID，在此函数中不起作用，可忽略
errorCode:(Number类型) 必选  错误代码详见ErrorCode
errorInfo:(String类型) 必选  错误信息````

**版本支持:**

3.0.0+

**示例:**
​```
function cbError(opId,dataType,data){
    alert(data);
}
window.uexOnload = function() {
uexWidgetOne.cbError = cbError;
}
​```
````