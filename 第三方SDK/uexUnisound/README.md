
[TOC]

#1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

云知声插件

## 1.1、 说明
封装了云知声的相关功能:通过调用插件的相关接口,您可以轻松进行语音识别、语义识别以及语音合成等相关功能.

* 对于个人开发者使用语音服务,需要经过云知声的授权,请到"http://dev.hivoice.cn" 注册成为云知声的开发者,并创建应用,在"我的应用"中获取 AppKey 和 Secret.使用该应用授权码可以帮助开发者监控语音识别服务的使用情况.

## 1.2、 当前版本插件下载
[点击]()至插件详情页(插件测试用例与插件包已经提供)


## 1.3、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.4、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

***

#2、 API预览

##2.1、 方法

### 📦 init  初始化

`uexUnisound.init(param)`

**说明**

初始化云知声

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | String | 是    | param是json字符串,详情见下 |

```
var param = {
		appKey:,//String,必选 申请应用后获得的AppKey
		secret:,//String,必选 申请应用后获得的Secret
	}

```
**示例**

```
var data = {
		appKey:"fjxvybmv65mh6qdcj5chwi6vaetsvvwuj7ey5gyh",
		secret:"1c22d036487da0bd69c791788e5870e6"
}
uexUnisound.init(JSON.stringify(data));

```

### 📦 updateRecognizerSettings  更新语音识别设置

`uexUnisound.updateRecognizerSettings(param)`

**说明**

更新语音识别设置

**参数**

param是一个字典结构生成的json字符串,其key值如下表所示

| 参数名称                 | 参数解释            | 参数类型   | 取值范围                                     | 默认值  |
| -------------------- | --------------- | ------ | ---------------------------------------- | ---- |
| frontTime            | 用户不说话的超时时间      | Number | 正整数 单位为毫秒                                | 3000 |
| backTime             | 用户停止说话自动停止录音的时间 | Number | 正整数 单位为毫秒                                | 1000 |
| rate                 | 录音采样率           | Number | 1-BANDWIDTH\_AUTO; 2-RATE\_8K; 3-RATE_16K; 详细说明见表末 | 3    |
| languague            | 识别语言            | Number | 1-普通话 2-英语 3-粤语                          | 1    |
| engine               | 识别领域选择          | Number | 1. "general":通用识别,2. "poi": 地名识别,3. "song": 歌名识别,4. "movietv":影视名识别,5. . "medical": 医药领域识别 | 1    |


* 以上都是可选参数
* 采样率意味着录音的质量
  * 对网络带宽要求 RATE\_16K≈2KB/秒,RATE\_8K≈1KB/秒.
  * 当设置成 BANDWIDTH_AUTO 时自动根据当前的网络环境切换到最佳的采样频率.

**示例**

```
var data = {
	frontTime:2500,
	backTime:1500,
	rate:2,
	language:2,
	engine:3,
	recognizationTimeout:20,
	needUnderstander:false
}

uexUnisound.updateRecognizerSettings();
```

### 📦 start  开始语音识别

`uexUnisound.start()`

**说明**

开始语音识别

* 启动录音和识别,收到 [onRecognizerStart](#onRecognizerStart 语音识别开始的监听方法) 回调代表启动成功,**此时用户才可以说话**.
* 识别成功后,会通过 [onReceiveRecognizerResult](#onReceiveRecognizerResult 收到语音识别结果的监听方法) 方法回调取到的**语音识别**结果,会通过[onReceiveUnderstanderResult](#onReceiveUnderstanderResult 收到语义理解结果的监听方法) 方法回调取到的**语义解析**结果
* 如过程中出现了错误,会通过 [onEnd](#onEnd 语音识别任务结束的监听方法) 方法回调错误信息
* 任务流程:开始语音识别->启动成功->开始录音->回调语音识别结果->录音结束->进行语义识别->回调语义识别结果->结束任务

**参数**

无

**示例**

```

uexUnisound.start();

```

### 📦 stop  停止语音识别

`uexUnisound.stop()`

**说明**

停止语音识别

* 本方法调用后,停止录音并等待语音理解结束,结束后会收到onEnd回调

**参数**
无

**示例**

```

uexUnisound.stop();

```

### 📦 cancel  取消语音识别

`uexUnisound.cancel()`

**说明**

取消语音识别

* 本方法调用后,放弃当前任务,本次任务状态不再回调.

**参数**

无

**示例**

```

uexUnisound.cancel();

```

### 📦 runTextUnderstand 进行文本语义理解

`uexUnisound.runTextUnderstand(param)`

**说明**

手动输入文本以进行语义理解

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | String | 是    | param是json字符串,详情见下 |

```
var param = {
	text:,//需要语义理解的文本
}
```

**示例**

```
var data = {
	test:"我爱你"
}
uexUnisound.runTextUnderstand(JSON.stringify(data));

```

### 📦 speaking 进行语音合成

`uexUnisound.speaking(param)`

**说明**

进行语音合成

有如下相关监听

* [onSpeakingFinish](#onSpeakingFinish 语音合成结束的监听方法)语音合成结束的监听方法
* [onSpeakingErrorOccurr](#onSpeakingErrorOccurr 语音合成过程出错的监听方法)语音合成过程出错的监听方法

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | String | 是    | param是json字符串,详情见下 |

```
var param = {
	text:,//需要语音合成的文本
}
```
   

**示例**

```
var data = {
	test:"你好"
}
uexUnisound.speaking(JSON.stringify(data));

```

### 📦 cancelSpeaking 取消语音合成

`uexUnisound.cancelSpeaking()`

**说明**

* 取消语音合成,调用该方法之后语音合成和播放都会取消
* 全部取消后会触发[onSpeakingCancel](#onSpeakingCancel 语音合成被取消的监听方法)语音合成被取消的监听方法

**参数**

无

**示例**

```

uexUnisound.cancelSpeaking();

```



##2.2、 监听方法

### 📦 onRecognizerStart 语音识别开始的监听方法

`uexUnisound.onRecognizerStart()`

**说明**

语音识别开始的监听方法 (仅IOS支持)

* 录音初始化完成,识别启动时,回调此方法.
* 由于录音初始化需要时间,如果录音没有初始化完成就开始说话,可能会导致语音前半部分被截断,从而影响识别效果,因此不能调用 start 后就开始说话,而是要等待录音初始化完成才提示用户开始说话.

**参数**

无

**示例**

```
window.uexOnload = function(type){
	uexUnisound.onRecognizerStart = function(){
		alert("语音识别开始");
	}
}

```

### 📦 onSpeechStart 检测到开始说话的监听方法

`uexUnisound.onSpeechStart()`

**说明**

检测到开始说话的监听方法

* 收到此回调代表已检测到用户开始说话.

**参数**

无
 

**示例**

```
window.uexOnload = function(type){
	uexUnisound.onSpeechStart = function(){
		alert("开始录音了");
	}
}

```

### 📦 onReceiveRecognizerResult 收到语音识别结果的监听方法

`uexUnisound.onReceiveRecognizerResult(param)`

**说明**

收到语音识别结果的监听方法

* 控件采用边录音边识别方式,可能会多次返回结果,
  * isLast 为 true 表示识别结果已经取完,随后将进行语义解析任务.
  * false 表示结果未取完. 
  * 建议用户在此接口中先将数据保存起来,然后在 onEnd 中再进行下一步处理.

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | String | 是    | param是json字符串,详情见下 |

```
var param = {
	result:,//String 必选 识别返回的文字结果
	isLast:,//Boolean 必选 是不是最后一次返回文字  true/false
}
```

**示例**

```
window.uexOnload = function(type){
	uexUnisound.onReceiveRecognizerResult = function(info){
		alert(info);
	}
}

```

### 📦 onEnd 语音识别任务结束的监听方法

`uexUnisound.onEnd(param)`

**说明**

* onEnd 回调时,表示本次语音识别过程结束.

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | String | 是    | param是json字符串,详情见下 |

```
var param = {
	result:,//Number 必选 详细说明见下
	}
```

| result | 说明            |
| ------ | ------------- |
| 0      | 语音理解成功,正常结束任务 |
| -10001 | 服务器通讯错误       |
| -10002 | 服务器连接失败       |
| -20001 | 服务器验证错误       |
| -30002 | 说话时间超出限制      |
| -30003 | 数据压缩错误        |
| -61002 | 录音异常          |
| -62001 | 识别异常          |

**示例**

```
window.uexOnload = function(type){
	uexUnisound.onEnd = function(info){
		alert(info);
	}
}

```
### 📦 onVADTimeout 录音超时的监听方法

`uexUnisound.onVADTimeout()`

**说明**

* 录音过程中,如果用户间隔一段时间没有说话,会回调此方法.
* 用户可以在此方法中调用 stop 方法停止录音,等待识别结果.

**参数**

无

**示例**

```
window.uexOnload = function(type){
	uexUnisound.onVADTimeout = function(){
		alert("录音超时");
	}
}

```

### 📦 onUpdateVolume 录音过程中音量大小的监听方法

`uexUnisound.onUpdateVolume(param)`

**说明**

* 录音过程中会不断的回调此方法,实时返回音量大小(0 到 100).
* 值越大表示音量越大.
* 用户可以根据 volume 的大小来实现音量变化的动画效果

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | String | 是    | param是json字符串,详情见下 |

```
var param = {
	volume;//Number 必选 录音时的音量大小 0~100
	}
```

**示例**

```
window.uexOnload = function(type){
	uexUnisound.onUpdateVolume = function(info){
		//alert(info);
		//不建议alert调试此方法,会中断录音
	}
}

```

### 📦 onReceiveUnderstanderResult 收到语义理解结果的监听方法

`uexUnisound.onReceiveUnderstanderResult(param)`

**说明**

收到语义理解结果的监听方法

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | String | 是    | param是json字符串,详情见下 |

```
var param = {
	stringResult:,//String 必选 请求返回的结果,json字符串
	responseText:,//String 必选 json中的text项
}
```

* stringResult中包含更多更详细的信息
* 一般使用,只需取responseText的值即可

**示例**

```
window.uexOnload = function(type){
	uexUnisound.onReceiveRecognizerResult = function(info){
		alert(info);
	}
}

```

### 📦 onSpeakingStart 语音合成开始的监听方法

`uexUnisound.onSpeakingStart()`

**说明**

语音合成开始的监听方法

**参数**

无

**示例**

```
window.uexOnload = function(type){
	uexUnisound.onSpeakingStart = function(){
		alert("语音合成开始");
	}
}

```

### 📦 onSpeakingFinish 语音合成结束的监听方法

`uexUnisound.onSpeakingFinish()`

**说明**

语音合成结束的监听方法

**参数**

无

**示例**

```
window.uexOnload = function(type){
	uexUnisound.onSpeakingFinish = function(){
		alert("语音合成结束");
	}
}

```

### 📦 onSpeakingCancel 语音合成被取消的监听方法

`uexUnisound.onSpeakingCancel()`

**说明**

语音合成被取消的监听方法

**参数**

无

**示例**

```
window.uexOnload = function(type){
	uexUnisound.onSpeakingCancel = function(){
		alert("语音合成被取消");
	}
}

```

### 📦 onSpeakingErrorOccur 语音合成过程出错的监听方法

`uexUnisound.onSpeakingErrorOccur(param)`

**说明**

语音合成过程出错时,会回调此方法

**参数**

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| param | String | 是    | param是json字符串,详情见下 |

```
var param = {
	errorStr:,//String 可选 错误描述
}
```

**示例**

```
window.uexOnload = function(type){
	uexUnisound.onSpeakingErrorOccur = function(info){
		alert(info);
	}
}

```

# 3、更新历史

### iOS

API版本: `uexUnisound-4.0.0`

最近更新时间:`2015-09-18`

| 历史发布版本 | 更新内容  |
| ------ | ----- |

### Android

API版本: `uexUnisound-4.0.0`

最近更新时间:`2015-09-18`

| 历史发布版本 | 更新内容  |
| ------ | ----- |
