#appcan.widget

[TOC]

1、简介
===============
管理当前应用
---------------

2、API概览
===============

###2.1、方法

>### appcan.widget.startWidget(appId,animId,funName,info,animDuration,callback)

   在当前widget加载一个子widget

**参数:**

	appId：子widget的appId
	animId：子widget载入时的动画id:
		0：无动画
        1:从左向右推入
        2:从右向左推入
        3:从上向下推入
        4:从下向上推入
        5:淡入淡出
        6:左翻页
        7:右翻页
        8:水波纹
        9:由左向右切入
        10:由右向左切入
        11:由上先下切入
        12:由下向上切入
        13:由左向右切出
        14:由右向左切出
        15:由上向下切出
        16:由下向上切出
	funName：方法名，子widget结束时将String型的任意字符回调给该方法，可为空。 注意：只在主窗口中有效，
	浮动窗口中无效
	info：传给子widget的信息
	animDuration：动画持续时长，单位为毫秒，默认200毫秒
	callback(err,data,dataType,opId):(Function) 回调函数
		err:Error对象，如果为空表示没有错误
		data:回调返回的数据，0-成功 1-失败
		dataType:回调返回的数据类型，默认为2：Int类型
		opId:操作ID，在此函数中不起作用，可忽略

**平台支持:**

   Android 2.2+  
   iOS 6.0+

**JS-SDK版本支持:**

   1.0.0+

**例子:**

	appcan.widget.startWidget({
		appId : '12345',
		animiId : '1',
		funName : 'widgetDidFinish',
		info : 'open a widget',
		animDuration : 300,
		callback : function(err,data,dataType,opId){
			if(!err){
				alert("data:"+data);
			}
			
		}
	})

>### appcan.widget.finishWidget(resultInfo,appId,isWgtBG)

   退出一个widget

**参数:**

	resultInfo：此widget结束时，传递给opener的信息
	appId：要结束的widget的appId，为空时退出的是当前的widget
	Number：isWgtBG 结束此widget的方式，0表示销毁该widget，下次再调 用startWidget时，重新打开；1表示把该widget置于
	后台，下次再调用startWidget时，不重新打开，操作数据 全部保存。不传或为空时，默认为0。注意传该参数时，必须要传appId参数。

**平台支持:**

   Android 2.2+  
   iOS 6.0+

**JS-SDK版本支持:**

   1.0.0+

**例如：**

	appcan.widget.finishWidget({
		resultInfo : "finish a widget",
		appId : "12345",
		isWgtBG : 0
	});

>### appcan.widget.removeWidget(appId,callback)

   删除一个widget

**参数:**

	appId：widget的appId，主widget不能被删除
	callback(err,data,dataType,opId):(Function) 回调函数
		err:Error对象，如果为空表示没有错误
		data:回调返回的数据，0-成功 1-失败
		dataType:参数类型
		opId:操作ID，在此函数中不起作用，可忽略

**平台支持:**

   Android 2.2+  
   iOS 6.0+

**JS-SDK版本支持:**

   1.0.0+

**例子：**

	appcan.widget.removeWidget({
		appId : “12345”,
		callback : function(err,data,dataType,opId){
			if(!err){
				alert("data:"+data);
			}
		}
	});

>### appcan.widget.checkUpdate(callback)

   检查当前widget是否有更新

**参数:**
	
	  callback(err,data,dataType,opId):(Function) 回调函数
		err:Error对象，如果为空表示没有错误
	    data:检查结果0- 需要更新 1- 不需要更新 2- 错误
	    dataType:参数类型
	    opId:操作ID，在此函数中不起作用，可忽略


**平台支持:**

   Android 2.2+  
   iOS 6.0+

**JS-SDK版本支持:**

   1.0.0+

**示例：**

	appcan.widget.checkUpdate(function(err,data,dataType,opId){
		alert("data:"+data);
	})

	或者

	appcan.widget.checkUpdate({
		callback : function(err,data,dataType,opId){
			alert('data:'+data);
		}
	});

>### appcan.widget.loadApp(appInfo)

   loadApp：启动第三方应用（iOS）

**参数:**

	appInfo：(String)第三方应用的URLSchemes

**平台支持:**

   iOS 6.0+

**JS-SDK版本支持:**

   1.0.0+

**例如：**

	var appInfo = "http://www.baidu.com";
	appcan.widget.loadApp(appInfo);

>### appcan.widget.startApp(startMode,mainInfo,addInfo,optInfo,callback)

   startApp：启动第三方应用（Android）

**参数:**

	startMode：启动方式，0表示通过包名和类名启动，1表示通过Action启动
	optInfo：附加参数，键值对，{key:value}格式多个用英文”,”隔开
	startMode：启动类型，0或者1；
	mainInfo：包名（startMode为0时）；action(startMode为1时)
	addInfo：类名，为空时启动应用入口类（startMode为0时）；category或data（startMode为1时）
		json格式如下 
		{
		    "category": [
		        "android.intent.category.WID",
		        "android.intent.category.WID1"
		    ],
		    "data": {
		        "mimeType": "image/png",
		        "scheme": "sip"
		    }
		}
	callback(info):启动第三方应用的回调方法，该方法在未成功调用第三方应用时回调。
		info:回调返回信息；

**平台支持:**

   Android 2.2+

**JS-SDK版本支持:**

   1.0.0+

**注意事项：**

   如果通过包名类名启动AppCan应用，而且需要监听onLoadByOtherApp回调方法，则addInfo为必选。调用方法如下：
   若包名为com.appcan.develop(开发者在使用时只需要更换包名即可),则调用代码如下：

	var packageName = "com.appcan.develop";
	var className = "org.zywx.wbpalmstar.engine.EBrowserActivity";
	var optInfo = "{'key1':'value1'},{'key2':'value1'}";
	appcan.widget.startApp({
		startMode : 0, 
		mainInfo : packageName,
		addInfo :  className,
        optInfo : optInfo,
		callback:function(info){
			alert(info);
		}
	});

**示例：**

1.要启动的AndroidManifest.xml文件如下：

```

	<?xml version="1.0" encoding="utf-8"?>
	<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.dongjf.mytest"//com.dongjf.mytest即为包名
    android:versionCode="1"
    android:versionName="1.0" >
    <uses-sdk
        android:minSdkVersion="11"
        android:targetSdkVersion="18" ></uses>
    <application
        android:allowBackup="true"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
        <activity
            android:name="MainActivity"
            android:label="@string/app_name"
            android:icon="@drawable/icon1"
            android:windowSoftInputMode="stateHidden|adjustResize"
             >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" ></action>
                <category android:name="android.intent.category.LAUNCHER" ></category>
            </intent-filter>
            <intent-filter>
                <action android:name="com.djf.test.main" ></action>
                <category android:name="android.intent.category.DEFAULT" ></category>
            </intent-filter>
        </activity>
        <activity android:name="com.dongjf.mytest.SecondActivity">
    //通过包名启动，<intent-filter>标签非必须
            <intent-filter>
                <action android:name="com.djf.test.second" ></action>
    //通过action启动时，category DEFAULT属性必须，否则无法调起
                <category android:name="android.intent.category.DEFAULT" ></category>
                <data android:scheme="tel"></data>
            </intent-filter>
        </activity>
        <activity android:name="com.dongjf.mytest.ThirdActivity">
            <intent-filter>
                <action android:name="com.djf.test.second" ></action>
                <category android:name="android.intent.category.DEFAULT" ></category>
                <category android:name="android.intent.category.WID" ></category>
                <category android:name="android.intent.category.WID1" ></category>
                <data android:scheme="sip" android:mimeType="image/png"></data>
            </intent-filter>
       </activity>
       <activity  android:name="com.dongjf.mytest.ForthActivity">
            <intent-filter>
                <action android:name="com.djf.test.second" ></action>
                <category android:name="android.intent.category.WID" ></category>
                <category android:name="android.intent.category.DEFAULT" ></category>
                <data android:mimeType="text/html"></data>
            </intent-filter>
        </activity>
    </application>
    </manifest>
```

2.启动该应用对应界面示例如下：

```

	<!DOCTYPE HTML>
	<HTML>
	<head>      
	<meta charset="utf-8">
	    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
	<script type="text/javascript">
	function startAppP(mode){
	  var main,add,opt;
	  main = "com.dongjf.mytest";
	  switch(mode){
	    case 0:
	      appcan.widget.startApp({
			startMode : 0, 
			mainInfo : main
		  });//启动应用的入口主类
	      break;
	    case 1:
	      add = "com.dongjf.mytest.SecondActivity";
	      appcan.widget.startApp({
		  	startMode : 0, 
			mainInfo : main,
			addInfo :  add
		  });//启动应用的SecondActivity类
	      break;
	    case 2:
	      add = "com.dongjf.mytest.ThirdActivity";
	      opt = "{'key1': 'value1'},{'key2': 'value2'}";
	      appcan.widget.startApp({
			startMode : 0, 
			mainInfo : main,
			addInfo :  add,
            optInfo : opt
		  });//启动应用的ThirdActivity类
	      break;
	  }
	}
	function startAppA(mode){
	  var main,add,opt;
	  switch(mode){
	    case 0:
	      main = "com.djf.test.main";
	      appcan.widget.startApp({
			startMode : 1, 
			mainInfo : main
		});//启动应用的MainActivity类
	      break;
	    case 1:
	      main = "com.djf.test.second";
	      add = '{"data":{"scheme":"tel"}}';
	      appcan.widget.startApp({
			startMode : 1, 
			mainInfo : main,
			addInfo :  add
		});//启动应用的SecondActivity类
	      break;
	    case 2:
	      main = "com.djf.test.second";
	      add = '{"data":{"mimeType":"text/html"}}';
	      opt = "{'key1': 'value1'},{'key2': 'value2'}";
	      appcan.widget.startApp({
			startMode : 1, 
			mainInfo : main,
			addInfo :  add,
            optInfo : opt
		});//启动应用的ForthActivity类
	      break;
	    case 3:
	      main = "com.djf.test.second";
	      add = '{"data":{"mimeType":"image/png","scheme":"sip"}}';
	      opt = "{'key1': 'value1'},{'key2': 'value2'}";
	      appcan.widget.startApp(appcan.widget.startApp({
			startMode : 1, 
			mainInfo : main,
			addInfo :  add,
            optInfo : opt
		});//启动应用的ThirdActivity类
	      break;
	    case 4:
	      main = "com.djf.test.second";
	      add = '{"category":["android.intent.category.WID","android.intent.category.WID1"],"data":{"mimeType":"image/png","scheme":"sip"}}';
	      appcan.widget.startApp({
			startMode : 1, 
			mainInfo : main,
			addInfo :  add,
		});//启动应用的ThirdActivity类
	      break;
	  }
	}
	</script>
	</head>
	<body>
	  <input class="btn" type="button" value="通过包名启动0" onclick=startAppP(0)>
	    <input class="btn" type="button" value="通过包名启动1" onclick=startAppP(1)>
	    <input class="btn" type="button" value="通过包名启动2" onclick=startAppP(2)>
	    <br><br>
	   <input class="btn" type="button" value="通过Action启动0" onclick=startAppA(0)>
	    <input class="btn" type="button" value="通过Action启动1" onclick=startAppA(1)>
	    <input class="btn" type="button" value="通过Action启动2" onclick=startAppA(2)>
	   <input class="btn" type="button" value="通过Action启动3" onclick=startAppA(3)>
	    <input class="btn" type="button" value="通过Action启动4" onclick=startAppA(4)>  
	</body>
	</html>
```

>### appcan.widget.getOpenerInfo(callback)

   获取打开者传入此widget的相关信息。即调用startWidget时传入的info参数值。

**参数:**
	
	  callback(err,data,dataType,opId):(Function) 回调函数
		err:Error对象，如果为空表示没有错误
	    data:返回的数据 本widget的打开者通过startWidget函数打开本widget时传入的info参数值
	    dataType:参数类型
	    opId:操作ID，在此函数中不起作用，可忽略

**平台支持:**

   Android 2.2+  
   iOS 6.0+

**JS-SDK版本支持:**

   1.0.0+

**示例:**
	
	appcan.widget.getOpenerInfo(function(err,data,dataType,opId){
		if(!err){
			alert('data:'+data);
		}
	})
	或者
	appcan.widget.getOpenerInfo({
		callback : function(err,data,dataType,opId){
			if(!err){
				alert('data:'+data);
			}
		}
	})

>### appcan.widget.installApp(appPath)

   根据安装包所在路径安装一个apk(*Android方法*)。

**参数:**

	appPath：(String)apk所在路径

**平台支持:**

   Android 2.2+

**JS-SDK版本支持:**

   1.0.0+

**示例:**

	var path = "res://pay.apk"; 
 	appcan.widget.installApp({
		appPath : path
	});
	或者
	appcan.widget.installApp(path);

>### appcan.widget.getPushInfo(callback)

   获取推送消息,上报消息到管理后台

**参数:**
	
	  callback(data,dataType,opId):(Function) 回调函数
		err:Error对象，如果为空表示没有错误
	    data:返回的数据 json格式字符串
	    dataType:参数类型
	    opId:操作ID，在此函数中不起作用，可忽略

**平台支持:**

   Android 2.2+  
   iOS 6.0+

**JS-SDK版本支持:**

   1.0.0+

**示例:**

	 appcan.widget.getPushInfo({
		callback : function(err,data,dataType,opId){
			if(!err){
				alert('data:'+data);
			}	
		}
	});


>### appcan.widget.setPushNotifyCallback(cbFunction)

   如果应用开启了推送功能，那么当有消息推送进来时，平台将调用指定的cbFunction函数通知页面。

**参数:**

	cbFunction：(String)回调函数方法名

**平台支持:**

   Android 2.2+  
   iOS 6.0+

**JS-SDK版本支持:**

   1.0.0+

**示例:**

	 appcan.widget.setPushNotifyCallback('pushCallback');
	 function pushCallback(){
		alert("收到推送消息");
	 }

>### appcan.widget.setPushInfo(uId,uNickName)

   设置推送用户信息

**参数:**

	uId：用户ID
	uNickName：用户昵称

**平台支持:**

   Android 2.2+  
   iOS 6.0+

**JS-SDK版本支持:**

   1.0.0+

**示例:**

	 appcan.widget.setPushInfo({
		uId : 'user10001',
		uNickName : '姓名'
	});

>### appcan.widget.setPushState(state)

   设置推送服务的状态

**参数:**

	state: 推送服务状态0-关闭 1-开启

**平台支持:**

   Android 2.2+  
   iOS 6.0+

**JS-SDK版本支持:**

   1.0.0+

**示例:**

	 appcan.widget.setPushState(0);

>### appcan.widget.getPushState(callback)

   获取推送服务的状态

**参数:**

	callback(data,dataType,opId):(Function) 回调函数
		err:Error对象，如果为空表示没有错误
	    data:0-关闭 1-开启
	    dataType:参数类型
	    opId:操作ID，在此函数中不起作用，可忽略

**平台支持:**

   Android 2.2+  
   iOS 6.0+

**JS-SDK版本支持:**

   1.0.0+

**示例:**

	 appcan.widget.getPushState({
		callback : function(err,data,dataType,opId){
			if(!err){
				alert('data:'+data);
			}	
		}
	})

>### appcan.widget.isAppInstalled(appData,callback)

   是否安装某第三方应用

**参数:**

   	appData:(String)第三方应用数据,android平台为第三方应用包名；iOS平台为 Scheme Url
	callback(data):(Function) 回调函数
		err:Error对象，如果为空表示没有错误
	    data:0-已安装；1-未安装
		

**平台支持:**

   Android 2.2+  
   iOS 6.0+

**JS-SDK版本支持:**

   1.0.0+

**示例:**

	appcan.widget.isAppInstalled({
		appData : 'com.tencent.mobileqq',
		callback : function(err,data){
			if(!err){
				if(data == 0){
	            	alert('已安装');
	        	}else if(data ==1){
	            	alert('未安装');
	        	}else{
					alert(data);//错误
				}
			}	
			
		}
	});



###2.2 监听方法

- 所有的监听方法都得在root页面进行监听

>### appcan.widget.onLoadByOtherApp

被第三方应用调起的监听方法

**JS-SDK版本支持:**

   1.0.0+

**示例:**

	appcan.widget.onLoadByOtherApp = function(jsonData){
		alert(jsonData);
		//{"key1":"value1","key2":"value2"}
	}

>### appcan.widget.loadByOtherApp(callback)

   被第三方应用调起的监听方法

**参数:**

	 callback(jsonData):(Function) 回调函数
		jsonData:(String类型) 必选  传递的数据，json格式{"key1":"value1","key2":"value2","key3":"value3","key4":"value4"}

**JS-SDK版本支持:**

   1.0.0+

**示例:**

应用1启动应用2的注册代码(Android)
	
	var packageName ="com.appcan.develop";
	var className = "org.zywx.wbpalmstar.engine.EBrowserActivity";
	var optionInfo = '{"key1":"value1"},{"key2":"value2"}';
	appcan.widget.startApp({
		startMode:0,
		mainInfo:packageName,
		addInfo:className,
		optInfo:optionInfo,
		callback:function(info){//未成功调用起第三方app时执行此回调
			alert(info)
		}
	});

应用2入口页面注册监听代码：

	appcan.widget.loadByOtherApp(function(jsonData){
		alert(jsonData);
		//{"key1":"value1","key2":"value2"}
	});
    
>### appcan.widget.onSuspend

程序挂起的监听方法

**示例:**

	appcan.widget.onSuspend = function(){
		alert("程序挂起");
	}

>### appcan.widget.suspend(callback)

   程序挂起的监听方法

**参数:**

	 callback:(Function) 回调函数

**平台支持:**

   Android 2.2+  
   iOS 6.0+

**JS-SDK版本支持:**

   1.0.0+
		
**示例:**

	appcan.widget.suspend({
		callback : function(){
			alert("程序挂起");
		}
	});
	或者
	appcan.widget.suspend(function(){
		alert("程序挂起");
	});

>### appcan.widget.onResume

程序恢复的监听方法

**示例:**

	appcan.widget.onResume = function(){
		alert("程序恢复");
	}

>### appcan.widget.resume(callback)

   程序恢复的监听方法

**参数:**

	 callback():(Function) 回调函数

**平台支持:**

   Android 2.2+  
   iOS 6.0+

**JS-SDK版本支持:**

   1.0.0+
		
**示例:**

	appcan.widget.resume({
		callback : function(){
			alert("程序恢复");
		}
	});
	或者
	appcan.widget.resume(function(){
		alert("程序恢复");
	});
