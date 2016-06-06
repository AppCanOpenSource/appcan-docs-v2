[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
底部菜单栏插件
## 1.1、说明
类似qq空间的底部导航菜单，生成一个应用底部导航菜单模块，开发者可自定义菜单各种样式
## 1.2、UI展示
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=621_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

> ### open 打开菜单

`uexTabBarWithPopMenu.open(json)`

**说明:**

打开菜单

**参数:**

```
var json = {
    statusColor:,//(可选) 底部tab选中指示条的颜色,默认"#EA7C24"
    tab:{//(必选) 底部tab菜单数据
        textSize:,//(可选) 字体大小,默认为10
        textNColor:,//(可选) 字体正常颜色,默认黑色
        textHColor:,//(可选) 字体高亮颜色,默认白色
        centerImg:,//(必选) tab菜单中间按钮图片
        bgColor:,//(可选) tab菜单背景色,默认白色
        data:[//(必选) tab菜单数组
            {
                title:,//(必选) 标题
                iconN:,//(必选) 图标正常图片
                iconH://(必选) 图标高亮图片
            }
            ...
        ]
    },
    popMenu:{//(必选) 弹出菜单数据
        textSize:,//(可选) 字体大小,默认为13
        textNColor:,//(可选) 字体正常颜色,默认黑色
        textHColor:,//(可选) 字体高亮颜色,默认白色
        bgColor:,//(可选) 弹出菜单的背景色，默认为透明背景色，可采用ARGB色彩模式即附加上Alpha（透明度）通道，对于 alpha，00 表示完全透明，ff 表示完全不透明，非00/ff为半透明。表达式顺序是“aabbggrr”如"#66ffffff"
        bottomDistance: //(可选)弹出菜单距离底部的距离,默认300
        data:[//(必选) 弹出菜单项数组
            {
                title:,//(必选) 标题
                iconN:,//(必选) 图标正常图片
                iconH://(必选) 图标高亮图片
            }
            ...
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
    var param1 = {
            statusColor:"#EA7C24",
            tab:{
                textSize:10,
                textNColor:"#ffffff",
                textHColor:"#EA7C24",
                centerImg:"res://plus2.png",
                bgColor:"#32394A",
                data:[
                    {
                        title:"动态",
                        iconN:"res://tab1.png",
                        iconH:"res://tab1_1.png"
                    },
                    {
                        title:"与我相关",
                        iconN:"res://tab2.png",
                        iconH:"res://tab2_1.png"
                    },
                    {
                        title:"我的空间",
                        iconN:"res://tab3.png",
                        iconH:"res://tab3_1.png"
                    },
                    {
                        title:"玩吧",
                        iconN:"res://tab4.png",
                        iconH:"res://tab4_1.png"
                    }
                ]
            },
            popMenu:{
                textSize:13,
                textNColor:"#000000",
                textHColor:"#dddddd",
                bgColor:"#66ffffff",
                bottomDistance:300,
                data:[
                    {
                        title: "联系人",
                        iconN:"res://pop1.png",
                        iconH:"res://pop1_1.png"
                    },
                    {
                        title: "保存",
                        iconN:"res://pop2.png",
                        iconH:"res://pop2_1.png"
                    },
                    {
                        title: "打印文件",
                        iconN:"res://pop3.png",
                        iconH:"res://pop3_1.png"
                    },
                    {
                        title: "定位",
                        iconN:"res://pop4.png",
                        iconH:"res://pop4_1.png"
                    },
                    {
                        title: "拍照",
                        iconN:"res://pop5.png",
                        iconH:"res://pop5_1.png"
                    }
                ]
            }
    };
    var data1 = JSON.stringify(param1);
    uexTabBarWithPopMenu.open(data1);
```

> ### close 关闭菜单

`uexTabBarWithPopMenu.close()`

**说明:**

关闭菜单

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
    uexTabBarWithPopMenu.close();
```

> ### setItemChecked 设置tab选中项

`uexTabBarWithPopMenu.setItemChecked(json)`

**说明:**

打开菜单

**参数:**

```
var json = {
    index://(必选) tab菜单项索引
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
    var param1 = {
        index:1
    };
    var data1 = JSON.stringify(param1);
    uexTabBarWithPopMenu.setItemChecked(data1);
```

## 2.2、监听方法

> ### onTabItemClick tab菜单项被点击的监听方法

`uexTabBarWithPopMenu.onTabItemClick(json);`

**参数:**

```
var json = {
    index://(必选) 索引
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
    uexTabBarWithPopMenu.onTabItemClick = function(data){
        alert(data);
    }
```

> ### onPopMenuItemClick 弹出菜单项被点击的监听方法

`uexTabBarWithPopMenu.onPopMenuItemClick(json);`

**参数:**

```
var json = {
    index://(必选) 索引
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
    uexTabBarWithPopMenu.onPopMenuItemClick = function(data){
        alert(data);
    }
```

# 3、更新历史

### iOS

API版本:`uexTabBarWithPopMenu-3.0.0`

最近更新时间:`2016-04-28`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 新增uexTabBarWithPopMenu插件 |

### Android

API版本:`uexTabBarWithPopMenu-3.0.0`

最近更新时间:`2016-04-28`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 新增uexTabBarWithPopMenu插件 |
