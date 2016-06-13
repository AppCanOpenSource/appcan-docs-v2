
[TOC]

# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

科大讯飞语音插件

## 1.1、说明
封装了科大讯飞语音识别和语音合成的相关功能,两个功能都需要在线合成  

**插件为单例插件,所有的回调函数将会回调到调用`init()`所在的Window**  
如:在root页面调用`uexXunfei.init()`,则回调都会发送到root window

## 1.2、开源源码
[点击](http://plugin.appcan.cn/details.html?id=603_pluginlist)至插件详情页(测试用例与插件源码已经提供)

***

#2、 API预览

##2.1、 方法

>### init  初始化

`uexXunfei.init(param)`

**说明**

初始化

回调 [cbInit](#cbInit 初始化完成的回调方法)

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|是|param是json字符串,详情见下|

```
var param = {
	appID;//(必选,String)讯飞APPID
}

```
* APPID需要在[讯飞官网](http://www.xfyun.cn/mycloud/app/create)申请

**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
    function init(){
        var params = {
            appID:"56710b9c"
        };
        var data = JSON.stringify(params);
        uexXunfei.init(data);
    }

```

>### initSpeaker 初始化语音合成

`uexXunfei.initSpeaker(param)`

**说明**

初始化语音合成接口,只需要调用一次。不使用语音合成相关功能则不需要调用

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|是|param是json字符串,详情见下|

```
var param={
		voiceName;//设置发音人,默认是"xiaoyan" String类型 可以不传
		speed;//设置语速,默认是"50" String类型 可以不传
		volume;//设置音量,默认是"80" String类型 可以不传
}
```

发音人的可选列表见[链接的附录栏](http://www.xfyun.cn/doccenter/awd)

**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
    function initSpeaker(){
        var params = {

        };
        var data = JSON.stringify(params);
        uexXunfei.initSpeaker(data);
    }
```

>### startSpeaking 开始语音合成

`uexXunfei.startSpeaking(param)`

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|否|param是json字符串,详情见下|

```
var param={
		text;//要合成语音的文字(String类型,必选)
}
```

**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
    function startSpeaking(){
        var params = {
            text:"测试讯飞"
        };
        var data = JSON.stringify(params);
        uexXunfei.startSpeaking(data);
    }
```

>### stopSpeaking 停止语音合成

`uexXunfei.stopSpeaking()`

**参数**

无

**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
uexXunfei.stopSpeaking();    
```

>### pauseSpeaking 暂停语音合成

`uexXunfei.pauseSpeaking()`

**参数**

无

**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
uexXunfei.pauseSpeaking();    
```

>### resumeSpeaking 继续语音合成

`uexXunfei.resumeSpeaking()`

**参数**

无

**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
uexXunfei.resumeSpeaking();    
```



## 2.2、 回调方法

>### cbInit 初始化完成的回调方法

`uexXunfei.cbInit(param)`

**说明**

初始化完成之后会触发此回调

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
|param|String|否|param是json字符串,详情见下|

```
var param={
		result:,// true/false 插件初始化是否成功
}
```

**示例**

```
       function cbInit(info){
           alert('cbInit: '+info);
       }
```
 
##2.3、 监听方法

>### onSpeakBegin 语音合成开始

`uexXunfei.onSpeakBegin()`

**参数**

无

**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
       function onSpeakBegin(info){
           alert('onSpeakBegin: '+info);
       }
```

>### onSpeakPaused 语音合成暂停

`uexXunfei.onSpeakPaused()`

**参数**

无

**平台支持**

Android 2.2+    
iOS 6.0+    

**版本支持**

Android 3.0.0+    
iOS 3.0.0+    

**示例**

```
       function onSpeakPaused(info){
           alert('onSpeakPaused: '+info);
       }
```

>### onSpeakResumed 语音合成继续

`uexXunfei.onSpeakResumed()`

**参数**

无

**平台支持**

Android 2.2+ 
iOS 6.0+    

**版本支持**

Android 3.0.0+   
iOS 3.0.0+    

**示例**

```
       function onSpeakResumed(info){
           alert('onSpeakResumed: '+info);
       }
```

>### onSpeakComplete 语音合成完成

`uexXunfei.onSpeakComplete()`

**参数**

无

**平台支持**

Android 2.2+  
iOS 6.0+    

**版本支持**

Android 3.0.0+   
iOS 3.0.0+    

**示例**

```
       function onSpeakComplete(info){
           alert('onSpeakComplete: '+info);
       }
```


#3、 附录

##AppID申请
AppID申请需要在讯飞官网申请完成。创建应用之后需要开通`语音听写` `在线语音合成`。目前暂时支持这两个功能,后续有需求会继承其他的功能

# 4、更新历史

### iOS

API版本:`uexXunfei-3.0.1`

最近更新时间:`2016-3-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.1 | 添加iflyMSC.framework |
| 3.0.0 | 新增uexXunfei插件 |

### Android

API版本:`uexXunfei-3.0.0`

最近更新时间:`2015-12-18`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 初始化版本 |
