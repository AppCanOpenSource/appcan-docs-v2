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
（图1）

![](http://i.imgur.com/CGIdwNy.jpg) 
 （图2）

填写相应信息，若不知道安全码或者package，请点击图中的红色框框链接查看获取方法，也可参考[签名信息获取工具使用文档](http://newdocx.appcan.cn/newdocx/docx?type=1299_1291 ) 

填写完成之后，点击获取KEY
![](http://i.imgur.com/pkK7unS.jpg) 


其中的KEY值即是即将要用到的APIKey。

#2、打包集成高德地图插件使用

把申请的APIKey写入config.xml文件，参考[API附录](#3、附录)


在线打包(以大众版在线打包为例)
2.1** 插件选择**
![](http://i.imgur.com/AaoE5hM.png) 

2.2**上传自定义证书**
若apk的签名证书的SHA1码为`49:3E:52:87:09:E1:B4:D2:B8:FF:12:6E:2C:C8:40:6D:3B:5E:4D:BB`(即默认使用appcan证书打包的apk)可忽略此步骤。
![](http://i.imgur.com/fqQxsnl.png) 


2.3**云端打包**
![](http://i.imgur.com/jlID6Km.png) 

****选择证书项：****若签名证书的SHA1码为`49:3E:52:87:09:E1:B4:D2:B8:FF:12:6E:2C:C8:40:6D:3B:5E:4D:BB`，选择AppCan证书，否则选择自定义证书。

****自定义包名项：****填入在高德开放平台申请Key时对应的包名。
# 3、附录
## 3.1、通过config.xml配置插件的方法

* 将配置代码添加到`config.xml`中即可完成插件配置，无需进行自定义插件相关步骤
* 详见[打包服务器公测](http://newdocx.appcan.cn/newdocx/docx?type=1669_1291)
* 该公测已完成，现在也支持正式版大众打包服务器



#### iOS
示例配置代码如下：

```
    <config desc="uexGaode" type="KEY" > 
        <param platform="iOS" name="$uexGaodeMap_APIKey$"  value="XXX"/>
    </config>
```

#### Android
示例配置代码如下：
```
    <config desc="uexGaode" type="KEY" > 
        <param platform="Android" name="$uexGaodeMap_APIKey$" value="XXX"/>
    </config>
```

或者Android和iOS合并写为：
```
    <config desc="uexGaode" type="KEY" > 
        <param platform="iOS" name="$uexGaodeMap_APIKey$"  value="XXX"/>
        <param platform="Android" name="$uexGaodeMap_APIKey$" value="XXX"/>
    </config>
```
**用户需要将上面字段中的XXX替换为自己申请的对应平台的key，然后添加至config.xml中：**即可完成相应key的配置 
#4、常见问题
**Q **上传自定义插件时，提示“目录结构错误”
**A** 先检查插件包目录结构，正确的目录结构如下： 
![](http://i.imgur.com/0zj1loN.png) 
再检查新增插件时填写的名称是否为uexGaodeMap。

**Q** 打开地图之后，弹出“INVALID_USER_KEY”消息
**A** 该问题产生的原因是上述配置有误，请仔细检查配置。