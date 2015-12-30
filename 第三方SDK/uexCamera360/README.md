[TOC]

# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

图片编辑插件

## 1.1、说明
该插件封装了Camera360开放SDK编辑图片的功能。

## 1.2、开源源码
[点击]()至插件详情页(插件测试用例与插件包已经提供)

## 1.3、插件截图

![screenshot1](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%AC%AC%E4%B8%89%E6%96%B9SDK/uexCamera360/IMG/7.png "screenshot1")
![screenshot2](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%AC%AC%E4%B8%89%E6%96%B9SDK/uexCamera360/IMG/8.png "screenshot2")
![screenshot3](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%AC%AC%E4%B8%89%E6%96%B9SDK/uexCamera360/IMG/9.png "screenshot3")

# 2、API

## 2.1、方法

> ### edit 编辑图片

`uexCamera360.edit(params);`

**说明**

编辑图片，图片名称统一为当前时间的毫秒数。Android平台，开发者可设置编辑后的图片是否保存到相册或者自定义保存路径。iOS平台必须设置编辑后图片的保存路径。回调方法[cbEdit](#cbEdit 编辑图片的回调方法)

**参数**

```
var params = {
    id:,
    imgSrcPath:,
    isSaveToGallery:,
    imgSavePath:
}
```

各字段含义如下：

| 名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | String | 是 | 唯一标识符，与回调方法中的id对应 |
| imgSrcPath | String | 否 | 要编辑的图片地址，不传或传空时，会打开系统图库，用户可选择一张照片编辑 |
| isSaveToGallery | Boolean | 否 | **仅Android支持**，是否保存到相册，默认为false。该值为true时，imgSavePath参数无效。若不传或传false时，imgSavePath必传。 |
| imgSavePath | String | 是 | 编辑后的图片保存的文件夹目录 |

**平台支持**

Android 4.0+    
iOS 6.1+ 

**版本支持**

Android 3.0.0+    
iOS 3.0.0+ 

**示例**

```
        var params = {
            id:2,
            imgSrcPath:"",//要编辑的图片源地址，不传或传空时，打开系统图库
            isSaveToGallery:false,//编辑后的图片是否保存到相册
            imgSavePath:"wgt://"//编辑后的图片存储路径
        };
        var data = JSON.stringify(params);
        uexCamera360.edit(data);
```

## 2.2、回调方法

> ### cbEdit 编辑图片的回调方法

`uexCamera360.cbEdit(param);`

**说明**

编辑图片的回调方法

**参数**

```
var param = {
    id:,
    errorCode:,
    saveFilePath:
}
```
各字段含义如下：

| 名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | String | 是 | 唯一标识符，与edit方法中的id对应 |
| errorCode | String | 是 | 错误码，详见[errorCode](#errorCode) |
| saveFilePath | String | 是 | 编辑后图片的保存路径，只在errorCode为0时有效 |

**平台支持**

Android 4.0+    
iOS 6.1+ 

**版本支持**

Android 3.0.0+    
iOS 3.0.0+ 

**示例**

```
window.uexOnload=function(type){
	uexCamera360.cbEdit=function(info){
		alert(info);
	}
}
```

# 3、附录

### errorCode

|errorCode|描述|
|-----|-----|
| 0 | 成功 |
| -1 | 源图片路径错误 |
| -2 | 相册路径异常 |
| -3 | 获取图片路径失败 |
| -4 | 用户取消 |
| -5 | 图片没有变化 |
| -6 | 输出图片路径错误 |

# 4、更新历史

### iOS

API版本:`uexCamera360-3.0.0`

最近更新时间:`2015-12-30`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | Camera360图片编辑插件 |

### Android

API版本:`uexCamera360-3.0.0`

最近更新时间:`2015-12-30`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 |Camera360图片编辑插件|
