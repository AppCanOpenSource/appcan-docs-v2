[TOC]
 #1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
log插件
##1.1､说明
向服务器发送log


##1.2 ､开源源码

插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=178_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.3､平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.4､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

 #2､API概览


##2.1､方法

### 🍭 sendLog 向服务器发送信息		

`uexLog.sendLog(log)`

**说明:**

使用UDP协议发送log.服务器的ip在config.xml中logserverip中配置.端口号固定为:30050.

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明        |
| ---- | ------ | ---- | --------- |
| log  | String | 是    | 要发送的log信息 |

**示例:**

```javascript
uexLog.sendLog("我是log,我是log......");
```
#3､更新历史

### iOS

API版本: `uexLog-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | Log功能插件 |

### Android

API版本: `uexLog-4.0.1`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.1 | 修复不能发送Log的问题 |
| 4.0.0 | Log功能插件 |
