[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
内部支付(IAP)插件
## 1.1、说明
封装内部支付(IAP)相关操作
## 1.2、UI展示

## 1.3、公告 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fnew.gif)]() 


大家都知道做iOS开发本身的收入有三种来源：出售应用、内购和广告。国内用户通常很少直接购买应用，因此对于开发者而言（特别是个人开发者），内购和广告收入就成了主要的收入来源。内购营销模式，通常软件本身是不收费的，但是要获得某些特权就必须购买一些道具，而内购的过程是由苹果官方统一来管理的.
    
## 1.4、开源源码
插件测试用例与源码下载:[点击](https://github.com/ios-plugin/uexInAppPurchase) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

##2.1、方法

> ### getProductList 得到产品列表方法

uexInAppPurchase.getProductList(params);
     

                
                

**说明:**

该方法从苹果服务器返回有效产品信息,包括产品描述信息、参考名称、价格、产品ID.

               
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


> ### purchase 购买单一产品

uexInAppPurchase.purchase(params);
     

                
                

**说明:**

该产品应该为从服务器返回的某一产品，该产品可以是消耗品或非消耗品以及其它类型，开发人员应对非消耗品进行逻辑处理。购买后要创建请求到苹果官网进行购买验证。

                
**参数:**

 ```
var params = {
    var params = {
       productID: ，//必选,从服务器返回的某一产品ID
       appStoreVerifyURL: ，//必选，布尔类型，true为实际购买验证；false为沙盒测试。
     };
}
 ```

**支持平台:**
				
iOS6.0+	

**版本支持:**

3.0.0+

**示例:**

```
var params = {
        "productID": "EnergyBottle",
        "appStoreVerifyURL": true
  };
uexInAppPurchase.purchase(JSON.stringify(params));
```



> ###restorePurchase 恢复购买方法

`uexInAppPurchase.restorePurchase();`	

**说明:**

恢复所有非消耗品，对于非消耗品，用户在完成购买后如果使用其他机器登录或者卸载重新安装应用后通常希望这些非消耗品能够恢复。
		


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

> ### cbRequestState 获取产品请求状态的回调方法

`cbRequestState(state)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| state | String | 是 | 产品请求的状态，如：请求完成 等| 



**版本支持:**

3.0.0+

**示例:**

```
function cbRequestState(state) {
    alert(state);
}
window.uexOnload = function(){
    uexInAppPurchase.cbRequestState = cbRequestState;
}
```
> ### cbProductListInfo 获取产品列表的回调方法

`cbProductListInfo(info)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| info | String | 是 | 选择的日期,格式为:[{"productIdentifier":"EnergyBottle","localizedTitle":"能量瓶","price":“6”,"localizedDescription":“补充能量，吃完能迅速恢复体力”},{"productIdentifier":"GoldenGlobe","localizedTitle":"金球","price":“6”,"localizedDescription":“快速合成装备，提高装备防御力”},{"productIdentifier":“ProtectiveGloves”,"localizedTitle":“强力手套”,"price":“6”,"localizedDescription":“提高5点攻击力”}] | 

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
function cbProductListInfo(info) {
    alert(info);
}
window.uexOnload = function(){
    uexInAppPurchase.cbProductListInfo = cbProductListInfo;
}
```
> ### cbPurchaseState 获取产品购买状态的回调方法

`cbPurchaseState(state)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| state | String | 是 | 产品购买的状态，如："开始购买"或"没有可购买的商品" 等| 



**版本支持:**

3.0.0+

**示例:**

```
function cbPurchaseState(state) {
    alert(state);
}
window.uexOnload = function(){
    uexInAppPurchase.cbPurchaseState = cbPurchaseState;
}
```
> ### cbSettingState 获取用户内购权限设置状态的回调方法

`cbSettingState(state)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| state | String | 是 | 用户设置内购权限的状态，如："用户禁止应用内付费购买" 等| 



**版本支持:**

3.0.0+

**示例:**

```
function cbSettingState(state) {
    alert(state);
}
window.uexOnload = function(){
    uexInAppPurchase.cbSettingState = cbSettingState;
}
```

> ### cbTransactionState 获取产品交易状态和信息的回调方法

`cbTransactionState(state)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| state | String | 是 | 选择的日期,格式为:{"productIdentifier":"EnergyBottle","quantity":"2","transactionDate":“”,"transactionIdentifier":“”} | 

 各字段含义如下:

|参数|是否必须|说明|
|-----|-----|-----|
|productIdentifier|是|购买的产品ID|
|quantity|是|购买产品数量|
|transactionDate|是|购买日期|
|transactionIdentifier|是|购买标识符|


**版本支持:**

3.0.0+

**示例:**

```
function cbTransactionState(state) {
    alert(state);
}
window.uexOnload = function(){
    uexInAppPurchase.cbTransactionState = cbTransactionState;
}
```
> ### cbVerifyState 获取产品购买验证状态的回调方法

`cbVerifyState(state)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| state | String | 是 | 产品购买验证的状态| 



**版本支持:**

3.0.0+

**示例:**

```
function cbVerifyState(state) {
    alert(state);
}
window.uexOnload = function(){
    uexInAppPurchase.cbVerifyState = cbVerifyState;
}
```
> ### cbVerifyInfo 获取产品购买验证信息的回调方法

`cbVerifyState(info)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| info| String | 是 | 产品购买验证的信息，信息内容待测试| 



**版本支持:**

3.0.0+

**示例:**

```
function cbVerifyInfo(info) {
    alert(info);
}
window.uexOnload = function(){
    uexInAppPurchase.cbVerifyInfo = cbVerifyInfo;
}
```
> ### cbRestoreState 获取产品恢复购买状态的回调方法

`cbRestoreState(state)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| state | String | 是 | 产品恢复购买的状态| 



**版本支持:**

3.0.0+

**示例:**

```
function cbRestoreState(state) {
    alert(state);
}
window.uexOnload = function(){
    uexInAppPurchase.cbRestoreState = cbRestoreState;
}
```

# 3、更新历史

### iOS

API版本:`uexInAppPurchase-3.0.0`

最近更新时间:`2016-01-18`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 内部支付(IAP)插件 |


