[TOC]

 # 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
 涂鸦插件
##1.1、说明
 打开画板进行涂鸦,可以选择画笔的颜色、透明度和粗细,并且可以进行撤销、清屏和保存等相关操作,点击保存后返回相关图片存储地址。 
  
 Android 插件需要引擎3.3版本以上。企业版打包环境需要支持Gradle才能打包。

##1.2、UI展示

##1.3、开源源码
插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
#2、API概览
 ##2.1、方法

> ### open 打开画板

`uexScrawl.open(params)`

**说明:**

通过此方法打开画板,进入涂鸦界面。

**参数:**

```
var params ={
    src:,
}
```

各字段含义如下:

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| src | String | 是 | 传入的图片路径 |

 

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android 3.0.0+    
iOS3.0.0+

**示例:**

```
var params = {
           "src":"res://jingse.png"
       };
uexScrawl.open(JSON.stringify(params));
```

##2.2、回调方法
> ### cbSave　进入涂鸦界面点击保存的回调方法

`uexScrawl.cbSave(data)`

**参数:**

 ```
var data ={
    savePath: 
}
```

各字段含义如下:

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| savePath | String | 是 | 涂鸦后图片的保存路径 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android3.0.0+    
iOS3.0.0+

**示例:**

```
window.uexOnload = function(){
  uexScrawl.cbSave = function( data){
     alert(data)；
  }
}
```

#3、更新历史 

### iOS

API版本:`uexScrawl-3.0.0`

最近更新时间:`2016-3-11`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 涂鸦功能插件 |

### Android

**uexScrawl目前不支持Android**

