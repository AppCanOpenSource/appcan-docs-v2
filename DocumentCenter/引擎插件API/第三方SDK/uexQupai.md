/*
Sort: 1
Toc: 1
*/

# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>
趣拍短视频插件
## 1.1、说明<ignore>
封装了趣拍精简版功能, 支持自定义视频尺寸,码率,美颜效果等.

## 1.2、UI展示<ignore>

## 1.3、开源源码<ignore>
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=622_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4、平台版本支持<ignore>

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性<ignore>

本插件所有API默认在插件版本**4.0.0+**可用.

在后续版本中新添加的接口会在文档中额外说明.
# 2、API概览<ignore>

## 2.1、方法<ignore>

###  init 初始化趣拍sdk

`uexQupai.init(param, cb)`

**说明:**

初始化趣拍SDK.需要注意的是,之所以需要`appKey`, `appSecret`, `space`这三个参数,是因为趣拍SDK中封装有上传文失件的功能,这三个参数在上传文件时会需要.但当前插件中没有封装这一功能,既使用户输入错误的`appKey`, `appSecret`, `space`,该插件的录制视频功能同样可以使用,但是在使用时会有`授权失败`的提示. 所以建议开发者还是去趣拍[官网](http://vcs.qupai.me/)申请这三个参数,申请详细步骤,见链接地址:[iOS地址](http://faq.vcs.qupai.me/123.html), [Android地址](http://faq.vcs.qupai.me/125.html).

**参数:**

| 参数名称  | 参数类型     | 是否必选 | 说明           |
| ----- | -------- | ---- | ------------ |
| param | String   | 是    | 接口所需数据，形式见下： |
| cb    | Function | 是    | 回调方法         |

```javascript
var param = {
  appKey:,
  appSecret:,
  space
}
```

各字段含义如下：

| 参数名称      | 参数类型   | 是否必选 | 说明                    |
| --------- | ------ | ---- | --------------------- |
| appKey    | String | 是    | 在趣拍平台上为应用申请的appKey    |
| appSecret | String | 是    | 在趣拍平台上为应用申请的appSecret |
| space     | String | 是    | 在趣拍平台上为应用指定的空间        |
**回调参数**

```javascript
var cb = function(error, code){}
```

| 参数名称  | 参数类型   | 说明               |
| ----- | ------ | ---------------- |
| error | Number | 注册结果, 0-成功, 1-失败 |
| code  | Number | 注删失败时返回错误码       |

关于错误码的说明:

| 错误码  | 说明                            |
| ---- | ----------------------------- |
| 1101 | Host(请求的域名) 未授权, 通常都是域名地址错误导致 |
| 1102 | appSecret不正确                  |
| 1103 | bundleId不正确                   |
| 1104 | 包名和签名为空                       |
| 1105 | 包名或签名不正确                      |
| 1106 | 存储空间里的目录不正确                   |
| 1107 | AppKey不正确                     |

**示例:**

```javascript
var params = {
        appKey: "206ad2ea1113d3e",
        appSecret: "5a20f29cc65e4b7fbca31eecb6338589",
        space: "fred"
 }
uexQupai.init(JSON.stringify(params),function(error, code){
             alert(JSON.stringify(data));
});
```

###  config 初始化拍摄的相关参数

`uexQupai.config(param)`

**说明:**

初始化拍摄的相关参数

**参数:**


| 参数名称  | 参数类型   | 是否必选 | 说明           |
| ----- | ------ | ---- | ------------ |
| param | String | 是    | 接口所需数据，形式见下： |

```javascript
var param = {
  minDuration:,
  maxDuration:,
  rate:,
  width:,
  height:,
  cameraFrontOn:,
  openBeautySkin:,
  beautySkinRate:
}
```

各字段含义如下：

| 参数名称           | 参数类型    | 是否必选 | 说明                                       |
| -------------- | ------- | ---- | ---------------------------------------- |
| minDuration    | Number  | 否    | 视频录制最短时间长度,默认为2秒                         |
| maxDuration    | Number  | 否    | 视频录制的时间长度,默认为8秒                          |
| rate           | Number  | 否    | 视频的码率,码率越高,画面越清晰,合成越慢,默认是2000 * 1000     |
| width          | Number  | 否    | 输出视频的宽度, 不传默认为320                        |
| height         | Number  | 否    | 输出视频的高度,不传默认为480, 推荐的视频分辨率为 320 X 240, 640 X 480, 480 X 480, 640 X 360 |
| cameraFrontOn  | boolean | 否    | 是否默认使用前置摄像头,默认为true                      |
| openBeautySkin | boolean | 否    | 是否开启美颜效果,默认为true                         |
| beautySkinRate | Number  | 否    | 美颜比例,值为0-100, 默认为80                      |


**示例:**

```javascript
var params={
    maxDuration:10  //视频录制最大时间
}
uexQupai.config(JSON.stringify(params));
```

###  record 打开视频录制界面

`uexQupai.record(callbackFunction)`

**说明:**

打开视频录制界面

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明   |
| ---------------- | -------- | ---- | ---- |
| callbackFunction | Function | 是    | 回调函数 |

**回调参数:**
```javascript
var callbackFunction = function(error,data){}
```


| 参数名称  | 参数类型   | 说明                             |
| ----- | ------ | ------------------------------ |
| error | Number | 录制的结果, 0-成功, 1-失败              |
| data  | Object | 录制成功后的结果，包含视频和缩略图路径, 失败时返回错误消息 |

```javascript
var data = {
    videoPath:, //合成后视频的路径, 
    thumbPath: //缩略图的路径,  
}
```

**示例:**

```javascript
uexQupai.record(function(error, data){
	if (!error) {
        alert(JSON.stringify(data));
	}
 });
```


# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexQupai-4.0.0`

最近更新时间:`2016-7-27`

| 历史发布版本 | 更新内容 |
| ------ | ---- |


### Android<ignore>

API版本: `uexQupai-4.0.0`

最近更新时间:`2016-7-27`

| 历史发布版本 | 更新内容 |
| ------ | ---- |

