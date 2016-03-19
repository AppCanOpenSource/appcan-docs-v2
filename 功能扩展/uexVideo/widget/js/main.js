function openNewWin(inWndName,html,inAniID,f,time)
{
	if (inAniID) {
		uexWindow.open(inWndName,'0',html,inAniID,'','',(f)?f:4,time?time:250);
	}
	else {
		uexWindow.open(inWndName, '0', html, '2', '', '', (f) ? f : 4);
	}
}

function closeWin() {
    uexWindow.evaluateScript('root',0,'cp("root");');
    uexWindow.close(-1);
}



function callBack(){
    var name=window.localStorage.fName;
    var dataStr=window.localStorage.fData;
    document.getElementById('TestCallBack').innerHTML=name;
    document.getElementById('TestData').innerHTML=dataStr;
    alert(name+dataStr);
}

globalPost =function(){
    document.getElementById('globalPostArea').innerHTML=window.localStorage.gData;
}
