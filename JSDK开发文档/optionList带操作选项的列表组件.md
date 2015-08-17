实现列表项可向左滑动后右侧显示隐藏内容，点击可进行自定义操作**（此组件依赖最新的appcan.js及引擎支持）**
### 依赖
- appcan.js
- appcan.control.js
- appcan.optionList.js
- appcan.control.css

###UI展示
![](http://newdocx.appcan.cn/docximg/173028t2015w6t16r.jpg)
###JS对象
 ####  函数
   >### appcan.optionList({参数})
   
````
    selector:   /*选择器*/, 
    type:   hiddenLine /*隐藏类型*/, 
    multiShow :   false,/*滑动是否可显示多行隐藏的内容*/ 
    duration :   300ms /*滑动显示隐藏动画时间*/, 
````
#### 方法
** set(data)**
````
    data:JSON:   对象数组，用于存储列表条目显示的文字图片等信息。  
    data.content:   /*列表内容*/ 
    data.height:   /*列表高度，默认为内容区域撑开高度*/ 
    data.onLongTap:  /*列表长按事件回调函数*/ 
    data.hideOption.content:   string/数组 /*隐藏区域内容*/  
    data.hideOption.style.fontSize:   /*隐藏区域字体大小*/ 
    data.hideOption.style.background:   /*隐藏区域背景颜色*/ 
    data.hideOption.onClick(e,index,length):  /*点击隐藏区域的回调函数*/   ;
	     e:供操作的event,
	     index:列表序列索引，
	     length:列表长度
````
** add(data,dir)**
````
    data: JSON 对象数组，用于存储列表条目显示的文字图片等信息。 
    dir: 0 or 1   用于设定数据是在列表前部添加还是后不。0为前部添加。默认为1 
    on(e,index,length)
        e:供操作的event,
        index:列表序列索引，
        length:列表长度
````
### 例如

**HTML5代码**
  ````
<div id="listview" >
</div>````
**JS代码**
[demo下载](http://download.appcan.cn/appcan_sdk/optionList-demo.zip "demo下载")
   ````
appcan.ready(function() {
var updateData = [{
            content : "这是一个带操作选项的optionList的demo",
            height:"5em",
            hideOption : {
                content : ["操作1","操作2"],
                style :{
                    fontSize : "2em",
                    background : "red"
                },
                onClick:function(e,index,length){
                    console.log(e);
                    console.log(e.currentTarget);
                    console.log(e.target);
                    console.log(index);
                    console.log(length);
                }
            }, 
            onLongTap:function(e,index){
                console.log(e);
console.log(index);
            }
        }, {
            content : '
		这是一个带操作选项的optionList的demo
 
',
            height:"3em",
            hideOption : {
                content : "
		11111111
 
		222222
 
",
                style :{
                    fontSize : "1.5em",
                    background : "red"
                },
                onClick:function(e,index,length){
                    alert(2);
                }
            }
        }];
var lv1 = appcan.optionList({
            selector : "#listview",
            type : "hiddenLine",
            id : 1,
            duration :"300ms",
            multiShow : false
        });
      lv1.set(updateData);
lv1.on("click",function(e){
alert(e);
})
}) ````