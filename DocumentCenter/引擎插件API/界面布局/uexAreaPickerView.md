/*
Sort: 1
Toc: 1
*/

# 1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]()<ignore>
## 1.1、说明<ignore>
该插件封装区域选择的功能,支持三级区域选择

## 1.2、UI展示<ignore>

## 1.3、开源源码<ignore>
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=449_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持<ignore>

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5、接口有效性<ignore>

本插件所有API默认在插件版本**4.0.0+**可用.

# 2、API概览<ignore>

## 2.1、方法<ignore>

### 🍭 open  打开区域选择

`uexAreaPickerView.open();`

打开区域选择

**参数:**

无



**示例:**

```
uexAreaPickerView.close();
```

### 🍭 close 关闭区域选择

`uexAreaPickerView.close();`

**说明:**

关闭区域选择



**示例:**

```
uexAreaPickerView.close();
```

## 2.2、监听方法<ignore>

### 🍭 onConfirmClick 完成选择的监听方法

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



**示例:**

```javascript
uexAreaPickerView.onConfirmClick = function(jsonString){
 alert("onConfirmClick "+jsonString);
}
```

# 3、更新历史<ignore>

### iOS<ignore>

API版本: `uexAreaPickerView-4.0.0`

最近更新时间:`2016-6-24`

| 历史发布版本 | 更新内容 |
| ----- | ----- |

### Android<ignore>

API版本: `uexAreaPickerView-4.0.0`

最近更新时间:`2016-6-24`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
