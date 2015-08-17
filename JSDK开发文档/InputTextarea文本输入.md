文本输入组件是根据AppCan 布局框架对`<input type="text" />`标签封装的HTML5代码片段，通过配合的样式，使开发者在界面中可以快速使用input标签。
### 依赖
- appcan.js
- appcan.control.js
- appcan.control.css

### 例如


** HTML5代码**
````
/*搜索框*/
<div class="sc-bg-active uinput ub ub-f1  bc-border uba">
<div class="uinn fa fa-search sc-text"></div>
<input placeholder="请输入搜索城市" type="text" class="ub-f1">
</div>
/*登陆表单*/
<form>
  <div class="umar-a uba bc-border">
      <div class="ub ub-ac ubb umh5 bc-border ">
          <div class=" uinput ub ub-f1">
    		   <div class="uinn fa fa-user sc-text"></div>
            <input placeholder="请输入搜索城市" type="text" class="ub-f1">
          </div>
      </div>
      <div class="ub ub-ac umh5 bc-border ">
          <div class=" uinput ub ub-f1">
            <div class="uinn fa fa-lock sc-text"></div>
    		   <input placeholder="请输入登录秘密吗" type="password" class="umw4 ub-f1">
          </div>
      </div>
  </div>
  <div class="uinn">
      <div class="btn ub ub-ac bc-text-head ub-pc bc-btn uc-a1"  id="submit">
          <div class="uinn3 fa fa-shield umh1 umw1"></div>
          登录
      </div>
  </div>
  <button type="submit"class="uinvisible"></button>
</form>````
**JS代码**
````
appcan.button("#submit", "ani-act", function() {
            $("form").submit();
        })
 
        $("form").on('submit', function() {
            appcan.request.postForm($("form"), function() {
                appcan.window.alert({
                    title : "提醒",
                    content : "您已经提交了表单:)",
                    buttons : '确定',
                    callback : function(err, data, dataType, optId) {
                        console.log(err, data, dataType, optId);
                    }
                });
            },function(err){
                
            });
            return false;
        });````
`配合form标签实现form的快捷提交。`