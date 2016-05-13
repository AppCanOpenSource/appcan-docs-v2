[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/公测/gf.png)]()
   <div  class="pull-left">uexDiDiTravel滴滴出行插件</div><div style="color:#999" class="pull-right">插件作者：来自AppCan官方</div>

## 1.1、说明
 该对象主要封装了滴滴出行SDK提供的API接口，实现对滴滴出行多种业务线（出、专、快、代）服务的调用。
**注:  回调中一般包含三个字段errno 、errmsg ，data（iOS中只返回data）；**
## 1.2、使用指南
- 使用其他接口之前，调用registerApp来初始化SDK；
- showDDPage和openPage接口可以打开滴滴自带的一些界面，完成用车和查询等操作；
- 如果需要在自己的App内用自定义的形式展示一些用车信息，可以使用剩余接口来获取一些数据，并自行展示。

##1.3、 开源源码
插件测试用例与自定义插件下载:[点击此处](http://plugin.appcan.cn/details.html?id=613_index)  (插件测试用例与插件源码已经提供)

#2、API概览


## 2.1、接口方法名
> ### registerApp 注册应用

`uexDiDiTravel.registerApp(param)`

**说明:**

注册应用的appid和secrect，**调用此接口成功注册应用后，才可以调用滴滴插件的其他接口**

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| param | String | 是 | 该字符串为JSON格式，传入的json字符串为，appid：String类型，必选，应用的appid；secrect：String类型，必选，应用的secrect，两者都需要到滴滴开放平台中申请|

**平台支持:**

  Android2.2+
  iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    var param = {
         "appid":"didi64334F4C4F4370356A6A6D75524D4D",
         "secrect":"0059491bb5795b86d5d938d175aaea84"
     };
     uexDiDiTravel.registerApp(JSON.stringify(param));
```
> ### showDDPage 显示滴滴叫车主页面

`uexDiDiTravel.showDDPage(param)`

**说明:**
显示滴滴叫车主页面

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| param | String | 是 | 该字符串为JSON格式，参见下方param列表 |

param列表

| 参数        | 是否必须 | 说明                                       |
| --------- | ------- | ---------------------------------------- |
| fromlat   | 可选   | 出发地纬度   |
| fromlng  | 可选   | 出发地经度   |
| fromaddr  | 可选   | 出发地地址   |
| fromname  | 可选   | 出发地名称   |
| tolat   | 可选   | 目的地纬度   |
| tolng  | 可选   | 目的地经度   |
| toaddr  | 可选   | 目的地地址   |
| toname  | 可选   | 目的地名称   |
| biz  | 可选   | 默认选中的业务线类型，可选的取值为 1：出租 2：专车 3：快车 4：代驾   |
| phone  | 可选   | 乘客手机号，方便乘客登录使用，会默认补全到登录框中 |
| maptype  | 可选   | 经纬度类型  wgs/baidu/soso   |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
            var param = {
                    "fromlat":"40.043571",
                    "fromlng":"116.290506",
                    "fromaddr":"",
                    "fromname":"",
                    "tolat":"40.046571",
                    "tolng":"116.200506",
                    "toaddr":"",
                    "toname":"",
                    "biz":"1",
                    "phone":"13000000112",
                    "maptype":"baidu"
                };
            uexDiDiTravel.showDDPage(JSON.stringify(param));
```

>### openPage 拉起滴滴指定页面

`uexDiDiTravel.openPage(param);`
**说明**

拉起滴滴指定页面

方法名1：login

| 参数说明 | 参数类型 | 是否必选 | 说明 |
|----------|----------  |---------  |------|
|param|string|是| json格式，传入的json字符串为，finish：完成登录的动作,close_page(关闭登录页面) / home_page(跳转至打车主页) 可选,默认close_page|


方法名2：orderDetail

| 参数说明 | 参数类型 | 是否必选 | 说明 |
|----------|----------  |---------  |------|
|param|string  |是 |json格式，传入的json字符串为，biz：业务线标识,目前支持2:快车 3:专、oid:需要展示行程的订单号|


方法名3：orderList

| 参数说明 | 参数类型 | 是否必选 | 说明 |
|----------|----------  |---------  |------|
|无参数| | | | |

方法名4：invoice

| 参数说明 | 参数类型 | 是否必选 | 说明 |
|----------|----------  |---------  |------|
|param|string  |是 |json格式，传入的json字符串为，page：menu/invoice/history之一,默认menu|

**平台支持**
Android2.2+
iOS6.0+
**版本支持**
**示例**

```
        // 登录界面
        var param1 = {
            "login":{
                "finish":"close_page"}
        };
		 uexDiDiTravel.openPage (JSON.stringify(param1)
        // 行程详情界面
        var param2 = {
            "orderDetail":{
                "biz":"2",
                "oid":"这里需要传实际获取到的订单号"}
        };
		 uexDiDiTravel.openPage (JSON.stringify(param2)
        // 订单列表界面
        var param3 = {
            "orderList":""
        };
		 uexDiDiTravel.openPage (JSON.stringify(param3)
        // 发票开具界面
        var param4 = {
            "invoice":{
                "page":"menu"}
        };
        uexDiDiTravel.openPage (JSON.stringify(param4));

```

> ### callDDApi 调用滴滴开放API

`uexDiDiTravel.callDDApi(param)`

**说明:**
滴滴开放API包括获取预估接驾时间、获取预估费用、获取当前订单状态、获取当前订单司机信息、获取行程列表

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| param | String | 是 | 该字符串为JSON格式，传入API方法名及所需的参数，参见下方param列表 |

param列表

| API方法名        | 是否必须 | 说明                                       |
| --------- | ------- | ---------------------------------------- |
| getEstimateTime   | 必选   | 根据当前经纬度获取预估接驾时间，该API的参数为JSON格式，参见下方getEstimateTime参数列表  |
| getEstimatePrice  | 必选   | 传入起始地目的地，获取预估费用，该API的参数为JSON格式，参见下方getEstimatePrice参数列表  |
| getCurrentOrderStatus  | 必选   | 返回当前正在进行的订单信息，该API无参数，传入{"getCurrentOrderStatus":""}即可  |
| getCurrentDriverInfo  | 必选   | 获取当前订单的司机信息，如果当前没有订单正在行程中，则会返回空数据，该API无参数， 传入{"getCurrentDriverInfo":""}即可  |
| getOrderList  | 必选   | 获取行程列表，该API的参数为JSON格式，参见下方getOrderList参数列表   |

getEstimateTime参数列表

| 参数        | 是否必须 | 说明                                       |
| --------- | ------- | ---------------------------------------- |
| fromlat   | 必选   | 出发地纬度   |
| fromlng  | 必选   | 出发地经度   |
| fromaddr  |  必选   | 出发地地址   |
| fromname  |  必选   | 出发地名称   |
| maptype  | 必选   | 经纬度类型   |
| biz  | 可选   | 业务线类型   |

getEstimatePrice参数列表

| 参数        | 是否必须 | 说明                                       |
| --------- | ------- | ---------------------------------------- |
| fromlat   | 必选   | 出发地纬度   |
| fromlng  | 必选   | 出发地经度   |
| fromaddr  | 必选   | 出发地地址   |
| fromname  | 必选   | 出发地名称   |
| tolat   | 必选   | 目的地纬度   |
| tolng  | 必选   | 目的地经度   |
| toaddr  | 必选   | 目的地地址   |
| toname  | 必选   | 目的地名称   |
| maptype  | 必选   | 经纬度类型   |
| biz  | 可选   | 业务线类型   |

getOrderList参数列表

| 参数        | 是否必须 | 说明                                       |
| --------- | ------- | ---------------------------------------- |
| size   | 可选   | 获取的条目数，默认为10   |
| offset  | 可选   | 获取条目的偏移量，默认为0   |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
        // 预估时间
        var param1 = {
                "getEstimateTime":{
                        "fromlat":"",
                        "fromlng":"",
                        "fromaddr":"海淀中街15号",
                        "fromname":"远中悦莱大厦",
                        "biz":"",
                        "maptype":"baidu"}
            };
        uexDiDiTravel.callDDApi(JSON.stringify(param1));

        // 预估车费
        var param2 = {
                "getEstimatePrice":{
                        "fromlat":"40.043571",
                        "fromlng":"116.290506",
                        "fromaddr":"",
                        "fromname":"",
                        "tolat":"40.046571",
                        "tolng":"116.200506",
                        "toaddr":"",
                        "toname":"",
                        "biz":"2",
                        "maptype":"soso"}
            };
        uexDiDiTravel.callDDApi(JSON.stringify(param2));

        // 获取当前进行中的订单状态
        var param3 = {
                "getCurrentOrderStatus":""
            };
        uexDiDiTravel.callDDApi(JSON.stringify(param3));

        // 获取当前进行中订单的司机信息
        var param4 = {
                "getCurrentDriverInfo":""
            };
        uexDiDiTravel.callDDApi(JSON.stringify(param4));

        // 获取订单列表
        var param5 = {
                "getOrderList":{
                        "size":"10",
                        "offset":"0"}
            };
        uexDiDiTravel.callDDApi(JSON.stringify(param5));
```
>### getTicket 获取滴滴API的Ticket信息

`uexDiDiTravel.getTicket(param);`
**说明**
获取供服务端直接调用滴滴API的ticket。ticket分为单次与长期有效，部分敏感的API接口需要单次有效的ticket才能调用。
单次有效的ticket调用一次之后即失效，而长期有效的ticket在有效期（一般为2个小时）内可重复使用。单次与长期有效的ticket之间可以共存，但至多同时存在一个有效的单次有效及一个长期有效的ticket。

**参数:**

| 参数说明 | 参数类型 | 是否必选 | 说明 |
|----------|----------  |---------  |------|
|param|string|是|该字符串为JSON格式，传入的json字符串为，type：Ticket的类型， type:单次有效("0")/长期有效(一般为2个小时)("1") |
**平台支持**
Android2.2+
iOS6.0+
**版本支持**
**示例**

```
//type ：传“0”代表single   “1”代表longtime；
var param = {"type":document.getElementById("typeID").value}
    uexDiDiTravel.getTicket (JSON.stringify(param));
```

>### isLogin 判断当前用户是否登录

`uexDiDiTravel.isLogin();`
**说明**
判断当前用户是否登录
**参数:**
无

**平台支持**
Android2.2+
iOS6.0+
**版本支持**
**示例**

```
uexDiDiTravel.isLogin();
```

>### callPhone 呼叫电话

`uexDiDiTravel.callPhone(param);`
**说明**
 呼叫司机电话接口，用于联系司机。

**参数:**

| 参数说明 | 参数类型 | 是否必选 | 说明 |
|----------|----------  |---------  |------|
|param|string|是|param为json格式，传入的json字符串为，phone：司机信息接口返回的司机手机号加密串|

**平台支持**
Android2.2+
iOS6.0+
**版本支持**
**示例**

```
var param ={"phone":document.getElementById("phoneID").value};
    uexDiDiTravel.callPhone(JSON.stringify(param))
```

## 2.2、回调方法
> ### cbGetEstimateTime 获取预估时间的回调方法

`uexDiDiTravel.cbGetEstimateTime(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | 操作ID，在此函数中不起作用，可忽略 |
| dataType | Number | 是 | 返回数据的数据类型 |
| data | String | 是 | 返回预估时间，该字符串为JSON格式，参见下方data列表 |

data说明：

|  参数名称 |  说明 |
| --------- |  ------ |
| errno |  错误码，如果为0则正常，不为0则异常 |
| errmsg |  错误信息，errno=0时为空，errno!=0时为错误的概要描述信息 |
| data |  预估时间 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
 function cbGetEstimateTime (opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexDiDiTravel.cbGetEstimateTime= cbGetEstimateTime;
}
```

> ### cbGetEstimatePrice 获取预估费用的回调方法


`uexDiDiTravel.cbGetEstimatePrice(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | Number | 是 | 操作ID，在此函数中不起作用，可忽略 |
| dataType | Number | 是 | 返回数据的数据类型 |
| data | String | 是 | 返回数据 |

data说明：

|  参数名称 |  说明 |
| --------- |  ------ |
| errno |  错误码，如果为0则正常，不为0则异常 |
| errmsg |  错误信息，errno=0时为空，errno!=0时为错误的概要描述信息 |
| data |  预估费用 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
function cbGetEstimatePrice (opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexDiDiTravel.cbGetEstimatePrice= cbGetEstimatePrice;
}
```

> ### cbGetCurrentOrderStatus 获取当前进行中的订单状态的回调方法

`uexDiDiTravel.cbGetCurrentOrderStatus(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | Number | 是 | 操作ID，在此函数中不起作用，可忽略 |
| dataType | Number | 是 | 返回数据的数据类型 |
| data | String | 是 | 返回数据 |

data说明：

|  参数名称 |  说明 |
| --------- |  ------ |
| errno |  错误码，如果为0则正常，不为0则异常 |
| errmsg |  错误信息，errno=0时为空，errno!=0时为错误的概要描述信息 |
| data |  当前进行中的订单状态 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
function cbGetCurrentOrderStatus (opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexDiDiTravel.cbGetCurrentOrderStatus= cbGetCurrentOrderStatus;
}
```

> ### cbGetCurrentDriverInfo 获取当前订单的司机信息的回调方法

`uexDiDiTravel.cbGetCurrentDriverInfo(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | Number | 是 | 操作ID，在此函数中不起作用，可忽略 |
| dataType | Number | 是 | 返回数据的数据类型 |
| data | String | 是 | 返回数据 |

data说明：

|  参数名称 |   说明 |
| --------- |  ------ |
| errno |  错误码，如果为0则正常，不为0则异常 |
| errmsg |  错误信息，errno=0时为空，errno!=0时为错误的概要描述信息 |
| data |  当前订单的司机信息 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
function cbGetCurrentDriverInfo (opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexDiDiTravel.cbGetCurrentDriverInfo= cbGetCurrentDriverInfo;
}
```

> ### cbGetOrderList   获取订单列表的回调方法

`uexDiDiTravel.cbGetOrderList(opId,dataType,data)`

**参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | Number | 是 | 操作ID，在此函数中不起作用，可忽略 |
| dataType | Number | 是 | 返回数据的数据类型 |
| data | String | 是 | 返回数据 |

data说明：

|  参数名称 |   说明 |
| --------- | ------ |
| errno |  错误码，如果为0则正常，不为0则异常 |
| errmsg | 错误信息，errno=0时为空，errno!=0时为错误的概要描述信息 |
| data | 订单列表信息 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
 function cbGetOrderList (opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexDiDiTravel.cbGetOrderList= cbGetOrderList;
}
```

> ### cbGetTicket  获取滴滴API Ticket信息回调方法

`uexDiDiTravel.cbGetTicket(opId,dataType,data)`
**说明:**

无

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | Number | 是 | 操作ID，在此函数中不起作用，可忽略 |
| dataType | Number | 是 | 返回数据的数据类型 |
| data | String | 是 | 返回数据 |

data说明：

|  参数名称 |   说明 |
| --------- | ------ |
| errno |  错误码，如果为0则正常，不为0则异常 |
| errmsg |  错误信息，errno=0时为空，errno!=0时为错误的概要描述信息 |
| data |  获取滴滴API Ticket信息回调数据 |


**版本支持:**
3.0.0+
**示例:**
```
function cbGetTicket (opId,dataType,data) {
    alert(data);
	//data = {"ticket":"df2243hdhfud343ufd554388du"}
}
window.uexOnload = function(){
    uexDiDiTravel.cbGetTicket = cbGetTicket;
}
```

> ### cbIsLogin  判断是否登录回调方法

`uexDiDiTravel.cbIsLogin(opId,dataType,data)`
**说明:**
无

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | Number | 是 | 操作ID，在此函数中不起作用，可忽略 |
| dataType | Number | 是 | 返回数据的数据类型 |
| data | String | 是 | 返回数据,判断是否登录回调数据，data=0或者1(0代表登录，1代表未登录) |



**版本支持:**
3.0.0+
**示例:**
```
function cbIsLogin (opId,dataType,data) {
    alert(data);
}
window.uexOnload = function(){
    uexDiDiTravel.cbIsLogin = cbIsLogin;
}
```

# 3、更新历史

### iOS

API版本:`uexDiDiTravel-3.0.0`

最近更新时间:`2016-05-12`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 该对象主要封装了滴滴出行SDK提供的API接口，实现对滴滴出行多种业务线（出、专、快、代）服务的调用 |

### Android

API版本:`uexDiDiTravel-3.0.0`

最近更新时间:`2016-05-12`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 该对象主要封装了滴滴出行SDK提供的API接口，实现对滴滴出行多种业务线（出、专、快、代）服务的调用 |


