
`注意：`在IDE模拟器中进行本地预览或实时预览时，需要开发者手动创建离线缓存(icache)文件夹

>### appcan.icache(opts):

  文件离线缓存
````
    opts.maxtask:同时下载的最大任务数
    opts.success(path,session):下载成功后的回调 path:文件的路径，session：当前下载文件相关信息
    opts.dom：如果设置的是图片成功后设置src，否则设置background-image,如果不传不做任何操作
    opts.progress(data,session)：文件下载进度 data:文件下载进度，session：当前下载文件相关信息
    opts.fail(session):文件下载失败的回调，session：当前下载文件相关信息
````
**例如:**

[demo下载](http://appcan-download.oss-cn-beijing.aliyuncs.com/appcan_sdk%2FicacheDemo.zip "demo下载")
````
 var downloadpath = 'http://pic.pp3.cn/uploads//20121001j/bz/210.jpg';
var option = {
        maxtask: 3,
        url:downloadpath,
        progress: function(data, session){
            var sdata = JSON.parse(JSON.stringify(data));
            var statu = sdata['status'];
            var percent = sdata['percent'];                             
            switch (statu) {
                  case 0:
                        alert("下载中");
                        break;
                  case 1:
                        alert("下载完成");
                        break;
                  case 2:
                        alert("下载失败");
                        break;
                  default:
                        break;
            }
        },
        success: function(path, session){
            alert("path:"+path+", \nsession:"+JSON.stringify(session));
            alert("Download Success");
        },
        fail: function(session){
            alert("session:"+JSON.stringify(session));
            alert("Download Fail");
        }                                                            
    }; 
var cache = appcan.icache(option);
    cache.run(option);
````