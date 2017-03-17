[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
音频播放插件
## 1.1、说明
封装了对音频流播放的接口,可播放本地背景音乐和效果音乐和网络音频、后台录音.实现对音频资源的播放、暂停、继续、停止等相关操作.对网络音频资源暂不支持缓存到本地.在ios上如需支持后台播放音频,需配置相关权限,请参考应用配置说明文档里关于[BackgroundMode](http://newdocx.appcan.cn/newdocx/docx?type=1505_1291#设置APP后台权限 "BackgroundMode")的配置
 ![](http://newdocx.appcan.cn/docximg/151400p2015i6f7k.jpg)
## 1.2、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=154_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)


## 1.3、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.
有特殊版本要求的API会在文档中额外说明.

## 1.4、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.  


# 2、API概览

## 2.1、方法
### 🍭 open 打开音频文件

`uexAudio.open(path)`

**说明:**

后台播放,iOS支持MP3、WAV、CAF、AMR格式,Android支持MP3、WAV、AMR、MIDI格式.

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明                                       |
| ---- | ------ | ---- | ---------------------------------------- |
| path | String | 是    | 音频文件路径,支持wgt://,res://,file://http://, https:// |

**示例:**

```
uexAudio.open("res://song.mp3");
```
### 🍭 play 播放

`uexAudio.play(repeats)`

**说明:**

  播放音频

**参数:**

| 参数名称    | 参数类型   | 是否必选 | 说明                 |
| ------- | ------ | ---- | ------------------ |
| repeats | Number | 是    | 重复次数,-1:无限循环,0:不循环 |

**示例:**

```
uexAudio.play(0);
```
### 🍭 pause 暂停

`uexAudio.pause()`

**说明:**

暂停

**参数:**

无

**示例:**

```
uexAudio.pause();
```
### 🍭 replay 重播

`uexAudio.replay()`

**说明:**

重播

**参数:**

无

**示例:**

```
uexAudio.replay();
```
### 🍭 stop 停止

`uexAudio.stop()`

**说明:**

停止

**参数:**

无

**示例:**

```
uexAudio.stop()
```
### 🍭 volumeUp 音量+

`uexAudio.volumeUp()`

**说明:**

音量+

**参数:**

无

**示例:**

```
uexAudio.volumeUp()
```

### 🍭 volumeDown  音量-

`uexAudio.volumeDown()`

**说明:**

音量-

**参数:**

  无

**示例:**

```
uexAudio.volumeDown()
```

### 🍭 startBackgroundRecord 开始后台录音

`uexAudio.startBackgroundRecord(mode,fileName)`

**说明:**

开始后台录音

**参数:**

| 参数名称     | 参数类型   | 是否必选 | 说明                                       |
| -------- | ------ | ---- | ---------------------------------------- |
| mode     | Number | 是    | 要录音格式,0:AMR格式,1:CAF格式,2:MP3格式.Android只支持AMR格式,MP3格式. |
| fileName | String | 否    | 录音文件名称,不传时默认以当前时间作为文件名                   |


**示例:**

```
uexAudio.startBackgroundRecord(1,"record1");
```
### 🍭 stopBackgroundRecord 停止后台录音

`uexAudio.stopBackgroundRecord(cb)`

**说明:**

停止后台录音 

**参数:**

| 参数名称 | 参数类型     | 是否必选 | 说明             |
| ---- | -------- | ---- | -------------- |
| cb   | Function | 是    | 录音结束后,会调用此回调函数 |

**回调参数**:

```
var cb = function(filePath){}
```

| 参数名称     | 参数类型   | 是否必选 | 说明      |
| -------- | ------ | ---- | ------- |
| filePath | String | 是    | 录音文件的路径 |


**示例:**

```
uexAudio.stopBackgroundRecord(function(filePath){
	alert(filePath);
});
```


### 🍭 openSoundPool 打开音效池

`uexAudio.openSoundPool()`

**说明:**

打开音效池

**参数:**

  无

**示例:**

```
uexAudio.openSoundPool();
```
### 🍭 addSound 向音效池添加音效

`uexAudio.addSound(soundID,path)`

**说明:**

  Android支持WAV、MIDI、AMR格式。在iOS中，音效池接口使用的系统声音服务接口，用于播放不超过30秒的声音。它支持的文件格式有限，具体地说只有CAF、AIF和使用PCM或IMA/ADPCM数据的WAV文件。并且这些函数没有提供操纵声音和控制音量的功能。

**参数:**

| 参数名称    | 参数类型   | 是否必选 | 说明                             |
| ------- | ------ | ---- | ------------------------------ |
| soundID | Number | 是    | 唯一标识符                          |
| path    | String | 是    | 音效文件路径,支持wgt://,res://,file:// |


**示例:**

```
uexAudio.addSound(2,"res://1.mp3")
```
### 🍭 playFromSoundPool 播放音效

`uexAudio.playFromSoundPool(soundID)`

**说明:**

播放音效

**参数:**

| 参数名称    | 参数类型   | 是否必选 | 说明           |
| ------- | ------ | ---- | ------------ |
| soundID | Number | 是    | 音效池中音效的唯一标识符 |

**示例:**

```
uexAudio.playFromSoundPool(2)
```
### 🍭 stopFromSoundPool 停止音效

`uexAudio.stopFromSoundPool(soundID)`

**说明:**

停止音效

**参数:**

| 参数名称    | 参数类型   | 是否必选 | 说明           |
| ------- | ------ | ---- | ------------ |
| soundID | Number | 是    | 音效池中音效的唯一标识符 |

**示例:**

```
uexAudio.stopFromSoundPool(2)
```
### 🍭 closeSoundPool 关闭音效池

`uexAudio.closeSoundPool()`

**说明:**

关闭音效池

**参数:**

  无

**示例:**

```
uexAudio.closeSoundPool();
```
### 🍭 setPlayMode 设置播放模式

`uexAudio.setPlayMode(params)`

**说明:**

设置声音播放模式

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明           |
| ------ | ------ | ---- | ------------ |
| params | Object | 是    | 接口所需参数,形式见下: |

```
var params = {
    playMode:0
}
```
各字段含义如下:

| 参数名称     | 参数类型   | 是否必选 | 说明                     |
| -------- | ------ | ---- | ---------------------- |
| playMode | Number | 是    | 播放模式:0为正常扩音器模式;1为听筒模式; |

**示例:**

```
var param = {
    playMode:1
};
param = JSON.stringify(param);
uexAudio.setPlayMode(param);
```

### 🍭 setProximityState 设置听筒感应开关

`uexAudio.setProximityState(type)`

**说明:**

设置是否开启听筒感应.
开启听筒感应状态下,当监测到用户贴近听筒时自动使用听筒播放.
***如果已经设置听筒模式,即使听筒感应开关开启,监测到离开听筒的动作也不会修改播放模式***

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明                 |
| ---- | ------ | ---- | ------------------ |
| type | Number | 是    | 设置听筒感应开关,1为开启,0为关闭 |

**示例:**

```
//开启听筒感应
uexAudio.open(url);
uexAudio.setProximityState(1);
uexAudio.play(0);
```

## 2.2、监听方法


### 🍭 onPlayFinished  播放完成后的监听方法

`uexAudio.onPlayFinished(loopTime)`

**参数:**

| 参数名称     | 参数类型   | 是否必选 | 说明    |
| -------- | ------ | ---- | ----- |
| loopTime | Number | 是    | 已播放次数 |

**示例:**

```
function onPlayFinished(loopTime) {
    alert(loopTime);
}
window.uexOnload = function(){
    uexAudio.onPlayFinished = onPlayFinished;
}
```
# 3、更新历史

### iOS

API版本: `uexAudio-4.0.0`

最近更新时间:`2016-4-11`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |

### Android

API版本: `uexAudio-4.0.0`

最近更新时间:`2016-3-21`

| 历史发布版本 | 更新内容                                    |
| ------ | --------------------------------------- |
