[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()

　 窗口对象。窗口对象是实现多窗口机制的基本单元。使用窗口对象构建Hybrid App，在性能方面更加接近Native App的体验。
AppCan平台中，维护了一个窗口堆栈，每个窗口以唯一的窗口名字来区别。窗口名字是 通过uexWindow.open来赋值的。然而有一个窗口是比较特殊的，即加载起始页的窗口，因为起始页是由 config.xml中配置的，无法进行窗口名的赋值，因此，AppCan对加载起始页的窗口统一命名为'root'，也就是说 ，其它通过uexWindow.open开启的窗口，不能再命名为'root'。

## 1.1  window.uexOnload
　 窗口加载完毕后平台将触发此方法。类比window.onload方法，都是html页面加载完成 之后触发的方法。区别是，window.uexOnload方法会晚于window.onload方法，原因是window.uexOnload需要等 待AppCan扩展对象，即'uex'前缀的对象初始化完毕。事件加载完成之后，可以安全的使用uex扩展对象。

## 1.2 浮动窗口
　 主窗口之上可以有多个浮动窗口，即浮动窗口是附属于某个主窗口的。主窗口关闭后， 其上所有浮动窗口也都会关闭。所有的窗口都有唯一的名字，通过uexWindow.open打开的是一个主窗口，浮动窗 口则通过uexWindow.openPopover创建。一个主窗口上的多个浮动窗口名字是唯一的，但不同主窗口上的浮动窗 口名字可以相同。浮动窗口可以有弹动效果，可以有数学变化：放大，旋转，移动等。浮动窗口能够解决的事情 很多，比如解决手机浏览器不支持局部DIV滚动, 上下拉刷新特效，抽屉特效等问题。

## 1.3多窗口之间的通讯
　 **窗口之间的通讯**，比如从网络获取一个数据，根据返回的数据，让其它窗口执行相应的 变化，这就需要用到窗口间通讯机制。
　 **主窗口之间通讯**: uexWindow.evaluateScript(winName, type, script)
　** 主窗口与浮动窗口之间通讯**: uexWindow.evaluateScript(winName, type, script);  uexWindow.evaluatePopoverScript(winName, type, script);
　 最后一个参数script，是目标窗口的执行脚本。脚本形参限定为数字和字符串。如果是 特殊字符和汉字，则无法传递，可以通过window.localStorage暂存数据，在执行脚本的目标窗口中获取 localStorage。

## 1.4 多窗口通讯之订阅发布模式
　 调用接口subscribeChannelNotification订阅一个频道，注册监听函数。 在任何窗口（包括主窗口，浮动窗口，多页面浮动窗口）调用publishChannelNotification接口发布消息，对应频道的所有订阅者，将收到消息，回调函数将被调用，并传入相应的参数.

## 1.5 窗口侧边栏菜单效果(抽屉效果)
　 调用setSlidingWindow接口实现侧边栏菜单效果。手势滑动实现侧边栏菜单的打开和关闭功能。相关接口：setSlidingWindowEnabled，toggleSlidingWindow


# 2、API概览

## 2.1、方法

> ### open 打开窗口

`uexWindow.open(windName,dataType,data,animID,w,h,flag,animDuration,extras)`

**说明:**
打开一个新窗口，如果窗口名字相同，则会覆盖相同窗口名字的页面内容。

**参数:**


|参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| windName | String | 是 | 窗口名字，可为空，不能为"root"，若已经打开过该名字的窗口，则直接跳转至该窗口。 |
| dataType | Number | 是 | 窗口载入的数据的类型，0：url方式载入；1：html内容方式载入 |
| data | String | 是 | url或html数据，支持“wgtroot://” 协议头，此协议头用于某些将项目部署在服务器上 的appcan应用，在应用执行过程中加载本地网页用。当dataType为0时，url支持相对路径、 绝对路径。其中，当url以“wgtroot://” 协议开头时，支持从服务器网页中打开本地应用沙箱中相应widget目录下的网页文件。  例如：当前窗口加载的是服务器上的`http://www.xxx.com/xxx.html` 网页，如果在xxx.html页面中open一个窗口时，传入的data为“wgtroot://index.html", 那么本次open执行时，引擎将会到本应用沙箱目录的widget路径下去寻找此页面， 例如Android上找到的路径会是：file:///android_assert/widget/index.html 当dataType为1时，把相应html的内容传进去（不建议） |
| animationID | Number | 是 | 动画ID，详见术语表-[WindowAnimationId 窗口动画Id](http://newdocx.appcan.cn/newdocx/docx?type=978_975) |
| w | Number | 是 | 窗口宽度，请传0 |
| h | Number | 是 | 窗口高度，请传0 |
| flag | Number | 是 | 窗口标记，详见CONSTANT中WindowFlags |
| animDuration | Number | 否 | 动画持续时长，单位为毫秒，默认为260毫秒 |
| extras | String | 否 | 扩展参数，设置值时，animDuration参数必传，json格式如下

```
var extras = {
	extraInfo:{//网页配置
		opaque:,//Boolean 可选 页面是否透明，默认false
		bgColor:,//String 可选 支持图片和颜色，格式为 #fff、#ffffff、rgba(r,g,b,a)等，图片路径支持 res:// wgt:// 等AppCan协议路径
		hardware: //是否开启硬件加速，0：否，1：开启（仅Android）
		}
	},
	animationInfo:{//动画配置,仅iOS且animationID选择bounce类的动画时有效
		bounciness:,//Number,可选，模拟弹性大小系数，传0-1之间的double值，越大表示弹性越快
		speed:,//Number,可选,模拟震荡速度系数，传0-1之间的double值，越大表示速度越快
	}
	
		 
```

**平台支持：**

Android2.2+
iOS6.0+

**版本支持：**

3.0.0+

**示例:**

```
uexWindow.open('dd', '0', 'index.html', 1, '', '', 0, 500);
```

> ### close 关闭窗口

`uexWindow.close(animID,animDuration)`

**说明:**
关闭当前窗口，若为浮动窗口直接关闭，若为主窗口，则同时会关闭在其上打开的所有浮动窗口
**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| animID | Number | 否 | 为空时无动画，-1时代表Open时指定动画的方向动画 |
| animDuration | Number | 否 | 动画持续时长，单位为毫秒，默认为260毫秒 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**
```
uexWindow.close(-1, 1000);
```

> ### forward 前进到下一个页面

`uexWindow.forward()`

**说明:**
仅在主窗口起作用，针对通过a标签跳转的网页，支持加密网页。

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

> ### back 返回上一个页面

`uexWindow.back()`

**说明:**
支持加密网页的back，仅在主窗口起作用。在手机的webkit中，存在一个Bug，当A.html跳转到B.html,B.html跳转到C.html，那么，用自带的history.back(),从C返回到B，B再返回的话，会返回到C，即陷入死循环。

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

> ### pageForward 前进到下一个页面

`uexWindow.pageForward()`

**说明:**
不支持含加密网页的forward，支持在主窗口和浮动窗口中调用

**参数:**
无
**平台支持：**
Android2.2+
iOS6.0+
**版本支持：**
3.0.0+

> ### pageBack 返回上一个页面

`uexWindow.pageBack()`

**说明:**
不支持含加密网页的back，支持在主窗口和浮动窗口中调用。

**参数:**
无
**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

> ### windowForward 前进到下一个窗口

`uexWindow.windowForward(animID,animDuration)`

**说明:**
在多窗口机制中，前进到下一个window。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| animID | Number | 否 | 动画ID，详见CONSTANT中WindowAnimiID|
| animDuration | Number | 否 | 动画持续时长，单位为毫秒，默认为260毫秒 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

> ### windowBack 返回到上一个窗口

`uexWindow.windowBack(inAnimitionID,inAnimDuration)`

**说明:**
在多窗口机制中，用于返回上一个window，比如在Awindow中uexWindow.open了Bwindow，那么在Bwindow中返回Awindow就可使用此方法。

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| inAnimitionID | Number | 否 | 动画ID|
| inAnimDuration | Number | 否 | 动画持续时长，单位为毫秒，默认250毫秒 |

**平台支持：**
Android2.2+
iOS6.0+
**版本支持：**
3.0.0+

> ### showSoftKeyboard 弹出软键盘

`uexWindow.showSoftKeyboard()`

**说明:**
弹出Android设备软键盘

**参数:**
无

**平台支持：**
Android2.2+

**版本支持：**
3.0.0+

> ### hideSoftKeyboard 关闭软键盘

`uexWindow.hideSoftKeyboard() `

**说明:**
关闭Android设备软键盘

**参数:**
无

**平台支持：**
Android2.2+

**版本支持：**
3.1.0+



> ### alert 弹出alert对话框

`uexWindow.alert(title,message,buttonLable)`

**说明:**
弹出只有一个确定按钮的对话框

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| title | String | 是 | 标题 |
| message | String | 是 | 内容 |
| buttonLable | String | 是 | 显示在按钮上的文字 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.alert("提示","alert框测试","OK");
```

> ### confirm 弹出confirm对话框

`uexWindow.confirm(title,message,buttonLable)`

**说明:**
弹出至少包含一个至多包含3个按钮的对话框

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| title | String | 是 | 标题 |
| message | String | 是 | 内容 |
| buttonLable | Array | 是 | 显示在按钮上的文字的集合 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.confirm("警告","确定退出么？","OK,Cancel");
```

> ### prompt 弹出prompt对话框
  
`uexWindow.prompt(title,message,defaultValue,buttonLable)`

**说明:**
弹出包含两个按钮且带输入框的对话框

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| title | String | 是 | 标题 |
| message | String | 是 | 内容 |
| defaultValue | String | 是 | 输入框默认文字 |
| buttonLable | Array | 是 | 显示在按钮上的文字的集合 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.prompt("提示","请输入内容：","","OK,Cancel");
```

> ### actionSheet 弹出菜单列表
  
`uexWindow.actionSheet(title,cancel,buttonLables)`

**说明:**
从界面底部弹出按钮列表, 其回调接口是[cbActionSheet ](#cbactionsheet 弹出菜单列表的回调方法 "cbactionsheet")

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| title | String | 是 | 标题 |
| cancel | String | 是 | 显示在取消按钮上的文本 |
| buttonLable | Array | 是 | 按钮列表文字 |

**平台支持：**
Android2.2+
iOS6.0+
**版本支持：**
3.0.0+
**示例:**

```
uexWindow.actionSheet("菜单","Cancel","Opt1,Opt2,Opt3,Opt4,Opt5,Opt6");
```

> ### setReportKey 设置当前页面是否拦截某个按键
  
`uexWindow.setReportKey(keyCode,enable)`

**说明:**
设置当前页面是否拦截某个按键

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| keyCode | Number | 是 |  要拦截的键值,0-返回键，1-菜单键 |
| enable | Number | 是 | 是否拦截,0-不拦截，1-拦截 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.setReportKey(1,1)
```
> ### setWindowFrame 移动当前窗口位置
  
`uexWindow.setWindowFrame(x,y,animDuration)`

**说明:**
移动当前Window相对屏幕的位置

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| x | Number | 是 | x坐标 |
| y | Number | 是 | y坐标 |
| animDuration | Number | 否 | 动画持续时长，单位为毫秒，默认为260毫秒 |

**平台支持：**
Android2.2+
iOS6.0+
**版本支持：**
3.0.0+
**示例:**

```
uexWindow.setWindowFrame(200,200,1000)
```

> ### openSlibing 打开一个兄弟窗口
  
`uexWindow.openSlibing(type,dataType,url,data,w,h)`

**说明:**
打开一个兄弟窗口

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| type | Number | 是 | 窗口的类型，1-头部；2-底部 |
| dataType | (String | 是 | 窗口载入的数据的类型，0：url方式载入；1：html内容方式载入； 2：既有url方式，又有html内容方式|
| url | Number | 是 | 窗口路径 |
| data | String | 是 | 数据，可为空 |
| w | Number | 是 | 该参数无效，实际宽度为屏幕宽度，请传"" |
| h | Number | 是 | 窗口高度，支持百分数，默认为屏幕高度 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.openSlibing(1, "0", "nav.html", "", "", 75);
```
> ### closeSlibing 关闭一个兄弟窗口
  
`uexWindow.closeSlibing(type)`

**说明:**
关闭一个兄弟窗口

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| type | Number | 是 | 窗口的类型，1-头部；2-底部 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**
```
uexWindow.closeSlibing(2);
```

> ### showSlibing 显示兄弟窗口
  
`uexWindow.showSlibing(type)`

**说明:**
显示open过的兄弟窗口

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| type | Number | 是 | 窗口的类型，1-头部；2-底部 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**
```
uexWindow.showSlibing(1)
```


> ### evaluateScript 执行js脚本
  
`uexWindow.evaluateScript(windName,type,js)`

**说明:**
执行js脚本

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| windName | String | 是 | 窗口名称，默认空为当前窗口（可以是主窗口、root窗口、浮动窗口） |
| type | Number | 是 | 窗口的类型，uex.cWindowTypeNormal，uex.cWindowTypeTop 或uex.cWindowTypeBottom，详见CONSTANT中WindowTypes |
| js | String | 是 | js脚本内容 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.evaluateScript("", 0, "alert('执行去吧！！');");
```

> ### evaluatePopoverScript 在浮动窗口中执行js脚本
  
`uexWindow.evaluatePopoverScript(windName,popName,js)`

**说明:**
在浮动窗口中执行js脚本

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| windName | String | 是 | 窗口名称，默认空为当前窗口（只能为主窗口、root窗口） |
| popName | String | 是 | 浮动窗口名称 |
| js | String | 是 | js脚本内容 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.evaluatePopoverScript("", "sss", "alert('执行去吧！！');");
```
> ### evaluateMultiPopoverScript 在多页面浮动窗口中执行js脚本
  
`uexWindow.evaluateMultiPopoverScript(windName,popName,inPageName,js)`

**说明:**
在多页面浮动窗口中执行js脚本

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| windName | String | 是 | 窗口名称，默认为当前窗口 |
| popName | String | 是 | 浮动窗口名称 |
| inPageName | String | 是 | 单页面窗口的名字 |
| js | String | 是 | js脚本内容 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.evaluateMultiPopoverScript("", "multipop", "pop2", "alert('multipop')");
```

> ### setSwipeRate 设置左右手势的灵敏度
  
`uexWindow.setSwipeRate(rate)`

**说明:**
设置左右手势的灵敏度

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| rate | Number | 是 | 灵敏度，大于等于1 |

**平台支持：**
Android2.2+

**版本支持：**
3.0.0+

> ### toast 弹出消息提示框
  
`uexWindow.toast(type,location,msg,duration)`

**说明:**
弹出消息提示框，常见的用于获取网络数据，在请求过程中给个加载提示，数据加载完成时关闭提示。

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| type | Number | 是 | 0-没有进度条；1-有进度条 |
| location | Number | 是 | 显示位置，详见CONSTANT中WindowToastLocation |
| msg | Number | 是 | 消息 |
| duration | Number | 是 | 显示时间，单位为毫秒，非正整数时，提示框一直存在，不会自动关闭 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.toast(1,5,"正在加载...",0);
```

> ### closeToast 关闭消息提示框
  
`uexWindow.closeToast()`

**说明:**
关闭消息提示框

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**
```
uexWindow.closeToast()
```

> ### openPopover 打开浮动窗口

`uexWindow.openPopover(popName,dataType,url,data,x,y,w,h,fontSize,flag,bottomMargin,extraInfo)`

**说明:**
打开浮动窗口，如果浮动窗口名字相同，则会覆盖相同浮动窗口名字的页面内容。

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| popName | String | 是 | 名称 |
| dataType | Number | 是 | 窗口载入的数据的类型，0：url方式载入；1：html内容方式载入；2：既有url方式， 又有html内容方式 |
| url | String | 是 |  url类型数据，支持“wgtroot://” 协议头，此协议头用于某些将项目部署在服务器上的appcan应用，在应用执行过程中 加载本地网页用。当dataType为0时，url支持相对路径、绝对路径。其中，当url以“wgtroot://” 协议开头时，支持从服务器网页中打开本地应用沙箱中相应widget目录下的网页文件。 例如：当前窗口加载的是服务器上的`http://www.xxx.com/xxx.html` 网页，如果在xxx.html页面中open一个窗口时，传入的data为“wgtroot://index.html" ,  那么本次open执行时，引擎将会到本应用沙箱目录的widget路径下去寻找此页面， 例如Android上找到的路径会是：file:///android_assert/widget/index.html 。|
| data | String | 是 | data类型数据 |
| x | Number | 是 | x坐标 |
| y | Number | 是 | y坐标 |
| w | Number | 是 | 宽度，为空时默认为window的宽度 |
| h | Number | 是 | 高度，为空时默认为window的高度 |
| fontSize | Number | 是 | 字体大小 |
| flag | Number | 是 | 浮动窗口标记，详见CONSTANT中WindowFlags |
| bottomMargin | Number | 否 | 浮动窗口相对父窗口底部的距离。当值不等于0时，h参数无效。|
| extraInfo | String | 否 | 设置值时，bottomMargin参数必传，json格式如下： {"extraInfo":{"opaque":"true","bgColor":"#011","delayTime":"250"}}|

关于`extraInfo`中字段的说明如下：

|参数|是否必须|说明|
|-----|-----|-----|
|extraInfo|必选|extraInfo参数|
|opaque|可选|是否透明true/false默认为false|
|bgColor|可选|背景色，支持图片和颜色，格式为#fff、#ffffff、rgba(r,g,b,a)等，图片路径支持res://、 wgt://等AppCan协议路径|
|delayTime|可选|延迟打开窗口，单位为毫秒，避免父窗口在uexOnload中打开浮动窗口产生卡顿。 设置值时，bottomMargin参数必传|
|hardware|可选|是否开启硬件加速，0:关闭，1:开启（仅Android）|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.openPopover("sss",0,"hidden.html","",400,0,'','','',0,100);
```

> ### closePopover 关闭浮动窗口
  
`uexWindow.closePopover(popName)`

**说明:**
关闭浮动窗口

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| popName | String | 是 | 名称 |

**平台支持：**
Android2.2+
iOS6.0+
**版本支持：**
3.0.0+
**示例:**
```
uexWindow.closePopover('sss')
```

> ### preOpenStart 开始浮动窗口的预加载
  
`uexWindow.preOpenStart()`

**说明:**
  popOver的预加载必须要与uexWindow.open中的flag：uex.cWiondowFlagPreOpen=64配合使用，即open时有此flag方可对应使用预加载。开始popOver(浮动窗口)的预加载。即一个窗口中需要有多个浮动窗口，可以让这些浮动窗口预先加载出来。其执行过程：A窗口打开B窗口，B窗口中需要预加载多个浮动窗口。那么A窗口中执行uexWindow.open时，其flag参数需要：uex.cWiondowFlagPreOpenreOpen=64配合使用，即open时有此flag，B窗口方可使用预加载。此时在B窗口中，会等所有预加载的浮动窗口都加载完毕（不包括异步获取网络数据），方才显示B窗口。预加载的浮动窗口的开启函数，即uexWindow.openPopover，需要放置于uexWindow.preOpenStart和uexWindow.preOpenFinish之间。
  
**参数:**
  无
  
**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**
在A窗口中，首先open窗口B，在B窗口中，预加载多个浮动窗口：A.html

```
    <!DOCTYPE html>
    <html>
    <head>
    <title>AppCan API uexWindow A</title>
    <meta charset="utf-8">
    <script>
    window.uexOnload = function(type){
    if(!type){
    uexWindow.open("B",0,"B.html",0,"","",64);
    }
    }
    </script>
    </head>
    <body>
    </body>
    </html>
    

```
B.html

```
<!DOCTYPE html>
    <html>
    <head>
    <title>AppCan API uexWindow B</title>
    <meta charset="utf-8">
    </head>
    <body>
    </body>
    <script>
    window.uexOnload = function(type){
    if(!type){
    var s = window.getComputedStyle($$("content"), null);
    uexWindow.preOpenStart();        uexWindow.openPopover("B1","0","B1.html","",0,int($
    
    $("header").offsetHeight),int(s.width),int(s.height),int(s.fontSize),"0");
    uexWindow.openPopover("B2","0","B2.html","",0,int($$("header").offsetHeight),int(s.width),int
    
    (s.height),int(s.fontSize),"0");
    uexWindow.preOpenFinish();
    }
    }
    </script>
    </html>

```

> ### preOpenFinish 结束浮动窗口的预加载
  
`uexWindow.preOpenFinish()`

**说明:**
结束浮动窗口的预加载

**参数:**
无
  
**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.preOpenFinish()
```
  
> ### setPopoverFrame 更改浮动窗口的位置和大小
  
`uexWindow.setPopoverFrame(popName,x,y,w,h)`

**说明:**
更改浮动窗口的位置和大小

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| popName | String | 是 | 名称 |
| x | Number | 是 | x坐标 |
| y | Number | 是 | y坐标 |
| w | Number | 是 | 宽度，为空时默认为window的宽度 |
| h | Number | 是 | 高度，为空时默认为window的高度 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**
```
uexWindow.setPopoverFrame('sss',500,200,400,400);
```
  
> ### openMultiPopover 打开多页面浮动窗口
  
`uexWindow.openMultiPopover(content,popName,dataType,x,y,w,h,fontSize,flag,indexSelected,extraInfo)`

**说明:**
在当前window打开一个多页面浮动窗口,页面之间滑动切换

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| content | String | 是 | 多页面窗口数据格式为json。不可为空。 json格式如下：    '{"content":[{"inPageName":"p1","inUrl":"xxx1.html","inData":"", {"extraInfo":{"opaque":"true","bgColor":"#011"}}}, {"inPageName":"p2","inUrl":"xxx2.html","inData":"", {"extraInfo":{"opaque":"true","bgColor":"#011"}}}]}'|
| popName | String | 是 | 浮动窗口名称 |
| dataType | Number | 是 | 窗口载入的数据的类型，0：url方式载入；1：html内容方式载入；2：既有url方式， 又有html内容方式 |
| x | Number | 是 | x坐标 |
| y | Number | 是 | y坐标 |
| w | Number | 是 | 宽度，为空时默认为window的宽度 |
| h | Number | 是 | 高度，为空时默认为window的高度 |
| fontSize | Number | 是 | 字体大小 |
| flag | Number | 是 |  浮动窗口标记，详见CONSTANT中WindowFlags |
| indexSelected | Number | 是 | 默认打开的页面索引，默认为0|
| extraInfo | String | 否 | 扩展参数，json格式如下：{"extraInfo":{"opaque":"true","bgColor":"#011", "delayTime":"250"}} |

`content json`中各字段的说明：

|参数|是否必须|说明|
|-----|-----|-----|
|inPageName|是|所包含的单页面窗口的名字|
|inUrl|是|url类型数据|
|inData|是|窗口的内容的二进制数据，可为空|
|extraInfo|是|extraInfo参数|
|opaque|否|是否透明true/false默认为false|
|bgColor|否|背景色，支持图片和颜色，格式为#fff、#ffffff、rgba(r,g,b,a)等，图片路径支持res://、 wgt://等AppCan协议路径|

`extraInfo json`中各字段的说明：

|参数|是否必须|说明|
|-----|-----|-----|
|extraInfo|必选|extraInfo参数|
|opaque|可选|是否透明true/false默认为false|
|bgColor|可选|背景色，支持图片和颜色，格式为#fff、#ffffff、rgba(r,g,b,a)等，图片路径支持res://、wgt:// 等AppCan协议路径|
|delayTime|可选|延迟打开窗口，单位为毫秒，避免父窗口在uexOnload中打开浮动窗口产生卡顿。|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.openMultiPopover('{"content":[{"inPageName":"p1", "inUrl":"hidden.html","inData":""},{"inPageName":"p2", "inUrl":"hidden1.html","inData":""}]}',"sss",0,400,0,'','','',0,1);
}
```

> ### closeMultiPopover 关闭多页面浮动窗口

`uexWindow.closeMultiPopover(popName)`

**说明:**
关闭多页面浮动窗口

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| popName | String | 是 | 名称 |
    
**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.closeMultiPopover('sss')
```

> ### setSelectedPopOverInMultiWindow 设置多页面浮动窗口跳转到的子页面窗口的索引

`uexWindow.setSelectedPopOverInMultiWindow(popName, indexPage)`

**说明:**
设置多页面浮动窗口跳转到的子页面窗口的索引

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| popName | String | 是 | 浮动窗口名称 |
| indexPage | Number | 是 | 索引 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**
```
uexWindow.setSelectedPopOverInMultiWindow('sss', 0);
```

> ### setMultiPopoverFrame 更改多页面浮动窗口的位置和大小

`uexWindow.setMultiPopoverFrame(popName,x,y,w,h)`

**说明:**
更改多页面浮动窗口的位置和大小

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| popName | String | 是 | 浮动窗口名称 |
| x | Number | 是 | x坐标 |
| y | Number | 是 | y坐标 |
| w | Number | 是 | 宽度，为空时默认为window的宽度 |
| h | Number | 是 | 高度，为空时默认为window的高度 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.setMultiPopoverFrame("multipop", "10", "10", "600", "600");

```

> ### bringToFront 置顶当前浮动窗口

`uexWindow.bringToFront()`

**说明:**
置顶当前浮动窗口

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**
主窗口A中打开浮动窗口B1,B2,B3，代码如下：
A.html

```
<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <script type="text/javascript">
    window.uexOnload = function(type){
    uexWindow.openPopover("pop1",0,"B1.html","",400,0,'','','',0,0);
    uexWindow.openPopover("pop2",0,"B2.html","",400,100,'','','',0,0);
    uexWindow.openPopover("pop3",0,"B3.html","",400,200,'','','',0,0);
    }
    function bringPopoverToFront(){
    uexWindow.bringPopoverToFront("pop1");
    }
    function sendPopoverToBack(){
    uexWindow.sendPopoverToBack("pop1");
    }
    function insertPopoverAbovePopover(){
    uexWindow.bringPopoverToFront("pop1","pop3");
    }
    function insertPopoverBelowPopover(){
    uexWindow.insertPopoverBelowPopover("pop1","pop3");
    }
    </script>
    </head>
    <body class="um-vp" ontouchstart>
    <div class="conbor">
    <div class="consj">
    <input class="btn" type="button" value="置顶窗口" onclick="bringPopoverToFront()"/>
    <input class="btn" type="button" value="置底窗口" onclick="sendPopoverToBack()"/>
    <input class="btn" type="button" value="插入之上" onclick="insertPopoverAbovePopover()"/>
    <input class="btn" type="button" value="插入之下" onclick="insertPopoverBelowPopover()"/>
    </div>
    </div>
    </body>
    </html>

```
B1.html

```
<!DOCTYPE HTML>
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-
    
    scale=1.0, user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="css/index.css">
    <script type="text/javascript">
    window.uexOnload = function(type){
    uexWindow.bringToFront();
    }
    </script>
    </head>
    <body style="background:#077333;">
    <div class="tit">B1</div>
    <div class="consj">
    <span class="tit"></span>
    <input class="btn" type="button" value="置底当前浮动窗口" onclick="uexWindow.sendToBack();">
    <input class="btn" type="button" value="插入之上" onclick="uexWindow.insertAbove('pop2');">
    <input class="btn" type="button" value="插入之下" onclick="uexWindow.insertBelow('pop2');">
    </div>
    </body>
    </html>
```

> ### sendToBack 置底当前浮动窗口

`uexWindow.sendToBack()`

**说明:**
置底当前浮动窗口

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.sendToBack()
```

> ### insertAbove 将当前浮动窗口插入到指定浮动窗口之上

`uexWindow.insertAbove(name)`

**说明:**
将当前浮动窗口插入到指定浮动窗口之上

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| name | String | 是 | 目标浮动窗口的名称 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.insertAbove('pop2');
```


> ### insertBelow 将当前浮动窗口插入到指定浮动窗口之下

`uexWindow.insertBelow(name)`

**说明:**
将当前浮动窗口插入到指定浮动窗口之下

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| name | String | 是 | 目标浮动窗口的名称 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**
```
uexWindow.insertBelow('pop2');
```

> ### bringPopoverToFront 置顶指定浮动窗口

`uexWindow.bringPopoverToFront(name)`

**说明:**
置顶指定浮动窗口，只在主窗口中有效

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| name | String | 是 | 目标浮动窗口的名称 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.bringPopoverToFront("pop1");
```


> ### sendPopoverToBack 置底指定浮动窗口

`uexWindow.sendPopoverToBack(name)`

**说明:**
置底指定浮动窗口，只在主窗口中有效

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| name | String | 是 | 目标浮动窗口的名称 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.sendPopoverToBack("pop1");
```

> ### insertPopoverAbovePopover 将指定浮动窗口插入到另一浮动窗口之上

`uexWindow.insertPopoverAbovePopover(nameA,nameB)`

**说明:**
将浮动窗口A插入到浮动窗口B之上，只在主窗口中有效

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| nameA | String | 是 | 指定浮动窗口A的名称 |
| nameB | String | 是 | 指定浮动窗口B的名称 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**
```
uexWindow.insertPopoverAbovePopover("pop1","pop3");
```

> ### insertPopoverBelowPopover

将指定浮动窗口插入到另一浮动窗口之下

`uexWindow.insertPopoverBelowPopover(nameA,nameB)`

**说明:**
将浮动窗口A插入到浮动窗口B之下，只在主窗口中有效

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| nameA | String | 是 | 指定浮动窗口A的名称 |
| nameB | String | 是 | 指定浮动窗口B的名称 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**
```
uexWindow.insertPopoverBelowPopover("pop1","pop3");
```


> ### insertWindowAboveWindow 将指定窗口插入到另一窗口之上

`uexWindow.insertWindowAboveWindow(nameA,nameB)`

**说明:**

将指定窗口A插入到另一窗口B之上，该接口仅对显示在屏幕上且不被隐藏的window起作用。（即open该window时，flag传入的是256）

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| nameA | String | 是 | 指定窗口A的名称 |
| nameB | String | 是 | 指定窗口B的名称 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**
```
uexWindow.insertWindowAboveWindow("pop1","pop3");
```

> ### insertWindowBelowWindow 将指定窗口插入到另一窗口之下

`uexWindow.insertWindowBelowWindow(nameA,nameB)`

**说明:**
将指定窗口A插入到另一窗口B之下，该接口仅对显示在屏幕上且不被隐藏的window起作用。（即open该window时，flag传入的是256）

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| nameA | String | 是 | 指定窗口A的名称 |
| nameB | String | 是 | 指定窗口B的名称 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.insertWindowBelowWindow("pop1","pop3");
```

> ### setWindowHidden 设置当前窗口显示和隐藏

`uexWindow.setWindowHidden(visible)`

**说明:**
设置当前窗口显示和隐藏，该接口仅对显示在屏幕上且不被隐藏的window起作用。（即open该window时，flag传入的是256）

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| visible | Number | 是 | 显示或隐藏，0-显示；1-隐藏 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.setWindowHidden(1);
```

> ### toggleSlidingWindow 打开侧滑窗口

`uexWindow.toggleSlidingWindow(json)`

**说明:**
打开侧滑窗口

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| json | String | 是 | 该字符串为JSON格式。如下mark: (String类型) 必选 左右侧窗口标识，0：左侧，1：右侧，reload: 可选 是否重新加载，1：重新加载 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
var params  = {
    mark:0,
    reload:1
};
 
var paramStr = JSON.stringify(params);
uexWindow.toggleSlidingWindow(paramStr);

```

> ### setSlidingWindow 设置侧滑窗口

`uexWindow.setSlidingWindow(json)`

**说明:**
设置侧滑窗口

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| json | String | 是 | 侧滑窗口信息。该字符串为JSON格式。如下： {leftSliding: {width:240,url:"uexWindow_left.html"},rightSliding: {width:240,url:"uexWindow_left.html"}} |

`json`字符串中各字段含义如下:

| 参数  |  参数类型 |是否必须|说明
| ------------ | ------------ |------------ |
 |leftSliding|String|是|左侧侧滑窗口
|rightSliding|String|是|右侧侧滑窗口
|width|Number|是|侧滑窗口宽度
|url|String|是|url类型数据

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
var params = { 
leftSliding:{
        width:240,
        url:"uexWindow_left.html"
    },
    rightSliding:{
        width:240,
        url:"uexWindow_left.html"
    } 
 }; 
 var paramStr = JSON.stringify(params);
 uexWindow.setSlidingWindow(paramStr);
```

> ### setSlidingWindowEnabled 设置侧滑窗口是否可用

`uexWindow.setSlidingWindowEnabled(enable)`

**说明:**
设置侧滑窗口是否可用

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| enable | String | 是 | 是否可用，0：不可用，1：可用|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.setSlidingWindowEnabled(1);
```

> ### setMultilPopoverFlippingEnbaled 设置控件是否响应滑动事件

`uexWindow.setMultilPopoverFlippingEnbaled(enable)`

**说明:**  
设置控件是否响应滑动事件,**该接口需要在Multipopover的子页面中调用**

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| enable | String | 是 | 是否响应，0：不响应，1：响应|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.setMultilPopoverFlippingEnbaled(1);

```

> ### setOrientation 设置屏幕方向

`uexWindow.setOrientation(orientation)`

**说明:**
设置屏幕方向

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| orientation | Number | 是 |1：竖屏，home键在屏幕下方；    2：横屏，home键在屏幕右边；4：竖屏，home键在屏幕上方；  8：横屏，home键在屏幕左边；   15：随系统设置自动转屏。|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.setOrientation(1);

```

> ### setWindowScrollbarVisible 设置滚动条的显示和隐藏

`uexWindow.setWindowScrollbarVisible(visible)`

**说明:**
设置滚动条的显示和隐藏

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| visible | Bool | 是 | 显示或隐藏，true-显示；false-隐藏 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-
    
    scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <script type="text/javascript">
    window.uexOnload = function(type){
    }
    function setDis(vis){
    uexWindow.setWindowScrollbarVisible(vis);
    }
    </script>
    </head>
    <body class="um-vp" ontouchstart>
    <div class="conbor">
    <div class="consj">
    <input class="btn" type="button" value="显示" onclick="setDis('true')"/>
    <input class="btn" type="button" value="隐藏" onclick="setDis('false')"/>
    </div>
    </div>
    </body>
    </html>

```

> ### createProgressDialog　创建全局对话框

`uexWindow.createProgressDialog(title,msg,canCancel)`

**说明:**

创建一个全局对话框，屏蔽用户对界面的一切操作。常见的用于获取网络数据，在请求过程中给个加载提示，数据加载完成时关闭提示。

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| title | String | 是 | 标题,传空字符串时没有标题，如''
| msg | String | 是 | 内容 |
| canCancel | Number | 否 | 是否可以取消，即点击屏幕上除对话框以外的任何地方，或者点击返回键，对话框是否消失。 0-可以取消，1-不能取消。设置为1时，该对话框只能在通过调 用destroyProgressDialog取消，否则会一直显示。默认可以取消 |

**平台支持：**  

iOS 6.0+
Android 4.0+  


**版本支持：** 

iOS 3.2.0+ 
Android 3.0.0+  

**示例：**  

```
uexWindow.createProgressDialog('','正在加载,请稍候...',0);
```

> ### destroyProgressDialog 销毁全局对话框

`uexWindow.destroyProgressDialog()`

**说明:**
销毁全局对话框

**参数:**
无

**平台支持：**  

iOS 6.0+
Android 4.0+  


**版本支持：** 

iOS 3.2.0+ 
Android 3.0.0+ 

**示例：**
```
uexWindow.destroyProgressDialog()
```

> ### postGlobalNotification 发送全局消息

`uexWindow.postGlobalNotification(content)`

**说明:**
发送全局消息，用于窗口之间的通信，调用该方法时，所有打开（通过调用uexWindow的open和openPopover方法）的窗口只要注册过onGlobalNotification，都会被调用。

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| content | String | 是 | 发送的内容 |

**平台支持：**
Android2.2+

**版本支持：**
3.0.0+

**示例：**
这里一共涉及到3个网页，index.html，index1.html，index2.html，其中在index2.html中发送全局消息。代码如下：
index.html

```
<!DOCTYPE html>
    <html class="um landscape min-width-240px min-width-320px min-width-480px min-width-768px min-width-1024px">
    <head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <script>
    function onGlobalNotification(ret){
    console.log("index:"+ret);
    }
    function openWindow(){
    uexWindow.open('index','0','index1.html','2','','',0);
    //uexWindow.openPopover
    
    ('index',"0",'index1.html',"","","","","","","0");
    }
    </script>
    </head>
    <body class="um-vp c-wh" ontouchstart>
    <div id="page_0" class="up ub ub-ver" tabindex="0">
    <!--header开始-->
    <div id="header" class="uh c-org c-m1 t-wh ub">
    <h1 class="ut ub-f1 ulev0 ut-s tx-c">index.html</h1>
    </div>
    <!--header结束-->
    <div>
    <input type="button" value="index1" onClick="openWindow()" style="line-height:2em;font-size:14px"/>
    </div>
    </div>
    </body>
    <script>
    window.uexOnload = function(type){
    uexWindow.onGlobalNotification = onGlobalNotification;
    }
    </script>
    </html>

```
index1.html

```
<!DOCTYPE html>
    <html class="um landscape min-width-240px min-width-320px min-width-480px min-width-768px min-width-1024px">
    <head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <script>
    function onGlobalNotification(ret){
    console.log("index1:"+ret);
    }
    function openWindow(){
    uexWindow.open('index1','0','index2.html','2','','',0);
    //uexWindow.openPopover
    
    ('index1',"0",'index2.html',"","","","","","","0");
    }
    </script>
    </head>
    <body class="um-vp c-wh" ontouchstart>
    <div id="page_0" class="up ub ub-ver" tabindex="0">
    <!--header开始-->
    <div id="header" class="uh c-org c-m1 t-wh ub">
    <h1 class="ut ub-f1 ulev0 ut-s tx-c">index1.html</h1>
    </div>
    <!--header结束-->
    <div>
    <input type="button" value="index2" onClick="openWindow()" style="line-
    
    height:2em;font-size:14px"/>
    </div>
    </div>
    </body>
    <script>
    window.uexOnload = function(type){
    uexWindow.onGlobalNotification = onGlobalNotification;
    }
    </script>
    </html>

```
index2.html

```
<!DOCTYPE html>
    <html class="um landscape min-width-240px min-width-320px min-width-480px min-width-768px min-width-1024px">
    <head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <script>
    function onGlobalNotification(ret){
    console.log("index2:"+ret);
    }
    </script>
    </head>
    <body class="um-vp c-wh" ontouchstart>
    <div id="page_0" class="up ub ub-ver" tabindex="0">
    <!--header开始-->
    <div id="header" class="uh c-org c-m1 t-wh ub">
    <h1 class="ut ub-f1 ulev0 ut-s tx-c">index2.html</h1>
    </div>
    <!--header结束-->
    </div>
    </body>
    <script>
    window.uexOnload = function(type){
    uexWindow.onGlobalNotification = onGlobalNotification;
    uexWindow.postGlobalNotification("test just!");
    }
    </script>
    </html>
```

> ### subscribeChannelNotification 注册接收全局消息的监听器

`uexWindow.subscribeChannelNotification(channelId,functionName)`

**说明:**
窗口之间的通信，可以通过发布/订阅模式来实现。窗口调用此接口订阅频道监听，当在另一窗口调用publishChannelNotification或publishChannelNotificationForJson时，对应此频道的回调方法将被调用，并传入相应的参数。

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| channelId | String | 是 | 频道唯一标识符 |
| functionName | String | 是 | 回调方法名称 |

**平台支持：**
Android2.2+

**版本支持：**
3.0.0+

**示例：**
这里一共涉及到3个网页，index.html，index1.html，index2.html，其中在index2.html中发送全局消息。代码如下：
index.html

```
<!DOCTYPE html>
    <html class="um landscape min-width-240px min-width-320px min-width-480px min-width-768px min-width-1024px">
    <head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <script>
    function onNotification(ret){
    console.log("index:"+ret);
    }
    function openWindow(){
    uexWindow.open('index','0','index1.html','2','','',0);
    //uexWindow.openPopover
    
    ('index',"0",'index1.html',"","","","","","","0");
    }
    </script>
    </head>
    <body class="um-vp c-wh" ontouchstart>
    <div id="page_0" class="up ub ub-ver" tabindex="0">
    <!--header开始-->
    <div id="header" class="uh c-org c-m1 t-wh ub">
    <h1 class="ut ub-f1 ulev0 ut-s tx-c">index.html</h1>
    </div>
    <!--header结束-->
    <div>
    <input type="button" value="index1" onClick="openWindow()" style="line-height:2em;font-size:14px"/>
    </div>
    </div>
    </body>
    <script>
    window.uexOnload = function(type){
    uexWindow.onNotification = onNotification;
    uexWindow.subscribeChannelNotification("1", "onNotification");
    }
    </script>
    </html>

```
index1.html

```
<!DOCTYPE html>
    <html class="um landscape min-width-240px min-width-320px min-width-480px min-width-768px min-width-1024px">
    <head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <script>
    function onNotification(ret){
    console.log("index1:"+ret);
    }
    function openWindow(){
    uexWindow.open('index1','0','index2.html','2','','',0);
    //uexWindow.openPopover
    
    ('index1',"0",'index2.html',"","","","","","","0");
    }
    </script>
    </head>
    <body class="um-vp c-wh" ontouchstart>
    <div id="page_0" class="up ub ub-ver" tabindex="0">
    <!--header开始-->
    <div id="header" class="uh c-org c-m1 t-wh ub">
    <h1 class="ut ub-f1 ulev0 ut-s tx-c">index1.html</h1>
    </div>
    <!--header结束-->
    <div>
    <input type="button" value="index2" onClick="openWindow()" style="line-
    
    height:2em;font-size:14px"/>
    </div>
    </div>
    </body>
    <script>
    window.uexOnload = function(type){
    uexWindow.onNotification = onNotification;
    uexWindow.subscribeChannelNotification("2", "onNotification");
    }
    </script>
    </html>

```
index2.html

```
<!DOCTYPE html>
    <html class="um landscape min-width-240px min-width-320px min-width-480px min-width-768px min-width-1024px">
    <head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <script>
    function onNotification(ret){
    console.log("index2:"+ret);
    }
    </script>
    </head>
    <body class="um-vp c-wh" ontouchstart>
    <div id="page_0" class="up ub ub-ver" tabindex="0">
    <!--header开始-->
    <div id="header" class="uh c-org c-m1 t-wh ub">
    <h1 class="ut ub-f1 ulev0 ut-s tx-c">index2.html</h1>
    </div>
    <!--header结束-->
    </div>
    </body>
    <script>
    window.uexOnload = function(type){
    uexWindow.onNotification = onNotification;
    uexWindow.subscribeChannelNotification("1", "onNotification");
    uexWindow.subscribeChannelNotification("2", "onNotification");
    uexWindow.publishChannelNotification("1","channel 1 test just!");
    uexWindow.publishChannelNotification("2","channel 2 test just!");
    }
    </script>
    </html>

```
> ### publishChannelNotification 发送全局消息



`uexWindow.publishChannelNotification(channelId,content)`
**说明:**
发布消息通知，此频道的所有订阅者，将收到消息，回调函数将被调用，并传入相应的参数.

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| channelId | Number | 是 | 频道唯一标识符 |
| content | String | 是 | 发送的内容 |

**平台支持：**
Android2.2+
iOS6.0+
**版本支持：**
3.0.0+

**示例：**
```
uexWindow.publishChannelNotification("1","channel 1 test just!");

```
> ### publishChannelNotificationForJson 发送全局Json类型消息



`uexWindow.publishChannelNotificationForJson(channelId,content)`
**说明:**
发布消息通知，此频道的所有订阅者，将收到消息，回调函数将被调用，并传入相应的参数.

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| channelId | Number | 是 | 频道唯一标识符 |
| content | String | 是 | 发送Json类型的内容 |

**平台支持：**
Android2.2+
iOS6.0+
**版本支持：**
3.0.0+

**示例：**
```
var json = ｛
      key ：value
｝
uexWindow.publishChannelNotificationForJson("1",JSON.stringify(json));

```

> ### getState 获取当前窗口处于前台还是后台

`uexWindow.getState()`

**说明:**
获取当前窗口处于前台还是后台

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.getState()
```

> ### statusBarNotification 发送消息到状态栏

`uexWindow.statusBarNotification(title,msg)`

**说明:**
发送消息到状态栏

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| title | String | 是 | 标题 |
| msg | String | 是 | 消息 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.statusBarNotification('title','msg');
```

> ### beginAnimition 开始设置动画的相关参数

`uexWindow.beginAnimition()`

**说明:**
开始设置动画的相关参数，仅对浮动窗口有效

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.beginAnimition()`
```

> ### setAnimitionDelay 设置动画延迟执行时间

`uexWindow.setAnimitionDelay(delay)`

**说明:**
设置动画延迟执行时间，仅对浮动窗口有效

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| delay | Number | 否 | 延迟执行的时间(单位：毫秒)，默认为0 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**
```
uexWindow.setAnimitionDelay(200)
```

> ### setAnimitionDuration 设置动画持续时间

`uexWindow.setAnimitionDuration(duration)`

**说明:**
设置动画持续时间，仅对浮动窗口有效

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| duration | Number | 否 | 持续时间(单位：毫秒)，默认为260|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.setAnimitionDuration(4000);
```

> ### setAnimitionCurve 设置动画曲线类型

`uexWindow.setAnimitionCurve(curve)`

**说明:**
设置动画曲线类型，仅对浮动窗口有效

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| curve | Number | 否 | 动画曲线类型，默认为0。详见CONSTANT中WindowAnimCurveType |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.setAnimitionCurve(1);
```

> ### setAnimitionRepeatCount 设置动画重复次数

`uexWindow.setAnimitionRepeatCount(count)`

**说明:**
设置动画重复次数，仅对浮动窗口有效

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| count | Number | 否 | 重复次数，默认为0 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.setAnimitionRepeatCount(0);
```

> ### setAnimitionAutoReverse 设置动画结束后自动恢复位置和状态

`uexWindow.setAnimitionAutoReverse(isReverse)`

**说明:**
设置动画结束后自动恢复位置和状态，仅对浮动窗口有效

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| isReverse | Number | 否 | 是否恢复。0-不恢复；1-恢复。默认为0 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.setAnimitionAutoReverse(1);
```

> ### makeTranslation 设置移动动画

`uexWindow.makeTranslation(toX,toY,toZ)`

**说明:**
设置移动动画，仅对浮动窗口有效

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| toX | Number | 是 | 相对于当前位置的x轴方向上的平移距离，int型整数，负数或正数|
| toY | Number | 是 | 相对于当前位置的y轴方向上的平移距离，int型整数，负数或正数|
| toZ | Number | 是 | 相对于当前位置的z轴方向上的平移距离，int型整数，负数或正数|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.makeTranslation(100,0,0);
```

> ### makeScale 设置伸缩动画

`uexWindow.makeScale(toX,toY,toZ)`

**说明:**
设置伸缩动画，仅对浮动窗口有效

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| toX | Number | 是 | 相对于当前大小的x轴方向上的放大倍率，大于0的float型数据|
| toY | Number | 是 | 相对于当前大小的y轴方向上的放大倍率，大于0的float型数据|
| toZ | Number | 是 | 相对于当前大小的z轴方向上的放大倍率，大于0的float型数据|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.makeScale(2,1,1);
```


> ### makeRotate 设置旋转动画

`uexWindow.makeRotate(degrees,toX,toY,toZ)`

**说明:**

设置旋转动画，仅对浮动窗口有效

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| degrees | Number | 是 | 相对于当前角度的旋转度数 |
| toX | Number | 是 | 是否绕X轴旋转。0为false，1为true |
| toY | Number | 是 | 是否绕Y轴旋转。0为false，1为true |
| toZ | Number | 是 | 是否绕Z轴旋转。0为false，1为true |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.makeRotate(90, 1, 0, 1);
```

> ### makeAlpha 设置透明度动画

`uexWindow.makeAlpha(alpha)`

**说明:**
设置透明度动画，仅对浮动窗口有效

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| alpha | Number | 是 | 相对于当前alpha的值，0.0到1.0的float型数据 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**
```
uexWindow.makeAlpha(0.5);
```

> ### commitAnimition 提交动画设置并开始执行动画

`uexWindow.commitAnimition()`

**说明:**
提交动画设置并开始执行动画，仅对浮动窗口有效，所有参数的设置仅一次有效，动画完了后将清除。

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.commitAnimition();
```

> ### getBounce 获取网页弹动状态

`uexWindow.getBounce()`

**说明:**
获取网页弹动状态

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.getBounce();
```

> ### setBounce 设置是否支持网页弹动
  
`uexWindow.setBounce(flag)`

**说明:**
设置是否支持网页弹动

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| flag | Number | 是 | 1：支持；0：不支持|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**
```
uexWindow.setBounce(1);
```

> ### notifyBounceEvent 注册接收弹动事件
  
`uexWindow.notifyBounceEvent(type,status)`

**说明:**
注册接收弹动事件

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| type | Number | 是 | 弹动的位置，0：顶端弹动；1：底部弹动|
| status | Number | 是 |是否调用onBounceStateChange方法，0：不调用；1-调用|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.notifyBounceEvent(1,1);
```

> ### showBounceView 显示弹动效果

`uexWindow.showBounceView(type,color,flag)`

**说明:**
显示弹动效果

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| type | Number | 是 | 弹动的位置，0：顶端弹动；1：底部弹动|
| color | String | 是 |弹动显示部位的颜色值，内容不超过一屏时底部弹动内容不显示|
| flag | String | 是 |是否显示内容，1：显示；0：不显示|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.showBounceView("1","rgba(15, 155, 155, 100)", 1);
```

> ### resetBounceView 设置弹动效果结束后显示的网页
  
`uexWindow.resetBounceView(type)`

**说明:**
设置弹动效果结束后显示的网页，一般在onBounceStateChange监听方法中调用该方法

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| type | Number | 是 | 弹动的位置，0：顶端；1：底部|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.resetBounceView("1");
```
  
> ### setBounceParams 设置弹动参数
  
`uexWindow.setBounceParams(type,status)`

**说明:**
设置弹动参数，用于自定义view样式

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| type | Number | 是 | 弹动的位置，0：顶端弹动；1：底部弹动|
| status | String | 是 | json格式的字符串|

status中字段的说明

|参数|是否必须|说明|
|-----|-----|-----|
|imagePath|是|下拉状态小图标的路径，只支持res:// 格式。路径协议详见<a href="http://newdocx.appcan.cn/index.html?templateId=301"target="_blank">CONSTANT</a>中Pathtypes|
|textColor|是|展示下拉状态文字的颜色,如："#ffffff"|
|levelText|是|显示的二级文字,如：“上次更新时间：xxxxx”。|
|pullToReloadText|是|开始拖动直到超过刷新临界线之前显示的文字,如：“拖动刷新”|
|releaseToReloadText|是|拖动超过刷新临界线后显示的文字,如：“释放刷新”|
|loadingText|是|拖动超过刷新临界线并且释放拖动，进入刷新状态时显示的文字,如：“加载中，请稍等”|
|loadingImagePath|否|等待状态loading小图标的路径，只支持res:// 格式（该字段为定制需求，默认无效）|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
var json='{"textColor":"#000","imagePath":"res://refesh_icon.png","levelText":"更新日期","pullToReloadText":"拖动到底部","releaseToReloadText":"释放回原处","loadingText":"更新中..."}';
uexWindow.setBounceParams(0, json);
```

> ### hiddenBounceView 隐藏弹动效果

`uexWindow.hiddenBounceView(type)`

**说明:**
隐藏弹动效果

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| type | Number | 是 | 弹动显示的部位，0：顶端；1：底部|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.hiddenBounceView(1)
```
  
  
> ### getUrlQuery 获取加载页面时传入的参数
  
`uexWindow.getUrlQuery()`

**说明:**
获取加载页面时传入的参数, 其回调函数是[cbGetUrlQuery](#cbgeturlquery 获取参数时的回调方法 "cbGetUrlQuery")

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.getUrlQuery()"/>
```

> ### setStatusBarTitleColor 设置状态条上字体的颜色
  
`uexWindow.setStatusBarTitleColor(color)`

**说明:**
设置状态条上字体的颜色

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| color | Number | 是 |状态条上字体的颜色，0为白色(iOS7以上为透明底,iOS7以下为黑底)， 1为黑色(iOS7以上为透明底,iOS7以下为白底)|

**平台支持：**
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.setStatusBarTitleColor(0);
```


> ### getSlidingWindowState 获取侧滑窗口显示情况
  
`uexWindow.getSlidingWindowState()`

**说明:**
获取侧滑窗口显示情况,回调方法[cbSlidingWindowState](#cbSlidingWindowState 获取侧滑窗口显示情况的回调方法 "cbSlidingWindowState")

**参数:**
```
无
```

**平台支持：**
   Android2.2+
   iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.getSlidingWindowState();
```
 
 


> ### setIsSupportSlideCallback 设置网页是否支持滑动的相关监听方法
  
`uexWindow.setIsSupportSlideCallback(param)`

**说明:**
因为网页在超过一屏的时候滑动会频繁回调，频繁回调会造成一定情况下的网页卡顿，因此增加该接口，默认屏蔽网页的滑动监听回调，若需要回调，则需要调用该接口。注意：若设置为支持滑动监听，则4.4以下系统手机会出偶现横竖屏切换之后滑动监听不生效的问题。滑动监听包括[onSlipedUpward](#onSlipedUpward 上滑的监听方法，内容超过一屏时有效)，[onSlipedDownward](#onSlipedDownward 下滑的监听方法，内容超过一屏时有效)，[onSlipedUpEdge](#onSlipedUpEdge 滑到顶部的监听方法，内容超过一屏时有效)，[onSlipedDownEdge](#onSlipedDownEdge 滑到底部的监听方法，内容超过一屏时有效)

**参数:**
```
var param = {
    isSupport://(必选)true:支持；false:不支持。默认为false。
}
```

**平台支持：**
   Android2.2+
   iOS6.0+

**版本支持：**
Android 2015_10_16_01+

**示例：**

```
var param = {
    isSupport:false
};
uexWindow.setIsSupportSlideCallback(JSON.stringify(param));
```

> ### disturbLongPressGesture 阻碍当前网页长按手势
  
`uexWindow.disturbLongPressGesture(flag)`

**说明:**

* 解决iOS 9下长按屏幕会出现放大镜的问题


**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
|flag|Number|是|取值 0或者1或者2 ，详细说明见下|

* flag == 0 取消阻碍长按手势
	* 在已设置阻碍长按手势的情况下，该flag会取消阻碍长按手势
* flag == 1 正常阻碍长按手势
	* 设置此flag后,会阻碍网页的长按事件，不会出现长按选择框(复制/剪切/粘贴等操作)
	* 非iPhone6s 、iPhone 6s Plus 机型，设置此flag后已经不会出现放大镜
	* 由于iPhone6s、iPhone 6s Plus 有3D Touch功能，而此功能额外提供了一个3D Touch longPress的事件,此事件也会产生放大镜。因此这两款手机上**用力长按屏幕**时，仍然会产生放大镜。
* flag == 2 严格阻碍长按手势
	* 设置此flag后，可以阻碍3D Touch longPress事件
	* **同时也会阻碍网页的onclick事件，但ontouchend事件不受影响**
	* 建议用户将网页内的所有onclick事件替换成ontouchend事件后，再调用此flag完美解决长按屏幕会出现放大镜的问题

**平台支持：**

iOS9.0+

**版本支持：**

iOS 2015_10_21+


**示例：**

```
uexWindow.disturbLongPressGesture(1);
```
 
 
> ### setAutorotateEnable 设置窗口是否跟随设备自动旋转
 
`uexWindow.setAutorotateEnable()`
 
**说明:**

是否跟随设备自动旋转，默认是跟随
 
**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| enable | Number | 是 | 是否跟随，0：跟随；1：不跟随|

 
**平台支持：**

Android2.2+  
iOS6.0+
 
**版本支持：**

3.0.0+
 
**示例：**
 
```
uexWindow.setAutorotateEnable(1);
```

> ### setHardwareEnable 设置窗口的硬件加速
 
`uexWindow.setHardwareEnable(flag)`
 
**说明:**
开启或关闭当前window的硬件加速，用于解决网页闪屏的问题。如果需要打开window时就是关闭状态，请参考uexWindow.open
 
**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| flag | Number | 是 | 是否开启，0：关闭；1：开启|

 
**平台支持：**

Android4.0+
 
**版本支持：**

3.2.0+
 
**示例：**
 
```
uexWindow.setHardwareEnable(1);
```

> ### setPopHardwareEnable 设置Popover的硬件加速功能
 
`uexWindow.setPopHardwareEnable(name,flag)`
 
**说明:**
开启或关闭当前popover的硬件加速，用于解决网页闪屏的问题，打开popover后调用。如果需要打开popover时就是关闭状态，请参考uexWindow.openPopover

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| flag | Number | 是 | 是否开启，0：关闭；1：开启|
| name | String | 是 | popover的name|

 
**平台支持：**
Android4.0+
 
**版本支持：**
3.2.0+
 
**示例：**
 
```
uexWindow.setPopHardwareEnable(‘content’,1);
```

> ### reload 重载当前页面

`uexWindow.reload();`

**说明**

无
     
**参数**

无

**平台支持**

Android 2.2+  
iOS 5.1.1+

**版本支持**

3.1.0+

**示例**

```
uexWindow.reload();

```

> ### topBounceViewRefresh 自动下拉刷新

`uexWindow.topBounceViewRefresh()`

**说明:**
下拉刷新初始化完成后，调用接口可达到自动下拉刷新效果，调用一次仅刷新一次。

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例**

`uexWindow.topBounceViewRefresh();`

> ### createPluginViewContainer 创建插件容器

`uexWindow.createPluginViewContainer(jsonStr);`

**说明:**
创建插件容器，供插件将页面填充进去
**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| jsonStr | json| 是 | 创建的插件容器的信息 |

```
var jsonStr  = {
            id:,//容器id
            x: ,//容器位置x坐标
            y: ,//容器位置y坐标
            w: ,//容器位置w宽度
            h: //容器位置h高度
        };	 
```

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.1.0+

**示例:**
```
        var params = {
            "id":"998",
            "x": 100,
            "y": 1064,
            "w":1200,
            "h":1600 
        };
        uexWindow.createPluginViewContainer(JSON.stringify(params));
```

> ### closePluginViewContainer 关闭插件容器

`uexWindow.closePluginViewContainer(jsonStr);`

**说明:**
关闭插件容器
**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| jsonStr | json| 是 | 关闭的插件容器的信息 |

```
        var jsonStr = {
            id : //容器id
        };	 
```

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.1.0+

**示例:**
```
        var params = {
            "id":"998"
        };
        uexWindow.closePluginViewContainer(JSON.stringify(params));
```


> ### showPluginViewContainer 显示插件容器

`uexWindow.showPluginViewContainer(jsonStr);`

**说明:**
显示隐藏的插件容器

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| jsonStr | json| 是 | 显示的插件容器的信息 |

```
        var jsonStr = {
            id : //容器id
        };	 
```

**平台支持：**
Android2.2+

**版本支持：**
3.1.0+

**示例:**
```
        var params = {
            "id":"998"
        };
        uexWindow.showPluginViewContainer(JSON.stringify(params));
```


> ### hidePluginViewContainer 隐藏插件容器

`uexWindow.hidePluginViewContainer(jsonStr);`

**说明:**
隐藏插件容器
**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| jsonStr | json| 是 | 隐藏的插件容器的信息 |

```
        var jsonStr = {
            id : //容器id
        };	 
```

**平台支持：**
Android2.2+

**版本支持：**
3.1.0+

**示例:**
```
        var params = {
            "id":"998"
        };
        uexWindow.hidePluginViewContainer(JSON.stringify(params));
```

> ### setPageInContainer 设置插件容器当前要显示的页面

`uexWindow.setPageInContainer(jsonStr);`

**说明**

设置插件容器当前要显示的页面

**参数**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| jsonStr | json| 是 | 设置当前展示容器的信息 |

```
var jsonStr = {
            id : ,//容器id
            index ://要显示页面index
        };	 
```

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.1.0+

**示例:**
```
var params = {
            id :"998"
            index : 1
        };
        uexWindow.setPageInContainer(JSON.stringify(params));
```
> ### hideStatusBar 隐藏状态栏
 
`uexWindow.hideStatusBar()`
 
**说明:**
隐藏状态栏
 
**参数:**
无
 
**平台支持：**
iOS7.0+
 
**版本支持：**
3.0.0+
 
**示例**
 
`uexWindow.hideStatusBar();`
 
> ### showStatusBar 显示状态栏
 
`uexWindow.showStatusBar()`
 
**说明:**
显示状态栏
 
**参数:**
无
 
**平台支持：**
iOS7.0+
 
**版本支持：**
3.0.0+
 
**示例**
 
`uexWindow.showStatusBar();`

> ### share 调用系统分享
 
`uexWindow.share(jsonStr)`
 
**说明:**  
调用系统的分享框
 
**参数:**  

jsonStr是JSON字符串，容许的字段如下表所示**(以下均为可选参数)**


|Key|Value类型|适用系统|说明|
|-----|-----|-----|-----|
|type|Number|Android|0-直接分享至微信朋友圈|
|title|String|Android|标题|
|subject|String|Android|子标题|
|text|String|Android iOS|文本内容|
|imgPath|String|Android iOS|单张图片的路径，支持file和wgt协议，图片需要先存到本地|
|imgPaths|Array|Android iOS|多张图片路径，由imgPath构成的数组|
|packageName|String|Android|包名。可与className搭配直接分享到某个应用。type传0时不需要传此项|
|className|String|Android|可与packageName搭配直接分享到某个应用。type传0时不需要传此项|

* iOS系统下，应用分享列表中只包含可以被分享的应用，不支持分享传入的内容的应用不会出现。
* Android系统下，应用分享列表中会包含所有带分享功能的应用。
* 由于系统差异，完成某些复杂的分享操作时(比如分享多张图片至微信)，此接口可能需要写2套代码。

**平台支持：**

iOS6.0+
注：6.0+的系统就可以调起此接口分享内容到系统应用，但在8.0之后才允许分享至第三方应用。

Android 2.3+
 
**版本支持：**

iOS 3.2.0+

Android 3.2.3+
 
**示例**

 
Android直接分享多张图片到微信朋友圈: 

```
function share() {
 	var imgs = ["/sdcard/DCIM/123.jpg","/sdcard/DCIM/119.jpg","/sdcard/DCIM/504.jpg"];
 	var params  = {
 		type:0,
 		text:"分享到朋友圈的文字内容",
 		imgPaths:imgs
 		};
 	var paramStr = JSON.stringify(params);
 	uexWindow.share(paramStr);
}
```  

iOS 分享多张图片至微信

```
function share(){
 	var param = {
 	imgPaths:["res://photo1t.jpg","res://photo2t.jpg"]
 	}
 	uexWindow.share(JSON.stringify(param));
}
```

> ### setSwipeCloseEnable 设置当前页面是否支持手势侧滑关闭
  
`uexWindow.setSwipeCloseEnable(jsonStr)`

**说明:**

禁止或者重新允许当前页面是否支持手势侧滑关闭
注意:仅对支持手势侧滑关闭的window有效!


**参数:**

jsonStr是JSON字符串，具体格式如下


```
var jsonStr = {
	enable: ,//Number,必选。传0表示禁止手势侧滑关闭，传1表示允许手势侧滑关闭
};	 
```

**示例:**

```
 var params  = {
 		enable:0,
 		};
 var paramStr = JSON.stringify(params);
 uexWindow.setSwipeCloseEnable(paramStr);

```  

**平台支持：**

Android 2.2+
iOS 6.0+

**版本支持：**

3.2.0+

> ### getHeight 获取window的高度
  
`uexWindow.getHeight(jsonStr)`

**参数:**  
无

**示例:**

```
 var height=uexWindow.getHeight();
 console.log("height: "+height);
 
```  

**平台支持：**

Android 2.2+  
iOS 6.0+

**版本支持：**

3.2.0+

> ### getWidth 获取window的宽度
  
`uexWindow.getWidth(jsonStr)`

**参数:**  
无

**示例:**

```
 var width=uexWindow.getWidth();
 console.log("width: "+ width);
 
```  

**平台支持：**

Android 2.2+  
iOS 6.0+

**版本支持：**

3.2.0+


## 2.2 回调方法

> ### cbConfirm 弹出confirm对话框的回调方法
  
`uexWindow.cbConfirm(opId,dataType,data)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| opId | Number | 是 |操作ID，此方法中不起作用|
| dataType | Number | 是 |参数类型详见CONSTANT中Callback方法数据类型|
| data | Number | 是 |返回的数据，用户点击的按钮索引|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**  

```  
function cbConfirm(opId, dataType, data){
        alert('选择了' + data);
}
window.uexOnload = function(type){
        uexWindow.cbConfirm = cbConfirm;
}
```


> ### cbPrompt 弹出prompt对话框的回调方法

`uexWindow.cbPrompt(opId,dataType,data)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| opId | Number | 是 | 操作ID，此方法中不起作用 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型|
| data | String | 是 | 返回用户点击对话框上的按钮索引及输入框中的值,json格式为 {"num":"0","value":"xxx"} |

`data`中各字段含义如下:

|参数|是否必须|说明|
|-----|-----|-----|
|num|是|索引|
|value|是|输入框中的值|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```

function cbPrompt(opId, dataType, data){
    alert(data);
}
window.uexOnload = function(type){
    uexWindow.cbPrompt = cbPrompt;
}
```

> ### cbActionSheet 弹出菜单列表的回调方法
  
`uexWindow.cbActionSheet(opId,dataType,data)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| opId | Number | 是 | 操作ID，此方法中不起作用 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型|
| data | Number | 是 | 返回的数据，用户点击的按钮索引 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
function actionSheet(){
    uexWindow.actionSheet("菜单","Cancel","Opt1,Opt2,Opt3,Opt4,Opt5,Opt6");
}
function cbActionSheet(opId, dataType, data){
    alert(data);
}
window.uexOnload = function(type){
    uexWindow.cbActionSheet = cbActionSheet;
}
```

> ### cbGetState 获取窗口是否处于前台的回调方法
  
`uexWindow.cbGetState(opId,dataType,data)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| opId | Number | 是 | 操作ID，此方法中不起作用 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型|
| data | Number | 是 | 返回的数据，0：前台；1：后台 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

> ### cbPageBack 返回到上一个页面的回调方法
  
`uexWindow.cbPageBack(opId,dataType,data)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| opId | Number | 是 | 操作ID，此方法中不起作用 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型|
| data | Number | 是 | 返回结果，0：成功；1：失败 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

> ### cbPageForward 前进到下一个页面的回调方法
  
`uexWindow.cbPageForward(opId,dataType,data)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| opId | Number | 是 | 操作ID，此方法中不起作用 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型|
| data | Number | 是 | 返回结果，0：成功；1：失败 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

> ### cbOpenMultiPopover 打开多页面浮动窗口的回调方法
  
`uexWindow.cbOpenMultiPopover(opId,dataType,data)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| opId | Number | 是 | 操作ID，此方法中不起作用 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型|
| data | String | 是 | 返回当前选择的浮动窗口页面的数据，json格式如下： {"multiPopName":"name","multiPopSelectedIndex":"index"} |

data字符串中各字段含义如下：

|参数|是否必须|说明|
|-----|-----|-----|
|multiPopName|是|多页面浮动窗口的名字|
|multiPopSelectedIndex|是|子页面窗口索引|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

> ### cbGetUrlQuery 获取参数时的回调方法
  
`uexWindow.cbGetUrlQuery(opId,dataType,data)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| opId | Number | 是 | 操作ID，此方法中不起作用 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型|
| data | Number | 是 |返回的数据 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+


> ### cbBounceState 获取网页弹动状态的回调方法
  
`uexWindow.cbBounceState(opId,dataType,data)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| opId | Number | 是 | 操作ID，此方法中不起作用 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型|
| data | Number | 是 | 0：关闭；1：开启 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+


> ### cbSlidingWindowState 获取侧滑窗口显示情况的回调方法
  
`uexWindow.cbSlidingWindowState(state)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| state | Number | 是 | 返回的显示情况，0：左侧菜单显示；1：主界面显示；2：右侧菜单显示 |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+


## 2.3 监听方法

> ### uexOnload 网页加载完成时的回调方法
  
`window.uexOnload(type)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| type | Number | 是 | 当前加载完毕View的类型。0:主窗口或者浮动窗口(即代表自己);1:上个slibing;2:下个slibing |

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例**
```
window.uexOnload = function(type){

}
```

> ### onSlipedUpward 上滑的监听方法，内容超过一屏时有效
  
`uexWindow.onSlipedUpward()`

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例**

```
uexWindow.onSlipedUpward = function(){
    console.log('onSlipedUpward');
}
```

> ### onSlipedDownward 下滑的监听方法，内容超过一屏时有效
  
`uexWindow.onSlipedDownward()`

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例**
类似onSlipedUpward

> ### onSlipedUpEdge 滑到顶部的监听方法，内容超过一屏时有效
  
`uexWindow.onSlipedUpEdge()`

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+
  
**版本支持：**
3.0.0+

**示例**
类似onSlipedUpward

> ### onSlipedDownEdge 滑到底部的监听方法，内容超过一屏时有效
  
`uexWindow.onSlipedDownEdge()`

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例**
类似onSlipedUpward

> ### onAnimationFinish 动画执行完成的监听方法，只对浮动窗口有效
  
`uexWindow.onAnimationFinish()`

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例:**

```
uexWindow.onAnimationFinish = onAnimationFinish;
function onAnimationFinish() {
    uexWindow.alert("应用名称","动画完毕","ok");
}
```

> ### onSetWindowFrameFinish 当前窗口位置移动完成的监听方法
  
`uexWindow.onSetWindowFrameFinish()`

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
window.uexOnload = function(type){
    uexWindow.onSetWindowFrameFinish = onSetWindowFrameFinish;
}
function onSetWindowFrameFinish(){
    alert('移动完成！');
}
```

> ### onSwipeRight 向右滑动的监听方法
  
`uexWindow.onSwipeRight()`

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.onSwipeRight = function(){
    console.log('onSwipeRight');
}
```

> ### onSwipeLeft 向左滑动的监听方法
  
`uexWindow.onSwipeLeft()`

**参数:**
无

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

> ### onBounceStateChange 弹动状态改变的监听方法
  
`uexWindow.onBounceStateChange(type,state)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| type | Number | 是 |对应的部位值，0：网页顶端；1：网页底部|
| state | Number | 是 |状态值，0：滑动事件开始；1：刷新事件开始；2：滑动事件结束|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例**
```
uexWindow.onBounceStateChange = onBounceStateChange;

function onBounceStateChange(type, state){
    switch(type) {
    case 0:
        if (state == 2) {
            uexWindow.resetBounceView("0");
        }
        break;
    case 1:
        if (state == 2) {
            uexWindow.resetBounceView("1");
         }
         break;
    }
}
```

> ### onGlobalNotification 全局消息的监听方法
  
`uexWindow.onGlobalNotification(data)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| data | String | 是 |消息，postGlobalNotification发送的消息数据|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

 **示例：**

```
window.uexOnload = function(type){
    uexWindow.onGlobalNotification = onGlobalNotification;
}

function onGlobalNotification(ret){
    console.log("index:"+ret);
}
```

> ### onKeyPressed 按键事件的监听方法
  
`uexWindow.onKeyPressed (keyCode)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| keyCode | String | 是 |按键的值，0:返回键;1:菜单键|

**平台支持：**
Android2.2+
**版本支持：**
3.0.0+
 
 **示例：**

```
uexWindow.onKeyPressed =function(keyCode){
    console.log(keyCode);
}
```

> ### onStateChange 窗口前后台状态变化的监听方法
  
`uexWindow.onStateChange(state)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| state | String | 是 |状态值，0:回到前台;1:压入后台|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+

**示例：**

```
uexWindow.onStateChange=function(state){
    console.log(state);
}
```
 

> ### onPopoverLoadFinishInRootWnd 浮动窗口加载完成的监听方法
  
`uexWindow.onPopoverLoadFinishInRootWnd(name,url)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| name | String | 是 |浮动窗口的名称|
| url | String | 是 |浮动窗口的url；当浮动窗口加载的是本地网页时，url返回网页的绝对路径（file:// 开头）当浮动窗口加载的是网络上的网页时，url返回网址（http:// 开头）|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.0.0+




> ### cbCreatePluginViewContainer 容器创建成功的回调方法
  
`uexWindow.cbCreatePluginViewContainer (opId,dataType,data)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| opId | Number | 是 |创建成功的容器id|
| dataType | Number | 是 |参数类型详见CONSTANT中Callback方法数据类型|
| data | String| 是 |返回的数据，success 创建成功|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.1.0+

**示例：**

```
window.uexOnload = function(type){
       uexWindow.cbCreatePluginViewContainer = function(opId, dataType, data){
			alert("cbCreatePluginViewContainer: " + data );
	}
}
```
> ### cbClosePluginViewContainer 容器关闭成功的回调方法
  
`uexWindow.cbClosePluginViewContainer(opId,dataType,data)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| opId | Number | 是 |被关闭的容器id|
| dataType | Number | 是 |参数类型详见CONSTANT中Callback方法数据类型|
| data | String| 是 |返回的数据，success 容器关闭成功|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.1.0+

**示例：**

```
window.uexOnload = function(type){
       uexWindow.cbClosePluginViewContainer = function(opId, dataType, data){
			alert("cbClosePluginViewContainer: " + data );
	}
}
```
> ### onPluginContainerPageChange容器页面切换回调
  
`uexWindow.onPluginContainerPageChange(opId,dataType,data)`

**参数:**

| 参数名称 | 参数类型  | 是否必选  |  说明 |
| -------- | --------- | --------- | ----- |
| opId | Number | 是 |页面切换的容器id|
| dataType | Number | 是 |参数类型详见CONSTANT中Callback方法数据类型|
| data | Number | 是 |容器当前显示页面的index|

**平台支持：**
Android2.2+
iOS6.0+

**版本支持：**
3.1.0+

**示例：**

```
window.uexOnload = function(type){
       uexWindow.onPluginContainerPageChange= function(opId, dataType, data){
			alert("onPluginContainerPageChange: " + data );
	}
}
```

#3 术语表

>### WindowAnimationId 窗口动画Id


> **基础动画**

* uex.cWindowAnimationNone=0	// 无动画
* uex.cWindowAnimationLeftToRight=1//由左往右推入
* uex.cWindowAnimationRightToLeft=2//由右往左推入
* uex.cWindowAnimationUpToDown=3//由上往下推入
* uex.cWindowAnimationDownToUp=4//由下往上推入
* uex.cWindowAnimationFadeOutFadeIn=5//淡入淡出
* uex.cWindowAnimationLeftFlip=6//左翻页（android暂不支持）
* uex.cWindowAnimationRigthFlip=7//右翻页（android暂不支持）
* uex.cWindowAnimationRipple=8//水波纹（android暂不支持）
* uex.cWindowAnimationLeftToRightMoveIn=9//由左往右切入
* uex.cWindowAnimationRightToLeftMoveIn=10//由右往左切入
* uex.cWindowAnimationTopToBottomMoveIn=11//由上往下切入
* uex.cWindowAnimationBottomToTopMoveIn=12//由下往上切入

> **以下为close专用，与9，10，11，12对应：**

* uex.cWindowAnimationLeftToRightReveal=13//由左往右切出，与10对应
* uex.cWindowAnimationRightToLeftReveal=14//由右往左切出，与9对应
* uex.cWindowAnimationTopToBottomReveal=15//由上往下切出，与12对应
* uex.cWindowAnimationBottomToTotextareaveal=16//由下往上切出，与11对应


> **Circle Zoom 效果 (仅iOS)**

* uex.cWindowAnimationCircleZoomAtCenter =101
	* 打开页面时，以页面中心为圆心，页面按圆形轮廓展开
	* 关闭页面时，以页面中心为圆心，页面按圆形轮廓收缩
* uex.cWindowAnimationCircleZoomAtLeftTop =102 //同上，但是圆心位于页面左上角
* uex.cWindowAnimationCircleZoomAtRightTop =103 //同上，但是圆心位于页面右上角
* uex.cWindowAnimationCircleZoomAtLeftBottom =104 //同上，但是圆心位于页面左下角
* uex.cWindowAnimationCircleZoomAtRightBottom =105 //同上，但是圆心位于页面右下角


> **Bounce效果(仅iOS)**

* uex.cWindowAnimationBounceFromLeft = 106
	* 页面从左侧弹入
	* 使用此动画时，传入的动画时间animDutarion无效，需通过配置extras里的bounciness和speed来控制动画时间
* uex.cWindowAnimationBounceFromTop = 107//同上，但页面从顶端弹入
* uex.cWindowAnimationBounceFromRight = 108//同上，但页面从右侧端弹入
* uex.cWindowAnimationBounceFromBottom = 109//同上，但页面从底端弹入
