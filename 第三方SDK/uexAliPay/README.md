
[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
支付宝插件

##   1.1.说明
支付功能,封装了支付宝快捷支付。

**iOS 9 以后,为了预防APP通过非正常渠道获取用户的某些隐私信息,Apple启用了URLScheme白名单机制。**
	
* **为了正常使用插件的所有功能还需要配置URLScheme白名单**([什么是URLScheme白名单](http://bbs.appcan.cn/forum.php?mod=viewthread&tid=29503&extra=))
* 配置白名单方法请参考[这里](http://newdocx.appcan.cn/newdocx/docx?type=1505_1291#设置urlScheme白名单)
* uexAliPay需要进白名单添加的URLScheme如下

```
<string>alipay</string>
<string>alipayshare</string>
```

##   1.2.UI展示
 
 ![](http://newdocx.appcan.cn/docximg/180420r2015s6i16p.png)
 
##  1.3.公告
旧版uexPay 已经下架了,官方不再维护,如需使用,请[跳转](http://bbs.appcan.cn/forum.php?mod=viewthread&tid=25876 "跳转")到详细官方通告
##  1.4.开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=279_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

#    2、API概览

##  2.1. 方法
 

> ###   setPayInfo 设置商户信息

`uexAliPay.setPayInfo(partner,seller,rsaPrivate,rsaPublic,notifyUrl)    `

**说明:**

商户信息需要通过ms.alipay.com签约后获取,点击查看支付宝产品:
[快捷支付(无线)](https://b.alipay.com/order/productSet.htm) 
[签约入口](https://b.alipay.com/order/productSet.htm) 
 

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| partner| String类型| 必选 | 合作者身份IDs |
| seller|String类型 | 必选 | 卖家支付宝账号或对应的支付宝唯一用户号 |
| rsaPrivate|String类型 | 必选 | 合作者私钥|
| rsaPublic|String类型 | 必选 | 支付宝公钥|
| notifyUrl|String类型 | 必选 | 服务器通知路径|
 

**平台支持:**

Android2.2+ 
iOS6.0+ 

**版本支持:**

3.0.0+  

**示例:**

```
    var partner = "208845648165561";
    var seller = "48652321@qq.com";
    var rsaPrivate = "MIICdwIBADANBgkn4E3TszcjB+Kf7CGVQ/nsvyywjA+i+0vmaftUzoOdIcWnI8UEr9I=";
    var rsaPublic = "MIGfMA0GCSqGSIb3DQEBAQUAVsW8Ol75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB";
    
    function setInfo(){
    var notifyUrl = document.getElementById("notifyURL").value;
    uexAliPay.setPayInfo(partner, seller, rsaPrivate, rsaPublic, notifyUrl);
    }

```
> ###   pay 支付功能

`uexAliPay.pay(num,subject,body,fee)    `

**说明:**

进行支付前必须先设置商户信息,否则无法完成支付 
监听方法 [onStatus](#onStatus 支付状态改变时的监听方法 "onStatus") 

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| num| String类型| 必选 | 唯一订单号 |
| subject|String类型 | 必选 | 商品名称 |
| body|String类型 | 必选 | 商品详情|
| fee|String类型 | 必选 | 总金额,单位为RMB-Yuan,取值范围为[0.01,100000000.00]  |
   

**平台支持:**

Android2.2+ 
iOS6.0+ 

**版本支持:**

3.0.0+  

**示例:**

```
    function pay(){
    setInfo();
    var subject = "珍珠项链";
    var body = "韩版,韩国流行饰品小太阳花小巧雏菊 珍珠项链2M15。";
    var fee = "0.01";
    var num = "200155555";
    uexAliPay.pay(num, subject, body, fee);
    
    }
    function paySuccess(status, des){
    document.getElementById('adre').innerHTML  = des;
    }
    
    function payFailed(opCode, errorCode, des){
    document.getElementById('adre').innerHTML  = des;
    }
    
    window.uexOnload = function(){
    
    uexAliPay.onStatus = paySuccess;
    uexWidgetOne.cbError = payFailed;
    }

```
> ###   gotoPay 安全支付接口

`uexAliPay.gotoPay(info);   `
**说明:**
为了保证key的安全，提供此接口，用于调用服务器加签名好的订单信息去支付。
接口区别，gotoPay所需参数有限，关键参数都在服务端保存，而pay接口需要在客户端传入很多私钥之类的参数，在客户端保存这些参数容易泄露，不建议使用。

监听方法 [onStatus](#onStatus 支付状态改变时的监听方法 "onStatus") 
**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| info | String类型| 必选 | 服务器端签名好的订单信息串儿 |
请查阅支付宝官网文档：
[请求参数格式](https://doc.open.alipay.com/doc2/detail.htm?spm=a219a.7629140.0.0.x7kkCI&treeId=204&articleId=105465&docType=1 "请求参数格式")
[返回结果参数](https://doc.open.alipay.com/doc2/detail.htm?spm=a219a.7629140.0.0.xN1NnL&treeId=204&articleId=105302&docType=1 "返回结果参数")

**平台支持:**
Android2.2+ 
iOS4.3+ 
**版本支持:**
3.0.0+  
**示例:**

```
function gotoPay() {
		var info = 'partner="2088211417267818"&seller_id="78871900@qq.com"&out_trade_no="20015555599"&subject="珍珠项链"&body="韩版,韩国流行饰品小太阳花小巧雏菊 珍珠项链2M15。"&total_fee="0.01"&notify_url="www.123.com"&service="mobile.securitypay.pay"&payment_type="1"&_input_charset="utf-8"&it_b_pay="30m"&sign="f51DMa28wjxohslV9SI7%2BNLyQWQIuf3%2F1LFNQbNccL8tG1b5HHW1c58d76ikd71Rvi9D26WaRiDnH5o%2FitIXlvNVzYxkryZqzHUsvPCb5pLnJolbyQ00VF7AesE4z28DcGZMP9T%2FbUI5I3V%2BLs%2BC8odSeXhOq4DgXFA0hUx2gzA%3D"&sign_type="RSA"';
		uexAliPay.gotoPay(info);
	}
```
##2.2.监听方法
> ###onStatus 支付状态改变时的监听方法

 uexAliPay.onStatus(status,des) 

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| status| String类型| 必选 | 支付状态 |
| des|String类型 | 必选 | 支付状态描述 |
 
                                                      

![](http://newdocx.appcan.cn/docximg/182534h2015q2t11e.png)

**版本支持:**

                            
3.0.0+          
# 3、更新历史

### iOS

API版本:`uexAliPay-4.0.0`

最近更新时间:`2016-7-5`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.11 | 支持引擎4.0,函数入参 |
| 4.0.10 | 更新支付宝SDK到15.1.3 |
| 3.0.9 | 更新支付宝SDK到15.0.6 |
| 3.0.8 | 更新支付宝SDK到2.2.1 |
| 3.0.7 | uexAliPay新增gotoPay传入服务器签名好的数据直接支付 |
| 3.0.6 | 统一支付返回状态 |
| 3.0.5 | 修改uexAliPay插件支付状态码 |
| 3.0.4 | 修改plist文件,修复支付没有回调的问题 |
| 3.0.3 | 更新支付宝SDK,支持arm64 |
| 3.0.2 | 修复支付完成或支付取消后退出当前页面的崩溃问题 |
| 3.0.1 | notifyURL改为可选参数 |
| 3.0.0 | 支付宝快捷支付 |

### Android

API版本:`uexAliPay-3.0.8`

最近更新时间:`2015-06-19`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.8 | 更新支付宝SDK。 解决当用户手机没有安装支付宝快捷 支付服务时出现解析包错误的问题 |
| 3.0.7 | 更新支付宝SDK |
| 3.0.6 | 插件主页面点击物理返回键,插件崩溃 |
| 3.0.5 | 新增gotoPay传入服务器签名好的数据直接支付 |
| 3.0.4 | 统一支付返回状态 |
| 3.0.3 | 添加必要库文件 |
| 3.0.2 | 修复参数问题 |
| 3.0.1 | 修复不兼容安卓4.4的问题 |
| 3.0.0 | 支付宝功能插件 |
