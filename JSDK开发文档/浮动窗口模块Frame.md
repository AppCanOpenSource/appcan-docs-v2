

封装相关浮动窗口的基础操作

[TOC]

>### appcan.frame.open(id,url,left,top,name,index,change,extraInfo)

  打开一个浮动窗口，如果不存在则会先创建然后再打开，如果存在则直接打开,如会在页面中查找id的元素，把id元素的宽高指定为浮动窗口的宽高，把id元素的font-size设置为id元素的font-size
```` 
    id:要打开浮动窗口的名称
    url:浮动窗口要加载的页面的地址,如果url是一个数组则打开多页面浮动窗口
    left:浮动窗口距离左边的距离
    top:浮动窗口距离上边的距离
    name:强制改变打开窗口的名称
    index:设置选中的多页面窗口的默认索引
    change:如果多页面浮动窗口改变时会触发该回调，该回调有以下两个参数：err:正确返回情况下为null,错误时为Error信息.
	res:返回当前选择的浮动窗口页面的数据，
````
  json格式如下： 
  
       {"multiPopName":"name","multiPopSelectedIndex":"index"} 各字段含义如下

| 参数  |  是否必须 |说明   |
| ------------ | ------------ | ------------ |
| multiPopName  |  是 | 多页面浮动窗口的名字  |
|   multiPopSelectedIndex|  是 |   子页面窗口索引|
 
    extraInfo:扩展参数，json格式如下： {"extraInfo":{"opaque":"true","bgColor":"#011","delayTime":"250"}}
**参数还可以以对象的形式传参:**
````
{
    id:'',
    url:'',
    left:'',
    top:'',
    name:'',
    index:'',
    change:''
}````
**例如：**

````
//弹出一个简单的demo浮动窗口,并打开appcan.cn
appcan.frame.open({
    id:'content',
    url:'http://appcan.cn',
    top:100,
    left:100
});
//打开多页面浮动窗口
var top = $('#header').offset().height;
            appcan.frame.open({
                id : "content",
                url : [{
                    "inPageName" : "LV0",
                    "inUrl" : "lv_thinline_content.html",
                }, {
                    "inPageName" : "LV1",
                    "inUrl" : "lv_thinline_angle_content.html",
                }, {
                    "inPageName" : "LV2",
                    "inUrl" : "lv_thinline_sub_angle_content.html",
                }],
                top : top,
                left : 0,
                index : appcan.locStorage.getVal("lv_index"),
                change : function(err, res) {
 
                }
            });
//另外一种使用方式
var frame = appcan.require('frame');
frame.open({
    id:'content',
    url:'http://appcan.cn',
    top:100,
    left:100
});
//打开多页面浮动窗口
frame.open({
    id:'content',
    url:['http://appcan.cn','http://3g2win.com'],
    top:100,
    left:100
});
````
>### appcan.frame.close(name)

   关闭指定的浮动窗口
   
    name:浮动窗口的名字
参数还可以以对象的形式传参：
````
{
    name:''
}````
**例如：**

````
//关闭demo浮动窗口
appcan.frame.close('demo');
//另外一种使用方式
var frame = appcan.require('frame');
frame.close('demo');
````
>### appcan.frame.resize(id,left,top,name)

   设置指定的浮动窗口恢复到指定窗口的大小，并设置浮动窗口的位置
	
    id:指定的元素，根据该元素设置浮动窗口的大小
    left:浮动窗口距离做边界的距离
    top:浮动窗口距离上边界的距离
    name:要设置的浮动窗口的名称，_**如果id没有传值的话使用这个值
参数还可以以对象的形式传参：
````
{
        id:'',
        left:'',
        top:'',
        name:''
    }````
**例如：**

````
 //重置demo窗口,位置
    appcan.frame.resize({
        id:'container',
        left:100,
        top:100
    });
    //另外一种使用方式
    var frame = appcan.require('frame');
    frame.resize({
        id:'container',
        left:100,
        top:100
    });
````
>### appcan.frame.resizePopoverByEle(id,left,top,name)

   设置指定的浮动窗口恢复到指定窗口的大小，并设置浮动窗口的位置
	
    id:指定的元素，根据该元素设置浮动窗口的大小
    left:浮动窗口距离做边界的距离
    top:浮动窗口距离上边界的距离
    name:要设置的浮动窗口的名称，如果id没有传值的话使用这个值
参数还可以以对象的形式传参：
````
{
        id:'',
        left:'',
        top:'',
        name:''
    }
	````
**例如：**

````
 //重置demo窗口,位置
    appcan.frame.resizePopoverByEle({
        id:'container',
        left:100,
        top:100
    });
    //另外一种使用方式
    var win = appcan.require('frame');
    win.resizePopoverByEle({
        id:'container',
        left:100,
        top:100
    });````

>### appcan.frame.bringToFront(name)

   把指定的浮动窗口设置为最上层
	
    name:要设置的弹出层的名称
参数还可以以对象的形式传参：
````
{
    name:''
}````

**例如：**

````
//把demo窗口显示到所有窗口最上面
appcan.frame.bringToFront('demo');
//另外一种使用方式
var frame = appcan.require('frame');
frame.bringToFront('demo');
````
>### appcan.frame.evaluateScript(name,popName,scriptContent)

   在指定的浮动窗口内执行响应的脚本
	
    name:要执行脚本的窗口名称
    popName:要执行的浮动窗口的名称
    scriptContent:要执行的脚本内容
参数还可以以对象的形式传参：
````
{
    name:'',
    popName:'',  
    scriptContent:''
}````
**例如：**

````
//在demo窗口的浮动窗口执行脚本
appcan.frame.evaluateScript({
    name:'demo',
    popName:'demoPop',  
    scriptContent:'alert("hello world")'
});
 
//另外一种使用方式
var frame = appcan.require('frame');
frame.evaluateScript({
    name:'demo',
    popName:'demoPop',
    scriptContent:'alert("hello world")'
});````
>### appcan.frame.openMulti(popName,content,dataType, left, top, width, height, fontSize, flag, indexSelected)

   打开多页面浮动窗口
	
    popName:打开新窗口的名称
    content:要传入的数据，一个json对象，或者json字符串，结构必须为````{'content':[{"inPageName":"p1", "inUrl":"xxx1.html","inData":""}]}```` 其中：inPageName:所包含的单页面窗口的名字，inUrl：url类型数据，inData：窗口的内容的二进制数据，可为空
    dataType:窗口载入的数据的类型，0：url方式载入；1：html内容 方式载入；2：既有url方式，又有html内容方式
    left:距离左边界的距离
    top:距离上边界的距离
    width:窗口的宽
    height:窗口的高
    fontSize:字体的大小
    flag:窗口类型
          0: 普通窗口
          1: OAuth 窗口
          2: 加密页面窗口
          4: 强制刷新
          8: url用系统浏览器打开
        16: view不透明
        32: 隐藏的winwdow
        64: 等待popOver加载完毕后显示
      128: 支持手势
      256: 标记opn的window上一个window不隐藏
      512: 标记open的浮动窗口用友打开wabapp
    indexSelected:默认显示的索引项，默认显示第一项
参数还可以以对象的形式传参：
````
{
    popName:'',
    content:'',
    dataType:'',
    left:'',
    top:'',
    width:'',
    height:'',
    fontSize:'',
    flag:'',
    indexSelected:''
}````
**例如：**

````
//打开一个四个窗口的浮动窗口
appcan.frame.openMulti({
    popName:'nav',
    content:{
        content:[{
            inPageName:'p1',
            inUrl:'http://www.appcan.cn',
            inData:''
        },{
            inPageName:'p2',
            inUrl:'http://www.appcan.cn',
            inData:''
        },{
            inPageName:'p3',
            inUrl:'http://www.appcan.cn',
            inData:''
        },{
            inPageName:'p4',
            inUrl:'http://www.appcan.cn',
            inData:''
        }]
    },
    height:500,
    dataType:0,
    indexSelected:2
});
//另外一种使用方式
var frame = appcan.require('frame');
frame.openMulti({
    popName:'nav',
    content:{
        content:[{
            inPageName:'p1',
            inUrl:'http://www.appcan.cn',
            inData:''
        },{
            inPageName:'p2',
            inUrl:'http://www.appcan.cn',
            inData:''
        },{
            inPageName:'p3',
            inUrl:'http://www.appcan.cn',
            inData:''
        },{
            inPageName:'p4',
            inUrl:'http://www.appcan.cn',
            inData:''
        }]
    },
    height:500,
    dataType:0,
    indexSelected:2
});
````
>### appcan.frame.closeMulti(popName)

   关闭多页面浮动窗口

    popName:多页面窗口的名称
参数还可以以对象的形式传参：
````
{
    popName:''
}````
**例如：**

````
//关闭指定的多页面浮动窗口
appcan.frame.closeMulti('nav');
//另外一种使用方式
var frame = appcan.require('frame');
frame.closeMulti('nav');
````
>### appcan.frame.selectMulti(popName,index)

   设置多页面浮动窗口跳转到的子页面窗口的索引

    popName:要设置的多页面浮动窗口的名称
    index:要设置的多页面浮动窗口页面的索引
参数还可以以对象的形式传参：
````
{
    popName:'',
    index:''
}````
**例如：**

````
//选择第三个页面
appcan.frame.selectMulti('nav',2);
//另外一种使用方式
var frame = appcan.require('frame');
frame.selectMulti('nav',2);
````

>### appcan.frame.sendToBack(name)

   把指定的浮动窗口设置到最下层

    name:要设置的浮动窗口名称
参数还可以以对象的形式传参：
````
{
    name:''
}````
**例如：**

````
//把a窗口放到最下成
appcan.frame.sendToBack('a')
//另外一种使用方式
var frame = appcan.require('frame');
frame.sendToBack('a')
````
>### appcan.frame.setBounce(bounceType,startPullCall,downEndCall,upEndCall,color,imgSettings)

   设置上下弹动效果 

    bounceType:弹动的类型,如果为多个请用数组
    0: 无任何效果
    1: 颜色弹动效果
    2: 设置图片弹动
    startPullCall:开始滑动时触发回调
    downEndCall:当弹动类型设置为下边界弹动时，如果页面到了下边界则会触发该回调
    upEndCall:当弹动类型设置为上边界弹动时，如果页面到了上边界则会触发该回调
    color:如果超过了该边界显示的背景颜色
    imgSettings:如果超过了该边界，并且想要设置显示的内容包括图片文字则设置该参数
关于imgSettings的设定的实例:
````
   {
        "imagePath":"res://reload.png",
        "textColor":"#530606",
        "pullToReloadText":"拖动刷新",
        "releaseToReloadText":"释放刷新",
        "loadingText":"加载中，请稍等"
    }````
**参数还可以以对象的形式传参：**
````
{
        bounceType:'',
        startPullCall:function(){
            //do somethings
        },
        downEndCall:function(){
            //do somethings
        },
        upEndCall:function(){
            //do somethings
        },
        color:'',
        imgSettings:{}
    }````
**例如：**

````
//给页面天加一个简单的弹动效果
    appcan.frame.setBounce({
        bounceType:'1',
        color:'#F00',
        upEndCall:function(type){
            
        }
    });
    //另一种使用方式
    var frame = appcan.require('frame');
    frame.setBounce({
        bounceType:'1',
        color:'#F00',
        upEndCall:function(type){
            
        }
    });````