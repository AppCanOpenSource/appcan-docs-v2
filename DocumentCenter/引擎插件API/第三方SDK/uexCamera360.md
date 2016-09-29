/*
Sort: 1
Toc: 1
*/


# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>

图片编辑插件

## 1.1、说明<ignore>
该插件封装了[Camera360开放SDK](http://sdktest.camera360.com/page/guide)编辑图片的功能.

* 注意camera360管理应用页面填写的包名与Bundle ID与打包服务器的想匹配;

## 1.2、开源源码<ignore>
[点击](http://plugin.appcan.cn/details.html?id=609_index)至插件详情页(插件测试用例与原生插件源码已经提供)

## 1.3、插件截图<ignore>

![](/docImg/975/camera360.png)

## 1.4、平台版本支持<ignore>
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.
有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性<ignore>
本插件所有API默认在插件版本**4.0.0+**可用.
在后续版本中新添加的接口会在文档中额外说明.

# 2、API<ignore>

## 2.1、方法<ignore>

###  edit 编辑图片

`uexCamera360.edit(params,callbackFunction);`

**说明**

编辑图片,图片名称统一为当前时间的毫秒数.
Android平台,开发者可设置编辑后的图片是否保存到相册或者自定义保存路径.
iOS平台必须设置编辑后图片的保存路径.

**参数**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| params | String | 是 | 要编辑的图片相关信息 |
| callbackFunction | Function | 是 | 回调函数 |

```
var params = {
    imgSrcPath:,
    isSaveToGallery:,
    imgSavePath:
}
```

各字段含义如下:

| 名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| imgSrcPath | String | 否 | 要编辑的图片地址,不传或传空时,会打开系统图库,用户可选择一张照片编辑 |
| isSaveToGallery | Boolean | 否 | **仅Android支持**,是否保存到相册,默认为false.该值为true时,imgSavePath参数无效.若不传或传false时,imgSavePath必传. |
| imgSavePath | String | 是 | 编辑后的图片保存的文件夹目录 |

**回调参数**

回调函数有一个Object类型的参数info

```
var info = {
    errorCode:,
    saveFilePath:
}
```
各字段含义如下:

| 名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| errorCode | Number | 是 | 错误码,详见[errorCode](#errorCode) |
| saveFilePath | String | 是 | 编辑后图片的保存路径,只在errorCode为0时有效 |

**返回值:**

返回一个对象,打开失败时返回null

**示例**

```
        var params = {
            imgSrcPath:"",//要编辑的图片源地址,不传或传空时,打开系统图库
            isSaveToGallery:false,//编辑后的图片是否保存到相册
            imgSavePath:"wgt://"//编辑后的图片存储路径
        };
        var data = JSON.stringify(params);
        var req=uexCamera360.edit(data, function(data){
            alert("cbEditFun:" + JSON.stringify(data));
        });
        if(!req){
        	alert("打开失败");
        }
```

###  setAPIKey 设置APIKey

`uexCamera360.setAPIKey(params);`

**说明**

* 仅iOS**首次调用**有效,调用后将忽略config.xml中的配置的APIKey.
* 此接口是为了解决iOS IDE打包时不支持config.xml配置的问题.
* **请在调用edit之前调用此接口**
* **Android不支持此接口**

**参数**

```
var params = {
    setAPIKey:,

}
```

各字段含义如下:

| 名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| APIKey | String | 是 |  Camera360官网申请的APIKey|

**平台支持**

    
iOS 6.1+ 

**版本支持**

  
iOS 4.0.0+ 

**示例**

```

        var params = {
            APIKey:"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"
        };
        var data = JSON.stringify(params);
        uexCamera360.setAPIKey(data);
```

# 3、附录<ignore>

### errorCode<ignore>

|errorCode|描述|
|-----|-----|
| 0 | 成功 |
| -1 | 源图片路径错误 |
| -2 | 相册路径异常 |
| -3 | 获取图片路径失败 |
| -4 | 用户取消 |
| -5 | 图片没有变化 |
| -6 | 输出图片路径错误 |

# 4、更新历史<ignore>

### iOS<ignore>

API版本: `uexCamera360-4.0.0`

最近更新时间:`2015-12-30`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android<ignore>

API版本: `uexCamera360-4.0.0`

最近更新时间:`2016-07-29`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
