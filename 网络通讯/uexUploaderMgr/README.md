[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
文件上传管理接口插件
## 1.1、说明
 文件上传管理接口API
## 1.2、UI展示
![](http://newdocx.appcan.cn/docximg/133734g2015g6g16d.png)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=193_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法
> ### createUploader 创建上传对象

`uexUploaderMgr.createUploader(id, serverURL)`

**说明:**

创建上传对象,同一id只能被创建一次。获取该方法执行的结果,可以利用回调方法[cbCreateUploader](#cbCreateUploader 创建上传对象是否成功的回调方法 "cbCreateUploader")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
|  id | Number | 是 | 唯一标识符 |
| serverURL | String | 是 |  服务器地址 |

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexUploaderMgr.createUploader(1, "http://te.3g2win.com/pidginimg/upload.php");
```

> ### closeUploader 关闭上传对象

`uexUploaderMgr.closeUploader(id)`

**说明:**

关闭上传对象

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
|  id | Number | 是 | 唯一标识符 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

  

```
uexUploaderMgr.closeUploader(1);
```

> ### setHeaders 设置请求头

`uexUploaderMgr.setHeaders(id, json)`

** 说明:**
设置http请求头

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 上传对象的唯一标识符     |
| json | Json类型 | 是 | 请求头信息 |

**平台支持:**

Android2.2+
iOS6.0+

** 版本支持:**
3.0.0+

**  示例:**

```
var headJson = '{"Content-type":"application/json;charset=utf-8"}';
uexUploaderMgr.setHeaders(1, headJson); 
```

> ### uploadFile 上传文件

`uexUploaderMgr.uploadFile(id, filePath, inputName, quality, maxWidth)`

** 说明:**
上传文件,调用该接口时需确保创建过唯一标识符为id的上传对象。获取文件上传过程中的信息,可以采用监听方法[onStatus](#onStatus 上传状态的监听方法 "onStatus")

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id | Number | 是 | 上传对象的唯一标识符     |
| filePath | String | 是 | 需要上传的文件路径。详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path%20Types "CONSTANT")中PathTypes |
| inputName | String | 是 | 页面当中input标签的name属性 |
| quality | Number | 否 | 类型如果为图片,表示是否需要压缩及压缩质量。 0:不压缩 1:高质量压缩 2:中质量压缩 3:低质量压缩|
| maxWidth | Number | 否 | 类型如果为图片,图片按尺寸等比压缩的最大宽度 |

**平台支持:**

Android2.2+
iOS6.0+

** 版本支持:**
3.0.0+

**  示例:**

```
uexUploaderMgr.uploadFile(1,"res://uexCoverFlow2_tupian.png","inputName",0);
```

## 2.2、回调方法
> ### cbCreateUploader 创建上传对象是否成功的回调方法

`uexUploaderMgr.cbCreateUploader(opId, dataType, data)`

** 参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number| 是 | 操作ID,在此函数中不起作用,可忽略 |
| dataType|Number | 是 | 参数类型详见[CONTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975 "CONTANT")中Callback dataType 数据类型 |
| data|Number | 是 | 返回uex.cSuccess或uex.cFailed,详见[CONTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback%20Data%20Types "CONTANT")中CallbackInt类型数据 |

**平台支持:**

Android2.2+
iOS6.0+

** 版本支持:**
3.0.0+

**  示例:**
```
function cbCreateUploader(id, dataType, data){
    if (data == 0) {
        alert("创建成功");
    } else {
        alert("创建失败");
    }
}
window.uexOnload = function() {
    uexUploaderMgr.cbCreateUploader = cbCreateUploader;
}
```

## 2.3、监听方法
> ### onStatus 上传状态的监听方法

uexUploaderMgr.onStatus(opId, fileSize, percent, serverPath, status)

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number| 是 | 上传对象唯一标识符 |
| fileSize| Number | 是 | 文件大小 |
| percent| Number | 是 | 上传文件的百分比|
| serverPath| String | 是 | 服务器上的路径|
| status| Number | 是 | 上传的状态,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#UpLoad%20Status "CONSTANT")中UpLoadStatus|

**平台支持:**

Android2.2+
iOS6.0+

**  版本支持:**
3.0.0+

**  示例:**
```
function onStatus(id, fileSize, percent, serverPath, status){
    switch (status) {
    case 0:
        document.getElementById('percentage').innerHTML = "文件大小:"+fileSize+"字节<br>上传进度:"+percent+"%";
        break;
    case 1:
        alert("上传成功,服务器路径为"+serverPath);
        break;
    case 2:
        alert("上传失败");
        break;
    }
}
window.uexOnload = function(){
    uexUploaderMgr.onStatus = onStatus;
}
```

# 3、更新历史

### iOS

API版本:`uexUploaderMgr-3.0.14`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.14 | .添加IDE支持 |
| 3.0.13 | 修改了上传进度条达不到100% |
| 3.0.12 | 修改clean方法,setAppVerify新增加appId的信息 |
| 3.0.11 | 验证的请求头的中的appid与key不匹配 |
| 3.0.10 | 判断当前的验证的请求头的属于的应用 |
| 3.0.9 | 当调用setHeader接口时,设置的请求头会为空 |
| 3.0.8 | 修改验证appkey的方法 |
| 3.0.7 | 修改了请求头的验证 |
| 3.0.6 | 支持https |
| 3.0.5 | 统一uexUploaderMgr插件Android和iOS的请求超时时间 |
| 3.0.4 | 修复uexUploaderMgr插件设置请求头不成功的问题 |
| 3.0.3 | uexUploaderMgr插件新增setHeaders接口 |
| 3.0.2 | 修复uexUploaderMgr.uploadFile接口不传"可选"参数会奔溃的bug |
| 3.0.1 | 修复上传过程中关闭window崩溃问题 |
| 3.0.0 | 上传功能插件 |

### Android

API版本:`uexUploaderMgr-3.0.8`

最近更新时间:`2016-1-11`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.8 | 修正plugin文件错误,导致uexFileMgr的plugin方法被覆盖的问题 |
| 3.0.7 | 增加新的 header以及plugin里面的子应用的appId和appkey都按照主应用为准 |
| 3.0.6 | 增加appVerify校验头 |
| 3.0.5 | 修复个别图片压缩导致的上传失败问题 |
| 3.0.4 | 修复不支持HTTPS问题 |
| 3.0.3 | 替换插件中引擎包及新增必要资源文件 |
| 3.0.2 | 新增setHeaders方法 |
| 3.0.1 | 修改UPLOAD上传慢问题 |
| 3.0.0 | 上传功能插件 |
