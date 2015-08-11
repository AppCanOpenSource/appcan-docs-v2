 
[TOC]
 #1、简介[![](http://appcan-download.oss-cn-beijing.aliyuncs.com/%E5%85%AC%E6%B5%8B%2Fgf.png)]() 
解压插件
##1.1、 说明
 解压缩接口API。

##1.2、UI展示

 ![](http://newdocx.appcan.cn/docximg/125135p2015q6p16r.png)
##1.3 、 开源源码
插件测试用例与源码下载：[点击](http://plugin.appcan.cn/details.html?id=198_index) 插件中心至插件详情页 （插件测试用例与插件源码已经提供）

 #2、API概览

 
##2.1、方法


> ### 			zip	  压缩文件		

`uexZip.zip(srcPath,zippedPath)	`				
** 			说明:		**
压缩文件					
回调 [cbZip](#cbZip 压缩的回调方法，压缩完成时被调用   "压缩的回调方法") 
**  			参数:		**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| srcPath | String类型 | 必选 |  源文件路径。路径协议详见CONSTANT中PathTypes|
| zippedPath| String类型 | 必选 | 目标文件路径。路径协议详见CONSTANT中PathTypes |
 
**			平台支持:		**
Android2.2+					
iOS6.0+					
**		版本支持:		**
3.0.0+					
** 			示例:		**
							  [见附录1](#3、附录一 "见附录1")					
> ### 			zipWithPassword		以加密的方式压缩文件		

`uexZip.zipWithPassword(srcPath,zippedPath,password)	`				
**  			说明:		**
以加密的方式压缩文件					
**			参数:		**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| srcPath | String类型 | 必选 |  压缩的文件或文件夹的路径，路径协议详见CONSTANT中PathTypes |
| zippedPath| String类型 | 必选 | 目标文件路径，路径协议详见CONSTANT中PathTypes |
| password | String类型 | 必选 | 密码 |
 
**		平台支持:		**
Android2.2+					
 iOS6.0+					
**	版本支持:		**
3.0.0+					
**			示例:		**
							   [见附录1](#3、附录一 "见附录1")					
> ### 			unzip		解压缩文件		

`uexZip.unzip(srcPath,zippedPath)				`	
**  			说明:**
解压缩文件					
** 			参数:		**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| srcPath | String类型 | 必选 |  要解压缩的文件路径，路径协议详见CONSTANT中PathTypes|
| zippedPath| String类型 | 必选 | 解压缩后的文件路径，路径协议详见CONSTANT中PathTypes |
 
**		平台支持:		**
Android2.2+					
iOS6.0+					
**		版本支持:**
3.0.0+					
**		示例:		**
							   [见附录1](#3、附录一 "见附录1")					
> ### 			unzipWithPassword		解压缩加密的文件		

`uexZip.unzipWithPassword(srcPath,zippedPath,password)					`
** 			说明:		**
解压缩加密的文件					
回调 [cbUnZip](#cbUnZip 解压缩的回调方法，解压缩完成时被调用  "解压缩的回调方法") 
** 			参数:		**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| srcPath | String类型 | 必选 |  要解压缩的文件路径，路径协议详见CONSTANT中PathTypes|
| zippedPath| String类型 | 必选 | 解压缩后的文件路径，路径协议详见CONSTANT中PathTypes |
| password | String类型 | 必选 | 解压密码 |
 
**	平台支持:		**
Android2.2+					
iOS6.0+					
**	版本支持:		**
3.0.0+					
**	示例:		**
							   [见附录1](#3、附录一 "见附录1")					

##2.2、回调方法
> ### cbZip 压缩的回调方法，压缩完成时被调用 

`uexZip.cbZip(opId,dataType,data)					`
**		参数:		**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | String类型 | 必选 |  操作ID，在此函数中不起作用，可忽略|
| dataType| Number类型 | 必选 | 返回数据类型为uex.cInt。详见CONSTANT中CallbackDataTypes|
| data | Number类型 | 必选 | 返回uex.cSuccess或者uex.cFailed。详见CONSTANT中CallbackIntValue |

**	版本支持:		**
3.0.0+					
> ### cbUnZip 解压缩的回调方法，解压缩完成时被调用 

`uexZip.cbUnZip(opId,dataType,data)		`			
**	参数:		**

|  参数名称 | 参数类型  | 是否必选  |  说明 |
| ------------ | ------------ | ------------ | ------------ |
| opId | String类型 | 必选 |  操作ID，在此函数中不起作用，可忽略|
| dataType| Number类型 | 必选 | 返回数据类型为uex.cInt。详见CONSTANT中CallbackDataTypes|
| data | Number类型 | 必选 | 返回uex.cSuccess或者uex.cFailed。详见CONSTANT中CallbackIntValue |
 
**	版本支持:		**
3.0.0+					

# 3、附录一
**	示例:		**

```
<!DOCTYPE HTML>
            <html>
            <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1.0, user-scalable=no" />
            <link rel="stylesheet" type="text/css" href="../css/index.css">
            <title>压缩/解压缩功能</title>
            <script type="text/javascript">
            function zip(){
            uexZip.zip("wgt://data/inziptest","wgt://data/outziptest.zip");
            } 
            function zipWithPassword(){
            uexZip.zipWithPassword("wgt://data/inziptest","wgt://data/outziptestP.zip","1234");
            }            
            function unzip(){
            uexZip.unzip("wgt://data/outziptest.zip","wgt://data/outzip");
            }  
            function unzipWithPassword(){
            uexZip.unzipWithPassword("wgt://data/outziptestP.zip","wgt://data/outzipP","1234");
            }        
            
            window.uexOnload = function(){
            uexWidgetOne.cbError = function(opCode, errorCode, errorInfo){
            alert(errorInfo);
            }
            
            //uexZip.cbZip解压成功的回调函数
            uexZip.cbZip = function(opCode, dataType, data){
            
            if (data == 0) {
            alert("压缩成功");
            }
            else {
            alert("压缩失败");
            }
            }
            //uexZip.cbUnZip解压缩成功的回调函数
            uexZip.cbUnZip = function(opCode, dataType, data){
            if (data == 0) {
            alert("解压成功");
            }else {
            alert("解压失败");
            }
            }
            }
            </script>
            </head>
            <body>
            <div class="tit">
            压缩/解压缩功能
            </div>
            <div class="conbor">
            <div class="consj">
            <input class="btn" type="button" value="压缩指定的文件夹" onClick="zip();">
            <input class="btn" type="button" value="加密压缩指定的文件夹" onClick="zipWithPassword();">
            <input class="btn" type="button" value="解压指定的文件" onClick="unzip();">
            <input class="btn" type="button" value="解压加密的文件" onClick="unzipWithPassword();">
            </div>
            </body>
            </html>
        
```
#3、更新历史
 API 版本：uexZip-3.0.2(iOS) uexZip-3.0.1（Android）
最近更新时间：2015-06-19

|  历史发布版本 | iOS更新  | 安卓更新  |
| ------------ | ------------ | ------------ |
| 3.0.2  |  解决压缩和解压缩大文件时，卡屏问题 |   |
| 3.0.1  | 使用新版Xcode重新编译,支持arm64  |修复非压缩文件也能解压成功的问题 |
| 3.0.0  | zip压缩解压功能插件  | zip压缩解压功能插件|
 