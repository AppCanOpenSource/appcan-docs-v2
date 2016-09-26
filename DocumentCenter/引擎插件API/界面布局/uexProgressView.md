/*
Sort: 1
Toc: 1
*/

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>
进度条控件插件
## 1.1、说明<ignore>
进度条控件插件
## 1.2、UI展示<ignore>
![](http://i.imgur.com/u3jwCGP.gif)
## 1.3、开源源码<ignore>
插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览<ignore>

## 2.1、方法<ignore>

### 🍭 open 打开进度条

`uexProgressView.open(json)`

**说明:**

打开进度条

**参数:**

```
var json = {
    id:,//(必选) 唯一标识符
    left:,//(可选) 左间距,默认0
    top:,//(可选) 上间距,默认0
    width:,//(可选) 宽度,默认屏幕宽度
    height:,//(可选) 高度,默认屏幕高度
    type:,//(必选) 进度条类型,1-细长形进度条;2-宽长形进度条;3-圆形填充进度条;4-圆形边框进度条
    progress:,//(可选) 设置初始进度值,取值范围:[0,...,100],默认为0
    isScrollWithWeb:,//(可选) 是否跟随网页滚动,默认为false
    normalColor:,//(可选) 进度条正常颜色
    progressColor:,//(可选) 进度条高亮颜色
    isShowText:,//(可选) 是否显示进度文字
    textSize:,//(可选) 进度文字字体大小
    textColor:,//(可选) 进度文字字体颜色
    borderColor:,//(可选) 进度条边框颜色,type为2,3,4有效
    bgColor://(可选) 进度条背景颜色,默认透明
}
```

**平台支持:**

Android 2.2+  
iOS 6.0+

**版本支持:**

Android 3.0.0+  
iOS 3.0.0+

**示例:**

示例1

```
    var param1 = {
        id:1,
        left:400,
        top:200,
        width:600,
        height:80,
        type:1,
        isScrollWithWeb:true,
        progress:30,
        bgColor:"#ccc",
        normalColor:"#fff",
        progressColor:"#0f0",
        isShowText:true,
        textSize:12,
        textColor:"#0f0"
    };
    var data1 = JSON.stringify(param1);
    uexProgressView.open(data1);
```
运行效果:
![](http://i.imgur.com/vIwZddy.png)

示例2

```
    var param1 = {
        id:2,
        left:400,
        top:410,
        width:600,
        height:80,
        type:2,
        isScrollWithWeb:false,
        progress:55,
        bgColor:"#00000000",
        normalColor:"#ccc",
        progressColor:"#f00",
        isShowText:true,
        textSize:15,
        textColor:"#fff",
        borderColor:"#00000000"
    };
    var data1 = JSON.stringify(param1);
    uexProgressView.open(data1);
```
运行效果:
![](http://i.imgur.com/VW0PAK6.png)

示例3

```
    var param1 = {
        id:3,
        left:400,
        top:700,
        width:300,
        height:300,
        type:3,
        isScrollWithWeb:true,
        progress:75,
        bgColor:"#00000000",
        normalColor:"#00000000",
        progressColor:"#0f0",
        isShowText:true,
        textSize:10,
        textColor:"#00f",
        borderColor:"#ccc"
    };
    var data1 = JSON.stringify(param1);
    uexProgressView.open(data1);
```
运行效果:
![](http://i.imgur.com/rUi9vRj.png)

示例4

```
    var param1 = {
        id:4,
        left:400,
        top:1020,
        width:300,
        height:300,
        type:4,
        isScrollWithWeb:true,
        progress:95,
        bgColor:"#00000000",
        normalColor:"#00000000",
        progressColor:"#0f0",
        isShowText:false,
        borderColor:"#fff"
    };
    var data1 = JSON.stringify(param1);
    uexProgressView.open(data1);
```
运行效果:
![](http://i.imgur.com/hQ82Cq4.png)

### 🍭 setProgress 设置进度值

`uexProgressView.setProgress(json)`

**说明:**

设置进度值

**参数:**

```
var json = {
    id:,//(必选) 唯一标识符
    progress://(可选) 设置初始进度值,取值范围:[0,...,100],默认为0
}
```

**平台支持:**

Android 2.2+  
iOS 6.0+

**版本支持:**

Android 3.0.0+  
iOS 3.0.0+

**示例:**

```
    var i = 0;
    var int = setInterval('setProgress(3, 13)', 1000);
    function setProgress(id, interval){
       if( i < 100){
            i = i + interval;
            if(i >= 100){
                setProgressInt(id, 100);
            }else{
                setProgressInt(id, i);
            }
        }else{
            window.clearInterval(int);
            i = 0;
        }
    }
    function setProgressInt(id, progress){
       var param = {
            id:id,
            progress:progress
       };
       uexProgressView.setProgress(JSON.stringify(param));
    }
```

运行效果:

![](http://i.imgur.com/u3jwCGP.gif)

### 🍭 close 关闭进度条

`uexProgressView.close(json)`

**说明:**

关闭进度条

**参数:**

```
var json = []//(可选) 进度条唯一标识符数组,不传时关闭所有进度条
```

**平台支持:**

Android 2.2+  
iOS 6.0+

**版本支持:**

Android 3.0.0+  
iOS 3.0.0+

**示例:**

```
示例1
    var params = [1];
    var data = JSON.stringify(params);
    uexProgressView.close(data);//关闭唯一标识符为1的进度条

示例2
    uexProgressView.close();//关闭所有进度条
```

## 2.2、监听方法<ignore>

### 🍭 onComplete 进度达到100%的监听方法

`uexProgressView.onComplete(json);`

**参数:**

```
var json = {
    id://完成的进度条唯一标识符
}
```

**平台支持:**

Android 2.2+

iOS 6.0+

**版本支持:**

Android 3.0.0+

iOS 3.0.0+

**示例:**

```
    uexProgressView.onComplete = function(data){
        alert(data);
    }
```
# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexProgressView-4.0.0`

最近更新时间:`2015-11-06`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android<ignore>

API版本: `uexProgressView-4.0.0`

最近更新时间:`2015-11-06`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
