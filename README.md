# AppCan 4.0 插件接口规范

## 版本升级
* 兼容3.0版本，插件新增方法遵循4.0开发规范
* 插件方法支持同步返回值
* 插件方法参数支持function作为入参（去掉插件的CB函数）

## 编写规范

- 多实例插件，初始化同步返回插件对象。不再使用外部传入ID管理。
- 插件方法参数入参为JSON对象，便于扩展。
- 插件方法参数入参为Function对象，格式为：function(error, data){}
    - error值： 0表示成功， 非0表示错误。 （必选）
    - data值：（可选）
        - error 为0时，返回数据。
        - error 为非0时，返回错误信息
- 插件方法返回值
    - BOOL类型，true 或者 false
    - 对象（字符串或者对象），null表示失败。

## 文档格式规范

### fun1 示例1

`uexDemo.fun1();`

**说明:**

无参数，无返回值，无回调函数的方法文档示例。

**参数:**

无

**示例:**

```javascript
uexDemo.fun1();
```

### fun2 示例2

`uexDemo.fun2(jsonData);`

**说明:**

有参数，无返回值，无回调函数的方法文档示例。

**参数:**

| 参数名称     | 参数类型 | 是否必选 | 说明       |
| -------- | ---- | ---- | -------- |
| jsonData | Json | 是    | 接口所需业务数据 |

```javascript
var jsonData = {
  key1:,
  key2:,
  key3:,
  key4:
}
```

各字段含义如下：

| 字段名称 | 类型      | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| key1 | Number  | 是    |      |
| key2 | String  | 是    |      |
| key3 | Boolean | 否    |      |
| key4 | Array   | 是    |      |

**示例:**

```javascript
var jsonData = {
  key1:1,
  key2:"text",
  key3:true,
  key4:["item1","item2"]
}
uexDemo.fun2(JSON.stringify(jsonData));
```

### fun3 示例3

`uexDemo.fun3(jsonData,callBackFunction);`

**说明:**

有参数，有返回值，有回调函数的方法文档示例。

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明       |
| ---------------- | -------- | ---- | -------- |
| jsonData         | Json     | 是    | 接口所需业务数据 |
| callBackFunction | Function | 是    | 回调函数     |

```javascript
var jsonData = {
  key1:,
  key2:,
  key3:,
  key4:
}
```

各字段含义如下：

| 字段名称 | 类型      | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| key1 | Number  | 是    |      |
| key2 | String  | 是    |      |
| key3 | Boolean | 否    |      |
| key4 | Array   | 是    |      |

**回调参数:**

| 参数名称  | 参数类型   | 说明   |
| ----- | ------ | ---- |
| error | Number | 错误码  |
| data  | String | 相关数据 |

**返回值:**

xxx对象,失败时返回null

**示例:**

```javascript
var jsonData = {
  key1:1,
  key2:"text",
  key3:true,
  key4:["item1","item2"]
}
var demoObject = uexDemo.fun3(JSON.stringify(jsonData),function(error,data){
  if(!error){
    alert(data);
  }else{
    alert(error);
  }
});
alert(demoObject);
```

