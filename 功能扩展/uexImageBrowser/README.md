[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
图片浏览插件 (本API已停止维护更新,请使用优化升级版[uexImage](http://newdocx.appcan.cn/newdocx/docx?type=1507_975),自定义插件下载[点击](http://plugin.appcan.cn/details.html?id=174_index) )
## 1.1、说明
封装选取本地图片,查看网络或本地图片集的功能,路径支持本地和网络地址.插件支持单选、多选图片(*`多选图片的数量可以手动设置最大张数`*)、清除图片缓存、保存图片到系统相册、截取本地相册图片,提供多个接口,灵活运用设置

## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/130640t2015v6u16v.png)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=174_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法
### 🍭 open 打开图片浏览界面

`uexImageBrowser.open(imageUrlSet,activeIndex)`

**说明:**

打开图片浏览界面,支持本地图片和网络图片集的浏览.

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| imageUrlSet | Array | 是 | 图片文件的路径集合,支持的文件路径协议:wgt://,wgts://,file://,http://, res://. 详见CONSTANT中PathTypes |
| activeIndex | Number | 否 | 表示当前要显示的图片在集合中的索引,默认为0.不传时,图片集显示为`九宫格方式` |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
var array = new Array("http://192.168.1.38:8080/bug/TestImageWatcher/1.jpg","http://192.168.1.38:8080/bug/TestImageWatcher/2.jpg");
uexImageBrowser.open(array, 1);
```
### 🍭 pick 从相册中选取一张图片,并返回路径

`uexImageBrowser.pick(param)`

**说明:**

从相册中选取一张图片,通过回调cbPick方法返回图片路径.回调方法[cbPick](#cbPick 成功选取图片后的回调方法)

**参数:**

````
   var param = {//可选参数 可为空
   isLossless:,//选择是否无损压缩图片 true-是 false-否(仅iOS)
  }
````

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexImageBrowser.pick();
```
### 🍭 save 保存图片到系统相册

`uexImageBrowser.save(imgPath)`

**说明:**

不启动图片浏览器,保存图片到系统相册.回调方法[cbSave](#cbSave 保存后的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| imgPath | String | 是 | 图片文件的路径,支持的文件路径协议:wgt://,wgts://,file://,res://. 详见CONSTANT中PathTypes |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexImageBrowser.save("res://pano_l.jpg");
```
### 🍭 cleanCache 清除图片缓存

`uexImageBrowser.cleanCache()`

**说明:**

清除缓存到本地的图片.即删除缓存路径下的所有图片文件.
```
Android缓存路径:/sdcard/widgetone/tmp(或/storage/emulated/0/widgetone/tmp)
iOS缓存路径:当前应用的Library/Caches/Three20```

**参数:**

  无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexImageBrowser.cleanCache();
```
### 🍭 pickMulti 从相册中选取多张图片,并返回路径

`uexImageBrowser.pickMulti(maxCount)`

**说明:**

从相册中选取多张图片,通过回调cbPick返回路径.

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| maxCount | Number | 否 | 可选取图片的最大张数 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexImageBrowser.pickMulti();
```
### 🍭 cropImage 截取本地相册图片
 
`uexImageBrowser.cropImage()`

**说明:**

截取本地相册图片 回调方法[cbCropImage](#cbCropImage 成功截取图片后的回调方法)

**参数:**

无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

  3.0.0+

**示例:**

```
uexImageBrowser.cropImage();
```
## 2.2、回调方法
### 🍭 cbPick 成功选取图片后的回调方法
 
`uexImageBrowser.cbPick(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType| Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | String | 是 | 选择完成后返回的路径 |

**版本支持:**

3.0.0+

**示例:**

```
function cbPick(opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexImageBrowser.cbPick = cbPick ;
}
```
### 🍭 cbSave 保存后的回调方法

`uexImageBrowser.cbSave(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType| Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | Number | 是 | 保存结果uex.cSuccess或uex.cFailed,详见CONSTANT中Callbackint类型数据 |

**版本支持:**

3.0.0+

**示例:**

```
function cbSave(opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexImageBrowser.cbSave = cbSave ;
}
```
### 🍭 cbCropImage 成功截取图片后的回调方法
 
`uexImageBrowser.cbCropImage(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType| Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | String | 是 | 截取完成后返回的路径 |

**版本支持:**

3.0.0+

**示例:**

```
function cbCropImage(opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexImageBrowser.cbCropImage = cbCropImage ;
}
```
# 3、更新历史

### iOS

API版本: `uexImageBrowser-4.0.0`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android

API版本: `uexImageBrowser-4.0.0`

最近更新时间:`2015-06-19`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
