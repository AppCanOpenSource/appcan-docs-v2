[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
弹出框插件
## 1.1、说明
防微信，创建一个弹出框插件,同时位置、背景颜色、字体颜色、字体大小等可以定制，具体见下面，同时可以对用户点击事件进行回调。
## 1.2、UI展示
  

## 1.3、开源源码
插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法
> ### openPopoverMenu 创建弹出框

`uexPopoverMenu.openPopoverMenu(params)`  

**说明:**

防微信，创建弹出框    

**参数:**

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

 ```
|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
| direction | Number | 是 | 位置说明符，0指定(x,y)在左上角，1指定(x,y)在右上角，2指定(x,y)在左下角，3指定(x,y)在右下角 |
| x | Number | 是 | x坐标，与direction相关，建议使用屏幕的比例，解决屏幕适配|
| y | Number | 是 | y坐标，，与direction相关，建议使用屏幕的比例 ，解决屏幕适配|
| bgColor | String | 是 | 背景颜色 |
| dividerColor | String | 是 | 分割线颜色 |
| textColor |String | 是 | 字体颜色 |
| textSize |Number | 是 | 字体大小，建议使用屏幕的比例，解决屏幕适配，如：window.screen.width*0.042 |
| data |Array | 是 | 展示的数据 |
| text|String | 是 | 展示的文字 |
| icon |String | 否 | 展示的图片路径 |

**平台支持:**


iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
var params = {
                    "x": window.screen.width*0.02,
                    "y": window.screen.height*0.1,
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
                };
                uexPopoverMenu.openPopoverMenu(JSON.stringify(params));
```




## 2.1、回调方法

> ###  cbOpenPopoverMenu 点击选中的回调方法   

`uexPopoverMenu.cbOpenPopoverMenu(selectRow)  `

** 参数:**    

|参数名称|参数类型 | 是否必选|  说明 |
|-----|-----|-----|----- |
| selectRow | String  | 是 | 选中的行号 |

**  版本支持:**
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


