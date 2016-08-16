[TOC]

 # 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
 视频直播插件
##1.1、说明
 该插件对腾讯云的视频直播播放器SDK进行相关封装,另外直播视频会存在延迟,从端到端角度考虑会涉及输入或输出设备,以及中间采用的协议。下行HLS协议的方式延迟会显著高于RTMP协议。在不同网络状况下,会有差异。通常HLS协议的延迟在15~35s左右；RTMP/FLV协议的延迟在2~5s左右。目前移动端不支持rtmp.具体使用点击查看:附录----->[ 简明使用步骤](http://www.qcloud.com/doc/product/267/配置与使用)

##1.2、UI展示

##1.3、开源源码
插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4、平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。

有特殊版本要求的API会在文档中额外说明。

## 1.5、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用。
#2、API概览
 ##2.1、方法

> ### open 打开视频播放器

`uexQcloudAV.open(params)`

**说明:**

通过此方法打开视频播放器,进入播放界面

**参数:**

```
var params ={
    x: ,
    y: ,
    width: ,
    height:,
    data : [
              {
                     "desc" :,
                     "videoType" : ,
                      "url" :
              },
                   .....
   ]

}
```

各字段含义如下:

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| x | Number | 是 | x坐标 |
| y | Number | 是 | y坐标 |
| width | Number | 是 | 宽度 |
| height | Number | 是 | 高度 |
| data | Array | 是 | 视频资源数组,至少一个 |
| desc | String | 是 | 对视频的描述,如"高清","标清"等,用于切换视频清晰度的显示按钮 |
| videoType | Number | 是 | 视频类型,请参考[VideoType](#VideoType) |
| url | String | 是 | 播放路径,对应实时转码的链接地址,如需加密,则需填写加密后的播放地址,[ 具体请参考](http://www.qcloud.com/doc/product/267/直播码防盗链使用方法) |

 

**示例:**

```
var params = {
       x: 20,
       y: window.screen.height - 240,
       width:window.screen.width - 40,
       height:240,
       data: [{
			"videoType": 1,
			"desc": "1080p",
			"url": "http://2527.vod.myqcloud.com/2527_3f7c6ea2e57611e48c830517c16aa0bc.f20.mp4"
		}, {
			"videoType": 1,
			"desc": "蓝光",
			"url": "http://2527.vod.myqcloud.com/2527_3f7c6ea2e57611e48c830517c16aa0bc.f30.mp4"
		}]
     };
var data = JSON.stringify(params);
uexQcloudAV.open(data);
```

> ### play 播放

`uexQcloudAV.play()`

**说明:**

通过此方法进行视频播放操作。

**参数:**

```
无
```



**示例:**

```
uexQcloudAV.play();
```
> ### pause 暂停

`uexQcloudAV.pause()`

**说明:**

通过此方法进行视频暂停操作。

**参数:**

```
无
```

**示例:**

```
uexQcloudAV.pause();
```

> ### stop 停止

`uexQcloudAV.stop()`

**说明:**

通过此方法进行视频停止操作,视频从头开始。

**参数:**

```
无
```


**示例:**

```
uexQcloudAV.stop();
```
> ### close 关闭

`uexQcloudAV.close()`

**说明:**

通过此方法关闭视频播放器。

**参数:**

```
无
```

**示例:**

```
uexQcloudAV.close();
```
> ### clear 清空缓存(仅支持iOS)

`uexQcloudAV.clear()`

**说明:**

关闭播放器后,如需要清空缓存,则可通过此方法来清空缓存。

**参数:**

```
无
```


**示例:**

```
uexQcloudAV.clear();
```

> ### getCurrentTime 获取当前播放的时间

`  var info = uexQcloudAV.getCurrentTime()`

**说明:**

```
获取当前播放的时间，支持同步返回值
```

**参数:**


| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| info | Number |  是  | 返回当前播放的时间 |



**示例:**

```
var info = uexQcloudAV.getCurrentTime();
alert(time);
```

> ### seekTo 跳转到时间播放

`uexQcloudAV.seekTo(time)`

**说明:**

**参数:**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| time | String | 否 | 跳转播放的时间点,以秒为单位 |


**示例:**

```
uexQcloudAV.seekTo("400");
```



## 2.3、监听方法

> ### onStateChanged　播放器状态的监听方法

`uexQcloudAV.onStateChanged(data)`

**参数:**

各字段含义如下:

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| data | Number | 是 | 播放器状态,请参考[PlayerState](#PlayerState) |



**示例:**

```
window.uexOnload = function(){
  uexQcloudAV.onStateChanged = function( data){
     alert(data)；
  }
}
```
> ### onNetworkStateChanged　切换网络的监听方法(仅支持iOS)

`uexQcloudAV.onNetworkStateChanged(data)`

**参数:**

 ```
var data ={
    networkState: 
}

 ```


各字段含义如下:

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| networkState | Number | 是 | 网络状态,请参考[NetworkState](#NetworkState) |



**示例:**

```
window.uexOnload = function(){
  uexQcloudAV.onNetworkStateChanged = function( data){
     alert(data)；
  }
}

```

#3、更新历史 

### iOS

API版本:`uexQcloudAV-4.0.0`

最近更新时间:`2016-6-29`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 |支持引擎4.0，函数入参 |
| 3.0.0 | 视频直播插件 |

### Android

API版本:`uexQcloudAV-4.0.0`

最近更新时间:`2016-6-29`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 |支持引擎4.0，函数入参 |
| 3.3.0 | 腾讯云视频直播插件 |
# 4、附录

### VideoType

|  value | 说明  |
| ----- | ----- |
| 0 | HLS |
| 1 | MP4 |
| 2 | MP3 |
| 3 | AAC |
| 4 | FMP4 |
| 5 | WEBM |
| 6 | MKV |
| 7 | TS |

### PlayerState

|  value | 说明  |
| ----- | ----- |
| -1 | 播放错误 |
| 0 | 初始化 |
| 1 | 准备中 |
| 2 | 缓冲 |
| 3 | 播放 |
| 4 | 暂停 |
| 5 | 播放完毕 |


### NetworkState

|  value | 说明  |
| ----- | ----- |
| 0 | 无网络 |
| 1 | 移动网络 |
| 2 | WIFI |

