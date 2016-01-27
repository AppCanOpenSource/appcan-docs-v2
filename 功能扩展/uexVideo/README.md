[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
视频播放插件
## 1.1、说明
  封装视频播放和录制相关操作,支持本地路径和网络地址。Android 平台上支持的的视频文件格式有:MP4、3gp；IOS 平台上支持的视频文件格式有:MOV,MP4,M4V。
## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/152402p2015k6n7f.jpg)
 ![](http://newdocx.appcan.cn/docximg/151401g2015e6r7v.jpg)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=194_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

> ### open 打开视频播放界面

`uexVideo.open(path,orientation)`

**说明:**

打开视频播放界面

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| path | String | 是 | 视频文件路径,路径协议详见CONSTANT中PathTypes |
| orientation | Number | 否 | 1:强制横屏,仅iOS有效 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexVideo.open("res://1.mp4")
```
> ### record 打开视频录制界面
  
`uexVideo.record()`

**说明:**

  打开视频录制界面
  回调 [cbRecord](#cbRecord 录制完成的回调方法 "录制完成的回调方法")

**参数:**

  无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexVideo.record();
```

> ### createPlay 打开视频播放界面

`uexVideo.createPlay(x,y,w,h,path)`

**说明:**

打开视频播放界面，可定义窗口大小以及位置

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| x | Number | 是 | 视频播放窗口x坐标 |
| y | Number | 是 | 视频播放窗口y坐标 |
| w | Number | 是 | 视频播放窗口宽度 |
| h | Number | 是 | 视频播放窗口高度 |
| path | String | 是 | 视频文件路径,路径协议详见CONSTANT中PathTypes |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexVideo.createPlay(50,50,500,1225,"res://1.mp4")
```

> ### removePlay 关闭视频播放界面

`uexVideo.removePlay()`

**说明:**

关闭由createPlay接口打开的视频播放界面

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexVideo.removePlay()
```
## 2.2、回调方法
> ### cbRecord 录制完成的回调方法
  
`uexVideo.cbRecord(opId,dataTpye,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType| Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | String | 是 | 视频路径 |

**版本支持:**

3.0.0+

**示例**

```
function cbRecord (opId,dataType,data){
    alert(data);
}
window.uexOnload = function(){
    uexVideo.cbRecord = cbRecord ;
}
```
# 3、更新历史

### iOS

API版本:`uexVideo-3.0.4`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.4 | 改用bundle方式引入资源;支持IDE |
| 3.0.3 | 重新编译,支持arm64 |
| 3.0.2 | 支持arm64 |
| 3.0.1 | 更换动画效果,修复在6.1.2上的显示问题 |
| 3.0.0 | 视频功能插件 |

### Android

API版本:`uexVideo-3.0.4`

最近更新时间:`2016-1-5`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.4 | 删除无用资源 |
| 3.0.3 | 修复不支持wgt协议的问题 |
| 3.0.2 | 修复录制视频时模糊问题 |
| 3.0.1 | 修复res路径解析出错问题 |
| 3.0.0 | 视频功能插件 |