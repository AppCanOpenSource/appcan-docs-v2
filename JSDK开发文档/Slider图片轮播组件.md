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
	hasContent: true or false 支持slider设置文字区域
	canDown: true or false 设置图片/文字区域是否可以下拉
	hasCircle: true or false 设置圆点位置提示标志
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
  })
  ````
  
 ### hasContent参数示例
**说明：**
说明：默认hasContent为false，当hasContent为false的时候slider支持图片区域；当hasContent为true的时候slider支持文字区域
相关说明：size 设置文字内容区域的文字大小
**版本支持：**
JSSDK1.18
**测试case：**
[下载](http://appcan-download.oss-cn-beijing.aliyuncs.com/appcan_sdk%2Fslider%E6%9B%B4%E6%96%B0.zip "下载")
````
var slider = appcan.slider({
  selector : '#slider',
  aspectRatio:12/16,
  hasContent:true,
  index:0,
  hasIndicator:true,
  size:20,
});
slider.set([{
    note:'2如果你的新项目预算很低，那么免费网站模板对你来说是一个很好的解决方案。有很多的预先设计的网站模板PSD素材可以使用和自由定制。在这里，你会发现可供下载的超级棒的免费网站模板。你可以使用它们来创建自己的网站或只是寻找灵感',
    label:"123"
}, {
    note:'2如果你的新项目预算很低，那么免费网站模板对你来说是一个很好的解决方案。有很多的预先设计的网站模板PSD素材可以使用和自由定制。在这里，你会发现可供下载的超级棒的免费网站模板。你可以使用它们来创建自己的网站或只是寻找灵感',
    label:"456"
}, {
   note:'2如果你的新项目预算很低，那么免费网站模板对你来说是一个很好的解决方案。有很多的预先设计的网站模板PSD素材可以使用和自由定制。在这里，你会发现可供下载的超级棒的免费网站模板。你可以使用它们来创建自己的网站或只是寻找灵感',
    label:"789"
}, {
    note:'如果你的新项目预算很低，那么免费网站模板对你来说是一个很好的解决方案。有很多的预先设计的网站模板PSD素材可以使用和自由定制。在这里，你会发现可供下载的超级棒的免费网站模板。你可以使用它们来创建自己的网站或只是寻找灵感',
    label:"101"
}, {
    note:'如果你的新项目预算很低，那么免费网站模板对你来说是一个很好的解决方案。有很多的预先设计的网站模板PSD素材可以使用和自由定制。在这里，你会发现可供下载的超级棒的免费网站模板。你可以使用它们来创建自己的网站或只是寻找灵感',
    label:"112"
}])
````
### canDown参数示例
**说明:**
默认canDown为true，当canDown为true的时候图片/文字区域可以进行下拉；当canDown为false的时候图片/文字区域禁止下拉。
**版本支持：**
JSSDK1.18
**测试case：**
[同hasContent参数示例](#hasContent参数示例 "下载")
 
````
 var slider = appcan.slider({
 selector:'#slider',
 hasIndicator:false,
 aspectRatio:16/16,
 canDown:false,
});
slider.set([{
    img :"css/res/28364.jpg", 
}, {
    img : "css/res/28365.jpg",
}, {
   img : "css/res/28364.jpg",
}, {
    img : "css/res/28365.jpg",
}, {
    img : "css/res/28364.jpg",
}])
 slider.on("clickItem",function(index,data){
      console.log(index,data);
      })
````
### hasCircle参数 示例
**说明：**
默认hasCircle为true，当hasCircle为true的时候在图片/文字区域显示圆点位置提示标志；当hasCircle为false时不显示
相关说明：site 设置圆点提示标志的位置，默认情况下site水平居中，'Right'圆点提示标志位于右边，'Left'圆点提示标志位于左边
**版本支持：**
JSSDK1.18
**测试case：**
[同hasContent参数示例](#hasContent参数示例 "下载")

````
var slider = appcan.slider({
 selector : '#slider',
 hasIndicator:false,
 aspectRatio:16/16,
 hasCircle:true,
 site:'Right',
});
slider.set([{
    img :"css/res/28364.jpg", 
}, {
    img : "css/res/28365.jpg",
}, {
   img : "css/res/28364.jpg",
}, {
    img : "css/res/28365.jpg",
}, {
    img : "css/res/28364.jpg",
}])
 slider.on("clickItem",function(index,data){
      console.log(index,data);
  })

````