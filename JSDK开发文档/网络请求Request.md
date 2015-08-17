

　对appcan私有的异步请求进行封装（即官方的uexXmlHttpMgr插件，打包时需要使用的到这个插件）并增加offline参数实现请求数据离线缓存功能

[TOC]

>### appcan.ajax(options)

 发起一个ajax请求,并获取相应的内容
````
    options:发起ajax的请求的参数，这个必须是一个对象
    options.type:请求的类型，包括GET、POST等
    options.appVerify:是否在请求头中加入appVerify字段 true、false
    options.url:要请求的地址 注：get方式请求中携带中文参数，需要对参数进行encode编码，具体函数：encodeuricomponent
    options.data:要请求的URL的参数,如果要上传文件则data数据中必须传一个对象包含一个path的key 例如：data:{file:{path:'a.jpeg'}}上传a.jpeg图片
    options.contentType:默认: false 要传给服务端的数据内容的'content-Type'通过header,如果设置其他content将会直接把data发送出去
    options.dataType:服务端的响应类型，包括json, jsonp, script, xml, html, text中的一种
    options.timeout:请求的超时时间
    options.headers:要设置的请求头
    options.xhrFields:要重载的请求对象的字段
    options.beforeSend(xhr, settings):请求发送之前的回调,返回false取消请求发送
    options.success(data, status,,requestCode,response, xhr):请求发送成功后的回调
````
说明：
````
  requestCode: 服务器响应状态码,成功为200，失败为404,-1等；
  reponse: JSON格式字符串：
{
"responseHeaders": “”,//请求头
"responseStatusCode": “”,//状态码
"responseStatusMessage": “”,//状态码的信息
"responseError": “”//错误信息
}
````
````
  options.error(xhr, errorType, error,msg):请求如果出现错误后的回调;msg: 错误详细信息，服务器返回的result信息
  options.complete(xhr, status):请求完成后的回调，不管是否出错
  options.progress(progress, xhr):上传的进度，只有包含上传文件的时候才会执行该回调
  options.certificate:添加证书信息 {password:'',path:''}其中password是证书的密码，path是证书的地址
  options.cache:是否缓存请求
  options.offline:是否直接调用离线数据，包括true,false,undefined
````
**offline参数说明：**
````
  true: 直接调用缓存数据，如果缓存数据不存在，执行ajax请求并离线缓存返回数据；
  false: 直接请求ajax数据，并把请求到的数据离线缓存；
  undefined: 直接请求ajax数据，不缓存请求到的数据；
````
````
  options.offlineDataPath:自定义离线数据文件存储目录
  options.expires:离线缓存过期时间，支持类型：
    1.number类型（单位：毫秒），缓存过期时长，
    2.W3c IOS 8601 DateTime格式,详见http://www.w3.org/TR/NOTE-datetime ，缓存过期时间点
 options.crypto:true/false 离线缓存时是否加密
 options.password: "string" 离线缓存加密密码
 ````
**例如：**

````
appcan.ajax({
    url : 'http://weixin.appcan.cn:8086/test/get',
    type : 'GET',
    data : {
        a : 'hello word',
        b : 'page'
    },
    offline : true,
    offlineDataPath : 'wgt://aaa/',
    success : function(data) {
        alert(data);
    },
    error : function(e) {
        alert(e);
    }
}); ````
**例如：**

````
A.number格式
 
 
appcan.ajax({
url : 'http://weixin.appcan.cn:8086/test/get',
type : 'GET',
data : {
a : 'hello word',
b : 'page'
},
offline : true,
expires:3000,
success : function(data) {
    alert(data);
}, error : function(e) {
    alert(e);
}
});
 
 
 
B.ISO 8601格式
 
appcan.ajax({
    url : 'http://weixin.appcan.cn:8086/test/get',
    type : 'GET',
    data : {
        a : 'hello word',
        b : 'page'
    },
    offline : true,
    expires : '2015-05-16 ',
    success : function(data) {
        alert(data);
    },
    error : function(e) {
        alert(e);
    }
}); ````
**例如：**

````
appcan.ajax({
url:http://115.29.138.150:8086/test/get,
type:"GET",
data:{}, datatype:"json",
timeout:30000,
success:function(data, status, requestCode, response, xhr) {
    alert("status:" + status);
    alert("result:" + data);
    alert("requestCode:" + requestCode);
    alert("response:" + JSON.stringify(response));
    alert("xhr:" + JSON.stringify(xhr));
}, error:function(xhr,erroType,error,msg) {
    alert("erroType:" + erroType);
    alert("error:" + error);
    alert("msg:" + msg);
    alert("xhr:" + JSON.stringify(xhr));
}
 
});
 
 
//获取appcan.cn页面
appcan.ajax({
    type : 'GET',
    url : 'http://appcan.cn',
    //添加参数
    data : {
        name : 'appcan'
    },
    //期望的返回类型
    dataType : 'html',
    timeout : 300, //超时时间
    success : function(data) {
        //获取内容
        alert('data');
    },
    error : function(xhr, type) {
        alert('Ajax error!')
    },
    offline : true
})````
**离线缓存加解密例子：**

```` 
appcan.ajax({
    url : "http://weixin.appcan.cn:8086/test/get",
    type : "GET",
    data : {
        a : 'hello word',
        b : 'page'
    },
    datatype : "json",
    timeout : 30000,
    offline : true,
    crypto : true,
    password : "pwd",
    success : function(data, status, requestCode, response, xhr) {
        alert("status:" + status);
        alert("result:" + data);
        alert("requestCode:" + requestCode);
        alert("response:" + JSON.stringify(response));
        alert("xhr:" + JSON.stringify(xhr));
    }, 
    error : function(xhr, erroType, error, msg) {
        alert("erroType:" + erroType);
        alert("error:" + error);
        alert("msg:" + msg);
        alert("xhr:" + JSON.stringify(xhr));
    }
});````
>### appcan.request.ajax(options)

  **请参考** ：appcan.ajax(options)发起一个ajax请求,并获取相应的内容 
  ````
 options:发起ajax的请求的参数，这个必须是一个对象
 options.type:请求的类型，包括GET、POST等
 options.appVerify:是否在请求头中加入appVerify字段 true、false
 options.url:要请求的地址 注：get方式请求中携带中文参数，需要对参数进行encode编码，具体函数：encodeuricomponent
 options.data:要请求的URL的参数,如果要上传文件则data数据中必须传一个对象包含一个path的key 例如：data:{file:{path:'a.jpeg'}}上传a.jpeg图片
 options.contentType:默认: false 要传给服务端的数据内容的'content-Type'通过header,如果设置其他content将会直接把data发送出去
 options.dataType:服务端的响应类型，包括json, jsonp, script, xml, html, text中的一种
 options.timeout:请求的超时时间
 options.headers:要设置的请求头
 options.xhrFields:要重载的请求对象的字段
 options.beforeSend(xhr, settings):请求发送之前的回调,返回false取消请求发送
 options.success(data, status,requestCode,response, xhr):请求发送成功后的回调
````
**requestCode、reponse说明：**

````
  requestCode: 服务器响应状态码,成功为200，失败为404,-1等；
  reponse: JSON格式字符串：
{
"responseHeaders": “”,//请求头
"responseStatusCode": “”,//状态码
"responseStatusMessage": “”,//状态码的信息
"responseError": “”//错误信息
}
````
````
 options.error(xhr, errorType, error,msg):请求如果出现错误后的回调;msg: 错误详细信息，服务器返回的result信息
 options.complete(xhr, status):请求完成后的回调，不管是否出错
 options.progress(progress, xhr):上传的进度，只有包含上传文件的时候才会执行该回调
 options.certificate:添加证书信息 {password:'',path:''}其中password是证书的密码，path是证书的地址
 options.cache:是否缓存请求
 options.offline:是否直接调用离线数据，包括true,false,undefined
````
**offline参数说明：**
>   true: 直接调用缓存数据，如果缓存数据不存在，执行ajax请求并离线缓存返回数据；
  false: 直接请求ajax数据，并把请求到的数据离线缓存；
  undefined: 直接请求ajax数据，不缓存请求到的数据；
  
````  
  options.offlineDataPath:自定义离线数据文件存储目录
  options.expires:离线缓存过期时间，支持类型：
    1.number类型（单位：毫秒），缓存过期时长，
    2.W3c IOS 8601 DateTime格式,详见http://www.w3.org/TR/NOTE-datetime ，缓存过期时间点
	
 options.crypto:true/false 离线缓存时是否加密
 options.password: "string" 离线缓存加密密码
 ````
**例如：**

````
appcan.ajax({
    url : 'http://weixin.appcan.cn:8086/test/get',
    type : 'GET',
    data : {
        a : 'hello word',
        b : 'page'
    },
    offline : true,
    offlineDataPath : 'wgt://aaa/',
    success : function(data) {
        alert(data);
    },
    error : function(e) {
        alert(e);
    }
}); 
例如:
A.number格式
 
appcan.ajax({
url : 'http://weixin.appcan.cn:8086/test/get',
type : 'GET',
data : {
a : 'hello word',
b : 'page'
},
offline : true,
expires:3000,
success : function(data) {
    alert(data);
}, error : function(e) {
    alert(e);
}
});
 
B.ISO 8601格式
 
appcan.request.ajax({
    url : 'http://weixin.appcan.cn:8086/test/get',
    type : 'GET',
    data : {
        a : 'hello word',
        b : 'page'
    },
    offline : true,
    expires : '2015-05-16 ',
    success : function(data) {
        alert(data);
    },
    error : function(e) {
        alert(e);
    }
}); ````
**例如：**

````
appcan.request.ajax({
url:http://115.29.138.150:8086/test/get,
type:"GET",
data:{}, datatype:"json",
timeout:30000,
success:function(data, status, requestCode, response, xhr) {
    alert("status:" + status);
    alert("result:" + data);
    alert("requestCode:" + requestCode);
    alert("response:" + JSON.stringify(response));
    alert("xhr:" + JSON.stringify(xhr));
}, error:function(xhr,erroType,error,msg) {
    alert("xhr:" + JSON.stringify(xhr));
    alert("erroType:" + erroType);
    alert("error:" + error);
    alert("msg:" + msg);
}
 
});
 
 
//获取appcan.cn页面  
 
appcan.request.ajax({
    type : 'GET',
    url : 'http://appcan.cn',
    //添加参数
    data : {
        name : 'appcan'
    },
    //期望的返回类型
    dataType : 'html',
    timeout : 300, //超时时间
    success : function(data) {
        //获取内容
        alert('data');
    },
    error : function(xhr, type) {
        alert('Ajax error!')
    },
    offline : true
})
 
 
//另外一种使用方式
 
var request = appcan.require('request');
request.ajax({
    type : 'POST',
    url : 'http://appcan.cn/reg',
    data : {
        name : 'appcan'
    },
    contentType : 'application/json',
    success : function() {
 
    }
})
 
 
//获取appcan.cn页面  
 
appcan.request.ajax({
    type : 'GET',
    url : 'http://appcan.cn',
    //添加参数
    data : {
        name : 'appcan'
    },
    //期望的返回类型
    dataType : 'html',
    timeout : 300, //超时时间
    success : function(data) {
        //获取内容
        alert('data');
    },
    error : function(xhr, type) {
        alert('Ajax error!')
    }
})
 
 
//例如发送一个post请求,地址为模拟用
 
request.ajax({
    type : 'POST',
    url : 'http://appcan.cn/reg',
    data : {
        name : 'appcan'
    },
    contentType : 'application/json',
    success : function() {
 
    }
})
````
**离线缓存加解密例子：**

````
appcan.ajax({
    url : "http://weixin.appcan.cn:8086/test/get",
    type : "GET",
    data : {
        a : 'hello word',
        b : 'page'
    },
    datatype : "json",
    timeout : 30000,
    offline : true,
    crypto : true,
    password : "pwd",
    success : function(data, status, requestCode, response, xhr) {
        alert("status:" + status);
        alert("result:" + data);
        alert("requestCode:" + requestCode);
        alert("response:" + JSON.stringify(response));
        alert("xhr:" + JSON.stringify(xhr));
    }, 
    error : function(xhr, erroType, error, msg) {
        alert("erroType:" + erroType);
        alert("error:" + error);
        alert("msg:" + msg);
        alert("xhr:" + JSON.stringify(xhr));
    }
});````
>### appcan.request.get(url,[data],success,[dataType])

发一个http Get请求，这是appcan.request.ajax的简写
````
  url:要请求的地址
  data:该参数不是必须的，要传递的参数
  success:成功后的回调函数，参考appcan.request.ajax参数中的success
  dataType:返回的响应结果的数据类型
  ````
**例如：**

````
//请求appcan.cn页面的内容
 
appcan.request.get('http://appcan.cn', function(data, status, xhr) {
    //数据内容
    console.log(data);
});
//另外一种使用方式
var request = appcan.require('request');
request.get('http://appcan.cn', function(data, status, xhr) {
    //数据内容
    console.log(data);
}); 

appcan.request.post(url, [data], success,[dataType])
  发起一个http Post请求
  url:要请求的地址
  data:要发出的请求的参数
  success:请求的成功的回调
  dataType:返回的响应结果的数据类型
例如:
//发送一个简单的post数据到appcan.cn
 
appcan.request.post('http://appcan.cn', {
    name : 'appcan'
}, function(data, status, xhr) {
    //打印结果
    console.log(data);
}); 
 
//另外一种使用方式
 
var request = appcan.require('request');
request.post('http://appcan.cn', {
    name : 'appcan'
}, function(data, status, xhr) {
    //打印结果
    console.log(data);
}); ````

>### appcan.request.getJSON(url,[data],success)

  发起一个http get请求来获取json数据 
````
  url:要获取的json数据的地址
  data:要发送请求的参数
  success:成功后的回调
  ````
**例如：**

````
//获取一个json数据
 
appcan.request.getJSON('http://appcan.cn/a.json', function(data) {
    //打印json数据
    console.log(data);
}); 
 
//另一种使用方式
 
var request = appcan.require('request');
request.getJSON('http://appcan.cn/a.json', function(data) {
    //打印json数据
    console.log(data);
}); 
````
>### appcan.request.postForm(selector,success,error)

  序列化表单内容并提交表单 
````
  selector:表单的css选择器，或者是form元素
  success(data):表单提交成功后的回调,data服务器端的返回值
  error(err):表单提交失败的时候的回调,err错误对象
 ````
**例如：**

````
//获取一个json数据
 
$('form').on('submit', function() {
    var form = $('from');
    appcan.request.postForm(form);
    return false;
}); 
 
//另一种使用方式
 
var request = appcan.require('request');
$('form').on('submit', function() {
    var form = $('from');
    request.postForm(form);
    return false;
}); ````
>### appcan.request.clearOffline(url,callback,data)

````
  url:需要清除离线数据的url
  callback(err,data,dataType,optId) : 执行成功后的回调函数
  data:与appcan.request.ajax参数中的data相同
 ````
**例如：**

````
//清除指定url的离线缓存数据
 
appcan.request.clearOffline({
    url : 'http://weixin.appcan.cn:8086/test/get',
    callback : function(err, data, dataType, optId) {
        if (err) {
            //清除缓存错误
            return;
        }
        if (data == 0) {
            //清除缓存成功
        } else {
            //清除缓存失败
        }
    }
}); ````
**例如：**

````
//清除指定url的离线缓存数据
 
appcan.request.clearOffline({
    url : 'http://weixin.appcan.cn:8086/test/get',
    callback : function(err, data, dataType, optId) {
        if (err) {
            //清除缓存错误
            return;
        }
        if (data == 0) {
            //清除缓存成功
        } else {
            //清除缓存失败
        }
    },
    data:{
a : 'hello word',
b : 'page'
    }
}); 
a````