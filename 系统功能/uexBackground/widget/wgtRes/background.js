



uexBackground.onLoad = function(){
    CCLog("onLoad 执行！")
    var result = uexBackground.addTimer(newTimerParams("timer1","cb1",3,1000));
    CCLog("开始timer1，间隔为1000ms,只执行3次,结果为:" + result);

    
}
var newTimerParams = function(identifier,cbName,times,interval){
 	var data = {
 		id:identifier,
 		callbackName:cbName,
 		repeatTimes:times,
    	timeInterval:interval
    };
    var params = JSON.stringify(data);
    CCLog(params);
    return params;
}

uexBackground.cb1 = function(count){
	CCLog("timer1 callback" + count);
	if (count == 2) {

		uexBackground.addTimer(newTimerParams("timer2","cb2",0,500));
    	uexBackground.addTimer(newTimerParams("timer3","cb3",0,500));
    	CCLog("开始timer2,timer3,间隔为500ms");
	};
}

uexBackground.cb2 = function(count){
	CCLog("timer2 callback" + count);

}

uexBackground.cb3 = function(count){
	CCLog("timer3 callback" + count);
	if (count == 5) {
		CCLog("关闭 timer2");
		uexBackground.cancelTimer(JSON.stringify(["timer2"]));
	};
	if (count == 7) {
		uexBackground.cancelTimer();
		CCLog("取消当前所有的timer")
		uexBackground.addTimer(newTimerParams("bgTimer","cbBgTimer",0,5000));
		CCLog("开始定位并上报数据")
	};
}

uexBackground.cbBgTimer = function(count){
	uexLocation.openLocation();
};

var XHROPID = "1";
var locateCount = 1;
var timestamp = 0

uexLocation.onChange = function(lat, lon){

	var time = new Date().getTime();
	var toPair = function(key,value){
		return "" + key + "=" + value
	}
	if (time - timestamp > 500) {
		timestamp = time;
		var token = uexWindow.getLocalData("token");
		var url = (function(latitude,longitude,count,token){
    		return serverURL + "?" + toPair("lat",latitude) + "&" + toPair("lon",longitude) + "&" + toPair("count",count) + "&" + toPair("token",token);
    		})(lat,lon,locateCount,token);
		uexXmlHttpMgr.open(XHROPID, "get", url, "0");
		uexXmlHttpMgr.send(XHROPID);

		CCLog("send request with url:" + url);
		locateCount++;
		
	}

	uexLocation.closeLocation();
}

uexXmlHttpMgr.onData = function(id,status,result,requestCode,response){
	CCLog("id:" + id + ",status:" + status + ",code:" + requestCode + ",response:" + response);
	if (status == "1" || status == "-1") {
		CCLog("finish request");
		uexXmlHttpMgr.close(XHROPID);
	};
	
}


	
