[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
## 1.1、说明
提供聊天输入相关的功能,集成了表情、拍照、从相册选取图片等分享功能,只需简单的widget配置即可实现自定义表情集和分享选项内容。
## 1.2、UI展示

## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=451_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

>### open 打开聊天输入

`uexChatKeyboard.open(viewInfo) `  

**说明:**

   在界面的底部打开聊天输入框界面

**参数: ** 

```
var viewInfo={
    "emojicons":,//(必选)自定义表情配置文件的widget路径
    "shares":,//(必选)自定义分享选项配置文件的widget路径
    "placeHold":,//(可选)输入框提示语
    "touchDownImg": ,//(可选)录音按钮按下时提示控件的背景
    "dragOutsideImg": ,//(可选)按下录音按钮后滑动到录音范围之外时提示控件的背景
    "textColor": ,//(可选)录音时间文字颜色
    "textSize": ,//(可选)录音时间文字大小
    "sendBtnbgColorUp": ,//(可选)发送按钮正常时控件的背景
    "sendBtnbgColorDown": ,//(可选)发送按钮按下时控件的背景
    "sendBtnText": ,//(可选)发送按钮展示文字
    "sendBtnTextSize": ,//(可选)发送按钮文字大小
    "sendBtnTextColor": ,//(可选)发送按钮文字颜色
    "keywords": ['','',''....],//(可选)输入监听关键字(字符串数组)
    "inputMode"://(可选) 输入框默认输入方式,0-文字输入；1-语音输入。默认为0。
}
```

>参数emojicons的自定义表情配置文件为:"res://emojicons/emojicons.xml"[widget路径](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "widget路径"),详细配置步骤:

1、在widget的wgtRes目录下创建emojicons目录；
2、在emojicons中放入表情以及删除的图片资源,表情的默认命名格式:
ace_emoji_1,删除的默认命名格式:ace_emoji_delete.png；
3、在emojicons中创建emojicons.xml文件,格式如下:

```
<?xml version="1.0" encoding="utf-8"?>
<emojicons delete="ace_emoji_delete.png ">
   <key>[微笑]</key>
   <string> ace_emoji_1.png</string>
   <key>[憋嘴]</key>
   <string> ace_emoji_2.png</string>
</emojicons>
```

* `delete`:删除对应的图片名；
* `key`:表情对应的文字；
* `string`:表情对应的图片名；
* 表情目录、图片名以及配置文件名都可以自定义命名,但是必须保
  证配置文件中的图片名与资源图片对应。

>参数shares的自定义分享选项配置文件为:"res://emojicons/emojicons.xml"[widget路径](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "widget路径"),详细配置步骤:

1、在widget的wgtRes目录下创建shares目录；
2、在shares中放入分享选项的图片资源,图片的默认命名格式:
ace_share_1；
3、在shares中创建shares.xml文件,格式如下:

~~~
<?xml version="1.0" encoding="utf-8"?>
<shares>
<key>拍照</key>
<string>ace_share_1.png</string>
<key>图片</key>
<string>ace_share_2.png</string>
<key>位置</key>
<string>ace_share_3.png</string>
</shares>
~~~

* `key`:分享选项显示的文字  
* `string`:分享选项对应的图片名说明;
* 分享目录、图片名以及配置文件名都可以自定义命名,但是必须保
  证配置文件中的图片名与资源图片对应。  

**平台支持: ** 

Android 2.2+  
iOS 6.0+    

**版本支持**

:  
    3.0.0+    

**示例:**

```
var jsonstr ={
    "emojicons": "res://emojicons/emojicons.xml",
    "shares": "res://shares/shares.xml",
    "placeHold": "请输入内容",
    "touchDownImg": "res://1.png",
    "dragOutsideImg": "res://2.png",
    "textColor": "#FFF",
    "textSize": "15.5",
    "sendBtnbgColorUp": "#45C01A",
    "sendBtnbgColorDown": "#298409",
    "sendBtnText": "发送",
    "sendBtnTextSize": "15.5",
    "sendBtnTextColor": "#FFF",
    "keywords": ['@','☺','正益'],
    "inputMode":1
};
uexChatKeyboard.open(jsonstr);
```
>### close 关闭聊天输入 

 ` uexChatKeyboard.close() `


**说明:**

   

关闭聊天输入 


**参数:**

  无  

**平台支持: ** 

Android 2.2+  
iOS 6.0+  


**版本支持:**

  

3.0.0+  

**示例:**

```
uexChatKeyboard.close();
```

>### getInputBarHeight 获取输入工具条高度 

`uexChatKeyboard.getInputBarHeight();  `

**说明**

获取输入工具条高度 
通过回调[cbGetInputBarHeight](#cbGetInputBarHeight 获取输入工具条高度的回调方法)返回结果

**参数:**

无

**平台支持: ** 

Android 2.2+  
iOS 6.0+  


**版本支持:**

  

3.0.7+  

**示例:**

```
uexChatKeyboard.getInputBarHeight();
```

> ### hideKeyboard 收起键盘

`uexChatKeyboard.hideKeyboard()`

**说明:**

收起键盘。

**参数:**

```
无
```

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

Android 3.0.10+    
iOS 3.0.10+

**示例:**

```
    uexChatKeyboard.hideKeyboard();
```

> ### insertTextByKeyword 通过关键字插入内容

`uexChatKeyboard.insertTextByKeyword(jsonStr)`

**说明:**
通过关键字插入内容功能
例子:
@好友功能，收到`uexChatKeyboard.onInputKeyword`监听关键字@后，选择好友。选择完毕后调用此接口添加好友到关键字@后面,或替换原有@字符。

**参数:**

| 参数名称    | 参数类型   | 是否必选 | 说明               |
| ------- | ------ | ---- | ---------------- |
| jsonStr | String | 是    | 插入信息参数,json格式如下: |

```
var jsonStr  = {
    'keyword' : ,//关键字
    'insertText' : ,//插入的数据
    'isReplaceKeyword' : // 是否替换掉关键字,0:不替换;1:替换
     };
```
| 参数名称             | 参数类型   | 是否必选 | 说明                  |
| ---------------- | ------ | ---- | ------------------- |
| keyword          | String | 是    | 关键字                 |
| insertText       | String | 是    | 插入的数据               |
| isReplaceKeyword | Number | 是    | 是否替换掉关键字,0:不替换;1:替换 |
**平台支持:**
Android4.0+    
iOS7.0+

**版本支持:**

Android 3.0.10+
iOS 3.0.29+


**示例:**

```javascript
var params = {
  	keyword : '@',
	insertText : '@守望宝宝',
 	isReplaceKeyword : 1
};
uexChatKeyboard.insertTextByKeyword(JSON.stringify(params));
```

## 2.2、回调方法

>### cbGetInputBarHeight 获取输入工具条高度的回调方法

`uexChatKeyboard.cbGetInputBarHeight(data);  `

**说明**

getInputBarHeight获取输入工具条高度的回调方法

**参数:**

```
var data={
	"height":100
}
```

**平台支持: ** 

Android 2.2+  
iOS 6.0+  


**版本支持:**

  

iOS 3.0.4+
Android 3.0.7+  

示例

```
uexChatKeyboard.cbGetInputBarHeight = function(json) {
alert(json); 
}
```

## 2.3、监听方法

>### onCommit 完成输入的监听方法

`uexChatKeyboard.onCommit(data)`

**说明**

完成输入的监听方法

**参数: **
:

```  
var data={
    "emojiconsText": "[微笑] [憋嘴]"
}
```

**平台支持: ** 

Android 2.2+  
iOS 6.0+  


**版本支持:**

  

3.0.0+  

**示例**

```
uexChatKeyboard.onCommit = function(data){
alert(data);
}

```

>### onShareMenuItem 点击分享里选项的监听方法 

 

`uexChatKeyboard.onShareMenuItem(data)  `

**说明**

点击分享里选项的监听方法   

**参数: **

| 参数名称 | 参数类型   | 是否必选 | 说明          |
| ---- | ------ | ---- | ----------- |
| data | Number | 是    | 分享里各选项对应的位置 |


**平台支持: ** 

Android 2.2+  
iOS 6.0+  


**版本支持:**

  

3.0.0+  

**示例**

```
uexChatKeyboard.onShareMenuItem = function(data){
alert(data);
}

```

>### onVoiceAction 录音按钮的监听方法 

`uexChatKeyboard.onVoiceAction(data) `

**说明**

 

录音按钮的监听方法 

**参数:**

- JSON 字符串,内部字段: 

```
var data={
    "status":,//录音按钮的状态,0-----开始录音,1-----录音完成,-1-----取消录音
}

```

**平台支持: ** 

Android 2.2+  
iOS 6.0+  


**版本支持:**

  3.0.0+  

**示例**

```
uexChatKeyboard.onVoiceAction = function(data){
var json = JSON.parse(data);
alert(json.status);
    //alert(data);
}
```

> ### onKeyBoardShow 键盘弹出或收起时的监听方法

`uexChatKeyboard.onKeyBoardShow(json)`

**参数:**

```
var json = {
    status:
}
```

| 参数名称   | 参数类型   | 是否必选 | 说明               |
| ------ | ------ | ---- | ---------------- |
| status | Number | 是    | 键盘状态  0-收起  1-弹出 |

**平台支持:**
Android2.2+    
iOS6.0+

**版本支持:**

Android 3.0.10+
iOS 3.0.10+

**示例:**

```
function onKeyBoardShow(data) {
    alert(data);
}
window.uexOnload = function(){
    uexChatKeyboard.onKeyBoardShow = onKeyBoardShow;
}
```

> ### onCommitJson 点击发送的监听方法

`uexChatKeyboard.onCommitJson(json)`

**参数:**
| 参数名称 | 参数类型 | 是否必选 | 说明           |
| ---- | ---- | ---- | ------------ |
| json | JSON | 是    | 回调数据json格式如下 |

```
var json = {
    emojiconsText:,//输入框里的内容
    insertTexts:[//插入过的关键字
                    {
                            insertText:,//插入的内容
                            insertTextColor:,//插入内容的颜色
                            start:,//插入的内容开始位置
                            end:,//插入的内容结束位置
                    },
                    ...
                    ]
}
```

| 参数名称            | 参数类型   | 是否必选 | 说明        |
| --------------- | ------ | ---- | --------- |
| emojiconsText   | String | 是    | 输入框里的内容   |
| insertTexts     | Array  | 是    | 插入过的关键字数组 |
| insertText      | String | 是    | 插入的内容     |
| insertTextColor | String | 是    | 插入内容的颜色   |
| start           | String | 是    | 插入的内容开始位置 |
| end             | String | 是    | 插入的内容结束位置 |

**平台支持:**
Android2.2+    
iOS6.0+

**版本支持:**

Android 3.0.10+
iOS 3.0.10+

**示例:**

```
function onCommitJson(data) {
    alert(data);
}
window.uexOnload = function(){
    uexChatKeyboard.onCommitJson = onCommitJson;
}
```

> ### onInputKeyword 编辑框输入监测的关键字之后的监听方法

`uexChatKeyboard.onInputKeyword(json)`

**参数:**
| 参数名称 | 参数类型          | 是否必选 | 说明           |
| ---- | ------------- | ---- | ------------ |
| json | JSON String类型 | 是    | 回调数据json格式如下 |

```
var json = {
    keyword:,//触发的关键字
}
```
| 参数名称    | 参数类型   | 是否必选 | 说明     |
| ------- | ------ | ---- | ------ |
| keyword | String | 是    | 触发的关键字 |

**平台支持:**
Android4.0+    
iOS7.0+

**版本支持:**

Android 3.0.10+
iOS 3.0.20+

**示例:**

```javascript

window.uexOnload = function(){
    uexChatKeyboard.onInputKeyword = function(json) {
    	var keyword = JSON.parse(json).keyword;
    	if(keyword == '@'){
      		var params = {
 	 			keyword : '@',
   				insertText : '@守望宝宝',
 				isReplaceKeyword : 1
			};
        	uexChatKeyboard.insertTextByKeyword(JSON.stringify(params));
    	}
	}
}
```

# 3、更新历史

### iOS

API版本:`uexChatKeyboard-3.0.24`

最近更新时间:`2016-2-16`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
| 3.0.24 | 修改键盘+号切换异常,修改发送按钮自定义                     |
| 3.0.23 | 修改发送消息遮挡、修改录音从0开始                        |
| 3.0.22 | 修改回调对象引用类型                               |
| 3.0.21 | 添加IDE支持                                  |
| 3.0.20 | 修改键盘弹出时页面弹动                              |
| 3.0.19 | 修复确定按钮背景图异常的bug                          |
| 3.0.18 | 修复自定义功能按钮和表情按钮重新打开会弹出键盘的bug              |
| 3.0.17 | 修改收回键盘遮挡数据                               |
| 3.0.16 | 修改点击发送不收回键盘                              |
| 3.0.15 | 修复messageShareView可能会遮住文字的bug            |
| 3.0.14 | 修复插入表情时默认插入到最后的问题,修复在iPhone6 Plus上的显示问题  |
| 3.0.13 | 修复finishWidget时的崩溃问题,修复长按输入框显示放大镜时可以看见表情按钮的问题 |
| 3.0.12 | 修复关闭输入法后窗口显示不正常的bug                      |
| 3.0.11 | 修复一个在iOS9下可能导致APP崩溃的bug                  |
| 3.0.10 | open接口新增参数inputMode默认输入方式                |
| 3.0.9  | 修复直接输入表情时输入框变形问题.修复联系点击录音按钮录音提示无法关闭问题    |
| 3.0.8  | 修复输入内容过多时的显示问题                           |
| 3.0.7  | 新增方法onCommitJson回调,onCommit方法保持不变        |
| 3.0.6  | onCommit直接回调json对象,新增方法changeWebViewFrame |
| 3.0.5  | 新增API:隐藏键盘                               |
| 3.0.4  | 新增API:获取键盘高度                             |
| 3.0.3  | open方法参数改为json类型,可以设置默认文字,自定义语音输入时的提示框   |
| 3.0.2  | 修复语音提示图片不显示的问题                           |
| 3.0.1  | onCommit接口的参数使用json格式                    |
| 3.0.0  | EUExChatKeyboard插件                       |

### Android

API版本:`uexChatKeyboard-3.0.15`

最近更新时间:`2016-5-10`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
| 3.0.15 | 解决某些机型收不到getInputBarHeight回调的问题          |
| 3.0.14 | 修复部分机型显示不全的问题,修复关闭白屏问题,修复部分机型屏幕宽度获取不对的问题,修复键盘遮蔽问题有时候页面推动过多的问题 |
| 3.0.13 | 优化点击非键盘区域收回键盘时的判断机制,代码逻辑调整优化.            |
| 3.0.12 | 修正键盘弹出效果,修正声音相关回调问题,修正关闭崩溃错误,添加自定义参数,部分代码优化 |
| 3.0.11 | 去掉LocalActivityManager                   |
| 3.0.10 | open接口新增参数inputMode默认输入方式                |
| 3.0.9  | 修改EditText和webview中的输入框抢焦点问题             |
| 3.0.8  | 添加收回键盘接口;添加键盘状态的回调接口;部分代码的逻辑优化;添加onCommitJson回调,解决输入特殊字符的问题; |
| 3.0.7  | 添加获取输入框高度的接口                             |
| 3.0.6  | 修复点击表情,再点击空白区域,再点击输入框时撑满屏幕的问题            |
| 3.0.5  | 修复点击输入框再点击物理返回键,直接退出插件问题                 |
| 3.0.4  | 修改open接口                                 |
| 3.0.3  | 修复插件关闭时系统键盘还显示问题                         |
| 3.0.2  | 修复第二次打开界面空指针问题                           |
| 3.0.1  | clean函数中调用close方法                        |
| 3.0.0  | ChatKeyboard插件基础版                        |
