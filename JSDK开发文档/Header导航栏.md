导航栏组件是一组根据AppCan布局框架封装的HTML5代码片段，通过配合的样式和JS对象appcan.button，使开发者在界面中可以快速创建导航栏，并可以快速的完成按键事件的监听和控制。按钮支持Font awesome字图图标，可直接使用。
### 依赖
- appcan.js
- appcan.control.js
- appcan.control.css

### JS对象
 > ### appcan.button(selector, css, callback)
 
    selector  按钮的选择器，例如 .btn、div或#id。可同时处理多个按钮
    css  按钮点击后的效果CSS类名称。预置 ani-act和 btn-act 
    callback  按钮点击后的回调函数，回调函数中this代表点击的按钮 
### 例如

**HTML5代码**
````
<div id="header" class="uh bc-text-head ub bc-head">
      <div class="nav-btn" id="nav-left">
          <div class="fa fa-home ulev2"></div>
      </div>
      <h1 class="ut ub-f1 ulev-3 ut-s tx-c" tabindex="0">FontAwesome图片标题</h1>
      <div class="nav-btn" id="nav-right">
      </div>
  </div>````
**JS代码**
  ````
appcan.button(".nav-btn", "btn-act", function() {
    appcan.window.close(-1);
})````