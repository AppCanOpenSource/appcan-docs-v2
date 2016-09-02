
[TOC]

#1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 

本地闹钟功能插件
##1.1、说明
本地通知功能,可以做到本地定时推送消息提醒,设置提醒消息时会在通知栏收到消息,提醒声音与系统设置的系统默认铃声提醒一致, 
**注意:所有的回调都会传到"root页面"(config.xml中配置的App起始页面即为root页面)**.

##1.2、UI展示

 ![](http://newdocx.appcan.cn/docximg/115302n2015n6d16w.png)
##1.3 、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=176_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4、平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用. 
##2、API概览


##2.1、方法

### 🍭add 注册通知		

`uexLocalNotification.add(id,time,mode,message,buttonTitle,ringPath,cycle,notifyCount,extras)`

**说明:**

注册通知	
​				

**参数:**

| 参数名称        | 参数类型     | 是否必选 | 说明                                       |
| ----------- | -------- | ---- | ---------------------------------------- |
| id          | String类型 | 是    | 通知的唯一标示符,取值范围[alarm_1,…,alarm_10].       |
| time        | Number类型 | 是    | 首次提醒的时间(距离1970年的毫秒数)                     |
| mode        | Number类型 | 是    | 黑屏时是否提示,0:不提示,1:提示.仅iOS有效.               |
| message     | String类型 | 是    | 通知内容                                     |
| buttonTitle | String类型 | 是    | 按钮标题，仅iOS有效                              |
| ringPath    | String类型 | 是    | 当前使用系统默认铃声,声音提示必须传"default"或者"system".   |
| cycle       | String类型 | 是    | 循环周期,值:[daily,weekly,monthly,yearly,once]. |
| notifyCount | Number类型 | 是    | 应用图标上显示的通知数,仅iOS有效.                      |
| extras      | String   | 否    | 额外的数据信息,extras为json字符串                   |

**示例:**

```javascript
var id = "alarm_1";
var message = "alarm_1";//
var time = (new Date()).getTime() + 2 * 1000;
var mode = 0;//黑屏时是否提示,0:不提示,1:提示.仅iOS有效.
var buttonTitle = "点我";//仅iOS有效
var ringPath = "default";
var cycle = "once";
var notifyCount = "4";//应用图标上显示的通知数,仅iOS有效.
var extras = {
    name:"Tony",
    sex:"male",
    age:34
};        uexLocalNotification.add(id,time,mode,message,buttonTitle,ringPath,cycle,notifyCount,JSON.stringify(extras));	
```

​		

### 🍭remove 移除通知	

`uexLocalNotification.remove(id)`	
​		

**说明:**

移除指定唯一标示符的通知	
​		

**参数:**

| 参数名称 | 参数类型     | 是否必选 | 说明                                 |
| ---- | -------- | ---- | ---------------------------------- |
| id   | String类型 | 是    | 通知的唯一标示符,取值范围[alarm_1,…,alarm_10]. |


​		

**示例:**

```javascript
uexLocalNotification.remove("alarm_1");
```



### 🍭removeAll 移除所有通知

`uexLocalNotification.removeAll()`	

**说明:**

移除所有通知	

**参数:**

无	

**示例:**

```javascript
uexLocalNotification.removeAll();
```
## 2.2、监听方法

### 🍭 onActive 用户退到后台,点击了通知监听		
`uexLocalNotification.onActive(notificationID,message,extras)`

**说明:**

用户退到后台,点击了通知监听	
​				

**参数:**

| 参数名称           | 参数类型     | 是否必选 | 说明                                 |
| -------------- | -------- | ---- | ---------------------------------- |
| notificationID | String类型 | 是    | 通知的唯一标示符,取值范围[alarm_1,…,alarm_10]. |
| message        | String   | 是    | 通知内容,message为json字符串               |
| extras         | String   | 否    | 额外的数据信息,extras为json字符串             |


​		

**示例:**

```javascript
uexLocalNotification.onActive = function(notificationID,message,extras){
    alert("onActive:" + notificationID + "," + message + "," + extras);
};
```



### 🍭 onMessage 用户处于前台的通知监听		
`uexLocalNotification.onMessage(notificationID,message,extras)`

**说明:**

用户处于前台的通知监听	
​				

**参数:**

| 参数名称           | 参数类型     | 是否必选 | 说明                                 |
| -------------- | -------- | ---- | ---------------------------------- |
| notificationID | String类型 | 是    | 通知的唯一标示符,取值范围[alarm_1,…,alarm_10]. |
| message        | String   | 是    | 通知内容,message为json字符串               |
| extras         | String   | 否    | 额外的数据信息,extras为json字符串             |


**示例:**

```javascript
uexLocalNotification.onMessage = function(notificationID,message,extras){
	alert("onMessage:" + notificationID + "," + message + "," + extras);
};
```



#3、更新历史

### iOS

API版本: `uexLocalNotification-4.0.0`

最近更新时间:`2016-7-13`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android

API版本: `uexLocalNotification-4.0.0`

最近更新时间:`2016-7-13`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
