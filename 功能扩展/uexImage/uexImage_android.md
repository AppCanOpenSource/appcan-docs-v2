#uexImage






>##选择功能相关API


###openPicker 打开照片选择器

`uexImage.openPicker(param);`

* 打开一个可以选择本地相册图片的选择器，导出所选图片，并返回图片路径
* 默认导出图片的格式为jpg
* 相关 [onPickerClosed](#onPickerClosed 照片选择器被关闭的监听方法)照片选择器被关闭的监听方法

param为json字符串，包含的参数如下

|  参数名称 | 参数类型  | 是否必选  | 说明 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| min | Number | 否 | 最小选择数量 ，传0表示无限制| 1 | 
| max | Number | 否 | 最大选择数量 ，传0表示无限制| 0 | 
| quality | Number | 否 | JPG压缩质量 取值范围 0-1 越大表示质量越好|0.5|
| usePng| Boolean | 否| 用png格式导出图片 ，此参数为true时，quality参数无效 | false |
|detailedInfo|Boolean | 否| 此参数为true时,回调中会包含图片的额外信息 | false |

* png 无损且支持透明色，但文件体积比jpg大得多。
* 用户应按需求自行选择图片文件格式



###onPickerClosed 照片选择器被关闭的监听方法

`uexImage.onPickerClosed(param);`

* 照片选择器被关闭时，会回调此监听方法

param为json字符串，包含的参数如下

|  参数名称 | 参数类型  | 是否必选  | 说明 | 
| --- | --- | --- | --- | --- |
| isCancelled | Boolean | 是 | 选择器是否是由于点击取消而关闭|
| detailedImageInfo | Array | 否 ，仅isCancelled为 false且openPicker有设置detailedInfo时才有此参数| 导出的图片的信息uexImageInfo结构构成的数组|
| data | Array | 否 ，仅isCancelled为 false时有此参数| 导出的图片地址构成的数组|

* 即使只选择一张图片 detailedImageInfo和imageInfo也是数组
* uexImageInfo结构如下定义

```
var uexImageInfo={
	localPath:,//String,必选,图片地址
	timestamp:,//Number,可选,图片创建时间的10位时间戳 (此参数读取自图片的EXIF数据，如无法获取或不存在，则无此参数)
	longitude:,//Number,可选,图片拍摄地点的经度 (此参数读取自图片的EXIF数据，如无法获取或不存在，则无此参数)
	latitude:,//Number,可选,图片拍摄地点的纬度 (此参数读取自图片的EXIF数据，如无法获取或不存在，则无此参数)
	altitude:,//Number,可选,图片拍摄地点的海拔 (此参数读取自图片的EXIF数据，如无法获取或不存在，则无此参数)
}
```
* 



***




>## 浏览功能相关API

### openBrowser  打开图片浏览器

`uexImage.openBrowser(param);`

* 打开一个图片浏览器

param为json字符串，包含的参数如下

|  参数名称 | 参数类型  | 是否必选  | 说明 | 默认值 |
| --- | --- | --- | --- | --- |
| displayActionButton | Boolean | 否 | 显示分享按钮|false|
| displayNavArrows| Boolean | 否 |显示切换箭头（仅iOS支持此参数）| false|
| enableGrid | Boolean | 否 | 允许九宫格视图 | true |
| startOnGrid | Boolean | 否 | 以九宫格视图起始 | false |
| startIndex | Number | 否 | 非负整数 起始图片位置 | 0 |
| data | Array | 是 | 图片资源构成的数组 | 无 |

* 即使只浏览一张图片 data也必须是数组
* data内的元素可以是 字符串 或者是 字典 格式
	* 传字符串时,此字符串应为图片资源路径
	* 传字典时， 结构如下

```
{
	src:,//(String,必选)图片资源路径，支持 wgt:// wgts:// res:// file:// http:// https:// 
	thumb:,//(String,可选)图片缩略图路径
	desc:,//(String,可选) 为图片添加一段文字描述
}
```

### onBrowserClosed 图片浏览器被关闭的监听方法

`uexImage.onBrowserClosed();`

* 当图片浏览器被关闭时，会回调此监听方法


>## 裁剪功能相关API

### openCropper 打开图片裁剪器

`uexImage.openCropper(param);`

* 打开一个图片裁剪器，导出裁剪后的图片，并返回图片路径

param为json字符串，包含的参数如下

|  参数名称 | 参数类型  | 是否必选  | 说明 | 默认值 |
| --- | --- | --- | --- | --- |
| src | String | 否 | 图片路径 支持wgt:// wgts:// file://  res://| 无|
| quality | Number | 否 | JPG压缩质量 取值范围 0-1 越大表示质量越好|0.5|
| usePng| Boolean | 否| 用png格式导出图片 ，此参数为true时，quality参数无效 | false |
| mode | Number | 否 | 1- 正方型裁剪 2- 圆形裁剪(仅iOS支持圆形裁剪) | 1 |





###onCropperClosed 图片裁剪器被关闭的监听方法

`uexImage.onCropperClosed(param);`

* 照片选择器被关闭时，会回调此监听方法

param为json字符串，包含的参数如下

|  参数名称 | 参数类型  | 是否必选  | 说明 | 
| --- | --- | --- | --- | --- |
| isCancelled | Boolean | 是 | 选择器是否是由于点击取消而关闭|
| data | Array | 否 ，仅isCancelled为 false时有此参数| 导出的图片地址构成的数组|

* 即使只选择一张图片 data也是数组


>## 其他API

### saveToPhotoAlbum 储存到相册

`uexImage.saveToPhotoAlbum(param);`

* 将本地图片储存到系统相册

param为json字符串，包含的参数如下

|  参数名称 | 参数类型  | 是否必选  | 说明 | 
| --- | --- | --- | --- | --- |
| localPath | String | 是 | 图片路径 支持res:// wgt:// wgts:// file://|
|extraInfo|String|否|任意字符串,设置后会随cbSaveToPhotoAlbum传出|

### cbSaveToPhotoAlbum 储存到相册的回调方法

`uexImage.cbSaveToPhotoAlbum(param);`

param为json字符串，包含的参数如下

|  参数名称 | 参数类型  | 是否必选  | 说明 | 
| --- | --- | --- | --- | --- |
| isSuccess | Boolean | 是 | 是否储存成功 true/false|
| extraInfo |String|否|仅在saveToPhotoAlbum中设置后才会有此参数|
| errorStr|String| 否| 仅isSuccess为false时有此参数，储存失败的错误原因|


### clearOutputImages 清除由本插件导出的所有图片文件

`uexImage.clearOutputImages();`

