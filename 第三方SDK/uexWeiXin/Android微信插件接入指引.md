[TOC]

开发者在使用APPCAN平台提供的微信插件时，需要配置相关的包名，AppID和签名。具体步骤如下（以大众版打包为例）：

#1. 获取apk相关的包名和签名
  
## 1.1包名
   
###  1.1.1 APPCAN平台默认包名

 APPCAN平台默认包名为：org.zywx.wbpalmstar.widgetone.uex加上应用id，如下：
![](http://newdocx.appcan.cn/docximg/135101v2014q11l27h.png) 
>则默认的包名为：org.zywx.wbpalmstar.widgetone.uex11370920。

###  1.1.2 自定义包名

 APPCAN大众版打包时，在"云端打包"项中可以自定义包名，如下：
![](http://newdocx.appcan.cn/docximg/135111u2014t11o27g.png) 
例如包名为org.zywx.wbpalmstar.widgetone.uexweixin，若该处不填，则为默认包名。

## 1.2签名

### 1.2.1 APPCAN平台默认签名

  “云端打包”中“选择证书”一项选择APPCAN证书，打包出来的apk的签名即为默认签名，默认（MD5值）为：d382d671c6672cba4b87980992cd9d77
###  1.2.2 自定义签名   

 在APPCAN 大众版打包时，在“证书管理”项中可以上传应用打包所需的自定义签名文件，并在"云端打包"时，“选择证书”一项选择自定义证书。该证书打出来的包签名应该在生成此证书时可以得到。或者可以通过微信开发平台提供的操作流程获取应用的签名，[https://open.weixin.qq.com/cgi-bin/frame?t=resource/res_main_tmpl&verify=1&lang=zh_CN](https://open.weixin.qq.com/cgi-bin/frame?t=resource/res_main_tmpl&verify=1&lang=zh_CN) 上下载签名获取工具获取签名，如下：
![](http://newdocx.appcan.cn/docximg/135121e2014r11s27y.png) 


#  2. 通过包名和签名申请微信接入AppID

## 2.1 注册账号

在微信开放平台https://open.weixin.qq.com/ 注册开发者账号。

##  2.2 创建应用

 注册成功并登陆之后选择“移动应用开发”项的了解更多，如下：
![](http://newdocx.appcan.cn/docximg/135131k2014s11d27x.png) 
进入如下界面：

![](http://newdocx.appcan.cn/docximg/135144r2014n11f27x.png) 
点击“创建应用”，进入如下页面：

![](http://newdocx.appcan.cn/docximg/135159o2014b11h27e.png) 
填写对应信息，在平台信息栏中填入获取的包名和签名，如下：

![](http://newdocx.appcan.cn/docximg/135319y2014r11s27n.png) 
提交审核。审核通过之后可以在应用详情界面获得AppID和AppSecret，如下：
![](http://newdocx.appcan.cn/docximg/135330f2014u11i27q.png) 

# 3. 插件接口调用

在使用uexWeiXin插件时，调用uexWeiXin.registerApp(AppID)，传入申请的AppID即可注册成功。之后可调用分享的相关接口。
# 4. 微信支付相关

通过以上方法创建的应用只支持分享到朋友圈和发送给朋友这两个接口，若需要微信支付功能需要另外申请权限，如下：
![](http://newdocx.appcan.cn/docximg/135337l2014q11f27w.png) 
点击申请开通，申请对应接口的权限。因为该功能申请非常严格，需要很多财务相关信息，比较麻烦，并且APPCAN没有此业务，也没有办法申请，故此不做介绍。
 
# 5. 回调定制相关

 3.0.22及其之前的版本，分享成功或失败不支持回调；
 3.1.0及其之后的版本，支持回调。
  
# 6. 常见问题

 #####  6.1 registerApp接口调用之后返回注册成功，但是分享接口仍然不能调入到微信的联系人列表或者朋友圈界面

该问题的原因是该apk中包名、签名和AppID不配套，需仔细检查在微信开放平台创建应用时填写的包名、签名是不是和在APPCAN平台打包时的包名、签名一致。registerApp接口调用之后返回注册成功并不是检验这三者（即包名、签名和AppID）是否一致的标准，两者无必然联系。