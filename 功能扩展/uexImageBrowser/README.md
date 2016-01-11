[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
图片浏览插件
## 1.1、说明
封装选取本地图片,查看网络或本地图片集的功能,路径支持本地和网络地址。插件支持单选、多选图片(*`多选图片的数量可以手动设置最大张数`*)、清除图片缓存、保存图片到系统相册、截取本地相册图片,提供多个接口,灵活运用设置

## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/130640t2015v6u16v.png)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=174_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法
> ### open 打开图片浏览界面

`uexImageBrowser.open(imageUrlSet,activeIndex)`

**说明:**

打开图片浏览界面,支持本地图片和网络图片集的浏览。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| imageUrlSet | Array | 是 | 图片文件的路径集合,支持的文件路径协议:wgt://,wgts://,file://,http://, res://。 详见CONSTANT中PathTypes |
| activeIndex | Number | 否 | 表示当前要显示的图片在集合中的索引,默认为0。不传时,图片集显示为`九宫格方式` |

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
> ### pick 从相册中选取一张图片,并返回路径

`uexImageBrowser.pick(param)`

**说明:**

从相册中选取一张图片,通过回调cbPick方法返回图片路径。回调方法[cbPick](#cbPick 成功选取图片后的回调方法)

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
> ### save 保存图片到系统相册

`uexImageBrowser.save(imgPath)`

**说明:**

不启动图片浏览器,保存图片到系统相册。回调方法[cbSave](#cbSave 保存后的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| imgPath | String | 是 | 图片文件的路径,支持的文件路径协议:wgt://,wgts://,file://,res://。 详见CONSTANT中PathTypes |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexImageBrowser.save("res://pano_l.jpg");
```
> ### cleanCache 清除图片缓存

`uexImageBrowser.cleanCache()`

**说明:**

清除缓存到本地的图片。即删除缓存路径下的所有图片文件。
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
> ### pickMulti 从相册中选取多张图片,并返回路径

`uexImageBrowser.pickMulti(maxCount)`

**说明:**

从相册中选取多张图片,通过回调cbPick返回路径。

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
> ### cropImage 截取本地相册图片
 
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
> ### cbPick 成功选取图片后的回调方法
 
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
> ### cbSave 保存后的回调方法

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
> ### cbCropImage 成功截取图片后的回调方法
 
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

API版本:`uexImageBrowser-3.0.19`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.19 | 对选取图片方向做了处理,uexImageBrowser.pick选取相册照片增加"确认选取"功能 |
| 3.0.18 | uexImageBrowser.pick新增可选参数, 可以返回无损画质图片 |
| 3.0.17 | 修改浏览图片时与退出后的状态栏的颜色不统一 |
| 3.0.16 | 增加uexImageBrowser.cropImage()图片截取功能 |
| 3.0.15 | 修复uexImageBrowser.pick选取图片质量变 差和状态栏会改变的问题 |
| 3.0.14 | 修复uexImageBrowser调用打开图片浏览器 会把白色字体的状态栏改成黑色字体的问题 |
| 3.0.13 | 解决uexImageBrowser插件使用Three20框 架,加载网络图片失败的问题 |
| 3.0.12 | 修复打开图片浏览器横图显示不正常的问题 |
| 3.0.11 | 修复全屏时状态栏依然会显示的bug |
| 3.0.10 | uexImageBrowser插件更新第三方,支持arm64 |
| 3.0.9 | uexImageBrowser插件更新第三方,支持arm64 |
| 3.0.8 | 多选图片时默认显示最新照片 |
| 3.0.7 | open方法调整逻辑与文档和安卓保持一致 |
| 3.0.6 | 增加多选图片方法 |
| 3.0.5 | 修复在非ios7风格下状态栏消失的bug |
| 3.0.4 | 修改"返回"按钮颜色 |
| 3.0.3 | 修复iOS7图片显示顶部一部分是空白 |
| 3.0.2 | 修复调用uexImageBrowser.open后时间栏消失 |
| 3.0.1 | 修复无法浏览本地照片的bug |
| 3.0.0 | 图片浏览器功能插件 |

### Android

API版本:`uexImageBrowser-3.0.21`

最近更新时间:`2015-06-19`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.21 | 修复多选图片接口在手机上没有图片时崩溃的问题 |
| 3.0.20 | 选图顺序问题修正 |
| 3.0.19 | 修复加密情况下,网页读取img标签的src路径图 片打不开的问题 |
| 3.0.18 | 修复三星等机型选择相册竖拍照片变横着的问题 |
| 3.0.17 | 新增cropImage裁剪图片接口 |
| 3.0.16 | 修复小米4.4.4系统不能显示图片的问题 |
| 3.0.15 | 修复打包uexImageBrowser插件后点击输入框键盘 无法平移问题 |
| 3.0.14 | 修复图片浏览器图片显示比较慢的问题 |
| 3.0.13 | 修复图片浏览器同一url图片只加载一次的问题。 |
| 3.0.12 | 修复图片浏览器一直加载的问题。 |
| 3.0.11 | 修改多选图片回调参数。 |
| 3.0.10 | 修复网络图片默认显示缩略图的问题。 |
| 3.0.9 | 删除多选图片完成时的Toast提示消息。 |
| 3.0.8 | 修复单张网络图片浏览大图有时会崩溃的问题。 |
| 3.0.7 | 修改uexImageBrowser插件,修改多选图片完成时的 提示字符串。 |
| 3.0.6 | 修改uexImageBrowser插件,增加多选图片接口pickMulti |
| 3.0.5 | 修改三星4.1.2系统版本选择图片无法返回路径的问题。 |
| 3.0.4 | 修改提示图片加载失败的问题 |
| 3.0.3 | 添加log用于查错,并修复多图全屏浏览图片时传 入url路径处理的崩溃bug |
| 3.0.2 | 修改open方法,只处理3个参数,但是超出3个的 情况,舍弃掉后面的,而不是不处理 |
| 3.0.1 | 适配4.1(之前4.1下无法返回图片 ) |
| 3.0.0 | 图片浏览器功能插件 |
