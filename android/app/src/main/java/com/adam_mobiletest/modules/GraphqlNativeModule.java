package com.adam_mobiletest.modules;
import com.apollographql.apollo.ApolloCall;
import com.apollographql.apollo.ApolloClient;
import com.apollographql.apollo.api.Input;
import com.apollographql.apollo.api.InputType;
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.exception.ApolloException;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableNativeArray;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.gson.Gson;
import com.launches.GetLaunchQuery;
import com.launches.GetLaunchesQuery;
import com.launches.type.PatchSize;

import android.util.Log;

import androidx.annotation.NonNull;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

import okhttp3.OkHttpClient;

public class GraphqlNativeModule extends ReactContextBaseJavaModule {
  GraphqlNativeModule(ReactApplicationContext context) {
      super(context);
  }


  private static ApolloClient apolloClient;

  private static ApolloClient getApolloClient() {
    if(apolloClient == null) {
      // build apollo client
      String serverUrl = "https://apollo-fullstack-tutorial.herokuapp.com/";
      OkHttpClient okHttpClient = new OkHttpClient.Builder().build();
      apolloClient = ApolloClient.builder()
              .serverUrl(serverUrl)
//              .okHttpClient(okHttpClient)
              .build();
    }
    return apolloClient;
  };

  @Override
  public String getName() {
    return "GraphqlModule";
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public void test(String name) {
    Log.d("GraphqlModule", "testing name: " + name);
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public void fetchLaunches(String afterVar, Callback launchesCallback) {
    Log.d("GraphqlModule", "testing after: " + afterVar);

    Input<Integer> page = new Input<>(15, true);
    Input<PatchSize> mission = new Input<>(PatchSize.SMALL, true);
    Input<String> afterVal = new Input<>(afterVar, true);

    getApolloClient().query(new GetLaunchesQuery(page, afterVal, mission))
            .enqueue(new ApolloCall.Callback<GetLaunchesQuery.Data>() {
              @Override
              public void onResponse(@NonNull Response<GetLaunchesQuery.Data> response) {
                Log.e("GraphqlModule", "Launches Query res: " + response.getData().launches().toString());
                WritableMap data = new WritableNativeMap();
                WritableArray launchesData = new WritableNativeArray();

                data.putString("cursor", response.getData().launches().cursor());
                data.putString("launches", response.getData().launches().launches().toString());

                Log.d("GraphqlModule", "data: " + data);

                String dataToJson = new Gson().toJson(response.getData().launches());
//
                launchesCallback.invoke(dataToJson);
              }

              @Override
              public void onFailure(@NonNull ApolloException e) {
                  Log.d("GraphqlModule", "Launches Query error: " + e);

                  String dataErrorToJson = new Gson().toJson(e);
                  launchesCallback.invoke(dataErrorToJson);
              }
            });
  }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void fetchLaunch(String id, Callback launchCallback) {
        getApolloClient().query(new GetLaunchQuery(id))
                .enqueue(new ApolloCall.Callback<GetLaunchQuery.Data>() {
                    @Override
                    public void onResponse(@NonNull Response<GetLaunchQuery.Data> response) {
                        Log.e("GraphqlModule", "Launch Query res: " + response.getData().launch().toString());

                        String dataToJson = new Gson().toJson(response.getData().launch());

                        launchCallback.invoke(dataToJson);
                    }

                    @Override
                    public void onFailure(@NonNull ApolloException e) {
                        Log.d("GraphqlModule", "Launch Query error: " + e);

                        String dataErrorToJson = new Gson().toJson(e);
                        launchCallback.invoke(dataErrorToJson);
                    }
                });
    }

}