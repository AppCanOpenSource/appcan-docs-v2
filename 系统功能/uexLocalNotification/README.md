
[TOC]

#1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 

本地闹钟功能插件
##1.1、说明
本地通知功能,可以做到本地定时推送消息提醒,设置提醒消息时会在通知栏收到消息,提醒声音与系统设置的系统默认铃声提醒一致 

##1.2、UI展示

 ![](http://newdocx.appcan.cn/docximg/115302n2015n6d16w.png)
##1.3 、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=176_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
 #2、API概览

 
##2.1、方法

> ###add注册通知		

`uexLocalNotification.add(id,time,mode,message,buttonTitle,ringPath,cycle,notifyCount,extras)`

**说明:**

注册通知	
				

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| String类型| 是 |  通知的唯一标示符,取值范围[alarm_1,…,alarm_10]。 |
| time|Number类型 | 是 | 首次提醒的时间(距离1970年的毫秒数)	 |
| mode|Number类型 | 是 | 黑屏时是否提示,0:不提示,1:提示。仅iOS有效。 |
| message|String类型 | 是 | 通知内容 |
| buttonTitle|String类型 | 是 | 按钮标题 |
| ringPath|String类型 | 是 | 当前使用系统默认铃声,声音提示必须传"default"或者"system"。 |
| cycle|String类型 | 是 | 循环周期,值:[daily,weekly,monthly,yearly]。 |
| notifyCount|Number类型 | 是 | 应用图标上显示的通知数,仅iOS有效。 |
| extras | String | 否 | 额外的数据信息,extras为json字符串 |
 
 

**平台支持:**

Android2.2+					
iOS6.0+		
			

**版本支持:**

3.0.0+		
			

**示例:**

见removeAll示例		
			
> ###remove	移除通知	

`uexLocalNotification.remove(id)`	
		

**说明:**

移除指定唯一标示符的通知	
		

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| id| String类型| 是 |  通知的唯一标示符,取值范围[alarm_1,…,alarm_10]。 |
 

**平台支持:**

Android2.2+			
iOS6.0+	
		

**版本支持:**

3.0.0+	
		

**示例:**

见removeAll示例	
		
> ### removeAll 移除所有通知

`uexLocalNotification.removeAll()`	

**说明:**

移除所有通知	

**参数:**

无	

**平台支持:**

Android2.2+	
iOS6.0+	

**版本支持:**

3.0.0+	

**示例:**

```
<!DOCTYPE HTML>
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="stylesheet" type="text/css" href="css/index.css">
        <title>本地通知功能</title>
        <script type="text/javascript">
        function addNotification() {
		alert("已经设置闹钟,4秒钟后将会提醒!");
		var d = new Date();
    d = d.getTime() + 4*1000;

	  uexLocalNotification.add("alarm_6", d, 1, "message body", "ok", "", "daily", "5",'{"key1":"value1","key2":"value2"}');
	}
	
	function onActiveCallBack(notificationID,message,extras) {
	alert("onActive:"+notificationID+"\nmessage:"+message+"\nextra:"+extras);
	}
	function onMessageCallBack(notificationID,message,extras) {
	alert("onMessage:" + notID  +  "\nmessage:" + message+"\nextra:"+extras);
	}
	window.uexOnload = function(){
		uexLocalNotification.onActive = onActiveCallBack;
		uexLocalNotification.onMessage = onMessageCallBack;
	}
        </script>
        </head>
        <body>
        <div class="tit">本地通知功能</div>
        <div class="conbor">
            <div class="consj">
            <span>1.添加本地通知</span>
            <input class="btn" type="button" value="添加本地通知" onclick="addNotification()">
            <span>2.删除指定本地通知:</span>
            <input class="btn" type="button" value="删除指定本地通知" onclick="uexLocalNotification.remove(`alarm_6`)">
            <span>3.删除全部本地通知</span>
            <input class="btn" type="button" value="删除全部本地通知" onclick="uexLocalNotification.removeAll()">
            </div>
            <input class="btn" type="button" value="返回" onclick="uexWindow.back();">
            </div>
            </body>
            </html>
            
        
```
## 2.2、监听方法

> ### onActive		用户退到后台，点击了通知监听		
`uexLocalNotification.onActive(notificationID,message,extras)`

**说明:**

用户退到后台，点击了通知监听	
				

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| notificationID | String类型| 是 |  通知的唯一标示符,取值范围[alarm_1,…,alarm_10]。 |
|message | String | 是 | 通知内容,message为json字符串 |
| extras | String | 否 | 额外的数据信息,extras为json字符串 |
 

**平台支持:**

					
iOS6.0+		
			

**版本支持:**

iOS 3.0.7+			
		

**示例:**

见removeAll示例

> ### onMessage		用户处于前台的通知监听		
`uexLocalNotification.onMessage(notificationID,message,extras)`

**说明:**

用户处于前台的通知监听	
				

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| notificationID | String类型| 是 |  通知的唯一标示符,取值范围[alarm_1,…,alarm_10]。 |
|message | String | 是 | 通知内容,message为json字符串 |
| extras | String | 否 | 额外的数据信息,extras为json字符串 |
 

**平台支持:**

					
iOS6.0+		
			

**版本支持:**

iOS 3.0.7+			
		

**示例:**

见removeAll示例
#3、更新历史

### iOS

API版本:`uexLocalNotification-4.0.0`

最近更新时间:`2016-7-13`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持引擎4.0 |
| 3.0.7 | 添加用户点击了通知的监听方法 |
| 3.0.6 | 添加IDE支持 |
| 3.0.5 | 删除info.plist |
| 3.0.4 | 添加国际化支持 |
| 3.0.3 | 添加对接收到本地通知的处理方法 |
| 3.0.2 | 修复iOS8.0+系统上可能不能正常发送通知的bug |
| 3.0.1 | 本地闹钟功能增加只循环一次和 传入铃声代码默认写死 |
| 3.0.0 | 本地闹钟功能插件 |

### Android

API版本:`uexLocalNotification-4.0.0`

最近更新时间:`2016-7-13`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持引擎4.0 |
| 3.0.9 | 修复删除指定本地通知失败的问题 |
| 3.0.8 | 修复部分机型通知没有提示音的问题 |
| 3.0.7 | 修复部分机型闪退的问题 |
| 3.0.6 | 修复应用在后台被杀后无法通知的问题 |
| 3.0.5 | 解决查看通知后通知不关闭的问题, 解决不能删除本地通知的问题 |
| 3.0.4 | 解决铃声不响问题 |
| 3.0.3 | 解决铃声周期循环问题 |
| 3.0.2 | 修复在点击弹出菜单时报错问题 |
| 3.0.1 | 修复有时不提醒bug,增加周期提醒 |
| 3.0.0 | 本地闹钟功能插件 |
