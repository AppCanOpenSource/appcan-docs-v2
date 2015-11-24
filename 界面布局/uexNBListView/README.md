[TOC]
# 1、简介 [![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 

自定义布局列表插件

## 1.1、说明

该插件封装了自定义布局的功能，开发者可通过该插件实现原生布局。

## 1.2、UI展示



## 1.3、开源源码

插件测试用例与源码下载：[点击]() 插件中心至插件详情页 （插件测试用例与插件源码已经提供）

# 2、API概览

## 2.1、方法

> ### openCustom 打开自定义布局列表

`uexNBListView.openCustom(params);`

**说明:**
打开自定义布局列表

**参数:**
```
var params ={
    listViewId:,
    left:,
    top:,
    width:,
    height:,
    swipeMode:,
    offsetLeft:,
    offsetRight:,
    refreshMode:,
    layout:{//(必选) 布局集合
        center:[//(必选) 主布局数组
            {
                type:,
                src:
            }
        ],
        left:[//(可选) 左侧布局数组
            {
                type:,
                src:
            }
        ],
        right:[//(可选) 右侧布局数组
            {
                type:,
                src:
            }
        ]
    },
    data:[//(可选) 数据数组
        {
            center:{//(必选) 主布局对应数据
                type:1,
                elementData:[//(必选) 数据数组
                    {
                        elementType:,
                        id:,
                        text:,
                        imgSrc:,
                        bgImg:,
                        visible:
                    }
                ]
            },
            left:{//(可选) 左侧布局对应数据
                elementData:[//(必选) 数据数组
                    {
                        elementType:,
                        id:,
                        text:,
                        imgSrc:,
                        bgImg:,
                        visible:
                    }
                ]
            },
            right:{//(可选) 右侧布局对应数据
                elementData:[//(必选) 数据数组
                    {
                        elementType:,
                        id:,
                        text:,
                        imgSrc:,
                        bgImg:,
                        visible:
                    }
                ]
            }
        }
    ],
    scrollPicture:{//(可选) 列表头部的轮播图，使用该方法时，在打包时必须同时选择uexScrollPicture插件
        interval:,//(可选) 自动滚动的间隔时间，单位为毫秒，默认3000
        height:,//(必选) 轮播图高度
        width:,//(必选) 轮播图宽度
        urls:[]//(必选) 轮播图图片地址数组
    }
}
```

各字段含义如下：

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| listViewId | String | 是 | 唯一标识符 |
| left | Number | 是 | 左间距 |
| top | Number | 是 | 上间距 |
| width | Number | 是 | 宽 |
| height | Number | 是 | 高 |
| swipeMode | Number | 否 | 侧滑模式，参考[SwipeType](#SwipeType)，默认3 |
| offsetLeft | Number | 否 | 向左滑动时右侧布局显示的宽度，swipeMode支持左滑时必选。**建议和右侧布局的宽度一致**。 |
| offsetRight | Number | 否 | 向右滑动时左侧布局显示的宽度，swipeMode支持右滑时必选。**建议和左侧布局的宽度一致**。 |
| refreshMode | Number | 否 | 刷新模式，参考[RefreshMode](#RefreshMode)，默认0 |
| type | Number | 是 | 布局类型 |
| src | String | 是 | 布局路径 |
| elementType | String | 是 | 元素类型，参考[ElementType](#ElementType)，和布局中标签类型一致 |
| id | String | 是 | 元素id，和布局中的id一致 |
| text | String | 否 | 文本内容，仅支持text和button类型 |
| imgSrc | String | 否 | 资源图片路径，仅支持img类型 |
| bgImg | String | 否 | 背景图片路径，仅支持线性布局类型 |
| visible | Number | 否 | 是否可见，0-可见并占位；1-不可见但占位；2-不可见不占位 |

**平台支持:**
Android2.2+    
iOS6.0+

**版本支持:**
Android3.0.0+    
iOS3.0.0+

**示例:**

```
        var params = {
            listViewId:0,
            left: 0,
            top: 0,
            width:800,
            height:800,
            swipeMode:3,
            refreshMode:0,
            layout:{
                center:[
                    {
                        type:1,
                        src:"res://layout_type_1.xml"
                    },
                    {
                        type:2,
                        src:"res://layout_type_2.xml"
                    },
                    {
                        type:3,
                        src:"res://layout_type_3.xml"
                    }
                ],
                left:[
                    {
                        type:1,
                        src:"res://layout_left.xml"
                    }
                ],
                right:[
                    {
                        type:1,
                        src:"res://layout_right.xml"
                    }
                ]
            },
            data:[//列表数据
                {
                    center:{
                        type:1,
                        elementData:[
                            {
                                elementType:"text",
                                id:"txt1",
                                text:"测试数据1"
                            },
                            {
                                elementType:"text",
                                id:"txt2",
                                text:"right1"
                            }
                        ]
                    },
                    left:{
                        elementData:[
                            {
                                elementType:"button",
                                id:"btn1",
                                text:"lf1"
                            },
                            {
                                elementType:"button",
                                id:"btn2",
                                text:"lf2"
                            }
                        ]
                    }
                },
                {
                    center:{
                        type:3,
                        elementData:[
                            {
                                elementType:"img",
                                id:"img1",
                                imgSrc:img3
                            },
                            {
                                elementType:"text",
                                id:"btn1",
                                text:"type:3,data:1"
                            }
                        ]
                    }
                },
                {
                    center:{
                        type:2,
                        elementData:[
                            {
                                elementType:"text",
                                id:"txt1",
                                text:"text2-2"
                            },
                            {
                                elementType:"button",
                                id:"btn1",
                                text:"button2"
                            }
                        ]
                    }
                },
                {
                    center:{
                        type:3,
                        elementData:[
                            {
                                elementType:"img",
                                id:"img1",
                                imgSrc:img2
                            },
                            {
                                elementType:"text",
                                id:"btn1",
                                text:"type:3,data:2"
                            }
                        ]
                    }
                }
            ]
        };
        var data = JSON.stringify(params);
        uexNBListView.openCustom(data);
```

> ### closeCustom 关闭自定义布局列表

`uexNBListView.closeCustom(params);`

**说明:**
关闭自定义布局列表

**参数:**
```
var params = []//唯一标识符数组
```

**平台支持:**
Android2.2+    
iOS6.0+

**版本支持:**
Android3.0.0+    
iOS3.0.0+

**示例:**

```
        var params = [0];
        var data = JSON.stringify(params);
        uexNBListView.closeCustom(data);
```

> ### setCustomItems 设置列表数据

`uexNBListView.setCustomItems(params);`

**说明:**
设置列表数据，也可以刷新列表数据。原列表数据会被清空。

**参数:**
```
var params =[
    listViewId:,
    dataList:[//列表数据
        {
            center:{//(必选) 主布局对应数据
                type:1,
                elementData:[//(必选) 数据数组
                    {
                        elementType:,
                        id:,
                        text:,
                        imgSrc:,
                        bgImg:,
                        visible:
                    }
                ]
            },
            left:{//(可选) 左侧布局对应数据
                elementData:[//(必选) 数据数组
                    {
                        elementType:,
                        id:,
                        text:,
                        imgSrc:,
                        bgImg:,
                        visible:
                    }
                ]
            },
            right:{//(可选) 右侧布局对应数据
                elementData:[//(必选) 数据数组
                    {
                        elementType:,
                        id:,
                        text:,
                        imgSrc:,
                        bgImg:,
                        visible:
                    }
                ]
            }
        }
    ]
]
```

各字段含义同方法openCustom中参数说明。

**平台支持:**
Android2.2+    
iOS6.0+

**版本支持:**
Android3.0.0+    
iOS3.0.0+

**示例:**

```
    var params = [
        listViewId:0,
        dataList:[//列表数据
                {
                    center:{
                        type:1,
                        elementData:[
                            {
                                elementType:"text",
                                id:"txt1",
                                text:"change1-1"
                            },
                            {
                                elementType:"text",
                                id:"txt2",
                                text:"change1"
                            }
                        ]
                    }
                }
        ]
    ];
    var data = JSON.stringify(params);
    uexNBListView.setCustomItems(data);
```

> ### insertCustomItem 插入数据

`uexNBListView.insertCustomItem(params);`

**说明:**
根据索引插入数据，若索引大于或等于当前列表长度，则直接插入到列表末尾。

**参数:**
```
var params ={
    listViewId:,
    index:,//(必选) 插入的位置索引
    data:{
            center:{//(必选) 主布局对应数据
                type:1,
                elementData:[//(必选) 数据数组
                    {
                        elementType:,
                        id:,
                        text:,
                        imgSrc:,
                        bgImg:,
                        visible:
                    }
                ]
            },
            left:{//(可选) 左侧布局对应数据
                elementData:[//(必选) 数据数组
                    {
                        elementType:,
                        id:,
                        text:,
                        imgSrc:,
                        bgImg:,
                        visible:
                    }
                ]
            },
            right:{//(可选) 右侧布局对应数据
                elementData:[//(必选) 数据数组
                    {
                        elementType:,
                        id:,
                        text:,
                        imgSrc:,
                        bgImg:,
                        visible:
                    }
                ]
            }
    }
}
```

各字段含义同方法openCustom中参数说明。

**平台支持:**
Android2.2+    
iOS6.0+

**版本支持:**
Android3.0.0+    
iOS3.0.0+

**示例:**

```
        var params = {
            listViewId:0,
            index:0,
            data:{
                center:{
                    type:1,
                    elementData:[
                        {
                            elementType:"text",
                            id:"txt1",
                            text:"insert1-1"
                        },
                        {
                            elementType:"text",
                            id:"txt2",
                            text:"change1"
                        }
                    ]
                },
                left:{
                    elementData:[
                        {
                            elementType:"button",
                            id:"btn1",
                            text:"lf111"
                        },
                        {
                            elementType:"button",
                            id:"btn2",
                            text:"lf21"
                        }
                    ]
                }
            }
        };
        var data = JSON.stringify(params);
        uexNBListView.insertCustomItem(data);
```

> ### updateCustomItem 更新数据

`uexNBListView.updateCustomItem(params);`

**说明:**
根据索引更新数据。

**参数:**
```
var params ={
    listViewId:,
    index:,//(必选) 更新的位置索引
    data:{
            center:{//(必选) 主布局对应数据
                type:1,
                elementData:[//(必选) 数据数组
                    {
                        elementType:,
                        id:,
                        text:,
                        imgSrc:,
                        bgImg:,
                        visible:
                    },
                    {
                        elementType:,
                        id:,
                        text:,
                        imgSrc:,
                        bgImg:,
                        visible:
                    }
                ]
            },
            left:{//(可选) 左侧布局对应数据
                elementData:[//(必选) 数据数组
                    {
                        elementType:,
                        id:,
                        text:,
                        imgSrc:,
                        bgImg:,
                        visible:
                    },
                    {
                        elementType:,
                        id:,
                        text:,
                        imgSrc:,
                        bgImg:,
                        visible:
                    }
                ]
            },
            right:{//(可选) 右侧布局对应数据
                elementData:[//(必选) 数据数组
                    {
                        elementType:,
                        id:,
                        text:,
                        imgSrc:,
                        bgImg:,
                        visible:
                    },
                    {
                        elementType:,
                        id:,
                        text:,
                        imgSrc:,
                        bgImg:,
                        visible:
                    }
                ]
            }
    }
}
```

各字段含义同方法openCustom中参数说明。

**平台支持:**
Android2.2+    
iOS6.0+

**版本支持:**
Android3.0.0+    
iOS3.0.0+

**示例:**

```
        var params = {
            listViewId:0,
            index:0,
            data:{
                center:{
                    type:1,
                    elementData:[
                        {
                            elementType:"text",
                            id:"txt1",
                            text:"update1-1"
                        },
                        {
                            elementType:"text",
                            id:"txt2",
                            text:"update1"
                        }
                    ]
                }
            }
        };
        var data = JSON.stringify(params);
        uexNBListView.updateCustomItem(data);
```

> ### deleteCustomItem 删除数据

`uexNBListView.deleteCustomItem(params);`

**说明:**
根据唯一标识符和索引删除数据。

**参数:**
```
var params ={
    listViewId:,//(必选) 唯一标识符
    indexs:[]//(必选) 索引数组
}
```

**平台支持:**
Android2.2+    
iOS6.0+

**版本支持:**
Android3.0.0+    
iOS3.0.0+

**示例:**

```
        var params = {
            listViewId:0,
            indexs:[0,1]
        };
        var data = JSON.stringify(params);
        uexNBListView.deleteCustomItem(data);
```

> ### showCustom 显示自定义列表

`uexNBListView.showCustom(params);`

**说明:**
根据唯一标识符显示自定义列表。

**参数:**
```
var params ={
    listViewId://(必选) 唯一标识符
}
```

**平台支持:**
Android2.2+    
iOS6.0+

**版本支持:**
Android3.0.0+    
iOS3.0.0+

**示例:**

```
        var params = {
            listViewId:0
        };
        var data = JSON.stringify(params);
        uexNBListView.showCustom(data);
```

> ### hideCustom 隐藏自定义列表

`uexNBListView.hideCustom(params);`

**说明:**
根据唯一标识符隐藏自定义列表。

**参数:**
```
var params ={
    listViewId://(必选) 唯一标识符
}
```

**平台支持:**
Android2.2+    
iOS6.0+

**版本支持:**
Android3.0.0+    
iOS3.0.0+

**示例:**

```
        var params = {
            listViewId:0
        };
        var data = JSON.stringify(params);
        uexNBListView.hideCustom(data);
```

## 2.2、监听方法

> ### onScrollPictureClick 轮播图中图片被点击的监听方法

`uexNBListView.onScrollPictureClick(params);`

**参数:**
```
var params ={
    listViewId:,
    viewId:,
    index:
}
```

字段含义如下：


| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| listViewId | String | 是 | 列表唯一标识符 |
| viewId | String | 是 | 轮播图ID，跟openCustom接口传入的值一致 |
| index | Number | 是 | 索引，轮播图中被点击的图片在数组中的索引 |

**平台支持:**
Android2.2+    
iOS6.0+

**版本支持:**
Android3.0.0+    
iOS3.0.0+

**示例:**

```
        uexNBListView.onScrollPictureClick = function(data){
            alert("onScrollPictureClick->" + data);
        }
```

> ### onCustomPullRefreshHeader 下拉刷新的监听方法

`uexNBListView.onCustomPullRefreshHeader(params);`

**参数:**
```
var params ={
    status:
}
```

字段含义如下：


| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| status | Number | 是 | 刷新状态，请参考[RefreshStatus](#RefreshStatus) |

**平台支持:**
Android2.2+    
iOS6.0+

**版本支持:**
Android3.0.0+    
iOS3.0.0+

**示例:**

```
        uexNBListView.onCustomPullRefreshHeader = function(data){
            //alert("onCustomPullRefreshHeader->" + data);
        }
```

> ### onCustomPullRefreshFooter 上拉刷新的监听方法

`uexNBListView.onCustomPullRefreshFooter(params);`

**参数:**
```
var params ={
    status:
}
```

字段含义如下：

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| status | Number | 是 | 刷新状态，请参考[RefreshStatus](#RefreshStatus) |

**平台支持:**
Android2.2+    
iOS6.0+

**版本支持:**
Android3.0.0+    
iOS3.0.0+

**示例:**

```
        uexNBListView.onCustomPullRefreshFooter = function(data){
            //alert("onCustomPullRefreshFooter->" + data);
        }
```

> ### XXX 自定义布局内的元素被点击的监听方法

`uexNBListView.XXX(params);`

**说明:**
XXX表示名称开发者可自定义。给在布局中的元素设置onClick属性值，在该元素被点击时该监听方法被触发。

**参数:**
```
var params ={
    listViewId:,
    index:,
    id:
}
```

字段含义如下：

| 参数名称 | 参数类型 | 是否必选 | 说明 |
| ----- | ----- | ----- | ----- |
| listViewId | String | 是 | 列表唯一标识符 |
| index | String | 是 | 元素所在列表中的项数 |
| id | Number | 是 | 元素的唯一标识符 |

**平台支持:**
Android2.2+    
iOS6.0+

**版本支持:**
Android3.0.0+    
iOS3.0.0+

**示例:**

在布局文件中设置元素及其onClick属性，如下:
```
<?xml version="1.0" encoding="utf-8"?>
<relativelayout width = "-1" height = "-1" padding="5" background = "#ffffff">
    <text id = "txt1" width = "-2" height = "-2" text="item" textSize = "23"
          textColor = "#000000,#dddddd,#ff0000" onClick = "onTextClick"/>
    <text id = "txt2" width = "-2" height = "-2" text="right" textSize = "18"
          textColor = "#FF0000,#dddddd,#ff0000" onClick = "onTextClick"
          relation = "rightOf,txt1"/>
    <img id = "img1" width = "-2" height = "-2" src = "res://icon.png" onClick = "onImgClick"
          relation = "rightOf,txt2"/>
</relativelayout>
```

则需要在调用openCustom的网页的uexOnload方法中添加如下注册:
```
        uexNBListView.onTextClick = function(data){
            alert("onTextClick->" + data);
        };
        uexNBListView.onImgClick = function(data){
            alert("onImgClick->" + data);
        };
```
其中onTextClick方法在id为txt1和txt2的元素被点击时触发(具体点击了txt1还是txt2,可通过监听方法中返回的id来区分)，onImgClick在id为img1的元素被点击时触发。

# 3、更新历史
API 版本：uexNBListView-3.0.0(iOS) uexNBListView-3.0.0(Android)
最近更新时间：2015-11-24

|  历史发布版本 | iOS更新  | 安卓更新  |
|------------|------------|------------|
| 3.0.0 |  | 自定义布局列表功能插件 |

# 4、附录

### SwipeType

|  value | 说明  |
| --- | ----- |
| 0 | 可以向右滑动 |
| 1 | 可以向左滑动 |
| 2 | 左右都可以滑动 |
| 3 | 左右都不能滑动 |

### RefreshMode

|  value | 说明  |
| --- | ----- |
| 0 | 无刷新模式 |
| 1 | 只支持下拉刷新 |
| 2 | 只支持上拉刷新 |
| 3 | 上拉下拉刷新都支持 |

### ElementType

|  value | 说明  |
| --- | ----- |
| text | 文本类型 |
| img | 图片类型 |
| button | 按钮类型 |
| linearlayout | 线性布局类型 |

### RefreshStatus

| value | 说明  |
| --- | ----- |
| 0 | 开始刷新 |
| 1 | 刷新中 |
| 2 | 刷新完成 |