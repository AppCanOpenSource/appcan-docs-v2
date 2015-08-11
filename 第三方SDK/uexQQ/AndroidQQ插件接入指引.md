[TOC]

　uexQQ插件是基于QQ互联API封装的AppCan平台的插件模块。开发者集成及使用此插件，需要到QQ互联开放平台为应用申请相应的AppID,并将AppID配置到应用中。插件使用需要自定义上传使用（安卓插件自定义配置,[跳转](#2. 打包集成QQ插件使用) ），以下是具体步骤。

#  1. 登陆QQ互联，访问[http://connect.qq.com/](http://connect.qq.com/) 。
![](http://newdocx.appcan.cn/docximg/111425t2015h3k27z.png) 
     
## 1.1 登陆成功之后，点击管理中心，如下：平台默认包名

 ![](http://newdocx.appcan.cn/docximg/111824k2015q3x27g.png) 

    
## 1.2 点击创建应用，如下：
![](http://newdocx.appcan.cn/docximg/111915x2015c3f27u.png) 
 
 ![](http://newdocx.appcan.cn/docximg/111942d2015w3s27r.png) 
     
## 1.3 填写具体的信息，
![](http://newdocx.appcan.cn/docximg/112231g2015g3l27w.png) 
     
##1.4 填写完成后点击创建应用，即可进入应用详情，
 ![](http://newdocx.appcan.cn/docximg/112258g2015s3r27l.png)    
其中APPID即为所需项。



# 2. 打包集成QQ插件使用

## 2.1 下载对应的插件包，修改AndroidManifest.xml,把申请的APPID写入XML文件。
````
            <activity
    android:name="com.tencent.tauth.AuthActivity"
    android:launchMode="singleTask"
    android:noHistory="true" >
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="tencent+你的APPID" />
    </intent-filter>
</activity>
 
例如：tencent1142345645
````
##  2.2 压缩插件包，将此插件作为“自定义插件”添加到应用插件中，进行打包。

    
 
# 3. 插件接口调用

  该APPID在调用接口时需要传入。配置在插件包中的APPID和接口传入的APPID保持一致，才能保证QQ分享功能的正常，否则会导致分享返回到appcan应用时，出现页面卡死的情况。
 
# 4. 常见问题

## 4.1 在使用分享接口时，返回应用会出现页面卡死等问题

> 解决如下：
     配置在插件包中的APPID和接口传入的APPID保持一致，才能保证QQ分享功能的正常，否则会导致分享返回到appcan应用时，出现页面卡死的情况。