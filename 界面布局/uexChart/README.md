[TOC]
# 1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
## 1.1､说明
   该插件封装几何图表功能,包括饼状图,折线图和柱状图功能.

* 注意! iOS版插件目前只支持公测环境编译,需获取公测权限[跳转](http://plugin.appcan.cn/details.html?id=456_index) ,具体更新到公共插件时间请关注官方通知.

## 1.2､UI展示
见具体API

## 1.3､开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=456_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4､平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统. 
有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性
本插件所有API默认在插件版本**4.0.0+**可用.  
在后续版本中新添加的接口会在文档中额外说明. 

# 2､API概览

## 2.1､方法

### 🍭 openPieChart 打开饼状图

`uexChart.openPieChart(json)`

**说明:**

打开一个饼状图

**参数:**

```javascript
var json = {
    id:,//(必选) 唯一标识符
    left:,//(可选) 左间距,默认0
    top:,//(可选) 上间距,默认0
    width:,//(可选) 宽度,默认屏幕宽度
    height:,//(可选) 高度,默认屏幕高度
    bgColor:,//(可选) 背景颜色,默认透明(仅Android)
    showUnit:,//(可选) 是否显示单位,默认false
    unit:,//(可选) 单位
    valueTextColor:,//(可选) 饼状图上值的文本颜色,默认#ffffff
    valueTextSize:,//(可选) 饼状图上值的字体大小,默认13
    desc:,//(可选) 描述
    descTextColor:,//(可选) 描述及图例文本颜色,默认#000000
    descTextSize:,//(可选) 描述及图例字体大小,默认12
    showValue:,//(可选) 是否显示value,默认true
    showLegend:,//(可选) 是否显示图例,默认false
    legendPosition:,//(可选) 图例显示的位置,取值范围:bottom-饼状图下方;right-饼状图右侧,默认bottom
    duration:,//(可选) 显示饼状图动画时间,单位ms,默认1000
    isScrollWithWeb:,//(可选) 是否跟随网页滑动,默认false
    showTitle:,//(可选) 是否显示title,默认true
    showPercent:,//(可选) 是否用百分比代替value,默认true
    showCenter:,//(可选) 是否显示中心圆,默认true
    centerColor:,//(可选) 中心圆颜色,默认透明
    centerTitle:,//(可选) 中心标题
    centerSummary:,//(可选) 中心子标题
    centerRadius:,//(可选) 中心圆半径百分比,默认40
    centerTransRadius:,//(可选) 中心圆半透明部分半径,默认42
    data:[//(必选) 数组
        {
            title:,//(必选) 色块名称
            color:,//(必选) 色块颜色
            value://(必选) 色块值
        }
    ]
}
```

**示例:**

示例1

```javascript
    var param1 = {
        id:1,
        top:500,
        isScrollWithWeb:true,
        data:[
            {
                title:"title1",
                color:"#c12552",
                value:0.9
            },
            {
                title:"title2",
                color:"#ff6600",
                value:0.5
            },
            {
                title:"title3",
                color:"#f5c700",
                value:0.6
            },
            {
                title:"title4",
                color:"#6a961f",
                value:0.4
            },
            {
                title:"title5",
                color:"#b36435",
                value:0.8
            }
        ]
    };
    var data1 = JSON.stringify(param1);
    uexChart.openPieChart(data1);
```
运行效果:(网页背景色为蓝色)
![](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexChart/img/p1.png)

示例2

```javascript
    var param2 = {
        id:2,
        left:0,
        top:500,
        width:800,
        height:800,
        bgColor:"#cccccc",
        showUnit:true,
        unit:"cc",
        showCenter:true,
        centerColor:"#00000000",
        centerTitle:"我是标题!",
        centerSummary:"我是子标题",
        centerRadius:55,
        centerTransRadius:57,
        valueTextColor:"#ffffff",
        valueTextSize:15,
        desc:"测试饼状图功能",
        descTextColor:"#000000",
        descTextSize:9,
        showTitle:true,
        showValue:true,
        showPercent:false,
        showLegend:true,
        legendPosition:"bottom",
        duration:800,
        data:[
            {
                title:"title1",
                color:"#c12552",
                value:0.9
            },
            {
                title:"title2",
                color:"#ff6600",
                value:0.5
            },
            {
                title:"title3",
                color:"#f5c700",
                value:0.6
            },
            {
                title:"title4",
                color:"#6a961f",
                value:0.4
            },
            {
                title:"title5",
                color:"#b36435",
                value:0.8
            }
        ]
    };
    var data2 = JSON.stringify(param2);
    uexChart.openPieChart(data2);
```
运行效果:

![](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexChart/img/p2.png)

### 🍭 closePieChart 关闭饼状图


`uexChart.closePieChart(json)`

**说明:**

  关闭饼状图


**参数:**

```javascript
var json = []//(可选) 饼状图唯一标识符数组,不传时关闭所有饼状图
```

**示例:**

示例1
```javascript
    var params = [1];
    var data = JSON.stringify(params);
    uexChart.closePieChart(data);//关闭唯一标识符为1的饼状图
```

示例2
```javascript
    uexChart.closePieChart();//关闭所有饼状图
```

### 🍭 openLineChart 打开曲线图

**说明:**

  打开曲线图

`uexChart.openLineChart(json)`

**参数:**

```javascript
var json = {
    id:,//(必选) 唯一标识符
    left:,//(可选) 左间距,默认0
    top:,//(可选) 上间距,默认0
    width:,//(可选) 宽度,默认屏幕宽度
    height:,//(可选) 高度,默认屏幕高度
    bgColor:,//(可选) 背景颜色,默认透明
    showUnit:,//(可选) 是否显示单位,默认false
    unit:,//(可选) 单位
    valueTextColor:,//(可选) 曲线图上值的文本颜色,默认#ffffff
    valueTextSize:,//(可选) 曲线图上值的字体大小,默认13
    desc:,//(可选) 描述
    descTextColor:,//(可选) 描述及图例文本颜色,默认#000000
    descTextSize:,//(可选) 描述及图例字体大小,默认12
    showValue:,//(可选) 是否显示value,默认true
    showLegend:,//(可选) 是否显示图例,默认false
    legendPosition:,//(可选) 图例显示的位置,取值范围:bottom-曲线图下方;right-曲线图右侧,默认bottom
    duration:,//(可选) 显示曲线图动画时间,单位ms,默认1000
    isScrollWithWeb:,//(可选) 是否跟随网页滑动,默认false
    minValue,//(可选)纵坐标最小值(不填默认为传入的数据中最小的纵坐标值)
    maxValue,//(可选)纵坐标最大值(不填默认为传入的数据中最大的纵坐标值)
    borderColor:,//(可选)图表边框颜色(默认为黑)   
    extraLines:[//(可选)辅助线数组,辅助线是一条平行于x轴的直线
        {
            yValue:,//(必选)纵坐标值,
             lineName,//(必选)辅助线标签名
               lineColor:,//(可选)辅助线颜色
             textColor:,//(可选)辅助线标签颜色
               textSize:,//(可选)辅助线标签字体大小
             isSolid:,//(可选)是否是实线,默认true
              lineWidth://(可选)辅助线宽度
        }
    ],
    xData:[],//(可选)横坐标数组,包含所有横坐标的值 (详见下方说明)
    lines:[//(必选) 曲线数组
        {
            lineName:,//(必选) 曲线名称
            lineColor:,//(必选) 曲线颜色
            lineWidth:,//(必选) 曲线线宽
            circleColor:,//(必选) 结点圆圈颜色
            circleSize:,//(必选) 结点圆圈大小
            isSolid:,//(可选) 是否是实线,默认true
            cubicIntensity:,//(可选)圆滑程度,取值0.05~1 值越大曲线越弯曲,不传时曲线为折线
            data:[//(必选) 数据数组
                {
                    xValue:,//(必选) 横坐标值(必须是xData中包含的值,详见下方说明)
                    yValue://(必选) 纵坐标值
                }
            ]
        }
    ],
    option:{
		initZoomX:,//Number,可选, X方向缩放系数.initZoomX为正实数 传小于1的值为缩小 大于1的值为放大
		initZoomY:,//Number,可选, Y方向缩放系数.initZoomY为正实数 传小于1的值为缩小 大于1的值为放大
		isSupportDrag:,//Boolean,可选,是否支持滑动手势
		isSupportZoomX:,//Boolean,可选,是否响应X方向上的缩放手势
		isSupportZoomY://Boolean,可选,是否响应Y方向上的缩放手势
	}
}
```

* xData里的元素是在x轴上显示的文字,支持Number和String.
* 当xData不传时,插件内部会新建一个数组,并将**每一个出现过的**xValue**顺次**添加至此数组中,并将此数组当做xData使用.
* 传入xData时,插件不会再往其中添加新元素.此时,若数据的xValue没有出现在xData中,那么这个数据将被忽略.

**示例:**

示例1

```javascript
  var param = {
            id:1,
            left:50,
            top:200,
            width:800,
            height:800,
            bgColor:"#00000000",
            showUnit:true,
            unit:"cc",
            valueTextColor:"#000000",
            valueTextSize:15,
            desc:"测试折线图功能",
            descTextColor:"#000000",
            descTextSize:12,
            showLegend:true,
            legendPosition:"bottom",
            duration:800,
            xData:[2001,2002,2003,2004,2005,2006,2007,2008,2009,2010],
            minValue:-3,
            maxValue:12,
            borderColor:"#ccc",
            extraLines:[
                {
                    yValue:6.5,
                    lineName:"及格",
                    lineColor:"#f00",
                    textColor:"#f00",
                    textSize:12,
                    isSolid:false,
                    lineWidth:4
                },
                {
                    yValue:8.9,
                    lineName:"优秀",
                    lineColor:"#0f0",
                    textColor:"#0f0",
                    textSize:12,
                    isSolid:false,
                    lineWidth:4
                  }
               ],
            lines:[
                {
                    cubicIntensity:0.2,
                    lineName:"line1",
                    lineColor:"#ff0000",
                    lineWidth:2,
                    circleColor:"#ff6600",
                    circleSize:3,
                    isSolid:true,
                    data:[
                        {xValue:2001,yValue:1.01234},
                        {xValue:2002,yValue:3.03},
                        {xValue:2003,yValue:2.05},
                        {xValue:2004,yValue:4},
                        {xValue:2005,yValue:2},
                        {xValue:2006,yValue:3},
                        {xValue:2007,yValue:8},
                        {xValue:2008,yValue:10},
                        {xValue:2009,yValue:-1.2},
                        {xValue:2010,yValue:6}
                    ]
                }
            ]
        };
    var data1 = JSON.stringify(param);
    uexChart.openLineChart(data1);
```

运行效果:(网页背景色为蓝色)

![](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexChart/img/l1.png)
示例2

```javascript
    var param = {
            id:2,
            left:0,
            top:400,
            width:800,
            height:800,
            bgColor:"#cccccc",
            showUnit:true,
            showValue:false,
            unit:"cc",
            valueTextColor:"#ffffff",
            valueTextSize:15,
            desc:"测试折线图功能",
            descTextColor:"#000000",
            descTextSize:12,
            showLegend:true,
            legendPosition:"right",
            duration:800,
            isScrollWithWeb:true,
            xData:[2001,2002,2003,2004,2005,2006,2007,2008,2009,2010],
            lines:[
                {
                    lineName:"line1",
                    lineColor:"#ff6600",
                    lineWidth:2,
                    circleColor:"#ff6600",
                    circleSize:3,
                    isSolid:true,
                    data:[
                        {xValue:2001,yValue:5},
                        {xValue:2002,yValue:1},
                        {xValue:2003,yValue:6},
                        //{xValue:2004,yValue:4},
                        //{xValue:2005,yValue:2},
                        //{xValue:2006,yValue:3},
                        {xValue:2007,yValue:8},
                        {xValue:2008,yValue:10},
                        {xValue:2009,yValue:2},
                        {xValue:2010,yValue:6}
                    ]
                },
                {
                    lineName:"line2",
                    lineColor:"#6a961f",
                    lineWidth:4,
                    circleColor:"#6a961f",
                    circleSize:4,
                    isSolid:false,
                    data:[
                        //{xValue:2001,yValue:10},
                        //{xValue:2002,yValue:3},
                        //{xValue:2003,yValue:3},
                        {xValue:2004,yValue:2},
                        {xValue:2005,yValue:8},
                        {xValue:2006,yValue:2},
                        {xValue:2007,yValue:5},
                        {xValue:2008,yValue:2},
                        {xValue:2009,yValue:5},
                        {xValue:2010,yValue:4}
                    ]
                }
            ]
        };
    var data1 = JSON.stringify(param);
    uexChart.openLineChart(data1);
```
运行效果:

![](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexChart/img/l2.png)
### 🍭 closeLineChart 关闭曲线图

`uexChart.closeLineChart(json)`

**说明:**

  关闭曲线图

**参数:**

```javascript
var json = []//(可选) 曲线图唯一标识符数组,不传时关闭所有曲线图
```

**示例:**

```javascript
示例1
    var params = [1];
    var data = JSON.stringify(params);
    uexChart.closeLineChart(data);//关闭唯一标识符为1的曲线图

示例2
    uexChart.closeLineChart();//关闭所有曲线图
```

### 🍭 openBarChart 打开直方图

`uexChart.openBarChart(json)`

**说明:**

  打开直方图


**参数:**

```javascript
var json = {
    id:,//(必选) 唯一标识符
    left:,//(可选) 左间距,默认0
    top:,//(可选) 上间距,默认0
    width:,//(可选) 宽度,默认屏幕宽度
    height:,//(可选) 高度,默认屏幕高度
    bgColor:,//(可选) 背景颜色,默认透明
    showUnit:,//(可选) 是否显示单位,默认false
    unit:,//(可选) 单位
    valueTextColor:,//(可选) 直方图上值的文本颜色,默认#ffffff
    valueTextSize:,//(可选) 直方图上值的字体大小,默认13
    desc:,//(可选) 描述
    descTextColor:,//(可选) 描述及图例文本颜色,默认#000000
    descTextSize:,//(可选) 描述及图例字体大小,默认12
    showValue:,//(可选) 是否显示value,默认true
    showLegend:,//(可选) 是否显示图例,默认false
    legendPosition:,//(可选) 图例显示的位置,取值范围:bottom-直方图下方;right-直方图右侧,默认bottom
    duration:,//(可选) 显示直方图动画时间,单位ms,默认1000
    isScrollWithWeb:,//(可选) 是否跟随网页滑动,默认false
    minValue,//(可选)纵坐标最小值(不填默认为传入的数据中最小的纵坐标值)
    maxValue,//(可选)纵坐标最大值(不填默认为传入的数据中最大的纵坐标值)
    borderColor:,//(可选)图表边框颜色(默认为黑)
    extraLines:[//(可选)辅助线数组,辅助线是一条平行于x轴的直线
        {
            yValue:,//(必选)纵坐标值,
            lineName,//(必选)辅助线标签名
            lineColor:,//(可选)辅助线颜色
            textColor:,//(可选)辅助线标签颜色
            textSize:,//(可选)辅助线标签字体大小
            isSolid:,//(可选)是否是实线,默认true
            lineWidth:,//(可选)辅助线宽度
        }
    ],
    bars:[//直方数组
        {
            barName:,//(必选) 直方名称
            barColor:,//(必选) 直方颜色
            data:[//(必选) 数据数组
                {
                    xValue:,//(必选) 横坐标值,(必须是xData中包含的值,详见下方说明)
                    yValue://(必选) 纵坐标值
                }
            ]
        }
    ],
    option:{
		initZoomX:,//Number,可选, X方向缩放系数.initZoomX为正实数 传小于1的值为缩小 大于1的值为放大
		initZoomY:,//Number,可选, Y方向缩放系数.initZoomY为正实数 传小于1的值为缩小 大于1的值为放大
		isSupportDrag:,//Boolean,可选,是否支持滑动手势
		isSupportZoomX:,//Boolean,可选,是否响应X方向上的缩放手势
		isSupportZoomY://Boolean,可选,是否响应Y方向上的缩放手势
	}
}
```

**示例:**

示例1

```javascript
    var param = {
        id:1,
        left:0,
        top:500,
        width:800,
        height:800,
        bgColor:"#00000000",
        showUnit:true,
        unit:"cc",
        valueTextColor:"#000000",
        valueTextSize:15,
        duration:1800,
        bars:[
            {
                barName:"bar1",
                barColor:"#c12552",
                data:[
                    {xValue:2001,yValue:5},
                    {xValue:2002,yValue:1},
                    {xValue:2003,yValue:6},
                    {xValue:2004,yValue:4},
                    {xValue:2005,yValue:2},
                    {xValue:2006,yValue:3}
                ]
            }
        ]
    };
    var data1 = JSON.stringify(param);
    uexChart.openBarChart(data1);
```
运行效果:(网页背景色为蓝色)

![](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexChart/img/b1.png)
示例2

```javascript
    var param = {
        id:2,
        left:10,
        top:700,
        width:800,
        height:800,
        bgColor:"#cccccc",
        showUnit:true,
        unit:"cc",
        valueTextColor:"#ffffff",
        valueTextSize:15,
        showValue:false,
        desc:"测试柱状图功能",
        descTextColor:"#000000",
        descTextSize:12,
        showLegend:true,
        legendPosition:"right",
        duration:1800,
        isScrollWithWeb:true,
        borderColor:"#ccc",
        xData:["2001","2002","2003","2004","2005","2006"],
        bars:[
            {
                barName:"bar1",
                barColor:"#c12552",
                data:[
                    {xValue:2001,yValue:5},
                    {xValue:2002,yValue:1},
                    {xValue:2003,yValue:6},
                    {xValue:2004,yValue:4},
                    {xValue:2005,yValue:2},
                    {xValue:2006,yValue:3}
                ]
            },
            {
                barName:"bar2",
                barColor:"#ff6600",
                data:[
                    {xValue:2001,yValue:10},
                    {xValue:2002,yValue:3},
                    {xValue:2003,yValue:3},
                    {xValue:2004,yValue:2},
                    {xValue:2005,yValue:8},
                    {xValue:2006,yValue:2}
                ]
            }
        ],
        extraLines:[
                {
                    yValue:3.5,
                    lineName:"平均值",
                    lineColor:"#f00",
                    textColor:"#f00",
                    textSize:12,
                    isSolid:false,
                    lineWidth:4
                }
        ]
    };
    var data1 = JSON.stringify(param);
    uexChart.openBarChart(data1);
```
运行效果:

![](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexChart/img/b2.png)
### 🍭 closeBarChart 关闭直方图

`uexChart.closeBarChart(json)`

**说明:**

  关闭直方图


**参数:**

```javascript
var json = []//(可选) 直方图唯一标识符数组,不传时关闭所有直方图
```

**示例:**

```javascript
示例1
    var params = [1];
    var data = JSON.stringify(params);
    uexChart.closeBarChart(data);//关闭唯一标识符为1的直方图

示例2
    uexChart.closeBarChart();//关闭所有直方图
```

## 2.2､监听方法

### 🍭 onValueSelected 图表中元素被点击的监听方法

`uexChart.onValueSelected(json);`

**说明:**

图表中元素被点击的监听方法

**参数:**

```javascript
var json = {
    id:,//String,图表id,用来区分不同的图表
    value:,//Number,被点击的元素对应的y值
    dataSetIndex:,//Number,被点击的元素所在的数据数组序号
    xIndex://Number,被点击的元素对应的x轴序号
}
```

* dataSetIndex和xIndex iOS 3.0.3+才支持

**示例:**

```javascript
    uexChart.onValueSelected = function(data){
        alert(data);
    }
```

# 3､更新历史

### iOS

API版本: `uexChart-4.0.1`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.1 | 更新依赖的引擎库 |
| 4.0.0 | 几何图表(uexChart)插件 for iOS |

### Android

API版本: `uexChart-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 4.0插件 |
