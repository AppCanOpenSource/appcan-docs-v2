[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
音频播放插件
## 1.1、说明
 播放背景音乐和效果音乐,本插件只支持播放本地音乐。
## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/151400p2015i6f7k.jpg)
## 1.3、开源源码:
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=154_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法
> ### open 打开音频文件

`uexAudio.open(path)`

**说明:**

后台播放,iOS支持MP3、WAV、CAF、AMR格式,Android支持MP3、WAV、AMR、MIDI格式。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| path | String | 是 | 音频文件路径,路径协议详见CONSTANT中 PathTypes音频文件路径,路径协议详见CONSTANT中PathTypes |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexAudio.open(url);
```
> ### play 播放

`uexAudio.play(repeats)`

**说明:**

  播放音频

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| repeats | Number | 是 | 重复次数,-1:无限循环,0:不循环 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexAudio.play(0);
```
> ### pause 暂停

`uexAudio.pause()`

**说明:**

暂停

**参数:**

  无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexAudio.pause();
```
> ### replay 重播

`uexAudio.replay()`

**说明:**

重播

**参数:**

  无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

  3.0.0+

**示例:**

```
uexAudio.replay();
```
> ### stop 停止

`uexAudio.stop()`

**说明:**

停止

**参数:**

  无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexAudio.stop()
```
> ### volumeUp 音量+

`uexAudio.volumeUp()`

**说明:**

音量+

**参数:**

  无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexAudio.volumeUp()
```

> ### volumeDown  音量-

`uexAudio.volumeDown()`

**说明:**

音量-

**参数:**

  无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexAudio.volumeDown()
```
> ### openPlayer  打开音乐播放器

`uexAudio.openPlayer(paths,index)`

**说明:**

打开音乐播放器

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| paths | String | 是 | 要播放的所有音频路径,路径协议详见CONSTANT中PathTypes,以逗号分隔 |
| index | Number | 是 | 索引 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
var paths=new Array("res://1.mp3","res://2.mp3") ;   
uexAudio.openPlayer(paths,"0");
```
> ### closePlayer 关闭播放器

`uexAudio.closePlayer()`

**说明:**

关闭播放器

**参数:**

  无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexAudio.closePlayer();
```
> ### startBackgroundRecord 开始后台录音

`uexAudio.startBackgroundRecord(mode,fileName)`

**说明:**

开始后台录音

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| mode | Number | 是 | 要录音格式,0:AMR格式,1:CAF格式,2:MP3格式。Android只支持AMR格式,MP3格式。 |
| fileName | String | 是 | 文件名称,默认以当前时间作为文件名 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexAudio.startBackgroundRecord(1,document.getElementById('RecordName').value);
```
> ### stopBackgroundRecord 停止后台录音

`uexAudio.stopBackgroundRecord()`

**说明:**

停止后台录音 回调方法[cbBackgroundRecord](#cbBackgroundRecord  停止后台录音的回调方法)

**参数:**

  无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexAudio.stopBackgroundRecord();
``` 
> ### record 打开录音界面

`uexAudio.record(mode,fileName)`

**说明:**

打开录音界面 回调方法[cbRecord](#cbRecord  打开录音界面的回调方法 "cbRecord")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| mode | Number | 是 | 录音格式,0:AMR格式,1:CAF格式,2:MP3格式。Android只支持AMR格式,MP3格式。 |
| fileName | String | 是 | 文件名称,默认以当前时间作为文件名 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexAudio.record(1,"20153343443")
```
> ### openSoundPool 打开音效池

`uexAudio.openSoundPool()`

**说明:**

打开音效池 回调方法[cbOpenSoundPool](#cbOpenSoundPool  打开音效池的回调方法)

**参数:**

  无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexAudio.openSoundPool()；
```
> ### addSound 向音效池添加音效

`uexAudio.addSound(soundID,path)`

**说明:**

  iOS支持WAV、AMR、AIF、CAF格式。Android支持WAV、MIDI、AMR格式。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| soundID | Number | 是 | 唯一标识符 |
| path | String | 是 | 音效文件路径,路径协议详见CONSTANT中PathTypes |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexAudio.addSound(2,"res://1.mp3")
```
> ### playFromSoundPool 播放音效

`uexAudio.playFromSoundPool(id)`

**说明:**

播放音效

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 唯一标识符 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexAudio.playFromSoundPool(2)
```
> ### stopFromSoundPool 停止音效

`uexAudio.stopFromSoundPool(id)`

**说明:**

停止音效

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 唯一标识符 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexAudio.stopFromSoundPool(2)
```
> ### closeSoundPool 关闭音效池

`uexAudio.closeSoundPool()`

**说明:**

关闭音效池

**参数:**

  无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

  3.0.0+

**示例:**

```
uexAudio.closeSoundPool()；
```
> ### setPlayMode 设置播放模式

`uexAudio.setPlayMode(jsonStr)`

**说明:**

设置声音播放模式

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| jsonStr | String | 是 | 设置声音播放模式 |

```
var params = {
    playMode:'0'
    }
```
各字段含义如下:

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| playMode | String | 是 | 播放模式:0为正常扩音器模式;1为听筒模式; |

**平台支持:**

Android2.2+

**版本支持:**

  Android 3.0.6+
  

**示例:**

```
var param = {
 playMode:'1'
};
param = JSON.stringify(param);
uexAudio.setPlayMode(param)；
```
## 2.2、回调方法
> ### cbRecord  打开录音界面的回调方法

`uexAudio.cbRecord(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | 操作ID,在此函数中不起作用,可忽略 |
| dataType | Number | 是 | 数据类型,详见CONSTENT中Callback方法数据类型 |
| data | String | 是 | 文件路径 |

**版本支持:**

3.0.0+

**示例:**

```
function cbRecord (opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexAudio.cbRecord = cbRecord ;
}
```
> ### cbBackgroundRecord  停止后台录音的回调方法

`uexAudio.cbBackgroundRecord(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | 操作ID,在此函数中不起作用,可忽略 |
| dataType | Number | 是 | 数据类型,详见CONSTENT中Callback方法数据类型 |
| data | String | 是 | 文件路径 |

**版本支持:**

3.0.0+

**示例:**

```
function cbBackgroundRecord(opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexAudio.cbBackgroundRecord = cbBackgroundRecord;
}
```
> ### cbOpenSoundPool  打开音效池的回调方法

`uexAudio.cbOpenSoundPool(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | 操作ID,在此函数中不起作用,可忽略 |
| dataType | Number | 是 | 数据类型,详见CONSTENT中Callback方法数据类型 |
| data | String | 是 | 唯一标识符 |

**版本支持:**

3.0.0+

**示例:**

```
function cbOpenSoundPool(opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexAudio.cbOpenSoundPool = cbOpenSoundPool;
}
```
> ### onPlayFinished  播放完成后的监听方法

`uexAudio.onPlayFinished(loopTime)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| loopTime | Number | 是 | 已播放次数 |

**版本支持:**

3.0.0+

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

API版本:`uexAudio-3.0.13`

最近更新时间:`2016-1-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.13 | 修改amr格式文件路径不存在时播放崩溃 |
| 3.0.12 | 改用bundle调用图片资源;添加IDE支持 |
| 3.0.11 | 支持后台播放音频,需配置相关权限 |
| 3.0.10 | 提高了进行MP3录音的音质,修复了本地录 音生成的MP3文件用http网络播放不能正常使用的bug |
| 3.0.9 | 更新lame库 |
| 3.0.8 | 修复在iOS8.2/8.3下可能会引起程序崩溃的bug |
| 3.0.7 | 使用音频界面录制音频支持mp3格式 |
| 3.0.6 | 修复第二次录制MP3时录制CAF的BUG |
| 3.0.5 | 修复播放网络音频没有回调的问题 |
| 3.0.4 | 修复播放网络音频无法循环播放的问题 |
| 3.0.3 | uexAudio更新libopencore-amrnb.a, libopencore-amrwb.a,libmp3lame.a,支持arm64 |
| 3.0.2 | uexAudio插件录音文件名称与文档统一 |
| 3.0.1 | 后台录音添加录音格式MP3 |
| 3.0.0 | 音乐播放插件 |

### Android

API版本:`uexAudio-3.0.6`

最近更新时间:`2015-12-07`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.6 | 添加听筒模式接口,修复小米手机音量设置无效的问题 |
| 3.0.5 | 修复uexAudio.record方法不支 持录音文件存储为.mp3格式的问题 |
| 3.0.4 | 修复多次点击播放音效不能关闭的问题 |
| 3.0.3 | 修复录音文件名不正确 |
| 3.0.2 | 修复录制失败问题 |
| 3.0.1 | 背景录音添加录音格式MP3 |
| 3.0.0 | 音乐播放插件 |
