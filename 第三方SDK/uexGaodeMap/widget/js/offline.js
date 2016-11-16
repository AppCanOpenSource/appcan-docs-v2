function download() {
  var city = document.getElementById("city").value;
  startDownload(city);
}

function startDownload(city, type) {
  var params;
  if (type == 1) {
    params = [{
      city: city
    }];
  } else {
    params = [{
      province: city
    }];
  }
  var data = JSON.stringify(params);
  uexGaodeMap.download(data, function(data) {
    alert("callback:" + JSON.stringify(data));
  });
}

function pause(city) {
  //var city = document.getElementById("city").value;
  var params = city.split(',');
  var data = JSON.stringify(params);
  uexGaodeMap.pause(data);
}

function restart(city) {
  //var city = document.getElementById("city").value;
  var params = city.split(',');
  var data = JSON.stringify(params);
  uexGaodeMap.restart(data);
}

function getAvailableCityList() {
  uexGaodeMap.getAvailableCityList(
    function(data) {
      alert("callback:" + JSON.stringify(data));
    }
  );
}

function getAvailableProvinceList() {
  uexGaodeMap.getAvailableProvinceList(
    function(data) {
      alert("callback:" + JSON.stringify(data));
    }
  );
}

function getDownloadList() {
  uexGaodeMap.getDownloadList(function(data) {
    alert("callback:" + JSON.stringify(data));
  });
}

function getDownloadingList() {
  uexGaodeMap.getDownloadingList(function(data) {
    alert("callback:" + JSON.stringify(data));
  });
}

function isUpdate(city, type) {
  var params;
  if (type == 1) {
    params = {
      city: city
    };
  } else {
    params = {
      province: city
    };
  }
  var data = JSON.stringify(params);
  uexGaodeMap.isUpdate(data, function(data) {
    alert("callback:" + JSON.stringify(data));
  });
}

function deleteOffline(city) {
  //var city = document.getElementById("city").value;
  var params = city.split(',');
  var data = JSON.stringify(params);
  uexGaodeMap.delete(data, function(data) {
    alert("callback:" + JSON.stringify(data));
  });
}

window.uexOnload = function(type) {
  if (type == 0) {
    uexGaodeMap.cbDownload = cbDownload;
    uexGaodeMap.cbPause = cbPause;
    uexGaodeMap.cbRestart = cbRestart;
    uexGaodeMap.cbGetAvailableCityList = cbGetAvailableCityList;
    uexGaodeMap.cbGetAvailableProvinceList = cbGetAvailableProvinceList;
    uexGaodeMap.cbGetDownloadList = cbGetDownloadList;
    uexGaodeMap.cbGetDownloadingList = cbGetDownloadingList;
    uexGaodeMap.cbIsUpdate = cbIsUpdate;
    uexGaodeMap.cbDelete = cbDelete;
    uexGaodeMap.onDownload = onDownload;

  }
};

function cbDownload(info) {
  alert(info);
}

function cbPause(info) {
  alert(info);
}

function cbRestart(info) {
  alert(info);
}

function cbStopDownload(info) {
  alert(info);
}

function cbGetAvailableCityList(info) {
  alert(info);
}

function cbGetAvailableProvinceList(info) {
  alert(info);
}

function cbGetDownloadList(info) {
  alert(info);
}

function cbGetDownloadingList(info) {
  alert(info);
}

function cbIsUpdate(info) {
  alert(info);
}

function cbDelete(info) {
  alert(info);
}

function onDownload(info) {
  var data = JSON.parse(info);
  if (data.status == 0) {
    //uexWindow.toast(1,5,data.name + " 正在下载...",0);
    document.getElementById('result').innerHTML = data.name + " 正在下载..." + data.completeCode + "%";
  }
  if (data.status == 1) {
    document.getElementById('result').innerHTML = data.name + " 正在解压...";
  }
  if (data.status == 4) {
    document.getElementById('result').innerHTML = "***";
    alert(data.name + " 离线地图下载成功！");
  }
  if (data.status == 3) {
    document.getElementById('result').innerHTML = data.name + " 暂停下载...";
  }
  if (data.status == -1) {
    document.getElementById('result').innerHTML = "***"
    alert(data.name + " 下载失败！");
  }
}
