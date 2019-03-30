package com.esportsglobalgamers;

import android.content.Intent;

//import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;

import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.actionsheet.ActionSheetPackage;
import org.reactnative.camera.RNCameraPackage;
import com.reactnativenavigation.NavigationApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
//import com.cmcewen.blurview.BlurViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
//import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.controllers.ActivityCallbacks;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new RNCameraPackage(),
                new ActionSheetPackage(),
                new PickerPackage(),
                //new ReactVideoPackage(),
                new GoogleAnalyticsBridgePackage(),
                //new ReactNativeOneSignalPackage(),
                new RNDeviceInfo(),
                new LinearGradientPackage()
                //new BlurViewPackage()
        //new SplashScreenReactPackage()
        );
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public void onCreate() {
        super.onCreate();

        setActivityCallbacks(new ActivityCallbacks() {
            @Override
            public void onActivityResult(int requestCode, int resultCode, Intent data) {
                super.onActivityResult(requestCode, resultCode, data);
            }
        });

        SoLoader.init(this, false);
    }
};
