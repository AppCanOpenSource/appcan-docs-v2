[TOC]
# 1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
## 1.1､说明
搜索框插件

## 1.2､UI展示

## 1.3､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=474_index ) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4､平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

# 2､API概览

## 2.1､方法

### 🍭 open 打开搜索框

`uexSearchBarView.open(json)`  

**说明:**


打开搜索框

**参数:**

```javascript
var json = {
    x:,
    y:,
    w:,
    h:,
    searchBar:{
        placehoderText:,
        textColor:,
        inputBgColor:
    },
    listView:{
        bgColor:,
        separatorLineColor:,
        itemTextColor:
    }
}
```

各字段含义如下:

| 字段名称               | 类型     | 是否必选 | 说明       |
| ------------------ | ------ | ---- | -------- |
| x                  | Number | 是    | 左间距      |
| y                  | Number | 是    | 上间距      |
| w                  | Number | 是    | 宽度       |
| h                  | Number | 是    | 高度       |
| searchBar          | Object | 否    | 搜索框样式    |
| placehoderText     | String | 否    | 输入框预置文字  |
| textColor          | String | 否    | 输入框中文字颜色 |
| inputBgColor       | String | 否    | 输入框背景色   |
| listView           | Object | 否    | 列表样式     |
| bgColor            | String | 否    | 背景色      |
| separatorLineColor | String | 否    | 分隔线颜色    |
| itemTextColor      | String | 否    | 列表项文字颜色  |

**示例:**

```javascript
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
运行效果:
![](/docImg/975/u10&#40;1&#41;.png)

### 🍭 close 关闭搜索框  

`uexSearchBarView.close()`

**说明:**


关闭搜索框  

**参数:**

无

**示例:**

```javascript
    uexSearchBarView.close()
```

### 🍭 clearHistory 清空搜索历史

`uexSearchBarView.clearHistory()`

**说明:**


清空搜索历史  

**参数:**

无

**示例:**

```javascript
    uexSearchBarView.clearHistory();
```
## 2.2､监听方法

### 🍭 onItemClick item被点击的监听方法

`uexSearchBarView.onItemClick(json);`

**参数:**

  

```
var json = {
    index:,//(必选) 索引
    keyword://(必选) 关键字
}
```

**示例:**

```
    uexSearchBarView.onItemClick = function(data){
        alert(data);
    }
```

### 🍭 onSearch 用户点击搜索之后的回调

`uexSearchBarView.onSearch(json);`

**参数:**

```
var json = {
    keyword://(必选) 关键字
}
```

**示例:**

```
    uexSearchBarView.onSearch = function(data){
        alert(data);
    }
```
# 3､更新历史

### iOS

API版本: `uexSearchBarView-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | uexSearchBarView适配4.0引擎 |

### Android

API版本: `uexSearchBarView-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 新增字符联想功能 |
