[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
PDF阅读器插件
## 1.1、说明 
 PDF阅读器,是用来阅读pdf格式文件的,它具有分页浏览,页标记等功能。

## 1.2、UI展示

 ![](http://newdocx.appcan.cn/docximg/132803h2015d6t16c.png)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=181_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4、平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。

有特殊版本要求的API会在文档中额外说明。

## 1.5、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用。
# 2、API概览

## 2.1、方法

> ### openPDFReader 打开阅读器

`uexPDFReader.openPDFReader(pdfPath)`

**说明:**

打开PDF阅读器

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| pdfPath | String | 是 | pdf文档路径,路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes。 |



**示例:**

```
var file = "res://test.pdf"
uexPDFReader.openPDFReader(file);
```
> ### close 关闭阅读器

`uexPDFReader.close()`

**说明:**

关闭PDF阅读器

**参数:**

  无



**示例:**

```
uexPDFReader.close();
```
# 3、更新历史

### iOS

API版本:`uexPDFReader-4.0.0`

最近更新时间:`2016-6-28`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持引擎4.0，函数入参 |
| 3.0.5 | 改用bundle方式引用资源文件;添加IDE支持 |
| 3.0.4 | 删除info.plist |
| 3.0.3 | 添加国际化支持 |
| 3.0.2 | 解决在iOS8以上的版本中奔溃问题 |
| 3.0.1 | 使用新版Xcode重新编译,支持arm64 |
| 3.0.0 | PDF阅读器功能插件 |

### Android

API版本:`uexPDFReader-4.0.0`

最近更新时间:`2016-6-28`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持引擎4.0，函数入参 |
| 3.0.4 | 由于一些特殊字体的pdf无法打开,基于mupdf重写uexPDFReader插件;1.兼容一些特殊字体的pdf;2.优化了方法数,使插件更轻量级:方法数从6837减至1016 |
| 3.0.3 | 去掉插件中的ActivityGroup,配合引擎升级 |
| 3.0.2 | 修复打包冲突的问题 |
| 3.0.1 | 修复路径不存在时崩溃问题 |
| 3.0.0 | PDF阅读器功能插件 |
