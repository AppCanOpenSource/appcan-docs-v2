 Tab组件是根据AppCan 布局框架对数据列表进行封装的JS对象，通过配合的样式，使开发者在界面中可以快速完成选项卡控件的开发。
### 依赖
- appcan.js
- appcan.control.js
- appcan.tab.js
- appcan.control.css

### JS对象
 ####  函数
>  ### appcan.tab({参数})

````
    selector:   /*选择器*/, 
    hasIcon : true or false  /*是否有图标*/, 
    hasAnim : true or false   /*切换时是否有动画*/ 
    hasLabel : true or false   /*是否有文字*/, 
    hasBadge : false or false  /*是否有badge*/ 
    data :[{ /*选项卡数据*/ label : "全部", /*显示文字*/ icon: "fa-home" /*显示Font Awesome 图标*/ }, { label : "待办", icon: "icon-edit ub-img",/*显示图片图标*/ }, { label : "已办", icon: "fa-home", badge: 1 /*显示badge数字*/ }]  
````
#### 方法
**set(data)**
````
    data:JSON   对象数组，用于存储列表条目显示的文字图片等信息。
````
**add(data,dir)**
````
    data: JSON 对象数组，用于存储列表条目显示的文字图片等信息。 
    dir: 0 or 1   用于设定数据是在列表前部添加还是后不。0为前部添加。默认为1 
````
**click：**
TAB条目被点击时调用此事件
 ####参数:
````
    Obj TAB条目DOM对象 
    Index TAB条目索引
   数据源对象中switch.value代表switch状态
````
** moveTo(index)**
// TAB条目切换调用此方法
 #####参数:
````
     index :TAB条目索引 
````
###例如

**HTML5代码**
````
<div id="tabview" class="uf sc-bg ubb bc-border" id="">
</div>````
**JS代码**

   配合AppCan window 多浮动窗口，完成类网易新闻多内容区切换效果
   ````
var tabview = appcan.tab({
    selector : "#tabview",
    hasIcon : false,
    hasAnim : true,
    hasLabel : true,
    hasBadge : false,
    data : [{
label : "全部",
    }, {
label : "待办",
    }, {
label : "已办",
    }]
});
tabview.on("click",function(obj, index){ /*TAB变更时切换多浮动窗口*/
    appcan.window.selectMultiPopover("content",index);
})
appcan.ready(function() {
    var top = $('#header').offset().height + $('#tabview').offset().height;
    appcan.frame.open({/*创建多浮动窗口*/
id : "content",
url : [{
    "inPageName" : "switch",
    "inUrl" : "switch_content.html",
}, {
    "inPageName" : "radio",
    "inUrl" : "radio_content.html",
}, {
    "inPageName" : "checkbox",
    "inUrl" : "checkbox_content.html",
}],
top : top,
left : 0,
index : 0,
change:function(index,res){ /*浮动窗口推拽变更时回调，可控制tab进行同步变更*/
    tabview.moveTo(res. multiPopSelectedIndex);
}
    });
    window.onorientationchange = window.onresize = function() {
appcan.frame.resize("content", 0, top);
    }
});````