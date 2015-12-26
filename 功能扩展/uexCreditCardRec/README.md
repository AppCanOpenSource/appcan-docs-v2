[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
信用卡识别插件
## 1.1、说明
可以快速扫描信用卡信息功能
## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/130030c2015p6e16c.png)
## 1.3、开源源码:
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=164_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法:
> ### openCreditCardRec 开启识别

`uexCreditCardRec.openCreditCardRec(token)`

**说明:**

请先到PayPal注册获取token 回调方法[cbCreditCard](#cbCreditCard 识别完成后的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| token | String | 是 | 在PayPal获取的授权令牌 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
function createCreditCardRec(){
  var tokenStr = "f06a7eca39134918a18dc4d7c45ee49f";
  uexCreditCardRec.openCreditCardRec(tokenStr);
}
```
## 2.2、回调方法
> ### cbCreditCard 识别完成后的回调方法

`uexCreditCardRec.cbCreditCard(number,date,cvv)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| number | String | 是 | 卡号 |
| date| String | 是 | 到期时间 |
| cvv | String | 是 | cvv码 |

**版本支持:**

3.0.0+

**示例:**

```
function cbCreditCard(number,date,cvv) {
    alert(number);
}
window.uexOnload = function(){
    uexCreditCardRec.cbCreditCard = cbCreditCard;
}
```

# 3、更新历史

### iOS

API版本:`uexCreditCardRes-3.0.2`

最近更新时间:`2015-06-19`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.2 | uexCreditCardRec插件更新第三 方libPayPalMobile.a,支持arm64 |
| 3.0.1 | 统一回调方法名,统一回调参数 |
| 3.0.0 | 信用卡识别功能插件 |

### Android

**uexCreditCardRes目前不支持Android**

