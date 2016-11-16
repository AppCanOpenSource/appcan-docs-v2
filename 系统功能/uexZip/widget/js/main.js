function openNewWin(inWndName, html, inAniID, f, time) {
	if (inAniID) {
		uexWindow.open(inWndName, '0', html, inAniID, '', '', (f) ? f : 4, time ? time : 250);
	}
	else {
		uexWindow.open(inWndName, '0', html, '2', '', '', (f) ? f : 4);
	}
}

function zipExplorer() {
	type = 0;
	uexFileMgr.explorer('')
}
function unZipExplorer() {
	type = 1;
	uexFileMgr.explorer('')
}
function unzipfileSuccess(data) {
	var obj = eval('(' + data + ')');
	document.getElementById('unzipPath').innerHTML = obj.fileExplorerPath;
	document.getElementById('hidunZip').value = obj.fileExplorerPath;

}
function zip() {
	uexZip.zip(document.getElementById('hidText').value,document.getElementById('inPath').value,function(result) {
		alert("function result: "+result);
	});
}

function unZip() {
	uexZip.unzip(document.getElementById('hidunZip').value,document.getElementById('outPath').value,function(result){
		alert("function result: "+result);
	});
}

function zipWithPassword(params) {
	uexZip.zipWithPassword(document.getElementById('hidText').value,document.getElementById('inPath').value,document.getElementById('pwd1').value,function(result){
		alert("function result: "+result);
	});
}

function unzipWithPassword(params) {
	uexZip.unzipWithPassword(document.getElementById('hidunZip').value,document.getElementById('outPath').value,document.getElementById('pwd2').value,function(result){
		alert("function result: "+result);
	});
}

window.uexOnload = function () {
	uexWidgetOne.cbError = function (opCode, errorCode, errorInfo) {
		alert(errorInfo);
	}
	var cText = 0;
	var cJson = 1;
	var cInt = 2;

	uexZip.cbZip = function (opCode, dataType, data) {
		switch (dataType) {
			case cText:
				alert("uex.cText");
				break;
			case cJson:
				alert("uex.cJson");
				break;
			case cInt:
                if (data == 0) {
                    alert("压缩成功");
                } else {
					alert("压缩失败");
                }
                break;
            default:
                alert("error");
		}
	}
	uexZip.cbUnZip = function (opCode, dataType, data) {
		switch (dataType) {
			case cText:
				alert("uex.cText");
				break;
			case cJson:
				alert("uex.cJson");
				break;
			case cInt:
				if (data == 0) {
                    alert("解压成功");
                } else {
					alert("解压失败");
                }
                break;
            default:
                alert("error");

		}

	}
	uexFileMgr.cbExplorer = function (opCode, dataType, data) {
		switch (dataType) {
			case cText:
				if (type == 0) {
                    document.getElementById('filePath').innerHTML = data;
                    document.getElementById('hidText').value = data;
                } else if (type == 1) {
					document.getElementById('unzipPath').innerHTML = data;
					document.getElementById('hidunZip').value = data;
                }
                break;
			case cJson:
				alert("uex.cJson");
				break;
			case cInt:
				alert("uex.Int");
				break;
			default:
                alert("error");
		}


	}
}

