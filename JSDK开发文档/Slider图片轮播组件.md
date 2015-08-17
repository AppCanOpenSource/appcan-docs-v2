 图片轮播组件是根据AppCan 布局框架对图片轮播封装的JS对象，通过配合的样式，使开发者在界面中可以快速完成图片轮播界面的开发。
### 依赖
- appcan.js
- appcan.control.js
- appcan.slider.js
- appcan.control.css

### JS对象
  #### 函数
  >###  appcan.slider({参数})
  
    selector:   /*选择器*/, 
    hasIndicator: true or false  /*是否有位置提示条*/, 
    hasLabel: true or false   /*是否有标签文字栏*/, 
    aspectRatio: 0 or !=0   /*是否控制纵横比，0为使用控件高度，>0使用纵横比*/, 
    index: 0 or >0   /*默认选择项*/ 
    auto:2000   /*轮播时间，单位毫秒*/ 
  #### 方法
**set(data)**
````
     data:JSON   对象数组，用于存储显示的图片、提示文字信息 
````
** clickItem事件**
````
     data:JSON   点击条目时触发，告知点击的索引和索引对应的数据对象 
````
### 例如


**HTML5代码**
````
<div id="slider" class="slider">
</div>````
** JS代码**
 ````
var slider = appcan.slider({
      selector : '#slider',
      aspectRatio:6/16,
      hasLabel:true,
      index:1,
      auto:2000
  });
  slider.set([{
      img : "../images/loading_pic1.jpg",
      label:"快速！丰富稳定的UI组件、海量的行业UI模板，快速拼装APP"
  }, {
      img : "../images/loading_pic2.jpg",,
      label:"便捷！网络部署APP，摆脱数据线"
  }, {
      img : "../images/loading_pic3.jpg",,
      label:"高效！项目云端同步，多人协同开发"
  }, {
      img : "../images/loading_pic4.jpg",,
      label:"所见即所得！真机同步调试应用代码"
  }, {
      img : "../images/loading_pic5.jpg",,
      label:"高效！代码提示，无忧编程"
  }])
  slider.on("clickItem",function(index,data){
      console.log(index,data);
  })````