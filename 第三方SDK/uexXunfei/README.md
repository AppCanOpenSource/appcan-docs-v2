
[TOC]

# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

科大讯飞语音插件

## 1.1、说明
封装了科大讯飞语音识别和语音合成的相关功能,两个功能都需要在线合成  

**插件为单例插件,所有的回调函数将会回调到调用`init()`所在的Window**  
如:在root页面调用`uexXunfei.init()`,则回调都会发送到root window

## 1.2、开源源码
[点击](http://plugin.appcan.cn/details.html?id=603_pluginlist)至插件详情页(测试用例与插件源码已经提供)

## 1.3、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.4、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

#2、 API预览

##2.1、 方法

### 🍭 init  初始化

`uexXunfei.init(param,callbackFunction)`

**说明**

初始化

**参数**

| 参数名称             | 参数类型     | 是否必选 | 说明                  |
| ---------------- | -------- | ---- | ------------------- |
| param            | String   | 是    | param是json字符串,详情见下: |
| callbackFunction | Function | 是    | 回调方法                |

```javascript
var param = {
	appID:
}
```
各字段含义如下：

| 字段名称  | 类型     | 是否必选 | 说明      |
| ----- | ------ | ---- | ------- |
| appID | String | 是    | 讯飞APPID |

* APPID需要在[讯飞官网](http://www.xfyun.cn/mycloud/app/create)申请


**回调参数**

```javascript
var callbackFunction = function(error){}
```

| 参数名称  | 参数类型   | 说明               |
| ----- | ------ | ---------------- |
| error | Number | 初始化结果，0-成功，非0-失败 |


**示例**

```javascript
    function init(){
        var params = {
            appID:"56710b9c"
        };
        var data = JSON.stringify(params);
        uexXunfei.init(data,function(error){
          if(!error){
            alert("成功");
          }else{
            alert("失败");
          }
        });
    }
```

### 🍭 initSpeaker 初始化语音合成

`uexXunfei.initSpeaker(param)`

**说明**

初始化语音合成接口,只需要调用一次.不使用语音合成相关功能则不需要调用

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | String | 是    | param是json字符串,详情见下 |

```javascript
var param={
		voiceName:,
		speed:,
		volume:
}
```

各字段含义如下：

| 字段名称      | 类型     | 是否必选 | 说明                 |
| --------- | ------ | ---- | ------------------ |
| voiceName | String | 否    | 设置发音人,默认是"xiaoyan" |
| speed     | String | 否    | 设置语速,默认是"50"       |
| volume    | String | 否    | 设置音量,默认是"80"       |

发音人的可选列表见[链接的附录栏](http://www.xfyun.cn/doccenter/awd)

**示例**

```javascript
    function initSpeaker(){
        var params = {

        };
        var data = JSON.stringify(params);
        uexXunfei.initSpeaker(data);
    }
```

### 🍭 startSpeaking 开始语音合成

`uexXunfei.startSpeaking(param)`

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | String | 否    | param是json字符串,详情见下 |

```javascript
var param={
		text:
}
```

 各字段含义如下：

| 字段名称 | 类型     | 是否必选 | 说明       |
| ---- | ------ | ---- | -------- |
| text | String | 是    | 要合成语音的文字 |

**示例**

```javascript
    function startSpeaking(){
        var params = {
            text:"测试讯飞"
        };
        var data = JSON.stringify(params);
        uexXunfei.startSpeaking(data);
    }
```

### 🍭 stopSpeaking 停止语音合成

`uexXunfei.stopSpeaking()`

**参数**

无

**示例**

```javascript
uexXunfei.stopSpeaking();    
```

### 🍭 pauseSpeaking 暂停语音合成

`uexXunfei.pauseSpeaking()`

**参数**

无

**示例**

```javascript
uexXunfei.pauseSpeaking();    
```

### 🍭 resumeSpeaking 继续语音合成

`uexXunfei.resumeSpeaking()`

**参数**

无

**示例**

```javascript
uexXunfei.resumeSpeaking();    
```

### 🍭 initRecognizer 初始化语音识别

`uexXunfei.initRecognizer(param)`

**说明**

初始化语音识别,该接口只需要调用一次.如果不需要用到语音识别的功能,则不需要调用

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | String | 否    | param是json字符串,详情见下 |

```javascript
var param={
		domain:,
		language:,
		accent:
}
```

各字段含义如下：

| 字段名称     | 类型     | 是否必选 | 说明                                       |
| -------- | ------ | ---- | ---------------------------------------- |
| domain   | String | 否    | 设置应用领域，短信和日常用语:iat (默认)；视频:video；地图:poi；音乐:music。 |
| language | String | 否    | 设置语言，当前支持：简体中文:zh_cn(默认)；美式英文:en_us。     |
| accent   | String | 否    | 设置方言，当前支持的中文方言有：普通话:mandarin(默认)；粤 语:cantonese；四川话:lmz；河南话:henanese。 |

**示例**

```javascript
    function initRecognizer(){
        var params = {
        };
        var data = JSON.stringify(params);
        uexXunfei.initRecognizer(data);
    }
```

### 🍭 startListening 开始语音识别

`uexXunfei.startListening(param)`

**平台支持**


iOS 7.0+    


**示例**

```javascript
    function startListening(){
        var params = {
        };
        var data = JSON.stringify(params);
        uexXunfei.startListening(data);
    }
```

### 🍭 stopListening 停止语音识别

`uexXunfei.stopListening()`

**参数**

无

**示例**

```javascript
uexXunfei.stopListening();    
```

### 🍭 cancelListening 取消语音识别

`uexXunfei.cancelListening()`

**参数**

无

**示例**

```javascript
uexXunfei.cancelListening();    
```

##2.2、 监听方法

### 🍭 onSpeakBegin 语音合成开始

`uexXunfei.onSpeakBegin()`

**参数**

无

**示例**

```javascript
function onSpeakBegin(){
    alert('onSpeakBegin');
}
```

### 🍭 onSpeakPaused 语音合成暂停

`uexXunfei.onSpeakPaused()`

**参数**

无

**示例**

```javascript
       function onSpeakPaused(){
           alert('onSpeakPaused');
       }
```

### 🍭 onSpeakResumed 语音合成继续

`uexXunfei.onSpeakResumed()`

**参数**

无

**示例**

```javascript
       function onSpeakResumed(){
           alert('onSpeakResumed');
       }
```

### 🍭 onSpeakComplete 语音合成完成

`uexXunfei.onSpeakComplete()`

**参数**

无

**示例**

```javascript
       function onSpeakComplete(){
           alert('onSpeakComplete');
       }
```

### 🍭 onRecognizeError 语音识别出错

`uexXunfei.onRecognizeError(param)`

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | String | 否    | param是json字符串,详情见下 |

```javascript
var param={
		error:,// 错误信息
}
```

**示例**

```javascript
       function onRecognizeError(){
           alert('onRecognizeError');
       }
```

### 🍭 onBeginOfSpeech 开始语音识别

`uexXunfei.onBeginOfSpeech()`

**参数**

无

**示例**

```javascript
       function onBeginOfSpeech(){
           alert('onBeginOfSpeech');
       }
```

### 🍭 onEndOfSpeech 语音识别完成

`uexXunfei.onEndOfSpeech()`

**参数**

无

**示例**

```javascript
       function onEndOfSpeech(){
           alert('onEndOfSpeech');
       }
```

### 🍭 onRecognizeResult 语音识别的结果

`uexXunfei.onRecognizeResult(param)`

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | String | 否    | param是json字符串,详情见下 |

```javascript
var param={
		text:,// 识别出来的文字
		isLast://是否结束,true/false true表示已结束
}
```

**示例**

```javascript
       function onRecognizeResult(info){
           alert('onRecognizeResult: '+info);
       }
```

**语音识别结果说明**  

| JSON字段 | 英文全称          | 类型     | 说明     |
| ------ | ------------- | ------ | ------ |
| sn     | sentence      | number | 第几句    |
| ls     | last sentence | bool   | 是否最后一句 |
| bg     | begin         | number | 开始     |
| ed     | end           | number | 结束     |
| ws     | words         | array  | 词      |
| cw     | chinese word  | array  | 中文分词   |
| w      | word          | String | 单字     |
| sc     | score         | number | 分数     |



语音识别示例:  

```json
{
    "sn": 1,
    "ls": true,
    "bg": 0,
    "ed": 0,
    "ws": [
        {
            "bg": 0,
            "cw": [
                {
                    "w": "今天",
                    "sc": 0
                }
            ]
        },
        {
            "bg": 0,
            "cw": [
                {
                    "w": "的",
                    "sc": 0
                }
            ]
        },
        {
            "bg": 0,
            "cw": [
                {
                    "w": "天气",
                    "sc": 0
                }
            ]
        },
        {
            "bg": 0,
            "cw": [
                {
                    "w": "怎么样",
                    "sc": 0
                }
            ]
        },
        {
            "bg": 0,
            "cw": [
                {
                    "w": ".",
                    "sc": 0
                }
            ]
        }
    ]
}
```
多候选示例:  

```json
{
    "sn": 1,
    "ls": false,
    "bg": 0,
    "ed": 0,
    "ws": [
        {
            "bg": 0,
            "cw": [
                {
                    "w": "我想听",
                    "sc": 0
                }
            ]
        },
        {
            "bg": 0,
            "cw": [
                {
                    "w": "拉德斯基进行曲",
                    "sc": 0
                },
                {
                    "w": "拉得斯进行曲",
                    "sc": 0
                }
            ]
        }
    ]
}
```

#3、 附录

##AppID申请
AppID申请需要在讯飞官网申请完成.创建应用之后需要开通`语音听写` `在线语音合成`.目前暂时支持这两个功能,后续有需求会继承其他的功能

# 4、更新历史

### iOS

API版本: `uexXunfei-4.0.0`

最近更新时间:`2016-3-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android

API版本: `uexXunfei-4.0.0`

最近更新时间:`2015-12-18`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
