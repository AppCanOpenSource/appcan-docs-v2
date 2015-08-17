
 该模块包含了appcan对数据库的基础操作

[TOC]


>### appcan.database.create(name,[optId],callback)

   创建一个数据库 
	
    name:要创建的数据库名
    optId:创建数据库用的操作id,可为空
    callback(err,data,db,dataType,optId):数据库创建成功后的回调，如果创建过程中有错误 err不为空，否则err为空，data返回的执行结果，db是数据库创建成功后的数据库对象，可 以执行相关的操作，dataType返回结果的数据类型，optId操作Id 

**例如：**

````
//创建一个名字为blog数据库
appcan.database.create('blog',function(err,data,db,dataType,optId){
    if(err){
        //创建过程中出错了
        alert('create error');
        return;
    }
    //db就是数据库对象
    if(data == 0){
        //数据库创建成功可以使用了
    }else{
        //数据出创建失败了
    }
 
});````
   db.select(sql,callback):用返回的数据库对象，进行查询操作，sql要查询用的sql语句，callback查询 返回的结果回调，同样的callback(err,data,dataType,optId)第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id 

**例如：**

````
//数据库创建成功了为对象db，然后就可以直接用db执行查询操作了,查询user表中的所有用户信息
db.select('select * from user',function(err,data,dataType,optId){
    if(err){
        //如果创建过程中出错了
        return;
    }
    //data中的值为sql返回的内容
 
});````
   db.exec(sql,callback):用返回的数据库对象，进行更新操作，sql要更新用的sql语句，callback是更新 返回的结果回调，同样的callback(err,data,dataType,optId)第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id 

**例如：**

````
//数据库创建成功了为对象db，然后就可以直接用db执行更新操作了,删除userId为1的用户
db.exec('delete from user where userId = 1 ',function(err,data,dataType,optId){
    if(err){
        //如果创建过程中出错了
        return;
    }
    if(data == 0){
        //执行成功了
    }else{
        //执行失败了
    }
 
});````
   db.transaction(sqlFun,callback):用返回的数据库对象，进行事务操作，sqlFun要执行用的sql语句序列函数， callback是事务返回的结果回调，同样的callback(err,data,dataType,optId)第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id 

**例如：**

````
//数据库创建成功了为对象db，然后就可以直接用db执行事务操作了,删除两个用户
db.exec({
    sqlFun:function(){
        //删除一个用户
        db.exec({sql:'delete from user where userId = 1',callback:function(){
            //do something
        }});
        //再删除一个用户
        db.exec({sql:'delete from user where userId = 2',callback:function(){
            //do something
        }});
    },
    callback:function(err,data,dataType,optId){
        if(err){
            //如果创建过程中出错了
            return;
        }
        if(data == 0){
            //执行成功了
        }else{
            //执行失败了
        }
    }
});
````
>### appcan.database.select(name,sql,callback)

  在指定的数据库上执行查询操作

    name:要查询的数据库名 
    sql:要执行sql查询语句
    callback(err,data,dataType,optId):第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id 

**例如：**

````
//你可以直接用静态方法来执行查询语句
appcan.database.select({
    name:'blog',
    sql:'select * from user',
    callback:function(err,data,dataType,optId){
        if(err){
            //如果创建过程中出错了
            return;
        }
        //data中的值为sql返回的内容
    }
});
````
>### appcan.database.exec(name,sql,callback)

  在指定的数据库上执行更新操作 

    name:要更新的数据库名
    sql:要执行sql更新语句
    callback(err,data,dataType,optId):第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id 

**例如：**

````
//你可以直接用静态方法来执行更新语句
appcan.database.exec({
    name:'blog',
    sql:'select * from user',
    callback:function(err,data,dataType,optId){
        if(err){
            //如果创建过程中出错了
            return;
        }
        //data中的值为sql返回的内容
    }
});````

>### appcan.database.transaction(name,sqlFun,callback)

   在指定的数据库上执行事务操作

    name:要执行事务的数据库名
    sqlFun:要执行sql序列函数
    callback(err,data,dataType,optId):第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id 

**例如：**

````
//数据库创建成功了为对象db，然后就可以直接用db执行事务操作了,删除两个用户
appcan.database.exec({
    name:'blog',
    sqlFun:function(){
        //删除一个用户
        db.exec({sql:'delete from user where userId = 1',callback:function(){
            //do something
        }});
        //再删除一个用户
        db.exec({sql:'delete from user where userId = 2',callback:function(){
            //do something
        }});
    },
    callback:function(err,data,dataType,optId){
        if(err){
            //如果创建过程中出错了
            return;
        }
        if(data == 0){
            //执行成功了
        }else{
            //执行失败了
        }
    }
});
````

>### appcan.database.destory(name,[optId],callback)

   销毁已经创建的数据库
````
    name:要销毁的数据库名称
    optId:可选，销户数据库的操作id
    callback(err,data,dataType,optId):第一个参数是Error对象如果为空则表示 没有错误，否则表示操作出错了，data表示返回的操作结果,dataType操作结果的数据类型，optId该操作id 
````
**例如：**

````
//销毁blog数据库
appcan.database.destory({
    name:'blog',
    calllback:function(err,data,dataType,optId){
        if(data == 0){
            //关闭成功
        }else{
            //关闭失败
        }
    }
});````