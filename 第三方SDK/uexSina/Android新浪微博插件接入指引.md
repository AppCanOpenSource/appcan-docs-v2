[TOC]

开发者在使用APPCAN平台提供的新浪微博插件时，需要配置相关的包名，AppKey和签名。具体步骤如下（以大众版打包为例）：

# 1. 获取apk相关的包名和签名
 
##   1.1包名

###  1.1.1 APPCAN平台默认包名

 APPCAN平台默认包名为：org.zywx.wbpalmstar.widgetone.uex加上应用id，如下：
 
![](http://newdocx.appcan.cn/docximg/143642p2014e11v27q.png)

        则默认的包名为：org.zywx.wbpalmstar.widgetone.uex11370920。

###   1.1.2 自定义包名
APPCAN大众版打包时，在"云端打包"项中可以自定义包名，如下：

![](http://newdocx.appcan.cn/docximg/143649a2014i11w27g.png)

  例如包名为org.zywx.wbpalmstar.widgetone.uexsina，若该处不填，则为默认包名。

##  1.2签名

###  1.2.1 APPCAN平台默认签名

“云端打包”中“选择证书”一项选择APPCAN证书，打包出来的apk的签名即为默认签名，默认为：d382d671c6672cba4b87980992cd9d77
###   1.2.2 自定义签名  
在APPCAN 大众版打包时，在“证书管理”项中可以上传应用打包所需的自定义签名文件，并在"云端打包"时，“选择证书”一项选择自定义证书。该证书打出来的包签名应该在生成此证书时可以得到。

#  2. 通过包名和签名申请接入AppKey

##  2.1 注册账号

 在微博开放平台[http://open.weibo.com/](http://open.weibo.com/)  注册开发者账号。

##   2.2 创建应用

  注册成功并登陆之后选择“移动应用”，如下：
![](http://newdocx.appcan.cn/docximg/143658d2014q11g27x.png)
进入如下界面：

![](http://newdocx.appcan.cn/docximg/143706d2014e11v27p.png)
点击“创建应用”，填写对应信息，在应用基本信息栏中填入获取的包名和签名，如下：

![](http://newdocx.appcan.cn/docximg/143714l2014w11m27e.png)
信息填完之后还需要完成身份认证，然后再提交审核。审核通过之后可以在应用详情界面获得AppKey和AppSecret。
 
#  3. 插件接口调用

 在使用uexSina插件时，调用uexSina.registerApp(appKey,appSecret,registerUrl)，传入申请的AppKey和AppSecret，registerUrl默认为"`https://api.weibo.com/oauth2/default.html`"， 即可注册成功。之后可调用分享的相关接口。
#  4. 常见问题

##   4.1 registerApp接口调用之后打开的页面显示异常

  如下：
![](http://newdocx.appcan.cn/docximg/143724q2014l11e27f.png)
该问题的原因是该apk中包名、签名和AppKey不配套，需仔细检查在新浪微博开放平台创建应用时填写的包名、签名是不是和在APPCAN平台打包时的包名、签名一致。或者是创建的应用未审核通过。
[2222]: http://www.appcan.cn