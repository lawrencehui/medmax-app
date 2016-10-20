App.info({
  id: 'com.sanuker.medmax',
  name: 'Med Max',
  version:"0.0.3"
});

App.setPreference('ShowSplashScreenSpinner', 'false');
App.setPreference('Orientation', 'portrait');
App.setPreference('ios-orientation-iphone', 'portrait');
App.setPreference('StatusBarOverlaysWebView', true);
App.setPreference('StatusBarStyle', 'lightcontent');
App.setPreference('StatusBarBackgroundColor', '#6FBAD1');
App.setPreference("AndroidLaunchMode", "singleTask");
App.accessRule("*");


App.icons({
  // iOS
  'iphone': 'resources/ios/icon-60.png',
  'iphone_2x': 'resources/ios/AppIcon.appiconset/icon-60@2x.png',
  'iphone_3x': 'resources/ios/AppIcon.appiconset/icon-60@3x.png',
  'ipad': 'resources/ios/AppIcon.appiconset/icon-76.png',
  'ipad_2x': 'resources/ios/AppIcon.appiconset/icon-76@2x.png',

  // Android
  'android_ldpi': 'resources/android/mipmap-ldpi/ic_launcher.png',
  'android_mdpi': 'resources/android/mipmap-mdpi/ic_launcher.png',
  'android_hdpi': 'resources/android/mipmap-hdpi/ic_launcher.png',
  'android_xhdpi': 'resources/android/mipmap-xhdpi/ic_launcher.png'
});

//
App.launchScreens({
  // 'iphone': 'resources/ios_splash/Non-Retina.png',
  'iphone_2x': "resources/splash/medmax_iphone4.png",
  'iphone5':"resources/splash/medmax_iphone5.png",
  'iphone6':"resources/splash/medmax_iphone6.png",
  'iphone6p_portrait':"resources/splash/medmax_iphone6plus.png",
  'android_ldpi_portrait':"resources/splash/medmax_LDPI.png",
  'android_mdpi_portrait':"resources/splash/medmax_MDPI.png",
  'android_hdpi_portrait':"resources/splash/medmax_HDPI.png",
  'android_xhdpi_portrait':"resources/splash/medmax_XHDPI.png",
});
