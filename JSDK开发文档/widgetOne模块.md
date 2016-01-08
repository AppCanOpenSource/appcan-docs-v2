#appcan.widgetOne

关于appcan系统全局对象操作的基础功能的封装

[TOC]

>### appcan.widgetOne.getPlatformName()


获取系统名称，如Android、iOS等。

**参数:**

	无

**平台支持：**

Android2.2+ 

iOS6.0+

**JS SDK版本支持**

1.0.0+

**例如：**

	//获取当前终端的系统名称
	var platname = appcan.widgetOne.getPlatName();
	//另外一种使用方式
	var widgetone = appcan.require("widgetOne");
	var platName = widgetone.getPlatName();

>### appcan.widgetOne.getPlatVersion()

  获取系统的版本，如2.3.4 、4.3.1等。

**参数:**

	无

**平台支持：**

Android2.2+ 

iOS6.0+

**JS SDK版本支持**

1.0.0+

**例如：**

	//获取当前终端系统的版本
	var platversion =appcan.widgetOne.getPlatVersion();
	
	//另外一种使用方式
	var widgetone = appcan.require("widgetOne");
	var platversion = widgetone.getPlatVersion();

>### appcan.widgetOne.isIOS7Style()

判断当前应用是否为iOS7风格，0为非iOS7风格，1为iOS7风格。

**参数:**

	无

**平台支持：**

iOS6.0+

**JS SDK版本支持**

1.0.0+

**例如：**

	//判断当前应用是否为iOS7风格
	var is=appcan.widgetOne.isIOS7Style();

	//另外一种使用方式
	var widgetone = appcan.require("widgetOne");
	var is = widgetone.isIOS7Style();

>### appcan.widgetOne.isFullScreen()

判断当前应用是否为全屏，0非全屏（显示状态栏），1为全屏（不显示状态栏）。

**参数:**

	无

**平台支持：**

iOS6.0+

**JS SDK版本支持**

1.0.0+

**例如：**

	//判断当前应用是否为全屏
	var is=appcan.widgetOne.isFullScreen();
	
	//另外一种使用方式
	var widgetone = apppcan.require("widgetOne");
	var is = widgetone.isFullScreen();

>### appcan.widgetOne.getPlatform(callback)

获取平台信息

**参数:**

     callback(err,data,dataType,opId):
     	err：当出现错误的时候error，否则为空
        data：返回当前手机平台的类型，0：IOS；1：Android；2：Chrome
        dataType: 返回数据类型，此方法未2，Number类型
        opId:操作ID，在此函数中不起作用，可忽略

**平台支持：**

Android2.2+
 
iOS6.0+

**JS SDK版本支持**

1.0.0+

**例如：**

	appcan.widgetOne.getPlatform(function(err,data,dataType,opId){
    	if(err){
        	alert(err);
        }else{
        	alert(data);
        }
	});

	//另外一种使用方式
	var widgetone = appcan.require("widgetOne");
	widgetone.getPlatform(function(err,data,dataType,opId){
    	if(err){
        	alert(err);
        }else{
        	alert(data);
        }
	});

>### appcan.widgetOne.exit(flag)

退出程序

**参数:**
	
	flag:Number ;当flag为0的时候不弹出关闭提示框，反之弹出（如果flag不为Number类型，则执行时不会弹出关闭提示框）

**平台支持：**

Android2.2+ 

iOS6.0+

**JS SDK版本支持**

1.0.0+

**例如：**

	appcan.widgetOne.exit(1);

	//另外一种使用方式
	var widgetone = appcan.require("widgetOne");
	widgetone.exit(1);

>### appcan.widgetOne.getCurrentWidgetInfo(callback)
	
获取当前widget信息


**参数：**

	callback(err,data,dataType,opId)
		err:判断获取当前widget信息是否出错，当err为空的时候，获取正常，反之返回错误信息
		data：当err为空的时候，返回当前widget的相关信息，json数据格式
		dataType：返回data的数据类型，此处应为1，json字符串
		opId：操作ID，在此函数中不起作用，可忽略

**平台支持：**

Android2.2+ 

iOS6.0+

**JS SDK版本支持**

1.0.0+

**例如：**

	appcan.widgetOne.getCurrentWidgetInfo(function(err,data,dataType,opId){
    	if(err){
         	alert(err);
        }else{
         	alert(data);
        }
	})；
	
	//另外一种使用方式
	var widgetone = appcan.require("widgetOne");
	widgetone.getCurrentWidgetInfo(function(err,data,dataType,opId){
	    if(err){
	    	alert(err);
	    }else{
	    	alert(data);
	    }
	})；

>### appcan.widgetOne.cleanCache(callback)

清除当前应用缓存，仅主widget调用此接口有效

**参数：**

	callback(err,data,dataType,opId)
		err:当出现错误的时候error，否则为空
        data:返回清除缓存结果；0：成功；1：失败
        dataType:回调返回数据类型，此处为2：Number
        opId:操作ID，在此函数中不起作用，可忽略

**平台支持：**

Android2.2+ 

iOS6.0+

**JS SDK版本支持**

1.0.0+

**例如：**

	appcan.widgetOne.cleanCache(function(err,data,dataType,opId){
		if(err){
	    	alert(err);
	    }else{
	     	alert(data);
	    }
	})；

	//另外一种方式
	var widgetone = appcan.require("widgetOne");
	widgetone.cleanCache(function(err,data,dataType,opId){
	    if(err){
	    	alert(err);
	    }else{
	    	alert(data);
	    }
	})

>### appcan.widgetOne.getMainWidgetId(callback)

获取主widget的appId


**参数：**

	callback(err,data,dataType,opId)
		err:判断获取主widget的appId是否成功，当err为空的时候，获取成功，反之获取失败，出现错误
		data:返回主widget的appId
		dataType:参数类型详见CONSTANT中Callback方法数据类型
		opId:操作ID，在此函数中不起作用，可忽略

**平台支持：**

Android2.2+ 

iOS6.0+

**JS SDK版本支持**

1.0.0+

**例如：**

	appcan.widgetOne.getMainWidgetId(function(err,data,dataType,opId){
    	if(err){
    		alert(err);
        }else{
        	alert(data);
        }
	})

	//另外一种使用方式
	var widgetone = appcan.require("widgetOne");
	widgetone.getMainWidgetId(function(err,data,dataType,opId){
	    if(err){
	    	alert(err);
	    }else{
	    	alert(data);
	    }
	})

>### appcan.widgetOne.error(callback)

出现异常时的回调方法

	callback(data,dataType,opId)
		data:错误信息
		dataType:错误代码详见ErrorCode
		opId:操作ID，在此函数中不起作用，可忽略

**说明：**


**JS SDK版本支持**

1.0.0+

**例如：**

	appcan.widgetOne.error(function(data,dataType,opId){
    	alert('data:'+data+';dataType:'+dataType);
	})

	//另外一种使用方式
	var widgetone = appcan.require("widgetOne");
	widgetone.error(function(data,dataType,opId){
    	alert('data：'+data+';dataType:'+dataType);
	})

>### appcan.widgetOne.onError

出现异常时的监控方法


**JS SDK版本支持**

1.0.0+

**例如：**

	appcan.widgetOne.onError = function(data,dataType){
		alert('错误信息：'+data);
		alert('错误信息类型：'+dataType);
	}


