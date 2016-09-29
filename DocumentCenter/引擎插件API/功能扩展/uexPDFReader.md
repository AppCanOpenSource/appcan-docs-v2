/*
Sort: 1
Toc: 1
*/

# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>
PDF阅读器插件
## 1.1、说明 <ignore>
 PDF阅读器,是用来阅读pdf格式文件的,它具有分页浏览,页标记等功能.

## 1.2、UI展示<ignore>

 ![](http://newdocx.appcan.cn/docximg/132803h2015d6t16c.png)
## 1.3、开源源码<ignore>
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=181_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4、平台版本支持<ignore>

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性<ignore>

本插件所有API默认在插件版本**4.0.0+**可用.
# 2、API概览<ignore>

## 2.1、方法<ignore>

###  openPDFReader 打开阅读器

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
###  close 关闭阅读器

`uexPDFReader.close()`

**说明:**

关闭PDF阅读器

**参数:**

  无



**示例:**

```javascript
uexPDFReader.close();
```
# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexPDFReader-4.0.0`

最近更新时间:`2016-6-28`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android<ignore>

API版本: `uexPDFReader-4.0.0`

最近更新时间:`2016-6-28`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
