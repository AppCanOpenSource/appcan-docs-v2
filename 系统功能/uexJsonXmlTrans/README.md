[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
JSON, XML转换工具
   
## 1.1、说明
该插件封装了JSON, XML格式数据相互转换的功能

## 1.2、UI展示
无
## 1.3、开源源码
插件测试用例与源码下载：[点击](xxxx ) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

> ### json2xml 将json字符串转为xml

`uexJsonXmlTrans.json2xml(data)`

**说明:**
将json字符串转为xml, 转换完成后执行回调函数 [cbTransFinished](#cbTransFinished 格式转换完成后的回调 "cbTransFinished")

**参数:**
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| data | String | 是 | json格式字符串 或 res://, wgt://,wgts://, file:///sdcard/开头的文件路径 |

**平台支持：**
Android2.2+  
iOS6.0+

**版本支持：**
3.0.0+

**示例:**



> ### xml2json 将xml格式字符串转为json格式

`uexJsonXmlTrans.xml2json(data);`

**说明:**
将xml格式字符串转为json格式

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| data | String | 是 |xml 格式字符串 或 res://, wgt://, wgts://, file:///sdcard/开头的文件路径|


**平台支持：**
Android2.2+  
iOS6.0+

**版本支持：**
3.0.0+

**示例:**


## 2.2、回调方法

> ### cbTransFinished 格式转换完成后的回调

`uexJsonXmlTrans.cbTransFinished(data);`

**说明:**
格式转换完成后的回调

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| data | String | 是 | 转换后的数据 |

**平台支持：**
Android2.2+  
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexJsonXmlTrans.cbTransFinished = function(data){
   alert(data);
}
```

# 3、更新历史

