[TOC]

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
系统发送邮件插件

## 1.1、说明
 封装系统发送邮件的操作。

## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/152402m2015e6w7q.jpg)

## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=171_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

> ### open 打开系统默认邮件发送程序界面,发送邮件

`uexEmail.open(receiverEmail,subject,content,attachmentPath)`

**说明:**

打开系统默认邮件发送程序界面,如果系统没有发送邮件程序,则不作任何操作,并提示用户本机无邮件程序。

**参数:**


| 参数名称           | 参数类型   | 是否必选 | 说明                                       |
| -------------- | ------ | ---- | ---------------------------------------- |
| receiverEmail  | String | 是    | 接收者的邮件地址,如果收件人有多个,用英文逗号隔开,如varstr='123@qq.com,123@163.com' |
| subject        | String | 是    | 邮件主题                                     |
| content        | String | 否    | 邮件正文                                     |
| attachmentPath | String | 否    | 邮件附件路径,支持的协议有:wgt ://…,wgts://…,file://,等本地协议,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中的PathTypes。如果有多个地址,请用英文逗号隔开,如varstr='wgt://xxx.txt,res://xxx.png' |

**版本支持:**

4.0.0+

**示例:**

```javascript
    var email = "test@163.com";
    var subject = "测试邮件";
    var content = "我是邮件";
    var attachmentPath = "res://attach.rar";
    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(Email)) {
        alert('Email格式不正确');
        return;
    }
    uexEmail.open(email, subject, content, attachmentPath);
```
# 3、更新历史

### iOS

API版本:`uexEmail-3.0.6`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容                       |
| ------ | -------------------------- |
| 3.0.6  | 添加IDE支持                    |
| 3.0.5  | 删除info.plist               |
| 3.0.4  | 添加国际化支持                    |
| 3.0.3  | 修复设置多个附件时,不能正确读取协议路径文件的bug |
| 3.0.2  | 修复设置多个附件时,不能正确读取协议路径文件的bug |
| 3.0.1  | 使用新版Xcode重新编译,支持arm64      |
| 3.0.0  | 邮件功能插件                     |

### Android

API版本:`uexEmail-3.0.2`

最近更新时间:`2016-2-16`

| 历史发布版本 | 更新内容     |
| ------ | -------- |
| 3.0.2  | 新增QQ邮箱支持 |
| 3.0.1  | 国际化      |
| 3.0.0  | 邮件功能插件   |
