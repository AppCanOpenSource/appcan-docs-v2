[TOC]
# 1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
JSON, XML转换工具

## 1.1､说明
该插件封装了JSON, XML格式数据相互转换的功能

## 1.2､UI展示
无
## 1.3､开源源码
插件测试用例与源码下载:[点击](xxxx ) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4､平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.
# 2､API概览

## 2.1､方法

### 🍭 json2xml 将json字符串转为xml

`uexJsonXmlTrans.json2xml(param,cb)`

**说明:**

将json字符串转为xml

**参数:**

| 参数名称  | 参数类型     | 是否必选 | 说明                                       |
| ----- | -------- | ---- | ---------------------------------------- |
| param | String   | 是    | json格式字符串 或 res://, wgt://,wgts://, file:///sdcard/开头的文件路径 路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| cb    | Function | 是    | 回调方法                                     |

**回调参数:**

```javascript
var cb = function(error,data){}
```

| 参数名称  | 参数类型   | 说明              |
| ----- | ------ | --------------- |
| error | Number | 转换结果,0-成功,非0-失败 |
| data  | String | 转换后的数据          |

**示例:**

```javascript
var param = {
          key1:"value1",
          key2:{
                hehe:"讨厌"
          },
          key3:3,
          key4:false,
          key5:["1","2","3"]
 };
 uexJsonXmlTrans.json2xml(param,function(error, data){
    if (error) {
        alert("转换出错!");
    } else {
        alert(data);
    }
 });         
```
### 🍭 xml2json 将xml格式字符串转为json格式

`uexJsonXmlTrans.xml2json(param,cb);`

**说明:**

将xml格式字符串转为json格式

**参数:**

| 参数名称  | 参数类型     | 是否必选 | 说明                                       |
| ----- | -------- | ---- | ---------------------------------------- |
| param | String   | 是    | xml 格式字符串 或 res://, wgt://, wgts://, file:///sdcard/开头的文件路径 路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes |
| cb    | Function | 是    | 回调方法                                     |

**回调参数:**

```javascript
var cb = function(error,data){}
```

| 参数名称  | 参数类型   | 说明              |
| ----- | ------ | --------------- |
| error | Number | 转换结果,0-成功,非0-失败 |
| data  | Object | 转换后的数据          |

**示例:**

```xml
var param = '<key3>3</key3><key1>value1</key1><key4>0</key4><key2><hehe>讨厌</hehe></key2><key5>1</key5><key5>2</key5><key5>3</key5>';
uexJsonXmlTrans.xml2json(param,function(error, data){
    if (error) {
        alert("转换出错!");
    } else {
        alert(JSON.stringify(data));
    }
 });        
            
```


# 3､更新历史

### iOS

API版本: `uexJsonXmlTrans-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | uexJsonXmlTrans 4.0插件 |

### Android

API版本: `uexJsonXmlTrans-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 4.0插件 |
