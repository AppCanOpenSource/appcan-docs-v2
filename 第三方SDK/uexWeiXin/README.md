[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
微信分享插件

## 1.1 说明

封装了微信开放平台的SDK,集成了微信登录、微信分享功能；可用于实现第三方账号登录,分享内容到朋友圈或好友；使用之前须从[微信开放平台](https://open.weixin.qq.com/ "微信开放平台")申请开发者账号并创建应用,获取 appid 和 secret。同时包含微信支付功能。

如何申请请参考[附录](http://newdocx.appcan.cn/newdocx/docx?type=1449_975 "附录")。

* IDE不建议测试使用,原因:IDE涉及证书和包名问题!　
* 安卓微信插件在使用时,调用接口时只需填写对应的参数,直接在线勾选插件使用；`注意:安卓偶尔收不到回调的问题要设置接收回调窗口setCallbackWindowName方法`。
* iOS微信插件在使用在微信支付或分享过程中,App用过uexWeiXin插件打开微信客户端进行支付,支付过程完成后,微信客户端通过应用自定义的UrlScheme返回到本App,并传回支付结果时,需要配置UrlScheme值
 

**通过config.xml配置插件的方法,iOS微信插件可直接在官网公共插件里直接勾选使用**,示例配置代码如下: 

```
<config desc="uexWeiXin" type="URLSCHEME">
<urlScheme name="uexWeiXin" schemes="['wxf14d58cec986585b']"/>
</config>
```
 其中'wxf14d58cec986585b'改成您自己申请到的微信appId

iOS 9 以后,为了预防APP通过非正常渠道获取用户的某些隐私信息,Apple启用了URLScheme白名单机制。
	
* **为了正常使用插件的所有功能还需要配置URLScheme白名单**([什么是URLScheme白名单](http://bbs.appcan.cn/forum.php?mod=viewthread&tid=29503&extra=))
* 配置白名单方法请参考[这里](http://newdocx.appcan.cn/newdocx/docx?type=1505_1291#设置urlScheme白名单)
* uexWeiXin需要进白名单添加的URLScheme如下

```
<string>wechat</string>
<string>weixin</string>
```

## 1.2 UI展示
![](http://newdocx.appcan.cn/docximg/162019s2015p6u16v.png)

## 1.3 开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=195_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
 
## 1.4 术语表
-----
Path Types

| 协议头 | Android对应路径(其中"/sdcard/"等同于"/storage/emulated/0/") | iOS对应路径 |
| ----- | ----- | ----- |
| res:// | widget/wgtRes/ | widget/wgtRes |
| wgts:// | /storage/emulated/0/widgetone/apps/xxx(widgetAppId)/ | /Documents/apps/xxx(widgetAppId)/ |
| wgts:// | /storage/emulated/0/widgetone/widgets/ | /Documents/widgets/ |
| file:///sdcard/ | /storage/emulated/0/ | 无 |

## 1.5 错误返回码说明
前端收到的回调中的错误返回码errCode可查看下方链接获取详细信息
[微信官方全局返回码说明地址](http://mp.weixin.qq.com/wiki/17/fa4e1434e57290788bde25603fa2fcbd.html)
 
 

## 1.6、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用。

在后续版本中新添加的接口会在文档中额外说明。

## 1.7、平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。

有特殊版本要求的API会在文档中额外说明。

# 2、API概览
   
## 2.1 方法:

> ### registerApp 用户授权

`var info = uexWeiXin.registerApp(appID)`

**说明:**

必须先向微信终端注册本应用才可以进行其他操作

                 

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| appID| String类型| 必选 | 到微信开发者登记页面进行登记并设置相关信息后将获得appID|
| info | Number类型| 必选 | 0-成功,1-失败|
 
**示例:**

     

```
var info = uexWeiXin.registerApp('wxd930ea5d5a258f4f');
```

> ### weiXinLogin 微信授权登录

`uexWeiXin.weiXinLogin(scope,state,function(data){})`

**说明:**

 
必须先向微信客户端注册本应用才可以进行该操作
       
     

**参数:**

 

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| scope| String类型| 必选 |应用授权作用域.  注:授权作用域(scope)代表用户授权给第三方的接口权限, 第三方应用需要向微信开放平台申请使用相应scope的权限后, 使用文档所述方式让用户进行授权,经过用户授权, 获取到相应access_token后方可对接口进行调用.一般为snsapi_userinfo   |
| state|String类型 | 可选 | 注:用于保持请求和回调的状态,授权请求后原样带回给第三方。 该参数可用于防止csrf攻击(跨站请求伪造攻击), 建议第三方带上该参数,可设置为简单的随机数加session进行校验|
| data | Number类型| 必选 | 授权结果:0——-成功,-2——-用户取消,-4——-用户拒绝|         


     

**示例:**

```
 uexWeiXin.weiXinLogin('snsapi_userinfo,snsapi_base','0744',function(data){
            alert("callback:"+ JSON.stringify(data));
        });


```

> ### getWeiXinLoginAccessToken 获取微信登录accessToken

`uexWeiXin.getWeiXinLoginAccessToken(secret,grant_type,,function(data){})`

**说明:**

获取微信登录accessToken   


**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| secret| String类型| 必选 | 应用密钥AppSecret,在微信开放平台提交应用审核通过后获得|
| grant_type|String类型 | 必选 | 根据微信SDK要求,填authorization_code(固定值)       |
| data|Json类型 | 必选 | 返回的数据     |

格式如下:
```
{ 
"access_token":"ACCESS_TOKEN", 
"expires_in":7200, 
"refresh_token":"REFRESH_TOKEN",
"openid":"OPENID", 
"scope":"SCOPE" 
}
```
各字段说明:            
 ![](http://newdocx.appcan.cn/docximg/110320f2015r3p16x.png)
图_uexWeiXin_3.0     
 

**示例:**

```
  uexWeiXin.getWeiXinLoginAccessToken('db426a9829e4b49a0dcac7b4162da6b6','authorization_code',function(data){
            alert("callback:"+ JSON.stringify(data));
        });


```

> ### getWeiXinLoginCheckAccessToken 检验accessToken是否有效

`uexWeiXin.getWeiXinLoginCheckAccessToken(access_token,openid,function(data){})`

**说明:**

用于检验通过uexWeiXin.getWeiXinLoginAccessToken()方法获取的accessToken是否还在有效期内(目前为2个小时)其中access_token和openid从getWeiXinLoginAccessToken的返回数据获取.


**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| access_token| String类型| 必选 | 调用接口凭证|
| openid|String类型 | 必选 | 普通用户标识,对该公众帐号唯一      |
| data|Number类型 | 必选 | 0-----(有效),1-----(无效)         |

 

**示例:**

```
  uexWeiXin.getWeiXinLoginCheckAccessToken(accessToken,openid,function(data){
            alert("callback:"+ JSON.stringify(data));
        }); 


```

> ### getWeiXinLoginRefreshAccessToken 获取微信登录的刷新或续期access_token

`uexWeiXin.getWeiXinLoginRefreshAccessToken(grant_type,refresh_token,function(data){})`

**说明:**

当access_token超时后,可以使用refresh_token进行刷新其中refresh_token从getWeiXinLoginAccessToken的返回数据获取.   


**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| grant_type| String类型| 必选 | 填refresh_token(固定值) |
| refresh_token|String类型 | 必选 |      |
| data|Json类型 | 必选 | 返回的数据      |

 正确返回格式:
```
{ 
    "access_token":"ACCESS_TOKEN", 
    "expires_in":7200, 
    "refresh_token":"REFRESH_TOKEN", 
    "openid":"OPENID", 
    "scope":"SCOPE" 
} 
```
各字段说明见:
 ![](http://newdocx.appcan.cn/docximg/110655t2015f3i16k.png)
      图_uexWeiXin_3.0   

 

**示例:**

```
  uexWeiXin.getWeiXinLoginRefreshAccessToken('refresh_token',refreshToken,function(data){
            alert("callback:"+ JSON.stringify(data));
        });


```

> ### getWeiXinLoginUnionID 获取用户个人信息

`uexWeiXin.getWeiXinLoginUnionID(access_token,openid,function(data){})`

**说明:**

获取授权用户的个人信息其中access_token和openid从getWeiXinLoginAccessToken的返回数据获取.若调用getWeiXinLoginRefreshAccessToken方法,则从getWeiXinLoginRefreshAccessToken的返回数据获取
  
  

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| access_token| String类型| 必选 | 调用接口凭证|
| openid|String类型 | 必选 | 普通用户标识,对该公众帐号唯一      |
| data|Json类型 | 必选 | 返回的数据      |

data的格式: 

```
{
    "openid": "OPENID", 
    "nickname": "NICKNAME", 
    "sex": 1, 
    "province": "PROVINCE", 
    "city": "CITY", 
    "country": "COUNTRY", 
    "headimgurl": "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0", 
    "privilege": [
        "PRIVILEGE1", 
        "PRIVILEGE2"
    ], 
    "unionid": " o6_bmasdasdsad6_2sgVt7hMZOPfL"
}
```

各字段说明:    
 ![](http://newdocx.appcan.cn/docximg/110725r2015e3y16g.png)



**示例:**

```
 uexWeiXin.getWeiXinLoginUnionID(accessToken,openid,function(data){
            alert("callback:"+ JSON.stringify(data));
        });  


```

> ### isWXAppInstalled 检查微信是否已安装

`var info = uexWeiXin.isWXAppInstalled()`

**说明:**

检查微信是否已安装   

       

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| info| Number类型| 必选 | 0表示已安装，1表示未安装|



**示例:**

```
var info = uexWeiXin.isWXAppInstalled()

```

> ### getWXAppInstallUrl 获取微信itunes的安装地址

`uexWeiXin.getWXAppInstallUrl(function(data){})`

**说明:**

获取微信itunes的安装地址 


**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| data|String类型 | 必选 | 微信安装地址    |



**示例:**

```
uexWeiXin.getWXAppInstallUrl(function(data) {
            alert("callback:" + JSON.stringify(data));
        });

```

> ### isWXAppSupportApi 判断API是否被支持

`uexWeiXin.isWXAppSupportApi(function(data){})`

**说明:**

判断API是否被支持
   

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| data| Number类型| 必选 | 0表示支持，1表示不支持|

 

**示例:**

```
uexWeiXin.isWXAppSupportApi(function(data){
alert("callback:" + JSON.stringify(data));
})
```

> ### getApiVersion 获取SDK的版本号

`uexWeiXin.getApiVersion(function(data){})`

**说明:**

获取SDK的版本号
     

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| data|String类型 | 必选 | SDK版本号   |



**示例:**

```
uexWeiXin.getApiVersion(function(data){
    alert("callback:" + JSON.stringify(data));
});

```

> ### openWXApp 打开微信

`uexWeiXin.openWXApp(function(data){})  `

**说明:**

打开微信

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| data|Number类型 | 必选 | 0表示打开成功，1表示打开失败   |
 

**示例:**

```
uexWeiXin.openWXApp(function(data){
   alert("callback:" + JSON.stringify(data));
});
```





> ### shareTextContent 分享文本

`uexWeiXin.shareTextContent(jsonData,function(data){})`

**说明:**

分享文本内容到微信   
     

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| jsonData| String类型| 必选 | 分享的文本内容|
| data|Number类型 | 必选 | 返回的错误码,0-成功,非0-失败. |

```
{
"text":"中国最大的移动中间键平台AppCan对微信分享的文本支持测试",
"scene":1
}
```

![](http://newdocx.appcan.cn/docximg/115925v2014m11r9r.png)



**示例:**

```

       var jsonstr = '{"text":"这是来自AppCan平台对微信支持测试","scene":1}';
       uexWeiXin.shareTextContent(jsonstr, function(data){
        alert("callback:" + JSON.stringify(data));
       });

```

> ### shareImageContent 分享图片

`uexWeiXin.shareImageContent(jsonData,function(data){})`

**说明:**

分享图片到微信
      
  

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| jsonData| String类型| 必选 | 分享的文本内容,路径协议见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中的 path type|
| data|Number类型 | 必选 | 返回的错误码,0-成功,非0-失败.       |

```
jsonData {
    thumbImg:,//(必选)缩略图地址Url(大小必须小于32k)
    image:,//(必选)图片地址(路径协议见constant中的 path type)
    scene:,//(必选)发送的目标场景 0-会话场景 1-朋友圈场景
    title://(必选)图片标题(仅iOS)
}
```



**示例:**

```
 var JsonData = '{"thumbImg":"res://icon.png","image":"res://Default.png","scene":1}';
    uexWeiXin.shareImageContent(JsonData,function(data){
     alert("callback:" + JSON.stringify(data));
    });
    
```

> ### shareLinkContent 分享Link

`uexWeiXin.shareLinkContent(jsonData,function(data){})`

**说明:**

分享Link到微信


**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| jsonData| String类型| 必选 | 分享的文本内容,JSON格式|
| data|Number类型 | 必选 | 返回的错误码,0-成功,非0-失败.       |
```
var json = {
    thumbImg:,//(必选)缩略图地址Url(大小必须小于32k)
    wedpageUrl:,//(必选)链接的地址
    scene:,//(必选)发送的目标场景 0-会话场景 1-朋友圈场景
    title:,//(必选)链接的标题
    description://(必选)描述
}
```
![](http://newdocx.appcan.cn/docximg/174228b2015w0k14h.png)
 



 


**示例:**

```
var JsonData = '{"thumbImg":"res://icon.png","wedpageUrl":"http://www.appcan.cn","scene":1,"title":"你好,我是AppCan","description":"你好,我是AppCan描述"}';
uexWeiXin.shareLinkContent(JsonData,function(data){
       alert("callback:" + JSON.stringify(data));
});
    
```

> ### isSupportPay 判断是否支持支付功能

`uexWeiXin.isSupportPay(function(data){})`

**说明:**

微信5.0以上版本支持支付功能

   

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| data|Number类型 | 必选 | 是否支持支付功能,0-支持,1-不支持。       |



**示例:**

```
  uexWeiXin.isSupportPay(function(data){
   alert("callback:" + JSON.stringify(data));
  })


``` 

> ### getPrepayId 生成预支付订单

`uexWeiXin.getPrepayId(json,,function(data){})`

**说明:**

生成预支付订单 
 

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| json|json字符串 | 必选 | 请求参数|
| data|json格式数据 | 必选 | 返回参数，参数详见微信开放平台文档[统一下单接口参数说明](https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1 "统一下单接口参数说明")中的"返回结果"
       |
请求参数说明及生成办法详见微信开放平台文档[统一下单接口参数说明](https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1 "统一下单接口参数说明")中的"请求参数" 

```
var json = {
    appid:,//(必选) 微信分配的公众账号ID(企业号corpid即为此appId) 
    mch_id:,//(必选) 微信支付分配的商户号
    device_info:,//(可选) 终端设备号(门店号或收银设备ID),注意:PC网页或公众号内支付请传"WEB"
    nonce_str:,//(必选) 随机字符串,不长于32位。随机字符串,不长于32位。
    body:,//(必选) 商品或支付单简要描述
    detail:,//(可选) 商品名称明细列表
    attach:,//(可选) 附加数据,在查询API和支付通知中原样返回,该字段主要用于商户携带订单的自定义数据
    out_trade_no://(必选) 商户系统内部的订单号,32个字符内、可包含字母
    fee_type:,//(可选) 符合ISO 4217标准的三位字母代码,默认人民币:CNY
    total_fee:,//(必选) 订单总金额,只能为整数,单位为分
    spbill_create_ip:,//(必选) 用户端ip
    time_start:,//(可选) 订单生成时间,格式为yyyyMMddHHmmss,如2009年12月25日9点10分10秒表示为20091225091010。
    time_expire:,//(可选) 订单失效时间,格式为yyyyMMddHHmmss,如2009年12月27日9点10分10秒表示为20091227091010。注意:最短失效时间间隔必须大于5分钟
    goods_tag:,//(可选) 商品标记,代金券或立减优惠功能的参数
    notify_url:,//(必选) 接收微信支付异步通知回调地址,通知url必须为直接可访问的url,不能携带参数。
    trade_type:,//(必选) 交易类型,此处为固定值"APP"
    product_id:,//(可选) 此id为二维码中包含的商品ID,商户自行定义。
    openid:,//(可选) 用户在商户appid下的唯一标识。
    sign://(必选) 签名,详见签名生成算法
```


 

**示例:**

```
var param1 = {
	appid:"wx5h8hdi9o2hs6gd0c5g",
	mch_id:"1234567890",
	device_info:"013467007045764",
	nonce_str:"weradfdgdvccfexs1",
	body:"appcan pay",
	detail:"detail",
	attach:"attach",
	out_trade_no:"1217752501201406033233356018",
	fee_type:"CNY",
	total_fee:"1",
	spbill_create_ip:"127.0.0.1",
	time_start:"20150503152510",
	time_expire:"20150703152510",
	goods_tag:"WXG",
	notify_url:"http://www.baidu.com/",
	trade_type:"APP",
	product_id:"12235413214070356458058",
	openid:"oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",
	sign:"8FC5935C38628F44B924C838D760E33E"
};
var data1 = JSON.stringify(param1);
uexWeiXin.getPrepayId(data1,function(data){
   alert("callback:" + JSON.stringify(data));
});
```

> ### startPay 支付

`uexWeiXin.startPay(json,function(data){})`

**说明:**

支付  


**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| json|json字符串 | 必选 | 请求参数|
| data|json格式数据 | 必选 | 返回参数,参数说明及生成办法详见微信开放平台文档[调起支付接口](https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_12&index=2 "调起支付接口")参数说明中的"返回结果"
|
请求参数说明及生成办法详见微信开放平台文档[调起支付接口参数说明](https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_12&index=2 "调起支付接口参数说明")中的"请求参数" 

```
var json ={
    appid:,//(必选)微信分配的AppID
	partnerid:,//(必选)微信支付分配的商户号
	prepayid:,//(必选)微信返回的支付交易会话ID,从gettextareapayId接口的回调方法中获取
	package:,//(必选)暂填写固定值Sign=WXPay
	noncestr:,//(必选)随机字符串
	timestamp:,//(必选)时间戳
	sign://(必选)签名} 
	}
```



**示例:**

```
var param1 = {
	appid:"wx5h8hdi9o2hs6gd0c5g",
	partnerid:"1234567890",
	prepayid:"wx201506031538433160984eee0861221810",
	package:"Sign=WXPay",
	noncestr:"weradfdgdvccfexs",
	timestamp:"1412000000",
	sign:"8FC5935C38628F44B924C838D760E33E"
};
var data1 = JSON.stringify(param1);
uexWeiXin.startPay(data1,function(data){
   alert("callback:" + JSON.stringify(data));
});

```


> ### login 登录

`uexWeiXin.login(json,function(data){})`

**说明:**

微信登录  

**参数:**

```
var json = {
    scope:,
    state:
}
```
各字段含义如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| scope | String | 是 | 应用授权作用域,可传多个,用英文逗号隔开。详情请参考[授权域说明](https://open.weixin.qq.com/cgi-bin/showdocument?action=doc&id=open1419317851&t=0.009076760848984122#scope) |
| state | String | 否 | 用于保持请求和回调的状态,授权请求后原样带回给第三方。该参数可用于防止csrf攻击(跨站请求伪造攻击),建议第三方带上该参数,可设置为简单的随机数加session进行校验 |
| data|json字符串 | 必选 | 返回数据|
```
返回数据格式:
var data = {
    errCode: "0",
    code: "CODE",
    country: "CN",
    language: "zh_CN",
    state: "0902"
}
```

各字段含义如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| errCode| Number| 是 | 0:用户同意；-4:用户拒绝授权；-2:用户取消 |
| code| String | 否 | 用户换取access_token的code,仅在errCode为0时有效 |
| country| String | 是 | 微信用户当前国家信息 |
| language| String | 是 | 微信客户端当前语言 |
| state| String | 否 | 第三方程序发送时用来标识其请求的唯一性的标志,由login接口传入,由微信终端回传,state字符串长度不能超过1K。仅在errCode为0时有效 |


**示例:**

```
    var params = {
        scope:"snsapi_userinfo,snsapi_base",
        state:"0902"
    };
    var data = JSON.stringify(params);
    uexWeiXin.login(data,function(data){
   alert("callback:" + JSON.stringify(data));
});
```

> ### getLoginAccessToken 获取access_token

`uexWeiXin.getLoginAccessToken(json,function(data){})`

**说明:**

获取access_token  

**参数:**

```
var json = {
    secret:,
    code:,
    grant_type:
}
```
各字段含义如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| secret | String | 是 | 应用密钥AppSecret,在微信开放平台提交应用审核通过后获得 |
| code | String | 是 | 调用login接口时获得的code |
| grant_type | String | 是 | 填authorization_code |
| data|json字符串 | 必选 | 返回数据|


```
返回数据格式:
var data = {
    access_token: "ACCESS_TOKEN",
    expires_in: 7200,
    refresh_token: "REFRESH_TOKEN",
    openid: "OPENID",
    scope: "snsapi_userinfo",
    unionid:"UNIONID"
}
```

各字段含义如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| access_token| String| 是 | 接口调用凭证 |
| expires_in| Number | 是 | access_token接口调用凭证超时时间,单位(秒) |
| refresh_token| String | 是 | 用户刷新access_token |
| openid| String | 是 | 授权用户唯一标识 |
| scope| String | 是 | 用户授权的作用域,使用逗号(,)分隔 |
| unionid| String | 否 | 只有在用户将公众号绑定到微信开放平台帐号后,才会出现该字段。 |

**示例:**

```
    var params = {
        secret:"APP_SECRET",
        code:"CODE",
        grant_type:"authorization_code"
    };
    var data = JSON.stringify(params);
    uexWeiXin.getLoginAccessToken(data,function(data){
   alert("callback:" + JSON.stringify(data));
});
```

> ### getLoginRefreshAccessToken 获取刷新access_token

`uexWeiXin.getLoginRefreshAccessToken(json,function(data){})`

**说明:**

刷新access_token有效期 

**参数:**

```
var json = {
    grant_type:,
    refresh_token:
}
```
各字段含义如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| grant_type | String | 是 | 填refresh_token |
| refresh_token | String | 是 | 调用getLoginAccessToken接口时获得的refresh_token |
| data|json字符串 | 必选 | 返回数据|
```
返回数据格式:
var data = {
    access_token: "ACCESS_TOKEN",
    expires_in: 7200,
    refresh_token: "REFRESH_TOKEN",
    openid: "OPENID",
    scope: "snsapi_userinfo"
}
```

各字段含义如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| access_token| String| 是 | 接口调用凭证 |
| expires_in| Number | 是 | access_token接口调用凭证超时时间,单位(秒) |
| refresh_token| String | 是 | 用户刷新access_token |
| openid| String | 是 | 授权用户唯一标识 |
| scope| String | 是 | 用户授权的作用域,使用逗号(,)分隔 |


**示例:**

```
    var params = {
        grant_type:"refresh_token",
        refresh_token:"REFRESH_TOKEN"
    };
    var data = JSON.stringify(params);
    uexWeiXin.getLoginRefreshAccessToken(data,function(data){
   alert("callback:" + JSON.stringify(data));
});
```

> ### getLoginCheckAccessToken 检验access_token是否有效

`uexWeiXin.getLoginCheckAccessToken(json,,function(data){})`

**说明:**

检验access_token是否有效 

**参数:**

```
var json = {
    access_token:,
    openid:
}
```
各字段含义如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| access_token | String | 是 | 调用接口凭证 |
| openid | String | 是 | 普通用户标识,通过调用getLoginAccessToken或者getLoginRefreshAccessToken可获得该唯一标识符 |
| data|json字符串 | 必选 | 返回数据|
```
var data = {
    errcode: 0
    errmsg: "ok"
}
```

各字段含义如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| errcode| Number| 是 | 返回码,0:有效。非0:无效。返回码参考[返回码说明](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419318634&token=&lang=zh_CN) |
| errmsg| String | 是 | 返回码文字描述 |


**示例:**

```
    var params = {
        access_token:"ACCESS_TOKEN",
        openid:"OPENID"
    };
    var data = JSON.stringify(params);
    uexWeiXin.getLoginCheckAccessToken(data,function(data){
   alert("callback:" + JSON.stringify(data));
});
```

> ### getLoginUnionID 获取用户个人信息

`uexWeiXin.getLoginUnionID(json,function(data){})`

**说明:**

获取用户个人信息,UnionID机制,开发者可通过OpenID来获取用户基本信息。特别需要注意的是,如果开发者拥有多个移动应用、网站应用和公众帐号,可通过获取用户基本信息中的unionid来区分用户的唯一性,因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号,用户的unionid是唯一的。换句话说,同一用户,对同一个微信开放平台下的不同应用,unionid是相同的。

**参数:**

```
var json = {
    access_token:,
    openid:
}
```
各字段含义如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| access_token | String | 是 | 调用接口凭证 |
| openid | String | 是 | 普通用户标识,通过调用getLoginAccessToken,getLoginRefreshAccessToken或者getLoginUnionID可获得该唯一标识符 |
| data|json字符串 | 必选 | 返回数据|
```
返回数据:
var data = {
    openid: "OPENID",
    nickname: "xxx",
    sex: 2,
    language: "zh_CN",
    city: "",
    province: "",
    country: "CN",
    headimgurl: "xxxx",
    privilege: [],
    unionid: "UNIONID"
}
```

各字段含义如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| openid| String| 是 | 普通用户的标识,对当前开发者帐号唯一 |
| nickname | String | 是 | 普通用户昵称 |
| sex | String | 是 | 普通用户性别,1为男性,2为女性 |
| language | String | 是 | 微信客户端当前语言 |
| city | String | 是 | 普通用户个人资料填写的城市 |
| province | String | 是 | 普通用户个人资料填写的省份 |
| country | String | 是 | 国家,如中国为CN |
| headimgurl | String | 是 | 用户头像,最后一个数值代表正方形头像大小(有0、46、64、96、132数值可选,0代表640*640正方形头像),用户没有头像时该项为空 |
| privilege | String | 是 | 用户特权信息,json数组,如微信沃卡用户为(chinaunicom) |
| unionid | String | 是 | 用户统一标识。针对一个微信开放平台帐号下的应用,同一用户的unionid是唯一的。 |

**示例:**

```
    var params = {
        access_token:"ACCESS_TOKEN",
        openid:"OPENID"
    };
    var data = JSON.stringify(params);
    uexWeiXin.getLoginUnionID(data,function(data){
   alert("callback:" + JSON.stringify(data));
});
```

> ### setCallbackWindowName 设置接收回调方法的窗口名称

`uexWeiXin.setCallbackWindowName(json)`

**说明:**

该方法用于设置接收分享、登陆和支付相关回调方法的窗口名称。是修复程序偶尔收不到回调的补充方法。具体用法见示例。

**参数:**

```
var json = {
    windowName:
}
```
各字段含义如下:

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| windowName | String | 是 | 窗口名称,此处窗口为主窗口名称,若在起始页,则窗口名称为"root" |

**支持平台:**
Android 2.2+  
iOS 6.0+

**版本支持:**

Android 3.1.32+  
iOS 3.0.18+ 

**示例:**

*示例1:*

设置起始页(root页面)为接收回调的窗口:

```
    var params = {
        windowName:"root"
    };
    uexWeiXin.setCallbackWindowName(JSON.stringify(params));
```

*示例2:*

设置其他通过uexWindow.open接口打开的主窗口为接收回调的窗口:
open调用方法:

```
    uexWindow.open('share', '0', "share.html", '2', '', '', 4);
    //其中第一个参数(share)即为share.html窗口的窗口名称。
```

则在share.html中的uexOnload方法中要添加如下代码:

```
    var params = {
        windowName:"share"
    };
    uexWeiXin.setCallbackWindowName(JSON.stringify(params));
```



#3、更新历史

### iOS

API版本:`uexWeiXin-4.0.0`

最近更新时间:`2016-6-7`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持引擎4.0,函数入参 |
| 3.0.20 | 修复getWeiXinLoginAccessToken失败的bug |
| 3.0.19 | 修复getWeiXinLoginAccessToken失败的bug |
| 3.0.18 | 修改回调方式,支持setCallbackWindowName接口;部分支持IDE |
| 3.0.17 | 新增一版微信登陆相关接口 |
| 3.0.16 | 微信分享纯图片添加可选参数title |
| 3.0.15 | uexWeiXin.cbStartPay 回调结构修正 |
| 3.0.14 | 新增接口getPrepayId和startPay及相应回调,以支持V3 V4支付 |
| 3.0.13 | 增加微信授权登录的五个接口以及相对应的回 调方法 |
| 3.0.12 | 支持arm64 |
| 3.0.11 | 修改shareLinkContent,shareImageContent,shareTextContent三个接口的回调 |
| 3.0.10 | 增加shareLinkContent,shareImageContent,shareTextContent三个接口 |
| 3.0.9 | 修复获取预支付订单失败的问题 |
| 3.0.8 | 调整微信支付接口 |
| 3.0.7 | 修复微信分享回调只是返回0的bug |
| 3.0.6 | 统一回调方法名 |
| 3.0.5 | 统一回调参数 |
| 3.0.4 | 添加分享成功回调 |
| 3.0.2 | 修正微信分享HTTP图片失败的bug |
| 3.0.1 | 修正微信分享照片失败的bug |
| 3.0.0 | 微信分享功能插件 |

### Android

API版本:`uexWeiXin-4.0.0`

最近更新时间:`2016-6-7`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持引擎4.0,函数入参 |
| 3.1.35 | 更新SDK,优化代码逻辑；文档中增加错误返回码说明 |
| 3.1.34 | 支持https |
| 3.1.33 | 修复和完善抛出异常的捕获 |
| 3.1.32 | 新增setCallbackWindowName接口,解决偶尔收不到回调的问题 |
| 3.1.31 | 更新微信登陆相关接口 |
| 3.0.30 | 修复微信支付返回时偶尔没有回调的问题 |
| 3.0.29 | 微信支付sdk升级 |
| 3.0.28 | 修正链接分享时图片本来已经比较小 不需要缩略导致的问题 |
| 3.0.27 | 修复分享回调时应用奔溃退出的问题 |
| 3.0.26 | 修改回调方法 |
| 3.0.25 | 新添加微信登陆功能 |
| 3.0.24 | 修改分享文本、分享图片、分享链接回调接口参数 |
| 3.0.23 | 结合后台修复插件需要定制出包的问题 |
| 3.0.22 | 修复在Popover中微信分享失败问题 |
| 3.0.21 | 新增分享文本、分享图片、分享链接接口 |
| 3.0.20 | 插件包增加src目录文件,用于解决回调的定制问题 |
| 3.0.19 | 修复分享图片不支持wgt路径协议的问题 |
| 3.0.18 | 修复分享完成回调时奔溃的问题 |
| 3.0.17 | 修复分享完成回调时网页未恢复的问题 |
| 3.0.16 | 修改AndroidManifest文件中微信相关activity注册信息 |
| 3.0.15 | 更新插件中引擎jar包 |
| 3.0.14 | 修复支付完成回调时网页未恢复的问题 |
| 3.0.13 | 新增接口generatePrepayID和sendPay |
| 3.0.12 | 修复微信支付完成后没有回调的问题 |
| 3.0.11 | 修改cbIsWXAppInstalled回调方法参数,已安装返回0,未安装返回1 |
| 3.0.10 | 修改mainfest添加微信activity |
| 3.0.9 | 添加cbSendTextContent和cbSendImageContent回调 |
| 3.0.8 | 添加注册回调cbRegisterApp |
| 3.0.7 | 添加架包 |
| 3.0.6 | 处理分享图片问题 |
| 3.0.5 | 修复扶贫基金会中的回调兼容问题 |
| 3.0.4 | 处理微信返回值问题 |
| 3.0.3 | 修复微信不能生成订单问题 |
| 3.0.2 | 修复配置问题 |
| 3.0.1 | 修复微信资源问题 |
| 3.0.0 | 微信分享功能插件 |
