package com.esportsglobalgamers;
import android.view.View;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
//import org.devio.rn.splashscreen.SplashScreen;
import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
    @Override
    public View createSplashLayout() {
        return new View(this);   // <====== TO AVOID WHITE BACKGROUND
    }
    //public static final int PERMISSION_REQ_CODE = 1234;
//    public static final int OVERLAY_PERMISSION_REQ_CODE = 1235;
    //public static final int MAGICAL_NUMBER = 19283912;

    /*String[] perms = {
            "android.permission.WRITE_EXTERNAL_STORAGE",
            "android.permission.CAMERA",
            "android.permission.ACCESS_FINE_LOCATION",
            "android.permission.RECORD_AUDIO",
    };*/

    //int requestedPermissions = 0;
    //int grantedPermissions = 0;


//    @Override
//    public void onCreate (Bundle savedInstanceState) {
//        //SplashScreen.show(this);
//        super.onCreate(savedInstanceState);
//        // Checking permissions on init
//        //checkPerms();
//
//    }
//
//    public void checkPerms() {
//        // Checking if device version > 22 and we need to use new permission model
//        if(Build.VERSION.SDK_INT>Build.VERSION_CODES.LOLLIPOP_MR1) {
//            for(String perm : perms){
//                if(checkSelfPermission(perm) == PackageManager.PERMISSION_DENIED){
//                    requestPermissions(perms, PERMISSION_REQ_CODE);
//                    requestedPermissions++;
//                    break;
//                }
//            }
//        }
//    }
//
//    @Override
//    public void onRequestPermissionsResult(int permsRequestCode, String[] permissions, int[] grantResults){
//        switch (permsRequestCode) {
//            case PERMISSION_REQ_CODE:
//                if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
//                    grantedPermissions++;
//
//                    if (grantedPermissions == requestedPermissions) {
//                        flushPrivileges();
//                    }
//                } else {
//
//                }
//                break;
//            default:
//                super.onRequestPermissionsResult(permsRequestCode, permissions, grantResults);
//        }
//    }
//
//    private void flushPrivileges() {
//        Intent intent = new Intent(getApplicationContext(), MainActivity.class);
//        int mPendingIntentId = MAGICAL_NUMBER;
//        PendingIntent mPendingIntent = PendingIntent.getActivity(getApplicationContext(), mPendingIntentId, intent, PendingIntent.FLAG_CANCEL_CURRENT);
//        AlarmManager mgr = (AlarmManager) getApplicationContext().getSystemService(Context.ALARM_SERVICE);
//        mgr.set(AlarmManager.RTC, System.currentTimeMillis() + 100, mPendingIntent);
//        System.exit(0);
//    }

}
