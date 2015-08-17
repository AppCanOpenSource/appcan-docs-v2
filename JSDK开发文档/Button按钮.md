 按钮组件是一组根据AppCan 布局框架封装的HTML5代码片段，通过配合的样式和JS对象appcan.button，使开发者在界面中可以快速引用、定位按钮控件，并可以快速的完成按键事件的监听和控制。按钮支持Font awesome字图图标，可直接使用。


 
### 依赖
- appcan.js
- appcan.control.js
- appcan.control.css

###  JS对象

>  ### appcan.button(selector, css, callback)

    selector 按钮的选择器，例如 .btn、div或#id。可同时处理多个按钮 
    css 按钮点击后的效果CSS类名称。预置 ani-act和 btn-act 
    callback 按钮点击后的回调函数，回调函数中this代表点击的按钮 
	
###例如

**HTML5代码**
  ````
/*纯文本按钮*/
<div class="btn ub ub-ac bc-text-head ub-pc bc-btn uc-a1"  id="btn1">
                按钮
</div>
/*带图标按钮*/
<div class="btn ub ub-ac bc-text-head ub-pc bc-btn uc-a1"  id="btn2">
<div class="uinn3 fa fa-check umh1 umw1"></div>
导航
</div>````

**JS代码**
````
appcan.button(".btn", "ani-act", function() {
/*添加按钮点击处理代码*/
console.log(this.id)
})````