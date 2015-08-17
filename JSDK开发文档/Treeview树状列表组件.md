 树状列表组件是根据AppCan 布局框架对数据列表进行封装的JS对象，通过配合的样式，使开发者在界面中可以快速完成树状列表控件的开发。
### 依赖
- appcan.js
- appcan.control.js
- appcan.listview.js
- appcan.treeview.js
- appcan.control.css

### JS对象
  #### 函数
  > ### appcan.treeview({参数})
  
    selector:   /*选择器*/, 
    type:   thinLine or thickLine /*窄行和宽行设定*/,  
    hasIcon:   true or false /*是否有图片*/, 
    hasAngle:   true or false /*是否有右侧箭头*/, 
    hasTouchEffect:   true or false /*是否有点击效果*/, 
    touchClass:   'sc-bg-active' or 用户自定义/*列表条目点击效果CSS类*/,  
    defaultOpen:   1 2 or 3 /*默认打开第几项，必须包含数据*/ 
    isCloseOther:   true or false/*是否关闭其他组*/,  
    
  #### 方法
**  set(data)**
````
    data:JSON   对象数组，用于存储列表条目显示的文字图片等信息。 
````
** add(data,dir)**
````
    data: JSON 对象数组，用于存储列表条目显示的文字图片等信息。 
    dir: 0 or 1   用于设定数据是在列表前部添加还是后不。0为前部添加。默认为1 
````
 #####  open(index)：
  打开对应的第几项
 #####  click：
  列表条目备点击时调用此事件
#### 参数
````
    Obj  列表条目DOM对象 
    Data 列表条目对应数据源对象
    subObj 列表条目点击时的子元素DOM对象例如图片 
````
**listviewClick：**
  列表条目被点击时调用此事件
#### 参数
````
    Obj  列表条目DOM对象 
    Data 列表条目对应数据源对象
    subObj 列表条目点击时的子元素DOM对象例如图片 
````
###例子
** HTML5代码**

````
<div id="treeview" class="sc-bg">
</div>````

**JS代码**
   树状列表
   ````
	var tv = appcan.treeview({
	            selector : "#treeview",
	            defaultOpen : 1//默认打开第几项，必须包含数据
	        });
	        tv.set([{
	            header : "文本输入(input,texarea)",
	            name : "control",
	            url : "UIcontrol/input.html"
	        }, {
	            header : "列表(list)",
	            content : [{
	                title : '单行列表',
	                name : "listview",
	                url : "UIcontrol/listview.html"
            }, {
	                title : '分组列表',
	                name : "listview",
	                url : "UIcontrol/lv_group.html"
	            }]
        }, {
	            header : "标题导航栏(header)",
	            content : [{
	                title : '图片标题',
                name : "control",
	                url : "UIcontrol/nav-icon.html"
	            }, {
	                title : 'FontAwesome图片标题',
	                name : "control",
	                url : "UIcontrol/nav-fa.html"
	            }]
	        }]);
	tv.on('listviewClick', function(ele, data, obj) {
	            if (data.name && data.url) {
	                appcan.locStorage.setVal("lv_index", ele.data("index"));
	                appcan.window.open(data.name, data.url, 10);
	            }
	        });
	        tv.on('click', function(ele, obj, subobj) {
	            if (obj.name && obj.url) {
	                appcan.window.open(obj.name, obj.url, 10);
	            }
	        });````