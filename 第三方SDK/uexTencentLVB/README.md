 # 1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
 视频直播插件
##1.1､说明
 该插件对腾讯云的视频直播播放器SDK进行相关封装｡使用腾讯云直播的用户需要单独购买其产品来获得直播或点播相关的地址,详细说明请参考腾讯云帮助和文档[链接地址](https://www.qcloud.com/document/product/267/2819)｡

##1.2､UI展示

##1.3､开源源码
插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4､平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

#2､API概览
 ##2.1､方法

> ### livePlay 打开直播页面

`uexTencentLVB.livePlay(params)`

**说明:**

通过此方法打开视频播放器,进入播放界面

**参数:**

```
var params ={
    url,
    bgImage
}
```

各字段含义如下:

| 参数名称    | 参数类型   | 是否必选 | 说明                                   |
| ------- | ------ | ---- | ------------------------------------ |
| url     | String | 是    | 直播地址                                 |
| bgImage | String | 是    | 背景图片,用户打开直播页面默认显示的图片,当前只支持res://协议路径 |


**示例:**

```javascript
var params = {
	url: "http://2000.liveplay.myqcloud.com/live/2000_44c6e64e79af11e69776e435c87f075e.flv",
    bgImage:"res://bg.png"
}

uexTencentLVB.livePlay(JSON.stringify(params));
```

> ### vodPlay 点播

`uexTencentLVB.vodPlay()`

**说明:**

打开点播页面

**参数:**

```
var params ={
    url,
    bgImage
}
```

各字段含义如下:

| 参数名称    | 参数类型   | 是否必选 | 说明                                   |
| ------- | ------ | ---- | ------------------------------------ |
| url     | String | 是    | 点播地址                                 |
| bgImage | String | 是    | 背景图片,用户打开点播页面默认显示的图片,当前只支持res://协议路径 |


**示例:**

```javascript
var params = {
	url: "http://2000.liveplay.myqcloud.com/live/2000_44c6e64e79af11e69776e435c87f075e.flv",
    bgImage:"res://bg.png"
}

uexTencentLVB.vodPlay(JSON.stringify(params));
```
> ### publish 发布直播

`uexTencentLVB.publish`

**说明:**

打开发布直播的页面

**参数:**

```
var params ={
    url,
    bgImage
}
```

各字段含义如下:

| 参数名称    | 参数类型   | 是否必选 | 说明                                   |
| ------- | ------ | ---- | ------------------------------------ |
| url     | String | 是    | 点播地址                                 |
| bgImage | String | 是    | 背景图片,用户打开点播页面默认显示的图片,当前只支持res://协议路径 |

**示例:**

```javascript
var params = {
	url: "rtmp://2000.livepush.myqcloud.com/live/2000_4eb4da7079af11e69776e435c87f075e?bizid=2000",
    bgImage:"res://bg.png"
}
uexTencentLVB.publish(JSON.stringify(params));
```

> ### 2､更新历史

### iOS

API版本:`uexTencentLVB-3.0.0`

最近更新时间:`2016-11-4`

| 历史发布版本 | 更新内容   |
| ------ | ------ |
| 3.0.0  | 视频直播插件 |

### Android

API版本:`uexTencentLVB-3.0.0`

最近更新时间:`2016-11-4`

| 历史发布版本 | 更新内容      |
| ------ | --------- |
| 3.0.0  | 腾讯云视频直播插件 |


