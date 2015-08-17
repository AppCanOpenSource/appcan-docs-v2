[TOC]

>### appcan.device.vibrate(millisecond)

  使设备震动 

    millisecond:设备震动的时常 单位毫秒

**例如:**

````
//让手机振动10秒
appcan.device.vibrate(10000);
````
>###appcan.device.cancelVibrate()

  停止设备震动 

**例如:**

````
//取消手机振动
appcan.device.cancelVibrate()
//另外一种使用方式
var device = appcan.require('device');
device.cancelVibrate()
````
>### appcan.device.getInfo(infoId,callback)

  获取设备对应id的信息
````
  infoId:相关信息id 
  　0: 描述CPU频率的字符串，eg：“1024MHZ”。IOS平台获取不到时，返回“0” 
  　1: 描述系统版本的字符串，eg：“Android2.3.4”
  　2:标书设备制造商的字符串eg:“htc”
  　3:代表是否支持键盘的字符串0（不支持）或1（支持）
  　4:代表是否支持蓝牙的字符串0（不支持）或1（支持） 当设备有蓝牙功能时，即使蓝牙关闭，返回信息仍然是支持蓝牙，即值为字符串1。 在IOS上的蓝牙功能只支持同一应用间使用，和普遍人们理解的不同，视为不支持。
  　5:代表是否支持WIFI的字符串0（不支持）或1（支持） 当设备有wifi功能时，即使wifi关闭，返回信息仍然是支持wifi，即值为字符串1。
  　6:代表是否支持摄像头的字符串0（不支持）或1（支持)
  　7:代表是否支持GPS的字符串0（不支持）或1（支持） 当设备有gps功能时，即使gps关闭，返回信息仍然是支持gps，即值为字符串1。
  　8:代表当前移动网络数据连接是否可用（不含WIFI）的字符串0（不可用）或1（可用）
  　9:代表设备是否支持触屏的字符串0（不支持）或1 （支持）
  　10:代表此设备IMEI（国际移动设备唯一标识码）号的15位字符串，eg：“356357046156042”。 在IOS上，获得不到imei时可获得UUID，eg:“dea7f0e2f8c7dfd0c07555b96aff2d342587505b”
  　11:推送服务器需要的一个代表此设备的唯一令牌的字符串。 eg：“98d264a3 77689b33 6f1215e6 264ab0c5 55f45b4a ab61e6ff f667883a ef829ccb”,没有时返回空字符串。 Android的deviceToken是softToken。
  　12:设备类型，用来判断当前的设备是phone ouch或者pad(IOS专用，类型值参考常量表IOS设备类型)
 　 13:当前联网的方式(类型值参考常量表网络状态类型)
  　14:当前设备剩余的磁盘空间大小的字符串，eg：“12345678”单位：字节
  　15:当前移动网络运营商的名称，比如”中国联通”,如果获取不到返回空字符串
  　16:表示当前设备的WIFI mac地址 ，可作为设备的唯一标识，IMEI可能在某些不具备移动通讯的android平板或MP4上获取不到，但是android系统设备一般都会具有WIFI功能，所以mac地址作为设备唯一标识比IMEI更可靠
  　17:当前设备的型号名称，如“Galaxy Nexus”
 callback(err,data,dataType,optId):第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id
````
**例如:**

````
//获取手机WIFI信息
appcan.device.getInfo(5,function(err,data,dataType,optId){
    if(err){
        alert('get device error');
        return;
    }
    //{wifi:1}
});
//另外一种使用方式
var device = appcan.require('device');
device.getInfo(5,function(err,data,dataType,optId){
    if(err){
        alert('get device error');
        return;
    }
    //{wifi:1}
});
````
>### appcan.device.getDeviceInfo(callback)

  获取所有相关的设备信息
````
    callback(deviceInfo,singleInfo,i,len,completeCount):
	　　　deviceInfo当前已经获得的设备信息 
	   　　singleInfo正在读取的设备信息 
		 　  i设备信息id 
		  　 len设备信息总数 
			  completeCount已经获得的设备信息数
````
**例如:**

````

//获取所有相关的信息
appcan.device.getDeviceInfo(function(deviceInfo,singleInfo,i,len,completeCount){
    //deviceInfo 所有的信息，这是一个循环，每调用一次增加一个

});
//另外一种使用方式
var device = appcan.require('device');
device.getDeviceInfo(function(deviceInfo,singleInfo,i,len,completeCount){
    //deviceInfo 所有的信息，这是一个循环，每调用一次增加一个

});
````