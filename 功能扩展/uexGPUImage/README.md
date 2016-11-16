[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
图片处理插件
## 1.1、说明
改插件实现了仿Instagram  的图像处理功能。**插件需要引擎3.8以上版本**

![preview](preview/preview.png)



## 1.2、开源源码
插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)


## 1.3、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.
有特殊版本要求的API会在文档中额外说明.

## 1.4、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.  


# 2、API概览

## 2.1、方法
### 🍭 open 打开图片处理界面

`uexGPUImage.open(json,callback)`

**说明:**

打开一个带有预览的界面

**插件需要引擎3.8以上版本**

**参数:**

`json`是一个JSON对象，各字段如下：

| 参数名称 | 参数类型   | 是否必选 | 说明                              |
| ---- | ------ | ---- | ------------------------------- |
| path | String | 是    | 待处理的图片路径，支持wgt://,res://,file:/ |

`callback`是一个Function类型的回调

```javascript
callback=funciton(error,path){}
```



| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| error | int    | 是    | !error 表示成功。其他表示失败 |
| path  | String | 是    | 处理之后的图片保存地址        |

**示例:**

```javascript
uexGPUImage.open({
    path: "res://girl.jpg"
}, function(error, path) {
    if (!error) {
        console.log(path);
    } else {
        console.log("user canceled");
    }
})
```


### 🍭 openView 打开View

`uexGPUImage.open(json)`

**说明:**

打开单个View

**参数:**

`json`是一个JSON对象，各字段如下：

| 参数名称 | 参数类型   | 是否必选 | 说明                                       |
| ---- | ------ | ---- | ---------------------------------------- |
| path | String | 是    | 待处理的图片路径，支持wgt://,res://,file:/          |
| x    | Number | 否    | View顶点的左边距，默认为0                          |
| y    | Number | 否    | View顶点的上边距，默认为0                          |
| w    | Number | 是    | View的宽度 -1为撑满屏幕                          |
| h    | Number | 是    | View的高度 -1为撑满屏幕                          |
| type | String | 是    | 处理图片的类型，不区分大小写。可选值如下："1977","Amaro","Brannan","Earlybird","Hefe","Hudson","InkWell","Lomo","LordKelvin","Nash","Rise","Sierra","Sutro","Toaster","Walden" |

**示例:**

```javascript
uexGPUImage.openView({
  w:720,
  h:720,
  type:"InkWell",  
  path: "res://girl.jpg"
});
```

### 🍭 closeView 关闭View

`uexGPUImage.closeView()`

**说明:**

无

**参数:**

无

**示例:**

```javascript
uexGPUImage.closeView()
```

# 

# 3、更新历史

### iOS

API版本: `uexGPUImage-4.0.0`

最近更新时间:`2016-11-03`

| 历史发布版本 | 更新内容 |
| ------ | ---- |
|        |      |

### Android

API版本: `uexGPUImage-4.0.0`

最近更新时间:`2016-11-03`

| 历史发布版本 | 更新内容 |
| ------ | ---- |
|        |      |