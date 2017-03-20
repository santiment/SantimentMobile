package net.santiment.android;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.bugsnag.BugsnagReactNative;
import com.horcrux.svg.RNSvgPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            BugsnagReactNative.getPackage(),
            new RNSvgPackage(),
            new VectorIconsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());

    try {
      Properties prop = new Properties();
      prop.load(getAssets().open("secrets.properties"));
      BugsnagReactNative.startWithApiKey(this, prop.getProperty("BUGSNAG_API_KEY"));
    }
    catch (IOException e) {
      e.printStackTrace();
    }

    SoLoader.init(this, /* native exopackage */ false);
  }
}
