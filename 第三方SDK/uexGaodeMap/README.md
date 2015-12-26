
[TOC]

# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
 高德地图插件
## 1.1、说明
 封装高德地图相关功能,包括放大缩小、移动和旋转等基本操作；标注；圆形、矩形和多边形覆盖物；定位、搜索、地理编码、离线地图等功能。
> **`注意:`**
　　申请的插件appkey需要通过config.xml文件配置自定义参数的方法,可直接在官网公共插件里直接勾选使用,详见[附录](#4、附录 "附录")。IDE插件因为涉及到高德地图方面的ID与Key暂时无法正常使用。具体操作见『[手册](http://newdocx.appcan.cn/newdocx/docx?type=1050_975 "手册")』

## 1.2、开源源码
自定义插件下载:[点击此处](http://plugin.appcan.cn/details.html?id=428_index) (插件测试用例与插件包已经提供)
## 1.3、 UI展示
 
## 1.4、术语表
### 1.4.1 Download Status

| 状态码 | 描述 | 英文描述 |
| ----- | ----- | ----- |
|-1 | 下载失败 | ERROR |
| 0 | 正在下载 | LOADING |
| 1 | 正在解压 | UNZIP |
| 2 | 等待下载 | WAITING |
| 3 | 暂停下载 | PAUSE |
| 4 | 下载成功 | SUCCESS |
| 5 | 停止下载 | STOP |
| 6 | 检查更新状态 | CHECKUPDATES |

### 1.4.2 cbDownload Status

| errorCode | 描述 | errorStr |
| ----- | ----- | ----- |
|0 | 加入列表成功 | "" |
| -1 | 下载失败 | "城市或省名称错误!" |
| -2 | 下载失败 | "已经存在列表中!" |
| -3 | 下载失败 | "已经下载完成,请到已下载列表查看!" | 

# 2、API概述 
## 2.1、方法:
> ### open  打开地图

`uexGaodeMap.open(json)`

**说明:**

打开地图。

注意Android端isScrollWithWeb参数为true时,需要结合新引擎才能生效,引擎版本需在20150915及以上版本。否则地图只显示白板。

**参数:**

```
var json = {
    left:,//(可选) 左间距,默认0
    top:,//(可选) 上间距,默认0
    width:,//(可选) 地图宽度
    height:,//(可选) 地图高度
    isScrollWithWeb:,//(可选) 地图是否跟随网页滚动,默认为false
    longitude:,//(可选) 中心点经度
    latitude://(可选) 中心点纬度
    APIKey:,//(可选,仅iOS,仅IDE本地打包)设置高德的APIKey
}
```

**平台支持:**

Android 2.2+        
iOS 6.0+        

**版本支持:**

Android 3.0.0+        
iOS 3.0.0+    

**示例:**

```
    var params = {
        left:0,
        top:0,
        width:800,
        height:800,
        isScrollWithWeb:true,
        longitude:114.402815,
        latitude:30.475798
    };
    var data = JSON.stringify(params);
    uexGaodeMap.open(data);
```

> ###  close  关闭地图

`uexGaodeMap.close()`

**参数:**

```
无
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    uexGaodeMap.close();
```
> ### setMapType 设置地图类型

`uexGaodeMap.setMapType(json)`

**参数:**

```
var json = {
    type://(必选)地图类型,1-标准地图,2-卫星地图,3-夜景地图
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
var params = {
    type:1
};
var data = JSON.stringify(params);
uexGaodeMap.setMapType(data);
```

> ### setTrafficEnabled  开启或关闭实时路况

`uexGaodeMap.setTrafficEnabled(json)`

**参数:**

```
var json = {
    type://(必选) 0-关闭,1-开启
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var params = {
        type:1
    };
    var data = JSON.stringify(params);
    uexGaodeMap.setTrafficEnabled(data);
```

> ### setCenter  设置地图中心点

`uexGaodeMap.setCenter(json)`

**参数:**

```
var json = {
    longitude:,//(必选)中心点经度
    latitude://(必选)中心点纬度
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var params = {
        longitude:114.402815,
        latitude:30.475798
    };
    var data = JSON.stringify(params);
    uexGaodeMap.setCenter(data);
```

> ### setZoomLevel  设置地图缩放级别

`uexGaodeMap.setZoomLevel(json)`

**参数:**

```
var json = {
    level://(必选)级别,范围(3,20)
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var params = {
        level:15
        };
    var data = JSON.stringify(params);
    uexGaodeMap.setZoomLevel(data);
```

> ### zoomIn  放大一个地图级别

`uexGaodeMap.zoomIn()`

**参数:**

无

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    uexGaodeMap.zoomIn()；
```

> ###  zoomOut  缩小一个地图级别

`uexGaodeMap.zoomOut()`

**参数:**

无

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
uexGaodeMap.zoomOut();
```

> ### rotate  旋转地图

`uexGaodeMap.rotate(json)`

**参数:**

````
var json = {
    angle://(必选)旋转角度,正北方向到地图方向逆时针旋转的角度,范围(0,360)。
}
````

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var params = {
        angle:90
    };
    var data = JSON.stringify(params);
    uexGaodeMap.rotate(data);
```

> ### overlook  倾斜地图

`uexGaodeMap.overlook(json)`

**参数:**

```
var json = {
    angle://(必选)地图倾斜度,范围(0,45)。
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var params = {
        angle:23
    };
    var data = JSON.stringify(params);
    uexGaodeMap.overlook(data);
```

> ### setZoomEnable  开启或关闭手势缩放

`uexGaodeMap.setZoomEnable(json)`

**参数:**

```
var json = {
    type://(必选) 0-关闭,1-开启
}
```

**平台支持:**

Android 2.2+        
iOS 6.0+        

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var params = {
        type:1
    };
    var data = JSON.stringify(params);
    uexGaodeMap.setZoomEnable(data);
```

> ###setRotateEnable 开启或关闭手势旋转及手势倾斜

`uexGaodeMap.setRotateEnable(json)`

**参数:**

```
var json = {
    type://(必选) 0-关闭,1-开启
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var params = {
        type:1
    };
    var data = JSON.stringify(params);
    uexGaodeMap.setRotateEnable(data);
```

> ### setCompassEnable  开启或关闭指南针

`uexGaodeMap.setCompassEnable(json)`

**参数:**

```
var json = {
    type://(必选) 0-关闭,1-开启
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+        
iOS 3.0.0+    

**示例:**

```
    var params = {
        type:1
    };
    var data = JSON.stringify(params);
    uexGaodeMap.setCompassEnable(data);
```

> ### setScrollEnable  开启或关闭手势移动

`uexGaodeMap.setScrollEnable(json)`

**参数:**

```
var json = {
    type://(必选) 0-关闭,1-开启
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var params = {
        type:1
    };
    var data = JSON.stringify(params);
    uexGaodeMap.setScrollEnable(data);
```

> ###  addMarkersOverlay  添加标注

`uexGaodeMap.addMarkersOverlay(json)`

**参数:**

```
var json = [
    {
        id:,//(必选) 唯一标识符
        longitude:,//(必选) 标注经度
        latitude:,//(必选) 标注纬度
        icon:,//(可选) 标注图标
        bubble:{//(可选) 标注气泡
                title:,//(必选) 气泡标题
                subTitle://(可选) 气泡子标题
        }
    }
]
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var param = [
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
    var data = JSON.stringify(param);
    uexGaodeMap.addMarkersOverlay(data);
```

> ### setMarkerOverlay  修改标注

`uexGaodeMap.setMarkerOverlay(json)`

**参数:**

```
var json = {
    id:,//(必选) 唯一标识符
    longitude:,//(可选) 标注经度
    latitude:,//(可选) 标注纬度
    icon:,//(可选) 标注图标
    bubble:{//(可选) 标注气泡
        title:,//(必选) 气泡标题
        subTitle://(可选) 气泡子标题
    }
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var makerInfo = {
        id:10002,
        bubble:{
            title:"change-title",
            subTitle:"change-subTitle"
        }
    };
    var data = JSON.stringify(makerInfo);
    uexGaodeMap.setMarkerOverlay(data);
```

> ### addPolylineOverlay  添加折线覆盖物

`uexGaodeMap.addPolylineOverlay(json)`

**参数:**

```
var json = {
    id:,//(必选) 唯一标识符
    fillColor:,//(可选) 折线颜色
    lineWidth:,//(可选) 折线宽
    property:[//(必选) 数据
        {
            longitude:,//(必选) 连接点经度
            latitude://(必选) 连接点纬度
        }
    ]
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var jsonstr = {
        id:"151",
        fillColor:"#f00",
        lineWidth:"10.0",
        property:[
            {
                longitude:"114.402965",
                latitude:"30.475845"
            },
            {
                longitude:"114.502965",
                latitude:"30.475845"
            },
            {
                longitude:"114.402965",
                latitude:"30.375845"
            }
        ]
    };
    var data = JSON.stringify(jsonstr);
    uexGaodeMap.addPolylineOverlay(data);
```

> ### removeOverlays  移除覆盖物

`uexGaodeMap.removeOverlays(json)`

**参数:**

```
var json = []////(可选)覆盖物唯一标识符数组,不传时移除所有覆盖物。
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
 	var idarr = ["151"];
    var data = JSON.stringify(idarr);
    uexGaodeMap.removeOverlays(data);
```

> ### addArcOverlay  添加弧形覆盖物

`uexGaodeMap.addArcOverlay(json)`

**参数:**

```
var json = {
    id:,//(必选) 唯一标识符
    strokeColor:,//(可选) 颜色
    lineWidth:,//(可选) 线宽
    start:{//(必选) 起点数据
        longitude:,//(必选) 经度
        latitude://(必选) 纬度
    },
    center:{//(必选) 中间点数据
        longitude:,//(必选) 经度
        latitude://(必选) 纬度
    },
    end:{//(必选) 终点数据
        longitude:,//(必选) 经度
        latitude://(必选) 纬度
    }
}
```

**平台支持:**

Android 2.2+    

**版本支持:**

Android 3.0.0+    

**示例:**

```
    var jsonstr = {
        id:"152",
        strokeColor:"#f00",
        lineWidth:"12.0",
        start:{
            longitude:"114.402965",
            latitude:"30.475845"
        },
        center:{
            longitude:"114.502965",
            latitude:"30.475845"
        },
        end:{
            longitude:"114.402965",
            latitude:"30.375845"
        }
    };
    var data = JSON.stringify(jsonstr);
    uexGaodeMap.addArcOverlay(data);
```

> ### addCircleOverlay  添加圆形覆盖物

`uexGaodeMap.addCircleOverlay(json)`

**参数:**

```
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

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var jsonstr = {
        id:"153",
        longitude:"114.402965",
        latitude:"30.375845",
        radius:"1000",
        fillColor:"#4169E1",
        strokeColor:"#990033",
        lineWidth:"4"
    };
    var data = JSON.stringify(jsonstr);
    uexGaodeMap.addCircleOverlay(data);
```

> ### addPolygonOverlay  添加多边形覆盖物

`uexGaodeMap.addPolygonOverlay(json)`

**参数:**

```
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

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var jsonstr = {
        id:"154",
        fillColor:"#990033",
        strokeColor:"#990033",
        lineWidth:"2.0",
        property:[
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
    };
    var data = JSON.stringify(jsonstr);
    uexGaodeMap.addPolygonOverlay(data);
```

> ### addGroundOverlay  添加图片覆盖物

`uexGaodeMap.addGroundOverlay(json)`

**参数:**

```
var json = {
    id:,//(必选) 唯一标识符
    imageUrl:,//(必选) 图片地址
    transparency:,//(可选) 图片透明度(仅Android支持该参数)
    property:[//(必选) 数据,数组长度为2,第一个元素表示西南角的经纬度,第二个表示东北角的经纬度；
        {
            longitude:,//(必选) 顶点经度
            latitude://(必选) 顶点纬度
        }
    ]
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    示例1:
    var jsonstr = {
        id:"155",
        imageUrl:"http://img0.bdstatic.com/img/image/9baf75d938553886ce515def29441ed31409109131.jpg",
        transparency:"0.5",
        property:[
            {
                longitude:"114.402165",
                latitude:"30.374845"
            },
            {
                longitude:"114.502165",
                latitude:"30.474845"
            }
        ]
    };
    var data = JSON.stringify(jsonstr);
    uexGaodeMap.addGroundOverlay(data);
```

> ### removeMarkersOverlays  移除标注

`uexGaodeMap.removeMarkersOverlays(json)`

**参数:**

```
var json = []//(可选)标注唯一标识符数组,不传时移除所有标注。
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
   var params = ['10001'];
    var data = JSON.stringify(params);
    uexGaodeMap.removeMarkersOverlays(data);
```

> ### poiSearch  兴趣点搜索

回调 [cbPoiSearch](#cbPoiSearch 兴趣点搜索的回调方法 "兴趣点搜索的回调方法")
`uexGaodeMap.poiSearch(json)`

**参数:**

```
var json = {
    searchKey:,//(可选) 搜索关键字
    poiTypeSet:,//(可选) Poi兴趣点,searchKey和poiTypeSet必须至少包含其中的一个
    city:,//(可选) 城市,不传时表示全国范围内(iOS无效,默认全国范围内搜索)
    pageNum:,//(可选) 搜索结果页索引,默认为0
    searchBound://(可选) 区域搜索,city和searchBound必须至少包含其中的一个。以下的三个类别有且只有一种。
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

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    示例1:
    var jsonstr = {
        city:"武汉",
        searchKey:"加油站"
    };
    var data = JSON.stringify(jsonstr);
    uexGaodeMap.poiSearch(data);

    示例2:
    var jsonstr = {
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
    var data = JSON.stringify(jsonstr);
    uexGaodeMap.poiSearch(data);

    示例3:
    var jsonstr = {
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
    var data = JSON.stringify(jsonstr);
    uexGaodeMap.poiSearch(data);

    示例4:
    var jsonstr = {
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
    var data = JSON.stringify(jsonstr);
    uexGaodeMap.poiSearch(data);
```

> ### geocode  地理编码,通过地址获得经纬度信息

回调 [cbGeocode](#cbGeocode 地理编码的回调方法 "地理编码的回调方法")
`uexGaodeMap.geocode(json)`

**参数:**

```
var json = {
    city:,//(必选) 城市,不传时表示全国范围内
    address://(必选) 具体地址
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var jsonstr = {
        city:"武汉",
        address:"光谷软件园C6栋"
    };
    var data = JSON.stringify(jsonstr);
    uexGaodeMap.geocode(data);
```

> ### reverseGeocode  反地理编码,将经纬度转换为地址信息

回调 [cbReverseGeocode](#cbReverseGeocode 反地理编码的回调方法 "反地理编码的回调方法")
`uexGaodeMap.reverseGeocode(json)`

**参数:**

```
var json = {
    longitude:,//经度
    latitude://纬度
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var jsonstr = {
        longitude:114.402815,
        latitude:30.475798
    };
    var data = JSON.stringify(jsonstr);
    uexGaodeMap.reverseGeocode(data);
```

> ### getCurrentLocation  获取当前位置

回调 [cbGetCurrentLocation](#cbGetCurrentLocation 获取当前位置的回调方法 "获取当前位置的回调方法")
`uexGaodeMap.getCurrentLocation()`

**参数:**

```
无
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    uexGaodeMap.getCurrentLocation();
```

> ### startLocation  开始连续定位

`uexGaodeMap.startLocation(json)`

**参数:**

```
var json = {(仅Android支持参数)
    minTime:,//(可选) 位置变化通知时间,单位:毫秒, 默认2000
    minDistance://(可选) 位置变化通知距离,单位:米,默认10
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var jsonstr = {
        minTime:3000,
        minDistance:10
    };
    var data = JSON.stringify(jsonstr);
    uexGaodeMap.startLocation(data);
```

> ### stopLocation  停止连续定位

`uexGaodeMap.stopLocation()`

**参数:**

```
无
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    uexGaodeMap.stopLocation();
```

> ### setMyLocationEnable  显示或隐藏我的位置

`uexGaodeMap.setMyLocationEnable(json)`

**参数:**

```
var json = {
    type://(必选) 0-隐藏,1-显示
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var params = {
        type:1
    }
    var data = JSON.stringify(params);
    uexGaodeMap.setMyLocationEnable(data);
```

> ### setUserTrackingMode  设置连续定位模式

`uexGaodeMap.setUserTrackingMode(json)`

**参数:**

```
var json = {
    type://(必选) 模式,1-只在第一次定位移动到地图中心点；
                       2-定位、移动到地图中心点并跟随；
                       3-定位、移动到地图中心点,跟踪并根据方向旋转地图。
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    var params = {
        type:1
    }
    var data = JSON.stringify(params);
    uexGaodeMap.setUserTrackingMode(data);
```
> ### setScaleVisible  设置地图是否显示比例尺

`uexGaodeMap.setScaleVisible(json)`

**参数:**

```
var json = {
    visible://(必选) 是否显示,true-显示；false-隐藏。
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.2+    
iOS 3.0.1+     

**示例:**

```
  var params = {
        visible:true
    }
    var data = JSON.stringify(params);
    uexGaodeMap.setScaleVisible(data);
```
> ### setMyLocationButtonVisible设 置是否显示回到我的位置按钮

  设置是否显示回到我的位置按钮,注意回到我的位置按钮点击生效的前提条件是开启定位。

`uexGaodeMap.setMyLocationButtonVisible(json)`

**参数:**

```
var json = {
    visible://(必选) 是否显示,true-显示；false-隐藏。
}
```

**平台支持:**

Android 2.2+    
   

**版本支持:**

Android 3.0.2+    
 

**示例:**

```
    var params = {
        visible:true
    }
    var data = JSON.stringify(params);
    uexGaodeMap.setMyLocationButtonVisible(data);
```
> ### setZoomVisible  设置是否显示放大缩小按钮

`uexGaodeMap.setZoomVisible(json)`

**参数:**

````
var json = {
    visible://(必选) 是否显示,true-显示；false-隐藏。
}
````

**平台支持:**

Android 2.2+    

**版本支持:**

Android 3.0.2+    

**示例:**

```
   var params = {
        visible:true
    }
    var data = JSON.stringify(params);
    uexGaodeMap.setZoomVisible(data);
```
> ### clear  清除地图上所有的标注和覆盖物

`uexGaodeMap.clear()`

**参数:**

```
无
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.2+    
iOS 3.0.1+

**示例:**

```
    uexGaodeMap.clear();
```

> ### setCustomButton 设置自定义按钮

`uexGaodeMap.setCustomButton(json)`

**参数:**

```
var json = {
	x:,//Number,必选 按钮横坐标
	y:,//Number,必选 按钮纵坐标
	width:,//Number,必选 按钮宽度
	height:,//Number,必选 按钮高度
	id:,//String,必选 按钮的唯一标识符
	bgImage:,//String,必选 按钮背景图路径 
	title:,//String 可选 按钮文字 
	titleColor:,// String 可选 按钮文字颜色
	titleSize:,//Number 可选 按钮文字大小
}
```

**说明:**

* 设置自定义按钮是全局的,设置之后在各个页面均可以直接调用[showCustomButtons](showCustomButtons 显示自定义按钮)
* 每次地图重新open时,不会显示任何按钮,需要用户手动调用[showCustomButtons](showCustomButtons 显示自定义按钮)
* x,y,width,height都是参考以地图左上角为原点的坐标系 单位为px 
* 成功调用该API会触发 [cbSetCustomButton](cbSetCustomButton 设置自定义按钮的回调方法)回调

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.4+    
iOS 3.0.4+

**示例:**

```
var param={
	id:"11",
	bgImage:"res://button1.png",
	title:"title",
	titleColor:"#F00",
	x:50,
	y:50,
	width:35,
	height:16
}
var jsonStr=JSON.stringify(param)
uexGaodeMap.setCustomButton(jsonStr);
```

> ### deleteCustomButton 删除自定义按钮

`uexGaodeMap.deleteCustomButton(id)`

**参数:**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| id | String | 是 | 需要删除的按钮的唯一标识符 |

**说明:**

* 删除自定义按钮是全局的
* 如果被删除的按钮已经被显示,会先隐藏按钮再删除,但此次隐藏操作不触发[cbHideCustomButtons](cbHideCustomButtons 隐藏自定义按钮的回调方法)回调
* 成功调用该API会触发[cbDeleteCustomButton](cbDeleteCustomButton 删除自定义按钮的回调方法)

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.4+    
iOS 3.0.4+

**示例:**

```
uexGaodeMap.deleteCustomButton("11");
```

> ### showCustomButtons 显示自定义按钮

`uexGaodeMap.showCustomButtons(ids)`

**参数:**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| ids | String | 是 | json字符串,内容是由需显示按钮的唯一标识符构成的数组 |

**说明:**

* 点击被显示的按钮会触发监听[onCustomButtonClick](onCustomButtonClick 自定义按钮被点击的监听)

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.4+    
iOS 3.0.4+

**示例:**

```
var ids=["11","12"];
var jsonStr=JSON.stringify(ids);
uexGaodeMap.showCustomButtons(jsonStr);
```

> ### hideCustomButtons 隐藏自定义按钮

`uexGaodeMap.hideCustomButtons(ids)`

**参数:**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| ids | String | 否 | json字符串,内容是由需显示按钮的唯一标识符构成的数组 |

**说明:**

* ids不传时,会尝试隐藏所有自定义按钮

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.4+    
iOS 3.0.4+

**示例:**

```
var ids=["11","12"];
var jsonStr=JSON.stringify(ids);
uexGaodeMap.hideCustomButtons(jsonStr);
```

## 2.2 回调方法:

> ### cbGetCurrentLocation 获取当前位置的回调方法

`uexGaodeMap.cbGetCurrentLocation(json);`

**参数:**

```
var json = {
    longitude:,//当前位置经度
    latitude:,//当前位置纬度
    timestamp://时间戳
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    uexGaodeMap.cbGetCurrentLocation = function(json) {
        alert("cbGetCurrentLocation: "+json);
    }
```

> ### cbGeocode 地理编码的回调方法

`uexGaodeMap.cbGeocode(json);`

**参数:**

```
var json = {
	longitude:,//当前位置经度
	latitude:,//当前位置纬度
	address:,//String  搜索的地址
	city://String 搜索所在的城市
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    uexGaodeMap.cbGeocode = function(json) {
        alert("cbGeocode: "+json);
    }
```

> ### cbReverseGeocode 反地理编码的回调方法

`uexGaodeMap.cbReverseGeocode(json);`

**参数:**

```
var json = {
	address:,//具体地址
	latitude:,//Number 搜索的纬度
	longitude://Number 搜索的经度
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    uexGaodeMap.cbReverseGeocode = function(json) {
        alert("cbReverseGeocode: "+json);
    }
```

> ### cbPoiSearch 兴趣点搜索的回调方法

`uexGaodeMap.cbPoiSearch(json);`

**参数:**

```
var json = {
    errorCode: 0, //错误码,0-成功,非0-失败
    data: [//搜索结果集合
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
        }
    ]
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    uexGaodeMap.cbPoiSearch = function(json) {
        alert("cbPoiSearch: "+json);
    }
```

> ### cbSetCustomButton 设置自定义按钮的回调方法

`uexGaodeMap.cbSetCustomButton(json);`

**参数:**

```
var json = {
	id:,//尝试设置的自定义按钮的唯一标识符
	isSuccess:,// 设置是否成功 true/false
}
```

**说明:**

* id已存在时,会返回false

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.4+    
iOS 3.0.4+    

**示例:**

```
uexGaodeMap.cbSetCustomButton = function(json) {
 	alert("cbSetCustomButton: "+json);
}
```

> ### cbDeleteCustomButton 删除自定义按钮的回调方法

`uexGaodeMap.cbDeleteCustomButton(json);`

**参数:**

```
var json = {
	id:,//尝试删除的自定义按钮的唯一标识符
	isSuccess:// 设置是否成功 true/false
}
```

**说明:**

* id不存在时,会返回false

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.4+    
iOS 3.0.4+    

**示例:**

```
uexGaodeMap.cbDeleteCustomButton = function(json) {
 	alert("cbDeleteCustomButton: "+json);
}
```

> ### cbShowCustomButtons 显示自定义按钮的回调方法

`uexGaodeMap.cbShowCustomButtons(json);`

**参数:**

```
var json = {
	successfulIds:,//list<string> 显示成功的按钮的唯一标识符数组
	failedIds://list<string> 显示失败的按钮的唯一标识符数组
}
```

**说明:**

* 显示id不存在的按钮会失败
* 显示已经显示的按钮会失败

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.4+    
iOS 3.0.4+    

**示例:**

```
uexGaodeMap.cbShowCustomButtons = function(json) {
 	alert("cbShowCustomButtons: "+json);
}
```

> ### cbHideCustomButtons 隐藏自定义按钮的回调方法

`uexGaodeMap.cbHideCustomButtons(json);`

**参数:**

```
var json = {
	successfulIds:,//list<string> 隐藏成功的按钮的唯一标识符数组
	failedIds:,//list<string> 隐藏失败的按钮的唯一标识符数组
}
```

**说明:**

* 隐藏id不存在的按钮会失败
* 隐藏已经隐藏的按钮会失败

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.4+    
iOS 3.0.4+    

**示例:**

```
uexGaodeMap.cbHideCustomButtons = function(json) {
 	alert("cbHideCustomButtons: "+json);
}
```

## 2.3、 监听方法:
> ### onMapLoadedListener 地图加载完成的监听方法

`uexGaodeMap.onMapLoadedListener();`

**参数:**

```
无
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    uexGaodeMap.onMapLoadedListener = function() {
        alert("onMapLoadedListener");
    }
```

> ### onMarkerClickListener 点击标注的监听方法

`uexGaodeMap.onMarkerClickListener(json);`

**参数:**

```
var json = {
    id://被点击的标注的id
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    uexGaodeMap.onMarkerClickListener = function(json) {
        alert("onMarkerClickListener: "+json);
    }
```

> ### onMarkerBubbleClickListener 点击气泡的监听方法

`uexGaodeMap.onMarkerBubbleClickListener(json);`

**参数:**

```
var json = {
    id://被点击的气泡所属标注的id
}
```

**平台支持:**

Android 2.2+    

**版本支持:**

Android 3.0.0+    

**示例:**

```
    uexGaodeMap.onMarkerBubbleClickListener = function(json) {
        alert("onMarkerBubbleClickListener: "+json);
    }
```

> ### onReceiveLocation 位置变化的监听方法

`uexGaodeMap.onReceiveLocation(json);`

**参数:**

```
var json = {
    longitude:,//当前位置经度
    latitude:,//当前位置纬度
    timestamp://时间戳
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.0+    
iOS 3.0.0+    

**示例:**

```
    uexGaodeMap.onReceiveLocation = function(json) {
        alert("onReceiveLocation: "+json);
    }
```

> ### onMapClickListener 点击地图的监听方法

`uexGaodeMap.onMapClickListener(json);`

**参数:**

```
var json = {
    longitude:,//被点击的位置经度
    latitude://被点击的位置纬度
}
```

**平台支持:**

Android 2.2+
iOS 6.0+    

**版本支持:**

Android 3.0.0+
iOS 3.0.3+    

**示例:**

```
    uexGaodeMap.onMapClickListener = function(json) {
        alert("onMapClickListener: "+json);
    }
```

> ### onMapLongClickListener 长按地图的监听方法

`uexGaodeMap.onMapLongClickListener(json);`

**参数:**

```
var json = {
    longitude:,//长按的位置经度
    latitude://长按的位置纬度
}
```

**平台支持:**

Android 2.2+
iOS 6.0+   

**版本支持:**

Android 3.0.0+
iOS 3.0.2+    

**示例:**

```
    uexGaodeMap.onMapLongClickListener = function(json) {
        alert("onMapLongClickListener: "+json);
    }
```

> ### onCustomButtonClick 自定义按钮被点击的监听方法

`uexGaodeMap.onCustomButtonClick(id);`

**参数:**

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| id | String | 是 | 被点击的自定义按钮的唯一标识符 |

**说明:**

* 总是回调给调用showCustomButtons显示此按钮的页面(例如,用户在A页面调用显示按钮α,在B页面调用显示按钮β,那么α的回调给A,β的回调给B)
* 如果该页面已经被销毁,则回调不触发

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.4+    
iOS 3.0.4+    

**示例:**

```
uexGaodeMap.onCustomButtonClick = function(id) {
 	alert("onCustomButtonClick:"+id);
}
```

# 3 离线地图
## 3.1 方法
### download 开始下载

**说明:**

  开始下载,当前如果有正在下载的任务,添加到正在下载列表中。

`uexGaodeMap.download(json)`

**参数:**

```
var json = [//数组
    {//city或province必须传一个,都传时只有city有效
        city:,//(可选) 城市名称
        province://(可选) 省或直辖市名称
    }
]
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    

**示例:**

```
    var params = [
        {
            city:'武汉'
        },
        {
            province:'广东省'
        }
    ];
    var data = JSON.stringify(params);
    uexGaodeMap.download(data);
```
> ### cbDownload 开始下载的回调方法
  
`uexGaodeMap.cbDownload(json)`

**参数:**

```
var json = {
    name:,//(必选) 省或城市名称
    errorCode:,//(必选) 状态码,0-加入列表成功,非0-失败。
    errorStr://(可选) 错误描述,errorCode非0时,该值有效。
}
```
注:errorCode及errorStr详情参见附录[cbDownload Status](#1.4.2 cbDownload Status)

**平台支持:**

```
Android 2.2+    
iOS 6.0+    
```

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    

**示例:**

```
    uexGaodeMap.cbDownload = function(json) {
        alert("cbDownload: "+json);
    }
```

> ### onDownload 下载监听方法
  

`uexGaodeMap.onDownload(json)`

**参数:**

```
var json = {
    name:,//(必选) 省或城市名称
    completeCode:,//(必选) 进度百分比。
    status://(可选) 下载状态,具体请参考附录onDownload Status。
}
```
注:status下载状态参见附录[Download Status](#1.4.1 Download Status)

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    

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

> ### pause 暂停下载

`uexGaodeMap.pause(json)`

**参数:**

```
var json = []//(必传) 省或城市名称数组
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    

**示例:**

```
    var params = ["武汉","广东省"];
    var data = JSON.stringify(params);
    uexGaodeMap.pause(data);
```

> ### restart 继续下载
  

`uexGaodeMap.restart(json)`

**参数:**

```
var json = []//(必传) 省或城市名称数组
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    

**示例:**

```
    var params = ["武汉","广东省"];
    var data = JSON.stringify(params);
    uexGaodeMap.restart(data);
```

> ### getAvailableCityList 获取可下载离线地图的城市列表
  

`uexGaodeMap.getAvailableCityList()`

**参数:**

```
无
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    
 
**示例:**

```
    uexGaodeMap.getAvailableCityList();
```

> ### cbGetAvailableCityList 获取可下载离线地图的城市列表的回调方法
  
`uexGaodeMap.cbGetAvailableCityList(json)`

**参数:**

```
var json = [
    {
        city:,//(必选) 城市名称
        size:,//(必选) 包大小,单位字节
        completeCode:,//(必选) 进度百分比
    }
]
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    

**示例:**

```
    uexGaodeMap.cbGetAvailableCityList = function(json) {
        alert("cbGetAvailableCityList: "+json);
    }
```

> ### getAvailableProvinceList 获取可下载离线地图的省和城市列表

`uexGaodeMap.getAvailableProvinceList()`

**参数:**

```
无
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    

**示例:**

```
    uexGaodeMap.getAvailableProvinceList();
```

> ### cbGetAvailableProvinceList 获取可下载离线地图的省和城市列表的回调方法
  

``uexGaodeMap.cbGetAvailableProvinceList(json)``

**参数:**

```
var json = [
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

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    

**示例:**

```
    uexGaodeMap.cbGetAvailableProvinceList = function(json) {
        alert("cbGetAvailableProvinceList: "+json);
    }
```

> ### getDownloadList 获取已下载列表
  

`uexGaodeMap.getDownloadList(json)`

**参数:**

```
无
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    

**示例:**

```
    uexGaodeMap.getDownloadList();
```

> ### cbGetDownloadList 获取已下载列表的回调方法
  

`uexGaodeMap.cbGetDownloadList(json)`

**参数:**

```
var json = [
    {
        name:,//(必选) 省或城市名称
        type:,//(必选) 类型,1-城市,2-省
        size:,//(必选) 包大小,单位字节
        completeCode:,//(必选) 进度百分比

    }
]
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    

**示例:**

```
    uexGaodeMap.cbGetDownloadList = function(json) {
        alert("cbGetDownloadList: "+json);
    }
```

> ### getDownloadingList 获取正在下载列表
  

`uexGaodeMap.getDownloadingList(json)`

**参数:**

```
无
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    

**示例:**

```
    uexGaodeMap.getDownloadingList();
```

> ### cbGetDownloadingList 获取正在下载列表的回调方法
  

`uexGaodeMap.cbGetDownloadingList(json)`

**参数:**

```
var json = [
    {
        name:,//(必选) 省或城市名称
        type:,//(必选) 类型,1-城市,2-省
        size:,//(必选) 包大小,单位字节
        completeCode:,//(必选) 进度百分比
    }
]
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    

**示例:**

```
    uexGaodeMap.cbGetDownloadingList = function(json) {
        alert("cbGetDownloadingList: "+json);
    }
```

> ### isUpdate 已下载的离线地图数据是否需要更新
  

`uexGaodeMap.isUpdate(json)`

**参数:**

```
var json = {//city或province必须传一个,都传时只有city有效
    city:,//(可选) 城市名称
    province://(可选) 省或直辖市名称
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    

**示例:**

```
    var params = [
        {
            city:'武汉'
        }
    ];
    var data = JSON.stringify(params);
    uexGaodeMap.isUpdate(data);
```

> ### cbIsUpdate 已下载的离线地图数据是否需要更新的回调方法
  

`uexGaodeMap.cbIsUpdate(json)`

**参数:**

```
var json = {
    name:,//(必选) 省或城市名称
    result://(可选) 是否有更新,0-有更新,1-没有更新
}
```

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    

**示例:**

```
    uexGaodeMap.cbIsUpdate = function(json) {
        alert("cbIsUpdate: "+json);
    }
```

> ### delete  删除已下载或者正在下载数据

`uexGaodeMap.delete(json)`

**参数:**

```
var json = []//(可选,仅Android) 省或城市名称数组

```

注:

* json不传时会清除所有数据；
* 受iOS SDK所限制,iOS仅支持删除所有数据
* iOS系统下若有传入参数json,则插件不会作任何处理

**平台支持:**

Android 2.2+    
iOS 6.0+    

**版本支持:**

Android 3.0.3+    
iOS 3.0.2+    

**示例:**

```
    var params = ["武汉"];
    var data = JSON.stringify(params);
    uexGaodeMap.delete(data);
```

> ### cbDelete 删除已下载或者正在下载数据的回调方法
  

`uexGaodeMap.cbDelete(json)`

**参数:**

```
var json = {
    name:,//(必选) 省或城市名称
    errorCode:,//(必选) 状态码,0-删除成功,非0-失败。
    errorStr://(可选) 错误描述,errorCode非0时,该值有效。
}
```

**平台支持:**

Android 2.2+    

**版本支持:**

Android 3.0.3+    

**示例:**

```
    uexGaodeMap.cbDelete = function(json) {
        alert("cbDelete: "+json);
    }
```
# 4、附录
## 4.1、通过config.xml配置插件的方法

* 将配置代码添加到`config.xml`中即可完成插件配置,无需进行自定义插件相关步骤
* 详见[打包服务器公测](http://newdocx.appcan.cn/newdocx/docx?type=1472_1291)
* 该公测已完成,现在也支持正式版大众打包服务器

#### iOS
示例配置代码如下:

```
    <config desc="uexGaode" type="KEY" > 
        <param platform="iOS" name="$uexGaodeMap_APIKey$"  value="XXX"/>
    </config>
```

#### Android
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

# 5、更新历史

### iOS

API版本:`uexGaodeMap-3.0.9`

最近更新时间:`2015-12-16`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.9 | 添加IDE支持;可以通过接口设置APIKey;解决和高德导航冲突的问题 |
| 3.0.8 | 修正一个可能会导致APP崩溃的bug |
| 3.0.7 | AddCircleOverlay中 修改默认lineDash值为NO,当回调的json结构为String时,不再转义一次 |
| 3.0.6 | open接口添加参数isScrollWithWeb |
| 3.0.5 | 地理编码和反地理编码的回调添加参数,方便用户区分 |
| 3.0.4 | 添加自定义按钮相关功能 |
| 3.0.3 | 修复使用自定义气泡时自定义标注图标失效的问题 修复覆盖物设置透明色会失效的bug 修复getCurrentLocation不敏感的bug 修复clear接口可能会导致闪退的bug |
| 3.0.2 | 新增离线地图相关接口 |
| 3.0.1 | 新增clear 接口清除地图上所有标注和覆盖物 |
| 3.0.0 | 高德地图(uexGaodeMap)插件 for iOS |

### Android

API版本:`uexGaodeMap-3.0.12`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.12 | 修复闪退的问题 |
| 3.0.11 | 修复闪退的问题 |
| 3.0.10 | 去掉插件中的ActivityGroup,配合引擎升级 |
| 3.0.9 | 添加相同id的圆形覆盖物时,改为替换原来的 |
| 3.0.8 | 解决高德地图打开时闪一下的问题 |
| 3.0.7 | 解决打开地图黑屏的问题 |
| 3.0.6 | open接口增加地图是否随网页滚动参数isScrollWithWeb |
| 3.0.5 | 地理编码和反地理编码的回调添加参数,方便用户区分 |
| 3.0.4 | 添加自定义按钮相关功能 |
| 3.0.3 | 新增离线地图相关接口 |
| 3.0.2 | 新增显示地图比例尺方法, 新增批量删除标注或覆盖物的方法 |
| 3.0.1 | 插件包添加dex文件夹 |
| 3.0.0 | 高德地图插件 |
