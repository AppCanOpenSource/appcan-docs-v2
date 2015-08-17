 Select组件是根据AppCan 布局框架对select标签封装的HTML5代码片段，通过配合的样式，使开发者在界面中可以快速使用Select控件。
### 依赖
- appcan.js
- appcan.control.js
- appcan.control.css

### JS对象
 > ### appcan.select(selector, callback)
 
    selector  select的选择器，例如 .select、div或#id。可同时处理多个下拉按钮 
    callback  Select点击后的回调函数，告知select标签对应dom对象和选中的状态和选中的option的value 
### 例如

**HTML5代码**
````
<div class="select uba bc-border bc-text">
  <div class="text">
      请选择
  </div>
  <div class="icon"></div>
  <select selectedindex="0">
      <option value=0>选项一</option>
      <option value=1>选项二</option>
      <option value=2>选项三</option>
      <option value=3>选项四</option>
  </select>
</div>````
**JS代码**
````
appcan.select(".select",function(ele,value){
console.log(value);
});````