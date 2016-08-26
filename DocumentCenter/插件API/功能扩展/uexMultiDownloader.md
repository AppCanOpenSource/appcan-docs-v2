/*
Sort: 1
Toc: 1
*/

[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>
## 1.1、说明<ignore>
本插件封装了多任务多线程下载,断点续传功能.只用简单的传入下载url和要保存路径等信息就可以进行下载.

## 1.2、UI展示<ignore>

## 1.3、开源源码<ignore>
插件测试用例与源码下载:[点击](xxxx ) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览<ignore>

## 2.1、方法<ignore>

### 🍭 open 打开下载视图  

**说明:**  
打开下载视图  

**参数:**
  
```
var params = {
    x:,//x坐标
    y:,//y坐标
    w:,//下载器宽度
    h://下载器高度
};
```


**平台支持:**  
Android 2.2+  
iOS 6.0+

**版本支持:**  
Android 3.0.0+  
iOS 3.0.0+

**示例**

```
var params = {
    x:"0",
    y:"500",
    w:"1000",
    h:"1000"
};
var data = JSON.stringify(params);
uexMultiDownloader.open(data);
```

### 🍭 enqueue 添加下载任务
  
**说明:**
添加下载任务 回调函数[cbEnqueue](#cbEnqueue 添加下载任务时回调)
**参数:**  

```
var params = {
    url:,//下载链接
    savePath:,//保存路径
};
```
**平台支持:**  
Android 2.2+    
iOS 6.0+  

**版本支持:**  
Android 3.0.0+    
iOS 3.0.0+

**示例**

```
var params = {
    url:"http://down.360safe.com/360mobilemgr/360box_web.apk",
    savePath:"/sdcard/360/360box_web.apk"
};
var data = JSON.stringify(params);
uexMultiDownloader.enqueue(data);
```

### 🍭 close 关闭下载器  

**说明:**  
关闭下载器  

**参数:**

```
var params = {
};
```

**平台支持:**  
Android 2.2+  
iOS 6.0+

**版本支持:**

Android 3.0.0+  
iOS 3.0.0+

**示例**

```
var params = {
};
var data = JSON.stringify(params);
uexMultiDownloader.close(data);
```

## 2.2、回调方法<ignore>

### 🍭 cbEnqueue 添加下载任务时回调  

**参数:**  

```
var params = {
	result:,//0-成功,1-失败
};
```  

**平台支持:**  
Android 2.2+  
iOS 6.0+  

**版本支持:**

Android 3.0.0+  
iOS 3.0.0+  


**示例**  

```
function cbEnqueue(info){
     alert(info);
}
```
## 2.3、监听方法<ignore>

### 🍭 onTaskDetail 用户长按任务,出现任务详情的回调,需要自己实现详情的界面  

**参数:**

```
var params = {
    url://下载地址,
    savePath://保存路径
};
```
**平台支持:**  
Android 2.2+  
iOS 6.0+  

**版本支持:**  
Android 3.0.0+  
iOS 3.0.0+  

**示例**

```
function onTaskDetail(info){
     alert(info);
}
```

# 3、更新历史<ignore>
API 版本:uexMultiDownloader-3.0.0(iOS) uexMultiDownloader-3.0.0(Android)  

最近更新时间:2015-08-11

| 历史发布版本 | iOS更新 | 安卓更新 |
| ------------ | ------------ | ------------ |

