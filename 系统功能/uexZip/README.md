
[TOC]
 #1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
解压插件
##1.1､说明
 解压缩接口API.

##1.2､UI展示

 ![](http://newdocx.appcan.cn/docximg/125135p2015q6p16r.png)
##1.3 ､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=198_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4､平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

 #2､API概览


##2.1､方法

### 🍭 zip 压缩文件		

`uexZip.zip(srcPath,zippedPath,cb)	`				
**说明:**
压缩文件	

**参数:**

| 参数名称       | 参数类型     | 是否必选 | 说明                                       |
| ---------- | -------- | ---- | ---------------------------------------- |
| srcPath    | String   | 是    | 源文件路径.路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| zippedPath | String   | 是    | 目标文件路径.路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| cb         | Function | 否    | 回调函数                                     |

**回调参数:**

```javascript
var cb = function(error){}
```

| 参数名称  | 参数类型   | 说明              |
| ----- | ------ | --------------- |
| error | Number | 压缩结果,0-成功,非0-失败 |

**示例:**

```javascript
uexZip.zip(srcPath,zippedPath,function(result) {
		alert("function result: "+result);
});				
```

### 🍭 zipWithPassword 以加密的方式压缩文件		

`uexZip.zipWithPassword(srcPath,zippedPath,password,cb)	`				
**说明:**
以加密的方式压缩文件			
**参数:**

| 参数名称       | 参数类型     | 是否必选 | 说明                                       |
| ---------- | -------- | ---- | ---------------------------------------- |
| srcPath    | String   | 是    | 压缩的文件或文件夹的路径,路径协议详见[CONSTAN](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTAN")T中PathTypes |
| zippedPath | String   | 是    | 目标文件路径,路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| password   | String   | 是    | 密码                                       |
| cb         | Function | 否    | 回调函数                                     |

**回调参数:**

```javascript
var cb = function(error){}
```

| 参数名称  | 参数类型   | 说明              |
| ----- | ------ | --------------- |
| error | Number | 压缩结果,0-成功,非0-失败 |

**示例:**
```javascript
function zipWithPassword() {srcPath,zippedPath,password,function(result){
		alert("function result: "+result);
	});
}
```



### 🍭 unzip	解压缩文件		

`uexZip.unzip(srcPath,zippedPath,cb)				`	
**说明:**
解压缩文件					
**参数:**

| 参数名称       | 参数类型     | 是否必选 | 说明                                       |
| ---------- | -------- | ---- | ---------------------------------------- |
| srcPath    | String   | 是    | 要解压缩的文件路径,路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| zippedPath | String   | 是    | 解压缩后的文件路径,路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| cb         | Function | 否    | 回调函数                                     |

**回调参数:**

```javascript
var cb = function(error){}
```

| 参数名称  | 参数类型   | 说明              |
| ----- | ------ | --------------- |
| error | Number | 压缩结果,0-成功,非0-失败 |

**示例:**
```javascript
function unZip() {	uexZip.unzip(document.getElementById('hidunZip').value,document.getElementById('outPath').value,function(result){
		alert("function result: "+result);
	});
}
```
### 🍭 unzipWithPassword	解压缩加密的文件		

`uexZip.unzipWithPassword(srcPath,zippedPath,password,cb)					`
**说明:**
解压缩加密的文件	
**参数:**

| 参数名称       | 参数类型     | 是否必选 | 说明                                       |
| ---------- | -------- | ---- | ---------------------------------------- |
| srcPath    | String   | 是    | 要解压缩的文件路径,路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| zippedPath | String   | 是    | 解压缩后的文件路径,路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| password   | String   | 是    | 解压密码                                     |
| cb         | Function | 否    | 回调函数                                     |

**回调参数:**

```javascript
var cb = function(error){}
```

| 参数名称  | 参数类型   | 说明              |
| ----- | ------ | --------------- |
| error | Number | 压缩结果,0-成功,非0-失败 |

**示例:**
```javascript
function unzipWithPassword(params) {			uexZip.unzipWithPassword(document.getElementById('hidunZip').value,document.getElementById('outPath').value,document.getElementById('pwd2').value,function(result){
		alert("function result: "+result);
	});
}				
```

#3､更新历史

### iOS

API版本: `uexZip-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | uexZip支持引擎4.0 |

### Android

API版本: `uexZip-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | zip压缩解压功能插件 |
