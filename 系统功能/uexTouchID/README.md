[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
TouchID苹果指纹识别功能插件
## 1.1、说明
 本对象封装了用于调用系统TouchID功能的方法,可以调用系统TouchID验证界面进行指纹识别。
 TouchID功能接口只适用iOS8.0以上系统和支持指纹识别的设备。
## 1.2、UI展示

## 1.3、开源源码
插件测试用例与源码下载:[点击此处](http://plugin.appcan.cn/details.html?id=504_pluginlist "点击此处")
#2、API概览
## 2.1、方法

> ###verify  调用TouchID界面

``
uexTouchID.verify(hint)
``

**说明:**

调用系统TouchID界面并显示提示信息

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| hint | String | 是 | 提示信息 |

**平台支持**

iOS8.0+

**版本支持**

3.0.0+

**示例**

```
uexTouchID.verify("请通过TouchID指纹验证!");
```
## 2.2、回调方法

> ###cbVerify  TouchID验证回调方法

```
uexTouchID.cbVerify(status,reason)

```

**说明:**

TouchID验证回调方法,设备和系统不支持TouchID直接回调该方法,设备和系统支持TouchID则在指纹验证之后回调

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| status | Number | 是 | TouchID验证提示信息,验证通过为1,未通过或不支持为0 |
| reason | String | 是 | 验证失败/不支持TouchID提示信息,验证通过则为null |

**平台支持**

iOS8.0+

**版本支持**

3.0.0+

**示例**

```
uexTouchID.cbVerify=function(status,reason){
	alert("status:"+status+"reason:"+reason);
}
```

# 3、更新历史

### iOS

API版本:`uexTouchID-3.0.1`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.1 | 添加IDE支持 |
| 3.0.0 | TouchID功能插件 |

### Android

**uexTouchID目前不支持Android**

