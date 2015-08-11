[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
PDF阅读器插件
## 1.1、说明 
 PDF阅读器，是用来阅读pdf格式文件的，它具有分页浏览，页标记等功能。

## 1.2、UI展示

 ![](http://newdocx.appcan.cn/docximg/132803h2015d6t16c.png)
## 1.3、开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=181_index) 插件中心至插件详情页 （插件测试用例与插件源码已经提供）

# 2、API概览

## 2.1、方法

> ### openPDFReader 打开阅读器

`uexPDFReader.openPDFReader(pdfPath)`
**说明:**
打开PDF阅读器
**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| pdfPath | String | 是 | pdf文档路径，路径协议详见CONSTANT中PathTypes。 |

**平台支持:**
Android2.2+
iOS6.0+
**版本支持:**
3.0.0+
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
**平台支持:**
Android2.2+
iOS6.0+
**版本支持:**
3.0.0+
**示例:**

```
uexPDFReader.close();
```
# 3、更新历史
API 版本：uexPDFReader-3.0.2(iOS) uexPDFReader-3.0.1（Android）
最近更新时间：2015-06-19

|  历史发布版本 | iOS更新  | 安卓更新  |
| ------------ | ------------ | ------------ |
| 3.0.2  |  解决在iOS8以上的版本中奔溃问题 |   |
| 3.0.1  | 使用新版Xcode重新编译,支持arm64  | 修复路径不存在时崩溃问题|
| 3.0.0  | PDF阅读器功能插件  | PDF阅读器功能插件|
 
