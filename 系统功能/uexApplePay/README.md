[TOC]

# 1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
Apple Pay 支付插件
## 1.1､说明
 该插件实现了iPhone手机的Apple Pay 支付功能.

## 1.2､UI展示
![](https://github.com/AppCanOpenSource/appcan-docs-v2/raw/master/%E7%B3%BB%E7%BB%9F%E5%8A%9F%E8%83%BD/uexApplePay/imgs/img1.jpg)
## 1.3､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=578_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4､平台版本支持
本插件的所有API默认支持仅**iOS9.2+**操作系统,***不支持Android***.  
有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.


# 2､API概览

在进行插件调试之前,请先阅读[接入指引](#5､ 接入指引)并按其步骤进行接入操作,否则无法进行支付操作.

## 2.1､方法

### 🍭 canMakePayment 检测是否可以进行ApplePay支付

`uexApplePay.canMakePayment(params)`

**说明:**

* 检测能否进行ApplePay

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明           |
| ------ | ------ | ---- | ------------ |
| params | String | 否    | 接口所需数据,形式见下: |

```
var params = {
    networks:[]
};
```

各字段含义如下:

| 参数名称     | 参数类型  | 是否必选 | 说明                                       |
| -------- | ----- | ---- | ---------------------------------------- |
| networks | Array | 否    | 指定进行ApplePay的支付网络,由UexApplePayNetworkKey构成的数组,详见[术语表-[UexApplePayNetworkKey](#UexApplePayNetworkKey "UexApplePayNetworkKey")].不传时默认为系统可选的所有支付网络 |

**返回值:**

Number类型,检测结果,是一个UexAppleCanMakePaymentStatus,详见[术语表-UexAppleCanMakePaymentStatus](#UexAppleCanMakePaymentStatus)


**示例:**

```javascript
var params = {
	networks:["ChinaUnionPay"]
};
var data = JSON.stringify(params);
var result = uexApplePay.canMakePayment(data);
if (result != 0){
	alert ("不能进行ApplePay支付!")
}
```

### 🍭 startChinaUnionPay 调起银联ApplePay支付

`uexApplePay.startChinaUnionPay(params)`

**说明:**

* 调用银联封装的ApplePay方法.
* 开发者需[注册成为银联的商户并开通ApplePay支付功能](https://merchant.unionpay.com/join/product/detail?id=80),通过银联后台得到交易流水号,再调用此接口.
* **和StartPay方法相比,此方法集成更加简单,但可定制化程度低,并且只支持中国银联支付.**
* 调用此接口前,请先调用[uexApplePay.canMakePayment](#cbCanMakePayment 检测是否可以进行ApplePay支付的回调方法 "uexApplePay.canMakePayment")接口并限定支付网络为`"ChinaUnionPay"`来检测是否可以进行支付

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明           |
| ------ | ------ | ---- | ------------ |
| params | String | 是    | 接口所需数据,形式见下: |

```javascript
var params = {
    orderInfo:,
    mode:,
    merchantIdentifier:
};
```

各字段含义如下:

| 参数名称               | 参数类型   | 是否必选 | 说明                                       |
| ------------------ | ------ | ---- | ---------------------------------------- |
| orderInfo          | String | 是    | 银联提供的交易流水号.                              |
| mode               | String | 是    | 测试类型,取值为"00"､"01"."00"表示银联正式环境,若开发者已经入网银联支付,可用正式环境测试;"01"表示银联测试环境,测试环境仅用于测试插件功能是否正常 |
| merchantIdentifier | String | 是    | 在苹果开发者中心配置的merchant证书的ID                 |

**返回值:**

Number类型,检测结果,是一个UexApplePayStartPayResult,详见[术语表-UexApplePayStartPayResult](#UexApplePayStartPayResult)

**示例:**

```javascript
var params = {
	merchantIdentifier:"merchant.com.zywx.devTest",
	orderInfo:"201603011028451152878",
	mode:"01"
};
var data = JSON.stringify(params);
var result = uexApplePay.startChinaUnionPay(JSON.stringify(data));
if (result != 0 ){
	alert("调起支付失败");
}
```

注:从`http://101.231.114.216:1725/sim/getacptn`可以获取测试用的orderInfo.

### 🍭 startPay 调起Apple Pay支付

`uexApplePay.startPay(params)`

**说明:**

* 调用iOS原生的ApplePay方法.
* **和startChinaUnionPay方法相比,此方法集成较复杂,但可定制化程度高,支持所有ApplePay支持的支付渠道**
* 调用此接口前,请先调用[uexApplePay.canMakePayment](#canMakePayment 检测是否可以进行ApplePay支付 "uexApplePay.canMakePayment")接口并限定支付网络为你的后台支持的支付网络来检测是否可以进行支付.

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明           |
| ------ | ------ | ---- | ------------ |
| params | String | 是    | 接口所需数据,形式见下: |

```javascript
var params = {
    merchantIdentifier:,
    merchantCapability:,
    networks:,
    currencyCode:,
    countryCode:,
    payment{
    	payee:,
    	totalPrice:,
    	items:[
    		{
    			label:,
    			price:,
    		}
    	]
    },
    billingContactRequiredFlag:,
    shippingContactRequiredFlag:,
    shippingType:,
    shippingMethods:[
    		{
    			label:,
    			identifier:,
    			price:,
    			detail:
    		}
    	]
};
```

各字段含义如下:

| 参数名称                        | 参数类型   | 是否必选 | 说明                                       |
| --------------------------- | ------ | ---- | ---------------------------------------- |
| merchantIdentifier          | String | 是    | 在苹果开发者中心配置的merchant证书的ID                 |
| merchantCapability          | Number | 否    | 账单处理标准,是一个`UexApplePayMerchantCapability`,详见[术语表-UexApplePayMerchantCapability](#UexApplePayMerchantCapability),不传时默认为15 |
| networks                    | Array  | 否    | 进行ApplePay的支付网络,由`UexApplePayNetworkKey构成的数组`,详见[术语表-UexApplePayNetworkKey](#UexApplePayNetworkKey "UexApplePayNetworkKey").不传时默认为系统可选的所有支付网络 |
| currencyCode                | String | 否    | `标准货币代码`,表示此次支付的默认货币.不传时默认为`"CNY"`,既人民币  |
| countryCode                 | String | 否    | 2位的`ISO Country Code` ,表示处理此次支付的区域.不传时默认为`"CN"`,既中国 |
| payment                     | Object | 是    | 是一个`Payment Object`,表示这个订单中的账单信息,各字段说明详见下方表格 |
| billingContactRequiredFlag  | Number | 否    | 表示此订单的账单联系人的信息需求情况.是一个UexApplePayContactRequiredFlag,详见[术语表-UexApplePayContactRequiredFlag](#UexApplePayContactRequiredFlag).不传时默认为0 |
| shippingContactRequiredFlag | Number | 否    | 表示此订单的运输接受者的信息需求情况.是一个UexApplePayContactRequiredFlag,详见[术语表-UexApplePayContactRequiredFlag](#UexApplePayContactRequiredFlag).不传时默认为0 |
| shippingType                | Number | 否    | 表示此订单货物的物流类型.是一个UexApplePayShippingType,详见[术语表-UexApplePayShippingType](#UexApplePayShippingType) .不传时默认为0 |
| shippingMethods             | Array  | 否    | 表示此订单支持的物流方式 . 是由`ShippingMethod Object` 构成的数组.各字段说明详见下方表格.此字段可通过其他接口更新,开始时可以不传 |
| applicationData             | String | 否    | 校验字段.传任何字符串.传入此参数,即可在最后获取的支付token中解析出传入字段的SHA-256 Hash |

**`Payment Object`表示这个订单中的账单信息,其各字段含义如下**

| 参数名称       | 参数类型   | 是否必选 | 说明                                       |
| ---------- | ------ | ---- | ---------------------------------------- |
| payee      | String | 是    | 表示这个订单的收款人员/机构                           |
| items      | Array  | 否    | 表示此次订单的明细清单,是由`Item Object` 构成的数组. `Item Object`各字段说明详见下方表格.此参数可以不传,表示不提供明细.此参数不传时,totalPrice必传 |
| totalPrice | Number | 否    | 表示这个订单的总金额,此参数唯一确定了此订单的支付金额.见下方说明        |

说明:对于totalPrice

* 不传此参数时,插件会自动将传入的所有items中的价格相加作为totalPrice.
* **若items参数不传,则此参数必传,否则支付会报错.**
* 若传入此参数,则不会进行items价格计算,以传入的参数为准.

**`Item Object` 表示账单中的一个项目,各字段含义如下**

| 参数名称  | 参数类型   | 是否必选 | 说明                                      |
| ----- | ------ | ---- | --------------------------------------- |
| label | String | 是    | 项目说明,比如物品名称/运费/折扣名称/税费  等等              |
| price | Number | 否    | 项目价格,支持用负数表示折扣.不传时表示此项目价格还未确定,会用`...`表示 |

注:价格未确定的项目在计算totalPrice时,按0处理.

**`ShippingMethod Object`表示一种物流方式,各字段含义如下**

| 参数名称       | 参数类型   | 是否必选 | 说明                            |
| ---------- | ------ | ---- | ----------------------------- |
| label      | String | 是    | 物流名称                          |
| price      | Number | 否    | 物流价格.不传时表示此价格还未确定,会用`...`表示   |
| identifier | String | 是    | 唯一标识符,传非空字符串,同一个订单内不可重复       |
| detail     | String | 否    | 此物流方式的一些额外说明,比如"3天内送达"等等.可以不传 |

**返回值:**

Number类型,打开支付页面的结果,是一个UexApplePayStartPayResult,详见[术语表-UexApplePayStartPayResult](#UexApplePayStartPayResult)


**示例:**

```javascript
var params = {
	merchantIdentifier:"merchant.com.zywx.devTest",
	merchantCapability:4,
 	networks:["AMEX","ChinaUnionPay","VISA"],
 	currencyCode:"CNY",
 	countryCode:"CN",
 	billingContactRequiredFlag:4,
 	payment:{
 		payee:"AppCan",
 		items:[
 			  {
                label:"item1",
                price:5
            },
            {
                label:"item2",
                price:8.5
            },
            {
                label:"discount",
                price:-1.2
            },
            ]
	 	},
 	shippingContactRequiredFlag:2,
 	shippingType:3,
 	shippingMethods:[
 		 {
            label:"shippingMethod1",
            price:1,
            detail:"detail1",
            identifier:"method1",

        },
        {
            label:"shippingMethod2",
            price:2,
            detail:"detail2",
            identifier:"method2",

        }
 	],
 	applicationData:"applicationData",
 };
var data = JSON.stringify(params);
var result = uexApplePay.startPay(JSON.stringify(data));
if (result != 0 ){
	alert("调起支付失败");
}
```

### 🍭 commitPaymentMethodChange 确认支付方式变化

`uexApplePay.commitPaymentMethodChange(params)`

**说明:**

* 在onPaymentMethodChange 监听触发之后***必须***调用此方法,否则支付无法正常进行下去
* 可以在此方法中更新此次订单的账单,实现诸如`信用卡具有额外折扣`等功能

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明           |
| ------ | ------ | ---- | ------------ |
| params | String | 是    | 接口所需数据,形式见下: |

```javascript
var params = {
    payment:
};
```

各字段含义如下:

| 参数名称    | 参数类型   | 是否必选 | 说明                                       |
| ------- | ------ | ---- | ---------------------------------------- |
| payment | Object | 否    | 是一个`Payment Object`,同StartPay中的payment参数.不传时表示账单无变化 |

**返回值:**

Boolean类型,调用接口结果.若为false,一般为参数错误或者不完整引起,必须重新调用此接口

**示例:**

```javascript
var params = {
	payment:{
 		payee:"AppCan",
 		items:[
 			  {
                label:"item1",
                price:5
            },
            {
                label:"item2",
                price:8.5
            },
            {
                label:"discount",
                price:-1.2
            },
            {
                label:"信用卡打折",
                price:-3
            },
       ]
	}
}
var result = uexApplePay.commitPaymentMethodChange(JSON.stringify(params));
if(!result){
	alert("传入参数错误");
	//此时应该重新调用uexApplePay.commitPaymentMethodChange方法
}
```
### 🍭 commitShippingMethodChange 确认物流方式变化

`uexApplePay.commitShippingMethodChange(params)`

**说明:**

* 在onShippingMethodChange 监听触发之后***必须***调用此方法,否则支付无法正常进行下去
* 可以在此方法中更新此次订单的账单,实现诸如`对不同的物流方式有不同的总价格`等功能

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明           |
| ------ | ------ | ---- | ------------ |
| params | String | 是    | 接口所需数据,形式见下: |

```
var params = {
    payment:
};
```

各字段含义如下:

| 参数名称    | 参数类型   | 是否必选 | 说明                                       |
| ------- | ------ | ---- | ---------------------------------------- |
| payment | Object | 否    | 是一个`Payment Object`,同StartPay中的payment参数.不传时表示账单无变化 |

**返回值:**

Boolean类型,调用接口结果.若为false,一般为参数错误或者不完整引起,必须重新调用此接口


**示例:**

```javascript
var params = {
	payment:{
 		payee:"AppCan",
 		items:[
 			  {
                label:"item1",
                price:5
            },
            {
                label:"item2",
                price:8.5
            },
            {
                label:"discount",
                price:-1.2
            },
            {
                label:"运费",
                price:5
            },
       ]
	}
}
var result = uexApplePay.commitShippingMethodChange(JSON.stringify(params));
if(!result){
	alert("传入参数错误");
	//此时应该重新调用uexApplePay.commitShippingMethodChange方法
}
```
### 🍭 commitShippingContactChange 确认物流信息变化

`uexApplePay.commitShippingContactChange(params)`

**说明:**

* 在onShippingContactChange 监听触发之后***必须***调用此方法,否则支付无法正常进行下去
* 可以在此方法中更新此次订单的账单和物流方式,实现诸如`对不同的地点提供不同的物流方式`等功能

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明           |
| ------ | ------ | ---- | ------------ |
| params | String | 是    | 接口所需数据,形式见下: |

```javascript
var params = {
    payment:,
    shippingMethods,
    isPostalAddressInvalid:
};
```

各字段含义如下:

| 参数名称                   | 参数类型    | 是否必选 | 说明                                       |
| ---------------------- | ------- | ---- | ---------------------------------------- |
| payment                | Object  | 否    | 是一个`Payment Object`,同StartPay中的payment参数.不传时表示账单无变化 |
| shippingMethods        | Array   | 否    | 是一个由`ShippingMethod Object`,同StartPay中的shippingMethods参数.不传时表示订单支持的物流方式无变化 |
| isPostalAddressInvalid | Boolean | 否    | 地址是否无效.传true时会让支付界面提示用户修改当前的地址.默认为false. |

**返回值:**

Boolean,调用接口结果.若为false,一般为参数错误或者不完整引起,必须重新调用此接口


**示例:**

```javascript
var params = {
	isPostalAddressInvalid:false,
	shippingMethods:[
 		 {
            label:"shippingMethod1",
            price:10,
            detail:"detail1",
            identifier:"method1",

        },
        {
            label:"shippingMethod2",
            price:5,
            detail:"detail2",
            identifier:"method2",

        }
 	]
}
var result = uexApplePay.commitShippingContactChange(JSON.stringify(params));
if(!result){
	alert("传入参数错误");
	//此时应该重新调用uexApplePay.commitShippingContactChange方法
}
```

### 🍭 commitAuthorizedResult 确认订单支付结果

`uexApplePay.commitAuthorizedResult(params)`

**说明:**

* 在onPaymentAuthorized 监听触发之后***必须***调用此方法,告知系统订单支付结果,否则支付无法完成.

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明           |
| ------ | ------ | ---- | ------------ |
| params | String | 是    | 接口所需数据,形式见下: |

```
var params = {
	result:
};
```

各字段含义如下:

| 参数名称   | 参数类型    | 是否必选 | 说明                         |
| ------ | ------- | ---- | -------------------------- |
| result | Boolean | 是    | 若此次订单支付成功,则传true,否则传false. |

**返回值:**

Boolean,调用接口结果.若为false,一般为参数错误或者不完整引起,必须重新调用此接口


**示例:**

```
var params = {
	result:true
}
var result = uexApplePay.onPaymentAuthorized(JSON.stringify(params));
if(!result){
	alert("传入参数错误");
	//此时应该重新调用uexApplePay.onPaymentAuthorized方法
}
```

### 🍭 addButton 添加ApplePay按钮

`uexApplePay.addButton(params)`

**说明:**

* 提供一个符合Apple的ApplePay设计规范的支付按钮
* 注意,Apple的ApplePay设计规范指出此类按钮必须用于ApplePay支付,用于其他用途会导致你的App被Apple Store拒绝.

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明           |
| ------ | ------ | ---- | ------------ |
| params | String | 是    | 接口所需数据,形式见下: |

```javascript
var params = {
	id:,
	x:,
	y:,
	width:,
	height:,
	type:,
	style:,
	scrollWithWeb:,
};
```

各字段含义如下:

| 参数名称          | 参数类型    | 是否必选 | 说明                                   |
| ------------- | ------- | ---- | ------------------------------------ |
| id            | String  | 是    | 按钮的唯一标识符                             |
| x             | Number  | 是    | 按钮距离屏幕左侧的距离,单位px                     |
| y             | Number  | 是    | 按钮距离屏幕上方的距离,单位px                     |
| width         | Number  | 是    | 按钮宽度,单位px                            |
| height        | Number  | 是    | 按钮宽度,单位px                            |
| type          | Number  | 否    | 按钮类型,插件提供了3中不同的按钮类型,请传0､1或者2,不传时默认为0 |
| style         | Number  | 否    | 按钮风格,插件提供了3中不同的按钮风格,请传0､1或者2,不传时默认为0 |
| scrollWithWeb | Boolean | 否    | 设置按钮是否跟随网页滑动,不传时默认为false             |

**返回值:**

Boolean类型,是否添加按钮成功.若为false,一般为参数错误或者不完整引起

**示例:**

```
var data = {
	x : 200,
	y : 170,
 	width : 180,
 	height : 60,
 	id : "button",
 	scrollWithWeb : false,
 	type:0,
 	style:1,
}
var suc = uexApplePay.addButton(JSON.stringify(data));
alert(suc)
```

### 🍭 removeButton 移除ApplePay按钮

`uexApplePay.removeButton(params)`

**说明:**

* 移除由addButton接口添加的ApplePay按钮

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明           |
| ------ | ------ | ---- | ------------ |
| params | String | 是    | 接口所需数据,形式见下: |

```
var params = {
	id:,
};
```

各字段含义如下:

| 参数名称 | 参数类型   | 是否必选 | 说明       |
| ---- | ------ | ---- | -------- |
| id   | String | 是    | 按钮的唯一标识符 |

**返回值:**

Boolean类型,是否删除按钮成功.若为false,一般为参数错误或者不完整引起

**示例:**

```
var data = {
 	id : "button",
}
var suc = uexApplePay.removeButton(JSON.stringify(data));
alert(suc)
```

## 2.2､监听方法

### 🍭 onChinaUnionPayFinish 银联ApplePay支付结束的监听方法

`uexApplePay.onChinaUnionPayFinish(params)`

**说明:**

* 在调用uexApplePay.startChinaUnionPay接口后,通过此接口来监听支付结果

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明         |
| ------ | ------ | ---- | ---------- |
| params | String | 是    | 返回数据,形式见下: |

```
var params = {
	result:,
	errorInfo:,
	otherInfo:,
};
```

各字段含义如下:

| 参数名称      | 参数类型   | 是否必选 | 说明                                       |
| --------- | ------ | ---- | ---------------------------------------- |
| result    | Number | 是    | 支付结果 0-支付成功 1-支付失败 2-用户取消了支付 3-支付结果不确定,此时应需查询商户后台以确认支付状态 |
| errorInfo | String | 否    | 支付失败时会通过此字段返回失败的原因                       |
| otherInfo | String | 否    | 支付的额外信息会通过此字段返回, 此字段由银联SDK直接提供,请参考银联的相关文档 |


**示例:**

```
uexApplePay.onChinaUnionPayFinish = function(info){
	alert(info);
}
```

### 🍭 onPaymentMethodChange 支付方式变化的监听方法

`uexApplePay.onPaymentMethodChange(params)`

**说明:**

* 在调用uexApplePay.startPay接口后,当用户选择或者更改支付方式时,会触发此监听
* 触发此监听之后,***必须调用commitPaymentMethodChange来确认支付方式变化***

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明         |
| ------ | ------ | ---- | ---------- |
| params | String | 是    | 返回数据,形式见下: |

params是一个`PaymentMethod Object`转换而成的JSON字符串.

`PaymentMethod Object`结构如下

```
var paymentMethod = {
	type:,
	displayName:,
	network:,
};
```

各字段含义如下:

| 参数名称        | 参数类型   | 是否必选 | 说明                                       |
| ----------- | ------ | ---- | ---------------------------------------- |
| type        | Number | 是    | 支付方式,是一个UexApplePayPaymentMethodType,详见[术语表-UexApplePayPaymentMethodType](#UexApplePayPaymentMethodType) |
| displayName | String | 否    | 支付的展示名,仅在申请支付许可时才会有此字段                   |
| network     | String | 否    | 支付网络,仅在申请支付许可时才会有此字段                     |


**示例:**

```
uexApplePay.onPaymentMethodChange = function(info){
	alert(info);
}
```

### 🍭 onShippingContactChange 物流联系人变化的监听方法

`uexApplePay.onShippingContactChange(params)`

**说明:**

* 在调用uexApplePay.startPay接口后,当用户选择或者更改物流联系人时,会触发此监听
* 触发此监听之后,***必须调用commitShippingContactChange来确认物流联系人变化***

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明         |
| ------ | ------ | ---- | ---------- |
| params | String | 是    | 返回数据,形式见下: |

params是一个`Contact Object`序列化得到的JSON字符串,`Contact Object`结构如下

```javascript
var contact = {
	addressInfo:{//联系人地址
		country:,//国家
		ISOCounrtyCode:,//ISO国家编码
		state:,//省/州名
		city:,//城市
		street:,//街道
		postalCode:,//邮编
	}
	phoneNumber:,//电话号码
	emailAddress:,//电子邮件地址
	nameInfo:{//电子邮件信息
		nameSuffix:,//姓名后缀
		namePrefix:,//姓名前缀
		middleName:,//中间名
		givenName:,//名
		familyName:,//姓
		nickName:,//昵称
	}
};
```
注:
* 以上4个主参数分别对应了UexApplePayContactRequiredFlag的4个枚举值
* 以上参数均为可选参数,具体参数是否存在,取决于用户是否填入相应的信息.



**示例:**

```
uexApplePay.onShippingContactChange = function(info){
	alert(info);
}
```

### 🍭 onShippingMethodChange 物流方式变化的监听方法

`uexApplePay.onShippingMethodChange(params)`

**说明:**

* 在调用uexApplePay.startPay接口后,当用户选择或者更改物流方式时,会触发此监听
* 触发此监听之后,***必须调用commitShippingMethodChange来确认物流方式变化***

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明         |
| ------ | ------ | ---- | ---------- |
| params | String | 是    | 返回数据,形式见下: |

params是一个`ShippingMethod Object`序列化得到的JSON字符串,字段介绍详见startPay接口中的`ShippingMethod Object`参数介绍

```
var param = {
 	label:,
 	identifier:,
 	price:,
 	detail:
}
```


**示例:**

```
uexApplePay.onShippingMethodChange = function(info){
	alert(info);
}
```

### 🍭 onPaymentAuthorized 用户进行支付的监听方法

`uexApplePay.onPaymentAuthorized(params)`

**说明:**

* 在调用uexApplePay.startPay接口后,当用户确认进行支付时,会触发此监听
* 触发此监听之后,***必须调用commitAuthorizedResult来确认支付结果***

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明         |
| ------ | ------ | ---- | ---------- |
| params | String | 是    | 返回数据,形式见下: |

```javascript
var param = {
 	shippingMethod:,//可选,一个ShippingMethod Object,描述了用户最终选择的物流方式
 	billingContact:,//可选,一个Contact Object(字段可参考onShippingContactChange方法中的介绍),描述了账单接收人的联系人信息
 	shippingContact:,//可选,一个Contact Object(字段可参考onShippingContactChange方法中的介绍),描述了货物接收人的联系人信息
 	paymentInfo:{//必选,支付信息
 		paymentMethod:,//必选,一个PaymentMethod Object(字段可参考onPaymentMethodChange方法中的介绍),描述了支付方式信息
 		transactionIdentifier:,//必选,苹果ApplePay模块生成的订单标识符
 		token:{//支付Token,
 			 	data:,//加密过的支付信息
 			 	signature:,//签名信息,用于校验此token是否有效
 			 	version:,//解密key的二次加密方式,为"EC_v1"或者"RSA_v1"之一
 				header:{//加密Header,
 					applicationData:,//调用startPay接口时传入的applicationData的SHA256 Hash,用Base64编码得到的字符串
 					transactionId:,//支付卡ID,根据支付的银行卡由设备的ApplePay模块唯一生成
 					wrappedKey:,//RSA加密过的解密Key,用于解密data,仅version为"RSA_v1"时存在
 					ephemeralPublicKey:,//Ephemeral公钥 仅version为"EC_v1"时存在
 					publicKeyHash:,//二次加密key所用到的公钥的SHA256 Hash,用Base64编码得到的字符串
  				},
 			}
 		}
 	}
}
```

* 支付Token的具体解密方法请参考[苹果官方的解密文档](https://developer.apple.com/library/prerelease/ios/documentation/PassKit/Reference/PaymentTokenJSON/PaymentTokenJSON.html#//apple_ref/doc/uid/TP40014929)
* **除非测试,否则绝对不要在前端进行解密工作!**
* 正常的操作流程应该是
  * 前端发送paymentInfo到后台 
  * 后台校验加密内容是否有效 
  * 进行解密工作.
  * 根据解密后的信息调用相应的支付网关进行支付操作 
  * 后台得到支付结果 返回给前端 
  * 前端调用commitAuthorizedResult告诉插件支付结果,并展示给用户


**示例:**

```
uexApplePay.onPaymentAuthorized = function(info){
	alert(info);
}
```

### 🍭 onCommitError ApplePay支付提交变化发生错误的监听方法

`uexApplePay.onCommitError(params)`

**说明:**

* 在调用uexApplePay.commitShippingMethodChange､uexApplePay.commitShippingContactChange､uexApplePay.commitPaymentMethodChange､uexApplePay.commitAuthorizedResult这4个接口后,若提交失败,会触发此方法
* 提交失败的原因多为必要参数缺失/参数格式错误/参数内容不合法引起

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明         |
| ------ | ------ | ---- | ---------- |
| params | String | 是    | 返回数据,形式见下: |

```
var param = {
 	type:,//触发这个监听的方法类型 0 - uexApplePay.commitAuthorizedResult,1 - uexApplePay.commitShippingMethodChange,2 - uexApplePay.commitPaymentMethodChange ,3 - uexApplePay.commitShippingContactChange,
 }
```


**示例:**

```
uexApplePay.onCommitError = function(info){
	alert(info);
}

```

### 🍭 onPayFinish ApplePay支付结束的监听方法

`uexApplePay.onPayFinish(params)`

**说明:**

* 在调用uexApplePay.startPay接口后,完成支付或者用户取消支付时,会调用此方法

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明         |
| ------ | ------ | ---- | ---------- |
| params | String | 是    | 返回数据,形式见下: |

```
var param = {
 	result:,//Number 必选 0-成功 1-失败 2-支付被取消
 }
```

**示例:**

```javascript
uexApplePay.onPayFinish = function(info){
	alert("onPayFinish:" + info );
}
```

### 🍭 onButtonClick ApplePay支付按钮被点击的监听方法

`uexApplePay.onButtonClick(params)`

**说明:**

* 用户点击由uexApplePay.addButton设置的ApplePay按钮时,会触发此监听.

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明         |
| ------ | ------ | ---- | ---------- |
| params | String | 是    | 返回数据,形式见下: |

```javascript
var params = {
	id://按钮的唯一标识符
};
```

**示例:**

```javascript
uexApplePay.onButtonClick = function(info){
	alert(info);
}
```

# 3､ 术语表

## UexApplePayNetworkKey

UexApplePayNetworkKey 是一系列**字符串**,代表了各个银行卡发行商的支付网络

| 值             | 含义                         |
| ------------- | -------------------------- |
| ChinaUnionPay | 中国银联发行的借记卡和信用卡             |
| AMEX          | American Express 美国运通      |
| VISA          | VISA信用卡                    |
| MasterCard    | MasterCard 万事达卡            |
| Discover      | Discover Card 发现卡          |
| PrivateLabel  | 汇丰银行发行的 Private Label Card |
| Interac       | Interac 借记卡                |

## UexAppleCanMakePaymentStatus

* UexAppleCanMakePaymentStatus是一个Number类型的枚举值,表示检测是否支持ApplePay的结果,**非0时均表示不能进行ApplePay支付**

| 值    | 含义                                     |
| ---- | -------------------------------------- |
| 0    | 可以进行ApplePay支付                         |
| 1    | 系统不支持,uexApplePay插件需要**iOS 9.2+**的系统  |
| 2    | 设备不支持,见注1                              |
| 3    | 账号不支持,见注2                              |

注1 : 目前支持ApplePay的设备型号有
​	
* iPhone : iPhone 6,iPhone 6 Plus,iPhone 6s,iPhone 6s Plus
* iPad : iPad Pro,iPad Air 2,iPad mini 3,iPad mini 4

注2 : 账号不支持**包含但不限于**以下几种情况

* 设备登录的苹果账号未在Wallet中绑定**指定支付网络的银行卡**
* 设备登录的苹果账号处于锁定状态,或者处于家长监控状态下

## UexApplePayStartPayResult

* UexApplePayStartPayResult是一个Number类型的枚举值,表示调用开始支付接口的结果**,非0时均表示打开支付界面失败**

| 值    | 含义        |
| ---- | --------- |
| 0    | 支付成功      |
| 1    | 传入的参数有误  |
| 2    | 设备或者系统不支持 |
| 3    | 其他未知错误    |

## UexApplePayMerchantCapability

* UexApplePayMerchantCapability是一个Number类型的枚举值,表示支持的支付处理标准.
* 如果需要支持多种处理标准,请将需要支持的标准的值相加后作为最终结果传入. 比如,要同时支持3DS和EMV,请传3.

| 值    | 含义           |
| ---- | ------------ |
| 1    | 3D Secure 协议 |
| 2    | EMV 协议      |
| 4    | 信用卡支持        |
| 8    | 借记卡支持        |

其中3DS和EMV均同时支持信用卡和借记卡.因此假设你需要限此订单只支持信用卡支付,传4可达到此效果.

## UexApplePayContactRequiredFlag

* UexApplePayContactRequiredFlag是一个Number类型的枚举值,表示需要的联系人信息.
* 如果同时需要多种信息,请将需要信息的值相加后作为最终结果传入.比如,同时需要联系人的名称和电话号码,请传10.

| 值    | 含义          |
| ---- | ----------- |
| 1    | 需要联系人详细地址   |
| 2    | 需要联系人电话号码  |
| 4    | 需要联系人Email  |
| 8    | 需要联系人名称     |

## UexApplePayShippingType

* UexApplePayShippingType是一个Number类型的枚举值,表示此订单货物的物流类型.

| 值    | 含义                                |
| ---- | --------------------------------- |
| 0    | 表示由商家委托第三方进行运输                    |
| 1    | 表示由商家自己进行运输                      |
| 2    | 表示此商品需要去商家店铺提取                    |
| 3    | 表示商家会将商品运送至第三方自提点,需要用户去第三方自提点提取商品 |

## UexApplePayPaymentMethodType

* UexApplePayPaymentMethodType是一个Number类型的枚举值,表示此支付方式的类型.

| 值    | 含义                                       |
| ---- | ---------------------------------------- |
| 0    | 未知类型                                     |
| 1    | Debit,借记卡                               |
| 2    | Credit,信用卡                               |
| 3    | Prepaid,部分商家的预付费卡                        |
| 4    | Store,部分商家联合银行发行的联名信用卡,比如Amazon Store Card |

# 4､ FAQ常见问题

#### startPay 和 startChinaUnionPay 这2个接口都能进行ApplePay支付,我该用哪个?

* 如果您需要快速实现ApplePay功能,并且只需要支持中国银联渠道,那么使的startChinaUnionPay接口
* 如果您的应用需要进行非中国银联渠道的ApplePay 支付,那么只能选择startPay接口
* 您应该视您的实际使用情况选择用哪个接口.它们的主要区别如下表所示

|           | startChinaUnionPay            | startPay                        |
| --------- | ----------------------------- | ------------------------------- |
| 前端代码实现难度  | 简单                            | 较复杂                             |
| 后端服务器压力   | 只需和银联服务器进行交互,简单,压力小           | 需要进行解密工作,解密后还要组织报文进行支付,较复杂,压力较大 |
| 前端UI可定制程度 | 极低,所有UI均有银联SDK定死,无法更改         | 高,基本所有的UI均可修改,提供更好的用户体验         |
| 适用范围      | 只支持国内,且必须是银联发布的支持ApplePay的银行卡 | 国外可以使用,支持所有支持ApplePay的银行卡       |

#### 为什么我无法打开支付的界面?

* 请确认您在调用startPay或者startChinaUnionPay接口时传入的merchantIdentifier无误,并且此merchantIdentifier在comfig.xml中被正确配置

#### 我能否不用插件提供的ApplePay按钮?

* 若您的App不需要考虑上架问题(比如企业内部的OA等App),那么完全可以用自己的UI
* 若您的App需要发布至AppStore,您可以用自己设计的UI,但必须要符合[《Apple Pay 识别标志指南》](https://developer.apple.com/apple-pay/Apple-Pay-Identity-Guidelines.pdf),否则您的应用会无法通过审核

#### 我的应用在启用ApplePay之后被拒了!为什么?

ApplePay有如下原因会导致您的应用审核被拒

* Apple Pay 页面的UI不符合[《Apple Pay 识别标志指南》](https://developer.apple.com/apple-pay/Apple-Pay-Identity-Guidelines.pdf)
* Apple Pay 按钮不是用于进行ApplePay支付
* **在不能进行ApplePay支付的设备上提示或者可以选择进行Apple Pay支付**(正确的做法是先判断是否可以进行ApplePay支付,再展示ApplePay支付的UI)


# 5､ 接入指引

开发者集成及使用此插件,需要到Apple开发者中心申请Merchant证书,并且在Config.xml中配置相关的MerchantIdentifier才能使用.以下是具体步骤.

### 一､注册商用ID标识

* 在[Apple开发者中心](https://developer.apple.com)登录后,选择"Certificates,Identifiers&Profiles"
* 在Identifiers下,选择Merchant IDs
* 在右上角点击"+"按钮
* 在Description栏､ID栏输入相应信息,点击"Continue".**此处配置的ID,即为merchantIdentifier.**
* 浏览下配置参数,点击"Register"
* 点击"Done"

### 二､为你的商用ID标识配置一个证书
* 在[Apple开发者中心](https://developer.apple.com)登录后,选择"Certificates,Identifiers&Profiles"
* 在Identifiers下,选择Merchant IDs
* 选择列表中的商用ID标识,点击Edit
* 点击"Create Certificate",按照指示获取或生成签名证书请求(CSR),点击"Continue"
* 点击"Choose File",选择你的CSR,点击"Generate"
* 关于CSR文件:
  * 有的的支付渠道(比如中国银联)可能会要求上传指定的.CSR文件才能使用其支付功能.
  * 但上传不适配的.CSR文件只影响最后支付的结果
  * 由于从支付渠道申请.CSR文件可以需要一定的时间,因此可以先上传自己生成的.CSR文件进行插件与前端页面调试,待正式的.CSR文件申请成功之后再进行替换,并测试前后端交互.

**如果你需要为不同的支付项目配置不同的商用ID标识,步骤一､和二､会进行多次.**

### 三､在你的APP中使用商用ID标识
* 在[Apple开发者中心](https://developer.apple.com)登录后,选择"Certificates,Identifiers&Profiles"
* 在Identifiers下,选择App IDs
* 选择你的App,点击Edit
* 在新打开的页面中启用 Apple Pay
* 点击 Apple Pay 选项栏中的Edit 并勾选你这个App需要使用的所有商用ID标识
* 完成编辑

**注意:每当你编辑了你的App ID,你都需要重新下载mobileprovision文件并用新的mobileprovision文件去打包,否则你的更改将不会生效**

### 四､在config.xml中配置商用ID标识

* 在config.xml中添加如下配置

```
<config desc="uexApplePay" type="ENTITLEMENTS">
	<entitlement type="merchant" value="merchantIdentifier1"/>
	<entitlement type="merchant" value="merchantIdentifier2"/>
</config>
```

* **其中`<entitlement>`节点数量取决于你的App中会用到的商用ID标识数量.你应该为每一个商用ID标识设置一个`<entitlement>`节点,并修改其中的`value`值为此商用ID标识的merchantIdentifier**.(type值不要更改!)

# 6､更新历史

### iOS

API版本: `uexApplePay-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | uexApplePay for iOS |

### Android

**暂不支持!**
