[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
## 1.1、说明
提供聊天输入相关的功能，集成了表情、拍照、从相册选取图片等分享功能，只需简单的widget配置即可实现自定义表情集和分享选项内容。
## 1.2、UI展示

## 1.3、开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=451_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

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
    "inputMode"://(可选) 输入框默认输入方式，0-文字输入；1-语音输入。默认为0。
}
```


自定义表情的配置文件配置步骤：

1. 在widget的wgtRes目录下创建emojicons目录；

2. 在emojicons中放入表情以及删除的图片资源，表情的默认命名格式：
ace_emoji_1，删除的默认命名格式：ace_emoji_delete.png；

3. 在emojicons中创建emojicons.xml文件，格式如下：

```
<?xml version="1.0" encoding="utf-8"?>
<emojicons delete="ace_emoji_delete.png ">
   <key>[微笑]</key>
   <string> ace_emoji_1.png</string>
   <key>[憋嘴]</key>
   <string> ace_emoji_2.png</string>
</emojicons>
```

* `delete`：删除对应的图片名；
* `key`：表情对应的文字；
* `string`：表情对应的图片名；
* 表情目录、图片名以及配置文件名都可以自定义命名，但是必须保
证配置文件中的图片名与资源图片对应。

自定义分享选项的配置文件配置步骤:

1. 在widget的wgtRes目录下创建shares目录；
2. 在shares中放入分享选项的图片资源，图片的默认命名格式：
ace_share_1；
3. 在shares中创建shares.xml文件，格式如下：

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

* `key`：分享选项显示的文字  
* `string`：分享选项对应的图片名说明;
* 分享目录、图片名以及配置文件名都可以自定义命名，但是必须保
证配置文件中的图片名与资源图片对应。  
  
**平台支持: ** 

Android 2.2+  
iOS 6.0+    

**版本支持**：  
    3.0.0+    

**示例:**

```
var jsonstr =
'{
    "emojicons": "res://emojicons/emojicons.xml",
    "shares": "res://shares/shares.xml",
    "placeHold": "请输入内容",
    "touchDownImg": "res://1.png",
    "dragOutsideImg": "res://2.png",
    "textColor": "#FFF",
    "textSize": "15.5",
    "inputMode":1
}';
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
  
**版本支持：**  

3.0.0+  

**示例:**

```
uexChatKeyboard.close();
```  

>### getInputBarHeight 获取输入工具条高度 
 
`uexChatKeyboard.getInputBarHeight();  `

**说明**

获取输入工具条高度 
通过回调[cbGetInputBarHeight](#getInputBarHeight 获取输入工具条高度)返回结果

**参数:**

无

**平台支持: ** 

Android 2.2+  
iOS 6.0+  
  
**版本支持：**  

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

**版本支持：**
Android 3.0.10+    
iOS 3.0.10+

**示例:**
```
    uexChatKeyboard.hideKeyboard();
```

> ### changeWebViewFrame 改变webview的高度以适应弹出的键盘

`uexChatKeyboard.changeWebViewFrame(height)`

**说明:**
收到 onKeyBoardShow回调，并且status为1时调用这个方法传入当前div的高度，键盘会根据高度将聊天内容推上去

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| height| Number | 是 | div的高度 |

**平台支持:**
iOS6.0+

**版本支持：**
iOS 3.0.10+

**示例:**
```
uexChatKeyboard.changeWebViewFrame(600);
```

## 2.2、回调方法

>### cbGetInputBarHeight 获取输入工具条高度的回调方法
 
`uexChatKeyboard.cnGetInputBarHeight(data);  `

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
  
**版本支持：**  

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
：

```  
var data={
    "emojiconsText": "[微笑] [憋嘴]"
}
```

**平台支持: ** 

Android 2.2+  
iOS 6.0+  
  
**版本支持：**  

3.0.0+  

**示例**

```
uexChatKeyboard.onCommit = function(data){
alert(data);
}

```

>### onShareMenuItem 点击分享里选项的监听方法 

 

`uexChatKeyboard. onShareMenuItem (data)  `


**说明**

点击分享里选项的监听方法   
  
**参数: **

|参数名称 | 参数类型| 是否必选|  说明 |
| ------------ | ------------ | ------------ | ------------ |
| data| Number | 是 | 享里各选项对应的位置 |


  
**平台支持: ** 

Android 2.2+  
iOS 6.0+  
  
**版本支持：**  

3.0.0+  

**示例**

```
uexChatKeyboard.onShareMenuItem = function(data){
alert(data);
}

```

>### onVoiceAction 录音按钮的监听方法 
 
`uexChatKeyboard. onVoiceAction (data) `

**说明** 

录音按钮的监听方法 

**参数:**  
 
```
var data={
    "status":,//录音按钮的状态，0--开始录音，1--录音完成，-1--取消录音
}

```


**平台支持: ** 

Android 2.2+  
iOS 6.0+  
  
**版本支持：**  

3.0.0+  

**示例**

```
uexChatKeyboard.onVoiceAction = function(data){
    alert(data);
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

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| status | Number | 是 | 键盘状态  0-收起  1-弹出 |

**支持平台:**
Android2.2+    
iOS6.0+

**版本支持：**
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
```
var json = {
    emojiconsText:
}
```

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| emojiconsText | String | 是 | 输入框里的内容 |

**支持平台:**
Android2.2+    
iOS6.0+

**版本支持：**
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


# 3、更新历史
API 版本：uexChatKeyboard-3.0.15(iOS) uexChatKeyboard-3.0.11(Android)
最近更新时间：2015-11-23

| 历史发布版本 | iOS更新 | 安卓更新 |
| ------------ | ------------ | ------------ |
| 3.0.15 | 修复messageShareView可能会遮住文字的bug | |
| 3.0.14 | 修复插入表情时默认插入到最后的问题,修复在iPhone6 Plus上的显示问题 | |
| 3.0.13 | 修复finishWidget时的崩溃问题,修复长按输入框显示放大镜时可以看见表情按钮的问题 | |
| 3.0.12 | 修复关闭输入法后窗口显示不正常的bug | |
| 3.0.11 | 修复一个在iOS9下可能导致APP崩溃的bug | 去掉LocalActivityManager|
| 3.0.10 | open接口新增参数inputMode默认输入方式 | open接口新增参数inputMode默认输入方式|
| 3.0.9 | 修复直接输入表情时输入框变形问题.修复联系点击录音按钮录音提示无法关闭问题 | 修改EditText和webview中的输入框抢焦点问题|
| 3.0.8 | 修复输入内容过多时的显示问题 | 添加收回键盘接口;添加键盘状态的回调接口;部分代码的逻辑优化;添加onCommitJson回调,解决输入特殊字符的问题;|
| 3.0.7 | 新增方法onCommitJson回调，onCommit方法保持不变 | 添加获取输入框高度的接口|
| 3.0.6 | onCommit直接回调json对象,新增方法changeWebViewFrame | 修复点击表情，再点击空白区域，再点击输入框时撑满屏幕的问题|
| 3.0.5 | 新增API：隐藏键盘 | 修复点击输入框再点击物理返回键，直接退出插件问题|
| 3.0.4 | 新增API：获取键盘高度 | 修改open接口|
| 3.0.3 | open方法参数改为json类型,可以设置默认文字，自定义语音输入时的提示框 | 修复插件关闭时系统键盘还显示问题|
| 3.0.2 | 修复语音提示图片不显示的问题 | 修复第二次打开界面空指针问题|
| 3.0.1 | onCommit接口的参数使用json格式 | clean函数中调用close方法|
| 3.0.0 | EUExChatKeyboard插件 | ChatKeyboard插件基础版|




 



