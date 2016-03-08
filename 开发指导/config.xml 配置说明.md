[TOC]



## 简介

* config.xml中的`<widget>`节点内会有**一个或多个**`<config>`块(如下所示)

```
<config desc="" type="">
	XXXX
</config>
```
	
* 其中`desc`为此config块的描述（无实际作用）
* 打包服务器会**逐条处理**每个`<config>`块，根据不同的`type`进行相应的操作



***





##type="KEY" 插件KEY值配置

本质上是进行替换操作


**例子**

```
<config desc="uexBaiduMap" type="KEY">
	<param platform="iOS"  name="$uexBaiduMap_APIKey$" value="qwerty"/>
	<param platform="Android"  name="$uexBaiduMap_APIKey$" value="123456"/>
</config>
```
**另一个例子**

```
<config desc="uexJPush" type="KEY">
    <param platform="iOS"  file="uexGroupfolder/PushConfig.plist" name="$UEXJPUSH_APP_KEY$" value="29f3d28136125dad137a42df"/>
    <param platform="iOS"  file="uexGroupfolder/PushConfig.plist" name="$UEXJPUSH_PUSH_CHANNEL$" value="TestPush"/>
    <param platform="iOS"  file="uexGroupfolder/PushConfig.plist" name="$UEXJPUSH_APS_ENVIRONMENT$" value="1"/>
</config>
```
**说明**

*  **打包服务器对指定文件进行全局搜索，把name字段替换为value字段**
*  `platform` 必选参数 操作平台
	* 传值为`"Android"`或者`"iOS"`

*  `file` 可选参数 要进行替换操作的文件路径
	* 不传此参数时，默认iOS为`"AppCanPlugin-Info.plist"` Android 为`"AndroidManifest.xml"`
	* 路径起始目录为APP根目录

*  `name` 必选参数 全局搜索的值、既替换之前的值
*  `value` 必选参数 替换之后的值
	*  插件开发者需保证name全局唯一，以避免冲突
***
##type="URLSCHEME" urlScheme管理（仅iOS）
**什么是URLSchemes？**
>Url Scheme：可以通过Url Scheme从一个应用打开另一个应用，并实现应用间的数据传递。
`第三方应用插件客户端：`可以查看对应插件API文档说明部分查询Url Scheme配置
    比如在微信支付过程中，App用过uexWeiXin插件打开微信客户端进行支付，支付过程完成后，微信客户端通过应用自定义的UrlScheme返回到本App,并传回支付结果
`如果是另一个应用：`此属性可以通过AppCan平台生成的ipa包里的Info.plist文件中找到；或者可以自定义配置urlscheme值

**例子**

```
<config desc="uexQQ" type="URLSCHEME">
	<urlScheme name="uexQQ" schemes="['scheme1','scheme2','scheme3']"/>
</config>
```
**说明**
*  `name` 必选参数 对所设置的urlscheme的名字 对应`<key>CFBundleURLName</key>`项，可设置任意字符串，无实际作用
*  `schemes` 必选参数 要设置的urlschemes。`schemes`为数组形式的json字符串，具体规则如下
* 数组用双引号(")和中括号([])包含 
* 每个urlscheme用单引号(')包含 多个urlscheme之间用逗号(,)隔开
* 以上所有标点均是半角英文符号
以上述配置为例，假设应用A中有进行此UrlScheme配置，在另一个应用B中，通过引擎的JS方法`uexWidget.loadApp('scheme1:');`即可打开应用A（注意不要漏掉冒号!）
***
##type="AUTHORITY" 权限设置
* 目前支持如下权限设置
	* iOS 设置APP后台权限
	* iOS 设置APP的urlScheme白名单

### 设置APP后台权限
####例子

```
<config desc="backgroundConfig" type="AUTHORITY">
	<permission platform="iOS" info="backgroundMode" flag="5"/>
</config>
```
####说明
* `info` 必选参数 所设置的权限 设置后台权限时,传`"backgroundMode"`
* `platform` 必选参数 对应的平台 目前仅支持iOS 传`"iOS"`
* `flag` 必选参数 所设置的权限flag 
	* iOS 平台下 flag如下所示  

|flag|info.plist里对应的字符串|解释|备注|
|---|---|---|---|
|1|`<string>audio</string>`|后台音乐播放| |
|2|`<string>location</string>`|后台定位||
|4|`<string>voip</string>`|后台VoIP服务||
|8|`<string>newsstand-content</string>`|后台新闻更新||
|16|`<string>external-accessory</string>`|后台与iOS配件进行交互||
|32|`<string>bluetooth-central</string>`|后台与蓝牙设备进行交互|此时iPhone作为central|
|64|`<string>bluetooth-peripheral</string>`|后台通过蓝牙发送广播|此时iPhone作为peripheral|
|128|`<string>fetch</string>`|后台下载内容|仅iOS 7.0+|
|256|`<string>remote-notification</string>`|通过点击推送消息后台下载内容|仅iOS 7.0+|

* 要配置多个权限时，将这些权限所对应的flag值相加后再传入
* **用户需慎重配置后台权限，不当的权限设置会导致APP上架审核失败**

### 设置urlScheme白名单

#### 例子

```
<config desc="whiteList" type="AUTHORITY">
    <permission platform="iOS" info="urlSchemeWhiteList">
         <string>scheme1</string>
         <string>schene2</string>
    </permission>
</config>
```

####说明
* `info` 必选参数 所设置的权限 设置urlScheme白名单时,传`"urlSchemeWhiteList"`
* `platform` 必选参数 对应的平台 传`"iOS"`
*  `<peimission>`节点内 每一个`<string>`节点对应一个urlScheme，至多50个
*  `uexQQ` `uexWeiXin` `uexAliPay` `uexSina` 可参考如下配置

```
<config desc="whiteList" type="AUTHORITY">
    <permission platform="iOS" info="urlSchemeWhiteList">
		<!--如果您有用到uexWeiXin请添加如下urlSchemes至白名单中,本行不要复制-->
		<string>wechat</string>
		<string>weixin</string>
		<!--如果您有用到uexSina请添加如下urlSchemes至白名单中,本行不要复制-->
		<string>sinaweibohd</string>
		<string>sinaweibo</string>
		<string>sinaweibosso</string>
		<string>sinaweibohdsso</string>
		<string>weibosdk</string>
		<string>weibosdk2.5</string>
		<!-- 如果您有用到uexQQ请添加如下urlSchemes至白名单中,本行不要复制-->
		<string>mqzoneopensdk</string> 
		<string>mqzoneopensdkapi</string>
		<string>mqzoneopensdkapi19</string>
		<string>mqzoneopensdkapiV2</string>
		<string>mqqOpensdkSSoLogin</string>
		<string>mqqopensdkapiV2</string>
		<string>mqqopensdkapiV3</string>
		<string>wtloginmqq2</string>
		<string>mqqapi</string>
		<string>mqqwpa</string>
		<string>mqzone</string>
		<string>mqq</string>
		<!--如果您有用到uexAliPay请添加如下urlSchemes至白名单中,本行不要复制-->
		<string>alipay</string>
		<string>alipayshare</string>
	</permission>
</config>
```

##type="ENTITLEMENTS" 授权信息管理（仅iOS）



###设置merchant商户信息

如果你的App需要支持ApplePay功能 那么必须要配置merchant商户信息

#### 例子

```
<config desc="xxx" type="ENTITLEMENTS">
    <entitlement type="merchant" value="merchantIdentifier1"/>
    <entitlement type="merchant" value="merchantIdentifier2"/>
</config>
```

####说明

*  type是必传参数，配置merchant商户信息时,传`"merchant"`;
*  value是必传参数，传你配置的商户信息的merchantIdentifier;
*  如果此App内需要同时用到多个商户信息，配置多个`<entitlement>`条目即可