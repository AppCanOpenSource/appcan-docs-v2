这个模块是关于存储的封装，local是对本地存储的封装localStorage

[TOC]

>### appcan.locStorage.getVal(key)

   获取key保存在localStorage中对应的值
````
    key:要获取值的键值
````
**例如:**

````
//获取保存的color
appcan.locStorage.getVal('color');//返回保存的颜色值
//另外一种使用方式
var locSotrage = appcan.require('locStorage');
locStorage.getVal('color');
````
>### appcan.locStorage.setVal(key，Val)
 
   要设置的键值对
````
    key:要保存的键，key如果是数组，就会把数组中每个键值对都保存起来，如果是对象则会把对象里面每个  键值对都保存起来
    val:要保存对应的值
````
**例如:**
  
````
  //设置一个color到本地存储中
  appcan.locStorage.setVal('color','red');
  
//另外一种使用方式
var locSotrage = appcan.require('locStorage');
locStorage.setVal('color','red');
````
>### appcan.locStorage.remove(key)

  清除localStorage中对应的值
````
     key:要清除值的健名，如果为空会清空整个存储
````
**例如:**
  
````
  //清除保存的颜色值
  appcan.locStorage.remove('color'); 
//另外一种使用方式
var locSotrage = appcan.require('locStorage');
locStorage.remove('color');
````
>### appcan.locStorage.keys()

    获取localStorage中，保存的所有键值
**例如:**
  
````
  //获取保存在localStorage中所有的key
  var keys = appcan.locStorage.keys();//返回值是数组，包含所有的key
//另外一种使用方式
var locSotrage = appcan.require('locStorage');
var keys = locStorage.keys();
````
>### appcan.locStorage.val(key,value)  
 
   获取或者设置localStorage的值
````
    key：要包括的键值
    value:要保存的内容，如果该值不设置则可以返回key对应的保存的值
````
**例如:**

````
  //获取保存在localStorage中所有的key
var value = appcan.locStorage.val('k');//返回值是数组，包含所有的key
//另外一种使用方式
var locSotrage = appcan.require('locStorage');
var value = locStorage.val('k');
````