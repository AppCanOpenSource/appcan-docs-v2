[TOC]
/*
Sort: 9
Toc: 1
Tips: 数据库功能
keywords: appcan开发文档,插件API,系统功能,uexDataBaseMgr
description: uexDataBaseMgr插件主要封装了数据库的打开关闭,创建表,插入数据,查询数据,执行事务的接口，更多appcan开发文档，请见http://newdocx.appcan.cn
Show: /newdocx/docx?type=1397_975
*/

- [1、简介](#-1-http-appcan-download-oss-cn-beijing-aliyuncs-com-e5-85-ac-e6-b5-8b-2fgf-png-ignore- "1、简介")
- [2、API概览](#-2-api-ignore- "2、API概览")
- [3、更新历史](#-3-ignore- "3、更新历史")
#### **1、简介** *[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() *<ignore>


数据库插件

###### **1.1、说明**<ignore>
 该对象主要封装了数据库的打开关闭,创建表,插入数据,查询数据,执行事务的接口
>本文的目的是为了开发能够更好更快地将API集成到自己的项目中，在使用前最好先使用好我们提供的[demo](#-1-3-ignore-)并对照文档运行看看效果。
></br>这里可以【[参考](http://newdocx.appcan.cn/dev-guide/create-app)教程】下载AppCan IDE为开发者工具开发，然后集成到自己的项目上。

###### **1.2、开源源码**<ignore>

插件测试用例与源码下载:<a href="http://plugin.appcan.cn/details.html?id=166_index" target="_blank">点击</a>插件中心至插件详情页 (插件测试用例与插件源码已经提供)


###### **1.3、平台版本支持**<ignore>
本插件的所有API默认支持**Android4.3+**和**iOS10.0+**操作系统.
有特殊版本要求的API会在文档中额外说明.

###### **1.4、接口有效性**<ignore>
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明.  

#### **2、API概览**<ignore>


###### **2.1、方法**<ignore>

> ######  **open //打开数据库并得到数据库对象** 

`uexDataBaseMgr.open(dbName)`

**说明:**

打开数据库并得到数据库对象.

**参数:**


| 参数名称   | 参数类型   | 是否必选 | 说明    |
| ------ | ------ | ---- | ----- |
| dbName | String | 是    | 数据库名称 |

**返回值:**

该函数同步返回`DB Object`.结果不为null即为打开成功,后续接口传入此对象进行操作,开发者不需要关心里面的数据结构.

**示例:**

```javascript
var db = uexDataBaseMgr.open("uexDB");
if(!db){
  alert("打开失败!");
}
```

> ######  **sql //Sql语句的执行** 

`uexDataBaseMgr.sql(db,sql,callbackFunction)`

**说明:**

Sql语句的执行,对数据库数据的增删改.执行完成后回调`callbackFunction`
**参数:**


| 参数名称             | 参数类型      | 是否必选 | 说明            |
| ---------------- | --------- | ---- | ------------- |
| db               | DB Object | 是    | open接口同步返回的对象 |
| sql              | String    | 是    | 要执行的sql语句     |
| callbackFunction | Function  | 否    | 回调函数,返回执行的结果  |

**回调参数:**

```javascript
var callbackFunction = function(error){}
```

| 参数名称  | 类型     | 说明                |
| ----- | ------ | ----------------- |
| error | Number | 执行结果,0表示成功,非0表示失败 |


**示例:**

```javascript
var sql = "CREATE TABLE testTable (_id  INTEGER PRIMARY KEY,name TEXT)";
uexDataBaseMgr.sql(db,sql, function(error) {
    if (!error) {
        alert('执行成功')
    }
});
```
> ######  **select //Sql语句的查询** 

`uexDataBaseMgr.select(db,sql, callbackFunction)`

**说明:**

Sql语句的查询,对数据库中数据的查询.

**参数:**

| 参数名称             | 参数类型      | 是否必选 | 说明            |
| ---------------- | --------- | ---- | ------------- |
| db               | DB Object | 是    | open接口同步返回的对象 |
| sql              | String    | 否    | 要查询的sql语句     |
| callbackFunction | 函数        | 否    | 回调函数,返回执行的结果  |

**回调参数:**

```javascript
var callbackFunction = function(error, data){
}
```

| 参数名称  | 类型     | 说明                |
| ----- | ------ | ----------------- |
| error | Number | 执行结果,0表示成功,非0表示失败 |
| data  | Array  | 查询结果              |


**示例:**

```javascript
var sql = "SELECT * FROM testTable";
uexDataBaseMgr.select(db,sql, function (error,data) {
    if (error) {
        alert('执行失败');
    } else {
        alert('data:' + JSON.stringify(data));
    }
});
```

> ######  **transactionEx //事务的执行**　

`uexDataBaseMgr.transactionEx(db,sqls, callbackFunction)`

**说明:**

事务的执行, 执行完成后回调`callbackFunction`,不支持select相关的语句

**参数:**

| 参数名称             | 参数类型      | 是否必选 | 说明              |
| ---------------- | --------- | ---- | --------------- |
| db               | DB Object | 是    | open接口同步返回的对象   |
| sqls             | String    | 是    | sql语句数组的Json字符串 |
| callbackFunction | Function  | 否    | 回调函数,返回执行的结果    |

**回调参数:**

```javascript
var callbackFunction = function(error){}
```

| 参数名称  | 类型     | 说明                |
| ----- | ------ | ----------------- |
| error | Number | 执行结果,0表示成功,非0表示失败 |

**示例:**

```javascript
var sqls=[
    "DROP TABLE testTable",
    "CREATE TABLE testTable (_id INTEGER PRIMARY KEY,name TEXT)",
    "INSERT INTO testTable (name) VALUES ('this is a case')",
    "UPDATE testTable SET name='这是更改' WHERE _id = 1"
];
uexDataBaseMgr.transactionEx(db,JSON.stringify(sqls), function(error) {
    alert("transaction result:"+error);
});
```

> ######  **close //关闭数据库** 

`uexDataBaseMgr.close(db)`

**说明:**

关闭数据库.


**参数:**

| 参数名称 | 参数类型      | 是否必选 | 说明            |
| ---- | --------- | ---- | ------------- |
| db   | DB Object | 是    | open对象同步返回的对象 |

**返回值:**

返回值为Boolean类型,表示关闭的结果,true为成功, false 为失败

**示例:**

```javascript
var result = uexDataBaseMgr.close(db);
alert(result);
```
> ######  **copyDataBaseFile //拷贝内置数据库**

`uexDataBaseMgr.copyDataBaseFile(path,callback)`

**说明:**

需要APP使用内置数据库时使用。先将数据库文件放置在`res://`目录下，然后调用该接口。后面使用与之前一致。

如果数据库的版本不为1，需要在`open`接口传入数据库的版本号

**注：该接口只需要调用一次，再次调用会覆盖之前的数据库**

**参数:**

| 参数名称     | 参数类型     | 是否必选 | 说明                           |
| -------- | -------- | ---- | ---------------------------- |
| path     | String   | 是    | 存放数据库的路径，支持AppCan 协议，不支持网络路径 |
| callback | Function | 是    | 拷贝完成的回调                      |

```javascript
var callback=function(error){
  	//!error 表示成功 
}
```

**示例:**

```javascript
uexDataBaseMgr.copyDataBaseFile("res://musicEx.db",function (error) {
    if (!error) {

        var db = uexDataBaseMgr.open("musicEx.db", 1017);
        if (db != null) {
            var sql = "SELECT * FROM Song";
            uexDataBaseMgr.select(db, sql, function (error, data) {
                if (error) {
                    console.log("failed");
                } else {
                    console.log(JSON.stringify(data));
                }
                db.close();
            });
        } else {
            console.log("failed");
        }
    }else{
        console.log("failed");
    }
});
```
#### **3、更新历史**<ignore>

###### **iOS**<ignore>

API版本: `uexDataBaseMgr-4.0.4`

最近更新时间:`2019-08-26`

| 历史发布版本 | 更新内容    |
| ------ | ------- |
| 4.0.4 | 回调方法调整，放入主线程处理|
| 4.0.2 | 修复一个导致空指针app闪退的bug    |
| 4.0.1 | 支持拷贝预置数据库    |

###### **Android**<ignore>

API版本: `uexDataBaseMgr-4.1.3`

最近更新时间:`2017-12-13`

| 历史发布版本 | 更新内容    |
| ------ | ------- |
| 4.1.3 |(依赖引擎4.1.0)修复连续操作数据库崩溃问题|
| 4.1.0 |支持读取APP预置数据库|
| 4.0.1 |支持拷贝预置数据库    |
