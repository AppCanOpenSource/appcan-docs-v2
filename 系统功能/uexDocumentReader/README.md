/*
Sort: 11

Toc: 1
Tips: 文件阅读器
keywords: appcan开发文档,插件API,系统功能,uexDocumentReader
description: uexDocumentReader即Document阅读器,是用来阅读Office文件的,包括PPT幻灯片,Excel表格,.doc或.docx文档,以及txt,pdf格式文件的.更多appcan开发文档，请见http://newdocx.appcan.cn
Show: /newdocx/docx?type=1399_975

*/


#### **1、简介** *[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() *<ignore>
Document阅读器插件

###### **1.1、说明**<ignore>
Document阅读器,是用来阅读Office文件的,包括PPT幻灯片,Excel表格,.doc或.docx文档,以及txt,pdf格式文件的.

###### **1.2、UI展示**<ignore>

*![](http://newdocx.appcan.cn/docximg/144935q2015t7a4a.jpg)   *

###### **1.3、开源源码**<ignore>
插件测试用例与源码下载:<a href="http://plugin.appcan.cn/details.html?id=168_index" target="_blank">点击</a>插件中心至插件详情页 (插件测试用例与插件源码已经提供)
###### **1.4、平台版本支持**<ignore>

本插件的所有API默认支持**Android4.3+**和**iOS10.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

###### **1.5、接口有效性**<ignore>

本插件所有API默认在插件版本**4.0.0+**可用.
#### **2、API概览**<ignore>

###### **2.1、方法**<ignore>

> ######  **openDocumentReader //打开阅读器**

`uexDocumentReader.openDocumentReader(documentPath)`

**说明:**

打开阅读器,支持DOC,PPT,EXCEL,TXT格式的文件

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| documentPath | String | 是 | 文档路径,路径协议详见[CONSTANT](/plugin-API/·Constant "CONSTANT")中PathTypes. |


**示例:**

```
uexDocumentReader.openDocumentReader("wgt://Doc Document.doc");
```

#### **3、更新历史**<ignore>

###### **iOS**<ignore>

API版本: `uexDocumentReader-4.0.0`

最近更新时间:`2016-11-24`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
|   4.0.0  |支持引擎4.0，函数入参|

###### **Android**<ignore>

API版本: `uexDocumentReader-4.4.5`

最近更新时间:`2019-11-27`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
|   4.4.5    |(依赖引擎4.4.27+)解决与其他插件可能存在的FileProvider冲突问题|
|   4.0.1    |修改插件在android 10上打不开文件|