[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
索引功能插件
## 1.1、说明
索引功能插件。
## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/142421n2015e6u16t.jpg)

## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=175_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。  
有特殊版本要求的API会在文档中额外说明。  

## 1.5、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用。  
在后续版本中新添加的接口会在文档中额外说明。
# 2、API概览

## 2.1、方法

> ### open 创建索引列表

`uexIndexBar.open(x, y, width, height,extras)`

**说明:**

创建索引列表

**参数:**


| 参数名称   | 参数类型   | 是否必选 | 说明                |
| ------ | ------ | ---- | ----------------- |
| x      | Number | 是    | x坐标               |
| y      | Number | 是    | y坐标               |
| width  | Number | 是    | 宽                 |
| height | Number | 是    | 高                 |
| extras | String | 否    | 自定义索引参数 ,json格式如下 |

```
extras={
    textColor:,
    indices:[],
    isScrollable:
}
```

各字段含义如下：

| 字段名称         | 类型      | 是否必选 | 说明                                     |
| ------------ | ------- | ---- | -------------------------------------- |
| textColor    | String  | 否    | 索引文字颜色                                 |
| indices      | Array   | 否    | 索引列表内容 String组成的数组                     |
| isScrollable | Boolean | 否    | 索引列表是否跟随网页滑动 true-跟随滑动 false-不跟随滑动(默认) |

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

**示例:**

```
uexIndexBar.close();
```

## 2.2、监听方法

> ### onIndexClick点击item的监听方法

`uexIndexBar.onIndexClick(data);`

**参数:**


| 参数名称 | 参数类型   | 说明       |
| ---- | ------ | -------- |
| data | String | 索引值:a~z。 |

**示例:**

```javascript
    uexIndexBar.onIndexClick = function(data){
        alert("您点击了索引" + data);
    }
```

# 3、更新历史

### iOS

API版本:`uexIndexBar-4.0.0`

最近更新时间:`2016-6-24`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
| 4.0.0  | 4.0插件                                    |
| 3.0.7  | 添加IDE支持                                  |
| 3.0.6  | 索引表可以设置是否随网页滑动                           |
| 3.0.5  | 索引文字支持配置颜色和内容                            |
| 3.0.4  | 使用新版Xcode重新编译,支持arm64                    |
| 3.0.3  | 高亮背景颜色改成透明                               |
| 3.0.2  | 背景颜色改回透明                                 |
| 3.0.1  | 统一Android和iOS的uexIndexBar.onTouchResult接口 |
| 3.0.0  | 索引功能插件                                   |

### Android

API版本:`uexIndexBar-4.0.0`

最近更新时间:`2016-6-24`

| 历史发布版本 | 更新内容          |
| ------ | ------------- |
| 4.0.0  | 4.0插件         |
| 3.0.2  | 插件嵌入到WebView中 |
| 3.0.1  | 索引文字支持配置颜色和内容 |
| 3.0.0  | 索引功能插件        |
