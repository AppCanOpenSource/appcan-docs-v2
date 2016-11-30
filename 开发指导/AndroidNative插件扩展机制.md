/*
Sort: 3            //文档排序，值为数值。冒号为英文冒号，且后带一个英文空格。
Toc: 1             //是否显示常用入口字段，代替之前的层级目录。1:显示，0或不写:不显示。冒号为英文冒号，且后带一个英文空格。
Title: AndroidNative插件扩展机制
keywords: appcan开发文档,AndroidNative插件扩展机制 
description: Android的开发环境搭建主要包括JDK、Eclipse、Android SDK的安装。本文档对于环境的配置以及扩展插件的开发都做了详细介绍。更多appcan开发文档，请见http://newdocx.appcan.cn
*/




# **说明**

本教程基于Android Studio（推荐），AppCan 引擎4.0版本以上

Eclipse 开发请参考链接：[AndroidNative插件扩展机制](http://newdocx.appcan.cn/newdocx/docx?type=1366_1291)

# **1.开发环境搭建**

已经有Android开发环境的可以略过本段

 Android的开发环境搭建主要包括JDK、Android Studio的安装。

####  **1.1.JDK安装验证**

  安装完成之后，可以在检查JDK是否安装成功。打开终端，输入java –version 查看JDK的版本信息。出现类似下面的画面表示安装成功了：

 ![QQ20161104-3@2x](/docximg/openSource-native-capability-dev/QQ20161104-3@2x.png)

#### **1.2.Android Studio**

 Android Studio 的安装教程网上有很多，请自行搜索一下，可能需要使用代理

官网地址：https://developer.android.com/studio/index.html 

# **2.扩展插件的开发**

#### **2.1.开发流程**
###### **2.1.1.插件开发基本流程**

** 1. 插件开发基础工程搭建**

Demo地址：https://github.com/AppCanOpenSource/appcan-plugin-demo-android/tree/master

将Demo代码 下载或者clone到本地，然后用Android Studio导入工程：

`File`-->`New`—>`Import Project...`,选择你下载的文件夹之后，等待导入完成：

 ![QQ20161104-0@2x](/docximg/openSource-native-capability-dev/QQ20161104-0@2x.png)

点击左上角的`Android`切换为`Project`：

 ![QQ20161104-1@2x](/docximg/openSource-native-capability-dev/QQ20161104-1@2x.png)

此工程为插件开发基础工程,工程内res及assets文件夹含有插件开发的必要文件,开发者不要随意删除。

我们可以看到插件工程的目录如下：

```java
├── AppcanPluginDemo-Gradle.iml
├── README.md
├── build.gradle
├── gradle
├── gradle.properties
├── gradlew
├── gradlew.bat
├── /docximg/openSource-native-capability-dev
├── local.properties 
├── settings.gradle
└── uexDemo //插件开发工程module
    ├── AndroidManifest.xml //插件开发工程的AndroidManifest.xml
    ├── LICENSE
    ├── assets
    │   └── widget //前端代码在这里
    ├── build
    ├── build.gradle
    ├── project.properties
    ├── res
    │   ├── layout
    │   ├── values
    │   ├── values-en
    │   ├── values-v11
    │   ├── values-v14
    │   └── xml
    │       └── plugin.xml //插件的配置信息，用于引擎反射调用插件，
    ├── src
    │   └── com
    ├── uexDemo  //生成插件包的目录。不参与插件开发工程编译
  				//该文件夹应该在插件开发调试完毕后，拷贝相关文件至目录下，最后生成插件Zip包。
    │   ├── dex  //IDE插件需要用到的
    │   ├── info.xml //插件的配置信息，用与网站，IDE等读取插件信息
    │   ├── jar //插件开发用到的第三方Jar，AppCan引擎没有内置的都属于第三方Jar
    │   └── plugin.xml //插件的配置信息，用于引擎反射调用插件，
    └── uexDemo.iml
```



** 2. Gradle 相关的一些说明**

1）. 引擎采用远程aar依赖的方式，插件moudle级别目录下`build.gradle`如下部分：

```groovy
dependencies {
    compile fileTree(include: '*.jar', dir: 'libs')
    compile 'org.appcan:engine:+:systemRelease@aar' //该配置为始终依赖最新引擎，如果想改为指定版本则把"+"改成指定版本号即可，如："4.0.0"
}


repositories {
    flatDir {
        dirs 'libs'
    }
    maven {
        url 'https://raw.githubusercontent.com/android-plugin/mvn-repo/master/' //引擎aar仓库地址
    }
}
```



2）. 生成插件包的gradle 部分也采用远程依赖的方式，方便统一处理问题

```groovy
apply from: "https://raw.githubusercontent.com/android-plugin/gradle-plugin/master/buildPlugin.gradle"
```

3）. 引擎已经开启multiDex，因此插件工程中需要该配置：

   ```groovy
    defaultConfig {
           minSdkVersion 14
           targetSdkVersion 14 //
           applicationId 'org.zywx.wbpalmstar.widgetone.uexDemo'
           multiDexEnabled true
    }
   ```

4）.  目前插件工程的`target` 不能设置为19以上，否则前端页面会错乱，建议14

** 3. 插件入口类编写**

  编写插件代码时，应当有至少一个入口类，需要说明的是，此类须继承基础类EUExBase类，并实现或重写父类的相关方法，随后我们就可以按照自己的功能需求编写代码了。

  本例以插件uexDemo为例，其入口类为EUExDemo，其中定义一个test_startActivityForResult方法，该方法通过startActivityForResult方法启动一个新的activity，并在activity销毁的时候返回数据。返回的数据通过回调方法回调给网页。其代码如下：
```java
    // this case start a Activity: HelloAppCanNative
    public void test_startActivityForResult(String[] parm) {
        Intent intent = new Intent();
        intent.setClass(mContext, HelloAppCanNativeActivity.class);
        try {
            startActivityForResult(intent, 1);
        } catch (Exception e) {
            Toast.makeText(mContext, "找不到此Activity!!", Toast.LENGTH_LONG)
                    .show();
        }
    }

    static final String func_activity_callback = "uexDemo.cbStartActivityForResult";
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == 1) {
            JSONObject jsonObject = new JSONObject();
            try {
                if (resultCode == Activity.RESULT_OK) {
                    String ret = data.getStringExtra("result");
                    jsonObject.put("result", ret);
                } else {
                    jsonObject.put("result", "cancel");
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
            callBackPluginJs(func_activity_callback, jsonObject.toString());
        }
    }

    private void callBackPluginJs(String methodName, String jsonData){
        String js = SCRIPT_HEADER + "if(" + methodName + "){"
                + methodName + "('" + jsonData + "');}";
        onCallback(js);
    }
```
> 注意: 定义所有的插件方法时必须带字符串数组类型（String[]）的参数，即使该接口不需要接收参数。

 	 如上代码中定义了`test_startActivityForResult`方法和`uexDemo.cbStartActivityForResult`回调方法。

** 4. 插件配置文件编写**

  入口类中定义好方法后，需要在配置文件(res/xml/plugin.xml)中做一些配置才能被调用。只有方法需要在插件配置文件中配置，回调方法不需要在配置文件中配置。配置文件代码如下：
```xml
<?xml version="1.0" encoding="utf-8"?>
<uexplugins>
    <plugin
        className="com.test.EUExDemo" uexName="uexDemo" >
        <method name="test_startActivityForResult" />
    </plugin>
</uexplugins>
```
  在`plugin.xml`文件中，最外部的标签统一`<uexplugins>`,接下来配置`<plugin>`标签,此标签包含两个属性，`className`为入口类的包名加类名(引擎通过该属性反射调用入口类，因此不能配置错)，`uexName`即是插件名称（即注入给前端的对象）。最后需要配置子标签`<method>`，子标签的`name`属性即为入口类内已经编写好的方法。

** 5. Html页面调用插件配置**

  入口类和插件配置文件都配置完毕,现在需要在html页面调用插件的方法。

  注意到在工程assets/widget/下,有一个`config.xml`文件，其中的`<content src="index.html" encoding="utf-8"></content>`标签中的`src`属性即指定了程序的起始页面，本例中`index.html`即为程序的入口页面。

  在网页内编写代码，实现调用uexDemo插件中的test_startActivityForResult方法，调用方式为:**插件名称.方法名(参数)**,具体代码如下：
```html
<input class="btn" type="button" value="test_startActivityForResult" onclick="uexDemo.test_startActivityForResult();">
```

而回调方法需要在uexOnload中定义。如下：
```javascript
    window.uexOnload = function(type){
        if(type == 0){  
            uexDemo.cbStartActivityForResult = funcD1;
        }
    }

    function funcD1(data){
        alert(data);
    }
```

也可以直接定义成：
```javascript
    window.uexOnload = function(type){
        if(type == 0){  
            uexDemo.cbStartActivityForResult = function(data){
                alert(data);
            };
        }
    }
```

** 6. AndroidManifest.xml配置**

  AndroidManifest.xml文件，引擎的aar已经内置了一部分权限。可以通过`Merged Manifest`查看已经存在的权限等信息：

 ![QQ20161104-2@2x](/docximg/openSource-native-capability-dev/QQ20161104-2@2x.png)

开发者只需要向该文件中添加一些插件所需的内容，比如新添加一个activity或者service的注册，新添加一个权限等。

如本例中增加的`HelloAppCanNativeActivity`,注册在`AndroidManifest.xml`中即只需在`<application>`标签中添加`<activity>`子标签。
```
    <activity android:name="com.test.HelloAppCanNativeActivity"/>
```

** 7. 测试插件**

 运行程序,即可跳转到`index.html`界面;点击对应按钮,即可实现方法的调用。

###### **2.1.2.生成插件包**

插件开发调试完毕后，就可以生成插件包了。

```java
├── AppcanPluginDemo-Gradle.iml
├── README.md
├── build.gradle
├── gradle
│   └── wrapper
├── gradle.properties
├── gradlew
├── gradlew.bat
├── /docximg/openSource-native-capability-dev
│   └── buildPlugin.gif
├── local.properties
├── settings.gradle
└── uexDemo
    ├── AndroidManifest.xml
    ├── LICENSE
    ├── assets
    ├── build
    ├── build.gradle
    ├── project.properties
    ├── res
    ├── src
    ├── uexDemo //此目录即为生成插件包的目录，请重命名为自己的插件名。否则会出包失败
    └── uexDemo.iml

```



**插件目录文件夹的名称必须和插件名称保持一致，并且和插件包中的info.xml文件中的uexName的属性值一致**，否则上传官网时会提示插件目录结构错误。本例中都为`uexDemo`如下图：

```xml
<?xml version="1.0" encoding="utf-8"?>
<uexplugins>
    <plugin
        uexName="uexDemo" version="3.0.0" build="0">
        <info>0:测试插件Demo</info>
    </plugin>
</uexplugins>
```



  插件包中共包含的文件如下所示：

```
├── AndroidManifest.xml
├── dex
├── info.xml
├── jar
├── plugin.xml
├── res
└── so

```

下面详细介绍每一部分的生成方法。

###### **2.1.2.1.plugin.xml文件**

**该文件为必须文件**。将Project根目录`uexDemo/res/xml/plugin.xml`拷贝至插件包根目录即可
###### **2.1.2.2.info.xml文件**

**该文件为必须文件**。主要用于说明插件版本信息和更新内容等。info.xml文件的内容如下：
```xml
<?xml version="1.0" encoding="utf-8"?>
<uexplugins>
    <plugin
        uexName="uexDemo" version="3.0.0" build="0">
        <build>0:测试插件Demo</build>
    </plugin>
</uexplugins>
```
>**uexName**：代表插件名字。

>**version**：代表当前插件的版本号，打包服务器可通过解析info.xml文件得到插件的版本信息。

>**build**：代表当前插件的小版本，内部使用。

>**info**：代表当前插件版本修改信息，打包服务器可通过解析info.xml文件得到插件的版本更新内容。

###### **2.1.2.3.AndroidManifest.xml**

  配置本插件中用到的activity、service、receiver权限，以及应用的属性，例如横竖屏启动等等。可参考AppcanPluginDemo3.0 工程中的AndroidManifest.xml文件。
**注意：**
该文件是非必须文件，在开发者需要在Demo工程基础之上添加内容时，该文件才必须。而且该文件中**只需包含添加的部分**，其余信息一概删除，否则会出现打包失败的情况。如本例中只添加了`HelloAppCanNativeActivity`的注册，那么插件包里面的`AndroidManifest.xml`就只包含以下信息：
```
<?xml version="1.0" encoding="utf-8"?>
<manifest>
    <activity android:name="com.test.HelloAppCanNativeActivity"/>
</manifest>
```
若需要添加其他的注册或权限，可直接同理于上例中的写法。如还添加了权限，可直接写成：
```
<?xml version="1.0" encoding="utf-8"?>
<manifest>
    <activity android:name="com.test.HelloAppCanNativeActivity"/>

    <uses-permission android:name="android.permission.INTERNET" />
</manifest>
```

###### **2.1.2.4.jar文件夹**

插件module libs下自己添加的Jar拷贝至此目录。如本例中就没有第三方jar文件。

###### **2.1.2.5.so文件夹**

该文件夹中存放插件中**新增**的.so文件。且只能包含插件源码中libs目录下armeabi文件夹中新增的.so文件。

> 没有其他类型如"x86"的so是因为很多三方sdk没有提供全部类型的so,应用会崩溃。如果自己的插件需要AppCan其他类型的so，可以到https://github.com/AppCanOpenSource/appcan-plugin-demo-android/tree/eclipse下载。
>
> 把其他类型的so文件夹放入插件so目录下,然后加上对应类型AppCan的so即可，打包时会合并
>
> 如需要加入`armeabi-v7a`类型so：
>
> ```java
> .
> ├── AndroidManifest.xml
> ├── dex
> ├── info.xml
> ├── jar
> ├── plugin.xml
> ├── res
> └── so 
>     ├── armeabi-v7a
>     │   └── xxx.so
>     │   └── libappcan.so
>     └── xxx.so
>
> ```

###### **2.1.2.6.res文件夹**

该文件夹中存放插件中**新增**的资源文件，不包含Demo中原有的资源文件。注意存放的时候需要保持文件的相对路径。
这里的新增包含两个部分：
>一是新增的整个文件，比如本例中的`plugin_uex_demo_test_view.xml`文件，是插件中新增的布局资源文件。

>二是新增的字符串或者颜色值。即在原有的文件基础上添加字段。如本例中的`plugin_uex_demo_test_view.xml`文件中用到的`android:textColor="@color/plugin_uexDemo_textColor"`，就需要在colors.xml中添加字段:`<color name="plugin_uexDemo_textColor">#000000</color>`。那么插件包的res文件夹中就需包含`colors.xml`文件，并且其中只能包含本插件新增的内容，其余删掉。如下：

```
<?xml version="1.0" encoding="UTF-8"?>
<resources>
    <!--uexDemo use-->
    <color name="plugin_uexDemo_textColor">#000000</color>
</resources>
```

资源文件的相对位置需要保持，如在插件源码里面，colors.xml的目录结构为`res/values/colors.xml`。那么在插件包uexDemo文件夹中colors.xml文件需要建立同样的目录结构。具体参考Demo中的uexDemo插件包示例。

###### **2.1.2.7.dex文件夹**

IDE打包时使用，该文件夹内容由脚本自动生成，开发者无需关心

###### **2.1.2.8.生成插件包**

前几步操作完成之后，有两种方式生成插件包

1：命令行生成

```shell
gradle buildPlugin
```

2：找到 `Gradle(IDE右上角)—>XXX—>Tasks—>other—>buildPlugin  `双击即可

 ![buildPlugin](/docximg/openSource-native-capability-dev/buildPlugin.gif)

> 如果生成插件失败，请检查`info.xml`是否配置正确，插件包的文件夹名是否正确

###### **2.1.3.插件包目录结构命名规范**

  插件文件的命名可任意，但在AppCan中有统一的命名规范，为了保持一致扩展插件的开发也要符合命名规范。

###### **2.1.3.1.plugin.xml中类及方法的命名**

  plugin.xml文件位于res目录下的xml目录中，是配置自定义native Plugin调用对象的xml文件，如果需要自定义对象和开发原生插件，必须在此文件中配置自定义js对象名和java类的包名类名。下面以AppcanPluginDemo3.0 插件为例：
```xml
<?xml version="1.0" encoding="utf-8"?>
<uexplugins>
    <plugin
        className="com.test.EUExDemo" uexName="uexDemo" >
        <method name = "test_startActivityForResult" />
        <method name = "test_addView"/>
        <method name = "test_removeView"/>
        <method name = "test_vibrator" />
        <method name = "test_showInputDialog" />
        <method name = "test_addFragment" />
        <method name = "test_removeFragment" />
    </plugin>
</uexplugins>
```
>**uexName**：为封装的js对象的名称，以uex前缀开头，即uex+对象英文名称；

>**className**：与js对象映射的java对象的路径包名及类名，建议命名为EUEx前缀+名称；

>**method**：插件对象中的方法名称，依旧符合驼峰命名法，回调网页的函数不需要写入到此文件中，但是应写到插件的API文档中。

###### **2.1.3.2.类的命名**

  插件入口类的命名前缀为EUEx，即类的命名规范为EUEx+对象英文名称，例如EUExDemo。当然这个命名规范不是必须的，但是必须保证插件入口类的类名和plugin.xml中的类名一致即可。

###### **2.1.3.3.方法的命名**

  方法名符合驼峰命名法，例如下载插件中的创建下载对象“createDownloader”，和下载“download”。值得注意的是，这里的方法名要与plugin.xml中的相应类下的method name保持一致，否则会调用失败。

###### **2.1.3.4.jar包的命名**

  扩展插件最终是以“.jar”的形式提交到服务器，也要符合我们的命名规范，即plugin_+插件名称。其中插件名称要和plugin.xml中的uexName一致。例如plugin_uexDemo.jar，和下载管理插件plugin_DownloaderMgr.jar等。

###### **2.1.3.5.资源文件的命名**

命名规则为plugin_+plugin对象名_+其他信息（须使用小写命名规范），例如`plugin_uexdemo_xxx.png`、`plugin_uexdemo_yyy.xml`、 ``<string name=" plugin_uexdemo_zzz ">`等等。

#### **2.2.插件开发注意事项**

编写插件代码时，应当有至少一个入口类，提供给前端使用，此类须继承plugin的基础类EUExBase类，然后实现或重写相关函数，并添加自定义的接口方法与plugin.xml中的method对应。开发插件中可能遇到的常见问题，请查看下文中的插件开发中常见问题部分。

###### **2.2.1.插件与前端通讯**

定义插件中的方法时参数必须为字符串类型的数组，如下：
```
    public void test_startActivityForResult(String[] parm) {
        Intent intent = new Intent();
        intent.setClass(mContext, HelloAppCanNativeActivity.class);
        try {
            startActivityForResult(intent, mMyActivityRequestCode);
        } catch (Exception e) {
            Toast.makeText(mContext, "找不到此Activity!!", Toast.LENGTH_LONG)
                    .show();
        }
    }
```
其中参数形式必须为`String[] parm`(即使不需要接收参数，方法也必须带字符串数组的参数),`parm`字符串数组的长度即为定义的接口参数的个数。如Demo中`test_addView`接口需要传递四个参数，开发者有两种方式定义参数样式。

###### **2.2.1.1.传统方式**

接口方法代码如下：
```
    public void test_addView(String[] parm) {
        if (parm.length < 4) {
            return;
        }
        int left = (int) Double.parseDouble(parm[0]);
        int top = (int) Double.parseDouble(parm[1]);
        int width = (int) Double.parseDouble(parm[2]);
        int height = (int) Double.parseDouble(parm[3]);
    }
```
前端调用代码为：`uexDemo.test_addView(0,0,500,500);`

这种方式传递参数理论上是可以的，但并非是最优的方案。对于插件的扩展性来说存在缺陷。因此建议开发者在定义接口方法时采用json数据格式传递。如下：

###### **2.2.1.2.json数据格式方式**

接口方法代码如下：
```
    public void test_addView(String[] parm) {
        if (parm.length < 1) {
            return;
        }
        ViewDataVO dataVO = DataHelper.gson.fromJson(parm[0], ViewDataVO.class);
        int left = dataVO.getLeft();
        int top = dataVO.getTop();
        int width = dataVO.getWidth();
        int height = dataVO.getHeight();
    }
```
这里简化了json解析的步骤，引擎中封装了gson库，可直接解析json字符串。其中与参数对应的数据结构可单独定义为一个类ViewDataVO，代码如下：
```java
public class ViewDataVO implements Serializable{

    private static final long serialVersionUID = 1194828283585702120L;

    private double left;
    private double top;
    private double width;
    private double height;

    private boolean isScrollWithWebView = true;

    public int getLeft() {
        return (int) left;
    }

    public void setLeft(double left) {
        this.left = left;
    }

    public int getTop() {
        return (int) top;
    }

    public void setTop(double top) {
        this.top = top;
    }

    public int getWidth() {
        return (int) width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public int getHeight() {
        return (int) height;
    }

    public void setHeight(double height) {
        this.height = height;
    }
}
```
注意该类必须实现Serializable类，并且其中的get和set方法必须定义。
前端调用代码为：
```javascript
        var params = {
            left:0,
            top:500,
            width:400,
            height:400
        }
        uexDemo.test_addView(JSON.stringify(params));
```

**注意前端的json字段关键字必须和ViewDataVO中变量名称对应。**该种方式便于扩展，并且可以用json关键字简明表示参数含义，也便于理解。因此建议开发者采用第二种json数据格式传递方式。

###### **2.2.1.3.支持前端Funtion传入**

现在前端调用插件时可以直接传入Function。

Android引擎中`EUEXBase`提供的接口为:

```java
/**
* 异步回调到JS
* @param callbackId 回调ID，该值由插件接口被调用时传入
* @param hasNext 是否有下一次回调。没有传false ，有传true。如一个收消息的回调，消息一直有下一次回调，则需要传true
* @param args 参数可以是任何对象，直接回调对象可使用DataHelper.gson.toJsonTree()方法
*/
public void callbackToJs(int callbackId,boolean hasNext,Object... args)
```

其中`callbackId`是由插件接口中传入的。如：

```java
public void test(String[] params){
  String jsonStr= (String) params[0];
  ResultVO resultVO=new ResultVO();
  resultVO.setResult(true);
  callbackToJs(Integer.parseInt(params[1]),false,"字符串测试...",DataHelper.gson.toJsonTree(resultVO),666);
}
```

该接口中定义`params`数组中第二个参数为`function`,那么`params[1]`中的值即为该`function`的Id。对应的JS代码为：

```javascript
uexWindow.test(paramStr,function(result/*String 类型*/,json/*Json对象类型*/,code/*Number 类型*/){
	console.log("---------callback---------"+result+json.result+code);
});
```

如果插件回调接口需要判断是否成功，统一规范第一个参数为int 类型，0表示 成功，非0表示失败，如：

```javascript
function(error,...){
  if(!error){
    alert('成功')
  }else{
    alert('失败')
  }
}
```

###### **2.2.1.3.同步返回**

如果接口不是耗时操作，且需要返回值。应尽量采用同步返回的方式。如Demo中的`openv()`接口。支持直接返回对象。

> 插件的方法调用全部在UI线程中，耗时的操作请开子线程处理。否则会卡顿
>
> `callbackToJs()`方法已经是在主线程中执行，插件回调时不需要再转主线程



###### **2.2.2.获取资源文件id**

获取资源文件的id必须通过EUExUtil工具类获取，不能直接通过R文件引用方式。如要引用布局资源文件，可通过如下代码获取布局资源文件id：

```java
    int layoutId = EUExUtil.getResLayoutID("plugin_uex_demo_test_view");
    View view = LayoutInflater.from(mContext).inflate(layoutId, null);
    TextView textView = (TextView) view.findViewById(
        EUExUtil.getResIdID("plugin_uexdemo_textview_id"));
    Button button = (Button) view.findViewById(
        EUExUtil.getResIdID("plugin_uexdemo_button_id"));
```

> TIPS：在实际开发时可以正常使用`R.XXX.XXX`编写代码，开发完成后使用正则全局替换即可。可以参考如下正则：
>
> `\(R\.id\.(.*?)\)`
> `\(EUExUtil\.getResIdID\("$1"\)\)`
>
> `\(R\.drawable\.(.*?)\)`
> `\(EUExUtil\.getResDrawableID\("$1"\)\)`
>
> `\(R\.layout\.(.*?)\)`
> `\(EUExUtil\.getResLayoutID\("$1"\)\)`
>
> `\(R\.raw\.(.*?)\)`
> `\(EUExUtil\.getResRawID\("$1"\)\)`
>
> 最后查找“你的AndroidManifest.xml 中设置的包名.R”看是否替换完全

###### **2.2.3.在窗口上添加原生布局**

由于从2015年11月13日之后的引擎版本做了比较大的升级，去掉了引擎中的ActivityGroup机制，于是在窗口上添加原生布局的方案不能再使用ActivityGroup来管理。而是使用自定义View的形式或者fragment机制。

**2.2.3.1.自定义View方式**

一般的原生布局都可以通过该种方式实现。定义一个类继承自线性，相对或其他布局。在其中可直接添加控件，或者引用其他布局文件，并做些交互。具体使用方式可参见插件源码中的`test_addView`方法。

**2.2.3.2.fragment方式**

建议开发者在添加一些简单的view的时候使用第一种自定义View方式，但是如果要添加一些比较复杂的布局，或者必须在activity的生命周期中做一些特殊处理的，可用fragment方式，fragment中有activity中相对应的生命周期。具体使用方式可参见源码中的`test_addFragment`方法。

这里需要留意的是，引擎中封装了两种方法添加原生布局，一种是添加到当前窗口，另一种添加到webview上。二者的区别是，前者位置固定，不跟随网页的滚动而滚动，后者跟随网页的滚动而滚动。示例Demo中关于这两种方式的使用方法，开发者可自行选择。

**需特别注意，原来自定义插件时添加了原生布局并且用的是ActivityGroup结合LocalActivityManager机制方式的已经不能和最新引擎打包使用，需要开发者及时做出更改。**

###### **2.2.4.拦截Application和Activity的生命周期**

引擎中封装了一些可拦截的生命周期方法，如下：
````java
    public static void onApplicationCreate(Context context)
    public static void onActivityCreate(Context context)
    public static void onActivityStart(Context context)
    public static void onActivityReStart(Context context)
    public static void onActivityResume(Context context)
    public static void onActivityPause(Context context)
    public static void onActivityStop(Context context)
    public static void onActivityDestroy(Context context)
````

  使用方式：

  在入口类中重写上述生命周期对应的方法。
````java
    public static void onApplicationCreate(Context context) {
        if (context instanceof WidgetOneApplication) {
            WidgetOneApplication application = (WidgetOneApplication) context;
        }
    }

    public static void onActivityCreate(Context context) {
        if (context instanceof EBrowserActivity) {
            EBrowserActivity activity = (EBrowserActivity) context;
        }
    }
````
**注意不可在生命周期方法内做耗时的操作，否则会出现页面卡死的现象。**

# **3.插件开发中常见问题**

#### **3.1.插件在测试中未正确运行**

  > 表现：

  在eclipse中提示引擎错误，或者无法接收到原生插件传到前端的回调信息。

>   可能原因：

  1、plugin.xml文件配置错误（检查className与前端调用时使用的插件名是否一致）；

  2、info.xml文件配置错误（此文件为AppCan3.0引擎新增加的机制，必须正确配置到插件包中并填写插件相应信息，详细做法参照上文中的info.xml文件的介绍）；

  3、传递json字符串参数时应当注意，表示js字符串的引号最好用单引号，防止与json数据中的双引号产生歧义；或者最外层可以用双引号，但是内部的双引号要用 “” 转义；

  4、clean()方法为引擎再切换页面时自动调用，在其中不应处理一些页面间共享的数据的回收；

  5、若要在其他activity或者对象中向网页端回调信息，不应传递插件对象，应当定义一个回调接口并生成对象完成回调工作。



#### **3.2.插件上传后打包应用失败**

 >  表现：

  在AppCan SDK移动应用开发系统中提示打包失败。

>   可能原因：

  1、插件包中的资源文件缺少；

  2、插件包结构错误（必须包含必备的目录结构，jar文件夹中要有引用的jar包和so文件，还应包含info.xml 、 plugin.xml）；

  3、资源文件存在问题（如xml格式错误、9patch图片制作出错等）。



#### **3.3.AndroidManifest常见问题**

>  表现：

  在AndroidManifest下添加的属性不起作用

 >  可能原因：

  更改或添加了application节点下的相关属性(插件在最后打包时,不会提交application节点,故更改不起作用,开发者不要手动修改application节点)。

<p class="text-center" > <a style="color:#fff"class="btn btn-primary btn-lg" href="http://dashboard.appcan.cn/register" target="_blank" role="button">免费注册，快速体验</a>
</p>