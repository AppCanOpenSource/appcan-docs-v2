[TOC]

# 1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
Document阅读器插件

## 1.1､说明
Document阅读器,是用来阅读Office文件的,包括PPT幻灯片,Excel表格,.doc或.docx文档,以及txt,pdf格式文件的.

## 1.2､UI展示

 ![](http://newdocx.appcan.cn/docximg/144935q2015t7a4a.jpg)  

## 1.3､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=168_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4､平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.
# 2､API概览

## 2.1､方法

### 🍭 openDocumentReader打开阅读器

`uexDocumentReader.openDocumentReader(documentPath)`

**说明:**

打开阅读器,支持DOC,PPT,EXCEL,TXT格式的文件

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| documentPath | String | 是 | 文档路径,路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes. |


**示例:**

```
uexDocumentReader.openDocumentReader("wgt://Doc Document.doc");
```

# 3､更新历史

### iOS

API版本: `uexDocumentReader-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 阅读器功能插件 |

### Android

API版本: `uexDocumentReader-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 4.0插件 |
| unknown | 修改打开不存在的文件时崩溃的问题 |
| unknown | 国际化 |
| unknown | 阅读器功能插件 |
