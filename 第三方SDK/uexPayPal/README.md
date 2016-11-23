[TOC]

 # 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
PayPal支付插件， 该插件封装了PayPal sdk用来完成支付功能。
## 1.1、说明
插件中封装的只是客户端的支付功能，当用户完成支付后，需要对支付结果进行校验。因此开发者需要搭建服务端，去校验支付是否合法。校验可以参看[官方文档](https://developer.paypal.com/webapps/developer/docs/integration/mobile/verify-mobile-payment/)

关于支付结果的校验，请参看[文档](https://developer.paypal.com/webapps/developer/docs/integration/mobile/verify-mobile-payment/)

## 1.2、UI展示

## 1.3、开源源码
插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4、平台版本支持

本插件的所有API默认支持**Android4.1+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.
# 2、API概览
## 2.1、方法

### 🍭 init 初始化

`uexPayPal.init(params)`

**说明:**

初始化

**参数:**

```
var params ={
    mode: ,
    clientId: 
}
```

各字段含义如下:

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| mode | String | 否 | 默认为`production`，即生产环境 |
| clientId | String | 是 | 用户申请的clientId |

**注意**
* mode 有三个取值，分别是`production`, `sandbox`, `noNetwork`. 
* 官方的clientId分为两个类型，分别是sandbox类别的clientId和production类别的clientId, 和上面的mode是对应的。针对测试环境可以不传clientId.

**示例:**

```
var params = {
    mode: 'noNetwork',
    clientId: ''
};
uexPayPal.init(data);
```

### 🍭 pay 支付

`uexPayPal.play(params, callbackFunction)`

**说明:**

支付

**参数:**
| 参数名称             | 参数类型     | 是否必选 | 说明                        |
| ---------------- | -------- | ---- | ------------------------- |
| params          | String   | 是    | 支付相关的金额，货币类别等信息 |
| callbackFunction | Function | 是    | 回调函数,用来获取相关业务数据 |

`params`的数据结构格式如下：
```
var params = {
  amount: //支付的金额
  currency: //货币类别如 USD
  desc: //交易的描述信息
}
```

**回调参数**
```javascript
var callbackFunction = function(error, data) {

}
```


| 参数名称  | 参数类型   | 说明              |
| ----- | ------ | --------------- |
| error | Number | 为0时表示成功, 1表示取消， 2 表示参数错误 |
| data  | Object | 返回数据,形式见下       |

```
var data = { 
   environment:,  //当前使用环境
   paypal_sdk_version: //当前sdk版本
   platform:,  //平台 Android/iOS
   product_name:, //"PayPal-Android-SDK" 或 "PayPal iOS SDK"
   response:, // Object 类型，交易结果
   response_type:
}
```



**示例:**

```
var param = {
    amount: '56.9',
    currency: "USD",
    desc: "just for test"
}
uexPayPal.pay(param, function(error, data) {
    alert('data:' + JSON.stringify(data));
});
```

# 3、更新历史 

### iOS

API版本: `uexPayPal-4.0.0`

最近更新时间:`2016-11-17`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android

API版本: `uexPayPal-4.0.0`

最近更新时间:`2016-11-17`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
