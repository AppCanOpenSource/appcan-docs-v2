## AppCan  iOS 通用连接（Universal Link）配置说明
### 什么是通用链接？
##### 通用链接是iOS9推出的一项新功能，如果你的应用（app）支持通用链接（Universal Link）之后，iOS用户能够在点击网页的链接的时候无缝的重定向到已经安装的app，不需要额外的任何操作。如果没有安装对应的app，那么点击链接会使用Safari打开网页。在iOS9以前，对于各种浏览器，Safari中唤醒app的需求，我们通常是只能使用scheme的方式。
### 为什么要突然改用通用链接的配置方式？
##### 我们的项目中唤起第三方app一般是通过配置对应的URL Scheme的方式使用的，微信SDK的最新版本openSDK1.8.6 由于苹果iOS 13系统版本安全升级，为此openSDK在1.8.6版本进行了适配。 1.8.6版本支持Universal Links方式跳转，对openSDK分享进行合法性校验，提升使用过程中的安全性。
##### 要求在注册微信appid时，必须要传入universalLink，以前的方法在旧版本仍然可使用。所以就需要研究通用链接（Universal Link）的配置。
### 如何配置通用链接？
1. 创建json格式的一个空文件（取名必须为apple-app-site-association，并且没有后缀）
![图片1](https://gitee.com/zhao_zhongliang/document_image/raw/master/uPic/图片1.png)

###### 注:这里的appID是指：TeamID+BundleId的组成（例：9JA89QQLNQ.com.apple.test）（TeamID可以在开发者账号里面查看，BundleId是项目的Bundle Identifier）。
###### 这里的paths是指：是设置允许的路径列表，可以是一个也可以是多个，最简单的方式是使用“*”，通配符，表示允许该域名下的任意路径。（注意：paths中的大小写是敏感的，一定要一一对应）
2. 上传apple-app-site-association文件（这里就能拿到app中配置需要的域名）
- （1）将apple-app-site-association文件发给服务器端的同事，让他上传到域名的根目录下或者.well-known的子目录下（这里的域名必须要是可访问的域名，由服务器端的同事给到）。
- （2）Web server需要支持https，客户端通过https来访问，并且不支持重定向。
下面是描述文件的配置:
登录苹果开发者账号，选择对应的appid,编辑，勾选Associated Domains 选项，如下图
![图片2](https://gitee.com/zhao_zhongliang/document_image/raw/master/uPic/图片2.png)

3. 然后正常步骤生成描述文件即可。
以上是原生开发通用部分的配置，文件在附件中已包含，可以自己创建，也可以直接直接修改使用，需要注意以下几点：
apple-app-site-association 文件不要带json的后缀，可以让服务端把文件路径发出来，浏览器打开，看是否是下载文件即可验证；
 微信开放平台及注册方法传入的Universal Link 要一致，为域名 + path(“/”结束，不带”*”)(如果设置一致但是没有加path,一些老方法(分享等等)调用失败会降级使用schemes 方法返回app，个别新方法会无法返回app(选择发票))
4. 接下来是AppCan 打包服务器需要进行的配置
需要在config文件中添加配置entitlements配置

```
<config desc="" platform="iOS" type="ENTITLEMENTS-CUSTOM"> <ENTITLEMENTS platform="iOS" info="" type="ENTITLEMENTS-CUSTOM">  <key>com.apple.developer.associated-domains</key>
	<array>
		<string>applinks:AppCan.cn/</string>
		<string>applinks:域名/</string>
	</array>
</ENTITLEMENTS> </config>
```


entitlements配置具体格式文档见:[http://newdocx.AppCan.cn/dev-guide/config·xml](http://newdocx.AppCan.cn/dev-guide/config·xml) ,config新增配置说明部分。