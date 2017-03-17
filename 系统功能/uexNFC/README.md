


[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
NFC插件
uexNFC

##   1.1.说明
NFC插件，扫描NFC卡片信息。

* 目前仅支持返回id和支持协议名
* 目前只支持Android


##   1.2.UI展示



##  1.3.公告


##  1.4.开源源码
插件测试用例与源码下载:[点击](https://github.com/android-plugin/uexNFC) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

##  1.5.使用流程
1. 调用isNFCSupport接口判断设备是否支持NFC功能;
2. 调用isNFCOpen接口判断设备是否打开了NFC功能;
3. 调用startScanNFC尝试开始扫描NFC状态，若返回成功，则将卡片放在设备的感应区，即可接收到cbGetNFCInfo的回调;
4. 若用户中途想取消扫描NFC状态，调用stopScanNFC接口即可停止扫描NFC状态。

#    2、API概览

##  2.1. 方法

###   🍭  isNFCSupport 判断设备是否支持NFC功能

`uexNFC.isNFCSupport()    `

**说明:**

使用插件之前，必须先调用此接口，判断设备是否支持NFC功能；
不支持则不能使用其他功能。


**参数:**

无

**返回值**

Boolean 类型，`true`表示支持，`false`表示不支持

**示例:**

```javascript
uexNFC.isNFCSupport();
```

###   🍭  isNFCOpen 判断设备NFC是否打开

` uexNFC.isNFCOpen()   `

**说明:**

使用插件之前，必须先调用此接口，判断设备是否打开NFC功能；
如未打开则进行提示，让用户在设置里手动打开NFC开关。  


**参数:**

无

**返回值**

Boolean 类型，`true`表示打开，`false`表示未打开

**示例:**

```javascript
  uexNFC.isNFCOpen();
```

### 🍭  configNFC 配置NFC相关的协议及指令

` uexNFC.configNFC(params)   `

**说明:**


传入特定类型、特定指令，返回该指令获得到的数据功能


**参数:**

params 为JSON对象，各字段如下：

| 参数名称 | 参数类型   | 是否必选 | 说明                                     |
| ---- | ------ | ---- | -------------------------------------- |
| tech | String | 是    | 协议类型，对应关系见下表                           |
| cmds | Array  | 是    | 指令集,byte数组的十六进制字串符形式，用逗号区分；根据不同协议指令也不同 |

协议对应表：

| 标识   | 对应协议               |
| :--- | ------------------ |
| 0    | 基础类型               |
| 1    | IsoDep类型           |
| 2    | NfcA类型             |
| 3    | NfcB类型             |
| 4    | NfcF类型             |
| 5    | NfcV类型             |
| 6    | Ndef类型             |
| 7    | NdefFormatable类型   |
| 8    | MifareClassic类型    |
| 9    | MifareUltralight类型 |

**返回值**

Boolean 类型，`true`表示成功，`false`表示失败

**示例:**

```javascript
  uexNFC.configNFC({
    "tech": "1",			//协议类型
	"cmds": [			//指令集,byte数组的十六进制字串符形式，用逗号区分；根据不同协议指令也不同
    	"00,A4,04,00,0E,31,50,41,59,2E,53,59,53,2E,44,44,46,30,31,00",		//根据名字选择
   		"00,B0,84,00,00",			//读取二进制
    	"00,A4,00,00,02,10,01,00",		//根据id选择
    	"80,5C,00,02,04",			//得到余额
    	"00,B2,01,C5,00"				//读取记录
	]
  });
```

### 

###   🍭  startScanNFC 开始扫描NFC

` uexNFC.startScanNFC()    `

**说明:**

调用这个接口，若返回成功，则进入开始扫描NFC状态；
将支持NFC的卡片放在设备感应区附近即可接受到cbGetNFCData（得到NFC数据的回调），若成功接受cbGetNFCData的回调，则会自动停止扫描NFC状态；
若想手动停止扫描NFC状态，请调用stopScanNFC接口。


**参数:**

无

**示例:**

```javascript
  uexNFC.startScanNFC();
```

###   🍭  stopScanNFC 停止扫描NFC状态

` uexNFC.stopScanNFC()    `

**说明:**

停止扫描NFC状态，提供一个手动的停止开关，当用户取消扫描NFC时须调用改接口。

**参数:**

无

**示例:**

```javascript
  uexNFC.stopScanNFC();
```
##2.2.回调方法

###🍭  cbGetNFCData 得到NFC数据回调

 uexNFC.cbGetNFCData(opCode,dataType,data) 

**说明:**
在接受到该回调时会自动停止扫描NFC状态。

**参数:**

| 参数名称     | 参数类型     | 是否必选 | 说明                            |
| -------- | -------- | ---- | ----------------------------- |
| opId     | Number类型 | 必选   | 操作ID,此函数中不起作用,可忽略。            |
| dataType | Number类型 | 必选   | 数据类型详见CONSTANT中Callback方法数据类型 |
| data     | String类型 | 必选   | 返回一个JSON字符串                   |

```javascript
var data = JSON.stringfy({
  	"uid":"D0453393",				//卡片id，十六进制格式
  	"technologies":"NfcA,MifareClassic,NdefFormatable",			//卡片支持的NFC协议名称，使用逗号区分
});
```
# 3、更新历史

### Android

API版本:`uexNFC-4.0.0`

最近更新时间:`2017-02-17`

| 历史发布版本 | 更新内容  |
| ------ | ----- |
| 4.0.0  | NFC插件 |

