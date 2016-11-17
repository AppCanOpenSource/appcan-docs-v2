#  AppCan Widget SDK 接入文档(Android)

## 添加依赖

### Android Studio

1. 将`Engine-system-release-4.0.0.aar`拷入`libs`目录

2. 在Application moudle `build.gradle`中加入如下配置：

   ```groovy
   repositories {
       flatDir {
           dirs 'libs'
       }
   }

   dependencies {
       compile(name: 'Engine-system-release-4.0.0', ext: 'aar')
   }
   ```

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

