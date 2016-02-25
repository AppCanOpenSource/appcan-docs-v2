[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
弹出框插件
## 1.1、说明
仿微信，创建一个弹出框插件,同时位置、背景颜色、字体颜色、字体大小等可以定制，具体见下面，同时可以对用户点击事件进行回调。
## 1.2、UI展示
  

## 1.3、开源源码
插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法
> ### openPopoverMenu 创建弹出框

`uexPopoverMenu.openPopoverMenu(params)`  

**说明:**

仿微信，创建弹出框，弹出框的宽和高自适应    

**参数:**

 ```
var params = {
       "x": ，//必选，与direction有关，距屏幕左边缘(direction为0或2)或右边缘(direction为1或3)的距离，建议使用屏幕的比例，解决屏幕适配
       "y": ,//必选，与direction有关，距屏幕顶部(direction为0或1)或底部(direction为2或3)的距离，建议使用屏幕的比例，解决屏幕适配
       "direction": ,//必选，位置说明符
       "bgColor": ,//必选，背景颜色
       "dividerColor": ,//必选，分割线颜色
       "textColor": ,//必选，字体颜色
       "textSize": ,//必选，字体大小，建议使用屏幕的比例，解决屏幕适配，如：window.screen.width*0.042较为理想
       "data":[   //必选，用于展示的数据数组
                 {
                     "icon": ,//可选，展示的图片路径
                     "text": //必选，展示的文字
                 },
                 {
                     "icon": ,//可选，展示的图片路径
                     "text":  //必选，展示的文字
                  },
                 {
                     "icon": ,//可选，展示的图片路径
                     "text":  //必选，展示的文字
                   },
                  {
                     "icon": ,//可选，展示的图片路径
                     "text":  //必选，展示的文字
                  }
               ]
             }
             
 
 ```
参数说明：
icon参数和text参数必须成对出现，或者不传icon参数，示例如下。

**平台支持:**


iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
var params = {
       "x": window.screen.width＊0.02,
       "y": window.screen.height＊0.1,
       "direction":2,
       "bgColor":'#FFC125',
       "dividerColor":'#FFC125',
       "textColor":'#FFFFFF',
       "textSize":window.screen.width*0.042,
       "data":[
                 {
                     "icon":'res://groupchat.png',
                     "text":'Group Chat'
                 },
                 {
                     "icon":'res://addcontacts.png',
                     "text":'Add Contacts'
                  },
                 {
                     "icon":'res://scanqrcode.png',
                     "text":'Scan QR code'
                   },
                  {
                      "icon":'res://feedback.png',
                      "text":'Feedback'
                  }
               ]
             }
uexPopoverMenu.openPopoverMenu(JSON.stringify(params));
             
  或者
  
var params = {
       "x": window.screen.width＊0.02,
       "y": window.screen.height＊0.1,
       "direction":2,
       "bgColor":'#FFC125',
       "dividerColor":'#FFC125',
       "textColor":'#FFFFFF',
       "textSize":window.screen.width*0.042,
       "data":[
                 {
                     "text":'Group Chat'
                 },
                 {
                     "text":'Add Contacts'
                  },
                 {
                     "text":'Scan QR code'
                   },
                  {
                     "text":'Feedback'
                  }
                ]
             }
       uexPopoverMenu.openPopoverMenu(JSON.stringify(params));
```




## 2.2、回调方法

> ###  cbOpenPopoverMenu 点击选中的回调方法   

`uexPopoverMenu.cbOpenPopoverMenu(selectRow)  `

**参数:**   

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
| selectRow | String  | 是 | 选中的行号 |

**版本支持:**
3.0.0+

**示例:**

```
uexPopoverMenu.cbOpenPopoverMenu = function(selectRow){
           alert("select index "+selectRow);
      }

```
#3、更新历史

### iOS

API版本:`uexPopoverMenu-3.0.0`

最近更新时间:`2015-2-2`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 弹出框插件 |


