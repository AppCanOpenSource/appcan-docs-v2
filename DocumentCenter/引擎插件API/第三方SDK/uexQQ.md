/*
Sort: 1
Toc: 1
*/


[TOC]

# 1、 简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() <ignore>

QQ登录及分享插件
## 1.1、说明<ignore>
调用QQ登录及分享插件,可以实现图文分享、音频分享、应用分享

温馨提示:

(1)、 Android插件通过config.xml配置:把"tencent222222"替换成"tencent+appid"

    ​```
    <config desc="uexQQ" type="KEY">
    	<param name="$UEXQQ_APPID$" platform="Android" value="tencent222222"/>
    </config>
    ​```
    
    具体详细步骤请点击参考 :开发指导->Android QQ插件接入指引

(2)、iOS插件uexQQ如果用到login接口和分享回调,需要通过config.xml配置urlScheme,
urlScheme和您在QQ开发者申请的appid相关.

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

(3)**iOS 9 以后,为了预防APP通过非正常渠道获取用户的某些隐私信息,Apple启用了URLScheme白名单机制.**
​	
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

## 1.2、UI展示<ignore>
 ![](http://newdocx.appcan.cn/docximg/162019s2015p6u16v.png)

 ![](http://newdocx.appcan.cn/docximg/163002w2015z6l16r.png)
## 1.3、开源源码<ignore>
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=316_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)


## 1.4、术语表<ignore>
-----
Path Types

| 协议头             | Android对应路径 (其中"/sdcard/"等 同于"/storage/emulated/0/") | iOS对应路径                           |
| --------------- | ---------------------------------------- | --------------------------------- |
| res://          | widget/wgtRes/                           | widget/wgtRes                     |
| wgts://         | /storage/emulated/0/widgetone/apps/ xxx(widgetAppId)/ | /Documents/apps/xxx(widgetAppId)/ |
| wgts://         | /storage/emulated/0/widgetone/widgets/   | /Documents/widgets/               |
| file:///sdcard/ | /storage/emulated/0/                     | 无                                 |

## 1.5、平台版本支持<ignore>
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.
有特殊版本要求的API会在文档中额外说明.

## 1.6、接口有效性<ignore>
本插件所有API默认在插件版本**4.0.0+**可用.
在后续版本中新添加的接口会在文档中额外说明.

#2、API概览 <ignore>
## 2.1、方法<ignore>

### 🍭 login 登录      

`uexQQ.login(appId, callbackFunction);                    `

**说明:**


登录QQ  

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明                               |
| ---------------- | -------- | ---- | -------------------------------- |
| appId            | String   | 是    | 在腾讯开放平台注册的应用appId,具体申请步骤可参考,点击跳转 |
| callbackFunction | Function | 是    | 回调函数,用来获取相关业务数据                  |

**回调参数:**

```
var callbackFunction =  function(error, data){}
```

| 参数名称  | 类型     | 说明                |
| ----- | ------ | ----------------- |
| error | Number | 0表示登录成功,非0表示登录失败  |
| data  | Object | 登录成功返回的相关数据,形式如下: |

```
var data = {
  access_token:,
  openid:,
  expires_in:
}
```

**示例:**

```
uexQQ.login("222222", function(error, data) {
    if(!error){
      alert(JSON.stringify(data));
    }else{
      alert("登录失败");
    }
});
```

### 🍭 isQQInstalled 检查QQ是否已安装

`uexQQ.isQQInstalled()`

**说明:**

检查QQ是否已安装.

**参数:**

无

**返回值:**

Boolean类型,true表示已安装,false表示未安装.

**示例:**

```
var ret = uexQQ.isQQInstalled();
alert(ret);
```




### 🍭 shareWebImgTextToQQ   分享图文到QQ     

`uexQQ.shareWebImgTextToQQ(appId,jsonData, callbackFunction);`

**说明:**


分享图文信息到QQ

**参数:**


| 参数名称             | 参数类型     | 是否必选 | 说明                |
| ---------------- | -------- | ---- | ----------------- |
| appId            | String   | 是    | 在腾讯开放平台注册的应用appId |
| jsonData         | Object   | 是    | 内容                |
| callbackFunction | Function | 是    | 回调函数,用来获取分享结果     |

```
var jsonData = {
    title:,
    summary:,
    targetUrl:,
    imageUrl:,
    appName:,
    cflag:
}
```
各字段含义如下:

| 参数        | 是否必须 | 说明                                       |
| --------- | ---- | ---------------------------------------- |
| title     | 是    | 标题,最长30个字符                               |
| summary   | 否    | 消息摘要,最长40个字符                             |
| targetUrl | 是    | 点击消息跳转URL                                |
| imageUrl  | 否    | 图片地址,支持网络图片和本地图片                         |
| appName   | 否    | 应用名称,显示在分享完成时的返回按钮                       |
| cflag     | 否    | 是否弹出分享到空间对话框.不传时,不弹出对话框,可以选择分享到QQ好友或QQ空间; 值为"1",弹出对话框;值为"2",不弹出对话框,只能分享到QQ好友 |

**回调参数:**

```\
var callbackFunction = function(error,data){}
```

| 参数名称  | 类型     | 说明                |
| ----- | ------ | ----------------- |
| error | Number | 分享状态,0表示成功,非0表示失败 |
| data  | String | 分享失败原因            |



**示例:**

```
function shareWebImgTextToQQ(){
    var json = '{"title":"图文分享标题","summary":"图文分享消息摘要","targetUrl":"http://appcan.cn","imageUrl":"res://aa.jpg","appName":"uexQQ", "cflag":"1"}';
    uexQQ.shareWebImgTextToQQ("222222", json, function(error,data) {
        if(!error){
          alert("分享成功!");
        }else{
          alert("分享失败:" + data);
        }
    });
}
```
### 🍭 shareLocalImgToQQ 分享本地图片到QQ

`uexQQ.shareLocalImgToQQ(appId,jsonData, callbackFunction);`

**说明:**


分享本地图片到QQ

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明                |
| ---------------- | -------- | ---- | ----------------- |
| appId            | String   | 是    | 在腾讯开放平台注册的应用appId |
| jsonData         | Object   | 是    | 内容                |
| callbackFunction | Function | 是    | 回调函数,用来获取分享结果     |

```
 var jsonData = {
    imageLocalUrl:,
    appName:,
    cflag:
} 
```
各字段含义如下:

| 参数            | 是否必须 | 说明                                       |
| ------------- | ---- | ---------------------------------------- |
| imageLocalUrl | 是    | 本地图片路径,路径协议详见[CONSTANT中PathTypes         |
| appName       | 否    | 应用名称,显示在分享完成时的返回按钮                       |
| cflag         | 否    | 是否弹出分享到空间对话框.不传时,不弹出对话框,可以选择分享到QQ好友或QQ空间; 值为"1",弹出对话框;值为"2",不弹出对话框,只能分享到QQ好友 |

**回调参数:**

```\
var callbackFunction = function(error,data){}
```

| 参数名称  | 类型     | 说明                |
| ----- | ------ | ----------------- |
| error | Number | 分享状态,0表示成功,非0表示失败 |
| data  | String | 分享失败原因            |

**示例:**


```
function shareLocalImgToQQ(){
    var json = '{"imageLocalUrl":"res://aa.jpg","appName":"uexQQ"}';
    uexQQ.shareLocalImgToQQ("222222", json , function(error,data) {
        if(!error){
          alert("分享成功!");
        }else{
          alert("分享失败:" + data);
        }
    });
}
```

### 🍭 shareAudioToQQ 分享音频到QQ

`uexQQ.shareAudioToQQ(appId, jsonData, callbackFunction);`

**说明:**

分享音频到QQ

​**参数:**    

| 参数名称             | 参数类型     | 是否必选 | 说明                |
| ---------------- | -------- | ---- | ----------------- |
| appId            | String   | 是    | 在腾讯开放平台注册的应用appId |
| jsonData         | Object   | 是    | 内容                |
| callbackFunction | Function | 是    | 回调函数,用来获取分享结果     |



```
var jsonData = {
    "title":,
    "summary":,
    "targetUrl":,
    "imageUrl":,
    "appName":,
    "audio_url":,
    "cflag":
}
```

各字段含义如下:

| 参数        | 是否必须 | 说明                                       |
| --------- | ---- | ---------------------------------------- |
| title     | 是    | 标题,最长30个字符                               |
| summary   | 否    | 消息摘要,最长40个字符                             |
| targetUrl | 是    | 点击消息跳转URL                                |
| imageUrl  | 否    | 图片地址,支持网络图片和本地图片                         |
| appName   | 否    | 应用名称,显示在分享完成时的返回按钮                       |
| audio_url | 是    | 音频地址                                     |
| cflag     | 否    | 是否弹出分享到空间对话框.不传时,不弹出对话框,可以选择分享到QQ好友或QQ空间; 值为"1",弹出对话框;值为"2",不弹出对话框,只能分享到QQ好友 |

**回调参数:**

```\
var callbackFunction = function(error,data){}
```

| 参数名称  | 类型     | 说明                |
| ----- | ------ | ----------------- |
| error | Number | 分享状态,0表示成功,非0表示失败 |
| data  | String | 分享失败原因            |



**示例:**

```
function shareAudioToQQ(){
    var json = '{"title":"音乐分享标题","summary":"音乐分享消息摘要","targetUrl":"http://appcan.cn","imageUrl":"http://imgcache.qq.com/qzone/space_item/textarea/0/66768.gif","appName":"uexQQ", "audio_url":"http://pan.baidu.com/share/link?shareid=1055030794&uk=2337020227","cflag":"2"}';
    uexQQ.shareAudioToQQ("222222", json, function(data) {
        if(!error){
          alert("分享成功!");
        }else{
          alert("分享失败:" + data);
        }
    });
}
```

### 🍭 shareAppToQQ  分享应用到QQ,仅Android支持         

`uexQQ.shareAppToQQ(appId,jsonData, callbackFunction);`

**说明:**

分享应用到QQ

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明                |
| ---------------- | -------- | ---- | ----------------- |
| appId            | String   | 是    | 在腾讯开放平台注册的应用appId |
| jsonData         | Object   | 是    | 内容                |
| callbackFunction | Function | 是    | 回调函数,用来获取分享结果     |

```
var jsonData = {
    "title":,
    "summary":,
    "imageUrl":,
    "appName":,
    "cflag":
}   
```
各字段含义如下:

| 参数       | 是否必须 | 说明                                       |
| -------- | ---- | ---------------------------------------- |
| title    | 是    | 标题,最长30个字符                               |
| summary  | 否    | 消息摘要,最长40个字符                             |
| imageUrl | 否    | 图片地址,支持网络图片和本地图片                         |
| appName  | 否    | 应用名称,显示在分享完成时的返回按钮                       |
| cflag    | 否    | 是否弹出分享到空间对话框.不传时,不弹出对话框,可以选择分享到QQ好友或QQ空间; 值为"1",弹出对话框;值为"2",不弹出对话框,只能分享到QQ好友 |

**回调参数:**

```\
var callbackFunction = function(error,data){}
```

| 参数名称  | 类型     | 说明                |
| ----- | ------ | ----------------- |
| error | Number | 分享状态,0表示成功,非0表示失败 |
| data  | String | 分享失败原因            |

**平台支持:**

Android 4.0+

**示例:**

```
function shareAppToQQ(){
    var json = '{"title":"标题","summary":"摘要","imageUrl":"","appName":"uexQQ","cflag":"1"}';
    uexQQ.shareAppToQQ("222222", json, function(data) {
        if(!error){
          alert("分享成功!");
        }else{
          alert("分享失败:" + data);
        }
    });
}
```

### 🍭 shareImgTextToQZone 分享图文到QQ空间   

`uexQQ.shareImgTextToQZone(appId,jsonData, callbackFunction);`

**说明:**


分享图文到QQ空间       

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明                |
| ---------------- | -------- | ---- | ----------------- |
| appId            | String   | 是    | 在腾讯开放平台注册的应用appId |
| jsonData         | String   | 是    | 内容,json格式,形式见下:   |
| callbackFunction | Function | 是    | 回调函数,用来获取分享结果     |

```
var jsonData = {
    "title":,
    "summary":,
    "targetUrl":,
    "imageUrl": []
}
```

各字段含义如下:                            

| 参数        | 是否必须 | 说明                             |
| --------- | ---- | ------------------------------ |
| title     | 是    | 标题,最长30个字符                     |
| summary   | 否    | 消息摘要,最长40个字符                   |
| targetUrl | 是    | 点击消息跳转URL                      |
| imageUrl  | 否    | 图片地址,支持网络图片和本地图片(iOS不支持发送多张图片) |

**回调参数:**

```\
var callbackFunction = function(error,data){}
```

| 参数名称  | 类型     | 说明                |
| ----- | ------ | ----------------- |
| error | Number | 分享状态,0表示成功,非0表示失败 |
| data  | String | 分享失败原因            |

**示例:**


```
function shareImgTextToQZone(){
    var json = '{"title":"空间分享标题","summary":"空间分享消息摘要","targetUrl":"http://appcan.cn","imageUrl":["res://aa.png", "res://aa.jpg", "res://bb.png"]}';
    uexQQ.shareImgTextToQZone(appId, json, function(data) {
        if(!error){
          alert("分享成功!");
        }else{
          alert("分享失败:" + data);
        }
    });
}
```


# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexQQ-4.0.0`

最近更新时间:`2016-6-6`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |

### Android<ignore>

API版本: `uexQQ-4.0.0`

最近更新时间:`2016-6-6`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
