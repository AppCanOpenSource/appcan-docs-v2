[TOC]
# 1､简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
webSocket 插件
## 1.1､说明
webSocket 插件, 可用来实现长连接,推送

## 1.2､UI展示

## 1.3､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=193_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4､平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统

有特殊版本要求的API会在文档中额外说明

## 1.5､接口有效性

本插件所有API默认在插件版本**4.0.0+**可用

在后续版本中新添加的接口会在文档中额外说明



# 2､API概览

## 2.1､方法
### 🍭 open 开启一个webSocket连接

`uexWebSocket.open(param)`

**说明:**

创建上传对象

**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明 |
| ----- | ------ | ---- | ------- |
| param | JSON string | 是    | 包含目标url的参数 |

```
var param = {
    url:// 以 ws:// 开头的url.
}
```

**返回值:**
无

**示例:**

```javascript
 var data = {
    url: "ws://192.168.1.69:8887" 
}
uexWebSocket.open(data);
```

### 🍭 send 向服务端发送数据

`uexWebSocket.send(info)`

**说明:**

向服务端发送数据

**参数:**

| 参数名称  | 参数类型   | 是否必选 | 说明      |
| ----- | ------ | ---- | ------- |
| info | JSON String | 是    | 待发送的数据 |

`info`的数据结构如下:
```
var info = {
    data:, //String, 待发送的数据
}
```


**返回值:**
无

**示例:**

```javascript

var info = {
    data: 'text'
}
uexWebSocket.send(info);
```

### 🍭 close 关闭webSocket链接

`uexWebSocket.close()`

**说明:**

关闭webSocket链接

**参数:**
无 

**返回值:**
无

**示例:**

```
uexWebSocket.close()
```

## 2.2 监听方法

### 🍭 onConnect 和服务器建立连接的监听
`uexWebSocket.onConnect()`

**参数**
无

**示例**
```
uexWebSocket.onConnect = function() {
    console.log('[onConnect]');
}
```

### 🍭 onMessage 接收到消息的监听
`uexWebSocket.onMessage(data)`

**参数**

| 参数名称 | 参数类型   | 是否必选 | 说明 |
| ----- | ------ | ---- | -------------- |
| data | String | 是    | 接收到的消息数据|

**示例**
```
uexWebSocket.onMessage = function(data) {
    console.log('[received]' + data);
}
```


### 🍭 onClose 关闭webSocket链接的监听
`uexWebSocket.onClose()`

**参数**
无

**示例**
```
uexWebSocket.onClose = function() {
    console.log('[close]');
}
```


# 3､更新历史

### iOS

API版本: `uexWebSocket-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 新增4.0插件 |

### Android

API版本: `uexWebSocket-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | webSocket插件 |
