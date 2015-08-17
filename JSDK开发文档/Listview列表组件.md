列表组件是根据AppCan 布局框架对数据列表进行封装的JS对象，通过配合的样式，使开发者在界面中可以快速完成列表控件的开发。
### 依赖
- appcan.js
- appcan.control.js
- appcan.listview.js
- appcan.control.css

### JS对象
 ####  函数
>  ###  appcan.listview({参数})

    selector:   /*选择器*/, 
    type:   thinLine or thickLine /*窄行和宽行设定*/,  
    hasIcon:   true or false /*是否有图片*/, 
    hasAngle:   true or false /*是否有右侧箭头*/, 
    hasSubTitle:   true or false /*是否有子标题*/, 
    hasTouchEffect:   true or false /*是否有点击效果*/, 
    hasCheckbox:   true or false /*是否有复选按钮*/, 
    hasRadiobox:   true or false /*是否有单选按钮*/, 
    align:   “left” or “right” /*checkbox和radiobox居左还是居右*/, 
    multiline:  1 2 or 3 /*主标题文字占用最大行数。到达行数显示不全使用…替换*/, 
    touchClass:   'sc-bg-active' or 用户自定义 /*列表条目点击效果CSS类*/, 
    hasControl:   true or false /*列表条目中是否包含switch组件。*/ 
    hasGroup:   true or false /*列表条目是否以分组的形式展示。*/ 
	
####   方法
**set(data)**
    data:JSON   对象数组，用于存储列表条目显示的文字图片等信息。 
 

**add(data,dir)**
 
     data: JSON 对象数组，用于存储列表条目显示的文字图片等信息。 
    dir: 0 or 1   用于设定数据是在列表前部添加还是后不。0为前部添加。默认为1 
	
**click：**
 
  列表条目备点击时调用此事件
  
> 参数:

    Obj  列表条目DOM对象 
    Data 列表条目对应数据源对象
    subObj 列表条目点击时的子元素DOM对象例如图片 
  
**checkbox:change**
  列表条目复选框变更时产生此事件
> 参数:

    Obj   列表条目DOM对象 
    Data  列表条目对应数据源对象，其中checked属性代表选择状态
  
** radio:change**
  列表单选框变更时产生此事件
> 参数:

    Obj   列表条目DOM对象 
    Data  列表条目对应数据源对象 其中checked属性代表选择状态
  
**switch:change**
  列表条目中的switch控件变更时产生此事件
> 参数:

    Obj   列表条目DOM对象 
    Data  列表条目对应数据源对象 其中switch.value代表switch状态
  
  
###范例

**HTML5代码**
 ````
<div id="listview" class="ubt sc-border sc-bg">
</div>````
**JS代码**
   set(data)中的JSON
   ````
hasSmallIcon
        [{
            title : "ISIS分支宣布将一法国人斩首。该组织声称如果法国不停止打击ISIS，将杀掉人质",
            describe:"",
            note : "",
            subTitle : "",
            subDescribe : "",
            subNote : "12:03",
            icon : "../css/res/appcan_s.png",
            icontitle:"",
            "switch":{
                mini:true,
                value:true
            }
        }]````
   单选列表
   ````
var lv = appcan.listview({
      selector : "#listview",
      type : "thinLine",
      hasIcon : false,
      hasAngle : false,
      hasSubTitle : false,
      multiLine : 1,
      hasRadiobox : true,
      align : 'left'
  });
 
  lv.set([{
      title : "中国红",
      subtitle : '<div class="umh1 umw3 us" style="background-color:#DF3031"></div>',
  }, {
      title : "蜜桃粉",
      subtitle : '<div class="umh1 umw3 us" style="background-color:#EC6897"></div>',
  }, {
      title : "青草绿",
      subtitle : '<div class="umh1 umw3 us" style="background-color:#66C669"></div>',
  }, {
      title : "天际蓝",
      subtitle : '<div class="umh1 umw3 us" style="background-color:#00A0E9"></div>',
  }, {
      title : "子夜灰",
      subtitle : '<div class="umh1 umw3 us" style="background-color:#434343"></div>',
  }]);````
   带switch控件列表
   ````
var lv1 = appcan.listview({
            selector : "#listview",
            type : "thinLine",
            hasIcon : false,
            hasAngle : false,
            hasControl:true,//包含控件
        });
        lv1.set([{
            title : "Switch:true",
            "switch":{//switch控件配置
                value:false,
                mini:true
            }
        },{
            title : "Switch:true",
            "switch":{
                value:true,
                mini:true
            }
        }
]);
        lv1.on("switch:change",function(ele,obj){
            lv1.updateItem(ele,"title","Switch:"+obj.switch.value);
        })````
   以组的形式展示的列表
   ````
var lv1 = appcan.listview({
	            selector : "#listview",
	            type : "thinLine",
	            hasGroup : true,
	            hasAngle : false
	        });
	        lv1.set([{
	            title : "A",
	            groupId : "A",
	            items : [{
	                title : "上海伯母杀婴案开庭 嫌犯忏悔",
                icon : "../css/res/appcan_s.png"
            }, {
 
                title : "百万日军投降，武器去向如何？国共并非对半分！",
                icon : "../css/res/appcan_s.png"
				}, {
	                title : "港媒：占中不得人心，内讧频繁！！",
	                icon : "../css/res/appcan_s.png"
	            }]
	        }, {
	            title : "B",
	            groupId : "B",
	            items : [{
	                title : "iPhone6 本月将登陆韩国：三星或兵败家门口",
                icon : "../css/res/appcan_s.png"
	            }, {
	                title : "苹果前雇员为乔帮主洗冤：个性强烈非恶意",
	                icon : "../css/res/appcan_s.png"
	            }]
	        }]);````