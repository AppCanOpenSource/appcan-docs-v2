/*
Sort: 1
Toc: 1
*/

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>
## 1.1、说明<ignore>
 侧边菜单插件
## 1.2、UI展示<ignore>
 ![](http://i.imgur.com/ketvg8l.png)
## 1.3、开源源码<ignore>
 插件测试用例与源码下载:[点击](xxxx ) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览<ignore>

## 2.1、方法<ignore>
###  open 打开菜单

`uexSideMenu.open(json)`

**说明:**

打开菜单

**参数:**

```
var json = {
    left:,//(必选) 菜单左间距
    top:,//(必选) 菜单上间距
    width:,//(可选) 菜单item宽度,默认为bgImg图片的宽度
    height:,//(可选) 菜单item高度,默认为bgImg图片的高度
    menuItems:[//(必选) 菜单数据
        {
            buttonImg:,//(必选) 菜单item图标
            bgImg://(必选) 菜单item背景图片
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
    var param1 = {
            left:0,
            top:500,
            width:237,
            height:135,
            menuItems:[
                {
                    buttonImg:"res://s1.png",
                    bgImg:"res://bg.png"
                },
                {
                    buttonImg:"res://s2.png",
                    bgImg:"res://bg.png"
                },
                {
                    buttonImg:"res://s3.png",
                    bgImg:"res://bg.png"
                },
                {
                    buttonImg:"res://s4.png",
                    bgImg:"res://bg.png"
                },
                {
                    buttonImg:"res://s5.png",
                    bgImg:"res://bg.png"
                }
            ]
    };
    var data1 = JSON.stringify(param1);
    uexSideMenu.open(data1);
```
运行效果:
![](http://i.imgur.com/ketvg8l.png)

###  close 关闭菜单

`uexSideMenu.close()`

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
    uexSideMenu.close()
```

## 2.2、监听方法<ignore>

###  onItemClick item被点击的监听方法

`uexSideMenu.onItemClick(json);`

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
    uexSideMenu.onItemClick = function(data){
        alert(data);
    }
```

# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexSideMenu-4.0.0`

最近更新时间:`2015-08-11`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android<ignore>

API版本: `uexSideMenu-4.0.0`

最近更新时间:`2015-08-11`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
