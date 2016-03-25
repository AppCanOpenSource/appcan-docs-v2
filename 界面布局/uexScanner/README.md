
[TOC]

# 1、简介
二维码插件
## 1.1、说明
条形码,二维码等扫描,此插件提供可以自定义扫描界面UI设置接口,使其效果更能满足应用的需求和ui设计

## 1.2、UI展示

 ![](http://newdocx.appcan.cn/docximg/150439g2015y6g16o.png)
## 1.3、开源源码
插件测试用例与源码下载:[点击](http://plugin.appcan.cn/details.html?id=184_index) 插件中心至插件详情页 (插件测试用例与插件源码已经提供)

# 2、API概览

## 2.1、方法
> ### open 启动扫描

`uexScanner.open()`

**说明:**

开启扫描功能,当扫描窗口开启后会回调[cbOpen](#cbOpen 扫描结果的回调方法 "cbOpen")方法。

**参数:**

无

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
uexScanner.open();
```

> ### setJsonData 设置数据

`uexScanner.setJsonData(params)`

**说明:**

可以自定义扫描界面,未设置的话为默认界面

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

**平台支持:**

Android 2.2+
iOS 6.0+

**版本支持:**

3.0.0+

**示例:**

```
var jsonData = '{"lineImg":"res://line.png","pickBgImg":"res://pick_bg.png","tipLabel":"对准二维码/条形码,即可自动扫描","title":"扫一下"}';
uexScanner.setJsonData(jsonData);
```
## 2.2、回调方法
> ### cbOpen 扫描结果的回调方法

`uexScanner.cbOpen(opId,dataType,data)`

**参数:**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ----- | ----- | ----- | ----- |
| opId| Number| 是 | 操作ID,open失败时为1,正常时为0,失败时一般是用户禁止了APP摄像头权限 |
| dataType|Number | 是 | 参数类型详见CONTANT中Callback方法数据类型 |
| data|Number | 是 | 返回uex.cSuccess或uex.cFailed,详见CONTANT中CallbackInt类型数据 |

**平台支持:**

Android2.2+
iOS6.0+

**版本支持**

3.0.0+

**示例**

```
function ScannerSuccessCallBack(opCode, dataType, data) {
    alert(data);
}
window.uexOnload = function(){
    uexScanner.cbOpen = ScannerSuccessCallBack;
}
```

# 3、更新历史

### iOS

API版本:`uexScanner-3.1.6`

最近更新时间:`2016-3-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 3.1.6 | 修复横屏扫描时图像显示异常的BUG |
| 3.1.5 | 添加可选参数charset,支持GBK编码的二维码 |
| 3.1.4 | 重构:改用ZXing识别二维码;添加IDE支持 |
| 3.0.3 | 修改二维码扫描UI图片 |
| 3.0.2 | 修改资源图片 |
| 3.0.1 | UI适配iOS7以下系统 |
| 3.0.0 | 二维码插件UI优化 |

### Android

API版本:`uexScanner-3.0.15`

最近更新时间:`2016-3-2`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
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
| 3.0.5 | 优化扫描界面 |
| 3.0.4 | CreateBarCode不能调用问题 |
| 3.0.3 | 新增生成条形码和二维码接口 |
| 3.0.2 | 修复手动输入条形码崩溃问题 |
| 3.0.1 | 修复资源问题 |
| 3.0.0 | 条形码二维码扫描功能插件 |
