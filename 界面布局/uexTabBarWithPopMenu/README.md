[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
底部菜单栏插件
## 1.1、说明
底部菜单栏插件
## 1.2、UI展示
![](https://raw.githubusercontent.com/AppCanOpenSource/appcan-docs-v2/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80/uexTabBarWithPopMenu/img/1.jpg)

## 1.3、开源源码
插件测试用例与源码下载:[点击](xxxx ) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

> ### open 打开菜单

`uexTabBarWithPopMenu.open(json)`

**说明:**

打开菜单

**参数:**

```
var json = {
    left:,//(必选) 菜单左间距
    top:,//(必选) 菜单上间距
    width:,//(必选) 菜单宽度,-1:屏幕宽度
    height:,//(必选) 菜单高度
    tab:{//(必选) 底部tab菜单数据
        textSize:,//(必选) 字体大小
        textNColor:,//(必选) 字体正常颜色
        textHColor:,//(必选) 字体高亮颜色
        centerImg:,//(必选) tab菜单中间按钮图片
        bgColor:,//(必选) tab菜单背景色
        data:[//(必选) tab菜单数组
            {
                title:,//(必选) 标题
                iconN:,//(必选) 图标正常图片
                iconH://(必选) 图标高亮图片
            }
        ]
    },
    popMenu:{//(必选) 弹出菜单数据
        textSize:,//(必选) 字体大小
        textNColor:,//(必选) 字体正常颜色
        textHColor:,//(必选) 字体高亮颜色
        bgColor:,//(必选) 弹出菜单的背景色
        data:[//(必选) 弹出菜单项数组
            {
                title:,//(必选) 标题
                iconN:,//(必选) 图标正常图片
                iconH://(必选) 图标高亮图片
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
    var param1 = {
            left:0,
            top:300,
            width:-1,
            height:120,
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
                textSize:15,
                textNColor:"#000000",
                textHColor:"#dddddd",
                bgColor:"#66ffffff",
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
                        title: "拍照",
                        iconN:"res://pop3.png",
                        iconH:"res://pop3_1.png"
                    },
                    {
                        title: "打印文件",
                        iconN:"res://pop4.png",
                        iconH:"res://pop4_1.png"
                    },
                    {
                        title: "定位",
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
    uexTabBarWithPopMenu.close()
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

API版本:`uexTabBarWithPopMenu-(null)`

最近更新时间:`2015-08-11`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 插件 |

### Android

API版本:`uexTabBarWithPopMenu-(null)`

最近更新时间:`2015-08-11`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.0 | 插件开发uexTabBarWithPopMenu |
