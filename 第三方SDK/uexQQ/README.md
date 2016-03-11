
[TOC]
 
# 1、 简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
 
QQ登录及分享插件
## 1.1 说明
调用QQ登录及分享插件,可以实现图文分享、音频分享、应用分享

温馨提示:

(1)、 Android插件通过config.xml配置:把"tencent222222"替换成"tencent+appid"

    ```
    <config desc="uexQQ" type="KEY">
    	<param name="$UEXQQ_APPID$" platform="Android" value="tencent222222"/>
    </config>
    ```
    
    具体详细步骤请点击参考 :开发指导->Android QQ插件接入指引
    
(2)、iOS插件uexQQ如果用到login接口和分享回调,需要通过config.xml配置urlScheme,
urlScheme和您在QQ开发者申请的appid相关。

* QQ分享功能需要用到的urlScheme形如 tencent+appid
* QQAPI需要用到的urlScheme形如QQ+appid_x16
	* appid_x16 为8位字符串,是appid的16进制表示,不足的在前面填0补至8位
	* 比如appid是`222222`,其16进制表示为`3640E` 前面补足0,得到8位的appid_x16为`0003640E`

以appid=222222为例,相应的配置代码就如下所示

````
<config desc="uexQQ" type="URLSCHEME">
<urlScheme name="uexQQ" schemes="['QQ0003640E','tencent222222']"/>
</config>
````

(3)**iOS 9 以后,为了预防APP通过非正常渠道获取用户的某些隐私信息,Apple启用了URLScheme白名单机制。**
	
* **为了正常使用插件的所有功能还需要配置URLScheme白名单**([什么是URLScheme白名单](http://bbs.appcan.cn/forum.php?mod=viewthread&tid=29503&extra=))
* 配置白名单方法请参考[这里](http://newdocx.appcan.cn/newdocx/docx?type=1505_1291#设置urlScheme白名单)
* uexQQ需要进白名单添加的URLScheme如下

```
<string>mqzoneopensdk</string> 
<string>mqzoneopensdkapi</string>
<string>mqzoneopensdkapi19</string>
<string>mqzoneopensdkapiV2</string>
<string>mqqOpensdkSSoLogin</string>
<string>mqqopensdkapiV2</string>
<string>mqqopensdkapiV3</string>
<string>wtloginmqq2</string>
<string>mqqapi</string>
<string>mqqwpa</string>
<string>mqzone</string>
<string>mqq</string>
```

## 1.2  UI展示
 ![](http://newdocx.appcan.cn/docximg/162019s2015p6u16v.png)

 ![](http://newdocx.appcan.cn/docximg/163002w2015z6l16r.png)
## 1.3 开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=316_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
 
 
## 1.4 *术语表*
-----
Path Types

| 协议头 | Android对应路径 (其中"/sdcard/"等 同于"/storage/emulated/0/") | iOS对应路径 |
| ----- | ----- | ----- |
| res:// |widget/wgtRes/ |widget/wgtRes |
| wgts:// | /storage/emulated/0/widgetone/apps/ xxx(widgetAppId)/ | /Documents/apps/xxx(widgetAppId)/ |
| wgts:// | /storage/emulated/0/widgetone/widgets/ | /Documents/widgets/ |
| file:///sdcard/ | /storage/emulated/0/ | 无 |
#2、API概览 
## 2.1 方法:

> ### login 登录      

`uexQQ.login(appId);                    `

**说明:**

    
登录QQ  回调 [cbLogin](#cbLogin  登录完成的回调方法  "cbLogin")

**参数:**

    

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| appId| String类型| 必选 | 在腾讯开放平台注册的应用appId,具体申请步骤可参考,点击跳转 |
    

**平台支持:**

    
Android2.2+                 
iOS6.0+    

**版本支持:**

    
3.0.0+                  

**示例:**

    

```
    function login(){
        uexQQ.login("222222");
        }
```
> ### isQQInstalled 检查QQ是否已安装

`uexQQ.isQQInstalled()`

**说明:**

    
检查QQ是否已安装  
回调 [cbIsQQInstalled](#cbIsQQInstalled  检查QQ是否已安装的回调方法  "cbIsQQInstalled")

**参数:**

    
无       

**平台支持:**

    
Android2.2+                 
iOS6.0+    

**版本支持:**

    
3.0.0+
                  
> ### shareWebImgTextToQQ     分享图文到QQ     

`uexQQ.shareWebImgTextToQQ(appId,jsonData);`

**说明:**

    
分享图文信息到QQ  
回调 [cbShareQQ](#cbShareQQ  分享完成的回调方法  "cbShareQQ")

**参数:**

    

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| appId| Number类型| 必选 | 在腾讯开放平台注册的应用appId |
| jsonData|Json类型 | 必选 | 内容 |
````
 json格式如下:{"title":"标题","summary":"摘要","targetUrl":"","imageUrl":"","appName":"uexQQ","cflag":"1"}       
````
各字段含义如下:

| 参数 | 是否必须 | 说明 |
|-----|-----|-----|
| title | 是 | 标题,最长30个字符 |
| summary | 否 | 消息摘要,最长40个字符 |
| targetUrl | 是 | 点击消息跳转URL |
| imageUrl | 否 | 图片地址,支持网络图片和本地图片 |
| appName | 否 | 应用名称,显示在分享完成时的返回按钮,如下图所示 |
| cflag | 否 |是否弹出分享到空间对话框。不传时,不弹出对话框,可以选择分享到QQ好友或QQ空间； 值为"1",弹出对话框;值为"2",不弹出对话框,只能分享到QQ好友 |

**平台支持:**

    
Android2.2+                 
iOS6.0+    

**版本支持:**

    
3.0.0+                  

**示例:**

    

```
        function shareWebImgTextToQQ(){
            var json = '{"title":"图文分享标题","summary":"图文分享消息摘要","targetUrl":"http://appcan.cn","imageUrl":"res://aa.jpg","appName":"uexQQ", "cflag":"1"}';
            uexQQ.shareWebImgTextToQQ("222222", json);
            }
```
> ### shareLocalImgToQQ 分享本地图片到QQ

`uexQQ.shareLocalImgToQQ(appId,jsonData);`

**说明:**

    
分享本地图片到QQ       
回调 [cbShareQQ](#cbShareQQ  分享完成的回调方法  "cbShareQQ")

**参数:**

    

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| appId| Number类型| 必选 | 在腾讯开放平台注册的应用appId |
| jsonData|Json类型 | 必选 | 内容 |
````
 json格式如下:{"imageLocalUrl":"res://aa.jpg","appName":"uexQQ","cflag":"1"}      
````
各字段含义如下:

| 参数 | 是否必须 | 说明 |
|-----|-----|-----|
| imageLocalUrl | 是 | 本地图片路径,路径协议详见<a href="http://newdocx.appcan.cn/newdocx/docx?type=978_975"target="_blank">CONSTANT</a>中PathTypes |
| appName | 否 | 应用名称(说明同shareWebImgTextToQQ) |
| cflag | 否 | 是否弹出分享到空间对话框(说明同shareWebImgTextToQQ) |

**平台支持:**

    
Android2.2+                 
iOS6.0+                     

**版本支持:**

    
3.0.0+                  

**示例:**

    

```
  function shareLocalImgToQQ(){
     var json = '{"imageLocalUrl":"res://aa.jpg","appName":"uexQQ"}';
     uexQQ.shareLocalImgToQQ("222222", json);
  }

```
> ### shareAudioToQQ 分享音频到QQ

`uexQQ.shareAudioToQQ(appId,jsonData);`

**说明:**

    
分享音频到QQ          
回调 [cbShareQQ](#cbShareQQ  分享完成的回调方法  "cbShareQQ")

**参数:**

    

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| appId| Number类型| 必选 | 在腾讯开放平台注册的应用appId |
| jsonData|Json类型 | 必选 | 内容 |
````
 json格式如下:{"title":"title","summary":"summary","targetUrl":"url","imageUrl":"url",appName":"uexQQ","audio_url":"url","cflag":"2"}         
 ````

各字段含义如下:

| 参数 | 是否必须   | 说明 |
|-----|-----|-----|
| title  | 是  | 标题,最长30个字符 |
| summary | 否  | 消息摘要,最长40个字符   |
| targetUrl  | 是  | 点击消息跳转URL  |
| imageUrl   | 否  | 图片地址,支持网络图片和本地图片   |
| appName | 否  | 应用名称(说明同shareWebImgTextToQQ)   |
| audio_url  | 是  | 音频地址   |
| cflag  | 否  | 是否弹出分享到空间对话框(说明同shareWebImgTextToQQ)   |

**平台支持:**

        
Android2.2+                         
iOS6.0+                             

**版本支持:**

    
3.0.0+                          

**示例:**

    

```
                function shareAudioToQQ(){
                var json = '{"title":"音乐分享标题","summary":"音乐分享消息摘要","targetUrl":"http://appcan.cn","imageUrl":"http://imgcache.qq.com/qzone/space_item/textarea/0/66768.gif","appName":"uexQQ", "audio_url":"http://pan.baidu.com/share/link?shareid=1055030794&uk=2337020227","cflag":"2"}';
                uexQQ.shareAudioToQQ("222222", json);
                }
```
> ### shareAppToQQ  分享应用到QQ         

`uexQQ.shareAppToQQ(appId,jsonData);`

**说明:**

    
分享应用到QQ      
回调 [cbShareQQ](#cbShareQQ  分享完成的回调方法  "cbShareQQ")

**参数:**

    

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| appId| Number类型| 必选 | 在腾讯开放平台注册的应用appId |
| jsonData|Json类型 | 必选 | 内容 |
````
 json格式如下:{"title":"标题","summary":"摘要","imageUrl":"","appName":"uexQQ","cflag":"1"}       
````
各字段含义如下:

| 参数 | 是否必须   | 说明 |
|-----|-----|-----|
| title  | 是  | 标题,最长30个字符 |
| summary | 否  | 消息摘要,最长40个字符   |
| imageUrl   | 否  | 图片地址,支持网络图片和本地图片   |
| appName | 否  | 应用名称(说明同shareWebImgTextToQQ)   |
| cflag  | 否  | 是否弹出分享到空间对话框(说明同shareWebImgTextToQQ)   |

**平台支持:**

           
Android2.2+                         
iOS不支持    

**版本支持:**

        
3.0.0+                            

**示例:**

    

```
    function shareAppToQQ(){
        var json = '{"title":"标题","summary":"摘要","imageUrl":"","appName":"uexQQ","cflag":"1"}';
        uexQQ.shareAppToQQ("222222", json);
    }
```
> ###shareImgTextToQZone 分享图文到QQ空间   

`uexQQ.shareImgTextToQZone(appId,jsonData);`

**说明:**

    
分享图文到QQ空间       
回调 [cbShareQQ](#cbShareQQ  分享完成的回调方法  "cbShareQQ")

**参数:**

    

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| appId| Number类型| 必选 | 在腾讯开放平台注册的应用appId |
| jsonData|Json类型 | 必选 | 内容 |

````
 json格式如下:{"title":"标题","summary":"摘要","targetUrl":"http://appcan.cn","imageUrl":["res://aa.png","res://aa.jpg","res://bb.png"]}            
````
        
各字段含义如下:                            

| 参数 | 是否必须   | 说明 |
|-----|-----|-----|
| title  | 是  | 标题,最长30个字符 |
| summary | 否  | 消息摘要,最长40个字符   |
| targetUrl  | 是  | 点击消息跳转URL  |
| imageUrl   | 否  | 图片地址,支持网络图片和本地图片(iOS不支持发送多张图片) |

**平台支持:**

           
Android2.2+                         
iOS6.0+                             

**版本支持:**

        
3.0.0+                          

**示例:**

    

```
    function shareImgTextToQZone(){
     var json = '{"title":"空间分享标题","summary":"空间分享消息摘要","targetUrl":"http://appcan.cn","imageUrl":["res://aa.png", "res://aa.jpg", "res://bb.png"]}';
     uexQQ.shareImgTextToQZone(appId, json);
    }
```
## 2.2 回调方法:
> ### cbLogin  登录完成的回调方法           

`uexQQ.cbLogin(opId,dataType,data);`

**参数:**

    

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| appId| Number类型| 必选 | 操作ID,此函数中不起作用,可忽略。 |
| dataType|Number类型 | 必选 | 数据类型详见CONSTANT中Callback方法数据类型 |
| data|String类型 | 必选 | 返回的数据|

````
 json格式数据如下:
      {"ret":"0","data":"{"expires_in":"","openid":"","access_token":""}"}"
      ret"为"0",登录成功,data数据为用户相关数据；否则登录失败,登录失败时,data为错误码。
````

**版本支持:**

    
3.0.0+                          
> ###cbShareQQ  分享完成的回调方法           

`uexQQ.cbShareQQ(opId,dataType,data);`

**参数:**

    

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| appId| Number类型| 必选 | 操作ID,此函数中不起作用,可忽略。 |
| dataType|Number类型 | 必选 | 数据类型详见CONSTANT中Callback方法数据类型 |
| data|String类型 | 必选 | 分享结果,详见CONSTANT中Callbackint类型数据 |

**版本支持:**

    
3.0.0+                                  
> ###cbIsQQInstalled  检查QQ是否已安装的回调方法      

`uexQQ.cbIsQQInstalled(opId,dataType,data)`

**参数:**

    

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| appId| Number类型| 必选 | 操作ID,此函数中不起作用,可忽略。 |
| dataType|Number类型 | 必选 | 数据类型详见CONSTANT中Callback方法数据类型 |
| data|String类型 | 必选 | 安装结果,0-已安装,1-未安装 |

**版本支持:**

    
3.0.0+                                          

# 3、更新历史

### iOS

API版本:`uexQQ-3.0.13`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.13 | SDK更新为2.9.3(2015-11-03),新增注销授权、获取用户信息接口 |
| 3.0.12 | 删去腾讯SDK中的info.plist,防止ERROR ITMS-90049 |
| 3.0.11 | sdk版本升级至2.9.2 |
| 3.0.10 | 删除bundle中info.plist的Executable字段,解决Xcode7上传报错的问题 |
| 3.0.9 | 解决分享多张图片到QQ空间闪退的bug |
| 3.0.8 | 废弃分享到QQ好友中的cFlag参数 |
| 3.0.7 | uexQQ.cbLogin回调结构修正 |
| 3.0.6 | 解决分享多张图片到QQ空间闪退的bug |
| 3.0.5 | 增加检查QQ客户端是否已安装的方法 |
| 3.0.4 | 支持IDE |
| 3.0.3 | 支持IDE |
| 3.0.2 | 修复分享图文到QQ空间崩溃的bug |
| 3.0.1 | 更新第三方TencentOpenAPI.framework,支持arm64 |
| 3.0.0 | QQ分享和QQ空间分享插件 |

### Android

API版本:`uexQQ-3.0.7`

最近更新时间:`2016-3-2`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.7 | 更新sdk,修正部分回调bug,(1,2)修正打开增量开关后,图片获取不到的问题,增加getUserInfo接口 |
| 3.0.6 | 支持config.xml配置 |
| 3.0.5 | 修复qq图文分享错误 |
| 3.0.4 | 修复只能登录一次问题 |
| 3.0.3 | 新增isQQInstalled检查QQ客户端是否已安装的方法 |
| 3.0.2 | 修改cbLogin方法参数 |
| 3.0.1 | AndroidManifest.xml中添加必要权限 |
| 3.0.0 | QQ登录及分享插件 |
