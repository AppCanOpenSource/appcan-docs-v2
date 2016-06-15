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

> ### openDataBase 打开数据库

`uexDataBaseMgr.openDataBase(dbName,id)`

**说明:**

开数据库并得到数据库对象,同一id的数据库对象只能被打开一次。

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| dbName | String | 是 | 数据库名称 |
| id | Number | 是 | 唯一标识符 |

**返回结果**

该函数同步返回执行结果，执行结果是`Number`类型。0: 成功， 1: 失败， -1: 该id所对应的数据库对象已打开

**示例:**

```
var result = uexDataBaseMgr.openDataBase("uexDB",1);
```

> ### executeSql Sql语句的执行

`uexDataBaseMgr.executeSql(dbName,id,sql, callbackFunction)`

**说明:**

Sql语句的执行,对数据库数据的增删改。执行完成后回调`callbackFunction`
**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| dbName | String | 是 | 数据库名称 |
| id | Number | 是 | 唯一标识符 |
| sql | String | 是 | 要执行的sql语句 |
| callbackFunction | 函数 | 否 | 回调函数，返回执行的结果 |

`callbackFunction`的参数是Number类型。 0: 成功， 1:失败


**示例:**

```
var sql = "CREATE TABLE testTable (_id  INTEGER PRIMARY KEY,name TEXT)";
uexDataBaseMgr.executeSql("uexDB",1,sql, function(data) {
    if (data == 1) {
        alert('执行成功')
    }
});
```
> ### selectSql Sql语句的查询

`uexDataBaseMgr.selectSql(dbName,id,sql, callbackFunction)`

**说明:**

Sql语句的查询,对数据库中数据的查询。

** 参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| dbName | String | 是 | 数据库名称 |
| id | Number | 是 | 唯一标识符 |
| sql | String | 否 | 要查询的sql语句 |
| callbackFunction | 函数 | 否 | 回调函数，返回执行的结果 |

`selectSql`执行成功后，`callbackFunction`函数返回的数据是JSON对象，执行失败后，`callbackFunction`函数返回数字 1 。


**示例:**

```
var sql = "SELECT * FROM testTable";
uexDataBaseMgr.selectSql("uexDB",1,sql, function (data) {
    if (data == 1) {
        alert('执行失败')；
    } else {
        alert('data:' + JSON.stringify(data));
    }
});
```

> ### transaction　事务的执行

`uexDataBaseMgr.transaction(dbName,id,func, callbackFunction)`

**说明:**

事务的执行, 执行完成后回调`callbackFunction`

** 参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| dbName | String | 是 | 数据库名称 |
| id | Number | 是 | 唯一标识符 |
| func | Function | 否 | 可选在事务中执行的函数 |
| callbackFunction | 函数 | 否 | 回调函数，返回执行的结果 |

`callbackFunction` 参数是Number类型， 0: 成功， 1:失败


**示例:**

```
function inFunc(){
    var sql = "DELETE FROM testTable WHERE _id = 1";
    uexDataBaseMgr.executeSql(dbName,1,sql);
}
uexDataBaseMgr.transaction("uexDB",1,inFunc, function(data) {
    alert(data);
});

```

> ### closeDataBase 关闭数据库

`uexDataBaseMgr.closeDataBase(dbName,id)`

** 说明:**

关闭数据库, 关闭成功后返回 0, 失败返回 1

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| dbName | String | 是 | 数据库名称 |
| id | Number | 是 | 唯一标识符 |


**示例:**

```
var result = uexDataBaseMgr.closeDataBase("uexDB",1);
alert(result);
```

#3、更新历史

### iOS

API版本:`uexDataBaseMgr-4.0.0`

最近更新时间:`2016-6-15`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持function传入 |
| 3.0.5 | 修复数据包含特殊字符时回调结果错误的问题 |
| 3.0.4 | 添加IDE支持 |
| 3.0.3 | 重新解决uexDataBaseMgr插件IDE包创建表格失败的问题 |
| 3.0.2 | 解决uexDataBaseMgr插件IDE包创建表格失败的问题 |
| 3.0.1 | 使用新版Xcode重新编译,支持arm64 |
| 3.0.0 | 数据库功能插件 |

### Android

API版本:`uexDataBaseMgr-4.0.0`

最近更新时间:`2016-6-15`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持function传入 |
| 3.0.0 | 数据库功能插件 |
