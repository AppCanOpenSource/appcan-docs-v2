/*
Sort: 13
Toc: 1
Tips: 文件管理操作
keywords: appcan开发文档,插件API,系统功能,uexFileMgr 
description: uexFileMgr 插件主要封装了文件操作,主要包含创建文件,打开文件,以及文件提供过路径或者文件对象进行文件增,删,改,查等,读取文件内容,限utf-8编码txt文件,以及文本阅读器等多个接口.更多appcan开发文档，请见http://newdocx.appcan.cn
Show: /newdocx/docx?type=1401_975
*/
- [1、简介](#-1-http-appcan-download-oss-cn-beijing-aliyuncs-com-e5-85-ac-e6-b5-8b-2fgf-png-ignore- "1、简介")
- [2、API概览](#-2-api-ignore- "2、API概览")
- [3、更新历史](#-3-ignore- "3、更新历史")
#### **1、简介** *[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() *<ignore>
该对象主要封装了文件操作,主要包含创建文件,打开文件,以及文件提供过路径或者文件对象进行文件增,删,改,查等,读取文件内容,限utf-8编码txt文件,以及文本阅读器等多个接口.

###### **1.1、说明**<ignore>

> 文件路径包括:`wgt://...`,`res://...`,`wgts://...`,`file://...`,`http://...`,`https://...`
> 其中: `wgt://...`对应widget的沙盒根路径,可读可写
	`res://...`对应widget目录下的wgtRes路径,只可读不可写

关于文件路径的使用,可调用uexFileMgr.getFileRealPath接口获得文件真实路径作为参考

###### **1.2、UI展示**<ignore>
*![](http://newdocx.appcan.cn/docximg/151401f2015r6l7o.jpg)*
*![](./img/screenshot2.jpg)*

###### **1.3、开源源码**<ignore>
插件测试用例与源码下载:<a href="http://plugin.appcan.cn/details.html?id=172_index" target="_blank">点击</a>插件中心至插件详情页 (插件测试用例与插件源码已经提供)

###### **1.4、平台版本支持**<ignore>

本插件的所有API默认支持**Android4.3+**和**iOS10.0+**操作系统

有特殊版本要求的API会在文档中额外说明

###### **1.5、接口有效性**<ignore>

本插件所有API默认在插件版本**4.0.0+**可用

在后续版本中新添加的接口会在文档中额外说明


#### **2、API概览**<ignore>

###### **2.1、方法**<ignore>

> ######  **create //创建文件** 

`uexFileMgr.create(param)`

**说明:**

创建文件

**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明   |
| ----- | ------ | ---- | ---- |
| param | Object | 是    | 文件设置 |


```javascript
var param = {
    path:
}
```

各字段含义如下:

| 字段名称 | 类型     | 是否必选 | 说明                                    |
| ---- | ------ | ---- | ------------------------------------- |
| path | String | 是    | 文件路径.支持"wgt://","wgts://"、"file://"协议 |

**返回值:**

uexFile对象 file
创建失败时返回null

**示例:**

```javascript
var file = uexFileMgr.create({
	path:"wgt://data/1.txt"
});
if(!file){
	alert("创建失败!");
}
```

> ######  **mkdir //创建文件夹** 

`uexFileMgr.mkdir(param)`

**说明:**

  创建文件夹

**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明    |
| ----- | ------ | ---- | ----- |
| param | Object | 是    | 文件夹设置 |


```javascript
var param = {
    path:
}
```

各字段含义如下:

| 字段名称 | 类型     | 是否必选 | 说明                                     |
| ---- | ------ | ---- | -------------------------------------- |
| path | String | 是    | 文件夹路径.支持"wgt://","wgts://"、"file://"协议 |

**返回值:**

Boolean类型,是否创建成功

**示例:**

```javascript
var ret = uexFileMgr.mkdir({
	path:"wgt://data/test/"
});
alert(ret);
```

> ######  **open //打开文件** 

`uexFileMgr.open(param)`


**说明:**

打开文件

**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明   |
| ----- | ------ | ---- | ---- |
| param | Object | 是    | 文件设置 |


```javascript
var param = {
    path:,
    mode:
}
```

各字段含义如下:

| 字段名称 | 类型     | 是否必选 | 说明                                       |
| ---- | ------ | ---- | ---------------------------------------- |
| path | String | 是    | 文件路径.支持"wgt://","wgts://"、"file://"协议    |
| mode | Number | 是    | 打开设置,1-可读 2-可写 4-不存在时创建新文件,可累加,如1+2 = 3表示可读可写. |

**返回值:**

uexFile对象file
打开失败时返回null

**示例:**

```javascript
var file = uexFileMgr.open({
	path: "wgt://data/1.txt",
	mode: 3
});
if(!file){
	alert("打开失败!");
}
```

> ######  **deleteFileByPath //根据路径删除文件** 

`uexFileMgr.deleteFileByPath(path)`

**说明:**

根据路径删除文件

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明                                     |
| ---- | ------ | ---- | -------------------------------------- |
| path | String | 是    | 文件路径,支持"wgt://","wgts://","file://" 协议 |

**返回值:**

Boolean类型,是否删除成功

**示例:**

```javascript
var ret = uexFileMgr.deleteFileByPath("wgt://data/test.txt");
alert(ret);
```

> ######  **isFileExistByPath //根据路径判断文件是否存在** 

`uexFileMgr.isFileExistByPath(path)`

**说明:**

根据路径判断文件是否存在

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明                                     |
| ---- | ------ | ---- | -------------------------------------- |
| path | String | 是    | 文件路径,支持"wgt://","wgts://","file://" 协议 |


**返回值:**

Boolean类型,是否存在

**示例:**

```javascript
var ret = uexFileMgr.isFileExistByPath("wgt://data/test.txt");
alert(ret);
```

> ######  **getFileTypeByPath //根据路径获取文件类型** 

`uexFileMgr.getFileTypeByPath(path)`

**说明:**

根据路径获取文件类型

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明                                     |
| ---- | ------ | ---- | -------------------------------------- |
| path | String | 是    | 文件路径,支持"wgt://","wgts://","file://" 协议 |

**返回值:**

Number类型, -1:文件不存在或发生未知错误 0:文件 1:文件夹

**示例:**

```javascript
var ret = uexFileMgr.getFileTypeByPath("wgt://data/test.txt");
alert(ret);
```

> ######  **explorer //文件管理器** 

`uexFileMgr.explorer(folderPath,cbFunc)`

**说明:**

文件管理器

**参数:**

| 参数名称       | 参数类型     | 是否必选 | 说明                                       |
| ---------- | -------- | ---- | ---------------------------------------- |
| folderPath | String   | 是    | 起始文件夹路径,支持"wgt://","wgts://","res://","file://" 协议 |
| cbFunc     | Function | 是    | 文件浏览结束后,会调用此函数,函数参数说明见下                  |


**回调参数:**

| 参数名称  | 参数类型   | 说明                                       |
| ----- | ------ | ---------------------------------------- |
| error | Number | 是否发生错误. 未发生错误时error为0, 发生错误或者用户取消选择时error为非0值 |
| path  | String | 用户选择的文件的路径;若用户取消选择,则path为null            |

**示例:**

```javascript
uexFileMgr.explorer("/sdcard/widgetone",function(err,path){
	if(!err){
		alert(path);
	}else{
		alert(err);
	}
});
```

> ######  **multiExplorer //文件管理器,支持选择多个文件** 

`uexFileMgr.multiExplorer(path,cb)`

**说明:**

文件管理器,支持选择多个文件

**参数:**

| 参数名称 | 参数类型     | 是否必选 | 说明                                       |
| ---- | -------- | ---- | ---------------------------------------- |
| path | String   | 是    | 文件路径,支持"wgt://","wgts://","res://","file://" 协议 |
| cb   | Function | 是    | 文件浏览结束后,会调用此函数,函数参数说明见下                  |

**回调参数:**

| 参数名称  | 参数类型   | 说明                                       |
| ----- | ------ | ---------------------------------------- |
| error | Number | 是否发生错误. 未发生错误时error为0, 发生错误或者用户取消选择时error为非0值 |
| paths | Array  | 用户选择的文件的路径构成的数组;若用户未选择任何文件,则path为空数组     |

**示例:**

```javascript
uexFileMgr.multiExplorer("/sdcard/widgetone",function(err,path){
	if(!err){
		alert(path);
	}else{
		alert(err);
	}
});
```

> ######  **seekFile //定位到文件某一位置**

`uexFileMgr.seekFile(file,len)`

**说明:**

定位到文件某一位置

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明            |
| ---- | ------ | ---- | ------------- |
| file | String | 是    | uexFile对象file |
| len  | Number | 是    | 字节数           |

**返回值:**

Number类型文件偏移值,-1表示定位失败.

**示例:**

```javascript
var file = uexFileMgr.open({
	path: "wgt://data/1.txt",
	mode: 3
});
var ret = uexFileMgr.seekFile(file, 1);
alert(ret);
```

> ######  **seekBeginOfFile //定位到起始位置** 

`uexFileMgr.seekBeginOfFile(file)`

**说明:**

定位到起始位置

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明            |
| ---- | ------ | ---- | ------------- |
| file | String | 是    | uexFile对象file |

**返回值:**

Number类型文件偏移值,-1表示定位失败.

**示例:**

```javascript
var file = uexFileMgr.open({
	path: "wgt://data/1.txt",
	mode: 3
});
var ret = uexFileMgr.seekBeginOfFile(file);
alert(ret);
```

> ######  **seekEndOfFile //定位到结束位置** 

`uexFileMgr.seekEndOfFile(file)`

**说明:**

定位到结束位置

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明            |
| ---- | ------ | ---- | ------------- |
| file | String | 是    | uexFile对象file |

**返回值:**

Number类型文件偏移值,-1表示定位失败.

**示例:**

```javascript
var file = uexFileMgr.open({
	path: "wgt://data/1.txt",
	mode: 3
});
var ret = uexFileMgr.seekEndOfFile(file);
alert(ret);
```

> ######  **writeFile //写文件** 

`uexFileMgr.writeFile(file,flag,data,cb)`

**说明:**

写文件　

**参数:**

| 参数名称 | 参数类型     | 是否必选 | 说明                    |
| ---- | -------- | ---- | --------------------- |
| file | String   | 是    | uexFile对象file         |
| flag | Number   | 是    | 写入设置(详见下)             |
| data | String   | 是    | 要写入的数据                |
| cb   | Function | 是    | 写入结束后,会调用此函数,函数参数说明见下 |

* flag是一个枚举值,将所需设置对应的值传入即可.
* 可累加,比如 flag传3 (= 1+2) 表示先进行base64解码,再追加写入.
* 不需要这些额外设置时,flag请传0

| flag | 含义           | 解释                                       |
| ---- | ------------ | ---------------------------------------- |
| 1    | Append       | 包含此flag时,数据会追加写入到指定的文件                   |
| 2    | Base64Decode | 包含此flag时,插件会先对传入的字符串进行base64解码,然后将解码后的数据写入文件 |


**回调参数:**

| 参数名称  | 参数类型   | 说明              |
| ----- | ------ | --------------- |
| error | Number | 为0时表示成功,非0时表示失败 |


**示例:**

```javascript
var file = uexFileMgr.open({
	path: "wgt://data/1.txt",
	mode: 3
});
uexFileMgr.writeFile(file, 0, "test",function(err){
	alert(err);
});
```

> ######  **readFile //读文件** 

`uexFileMgr.readFile(file,len,flag,cb)`

**说明:**

读文件

**参数:**

| 参数名称 | 参数类型     | 是否必选 | 说明                    |
| ---- | -------- | ---- | --------------------- |
| file | String   | 是    | uexFile对象file         |
| len  | Number   | 是    | 字节数,传-1表示读取全部内容       |
| flag | Number   | 是    | 读取设置(详见下)             |
| cb   | Function | 是    | 读取结束后,会调用此函数,函数参数说明见下 |

* flag是一个枚举值,将所需设置对应的值传入即可.
* 同时需要多种设置时,应将设置对应的flag相加后再传入.
* 不需要这些额外设置时,flag请传0.

| flag | 含义           | 解释                                    |
| ---- | ------------ | ------------------------------------- |
| 1    | Base64Encode | 包含此flag时,插件会对读取到的数据先进行base64编码,再传回给前端 |

**回调参数:**

```javascript
var cb = function(error,data){}
```
| 参数名称  | 参数类型   | 说明                 |
| ----- | ------ | ------------------ |
| error | Number | 为0时表示成功,非0时表示失败    |
| data  | String | 读取到的数据,读取失败时返回null |

**示例:**

```javascript
var file = uexFileMgr.open({
	path: "wgt://data/1.txt",
	mode: 3
});
uexFileMgr.readFile(file, -1,0,function(error,data){
	if(!error){
		alert(data);
	}else{
		alert("读取失败!");
	}
	
});
```

> ######  **getFileSize //获取文件大小** 

`uexFileMgr.getFileSize(file)`

**说明:**

获取文件大小

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明            |
| ---- | ------ | ---- | ------------- |
| file | String | 是    | uexFile对象file |

**返回值:**

Number类型文件大小,读取失败时返回-1.

**示例:**

```javascript
var file = uexFileMgr.open({
	path: "wgt://data/1.txt",
	mode: 3
});
var size = uexFileMgr.getFileSize(file);
alert(size);
```

> ######  **getFilePath //获取文件路径** 

`uexFileMgr.getFilePath(file)`

**说明:**

获取文件路径

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明            |
| ---- | ------ | ---- | ------------- |
| file | String | 是    | uexFile对象file |

**返回值:**

String类型,文件路径


**示例:**

```javascript
var file = uexFileMgr.open({
	path: "wgt://data/1.txt",
	mode: 3
});
var path = uexFileMgr.getFilePath(file);
alert(path);
```
> ######  **getFileRealPath //获取文件实际路径** 

`uexFileMgr.getFileRealPath(path)`

**说明:**

获取文件实际路径

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明                                       |
| ---- | ------ | ---- | ---------------------------------------- |
| path | String | 是    | 文件路径,支持"wgt://","wgts://","res://","file://" 协议 |

**返回值:**

String类型,文件绝对路径


**示例:**

```javascript
var realPath = uexFileMgr.getFileRealPath("wgt://data/test.txt");
alert(realPath);
```

> ######  **closeFile //关闭文件** 

`uexFileMgr.closeFile(file)`

**说明:**

关闭文件

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明            |
| ---- | ------ | ---- | ------------- |
| file | String | 是    | uexFile对象file |

**返回值:**

Boolean类型,是否关闭成功

**示例:**

```javascript
var file = uexFileMgr.open({
	path: "wgt://data/1.txt",
	mode: 3
});
var ret = uexFileMgr.closeFile(file);
alert(ret);
```
> ######  **getReaderOffset //获取文件偏移值** 

`uexFileMgr.getReaderOffset(file)`

**说明:**

获取文件偏移值

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明            |
| ---- | ------ | ---- | ------------- |
| file | String | 是    | uexFile对象file |

**返回值:**

Number类型文件偏移值
获取失败时返回-1
**示例:**

```javascript
var file = uexFileMgr.open({
	path: "wgt://data/1.txt",
	mode: 3
});
var offset = uexFileMgr.getReaderOffset(file);
alert(offset);
```

> ######  **readPercent //读百分比对应位置的字符** 

`uexFileMgr.readPercent(file,percent,len,cb)`

**说明:**

读百分比对应位置的字符

**参数:**

| 参数名称    | 参数类型     | 是否必选 | 说明                    |
| ------- | -------- | ---- | --------------------- |
| file    | String   | 是    | uexFile对象file         |
| percent | Number   | 是    | 百分比(不带百分号)            |
| len     | Number   | 是    | 字节数,读取百分比之后的字节长度      |
| cb      | Function | 是    | 读取结束后,会调用此函数,函数参数说明见下 |

**回调参数:**

```javascript
var cb = function(error,data){}
```
| 参数名称  | 参数类型   | 说明                 |
| ----- | ------ | ------------------ |
| error | Number | 为0时表示成功,非0时表示失败    |
| data  | String | 读取到的数据,读取失败时返回null |

**示例:**

```javascript
var file = uexFileMgr.open({
	path: "wgt://data/1.txt",
	mode: 3
});
uexFileMgr.readPercent(file,20,3,function(error,data){
	if(!error){
		alert(data);
	}else{
		alert("ERROR!");
	}
});
```

> ######  **readNext //读取下一页字符** 

`uexFileMgr.readNext(file,len,cb)`

**说明:**

读取下一页字符

**参数:**

| 参数名称 | 参数类型     | 是否必选 | 说明                    |
| ---- | -------- | ---- | --------------------- |
| file | String   | 是    | uexFile对象file         |
| len  | Number   | 是    | 字节数                   |
| cb   | Function | 是    | 读取结束后,会调用此函数,函数参数说明见下 |

**回调参数:**

```javascript
var cb = function(error,data){}
```
| 参数名称  | 参数类型   | 说明                 |
| ----- | ------ | ------------------ |
| error | Number | 为0时表示成功,非0时表示失败    |
| data  | String | 读取到的数据,读取失败时返回null |


**示例:**

```javascript
var file = uexFileMgr.open({
	path: "wgt://data/1.txt",
	mode: 3
});
uexFileMgr.readNext(file, 20,function(error,data){
	if(!error){
		alert(data);
	}else{
		alert("ERROR!");
	}
});
```

> ######  **readPre //读取上一页字符**

`uexFileMgr.readPre(file,len,cb)`

**说明:**

读取上一页字符

**参数:**

| 参数名称 | 参数类型     | 是否必选 | 说明                    |
| ---- | -------- | ---- | --------------------- |
| file | String   | 是    | uexFile对象file         |
| len  | Number   | 是    | 字节数                   |
| cb   | Function | 是    | 读取结束后,会调用此函数,函数参数说明见下 |

**回调参数:**

```javascript
var cb = function(error,data){}
```
| 参数名称  | 参数类型   | 说明                 |
| ----- | ------ | ------------------ |
| error | Number | 为0时表示成功,非0时表示失败    |
| data  | String | 读取到的数据,读取失败时返回null |
**示例:**

```javascript
var file = uexFileMgr.open({
	path: "wgt://data/1.txt",
	mode: 3
});
uexFileMgr.readPre(file,20,function(error,data){
	if(!error){
		alert(data);
	}else{
		alert("ERROR!");
	}
});
```

> ######  **openWithPassword //使用密码打开文件**

`uexFileMgr.openWithPassword(param)`

**说明:**

使用密码打开文件

**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明   |
| ----- | ------ | ---- | ---- |
| param | Object | 是    | 文件设置 |


```javascript
var param = {
    path:,
    password:,
    mode:
}
```

各字段含义如下:

| 字段名称     | 类型     | 是否必选 | 说明                                       |
| -------- | ------ | ---- | ---------------------------------------- |
| path     | String | 是    | 文件路径.支持"wgt://","wgts://"、"file://"协议    |
| password | String | 是    | 文件密码                                     |
| mode     | Number | 是    | 打开设置,1-可读 2-可写 4-不存在时创建新文件,可累加,如1+2 = 3表示可读可写. |

**返回值:**

uexFile对象file
打开失败时返回null

**示例:**

```javascript
var file = uexFileMgr.openWithPassword({
	path: "wgt://data/1.txt",
	password: "123456",
	mode: 3
});
if(!file){
	alert("打开失败!");
}
```



######  **createWithPassword //使用密码创建文件** 

`uexFileMgr.createWithPassword(param)`

**说明:**

使用密码创建文件

**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明   |
| ----- | ------ | ---- | ---- |
| param | Object | 是    | 文件设置 |


```javascript
var param = {
    path:,
    password:
}
```

| 字段名称     | 类型     | 是否必选 | 说明                                    |
| -------- | ------ | ---- | ------------------------------------- |
| path     | String | 是    | 文件路径.支持"wgt://","wgts://"、"file://"协议 |
| password | String | 是    | 文件密码                                  |

**返回值:**

uexFile对象file
创建失败时返回null

**示例:**

```javascript
var file = uexFileMgr.createWithPassword({
	path: "wgt://data/1.txt",
	password: "123456",
});
if(!file){
	alert("创建失败!");
}
```

> ######  **renameFile //重命名文件** 

`uexFileMgr.renameFile(param,cb)`

**说明:**

重命名文件

**参数:**

| 参数名称  | 参数类型     | 是否必选 | 说明                     |
| ----- | -------- | ---- | ---------------------- |
| param | String   | 是    | param是字典结构json字符串,详情见下 |
| cb    | Function | 是    | 重命名结束后,会调用此函数,函数参数说明见下 |

```javascript
var param = {
	oldFilePath:,
	newFilePath:
}
```

各字段含义如下:

| 字段名称        | 类型     | 是否必选 | 说明        |
| ----------- | ------ | ---- | --------- |
| oldFilePath | String | 是    | 重命名前的文件路径 |
| newFilePath | String | 是    | 重命名后的文件路径 |

**回调参数:**


```javascript
var cb = function(error){
}
```

| 参数名称  | 参数类型   | 说明                     |
| ----- | ------ | ---------------------- |
| error | Number | 重命名操作结果,为0表示成功 非0时表示失败 |



**示例:**

```javascript
var data = {
	oldFilePath:"wgt://1.txt",
	newFilePath:"wgt://2.txt"
}

uexFileMgr.renameFile(JSON.stringify(data),function(err){
	if(!err){
		alert("重命名成功!");
	}else{
		alert("重命名失败!");
	}
});
```

> ######  **search //搜索文件** 

`uexFileMgr.search(param,cb)`

**说明:**

搜索文件


**参数:**

| 参数名称  | 参数类型     | 是否必选 | 说明                      |
| ----- | -------- | ---- | ----------------------- |
| param | String   | 是    | param是字典结构json字符串,详情见下  |
| cb    | Function | 是    | 搜索操作结束后,会调用此函数,函数参数说明见下 |

```javascript
var param = {
	path:,
	flag:,
	keywords:[],
	suffixes:[]
}
```

各字段含义如下:

| 字段名称     | 类型   | 是否必选   | 说明                 |
| -------- | ---- | ------ | ------------------ |
| path     | 是    | String | 目标文件夹路径            |
| flag     | 否    | Number | 搜索设置 见下 不传默认为0     |
| keywords | 否    | Array  | 要搜索的文件名关键字 不传时搜索所有 |
| suffixes | 否    | Array  | 要搜索的文件后缀名 不传时搜索所有  |



| flag | 说明                                     |
| ---- | -------------------------------------- |
| 1    | 匹配文件夹 也搜索符合条件的文件夹(有设置suffixes时,此项设置失效) |
| 2    | 精确匹配 只搜索文件名恰为keyword的文件                |
| 4    | 递归搜索 搜索目标文件夹及其子文件夹                     |

* 需要多项设置时 请将各flag值相加再传入.比如传5 (=4+1),表示既递归搜索,又匹配文件夹

**回调参数:**

```javascript
var cb = function(error,result){
}
```

| 参数名称   | 参数类型   | 说明                                       |
| ------ | ------ | ---------------------------------------- |
| error  | Number | 为0时表示成功,非0时表示失败                          |
| result | Array  | 搜索操作结果,所有符合条件的路径构成的数组;若没有路径符合搜索条件,则为一个空数组 |


**示例:**

```javascript
var data = {
	path:"res://",
	flag:5,
	keywords:["name1","name2","name3"],
	suffixes:["txt","xml"]
	}

uexFileMgr.search(JSON.stringify(data),function(err,result){
	if(!err){
		alert(result);
	}else{
		alert("搜索失败!");
	}
});
```

> ######  **getFileListByPath //获取某路径下的所有文件** 

`uexFileMgr.getFileListByPath(path)`

**说明:**

获取某路径下的所有文件


**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明                                   |
| ---- | ------ | ---- | ------------------------------------ |
| path | String | 是    | 文件夹路径,支持wgt://, wgts://, file://协议路径 |

**返回值:**

* path无效或者不是文件夹 返回null
* 空文件夹 返回空数组
* 正常情况  返回路径信息构成的数组Array,路径信息结构定义如下

```javascript
var fileInfo = {
	fileName:,
	filePath:,
	fileType:
}
```

各字段含义如下:

| 字段名称     | 类型     | 说明            |
| -------- | ------ | ------------- |
| fileName | String | 文件名           |
| filePath | String | 文件路径          |
| fileType | Number | 类型.0-文件 1-文件夹 |

**示例:**

```
var path = "wgt://"
var result = uexFileMgr.getFileListByPath(path);
alert(result);
```

> ######  **getFileSizeByPath //通过路径获取文件或文件夹大小**

`uexFileMgr.getFileSizeByPath(params,cb)`

**说明:**

通过路径获取文件或文件夹大小

**参数:**

| 参数名称  | 参数类型     | 是否必选 | 说明                     |
| ----- | -------- | ---- | ---------------------- |
| param | String   | 是    | param是字典结构json字符串,详情见下 |
| cb    | Function | 是    | 操作结束后,会调用此函数,函数参数说明见下  |


```javascript
var params = {
    path:,
    unit:
}
```
各字段含义如下:

| 字段名称 | 类型     | 是否必选 | 说明                                       |
| ---- | ------ | ---- | ---------------------------------------- |
| path | String | 是    | 文件或文件夹路径,支持wgt://, wgts://, file://协议路径,参考[协议](#-pathtypes-ignore-) |
| unit | String | 否    | 文件大小单位,默认为"B",取值范围参考[unit](#-getfilesizeunit-ignore-) |

**回调参数:**


```javascript
var cb = function(error,info){
}
```

| 参数名称  | 参数类型   | 说明                 |
| ----- | ------ | ------------------ |
| error | Number | 为0表示操作成功,非0时表示操作失败 |
| info  | Object | 操作获取到的结果           |


```javascript
var info = {
	unit:,//String,文件大小单位
	data://Number,文件大小
}
```


**示例:**

```javascript
var params = {
 	path:"wgt://",
 	unit:"KB"
}
var data = JSON.stringify(params);
uexFileMgr.getFileSizeByPath(data,function(err,info){
	if(!err){
		alert(info.data);
	}else{
		alert("ERROR!");
	}
});
```

> ######  **copy //复制文件或文件夹**  

`uexFileMgr.copy(param,cbFunc);`

**说明:**

复制文件或文件夹

**参数:**

| 参数名称   | 参数类型     | 是否必选 | 说明           |
| ------ | -------- | ---- | ------------ |
| param  | Object   | 是    | 复制操作的参数,详见下  |
| cbFunc | Function | 是    | 操作结束后,会调用此函数 |

```javascript
var param = {
    src:,
    target:
}
```

各字段含义如下:

| 字段名称   | 类型     | 是否必选 | 说明        |
| ------ | ------ | ---- | --------- |
| src    | String | 是    | 源文件或文件夹路径 |
| target | String | 是    | 目标文件夹路径   |

* copy会将源文件或者文件夹,复制至目标文件夹内,**不会进行重命名操作**

**回调参数:**

```javascript
var cbFunc = function(error){
}
```

| 参数名称  | 类型     | 说明                |
| ----- | ------ | ----------------- |
| error | Number | 为0表示复制成功,非0表示复制失败 |

**示例:**

```javascript
uexFileMgr.copy({
	src: "wgt://test/1.txt",
	target: "wgt://test2/" 
},function(error){
	if(!error){
		alert("复制成功");
	}else{
		alert("复制失败");
	}
});
```

> ######  **getFileHashValue //获取文件哈希值**

`uexFileMgr.getFileHashValue(params,cbFunc)`

**说明:**

获取文件的哈希值

**参数:**

| 参数名称   | 参数类型     | 是否必选 | 说明      |
| ------ | -------- | ---- | ------- |
| params | JSON     | 是    | 文件路径及算法 |
| cbFunc | Function | 否    | 获取的回调   |

```javascript
var params = {
    path:,
    algorithm:
}
```

各字段含义如下:

| 字段名称      | 类型     | 是否必选 | 说明                          |
| --------- | ------ | ---- | --------------------------- |
| path      | String | 是    | 文件路径，协议详见CONSTANT中PathTypes |
| algorithm | String | 是    | 文件算法，例如：MD5、SHA-1           |


**回调参数:**

```javascript
var cbFunc = function(data){
}
```

| 参数名称 | 类型     | 说明     |
| ---- | ------ | ------ |
| data | String | 文件的哈希值 |

**示例:**

```javascript
var data = {
    path: "res://biaoge.xls",
    algorithm: "SHA-1"
};
uexFileMgr.getFileHashValue(data,function(data){
  	
});
```

####  **3、更新历史**<ignore>

###### **iOS**<ignore>

API版本: `uexFileMgr-4.0.5`

最近更新时间:`2019-08-26`

| 历史发布版本 | 更新内容     |
| ------ | -------- |
| 4.0.5 |回调方法调整，放入主线程处理|
| 4.0.4 |修复getFileSizeByPath方法传入非文件夹路径时返回大小为0的bug|
| 4.0.3 |修正部分cb旧接口的参数问题|
| 4.0.1 |新增getFileHashValue接口     |

###### **Android**<ignore>

API版本: `uexFileMgr-4.0.4`

最近更新时间:`2019-05-24`

| 历史发布版本 | 更新内容     |
| ------ | -------- |
| 4.0.4 |根目录下无返回箭头或返回报错问题|
| 4.3.2 |添加动态权限申请|
| 4.0.2 |修复EUExFile中空指针异常|

#### **4、附录**<ignore>

###### **GetFileSizeErrorCode**<ignore>

| errorCode | 说明            |
| --------- | ------------- |
| 0         | 获取成功          |
| -1        | 无参数错误         |
| -2        | 当前路径文件或文件夹不存在 |
| -3        | 未知错误          |

###### **GetFileSizeUnit**<ignore>

| value | 说明           |
| ----- | ------------ |
| B     | 字节           |
| KB    | 1KB = 1024B  |
| MB    | 1MB = 1024KB |
| GB    | 1GB = 1024MB |

###### **PathTypes**<ignore>

| 协议头             | Android对应路径 (其中"/sdcard/"等 同于"/storage/emulated/0/") | iOS对应路径                           |
| --------------- | ---------------------------------------- | --------------------------------- |
| res://          | widget/wgtRes/                           | widget/wgtRes                     |
| wgt://          | /storage/emulated/0/widgetone/apps/ xxx(widgetAppId)/ | /Documents/apps/xxx(widgetAppId)/ |
| wgts://         | /storage/emulated/0/widgetone/widgets/   | /Documents/widgets/               |
| file:///sdcard/ | /storage/emulated/0/                     | 绝对路径                              |

