[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
Mob短信验证插件
## 1.1、说明
封装Mob短信验证相关操作
## 1.2、UI展示

## 1.3、公告 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fnew.gif)]() 
config.xml配置插件的方法，示例配置代码如下：

```
<config desc="uexMobSMS" type="KEY">
<param platform="iOS" name="$uexMobSMS_APPKey$" value="e5c90ea53640"/>
<param platform="iOS" name="$uexMobSMS_APPSecret$" value="d2ec92c2e5de325c52fc53bdb63374fc"/>
</config>

<config desc="uexMobSMS" type="KEY">
<param platform="Android" name="$uexMobSMS_APPKey$" value="e5c90ea53640"/>
<param platform="Android" name="$uexMobSMS_APPSecret$" value="d2ec92c2e5de325c52fc53bdb63374fc"/>
</config>
```

目前国内短信默认会显示【掌淘科技】的签名,如果开发者想把这个签名换成自己公司的名称或者APP名称，那么需要满足以下条件并按以下流程来操作
。 具体使用点击查看:附录----->[ 短信验证码自定义签名注意事项](http://bbs.mob.com/thread-16106-1-1.html)
    
## 1.4、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=188_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览
##2.1、方法

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

先要接受服务器发送过来的验证码(validCode),也就是说先要执行sendCode方法，才能提交短信验证码。
注意：
phoneNum，countryCode和sendCode的参数保持一致		


**参数:**

 ```
var params = {
    phoneNum:,//必选,接收短信验证码的电话号码
    countryCode:,//必选,国家区域编码
    validCode：//必选,从服务器获取的验证码
}
 ```

 
**示例:**

```
var params = {
                    "phoneNum": "11538617903",
                    "countryCode": "86",
                    "validCode"  : "9097"
                }; uexMobSMS.commitCode(JSON.stringify(params));
                
```

**支持平台:**
				
iOS6.0+	

**版本支持:**
3.0.0+	



# 3、更新历史

### iOS

API版本:`uexMobSMS-3.0.0`

最近更新时间:`2016-01-12`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | Mob短信验证插件 |


