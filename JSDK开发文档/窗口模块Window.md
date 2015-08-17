


appcan是多窗口的，该模块封装了关于窗口的基础操作

[TOC]

>###appcan.window.open(name,data,aniId,type,dataType,width,height,animDuration,extraInfo)

   打开一个新的窗口
````
    name:新窗口的的名称，如果窗口存在直接打开，如果不存在先创建然后打开
    data:新窗口填充的数据
    dataType:新窗口填充的数据类型
           0: url
            1: html 数据
            2: html 和 url 混合数据
    aniId:动画类型Id
            0: 无动画
            1: 从左向右推入
            2: 从右向左推入
            3: 从上向下推入
            4: 从下向上推入
            5: 淡入淡出
            6: 左翻页
            7: 右翻页
            8: 水波纹
            9: 由左向右切入
          10: 由右向左切入
          11: 由上先下切入
          12: 由下向上切入
          13: 由左向右切出
          14: 由右向左切出
          15: 由上向下切出
          16: 由下向上切出
    type:窗口类型
            0: 普通窗口
            1: OAuth 窗口
            2: 加密页面窗口
            4: 强制刷新
          16: view不透明
          32: 隐藏的window
          64: 等待popOver加载完毕后显示
        128: 支持手势
        256: 标记open的window上一个window不隐藏
        512: 标记open的浮动窗口用友打开wabapp
    width:要打开的窗口宽度，请传0
    height:要打开的窗口高度，请传0
    animDuration:动画执行时间
    extraInfo:扩展参数，设置值时，animDuration参数必传
````
**例子:**

````
appcan.window.open({
                 name:name,
                 dataType:0,
                 aniId:2,
                 data:name + ".html",
                 extraInfo:{
                     opaque:true,
                     bgColor:bg
                 }
            });
````
** 参数还可以以对象的形式传参:**
````
 {     
    name:"",    
    data:"",
    dataType:"",
    aniId:"",
    type:"",
    width:"",
    height:"",
    animDuration:""
}   
````
**例如：**

````
 //打开一个新demo窗口,并加载appcan.cn页面
appcan.window.open({
    name:'demo',
    dataType:0,
    data:'http://appcan.cn'
});
//另外一种使用方式
var win = appcan.require('window');
win.open({
    name:'demo',
    dataType:0,
    data:'http://appcan.cn'
});
````
>### appcan.window.close(aniId,animDuration)

   关闭当前窗口
````
    aniId:动画类型Id
         0：无动画
        1: 从左向右推入
        2: 从右向左推入
        3: 从上向下推入
        4: 从下向上推入
        5: 淡入淡出
        6: 左翻页
        7: 右翻页
        8: 水波纹
        9: 由左向右切入
      10: 由右向左切入
      11: 由上先下切入
      12: 由下向上切入
      13: 由左向右切出
      14: 由右向左切出
      15: 由上向下切出
      16: 由下向上切出
    animDuration:动画持续时间
````
参数还可以以对象的形式传参：
 ````
 {
    aniId:"",
    animDuration:""
}  ````

**例如：**

````
 //关闭当前窗口
appcan.window.close({
    aniId:17,
    animDuration:1000
});
//另外一种使用方式
var win = appcan.require('window');
win.close({
    aniId:17,
    animDuration:1000
});
````
>### appcan.window.evaluateScript(name,scriptContent,type)

   在指定的窗口脚本执行
````
    name:要执行脚本的窗口名称
    scriptContent:要执行的脚本
    type:窗口类型
````
参数还可以以对象的形式传参：
````
{
    name:'',
    scriptContent:'',
    type:''
}   
````
**例子:**

````
 //在demo窗口执行脚本
appcan.window.evaluateScript({
        name:'demo',
        scriptContent:'alert("hello world")'
    });
    //另一种使用方式
    var win = appcan.require('window');
    win.evaluateScript({
        name:'demo',
        scriptContent:'alert("hello world")'
    });
````
>###appcan.window.evaluatePopoverScript(name,popName,scriptContent)

   在指定的弹出窗内执行响应的脚本
````
    name:要执行脚本的窗口名称
    popName:要执行的弹出窗口的名称
    scriptContent:要执行的脚本内容
````
参数还可以以对象的形式传参：
````
{
    name:'',
    popName:'',
    scriptContent:''
}
````
**例子:**

````
 //在demo窗口的弹出窗口执行脚本
appcan.window.evaluatePopoverScript({
        name:'demo',
        popName:'demoPop',
        scriptContent:'alert("hello world")'
    });
    //另一种使用方式
    var win = appcan.require('window');
    win.evaluatePopoverScript({
        name:'demo',
        popName:'demoPop',
        scriptContent:'alert("hello world")'
    });
````
>### appcan.window.setBounce(bounceType,startPullCall,downEndCall,upEndCall,color,imgSettings)

   设置上下弹动效果
````
    bounceType:弹动的类型,如果为多个请用数组
       0: 是向下拖动
       1: 是向上拖动
    startPullCall:开始滑动时触发回调
    downEndCall:当弹动类型设置为下边界弹动时，如果页面到了下边界则会触发该回调
    upEndCall:当弹动类型设置为上边界弹动时，如果页面到了上边界则会触发该回调
    color`:如果超过了该边界显示的背景颜色
    imgSettings:如果超过了该边界，并且想要设置显示的内容包括图片文字则设置该参数
````
关于imgSettings的设定的实例:
````
{
    "imagePath":"res://reload.png",
    "textColor":"#530606",
    "pullToReloadText":"拖动刷新",
    "releaseToReloadText":"释放刷新",
    "loadingText":"加载中，请稍等"
}
````
 
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
}
````
**例如：**

````
  //给页面天加一个简单的弹动效果
    appcan.window.setBounce({
        bounceType:'1',
        color:'#F00',
        upEndCall:function(type){
            
        }
    });
    //另一种使用方式
    var win = appcan.require('window');
    win.setBounce({
        bounceType:'1',
        color:'#F00',
        upEndCall:function(type){
            
        }
    });
````
>### appcan.window.enableBounce()

  开启页面弹动效果，如果调用该方法，则该webView具有弹动效果
**例如：**

````
//开启页面弹动效果
appcan.window.enableBounce()
//另一种使用方式
var win = appcan.require('window');
win.enableBounce()
````
>### appcan.window.disableBounce()

  禁用页面弹动效果，如果调用该方法，则该webView不具有弹动效果
**例如：**

````
//禁用页面弹动效果
appcan.window.disableBounce();//禁用页面弹动效果
//另一种使用方式
var win = appcan.require('window');
win.disableBounce();
````
>### appcan.window.setBounceType(type,color,flag,callback)

  设置页面弹动类型，前提是开启webView的弹动设置，如果没有开启调用了该方法则会默认开启页面弹动效果
````
    type:页面的弹动类型
        0: 无任何效果
        1: 颜色弹动效果
        2: 设置图片弹动
    color:设置弹动结果的背景颜色
    flag:是否显示内容,1:显示内容，0:不现实内容
    callback(status,type):当设置成功后，如果滑动超过了弹动的边界，则会触发该回调，status: 当type=0时，值0为向下拉，1为超越边界，2为向上返回到最初状态；当type=1时，0为向上拉，1为超越边界，2为向下返回到最初状态。 type跟传入的参数type一致
````
**参数还可以以对象的形式传参：**
````
{
    type:'',
    callback:function(status,type){
        //do somethings
    },
    flag:'',
    color:''
}
````
**例如：**

````
//设置上边弹动
appcan.window.setBounceType({
    type:1,
    flag:1,
    color:'#F00',
    callback:function(status,type){
        if(stats == 1){
            //超过边界了
        }
    }
});
//另外一种使用方式
var win = appcan.require('window');
win.setBounceType({
    type:1,
    flag:1,
    color:'#F00',
    callback:function(status,type){
        if(stats == 1){
            //超过边界了
        }
    }
});
````
>### appcan.window.setBounceParams(position,data)

  设置对应弹动显示的内容
````
    position:页面的弹动位置
          0: 顶端
           1: 底部
    data:超过页面边界显示的内容
````
关于data设置的实例：
````
{
    "imagePath":"res://reload.png",
    "textColor":"#530606",
    "pullToReloadText":"拖动刷新",
    "releaseToReloadText":"释放刷新",
    "loadingText":"加载中，请稍等"
}
````
**参数还可以以对象的形式传参：**
````
{
    position:'',
    data:{}
}
````
**例如：**

````
//设置参数
appcan.window.setBounceParams({
    position:2,
    data:{
        "imagePath":"res://reload.png",
        "textColor":"#530606",
        "pullToReloadText":"拖动刷新",
        "releaseToReloadText":"释放刷新",
        "loadingText":"加载中，请稍等"
    }
});
//另外一种使用方式
var win = appcan.require('window');
win.setBounceParams({
    position:2,
    data:{
        "imagePath":"res://reload.png",
        "textColor":"#530606",
        "pullToReloadText":"拖动刷新",
        "releaseToReloadText":"释放刷新",
        "loadingText":"加载中，请稍等"
    }
});
````
>### appcan.window.resetBounceView(position)

  恢复默认弹动

    position:页面的弹动位置
        0: 顶端
        1: 底部
**参数还可以以对象的形式传参：**
````
{
    position:''
}
````
**例如：**

````
//重置顶部效果
appcan.window.resetBounceView(0)
//另外一种使用方式
var win = appcan.require('window');
win.resetBounceView(0)
````
>### appcan.window.openToast(msg,duration,position,type)

   打开一个toast弹出窗口
````
    msg:toast要显示的内容
    duration:toast显示的时间
    position:toast显示在屏幕中的位置
         1: left_top 左上
         2: top 上中
         3: right_top 右上
         4: left 左中
         5: middle 中间
         6: right 右中
         7: bottom_left 下左
         8: bottom 下中
         9: right_bottom 右下
    type:toast的类型
         0: 没有进度条
         1: 有进度条
````
参数还可以以对象的形式传参：

````
{
    msg:'',
    duration:'',
    position:'',
    type:''
}
````
**例如：**

````
//打开一个没有弹出框的toast
appcan.window.openToast({
    msg:'toast',
    duration:1000,
    position:9,
    type:0
});
//另外一种使用方式
var win = appcan.require('window');
win.openToast({
    msg:'toast',
    duration:1000,
    position:9,
    type:0
});
````
>### appcan.window.closeToast()

  关闭现在显示的toast
**例如：**

````
//关闭当前页面的toast
appcan.window.closeToast();
//另外一种使用方式
var win = appcan.requrie('window');
win.closeToast();
````
>### appcan.window.moveAnim(left,top,callback,duration)

   以动画的形式，移动弹出窗口 
````
    left:距离左边的位置
    top:距离上边的位置
    callback:动画移动完成后的回调函数
    duration:动画持续的时间
````
参数还可以以对象的形式传参：
````
{
    left:'',
    top:'',
    callback:function(){
        //do somethings
    },
    duration:''
}
````
**例如：**

````
//把弹出窗口移动到指定的位置
appcan.window.moveAnim({
    left:10，
    top:10,
    callback:functin(){
        //动画完成
    }
});
//另外一种使用方式
var win = appcan.require('window');
win.moveAnim({
    left:10，
    top:10,
    callback:functin(){
        //动画完成
    }
});
````
>###appcan.window.openPopover(name,dataType,url,data,left,top,width,height,fontSize,type,bottomMargin,extraInfo)

   打开一个弹出框，如果不存在则会先创建然后再打开，如果存在则直接打开 
````
    name:要打开弹出窗的名称
    dataType:新窗口填充的数据类型
          0: url
          1: html 数据
          2: html 和 url 混合数据
    url:弹出框要加载的页面的地址
    data:弹出框要价值的数据内容
    left:弹出框距离左边的距离
    top:弹出框距离上边的距离
    width:弹出框的宽度
    height:弹出框的高度
    fontSize:页面基础的字体大小
    type:窗口类型
           0: 普通窗口
           1: OAuth 窗口
           2: 加密页面窗口
           4: 强制刷新
         16: view不透明
         32: 隐藏的window
         64: 等待popOver加载完毕后显示
       128: 支持手势
       256: 标记open的window上一个window不隐藏
       512: 标记open的浮动窗口用友打开wabapp
    bottomMargin:浮动窗口相对父窗口底部的距离。为空或0时，默认为0。当值不等于0时，height参数无效
    extraInfo:扩展参数，设置值时，bottomMargin参数必传
````
**例子：**

````
appcan.window.openPopover({
                 name:'demo',
                 dataType:0,
                 url:name + ".html",
                 top:100,
                 left:100,
                 width:1400,
                 height:2100,
                 extraInfo:{
                     opaque:true,
                     bgColor:bg
                 }
            });
````
**参数还可以以对象的形式传参：**
````
{
    name:'',
    dataType:'',
    url:'',
    data:'',
    left:'',
    top:'',
    width:'',
    height:'',
    fontSize:'',
    type:''
    bottomMargin:''
	}````
**例如：**

````
//弹出一个简单的demo窗口,并打开appcan.cn
appcan.window.openPopover({
    name:'demo',
    dataType:0,
    url:'http://appcan.cn',
    top:100,
    left:100,
    width:100,
    height:100,
});
//另外一种使用方式
var win = appcan.require('window');
win.openPopover({
    name:'demo',
    dataType:0,
    url:'http://appcan.cn',
    top:100,
    left:100,
    width:100,
    height:100,
});
````
>### appcan.window.closePopover(name)

   关闭指定的弹出窗口

    name:弹出窗口的名字
参数还可以以对象的形式传参:
````
{
    name:''
}
````
**例如：**

````
//关闭demo弹出窗口
appcan.window.closePopover('demo');
//另外一种使用方式
var win = appcan.require('win');
win.closePopover('demo');
````
>### appcan.window.resizePopover(name,left,top,width,height)

   重置指定弹出窗口的大小、位置 
````
    name:要重置的弹出窗口的名称
    left:要重置弹出窗口距离左边的距离
    top:要重置的弹出窗口距离上边的距离
    width:要重置的弹出窗口的宽度
    height:要充值弹出窗口的高度
````
参数还可以以对象的形式传参：
````
{
    name:'',
    left:'',
    top:'',
    width:'',
    height:''
}
````
**例如：**

````
//修改demo弹出框的位置
appcan.window.resizePopover({
    name:'demo',
    left:100,
    top:100,
    width:102,
    height:102
})
//另外一种使用方式
var win = appcan.require('window');
win.resizePopover({
    name:'demo',
    left:100,
    top:100,
    width:102,
    height:102
})
````

>### appcan.window.alert(title,content,buttons,callback)

   弹出一个确认弹出窗口,如果只有一个按钮弹出是警告框，如果是一个以上的按钮弹出的是提示框 
````
    title:弹出框的标题
    content:弹出框的内容
    buttons:弹出框的按钮列表最多是三个
    callback(err,data,dataType,optId):当点击了其中一个按钮后的回调，如果只有一个确定按钮则不执行回调函数 第一个参数是Error对象如果为空则表示没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id
````
参数还可以以对象的形式传参：
````
//{
    title:'',
    content:'',
    buttons:[],
    callback:function(err,data,dataType,optId){
        //do somethings
    }
}````
**例如：**
````
//打开一个提示框 
appcan.window.alert({
    title:'提示',
    content:'小提示',
    buttons:'确定'
});
//另外一种使用方式
var win = appcan.require('window'); 
win.alert({
    title:'提示',
    content:'小提示',
    buttons:'确定'
});
````
>### appcan.window.confirm(title,content,buttons,callback)

   弹出一个提示框 
````
    title:弹出框的标题
    content:弹出框的内容
    buttons:弹出框的按钮列表最多是三个
    callback(err,data,dataType,optId):当点击了其中一个按钮后的回调， 第一个参数是Error对象如果为空则表示没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id
````
**参数还可以以对象的形式传参：**
````
{
    title:'',
    content:'',
    buttons:[],
    callback:function(err,data,dataType,optId){
        //do somethings
    }
}
````
**例如：**

````
//打开一个确认框 
appcan.window.confirm({
    title:'提示',
    content:'小提示',
    buttons:['确定','取消'],
    callback:function(err,data,dataType,optId){
        if(err){
            //如果出错了
            return;
        }
        //data 按照按钮的索引返回值
    }
});
//另外一种使用方式
var win = appcan.require('window'); 
win.confirm({
    title:'提示',
    content:'小提示',
    buttons:['确定','取消'],
    callback:function(err,data,dataType,optId){
        if(err){
            //如果出错了
            return;
        }
        //data 按照按钮的索引返回值
    }
});
````
>### appcan.window.prompt(title,content,defaultValue,buttons,callback)

   弹出一个可以输入内容的提示框 
````
    title:提示框的标题
    content:提示框中显示的内容
    defaultValue:(String类型) 必选 输入框默认文字
    buttons:提示框显示的按钮，多个按钮可以为数组形式
    callback(err,data,dataType,optId):当点击了其中一个按钮后的回调， 第一个参数是Error对象如果为空则表示没有错误，否则表示操作出错了，data表示返回的操作结果{num:'按钮的索引值',val:'输入框的值'},dataType操作结果的数据类型，optId该操作id
````
参数还可以以对象的形式传参：
```
{
   title:'',
    content:'',
	defaultValue:'',
    buttons:'',
    callback:function(){}
}
````
>### appcan.window.bringPopoverToFront(name)

   把指定的弹出窗口设置为最上层 
	
    name:要设置的弹出层的名称
参数还可以以对象的形式传参：
````
{
    name:''
}
````
**例如：**

````
//把demo窗口显示到所有窗口最上面
appcan.window.bringPopoverToFront('demo');
//另外一种使用方式
var win = appcan.require('window'); 
win.bringPopoverToFront('demo');
````
>### appcan.window.popoverElement(id,url,left,top,name,extraInfo)

   根据给定元素的样式弹出样式相似的弹出窗口 
````
    id:指定元素的Id
    url:要加载到弹出窗口中的地址
    left:距离做边界的距离
    top:距离上边界的距离
    name:弹出窗口的名称，如果id没有指定的话用name，否则用id
    extraInfo:扩展参数，json格式如下： {"extraInfo":{"opaque":"true","bgColor":"#011","delayTime":"250"}}
````
参数还可以以对象的形式传参：
````
{
    id:'',
    url:'',
    left:'',
    top:'',
    name:''
}
````

**例如：**

````
//根据指定的元素打开弹出框,并打开appcan.cn
appcan.window.popoverElement({
    id:'container',
    url:'http://appcan.cn',
    top:'100',
    left:100
});
//另外一种使用方式
var win = appcan.require('window');
win.popoverElement({
    id:'container',
    url:'http://appcan.cn',
    top:'100',
    left:100
});
````

>### appcan.window.resizePopoverByEle(id,left,top,name)

   设置指定的弹出窗口回复到指定窗口的大小，并设置弹出窗的位置 
````
    id:指定的元素，根据该元素设置弹出窗口的大小
    left:弹出窗口距离做边界的距离
    top:弹出窗口距离上边界的距离
    name:要设置的弹出窗口的名称，如果id没有传值的话使用这个值
````
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
appcan.window.popoverElement({
    id:'container',
    left:100,
    top:100
});
//另外一种使用方式
var win = appcan.require('window');
win.popoverElement({
    id:'container',
    left:100,
    top:100
});
````
>### appcan.window.openMultiPopover(popName,content,dataType, left, top, width, height,change, fontSize, flag, indexSelected,extraInfo)

   打开多页面浮动窗口
````
    popName:打开新窗口的名称
    content:要传入的数据，一个json对象，或者json字符串，
    结构必须为'{"content":[{"inPageName":"p1","inUrl":"xxx1.html","inData":"", {"extraInfo":{"opaque":"true","bgColor":"#011"}}},{"inPageName":"p2","inUrl":"xxx2.html","inData":"", {"extraInfo":{"opaque":"true","bgColor":"#011"}}}]}' 其中：inPageName:所包含的单页面窗口的名字，inUrl：url类型数据，inData：窗口的内容的二进制数据，可为空,extraInfo:extraInfo参数,opaque:是否透明 true/false默认为false,bgColor:背景色，支持图片和颜色，格式为#fff、#ffffff、rgba(r,g,b,a)等，图片路径支持res://、wgt://等AppCan协议路径
    dataType:窗口载入的数据的类型
        0：url方式载入；
        1：html内容 方式载入；
        2：既有url方式，又有html内容方式
    left:距离左边界的距离
    top:距离上边界的距离
    width:窗口的宽
    height:窗口的高
    change(err,data):当浮动窗口的当前显示的值发生改变是触发的回调.
          err:如果出错这个就是一个错误对象，否则为空.
       data:{"multiPopName":"name","multiPopSelectedIndex":"index"}
    fontSize:字体的大小
    flag:窗口类型
         0: 普通窗口
         1: OAuth 窗口
         2: 加密页面窗口
         4: 强制刷新
         8: url用系统浏览器打开
       16: view不透明
       32: 隐藏的window
       64: 等待popOver加载完毕后显示
     128: 支持手势
     256: 标记open的window上一个window不隐藏
     512: 标记open的浮动窗口用友打开wabapp
    indexSelected:默认显示的索引项，默认显示第一项
    extraInfo:扩展参数，json格式如下： {"extraInfo":{"opaque":"true","bgColor":"#011","delayTime":"250"}}
````
**例子:**

````
var content = {
                content:[
                    {
                        inPageName:"p1",
                        inUrl:"pop1.html",
                        inData:"",
                        extraInfo:{
                            opaque:false,
                            bgColor:"#00000000"
                        }
                    },
                    {
                        inPageName:"p2",
                        inUrl:"pop2.html",
                        inData:"",
                        extraInfo:{
                            opaque:true,
                            bgColor:"#ccc"
                        }
                    }
                ]
            };
            
            appcan.window.openMultiPopover({
                popName:name,
                content:content,
                top:0,
                left:0,
                height:500,
                width:500,
                dataType:0,
                indexSelected:1,
                extraInfo:{
                    opaque:false,
                    bgColor:bg
                }
            });
````
**参数还可以以对象的形式传参:**
````
 {
    popName:'',
    content:'',
    dataType:'',
    left:'',
    top:'',
    width:'',
    height:'',
    change:'',
    fontSize:'',
    flag:'',
    indexSelected:''
}
````
**例如：**

````
 //打开一个四个窗口的弹出框
appcan.window.openMultiPopover({
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
var win = appcan.require('window');
win.openMultiPopover({
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
>### appcan.window.closeMultiPopover(popName)

   关闭多页面浮动窗口
````
    popName:多页面窗口的名称
````
参数还可以以对象的形式传参：
````
{
    popName:''
}
````
**例如：**

````
 //关闭指定的多页面浮动窗口
appcan.window.closeMultiPopover('nav');
//另外一种使用方式
var win = appcan.require('window');
win.closeMultiPopover('nav');
````
>### appcan.window.selectMultiPopover(popName,index)

  设置多页面浮动窗口跳转到的子页面窗口的索引
````
    popName:要设置的多页面浮动窗口的名称
    index:要设置的多页面浮动窗口页面的索引
````
**参数还可以以对象的形式传参：**
````
{
    popName:'',
    index:''
}
````
**例如：**

````
 //选择第三个页面
appcan.window.selectMultiPopover('nav',2);
//另外一种使用方式
var win = appcan.require('window');
win.selectMultiPopover('nav',2);
````
>### appcan.window.subscribe(channelId,callback)

   订阅一个频道，如果有消息发给该频道，则会执行响应的回调
   如果是用超链接打开的页面收不到消息
	
    channelId:订阅的的频道Id
    callback(msg):当有消息发来的时候执行的对调，msg是传来的消息
参数还可以以对象的形式传参：
````
{
    channelId:'',
    callback:''
}````
**例如：**

````
 //接收2通道的消息
appcan.window.subscribe('2',function(msg){});
//另外一种使用方式
var win = appcan.require('window');
win.subscribe('2',function(msg){});
````
>### appcan.window.publish(channelId,msg)

   向指定通道发送消息
	
    channelId:发送指定消息的通道
    msg:要发送的消息内容
参数还可以以对象的形式传参：
````
{
    channelId:'',
    msg:''
}
````
**例如：**

````
 //向2通道发送消息
appcan.window.publish('2','hello')
//另外一种使用方式
var win = appcan.require('window');
win.publish('2','hello')
````
>### appcan.window.sendPopoverToBack(name)

   把指定的浮动窗口设置到最下层
	
    `name`:要设置的浮动窗口名称
参数还可以以对象的形式传参：
````
{
    name:''
}````
**例如：**

````
 //把a窗口放到最下成
appcan.window.sendPopoverToBack('a')
//另外一种使用方式
var win = appcan.require('window');
win.sendPopoverToBack('a')
````
>### appcan.window.setWindowFrame(dx,dy,duration,callback)

   移动当前Window相对屏幕的位置
	
    dx: 相对屏幕左边的距离
    dy: 相对屏幕上边的距离
    duration: 动画执行的时间
    callback: 当前窗口位置移动完成的回调方法
参数还可以以对象的形式传参：
````
{
    dx:'',
    dy:'',
    duration:'',
    callback:function(){}
}````
**例如：**

````
 //把窗口向左移动100像素
appcan.window.setWindowFrame(100,0,300,function(){})
//另外一种使用方式
var win = appcan.require('window');
win.setWindowFrame(100,0,300,function(){})
````
>### appcan.window.stateChange(callback)

    窗口前后台状态变化，callback(state)回调方法，
    state：（Number)状态值 ，0：回到前台；1：压入后台

>### appcan.window.onResume

  窗口回到前台时调用该方法（不推荐）

>### appcan.window.onPause

  窗口回到后台时调用该方法（不推荐）

>### appcan.window.on('resume',callback)

  窗口回到前台时执行回调函数

>### appcan.window.on('pause',callback)

  窗口回到后台时执行回调函数