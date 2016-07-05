[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
信用卡识别插件
## 1.1、说明
可以快速扫描信用卡信息功能
## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/130030c2015p6e16c.png)
## 1.3、开源源码:
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=164_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4、平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。

有特殊版本要求的API会在文档中额外说明。

## 1.5、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用。
# 2、API概览

## 2.1、方法:
> ### openCreditCardRec 开启识别

`uexCreditCardRec.openCreditCardRec(token,function(data){})`

**说明:**

请先到PayPal注册获取token 

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| token | String | 是 | 在PayPal获取的授权令牌 |
| data | json 对象 | 是 | 返回的数据，格式为{cardNumber:"卡号" }|
**示例:**

```
function createCreditCardRec(){
  var tokenStr = "f06a7eca39134918a18dc4d7c45ee49f";
  uexCreditCardRec.openCreditCardRec(tokenStr,function(data){
  alert("卡号:"+data.cardNumber);
  });
}
```


# 3、更新历史

### iOS

API版本:`uexCreditCardRec-4.0.0`

最近更新时间:`2016-7-5`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持引擎4.0，函数入参 |
| 3.0.4 | 添加IDE支持 |
| 3.0.3 | 支持iOS9 |
| 3.0.2 | uexCreditCardRec插件更新第三 方libPayPalMobile.a,支持arm64 |
| 3.0.1 | 统一回调方法名,统一回调参数 |
| 3.0.0 | 信用卡识别功能插件 |

### Android

API版本:`uexCreditCardRec-4.0.0`

最近更新时间:`2016-7-5`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持引擎4.0，函数入参 |
| 3.0.3 | 更新了card.io的库,提高兼容性 |
| 3.0.2 | 修复不收集cvv信息的问题,以及返回的卡号只有后四位的问题 |
| 3.0.1 | 修复在某些平台下会崩溃的问题,现仅支持arm平台 |
| 3.0.0 | 信用卡识别插件 |
