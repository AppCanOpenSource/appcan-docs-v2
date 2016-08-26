[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
平台数据统计分析插件
## 1.1、说明

* AppCan 数据统计分析自定义事件接口封装,需要配合平台网站使用
* 本插件默认集成在平台中,不需要勾选,用户直接打包就能使用

## 1.2、UI展示
暂无
## 1.3、开源源码
暂无

# 2、API概览

## 2.1、方法
### 📦 setEvent 上报自定义事件

`uexDataAnalysis.setEvent(eventId, attri)`

**说明:**
上报自定义事件

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
|  eventId | String | 是 | 从AppCan平台申请的自定义事件的eventId, 上报策略默认为启动上报,在网站上配置上报策略. |
| attri | String | 否 | 自定义事件属性,json格式数据 |


**平台支持:**
Android 2.2+
iOS 5.1.1+

**版本支持:**
3.0.0+

**示例:**

```
var reportStr = '{"次数统计":"1","test":"是的","12":"55"}';
uexDataAnalysis.setEvent("AE000001", reportStr);
```

### 📦 beginEvent 开始自定义事件

`uexDataAnalysis.beginEvent(eventId, keyword, attri)`

**说明:**
开始自定义事件,用于统计事件时长.

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
|  eventId | String | 是 | 从AppCan平台申请的自定义事件的eventId,上报策略默认为启动上报, 在网站上配置上报策略. |
| keyword | String | 否 | 自定义的关键词,和eventId共同组成唯一的键;可以为空　 |
| attri | String | 否 | 自定义事件属性,json格式数据 |

**平台支持:**
Android2.2+
iOS5.1.1+

**版本支持:**
3.0.0+

**示例:**  

```
var inLabel = '{"时长统计":"2","test2":"是的","12":"55"}';
var keyword = "music";
uexDataAnalysis.beginEvent("AE00001", keyword, inLabel);
```

### 📦 endEvent 结束自定义事件并上报

`uexDataAnalysis.endEvent(eventId, keyword)`

**说明:**
结束自定义事件并上报.

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| eventId | String | 是 | 从AppCan平台注册的自定义事件的eventId |
| keyword | String | 否 | 自定义的关键词,和eventId共同组成唯一的键,可以为空|

**平台支持:**
Android2.2+
iOS5.1.1+

**版本支持:**
3.0.0+

** 示例:**

```
uexDataAnalysis.endEvent("AE0001", "keyword_value");
```

### 📦 setErrorReport 设置是否收集异常信息并上报到服务器

`uexDataAnalysis.setErrorReport(status)`

**说明:**
设置是否收集异常信息并上报到服务器

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| status | Number | 是 | 值为1时表示收集并上报异常信息;否则即为不上报 |

**平台支持:**
Android2.2+
iOS5.1.1+

** 版本支持:**
3.0.0+

**  示例:**

```
uexDataAnalysis.setErrorReport(1)
```

