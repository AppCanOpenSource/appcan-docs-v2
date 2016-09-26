[TOC]

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
系统联系人插件

## 1.1、说明
打开,添加,删除,查找,修改联系人等功能。

## 1.2、UI展示
 ![](http://newdocx.appcan.cn/docximg/152401g2015a6l7b.jpg)

## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=161_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

> ### open 打开联系人界面

`uexContact.open()`

**说明:**

打开联系人应用,将选中的联系人的姓名,电话,邮件通过cbOpen回调,每次只能选择一个联系人。回调方法[cbOpen](#cbOpen 打开联系人界面的回调方法)

**参数:**

无

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexContact.open();
```

> ### multiOpen 打开联系人选择界面

`uexContact.multiOpen()`

**说明:**

打开联系人选择界面,该界面中的数据是当前设备上所有联系人的信息,支持多选。回调方法[cbMultiOpen](#cbMultiOpen 打开联系人选择界面的回调方法)

**参数:**

  无

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexContact.multiOpen();
```

> ### addItem 添加联系人

`uexContact.addItem(name,num,email,option)`

**说明:**

添加联系人

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| name | String | 是 |  名称 |
| num| String | 是 | 电话号码 |
| email | String | 是 | 邮件 |
| option | String | 否 | 添加联系人配置,json格式字符串,如下: |

```
var option = {
    isNeedAlertDialog:
}
```
各字段含义如下:

|  字段名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| isNeedAlertDialog | Boolean | 否 | 添加过程中是否需要弹出"确认添加"提示框,默认为true,弹出提示框 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
var option = {
    isNeedAlertDialog:false
}
uexContact.addItem("张三","13436827900","widgetone@3g2win.com",JSON.stringify(option));
```

> ### deleteWithId 删除联系人

`uexContact.deleteWithId(option)`

**说明:**

通过联系人id精确删除对应联系人
由于手机端可能存在同名称的联系人导致原有deleteItem接口无法完全满足删除问题。
删除联系人 回调方法[cbDeleteWithId](#cbDeleteWithId 通过id删除联系人的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| option | String | 是 |  要删除的联系人参数,json格式字符串,如下: |

```
var option = {
    contactId://通过查询获取到的联系人id
}
```
各字段含义如下:

|  字段名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| contactId | String | 是 | 所删除的联系人的id(可通过search获取联系人id) |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

3.0.4+

**示例:**

```
var option =  {
    contactId:'405'
}
uexContact.deleteWithId(JSON.stringify(option));
```

> ### deleteItem 删除联系人

`uexContact.deleteItem(name)`

**说明:**

删除联系人 回调方法[cbDeleteItem](#cbDeleteItem 删除联系人的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| name | String | 是 |  名称 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexContact.deleteItem("张三");
```
> ### search 查询联系人

`uexContact.search(option)`

**说明:**

由于Android联系人的诸多信息要多次查询,因此建议如果有获取所有联系的人的需求的时候建议仅仅查询Name字段,其余字段可考虑设置不查询,以优化查询速度。
查询联系人 回调方法[cbSearch](#cbSearch 查询联系人的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| option | String | 否 | 搜索配置,json格式字符串,如下: |

```
var option = {
    resultNum:,//可选,单次返回数据数量,-1表示一次返回所有结果,默认50
    searchName:,//和contactId字段二选一,通过名字查询联系人,传空默认查询所有。
    contactId:,//和searchName字段二选一,可用于精确查找。(优先于Name)
    isSearchNum:,//可选,true,false是否查询电话号码,默认为true(Android 推荐false)
    isSearchEmail:,//可选,true,false是否查询Email,默认为true(Android 推荐false)
    isSearchAddress:,//可选,true,false是否查询Address,默认为true(Android 推荐false)
    isSearchCompany:,//可选,true,false是否查询Company,默认为true(Android 推荐false)
    isSearchTitle:,//可选,true,false是否查询title,默认为true(Android 推荐false)
    isSearchNote:,//可选,true,false是否查询Note,默认为true(Android 推荐false)
    isSearchUrl:,//可选,true,false是否查询Url,默认为true(Android 推荐false)
}
```
各字段含义如下:

|  字段名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| resultNum | Number | 否 | 一次最多返回的结果条数,默认为50条,-1表示一次返回所有结果 |
| searchName | String | 否 | 和contactId字段二选一,通过名字查询联系人,传空默认查询所有。 |
| contactId | String | 否 | 和searchName字段二选一,可用于精确查找。(优先于Name) |
| isSearchNum | Boolean | 否 | true,false是否查询电话号码,默认为true(Android 推荐false) |
| isSearchEmail | Boolean | 否 | true,false是否查询Email,默认为true(Android 推荐false) |
| isSearchAddress | Boolean | 否 | true,false是否查询Address,默认为true(Android 推荐false) |
| isSearchCompany | Boolean | 否 | true,false是否查询Company,默认为true(Android 推荐false) |
| isSearchTitle | Boolean | 否 | true,false是否查询Title,默认为true(Android 推荐false) |
| isSearchNote | Boolean | 否 | true,false是否查询Note,默认为true(Android 推荐false) |
| isSearchUrl | Boolean | 否 | true,false是否查询Url,默认为true(Android 推荐false) |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

3.0.4+

**示例:**

```
var option = {
    resultNum:-1//-1表示一次返回所有结果
    searchName:'',//全部查询
    isSearchNum:false,
    isSearchEmail:false,
    isSearchAddress:false,
    isSearchCompany:false,
    isSearchTitle:false,
    isSearchNote:false,
    isSearchUrl:false
}
uexContact.search(JSON.stringify(option));
```

> ### searchItem 查询联系人

`uexContact.searchItem(nameKey, option)`

**说明:**

查询联系人 回调方法[cbSearchItem](#cbSearchItem 查询联系人的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| nameKey | String | 是 |  名称,传空字符串时,查询通讯录中所有联系人|
| option | String | 否 | 搜索配置,json格式字符串,如下: |

```
var option = {
    resultNum:-1,//-1表示一次返回所有结果
    isSearchNum:,//可选,true,false是否查询电话号码,默认为true(Android 推荐false)
    isSearchEmail:,//可选,true,false是否查询Email,默认为true(Android 推荐false)
    isSearchAddress:,//可选,true,false是否查询Address,默认为true(Android 推荐false)
    isSearchCompany:,//可选,true,false是否查询Company,默认为true(Android 推荐false)
    isSearchTitle:,//可选,true,false是否查询title,默认为true(Android 推荐false)
    isSearchNote:,//可选,true,false是否查询Note,默认为true(Android 推荐false)
    isSearchUrl:,//可选,true,false是否查询Url,默认为true(Android 推荐false)
}
```
各字段含义如下:

|  字段名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| resultNum | Number | 否 | 一次最多返回的结果条数,默认为50条,-1表示一次返回所有结果 |
| isSearchNum | Boolean | 否 | true,false是否查询电话号码,默认为true(Android 推荐false) |
| isSearchEmail | Boolean | 否 | true,false是否查询Email,默认为true(Android 推荐false) |
| isSearchAddress | Boolean | 否 | true,false是否查询Address,默认为true(Android 推荐false) |
| isSearchCompany | Boolean | 否 | true,false是否查询Company,默认为true(Android 推荐false) |
| isSearchTitle | Boolean | 否 | true,false是否查询Title,默认为true(Android 推荐false) |
| isSearchNote | Boolean | 否 | true,false是否查询Note,默认为true(Android 推荐false) |
| isSearchUrl | Boolean | 否 | true,false是否查询Url,默认为true(Android 推荐false) |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
var option = {
    resultNum:-1//-1表示一次返回所有结果
    isSearchNum:false,
    isSearchEmail:false,
    isSearchAddress:false,
    isSearchCompany:false,
    isSearchTitle:false,
    isSearchNote:false,
    isSearchUrl:false
}
uexContact.searchItem("张三", JSON.stringify(option));
```
> ### modifyWithId 使用id修改联系人

`uexContact.modifyWithId(option)`

**说明:**

修改联系人 回调方法[cbModifyWithId](#cbModifyWithId 通过id修改联系人的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| option | String | 否 | 修改配置,json格式字符串,如下: |

```
var option = {
    contactId://联系人id
    name:,//联系人名称
    num:,//联系人电话
    email:,//联系人Email
}
```
各字段含义如下:

|  字段名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| contactId | String | 是 | 所修改的联系人的id(可通过search获取联系人id) |
| name | String | 是 | 联系人修改后的名称 |
| num | String | 是 | 联系人修改后的电话 |
| email | String | 是 | 联系人修改后的Email |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

  3.0.0+

**示例:**

```
var option = {
    contactId:'405',
    name:'Appcan',
    num:'15888888888',
    email:'widgeton@zymobi.com'
}
uexContact.modifyWithId(JSON.stringify(option));
```

> ### modifyItem 修改联系人

`uexContact.modifyItem(name,num,email)`

**说明:**

修改联系人 回调方法[cbModifyItem](#cbModifyItem 修改联系人的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| name | String | 是 |  名称 |
| num| String | 是 | 电话号码 |
| email | String | 是 | 邮件 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

  3.0.0+

**示例:**

```
uexContact.modifyItem("张三","13436827900","widgetone@3g2win.com");
```

> ### addItemWithVCard 添加联系人

`uexContact.addItemWithVCard(data,type)`

**说明:**

vCard方式添加联系人 回调方法[cbAddItem](#cbAddItem 添加联系人的回调方法)

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| data | String | 是 |  联系人数据,数据格式如下:`BEGIN:VCARD\nVERSION:3.0\nN:韩;超\nTEL:22334752\nEMAIL:zhuliang@ceair.com\nADR:;;绥宁路628号;;上海;200335\nORG:中国东方航空股有限公司\nTITLE:项目经理\nURL:mp.ceair.com\nNOTE:名\347\211\214二维码\nEND:VCARD`    其中:N-姓名,TEL-电话,EMAIL-邮箱,ADR-地址,ORG-公司,TITLE-职位,URL-网址,NOTE-备注 |
| type| Number | 是 | 是否显示提示框,1-不显示,其余情况显示。 |

**平台支持:**

Android2.2+    
iOS6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexContact.addItemWithVCard('BEGIN:VCARD\nVERSION:3.0\nN:韩;超\nTEL:22334752\nEMAIL:zhuliang@ceair.com\nADR:;;绥宁路628号;;上海;200335\nORG:中国东方航空股有限公司\nTITLE:项目经理\nURL:mp.ceair.com\nNOTE:名\347\211\214二维码\nEND:VCARD','');
```
## 2.2、回调方法

> ### cbOpen 打开联系人界面的回调方法

`uexContact.cbOpen(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType | Number类型 | 必选 | 数据类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback dataType数据类型 |
| data | Number | 是 | Key值uex.jkName、uex.jkNum、uex.jkEmail,详见CONSTANT中CallbackJson类型keyname |

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
    uexContact.cbOpen = function(opCode, dataType, data) {
        var obj = eval('('+ data + ')');
        alert(data);
   }
}
```

> ### cbMultiOpen 打开联系人选择界面的回调方法

`uexContact.cbMultiOpen(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType | Number类型 | 必选 | 数据类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback dataType数据类型 |
| data | Number | 是 | Key值uex.jkName、uex.jkNum、uex.jkEmail,详见CONSTANT中CallbackJson类型keyname |

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
    uexContact.cbMultiOpen = function(opCode, dataType, data){
        alert(data);
    }
}
```

> ### cbAddItem 添加联系人的回调方法

`uexContact.cbAddItem(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType | Number类型 | 必选 | 数据类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback dataType数据类型 |
| data | Number | 是 | 返回uex.cSuccess或者uex.cFailed,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Int Values "CONSTANT")中Callbackint类型数据 |

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
    uexContact.cbAddItem = function(opCode, dataType, data){
        alert(data);
    }
}
```

> ### cbDeleteItem 删除联系人的回调方法

`uexContact.cbDeleteItem(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType | Number类型 | 必选 | 数据类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback dataType数据类型 |
| data | Number | 是 | 返回uex.cSuccess或者uex.cFailed,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Int Values "CONSTANT")中Callbackint类型数据 |

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
    uexContact.cbDeleteItem = function(opCode, dataType, data){
        alert(data);
    }
}
```
> ### cbDeleteWithId 通过id删除联系人的回调方法

`uexContact.cbDeleteWithId(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType | Number类型 | 必选 | 数据类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback dataType数据类型 |
| data | Number | 是 | 返回uex.cSuccess或者uex.cFailed,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Int Values "CONSTANT")中Callbackint类型数据 |

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
    uexContact.cbDeleteWithId = function(opCode, dataType, data){
        alert(data);
    }
}
```
> ### cbSearch 查询联系人的回调方法

`uexContact.cbSearch(jsonObj)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |

```
var jsonObj = {
	result:,//0成功,非0失败
	contactList://获取的联系人列表
		[
			 {
				contactId:,//联系人id
				...//其余Key值uex.jkName、uex.jkNum、uex.jkEmail,详见CONSTANT中CallbackJson类型keyname
			}
			...
		]
}
```
各字段含义如下:

|  字段名称 | 类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| result | Number | 是 | 标识查询成功还是失败,0成功,非0失败 |
| contactId | String | 是 | 联系人id|

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
    uexContact.cbSearch = function(data){
        alert(JSON.stringify(data));
    }
}
```

> ### cbSearchItem 查询联系人的回调方法

`uexContact.cbSearchItem(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType | Number类型 | 必选 | 数据类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback dataType数据类型 |
| data | String | 是 | 返回的数据。Key值uex.jkName、uex.jkNum、uex.jkEmail,详见CONSTANT中CallbackJson类型keyname |
 

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
    uexContact.cbSearchItem = function(opCode, dataType, data){
        alert(data);
    }
}
```
> ### cbModifyWithId 通过id修改联系人的回调方法

`uexContact.cbModifyWithId(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType | Number类型 | 必选 | 数据类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback dataType数据类型 |
| data | Number | 是 | 返回uex.cSuccess或者uex.cFailed,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Int Values "CONSTANT")中Callbackint类型数据 |

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
    uexContact.cbModifyWithId = function(opCode, dataType, data){
        alert(data);
    }
}
```

> ### cbModifyItem 修改联系人的回调方法

`uexContact.cbModifyItem(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId | Number | 是 |  操作ID,在此函数中不起作用,可忽略 |
| dataType | Number类型 | 必选 | 数据类型详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Data Types "CONSTANT")中Callback dataType数据类型 |
| data | Number | 是 | 返回uex.cSuccess或者uex.cFailed,详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Callback Int Values "CONSTANT")中Callbackint类型数据 |

**版本支持:**

3.0.0+

**示例:**

```
window.uexOnload = function(){
    uexContact.cbModifyItem = function(opCode, dataType, data){
        alert(data);
    }
}
```

# 3、更新历史

### iOS

API版本:`uexContact-3.0.10`

最近更新时间:`2016-4-22`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.10 | 修复cbSearch回调与安卓不一致,参数命名不一致的问题 |
| 3.0.9 | 新增search,modifyWithId,deleteWithId接口以及对应回调 |
| 3.0.8 | 改用bundle方式加载资源;添加IDE支持 |
| 3.0.7 | searchItem接口增加返回信息条数配置;addItem接口增加是否弹出提示框配置 |
| 3.0.6 | 修改配置文件,修改BUG |
| 3.0.5 | 修改BUG |
| 3.0.4 | 修改打开联系人,多选信息电话号码不全的BUG |
| 3.0.3 | 增加可以查询和,修改多个号码的联系人接口 |
| 3.0.2 | 修改增加联系人接口,一个联系人可以添加多个电话号码 |
| 3.0.1 | 修复uexContact在iOS8以上版本无法返回联系人信息的bug |
| 3.0.0 | 联系人功能插件 |

### Android

API版本:`uexContact-3.0.5`

最近更新时间:`2016-7-5`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.5 | addItem接口支持多个号码的添加,以分号分隔 |
| 3.0.4 | 新增search,modifyWithId,deleteWithId接口以及对应回调.优化查询逻辑 |
| 3.0.3 | 修复执行过慢影响UI线程的问题,修正当增删改查存在的部分回调错误问题 |
| 3.0.2 | 修复打开联系人后邮箱错乱的问题 |
| 3.0.1 | 1:searchItem接口增加返回信息条数配置;2:addItem接口增加是否弹出提示框配置 |
| 3.0.0 | 联系人功能插件 |
