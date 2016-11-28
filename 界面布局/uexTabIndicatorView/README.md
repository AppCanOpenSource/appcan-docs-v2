[TOC]

 # 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
 导航菜单指示器插件
##1.1、说明
该插件需要与容器配合使用 

##1.2、UI展示
![preview](preview/preview-ios.png)

##1.3、开源源码
插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统. 
有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明. 

#2、API概览
## 2.1、方法

### 🍭 open 打开指示器插件

`uexTabIndicatorView.open(params)`

**说明:**

通过此方法打开导航指示器视图

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明           |
| ------ | ------ | ---- | ------------ |
| params | String | 是    | 接口所需数据，形式见下： |

```javascript
var params ={
    x:,
    y:,
    w:,
    h:,
    bgColor:,
    dividerColor:,
  	indicatorColor:,
    bindMode:,
  	multiPopName:,
  	containerId:
}
```

各字段含义如下:

| 参数名称           | 参数类型   | 是否必选 | 说明                              |
| -------------- | ------ | ---- | ------------------------------- |
| x              | Number | 否    | 距离屏幕左边距离,默认为0                   |
| y              | Number | 否    | 距离屏幕顶部距离,默认为0                   |
| w              | Number | 否    | 宽                               |
| h              | Number | 否    | 高                               |
| bgColor        | String | 否    | 整个view 的背景色                     |
| dividerColor   | String | 否    | 每两个tab之间的间隔线的颜色                 |
| indicatorColor | String | 否    | 滚动指示器的颜色                        |
| containerId    | String | 否    | 容器ID （bindMode为0时需要传）           |
| multiPopName   | String | 否    | multiPop 的name （bindMode为1时需要传） |
| bindMode       | int    | 否    | 绑定模式 0：与容器绑定，1：与multiPop绑定，默认为0 |
| titles         | Array  | 是    | 顶部titles，String类型数组             |
**示例:**

与容器绑定：

```javascript
var containerId="123";                       
uexWindow.createPluginViewContainer({        
    id:containerId,                          
    x:0,                                     
    y:500,                                   
    w:1080,                                  
    h:1920,                                  
    titles:["头条","精选","轻松一刻","娱乐","热点","体育"] 
});                                          
uexXXXX.xxx(containerId);//在容器上添加相关插件       
var param = {                                
   x:0,                                      
   y:150,                                    
   w:1080,                                   
   h:150,                                    
   textColor:"#F44336",                      
   bgColor:"#FFFFFF",                        
   dividerColor:"#D32F2F",                   
   indicatorColor:"#D32F2F",                 
   containerId:containerId                   
};                                           
uexTabIndicatorView.open(param);                                   
```
与MultiPopover绑定：

```javascript
var top=1000;
var tabHeight=150;
var params ={
    content: [
              {
              inPageName:"p1",
              inUrl:"http://www.baidu.com",
              inData:""
              },
              {
              inPageName:"p2",
              inUrl:"https://www.taobao.com/",
              inData:""
              }
              ]
};

var paramStr = JSON.stringify(params);
uexWindow.openMultiPopover(paramStr,"multipop",0,0,top+tabHeight,1080,500,'',0,0);
uexWindow.setSelectedPopOverInMultiWindow("multipop", 1);
var param = {
        x:0,
        y:top,
        w:1080,
        h:tabHeight,
        textColor:"#F44336",
        bgColor:"#FFFFFF",
        multiPopName:"multipop",
        bindMode:1,
        dividerColor:"#D32F2F",
        indicatorColor:"#D32F2F",
        titles:["baidu","taobao"]
};
uexTabIndicatorView.open(param);
```

### 🍭 setVisible 设置隐藏或显示

`uexTabIndicatorView.setVisible(params);`

**说明:**

通过此方法隐藏和显示View.

**参数:**

params 为0或1 ，0为隐藏，1为显示

**示例:**

```javascript
uexTabIndicatorView.setVisible(1);
```

### 🍭 close 关闭

`uexTabIndicatorView.close();`

**说明:**

通过此方法关闭View.

**参数:**

```
无
```

**示例:**

```javascript
uexTabIndicatorView.close();
```

#3、更新历史 

### iOS

API版本: `uexTabIndicatorView-4.0.0`

最近更新时间:`2016-10-12`

| 历史发布版本 | 更新内容 |
| ------ | ---- |
|        |      |

### Android

API版本: `uexTabIndicatorView-4.0.0`

最近更新时间:`2016-7-27`

| 历史发布版本 | 更新内容 |
| ------ | ---- |
|        |      |