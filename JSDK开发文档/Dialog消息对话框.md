消息对话框组件是根据AppCan uexWindow对象中对话框接口封装的JS对象，使开发者在界面中可以快速使用对话框完成用户的交互操作。
### 依赖
- appcan.js

### 例如

**JS代码**
 ````
/*用户确认提示框*/
appcan.window.alert({
      title : "提示",
      content : "您是否要支付当前订单?",
      buttons : ['确定', '取消'],
      callback : function(err, data, dataType, optId) {
          console.log(err, data, dataType, optId);
      }
});
/*进度提示框*/
appcan.window.openToast("正在校验中,请稍后", 2000, 5);````
> **关联appcan.window对象**
appcan.window.alert(title,content,buttons,callback)
　