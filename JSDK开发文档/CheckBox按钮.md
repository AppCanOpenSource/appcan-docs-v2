CheckBox组件是根据AppCan 布局框架对`<input type="checkbox" />`封装的HTML5代码片段，通过配合的样式，使开发者在界面中可以快速使用CheckBox控件。
### 依赖:
- appcan.js
- appcan.control.css

### 例如:

**HTML5代码**
````
<div class="checkbox umar-r"><input type="checkbox" 
class="uabs ub-con" ></div>````
**  JS代码**
````
$('.checkbox').find('input').on('change',function(evt){
/*添加Checkbox变更处理代码*/
});````