[TOC]
 #1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
log插件
##1.1、 说明
向服务器发送log

 
##1.2 、 开源源码

插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=178_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
 #2、API概览

 
##2.1、方法

> ### 			sendLog		向服务器发送信息		

`uexLog.sendLog(log)`					
**			说明:		**
使用UDP协议发送log。服务器的ip在config.xml中logserverip中配置。端口号固定为:30050。
**  			参数:		**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
|  log | String类型 | 是 | 要发送的log信息 |
 
**  			平台支持:		**
Android2.2+					
iOS6.0+					
**  			版本支持:		**
3.0.0+					
**		示例:		**

```
<!DOCTYPE HTML>
            <html>
            <head>
            <meta http-equiv="Content-Type" content="text/html; <appcan>char<appcan>set=utf-8" />
                <meta name="viewp<appcan>or<appcan>t" content="target-densitydpi=device-dpi, width=device-width,
                    initial-scale=1.0, user-scalable=no" />
                    <link rel="stylesheet" type="text/css" href="../css/index.css">
                    <title>Log功能</title>
                    <script type="text/javascript">
                    </script>
                    </head>
                    <body>
                    <div class="tit">Log功能</div>
                    <div class="conb<appcan>or<appcan>">
                        <div class="consj">
                        <span>log内容:</span>
                        <input class="textbox" id="log" type="text"
                        value="我是log" >
                        <span>发送Log:</span>
                        <input class="btn" type="button" value="发送Log"
                        
                        onclick="uexLog.sendLog(document.getElementById(`log`).value);">
                        </div>
                        </div>
                        </body>
                        </html>
                    
```
#3、更新历史

### iOS

API版本:`uexLog-3.0.5`

最近更新时间:`2016-1-11`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.5 | GCDAsyncUdpSocket库更新 |
| 3.0.4 | 添加IDE支持 |
| 3.0.3 | 修复崩溃问题 |
| 3.0.2 | iOS8.3以上系统支持在iTunes查看Documents文件夹 |
| 3.0.1 | 使用新版Xcode重新编译,支持arm64 |
| 3.0.0 | Log功能插件 |

### Android

API版本:`uexLog-3.0.1`

最近更新时间:`2015-06-19`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.1 | 国际化 |
| 3.0.0 | Log功能插件 |
