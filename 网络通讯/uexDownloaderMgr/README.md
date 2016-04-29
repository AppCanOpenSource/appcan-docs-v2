[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
文件下载插件
## 1.1、说明
文件下载管理接口API,该对象主要封装了下载数据的接口,支持多个文件下载,断点续传下载,下载文件大小无限制。
 
## 1.2、UI展示
![](http://newdocx.appcan.cn/docximg/133313p2015r6s16g.png)

## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=169_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览
## 2.1、方法
> ### createDownloader     创建下载对象

`uexDownloaderMgr.createDownloader(id)`

**说明:**

创建下载对象,同一id只能被创建一次。此方法执行后会回调[cbCreateDownload](#cbCreateDownloader 创建下载对象是否成功的回调方法 "cbCreateDownload")方法。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 下载对象唯一标识符     |

**平台支持:**

Android2.2+                    
iOS6.0+    

**版本支持:**

3.0.0+

**示例:**

```
uexDownloaderMgr.createDownloader(1);
```

> ### setHeaders     设置请求头

`uexDownloaderMgr.setHeaders(1, json)`

**说明:**

设置请求头

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 上传对象的唯一标识符     |
| json | Json类型 | 是 | 请求头信息 |

**平台支持:**

Android2.2+  
iOS6.0+  

**版本支持:**

3.0.0+

**示例:**

```
var headJson = '{"Content-type":"application/json;charset=utf-8"}';
uexDownloaderMgr.setHeaders(1, headJson);
```

> ### download     下载文件

`uexDownloaderMgr.download(id,serverURL,savePath,mode)`

**说明:**

调用该接口时需确保创建过唯一标识符为id的下载对象。获取下载过程中的状态信息,可以采用监听方法[onStatus](#onStatus 下载状态改变的监听方法 "onStatus")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 用户自定义的下载对象唯一标识符 |
| serverURL | String | 是 | 服务器地址 |
| savePath | String | 是 | 本地保存地址 |
| mode | Number | 是 | 是否支持断点续传,0:不支持,1:支持|

**平台支持:**

Android2.2+                    
iOS6.0+    

**版本支持:**

3.0.0+

**示例:**

```
uexDownloaderMgr.download(1, "http://wallpaper.pocketdigi.com/upload/1/bigImage/1284565196.jpg", "wgt://data/down/1284565196.jpg",'1');
```

> ### cancelDownload     取消下载

`uexDownloaderMgr.cancelDownload(serverURL,clearMode)`

**说明:**

取消指定下载地址的下载任务

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| serverURL | String | 是 | 服务器下载地址     |
| clearMode | String | 否 | 默认为0。0-只取消此次下载任务,不清除已经下载的临时文件。 1-取消此次下载任务并清除已经下载的临时文件 |

    

**平台支持:**

Android2.2+                    
iOS6.0+    

**版本支持:**

3.0.0+

**示例:**

```
uexDownloaderMgr.cancelDownload("http://wallpaper.pocketdigi.com/upload/1/bigImage/1284565196.jpg");
```

> ### closeDownloader 关闭下载对象

`uexDownloaderMgr.closeDownloader(id)`

**说明:**

关闭下载对象

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 下载对象唯一标识符     |

    

**平台支持:**

Android2.2+                    
iOS6.0+    

**版本支持:**

3.0.0+

**示例:**

```
uexDownloaderMgr.closeDownloader(1);
```

> ### getInfo     获取下载对象的相关信息

`uexDownloaderMgr.getInfo(serverURL)`

**说明:**

获取下载对象的相关信息, 其回调函数是[cbGetInfo](#cbGetInfo 获取下载信息的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| serverURL | String | 是 | 服务器下载地址    |

**平台支持:**

Android2.2+  
iOS6.0+  

**版本支持:**

3.0.0+

**示例:**

```
uexDownloaderMgr.getInfo("http://wallpaper.pocketdigi.com/upload/1/bigImage/1284565196.jpg");
```

## 2.2、回调方法

> ### cbCreateDownloader 创建下载对象是否成功的回调方法

`uexDownloaderMgr.cbCreateDownloader(opId,dataTpye,data)`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number| 是 | 下载对象的唯一标识符 |
| dataType|Number | 是 | 参数类型详见[CONTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975 "CONTANT")中Callback方法dataType数据类型 |
| data|Number | 是 | 回调的int型的数据,0-成功,1-失败 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexDownloaderMgr.cbCreateDownloader = function(opCode,dataType,data){
    switch(dataType){
    case cText:
        alert("uex.cText");
        break;
    case cJson:
        alert("uex.cJson");
        break;
    case cInt:
        if(data == 0){
            alert("创建成功");
        }else{
            alert("创建失败");
        }
        break;
    default:
        alert("error");
}
```

> ### cbGetInfo 获取下载信息的回调方法

`uexDownloaderMgr.cbGetInfo(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number| 是 | 下载对象的唯一标识符 |
| dataType|Number | 是 | 参数类型详见[CONTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975 "CONTANT")中Callback方法dataType数据类型 |
| data| String | 是 | json格式数据 |

**平台支持:**

Android2.2+
iOS6.0+

** 版本支持:**
3.0.0+

**示例:**

```
uexDownloaderMgr.cbGetInfo = function(opCode,dataType,data){
    switch(dataType){
    case cText:
        alert("uex.cText");
        break;
    case cJson:
        if(data == null || data.length == 0){
            alert("无数据");
            return;
        }
        alert(data);
        var info = eval('('+data+')');
        document.getElementById('fileInfo').innerHTML ="文件路径:"+info.savePath+"<br>文件大小:"+info.fileSize+"<br>已下载:"+info.currentSize+"<br>下载时间:"+info.lastTime;
        break;
    case cInt:
        alert("uex.cInt");
        break;
    default:
        alert("error");
    }
}
```

## 2.3、监听方法

> ### onStatus 下载状态改变的监听方法

`uexDownloaderMgr.onStatus(opId,fileSize,percent,status)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number| 是 | 下载对象的唯一标识符id |
| fileSize|Number | 是 | 文件大小 |
| percent|Number | 是 | 下载文件的百分比|
| status|Number | 是 | 下载的状态,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#DownLoad "CONSTANT")中DownloadStatus|

**平台支持:**

Android2.2+    
iOS6.0+  

**版本支持:**

3.0.0+    

**示例:**

```
uexDownloaderMgr.onStatus = function(opCode,fileSize,percent,status){
    switch (status) {
        case 0:
            document.getElementById('percentage').innerHTML ="文件大小:"+fileSize+"字节<br>下载进度:"+percent;
            break;
        case 1:
            alert("下载完成");
            uexDownloaderMgr.closeDownloader(opCode);
            break;
        case 2:
            alert("下载失败");
            uexDownloaderMgr.closeDownloader(opCode);
            break;
        case 3:
            alert("已取消下载");
            break;
    }
}
```

# 3、更新历史

### iOS

API版本:`uexDownloaderMgr-3.0.14`

最近更新时间:`2016-3-2`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.14 | 修复在复用窗口中使用时回调丢失的bug |
| 3.0.13 | 添加IDE支持 |
| 3.0.12 | 修改了下载时进度条不动的BUG |
| 3.0.11 | 修改请求的变量 |
| 3.0.10 | 修改clean方法 |
| 3.0.9 | 验证的请求头的中的appid与key不匹配 |
| 3.0.8 | 判断当前的验证的请求头的属于的应用 |
| 3.0.7 | xcode7修正 |
| 3.0.6 | 兼容打包脚本 |
| 3.0.5 | 修改了请求头的验证 |
| 3.0.4 | 支持https,导入证书。 |
| 3.0.3 | 支持https |
| 3.0.2 | 为和文档保持统一增加uexDownloader Mgr.cancelDownload接口 |
| 3.0.1 | 新增setHeaders接口 |
| 3.0.0 | 下载管理功能插件 |

### Android

API版本:`uexDownloaderMgr-3.0.14`

最近更新时间:`2016-3-2`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.14 | 修复下载过程中下载进度过快导致应用异常的问题。 |
| 3.0.13 | 修复有些url被encode不能下载的问题 |
| 3.0.12 | 修复下载过程中崩溃的问题(由于与其他插件使用的数据库同名造成的)。 |
| 3.0.11 | 修复调用cancelDownload之后,即使不清除已下载的临时文件,下次下载时不能断点续传的问题 |
| 3.0.10 | 增加新的 header以及plugin里面的子应用的appId和appkey都按照主应用为准 |
| 3.0.9 | 增加appVerify校验头 |
| 3.0.8 | https下载时可以支持预置证书；增大下载缓冲区；支持中文url;增强稳定性 |
| 3.0.7 | 修复不支持HTTPS问题 |
| 3.0.6 | 新增setHeaders接口 |
| 3.0.5 | 引擎更新后,修复取消下载提示不准确的问题 |
| 3.0.4 | 修复下载速度慢的问题,修复取消下载提示不准确问题 |
| 3.0.3 | 新增接口cancelDownload |
| 3.0.2 | 修复下载速度的问题 |
| 3.0.1 | 修复下载完成之后,无法打开,文件不存在的问题 |
| 3.0.0 | 下载管理功能插件 |
