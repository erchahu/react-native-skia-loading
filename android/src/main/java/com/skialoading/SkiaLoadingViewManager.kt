package com.skialoading

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.SkiaLoadingViewManagerInterface
import com.facebook.react.viewmanagers.SkiaLoadingViewManagerDelegate

@ReactModule(name = SkiaLoadingViewManager.NAME)
class SkiaLoadingViewManager : SimpleViewManager<SkiaLoadingView>(),
  SkiaLoadingViewManagerInterface<SkiaLoadingView> {
  private val mDelegate: ViewManagerDelegate<SkiaLoadingView>

  init {
    mDelegate = SkiaLoadingViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<SkiaLoadingView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): SkiaLoadingView {
    return SkiaLoadingView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: SkiaLoadingView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "SkiaLoadingView"
  }
}
