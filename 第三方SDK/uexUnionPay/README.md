[TOC]

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
UnionPay银联支付插件

## 1.1、说明
 该插件实现UnionPay银联支付功能，使用该插件的开发者需要自己搭建商户后台，商户后台负责和银联后台交互得到交易流水号，开发者拿到交易流水号之后调用该插件的支付方法可实现支付功能。具体商户接入方式，开发者可参考[银联官方](https://open.unionpay.com/ajweb/index) 。

## 1.2、UI展示
 ![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E7%AC%AC%E4%B8%89%E6%96%B9SDK/uexUnionPay/img/1.png) ![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E7%AC%AC%E4%B8%89%E6%96%B9SDK/uexUnionPay/img/2.png) ![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E7%AC%AC%E4%B8%89%E6%96%B9SDK/uexUnionPay/img/3.png) ![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E7%AC%AC%E4%B8%89%E6%96%B9SDK/uexUnionPay/img/4.png)

## 1.3、开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=536_index) 插件中心至插件详情页 （插件测试用例与插件源码已经提供）

# 2、API概览

## 2.1、方法
> ### startPay 支付

`uexUnionPay.startPay(params)`

**说明:**
 根据交易流水号调用支付方法。回调方法[cbStartPay](#cbStartPay 支付的回调方法 "cbStartPay")

**参数:**

```
var params = {
    orderInfo:,
    mode:
};
```

各字段含义如下：

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| orderInfo | String | 是 | 交易流水号，是商户后台通过调用银联后台获取的 |
| mode | String | 是 | 测试类型，取值为"00"、"01"。"00"表示银联正式环境，若开发者已经入网银联支付，可用正式环境测试；"01"表示银联测试环境，测试环境仅用于测试插件功能是否正常，测试方式请参考[插件测试说明](#5、插件测试说明) |

**平台支持:**
Android 2.2+
iOS 6.0+

**版本支持:**
Android 3.0.0+
iOS 3.0.0+

**示例:**

```
    var params = {
        orderInfo:"201512101543508484648",
        mode:"01"
    };
    var data = JSON.stringify(params);
    uexUnionPay.startPay(data);
```

## 2.2、回调方法
> ### cbStartPay 支付的回调方法

`uexUnionPay.cbStartPay(data)`

**参数:**
```
var data = {
    payResult:
}
```
各字段含义如下：

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| payResult| Number| 是 | 支付结果，结果说明，请参考[PayResult](#PayResult) |

**平台支持:**
Android2.2+
iOS6.0+

**版本支持:**
3.0.0+

**示例:**
```
    uexUnionPay.cbStartPay = function(data){
        alert(data);
    }
```

# 3、更新历史
 API 版本：uexUnionPay-3.0.0(iOS) uexUnionPay-3.0.0(Android)
 最近更新时间：2015-12-10
 
|  历史发布版本 | iOS更新  | 安卓更新  |
| ------------ | ------------ | ------------ |
| 3.0.0  | UnionPay银联支付插件  | UnionPay银联支付插件|
 
# 4、附录

### PayResult
| value | 说明 |
| ---- | ---- |
| 0 | 支付成功 |
| 1 | 支付失败 |
| -1 | 支付被用户取消 |
| -2 | 支付发生未知错误 |

# 5、插件测试说明

### 银联测试环境

 **因为没有权限入网银联，于是当前官方插件只支持银联测试环境测试**
 
 在测试银联支付的过程中，只需要交易流水号即可。交易流水号可通过测试地址[获取测试交易流水号](http://101.231.204.84:8091/sim/getacptn)。打开该网址可发现一串数字，该串数字即为测试用的交易流水号。将该交易流水号传入支付接口即可进行支付。
 
```
    var params = {
        orderInfo:"",//获取到的交易流水号
        mode:"01"//测试环境，该参数传01
    };
    var data = JSON.stringify(params);
    uexUnionPay.startPay(data);
```

调用之后弹出的支付界面可使用以下模拟银行卡支付：(**注该测试环境只支持以下银行卡信息支付**)

```
平安银行借记卡：6216 2610 0000 0000 018
证件号：341126197709218366
手机号：13552535506
密码：123456
姓名：全渠道
短信验证码：123456(注需要先点击“免费获取”，进入验证码过期倒计时之后再输入该验证码)
```

### 银联正式环境

**需要开发者入网银联商户平台，且需要自己开发商户后台，交易流水号即是从商户后台获取的。**
调用方法如下：

```
    var params = {
        orderInfo:"xxxxx",//从商户后台获取到的交易流水号
        mode:"00"//正式环境，该参数传00
    };
    var data = JSON.stringify(params);
    uexUnionPay.startPay(data);
```

弹出的支付界面可用任意有效的银行卡支付。
