[TOC]

 # 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
 涂鸦插件
##1.1、说明
 打开画板进行涂鸦,可以选择画笔的颜色、透明度和粗细,并且可以进行撤销、清屏和保存等相关操作,点击保存后返回相关图片存储地址. 

 Android 插件需要引擎3.3版本以上.企业版打包环境需要支持Gradle才能打包.

##1.2、UI展示

##1.3、开源源码
插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
#2、API概览
 ##2.1、方法

### 🍭 open 打开画板

`uexScrawl.open(params,callback)`

**说明:**

通过此方法打开画板,进入涂鸦界面.

**参数:**

```javascript
var params ={
    src:,
}
```

各字段含义如下:

| 参数名称 | 参数类型   | 是否必选 | 说明      |
| ---- | ------ | ---- | ------- |
| src  | String | 是    | 传入的图片路径 |

**回调参数:**

```javascript
var callback=function(error,result){
	  
}
```

各字段含义如下:

| 参数名称   | 参数类型   | 说明           |
| ------ | ------ | ------------ |
| error  | Number | 0表示成功,其他表示失败 |
| result | String | 编辑后图片的路径     |

**版本支持:**

Android 4.0.0+    

iOS 4.0.0+

**示例:**

```javascript
var params = {
    "src":"res://jingse.png"
};
uexScrawl.open(params,function(error,result){
  	if(!error){
      alert(result);
  	}else{
      alert("Error!")
  	}
});
```

#2、更新历史 

### iOS

API版本: `uexScrawl-4.0.0`

最近更新时间:`2016-5-10`

| 历史发布版本 | 更新内容              |
| ------ | ----------------- |

### Android

API版本: `uexScrawl-4.0.0`

最近更新时间:`2016-4-11`

| 历史发布版本 | 更新内容 |
| ------ | ---- |
