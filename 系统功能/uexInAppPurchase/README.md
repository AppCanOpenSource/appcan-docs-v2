[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
内部支付(IAP)插件
## 1.1、说明
封装内部支付(IAP)相关操作
## 1.2、UI展示

## 1.3、公告 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fnew.gif)]() 

iOS开发的收入有三种来源:出售应用、内购和广告。国内用户通常很少直接购买应用,因此对于开发者而言(特别是个人开发者),内购和广告收入就成了主要的收入来源。内购营销模式,通常软件本身是不收费的,但是要获得某些特权就必须购买一些道具,需要通过内购的方式来实现,而内购的过程是由苹果官方统一来管理的.
    
## 1.4、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=567) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

##2.1、方法

> ### getProductList 得到产品列表方法

`uexInAppPurchase.getProductList(params);`     

                
                

**说明:**

该方法从苹果服务器返回有效产品信息,包括产品描述信息、参考名称、价格、产品ID,通过cbGetProductList回调实现.

               

**参数:**

 ```
var params = {
    productIDs:[],//必选,在苹果官网内购项目中填写的产品ID 
}
 ```

**支持平台:**
				
iOS6.0+	

**版本支持:**

3.0.0+

**示例:**

```
var params = {
     "productIDs": ["EnergyBottle","GoldenGlobe","ProtectiveGloves"]
};            
uexInAppPurchase.getProductList(JSON.stringify(params));
```
> ### canMakePay 测试设备是否支持支付功能

`var info = uexInAppPurchase.canMakePay();`
 

**说明:**

该方法测试设备是否支持支付功能,支持同步返回。

               

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| info| Number | 是 | 0表示设备允许内购,1设备禁止内购| 

**支持平台:**
				
iOS6.0+	

**版本支持:**

3.0.0+

**示例:**

```
 var info = uexInAppPurchase.canMakePay();
 
 alert(info);
```
> ### purchase 购买单一产品

uexInAppPurchase.purchase(params);
     

                
                

**说明:**

该产品应该为从服务器返回的某一产品,从cbGetProductList中获取,该产品可以是消耗品或非消耗品以及其它类型,开发人员应对非消耗品进行逻辑处理,非消耗品无需再次购买。

                

**参数:**

 ```
var params = {
       productID: ,
       quantity: ,
       appStoreVerifyURL: 
}
 ```
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| productID | String | 是 |某一产品ID,通过cbGetProductList获取| 
| quantity | Number | 否 |购买的数量,默认为1 | 
| appStoreVerifyURL | bool | 是 |true为实际购买验证；false为沙盒测试 | 
**支持平台:**
				
iOS6.0+	

**版本支持:**

3.0.0+

**示例:**

```
var params = {
        "productID": "EnergyBottle",
        "quantity":"2",
        "appStoreVerifyURL": true
  };
uexInAppPurchase.purchase(JSON.stringify(params));
```

> ###restorePurchase 恢复购买方法

`uexInAppPurchase.restorePurchase();`	

**说明:**

恢复所有非消耗品,对于非消耗品,用户在完成购买后如果使用其他机器登录或者卸载重新安装应用后通常希望这些非消耗品能够恢复。
		

**参数:**

无
 

 

**示例:**

```
uexInAppPurchase.restorePurchase();               
```

**支持平台:**
				
iOS6.0+	

**版本支持:**

3.0.0+	

## 2.2、回调方法

> ### cbGetProductList 获取产品列表信息的回调方法

`cbGetProductList(info)`

**说明:**

 该方法返回从苹果服务器获取的有效产品信息,对getProductList方法进行回调

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| info | String | 是 | 产品信息的格式为:[{"productIdentifier":"EnergyBottle","localizedTitle":"能量瓶","price":"6","localizedDescription":"补充能量,吃完能迅速恢复体力"},{"productIdentifier":"GoldenGlobe","localizedTitle":"金球","price":"6","localizedDescription":"快速合成装备,提高装备防御力"},{"productIdentifier":"ProtectiveGloves","localizedTitle":"强力手套","price":"6","localizedDescription":"提高5点攻击力"}] | 

 各字段含义如下:

|参数|是否必须|说明|
|-----|-----|-----|
|productIdentifier|是|产品ID|
|localizedTitle|是|参考名称|
|price|是|价格等级|
|localizedDescription|是|产品描述信息|

**版本支持:**

3.0.0+

**示例:**

```
function cbGetProductList(info) {
    alert(info);
}
window.uexOnload = function(){
    uexInAppPurchase.cbGetProductList = cbGetProductList;
}
```

> ### <del>cbGetVerifyInfo 获取产品购买验证信息的回调方法</del>(已废弃)

`cbGetVerifyInfo(info)`

**说明:**

 该方法返回产品购买验证的相关信息,根据该信息进行相应的逻辑处理。如:读取产品标识 ,如果是消耗品则记录购买数量,非消耗品则记录是否购买过。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| info| String | 是 | 产品购买验证的信息| 

**版本支持:**

3.0.0+

**示例:**

```
function cbGetVerifyInfo(info) {
    alert(info);
}
window.uexOnload = function(){
    uexInAppPurchase.cbGetVerifyInfo = cbGetVerifyInfo;
}
```
## 2.2、监听方法

> ### onRequestState 对发送产品请求进行监听

`onRequestState(state)`

**说明:**

 当向苹果服务器发送请求获取有效产品信息时,对getProductList方法中发送请求的状态进行监听

**参数:**

```
var state ={
    status:,
    errorCode:,
    errorDescription
}
```

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| status | Number | 是 |发送产品请求的状态,0表示请求完成,1表示请求失败 | 
| errorCode | Number | 否 |status为1才有,错误状态码 | 
| errorDescription | String | 否 |status为1才有,错误状态的描述信息 | 

**版本支持:**

3.0.0+

**示例:**

```
function onRequestState(state) {
    alert(state);
}
window.uexOnload = function(){
    uexInAppPurchase.onRequestState = onRequestState;
}
```
> ### onPurchaseState 对产品购买状态的监听方法

`onPurchaseState(state)`

**说明:**

 当进行购买动作时,要对购买的产品的有效性进行判断,即对purchase方法中产品信息的有效性进行监听
 

**参数:**

```
var state ={
    status:,
    msg:
}
```

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| status | Number | 是 |购买产品的有效性,0表示产品有效,1表示产品无效 | 
| msg | String | 是 |产品有效返回"purchase start",产品无效返回"product is nil" | 
 
 

**版本支持:**

3.0.0+

**示例:**

```
function onPurchaseState(state) {
    alert(state);
}
window.uexOnload = function(){
    uexInAppPurchase.onPurchaseState = onPurchaseState;
}
```

> ### onTransactionState 对产品交易状态和信息的监听方法

`onTransactionState(state)`

**说明:**

 当购买的产品为有效产品时,会将有效产品加入支付队列就形成一次购买请求,并且用户允许内购时,将会进行交易。该方法是对用户交易状态的监听。

**参数:**

```
var state ={

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
    
    //status为4
    msg: ,//返回"responseData is nil"
}
```
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| status | Number | 是 |交易状态标识符,详细说明见下| 

 status字段含义如下:

|  value | 说明  |
| ----- | ----- |
| 0 | 通过验证,购买成功 |
| 1 | 已经购买过该商品 |
| 2 | 购买失败 |
| 3 | 验证购买过程中发生错误 |
| 4 | 验证购买过程中返回数据为空 |

**版本支持:**

3.0.0+

**示例:**

```
function onTransactionState(state) {
    alert(state);
}
window.uexOnload = function(){
    uexInAppPurchase.onTransactionState = onTransactionState;
}
```

> ### onRestoreState 对产品恢复购买的状态进行监听

`onRestoreState(state)`

**说明:**

 对于非消耗品,用户在完成购买后如果使用其他机器登录或者卸载重新安装应用后通常希望这些非消耗品能够恢复,该监听方法是对restorePurchase方法进行监听,返回恢复购买的状态。

**参数:**

```
var state ={
    status:,
    errorCode:,
    errorDescription
}
```

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| status | Number | 是 |恢复购买的状态,0表示恢复购买完成,1表示恢复购买失败 | 
| errorCode | Number | 否 |status为1才有,错误状态码 | 
| errorDescription | String | 否 |status为1才有,错误状态的描述信息 |  

**版本支持:**

3.0.0+

**示例:**

```
function onRestoreState(state) {
    alert(state);
}
window.uexOnload = function(){
    uexInAppPurchase.onRestoreState = onRestoreState;
}
```
> ### <del>onVerifyState 对产品购买验证状态的进行监听</del>(已废弃)

`onVerifyState(state)`

**说明:**

 当交易成功时,会进行产品购买验证,该方法是对产品购买验证的状态进行监听。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| state | String | 是 | 产品购买验证的状态| 

**版本支持:**

3.0.0+

**示例:**

```
function onVerifyState(state) {
    alert(state);
}
window.uexOnload = function(){
    uexInAppPurchase.onVerifyState = onVerifyState;
}
```
> ### <del>onSettingState 对用户内购权限设置状态的监听</del>(已废弃)

`onSettingState(state)`

**说明:**

 当购买的产品为有效产品时,会将有效产品加入支付队列就形成一次购买请求,若用户禁止内购,购买请求将会被终止。该方法是对用户内购权限设置状态的监听。
 

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| state | String | 是 | 用户设置内购权限的状态,如:"用户禁止应用内付费购买" 等| 

**版本支持:**

3.0.0+

**示例:**

```
function onSettingState(state) {
    alert(state);
}
window.uexOnload = function(){
    uexInAppPurchase.onSettingState = onSettingState;
}
```
# 3、更新历史

### iOS

API版本:`uexInAppPurchase-3.0.4`

最近更新时间:`2016-05-27`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.4 | 新增接口canMakePay,废弃无用监听 |
| 3.0.3 | 更新方法 |
| 3.0.2 | 修复无法返回产品列表 |
| 3.0.1 | 优化内购插件 |
| 3.0.0 | 内部支付(IAP)插件 |

### Android

**uexInAppPurchase目前不支持Android**

