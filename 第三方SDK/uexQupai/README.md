[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
趣拍插件
## 1.1、说明
封装了趣拍精简版功能, 支持自定义视屏尺寸,码率,美颜效果等。

## 1.2、UI展示
 
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=194_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

> ### init 初始化拍摄的相关参数
  
`uexQupai.init(param)`

**说明:**

初始化拍摄的相关参数, 回调 [cbInit](#cbInit 初始化的回调方法 "初始化的回调方法")。需要注意的是,之所以需要`appKey`, `appSecret`, `space`这三个参数,是因为趣拍SDK中封装有上传文失件的功能,这三个参数在上传文件时会需要。但当前插件中没有封装这一功能,既使用户输入错误的`appKey`, `appSecret`, `space`,该插件的录制视屏功能同样可以使用,但是在使用时会有`授权失败`的提示。 所以建议开发者还是去趣拍[官网](http://vcs.qupai.me/)申请这三个参数,申请详细步骤,见链接地址：[iOS地址](http://faq.vcs.qupai.me/123.html), [Android地址](http://faq.vcs.qupai.me/125.html).

**参数:**

param为json字符串,包含的参数如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| appKey | String | 是 |在趣拍平台上为应用申请的appKey|
| appSecret | String | 是 |在趣拍平台上为应用申请的appSecret|
| space | String | 是 |在趣拍平台上为应用指定的空间|

**平台支持:**

Android4.0+  
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
var params = {
    appKey: "206ad2ea1113d3e",
    appSecret: "5a20f29cc65e4b7fbca31eecb6338589",
    space: "fred"
}
uexQupai.init(JSON.stringify(params));

```

> ### config 初始化拍摄的相关参数
  
`uexQupai.config(param)`

**说明:**

初始化拍摄的相关参数

**参数:**

param为json字符串,包含的参数如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| minDuration | Number | 否 |视屏录制最短时间长度,默认为2秒|
| maxDuration | Number | 否 |视屏录制的时间长度,默认为8秒|
| rate | Number | 否 |视屏的码率,码率越高,画面越清晰,合成越慢,默认是2000 * 1000|
| width | Number | 否 |输出视屏的宽度, 不传默认为320|
| height | Number | 否 |输出视屏的高度,不传默认为480, 推荐的视屏分辨率为 320\*240, 640\*480, 480\*480, 640\*360|
| cameraFrontOn | boolean | 否 |是否默认使用前置摄像头,默认为true|
| openBeautySkin | boolean | 否 |是否开启美颜效果,默认为true|
| beautySkinRate | Number | 否 |美颜比例,值为0-100, 默认为80|

**平台支持:**

Android4.0+  
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
var params={
    maxDuration:10  //视频录制最大时间
}
uexQupai.config(JSON.stringify(params));
```

> ### record 打开视频录制界面
  
`uexQupai.record()`

**说明:**

打开视频录制界面
回调 [cbRecord](#cbRecord 录制完成的回调方法 "录制完成的回调方法")

**参数:**

无

**平台支持:**

Android4.0+  
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexQupai.record();
```

## 2.2、回调方法
> ### cbInit 初始化的回调方法
  
`uexQupai.cbInit(param)`

**参数:**

param 是JSON字符串

```
var param = {
    status: 0, //0代表成功,1 代表失败
    error: //当合成失败(status为1时),返回错误码
}
```

关于错误码的说明:

| 错误码 | 说明 |
| ----- | ----- |
| 1101 | Host(请求的域名) 未授权, 通常都是域名地址错误导致 |
| 1102 | appSecret不正确 |
| 1103 | bundleId不正确 |
| 1104 | 包名和签名为空 |
| 1105 | 包名或签名不正确 |
| 1106 | 存储空间里的目录不正确 |
| 1107 | AppKey不正确 |

**版本支持:**

3.0.0+

> ### cbRecord 录制完成的回调方法
  
`uexQupai.cbRecord(param)`

**参数:**

param 是JSON字符串

```
var param = {
    videoPath: //合成后视屏的路径, 当 status为0时存在
    thumbPath: //缩略图的路径, 当 status为0时存在
}
```

**版本支持:**

3.0.0+

**示例**

```
function cbRecord (param){
    alert(data);
}
window.uexOnload = function(){
    uexQupai.cbRecord = cbRecord ;
}
```

# 3、更新历史

### iOS

API版本:`uexQupai-3.0.0`

最近更新时间:`2016-4-13`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 趣拍插件 |

### Android

API版本:`uexQupai-3.0.0`

最近更新时间:`2016-4-13`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 趣拍插件 |
