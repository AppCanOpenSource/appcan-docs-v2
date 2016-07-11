
[TOC]
 #1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
解压插件
##1.1、 说明
 解压缩接口API。

##1.2、UI展示

 ![](http://newdocx.appcan.cn/docximg/125135p2015q6p16r.png)
##1.3 、 开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=198_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

 #2、API概览


##2.1、方法

> ### 			zip	  压缩文件		

`uexZip.zip(srcPath,zippedPath,cb)	`				
**说明:**
压缩文件					

**参数:**

| 参数名称       | 参数类型       | 是否必选 | 说明                                       |
| ---------- | ---------- | ---- | ---------------------------------------- |
| srcPath    | String类型   | 必选   | 源文件路径。路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| zippedPath | String类型   | 必选   | 目标文件路径。路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| cb         | function类型 | 可选   | 回调参数为true或false                          |

**平台支持:**
Android2.2+					
iOS6.0+					
**版本支持:**
3.0.0+					
**示例:**

```javascript
uexZip.zip(srcPath,zippedPath,function(result) {
		alert("function result: "+result);
});				
```

> ### 			zipWithPassword		以加密的方式压缩文件		

`uexZip.zipWithPassword(srcPath,zippedPath,password,cb)	`				
**说明:**
以加密的方式压缩文件					
**参数:**

| 参数名称       | 参数类型       | 是否必选 | 说明                                       |
| ---------- | ---------- | ---- | ---------------------------------------- |
| srcPath    | String类型   | 必选   | 压缩的文件或文件夹的路径,路径协议详见[CONSTAN](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTAN")T中PathTypes |
| zippedPath | String类型   | 必选   | 目标文件路径,路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| password   | String类型   | 必选   | 密码                                       |
| cb         | Function类型 | 可选   | 回调参数为true或false                          |

**平台支持:**
Android2.2+					
 iOS6.0+					
**版本支持:**
3.0.0+					
**示例:**
```javascript
function zipWithPassword() {srcPath,zippedPath,password,function(result){
		alert("function result: "+result);
	});
}
```



> ### 			unzip		解压缩文件		

`uexZip.unzip(srcPath,zippedPath,cb)				`	
**说明:**
解压缩文件					
**参数:**

| 参数名称       | 参数类型       | 是否必选 | 说明                                       |
| ---------- | ---------- | ---- | ---------------------------------------- |
| srcPath    | String类型   | 必选   | 要解压缩的文件路径,路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| zippedPath | String类型   | 必选   | 解压缩后的文件路径,路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| cb         | Function类型 | 可选   | 回调参数为true或false                          |

**平台支持:**
Android2.2+					
iOS6.0+					
**版本支持:**
3.0.0+					
**示例:**
```javascript
function unZip() {	uexZip.unzip(document.getElementById('hidunZip').value,document.getElementById('outPath').value,function(result){
		alert("function result: "+result);
	});
}
```
> ### 			unzipWithPassword		解压缩加密的文件		

`uexZip.unzipWithPassword(srcPath,zippedPath,password,cb)					`
**说明:**
解压缩加密的文件					
回调 [cbUnZip](#cbUnZip 解压缩的回调方法,解压缩完成时被调用  "解压缩的回调方法") 
**参数:**

| 参数名称       | 参数类型       | 是否必选 | 说明                                       |
| ---------- | ---------- | ---- | ---------------------------------------- |
| srcPath    | String类型   | 必选   | 要解压缩的文件路径,路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| zippedPath | String类型   | 必选   | 解压缩后的文件路径,路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| password   | String类型   | 必选   | 解压密码                                     |
| cb         | Function类型 | 可选   | 回调参数为true或false                          |

**平台支持:**
Android2.2+					
iOS6.0+					
**版本支持:**
3.0.0+					
**示例:**
```javascript
function unzipWithPassword(params) {			uexZip.unzipWithPassword(document.getElementById('hidunZip').value,document.getElementById('outPath').value,document.getElementById('pwd2').value,function(result){
		alert("function result: "+result);
	});
}				
```


# 2、附录一
**示例:**

```javascript
function openNewWin(inWndName, html, inAniID, f, time) {
	if (inAniID) {
		uexWindow.open(inWndName, '0', html, inAniID, '', '', (f) ? f : 4, time ? time : 250);
	}
	else {
		uexWindow.open(inWndName, '0', html, '2', '', '', (f) ? f : 4);
	}
}

function zipExplorer() {
	type = 0;
	uexFileMgr.explorer('')
}
function unZipExplorer() {
	type = 1;
	uexFileMgr.explorer('')
}
function unzipfileSuccess(data) {
	var obj = eval('(' + data + ')');
	document.getElementById('unzipPath').innerHTML = obj.fileExplorerPath;
	document.getElementById('hidunZip').value = obj.fileExplorerPath;

}
function zip() {
	uexZip.zip(document.getElementById('hidText').value,document.getElementById('inPath').value,function(result) {
		alert("function result: "+result);
	});
}

function unZip() {
	uexZip.unzip(document.getElementById('hidunZip').value,document.getElementById('outPath').value,function(result){
		alert("function result: "+result);
	});
}

function zipWithPassword(params) {
	uexZip.zipWithPassword(document.getElementById('hidText').value,document.getElementById('inPath').value,document.getElementById('pwd1').value,function(result){
		alert("function result: "+result);
	});
}

function unzipWithPassword(params) {
	uexZip.unzipWithPassword(document.getElementById('hidunZip').value,document.getElementById('outPath').value,document.getElementById('pwd2').value,function(result){
		alert("function result: "+result);
	});
}

window.uexOnload = function () {
	uexWidgetOne.cbError = function (opCode, errorCode, errorInfo) {
		alert(errorInfo);
	}
	var cText = 0;
	var cJson = 1;
	var cInt = 2;

	uexZip.cbZip = function (opCode, dataType, data) {
		switch (dataType) {
			case cText:
				alert("uex.cText");
				break;
			case cJson:
				alert("uex.cJson");
				break;
			case cInt:
                if (data == 0) {
                    alert("压缩成功");
                } else {
					alert("压缩失败");
                }
                break;
            default:
                alert("error");
		}
	}
	uexZip.cbUnZip = function (opCode, dataType, data) {
		switch (dataType) {
			case cText:
				alert("uex.cText");
				break;
			case cJson:
				alert("uex.cJson");
				break;
			case cInt:
				if (data == 0) {
                    alert("解压成功");
                } else {
					alert("解压失败");
                }
                break;
            default:
                alert("error");

		}

	}
	uexFileMgr.cbExplorer = function (opCode, dataType, data) {
		switch (dataType) {
			case cText:
				if (type == 0) {
                    document.getElementById('filePath').innerHTML = data;
                    document.getElementById('hidText').value = data;
                } else if (type == 1) {
					document.getElementById('unzipPath').innerHTML = data;
					document.getElementById('hidunZip').value = data;
                }
                break;
			case cJson:
				alert("uex.cJson");
				break;
			case cInt:
				alert("uex.Int");
				break;
			default:
                alert("error");
		}


	}
}


```
#3、更新历史

### iOS

API版本:`uexZip-3.0.4`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容                                    |
| ------ | --------------------------------------- |
| 3.0.4  | 添加IDE支持                                 |
| 3.0.3  | 修改类名ZipArchive为UexZipArchive,解决与引擎的类名冲突 |
| 3.0.2  | 解决压缩和解压缩大文件时,卡屏问题                       |
| 3.0.1  | 使用新版Xcode重新编译,支持arm64                   |
| 3.0.0  | zip压缩解压功能插件                             |

### Android

API版本:`uexZip-3.0.2`

最近更新时间:`2015-12-17`

| 历史发布版本 | 更新内容                      |
| ------ | ------------------------- |
| 3.0.2  | 修复带密码加密时某些情况下返回成功但实际失败的问题 |
| 3.0.1  | 修复非压缩文件也能解压成功的问题          |
| 3.0.0  | zip压缩解压功能插件               |
