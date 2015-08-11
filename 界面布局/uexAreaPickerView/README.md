[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
## 1.1、说明

## 1.2、UI展示

## 1.3、开源源码
插件测试用例与源码下载：[点击](xxxx ) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

## 2.2、回调方法

## 2.3、监听方法

# 3、更新历史
API 版本：uexXXX-3.0.X(iOS) uexXXX-3.0.X(Android)
最近更新时间：2015-xx-xx

| 历史发布版本 | iOS更新 | 安卓更新 |
| ------------ | ------------ | ------------ |
| 3.0.0 | 插件 | 插件|

# uexAreaPickerView
   该插件封装区域选择的功能，支持三级区域选择

### 方法：
* [open](#open)
* [close](#close)

### 监听方法：
* [onConfirmClick](https://github.com/AppCanOpenSource/appcan-docs/blob/master/%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80%2FuexAreaPickerView%2FREADME.md#onconfirmclick)

---


### open 
打开区域选择

```
uexAreaPickerView.open();
```
**参数：**
无
**平台支持：**
```
Android 2.2+
iOS 7.1+
```

### close
关闭区域选择

**版本支持：**
```
Android 3.0.0+
iOS 7.1+
```
**示例：**

示例1
```
uexAreaPickerView.close();
```

### onConfirmClick
选中的区域回调
**版本支持：**
```
Android 3.0.0+
iOS 7.1+
```
**示例：**

```
uexAreaPickerView.onConfirmClick = function(json){
 alert("onConfirmClick "+json);
}
```
**参数：**
```
city:"河北石家庄市长安区"
```

