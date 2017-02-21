[TOC]
# 1､简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 

芒果广告插件

## 1.1､说明

该插件对芒果SDK进行相关封装,包含AdMob､百度､点入､多盟､广点通､InMobi､艾德思奇､易积分主流广告平台｡

## 1.2､UI展示

![preview](preview/banner.png)
![preview](preview/interstitial.png)

## 1.3､开源源码

插件测试用例与源码下载:[点击]() 插件中心至插件详情页 (插件测试用例与插件源码已经提供)
## 1.4､平台版本支持

本插件的所有API默认支持**Android4.0+**和**iOS7.0+**操作系统.

有特殊版本要求的API会在文档中额外说明.

## 1.5､接口有效性

本插件所有API默认在插件版本**4.0.0+**可用.
# 2､API概览

## 2.1､方法

### 🍭 init 初始化插件

`uexMoGoAds.init(params);`

**说明:**

初始化插件

**参数:**

```javascript
    var params = {
         appKey: 
    }
```

各字段含义如下:

| 名称                  | 类型     | 是否必选 | 说明                                       |
| ------------------- | ------ | ---- | ---------------------------------------- |
| appKey | String | 是    | 芒果ID,需要到芒果官网申请,[链接地址](http://my.adsmogo.com/Account/LogOn?ReturnUrl=%2fApps%2fNetwork%2f79ebd13536fd43eaaddd2b5e57d4a127%3fadType%3d1&adType=1)｡ |


**示例:**

```javascript
    var params = {
        appKey:"bb0bf739cd8f4bbabb74bbaa9d2768bf"
    };
  uexMoGoAds.init(params);
```

### 🍭 startBanner 开始横屏广告

`uexMoGoAds.startBanner(params);`

**说明:**

开始横屏广告

**参数:**

| 名称               | 类型     | 是否必选 | 说明                          |
| ---------------- | ------ | ---- | --------------------------- |
| x                   | Number | 否    | 输入框距屏幕左边缘的距离,默认为0                             |
| y                   | Number | 否    | 输入框距屏幕顶部的距离,默认为0                             |
| isScrollWithWeb     | bool   | 否    | 是否随网页滚动,默认为false                         |

**示例:**

```javascript
var params = {
        x:0,
        y:20,
        isScrollWithWeb:false
    };
   uexMoGoAds.startBanner(params);
```

### 🍭 startInterstitial 开始插屏广告

`uexMoGoAds.startInterstitial();`

**说明:**

开始插屏广告

**参数:**

无

**示例:**

```javascript
   uexMoGoAds.startInterstitial();
```

# 3､更新历史

### iOS

API版本: `uexMoGoAds-4.0.0`

最近更新时间:`2017-02-21`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 芒果广告4.0插件 |

### Android

API版本: `uexMoGoAds-4.0.0`

最近更新时间:`2016-12-05`

| 历史发布版本 | 更新内容 |
| ----- | ----- |
| 4.0.0 | 芒果广告4.0插件 |
