###iOS 3.3公测 改动汇总

`update:2016-3-22`

###引擎改动

* 引擎支持的最低系统版本为7.0
* 引擎中插件调用部分代码用JavaScriptCore进行了重构(for 插件开发者)
	* 现在支持插件的同步调用，允许插件直接返回值给前端
	* 现在插件接收到的参数会正确的反映其数值类型，而不全是NSString
	* 可以实现独立于UIWebView的JS上下文,从而可以在后台运行JavaScript。
*  以下引擎方法现在可以同步返回结果
	* uexWindow.getUrlQuery
	* uexWindow.getState
	* uexWidgetOne.getPlatform 
* 新增如下接口,具体说明详见引擎文档
	* uexWindow.getWidth
	* uexWindow.getHeight
	* uexWindow.putLocalData
	* uexWindow.getLocalData


###插件改动

* uexDevice
	* 部分接口现在支持同步调用
* uexApplePay
	* 部分接口现在支持同步调用

### 插件出新

* uexBackground
	* 后台插件，让App在后台时也能保持活跃状态，实现后台定位，后台上报，后台数据更新等功能
	* 具体说明见插件文档