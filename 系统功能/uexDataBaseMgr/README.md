[TOC]

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 


数据库插件

## 1.1、说明
 该对象主要封装了数据库的打开关闭,创建表,插入数据,查询数据,执行事务的接口


## 1.2、开源源码

插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=166_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)


## 1.4、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。
有特殊版本要求的API会在文档中额外说明。

## 1.5、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用。  
在后续版本中新添加的接口会在文档中额外说明。  

# 2、API概览


## 2.1、方法

> ### open 打开数据库

`uexDataBaseMgr.open(dbName)`

**说明:**

开数据库并得到数据库对象。

**参数:**


| 参数名称   | 参数类型   | 是否必选 | 说明    |
| ------ | ------ | ---- | ----- |
| dbName | String | 是    | 数据库名称 |

**返回值:**

该函数同步返回`DB Object`。结果不为null即为打开成功，后续接口传入此对象进行操作，开发者不需要关心里面的数据结构。

**示例:**

```javascript
var db = uexDataBaseMgr.open("uexDB");
```

> ### sql Sql语句的执行

`uexDataBaseMgr.sql(db,sql,callbackFunction)`

**说明:**

Sql语句的执行,对数据库数据的增删改。执行完成后回调`callbackFunction`
**参数:**


| 参数名称             | 参数类型      | 是否必选 | 说明            |
| ---------------- | --------- | ---- | ------------- |
| db               | DB Object | 是    | open接口同步返回的对象 |
| sql              | String    | 是    | 要执行的sql语句     |
| callbackFunction | 函数        | 否    | 回调函数，返回执行的结果  |

`callbackFunction`的参数是类型为Number的Error,0表示成功,其他表示失败。


**示例:**

```javascript
var sql = "CREATE TABLE testTable (_id  INTEGER PRIMARY KEY,name TEXT)";
uexDataBaseMgr.sql(db,sql, function(error) {
    if (!error) {
        alert('执行成功')
    }
});
```
> ### select Sql语句的查询

`uexDataBaseMgr.select(db,sql, callbackFunction)`

**说明:**

Sql语句的查询,对数据库中数据的查询。

** 参数:**

| 参数名称             | 参数类型      | 是否必选 | 说明            |
| ---------------- | --------- | ---- | ------------- |
| db               | DB Object | 是    | open接口同步返回的对象 |
| sql              | String    | 否    | 要查询的sql语句     |
| callbackFunction | 函数        | 否    | 回调函数，返回执行的结果  |

`select`执行成功后，`callbackFunction`函数返回的数据第一个参数是Number 类型的 error,0表示成功，其他表示失败,第二个是数组对象,为select得到的结果。


**示例:**

```javascript
var sql = "SELECT * FROM testTable";
uexDataBaseMgr.select(db,sql, function (error,data) {
    if (error) {
        alert('执行失败')；
    } else {
        alert('data:' + JSON.stringify(data));
    }
});
```

> ### transactionEx　事务的执行

`uexDataBaseMgr.transactionEx(db,func, callbackFunction)`

**说明:**

事务的执行, 执行完成后回调`callbackFunction`

** 参数:**

| 参数名称             | 参数类型      | 是否必选 | 说明            |
| ---------------- | --------- | ---- | ------------- |
| db               | DB Object | 是    | open接口同步返回的对象 |
| func             | Function  | 是    | 可选在事务中执行的函数   |
| callbackFunction | Function  | 否    | 回调函数，返回执行的结果  |

`callbackFunction` 参数是是Number 类型的error,为0表示成功，其他表示失败


**示例:**

```javascript
function inFunc(){
    var sql = "DELETE FROM testTable WHERE _id = 1";
    uexDataBaseMgr.sql(db,sql);
}
uexDataBaseMgr.transactionEx(db,inFunc, function(error) {
	if(!error){
		alert("transaction success!");
	}
});
```

> ### close 关闭数据库

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

#3、更新历史

### iOS

API版本:`uexDataBaseMgr-4.0.0`

最近更新时间:`2016-8-2`

| 历史发布版本 | 更新内容    |
| ------ | ------- |
| 4.0.0  | 数据库功能插件 |


### Android

API版本:`uexDataBaseMgr-4.0.0`

最近更新时间:`2016-8-2`

| 历史发布版本 | 更新内容    |
| ------ | ------- |
| 4.0.0  | 数据库功能插件 |

