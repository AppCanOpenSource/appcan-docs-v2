[TOC]

 # 1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
 通用选择器插件
##1.1､说明
 该插件为通用选择器插件,是三级联动结构,支持数据源自定义和默认选中数据源,最多支持自定义三个级别的选择数据,但格式要符合要求,具体见下面.点击确认后返回选中数据源和其所在列的索引值.

##1.2､UI展示

##1.3､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=602_pluginlist) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4､平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统. 
有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明. 

#2､API概览
## 2.1､方法

### 🍭 open 打开选择器

`uexWheelPickView.open(params)`

**说明:**

通过此方法打开选择器,进入选择器界面.

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明           |
| ------ | ------ | ---- | ------------ |
| params | String | 是    | 接口所需数据,形式见下: |

```javascript
var params ={
    x:,
    y:,
    width:,
    height:,
    src:,
    select:[]
}
```

各字段含义如下:

| 参数名称   | 参数类型   | 是否必选 | 说明                    |
| ------ | ------ | ---- | --------------------- |
| x      | Number | 否    | 距离屏幕左边距离,默认为0         |
| y      | Number | 否    | 距离屏幕顶部距离,不传时视图在屏幕底部显示 |
| width  | Number | 否    | 宽                     |
| height | Number | 否    | 高                     |
| src    | String | 是    | 传入的数据源(json)的路径       |
| select | Array  | 是    | 选中数据源所在列的索引值,默认从0开始   |

**注意:json数据源的格式示例如下(name和sub为关键字,不可改动):**

```json
[
    {
        "name": "湖北省",
        "sub": [
            {
                "name": "武汉市",
                "sub": [
                    "武昌区",
                    "洪山区",
                    "江汉区",
                    "江夏区"
                ]
            },
            {
                "name": "宜昌市",
                "sub": [
                    "夷陵区",
                    "西陵区",
                    "伍家岗",
                    "白龙岗"
                ]
            },
            {
                "name": "襄阳市",
                "sub": [
                    "樊城区",
                    "襄城区",
                    " 襄州区",
                    "鱼梁洲"
                ]
            }
        ]
    },
    {
        "name": "湖南省",
        "sub": [
            {
                "name": "长沙市",
                "sub": [
                    "天心区",
                    "芙蓉区",
                    "开福区",
                    "雨花区"
                ]
            },
            {
                "name": "株洲市",
                "sub": [
                    "天元区",
                    "荷塘区",
                    "石峰区"
                ]
            },
            {
                "name": "湘潭市",
                "sub": [
                    "岳塘区",
                    "雨湖区"
                ]
            }
        ]
    },
    {
        "name": "江苏省",
        "sub": [
            {
                "name": "南京市",
                "sub": [
                    "下关区",
                    "玄武区",
                    "鼓楼区",
                    "秦淮区"
                ]
            },
            {
                "name": "苏州市",
                "sub": [
                    "吴中区",
                    "平江区",
                    "沧浪区",
                    "虎丘区"
                ]
            },
            {
                "name": "徐州市",
                "sub": [
                    "云龙区",
                    "泉山区",
                    "铜山区",
                    "鼓楼区"
                ]
            }
        ]
    },
    .....
]
```

**特别说明,如:select:[1,2,0],代表:湖南省-湘潭市-岳塘区**

**示例:**

```javascript
var params = {
     x:0,
     y:100,
     width:window.screen.width,
     height:300,
     src:"res://test.json",
     select:[13,3,0]
  };
 uexWheelPickView.open(JSON.stringify(params));                   
```
### 🍭 close 关闭选择器

`uexWheelPickView.close();`

**说明:**

通过此方法关闭选择器.

**参数:**

```
无
```

**示例:**

```javascript
uexWheelPickView.close();
```

##2.2､监听方法
### 🍭 onConfirmClick 对确认按钮的监听方法

`uexWheelPickView.onConfirmClick(result)`

**参数:**

```javascript
var result ={
    data:[],
    index:[] 
}
```

各字段含义如下:

| 参数名称  | 参数类型  | 是否必选 | 说明                  |
| ----- | ----- | ---- | ------------------- |
| data  | Array | 是    | 选中数据源的值             |
| index | Array | 是    | 选中数据源所在列的索引值,默认从0开始 |

**示例:**

```javascript
window.uexOnload = function() {
   uexWheelPickView.onConfirmClick = function(result){
             alert(result);
   }
 }
```

#3､更新历史 

### iOS

API版本: `uexWheelPickView-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | uexWheelPickView支持引擎4.0 |

### Android

API版本: `uexWheelPickView-4.0.1`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.1 | 解决3级分类不能显示全的bug |
| 4.0.0 | 通用选择器插件(uexWheelPickView)4.0 出新 |
