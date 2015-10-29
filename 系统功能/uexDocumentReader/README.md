[TOC]

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
Document阅读器插件

## 1.1、说明
Document阅读器，是用来阅读Office文件的，包括PPT幻灯片，Excel表格，.doc或.docx文档，以及txt，pdf格式文件的。

## 1.2、UI展示

 ![](http://newdocx.appcan.cn/docximg/144935q2015t7a4a.jpg)  

## 1.3、开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=168_index) 插件中心至插件详情页 （插件测试用例与插件源码已经提供）

# 2、API概览

## 2.1、方法

> ### openDocumentReader打开阅读器

`uexDocumentReader.openDocumentReader(documentPath)`

**说明:**
打开阅读器，支持DOC,PPT,EXCEL,TXT格式的文件

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| documentPath | String | 是 | 文档路径，路径协议详见CONSTANT中PathTypes。 |

**平台支持:**
Android2.2+
iOS6.0+

** 版本支持:**
3.0.0+

**示例:**

```
uexDocumentReader.openDocumentReader("wgt://Doc Document.doc");
```

# 3、更新历史

API 版本：uexDocumentReader-3.0.1(iOS) uexDocumentReader-3.0.2（Android）
最近更新时间：2015-10-23
 
|  历史发布版本 | iOS更新  | 安卓更新  |
| ------------ | ------------ | ------------ |
| 3.0.2  |  | 修改打开不存在文件时崩溃的问题 |
| 3.0.1  | 使用新版Xcode重新编译,支持arm64  | 国际化 |
| 3.0.0  | 阅读器功能插件  | 阅读器功能插件|
