[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
该对象主要封装了文件操作,主要包含创建文件,打开文件,以及文件提供过路径或者文件对象进行文件增,删,改,查等,读取文件内容,限utf-8编码txt文件,以及文本阅读器等多个接口。

## 1.1、说明

> 文件路径包括:`wgt://...`,`res://...`,`wgts://...`,`file://...`,`http://...`,`https://...`
其中: `wgt://...`对应widget的沙盒根路径,可读可写
	`res://...`对应widget目录下的wgtRes路径,只可读不可写
	
关于文件路径的使用,可调用uexFileMgr.getFileRealPath接口获得文件真实路径作为参考

## 1.2、UI展示
![](./img/screenshot1.jpg)
![](./img/screenshot2.jpg)

## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=172_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统

有特殊版本要求的API会在文档中额外说明

## 1.5、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用

在后续版本中新添加的接口会在文档中额外说明


# 2、API概览

## 2.1、方法

> ### createFile 创建文件

`uexFileMgr.createFile(id,path)`

**说明:**

创建文件,同一id只能被创建一次

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 唯一标识符 |
| path|String | 是 | 文件路径,路径协议详见[附录-PathTypes](#PathTypes) |

**返回值:**

Boolean类型,是否创建成功

**示例:**

```
var path = "wgt://data/test.txt";
var ret = uexFileMgr.createFile('1', path);
alert(ret);
```

> ### createDir 创建文件夹

`uexFileMgr.createDir(id,dirPath)`

**说明:**

  创建文件夹

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 唯一标识符 |
| dirPath|String | 是 |文件夹路径,路径协议详见[附录-PathTypes](#PathTypes)  |


**返回值:**

Boolean类型,是否创建成功

**示例:**

```
var path = "wgt://data/test2/";
var ret = uexFileMgr.createDir('20', path);
alert(ret);
```

> ### openFile 打开文件

`uexFileMgr.openFile(id,path,mode)`

**说明:**

打开文件



**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 唯一标识符 |
| path|String | 是 | 文件路径,路径协议详见[附录-PathTypes](#PathTypes) |
| mode|String | 是 | 文件打开模式,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#File "CONSTANT")中FileOpenModes |

**返回值:**

Boolean类型,是否打开成功

**示例:**

```
var ret = uexFileMgr.openFile(1,"res://reader.txt",1);
alert(ret);
```

> ### deleteFileByPath 根据路径删除文件

`uexFileMgr.deleteFileByPath(path)`

**说明:**

根据路径删除文件

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| path|String | 是 | 文件路径,路径协议详见[附录-PathTypes](#PathTypes) |

**返回值:**

Boolean类型,是否删除成功

**示例:**

```
var ret = uexFileMgr.deleteFileByPath("wgt://data/test.txt");
alert(ret);
```

> ### deleteFileByID 根据id删除文件

`uexFileMgr.deleteFileByID(id)`

**说明:**

根据id删除文件

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |

**返回值:**

Boolean类型,是否删除成功



**示例:**

```
var ret = uexFileMgr.deleteFileByID(1);
alert(ret);
```

> ### isFileExistByPath 根据路径判断文件是否存在

`uexFileMgr.isFileExistByPath(id, path)`

**说明:**

根据路径判断文件是否存在

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 文件的唯一标识符,与回调函数中的opId对应 |
| path|String | 是 | 文件路径,路径协议详见[附录-PathTypes](#PathTypes) |


**返回值:**

Boolean类型,是否存在

**示例:**

```
var ret = uexFileMgr.isFileExistByPath(2,"wgt://data/test.txt");
alert(ret);
```

> ### isFileExistByID 根据id判断文件是否存在

`uexFileMgr.isFileExistByID(id)`

**说明:**

根据id判断文件是否存在

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |

**返回值:**

Boolean类型,是否存在

**示例:**

```
var ret = uexFileMgr.isFileExistByID('2');
alert(ret);
```

> ### getFileTypeByPath 根据路径获取文件类型

`uexFileMgr.getFileTypeByPath(path)`

**说明:**

根据路径获取文件类型

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| path|String | 是 | 文件路径,路径协议详见[附录-PathTypes](#PathTypes) |

**返回值:**

Number类型, -1:文件不存在或发生未知错误 0:文件 1:文件夹

**示例:**

```
var ret = uexFileMgr.getFileTypeByPath("wgt://data/test.txt");
alert(ret);
```

> ### getFileTypeByID 根据id获取文件类型

`uexFileMgr.getFileTypeByID(id)`

**说明:**

根据id获取文件类型

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |

**返回值:**

Number类型, -1:文件不存在或发生未知错误 0:文件 1:文件夹

**示例:**

```
var ret = uexFileMgr.getFileTypeByID('4');
alert(ret);
```
> ### explorer 文件管理器

`uexFileMgr.explorer(folderPath,cb)`

**说明:**

文件管理器

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| folderPath|String | 是 | 起始文件夹路径,路径协议详见[附录-PathTypes](#PathTypes) |
| cb | Function| 是 | 文件浏览结束后,会调用此函数,函数参数说明见下|


**回调参数:**

|  参数名称 | 参数类型  |  说明 |
| ----- | ----- | ----- |
| path|String | 用户选择的文件的路径;若用户取消选择,则path为null |



**示例:**

```
uexFileMgr.explorer("/sdcard/widgetone",function(path){
	alert(path);
});
```

> ### multiExplorer 文件管理器(多选)

`uexFileMgr.multiExplorer(path,cb)`

**说明:**

文件管理器,支持选择多个文件

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| path|String | 是 | 文件路径,路径协议详见[附录-PathTypes](#PathTypes) |
| cb | Function| 是 | 文件浏览结束后,会调用此函数,函数参数说明见下|

**回调参数:**

|  参数名称 | 参数类型  |  说明 |
| ----- | ----- | ----- |
| paths|Array | 用户选择的文件的路径构成的数组;若用户取消选择,则path为空数组 |

**示例:**

```
uexFileMgr.multiExplorer("/sdcard/widgetone",function(paths){
	alert(paths);
});
```

> ### seekFile 定位到文件某一位置

`uexFileMgr.seekFile(id,len)`

**说明:**

定位到文件某一位置

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |
| len| Number| 是 |字节数 |

**返回值:**

Boolean类型,是否定位成功

**示例:**

```
uexFileMgr.openFile('1', "wgt://test.txt", '1');
var ret = uexFileMgr.seekFile('1', '1');
alert(ret);

```

> ### seekBeginOfFile 定位到起始位置

`uexFileMgr.seekBeginOfFile(id)`

**说明:**

定位到起始位置

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |

**返回值:**

Boolean类型,是否定位成功

**示例:**

```
uexFileMgr.openFile('1', "wgt://test.txt", '1');
var ret = uexFileMgr.seekBeginOfFile('1');
alert(ret);
```

> ### seekEndOfFile 定位到结束位置

`uexFileMgr.seekEndOfFile(id)`

**说明:**

定位到结束位置

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |

**返回值:**

Boolean类型,是否定位成功

**示例:**

```

uexFileMgr.openFile('1', "wgt://test.txt", '1');
var ret = uexFileMgr.seekEndOfFile('1');
alert(ret);
```

> ### writeFile 写文件

`uexFileMgr.writeFile(id,option ,data,cb)`

**说明:**

写文件　

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |
| option | Number| 是 |写入设置(详见下) |
| data| String| 是 |要写入的数据 |
| cb | Function| 是 | 写入结束后,会调用此函数,函数参数说明见下|

* uexFileWritingOption是一个枚举值,将所需设置对应的flag传入即可。
* 同时需要多种设置时,应将设置对应的flag相加后再传入。比如 option传3 (= 1+2) 意味着先进行base64解码,再追加写入.
* 不需要这些额外设置时,option请传0

| flag | 含义 | 解释 |
| ----- | ----- | ----- | 
| 1 | Append | 包含此flag时,数据会追加写入到指定的文件|
| 2 | Base64Decode | 包含此flag时,插件会先对传入的字符串进行base64解码,然后将解码后的数据写入文件|


**回调参数:**

|  参数名称 | 参数类型  |  说明 |
| ----- | ----- | ----- |
| ret| Boolean | 写入是否成功 |




**示例:**

```
uexFileMgr.openFile('1', "wgt://test.txt", '1');
uexFileMgr.writeFile('1', 0, "test",function(ret){
	alert(ret);
});
```

> ### readFile 读文件

`uexFileMgr.readFile(id,len,option,cb)`

**说明:**

读文件

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |
| len| Number| 是 |字节数,传-1表示读取全部内容|
| option | Number | 是 | 读取设置(详见下)|
| cb | Function| 是 | 读取结束后,会调用此函数,函数参数说明见下|

* uexFileReadingOption是一个枚举值,将所需设置对应的flag传入即可。
* 同时需要多种设置时,应将设置对应的flag相加后再传入。
* 不需要这些额外设置时,option请传0

| flag | 含义 | 解释 |
| ----- | ----- | ----- | 
| 1 | Base64Encode | 包含此flag时,插件会对读取到的数据先进行base64编码,再传回给前端|

* 不需要这些额外设置时,option请传0

**回调参数:**

|  参数名称 | 参数类型  |  说明 |
| ----- | ----- | ----- |
| data| String | 读取到的数据,读取失败时返回null |

**示例:**

```
uexFileMgr.openFile('1', "wgt://test.txt", '1');
uexFileMgr.readFile('1', -1,0,function(data){
	alert(data);
});
```

> ### getFileSize 获取文件大小

`uexFileMgr.getFileSize(id)`

**说明:**

获取文件大小

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |

**返回值:**

String类型,文件大小转成的字符串

**示例:**

```
uexFileMgr.openFile('1', "wgt://test.txt", '1');
var size = uexFileMgr.getFileSize('1');
alert(size);
```

> ### getFilePath 获取文件路径

`uexFileMgr.getFilePath(id)`

**说明:**

获取文件路径

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |

**返回值:**

String类型,文件路径


**示例:**

```
uexFileMgr.openFile('1', "wgt://test.txt", '1');
var path = uexFileMgr.getFilePath('1');
alert(path);
```
> ### getFileRealPath 获取文件实际路径

`uexFileMgr.getFileRealPath(path, cbName)`

**说明:**

获取文件实际路径

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| path| String| 是 | 文件路径,路径协议详见[附录-PathTypes](#PathTypes) |

**返回值:**

String类型,文件绝对路径


**示例:**

```
uexFileMgr.getFileRealPath("wgt://data/test.txt", "cbName");
```

> ### closeFile 关闭文件

`uexFileMgr.closeFile(id)`

**说明:**

关闭文件

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |

**返回值:**

Boolean类型,是否关闭成功

**示例:**

```
var ret = uexFileMgr.closeFile(1);
alert(ret);
```
> ### getReaderOffset 获取文件偏移值

`uexFileMgr.getReaderOffset(id)`

**说明:**

获取文件偏移值

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |

**返回值:**

Number类型,文件偏移值

**示例:**

```
    uexFileMgr.getReaderOffset(1);
```

> ### readPercent 读百分比对应位置的字符

`uexFileMgr.readPercent(id,percent,len,cb)`

**说明:**

读百分比对应位置的字符

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |
| percent| Number| 是 | 百分比(不带百分号) |
| len| Number| 是 | 字节数,读取百分比之后的字节长度 |
| cb | Function| 是 | 读取结束后,会调用此函数,函数参数说明见下|

**回调参数:**

|  参数名称 | 参数类型  |  说明 |
| ----- | ----- | ----- |
| data| String | 读取到的数据,读取失败时为null |

**示例:**

```
uexFileMgr.readPercent('1','20','3',function(data){
	alert(data);
});
```

> ### readNext 读取下一页字符

`uexFileMgr.readNext(id,len,cb)`

**说明:**

读取下一页字符

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |
| len| Number| 是 | 字节数 |
| cb | Function| 是 | 读取结束后,会调用此函数,函数参数说明见下|

**回调参数:**

|  参数名称 | 参数类型  |  说明 |
| ----- | ----- | ----- |
| data| String | 读取到的数据,读取失败时为null |

**示例:**

```
uexFileMgr.readNext('1', '20',function(data){
	alert(data);
});
```

> ### readPre 读取上一页字符

`uexFileMgr.readPre(id,len,cb)`

**说明:**

读取上一页字符

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |
| len| Number| 是 | 字节数 |
| cb | Function| 是 | 读取结束后,会调用此函数,函数参数说明见下|

**回调参数:**

|  参数名称 | 参数类型  |  说明 |
| ----- | ----- | ----- |
| data| String | 读取到的数据,读取失败时为null |

**示例:**

```
uexFileMgr.readPre('1','20',function(data){
	alert(data);
});
```

> ### openSecure 使用密码打开文件

`uexFileMgr.openSecure(id,path,mode,key)`

**说明:**

使用密码打开文件

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |
| path| String| 是 | 文件路径,路径协议详见[附录-PathTypes](#PathTypes) |
| mode| Number| 是 | 文件打开模式,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#File "CONSTANT")中FileOpenModes |
| key| String| 是 | 密码 |

**返回值:**

Boolean类型,是否打开成功

**示例:**

```
var ret = uexFileMgr.openSecure('100', "wgt://secure.txt", '1', '123456');
alert(ret);
```

> ### createSecure 使用密码创建文件

`uexFileMgr.createSecure(id,path,key)`

**说明:**

使用密码创建文件

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |
| path| String| 是 | 文件路径,路径协议详见[附录-PathTypes](#PathTypes) |
| key| String| 是 | 密码 |

**返回值:**

Boolean类型,是否创建成功

**示例:**

```
var ret = uexFileMgr.createSecure('100', "wgt://data/test.txt", '123456');
alert ret;
```

> ### getFileCreateTime 获取文件或文件夹的创建时间

`uexFileMgr.getFileCreateTime(id,path)`

**说明:**

获取文件或文件夹的创建时间

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| Number| 是 | 文件唯一标识符 |
| path| String| 是 | 文件路径,路径协议详见[附录-PathTypes](#PathTypes) |

**返回值:**

String类型,创建时间

**示例:**

```
var timeStr = uexFileMgr.getFileCreateTime('33','wgt://test.txt');
alert(timeStr);
```

>### renameFile 重命名文件

`uexFileMgr.renameFile(param,cb)`

**说明:**

重命名文件

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| param| String| 是 | param是字典结构json字符串,详情见下 |
| cb | Function| 是 | 重命名结束后,会调用此函数,函数参数说明见下|

```
var param = {
	oldFilePath:,//必选 String 重命名前的文件路径
	newFilePath:,//必选 String 重命名后的文件路径
}
```

**回调参数:**

|  参数名称 | 参数类型  |  说明 |
| ----- | ----- | ----- |
| resultObj| Object | 重命名操作结果 |

```
var resultObj = {
	result:,//Number,必选.重命名成功时为1,失败时为0
}
```



**示例:**

```
var data = {
	oldFilePath:"wgt://1.txt",
	newFilePath:"wgt://2.txt"
}

uexFileMgr.renameFile(JSON.stringify(data),function(obj){
	if(obj.result == 1){
		alert("重命名成功!");
	}else{
		alert("重命名失败!");
	}
});
```

> ### search 搜索文件

`uexFileMgr.search(param,cb)`

**说明:**

搜索文件


**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| param| String| 是 | param是字典结构json字符串,详情见下 |
| cb | Function| 是 | 搜索操作结束后,会调用此函数,函数参数说明见下|

```
var param = {
	path:,//必选,String,目标文件夹路径
	option:,//可选 Number  搜索设置 见下 不传默认为0
	keywords:[]//可选 要搜索的文件名关键字 不传时搜索所有
	suffixes:[]//可选 要搜索的文件后缀名 不传时搜索所有
	}
```

|option|说明|
|-----|-----|
|1|匹配文件夹 也搜索符合条件的文件夹(有设置suffixes时,此项设置失效)|
|2|精确匹配 只搜索文件名恰为keyword的文件|
|4|递归搜索 搜索目标文件夹及其子文件夹|

* 需要多项option时 请将各option值相加再传入。比如传5 (=4+1),表示既递归搜索,又匹配文件夹

**回调参数:**

|  参数名称 | 参数类型  |  说明 |
| ----- | ----- | ----- |
| resultObj| Object | 搜索操作结果 |

```
var resultObj = {
	isSuccess:,//Boolean,必选.是否搜索成功
	result:,//Array,搜索成功时才有此参数.所有符合条件的路径构成的数组;若没有路径符合搜索条件,则为一个空数组
}
```

**示例:**

```
var data={
	path:"res://",
	option:5,
	keywords:["name1","name2","name3"],
	suffixes:["txt","xml"]
	}

uexFileMgr.search(JSON.stringify(data),function(obj){
	if(obj.isSuccess){
		alert(obj.result);
	}else{
		alert("搜索失败!");
	}
});
```

> ### getFileListByPath 获取某路径下的所有文件

`uexFileMgr.getFileListByPath(path)`

**说明:**

获取某路径下的所有文件


**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| path | String| 是 | 文件夹路径,支持wgt://, wgts://, file://协议路径,路径协议详见[附录-PathTypes](#PathTypes)|



**返回值:**

Array<FileInfo>类型,此路径下所有文件的信息构成的数组,文件信息结构如下

```
var FileInfo = {
	fileName:,//String,文件名
	filePath:,//String,文件路径
	fileType:,//Number,类型。0-文件 1-文件夹 
}
```

**示例:**

```
var path = "wgt://"
var result = uexFileMgr.getFileListByPath(path);
alert(result);
```

> ### getFileSizeByPath 通过路径获取文件大小

`uexFileMgr.getFileSizeByPath(params,cb)`

**说明:**

通过路径获取文件或文件夹大小

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| param| String| 是 | param是字典结构json字符串,详情见下 |
| cb | Function| 是 | 操作结束后,会调用此函数,函数参数说明见下|


```
var params = {
    id:,
    path:,
    unit:
}
```
各字段含义如下:

|  字段名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number| 是 | 唯一标识符,与回调方法中id对应 |
| path | String| 是 | 文件或文件夹路径,支持wgt://, wgts://, file://协议路径 ,路径协议详见[附录-PathTypes](#PathTypes) |
| unit | String| 否 | 文件大小单位,默认为"B",取值范围参考[unit](#GetFileSizeUnit) |

**回调参数:**

|  参数名称 | 参数类型  |  说明 |
| ----- | ----- | ----- |
| resultObj| Object | 搜索操作结果 |

```
var resultObj = {
	errorCode:,//Number, 0-获取成功 1-获取失败
	id:,//Number,唯一标识符
	unit,//String,文件大小单位
	data,//Number,文件大小
}

```


**示例:**

```
var params = {
	id:1,
 	path:"wgt://",
 	unit:"KB"
}
var data = JSON.stringify(params);
uexFileMgr.getFileSizeByPath(data,function(info){
	if(info.errorCode == 0){
		alert(info.data);
	}else{
		alert("ERROR!");
	}
});
```

> ### copyFile 复制单个文件

`uexFileMgr.copyFile(opID, srcFilePath, objPath,cb);`

**说明:**

复制单个文件



**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opID | String| 是 | 复制文件任务id |
| srcFilePath | String| 是 | 源文件路径,支持wgt://, wgts://, res://协议路径,路径协议详见[附录-PathTypes](#PathTypes)  |
| objPath | String| 是 | 目标文件夹路径,支持wgt://, wgts://, res://协议路径,路径协议详见[附录-PathTypes](#PathTypes)  |
| cb | Function| 是 | 操作结束后,会调用此函数,函数参数说明见下|

**回调参数:**

|  参数名称 | 参数类型  |  说明 |
| ----- | ----- | ----- |
| result| Boolean | 是否复制成功 |

**示例:**

```
var s = "res://1016.jpg";
var o = "wgt://";
uexFileMgr.copyFile('109',s,o,function(result){
	alert(result);
});
```



# 3、更新历史

### iOS

API版本:`uexFileMgr-3.0.25`

最近更新时间:`2016-5-10`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.25 | 添加base64支持 |
| 3.0.24 | 改用bundle方式引用资源,修复IDE插件文件浏览器图标丢失的bug |
| 3.0.23 | 修改工程为ARC;修复在复用窗口中使用时回调丢失的bug |
| 3.0.22 | 新增copyFile接口 |
| 3.0.21 | 新增getFileSizeByPath接口 |
| 3.0.20 | 修改能够直接返回到应用程序界面,而不能通过该页面返回到附件的父目录下 |
| 3.0.19 | 添加IDE支持 |
| 3.0.18 | 删除info.plist |
| 3.0.17 | 添加国际化支持 |
| 3.0.16 | getFileListByPath不再返回其子目录下的文件路径 |
| 3.0.15 | 修复pptx和xlsx没有图标的问题 |
| 3.0.14 | getFileRealPath可以设定回调方法 |
| 3.0.13 | 新增getFileListByPath |
| 3.0.12 | 新增方法uexFileMgr.search 搜索文件 |
| 3.0.11 | 新增cbWriteFile回调方法,优化RC4加密 |
| 3.0.10 | 解决多选文件打开浏览器显示空白问题 |
| 3.0.9 | 新增方法uexFileMgr.renameFile 重命名文件 |
| 3.0.8 | 修复uexFileMgr.multiExplorer(path)中path参数无效的BUG |
| 3.0.7 | 修改创建时间接口的名称 |
| 3.0.6 | 增加获取文件创建时间的新接口 |
| 3.0.5 | 修改8.0以上系统崩溃问题 |
| 3.0.4 | 适配文件浏览器横屏 |
| 3.0.3 | 修复文件单选浏览器,文件多时无法滑动到底的BUG； 修复单选和多选浏览器状态栏标题不一致问题 |
| 3.0.2 | 修复uexFileMgr.seekFile方法指定位置后 uexFileMgr.readNext方法还是从头读取的BUG |
| 3.0.1 | 修复选择本地照片崩溃的bug |
| 3.0.0 | 文件管理功能插件 |

### Android

API版本:`uexFileMgr-3.0.21`

最近更新时间:`2016-5-17`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.21 | 修正图片以Base64写入后打开失败的问题 |
| 3.0.20 | 修正部分成功失败的状态回调返回的回调数据类型错误的问题 |
| 3.0.19 | 修正readFile接口的option参数可以为空 |
| 3.0.18 | 修复多选文件时会导致显示选择数量不正确的问题 |
| 3.0.17 | 支持Base64读写 |
| 3.0.16 | 修复拒绝服务漏洞的问题 |
| 3.0.15 | 修改对文件的各种操作的opId支持非纯数字(与IOS保持一致) |
| 3.0.14 | 修正getFileRealPath获取plugin子应用路径错误的问题 |
| 3.0.13 | 新增复制文件的方法 |
| 3.0.12 | 新增通过路径获取文件大小方法 |
| 3.0.11 | 修改getFileRealPath指定回调名时,只回调一个参数(与ios统一)。 |
| 3.0.10 | 新增文件搜索接口 |
| 3.0.9 | 修复闪退的bug |
| 3.0.8 | 国际化 |
| 3.0.7 | 修改接口getFileRealPath,支持回调方法名称的传入 |
| 3.0.6 | 新增getFileListByPath方法获取指定目录中的文件列表 |
| 3.0.5 | 新增cbWriteFile回调方法 |
| 3.0.4 | 添加重命名接口 |
| 3.0.3 | 修复解析res://路径的getFileRealPath方法返回错误问题 |
| 3.0.2 | 修复res://协议下获取真实路径不正确的问题 |
| 3.0.1 | 新增获取文件或文件夹的创建时间 |
| 3.0.0 | 文件管理功能插件 |


# 4、附录

### GetFileSizeErrorCode

|  errorCode | 说明 |
| ----- | ----- |
| 0 | 获取成功|
| -1 | 无参数错误 |
| -2 | 当前路径文件或文件夹不存在 |
| -3 | 未知错误 |

### GetFileSizeUnit

| value | 说明 |
| ----- | ----- |
| B | 字节|
| KB | 1KB = 1024B |
| MB | 1MB = 1024KB |
| GB | 1GB = 1024MB |

### PathTypes

|  协议头 |  Android对应路径 (其中"/sdcard/"等 同于"/storage/emulated/0/") | iOS对应路径  |
| ------------ | ------------ | ------------ |
| res:// |widget/wgtRes/   |widget/wgtRes   |
| wgt:// | /storage/emulated/0/widgetone/apps/ xxx(widgetAppId)/  | /Documents/apps/xxx(widgetAppId)/ |
| wgts:// |  /storage/emulated/0/widgetone/widgets/ |  /Documents/widgets/ |
| file:///sdcard/ | /storage/emulated/0/  | 绝对路径  |

