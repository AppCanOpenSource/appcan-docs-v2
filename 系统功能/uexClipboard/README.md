[TOC]

#1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
系统剪贴板插件
##1.1､说明
 封装系统剪贴板,提供系统全局的文字复制粘贴功能

##1.2､UI展示

 ![](http://newdocx.appcan.cn/docximg/164619h2015x6t15y.png)

##1.3､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=205_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4､平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.
#2､API概览
##2.1､方法
### 🍭 copy 复制

`uexClipboard.copy(text)`

**说明:**

复制内容到剪切板

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明   |
| ---- | ------ | ---- | ---- |
| text | String | 是    | 内容   |


**示例:**

```javascript
uexClipboard.copy("复制内容");
```
### 🍭 getContent 获取内容

`var info = uexClipboard.getContent()`

**说明:**

获取剪切板的内容,同步回调.

**参数:**

无

**返回值:**

String类型,剪贴板上存放的内容


**示例:**

```javascript
var info = uexClipboard.getContent();
alert(info);
```

#3､更新历史

### iOS

API版本: `uexClipboard-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 剪切板功能插件 |

### Android

API版本: `uexClipboard-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 换行符号处理 |
