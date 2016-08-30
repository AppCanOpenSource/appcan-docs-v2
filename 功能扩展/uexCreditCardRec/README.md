[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
信用卡识别插件
## 1.1、说明
可以快速扫描信用卡信息功能
## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/130030c2015p6e16c.png)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=164_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4、平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.
# 2、API概览

## 2.1、方法
### 🍭 openCreditCardRec 开启识别

`uexCreditCardRec.openCreditCardRec(token,cb)`

**说明:**

请先到PayPal注册获取token 

**参数:**

| 参数名称  | 参数类型     | 是否必选 | 说明             |
| ----- | -------- | ---- | -------------- |
| token | String   | 是    | 在PayPal获取的授权令牌 |
| cb    | Function | 是    | 回调函数           |
**回调参数:**

```javascript
var cb = function(error,data){}
```

| 参数名称  | 参数类型   | 说明              |
| ----- | ------ | --------------- |
| error | Number | 识别结果,0-成功,非0-失败 |
| data  | Object | 成功时返回的数据,形式见下:  |

```javascript
var data = {
  cardNumber://卡号
}
```



**示例:**

```javascript
function createCreditCardRec(){
  var tokenStr = "f06a7eca39134918a18dc4d7c45ee49f";
  uexCreditCardRec.openCreditCardRec(tokenStr,function(error,data){
     if(!error){
       alert("卡号:"+data.cardNumber);
     }else{
       alert("失败!");
     }
  });
}
```


# 3、更新历史

### iOS

API版本: `uexCreditCardRec-4.0.0`

最近更新时间:`2016-7-5`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |

### Android

API版本: `uexCreditCardRec-4.0.0`

最近更新时间:`2016-7-5`

| 历史发布版本 | 更新内容                          |
| ------ | ----------------------------- |
