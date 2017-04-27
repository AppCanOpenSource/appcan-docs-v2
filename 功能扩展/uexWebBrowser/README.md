[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
内置浏览器功能插件
## 1.1、说明
App中使用此插件实现内置浏览器功能。iOS使用WKWebView、Android使用腾讯X5作为浏览器内核。

## 1.2、UI展示
## 1.3、开源源码
插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

# 2、API概览

## 2.1、方法

### 🍭 init 初始化

`uexWebBrowser.init(param)`

**说明:**

**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明           |
| ----- | ------ | ---- | ------------ |
| param | JSON对象 | 是    | 接口所需数据,形式见下: |

```javascript
var param = {
	debug:,
	userAgent:,
}
```

各字段含义如下:

| 字段名称      | 类型      | 是否必选 | 说明              |
| --------- | ------- | ---- | --------------- |
| debug     | Boolean | 否    | 是否开启调试          |
| userAgent | String  | 否    | 传此参数会添加到原有agent |

**示例:**

```javascript
var params = {
    debug:false,
};
uexWebBrowser.init(params);
```

### 🍭 open 打开BrowserView

`uexWebBrowser.open(param)`

**说明:**

**参数:**


| 参数名称  | 参数类型   | 是否必选 | 说明           |
| ----- | ------ | ---- | ------------ |
| param | JSON对象 | 是    | 接口所需数据,形式见下: |

```javascript
var param = {
	x:,
	y:,
	width:,
	height:,
	url:,
}
```

各字段含义如下:

| 字段名称   | 类型     | 是否必选 | 说明                 |
| ------ | ------ | ---- | ------------------ |
| x      | Number | 否    | View左上顶点x坐标，默认为0   |
| y      | Number | 否    | View左上顶点y坐标，默认为0   |
| width  | Number | 否    | View左上顶点y坐标，默认撑满屏幕 |
| height | Number | 否    | View左上顶点y坐标，默认撑满屏幕 |
| url    | String | 否    | 需要加载的url           |


**示例:**

```javascript
var params = {
    width:1080,
    height:600,
    y:500,
    url:"http://www.appcan.cn"
};
uexWebBrowser.open(params);
```

### 🍭 close 关闭BrowserView

`uexWebBrowser.close()`

**说明:**

**参数:**


**示例:**

```javascript
uexWebBrowser.close();
```

### 🍭 goBack 后退

`uexWebBrowser.goBack()`

**说明:**

**参数:**

**示例:**

```javascript
uexWebBrowser.goBack();
```



### 🍭 goForward 前进

`uexWebBrowser.goForward()`

**说明:**

**参数:**

**示例:**

```javascript
uexWebBrowser.goForward();
```



### 🍭 canGoBack 是否可以后退

`uexWebBrowser.canGoBack()`

**说明:**

**参数:**

**返回值**

Boolean 类型，true表示可以后退，false表示不可以后退

**示例:**

```javascript
uexWebBrowser.canGoBack();
```



### 🍭 canGoForward 是否可以前进

`uexWebBrowser.canGoForward()`

**说明:**

**参数:**

**返回值**

Boolean 类型，true表示可以后退，false表示不可以后退

**示例:**

```javascript
uexWebBrowser.canGoForward();
```



### 🍭 reload 重新加载当前网页

`uexWebBrowser.reload()`

**说明:**

**参数:**

**示例:**

```javascript
uexWebBrowser.reload();
```



### 🍭 loadUrl 加载Url

`uexWebBrowser.loadUrl(url)`

**说明:**

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明   |
| ---- | ------ | ---- | ---- |
| url  | String | 是    |      |

**示例:**

```javascript
function loadUrl(){
    uexWebBrowser.loadUrl("http://m.hao123.com");
}
```

### 🍭 evaluateJavascript 执行js

`uexWebBrowser.evaluateJavascript(js)`

**说明:**

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明   |
| ---- | ------ | ---- | ---- |
| js   | String | 是    |      |

```javascript
uexWebBrowser.evaluateJavascript(js)
```

**示例:**

```javascript
var js="javascript:console.log('----------------')";
uexWebBrowser.evaluateJavascript(js);
```



### 🍭 getTitle 获取标题

`uexWebBrowser.getTitle()`

**说明:**

**参数:**

**返回值**

String 类型，返回当前网页的标题

**示例:**

```javascript
var title=uexWebBrowser.getTitle();
```





# 3、更新历史

### iOS

API版本: `uexWebBrowser-4.0.0`

最近更新时间:`2017-3-29`

| 历史发布版本 | 更新内容 |
| ------ | ---- |
|        |      |

### Android

API版本: `uexWebBrowser-4.0.0`

最近更新时间:`2017-3-29`

| 历史发布版本 | 更新内容 |
| ------ | ---- |
|        |      |

