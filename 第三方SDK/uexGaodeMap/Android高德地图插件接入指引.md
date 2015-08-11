[TOC]


高德地图插件是基于高德地图API封装的AppCan平台的插件模块。开发者集成及使用此插件，需要到高德开放平台为应用申请相应的APIKey,并将APIKey配置到应用中。以下是具体步骤。

#1、高德地图开放平台创建应用
申请成为开发者,访问[http://lbs.amap.com/](http://lbs.amap.com/) 。 
![](http://i.imgur.com/9nuT5v4.jpg) 
注册成功之后，点击成为开发者，如下： 
![](http://i.imgur.com/wZnTMBR.jpg) 
填写完整具体的信息

![](http://i.imgur.com/d1rliOz.png) 

申请成功之后，进入如下页面：

![](http://i.imgur.com/xn5CSjM.png) 

选择免费申请密钥
![](http://i.imgur.com/Nv8VSlu.jpg) 
![](http://i.imgur.com/CGIdwNy.jpg) 
 

填写相应信息，若不知道安全码或者package，请点击图中的红色框框链接查看获取方法，也可参考[签名信息获取工具使用文档](http://newdocx.appcan.cn/newdocx/docx?type=1299_1291 ) 

填写完成之后，点击获取KEY
![](http://i.imgur.com/pkK7unS.jpg) 


其中的KEY值即是即将要用到的APIKey。

#2、打包集成高德地图插件使用
##2.1、自定义插件包
下载官方最新版高德地图插件包，解压，修改AndroidManifest.xml,把申请的APIKey写入该文件。
````
<meta-data
    android:name="com.amap.api.v2.apikey"
    android:value="申请的APIKey"/>````
修改完成后压缩，作为自定义插件上传到打包服务器。

##2.2、在线打包(以大众版在线打包为例)
** 插件选择**
![](http://i.imgur.com/AaoE5hM.png) 

**上传自定义证书**
若apk的签名证书的SHA1码为49:3E:52:87:09:E1:B4:D2:B8:FF:12:6E:2C:C8:40:6D:3B:5E:4D:BB(即默认使用appcan证书打包的apk)可忽略此步骤。
![](http://i.imgur.com/fqQxsnl.png) 


**云端打包**
![](http://i.imgur.com/jlID6Km.png) 

****选择证书项：****若签名证书的SHA1码为49:3E:52:87:09:E1:B4:D2:B8:FF:12:6E:2C:C8:40:6D:3B:5E:4D:BB，选择AppCan证书，否则选择自定义证书。

****自定义包名项：****填入在高德开放平台申请Key时对应的包名。

#3、常见问题
**Q **上传自定义插件时，提示“目录结构错误”
**A** 先检查插件包目录结构，正确的目录结构如下： 
![](http://i.imgur.com/0zj1loN.png) 
再检查新增插件时填写的名称是否为uexGaodeMap。




**Q** 打开地图之后，弹出“INVALID_USER_KEY”消息
**A** 该问题产生的原因是上述配置有误，请仔细检查配置。