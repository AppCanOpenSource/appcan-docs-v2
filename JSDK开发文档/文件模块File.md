

关于appcan文件操作的基础功能的封装

[TOC]

>### appcan.file.wgtPath

  当前widget的根目录
**例如：**

````
如果你安装一个demo，到存储卡上则   
/storage   
    /widgetone   
        /apps 所有的应用位置  
            /demo 这里就是demo widget的根目录   
                /video  
                /myspace  
                /audio  
                /photo
 
    /widgets
````
>### appcan.file.resPath

  当前widget/wgtRes目录（支持IOS，Android），用户可以自行预置此目录下文件

>### appcan.file.wgtRootPath

  用于部署在服务器端的Appcan应用，必要时打开本地沙箱中widget根目录下的本地网页使用 
  **例如：**当前窗口加载的是服务器上的`http://www.xxx.com/xxx.html `网页， 如果在xxx.html页面中open一个窗口时，传入的inData为'wgtroot://index.html'， 那么本次open执行时，引擎将会到本应用对应的widget路径下去寻找此页面，例如android上找到的路径会是：file:///android_assert/widget/index.html或者/sdcard/widgetone/widgets/widgetXXX/index.html。 

>### appcan.file.open(filePath,mode,callback)

  打开文件流
````
  filePath:要打开文件的路径
  mode:打开文件的方式
    1 只读方式打开
    2 可写方式打开
    4 新建方式打开
    8:电子书方式打开

  callback(err,data,dataType,optId):打开文件结果回调函数，第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id
  ````
**    参数还可以以对象的形式传参：**
````
{
    filePath:'',
    mode:'',
    callback:function(err,data,dataType,optId){
        //do somethings
    }
}````

**例如：**

````
//打开一个文本文件
appcan.file.open('wgt://a.txt',1,function(err,data,dataType,optId){
    if(err){
        //出错了
        alert(err);
        return;
    }
    if(data == 0){
        //打开成功了
    }else{
        //打开失败
    }
});
//另外一种使用方式
var file = appcan.require('file');
file.open('wgt://a.txt',1,function(err,data,dataType,optId){
    if(err){
        //出错了
        alert(err);
        return;
    }
    if(data == 0){
        //打开成功了
    }else{
        //打开失败
    }
});
````
>### appcan.file.openSecure(filePath,mode,key,callback)

  打开加密的文件流
  ````
  filePath:要打开文件的路径
  mode:打开文件的方式
    1 只读方式打开
    2 可写方式打开
    4 新建方式打开
    8:电子书方式打开
	key:加密的密钥
  callback(err,data,dataType,optId):打开文件结果回调函数，第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id
````
参数还可以以对象的形式传参：
````
{
    filePath:'',
    mode:'',
    key:'',
    callback:function(err,data,dataType,optId){
        //do somethings
    }
}````
**例如：**

````
//打开一个加密的文本文件
appcan.file.openSecure('wgt://a.txt',1,'password',function(err,data,dataType,optId){
    if(err){
        //出错了
        alert(err);
        return;
    }
    if(data == 0){
        //打开成功了
    }else{
        //打开失败
    }
});
//另外一种使用方式
var file = appcan.require('file');
file.openSecure('wgt://a.txt',1,'password',function(err,data,dataType,optId){
    if(err){
        //出错了
        alert(err);
        return;
    }
    if(data == 0){
        //打开成功了
    }else{
        //打开失败
    }
});
````
>### appcan.file.close(optId)

  关闭文件流
  
    optId:文件的操作Id

   **参数还可以以对象的形式传参：**
````
{
    optId:''
}````
**例如：**

````
//关闭一个指定的文件流
appcna.file.close(optId)
//另外一种使用方式
var file = appcan.require('file');
file.close(optId)
````
>###appcan.file.read(filePath,length,callback)

  读取指定文件的内容
   ````
  filePath:要读取文件的路径
  length:要读取文件的长度，默认为-1即读取文件全部内容
  callback(err,data,dataType,optId):读取文件完成后的回调，第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id
   ````
参数还可以以对象的形式传参： 
 ````
{
    filePath:'',
    length:-1,
    callback:function(err,data,dataType,optId){
        //do somethings
    }
}````
**例如：**

````
//读取指定的文件内容
appcan.file.read({
    filePath:'wgt://a.txt',
    callback:function(err,data,dataType,optId){
        if(err){
            //出错了
            return;
        }
        //data 就是文件内的数据
 
    }
});
//另外一种使用方式
var file = appcan.require('file');
file.read({
    filePath:'wgt://a.txt',
    callback:function(err,data,dataType,optId){
        if(err){
            //出错了
            return;
        }
        //data 就是文件内的数据
 
    }
});
````
>### appcan.file.readSecure(filePath,length,key,callback)

  读取指定加密文件的内容
   ````
  filePath:要读取文件的路径
  length:要读取文件的长度，默认为-1即读取文件全部内容
  key:加密的密钥
  callback(err,data,dataType,optId):读取文件完成后的回调，第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id
   ````
 **参数还可以以对象的形式传参：**
````
{
    filePath:'',
    length:-1,
    key:'',
    callback:function(err,data,dataType,optId){
        //do somethings
    }
}````
**例如：**

````
///读取指定的文件内容
appcan.file.readSecure({
    filePath:'wgt://a.txt',
    key:'',
    callback:function(err,data,dataType,optId){
        if(err){
            //出错了
            return;
        }
        //data 就是文件内的数据
 
    }
});
 
//读取指定的文件内容
var file = appcan.require('file');
file.readSecure({
    filePath:'wgt://a.txt',
    key:'',
    callback:function(err,data,dataType,optId){
        if(err){
            //出错了
            return;
        }
        //data 就是文件内的数据
 
    }
});
````
>### appcan.file.readJSON(filePath,callback)

  读取指定的json文件
````
  filePath:json文件的路径
  callback(err,res):读取文件完成后的回调，第一个参数err是一个错误对象，如果为空表示没有错误，如果 不为空表示出错了，res为指定文件的json对象
   ````
   **参数还可以以对象的形式传参：**
````
{
    filePath:'',
    callback:function(err,res){
        //do somethings
    }
}
````
**例如：**

````
//读一个json文件
appcan.file.readJSON({
    filePath:'wgt://a.json',
    callback:function(err,res){
        if(err){
            //出错了
            return;
        }
        //res文件保存这的数据转成了JSON
    }
});
//另外一种使用方式
var file = appcan.require('file');
file.readJSON({
    filePath:'wgt://a.json',
    callback:function(err,res){
        if(err){
            //出错了
            return;
        }
        //res文件保存这的数据转成了JSON
    }
});
````
>### appcan.file.write(filePath,content,callback,mode)

  把内容写到指定的文件中 filePath:要写的文件路径
   ````
  content:要写到文件中的内容
  mode:写入文件中的方式
  callback(err):写完成后的回调，err是错误对象，如果为空则表示没有错误，否则表示有错误发生
   ````
**参数还可以以对象的形式传参：**
````
{
    filePath:'',
    content:'',
    mode:'',
    callback:function(err){
        //do somethings
    }
}````
**例如：**

````
//向文件中写入数据
appcan.file.write({
    filePath:'a.txt',
    content:'hello world',
    callback:function(err){
        if(err){
            //写入出错了
            return;
        }
        //写入成功了
    }
});
//另外一种使用方式
var file = appcan.require('file');
file.write({
    filePath:'a.txt',
    content:'hello world',
    callback:function(err){
        if(err){
            //写入出错了
            return;
        }
        //写入成功了
    }
});
````
>### appcan.file.writeSecure(filePath,content,callback,mode,key)

  把内容写到指定的加密文件中
````
  filePath:要写的文件路径
  content:要写到文件中的内容
  mode:写入文件中的方式
  key:加密的密钥
  callback(err):写完成后的回调，err是错误对象，如果为空则表示没有错误，否则表示有错误发生
   ````
**    参数还可以以对象的形式传参：**
````
{
    filePath:'',
    content:'',
    mode:'',
    key:'',
    callback:function(err){
        //do somethings
    }
}````
**例如：**

````
//向文件中写入数据
appcan.file.writeSecure({
    filePath:'a.txt',
    key:'password',
    content:'hello world',
    callback:function(err){
        if(err){
            //写入出错了
            return;
        }
        //写入成功了
    }
});
//另外一种使用方式
var file = appcan.require('file');
file.writeSecure({
    filePath:'a.txt',
    key:'password',
    content:'hello world',
    callback:function(err){
        if(err){
            //写入出错了
            return;
        }
        //写入成功了
    }
});
````
>### appcan.file.create(filePath,callback)

  创建一个新文件
````
  filePath:新文件的路径
  callback(err,data,dataType,optId):创建文件完成后的回调，第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id
   ````
 ** 参数还可以以对象的形式传参：**
````
{
    filePath:'',
    callback:function(err,data,dataType,optId){
        //do somethings
    }
}````
**例如：**

````
//创建一个新文件
appcan.file.create({
    filePath:'wgt://a.txt',
    callback:function(err,data,dataType,optId){
        if(err){
            //创建文件出错了
            return;
        }
        if(data == 0){
            //创建成功
        }else{
            //创建失败
        }
    }
});
//另外一种使用方式
var file = appcan.require('file');
file.create({
    filePath:'wgt://a.txt',
    callback:function(err,data,dataType,optId){
        if(err){
            //创建文件出错了
            return;
        }
        if(data == 0){
            //创建成功
        }else{
            //创建失败
        }
    }
});
````
>### appcan.file.createSecure(filePath,key,callback)

  创建一个新加密文件
````
  filePath:新文件的路径
  key:加密的密钥
  callback(err,data,dataType,optId):创建加密文件完成后的回调，第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id
````
   参数还可以以对象的形式传参：
````
{
    filePath:'',
    key:'',
    callback:function(err,data,dataType,optId){
        //do somethings
    }
}````
**例如：**

````
//创建一个新文件
appcan.file.createSecure({
    filePath:'wgt://a.txt',
    key:'password',
    callback:function(err,data,dataType,optId){
        if(err){
            //创建文件出错了
            return;
        }
        if(data == 0){
            //创建成功
        }else{
            //创建失败
        }
    }
});
//另外一种使用方式
var file = appcan.require('file');
file.createSecure({
    filePath:'wgt://a.txt',
    key:'password',
    callback:function(err,data,dataType,optId){
        if(err){
            //创建文件出错了
            return;
        }
        if(data == 0){
            //创建成功
        }else{
            //创建失败
        }
    }
});
````
>### appcan.file.remove(filePath,callback)

  删除指定的文件
````
  filePath:要删除的文件路径
  callback(err,data,dataType,optId):删除文件完成后的回调，第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id
 ````
**参数还可以以对象的形式传参:**
````
{
    filePath:'',
    callback:function(err,data,dataType,optId){
        //do somethings
    }
}````
**例如：**

````
//删除一个指定的文件,删除a.txt文件
appcan.file.remove({
    filePath:'wgt://a.txt',
    callback:function(err,data,dataType,optId){
        if(err){
            //删除文件错误
            return;
        }
        if(data == 0){
            //删除文件成功
        }else{
            //删除文件失败
        }
    }
});
 
//另外一种使用方式
var file = appcan.require('file');
file.remove({
    filePath:'wgt://a.txt',
    callback:function(err,data,dataType,optId){
        if(err){
            //删除文件错误
            return;
        }
        if(data == 0){
            //删除文件成功
        }else{
            //删除文件失败
        }
    }
});````

>### appcan.file.append(filePath,content,callback)

  把内容附加到指定的文件路径
````
  filePath:要附加内容到文件路径
  content:要附加的内容
  callback(err):写完成后的回调，err是错误对象，如果为空则表示没有错误，否则表示有错误发生
````
 **   参数还可以以对象的形式传参:**
````
{
    filePath:'',
    content:'',
    callback:function(err){
        //do somethings
    }
}
````     
**例如：**

````
//附加新内容到现有内容上
appcan.file.append({
    filePath:'a.txt',
    content:'hello world',
    callback:function(err){
        if(err){
            //附加内容出错了
            return;
        }
        //附加内容成功
    }
});
//另一种使用方式
var file = appcan.require('file');
file.append({
    filePath:'a.txt',
    content:'hello world',
    callback:function(err){
        if(err){
            //附加内容出错了
            return;
        }
        //附加内容成功
    }
});````
>### appcan.file.exists(filePath,callback)

  判断给定的路径是否存在文件
````
  filePath:要判断给定文件的路径
  callback(err,data,dataType,optId):判断文件是否存在的回调，第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id
````
 ** 参数还可以以对象的形式传参：**
````
{
    filePath:'',
    callback:function(err,data,dataType,optId){
        //do somethings
    }
}   ````
**例如：**

````
//判断文件a.txt是否存在
appcan.file.exists({
    filePath:'wgt://a.txt',
    callback:function(err,data,dataType,optId){
        if(err){
            //判断文件文件出错了
            return;
        }
        if(data == 1){
            //文件存在
        }else{
            //文件不存在
        }
    }
});
//判断文件a.txt是否存在
var file = appcan.require('file');
file.exists({
    filePath:'wgt://a.txt',
    callback:function(err,data,dataType,optId){
        if(err){
            //判断文件文件出错了
            return;
        }
        if(data == 1){
            //文件存在
        }else{
            //文件不存在
        }
    }
});````
>### appcan.file.stat(filePath,callback)

  获取文件的相关属性
````
  filePath:文件路径
  callback(err,data,dataType,optId):获取文件属性后的回调，第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id 其中data.isFile如果为true表示是文件,data.isDirectory 为true表示是文件夹。
````
 参数还可以以对象的形式传参：
````
{
    filePath:'',
    callback:function(err,data,dataType,optId){
        //do somethings
    }
}  ````
**例如：**

````
//获取文件信息
appcan.file.stat({
    filePath:'wgt://a.txt',
    callback:function(err,data,dataType,optId){
        if(err){
            //获取文件信息出错了
            return;
        }
        if(data.isFile){
            //该路径是文件
        }
        if(data.isDirectory){
            //该路径是一个文件夹
        }
    }
});
//另外一种方式
var file = appcan.require('file');
file.stat({
    filePath:'wgt://a.txt',
    callback:function(err,data,dataType,optId){
        if(err){
            //获取文件信息出错了
            return;
        }
        if(data.isFile){
            //该路径是文件
        }
        if(data.isDirectory){
            //该路径是一个文件夹
        }
    }
});
````

>### appcan.file.deleteLocalFile(callback)

  默认的话会提供一个wgt://data/locFile.txt文件来进行方便操作，如果执行删除会把该文件删掉
````
  callback(err,data,dataType,optId):删除文件完成后的回调，第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id 
````
参数还可以以对象的形式传参：
````
{
    callback:function(err,data,dataType,optId){
        //do somethings
    }
}````
**例如：**

````
//删除预置本地文件
appcan.file.deleteLocalFile(function(err,data,dataType,optId){
    if(err){
        //删除文件出错了
        return err;
    }
    if(data == 0){
        //删除文件成功
    }else{
        //删除文件失败
    }
});
//另外一种使用方式
var file = appcan.require('file');
file.deleteLocalFile(function(err,data,dataType,optId){
    if(err){
        //删除文件出错了
        return err;
    }
    if(data == 0){
        //删除文件成功
    }else{
        //删除文件失败
    }
});````
>### appcan.file.writeLocalFile(content,callback)

  重写wgt://data/locFile.txt中的内容
````
  content:要重写的内容
  callback(err):写完成后的回调，err是错误对象，如果为空则表示没有错误，否则表示有错误发生
  ````
 参数还可以以对象的形式传参：
````
{
    content:'',
    callback:function(err){
        //do somethings
    }
} 
````

**例如：**

````
//向本地预置文件中写新内容
appcan.file.writeLocalFile({
    content:'hello world',
    callback:function(err){
        if(err){
            //出错了
            return;
        }
        //写文件成功
    }
});
//另外一种使用方式
var file = appcan.require('file');
file.writeLocalFile({
    content:'hello world',
    callback:function(err){
        if(err){
            //出错了
            return;
        }
        //写文件成功
    }
});
````
>### appcan.file.readLocalFile(callback)

  获取本地文件中的内容
````
  callback(err,data,dataType,optId):读取文件完成后的回调，第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id
````
参数还可以以对象的形式传参：
````
{
    callback:function(err,data,dataType,optId){
        //do somethings
    }
}     ````
**例如：**

````
//读取预置的本地文件内容
appcan.file.readLocalFile(function(err,data,dataType,optId){
    if(err){
        //读取内容出错了
        return;
    }
    //data就是文件的内容
 
});
//另外一种使用方式
var file = appcan.require('file');
file.readLocalFile(function(err,data,dataType,optId){
    if(err){
        //读取内容出错了
        return;
    }
    //data就是文件的内容
 
});````
>### appcan.file.getRealPath(filePath,callback)

  获取给定路径的真实路径
````
  filePath:要获取真实路径的路径
  callback(err,data,dataType,optId):获取文件后的回调函数，第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id
````
  参数还可以以对象的形式传参：
````
{
    filePath:'',
    callback:function(err,data,dataType,optId){
        //do somethings
    }
}   ````
**例如：**

````
//读取预置的本地文件内容
appcan.file.getRealPath('wgt://a.txt'function(err,data,dataType,optId){
    if(err){
        //读取内容出错了
        return;
    }
    //data就是真实路径
 
});
//另外一种使用方式
var file = appcan.require('file');
file.getRealPath('wgt://a.txt'function(err,data,dataType,optId){
    if(err){
        //读取内容出错了
        return;
    }
    //data就是真实路径
 
});
````