[TOC]
# 1､简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
内部支付(IAP)插件
## 1.1､说明
封装内部支付(IAP)相关操作
## 1.2､UI展示

## 1.3､公告 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fnew.gif)]() 

iOS开发的收入有三种来源:出售应用､内购和广告.国内用户通常很少直接购买应用,因此对于开发者而言(特别是个人开发者),内购和广告收入就成了主要的收入来源.内购营销模式,通常软件本身是不收费的,但是要获得某些特权就必须购买一些道具,需要通过内购的方式来实现,而内购的过程是由苹果官方统一来管理的.
​    
## 1.4､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=567) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.5､平台版本支持
本插件的所有API默认只支持***iOS8.0+**操作系统,**不支持Android**.
有特殊版本要求的API会在文档中额外说明.

## 1.6､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.
# 2､API概览

##2.1､方法

### 🍭 getProductList 获取有效的产品列表

`uexInAppPurchase.getProductList(params,callback)`     


​                

**说明:**

该方法从苹果服务器返回有效产品信息,包括产品描述信息､参考名称､价格､产品ID,

​               

**参数:**

| 参数名称     | 参数类型     | 是否必选 | 说明           |
| -------- | -------- | ---- | ------------ |
| param    | Object   | 是    | 接口所需数据,形式见下: |
| callback | Function | 是    | 回调方法         |

 ```js
var params = {
    productIDs:[] 
}
 ```
| 参数名称       | 参数类型  | 是否必选 | 说明                |
| ---------- | ----- | ---- | ----------------- |
| productIDs | Array | 是    | 在苹果官网内购项目中填写的产品ID |

**回调参数:**

```javascript
var callback = function (error,data){}
```

| 参数名称  | 类型     | 说明                    |
| ----- | ------ | --------------------- |
| error | Number | 0表示成功,非0表示失败          |
| data  | Array  | 从苹果服务器获取的有效产品信息,格式如下: |

```js
var data = [
   {
     "productIdentifier":,
     "localizedTitle":,
     "price":,
     "localizedDescription"
   }
   ...
]
```


 各字段含义如下:

| 参数                   | 是否必须 | 说明     |
| -------------------- | ---- | ------ |
| productIdentifier    | 是    | 产品ID   |
| localizedTitle       | 是    | 参考名称   |
| price                | 是    | 价格等级   |
| localizedDescription | 是    | 产品描述信息 |

**示例:**

```js
var params = {
	productIDs: ["EnergyBottle","GoldenGlobe","ProtectiveGloves"]
};            
uexInAppPurchase.getProductList(params,function(error,data){
    if(!error){
       alert(JSON.stringify(data));
    }
});
```
### 🍭 canMakePay 测试设备是否支持支付功能

`uexInAppPurchase.canMakePay()`

**说明:**

该方法测试设备是否支持支付功能,支持同步返回.

​               

**参数**

无

**返回值**

| 参数名称   | 参数类型   | 是否必选 | 说明                |
| ------ | ------ | ---- | ----------------- |
| result | Number | 是    | 0表示设备允许内购,1设备禁止内购 |


**示例:**

```js
 var result = uexInAppPurchase.canMakePay();
 alert(result);
```
### 🍭 purchase 购买单一产品

`uexInAppPurchase.purchase(params,callback)`
​     


**说明:**

调用此方法前,必须先调用[getProductList](#🍭_getProductList_获取有效的产品列表)获得要购买的产品

该产品可以是消耗品或非消耗品以及其它类型,开发人员应对非消耗品进行逻辑处理,非消耗品无需再次购买.

​                

**参数:**

| 参数名称     | 参数类型     | 是否必选 | 说明           |
| -------- | -------- | ---- | ------------ |
| param    | Object   | 是    | 接口所需数据,形式见下: |
| callback | Function | 是    | 回调方法         |

 ```js
var params = {
  	productID: ,
	quantity: ,
	verifyStrategy: 
}
 ```
| 参数名称           | 参数类型   | 是否必选 | 说明                                       |
| -------------- | ------ | ---- | ---------------------------------------- |
| productID      | String | 是    | 某一产品ID,通过cbGetProductList获取              |
| quantity       | Number | 否    | 购买的数量,默认为1                               |
| verifyStrategy | Number | 否    | 0 - 购买完成后进行验证(沙盒环境); 1- 购买完成后进行验证(生产环境) ; 2 - 不进行验证,直接返回订单验证数据;默认为0 |

* verifyStrategy 

  由于考虑到用户在支付订单后可能存在的退款行为,建议用户采用验证策略2,并将订单验证数据上传至App后台,由后台进行验证操作并返回给前端验证结果.

  App后台可以保留此份验证数据,并在需要时进行再次验证,获取订单的最新情况.

  验证方法可以参考[Apple官方文档](https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Introduction.html)	



```js
var callback = function(error,data){}
```

| 参数名称  | 参数类型          | 是否必选 | 说明                                       |
| ----- | ------------- | ---- | ---------------------------------------- |
| error | Number        | 是    | 0 表示购买成功 其他非0值均表示购买失败 详见下方说明             |
| data  | Object/String | 是    | error为0时为Object类型,为订单数据 详见下方说明; error非0时为String类型,表示错误信息 |

* error
| 错误码  | 信息                                       |
| ---- | ---------------------------------------- |
| 0    | verifyStrategy为0或者1时 表示购买成功且验证请求成功 verifystrategy为2时,表示购买成功 |
| 1    | productID对应的产品未找到                        |
| 2    | 购买过程发生错误                                 |
| 3    | 购买成功,但验证过程发生错误,仅verifyStrategy为0或者1会发生此错误 |

* 购买成功时的订单数据
  * verifyStrategy为0或者1时,data为Apple服务器的返回数据,具体字段说明详见[Apple官方文档](https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ReceiptFields.html#//apple_ref/doc/uid/TP40010573-CH106-SW1)
  * verifyStrategy为2时,data结构如下

```js
var data = {
  	receiptData:,//String 订单验证数据,base64-encoded字符串
  	transactionDate:,//String 交易时间
  	transactionIdentifier:,//String AppStore分配的交易唯一标识符
  	productIdentifier:,//String 订单内的产品唯一标识符
  	quantity:,//Number 订单内的产品数量
}
```



**示例:**

```js
var params = {
        productID: "EnergyBottle",
        quantity:"2",
        verifyStrategy: 2
  };
uexInAppPurchase.purchase(params,function(error,data){
  	if(error){
    	alert("purchase error! code: " + error + "\nmessage: " + data);
  	}else{
    	alert("purchase success! data: " + JSON.stringify(data));
  	}
});
```

### 🍭restorePurchase 恢复购买方法

`uexInAppPurchase.restorePurchase()`	

**说明:**

恢复所有非消耗品,对于非消耗品,用户在完成购买后如果使用其他机器登录或者卸载重新安装应用后通常希望这些非消耗品能够恢复.
​		

**参数:**

无


**示例:**

```
uexInAppPurchase.restorePurchase();               
```

## 2.1､监听方法

### 🍭 onRequestState 对发送产品请求进行监听

`uexInAppPurchase.onRequestState(result)`

**说明:**

 当向苹果服务器发送请求获取有效产品信息时,对getProductList方法中发送请求的状态进行监听

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明    |
| ------ | ------ | ---- | ----- |
| result | String | 是    | 形式见下: |

```js
var result = {
    status:,
    errorCode:,
    errorDescription
}
```

| 参数名称             | 参数类型   | 是否必选 | 说明                        |
| ---------------- | ------ | ---- | ------------------------- |
| status           | Number | 是    | 发送产品请求的状态,0表示请求完成,1表示请求失败 |
| errorCode        | Number | 否    | status为1才有,错误状态码          |
| errorDescription | String | 否    | status为1才有,错误状态的描述信息      |


**示例:**

```js
window.uexOnload = function(){
    uexInAppPurchase.onRequestState = function(result){
      	alert(result);
	};
}
```
### 🍭 onPurchaseState 对产品购买状态的监听方法ca

`uexInAppPurchase.onPurchaseState(result)`

**说明:**

 当进行购买动作时,要对购买的产品的有效性进行判断,即对purchase方法中产品信息的有效性进行监听

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明    |
| ------ | ------ | ---- | ----- |
| result | String | 是    | 形式见下: |

```js
var result ={
    status:,
    msg:
}
```

| 参数名称   | 参数类型   | 是否必选 | 说明                                       |
| ------ | ------ | ---- | ---------------------------------------- |
| status | Number | 是    | 购买产品的有效性,0表示产品有效,1表示产品无效                 |
| msg    | String | 是    | 产品有效返回"purchase start",产品无效返回"product is nil" |


**示例:**

```js
window.uexOnload = function(){
    uexInAppPurchase.onPurchaseState = function(result){
      	alert(result);
	};
}
```


### 🍭 onTransactionState 对产品交易状态和信息的监听方法

`uexInAppPurchase.onTransactionState(result)`

**说明:**

 当购买的产品为有效产品时,会将有效产品加入支付队列就形成一次购买请求,并且用户允许内购时,将会进行交易.该方法是对用户交易状态的监听.


**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明    |
| ------ | ------ | ---- | ----- |
| result | String | 是    | 形式见下: |

```js
var result = {
    //status为0
    receipt: ,//交易成功的详细信息
    //status为1
    transactionDate: ,//String,交易日期
    transactionIdentifier ,//String,交易标识符
    originalTransaction ,//json,原始交易信息
    productIdentifier ,//String,购买的产品ID
    quantity ,//Number,购买产品数量
    //status为2或3
    errorCode , //Number,错误标识码
    errorDescription ,//String,错误的描述信息
    productIdentifier,//String, 购买的产品ID
}
```
| 参数名称   | 参数类型   | 是否必选 | 说明             |
| ------ | ------ | ---- | -------------- |
| status | Number | 是    | 交易状态标识符,详细说明见下 |

 status字段含义如下:

| value | 说明          |
| ----- | ----------- |
| 0     | 通过验证,购买成功   |
| 1     | 恢复成功        |
| 2     | 购买失败        |
| 3     | 验证购买过程中发生错误 |


**示例:**

```js
window.uexOnload = function(){
    uexInAppPurchase.onTransactionState = function(result){
      	alert(result);
    };
}
```


### 🍭 onRestoreState 对产品恢复购买的状态进行监听

`uexInAppPurchase.onRestoreState(result)`

**说明:**

 对于非消耗品,用户在完成购买后如果使用其他机器登录或者卸载重新安装应用后通常希望这些非消耗品能够恢复,该监听方法是对restorePurchase方法进行监听,返回恢复购买的状态.

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明    |
| ------ | ------ | ---- | ----- |
| result | String | 是    | 形式见下: |

```js
var result = {
    status:,
    errorCode:,
    errorDescription:
}
```

| 参数名称             | 参数类型   | 是否必选 | 说明k                         |
| ---------------- | ------ | ---- | --------------------------- |
| status           | Number | 是    | 恢复购买的状态,0表示恢复购买完成,1表示恢复购买失败 |
| errorCode        | Number | 否    | status为1才有,错误状态码            |
| errorDescription | String | 否    | status为1才有,错误状态的描述信息        |



**示例:**

```js
window.uexOnload = function(){
    uexInAppPurchase.onRestoreState = function(result){
      	alert(result);
	};
}
```
# 3､更新历史

### iOS

API版本: `uexInAppPurchase-4.0.0`

最近更新时间:`2016-9-9`

| 历史发布版本 | 更新内容    |
| ------ | ------- |
| 4.0.0  | 内购插件4.0 |

### Android

**暂不支持!**
