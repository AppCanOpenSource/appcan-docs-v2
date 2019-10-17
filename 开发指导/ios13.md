## **ios13适配指南**

[引擎插件部分](####-引擎插件部分)

[关于iPhoneX等机型的刘海屏适配](####-关于iPhoneX等机型的刘海屏适配)

#### 引擎插件部分

引擎 - 最低支持系统版本<br>
iOS引擎最低支持的系统版本为 10.0<br>
目前全面适配ios13的引擎为：`iOS_Engine_4.4.21_190925_14`

> **特别提醒**：上述4.4版本引擎是4.0+的App项目使用的，如果您的项目还是3.0的，比如使用的引擎和插件都还是3.0版本的，那么请您升级App项目至4.0版本后再使用此引擎，不然打包会失败，因为3.0的项目版本太低，不支持此最新引擎。


适配ios13的插件如下：<br>
uexXmlHttpMgr-ios-4.3.6.1<br>
uexDownloaderMgr-ios-4.3.3.2<br>
uexDataBaseMgr-iOS-4.0.4<br>
uexDevice-iOS-4.0.8<br>
uexFileMgr-iOS-4.0.5<br>
uexJsonXmlTrans-iOS-4.0.1<br>
uexKeyChain-iOS-4.0.1<br>
uexSocketMgr-iOS-4.0.2<br>
uexUploaderMgr-iOS-4.0.4<br>
uexTouchID-ios-4.3.2.1<br>
uexEmail-ios-4.0.1.zip<br>
uexZip-ios-4.3.1.3<br>

#### 关于iPhoneX等机型的刘海屏适配

方法一：<br>
将代码放到全局的js中，appcan.ready执行就好了。<br>

```
var isIPhoneX = function(fn){
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {        
        if (screen.height == 812 && screen.width == 375){
            //是iphoneX
            try{
                $(".uh").css("padding","2em 0 0");
                $("#footer").css("padding",".55em 0 1em");
            }catch(e){}
        }else{
            //不是iphoneX
        } 
    }
}
```

方法二：<br>
适配 iPhone X,XR,XS MAX 可参照[经验贴](https://bbs.appcan.cn/forum.php?mod=viewthread&tid=64672)。