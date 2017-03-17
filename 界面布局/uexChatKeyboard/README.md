[TOC]
# 1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
## 1.1､说明
提供聊天输入相关的功能,集成了表情､拍照､从相册选取图片等分享功能,支持通过关键字插入内容如评论中@好友功能,只需简单的widget配置即可实现自定义表情集和分享选项内容｡具体配置使用详见各接口说明｡

**温馨提示:**

使用安卓版本插件时需要打包选择压缩模式,不适用于平移模式,如果个别页面需要使用平移模式,可以根据需要动态切换键盘模式,调用此[设置键盘模式](http://newdocx.appcan.cn/newdocx/docx?type=1251_1249#setKeyboardMode 设置键盘模式)接口｡
## 1.2､UI展示

## 1.3､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=451_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)



## 1.4､平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.  
有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.


# 2､API概览

## 2.1､方法

### 🍭 open 打开聊天输入

`uexChatKeyboard.open(viewInfo) `  

**说明:**

   在界面的底部打开聊天输入框界面

**参数: ** 

```javascript
var viewInfo={
    "emojicons":,
    "shares":,
    "placeHold":,
    "touchDownImg": ,
    "dragOutsideImg": ,
    "textColor": ,
    "textSize": ,
    "sendBtnbgColorUp": ,
    "sendBtnbgColorDown": ,
    "sendBtnText": ,
  	"maxLines":,
    "sendBtnTextSize": ,
    "sendBtnTextColor": ,
    "inputMode":,
    "keywords":,
}
```

各字段含义如下:

| 字段名称               | 类型     | 是否必选 | 说明                            |
| ------------------ | ------ | ---- | ----------------------------- |
| emojicons          | String | 是    | 自定义表情配置文件的路径res协议,详见配置如下      |
| shares             | String | 是    | 自定义分享选项配置文件的路径res协议,详见配置如下    |
| placeHold          | String | 否    | 输入框提示语                        |
| touchDownImg       | String | 否    | 录音按钮按下时提示控件的背景                |
| dragOutsideImg     | String | 否    | 按下录音按钮后滑动到录音范围之外时提示控件的背景      |
| textColor          | String | 否    | 录音时间文字颜色                      |
| textSize           | Number | 否    | 录音时间文字大小                      |
| sendBtnbgColorUp   | String | 否    | 发送按钮正常时控件的背景                  |
| sendBtnbgColorDown | String | 否    | 发送按钮按下时控件的背景                  |
| sendBtnText        | String | 否    | 发送按钮展示文字                      |
| sendBtnTextSize    | Number | 否    | 发送按钮文字大小                      |
| sendBtnTextColor   | String | 否    | 发送按钮文字颜色                      |
| inputMode          | Number | 否    | 输入框默认输入方式,0-文字输入;1-语音输入.默认为0. |
| keywords           | Array  | 否    | 要监听的输入关键字,是由字符串构成的数组.默认为空数组   |
| maxLines           | Number | 否    | 输入框的最大行数                      |
参数emojicons的自定义表情配置文件为:"res://emojicons/emojicons.xml"[res协议路径](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "res协议路径"),详细配置步骤:

1､在widget的wgtRes目录下创建emojicons目录;
2､在emojicons目录中放入表情以及删除的图片资源,表情的默认命名格式:
ace_emoji_1,删除的默认命名格式:ace_emoji_delete.png;
3､在emojicons中创建emojicons.xml文件,格式如下:

```
<?xml version="1.0" encoding="utf-8"?>
<emojicons delete="ace_emoji_delete.png ">
   <key>[微笑]</key>
   <string> ace_emoji_1.png</string>
   <key>[憋嘴]</key>
   <string> ace_emoji_2.png</string>
</emojicons>
```

* `delete`:删除对应的图片名;
* `key`:表情对应的文字;
* `string`:表情对应的图片名;
* 表情目录､图片名以及配置文件名都可以自定义命名,但是必须保
  证配置文件中的图片名与资源图片对应.

>参数shares的自定义分享选项配置文件为:"res://emojicons/emojicons.xml"[res协议路径](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "res协议路径"),详细配置步骤:

1､在widget的wgtRes目录下创建shares目录;
2､在shares中放入分享选项的图片资源,图片的默认命名格式:
ace_share_1;
3､在shares中创建shares.xml文件,格式如下:

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
* 分享目录､图片名以及配置文件名都可以自定义命名,但是必须保
  证配置文件中的图片名与资源图片对应.  


**示例:**

```
var json = {
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
    "inputMode":1,
    "keywords": ["@"]
};
uexChatKeyboard.open(JSON.stringify(json));
```
### 🍭 close 关闭聊天输入 

 ` uexChatKeyboard.close() `


**说明:**

关闭聊天输入 

**参数:**

  无  

**示例:**

```
uexChatKeyboard.close();
```

### 🍭 getInputBarHeight 获取输入工具条高度 

`uexChatKeyboard.getInputBarHeight();  `

**说明**

获取输入工具条高度 

**参数:**

无

**返回值:**

Number类型,工具条高度.

**示例:**

```javascript
var result = uexChatKeyboard.getInputBarHeight();
alert(result);
```

### 🍭 hideKeyboard 收起键盘

`uexChatKeyboard.hideKeyboard()`

**说明:**

收起键盘.

**参数:**

```
无
```

**示例:**

```
    uexChatKeyboard.hideKeyboard();
```

### 🍭 changeWebViewFrame 改变webview的高度以适应弹出的键盘

`uexChatKeyboard.changeWebViewFrame(height)`

**说明:**

当收到 [onKeyBoardShow](#onKeyBoardShow 键盘弹出或收起时的监听方法 "onKeyBoardShow")回调,并且status为1时调用这个方法传入当前div内容的高度,键盘会根据高度将聊天内容推上去

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明     |
| ------ | ------ | ---- | ------ |
| height | Number | 是    | div的高度 |

**平台支持:**

iOS7.0+


**示例:**

```
uexChatKeyboard.changeWebViewFrame(600);
```

### 🍭 insertTextByKeyword 通过关键字插入内容


`uexChatKeyboard.insertTextByKeyword(jsonStr)`

**说明:**
通过关键字插入内容功能｡调用此接口之前需要在open方法中设置参数keywords来监听关键字(例如:@),监听方法[uexChatKeyboard.onInputKeyword](#onInputKeyword 编辑框输入监测的关键字之后的监听方法 "uexChatKeyboard.onInputKeyword")
例子:
@好友功能,收到关键字“@”的监听[uexChatKeyboard.onInputKeyword](#onInputKeyword编辑框输入监测的关键字之后的监听方法"uexChatKeyboard.onInputKeyword")之后,选择好友｡选择完毕后调用此接口添加好友到关键字@后面,或替换原有@字符｡

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

**示例:**

```javascript
var params = {
  	keyword : '@',
	insertText : '@守望宝宝',
 	isReplaceKeyword : 1
};
uexChatKeyboard.insertTextByKeyword(JSON.stringify(params));
```



### 🍭 setText 设置输出框的文字

`uexChatKeyboard.setText(text);  `

**说明**

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明    |
| ---- | ------ | ---- | ----- |
| text | String | 是    | 输入框文字 |

**返回值:**

Boolean类型,是否设置成功

**示例:**

```javascript
var result = uexChatKeyboard.setText("文字");
alert(result);
```

### 🍭 getText 获取输出框的文字

`uexChatKeyboard.getText();  `

**说明**

**参数:**

无

**返回值:**

String类型,输入框的文字

**示例:**

```javascript
var result = uexChatKeyboard.getText();
alert(result);
```

### 

## 2.2､监听方法

### 🍭 onCommit 完成输入的监听方法

`uexChatKeyboard.onCommit(data)`

**说明**

完成输入的监听方法

**参数:**

```  
var data={
    "emojiconsText": 
}
```

| 参数名称          | 参数类型   | 是否必选 | 说明      |
| ------------- | ------ | ---- | ------- |
| emojiconsText | String | 是    | 输入框里的内容 |

**示例**

```
uexChatKeyboard.onCommit = function(data){
    alert(data);
}
```

### 🍭 onShareMenuItem 点击分享里选项的监听方法 

`uexChatKeyboard. onShareMenuItem(data)  `

**说明**

点击分享里选项的监听方法   

**参数: **

| 参数名称 | 参数类型   | 是否必选 | 说明          |
| ---- | ------ | ---- | ----------- |
| data | Number | 是    | 分享里各选项对应的位置 |


**示例**

```
uexChatKeyboard.onShareMenuItem = function(data){
    alert(data);
}
```

### 🍭 onVoiceAction 录音按钮的监听方法 

`uexChatKeyboard. onVoiceAction(data) `

**说明**

 录音按钮的监听方法 

**参数:**

  

```
var data={
    "status":,//录音按钮的状态,0:开始录音,1:录音完成,-1:取消录音
}
```

**示例**

```
uexChatKeyboard.onVoiceAction = function(data){
    alert(data);
}
```

### 🍭 onKeyBoardShow 键盘弹出或收起时的监听方法

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


**示例:**

```
function onKeyBoardShow(data) {
    alert(data);
}
window.uexOnload = function(){
    uexChatKeyboard.onKeyBoardShow = onKeyBoardShow;
}
```

### 🍭 onFrameChanged 网页Frame变化的监听

`uexChatKeyboard.onFrameChanged(w,h)`

**说明：**

键盘弹出或收起，输入框行数变化时会触发此监听。可以用于解决内容被输入框覆盖问题。

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明        |
| ---- | ------ | ---- | --------- |
| w    | Number | 是    | 当前Frame宽度 |
| h    | Number | 是    | 当前Frame高度 |

**示例:**

```javascript
uexChatKeyboard.onFrameChanged=function(w,h){
    setTimeout(function (){window.scrollTo(0, document.body.scrollHeight);},20);
}
```

### 🍭 onCommitJson 点击发送的监听方法

`uexChatKeyboard.onCommitJson(json)`

**参数:**

```
var json = {
    emojiconsText:
}
```

| 参数名称          | 参数类型   | 是否必选 | 说明      |
| ------------- | ------ | ---- | ------- |
| emojiconsText | String | 是    | 输入框里的内容 |


**示例:**

```
function onCommitJson(data) {
    alert(data);
}
window.uexOnload = function(){
    uexChatKeyboard.onCommitJson = onCommitJson;
}
```

### 🍭 onInputKeyword 编辑框输入监测的关键字之后的监听方法

``uexChatKeyboard.onInputKeyword(json)`

**参数:**

| 参数名称 | 参数类型          | 是否必选 | 说明           |
| ---- | ------------- | ---- | ------------ |
| json | JSON Object类型 | 是    | 回调数据json格式如下 |

```
var json = {
    keyword:,//触发的关键字
}
```

| 参数名称    | 参数类型   | 是否必选 | 说明     |
| ------- | ------ | ---- | ------ |
| keyword | String | 是    | 触发的关键字 |



**示例:**

```javascript
window.uexOnload = function(){
    uexChatKeyboard.onInputKeyword = function(json) {
    	var keyword = json.keyword;
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

# 3､更新历史

### iOS

API版本: `uexChatKeyboard-4.0.1`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容                |
| ------ | ------------------- |
| 4.0.1  | 添加setText,getText接口 |
| 4.0.0  | EUExChatKeyboard插件  |

### Android

API版本: `uexChatKeyboard-4.0.2`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容               |
| ------ | ------------------ |
| 4.0.2  | 输入支持显示多行,修复平移模式bug |
| 4.0.1  | 添加setText接口        |
| 4.0.0  | 4.0                |
