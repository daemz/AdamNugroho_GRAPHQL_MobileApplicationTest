package com.adam_mobiletest;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;

public class GraphqlNativeModule extends ReactContextBaseJavaModule {
  GraphqlNativeModule(ReactApplicationContext context) {
      super(context);
  }

  @Override
  public String getName() {
    return "GraphqlModule";
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public void test(String name) {
    Log.d("GraphqlModule", "testing name: " + name);
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public void fetchLaunches(String after) {
    Log.d("GraphqlModule", "testing ");
  }
}