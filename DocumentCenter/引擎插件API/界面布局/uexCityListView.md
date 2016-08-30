/*
Sort: 1
Toc: 1
*/

[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>
城市选择器 
   
## 1.1、说明<ignore>
该插件封装城市选择的功能

## 1.2、UI展示<ignore>

## 1.3、开源源码<ignore>
暂无

# 2、API概览<ignore>

## 2.1、方法<ignore>

### 🍭 open 打开城市选择

`uexCityListView.open(x,y,w,h)`

**说明:**

打开城市选择器,当用户在城市选择器上选择城市之后,会触发回调方法[onItemClick](#onitemclick 点击城市之后的回调 "onItemClick")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| x | String | 是 | x坐标 |
| y | String | 是 | y坐标 |
| w | String | 是 | 宽度|
| h | String | 是 | 高度|

**平台支持:**

  
Android2.2+  
iOS6.0+

**版本支持:**

  
3.0.0+

**示例:**

```
uexCityListView.open("0","600","720","1230");
```

### 🍭 setLocalCity 设置当前定位城市

`uexCityListView.setLocalCity(json);`

**说明:**

设置当前定位城市

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| localCity | String | 是 |json 格式字符串 |

```
 var localCity = '{"localCity":"北京"}';
```

**平台支持:**

  
Android2.2+
iOS6.0+

**版本支持:**

  
3.0.0+

**示例:**

```
var localCity = '{"localCity":"北京"}';
uexCityListView.setLocalCity(localCity);
```

### 🍭 setHotCity 设置热门城市

`uexCityListView.setLocalCity(json);`

**说明:**

设置热门城市

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| hotCity | String | 是 |json 格式的字符串数组,如下 |
```
var hotCity = '{"hotCity":["北京","重庆","成都","广州","厦门","杭州","上海","武汉","深圳"]}';
```

**平台支持:**

  
Android2.2+
iOS6.0+

**版本支持:**

  
3.0.0+

**示例:**

```
var hotCity = '{"hotCity":["北京","重庆","成都","广州","厦门","杭州","上海","武汉","深圳"]}';
uexCityListView.setHotCity(hotCity);
```

### 🍭 setAllCity 设置所有的城市

`uexCityListView.setAllCity(jsonPath)`

**说明:**

导入文件,设置所有的城市

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| jsonPath | String | 是 |存放所有城市数据的文件路径, 文件内容是json格式.文件的内容如下 |

`city.json`

```
{
allCity: {
 '安吉': 'anji',
 '安康': 'ankang'
 }
}
```

**平台支持:**

  
Android2.2+
iOS6.0+

**版本支持:**

  
3.0.0+

**示例:**

```
uexCityListView.setAllCity("res://city.json");
```

### 🍭 setViewStyle 设置城市选择视图的样式

`uexCityListView.setViewStyle(json);`

**说明:**

设置城市选择视图的样式

**参数:**

```
var params ='
{
 "searchBar": {//搜索栏配置参数
    "placehoderText":  //输入框的默认显示文本 
    "bgColor":  //背景色
    "textColor": //文字颜色 
    "inputBgColor": //输入框的背景色
 }, 
 "headerView": {//定位、最近访问、热门城市区域配置参数
    "bgColor": //背景色
    "separatorLineColor": //分割线颜色
    "sectionHeaderTitleColor": //标题颜色
    "itemTextColor": //每个城市的文字颜色
 }, 
 "listView": {//所有城市列表区域配置参数
    "bgColor": //背景色
    "separatorLineColor": //分割线颜色
    "sectionHeaderTitleColor": //分段标题的颜色 
    "sectionHeaderBgColor": //分段标题的背景色
    "itemTextColor": //每个城市的文字颜色
 }, 
 "indexBar": {
    "indexBarTextColor": //右边快速定位文字的颜色
 }
}
';
```

**平台支持:**

  
Android2.2+
iOS6.0+

**版本支持:**

  
3.0.0+

**示例:**

```
var params = '
{
 "searchBar": {
    "placehoderText": "请输入城市", 
     "bgColor": "#ffdddddd", 
     "textColor": "#ff0000ff", 
    "inputBgColor": "#ffffffff"
 }, 
 "headerView": {
    "bgColor": "#ffeeeeee", 
    "separatorLineColor": "#ff0000ff", 
     "sectionHeaderTitleColor": "#ff0000ff", 
     "itemTextColor": "#ff0000ff"
 }, 
 "listView": {
    "bgColor": "#ffffffff", 
    "separatorLineColor": "#ff0000ff", 
     "sectionHeaderTitleColor": "#ff0000ff", 
     "sectionHeaderBgColor": "#aadddddd", 
    "itemTextColor": "#ff0000ff"
 }, 
 "indexBar": {
    "indexBarTextColor": "#ff0000ff"
 }
}
';
uexCityListView.setViewStyle(params);
```

### 🍭 close 关闭城市选择视图

`uexCityListView.close();`

**说明:**

关闭城市选择视图

**参数:**

无

**平台支持:**

  
Android2.2+
iOS6.0+

**版本支持:**

  
3.0.0+

**示例:**

```
uexCityListView.close();
```

## 2.2、回调方法<ignore>

### 🍭 onItemClick 点击城市之后的回调

`uexCityListView.onItemClick(city);`

**说明:**

用户点击的城市列表中的某一个item后,回调这个函数

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| city | String | 是 | 用户点击的城市 |

**平台支持:**

  
Android2.2+  
iOS6.0+  

**版本支持:**

  
3.0.0+

**示例:**

```
uexCityListView.onItemClick = function(result){
   alert(result);
}
```

# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexCityListView-4.0.0`

最近更新时间:`2015-11-06`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android<ignore>

API版本: `uexCityListView-4.0.0`

最近更新时间:`2015-11-06`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
