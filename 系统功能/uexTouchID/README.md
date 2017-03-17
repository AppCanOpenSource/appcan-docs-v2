[TOC]
# 1､简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
TouchID苹果指纹识别功能插件
## 1.1､说明
 本对象封装了用于调用系统TouchID功能的方法,可以调用系统TouchID验证界面进行指纹识别.
 TouchID功能接口只适用iOS8.0以上系统且支持指纹识别的设备.
## 1.2､UI展示

## 1.3､开源源码
插件测试用例与源码下载:[点击此处](http://plugin.appcan.cn/details.html?id=504_pluginlist "点击此处")

## 1.4､平台版本支持
本插件的所有API默认只支持**iOS8.0+**操作系统,**不支持Android**.
有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

# 2､API概览

## 2.1､方法


### 🍭 canAuthenticate 是否支持TouchID

`uexTouchID.canAuthenticate(data)`  

**说明:**

校验当前应用是否支持指纹验证

**参数:**

| 参数名称 | 参数类型     | 是否必选 | 说明                     |
| ---- | -------- | ---- | ---------------------- |
| data | Object   | 是    | 指纹验证的配置,不需要进行配置时请传null |

```javascript
var data = {
  mode:
}
```


各字段含义如下:

| 参数名称 | 参数类型   | 是否必选 | 说明                                       |
| ---- | ------ | ---- | ---------------------------------------- |
| mode | Number | 否    | 指纹验证模式,详见[附录-AuthenticateMode](#AuthenticateMode 验证模式),不传时默认为0 |

**返回值**

返回值是一个ErrorCode ,详见[附录-ErrorCode](#ErrorCode 错误码),**非0时均表示不支持TouchID**


**示例**

```javascript
var ret = uexTouchID.canAuthenticate({
    mode: 0
});
alert(ret);
```


### 🍭 authenticate 校验TouchID

`uexTouchID.authenticate(data,cb)`  

**说明:**

开始指纹验证

* 调用此接口时,最好先调用[canAuthenticate](#canAuthenticate)接口确认当前设备支持TouchID

**参数:**

| 参数名称 | 参数类型     | 是否必选 | 说明                     |
| ---- | -------- | ---- | ---------------------- |
| data | Object   | 是    | 指纹验证的配置,不需要进行配置时请传null |
| cb   | Function | 是    | 指纹验证结果的回调函数            |

```javascript
var data = {
  hint:,
  mode:
}
```


各字段含义如下:

| 参数名称 | 参数类型   | 是否必选 | 说明                                       |
| ---- | ------ | ---- | ---------------------------------------- |
| hint | String | 否    | 指纹验证界面的提示语,不传时使用系统默认的提示语                 |
| mode | Number | 否    | 指纹验证模式,详见[附录-AuthenticateMode](#AuthenticateMode 验证模式),不传时默认为0 |

**回调参数:**

```javascript
var cb = function(error){}
```

| 参数名称  | 参数类型   | 是否必选 | 说明                                       |
| ----- | ------ | ---- | ---------------------------------------- |
| error | Number | 是    | ret是一个ErrorCode ,详见[附录-ErrorCode](#ErrorCode 错误码),**非0时均表示验证失败** |


**示例**

```javascript
var ret = uexTouchID.canAuthenticate();
if (ret != 0){
	alert("TouchID Unavailable!errorCode: " + ret);
}else{
	uexTouchID.authenticate({
		mode:0,
		hint:"AppCan需要验证您的指纹"
		},
		function(ret){
			if(ret == 0){
				alert("Authentication Succeed!");
			}else{
				alert("Authentication Failed!errorCode:" + ret);
			}
	});
}
```


# 3､附录

###AuthenticateMode 验证模式

AuthenticateMode 是一个Int类型的枚举值

| mode | 含义                                      | 解释                      | 备注            |
| ---- | --------------------------------------- | ----------------------- | ------------- |
| 0    | DeviceOwnerAuthenticationWithBiometrics | 默认的指纹验证模式,仅当指纹验证通过时返回成功 | 默认值           |
| 1    | DeviceOwnerAuthentication               | 允许用户使用设备密码代替指纹进行验证      | 需要iOS 9.0+ 系统 |

* 当设备不支持所选择的验证模式时,插件会默认验证模式为0  


###ErrorCode 错误码

ErrorCode 是一个Int类型的枚举值,**非零值时均表示操作失败**

| code | 含义                   | 解释                                 | 备注   |
| ---- | -------------------- | ---------------------------------- | ---- |
| 0    | NoError              | 没有发生错误,操作成功                        |      |
| -1   | AuthenticationFailed | 验证失败                               |      |
| -2   | UserCancel           | 用户取消,用户点击取消按钮时会导致此结果               |      |
| -3   | UserFallback         | 用户回退,在默认验证模式下用户选择"输入密码"会导致此结果      |      |
| -4   | SystemCancel         | 系统取消,当另一个应用切换到前台时会导致此结果            |      |
| -5   | PasscodeNotSet       | 用户没有设置设备密码时,会导致此结果                 |      |
| -6   | TouchIDNotAvailable  | TouchID不可用时会导致此结果,可能是设备不支持或者系统版本太低 |      |
| -7   | TouchIDNotEnrolled   | 用户设置了设备密码但没有设置指纹时,会导致此结果           |      |
| -8   | TouchIDLockout       | 用户验证指纹识别错误次数过多会导致此结果               |      |
| 其他情况 | UnknownError         | 未知错误                               |      |




# 4､更新历史

### iOS

API版本: `uexTouchID-4.0.1`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.1 | canAuthenticate接口支持配置mode |
| 4.0.0 | TouchID功能插件 |

### Android

**暂不支持!**
