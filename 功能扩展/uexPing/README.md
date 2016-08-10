[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
ping 插件
## 1.1、说明
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

> ### start 传入网址进行ping操作

`uexPing.start(urls)`

**说明:**

打开视频播放界面

**参数:**

| 参数名称 | 参数类型              | 是否必选 | 说明            |
| ---- | ----------------- | ---- | ------------- |
| urls | Json 数组 格式的String | 是    | 数据通过onStart回调 |

**平台支持:**

Android2.2+  
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```javascript
uexPing.start('[192.168.1.1,127.0.0.1,www.baidu.com]');
```

> ### 2.2、监听方法



> ### onStart

`uexPing.onStart(opId,dataTpye,data)`

**参数:**

| 参数名称     | 参数类型   | 是否必选 | 说明                                       |
| -------- | ------ | ---- | ---------------------------------------- |
| opId     | Number | 是    | 操作ID,在此函数中不起作用,可忽略                       |
| dataType | Number | 是    | 参数类型详见CONSTANT中[Callback](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "Callback")dataType数据类型 |
| data     | String | 是    | json格式的String,详细字段见下表                    |

**data中参数的解释：**

```
status：代表ping操作的结果；0代表ping操作成功，-1代表ping操作失败。
addr：代表进行ping操作的地址。
avg：代表本次ping操作的平均值（ping总时间/ping次数）；如果为0说明ping操
作失败；单位为ms。
min：代表本次ping操作的最快速度；如果为0说明ping操作失败。单位为ms。
max：代表本次ping操作的最慢速度；如果为0说明ping操作失败。单位为ms。
```



**版本支持:**

3.0.0+

**示例**

```javascript
function onStart (opId,dataType,data){
    alert(data);
}
window.uexOnload = function(){
    uexPing.onStart = onStart ;
}
```

# 3、更新历史

### iOS

最近更新时间:`2016-7-26`

| 历史发布版本 | 更新内容 |
| ------ | ---- |
| 3.0.0  | 新增插件 |

### Android

最近更新时间:`2016-7-26`

| 历史发布版本 | 更新内容 |
| ------ | ---- |
| 3.0.0  | 新增插件 |
