/*
Sort: 4            //文档排序，值为数值。冒号为英文冒号，且后带一个英文空格。
Toc: 0             //是否显示常用入口字段，代替之前的层级目录。1:显示，0或不写:不显示。冒号为英文冒号，且后带一个英文空格。
Title: 打包失败原因
keywords: appcan开发文档,打包失败原因 
description: 用户在使用在线打包功能打包时可能遇到打包失败的问题，本文主要描述集中常见的问题用户可以对照排除打包常见的错误。 IDE本地打包相关问题请查看文档常见问题之IDE，还有其他可能原因 。更多appcan开发文档，请见http://newdocx.appcan.cn
*/


- [如何解决打包失败](#-如何解决打包失败 "如何解决打包失败")
- [Android](#-Android "Android")
- [iOS](#-iOS- "iOS")

#### **如何解决打包失败**
用户在使用在线打包功能打包时可能遇到打包失败的问题，本文主要描述集中常见的问题用户可以对照排除打包常见的错误。

IDE本地打包相关问题请查看文档[常见问题之IDE](/IDE/faq "常见问题之IDE")，还有其他可能原因 <a href="http://bbs.appcan.cn/forum.php?mod=viewthread&tid=44701" target="_blank">关于打包失败问题汇总</a>

**一个常见初级错误：**在分析打包失败日志之前，检查项目中是否有中文文件名。
###### **Android**
打包失败的log里面一般最下面会有一个What went wrong,大致说明是什么原因导致打包失败。如Execution failed for task ':processReleaseManifest'.是合并AndroidManifest.xml 的时候出了问题。然后查找Error,联系上下文一般就可以看到具体的失败原因。常见的失败情况如下：

 （1）duplicated with element declared at AndroidManifest.xml
  原因及解决办法：
   某个插件中有跟引擎或者其他插件中的AndroidManifest.xml项有重复。找出来删掉即可。

（2）Element service#org.zywx.wbpalmstar.platform.push.PushService at AndroidManifest.xml
原因及解决办法：
 更新到最新引擎(推荐)或者修改引擎包中的AndroidManifest.xml,将PushService所在的<Service>标签删掉

（3）Element meta-data#com.baidu.lbsapi.API_KEY at AndroidManifest.xml
 原因及解决办法：
 百度地图与location插件冲突，将uexLocation 中的AndroidManifest.xml删掉，作为自定义插件上传即可。

（4）The file name must end with .xml or .png
原因及解决办法：
 某个插件的res目录下有多余的文件，删掉即可。如harvest.sig

（5）Found item Color/** more than one time和Found item String/** more than one time
 原因及解决办法：
某个插件里面res/values下的color.xml或者strings.xml有重复的资源，删掉即可或者注意命名规则：属性名必须以插件名开头

（6）Missing 'name' key attribute on element action at AndroidManifest.xml
原因及解决办法：
action必须要有name属性，加上即可。

（7）9-patch image *** Must have one-pixel frame that is either transparent or white.
 原因及解决办法：
 .9.png图片有问题，替换成制作规范的.9.png图片即可
（8）

        [2016-02-16 11:14:52,276] DEBUG Thread-8502 //opt/applog//114/999/08/11499908-android - /ram_disk/temp/JFDD2WGhjHLL/WebkitCorePalm/AndroidManifest.xml:30:1-41:20 Error:
        [2016-02-16 11:14:52,276] DEBUG Thread-8502 //opt/applog//114/999/08/11499908-android -         Element activity#org.zywx.wbpalmstar.engine.EBrowserActivity at AndroidManifest.xml:30:1-41:20 duplicated with element declared at AndroidManifest.xml:4:9-11:20
		        Undefined symbols for architecture arm64:
        "_OBJC_CLASS_$_MQManager", referenced from:
       objc-class-ref in libuexMeiQia.a(EUExMeiQia.o)
       objc-class-ref in libuexMeiQia.a(MQServiceToViewInterface.o)
        [2016-03-23 10:58:03,783] DEBUG SimpleAsyncTaskExecutor-1 //opt/applog//114/069/69/11406969-iphone - ld: symbol(s) not found for architecture arm64
        [2016-03-23 10:58:03,783] DEBUG SimpleAsyncTaskExecutor-1 //opt/applog//114/069/69/11406969-iphone - clang: error: linker command failed with exit code 1 (use -v to see invocation)

  原因及解决办法：
  EBrowserActivity与官方最新安卓引擎版本重复，定位找到有问题插件包，然后找到打开AndroidManifest.xml文件 把日志报错的EBrowserActivity那一整段删掉 重新压缩 上传插件打包试试，是否打包成功

（9）在线打包时出现`Execution failed for task ':transformClassesWithDexForRelease'`类型的报错:
出现这种错误的主要原因是类名冲突，请先根据日志找到冲突的类名以及它们分别所属的文件
  
* 如果是您的插件和非官方的插件冲突
	* 请联系插件作者协商解决
* 如果您的插件和官方插件或者引擎冲突
	* 下载失败log定位到关键error，可尝试去除插件包里的冲突类或jar包，自定义插件重新打包
	* 如无法解决，请及时反馈，下载失败log找到关键错误点，可通过bbs或技术交流群反馈给官方
<div class="alert alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button> 注意!
 打包失败的log里面一般最下面会有一个What went wrong,大致说明是什么原因导致打包失败。如Execution failed for task ':processReleaseResources'.是合并AndroidManifest.xml 的时候出了问题。可能原因一直接使用特殊插件如uexJPush（除此之外一些需要config.xml文件进行相关配置的插件）打包，没有[配置config文件](/dev-guide/config·xml "配置config文件")，会报这种错；可能原因二是原来文件夹中有一些非html的`中文命名`文件等非法中文命名文件。然后查找Error,联系上下文一般就可以看到具体的失败原因。
</div>

###### **iOS**
   打包失败的log里面一般最下面会有一个failed,大致说明是什么原因导致打包失败。 然后查找Error,联系上下文一般就可以看到具体的失败原因。最容易查找的原因可能是选择了重复的插件，造成打包失败如`“Warning: Multiple build commands for output file”`，检查去重解决。
   
   常见的失败情况如下：
   
（1）

		Code Sign error: No matching provisioning profiles found: This product type must be built using a provisioning profile, however no provisioning profile matching the identity ���iPhone Distribution: xuming zhu��� was found.
		Code Sign error: No codesigning identities found: No codesigning identities (i.e. certificate and private key pairs) that match the provisioning profile specified in your build settings (“XuyiguotuProvisioning”) were found
		Code Sign error: No matching provisioning profiles found: No provisioning profiles matching the bundle identifier “cn.caishenjiadao.www” were found.
错误原因：p12证书和mobileprovision文件不匹配
解决办法：确定上传的是99$发布版证书还是299$企业证书，检查是否上传选项错误；重新上传证书并保存打包。如果你确定你的证书没问题，那么重新下载mobileprovision文件再试试
（2）

		AppCanPlugin.app/MWPhotoBrowser.bundle/ImageError.png: No such file or directory
		  11518779-iphone - error: couldn't remove 


原因及解决办法：No such file or directory联系上下文可定位到某插件，一般是用户自定义插件问题或与选择重复的插件导致打包冲突
（3）

 		AppIDs not match or compile faild
原因及解决办法：证书检测通过也只是检测P12文件验证格式上是否正确的，不能验证内容是否正确，建议您检查一下证书的Developer。一般是证书和IDs不匹配，Bundle-identifier必须与证书的appIDs一致，请按照流程重建证书。
（4）

		No code signing identities found: No valid signing identities (i.e. certificate and private key pair) were found.
原因及解决办法：没有找到证书信息，官方越狱证书打包是否正常，然后检查证书是否过期，重新上传证书打包
（5）

		Code Sign error: No code signing identities found: No valid signing identities (i.e. certificate and private key pair) matching the team ID 锟斤拷锟�(null)锟斤拷锟� were found
		code Sign error: No provisioning profiles found: No non–expired provisioning profiles were found.
原因及解决办法：p12证书或者mobileprovision文件有问题。检查下provision文件和证书是否正确，官网的验证只是验证证书格式是否正确，不能判断证书是否能正常使用。重新去申请一份证书，确保你的证书和mobileprovision相匹配，确保它们都是distribution类型，然后重新试一下。
（6）在线打包时出现Undefined symbols for architecture xxx类型的报错:
例1、

		 Undefined symbols for architecture arm64:
        "_OBJC_CLASS_$_MQManager", referenced from:
       objc-class-ref in libuexMeiQia.a(EUExMeiQia.o)
       objc-class-ref in libuexMeiQia.a(MQServiceToViewInterface.o)
        [2016-03-23 10:58:03,783] DEBUG SimpleAsyncTaskExecutor-1 //opt/applog//114/069/69/11406969-iphone - ld: symbol(s) not found for architecture arm64
        [2016-03-23 10:58:03,783] DEBUG SimpleAsyncTaskExecutor-1 //opt/applog//114/069/69/11406969-iphone - clang: error: linker command failed with exit code 1 (use -v to see invocation)
原因及解决办法：MQManager这个类没找到，自定义插件libuexMeiQia包有错误，如果是用户使用某自定义，请更新最新插件版本和最新官方引擎打包
例2、

	"_OBJC_CLASS_$_WXApi", referenced from:
	  objc-class-ref in libuexBeeCloud.a(BCPaySDK.o)
	 ld: symbol(s) not found for architecture arm64
 原因及解决办法：_WXApi类没找到，这个插件比较特殊试试勾选官方微信插件重新打包
 >小贴士：Undefined symbols 这个错误，可能是插件过期、插件缺少依赖的插件、引擎缺少库、插件编译的不对等情况导致，对于使用AppCan开源引擎的原生开发者可以分析其中的错误，大部门开发者若无法定位“<a href="http://bbs.appcan.cn/forum.php?mod=forumdisplay&fid=61&filter=typeid&typeid=45" target="_blank">请去论坛发帖询问</a>”

出现这种错误主要有以下几种原因

* 生成.a的时候没有选择`Generic iOS Device`或者在用命令行编译时没有注明`-sdk iphoneos`,导致缺少对应的架构。
	* 解决方法:正确编译引擎.a并重新生成插件包进行在线打包
* 缺少依赖的第三方库或者第三方库本身架构缺失
	* 解决方法:添加同时拥有armv7和arm64架构的第三方库并重新生成插件包进行在线打包
* 缺少系统依赖库.
	* 如果这个库的依赖iOS版本比AppCan引擎的依赖版本高,那么此插件只能配合自定义引擎使用
	* 反之,请去<a href="https://github.com/AppCanOpenSource/appcan-ios/issues" target="_blank">AppCan引擎github</a>提issue或者在<a href="http://bbs.AppCan.cn" target="_blank">AppCan官方论坛</a>发帖说明,我们会第一时间进行反馈.
	* 目前AppCan引擎的依赖版本为iOS 7.0

（7）在线打包时出现`duplicate symbols for architecture xxx`类型的报错:
出现这种错误的主要原因是类名冲突，请先根据日志找到冲突的类名以及它们分别所属的文件

* 如果是您的插件和非官方的插件冲突
	* 请联系插件作者协商解决
* 如果您的插件和官方插件或者引擎冲突
	* 如果此类是源自知名第三方库源码(比如SDWebImage等等),可以尝试只包含这些第三库的头文件使用
	* 如果此类是您的自定义类或者包含您的自定义代码，那么应该优先尝试在类名前加上前缀避免冲突
	* 如果此类属于第三方.a,那么应该尝试用libtool等工具将冲突的.o拆分出来,然后重新合并
	* 如果以上方法都无法解决并且冲突来源于引擎,那么只能您的插件只能用自定义引擎,修改引擎源码配合使用

（8） 

	error: CFBundleIdentifier '*' contains illegal character '*' 
	 invalid bundle identifier '*'
	 (null): error: CFBundleIdentifier 'com.365sji.*' contains illegal character '*' 
原因及解决办法：bundleID含有非法字符，appids是应用的标识,用来发布用的,.bundle identifier不能包含通配符*
去苹果开发者中心检查你的AppID和profiles设置 然后重新下载mobileprovision文件去打包。

------------
未解决问题？到开发者社区提问试试吧 ！<a href="http://bbs.appcan.cn/" target="_blank">点击提问</a> 