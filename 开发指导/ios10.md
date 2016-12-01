

- [插件引擎部分](#- "插件引擎部分")
- [隐私权限AUTHORITY](#-authority- "隐私权限AUTHORITY")
- [推送配置ENTITLEMENTS](#-entitlements- "推送配置ENTITLEMENTS")

####  **插件引擎部分**

**引擎 - 最低支持系统版本更改** 

* iOS引擎最低支持的系统版本更新为 **8.0**

####  **隐私权限AUTHORITY**

- 根据Apple的要求,在iOS10系统上访问用户隐私数据必须要配置隐私权限

######   **配置隐私权限 - config.xml**

- 在config.xml中添加如下字段以配置隐私权限

```xml
<config desc="" type="AUTHORITY">
    <permission platform="iOS" info="privacy" type="$type">
    	<string>$description</string>
    </permission>
</config>
```

- 其中,每一个`permission`节点代表一种隐私权限
- info="privacy"为定值,作为标志表示这是一个Privacy权限配置
- type="$type" `$type`需要用户配置,表示需要具体配置哪种privacy权限,**用户配置的`$type`必须是下表中的type之一,否则此配置无效并将被忽略**
- 每个`permission`节点中只应该有一个`string`节点,多余的`string`节点将会被忽略
- `string`节点内的`$description`需要用户配置,**可为任意字符串**,表示App请求权限时的展示给用户的描述字段

- **iOS所有可配置的隐私权限**

|                   |                                       |                   |              |
| ----------------- | ------------------------------------- | ----------------- | ------------ |
| type              | 对应info.plist中的key                     | 说明                | 备注           |
| locationWhenInUse | NSLocationWhenInUseUsageDescription   | App使用中时进行gps定位的权限 | 只需要前台定位时的权限  |
| locationAlways    | NSLocationAlwaysUsageDescription      | App总是使用gps定位的权限   | 包含前台和后台的定位权限 |
| motion            | NSMotionUsageDescription              | App使用传感器的权限       |              |
| bluetooth         | NSBluetoothPeripheralUsageDescription | App使用蓝牙的权限        |              |
| calendar          | NSCalendarsUsageDescription           | App访问日历的权限        |              |
| camera            | NSCameraUsageDescription              | App使用摄像头的权限       |              |
| contact           | NSContactsUsageDescription            | App访问通讯录的权限       |              |
| microphone        | NSMicrophoneUsageDescription          | App使用话筒的权限        |              |
| photoLibrary      | NSPhotoLibraryUsageDescription        | App访问相册的权限        |              |
| reminder          | NSRemindersUsageDescription           | App访问备忘录的权限       |              |

- **示例**

比如使用了uexVideo插件录制视频,需要用到**麦克风**和**摄像头**权限,则相应的config配置参考如下所示

```xml
<?xml version="1.0" encoding="utf-8" ?>
<widget widgetId="" pid="" appId="2222" channelCode="0000" version="00.00.0000" viewmode="application" width="320" height="480" sreensize="4.5">
	
	<name>2222</name>
	<description></description>
	<author email=""> </author>
	<icon src="icon.png" />
	<license href=""></license>
	<content src="index.html" encoding="utf-8" ></content>
	<updateurl></updateurl>
	<logserverip></logserverip> 
	<showmyspace>false</showmyspace>
	<obfuscation>true</obfuscation>
	<bgcolor>#fefefe</bgcolor>
	<orientation>15</orientation>
<!-- 这里开始写配置-->
	<config desc="privacyConfig" type="AUTHORITY">
    <permission platform="iOS" info="privacy" type="camera">
		<string>appcan录制视频需要使用摄像头</string>
    </permission>
    <permission platform="iOS" info="privacy" type="microphone">
		<string>appcan录制视频需要使用麦克风</string>
    </permission>
</config>
<!-- 以上区域为配置-->
</widget>
```

- **以下插件的部分接口需要进行隐私权限配置**
- uexAudio (麦克风权限)
- uexBaiduMap (定位权限)
- uexBaiduNavi (定位权限)
- uexCamera (摄像头权限)
- uexContact (通讯录权限)
- uexCreditCardRec (摄像头权限)
- uexDevice (蓝牙权限)
- uexGaodeMap (定位权限)
- uexGaodeNavi (定位权限)
- uexImage (相册权限)
- uexLocation (定位权限)
- uexScanner (摄像头权限)
- uexSensor (传感器权限)
- uexShakeView (传感器权限)
- uexUnisound (麦克风权限)
- uexVideo (麦克风权限,摄像头权限)
- uexTencentLVB (话筒权限,摄像头权限)

####  **推送配置ENTITLEMENTS**

- 根据Apple的要求,在iOS10系统上使用推送功能需要进行配置

######  **配置推送功能 - config.xml**

- 需要使用推送功能时 ，以及使用推送通知获取设备deviceToken，需在config.xml中添加如下字段

**前提条件：**APPid里需要开启推送。mobileprovision里没有apns相关的东西，而配置了以下内容 可能会被拒。
  ```xml
  <config desc="" type="ENTITLEMENTS">
      <entitlement type="apns"></entitlement>
  </config>
  ```

- 其中`"ENTITLEMENTS"`和`"apns"`均为定值