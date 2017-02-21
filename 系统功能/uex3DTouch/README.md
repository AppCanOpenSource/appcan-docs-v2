[TOC]

# 1､简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

3D Touch 插件
## 1.1､说明

* 可以通过此插件来实现3D Touch相关功能
* shortcut 请先阅读[术语表-shortcut](#shortcut)
* **如果用户需要设置静态shortcut,或者需要在shortcut里设置自定义图标,则需要自定义插件**.具体自定义的方法见附录.

## 1.2､开源源码
[点击](http://plugin.appcan.cn/details.html?id=511_pluginlist)至插件详情页(插件测试用例与插件源码已经提供)


## 1.3､平台版本支持

本插件的所有API默认只支持**iOS9.0+**操作系统,**不支持Android**.

有特殊版本要求的API会在文档中额外说明.

## 1.4､接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.


#2､ API预览

##2.1､ 方法

### 🍭 setDynamicShortcutItems 设置动态shortcut

`uex3DTouch.setDynamicShortcutItems(itemArray)`

**说明**

* 请先阅读[术语表-shortcut](#shortcut)以了解什么是动态shortcut
* 可以通过此方法来设置APP的动态shortcut
* 每次调此API,将会清空之前设置的动态shortcut
* 相关方法[onLoadByShortcutClickEvent 程序被点击3DTouch Shortcut调起的监听方法](#onLoadByShortcutClickEvent 程序被点击3DTouch Shortcut调起的监听方法)

**参数**

| 参数名称      | 参数类型   | 是否必选 | 说明                                       |
| --------- | ------ | ---- | ---------------------------------------- |
| itemArray | String | 是    | list\<shortcutItem\>,由shortcutItem结构组成数组转换而成的json字符串,shortcutItem形式见下: |

```javascript
var shortcutItem={
	type:,
	title:,
	subtitle:,
	iconType:,
	iconFile:,
	info:
}
```

各字段含义如下:

| 字段名称     | 类型     | 是否必选 | 说明                        |
| -------- | ------ | ---- | ------------------------- |
| type     | String | 是    | 任意字符串,作为此shortcut的唯一标识符使用 |
| title    | String | 是    | 标题                        |
| subtitle | String | 否    | 子标题                       |
| iconType | String | 否    | 系统图标类型                    |
| iconFile | String | 否    | 自定义图标文件名                  |
| info     | Object | 否    | 预设信息                      |

* 关于图标
  * 仅设置iconType时会显示系统图标,具体iconType的值请参考[术语表-shortcutIconTypes](#shortcutIconTypes)
  * 设置iconFile时会显示自定义图标,此时iconType的值会被忽略
  * iconType和iconType都没设置或者设置失败时,不会显示图标
* 关于预设信息
  * 以key - value形式储存一些开发者自己定义的字符串
  * 这些信息会在用户点击此shortcut时回调给网页



**示例**

```javascript
var data=[
	{
		type:"dynamic1",
		title:"testTitle1",
		subtitle:"subtitle1",
		iconType:"UIApplicationShortcutIconTypeMail",
		info:{
			key1:"value1",
			key2:"value2"
		}
                  
	},
   {
		type:"dynamic2",
		title:"testTitle2",
		subtitle:"subtitle2",
		iconFile:"b.png",
		info:{
		key3:"value3",
		key4:"value4"
		}
	}               
];
         
uex3DTouch.setDynamicShortcutItems(JSON.stringify(data));
```

##2.2､监听方法

### 🍭 onLoadByShortcutClickEvent 程序被点击3DTouch Shortcut调起的监听方法

`  uex3DTouch.onLoadByShortcutClickEvent(data)`

**说明:**

* 本监听直接回调给**ROOT页面**

**参数:**

| 参数名称 | 参数类型   | 说明             |
| ---- | ------ | -------------- |
| data | String | json格式数据,形式见下: |

```javascript
var data = {
	type:,
	status:,
	info:
}	
```

各字段含义如下:

| 字段名称   | 类型     | 说明                             |
| ------ | ------ | ------------------------------ |
| type   | String | 唯一标识符                          |
| status | Number | APP被唤醒的方式  0-APP被打开 1-APP从后台恢复 |
| info   | Object | 预设信息                           |


**示例:**


```javascript
uex3DTouch.onLoadByShortcutClickEvent = function(data){
	alert(data);
}
```

#3､术语表

### 🍭 shortcut

#### 概要

* 当APP在支持3D Touch的iOS设备上,通过用力长按主屏幕上的app图标,可以弹出一个菜单.
* **菜单至多有四项**,每一项,既是一个shortcut
* 用户可以点击shortcut以打开或者从后台唤醒应用
* 当通过此方式打开应用时,APP可以获取到被点击的shortcut相关信息
* 通过针对这些信息进行不同的处理,APP可以实现快速打开指定页面的功能(比如微信,实现了直接打开"扫一扫"界面的功能)

#### 静态shortcut和动态shortcut
* shortcut分2种,静态shortcut和动态shortcut
* 静态shortcut
  * 不可通过应用内部的API更改
  * 储存在应用的配置文件中,因此在用户安装应用后即可直接使用
  * 优先级高
* 动态shortcut
  * 可以通过接口在应用内部修改
  * 在应用内设置并储存,因此至少要打开一次应用,才能设置并使用
  * 优先级低
* 优先级
  * 优先级高的shortcut会排在菜单前列
  * 由于菜单只容许至多4个shortcut,因此其他设置的shortcut将无效
  * 比如,若你设置了3个静态shortcut和2个动态shortcut,那么第二个动态shortcut将不会被显示

### 🍭 shortcutIconTypes

* iOS 系统内部预设了一些shortcut图标供开发者使用,详见下表
* 具体图标样式参见[苹果官方文档](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIApplicationShortcutIcon_Class/index.html#//apple_ref/swift/enum/c:@E@UIApplicationShortcutIconType),搜索相应的shortcutIconType关键字即可看到
* 在设置系统图标时,直接传shortcutIconType关键字即可.
* 比如想要设置某个动态shortcut的图标为系统的邮箱图标,则iconType应传值`"UIApplicationShortcutIconTypeMail"`

| shortcutIconType关键字                      | 图标说明 | 备注          |
| ---------------------------------------- | ---- | ----------- |
| UIApplicationShortcutIconTypeCompose     | 评论   |             |
| UIApplicationShortcutIconTypePlay        | 播放   |             |
| UIApplicationShortcutIconTypePause       | 暂停   |             |
| UIApplicationShortcutIconTypeAdd         | 添加   |             |
| UIApplicationShortcutIconTypeLocation    | 定位   |             |
| UIApplicationShortcutIconTypeSearch      | 搜索   |             |
| UIApplicationShortcutIconTypeShare       | 分享   |             |
| UIApplicationShortcutIconTypeProhibit    | 禁止   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeContact     | 联系人  | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeHome        | 主页   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeMarkLocation | 定位标注 | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeFavorite    | 收藏   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeLove        | 喜欢   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeCloud       | 云    | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeInvitation  | 下载   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeConfirmation | 确定   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeMail        | 邮件   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeMessage     | 消息   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeDate        | 日期   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeTime        | 事件   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeCapturePhoto | 照片   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeCaptureVideo | 视频   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeTask        | 任务   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeTaskCompleted | 任务完成 | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeAlarm       | 闹钟   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeBookmark    | 图书   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeShuffle     | 乱序   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeAudio       | 声音   | 仅iOS 9.1+支持 |
| UIApplicationShortcutIconTypeUpdate      | 升级   | 仅iOS 9.1+支持 |

#4､更新历史

### iOS

API版本: `uex3DTouch-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 3DTouch 功能插件 |

### Android

**暂不支持!**

#5､附录

###如何自定义shortcut图标(自定义插件)

* APP可以不使用iOS系统的内置图标,改用自己定义的图标,比如微信的"扫一扫"对应的二维码图标
* 自定义图标要求
  * 分辨率为35*35 单位:像素
  * 正方形
  * 单色(透明和非透明)
* 实际使用时,iOS系统会对自定义图标文件进行处理,丢掉所有的色彩信息,然后把透明度为1(100%)的像素设置为黑色,透明度<1的像素设置为透明色
* 因此,若你的图片文件没有alpha通道(比如.jpg),图标将会变成纯黑色的方块.
* 建议图标格式:.png
* **开发者需自定义插件,把图标文件放到插件目录下的uex3DTouchGroup文件夹中,才能被APP所使用**
* 使用方式,在设置shortcut时设置iconFile参数,传值为文件名,如`"b.png"`

### 如何设置静态shortcut(自定义插件)

* **开发者需要自定义插件,编辑插件目录下的uex3DTouch.plist文件,完成静态shortcut的设置**
* 在`<key>UIApplicationShortcutItems</key>`对应的`<array></array>`标签内,添加静态shortcut对应的字典结构ShortcutDict
* 每一个ShortcutDict对应一个静态shortcut,靠前的静态shortcut会排在菜单前列
* 具体的ShortcutDict结构,可参考如下例子

```
<dict>
		<!-----必填,设置shortcut的title 值为任意字符串----->	
		<key>UIApplicationShortcutItemTitle</key>   
		<string>page2</string>
		
		<!-----必填,设置shortcut的type 值为任意字符串----->
		<key>UIApplicationShortcutItemType</key>
		<string>shortcut2</string>
		
		<!----- 以下皆为可选参数,可以不写----->
		
		<!-----设置shortcut的subtitle 值为任意字符串----->
		<key>UIApplicationShortcutItemSubtitle</key>
		<string>subtitle2</string>
		
		<!-----设置shortcut的iconType 值为shortcutIconType关键字----->
		<key>UIApplicationShortcutItemIconType</key>
		<string>UIApplicationShortcutIconTypeLove</string>
		
		<!-----设置shortcut的iconFile 值为图标文件名 设置此参数时,iconType无效----->
		<key>UIApplicationShortcutItemIconFile</key>
		<string>a.png</string>
		
		<!-----设置shortcut的info 值为任意字符串键值对----->
		<key>UIApplicationShortcutItemUserInfo</key>
		<dict>
			<key>key1</key>
			<string>value1</string>
			<key>key2</key>
			<string>value2</string>
		</dict>

</dict>
```

* 其中
  * `<!-----   ----->`内为注释,实际使用时不用写
  * `<key>UIApplicationShortcutItemXXX</key>`为系统规定的key值,不可修改
  * `<key>UIApplicationShortcutItemUserInfo</key>`对应的dict内,为自定义info字典,key值可任意命名
  * 所有的`<string></string>`请按注释要求设置
* 再给几个栗子以供参考⬇️⬇️⬇️

**仅有一个搜索标题,最简单的ShortcutDict**

```
<dict>
	<key>UIApplicationShortcutItemTitle</key>   
	<string>搜索</string>
	<key>UIApplicationShortcutItemType</key>
	<string>此shortcut的唯一标识符</string>
</dict>
```

**使用系统图标,并拥有子标题的ShortcutDict**

```
<dict>
	<key>UIApplicationShortcutItemTitle</key>   
	<string>搜索</string>
	<key>UIApplicationShortcutItemType</key>
	<string>此shortcut的唯一标识符</string>
	<key>UIApplicationShortcutItemSubtitle</key>
	<string>搜索的子标题</string>
	<key>UIApplicationShortcutItemIconType</key>
	<string>UIApplicationShortcutIconTypeSearch</string>
</dict>
```

**使用自定义图标,并包含额外信息的ShortcutDict**

```
<dict>
	<key>UIApplicationShortcutItemTitle</key>   
	<string>搜索</string>
	<key>UIApplicationShortcutItemType</key>
	<string>此shortcut的唯一标识符</string>
	<key>UIApplicationShortcutItemIconFile</key>
	<string>search.png</string>
	<key>UIApplicationShortcutItemUserInfo</key>
	<dict>
		<key>pageName</key>
		<string>search.html</string>
		<key>searchKey</key>
		<string>搜一搜</string>
	</dict>
</dict>
```

