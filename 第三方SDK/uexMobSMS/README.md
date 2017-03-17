[TOC]
# 1､简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
Mob短信验证插件
## 1.1､说明
封装Mob短信验证相关操作
目前国内短信默认会显示【掌淘科技】的签名,如果开发者想把这个签名换成自己公司的名称或者APP名称,那么需要满足以下条件并按以下流程来操作. 具体使用点击查看:[ 短信验证码自定义签名注意事项](http://bbs.mob.com/thread-16106-1-1.html).另外对于iOS,您可以在在苹果审核您的应用期间,开启临时广告通过苹果审核,审核通过后可关闭广告.
## 1.2､UI展示


## 1.3､开源源码

插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=616_index)    插件中心至插件详情页 (插件测试用例与插件源码已经提供)


## 1.4､平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.   
有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.   
在后续版本中新添加的接口会在文档中额外说明. 

# 2､API概览

##2.1､方法

### 🍭 init 初始化方法

`uexMobSMS.init(params);`


**说明:**

该方法为注册appKey和appSecret,这一步必须最先执行.
 appKey 和 appSecret的获取步骤:

**(1)到Mob官网注册成为Mob开发者;**

**(2)到应用管理后台新建应用.**

**(3)在应用信息栏中上传安装包文件.**

​               

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明           |
| ------ | ------ | ---- | ------------ |
| params | String | 是    | 接口所需数据,形式见下: |

```javascript
var params = {
    uexMobSMS_APPKey:,
    uexMobSMS_APPSecret:
}
```

各字段含义如下:

| 字段名称                | 类型     | 是否必选 | 说明                      |
| ------------------- | ------ | ---- | ----------------------- |
| uexMobSMS_APPKey    | String | 是    | 在mob上注册并获取相应的App Key    |
| uexMobSMS_APPSecret | String | 是    | 在mob上注册并获取相应的App Secret |


**示例:**

```javascript
var params = {
    "uexMobSMS_APPKey": "e5c90ea53640",
    "uexMobSMS_APPSecret": "d2ec92c2e5de325c52fc53bdb63374fc"
 };               
 uexMobSMS.init(JSON.stringify(params));
```

### 🍭 sendCode 发送短信验证码到手机

`uexMobSMS.sendCode(params, callbackFunction);`
​     

**说明:**

发送短信验证码到手机, 执行成功后会回调`callbackFunction`方法.
​                

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明           |
| ---------------- | -------- | ---- | ------------ |
| params           | String   | 是    | 接口所需数据,形式见下: |
| callbackFunction | Function | 是    | 回调方法         |

```javascript
var params = {
       phoneNum:,
       countryCode:
}
```

各字段含义如下:

| 字段名称        | 类型     | 是否必选 | 说明           |
| ----------- | ------ | ---- | ------------ |
| phoneNum    | String | 是    | 接收短信验证码的电话号码 |
| countryCode | String | 是    | 国家区域编码       |

**回调参数:**

```javascript
var callbackFunction = function(error,data){}
```

| 参数名称  | 参数类型   | 说明                                       |
| ----- | ------ | ---------------------------------------- |
| error | Number | 错误码,表示发送结果,0-成功,非0-失败                    |
| data  | String | 发送失败时对应的错误消息(仅iOS),在`Android`平台上,SDK没有返回错误消息, `errorCode`所对应的错误消息请从[这里](http://wiki.mob.com/android-api-%E9%94%99%E8%AF%AF%E7%A0%81%E5%8F%82%E8%80%83/)查看. |

**示例:**

```javascript
var params = {
       "phoneNum": "11538617903",
       "countryCode": "86"
 };
uexMobSMS.sendCode(JSON.stringify(params), function(error,data) {
	if(!error){
      alert("发送成功");
	}else{
      alert(error); 
	}
});
```

### 🍭commitCode 提交短信验证码	

`uexMobSMS.commitCode(params, callbackFunction)`	

**说明:**

先要接受服务器发送过来的验证码(validCode),也就是说先要执行sendCode方法,才能提交短信验证码.注意:参数中的phoneNum和countryCode必须和sendCode方法中的参数保持一致. 执行成功后会回调`callbackFunction`方法.

**参数:**


| 参数名称             | 参数类型     | 是否必选 | 说明           |
| ---------------- | -------- | ---- | ------------ |
| params           | String   | 是    | 接口所需数据,形式见下: |
| callbackFunction | Function | 是    | 回调方法         |

```javascript
var params = {
       phoneNum:,
       countryCode:,
  	   validCode:
}
```

各字段含义如下:

| 字段名称        | 类型     | 是否必选 | 说明           |
| ----------- | ------ | ---- | ------------ |
| phoneNum    | String | 是    | 接收短信验证码的电话号码 |
| countryCode | String | 是    | 国家区域编码       |
| validCode   | String | 是    | 从服务器获取的验证码   |

**回调参数:**

```javascript
var callbackFunction = function(error,data){}
```

| 参数名称  | 参数类型   | 说明                                       |
| ----- | ------ | ---------------------------------------- |
| error | Number | 错误码,表示发送结果,0-成功,非0-失败                    |
| data  | String | 发送失败时对应的错误消息(仅iOS),在`Android`平台上,SDK没有返回错误消息, `errorCode`所对应的错误消息请从[这里](http://wiki.mob.com/android-api-%E9%94%99%E8%AF%AF%E7%A0%81%E5%8F%82%E8%80%83/)查看. |


**示例:**

```javascript
var params = {
     "phoneNum": "11538617903",
     "countryCode": "86",
     "validCode"  : "9097"
 }; 
uexMobSMS.commitCode(JSON.stringify(params),function(error,data) {
	if(!error){
      alert("发送成功");
	}else{
      alert(error); 
	}
});                
```

# 3､更新历史

### iOS

API版本: `uexMobSMS-4.0.1`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.1 | 更新SDK到2.1.0,支持ATS |
| 4.0.0 | uexMobSMS 4.0插件出新 |

### Android

API版本: `uexMobSMS-4.0.1`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.1 | 删除敏感权限 |
| 4.0.0 | 4.0插件 |
