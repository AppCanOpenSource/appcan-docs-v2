
[TOC]

# 1、简介
二维码插件
## 1.1、说明
条形码,二维码等扫描,此插件提供可以自定义扫描界面UI设置接口,用户传入资源文件,使其效果更能满足应用的需求和ui设计

## 1.2、UI展示

 ![](http://newdocx.appcan.cn/docximg/150439g2015y6g16o.png)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=184_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

## 1.4、平台版本支持
本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统。
有特殊版本要求的API会在文档中额外说明。

## 1.5、接口有效性
本插件所有API默认在插件版本**4.0.0+**可用。  
在后续版本中新添加的接口会在文档中额外说明。  


# 2、API概览

## 2.1、方法
> ### open 启动扫描

`uexScanner.open(callbackFunction)`

**说明:**

开启扫描功能,当扫描完成后会执行回调函数

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| callbackFunction| 函数| 是 |扫描成功后的回调函数|

`callbackFunction`的参数是JSON对象类型，其格式如下：

```
{
    code:, //code为1时代表打开摄像头失败
    type:
}
```

**示例:**

```
var callback = function(data) {
    var result = "data:" + JSON.stringify(data)
    console.log(result);
    alert(result);
};

uexScanner.open(callback);

```

> ### setJsonData 设置数据

`uexScanner.setJsonData(params)`

**说明:**

可以自定义扫描界面,未设置的话为默认界面
自定义二维码扫描图片资源,图片路径支持 wgt:// wgts:// res:// file://  路径协议详见[CONSTANT](http://newdocx.appcan.cn/newdocx/docx?type=978_975#Path Types "CONSTANT")中PathTypes

**参数:**

```
var params = {
    "lineImg": , //扫描时移动的光线,可选
    "pickBgImg": , //扫描区域边框图片, 可选
    "tipLabel": ,  //扫描区下部提示语,可选
    "title": ,//扫描界面顶部标题 (仅iOS支持),可选
    "charset"//设置字符编码,可选
}
```

**示例:**

```
var jsonData = '{"lineImg":"res://line.png","pickBgImg":"res://pick_bg.png","tipLabel":"对准二维码/条形码,即可自动扫描","title":"扫一下"}';
uexScanner.setJsonData(jsonData);
```


# 3、更新历史

### iOS

API版本:`uexScanner-4.0.0`

最近更新时间:`2016-6-11`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持function传入 |
| 3.1.7 | 修改为ios7.0以上调用系统库扫描 |
| 3.1.6 | 修复横屏扫描时图像显示异常的BUG |
| 3.1.5 | 添加可选参数charset,支持GBK编码的二维码 |
| 3.1.4 | 重构:改用ZXing识别二维码;添加IDE支持 |
| 3.0.3 | 修改二维码扫描UI图片 |
| 3.0.2 | 修改资源图片 |
| 3.0.1 | UI适配iOS7以下系统 |
| 3.0.0 | 二维码插件UI优化 |

### Android

API版本:`uexScanner-4.0.0`

最近更新时间:`2016-6-11`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 支持function传入 |
| 3.0.15 | 添加charset字段设置编码 |
| 3.0.14 | 调整扫描框为正方形 |
| 3.0.13 | 拍照权限被禁止情况处理 |
| 3.0.12 | 去掉读取联系人权限 |
| 3.0.11 | 添加扫描本地二维码图片功能 |
| 3.0.10 | 二维码优化 |
| 3.0.9 | 优化UI效果 |
| 3.0.8 | ZBar更新UI,增加setJsonData接口 |
| 3.0.7 | 修复uexScanner扫码画面颠倒问题 |
| 3.0.6 | 修复插件包打包错误问题 |
| 3.0.5 | 优化扫描界面。提供下载:[旧版二维码](/docAttach/975/uexScanner-3.0.5.zip "旧版二维码") |
| 3.0.4 | CreateBarCode不能调用问题 |
| 3.0.3 | 新增生成条形码和二维码接口 |
| 3.0.2 | 修复手动输入条形码崩溃问题 |
| 3.0.1 | 修复资源问题 |
| 3.0.0 | 条形码二维码扫描功能插件 |
