[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
评论输入框插件

## 1.1、说明
 提供评论输入相关的功能,集成了表情输入功能,只需简单的widget配置即可实现自定义表情集
## 1.2、UI展示
![](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexInputTextFieldView/img/1.png)        ![](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexInputTextFieldView/img/2.png)

## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=452_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

> ### open 打开评论输入

`uexInputTextFieldView.open(json)`

**说明:**

打开评论输入

**参数**

```
var json = {
    "emojicons":,//emojicons.xml文件路径(详细说明见下)
    "placeHold":,//输入框提示语
}
```
>参数emojicons的自定义表情配置文件为:"res://emojicons/emojicons.xml",详细配置步骤:

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
*   delete:删除对应的图片名；
*   key:表情对应的文字；
*   string:表情对应的图片名
    * 说明:表情目录、图片名以及配置文件名都可以自定义命名,但是必须保证配置文件中的图片名与资源图片对应。

**平台支持**

Android 2.2+
iOS 6.1+

**版本支持**

Android 3.0.0+
iOS 3.0.0+

**示例**

```
var data ={
    emojicons: "res://emojicons/emojicons.xml",
    placeHold: "请输入内容"
};
var jsonStr = JSON.stringify(data)
uexInputTextFieldView.open(jsonStr);
```

> ### close 关闭评论输入

`uexInputTextFieldView.close()`

**说明:**

关闭评论输入

**参数**

```
无
```

**平台支持**

Android 2.2+
iOS 6.1+

**版本支持**

Android 3.0.0+
iOS 3.0.0+

**示例**

```
uexInputTextFieldView.close()
```

> ### setInputFocused 输入框自动获取焦点

`uexInputTextFieldView.setInputFocused()`

**说明:**

输入框自动获取焦点

**参数**

```
无
```

**平台支持**

Android 2.2+
iOS 6.1+

**版本支持**

Android 3.0.9+
iOS 3.0.4+

**示例**

```
uexInputTextFieldView.setInputFocused();
```

> ### changeWebViewFrame 改变webview的高度以适应弹出的键盘

`uexInputTextFieldView.changeWebViewFrame(height)`

**说明:**

收到 onKeyBoardShow回调,并且status为1时调用这个方法传入当前div的高度,键盘会根据高度将评论内容推上去

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明     |
| ------ | ------ | ---- | ------ |
| height | Number | 是    | div的高度 |

**平台支持:**

iOS6.0+

**版本支持:**

iOS 3.0.10+

**示例:**

```
uexInputTextFieldView.changeWebViewFrame(600);
```

>### getInputBarHeight 获取输入工具条高度 

`uexInputTextFieldView.getInputBarHeight();  `

**说明**

获取输入工具条高度 

**参数:**

无

**返回值：**

int类型

**平台支持:** 

Android 2.2+  
iOS 6.0+  


**版本支持:**  
3.0.7+  

**示例:**

```javascript
var result=uexInputTextFieldView.getInputBarHeight();
```

## 2.2、监听方法

> ### onCommit 点击评论按钮时的监听方法

`uexInputTextFieldView.onCommit(json)`

**说明**

使用此接口时,可能会出现json解析失败的情况,请使用[onCommitJson](http://newdocx.appcan.cn/newdocx/docx?type=1478_975#onCommitJson 点击发送的监听方法 "onCommitJson")方法

**参数**

```
var json = {
    emojiconsText://用户所输入内容
}
```

**平台支持**

Android 2.2+
iOS 6.1+

**版本支持**

Android 3.0.0+
iOS 3.0.0+

**示例**

```
uexInputTextFieldView.onCommit = function(data){
    alert(data);
}
```
> ### onCommitJson 点击发送的监听方法

`uexInputTextFieldView.onCommitJson(json)`

**参数:**

```
var json = {
emojiconsText:
}
```

| 参数名称          | 参数类型   | 是否必选 | 说明      |
| ------------- | ------ | ---- | ------- |
| emojiconsText | String | 是    | 输入框里的内容 |

**支持平台:**
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
uexInputTextFieldView.onCommitJson = onCommitJson;
}
```
> ### onKeyBoardShow 键盘弹出或收起时的监听方法

`uexInputTextFieldView.onKeyBoardShow(json)`

**参数:**

```
var json = {
status:
}
```

| 参数名称   | 参数类型   | 是否必选 | 说明               |
| ------ | ------ | ---- | ---------------- |
| status | Number | 是    | 键盘状态  0-收起  1-弹出 |

**支持平台:**
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
uexInputTextFieldView.onKeyBoardShow = onKeyBoardShow;
}
```

 

# 3、更新历史

### iOS

API版本:`uexInputTextFieldView-3.0.8`

最近更新时间:`2016-2-16`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
| 3.0.8  | 修改发送按钮自定义                                |
| 3.0.7  | 修复键盘弹出收回时显示头像图标页                         |
| 3.0.6  | 添加IDE支持                                  |
| 3.0.5  | 修改键盘弹出时页面弹动,修改键盘收回时遮挡评论                  |
| 3.0.4  | 点击空白处收回键盘,添加setInputFocused接口,添加changeWebViewFrame接口,修改输入单引号收不到信息 |
| 3.0.3  | open接口参数改为json类型,添加placehold参数,可以设置输入框里默认显示的文字 |
| 3.0.2  | 动画优化                                     |
| 3.0.1  | onCommit接口的参数使用json格式                    |
| 3.0.0  | EUExInputTextFieldView插件                 |

### Android

API版本:`uexInputTextFieldView-3.2.15`

最近更新时间:`2016-4-22`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |
| 3.2.15 | 修正白屏问题的解决逻辑,修复键盘遮蔽的有时候页面推动过多的问题          |
| 3.2.14 | 某些情况下可能出现白屏的问题                           |
| 3.2.13 | 解决有些机型上获取屏幕宽度不对的问题                       |
| 3.2.12 | 修改兼容性问题,添加getInputBarHeight接口以及onCommitJson和onKeyBoardShow,cbGetInputBarHeight的回调,调整优化代码逻辑,解决键盘遮蔽问题 |
| 3.2.11 | 修复关闭输入框时,键盘未自动收起的问题                      |
| 3.0.10 | 去掉插件中的ActivityGroup,配合引擎升级               |
| 3.0.9  | 增加输入框自动获取焦点接口                            |
| 3.0.8  | 修改EditText和webview中的输入框抢焦点的问题            |
| 3.0.7  | 修改open接口,可设置发送按钮颜色和按钮字体的颜色。              |
| 3.0.6  | 修改发送按钮为默认显示                              |
| 3.0.5  | 修复点击输入框再点击物理返回键,直接退出插件问题                 |
| 3.0.4  | 修改open接口                                 |
| 3.0.3  | 修复插件关闭时系统键盘还显示问题                         |
| 3.0.2  | 修复第二次打开界面空指针问题                           |
| 3.0.1  | clean函数中调用close方法                        |
| 3.0.0  | InputTextFieldView插件基础版                  |
