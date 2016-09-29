/*
Sort: 1
Toc: 1
*/


 # 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>
 涂鸦插件
##1.1、说明<ignore>
 打开画板进行涂鸦,可以选择画笔的颜色、透明度和粗细,并且可以进行撤销、清屏和保存等相关操作,点击保存后返回相关图片存储地址. 

 Android 插件需要引擎3.3版本以上.企业版打包环境需要支持Gradle才能打包.

##1.2、UI展示<ignore>

##1.3、开源源码<ignore>
插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持<ignore>
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性<ignore>
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

#2、API概览<ignore>
 ##2.1、方法<ignore>

###  open 打开画板

`uexScrawl.open(params,callback)`

**说明:**

通过此方法打开画板,进入涂鸦界面.

**参数:**

| 参数名称     | 参数类型     | 是否必选 | 说明           |
| -------- | -------- | ---- | ------------ |
| params   | String   | 是    | 接口所需数据，形式见下： |
| callback | Function | 是    | 回调方法         |

```javascript
var params ={
    src:
}
```

各字段含义如下:

| 参数名称 | 参数类型   | 是否必选 | 说明      |
| ---- | ------ | ---- | ------- |
| src  | String | 是    | 传入的图片路径 |

**回调参数:**

```javascript
var callback = function(error,result){}
```

各字段含义如下:

| 参数名称   | 参数类型   | 说明           |
| ------ | ------ | ------------ |
| error  | Number | 0表示成功,其他表示失败 |
| result | String | 编辑后图片的路径     |

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

#3、更新历史 <ignore>

### iOS<ignore>

API版本: `uexScrawl-4.0.0`

最近更新时间:`2016-5-10`

| 历史发布版本 | 更新内容              |
| ------ | ----------------- |

### Android<ignore>

API版本: `uexScrawl-4.0.0`

最近更新时间:`2016-4-11`

| 历史发布版本 | 更新内容 |
| ------ | ---- |
