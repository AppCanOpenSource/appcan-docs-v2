/*
Sort: 19
Toc: 1
Tips: 二维码
keywords: appcan开发文档,插件API,界面布局,uexScanner 
description: 条形码,二维码等扫描,此插件提供可以自定义扫描界面UI设置接口,用户传入资源文件,使其效果更能满足应用的需求和ui设计。更多appcan开发文档，请见http://newdocx.appcan.cn
Show: /newdocx/docx?type=1426_975
*/


- [1、简介](#-1-http-appcan-download-oss-cn-beijing-aliyuncs-com-e5-85-ac-e6-b5-8b-2fgf-png-ignore- "1、简介")
- [2、API概览](#-2-api-ignore- "2、API概览")
- [3、更新历史](#-3-ignore- "3、更新历史")
#### **1、简介**<ignore>
二维码插件
###### **1.1、说明**<ignore>
条形码,二维码等扫描,此插件提供可以自定义扫描界面UI设置接口,用户传入资源文件,使其效果更能满足应用的需求和ui设计
>本文的目的是为了开发能够更好更快地将API集成到自己的项目中，在使用前最好先使用好我们提供的[demo](#-1-3-ignore-)并对照文档运行看看效果。
></br>这里可以【[参考](http://newdocx.appcan.cn/dev-guide/create-app)教程】下载AppCan IDE为开发者工具开发，然后集成到自己的项目上。
></br>**备注：**`iOS应用需要配置隐私权限才能正常调用，参考【1.5、接口有效性】。`

###### **1.2、UI展示**<ignore>

*![](http://newdocx.appcan.cn/docximg/150439g2015y6g16o.png) *
###### **1.3、开源源码**<ignore>
插件测试用例与源码下载:<a href="http://plugin.appcan.cn/details.html?id=184_index" target="_blank">点击</a>插件中心至插件详情页 (插件测试用例与插件源码已经提供)

###### **1.4、平台版本支持**<ignore>
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.
有特殊版本要求的API会在文档中额外说明.

###### **1.5、接口有效性**<ignore>
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.  
iOS隐私权限[配置说明](http://newdocx.appcan.cn/dev-guide/ios10)。

#### **2、API概览**<ignore>

###### **2.1、方法**<ignore>
> ######  **open //开启扫描功能** 

`uexScanner.open(callbackFunction)`

**说明:**

开启扫描功能,当扫描完成后会执行回调函数

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明         |
| ---------------- | -------- | ---- | ---------- |
| callbackFunction | Function | 是    | 扫描成功后的回调函数 |

**回调参数:**

```javascript
var callbackFunction = function(error,data){}
```

| 参数名称  | 类型     | 说明                                  |
| ----- | ------ | ----------------------------------- |
| error | Number | 扫描结果,0-成功,非0-失败,打开失败通常是因为没有开启摄像头权限. |
| data  | Object | 扫描成功的数据,形式如下:                       |

```javascript
var data = {
    code:, 
    type:
}
```
**示例:**

```javascript
var callback = function(error,data) {
  if(!error){
    alert("data:" + JSON.stringify(data));
  }else{
    alert("failed!");
  }
};
uexScanner.open(callback);
```

> ######  **setJsonData //设置数据** 

`uexScanner.setJsonData(params)`

**说明:**

可以自定义扫描界面,未设置的话为默认界面
自定义二维码扫描图片资源,图片路径支持 wgt:// wgts:// res:// file://  路径协议详见[CONSTANT](/plugin-API/·Constant "CONSTANT")中PathTypes

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明             |
| ------ | ------ | ---- | -------------- |
| params | Object | 是    | 接口所需相关数据,形式见下: |

```javascript
var params = {
    lineImg: ,
    pickBgImg: ,
    tipLabel: ,
    title: ,
    charset:,
    isGallery:
}
```

各字段含义如下:

| 字段名称      | 类型     | 是否必选     | 说明       |
| --------- | ------ | -------- | -------- |
| lineImg   | String | 否        | 扫描时移动的光线 |
| pickBgImg | String | 否        | 扫描区域边框图片 |
| tipLabel  | String | 否        | 扫描区下部提示语 |
| title     | String | 否,仅iOS支持 | 扫描界面顶部标题 |
| charset   | String | 否        | 设置字符编码   |
| isGallery   | String | 否        | isGallery，是否显示相册按钮，0不显示，1显示，默认1显示  |

**示例:**

```javascript
var jsonData = {
  lineImg:"res://line.png",
  pickBgImg:"res://pick_bg.png",
  tipLabel:"对准二维码/条形码,即可自动扫描",
  title:"扫一下",
  isGallery:"1"
};
uexScanner.setJsonData(jsonData);
```
>#### **recognizeFromImage //传入条形码、二维码图片路径**
 
 `var result = uexScanner.recognizeFromImage(imagePath)`
 
 **说明:**
 
 传入条形码、二维码图片路径，同步返回识别结果。图片路径支持http https ,还有 wgt:// wgts:// res:// file://  路径协议详见[CONSTANT](/plugin-API/·Constant "CONSTANT")中PathTypes
 
 **参数:**
 
 | 参数名称   | 参数类型   | 是否必选 | 说明             |
 | ------ | ------ | ---- | -------------- |
 | imagePath | String | 是    | 条形码、二维码图片路径 |
 
 **返回结果:**
 
 | 参数名称  | 类型     | 说明                                  |
 | ----- | ------ | ----------------------------------- |
 | result | String | 识别图片后返回对应的信息 |
 
  **示例:**
  
  ```javascript
  var result = uexScanner.recognizeFromImage("res://scanner.png");
  ```

#### **3、更新历史**<ignore>

###### **iOS**<ignore>

API版本: `uexScanner-4.0.1.6`

最近更新时间:`2020-08-05`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.1.6 | 修改相册显示，setJsonData方法传入参数isGallery，0不显示，1显示，默认1显示 |
| 4.0.1 | 修复首次启动用户确认相机权限时可能闪退的问题 |
| 4.0.0 | 二维码插件 |

###### **Android**<ignore>

API版本: `uexScanner-4.0.0`

最近更新时间:`2016-6-11`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
|       |