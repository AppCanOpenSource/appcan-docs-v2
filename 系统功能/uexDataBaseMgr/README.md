[TOC]

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 

 
数据库插件

## 1.1、说明
 该对象主要封装了数据库的打开关闭,创建表,插入数据,查询数据,执行事务的接口

  
## 1.2、开源源码

插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=166_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

 
## 2.1、方法

> ### openDataBase 打开数据库

`uexDataBaseMgr.openDataBase(dbName,id)`

**说明:**

开数据库并得到数据库对象,同一id的数据库对象只能被打开一次。回调方法[cbOpenDataBase](#cbOpenDataBase 打开数据库后的回调方法 "cbOpenDataBase")

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| dbName | String | 是 | 数据库名称 |
| id | Number | 是 | 唯一标识符 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    uexDataBaseMgr.openDataBase("uexDB",1);
```

> ### executeSql Sql语句的执行

`uexDataBaseMgr.executeSql(dbName,id,sql)`

**说明:**

Sql语句的执行,对数据库数据的增删改。回调方法[cbExecuteSql](#cbExecuteSql 执行Sql语句的回调方法 "cbExecuteSql")

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| dbName | String | 是 | 数据库名称 |
| id | Number | 是 | 唯一标识符 |
| sql | String | 是 | 要执行的sql语句 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    var sql = "CREATE TABLE testTable (_id  INTEGER PRIMARY KEY,name TEXT)";
    uexDataBaseMgr.executeSql("uexDB",1,sql);
```
> ### selectSql Sql语句的查询

`uexDataBaseMgr.selectSql(dbName,id,sql)`

**说明:**

Sql语句的查询,对数据库中数据的查询。回调方法[cbSelectSql](#cbSelectSql 查询Sql语句的回调方法 "cbSelectSql")

** 参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| dbName | String | 是 | 数据库名称 |
| id | Number | 是 | 唯一标识符 |
| sql | String | 否 | 要查询的sql语句 |

**平台支持:**

Android2.2+
iOS6.0+

**  版本支持:**
3.0.0+

**示例:**

```
    var sql = "SELECT * FROM testTable";
    uexDataBaseMgr.selectSql("uexDB",1,sql);
```

> ### transaction　事务的执行

`uexDataBaseMgr.transaction(dbName,id,func)`

**说明:**

事务的执行,回调方法[cbTransaction](#cbTransaction 执行事务的回调方法 "cbTransaction")

** 参数:**
 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| dbName | String | 是 | 数据库名称 |
| id | Number | 是 | 唯一标识符 |
| func | Function | 否 | 可选在事务中执行的函数 |

**平台支持:**

Android2.2+
iOS6.0+

** 版本支持:**
3.0.0+

**示例:**

```
    uexDataBaseMgr.transaction("uexDB",1,inFunc);
    function inFunc(){
        var sql = "DELETE FROM testTable WHERE _id = 1";
        uexDataBaseMgr.executeSql(dbName,1,sql);
    }
```

> ### closeDataBase 关闭数据库

`uexDataBaseMgr.closeDataBase(dbName,id)`

** 说明:**
关闭数据库,回调方法[cbCloseDataBase](#cbCloseDataBase 关闭数据库后的回调方法 "cbCloseDataBase")

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| dbName | String | 是 | 数据库名称 |
| id | Number | 是 | 唯一标识符 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    uexDataBaseMgr.closeDataBase("uexDB",1);
```

##2.2、回调方法

> ### cbOpenDataBase 打开数据库后的回调方法

`uexDataBaseMgr.cbOpenDataBase(opId,dataType,data)`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | 数据库对象的唯一标识符 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | Number | 是 | 返回uex.cSuccess或者uex.cFailed,详见CONSTANT中Callbackint类型数据 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    uexDataBaseMgr.cbOpenDataBase = function(opId,dataType,data){
        if(data == 0){
            alert("数据库打开成功!");
        }else{
            alert("数据库打开失败!");
        }
    };
```
> ### cbExecuteSql 执行Sql语句的回调方法

`uexDataBaseMgr.cbExecuteSql(opId,dataType,data)`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | 数据库对象的唯一标识符 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | Number | 是 | 返回uex.cSuccess或者uex.cFailed,详见CONSTANT中Callbackint类型数据 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    uexDataBaseMgr.cbExecuteSql = function(opId,dataType,data){
        if(data == 0){
            alert("执行成功!");
        }else{
            alert("执行失败!");
        }
    };
```

> ### cbSelectSql 查询Sql语句的回调方法

`  uexDataBaseMgr.cbSelectSql(opId,dataType,data)`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | 数据库对象的唯一标识符 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | Number | 是 | 返回查询到的数据,json数据格式|

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    uexDataBaseMgr.cbSelectSql = function(opId,dataType,data){
        var jsonList=eval("("+data+")");
        if(jsonList.length == 0){
            alert("无数据");
        }
        for(var i=0;i<jsonList.length;i++){
     　　　　for(var key in jsonList[i]){
             　　alert("key:"+key+",value:"+jsonList[i][key]); 
            }
        }
    };
```

> ### cbTransaction 执行事务的回调方法

  `uexDataBaseMgr.cbTransaction(opId,dataType,data)`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | 数据库对象的唯一标识符 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | Number | 是 | 返回uex.cSuccess或者uex.cFailed,详见CONSTANT中Callbackint类型数据 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    uexDataBaseMgr.cbTransaction = function(opId,dataType,data){
        if(data == 0){
            alert("事务提交成功!");
        }else{
            alert("事务提交失败!");
        }
    };
```

> ### cbCloseDataBase 关闭数据库后的回调方法

`uexDataBaseMgr.cbCloseDataBase(opId,dataType,data)`

**参数:**

 
|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 | 数据库对象的唯一标识符 |
| dataType | Number | 是 | 参数类型详见CONSTANT中Callback方法数据类型 |
| data | Number | 是 | 返回uex.cSuccess或者uex.cFailed,详见CONSTANT中Callbackint类型数据 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
    uexDataBaseMgr.cbCloseDataBase = function(opId,dataType,data){
        if(data == 0){
            alert("数据库关闭成功!");
        }else{
            alert("数据库关闭失败!");
        }
    };
```

#3、更新历史

### iOS

API版本:`uexDataBaseMgr-3.0.4`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.4 | 添加IDE支持 |
| 3.0.3 | 重新解决uexDataBaseMgr插件IDE包创建表格失败的问题 |
| 3.0.2 | 解决uexDataBaseMgr插件IDE包创建表格失败的问题 |
| 3.0.1 | 使用新版Xcode重新编译,支持arm64 |
| 3.0.0 | 数据库功能插件 |

### Android

API版本:`uexDataBaseMgr-3.0.0`

最近更新时间:`2015-06-19`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 数据库功能插件 |
