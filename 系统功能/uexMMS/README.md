[TOC]
 # 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
系统彩信插件
## 1.1、 说明
封装系统发送彩信的操作,
> **温馨提示**：IOS、Windows Phone 8平台不支持。

 
## 1.2 、 开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=281_pluginlist) 插件中心至插件详情页 （插件测试用例与插件源码已经提供）

 # 2、API概览

## 2.1、方法

> ###  open 打开系统发送彩信界面

`uexMMS.open(phoneNum, subject, content, mediaPath)`

**说明:	**
打开系统发送彩信界面，如果系统没有彩信的应用，将不做任何操作。	

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
|  phoneNum | String | 是 | 接收者的手机号码 |
| subject | String | 是 | 彩信主题 |
| content | String | 是 | 彩信正文内容 |
| mediaPath | String | 是 | 彩信媒体附件路径， 支持的协议有wgt://…,wgts://…,file://,等本地协议， 详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中的PathTypes |

**平台支持:	**
Android2.2+

**版本支持:**
3.0.0+

**示例:**

```
uexMMS.open("13436827900", "AppCan", "Hello", "/storage/sdcard0/DCIM/Camera/a.jpg");
```
# 3、更新历史
API 版本：不支持(iOS) uexMMS-3.0.0（Android）
最近更新时间：2015-06-19

|  历史发布版本 | iOS更新  | 安卓更新  |
| ------------ | ------------ | ------------ |
| 3.0.0  |   | 彩信功能插件|
  