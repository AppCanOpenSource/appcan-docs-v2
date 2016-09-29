/*
Sort: 1
Toc: 1
*/


# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() <ignore>
支付宝插件

##   1.1、说明<ignore>
支付功能,封装了支付宝快捷支付.

**iOS 9 以后,为了预防APP通过非正常渠道获取用户的某些隐私信息,Apple启用了URLScheme白名单机制.**
​	
* **为了正常使用插件的所有功能还需要配置URLScheme白名单**([什么是URLScheme白名单](http://bbs.appcan.cn/forum.php?mod=viewthread&tid=29503&extra=))
* 配置白名单方法请参考[这里](http://newdocx.appcan.cn/newdocx/docx?type=1505_1291#设置urlScheme白名单)
* uexAliPay需要进白名单添加的URLScheme如下

```
<string>alipay</string>
<string>alipayshare</string>
```

##   1.2、UI展示<ignore>

 ![](http://newdocx.appcan.cn/docximg/180420r2015s6i16p.png)

##  1.3、公告<ignore>
旧版uexPay 已经下架了,官方不再维护,如需使用,请[跳转](http://bbs.appcan.cn/forum.php?mod=viewthread&tid=25876 "跳转")到详细官方通告

##  1.4、开源源码<ignore>
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=279_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.5、平台版本支持<ignore>
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.6、接口有效性<ignore>
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.

#    2、API概览<ignore>

##  2.1、方法<ignore>


###    setPayInfo 设置商户信息

`uexAliPay.setPayInfo(partner,seller,rsaPrivate,rsaPublic,notifyUrl)    `

**说明:**

商户信息需要通过ms.alipay.com签约后获取,点击查看支付宝产品:
[快捷支付(无线)](https://b.alipay.com/order/productDetail.htm?productId=2014110308141993) 
[签约入口](https://b.alipay.com/order/productDetail.htm?productId=2014110308141993) 


**参数:**

| 参数名称       | 参数类型   | 是否必选 | 说明                  |
| ---------- | ------ | ---- | ------------------- |
| partner    | String | 是    | 合作者身份IDs            |
| seller     | String | 是    | 卖家支付宝账号或对应的支付宝唯一用户号 |
| rsaPrivate | String | 是    | 合作者私钥               |
| rsaPublic  | String | 是    | 支付宝公钥               |
| notifyUrl  | String | 是    | 服务器通知路径             |


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

###   pay 支付功能

`uexAliPay.pay(num,subject,body,fee, callbackFunction)`

**说明:**

进行支付前必须先设置商户信息,否则无法完成支付

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明                                       |
| ---------------- | -------- | ---- | ---------------------------------------- |
| num              | String   | 是    | 唯一订单号                                    |
| subject          | String   | 是    | 商品名称                                     |
| body             | String   | 是    | 商品详情                                     |
| fee              | String   | 是    | 总金额,单位为RMB-Yuan,取值范围为[0.01,100000000.00] |
| callbackFunction | Function | 否    | 回调函数,用来获取支付结果状态                          |

**回调参数:**

```
var callbackFunction = function(error, data){}
```

| 参数名称  | 类型     | 说明              |
| ----- | ------ | --------------- |
| error | Number | 分享状态,0-成功,非0-失败 |
| data  | String | 失败信息            |

callbackFunction的参数为status(状态值), msg(提示信息)

**示例:**

```
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

# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexAliPay-4.0.0`

最近更新时间:`2016-06-11`

| 历史发布版本 | 更新内容                              |
| ------ | --------------------------------- |

### Android<ignore>

API版本: `uexAliPay-4.0.0`

最近更新时间:`2016-06-11`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
