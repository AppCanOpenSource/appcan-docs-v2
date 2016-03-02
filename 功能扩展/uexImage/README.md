[TOC]

# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

图片插件

## 1.1、说明
封装了图片的相关功能:您可以使用该插件进行选择。导出、裁剪、浏览、存入系统相册等一系列针对图片的操作。

## 1.2、开源源码
[点击](http://plugin.appcan.cn/details.html?id=505_index)至插件详情页(插件测试用例与插件包已经提供)

***

#2、 API预览

##2.1、 方法

> ###openPicker 打开照片选择器

`uexImage.openPicker(param);`

**说明**

* 打开一个可以选择本地相册图片的选择器,导出所选图片,并返回图片路径
* 默认导出图片的格式为jpg
* 相关 [onPickerClosed](#onPickerClosed 照片选择器被关闭的监听方法)照片选择器被关闭的监听方法

**参数**

param为json字符串,包含的参数如下

| 参数名称 | 参数类型 | 是否必选 | 说明 | 默认值 |
| ----- | ----- | ----- | ----- | ----- | ----- |
| min | Number | 否 | 最小选择数量 ,传0表示无限制| 1 | 
| max | Number | 否 | 最大选择数量 ,传0表示无限制| 0 | 
| quality | Number | 否 | JPG压缩质量 取值范围 0-1 越大表示质量越好|0.5|
| usePng| Boolean | 否| 用png格式导出图片 ,此参数为true时,quality参数无效 | false |
|detailedInfo|Boolean | 否| 此参数为true时,回调中会包含图片的额外信息 | false |

* png 无损且支持透明色,但文件体积比jpg大得多。
* 用户应按需求自行选择图片文件格式

**平台支持**

Android 2.2+ 
iOS 7.0+ 

**版本支持**

Android 3.0.0+ 
iOS 3.0.0+ 

**示例**

```
var data = {
	min:2,
	max:3,
	quality:0.8,
	detailedInfo:true
}
var json = JSON.stringify(data);
uexImage.openPicker(json)
```

> ### openBrowser 打开图片浏览器

`uexImage.openBrowser(param);`

**说明**

* 打开一个可以浏览图片的浏览器
* 图片路径支持 wgt:// wgts:// res:// file:// http:// https:// 
* 相关 [onBrowserClosed](#onBrowserClosed 图片浏览器被关闭的监听方法)图片浏览器被关闭的监听方法

**参数**

param为json字符串,包含的参数如下

| 参数名称 | 参数类型 | 是否必选 | 说明 | 默认值 |
| ----- | ----- | ----- | ----- | ----- |
| displayActionButton | Boolean | 否 | 显示分享按钮|false|
| displayNavArrows| Boolean | 否 |显示切换箭头(仅iOS支持此参数)| false|
| enableGrid | Boolean | 否 | 允许九宫格视图 | true |
| startOnGrid | Boolean | 否 | 以九宫格视图起始 | false |
| startIndex | Number | 否 | 非负整数 起始图片位置 | 0 |
| data | Array | 是 | 图片资源构成的数组 | 无 |

* 即使只浏览一张图片 data也必须是数组
* data内的元素可以是 字符串 或者是 字典 格式
	* 传字符串时,此字符串应为图片资源路径
	* 传字典时, 结构如下

```
{
	src:,//(String,必选)图片资源路径,支持 wgt:// wgts:// res:// file:// http:// https:// 
	thumb:,//(String,可选)图片缩略图路径
	desc:,//(String,可选) 为图片添加一段文字描述
}
```

**平台支持**

Android 2.2+ 
iOS 7.0+ 

**版本支持**

Android 3.0.0+ 
iOS 3.0.0+ 

**示例**

```
var data ={
	displayActionButton:true,
	displayNavArrows:true,
	enableGrid:true,
	//startOnGrid:true,
	startIndex:2,
	data:["res://photo1.jpg",
		{
		src:"res://photo2.jpg",
		thumb:"res://photo2t.jpg",
		},
		{
		src:"res://photo3.jpg",
		thumb:"res://photo3t.jpg",
		desc:"22222222222222"
		},
		{
		src:"http://it-eproducts.com/images/3-1347760443.jpg",
		thumb:"res://photo4t.jpg",
		desc:"22222222222222"
		}]
}
var json=JSON.stringify(data);
uexImage.openBrowser(json);

```
### openCropper 打开图片裁剪器

`uexImage.openCropper(param);`

**说明**

* 打开一个图片裁剪器,导出裁剪后的图片,并返回图片路径
* 本API只有裁剪功能,裁剪后的图片大小即为所裁剪部分在原图中的大小
* 相关 [onCropperClosed](#onCropperClosed 图片裁剪器被关闭的监听方法)图片裁剪器被关闭的监听方法

**参数**

param为json字符串,包含的参数如下

| 参数名称 | 参数类型 | 是否必选 | 说明 | 默认值 |
| ----- | ----- | ----- | ----- | ----- |
| src | String | 否 | 图片路径 支持wgt:// wgts:// file:// res://| 无|
| quality | Number | 否 | JPG压缩质量 取值范围 0-1 越大表示质量越好|0.5|
| usePng| Boolean | 否| 用png格式导出图片 ,此参数为true时,quality参数无效 | false |
| mode | Number | 否 | 1- 正方型裁剪 2- 圆形裁剪(仅iOS支持圆形裁剪) 3- 自定义长宽比(仅Android) | 1 |

**平台支持**

Android 2.2+ 
iOS 7.0+ 

**版本支持**

Android 3.0.0+ 
iOS 3.0.0+ 

**示例**

```
var data={
	src:"res://photo5.jpg",
	mode:2
}
var json=JSON.stringify(data);
uexImage.openCropper(json);
```

>### saveToPhotoAlbum 储存到相册

`uexImage.saveToPhotoAlbum(param);`

**说明**

* 将本地图片储存到系统相册
* 相关 [cbSaveToPhotoAlbum](#cbSaveToPhotoAlbum 储存到相册的回调方法)储存到相册的回调方法

**参数**

param为json字符串,包含的参数如下

| 参数名称 | 参数类型 | 是否必选 | 说明 | 
| ----- | ----- | ----- | ----- | ----- |
| localPath | String | 是 | 图片路径 支持res:// wgt:// wgts:// file://|
| extraInfo |String|否|任意字符串,设置后会随cbSaveToPhotoAlbum传出|

* extraInfo 可作唯一标识符用

**平台支持**

Android 2.2+ 
iOS 7.0+ 

**版本支持**

Android 3.0.0+ 
iOS 3.0.0+ 

**示例**

```
var data={
	localPath:"res://photo4.jpg",
	extraInfo:"aaaaa"
	}
var json=JSON.stringify(data);
uexImage.saveToPhotoAlbum(json);
```
>### clearOutputImages 清除由本插件导出的所有图片文件

`uexImage.clearOutputImages();`

**说明**

* 清除由本插件的openPicker、openCropper接口所生成的图片文件
* 若您的APP有多个widget,则只会清除由当前widget所生成的图片文件
* 相关 [cbClearOutputImages](#cbClearOutputImages 清除由本插件导出的所有图片文件的回调方法)清除由本插件导出的所有图片文件的回调方法

**参数**

无

**平台支持**

Android 2.2+ 
iOS 7.0+ 

**版本支持**

Android 3.0.0+ 
iOS 3.0.0+ 

**示例**

```
uexImage.clearOutputImages();
```

>### setIpadPopEnable 设置iPad是否启用pop窗口

`uexImage.setIpadPopEnable(flag);`

**说明**

* 插件在iPad上默认用pop窗口展示插件页面,
* 通过调用此接口,可以选择是否禁用pop窗口,改用全屏展示插件页面。

**参数**

| 参数名称 | 参数类型 | 是否必选 | 说明 | 
| ----- | ----- | ----- | ----- | ----- |
| flag | Number | 是 | 为0时表示禁用pop窗口,非0时表示启用pop窗口|

**平台支持**

iOS 7.0+ 

**版本支持**

iOS 3.0.4+ 

**示例**

```
uexImage.setIpadPopEnable(0);
```

>### cbClearOutputImages 清除由本插件导出的所有图片文件的回调方法

`uexImage.cbClearOutputImages(param);`

**说明**

* 清除由本插件导出的所有图片文件后会调用此方法

**参数**

 

param为json字符串,包含的参数如下

| 参数名称 | 参数类型 | 是否必选 | 说明 | 
| ----- | ----- | ----- | ----- | ----- |
| status | String | 是 | 成功返回"ok"|

**平台支持**

Android 2.2+ 
iOS 7.0+ 

**版本支持**

Android 3.0.0+ 
iOS 3.0.0+ 

**示例**

```
window.uexOnload=function(type){
	uexImage.cbClearOutputImages=function(info){
		alert(info);
	}
}
```

##2.2、 回调方法

>### cbSaveToPhotoAlbum 储存到相册的回调方法

`uexImage.cbSaveToPhotoAlbum(param);`

**说明**

* 存储图片到相册后会调用此方法

**参数**

 

param为json字符串,包含的参数如下

| 参数名称 | 参数类型 | 是否必选 | 说明 | 
| ----- | ----- | ----- | ----- | ----- |
| isSuccess | Boolean | 是 | 是否储存成功 true/false|
| extraInfo |String|否|仅在saveToPhotoAlbum中设置后才会有此参数|
| errorStr|String| 否| 仅isSuccess为false时有此参数,储存失败的错误原因|

**平台支持**

Android 2.2+ 
iOS 7.0+ 

**版本支持**

Android 3.0.0+ 
iOS 3.0.0+ 

**示例**

```
window.uexOnload=function(type){
	uexImage.cbSaveToPhotoAlbum=function(info){
		alert(info);
	}
}
```
##2.3、 监听方法

>###onPickerClosed 照片选择器被关闭的监听方法

`uexImage.onPickerClosed(param);`

**说明**

* 照片选择器被关闭时,会回调此监听方法

**参数**

param为json字符串,包含的参数如下

| 参数名称 | 参数类型 | 是否必选 | 说明 | 
| ----- | ----- | ----- | ----- | ----- |
| isCancelled | Boolean | 是 | 选择器是否是由于点击取消而关闭|
| detailedImageInfo | Array | 否 ,仅isCancelled为 false且openPicker有设置detailedInfo为true时才有此参数| 导出的图片的信息uexImageInfo结构构成的数组|
| data | Array | 否 ,仅isCancelled为 false时有此参数| 导出的图片地址构成的数组|

* 即使只选择一张图片 detailedImageInfo和imageInfo也是数组
* uexImageInfo结构如下定义

```
var uexImageInfo={
	localPath:,//String,必选,图片地址
	timestamp:,//Number,可选,图片创建时间的10位时间戳 (此参数读取自图片的EXIF数据,如无法获取或不存在,则无此参数)
	longitude:,//Number,可选,图片拍摄地点的经度 (此参数读取自图片的EXIF数据,如无法获取或不存在,则无此参数)
	latitude:,//Number,可选,图片拍摄地点的纬度 (此参数读取自图片的EXIF数据,如无法获取或不存在,则无此参数)
	altitude:,//Number,可选,图片拍摄地点的海拔 (此参数读取自图片的EXIF数据,如无法获取或不存在,则无此参数)
}
```

**示例**

```
window.uexOnload=function(type){
	uexImage.onPickerClosed=function(info){
		alert(info);
	}
}

```

>### onBrowserClosed 图片浏览器被关闭的监听方法

`uexImage.onBrowserClosed();`

**说明**

* 当图片浏览器被关闭时,会回调此监听方法

**参数**

无

**平台支持**

Android 2.2+ 
iOS 7.0+ 

**版本支持**

Android 3.0.0+ 
iOS 3.0.0+ 

**示例**

```
window.uexOnload=function(type){
	uexImage.onBrowserClosed=function(){
		alert("图片浏览器被关闭");
	}
}

```

>###onCropperClosed 图片裁剪器被关闭的监听方法

`uexImage.onCropperClosed(param);`

**说明**

* 照片选择器被关闭时,会回调此监听方法

**参数**

param为json字符串,包含的参数如下

| 参数名称 | 参数类型 | 是否必选 | 说明 | 
| ----- | ----- | ----- | ----- | ----- |
| isCancelled | Boolean | 是 | 选择器是否是由于点击取消而关闭|
| data | String | 否 ,仅isCancelled为 false时有此参数| 裁剪后的图片地址|

**平台支持**

Android 2.2+ 
iOS 7.0+ 

**版本支持**

Android 3.0.0+ 
iOS 3.0.0+ 

**示例**

```
window.uexOnload=function(type){
	uexImage.onCropperClosed=function(info){
		alert(info);
	}
}
```

# 3、更新历史

### iOS

API版本:`uexImage-3.0.9`

最近更新时间:`2016-3-2`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.9 | 修复openPicker接口在选择相册界面滑动时可能会产生重影的问题 |
| 3.0.8 | openPicker接口打开相册时,默认滑动至最底端,以显示最新拍摄的照片 |
| 3.0.7 | 修复7.x系统上一个导致卡死的bug;修复iPhone包在iPad上运行时的崩溃bug |
| 3.0.6 | 修复pick图片方向不正确的bug |
| 3.0.5 | 添加IDE支持 |
| 3.0.4 | 新增接口setIpadPopEnable |
| 3.0.3 | 删去资源包中多余的info.plist |
| 3.0.2 | 修复armv7环境会编译失败的bug |
| 3.0.1 | 修复openCropper没有国际化的问题 |
| 3.0.0 | uexImage 发布 |

### Android

API版本:`uexImage-3.0.10`

最近更新时间:`2016-3-2`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.10 | 针对保存图片到相册接口,修复开启增量更新时的res协议路径的bug |
| 3.0.9 | 修复开启增量更新时的res协议路径的bug |
| 3.0.8 | 修复单张图片在图片浏览器上title不正确的问题,优化裁剪后图片的命名 |
| 3.0.7 | 修复在华为GEM-730L上裁剪图片时显示为圆形的问题 |
| 3.0.6 | 优化图片目录加载慢,内存占用高,图片预览时的屏幕适配问题 |
| 3.0.5 | 更换头部的UI背景 |
| 3.0.4 | 修复在华为机型的图片裁剪闪退的问题,与iOS同步图片剪裁器 |
| 3.0.3 | 修复在某些机型上图片裁剪失败的问题 |
| 3.0.2 | 修复图片压缩质量错误问题 |
| 3.0.1 | 去掉插件中的ActivityGroup,配合引擎升级 |
| 3.0.0 | uexImage 发布 |
