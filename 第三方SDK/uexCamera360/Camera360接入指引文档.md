[TOC]

# Camera360接入指引文档

## 申请API Key
### 注册成为开发者
访问[Cameara360 SDK 官网](http://sdk.camera360.com/),注册成为开发者。
### 创建应用
注册完成之后，点击管理应用，如下图：

![管理应用](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%AC%AC%E4%B8%89%E6%96%B9SDK/uexCamera360/IMG/1.png)

点击创建新应用，如下图：

![创建应用](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%AC%AC%E4%B8%89%E6%96%B9SDK/uexCamera360/IMG/2.png)

#### Android
选择Android平台，填写完成对应信息如下图：

![Android应用](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%AC%AC%E4%B8%89%E6%96%B9SDK/uexCamera360/IMG/3.png)

注意此处包名是开发者在**在线打包**时生成的apk的包名。填写完成之后点击“立即创建”。
创建完成之后，点击管理应用，查看应用详情，如下图：

![Android应用](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%AC%AC%E4%B8%89%E6%96%B9SDK/uexCamera360/IMG/4.png)

其中的Key，即是所需的APIKey。点击复制可得到该值，然后[配置config](#Android)。

#### iOS
创建应用时选择iOS平台，填写完成对应信息如下图：

![Android应用](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%AC%AC%E4%B8%89%E6%96%B9SDK/uexCamera360/IMG/5.png)

填写完成之后点击“立即创建”。
创建完成之后，点击管理应用，查看应用详情，如下图：

![Android应用](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%AC%AC%E4%B8%89%E6%96%B9SDK/uexCamera360/IMG/6.png)

其中的Key，即是所需的APIKey。点击复制可得到该值，然后[配置config](#iOS)。


## config配置
### Android
`config.xml`文件的根标签下增加如下配置：
```
    <config desc="uexCamera360" type="KEY" > 
        <param platform="Android" name="$uexCamera360_APIKey$" value="您的Android应用APIKey"/>
    </config>
```
其中“您的Android应用APIKey”即是前面获取到Android应用的APIKey值。
### iOS
`config.xml`文件的根标签下增加如下配置：
```
    <config desc="uexCamera360" type="KEY" > 
        <param platform="iOS" name="$uexCamera360_APIKey$" value="您的iOS应用APIKey"/>
    </config>
```
其中“您的iOS应用APIKey”即是前面获取到iOS应用的APIKey值。

或者两者可合并写为:
```
    <config desc="uexCamera360" type="KEY" > 
        <param platform="iOS" name="$uexCamera360_APIKey$" value="您的iOS应用APIKey"/>
        <param platform="Android" name="$uexCamera360_APIKey$" value="您的Android应用APIKey"/>
    </config>
```