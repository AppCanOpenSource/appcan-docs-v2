[TOC]
# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()
## 1.1、说明
该插件封装区域选择的功能,支持三级区域选择

## 1.2、UI展示

## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=449_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法

>### open  打开区域选择

`uexAreaPickerView.open();`

打开区域选择

**参数:**

无

**平台支持:**

Android 2.2+
iOS 7.1+

**版本支持:**

3.0.0+

**示例:**

```
uexAreaPickerView.close();
```

>### close 关闭区域选择

`uexAreaPickerView.close();`

**说明:**

关闭区域选择

**平台支持:**

Android 3.0.0+
iOS 7.1+

**版本支持:**

3.0.0+

**示例:**

```
uexAreaPickerView.close();
```

## 2.2、监听方法

>### onConfirmClick 完成选择的监听方法

`uexAreaPickerView.onConfirmClick(jsonString)`

**说明**

完成选择的监听方法 

**参数:**

```
var json={
	city:"河北 石家庄市 长安区"
}
```
* 区域直接有空格" "隔开,方便拆分

**平台支持:**

Android 3.0.0+
iOS 7.1+

**版本支持:**

3.0.0+

**示例:**

```javascript
uexAreaPickerView.onConfirmClick = function(jsonString){
 alert("onConfirmClick "+jsonString);
}
```

# 3、更新历史

### iOS

API版本:`uexAreaPickerView-3.0.5`

最近更新时间:`2015-12-26`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.5 | 添加IDE支持 |
| 3.0.4 | 修复clean时的崩溃问题 |
| 3.0.3 | onConfirmClick回调值中间添加空格(" "),方便用户拆分 |
| 3.0.2 | 修复了选择器会被错误关闭的bug |
| 3.0.1 | 修复open不能正常运作的bug |
| 3.0.0 | 城市选择器插件 |

### Android

API版本:`uexAreaPickerView-3.0.4`

最近更新时间:`2015-11-06`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.0.4 | 去掉插件中的ActivityGroup,配合引擎升级 |
| 3.0.3 | 返回数据添加空格便于分割 |
| 3.0.2 | 修复第二次打开界面空指针问题 |
| 3.0.1 | clean函数中调用close方法 |
| 3.0.0 | 城市选择器插件 |
