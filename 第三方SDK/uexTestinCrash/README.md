[TOC]

# 1. 简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
崩溃大师插件

## 1.1 说明
本插件包封装了Testin崩溃分析的相关模块,能根据实际用户发生的崩溃信息,帮助确定崩溃发生的规模以及严重程度,根据应用版本和崩溃类型进行分析。
开发者能够通过这些信息迅速找到影响用户最严重的崩溃进行修复与优化, 具体操作见[手册](http://newdocx.appcan.cn/newdocx/docx?type=1046_975 "手册")

## 1.2 UI展示
无

## 1.3 开源源码:
自定义插件下载:[点击此处](http://plugin.appcan.cn/details.html?id=407_index)  

## 1.4 术语表

-----
Path Types

|  协议头 |  Android对应路径 (其中"/sdcard/"等 同于"/storage/emulated/0/") | iOS对应路径  |
| ----- | ----- | ----- |
| res:// |widget/wgtRes/   |widget/wgtRes   |
|  wgts:// | /storage/emulated/0/widgetone/apps/ xxx(widgetAppId)/  |  /Documents/apps/xxx(widgetAppId)/ |
|  wgts:// |  /storage/emulated/0/widgetone/widgets/ |  /Documents/widgets/ |
|  file:///sdcard/ | /storage/emulated/0/  | 无  |
 
# 2、API概览

> ### init(param) 初始化配置

`uexTestinCrash.init(data)`

**说明:**

如果在项目中还引用了友盟、Takingdata 等同类产品,需要将它们的错误分析收集的功能取消。
                 

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| data| json| 必选 | json格式的配置数据,格式如下:|

```
var param{
	appKey;//应用的AppKey
	channel;//应用的渠道号
}
```

**平台支持:**

  
Android2.2+                  
iOS6.0+    
             

**版本支持:**

       
3.0.0+    
              

**示例:**

     

```
var params = {
	appKey:"502711a31753d62be9d08a5340229b2d",
	channel:"testin"
};
var data = JSON.stringify(params);
uexTestinCrash.init(data);

```

> ### setUserInfo(param) 设置用户名

`uexTestinCrash.setUserInfo(data)`

**说明:**

如不设置,平台将默认显示为"匿名用户"。
                 

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| data| json| 否 | json格式的配置数据,格式如下:|

```
var param{
	username;//用户名
}
```

**平台支持:**

  
Android2.2+                  
iOS6.0+    
             

**版本支持:**

       
3.0.0+    
              

**示例:**

     

```
var params = {
	username:"testtt"
};
var data = JSON.stringify(params);
uexTestinCrash.setUserInfo(data);
```

	
> ### leaveBreadcrumb(param) 上传面包屑

`uexTestinCrash.leaveBreadcrumb(data);`

**说明:**

面包屑与日志信息类似,是开发人员自己定义的文本字符串。开发人员通过插入面包屑来记录应用程序运行时的信息,如变量值、应用程序状态、代码进展、用户操作、程序性能,以及回调(如低存储器警告)等事件。对于每个面包屑会话,SDK中自动存储的start痕迹标记用户会话的开始,每个面包屑会话最多有100条面包屑,每条面包屑最多可包含199个字符。
                 

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| data| json| 是 | json格式的配置数据,格式如下:|

```
var param{
	breadcrumb;//面包屑字符串
}
```

**平台支持:**

  
Android2.2+                  
iOS6.0+    
             

**版本支持:**

    
3.0.0+    
              

**示例:**

     
```
var params = {
	breadcrumb:"breadcrumb"
};
var data = JSON.stringify(params);
uexTestinCrash.leaveBreadcrumb(data);
```

	
> ### test() 崩溃测试

`uexTestinCrash.test();`

**说明:**

该方法调用后可能会引起程序崩溃,仅供开发人员测试用。正常使用插件,请勿调用此方法!

**参数:**

无

**平台支持:**

  
Android2.2+                  
iOS6.0+    
             

**版本支持:**

3.0.0+    
              

**示例:**

     
```
uexTestinCrash.test();
```
		

#３、 更新历史

### iOS

API版本:`uexTestinCrash-3.0.1`

最近更新时间:`2015-04-27`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.1 | 云测崩溃大师发布 |

### Android

API版本:`uexTestinCrash-3.0.2`

最近更新时间:`2016-1-29`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.2 | 版本号修订,修复plugin.xml |
| 3.0.0 | 云测崩溃大师 |
