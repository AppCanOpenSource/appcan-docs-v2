[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
Mob短信验证插件
## 1.1、说明
封装Mob短信验证相关操作
## 1.2、UI展示

## 1.3、公告 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fnew.gif)]() 

目前国内短信默认会显示【掌淘科技】的签名,如果开发者想把这个签名换成自己公司的名称或者APP名称,那么需要满足以下条件并按以下流程来操作
。 具体使用点击查看:附录----->[ 短信验证码自定义签名注意事项](http://bbs.mob.com/thread-16106-1-1.html)
    
## 1.4、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=188_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

##2.1、方法

> ### init 初始化方法

uexMobSMS.init(params);
     

                
                

**说明:**

该方法为注册appKey和appSecret,这一步必须最先执行。
 appKey 和 appSecret的获取步骤:

**(1)到Mob官网注册成为Mob开发者；**

**(2)到应用管理后台新建应用。**

**(3)在应用信息栏中上传安装包文件。**

               

**参数:**

 ```
var params = {
    uexMobSMS_APPKey:,//必选,在mob上注册并获取相应的App Key
    uexMobSMS_APPSecret:,//必选,在mob上注册并获取相应的App Secret
   
}
 ```

**支持平台:**
				
iOS6.0+	

**版本支持:**

3.0.0+

**示例:**

```
var params = {
    "uexMobSMS_APPKey": "e5c90ea53640",
    "uexMobSMS_APPSecret": "d2ec92c2e5de325c52fc53bdb63374fc"
 };               
 uexMobSMS.init(JSON.stringify(params));

```

> ### sendCode 发送短信验证码到手机

uexMobSMS.sendCode(params);
     

                
                

**说明:**

发送短信验证码到手机

                

**参数:**

 ```
var params = {
    phoneNum:,//必选,接收短信验证码的电话号码
    countryCode:,//必选,国家区域编码 
}
 ```

**支持平台:**
				
iOS6.0+	

**版本支持:**

3.0.0+

**示例:**

```
var params = {
       "phoneNum": "11538617903",
       "countryCode": "86"
 };
uexMobSMS.sendCode(JSON.stringify(params));
```

> ###commitCode 提交短信验证码	

`uexMobSMS.commitCode(params)`	

**说明:**

先要接受服务器发送过来的验证码(validCode),也就是说先要执行sendCode方法,才能提交短信验证码。注意:参数中的phoneNum和countryCode必须和sendCode方法中的参数保持一致。
		

**参数:**

 ```
var params = {
    phoneNum:,//必选,接收短信验证码的电话号码
    countryCode:,//必选,国家区域编码
    validCode://必选,从服务器获取的验证码
}
 ```

 

**示例:**

```
var params = {
     "phoneNum": "11538617903",
     "countryCode": "86",
     "validCode"  : "9097"
 }; 
uexMobSMS.commitCode(JSON.stringify(params));
                
```

**支持平台:**
				
iOS6.0+	

**版本支持:**

3.0.0+	
## 2.2、回调方法
> ### cbSendClick  获取验证码的回调方法，对sendCode执行回调

` uexMobSMS.cbSendClick(state)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| state | String | 是 | 获取验证码的状态描述 |


**版本支持:**

3.0.0+

**示例:**

```
uexMobSMS.cbSendClick = function(state){
           alert(state);
     }
```
> ### cbCommitClick  提交验证码的回调方法，对commitCode执行回调

` uexMobSMS.cbCommitClick(state)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| state | String | 是 | 提交验证码的状态描述，验证失败打印错误信息|


**版本支持:**

3.0.0+

**示例:**

```
uexMobSMS.cbCommitClick = function(state){
          alert(state);
    }
```
# 3、更新历史

### iOS

API版本:`uexMobSMS-3.0.0`

最近更新时间:`2016-01-12`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | Mob短信验证插件 |

### Android

**uexMobSMS目前不支持Android**

