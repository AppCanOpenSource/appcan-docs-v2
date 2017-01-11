package com.zywx.myapplication;

import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.View;

import org.zywx.wbpalmstar.engine.AppCan;

public class MainActivity extends FragmentActivity{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void testEngine(View view) {
        AppCan.getInstance().start(MainActivity.this,null);

    }

}
