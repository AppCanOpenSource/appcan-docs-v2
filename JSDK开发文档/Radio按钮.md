 Radio组件是根据AppCan 布局框架对`<input type="radio" />`封装的HTML5代码片段，通过配合的样式，使开发者在界面中可以快速使用RadioBox控件。
### 依赖
- appcan.js
- appcan.control.css

###例如

**HTML5代码**
````
<div class="radiobox umar-r" name=""><input type="radio"
 class="uabs ub-con" name="lv_radio_0>"></div>
 ````
**JS代码**
````
$('.radiobox').find('input').on('change',function(evt){
/*添加Radio变更处理代码*/
});````