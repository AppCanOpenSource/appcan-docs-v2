package com.zywx.myapplication;

import android.app.Application;

import org.zywx.wbpalmstar.engine.AppCan;

/**
 * Created by ylt on 2016/10/28.
 */

public class TestApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        AppCan.getInstance().initSync(this);

    }
}
