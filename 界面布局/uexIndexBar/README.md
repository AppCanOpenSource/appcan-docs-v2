[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
索引功能插件
## 1.1、说明
索引功能插件。
## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/142421n2015e6u16t.jpg)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=175_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

> ### open 创建索引列表

`uexIndexBar.open(x, y, width, height,extras)`

**说明:**

创建索引列表

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| x | Number | 是 | x坐标 |
| y | Number | 是 | y坐标 |
| width | Number | 是 | 宽 |
| height | Number | 是 | 高 |
| extras | String | 否 | 自定义索引参数 ,json格式如下 |

```
extras={
    textColor:,//可选参数,索引文字颜色
    indices:[],//可选参数,索引列表内容 String组成的数组
    isScrollable,//可选参数,索引列表是否跟随网页滑动 true-跟随滑动 false-不跟随滑动(默认) 
} 
```

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    var x=100;
    var y=100;
    var width=200;
    var height=400;
    var data={
        textColor:"#E6942A",
        indices:["索引1","索引2","索引3"]
    }
    var extras=JSON.stringify(data);
    uexIndexBar.open(x,y,width,height,extras);
```
  

> ### close 关闭索引列表

`uexIndexBar.close()`

**说明:**

关闭索引列表

**参数:**

  无

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexIndexBar.close();
```

## 2.2、监听方法

> ### onTouchResult 点击item的监听方法

`uexIndexBar.onTouchResult(opId,dataType,data);`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number| 是 | 操作ID,在此函数中不起作用,可忽略 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|String | 是 | 索引值:a~z。|
 

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    uexIndexBar.onTouchResult = function(opCode, dataType, data){
        alert(opCode + "," + dataType + "," + data);
    }
```

# 3、更新历史

### iOS

API版本:`uexIndexBar-3.0.7`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.7 | 添加IDE支持 |
| 3.0.6 | 索引表可以设置是否随网页滑动 |
| 3.0.5 | 索引文字支持配置颜色和内容 |
| 3.0.4 | 使用新版Xcode重新编译,支持arm64 |
| 3.0.3 | 高亮背景颜色改成透明 |
| 3.0.2 | 背景颜色改回透明 |
| 3.0.1 | 统一Android和iOS的uexIndexBar.onTouchResult接口 |
| 3.0.0 | 索引功能插件 |

### Android

API版本:`uexIndexBar-3.0.2`

最近更新时间:`2015-06-19`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.2 | 插件嵌入到WebView中 |
| 3.0.1 | 索引文字支持配置颜色和内容 |
| 3.0.0 | 索引功能插件 |
