/*
Sort: 1
Toc: 1
*/



# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>
 高德地图插件
## 1.1、说明<ignore>
 封装高德地图相关功能,包括放大缩小、移动和旋转等基本操作;标注;圆形、矩形和多边形覆盖物;定位、搜索、地理编码、离线地图等功能.
> **`注意:`**
> 　　申请的插件appkey需要通过config.xml文件配置自定义参数的方法,可直接在官网公共插件里直接勾选使用,详见[附录](#4、附录 "附录").IDE插件因为涉及到高德地图方面的ID与Key暂时无法正常使用.具体操作见『[手册](http://newdocx.appcan.cn/newdocx/docx?type=1050_975 "手册")』

## 1.2、开源源码<ignore>
自定义插件下载:[点击此处](http://plugin.appcan.cn/details.html?id=428_index) (插件测试用例与插件包已经提供)
## 1.3、 UI展示<ignore>
 ![](http://plugin.appcan.cn/pluginApi/getCImg?img=100857y2015t5o28ip.jpg)![](http://plugin.appcan.cn/pluginApi/getCImg?img=100909q2015h5f28yu.jpg)![](http://plugin.appcan.cn/pluginApi/getCImg?img=100918p2015g5h28ug.jpg)![](http://plugin.appcan.cn/pluginApi/getCImg?img=100925f2015t5o28pl.jpg)
## 1.4、术语表<ignore>
### 1.4.1 Download Status<ignore>

| 状态码  | 描述     | 英文描述         |
| ---- | ------ | ------------ |
| -1   | 下载失败   | ERROR        |
| 0    | 正在下载   | LOADING      |
| 1    | 正在解压   | UNZIP        |
| 2    | 等待下载   | WAITING      |
| 3    | 暂停下载   | PAUSE        |
| 4    | 下载成功   | SUCCESS      |
| 5    | 停止下载   | STOP         |
| 6    | 检查更新状态 | CHECKUPDATES |

### 1.4.2 cbDownload Status<ignore>

| errorCode | 描述     | errorStr            |
| --------- | ------ | ------------------- |
| 0         | 加入列表成功 | ""                  |
| -1        | 下载失败   | "城市或省名称错误!"         |
| -2        | 下载失败   | "已经存在列表中!"          |
| -3        | 下载失败   | "已经下载完成,请到已下载列表查看!" |

## 1.5、平台版本支持<ignore>

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.6、接口有效性<ignore>

本插件所有API默认在插件版本**4.0.0+**可用.

在后续版本中新添加的接口会在文档中额外说明.

# 2、API概述 <ignore>
## 2.1、方法<ignore>
###  open  打开地图 

`uexGaodeMap.open(json)`

**说明:**

打开地图.

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |

```javascript
var json = {
    left:,
    top:,
    width:,
    height:,
    isScrollWithWeb:,
    longitude:,
    latitude:,
    APIKey:
}
```
**各字段含义:**

| 参数名称            | 参数类型    | 是否必选 | 说明                         |
| --------------- | ------- | ---- | -------------------------- |
| left            | Number  | 否    | 左间距,默认0                    |
| top             | Number  | 否    | 上间距,默认0                    |
| width           | Number  | 否    | 地图宽度                       |
| height          | Number  | 否    | 地图高度                       |
| isScrollWithWeb | Boolean | 否    | 地图是否跟随网页滚动,默认为false        |
| longitude       | Number  | 否    | 中心点经度                      |
| latitude        | Number  | 否    | 中心点纬度                      |
| APIKey          | String  | 否    | 设置高德的APIKey(仅iOS,仅IDE本地打包) |

**示例:**

```javascript
    var json = {
        left:0,
        top:0,
        width:800,
        height:800,
        isScrollWithWeb:true,
        longitude:114.402815,
        latitude:30.475798
    };
    uexGaodeMap.open(JSON.stringify(json));
```

###   close  关闭地图

`uexGaodeMap.close()`

**参数:**

```
无
```

**示例:**

```javascript
    uexGaodeMap.close();
```
###  setMapType 设置地图类型

`uexGaodeMap.setMapType(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |


```javascript
var json = {
    type:
}
```
**各字段含义:**

| 参数名称 | 参数类型   | 是否必选 | 说明                        |
| ---- | ------ | ---- | ------------------------- |
| type | Number | 是    | 地图类型,1-标准地图,2-卫星地图,3-夜景地图 |

**示例:**

```javascript
var json = {
    type:1
};
uexGaodeMap.setMapType(JSON.stringify(json));
```

###  setTrafficEnabled  开启或关闭实时路况

`uexGaodeMap.setTrafficEnabled(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |


```javascript
var json = {
    type:
}
```
**各字段含义:**

| 参数名称 | 参数类型   | 是否必选 | 说明        |
| ---- | ------ | ---- | --------- |
| type | Number | 是    | 0-关闭,1-开启 |

**示例:**

```javascript
    var json = {
        type:1
    };
    uexGaodeMap.setTrafficEnabled(JSON.stringify(json));
```

###  setCenter  设置地图中心点

`uexGaodeMap.setCenter(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |


```javascript
var json = {
    longitude:,
    latitude:
}
```
**各字段含义:**

| 参数名称      | 参数类型   | 是否必选 | 说明    |
| --------- | ------ | ---- | ----- |
| longitude | Number | 是    | 中心点经度 |
| latitude  | Number | 是    | 中心点纬度 |

**示例:**

```javascript
    var json = {
        longitude:114.402815,
        latitude:30.475798
    };
    uexGaodeMap.setCenter(JSON.stringify(json));
```

###  setZoomLevel  设置地图缩放级别

`uexGaodeMap.setZoomLevel(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |


```javascript
var json = {
    level:
}
```
**各字段含义:**

| 参数名称  | 参数类型   | 是否必选 | 说明          |
| ----- | ------ | ---- | ----------- |
| level | Number | 是    | 级别,范围(3,20) |


**示例:**

```javascript
    var json = {
        level:15
    };
    uexGaodeMap.setZoomLevel(JSON.stringify(json));
```

###  zoomIn  放大一个地图级别

`uexGaodeMap.zoomIn()`

**参数:**

无 

**示例:**

```javascript
    uexGaodeMap.zoomIn();
```

###   zoomOut  缩小一个地图级别

`uexGaodeMap.zoomOut()`

**参数:**

无


**示例:**

```javascript
uexGaodeMap.zoomOut();
```

###  rotate  旋转地图

`uexGaodeMap.rotate(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |


````javascript
var json = {
    angle:
}
````
**各字段含义:**

| 参数名称  | 参数类型   | 是否必选 | 说明                                |
| ----- | ------ | ---- | --------------------------------- |
| angle | Number | 是    | 旋转角度,正北方向到地图方向逆时针旋转的角度,范围(0,360). |


**示例:**

```javascript
    var json = {
        angle:90
    };
    uexGaodeMap.rotate(JSON.stringify(json));
```

###  overlook  倾斜地图

`uexGaodeMap.overlook(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |


```javascript
var json = {
    angle:
}
```
**各字段含义:**

| 参数名称  | 参数类型   | 是否必选 | 说明              |
| ----- | ------ | ---- | --------------- |
| angle | Number | 是    | 地图倾斜度,范围(0,45). |

**示例:**

```javascript
    var json = {
        angle:23
    };
    uexGaodeMap.overlook(JSON.stringify(json));
```

###  setZoomEnable  开启或关闭手势缩放

`uexGaodeMap.setZoomEnable(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |


```javascript
var json = {
    type://(必选) 0-关闭,1-开启
}
```


**示例:**

```javascript
    var json = {
        type:1
    };
    uexGaodeMap.setZoomEnable(JSON.stringify(json));
```

### setRotateEnable 开启或关闭手势旋转及手势倾斜

`uexGaodeMap.setRotateEnable(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |


```javascript
var json = {
    type:
}
```
**各字段含义:**

| 参数名称 | 参数类型   | 是否必选 | 说明        |
| ---- | ------ | ---- | --------- |
| type | Number | 是    | 0-关闭,1-开启 |

**示例:**

```javascript
    var json = {
        type:1
    };
    uexGaodeMap.setRotateEnable(JSON.stringify(json));
```

###  setCompassEnable  开启或关闭指南针

`uexGaodeMap.setCompassEnable(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |


```javascript
var json = {
    type:
}
```
**各字段含义:**

| 参数名称 | 参数类型   | 是否必选 | 说明        |
| ---- | ------ | ---- | --------- |
| type | Number | 是    | 0-关闭,1-开启 |


**示例:**

```javascript
    var json = {
        type:1
    };
    uexGaodeMap.setCompassEnable(JSON.stringify(json));
```

###  setScrollEnable  开启或关闭手势移动

`uexGaodeMap.setScrollEnable(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |


```javascript
var json = {
    type:
}
```
**各字段含义:**

| 参数名称 | 参数类型   | 是否必选 | 说明        |
| ---- | ------ | ---- | --------- |
| type | Number | 是    | 0-关闭,1-开启 |


**示例:**

```javascript
    var json = {
        type:1
    };
    uexGaodeMap.setScrollEnable(JSON.stringify(json));
```

###   addMarkersOverlay  添加标注

` uexGaodeMap.addMarkersOverlay(json)`

**参数:**


| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |

```javascript
var json = [
    {
        id:,
        longitude:,
        latitude:,
        icon:,
        bubble:{
                title:,
                subTitle:
        }
    }
]
```
**各字段含义:**

| 参数名称      | 参数类型   | 是否必选 | 说明    |
| --------- | ------ | ---- | ----- |
| id        | Number | 是    | 唯一标识符 |
| longitude | Number | 是    | 标注经度  |
| latitude  | Number | 是    | 标注纬度  |
| icon      | String | 否    | 标注图标  |
| bubble    | Number | 否    | 标注气泡  |
| title     | Number | 是    | 气泡标题  |
| subTitle  | Number | 否    | 气泡子标题 |

**示例:**

```javascript
    var json = [
        {
            id:10001,
            longitude:114.402965,
            latitude:30.475845,
            icon:"http://www.iconpng.com/png/mapmarkers/marker_inside_azure.png",
            bubble:{
                title:"title1",
                subTitle:"subTitle1"
            }
        },
        {
            id:10002,
            longitude:114.409308,
            latitude:30.476229,
            bubble:{
                title:"title2",
                subTitle:"subTitle2"
            }
        }
    ];
    uexGaodeMap.addMarkersOverlay(JSON.stringify(json));
```

###  setMarkerOverlay  修改标注

`uexGaodeMap.setMarkerOverlay(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |


```javascript
var json = {
    id:,
    longitude:,
    latitude:,
    icon:,
    bubble:{
        title:,
        subTitle:
    }
}
```
**各字段含义:**

| 参数名称      | 参数类型   | 是否必选 | 说明    |
| --------- | ------ | ---- | ----- |
| id        | Number | 是    | 唯一标识符 |
| longitude | Number | 否    | 标注经度  |
| latitude  | Number | 否    | 标注纬度  |
| icon      | String | 否    | 标注图标  |
| bubble    | Object | 否    | 标注气泡  |
| title     | String | 是    | 气泡标题  |
| subTitle  | String | 否    | 气泡子标题 |


**示例:**

```javascript
    var json = {
        id:10002,
        bubble:{
            title:"change-title",
            subTitle:"change-subTitle"
        }
    };
    uexGaodeMap.setMarkerOverlay(JSON.stringify(json));
```

###  addPolylineOverlay  添加折线覆盖物

`uexGaodeMap.addPolylineOverlay(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明           |
| ---- | ------- | ---- | ------------ |
| json | json字符串 | 是    | 传入参数,折线覆盖物信息 |



```javascript
var json = {
    id:,
    fillColor:,
    lineWidth:,
    property:[
        {
            longitude:,
            latitude:
        }
    ]
}
```
**各字段含义:**

| 参数名称      | 参数类型   | 是否必选 | 说明    |
| --------- | ------ | ---- | ----- |
| id        | Number | 是    | 唯一标识符 |
| fillColor | String | 否    | 折线颜色  |
| lineWidth | Number | 否    | 折线宽   |
| property  | Array  | 是    | 数据    |
| longitude | Number | 是    | 连接点经度 |
| latitude  | Number | 是    | 连接点纬度 |

 

**示例:**

```javascript
    var json = {
        id:151,
        fillColor:"#f00",
        lineWidth:10.0,
        property:[
            {
                longitude:114.402965,
                latitude:30.475845
            },
            {
                longitude:114.502965,
                latitude:30.475845
            },
            {
                longitude:114.402965,
                latitude:30.375845
            }
        ]
    };
    uexGaodeMap.addPolylineOverlay(JSON.stringify(json));
```

###  removeOverlays  移除覆盖物

`uexGaodeMap.removeOverlays(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明                          |
| ---- | ------- | ---- | --------------------------- |
| json | json字符串 | 可选   | 传入参数,覆盖物唯一标识符数组,不传时移除所有覆盖物. |


```javascript
var json = [];
```

  

**示例:**

```javascript
 	var params = [151,152];
    var json = JSON.stringify(params);
    uexGaodeMap.removeOverlays(json);
```

###  addArcOverlay  添加弧形覆盖物,仅Android支持

`uexGaodeMap.addArcOverlay(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明           |
| ---- | ------- | ---- | ------------ |
| json | json字符串 | 是    | 传入参数,弧形覆盖物信息 |


```javascript
var json = {
    id:,
    strokeColor:,
    lineWidth:,
    start:{
        longitude:,
        latitude:
    },
    center:{
        longitude:,
        latitude:
    },
    end:{
        longitude:,
        latitude:
    }
}
```
**各字段含义:**

| 参数名称        | 参数类型   | 是否必选 | 说明    |
| ----------- | ------ | ---- | ----- |
| id          | Number | 是    | 唯一标识符 |
| strokeColor | String | 否    | 颜色    |
| lineWidth   | Number | 否    | 线宽    |
| start       | Object | 是    | 起点数据  |
| center      | Object | 是    | 中间点数据 |
| end         | Object | 是    | 终点数据  |
| longitude   | Number | 是    | 连接点经度 |
| latitude    | Number | 是    | 连接点纬度 |

**平台支持:**

Android 4.0+

**示例:**

```javascript
    var json = {
        id:152,
        strokeColor:"#f00",
        lineWidth:12.0,
        start:{
            longitude:114.402965,
            latitude:30.475845
        },
        center:{
            longitude:114.502965,
            latitude:30.475845
        },
        end:{
            longitude:114.402965,
            latitude:30.375845
        }
    };
    uexGaodeMap.addArcOverlay(JSON.stringify(json));
```

###  addCircleOverlay  添加圆形覆盖物

`uexGaodeMap.addCircleOverlay(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明           |
| ---- | ------- | ---- | ------------ |
| json | json字符串 | 是    | 传入参数,圆形覆盖物信息 |


```javascript
var json = {
    id:,//(必选) 唯一标识符
    longitude:,//(必选) 圆心经度
    latitude:,//(必选) 圆心纬度
    radius:,//(必选) 半径
    fillColor:,//(可选) 填充颜色
    strokeColor:,//(可选) 边框颜色
    lineWidth://(可选) 边框线宽
}
```
**各字段含义:**

| 参数名称        | 参数类型   | 是否必选 | 说明    |
| ----------- | ------ | ---- | ----- |
| id          | Number | 是    | 唯一标识符 |
| longitude   | Number | 是    | 圆心经度  |
| latitude    | Number | 是    | 圆心纬度  |
| radius      | Number | 是    | 半径    |
| fillColor   | String | 否    | 填充颜色  |
| strokeColor | String | 否    | 边框颜色  |
| lineWidth   | Number | 否    | 边框线宽  |



**示例:**

```javascript
    var json = {
        id:153,
        longitude:114.402965,
        latitude:30.375845,
        radius:1000,
        fillColor:"#4169E1",
        strokeColor:"#990033",
        lineWidth:4
    };
    uexGaodeMap.addCircleOverlay(JSON.stringify(json));
```

###  addPolygonOverlay  添加多边形覆盖物

`uexGaodeMap.addPolygonOverlay(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明            |
| ---- | ------- | ---- | ------------- |
| json | json字符串 | 是    | 传入参数,多边形覆盖物信息 |


```javascript
var json = {
    id:,//(必选) 唯一标识符
    fillColor:,//(可选) 填充颜色
    strokeColor:,//(可选) 边框颜色
    lineWidth:,//(可选) 边框线宽
    property:[//(必选) 数据
        {
            longitude:,//(必选) 顶点经度
            latitude://(必选) 顶点纬度
        }
    ]
}
```
**各字段含义:**

| 参数名称        | 参数类型   | 是否必选 | 说明    |
| ----------- | ------ | ---- | ----- |
| id          | Number | 是    | 唯一标识符 |
| fillColor   | String | 否    | 填充颜色  |
| strokeColor | String | 否    | 边框颜色  |
| lineWidth   | Number | 否    | 边框线宽  |
| property    | Array  | 是    | 数据    |
| longitude   | Number | 是    | 顶点经度  |
| latitude    | Number | 是    | 顶点纬度  |


**示例:**

```javascript
    var json = {
        id:154,
        fillColor:"#990033",
        strokeColor:"#990033",
        lineWidth:2.0,
        property:[
            {
                longitude:114.402965,
                latitude:30.375845
            },
            {
                longitude:115.402965,
                latitude:30.375845
            },
            {
                longitude:114.402965,
                latitude:31.375845
            },
            {
                longitude:114.402965,
                latitude:30.375845
            }
        ]
    };
    var overlay = uexGaodeMap.addPolygonOverlay(JSON.stringify(json));
```

###  addGroundOverlay  添加图片覆盖物

`uexGaodeMap.addGroundOverlay(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明           |
| ---- | ------- | ---- | ------------ |
| json | json字符串 | 是    | 传入参数,图片覆盖物信息 |


```javascript
var json = {
    id:,//(必选) 唯一标识符
    imageUrl:,//(必选) 图片地址
    transparency:,//(可选) 图片透明度(仅Android支持该参数)
    property:[//(必选) 数据,数组长度为2,第一个元素表示西南角的经纬度,第二个表示东北角的经纬度;
        {
            longitude:,//(必选) 顶点经度
            latitude://(必选) 顶点纬度
        }
    ]
}
```
**各字段含义:**

| 参数名称         | 参数类型   | 是否必选 | 说明                                    |
| ------------ | ------ | ---- | ------------------------------------- |
| id           | Number | 是    | 唯一标识符                                 |
| imageUrl     | String | 是    | 图片地址                                  |
| transparency | Number | 否    | 图片透明度(仅Android支持该参数)                  |
| property     | Array  | 是    | 数据,数组长度为2,第一个元素表示西南角的经纬度,第二个表示东北角的经纬度 |
| longitude    | Number | 是    | 顶点经度                                  |
| latitude     | Number | 是    | 顶点纬度                                  |


**示例:**

```javascript
    var json = {
        id:155,
        imageUrl:"http://img0.bdstatic.com/img/image/9baf75d938553886ce515def29441ed31409109131.jpg",
        transparency:0.5,
        property:[
            {
                longitude:114.402165,
                latitude:30.374845
            },
            {
                longitude:114.502165,
                latitude:30.474845
            }
        ]
    };
    uexGaodeMap.addGroundOverlay(JSON.stringify(json));
```

###  removeMarkersOverlays  移除标注

`uexGaodeMap.removeMarkersOverlays(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明                        |
| ---- | ------- | ---- | ------------------------- |
| json | json字符串 | 否    | 传入参数,标注唯一标识符数组,不传时移除所有标注. |

```javascript
var json = [];
```

**示例:**

```javascript
    var json = [151,152];
    uexGaodeMap.removeMarkersOverlays(JSON.stringify(json));
```

###  poiSearch  兴趣点搜索


`uexGaodeMap.poiSearch(json,callBackFunction)`

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明   |
| ---------------- | -------- | ---- | ---- |
| json             | json字符串  | 是    | 传入参数 |
| callBackFunction | Function | 是    | 回调函数 |

**传入参数格式为**:

```javascript
var json = {
    searchKey:,//(可选) 搜索关键字
    poiTypeSet:,//(可选) Poi兴趣点,searchKey和poiTypeSet必须至少包含其中的一个
    city:,//(可选) 城市,不传时表示全国范围内(iOS无效,默认全国范围内搜索)
    pageNum:,//(可选) 搜索结果页索引,默认为0
    searchBound://(可选) 区域搜索,city和searchBound必须至少包含其中的一个.以下的三个类别有且只有一种.
    {
        type:"circle",//(必选) 圆形区域搜索
        dataInfo:{
            center:{//(必选) 圆心
                longitude:,//(必选) 经度
                latitude://(必选) 纬度
            },
            radius:,//(必选) 半径
            isDistanceSort://(可选) 是否按距离由小到大排序,默认true
        }
    }
    {
        type:"rectangle",//(必选) 矩形区域搜索
        dataInfo:{
            lowerLeft:{//(必选) 左下角
                longitude:,//(必选) 经度
                latitude://(必选) 纬度
            },
            upperRight:{//(必选) 右上角
                longitude:,//(必选) 经度
                latitude://(必选) 纬度
            }
        }
    }
    {
        type:"polygon",//(必选) 多边形区域搜索
        dataInfo:[//(必选) 顶点集合
            {
                longitude:,//(必选) 顶点经度
                latitude://(必选) 顶点纬度
            }
        ]
	}
}
```

**回调参数**:

| 参数名称  | 参数类型   | 是否必选 | 说明               |
| ----- | ------ | ---- | ---------------- |
| error | Number | 是    | 0表示搜索成功,非0表示搜索失败 |
| data  | Array  | 否    | error为0存在,搜索结果集合 |

```javascript
   var data = [//搜索结果集合
        {
            address:,//地址详情
            cityCode:,//城市编码
            cityName:,//城市名称
            website:,//网址
            email:,//邮箱
            id:,//poiId
            point: {//位置坐标
                latitude:,//经度
                longitude://纬度
            },
            postcode:,//邮编
            provinceCode:,//省/自治区/直辖市/特别行政区编码
            provinceName:,//省/自治区/直辖市/特别行政区名称
            tel:,//电话号码
            title:,//名称
            typeDes:,//类型描述
            distance://距离中心点的距离
        },
        ...
    ]

```


**示例:**

```javascript
    示例1:
    var json = {
        city:"武汉",
        searchKey:"加油站"
    };
    uexGaodeMap.poiSearch(JSON.stringify(json),function(error,data){
      if(!error){
           alert("callback:" + JSON.stringify(data));
        }else{
          alert("搜索失败");
          }
    });

    示例2:
    var json = {
        city:"武汉",
        poiTypeSet:"加油站",
        searchBound:{
            type:"circle",
            dataInfo:{
                center:{
                    longitude:114.402815,
                    latitude:30.475798
                },
                radius:3000,
                isDistanceSort:true
            }
        }
    };
    uexGaodeMap.poiSearch(JSON.stringify(json),function(error,data){
        if(!error){
           alert("callback:" + JSON.stringify(data));
        }else{
          alert("搜索失败");
          }
    
    });

    示例3:
    var json = {
        poiTypeSet:"加油站",
        searchBound:{
            type:"rectangle",
            dataInfo:{
                lowerLeft:{
                    longitude:114.402815,
                    latitude:30.475798
                },
                upperRight:{
                    longitude:114.513855,
                    latitude:30.586848
                }
            }
        }
    };
    uexGaodeMap.poiSearch(JSON.stringify(json),function(data){
      if(!error){
           alert("callback:" + JSON.stringify(data));
        }else{
          alert("搜索失败");
          }
    });

    示例4:
    var json = {
        poiTypeSet:"加油站",
        searchBound:{
            type:"polygon",
            dataInfo:[
                {
                    longitude:"114.402965",
                    latitude:"30.375845"
                },
                {
                    longitude:"115.402965",
                    latitude:"30.375845"
                },
                {
                    longitude:"114.402965",
                    latitude:"31.375845"
                },
                {
                    longitude:"114.402965",
                    latitude:"30.375845"
                }
            ]
        }
    };
    uexGaodeMap.poiSearch(JSON.stringify(json),function(error,data){
      if(!error){
           alert("callback:" + JSON.stringify(data));
        }else{
          alert("搜索失败");
          }
    });
```

###  geocode  地理编码,通过地址获得经纬度信息


`uexGaodeMap.geocode(json,callBackFunction)`

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明   |
| ---------------- | -------- | ---- | ---- |
| json             | json字符串  | 是    | 传入参数 |
| callBackFunction | Function | 是    | 回调函数 |


```javascript
var json = {
    city:,
    address:
}
```
**各字段含义如下**:

| 参数名称    | 参数类型   | 是否必选 | 说明            |
| ------- | ------ | ---- | ------------- |
| city    | String | 是    | 城市,不传时表示全国范围内 |
| address | String | 是    | 具体地址          |

**回调参数**:

| 参数名称  | 参数类型   | 是否必选 | 说明                    |
| ----- | ------ | ---- | --------------------- |
| error | Number | 是    | 0表示地理编码成功,非0表示地理编码失败  |
| data  | Object | 否    | error为0存在,通过地址获得经纬度信息 |

```javascript
var data = {
	longitude:,//当前位置经度
	latitude:,//当前位置纬度
	address:,//String  搜索的地址
	city://String 搜索所在的城市
}
```


**示例:**

```javascript
    var json = {
        city:"武汉",
        address:"光谷软件园C6栋"
    };
    uexGaodeMap.geocode(JSON.stringify(json),function(error,data){
                if(!error){
                     alert("callback:" + JSON.stringify(data));
                 }else{
                     alert("地理编码失败");
                  }
        
    });
```

###  reverseGeocode  反地理编码,将经纬度转换为地址信息


`uexGaodeMap.reverseGeocode(json,callBackFunction)`

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明   |
| ---------------- | -------- | ---- | ---- |
| json             | json字符串  | 是    | 传入参数 |
| callBackFunction | Function | 是    | 回调函数 |

```javascript
var json = {
    longitude:,
    latitude:
}
```
**各字段含义如下**:

| 参数名称      | 参数类型   | 是否必选 | 说明   |
| --------- | ------ | ---- | ---- |
| longitude | Number | 是    | 经度   |
| latitude  | Number | 是    | 纬度   |

**回调参数**:

| 参数名称  | 参数类型   | 是否必选 | 说明                     |
| ----- | ------ | ---- | ---------------------- |
| error | Number | 是    | 0表示反地理编码成功,非0表示反地理编码失败 |
| data  | Object | 否    | error为0存在,将经纬度转换为地址信息  |

```javascript
var data = {
	address:,//具体地址
	latitude:,//Number 搜索的纬度
	longitude://Number 搜索的经度
}
```


**示例:**

```javascript
    var json = {
        longitude:114.402815,
        latitude:30.475798
    };
    uexGaodeMap.reverseGeocode(JSON.stringify(json),function(error,data){
         if(!error){
                    alert("callback:" + JSON.stringify(data));
                }else{
                     alert("反地理编码失败");
                }
    });
```

###  getCurrentLocation  获取当前位置


`uexGaodeMap.getCurrentLocation(callBackFunction)`

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明   |
| ---------------- | -------- | ---- | ---- |
| callBackFunction | Function | 是    | 回调函数 |

**回调参数**:

| 参数名称  | 参数类型   | 是否必选 | 说明                 |
| ----- | ------ | ---- | ------------------ |
| error | Number | 是    | 0表示成功,非0表示失败       |
| data  | Object | 否    | error为0存在,获取当前位置信息 |

```javascript
var data = {
    longitude:,//当前位置经度
    latitude:,//当前位置纬度
    timestamp://时间戳
}
```

 

**示例:**

```javascript
    uexGaodeMap.getCurrentLocation(function(error,data){
        if(!error){
                    alert("callback:" + JSON.stringify(data));
                }else{
                     alert("获取当前位置失败");
                }

    });
```

###  startLocation  开始连续定位

`uexGaodeMap.startLocation(json)`

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明                |
| ---- | ------ | ---- | ----------------- |
| json | Object | 是    | 传入参数,仅Android支持参数 |

```javascript
var json = {
    minTime:,
    minDistance:
}
```
**各字段含义如下**:

| 参数名称        | 参数类型   | 是否必选 | 说明                     |
| ----------- | ------ | ---- | ---------------------- |
| minTime     | Number | 否    | 位置变化通知时间,单位:毫秒, 默认2000 |
| minDistance | Number | 否    | 位置变化通知距离,单位:米,默认10     |


**示例:**

```javascript
    var json = {
        minTime:3000,
        minDistance:10
    };
    uexGaodeMap.startLocation(json);
```

###  stopLocation  停止连续定位

`uexGaodeMap.stopLocation()`

**参数:**

```
无
```

   

**示例:**

```
    uexGaodeMap.stopLocation();
```

###  setMyLocationEnable  显示或隐藏我的位置

`uexGaodeMap.setMyLocationEnable(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |

```javascript
var json = {
    type:
}
```
**各字段含义如下**:

| 参数名称 | 参数类型   | 是否必选 | 说明        |
| ---- | ------ | ---- | --------- |
| type | Number | 是    | 0-隐藏,1-显示 |

**示例:**

```javascript
    var json = {
        type:1
    }
    uexGaodeMap.setMyLocationEnable(JSON.stringify(json));
```

###  setUserTrackingMode  设置连续定位模式

`uexGaodeMap.setUserTrackingMode(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |

```javascript
var json = {
    type:
}
```
**各字段含义如下**:

| 参数名称 | 参数类型   | 是否必选 | 说明                                       |
| ---- | ------ | ---- | ---------------------------------------- |
| type | Number | 是    | 模式,1-只在第一次定位移动到地图中心点;2-定位、移动到地图中心点并跟随;3-定位、移动到地图中心点,跟踪并根据方向旋转地图. |


**示例:**

```javascript
    var json = {
        type:1
    }
    uexGaodeMap.setUserTrackingMode(JSON.stringify(json));
```
###  setScaleVisible  设置地图是否显示比例尺

`uexGaodeMap.setScaleVisible(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |

```javascript
var json = {
    visible: 
}
```
**各字段含义如下**:

| 参数名称    | 参数类型    | 是否必选 | 说明                     |
| ------- | ------- | ---- | ---------------------- |
| visible | Boolean | 是    | 是否显示,true-显示;false-隐藏. |

**示例:**

```javascript
  var json = {
        visible:true
    }
    uexGaodeMap.setScaleVisible(JSON.stringify(json));
```
###  setMyLocationButtonVisible 设置是否显示回到我的位置按钮,仅支持Android

  设置是否显示回到我的位置按钮,注意回到我的位置按钮点击生效的前提条件是开启定位.

`uexGaodeMap.setMyLocationButtonVisible(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |

```javascript
var json = {
    visible:
}
```
**各字段含义如下**:

| 参数名称    | 参数类型    | 是否必选 | 说明                     |
| ------- | ------- | ---- | ---------------------- |
| visible | Boolean | 是    | 是否显示,true-显示;false-隐藏. |

**平台支持:**

Android 4.0+

**示例:**

```javascript
    var json = {
        visible:true
    }
    uexGaodeMap.setMyLocationButtonVisible(JSON.stringify(json));
```
###  setZoomVisible  设置是否显示放大缩小按钮,仅支持Android

`uexGaodeMap.setZoomVisible(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明   |
| ---- | ------- | ---- | ---- |
| json | json字符串 | 是    | 传入参数 |

````javascript
var json = {
    visible:
}
````
**各字段含义如下**:

| 参数名称    | 参数类型    | 是否必选 | 说明                     |
| ------- | ------- | ---- | ---------------------- |
| visible | Boolean | 是    | 是否显示,true-显示;false-隐藏. |

**平台支持:**

Android 4.0+

**示例:**

```javascript
   var json = {
        visible:true
    }
    uexGaodeMap.setZoomVisible(JSON.stringify(json));
```
###  clear  清除地图上所有的标注和覆盖物

`uexGaodeMap.clear()`

**参数:**

```
无
```

**示例:**

```
    uexGaodeMap.clear();
```

###  setCustomButton 设置自定义按钮

`uexGaodeMap.setCustomButton(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明           |
| ---- | ------- | ---- | ------------ |
| json | json字符串 | 是    | 传入参数,自定义按钮信息 |

```javascript
var json = {
   id:,
	x:,
	y:,
	width:, 
	height:, 
	bgImage:,  
	title:, 
	titleColor:, 
	titleSize: 
}
```
**各字段含义如下**:

| 参数名称       | 参数类型   | 是否必选 | 说明       |
| ---------- | ------ | ---- | -------- |
| id         | Number | 是    | 按钮的唯一标识符 |
| x          | Number | 是    | 按钮横坐标    |
| y          | Number | 是    | 按钮纵坐标    |
| width      | Number | 是    | 按钮宽度     |
| height     | Number | 是    | 按钮高度     |
| bgImage    | String | 是    | 按钮背景图路径  |
| title      | String | 否    | 按钮文字     |
| titleColor | String | 否    | 按钮文字颜色   |
| titleSize  | Number | 否    | 按钮文字大小   |

**说明:**

* 设置自定义按钮是全局的,设置之后在各个页面均可以直接调用[showCustomButtons](showCustomButtons 显示自定义按钮)
* 每次地图重新open时,不会显示任何按钮,需要用户手动调用[showCustomButtons](showCustomButtons 显示自定义按钮)
* x,y,width,height都是参考以地图左上角为原点的坐标系 单位为px 


**返回值:**

返回自定义按钮对象,如果设置失败返回null

**示例:**

```javascript
var json = {
   id:11,
	bgImage:"res://button1.png",
	title:"title",
	titleColor:"#F00",
	x:50,
	y:50,
	width:35,
	height:16
}
uexGaodeMap.setCustomButton(JSON.stringify(json));
```
###  showCustomButtons 显示自定义按钮

`var data = uexGaodeMap.showCustomButtons(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明                |
| ---- | ------- | ---- | ----------------- |
| json | json字符串 | 是    | 由需显示按钮的唯一标识符构成的数组 |

**返回值**

Object类型，显示结果数据，形式见下:

```javascript
var data = {
	successfulIds:,//list<string> 显示成功的按钮的唯一标识符数组
	failedIds://list<string> 显示失败的按钮的唯一标识符数组
}
```

**说明:**

* 点击被显示的按钮会触发监听[onCustomButtonClick](onCustomButtonClick 自定义按钮被点击的监听)
* 显示id不存在的按钮会失败
* 显示已经显示的按钮会失败

**示例:**

```javascript
var json =[11,12];
var data = uexGaodeMap.showCustomButtons(JSON.stringify(json));
alert("callback:" + JSON.stringify(data));
```
###  hideCustomButtons 隐藏自定义按钮

`var data = uexGaodeMap.hideCustomButtons(json)`

**参数:**

| 参数名称 | 参数类型    | 是否必选 | 说明                        |
| ---- | ------- | ---- | ------------------------- |
| json | json字符串 | 否    | 内容是由需隐藏自定义按钮对象的唯一标识符构成的数组 |

**返回值:**

Object类型，隐藏结果数据，形式见下:

```javascript
var data = {
	successfulIds:,//list<string> 隐藏成功的按钮的唯一标识符数组
	failedIds:,//list<string> 隐藏失败的按钮的唯一标识符数组
}
```
**说明:**

* json不传时,会尝试隐藏所有自定义按钮
* 隐藏不存在的按钮会失败
* 隐藏已经隐藏的按钮会失败


**示例:**

```javascript
var json =[11,12];
var data = uexGaodeMap.hideCustomButtons(JSON.stringify(json));
alert("callback:" + JSON.stringify(data));
```

###  deleteCustomButton 删除自定义按钮

`var result = uexGaodeMap.deleteCustomButton(id)`

**参数:**

| 参数名称 | 参数类型   | 是否必选 | 说明            |
| ---- | ------ | ---- | ------------- |
| id   | String | 是    | 需要删除的按钮的唯一标识符 |


**说明:**

* 删除自定义按钮是全局的
* 如果被删除的按钮已经被显示,会先隐藏按钮再删除

**返回值:**
Boolean类型，删除结果，true为删除成功,false为删除失败

**示例:**

```javascript
var result = uexGaodeMap.deleteCustomButton(id);
```




## 2.2、 监听方法<ignore>
###  onMapLoadedListener 地图加载完成的监听方法

`uexGaodeMap.onMapLoadedListener();`

**参数:**

```
无
```

**示例:**

```
    uexGaodeMap.onMapLoadedListener = function() {
        alert("onMapLoadedListener");
    }
```

###  onMarkerClickListener 点击标注的监听方法

`uexGaodeMap.onMarkerClickListener(json);`

**参数:**

```
var json = {
    id://被点击的标注对象
}
```

**示例:**

```
    uexGaodeMap.onMarkerClickListener = function(json) {
        alert("onMarkerClickListener: "+json);
    }
```

###  onMarkerBubbleClickListener 点击气泡的监听方法,仅支持Android

`uexGaodeMap.onMarkerBubbleClickListener(json);`

**参数:**

```
var json = {
    id://被点击的气泡所属标注对象
}
```

**平台支持:**
Android 4.0+

**示例:**

```
    uexGaodeMap.onMarkerBubbleClickListener = function(json) {
        alert("onMarkerBubbleClickListener: "+json);
    }
```

###  onReceiveLocation 位置变化的监听方法

`uexGaodeMap.onReceiveLocation(json);`

**参数:**

```
var json = {
    longitude:,//当前位置经度
    latitude:,//当前位置纬度
    timestamp://时间戳
}
```

   

**示例:**

```
    uexGaodeMap.onReceiveLocation = function(json) {
        alert("onReceiveLocation: "+json);
    }
```

###  onMapClickListener 点击地图的监听方法

`uexGaodeMap.onMapClickListener(json);`

**参数:**

```
var json = {
    longitude:,//被点击的位置经度
    latitude://被点击的位置纬度
}
```

   

**示例:**

```
    uexGaodeMap.onMapClickListener = function(json) {
        alert("onMapClickListener: "+json);
    }
```

###  onMapLongClickListener 长按地图的监听方法

`uexGaodeMap.onMapLongClickListener(json);`

**参数:**

```
var json = {
    longitude:,//长按的位置经度
    latitude://长按的位置纬度
}
```

  

**示例:**

```
    uexGaodeMap.onMapLongClickListener = function(json) {
        alert("onMapLongClickListener: "+json);
    }
```

###  onCustomButtonClick 自定义按钮被点击的监听方法

`uexGaodeMap.onCustomButtonClick(button);`

**参数:**

| 参数名称   | 参数类型   | 是否必选 | 说明          |
| ------ | ------ | ---- | ----------- |
| button | String | 是    | 被点击的自定义按钮对象 |

**说明:**

* 总是回调给调用showCustomButtons显示此按钮的页面(例如,用户在A页面调用显示按钮α,在B页面调用显示按钮β,那么α的回调给A,β的回调给B)
* 如果该页面已经被销毁,则回调不触发



**示例:**

```
uexGaodeMap.onCustomButtonClick = function(id) {
 	alert("onCustomButtonClick:"+id);
}
```

# 3 离线地图<ignore>
## 3.1 方法<ignore>
###  download 开始下载

`uexGaodeMap.download(json,callBackFunction)`

**说明:**

  开始下载,当前如果有正在下载的任务,添加到正在下载列表中.

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明                                  |
| ---------------- | -------- | ---- | ----------------------------------- |
| json             | json字符串  | 是    | 传入参数,city或province必须传一个,都传时只有city有效 |
| callBackFunction | Function | 是    | 回调函数                                |
```javascript
var json = [
    {
        city:,//(可选) 城市名称
        province://(可选) 省或直辖市名称
    }
]
```
各字段含义如下:

| 参数名称     | 参数类型   | 是否必选 | 说明      |
| -------- | ------ | ---- | ------- |
| city     | String | 否    | 城市名称    |
| province | String | 否    | 省或直辖市名称 |

**回调参数**:

| 参数名称  | 参数类型   | 是否必选 | 说明                   |
| ----- | ------ | ---- | -------------------- |
| error | Number | 是    | 0表示加入列表成功,非0表示加入列表失败 |
| data  | Object | 是    | 返回的数据,形式见下：          |


```javascript
var data = {
    name:,//(必选) 省或城市名称
    errorStr://(可选) 错误描述,error非0时,该值有效.
}
```
注:errorStr详情参见附录[cbDownload Status](#1.4.2 cbDownload Status)


**示例:**

```javascript
    var params = [
        {
            city:'武汉'
        },
        {
            province:'广东省'
        }
    ];
    var json = JSON.stringify(params);
    uexGaodeMap.download(json,function(error,data){
      if(!error){
         alert("callback:" + JSON.stringify(data));
      }else{
         alert("加入列表失败");
      }
        
    });
```

###  onDownload 下载监听方法


`uexGaodeMap.onDownload(json)`

**参数:**

```
var json = {
    name:,//(必选) 省或城市名称
    completeCode:,//(必选) 进度百分比.
    status://(可选) 下载状态,具体请参考附录onDownload Status.
}
```
注:status下载状态参见附录[Download Status](#1.4.1 Download Status)

​    

**示例:**

```
    uexGaodeMap.onDownload = function(json) {
        var data = JSON.parse(info);
        if(data.status == 0){
            uexWindow.toast(1,5,data.name + " 正在下载...",0);
        }
        if(data.status == 1){
            uexWindow.toast(1,5,data.name + " 正在解压...",0);
        }
        if(data.status == 4){
            uexWindow.closeToast();
            alert(data.name + " 离线地图下载成功!");
        }
        if(data.status == 3){
            uexWindow.toast(0,5,data.name + " 暂停下载...",2000);
        }
        if(data.status == -1){
            uexWindow.closeToast();
            alert(data.name + " 下载失败!");
        }
    }
```

###  pause 暂停下载

`uexGaodeMap.pause(json)`

**参数:**

```
var json = []//(必传) 省或城市名称数组
```


**示例:**

```
    var params = ["武汉","广东省"];
    var data = JSON.stringify(params);
    uexGaodeMap.pause(data);
```

###  restart 继续下载


`uexGaodeMap.restart(json)`

**参数:**

```
var json = []//(必传) 省或城市名称数组
```



**示例:**

```
    var params = ["武汉","广东省"];
    var data = JSON.stringify(params);
    uexGaodeMap.restart(data);
```

###  getAvailableCityList 获取可下载离线地图的城市列表


`uexGaodeMap.getAvailableCityList(callBackFunction)`

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明   |
| ---------------- | -------- | ---- | ---- |
| callBackFunction | Function | 是    | 回调函数 |

**回调参数**:

| 参数名称  | 参数类型   | 是否必选 | 说明           |
| ----- | ------ | ---- | ------------ |
| error | Number | 是    | 0表示成功,非0表示失败 |
| data  | Array  | 是    | 返回的数据        |
```
var data = [
    {
        city:,//(必选) 城市名称
        size:,//(必选) 包大小,单位字节
        completeCode:,//(必选) 进度百分比
    }
]
```

 


**示例:**

```
    uexGaodeMap.getAvailableCityList(function(error,data){
      if(!error){
         alert("callback:" + JSON.stringify(data));
      }else{
         alert("获取可下载离线地图的城市列表失败");
        }
    });
```



###  getAvailableProvinceList 获取可下载离线地图的省和城市列表

`uexGaodeMap.getAvailableProvinceList(callBackFunction)`

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明   |
| ---------------- | -------- | ---- | ---- |
| callBackFunction | Function | 是    | 回调函数 |

**回调参数**:

| 参数名称  | 参数类型   | 是否必选 | 说明           |
| ----- | ------ | ---- | ------------ |
| error | Number | 是    | 0表示成功,非0表示失败 |
| data  | Array  | 是    | 返回的数据        |

```
var data = [
    {
        cityList:[//(必选) 省包含的城市列表
            {
                city:,//(必选) 城市名称
                size:,//(必选) 包大小,单位字节
                completeCode:,//(必选) 进度百分比
                status://(可选) 下载状态
            }
        ],
        province:,//(必选) 省或直辖市名称
        size:,//(必选) 包大小,单位字节
        completeCode:,//(必选) 进度百分比

    }
]
```

  

**示例:**

```
    uexGaodeMap.getAvailableProvinceList(function(error,data){
        if(!error){
         alert("callback:" + JSON.stringify(data));
      }else{
         alert(" 获取可下载离线地图的省和城市列表失败");
        }
    });
```



###  getDownloadList 获取已下载列表


`uexGaodeMap.getDownloadList(callBackFunction)`

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明   |
| ---------------- | -------- | ---- | ---- |
| callBackFunction | Function | 是    | 回调函数 |

**回调参数**:

| 参数名称  | 参数类型   | 是否必选 | 说明           |
| ----- | ------ | ---- | ------------ |
| error | Number | 是    | 0表示成功,非0表示失败 |
| data  | Array  | 是    | 返回的数据        |

```
var data = [
    {
        name:,//(必选) 省或城市名称
        type:,//(必选) 类型,1-城市,2-省
        size:,//(必选) 包大小,单位字节
        completeCode:,//(必选) 进度百分比

    }
]
```

   

**示例:**

```
    uexGaodeMap.getDownloadList(function(error,data){
       if(!error){
         alert("callback:" + JSON.stringify(data));
      }else{
         alert(" 获取可下载离线地图的省和城市列表失败");
        }
    });
```



###  getDownloadingList 获取正在下载列表


`uexGaodeMap.getDownloadingList(callBackFunction)`

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明   |
| ---------------- | -------- | ---- | ---- |
| callBackFunction | Function | 是    | 回调函数 |

**回调参数**:

| 参数名称  | 参数类型   | 是否必选 | 说明           |
| ----- | ------ | ---- | ------------ |
| error | Number | 是    | 0表示成功,非0表示失败 |
| data  | Array  | 是    | 返回的数据        |

```
var data = [
    {
        name:,//(必选) 省或城市名称
        type:,//(必选) 类型,1-城市,2-省
        size:,//(必选) 包大小,单位字节
        completeCode:,//(必选) 进度百分比
    }
]
```

 

**示例:**

```
    uexGaodeMap.getDownloadingList(function(error,data){
       if(!error){
         alert("callback:" + JSON.stringify(data));
      }else{
         alert(" 获取可下载离线地图的省和城市列表失败");
        }
    });
```



###  isUpdate 检查已下载的离线地图数据是否需要更新


`uexGaodeMap.isUpdate(json,callBackFunction)`

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明                                  |
| ---------------- | -------- | ---- | ----------------------------------- |
| json             | json字符串  | 是    | 传入参数,city或province必须传一个,都传时只有city有效 |
| callBackFunction | Function | 是    | 回调函数                                |

```javascript
var json = {
    city:,//(可选) 城市名称
    province://(可选) 省或直辖市名称
}
```
**回调参数**:

| 参数名称  | 参数类型   | 是否必选 | 说明           |
| ----- | ------ | ---- | ------------ |
| error | Number | 是    | 0表示成功,非0表示失败 |
| data  | Object | 是    | 返回的数据        |

```javascript
var data = {
    name:,//(必选) 省或城市名称
    result://(可选) 是否有更新,0-有更新,1-没有更新
}
```


**示例:**

```javascript
    var params = 
        {
            city:'武汉'
        };
    
    var json = JSON.stringify(params);
    uexGaodeMap.isUpdate(json,function(error,data){
        if(!error){
         alert("callback:" + JSON.stringify(data));
      }else{
         alert("检查失败");
        }
    });
```



###  delete  删除已下载或者正在下载数据

`uexGaodeMap.delete(json,callBackFunction)`

**参数:**

| 参数名称             | 参数类型     | 是否必选 | 说明                                  |
| ---------------- | -------- | ---- | ----------------------------------- |
| json             | json字符串  | 是    | 传入参数,city或province必须传一个,都传时只有city有效 |
| callBackFunction | Function | 是    | 回调函数                                |


```
var json = []//(可选,仅Android) 省或城市名称数组

```
**回调参数**:

| 参数名称  | 参数类型   | 是否必选 | 说明                |
| ----- | ------ | ---- | ----------------- |
| error | Number | 是    | 状态码,0-删除成功,非0-失败. |
| data  | Object | 是    | 返回数据,仅支持Android   |

```
var data = {
    name:,//(必选) 省或城市名称
    errorStr://(可选) 错误描述,errorCode非0时,该值有效.
}
```
注:

* json不传时会清除所有数据;
* 受iOS SDK所限制,iOS仅支持删除所有数据
* iOS系统下若有传入参数json,则插件不会作任何处理


**示例:**

```javascript
Android:
    var params = ["武汉"];
    var json = JSON.stringify(params);
    uexGaodeMap.delete(json,function(error,data){
    	   if(!error){
         alert("callback:" + JSON.stringify(data));
      }else{
         alert("删除失败");
        }
    });
    
iOS:
    uexGaodeMap.delete();
```


# 4、附录<ignore>
## 4.1、通过config.xml配置插件的方法<ignore>

* 将配置代码添加到`config.xml`中即可完成插件配置,无需进行自定义插件相关步骤
* 详见[打包服务器公测](http://newdocx.appcan.cn/newdocx/docx?type=1669_1291)
* 该公测已完成,现在也支持正式版大众打包服务器

#### iOS<ignore>
示例配置代码如下:

```
    <config desc="uexGaode" type="KEY" > 
        <param platform="iOS" name="$uexGaodeMap_APIKey$"  value="XXX"/>
    </config>
```

#### Android<ignore>
示例配置代码如下:

```
    <config desc="uexGaode" type="KEY" > 
        <param platform="Android" name="$uexGaodeMap_APIKey$" value="XXX"/>
    </config>
```

或者Android和iOS合并写为:

```
    <config desc="uexGaode" type="KEY" > 
        <param platform="iOS" name="$uexGaodeMap_APIKey$"  value="XXX"/>
        <param platform="Android" name="$uexGaodeMap_APIKey$" value="XXX"/>
    </config>
```
**用户需要将上面字段中的XXX替换为自己申请的对应平台的key,然后添加至config.xml中:**即可完成相应key的配置 

# 5、更新历史<ignore>

### iOS<ignore>

API版本: `uexGaodeMap-4.0.0`

最近更新时间:`2016-6-14`

| 历史发布版本 | 更新内容                                     |
| ------ | ---------------------------------------- |

### Android<ignore>

API版本: `uexGaodeMap-4.0.0`

最近更新时间:`2016-6-14`

| 历史发布版本 | 更新内容                               |
| ------ | ---------------------------------- |
