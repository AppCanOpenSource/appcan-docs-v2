/*
Sort: 1
Toc: 1
*/

[TOC]

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() <ignore>
系统发送邮件插件

## 1.1、说明<ignore>
 封装系统发送邮件的操作.

## 1.2、UI展示<ignore>
 ![](http://newdocx.appcan.cn/docximg/152402m2015e6w7q.jpg)

## 1.3、开源源码<ignore>
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=171_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持<ignore>
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性<ignore>
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

# 2、API概览<ignore>

## 2.1、方法<ignore>

### 🍭 open 打开系统默认邮件发送程序界面,发送邮件

`uexEmail.open(receiverEmail,subject,content,attachmentPath,mimeType)`

**说明:**

打开系统默认邮件发送程序界面,如果系统没有发送邮件程序,则不作任何操作,并提示用户本机无邮件程序.

**参数:**


| 参数名称           | 参数类型   | 是否必选 | 说明                                       |
| -------------- | ------ | ---- | ---------------------------------------- |
| receiverEmail  | String | 是    | 接收者的邮件地址,如果收件人有多个,用英文逗号隔开,如varstr='123@qq.com,123@163.com' |
| subject        | String | 是    | 邮件主题                                     |
| content        | String | 是    | 邮件正文，不需要请传空字符串                                     |
| attachmentPath | String | 否    | 邮件附件路径,支持的协议有:wgt ://…,wgts://…,file://,等本地协议,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中的PathTypes.如果有多个地址,请用英文逗号隔开,如varstr='wgt://xxx.txt,res://xxx.png' |
| mimeType        | String | 否    | 该资源的媒体类型，mimeType和attachmentPath配合使用，传其中一个无法启动附件功能    
**示例:**

```javascript
    var email = "ygeutter@126.com";
            var subject = "测试邮件";
            var content = "我是邮件";
            var attachmentPath = "res://PDFDocument.pdf";
            var mimeType = "application/pdf";
     uexEmail.open(email, subject, content,attachmentPath,mimeType);
```
# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexEmail-4.0.0`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容                       |
| ------ | -------------------------- |

### Android<ignore>

API版本: `uexEmail-4.0.0`

最近更新时间:`2016-2-16`

| 历史发布版本 | 更新内容     |
| ------ | -------- |
