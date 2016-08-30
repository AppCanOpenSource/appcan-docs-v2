[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
KeyChain(钥匙串)插件

## 1.1、说明

封装了iOS系统的KeyChain相关功能.iOS的keychain服务提供了一种安全的保存私密信息(如密码,序列号)的方式,每个ios程序都有一个独立的keychain存储.
对于一些私密信息,比如密码等等,就需要使用更为安全的keychain了.keychain里保存的信息不会因App被删除而丢失,在用户重新安装App后依然有效,数据还在.

## 1.2、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=520_index)至插件详情页 (插件测试用例与插件源码已经提供)

## 1.3、平台版本支持

本插件的所有API默认只支持**iOS7.0+**操作系统,**不支持Android**.

有特殊版本要求的API会在文档中额外说明.

## 1.4、接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.

# 2、API概览

## 2.1、方法

### 🍭 setItem 设置一个keyChain item

`uexKeyChain.setItem(param,cb)`

**说明**

设置KeyChain数据

**参数**

param为JSON Object,包含内容如下

```javascript
var param = {
	service:,//String,必选 keyChain item关键字
	key:,//String,必选  keyChain item关键字
	value:,//String,必选 keyChain item内保存的数据
	accessibility:,//Number 可选 KeyChain数据保护设置 ,默认值为2
	iCloudSync:,//Boolean 可选 是否允许iCloud同步 仅限iOS7+ 默认false
	TouchIDProtected:,//Boolean 可选 是否设置TouchID保护 仅限iOS 8+ 默认false
	TouchIDPrompt://String 可选 覆写受到TouchID保护的数据时,弹出的TouchID提示文字 仅限iOS 8+ 
}
```
* keyChain说明见[术语表-KeyChain 说明](#KeyChain 说明)
* service 和 key 2个字符串唯一确定了一个keyChain item,即一张数据表.
* 如果调用该接口时item已存在,会进行覆写操作,覆盖掉之前设置的value数据
* accessibility说明见[术语表-accessibility KeyChain数据保护设置说明](### accessibility KeyChain数据保护设置说明)
* 如果accessibility被设置为6 那么iCloudSync将会无效,因为此accessibility设置下数据永远不会被iCloud同步
* 启用TouchID保护
  * 访问受到TouchID保护的数据时,将会先验证TouchID(用户需输入设备密码或者验证指纹)
  * 如果设备不支持TouchID 此设置将无效
  * 设备支持TouchID时,数据的accessibility将会被设置为6 此时传入的accessibility值将无效
* TouchIDPrompt
  * 参考上条说明,如果要设置的item已经存在,且受到TouchID保护,那么进行覆写操作时,会先要求验证TouchID
  * TouchIDPrompt即为弹出的TouchID验证提示框中的描述文字
  * 如果不设置TouchIDPrompt,将会使用系统默认的提示文字



**回调参数**

cb 为Function类型,为setItem的回调函数

```javascript
var cb = function(error,data){
  //error 为错误码,Number类型.为0表示操作成功,非0时表示操作失败
  //data 为操作回调结果,Object类型. 各字段解释见下
}
```

```javascript
var data = {
	service:,//String,必选 keyChain item关键字
	key:,//String,必选  keyChain item关键字
	value:,//String,可选 keyChain item内保存的数据 
	errorCode:,//Number 可选 系统错误代码 操作失败时才有此值
	errorInfo:,//String 可选 系统错误描述 操作失败时才有此值
}
```



**示例**

```javascript
var param = {
	service: "AppCan",
	key: "password",
	value: "123456",
	accessibility: 4,//注释掉TouchIDProtected那一行 ,此设置才会生效
	iCloudSync: true,//注释掉TouchIDProtected那一行 ,此设置才会生效
	TouchIDProtected: true,
	TouchIDPrompt: "您需要通过验证指纹以获得AppCan数据" 
};
uexKeyChain.setItem(param,function(err,data){
  if(err){
    alert("发生错误!");
  }else{
    alert("设置成功!");
  }
});
```

### 🍭 getItem 获取KeyChain item数据

`uexKeyChain.getItem(param,cb)`

**说明**

获取KeyChain数据

**参数**

param为JSON Object,包含内容如下

```javascript
var param={
	service:,//String,必选 keyChain item关键字
	key:,//String,必选 keyChain item关键字
	TouchIDPrompt:,//String,可选 获取受到TouchID保护的数据时,弹出的TouchID提示文字 仅限iOS 8+ 
}
```
* 具体参数含义可参考`uexKeyChain.setItem(param)`中的参数说明

**回调参数**

cb 为Function类型,为getItem的回调函数

```javascript
var cb = function(error,data){
  //error 为错误码,Number类型.为0表示操作成功,非0时表示操作失败
  //data 为操作回调结果,Object类型. 各字段解释见下
}
```

```javascript
var data = {
	service:,//String,必选 keyChain item关键字
	key:,//String,必选  keyChain item关键字
	value:,//String,可选 keyChain item内保存的数据 
	errorCode:,//Number 可选 系统错误代码 操作失败时才有此值
	errorInfo:,//String 可选 系统错误描述 操作失败时才有此值
}
```



**示例**

```javascript
var param = {
	service: "AppCan",
	key: "password",
	TouchIDPrompt: "您需要通过验证指纹以获得AppCan数据" 
};
uexKeyChain.getItem(param,function(err,data){
  if(err){
    alert("发生错误!");
  }else{
    alert("获取到的值为: " + data.value);
  }
});
```

### 🍭 removeItem 移除一个KeyChain item

**说明**

移除KeyChain数据

**参数**

param为JSON Object,包含内容如下

`uexKeyChain.removeItem(param,cb)`

```javascript
var param={
	service:,//String,必选 keyChain item关键字
	key:,//String,必选 keyChain item关键字 
}
```
* 具体参数含义可参考`uexKeyChain.setItem(param)`中的参数说明
* 移除受到TouchID保护的item并不要求验证TouchID

**回调参数**

cb 为Function类型,为getItem的回调函数

```javascript
var cb = function(error,data){
  //error 为错误码,Number类型.为0表示操作成功,非0时表示操作失败
  //data 为操作回调结果,Object类型. 各字段解释见下
}
```

```javascript
var data = {
	service:,//String,必选 keyChain item关键字
	key:,//String,必选  keyChain item关键字
	errorCode:,//Number 可选 系统错误代码 操作失败时才有此值
	errorInfo:,//String 可选 系统错误描述 操作失败时才有此值
}
```



**示例**

```javascript
var param = {
	service:"AppCan",
	key:"password"
};
uexKeyChain.removeItem(param,function(err,data){
  if(err){
    alert("发生错误!");
  }else{
    alert("删除成功!");
  }
});
```

### 🍭 getDeviceUniqueIdentifier 生成设备唯一标识

`uexKeyChain.getDeviceUniqueIdentifier()`

**说明**

* 设备首次调用此接口时,会生成一个随机32位字符串并用插件内置的key和service以权限kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly储存在keyChain中,并返回此字符串;
* 之后调用此接口,会直接根据key和service取回此字符串并返回
* **用户卸载APP再重装,此字符串不会变更!**

**参数**

无

**返回值**

返回生成的唯一标识,是长度为32的String

**示例**

```javascript
var uid = uexKeyChain.getDeviceUniqueIdentifier();
alert(uid);
```

#3、术语表

### 🍭 KeyChain 说明

* keyChain是iOS系统里一个独立的数据库系统,存储于应用沙盒之外
* 一般来说每个应用只能访问自己的KeyChain
* 同一个开发者账号下的具有相同BundleID前缀的APP直接可以设置共享keyChain数据(目前引擎还不支持,正在开发中)
* **即使应用删除了,KeyChain数据仍然存在,可以在应用重新安装之后继续访问**
* keyChain中的数据可以设置访问权限,有着比应用沙盒更好的安全性
* 存放在KeyChain中的非设备限制的数据可以备份,也可以通过iCloud在不同的iOS或者OSX设备间共享
* **可以通过keyChain在iOS 7+系统上实现唯一标识符的功能**

### 🍭 accessibility KeyChain数据保护设置说明

| accessibility值 | 对应的属性                                    | 说明                         | 备注              |
| -------------- | ---------------------------------------- | -------------------------- | --------------- |
| 0              | kSecAttrAccessibleAlways                 | 总是允许任何访问                   | 完全无保护,不推荐 使用    |
| 1              | kSecAttrAccessibleAlwaysThisDeviceOnly   | 总是允许任何访问,但仅限此设备            |                 |
| 2              | kSecAttrAccessibleAfterFirstUnlock       | 当iPhone首次解锁完成后,允许访问        | 默认值             |
| 3              | kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly | 当iPhone首次解锁完成后,允许访问,但仅限此设备 |                 |
| 4              | kSecAttrAccessibleWhenUnlocked           | 当iPhone没有被锁定时,允许访问         | 需要后台访问的数 据不要用此项 |
| 5              | kSecAttrAccessibleWhenUnlockedThisDeviceOnly | 当iPhone没有被锁定时,允许访问,但仅限此设备  |                 |
| 6              | kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly | 仅限此设备,并且启用设备密码验证,见下方说明     | 仅限iOS8+         |

* 仅限此设备的意思是,keychain数据通过iCloud同步,或者恢复备份后会验证设备的udid,如果不匹配(另一台iOS设备,或者刷机之后),那么此数据将会被销毁
* 关于启用设备密码验证,这是iOS 8新出的一个非常严格的keyChain保护设置
  * 如果你的iOS设备没有设置设备密码,此设置会失败
  * 在此访问权限下,如果用户重置或者取消设备密码,数据将会被销毁
  * 在此访问权限下,数据不会被iCloud同步,也不会被备份

* 传1~6之外的其他值,或者在iOS 8以下的系统上传6,此设置将会被忽略,插件会认为保护设置为默认值2

# 4、更新历史

### iOS

API版本: `uexKeyChain-4.0.0`

最近更新时间:`2016-1-21`

| 历史发布版本 | 更新内容 |
| ------ | ---- |
|        |      |



### Android

**uexKeyChain目前不支持Android**

