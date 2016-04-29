function openNewWin(inWndName, html, inAniID, f, time) {
	if (inAniID) {
		uexWindow.open(inWndName, '0', html, inAniID, '', '', (f) ? f : 4, time ?
			time : 250);
	} else {
		uexWindow.open(inWndName, '0', html, '2', '', '', (f) ? f : 4);
	}
}

window.uexOnload = function() {

	uexQcloudAV.onStateChanged = function(state) {
		alert("onStateChanged " + state);
	};
	uexQcloudAV.onNetworkStateChanged = function(state) {
		alert("onNetworkStateChanged " + state);
	};
};

function openButton() {
	var params = {
		x: 20,
        		y: window.screen.height - 1400,
        		width: window.screen.width - 40,
        		height: 1200,
            data: [{
                   "videoType": 1,
                   "desc": "1080p",
                   "url": "http://2527.vod.myqcloud.com/2527_3f7c6ea2e57611e48c830517c16aa0bc.f20.mp4"
                   }, {
                   "videoType": 1,
                   "desc": "蓝光",
                   "url": "http://2527.vod.myqcloud.com/2527_3f7c6ea2e57611e48c830517c16aa0bc.f30.mp4"
                   }]
	};
	var data = JSON.stringify(params);
	uexQcloudAV.open(data);
}

function startButton() {
	var params = {
		//startSeconds : 100,//不传默认为0
		data: [{
			"videoType": 1,
			"desc": "1080p",
			"url": "http://2527.vod.myqcloud.com/2527_3f7c6ea2e57611e48c830517c16aa0bc.f20.mp4"
		}, {
			"videoType": 1,
			"desc": "蓝光",
			"url": "http://2527.vod.myqcloud.com/2527_3f7c6ea2e57611e48c830517c16aa0bc.f30.mp4"
		}]
	};
	var data = JSON.stringify(params);
	uexQcloudAV.start(data);
}

function playButton() {
	uexQcloudAV.play();
}

function stopButton() {
	uexQcloudAV.stop();
}

function pauseButton() {
	uexQcloudAV.pause();
}

function restoreButton() {
	uexQcloudAV.restore();
}

function closeButton() {
	uexQcloudAV.close();

}

function clearButton() {
	uexQcloudAV.clear();

}

function getCurrentTime() {
	var data = uexQcloudAV.getCurrentTime();
	alert("getCurrentTime " + data);
}

function seekTo() {
	uexQcloudAV.seekTo("3000");
}
