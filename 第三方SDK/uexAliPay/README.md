
[TOC]
# 1､简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
支付宝插件

##   1.1､说明
支付功能,封装了支付宝快捷支付.

**iOS 9 以后,为了预防APP通过非正常渠道获取用户的某些隐私信息,Apple启用了URLScheme白名单机制.**
​	
* **为了正常使用插件的所有功能还需要配置URLScheme白名单**([什么是URLScheme白名单](http://bbs.appcan.cn/forum.php?mod=viewthread&tid=29503&extra=))
* 配置白名单方法请参考[这里](http://newdocx.appcan.cn/newdocx/docx?type=1505_1291#设置urlScheme白名单)
* uexAliPay需要进白名单添加的URLScheme如下

```xml
<string>alipay</string>
<string>alipayshare</string>
```

##   1.2､UI展示

 ![](http://newdocx.appcan.cn/docximg/180420r2015s6i16p.png)

##  1.3､公告
旧版uexPay 已经下架了,官方不再维护,如需使用,请[跳转](http://bbs.appcan.cn/forum.php?mod=viewthread&tid=25876 "跳转")到详细官方通告

##  1.4､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=279_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.5､平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS8.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.6､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

#    2､API概览

##  2.1､方法


### 🍭   ~~setPayInfo 设置商户信息~~ (已废弃)

`uexAliPay.setPayInfo(partner,seller,rsaPrivate,rsaPublic,notifyUrl)    `

**说明:**

设置支付商户的基本信息
**本接口仅适用于使用"移动接口支付"服务的旧版支付宝商户**



* 该服务目前已下架,建议仍在使用此服务的用户尽快升级至新版"App接口支付"服务
* ⚠️ 将私钥等信息保存在客户端是一种非常危险的行为,为防止商户私密数据泄露,造成不必要的资金损失,避免面临各种安全风险,强烈建议将签名过程放在服务端,并使用[payWithOrder](#🍭-paywithorder-支付)接口进行支付
* "移动接口支付"服务签名方法请参考[旧版支付宝官方文档](https://doc.open.alipay.com/doc2/detail?treeId=59&articleId=103663&docType=1)


**参数:**

| 参数名称       | 参数类型   | 是否必选 | 说明                  |
| ---------- | ------ | ---- | ------------------- |
| partner    | String | 是    | 合作者身份IDs            |
| seller     | String | 是    | 卖家支付宝账号或对应的支付宝唯一用户号 |
| rsaPrivate | String | 是    | 合作者私钥               |
| rsaPublic  | String | 是    | 支付宝公钥               |
| notifyUrl  | String | 是    | 服务器通知路径             |


**示例:**

```js
var partner = "208845648165561";
var seller = "48652321@qq.com";
var rsaPrivate = "MIICdwIBADANBgkn4E3TszcjB+Kf7CGVQ/nsvyywjA+i+0vmaftUzoOdIcWnI8UEr9I=";
var rsaPublic = "MIGfMA0GCSqGSIb3DQEBAQUAVsW8Ol75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB";

function setInfo(){
    var notifyUrl = document.getElementById("notifyURL").value;
    uexAliPay.setPayInfo(partner, seller, rsaPrivate, rsaPublic, notifyUrl);
}
```

### 🍭  ~~pay 支付~~(已废弃)

`uexAliPay.pay(num,subject,body,fee, callbackFunction)`

**说明:**

进行支付前必须先调用setPayInfo设置商户信息,否则无法完成支付

**本接口仅适用于使用"移动接口支付"服务的旧版支付宝商户用户**



- 该服务目前已下架,建议老用户尽快升级至新版"App接口支付"服务
- ⚠️ 将私钥等信息保存在客户端是一种非常危险的行为,为防止商户私密数据泄露,造成不必要的资金损失,避免面临各种安全风险,建议将签名过程放在服务端,并使用[payWithOrder](#🍭-paywithorder-支付)接口进行支付
- "移动接口支付"服务签名方法请参考[旧版支付宝官方文档](https://doc.open.alipay.com/doc2/detail?treeId=59&articleId=103663&docType=1)

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明                                       |
| ---------------- | -------- | ---- | ---------------------------------------- |
| num              | String   | 是    | 唯一订单号                                    |
| subject          | String   | 是    | 商品名称                                     |
| body             | String   | 是    | 商品详情                                     |
| fee              | String   | 是    | 总金额,单位为RMB-Yuan,取值范围为[0.01,100000000.00] |
| callbackFunction | Function | 否    | 回调函数,用来获取支付结果状态                          |

**回调参数:**

```js
var callbackFunction = function(error, data){}
```

| 参数名称  | 类型     | 说明              |
| ----- | ------ | --------------- |
| error | Number | 分享状态,0-成功,非0-失败 |
| data  | String | 失败信息            |

callbackFunction的参数为status(状态值), msg(提示信息)

**示例:**

```js
var commonCallback = function(error, data) {
    if(!error){
      alert("支付成功");
    }else{
      alert(data);
    }
};

function pay(){
    setInfo();
    var subject = "珍珠项链";
    var body = "韩版,韩国流行饰品小太阳花小巧雏菊 珍珠项链2M15.";
    var fee = "0.01";
    var num = "200155555";
    uexAliPay.pay(num, subject, body, fee, commonCallback);
}
```



###  🍭 payWithOrder 支付

`uexAliPay.payWithOrder(order,callback)`

**说明:**

解析支付请求进行支付

**本接口兼容使用"移动接口支付"服务的旧版支付宝商户和使用"app接口支付"服务新版支付宝商户**

* 生成"移动接口支付"服务的支付请求请参考[旧版支付宝官方文档](https://doc.open.alipay.com/doc2/detail?treeId=59&articleId=103663&docType=1)
* 生成"app接口支付"服务的支付请求请参考[新版支付宝官方文档](https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7629140.0.0.70InGu&treeId=193&articleId=105465&docType=1)

**参数:**

| 参数名称     | 参数类型     | 是否必选 | 说明      |
| -------- | -------- | ---- | ------- |
| order    | String   | 是    | 支付请求    |
| callback | Function | 否    | 支付的回调函数 |

**回调参数:**

```
var callback = function(error, message){}
```

| 参数名称    | 类型     | 说明              |
| ------- | ------ | --------------- |
| error   | Number | 支付状态,0-成功,非0-失败 |
| message | String | 支付状态的说明信息       |



⚠️ 当用户手机已安装支付宝App时,调用此接口会打开支付宝App进行支付,此时原应用可能会因为内存原因被关闭.当发生此情况时,用户应向服务器获取通过notify_url返回的支付结果,再进行下一步操作



**示例:**

```js
var order = ... //从后台获得的支付请求
uexAliPay.payWithOrder(order,function(error,message){
  if(error){
    alert("支付失败: " + message);
  }else{
    alert("支付成功")
  }
})
```



### 🍭 generatePayOrder 生成支付请求

`uexAlipay.generatePayOrder(data)`

**说明:**

测试用接口,根据订单信息生成支付请求

此接口仅适用于使用"App接口支付"服务的支付宝商户

注意:将私钥等信息保存在客户端可能会商户私密数据泄露,造成不必要的资金损失,是一种非常危险的行为.

 🚫**此接口仅用于测试,严禁在正式环境中使用.**



**参数:**

```js
var data = {
  private_key: ,
  app_id: ,
  notify_url: ,
  biz_content: {
    subject:,
  	body:,
  	out_trade_no:,
  	total_amount:,
  	seller_id:
  }
};
```



| 参数名称         | 参数类型   | 是否必选 | 说明                                       |
| ------------ | ------ | ---- | ---------------------------------------- |
| private_key  | String | 是    | 签名用的RSA私钥                                |
| app_id       | String | 是    | 支付宝分配给开发者的应用ID                           |
| notify_url   | String | 是    | 支付宝异步通知的服务器地址,**建议使用https地址**            |
| biz_content  | Object | 是    | 交易信息,详情见下                                |
| subject      | String | 是    | 商品的标题/交易标题/订单标题/订单关键字等                   |
| body         | String | 否    | 交易的具体描述信息                                |
| out_trade_no | String | 是    | 商户网站唯一订单号,由用户自己生成,可传任意字符串                |
| total_amount | String | 是    | 订单总金额,单位为元,可精确到小数点后两位,取值范围[0.01,100000000] |
| seller_id    | String | 否    | 收款支付宝用户ID｡ 如果该值为空,则默认为商户签约账号对应的支付宝用户ID｡  |



**返回值:**

生成的支付请求字符串

**示例:**

```js
var order = uexAliPay.generatePayOrder({
  private_key: "******",
  app_id: "2014072300007148",
  notify_url: "https://www.123.com/alipay/notify",
  biz_content:{
    subject:"iPhone 6s",
    body: "64G 玫瑰金",
    out_trade_no: "70501111111S001111119",
    total_amount: "5988",
    seller_id: "2088102147948060"
  }
});
```



### 🍭 getAuthInfo 生成授权信息

`uexAlipay.getAuthInfo(data)`

**说明:**

测试用接口,根据数据生成授权信息

此接口仅适用于使用"App支付宝登录"服务的支付宝商户

注意:将私钥等信息保存在客户端可能会商户私密数据泄露,造成不必要的资金损失,是一种非常危险的行为.

 🚫**此接口仅用于测试,严禁在正式环境中使用.**



**参数:**

```js
var data = {
  rsaPrivate: ,
  pid: ,
  appId: ,
  targetId:,
  authType:,
  rsa2:,
};
```



| 参数名称       | 参数类型    | 是否必选 | 说明                                       |
| ---------- | ------- | ---- | ---------------------------------------- |
| rsaPrivate | String  | 是    | 签名用的RSA私钥                                |
| pid        | String  | 是    | 签约的支付宝账号对应的支付宝唯一用户号                      |
| appId      | String  | 是    | 支付宝分配给开发者的应用ID                           |
| targetId   | String  | 是    | 商户标识该次用户授权请求的ID,该值在商户端应保持唯一              |
| authType   | String  | 是    | 标识授权类型,取值范围: "AUTHACCOUNT"代表授权,"LOGIN"代表登录 |
| rsa2       | Boolean | 是    | 签名算法是否使用RSA2(SHA256withRSA)              |



**返回值:**

生成的授权信息字符串

**示例:**

```js
var authInfo = uexAliPay.getAuthInfo({
 	rsaPrivate:"******",
  	pid:"******",
  	appId:"******",
  	targetId:new Date().getTime(),
  	rsa2:true
});
```



### 🍭 auth 授权登录

`uexAliPay.auth(authInfo,callback)`

此接口仅适用于使用"App支付宝登录"服务的支付宝商户

如何生成授权请求请参考[支付宝官方文档](https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7629140.0.0.MOlJZ3&treeId=193&articleId=105327&docType=1)

**说明:**

解析授权请求进行授权登录

**参数:**

| 参数名称     | 参数类型     | 是否必选 | 说明        |
| -------- | -------- | ---- | --------- |
| authInfo | String   | 是    | 授权请求      |
| callback | Function | 否    | 授权登录的回调函数 |

**回调参数:**

```js
var callback = function(error, data){}
```

| 参数名称  | 类型     | 说明                                       |
| ----- | ------ | ---------------------------------------- |
| error | Number | 授权结果,0-成功,非0-失败                          |
| data  | Object | 授权登录返回结果,字段说明见[支付宝官方文档](https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7629140.0.0.MOlJZ3&treeId=193&articleId=105327&docType=1) |



**示例:**

```js
var authInfo = ... //从后台获得的授权请求
uexAliPay.auth(order,function(error,data){
  if(error){
    alert("支付失败");
  }else{
    alert("支付成功");
  }
  alert("授权结果: " + JSON.stringify(data));
})
```







# 3､更新历史

### iOS

API版本: `uexAliPay-4.0.2`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.2 | 添加登录相关接口 |
| 4.0.1 | SDK更新,添加新接口以支持新版"app接口支付" |
| 4.0.0 | 支付宝插件 |

### Android

API版本: `uexAliPay-4.0.3`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.3 | 支持支付宝登录 |
| 4.0.2 | 修复支付成功之后没有回调的问题 |
| 4.0.1 | 支持支付宝新版接口 |
| 4.0.0 | 支付宝功能插件 |
