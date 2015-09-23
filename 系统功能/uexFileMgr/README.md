[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
该对象主要封装了文件操作，主要包含创建文件，打开文件，以及文件提供过路径或者文件对象进行文件增，删，改，查等，读取文件内容，限utf-8编码txt文件，以及文本阅读器等多个接口。

## 1.1、说明
文件路径包括：wgt://...，res://...，wgts://...，box://...，file://...，http://...。
其中：wgt://...对应widget的沙盒根路径，可读可写；
	res://...对应widget目录下的wgtRes路径，只可读不可写。
关于文件路径的使用，可调用uexFileMgr.getFileRealPath接口获得文件真实路径作为参考

## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/151401f2015r6l7o.jpg)

## 1.3、开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=172_index) 插件中心至插件详情页 （插件测试用例与插件源码已经提供）

# 2、API概览

## 2.1、方法

> ### createFile 创建文件

`uexFileMgr.createFile(id,path)`

**说明:**
创建文件，同一id只能被创建一次。回调方法[cbCreateFile](#cbCreateFile 创建文件的回调方法 "cbCreateFile")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 唯一标识符 |
| path|String | 是 | 文件路径，路径协议详见CONSTANT中PathTypes |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

** 示例:**

```
	var path = "wgt://data/test.txt";
	uexFileMgr.createFile('1', path);
```

> ### createDir 创建文件夹

`uexFileMgr.createDir(id,dirPath)`

**说明:**
  创建文件夹,回调方法[cbCreateDir](#cbCreateDir 创建文件夹的回调方法 "cbCreateDir")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 唯一标识符 |
| dirPath|String | 是 | 文件夹路径，路径协议详见CONSTANT中PathTypes |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
var path = "wgt://data/test2/";
uexFileMgr.createDir('20', path);
```

> ### openFile 打开文件

`uexFileMgr.openFile(id,path,mode)`

**说明:**
打开文件，回调方法[cbOpenFile](#cbOpenFile 打开文件的回调方法 "cbOpenFile")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 唯一标识符 |
| path|String | 是 | 文件路径，路径协议详见CONSTANT中PathTypes |
| mode|String | 是 | 文件打开模式，详见CONSTANT中FileOpenModes |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.openFile(1,"res://reader.txt",1);
```

> ### deleteFileByPath 根据路径删除文件

`uexFileMgr.deleteFileByPath(path)`

**说明:**
根据路径删除文件,回调方法[cbDeleteFileByPath](#cbDeleteFileByPath 根据路径删除文件的回调方法 "cbDeleteFileByPath")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| path|String | 是 | 文件路径，路径协议详见CONSTANT中PathTypes |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.deleteFileByPath("wgt://data/test.txt");
```

> ### deleteFileByID 根据id删除文件

`uexFileMgr.deleteFileByID(id)`

**说明:**
根据id删除文件,回调方法[cbDeleteFileByID](#cbDeleteFileByID 根据id删除文件的回调方法 "cbDeleteFileByID")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.deleteFileByID(1);
```

> ### isFileExistByPath 根据路径判断文件是否存在

`uexFileMgr.isFileExistByPath(id, path)`

 **说明:**
根据路径判断文件是否存在,回调方法[cbIsFileExistByPath](#cbIsFileExistByPath 根据路径判断文件是否存在的回调方法 "cbIsFileExistByPath")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id | Number | 是 | 文件的唯一标识符，与回调函数中的opId对应 |
| path |String | 是 | 文件路径，路径协议详见CONSTANT中PathTypes |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.isFileExistByPath(2,"wgt://data/test.txt");
```

> ### isFileExistByID 根据id判断文件是否存在

`uexFileMgr.isFileExistByID(id)`

**说明:**
根据id判断文件是否存在,回调方法[cbIsFileExistById](#cbIsFileExistByID 根据id判断文件是否存在的回调方法 "cbIsFileExistById")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.isFileExistByID('2');
```

> ### getFileTypeByPath 根据路径获取文件类型

`uexFileMgr.getFileTypeByPath(path)`

**说明:**
根据路径获取文件类型,回调方法[cbGetFileTypeByPath](#cbGetFileTypeByPath 根据路径获取文件类型的回调方法 "cbGetFileTypeByPath")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| path|String | 是 | 文件路径，路径协议详见CONSTANT中PathTypes |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.getFileTypeByPath("wgt://data/test.txt");
```

> ### getFileTypeByID 根据id获取文件类型

`uexFileMgr.getFileTypeByID(id)`

**说明:**
根据id获取文件类型,回调方法[cbGetFileTypeById](#cbGetFileTypeByID 根据id获取文件类型的回调方法 "cbGetFileTypeById")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.getFileTypeByID('4');
```
> ### explorer 文件管理器

`uexFileMgr.explorer(path)`

**说明:**
文件管理器,回调方法[cbExplorer](#cbExplorer 文件管理器的回调方法 "cbExplorer")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| path|String | 是 | 文件路径，路径协议详见CONSTANT中PathTypes |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.explorer("/sdcard/widgetone");
```

> ### multiExplorer 文件管理器(多选)

`uexFileMgr.multiExplorer(path)`

 **说明:**
文件管理器，支持选择多个文件,回调方法[cbMultiExplorer](#cbMultiExplorer 文件管理器(多选)的回调方法 "cbMultiExplorer")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| path|String | 是 | 文件路径，路径协议详见CONSTANT中PathTypes |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
uexFileMgr.multiExplorer("/sdcard/widgetone");
```

> ### seekFile 定位到文件某一位置

`uexFileMgr.seekFile(id,len)`

**说明:**
定位到文件某一位置

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |
| len| Number| 是 |字节数 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
uexFileMgr.openFile('1', "wgt://test.txt", '1');
uexFileMgr.seekFile('1', '1');
```

> ### seekBeginOfFile 定位到起始位置

`uexFileMgr.seekBeginOfFile(id)`

**说明:**
定位到起始位置

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.openFile('1', "wgt://test.txt", '1');
uexFileMgr.seekBeginOfFile('1');
```

> ### seekEndOfFile 定位到结束位置

`uexFileMgr.seekEndOfFile(id)`

**说明:**
定位到结束位置

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.openFile('1', "wgt://test.txt", '1');
uexFileMgr.seekEndOfFile('1');
```

> ### writeFile 写文件

`uexFileMgr.writeFile(id,mode,data)`

**说明:**
写文件，回调方法[cbWriteFile](#cbWriteFile 写文件的回调方法 "cbWriteFile")　　

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |
| mode| Number| 是 |写文件的模式，详见CONSTANT中writeFilemode |
| data| String| 是 |要写入的数据 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
    uexFileMgr.openFile('1', "wgt://test.txt", '1');
    uexFileMgr.writeFile('1', '0', "test");
```

> ### readFile 读文件

`uexFileMgr.readFile(id,len)`

**说明:**
读文件,回调方法[cbReadFile](#cbReadFile 读文件的回调方法 "cbReadFile")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |
| len| Number| 是 |字节数,"-1"-全部读取|

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
 
```
    uexFileMgr.openFile('1', "wgt://test.txt", '1');
    uexFileMgr.readFile('1', -1);
```

> ### getFileSize 获取文件大小

`uexFileMgr.getFileSize(id)`

**说明:**
获取文件大小,回调方法[cbGetFileSize](#cbGetFileSize 获取文件大小的回调方法 "cbGetFileSize")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
    uexFileMgr.openFile('1', "wgt://test.txt", '1');
    uexFileMgr.getFileSize('1');
```

> ### getFilePath 获取文件路径

`uexFileMgr.getFilePath(id)`

**说明:**
获取文件路径, 回调方法[cbGetFilePath](#cbGetFilePath 获取文件路径的回调方法 "cbGetFilePath")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
    uexFileMgr.openFile('1', "wgt://test.txt", '1');
    uexFileMgr.getFilePath('1');
```
> ### getFileRealPath 获取文件实际路径

`uexFileMgr.getFileRealPath(path)`

**说明:**
获取文件实际路径,回调方法[cbGetFileRealPath](#cbGetFileRealPath 获取文件实际路径的回调方法 "cbGetFileRealPath")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| path| String| 是 | 文件路径，路径协议详见CONSTANT中PathTypes |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.getFileRealPath("wgt://data/test.txt");
```

> ### closeFile 关闭文件

`uexFileMgr.closeFile(id)`

**说明:**
关闭文件

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.closeFile(1);
```
> ### getReaderOffset 获取文件偏移值

`uexFileMgr.getReaderOffset(id)`

**说明:**
获取文件偏移值, 回调方法[cbGetReaderOffset](#cbGetReaderOffset 获取文件偏移值的回调方法 "cbGetReaderOffset")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
    uexFileMgr.getReaderOffset(1);
```

> ### readPercent 读百分比对应位置的字符

`uexFileMgr.readPercent(id,percent,len)`

**说明:**
读百分比对应位置的字符,回调方法[cbReadPercent](#cbReadPercent 读百分比对应位置的字符的回调方法 "cbReadPercent")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |
| percent| Number| 是 | 百分比（不带百分号） |
| len| Number| 是 | 字节数，读取百分比之后的字节长度 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.readPercent('1','20','3');
```

> ### readNext 读取下一页字符

`uexFileMgr.readNext(id,len)`

**说明:**
读取下一页字符, 回调方法[cbReadNext](#cbReadNext 读取下一页字符的回调方法 "cbReadNext")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |
| len| Number| 是 | 字节数 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.readNext('1', '20');
```

> ### readtextarea 读取上一页字符

`uexFileMgr.readtextarea(id,len)`

**说明:**
读取上一页字符, 回调方法[cbReadtextarea](#cbReadtextarea 读取上一页字符的回调方法 "cbReadtextarea")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |
| len| Number| 是 | 字节数 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.readtextarea('1','20');
```

> ### openSecure 使用密码打开文件

`uexFileMgr.openSecure(id,path,mode,key)`

**说明:**
使用密码打开文件,回调方法[cbOpenSecure](#cbOpenSecure 使用密码打开文件的回调方法 "cbOpenSecure")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |
| path| String| 是 | 文件路径，路径协议详见CONSTANT中PathTypes |
| mode| Number| 是 | 文件打开模式，详见CONSTANT中FileOpenModes |
| key| String| 是 | 密码 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.openSecure('100', "wgt://secure.txt", '1', '123456');
```

> ### createSecure 使用密码创建文件

`uexFileMgr.createSecure(id,path,key)`

**说明:**
使用密码创建文件, 回调方法[cbCreateSecure](#cbCreateSecure 使用密码创建文件的回调方法 "cbCreateSecure")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |
| path| String| 是 | 文件路径，路径协议详见CONSTANT中PathTypes |
| key| String| 是 | 密码 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.createSecure('100', "wgt://data/test.txt", '123456');
```

> ### getFileCreateTime 获取文件或文件夹的创建时间

`uexFileMgr.getFileCreateTime(id,path)`

**说明:**
获取文件或文件夹的创建时间, 回调方法[cbGetFileCreateTime](#cbGetFileCreateTime 使用获取文件或文件夹创建时间的回调方法 "cbGetFileCreateTime")

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| id| Number| 是 | 文件唯一标识符 |
| path| String| 是 | 文件路径，路径协议详见CONSTANT中PathTypes |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**

```
uexFileMgr.getFileCreateTime('33','wgt://test.txt');
```


>### renameFile 重命名文件

`uexFileMgr.renameFile(param)`

**说明:**

重命名文件

回调方法[cbRenameFile](#cbRenameFile 重命名文件的回调方法)

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| param| String| 是 | param是字典结构json字符串，详情见下 |

```
var param = {
	oldFilePath:,//必选 String 重命名前的文件路径
	newFilePath:,//必选 String 重命名后的文件路径
}
```



**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

iOS 3.0.9+
Androd 3.0.4+

**示例:**

```
var data = {
	oldFilePath:"wgt://1.txt",
	newFilePath:"wgt://2.txt"
}

uexFileMgr.renameFile(JSON.stringify(data));
```



>### search 搜索文件

`uexFileMgr.search(param)`

**说明:**

搜索文件

回调方法[cbSearch](#cbSearch 搜索文件的回调方法)

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| param| String| 是 | param是字典结构json字符串，详情见下 |


```
var param = {
	path:,//必选,String,目标文件夹路径
	option:,//可选 Number  搜索设置 见下 不传默认为0
	keywords:[]//可选 要搜索的文件名关键字 不传时搜索所有
	suffixes:[]//可选 要搜索的文件后缀名 不传时搜索所有
	}
```

|option|说明|
|---|---|
|1|匹配文件夹 也搜索符合条件的文件夹(有设置suffixes时，此项设置失效)|
|2|精确匹配 只搜索文件名恰为keyword的文件|
|4|递归搜索 搜索目标文件夹及其子文件夹|

* 需要多项option时 请将各option值相加再传入。比如传5 (=4+1)，表示既递归搜索，又匹配文件夹


**平台支持:**


iOS6.0+

**版本支持:**

iOS 3.0.12+


**示例:**

```
var data={
	path:"res://",
	option:5,
	keywords:["name1","name2","name3"],
	suffixes:["txt","xml"]
	}

uexFileMgr.search(JSON.stringify(data));
```


## 2.2、回调方法

> ### cbCreateFile 创建文件的回调方法

`uexFileMgr.cbCreateFile(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|Number | 是 | 返回uex.cSuccess或uex.cFailed，详见CONTANT中CallbackInt类型数据 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    uexFileMgr.cbCreateFile = function(opId, dataType, data) {
        if (data == 0) {
            alert("创建文件成功");
        } else {
            alert("创建文件失败");
        }
    }
```

> ### cbCreateDir 创建文件夹的回调方法

`uexFileMgr.cbCreateDir(opId,dataType,data)`

 **参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|Number | 是 | 返回uex.cSuccess或uex.cFailed，详见CONTANT中CallbackInt类型数据 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbCreateDir = function(opId, dataType, data) {
            if (data == 0) {
                alert("创建文件夹成功");
            } else {
                alert("创建文件夹失败");
            }
        }
```

> ### cbOpenFile 打开文件的回调方法

`uexFileMgr.cbOpenFile(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|Number | 是 | 返回uex.cSuccess或uex.cFailed，详见CONTANT中CallbackInt类型数据 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbOpenFile=function(opId,dataType,data){
            if(data == 0){
                alert("打开文件成功");
            }else{
                alert("打开文件失败");
            }
        }
```

> ### cbDeleteFileByPath 根据路径删除文件的回调方法

`uexFileMgr.cbDeleteFileByPath(opId,dataType,data)`

 **参数: **
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|Number | 是 | 返回uex.cSuccess或uex.cFailed，详见CONTANT中CallbackInt类型数据 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbDeleteFileByPath = function(opId, dataType, data) {
            if (data == 0) {
                alert("删除成功");
            } else {
                alert("删除失败");
            }
        }
```

> ### cbDeleteFileByID 根据id删除文件的回调方法

`uexFileMgr.cbDeleteFileByID(opId,dataType,data)`

 **参数: **
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|Number | 是 | 返回uex.cSuccess或uex.cFailed，详见CONTANT中CallbackInt类型数据 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbDeleteFileByID = function(opId, dataType, data) {
            if (data == 0) {
                alert("删除成功");
            } else {
                alert("删除失败");
            }
        }
```

> ### cbIsFileExistByPath 根据路径判断文件是否存在的回调方法

`uexFileMgr.cbIsFileExistByPath(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|Number | 是 | 返回的int型的数据，1-存在；0-不存在 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbIsFileExistByPath = function(opId, dataType, data) {
            if (data == 0) {
                alert("文件不存在");
            } else if (data == 1) {
                alert("文件存在");
            } else {
                alert(data);
            }
        }
```

> ### cbIsFileExistByID 根据id判断文件是否存在的回调方法

`uexFileMgr.cbIsFileExistByID(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|Number | 是 | 返回的int型的数据，1-存在；0-不存在 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbIsFileExistById = function(opId, dataType, data) {
            if (data == 0) {
                alert("文件不存在");
            } else if (data == 1) {
                alert("文件存在");
            } else {
                alert(data);
            }
        }
```

> ### cbGetFileTypeByPath 根据路径获取文件类型的回调方法

`uexFileMgr.cbGetFileTypeByPath(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|Number | 是 | 返回的int型的数据，1-文件夹；0-文件 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbGetFileTypeByPath = function(opId, dataType, data) {
            if (data == 1) {
                alert("是文件夹");
            } else if (data == 0) {
                alert("是文件");
            } else {
                alert(data);
            }
        }
```

> ### cbGetFileTypeByID 根据id获取文件类型的回调方法

 `uexFileMgr.cbGetFileTypeByID(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|Number | 是 | 返回的int型的数据，1-文件夹；0-文件 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbGetFileTypeById = function(opId, dataType, data) {
            if (data == 1) {
                alert("是文件夹");
            } else if (data == 0) {
                alert("是文件");
            } else {
                alert(data);
            }
        }
```

> ### cbExplorer 文件管理器的回调方法

`uexFileMgr.cbExplorer(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|String | 是 | 返回文件管理器里选择的文件路径 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbExplorer = function(opId, dataType, data) {
            alert(data);
        }
```

> ### cbMultiExplorer 文件管理器(多选)的回调方法

`uexFileMgr.cbMultiExplorer(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|String | 是 | 返回文件管理器里选择的文件的路径列表,json格式如下：Key:索引值，从零开始;Value：返回的路径{"2":"/sdcard/DCIM/IMG_0003.JPG","1":"/sdcard/DCIM/1337569458885.png","0":"/sdcard/Apks/com.aurorasoftworks4.apk"} |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbMultiExplorer = function(opId, dataType, data) {
            var text="";
            var jsonList=eval("("+data+")");
            if(jsonList.length == 0){
                alert("无数据");
            }     
            for(var key in jsonList){          
                text+=jsonList[key]+"<br>";
            }
            alert(text);
        }
```
> ###cbWriteFile 写文件的回调方法

`uexFileMgr.cbWriteFile(opCode,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opCode| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|Number | 是 |  0- 成功 1-失败 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbWriteFile(opCode,dataType,data) {
            alert(data);
        }
```
> ### cbReadFile 读文件的回调方法

`uexFileMgr.cbReadFile(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|String | 是 | 返回文件的内容 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbReadFile = function(opId, dataType, data) {
            alert(data);
        }
```
> ### cbGetFileSize 获取文件大小的回调方法

`uexFileMgr.cbGetFileSize(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|String | 是 | 返回文件的大小 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbGetFileSize = function(opId, dataType, data) {
            alert("文件长度：" + data);
        }
```
> ### cbGetFilePath 获取文件路径的回调方法

`uexFileMgr.cbGetFilePath(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|String | 是 | 返回文件的路径 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbGetFilePath = function(opId, dataType, data) {
            alert("文件路径：" + data);
        }
```

> ### cbGetFileRealPath 获取文件实际路径的回调方法

`uexFileMgr.cbGetFileRealPath(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|String | 是 | 返回文件的真实路径 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbGetFileRealPath = function(opId, dataType, data) {
            alert("文件的真实路径：" + data);
        }
```

> ### cbGetReaderOffset 获取文件偏移值的回调方法

`uexFileMgr.cbGetReaderOffset(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|String | 是 | 返回文件的偏移量 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbGetReaderOffset=function(opId,dataType,data){
            alert(data);
        }
```
> ### cbReadPercent 读百分比对应位置的字符的回调方法

`uexFileMgr.cbReadPercent(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|String | 是 | 返回文件的内容 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbReadPercent =function(opId,dataType,data){
            alert(data);
        }
```

> ### cbReadNext 读取下一页字符的回调方法

`uexFileMgr.cbReadNext(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|String | 是 | 返回文件的内容 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbReadNext = function(opId,dataType,data){
            alert(data);
        }
```

> ### cbReadtextarea 读取上一页字符的回调方法

`uexFileMgr.cbReadtextarea(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|String | 是 | 返回文件的内容 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbReadtextarea = function(opId,dataType,data){
            alert(data);
        }
```

> ### cbOpenSecure 使用密码打开文件的回调方法

`uexFileMgr.cbOpenSecure(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|Number | 是 | 返回uex.cSuccess或者uex.cFailed，详见CONSTANT中Callbackint类型数据 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbOpenSecure = function(opId, dataType, data) {
            if (data == 0) {
                alert(opId+"打开加密文件成功");
            } else {
                alert(opId+"打开加密文件失败");
            }
        }
```

> ### cbCreateSecure 使用密码创建文件的回调方法

`uexFileMgr.cbCreateSecure(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|Number | 是 | 返回uex.cSuccess或者uex.cFailed，详见CONSTANT中Callbackint类型数据 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
        uexFileMgr.cbCreateSecure = function(opId, dataType, data) {
            if (data == 0) {
                alert("创建加密文件成功");
            } else {
                alert("创建加密文件失败");
            }
        }
```

> ### cbGetFileCreateTime 使用获取文件或文件夹创建时间的回调方法

`uexFileMgr.cbGetFileCreateTime(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId| Number| 是 | 唯一标识符 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|String | 是 | 返回创建时间 |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
uexFileMgr.cbGetFileCreateTime = function(opId,dataType,data){
    alert(data);
};
```



>### cbRenameFile 重命名文件的回调方法

`uexFileMgr.cbRenameFile(param)`

**说明:**

重命名文件的回调方法



**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| param| String| 是 | param是字典结构json字符串，详情见下 |

```
var param = {
	result:,//String,必选 重命名结果  "0" 失败  "1" 成功 
}

```


**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

iOS 3.0.9+
Androd 3.0.4+


**示例:**

```
uexFileMgr.cbRenameFile=function (info){
	alert(info);
}
```

>### cbSearch 搜索文件的回调方法

`uexFileMgr.cbSearch(param)`

**说明:**

搜索文件的回调方法



**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| param| String| 是 | param是字典结构json字符串，详情见下 |

```
var param = {
	isSuccess:,//true false
	result:[],//文件路径数组
}

```
* 文件名规则
	* 如果是文件，传完整文件名,比如:"1.txt" 
	* 如果是文件夹，则以"/"结尾,比如:"dir/"

* 文件路径规则
	* 如果在目标文件夹下 传"文件名"  比如"1.txt"
	* 如果在其子文件夹下 传"/子文件夹1/子文件夹2/.../文件名"  比如:"dir/1.txt" "dir/dir2/"


**平台支持:**

iOS6.0+

**版本支持:**

iOS 3.0.12+


**示例:**

```
uexFileMgr.cbSearch=function (info){
	alert(info);
}
```

# 3、更新历史
API 版本：uexFileMgr-3.0.12(iOS) uexFileMgr-3.0.5（Android）
最近更新时间：2015-09-10

|  历史发布版本 | iOS更新  | 安卓更新  |
| ------------ | ------------ | ------------ |
| 3.0.12  |新增方法uexFileMgr.searcg 搜索文件|   |
| 3.0.11  |新增cbWriteFile回调方法，优化RC4加密|   |
| 3.0.10  | 解决多选文件打开浏览器显示空白问题  |   |
| 3.0.9  | 新增方法uexFileMgr.renameFile 重命名文件  |   |
| 3.0.8  | 修复uexFileMgr.multiExplorer(path)中path参数无效的BUG  |    |
| 3.0.7  |  修改创建时间接口的名称 |   |
| 3.0.6  | 增加获取文件创建时间的新接口  |   |
| 3.0.5  | 修改8.0以上系统崩溃问题  | 新增cbWriteFile回调方法  |
| 3.0.4 |  适配文件浏览器横屏 |   添加重命名接口|
| 3.0.3  |修复文件单选浏览器，文件多时无法滑动到底的BUG； 修复单选和多选浏览器状态栏标题不一致问题   | 修复解析res://路径的getFileRealPath方法返回错误问题  |
| 3.0.2  | 修复uexFileMgr.seekFile方法指定位置后 uexFileMgr.readNext方法还是从头读取的BUG  | 修复res://协议下获取真实路径不正确的问题  |
| 3.0.1  | 修复选择本地照片崩溃的bug  | 新增获取文件或文件夹的创建时间|
| 3.0.0  |   | 文件管理功能插件|
