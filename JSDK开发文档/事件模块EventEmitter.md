

关于事件自定义模块，如果想让你的某一个模块具有事件能力请将该对象扩展到你的目标对象上,该对象本身不能单独使用例如：appcan.on('error',function(){})当appcan捕获到错误的时候就会执行该方法。

[TOC]

>### appcan.eventEmitter.on(name,callback)

   具有自定义事件能力的对象绑定一个函数到指定的名字中
	
    name:要绑定的事件名
    callback:当事件被调起时，会执行该回调函数，参数是触发该事件触发者传入的，具体根据情况不同
**例如：**
  
  ````
  //一个对象扩展了自定义事件对象,appcan自身就扩展了自定义事件
  appcan.on('error',function(){
    //如果有错误发生就会触发这个回调
 
  }); ````

>### appcan.eventEmitter.off(name,callback)

   移除已经绑定到对应名称的回调函数
	
    name:要移除的事件名
    callback:该事件名对应的函数句柄
**例如：**
  
  ````
  //定义一个错误回调函数
  var appcanErrCall = function(){
 
  };
 
  //绑定这个回调函数
  appcan.on('error',appcanErrCall);
 
  //如果想移除这个回调
  appcan.off('error',appcanErrCall); 
````
>### appcan.eventEmitter.once(name,callback)

   执行完绑定的事件后，自动移除对应的事件
	
    name:要移除的事件名
    callback:该事件名对应的函数句柄
**例如：**
  
  ````
  //只会执行一次
  appcan.once('error',function(){
  //该回调只会执行一次
 
  });  
````
>### appcan.eventEmitter.addEventListener(name,callback)

   具有自定义事件能力的对象绑定一个函数到指定的名字中
   
    name:要绑定的事件名
    callback:当事件被调起时，会执行该回调函数，参数是触发该事件触发者传入的，具体根据情况不同
**例如：**

````
  //一个对象扩展了自定义事件对象,appcan自身就扩展了自定义事件
  appcan.addEventListener('error',function(){
    //如果有错误发生就会触发这个回调
 
  }); ````

>### appcan.eventEmitter.removeEventListener(name,callback)

   移除已经绑定到对应名称的回调函数
	
    name:要移除的事件名
    callback:该事件名对应的函数句柄
**例如：**
  
  ````
  //定义一个错误回调函数
  var appcanErrCall = function(){
 
  };
 
  //绑定这个回调函数
  appcan.on('error',appcanErrCall);
 
  //如果想移除这个回调
  appcan.removeEventListener('error',appcanErrCall);  
 ````
>### appcan.eventEmitter.trigger(name,context,[args,...])

   触发绑定的对应的事件
	
    name:对应的事件名称
    context:要执行的上下文
    args:要传给回调函数的参数
**例如：**
 
 ````
 //触发错误事件
  appcan.trigger('error',appcan,'test error'); 
````
>### appcan.eventEmitter.emmit(name,context,[args,...])

   触发绑定的对应的事件
````
   name:对应的事件名称
   context:要执行的上下文
   args:要传给回调函数的参数
````
**例如：**
 
 ````
  //触发错误事件
  appcan.emmit('error',appcan,'test error');  ````