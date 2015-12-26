[TOC]

#1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
系统剪贴板插件
##1.1、说明
 封装系统剪贴板,提供系统全局的文字复制粘贴功能

##1.2、UI展示

 ![](http://newdocx.appcan.cn/docximg/164619h2015x6t15y.png)
  
##1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=205_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

#2、API概览
##2.1、方法
> ### copy 复制

`uexClipboard.copy(text)`

**说明:**

复制内容到剪切板

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| text | String | 是 | 内容 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexClipboard.copy("复制内容");
```
> ### getContent 获取内容

`uexClipboard.getContent()`

**说明:**

获取剪切板的内容 回调方法[cbGetContent](#cbGetContent 获取内容的回调方法)

**参数:**

无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

  3.0.0+

**示例:**

```
uexClipboard.getContent();
```
##2.2、回调方法
> ### cbGetContent 获取内容的回调方法

`uexClipboard.cbGetContent(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType| Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | String | 是 | 剪贴板上存放的文字 |

**版本支持:**

3.0.0+

**示例**

```
window.uexOnload = function() {
  uexClipboard.cbGetContent = function(opCode, dataType, data) {
  alert(data);
}
}
```
#3、更新历史

### iOS

API版本:`uexClipboard-3.0.3`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.3 | 添加IDE支持 |
| 3.0.2 | 修复被复制的文本包含换行符会导致插件异常的bug |
| 3.0.1 | 使用新版Xcode重新编译,支持arm64 |
| 3.0.0 | 剪切板功能插件 |

### Android

API版本:`uexClipboard-3.0.1`

最近更新时间:`2015-06-19`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.1 | 换行符号处理 |
| 3.0.0 | 剪切板功能插件 |
