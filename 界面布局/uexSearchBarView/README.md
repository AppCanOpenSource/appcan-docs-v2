[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
## 1.1、说明
搜索框插件

## 1.2、UI展示

## 1.3、开源源码
插件测试用例与源码下载：[点击](xxxx ) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

> ### open 打开搜索框

`uexSearchBarView.open(json)`  
**说明:**  
打开搜索框

**参数：**  

```
var json = {
    x:,//(必选) 左间距
    y:,//(必选) 上间距
    w:,//(必选) 宽度
    h:,//(必选) 高度
    searchBar:{//(可选) 搜索框样式
        placehoderText:,//(可选) 输入框预置文字
        textColor:,//(可选) 输入框中文字颜色
        inputBgColor://(可选) 输入框背景色
    },
    listView:{//(可选) 列表样式
        bgColor:,//(可选) 背景色
        separatorLineColor:,//(可选) 分隔线颜色
        itemTextColor://(可选) 列表项文字颜色
    }
}
```
**平台支持：**  
Android 2.2+  
iOS 6.0+

**版本支持：**  
Android 3.0.0+  
iOS 3.0.0+
  
**示例：**

```
    var width = window.screen.width;
    var height = window.screen.height - 300;
    var param1 = {
        x:200,
        y:0,
        w:width,
        h:height,
        searchBar:{
            placehoderText:"搜索词",
            textColor:"#ff0000",
            inputBgColor:"#ffffff"
        },
        listView:{
            bgColor:"#ffffff",
            separatorLineColor:"#ff0000",
            itemTextColor:"#ff00ff"
        }
    };
    var data1 = JSON.stringify(param1);
    uexSearchBarView.open(data1);
```
运行效果：
![](http://i.imgur.com/x980gf9.png)


> ### close 关闭搜索框  

```
uexSearchBarView.close()
```

**说明:**  
关闭搜索框  

**参数：**  

无

**平台支持：**  

Android 2.2+  
iOS 6.0+  

**版本支持：**  

Android 3.0.0+  
iOS 3.0.0+
  
**示例：**

```
    uexSearchBarView.close()
```

> ### clearHistory 清空搜索历史

```
uexSearchBarView.clearHistory()
```  
**说明:**  
清空搜索历史  

**参数：**  

无

**平台支持：**
  
Android 2.2+  
iOS 6.0+

**版本支持：**  

Android 3.0.0+  
iOS 3.0.0+

**示例：**

```
    uexSearchBarView.clearHistory();
```
## 2.2、监听方法

> ### onItemClick item被点击的监听方法

`uexSearchBarView.onItemClick(json);`

**参数：**  

```
var json = {
    index:,//(必选) 索引
    keyword://(必选) 关键字
}
```
**平台支持：**

Android 2.2+

iOS 6.0+

**版本支持：**

Android 3.0.0+  

iOS 3.0.0+

**示例：**

```
    uexSearchBarView.onItemClick = function(data){
        alert(data);
    }
```

> ### onSearch 用户点击搜索之后的回调

`uexSearchBarView.onSearch(json);`

**参数：**

```
var json = {
    keyword://(必选) 关键字
}
```
**平台支持：**

Android 2.2+

iOS 6.0+

**版本支持：**

Android 3.0.0+

iOS 3.0.0+

**示例：**

```
    uexSearchBarView.onSearch = function(data){
        alert(data);
    }
```
# 3、更新历史
API 版本：uexSearchBarView-3.0.0(iOS) uexSearchBarView-3.0.0(Android)  

最近更新时间：2015-08-11

| 历史发布版本 | iOS更新 | 安卓更新 |
| ------------ | ------------ | ------------ |
| 3.0.0 | 搜索框 | 搜索框|