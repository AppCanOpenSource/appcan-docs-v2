### Callback Data Types

>  uex.cText=0;
>  uex.cJSON=1;
>  uex.cInt=2;

### Callback Int Values:

>  uex.cTrue=1;
>  uex.cFalse=0;
>  uex.cSuccess=0;
>  uex.cFailed=1;
>  uex.cExist=0;
>  uex.cNotExist=1;
>  uex.cPaySuccess=0;
>  uex.cPaying=1;
>  uex.cPayFailed=2;
>  uex.cPayPlugInError=3;
>  uex.cOrientationPortraitUp=1;
>  uex.cOrientationLandscapeLeft=2;
>  uex.cOrientationPortraitDown=4;
>  uex.cOrientationLandscapeRight=8;
>  uex.cFile=0;
>  uex.cFolder=1;

### DownLoadStatus

>  Uex.cDownLoading=0
>  Uex.cFinishDownLoad=1
>  Uex.cDownLoadError=2

### Download mode

>  uex.cNotBreakpoint=0
>  uex.cBreakpoint=1

### BaiduDataAnalysis Strategy

>  BaiduMobStatLogStrategyAppLaunch=0,//每次程序启动
>  BaiduMobStatLogStrategyDay=1,//每天的程序第一次进入前台
>  BaiduMobStatLogStrategyCustom=2,//根据开发者设定的时间间隔接口发送

### Device Info Types


| name                    | value | 说明                                       | cb回调返回值                  |
| ----------------------- | ----- | ---------------------------------------- | ------------------------ |
| uex.cOS                 | 1     | 此key对应的Value是一个描述系统 版本的字符串,eg:"Android2.3.4" | {os:xxx}                 |
| uex.cManufacturer       | 2     | 此key对应的Value是一个标书设备制造商 的字符串，eg:"htc"     | {manufacturer:xxx}       |
| uex.cIMEI               | 10    | 此Key的Value是一个代表此设备IMEI（国  际移动设备唯一标识码）号的15位字符串，eg: "356357046156042"。 在iOS上，获得是openUDID,开源的一个UDID替代方案。 | {imei:xxx}               |
| uex.cDeviceToken        | 11    | 此Key的value是推送服务器需 要的一个代表此设备的唯一令牌的字符串。 eg:"98d264a377689b336f1215e6264ab0c555f45b4aab61e6fff667883aef829ccb", 没有时返回空字符串。Android的deviceToken是softToken。 | {deviceToken:xxx}        |
| uex.cDeviceType         | 12    | 此key的value是一个设备类型， 用来判断当前的设备是phone或者pad。 uex.jvDeviceTypeIPhone=0;uex.jvDeviceTypeIPad=1; uex.jvDeviceTypeIPodTouch=2; | {deviceType:0}           |
| uex.cConnectStatus      | 13    | 此key的value表示当前联网 的方式(uex.jvConnectStatusUnreachability （无网络连接）uex.jvConnectStatusWifi（wifi连接）, uex.jvConnectStatus3G（3g连接）,uex.jvConnectStatusGPRS（gprs连 接）),uex.jvConnectStatus4G（4g网络） | {connectStatus:-1}       |
| uex.cRestDiskSize       | 14    | 此key的value表示 当前设备剩余的磁盘空间大小的字符串，eg:"12345678" 单位:字节 | {restDiskSize:10000}     |
| uex.cMobileOperatorName | 15    | 此key的 value表示当前移动网络运营商的名称，比如"中国联通",如 果获取不到返回空字符串 | {mobileOperatorName:xxx} |
| uex.cModel              | 17    | 此key的value表示当前设备的型号名 称，如"GalaxyNexus"    | {model:xxx}              |
| uex.cResolutionRatio    | 18    | 此key的value表示获得屏 幕的分辨率回调，例如:iphone4的分辨率为640\*960(格式固定，宽\*高) | {resolutionRatio:宽*高}    |
| uex.cSimSerialNumber    | 19    | 此key的value表示当前 设备的sim卡的序列号。只支持Android    | {simSerialNumber:序列号}    |
| uex.cUUID               | 20    | iPhone生成一个随机的UUID，Android返回空。iOS的UUID是softToken。 | {uuid:xxx}               |

### Path Types

| 协议头             | Android对应路径 (其中"/sdcard/"等 同于"/storage/emulated/0/") | iOS对应路径                           |
| --------------- | ---------------------------------------- | --------------------------------- |
| res://          | widget/wgtRes/  （备注：即phone根目录新建的wgtRes文件夹） | widget/wgtRes （备注：同安卓 ）           |
| wgt://          | /storage/emulated/0/widgetone/apps/ xxx(widgetAppId)/ | /Documents/apps/xxx(widgetAppId)/ |
| wgts://         | /storage/emulated/0/widgetone/widgets/   | /Documents/widgets/               |
| file:///sdcard/ | /storage/emulated/0/                     | 无（iOS不支持直接访问SD卡)                  |
| box://          | /data/data/xxx(package)/files/           |                                   |
| exterbox://     | /storage/emulated/0/Android/data/xxx(package)/files/ |                                   |

### File Open Modes:

>  uex.cRead=1;
>  uex.cWrite=2;
>  uex.cNew=4;
>  uex.cReader=8

### FileWriteModes

>  uex.cAppend=1;

### Keyboard Types

>  uex.StandardKB=0;
>  uex.NumberKB=1;
>  uex.EmailKB=2;
>  uex.URLKB=3;
>  uex.PasswordKB=4;

### MapStateCode

>  uex.cMapStateStart=0,//开始移动
>  uex.cMapStateMove=1,//正在移动
>  uex.cMapStateStop=2,//停止移动

### Platform Key Code

>  uex.cKeyCodeBack=0
>  uex.cKeyCodeMenu=1

### Platform Info

>  uex.cPlatformIOS=0;
>  uex.cPlatformAndroid=1;
>  uex.cPlatformChrome=2;

### Sensor Type:

>  uex.cAccelerometer=1;
>  uex.cOrientation=2;
>  uex.cMagnetic=3;
>  uex.cTemperature=4;
>  uex.ctextareassure=5;
>  uex.cLight=6;

### Sensor Rate

>  uex.cRateFastest=0
>  uex.cRateGame=1
>  uex.cRateUI=2
>  uex.cRateNormal=3

### UpLoad Status

>  Uex.cUpLoading=0
>  Uex.cFinishUpLoad=1
>  Uex.cUpLoadError=2

### Window Types

>  uex.cWindowTypeNormal=0
>  uex.cWindowTypeTop=1
>  uex.cWindowTypeBottom=2

### Window State

>  uex.cWindowStateForeGround=0
>  uex.cWindowStateBackGround=1

### Window Source Types

>  uex.cWindowSrcTypeUrl=0
>  uex.cWindowSrcTypeData=1
>  uex.cWindowSrcTypeUrlAndData=2

### Window Flags

>  uex.cWindowFlagNone=0//标记被open的window为普通window。

> uex.cWindowFlagOAuth=1//标记被open的window为专用于OAuth验证的window。

> uex.cWindowFlagObfuscation=2//标记被open的window要加载的网页为加密的网页。

> uex.cWindowFlagReload=4//标记被open的window无论是否已存在都将强行刷新页面。

> uex.cWindowFlagDisableCrossdomain=8//标记被open的window当中的任何url都将调用系统浏览打开。

> uex.cWindowFlagOpaque=16//标记被open的window当中的view为不透明的。

> uex.cWindowFlagHidden=32//标记被open的window为隐藏的。隐藏的window不会显示到屏幕上，只存在于后台。隐藏的window不可以再调用openwindow。

> uex.cWindowFlagtextareaOpen=64//标记被open的window将有一个或n个popOver的预加载，且只有此window中的这些popOver都加载完毕后，此window才会显示到屏幕上。

> uex.cWindowFlagEnableScale=128//标记被open的window或popOver将支持手势缩放。

> uex.cWindowFlagtextareaNotHidden=256//标记被open的window的上一个window在屏幕上不隐藏。如果当前window可能会调用uexWindow.setWindowFrame接口，则在open当前窗口时需传入此flag。该flag设置原因:Android平台系统的渲染机制不同于IOS，不在屏幕上的View必须要设置隐藏，否则只要存在于屏幕上的View，系统都会进行渲染，将会消耗非常大的CPU或者GPU资源，导致渲染变慢，卡顿。而IOS上则不用隐藏，IOS系统只会渲染屏幕最上层的View，位于底层的View，虽然也在屏幕上，但不会被渲染。当调用uexWindow.setWindowFrame将最上层的View移动位置后，IOS平台中，底下的View会露出来，此时系统会对其进行渲染；而Android平台的底层View此时是处于隐藏状态的，无法渲染，所以需要增加此flag，标志当前window的上一个window不隐藏。

> uex.cWindowFlagWebApp=512//标记被open的浮动窗口将用于打开WebApp。此浮动窗口将不进行默认字体的设置，缩放比例的设置等，WebApp的排版适配交由系统处理。注意:此flag仅用于open浮动窗口。

> uex.cWindowFlagSlidingClose=1024  使用此flag打开的窗口，可以使用手势由左向右滑动来关闭窗口。注意:第一次使用此flag之后,后续使用open方法(无论是否传入此flag)打开窗口,都可以使用手势滑动来关闭窗口。

>### WindowAnimationId 窗口动画Id


> **基础动画**

* uex.cWindowAnimationNone=0	// 无动画
* uex.cWindowAnimationLeftToRight=1//由左往右推入
* uex.cWindowAnimationRightToLeft=2//由右往左推入
* uex.cWindowAnimationUpToDown=3//由上往下推入
* uex.cWindowAnimationDownToUp=4//由下往上推入
* uex.cWindowAnimationFadeOutFadeIn=5//淡入淡出
* uex.cWindowAnimationLeftFlip=6//左翻页（android暂不支持）
* uex.cWindowAnimationRigthFlip=7//右翻页（android暂不支持）
* uex.cWindowAnimationRipple=8//水波纹（android暂不支持）
* uex.cWindowAnimationLeftToRightMoveIn=9//由左往右切入
* uex.cWindowAnimationRightToLeftMoveIn=10//由右往左切入
* uex.cWindowAnimationTopToBottomMoveIn=11//由上往下切入
* uex.cWindowAnimationBottomToTopMoveIn=12//由下往上切入

> **以下为close专用，与9，10，11，12对应:**

* uex.cWindowAnimationLeftToRightReveal=13//由左往右切出，与10对应
* uex.cWindowAnimationRightToLeftReveal=14//由右往左切出，与9对应
* uex.cWindowAnimationTopToBottomReveal=15//由上往下切出，与12对应
* uex.cWindowAnimationBottomToTotextareaveal=16//由下往上切出，与11对应


> **Circle Zoom 效果 (仅iOS)**

* uex.cWindowAnimationCircleZoomAtCenter =101
  * 打开页面时，以页面中心为圆心，页面按圆形轮廓展开
  * 关闭页面时，以页面中心为圆心，页面按圆形轮廓收缩
* uex.cWindowAnimationCircleZoomAtLeftTop =102 //同上，但是圆心位于页面左上角
* uex.cWindowAnimationCircleZoomAtRightTop =103 //同上，但是圆心位于页面右上角
* uex.cWindowAnimationCircleZoomAtLeftBottom =104 //同上，但是圆心位于页面左下角
* uex.cWindowAnimationCircleZoomAtRightBottom =105 //同上，但是圆心位于页面右下角


> **Bounce效果(仅iOS)**

* uex.cWindowAnimationBounceFromLeft = 106
  * 页面从左侧弹入
  * 使用此动画时，传入的动画时间animDutarion无效，需通过配置extras里的bounciness和speed来控制动画时间
* uex.cWindowAnimationBounceFromTop = 107//同上，但页面从顶端弹入
* uex.cWindowAnimationBounceFromRight = 108//同上，但页面从右侧端弹入
* uex.cWindowAnimationBounceFromBottom = 109//同上，但页面从底端弹入


### Window AnimCurveType

>  uex.cViewAnimaCurveNone=0;//无运动曲线,做线性平滑运动
>  uex.cViewAnimaCurveEaseInOut=1;//先加速后减速运动
>  uex.cViewAnimCurveEaseIn=2;//加速运动
>  uex.cViewAnimCurveEaseOut=3;//减速运动
>  uex.cViewAnimCurveLinear=4;//动画线性平滑运动

### Window Toast Location

>  uex.cToastLocationLeftTop=1
>  uex.cToastLocationTop=2
>  uex.cToastLocationRightTop=3
>  uex.cToastLocationLeft=4
>  uex.cToastLocationMiddle=5
>  uex.cToastLocationRight=6
>  uex.cToastLocationBottomLeft=7
>  uex.cToastLocationBottom=8
>  uex.cToastLocationRightBottom=9

### Window BounceView Types

>  uex.cBounceViewTypeTop=0
>  uex.cBounceViewTypeBottom=1

### Window BounceView State

>  uex.cBounceViewStatePullToReload=0
>  uex.cBounceViewStateReleaseToReload=1
>  uex.cBounceViewStateLoading=2

### Window BounceView Parm Key

>  uex.cBounceParmKeyImagePath="imagePath"
>  //下拉状态小图标的路径，只支持res://格式。

> uex.cBounceParmKeyTextColor="textColor"
> //展示下拉状态文字的颜色。支持的格式为"#"3位，或者7位，以及,rgba()格式。

> uex.cBounceParmKeyLevelText="levelText"
> //显示的二级文字，如:"上次更新时间:xxxxx"。

> uex.cBounceParmKeyPullToReloadText="pullToReloadText"
> //开始拖动直到超过刷新临界线之前显示的文字，如:"拖动刷新"。

> uex.cBounceParmKeyreleaseToReloadText="releaseToReloadText"//拖动超过刷新临界线后显示的文字，如:"释放刷新"。

> uex.cBounceParmKeyLoadingText="loadingText"
> //拖动超过刷新临界线并且释放拖动，进入刷新状态时显示的文字，如:"加载中，请稍等"。

> uex.cBounceParmKeyLoadingImagePath="loadingImagePath"
> //拖动超过刷新临界线并且释放拖动，进入刷新状态时显示的loading状态小图标，默认为系统的小圈圈。此字段在东航项目中起作用。

### XmlHttpRequest Method

>  uex.cXmlHtttextareaquestMethodGet=get
>  uex.cXmlHtttextareaquestMethodPost=post

### XmlHttpRequestStatus

>  uex.cXmlHtttextareaquestStatusReceive=0
>  uex.cXmlHtttextareaquestStatusFinish=1
>  uex.cXmlHtttextareaquestStatusError=-1

### XmlHttpRequestDataType

>  uex.cXmlHtttextareaquestPostText=0
>  uex.cXmlHtttextareaquestPostBinary=1

