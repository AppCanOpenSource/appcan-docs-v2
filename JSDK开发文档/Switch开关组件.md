开关组件是一组根据AppCan 布局框架封装的HTML5代码片段，通过配合的样式和JS对象appcan.switch，使开发者在界面中可以快速创建开关控件，并可以快速的完成事件的监听和控制。
### 依赖
- appcan.js
- appcan.control.js
- appcan.control.css

### JS对象
  >### appcan.switchBtn(selector, css, callback)
  
````
    selector  按钮的选择器，例如 .btn、div或#id。可同时处理多个按钮
    css Switch  开启后的背景CSS类名称。预置 bc-head。可选参数 
    callback switch  状态变更后的回调函数 
````
###例子


**HTML5代码**
````
<div class="switch uba bc-border data-checked="true">
　　<div class="switch-btn sc-bg-active "></div>
</div>````
**JS代码**
````
appcan.switchBtn(switchBtns,function(obj,value) {
    console.log(“switch status:”,value);
})
````

>###  appcan.updateSwitch(obj)

````
    obj:   需要操作的dom对象 

````
 **说明**：调用此方法操作更改dom对象下的switch开关状态，如果原来为true.更改为false,原来为false,更改为true;
###例子:

**HTML5代码**
````
<div class="switch uba bc-border data-checked="true">
　　<div class="switch-btn sc-bg-active "></div>
</div>````
**JS代码**
````
appcan.updateSwitch($('.switch'))````