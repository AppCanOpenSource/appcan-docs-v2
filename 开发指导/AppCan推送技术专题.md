[TOC]

# 推送应用开发与配置

  1、首先在[官网](http://dashboard.appcan.cn/app/)创建完成新的应用。
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-1.png)

  2、打开IDE并且同步刚才创建的推送应用。
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-2.png)

  3、在IDE中开发平台推送功能所需的代码
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-3.png)

  4、在IDE中把刚才开发的代码通过内置的SVN工具提交至appcan官网。
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-4.png)

![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-5.png)

![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-6.png)

  5、回到appcan官网应用管理界面，点击信息推送按钮。
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-7.png)

  6、进入信息推送主界面，并选择要推送的操作系统平台。
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-8.png)

  7、填写标题（注意：默认为当前应用名称，请不要轻易更改（iOS平台不支持标题的修改），会严重影响用户对应用的辨识度）。
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-9.png)

  8、填写推送内容（注意：填写要推送的内容信息。移动端点击推送来的信息，默认打开应用进入首页。您还可以使用自定义参数设置键值对（key-value），根据不同的键值对实现自定义需求。当您在前台配置好键值对后，将会转成json格式跟随消息下发到APP，开发者可以在APP本地通过uexWidget.getpushinfo()获取）。
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-10.png)	

  9、角标数字（即显示在应用icon上的未读信息条数，只支持iOS平台，可自定义调整，参数为1-99）。
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-11.png)

  10、推送环境（选取环境，配置iOS生产证书或开发证书，只支持iOS平台（说明：http://newdocx.appcan.cn/newdocx/docx?type=1285_1278））。
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-12.png)

  11、推送时间（支持立即推送或定时推送，定时发送需选取未来某一时间，只支持推送1次）。
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-13.png)

  12、离线消息（支持保存用户因网络故障问题不能收到的推送消息，待网络正常后可收到服务器临时缓存的消息，保存最大时长为99个小时）。
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-14.png)

  13、用户范围（支持所有用户推送（群推）和单点用户推送（单推）。开发者需通过uexWidget.setpushinfo() 绑定用户，获取用户信息）。
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-15.png)

  14、推送确认（点击“推送”按钮，完成当前信息推送）。
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-16.png)

# 推送平台统计与推送历史消息记录
  1、点击“推送统计”，选取Android或iOS操作系统将会统计推送信息在某一时间段的推送数、到达数、打开数。
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-17.png)

- **推送数**：即推送至终端的消息数，如一条信息推送给50个用户，则推送数显示为50。
- **到达数**：即信息成功推送至终端数的条数，如一条消息推送给50个用户，只有20个用户成功收到，则到达数为20。现只支持Android平台。
- **打开数**：即终端用户点击信息内容打开当前应用数。
  
  2、点击“推送历史”，将会展示当前应用信息推送的历史记录。
![](https://github.com/AppCanOpenSource/appcan-docs-v2/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC/img/1-18.png)
- 在“已发送”状态下，可“重发”当前信息，单条记录可删除。
- 定时推送，在未到达设定时间前为“待发送”状态，可“取消”当前推送，单条记录可删除。
  
  
# 示例代码和常见问题

## 示例参考代码
```
    //注册推送通知栏点击事件
    uexWidget.setPushNotifyCallback("inCallbackFunction");
    //注册的回调方法：点击应用开启状态收到推送点击信息的回调；应用关闭状态此回调不会进入，因此要在启动app时主动调用该方法
    function inCallbackFunction(){
        uexWidget.cbGetPushInfo=function(opId,dataType,data){
            alert(data);//此处根据参数编写代码逻辑
        }
        //获取推送信息（参数键值对，调用此方法将上报推送消息）
        uexWidget.getPushInfo();
    }
    //绑定推送用户（使用该方法将用户及设备绑定到推送服务器，只有调用该方法后，推送消息时才能将此用户和设备放入接收推送消息的对12.象组中）
    uexWidget.setPushInfo(UID,Uname);
```

## 常见问题

**Q：IOS/Android 在手机APP没有退出的情况下，消息推送是怎么展现的？**
**A**: 手机APP分为两种状态，第一种是应用处于前台，即当前APP的页面正在展示；第二种是应用通过主页键切换至后台。
- 第一种状态在收到推送消息时会直接回调通过uexWidget.setPushNotifyCallback接口设置的回调方法。开发者可以在该回调方法中调用uexWidget.getPushInfo方法去获取接收到的推送消息内容。
- 第二种状态在收到推送消息时，iOS手机会在app上边以角标数字的场景提示用户有未读消息；Android手机会在状态栏弹出消息图标。提示用户有未读推送消息。用户点击相应的通知，会启动应用，应用启动后会直接回调通过uexWidget.setPushNotifyCallback接口设置的回调方法。
 以上两种状态，开发者都可以参考[示例代码](#示例参考代码)来获取推送的信息。

**Q：IOS/Android 在手机APP退出的情况下，消息推送是怎么展现的？**
**A**：在手机APP退出的情况下，若收到推送消息，则消息的展现形式和上一问题中的第二种状态，即应用在后台的展现形式一样。iOS手机会在app上边以角标数字的场景提示用户有未读消息；Android手机会在状态栏弹出消息图标。

**Q：推送信息如何获取的？**
**A**：无论应用处于何种状态，只要收到推送消息，通过uexWidget.setPushNotifyCallback接口设置的回调方法会被调用，开发者可以在该回调方法中调用uexWidget.getPushInfo方法去获取具体的消息内容。[示例代码](#示例参考代码)

**Q：平台推送提示推送消息成功，可是手机上没有收到推送的信息？**
**A**：这种情况一般有以下三种可能：
- 1.在推送代码没有写错的情况下收不到消息是因为网络的原因，要确保手机能够上网。
- 2.推送平台服务自身的问题，常见的场景比如第一次推送正常，手机很快就收到推送的消息了。然后为了测试修改了一下推送的内容，这时网络环境没有变，手机却收不到推送的消息了，或者很长时间才收到消息。
- 3.手机安装了第三方杀毒软件屏蔽了推送服务器发出的推送信息。

