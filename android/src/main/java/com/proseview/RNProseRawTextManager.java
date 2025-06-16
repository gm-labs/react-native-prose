package com.proseview;

import android.view.View;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class RNProseRawTextManager extends ViewManager<View, RNProseRawTextShadowNode> {
  @NonNull
  @Override
  public String getName() {
    return "RNProseRawText";
  }

  @NonNull
  @Override
  public View createViewInstance(@NonNull ThemedReactContext context) {
    throw new IllegalStateException("Attempt to create a native view for RNProseRawText");
  }

  public View prepareToRecycleView(ThemedReactContext context, View view) {
    throw new IllegalStateException("Attempt to recycle a native view for RNProseRawText");
  }

  @Override
  public void updateExtraData(@NonNull View root, Object extraData) {}

  @Override
  public RNProseRawTextShadowNode createShadowNodeInstance() {
    return new RNProseRawTextShadowNode();
  }

  @Override
  public Class<RNProseRawTextShadowNode> getShadowNodeClass() {
    return RNProseRawTextShadowNode.class;
  }
}
