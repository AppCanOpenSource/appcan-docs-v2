/*
Sort: 1
Toc: 1
*/


# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>

图片插件

## 1.1、说明<ignore>
封装了图片的相关功能:您可以使用该插件进行选择.导出、裁剪、浏览、存入系统相册等一系列针对图片的操作.
## 1.2、UI展示<ignore>
 ![](/docImg/975/093141n2015r11c2vt&#40;2&#41;.png)  ![](/docImg/975/093145g2015m11b2se&#40;2&#41;.png) 
## 1.3、开源源码<ignore>
[点击](http://plugin.appcan.cn/details.html?id=505_index)至插件详情页(插件测试用例与插件包已经提供)
## 1.4、平台版本支持<ignore>
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性<ignore>
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.


#2、 API预览<ignore>

##2.1、 方法<ignore>

###  openPicker 打开照片选择器

`uexImage.openPicker(param,callback);`

**说明**

* 打开一个可以选择本地相册图片的选择器,导出所选图片,并返回图片路径
* 默认导出图片的格式为jpg

**参数**

| 参数名称     | 参数类型     | 是否必选 | 说明             |
| -------- | -------- | ---- | -------------- |
| param    | String   | 否    | picker参数设置     |
| callback | Function | 否    | picker被关闭的回调函数 |

```javascript
var param = {
  min:,
  max:,
  quality:,
  usePng:,
  detailedInfo
}
```

各字段含义如下:

| 参数名称         | 参数类型    | 是否必选 | 说明                                | 默认值   |
| ------------ | ------- | ---- | --------------------------------- | ----- |
| min          | Number  | 否    | 最小选择数量 ,传0表示无限制                   | 1     |
| max          | Number  | 否    | 最大选择数量 ,传0表示无限制                   | 0     |
| quality      | Number  | 否    | JPG压缩质量 取值范围 0-1 越大表示质量越好         | 0.5   |
| usePng       | Boolean | 否    | 用png格式导出图片 ,此参数为true时,quality参数无效 | false |
| detailedInfo | Boolean | 否    | 此参数为true时,回调中会包含图片的额外信息           | false |

* png 无损且支持透明色,但文件体积比jpg大.
* 用户应按需求自行选择图片文件格式


**回调参数**

```javascript
var callback = function(error,info){
}
```

| 参数名称  | 类型     | 说明                    |
| ----- | ------ | --------------------- |
| info  | Object | 返回的数据信息,形式见下:         |
| error | Number | 0为成功,-1为点击取消而关闭,其他为失败 |

```javascript
var info = {
  detailedImageInfo:,
  data:
}
```

各字段含义如下:

| 参数名称              | 参数类型  | 是否必选                                     | 说明                          |
| ----------------- | ----- | ---------------------------------------- | --------------------------- |
| detailedImageInfo | Array | 否 ,仅openPicker有设置detailedInfo为true时才有此参数 | 导出的图片的信息uexImageInfo结构构成的数组 |
| data              | Array | 否                                        | 导出的图片地址构成的数组                |

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

```javascript
var data = {
	min:2,
	max:3,
	quality:0.8,
	detailedInfo:true
}
uexImage.openPicker(data,function(error,info){
	if(error==-1){
		alert("cancelled!");
	}else if(error==0){
		alert(info.data);
		if(info.detailedImageInfo){
			alert(JSON.stringify(info.detailedImageInfo));
		}
	}else{
      	alert("error");
	}
});
```

###  openBrowser 打开图片浏览器

`uexImage.openBrowser(param,callback);`

**说明**

* 打开一个可以浏览图片的浏览器
* 图片路径支持 wgt:// wgts:// res:// file:// http:// https:// 


**参数**

| 参数名称     | 参数类型     | 是否必选 | 说明              |
| -------- | -------- | ---- | --------------- |
| param    | String   | 是    | browser参数设置     |
| callback | Function | 否    | browser被关闭的回调函数 |

```javascript
var param = {
  	displayActionButton:,
	displayNavArrows:,
	enableGrid:,
	startOnGrid:,
	startIndex:,
	data:[]
}
```

各字段含义如下:

| 参数名称                | 参数类型    | 是否必选 | 说明                | 默认值   |
| ------------------- | ------- | ---- | ----------------- | ----- |
| displayActionButton | Boolean | 否    | 显示分享按钮            | false |
| displayNavArrows    | Boolean | 否    | 显示切换箭头(仅iOS支持此参数) | false |
| enableGrid          | Boolean | 否    | 允许九宫格视图           | true  |
| startOnGrid         | Boolean | 否    | 以九宫格视图起始          | false |
| startIndex          | Number  | 否    | 非负整数 起始图片位置       | 0     |
| data                | Array   | 是    | 图片资源构成的数组         | 无     |

* 即使只浏览一张图片 data也必须是数组
* data内的元素可以是 字符串 或者是 Json对象 格式
  * 传字符串时,此字符串应为图片资源路径
  * 传Json对象时, 结构如下

```
{
	src:,//(String,必选)图片资源路径,支持 wgt:// wgts:// res:// file:// http:// https:// 
	thumb:,//(String,可选)图片缩略图路径
	desc:,//(String,可选) 为图片添加一段文字描述
}
```
**回调参数**
​	
回调函数`callback`没有参数


**示例**

```javascript
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
uexImage.openBrowser(data,function(){
	alert("browser closed!");
});
```
###  openCropper 打开图片裁剪器

`uexImage.openCropper(param,callback);`

**说明**

* 打开一个图片裁剪器,导出裁剪后的图片,并返回图片路径
* 本API只有裁剪功能,裁剪后的图片大小即为所裁剪部分在原图中的大小

**参数**

| 参数名称  | 参数类型     | 是否必选 | 说明              |
| ----- | -------- | ---- | --------------- |
| param | String   | 否    | cropper参数设置     |
| cb    | Function | 否    | cropper被关闭的回调函数 |

```javascript
var param = {
  	src:,
  	quality:,
  	usePng:,
	mode:1
}
```

各字段含义如下:

| 参数名称    | 参数类型    | 是否必选 | 说明                                       | 默认值   |
| ------- | ------- | ---- | ---------------------------------------- | ----- |
| src     | String  | 否    | 图片路径 支持wgt:// wgts:// file:// res://,不传此参数时,会先打开系统相册让用户选择一张图片 | 无     |
| quality | Number  | 否    | JPG压缩质量 取值范围 0-1 越大表示质量越好                | 0.5   |
| usePng  | Boolean | 否    | 用png格式导出图片 ,此参数为true时,quality参数无效        | false |
| mode    | Number  | 否    | 1- 正方型裁剪 2- 圆形裁剪(仅iOS支持圆形裁剪)             | 1     |

**回调参数**

```
var callback = function(error,info){}
```

| 参数名称  | 类型     | 说明                  |
| ----- | ------ | ------------------- |
| info  | Object | 返回图片相关信息,形式见下:      |
| error | Number | 0表示成功,-1表示取消,其他表示失败 |

```javascript
var info = {
  isCancelled:,
  data:
}
```

各字段含义如下:

| 参数名称        | 参数类型    | 是否必选 | 说明              |
| ----------- | ------- | ---- | --------------- |
| isCancelled | Boolean | 是    | 选择器是否是由于点击取消而关闭 |
| data        | String  | 否    | 裁剪后的图片地址        |


**示例**

```javascript
var data={
	src:"res://photo5.jpg",
	mode:2
}
uexImage.openCropper(data,function(error,info){
	if(error==-1){
		alert("cancelled!");
	}else if(error==0) {
		alert(info.data);
	
	}
});
```

###  saveToPhotoAlbum 储存到相册

`uexImage.saveToPhotoAlbum(param,callback);`

**说明**

* 将本地图片储存到系统相册

**参数**


| 参数名称     | 参数类型     | 是否必选 | 说明      |
| -------- | -------- | ---- | ------- |
| param    | String   | 是    | 储存参数设置  |
| callback | Function | 否    | 储存的回调函数 |

param为json字符串,包含的参数如下

| 参数名称      | 参数类型   | 是否必选 | 说明                                   |
| --------- | ------ | ---- | ------------------------------------ |
| localPath | String | 是    | 图片路径 支持res:// wgt:// wgts:// file:// |


**回调参数**

```javascript
var callback = function(error,errorInfo){
}
```

| 参数名称      | 参数类型   | 是否必选 | 说明                             |
| --------- | ------ | ---- | ------------------------------ |
| error     | Number | 是    | 为0表示储存成功,非0表示储存失败              |
| errorInfo | String | 否    | 储存失败的错误信息.储存成功时,errorInfo为null |



**示例**

```javascript
var data={
	localPath:"res://photo4.jpg",
}
uexImage.saveToPhotoAlbum(data,function(err,errStr){
	if(!err){
		alert("储存成功!");
	}else{
		alert("储存失败:" + errStr);
	}
});
```
###  clearOutputImages 清除由本插件导出的所有图片文件

`uexImage.clearOutputImages();`

**说明**

* 清除由本插件的openPicker、openCropper接口所生成的图片文件
* 若您的APP有多个widget,则只会清除由当前widget所生成的图片文件


**参数**

无

**返回值**

本方法有一个Boolean类型的返回值,代表清除操作是否成功


**示例**

```javascript
var ret = uexImage.clearOutputImages();
alert(ret);
```

###  setIpadPopEnable 设置iPad是否启用pop窗口

`uexImage.setIpadPopEnable(flag);`

**说明**

* 插件在iPad上默认用pop窗口展示插件页面,
* 通过调用此接口,可以选择是否禁用pop窗口,改用全屏展示插件页面.

**参数**

| 参数名称 | 参数类型   | 是否必选 | 说明                        |
| ---- | ------ | ---- | ------------------------- |
| flag | Number | 是    | 为0时表示禁用pop窗口,非0时表示启用pop窗口 |

**平台支持**

仅 iOS 7.0+ 

**示例**

```javascript
uexImage.setIpadPopEnable(0);
```


# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexImage-4.0.0`

最近更新时间:`2016-5-10`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |

### Android<ignore>

API版本: `uexImage-4.0.0`

最近更新时间:`2016-5-17`

| 历史发布版本 | 更新内容                                |
| ------ | ----------------------------------- |
