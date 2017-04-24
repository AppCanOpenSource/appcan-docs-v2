[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
PDF阅读器插件
## 1.1、说明 
 PDF阅读器,是用来阅读pdf格式文件的,它具有分页浏览,页标记等功能.

## 1.2、UI展示

 ![](http://newdocx.appcan.cn/docximg/132803h2015d6t16c.png)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=181_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4、平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.
# 2、API概览

## 2.1、方法

### 🍭 openPDFReader 打开阅读器

`uexPDFReader.openPDFReader(pdfPath)`

**说明:**

打开PDF阅读器

**参数:**

| 参数名称    | 参数类型   | 是否必选 | 说明                                       |
| ------- | ------ | ---- | ---------------------------------------- |
| pdfPath | String | 是    | pdf文档路径,路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes. |



**示例:**

```javascript
var file = "res://test.pdf"
uexPDFReader.openPDFReader(file);
```
### 🍭 close 关闭阅读器

`uexPDFReader.close()`

**说明:**

关闭PDF阅读器

**参数:**

  无



**示例:**

```javascript
uexPDFReader.close();
```


### 🍭 openView 打开PDF阅读器View

`uexPDFReader.openView(params)`

**说明:**

在window上添加一个阅读器View

**参数:**

```javascript
var params={
  x:,
  y:,
  width:,
  height:,
  path:
}
```

各字段含义如下：

| 参数名称          | 参数类型    | 是否必选 | 说明                 |
| ------------- | ------- | ---- | ------------------ |
| x             | Number  | 否    | 默认为0               |
| y             | Number  | 否    | 默认为0               |
| scrollWithWeb | Boolean | 否    | 是否跟随网页滑动 默认false   |
| width         | Number  | 是    | view的宽度            |
| height        | Number  | 是    | view的高度            |
| path          | String  | 是    | pdf路径，支持appcan协议路径 |



**示例:**

```javascript
var file = "res://PDFDocument.pdf"
uexPDFReader.openView({
    width:600,
    height:800,
    path:file
});
```

### 🍭 closeView 关闭阅读器View

`uexPDFReader.closeView()`

**说明:**

关闭PDF阅读器View

**参数:**

  无

**示例:**

```javascript
uexPDFReader.closeView();
```

# 3、更新历史

### iOS

API版本: `uexPDFReader-4.0.0`

最近更新时间:`2016-6-28`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android

API版本: `uexPDFReader-4.0.0`

最近更新时间:`2016-6-28`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
