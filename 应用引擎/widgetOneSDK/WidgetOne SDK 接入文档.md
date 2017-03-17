#  AppCan WidgetOne SDK 接入文档(Android)

## 添加依赖

添加依赖可以通过aar直接集成或者通过服务器导出的WidgetOne SDK集成

### 引擎通过aar集成

1. 将`Engine-system-release-4.0.0.aar`拷入`libs`目录，[下载地址](https://raw.githubusercontent.com/android-plugin/mvn-repo/master/org/appcan/engine/4.0.0/engine-4.0.0-systemRelease.aar)

2. 在Application moudle `build.gradle`中加入如下配置：

   ```groovy
   repositories {
       flatDir {
           dirs 'libs'
       }
   }

   dependencies {
       compile(name: 'engine-4.0.0-systemRelease', ext: 'aar')
   }
   ```

### 通过服务器导出WidgetOne SDK

如果服务器支持直接导出WidgetOne SDK，为了后续维护方便，建议新建一个library工程。

然后把对应的libs，res，assets，AndroidManifest.xml拷贝到对应的目录即可。

最后把该library工程作为原工程的依赖即可。

## 相关工程配置

### AndroidManifest.xml

aar可以直接用解压文件打开修改然后保存

#### Application 节点

```xml

      android:name="org.zywx.wbpalmstar.widgetone.WidgetOneApplication"
        android:allowBackup="false"
        android:allowClearUserData="false"
        android:debuggable="false"
        android:icon="@drawable/icon"
        android:label="@string/app_name"
```

如果有自己的Application，此段可以去掉。硬件加速开关可以根据情况进行更改

#### LoadingActivity 节点

```
<category android:name="android.intent.category.LAUNCHER" />
```

删掉此行，不然桌面会有两个应用图标

### libs文件夹

如果原来工程中已经有了相应的jar，则删掉libs中对应的jar，如常见的`android-support-v4.jar`

### build.gradle

`targetSDkVersion`需要设置为17以下

## 代码添加

1. 初始化AppCan引擎

   > 初始化尽量在`Application.create()` 中进行，否则某些插件可能无法正常运行。
   >
   > 原因：某些多进程的第三方sdk，需要在其他进程初始化，`Application.onCreate()`会执行多次。如网易云信。

   同步初始化：

   ```java
   AppCan.getInstance().initSync(this);
   ```

   异步初始化：

   ```java
   AppCan.getInstance().init(this, new OnAppCanInitListener() {
               @Override
               public void onInit() {
        
               }

               @Override
               public void onError() {

               }
   });
   ```

   ​

2. 打开页面

   ```java
   AppCan.getInstance().start(MainActivity.this,null);
   ```

   需要自定义起始页可以调用：

   ```java
   AppCan.getInstance().start(Activity activity,String indexUrl,Bundle bundle)
   ```

   `bundle`为需要传给起始网页的参数，可以在网页中通过`uexWidget.onLoadByOtherApp()`监听获取到

## 源码调试

### 调试引擎源码：

引擎源码地址：https://github.com/AppCanOpenSource/appcan-android

#### 1. 删除引擎jar

aar文件需要删除`classes.jar`

library工程需要删除`libs`目录下的`AppCanEngine-system(内核)-x.x.x(版本).jar`

#### 2. 添加引擎jar的对应版本源码

clone对应版本引擎jar 的源码

拷贝源码的`appcan-android/Engine/src/main/java`下的全部文件合并至library工程的`src`目录下或者`src/main/java`(视情况而定，工程的source目录)

拷贝源码的`appcan-android/Engine/src/system(内核)/java`下的全部文件合并至library工程的`src`目录下或者`src/main/java`(视情况而定，工程的source目录)

> 引擎有三种内核，crosswalk,x5,system，对应于gradle的flavor

### 调试插件源码：

#### 1. 删除插件jar

删除libs目录下的`plugin_uexXXX(插件名).jar`

#### 2. 添加插件源码

插件源码地址：https://github.com/android-plugin

下载插件对应版本的源码，将`src`目录拷贝合并到library工程的`src`目录

插件版本可以通过`assets/info.xml`文件查看

## 其他

### 监听返回事件

可以调用如下方法监听返回事件

```java
AppCan.getInstance().registerFinishCallback(new OnAppCanFinishListener() {
  
     @Override
     public void onFinish(int i, String s) {
                
     }
  
});
```

