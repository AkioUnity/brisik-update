#EGG

##Installation

##Step 1
```
yarn install
react-native link-ios
react-native link
```

##Step 2

###Fonts
* https://medium.com/@dabit3/adding-custom-fonts-to-react-native-b266b41bff7f#.6j81jj3ws
* https://medium.com/@gattermeier/custom-fonts-in-react-native-for-android-b8a331a7d2a7#.gh0yav56w

##Libraries
* https://github.com/wix/react-native-interactable - (https://github.com/wix/react-native-interactable/issues/12)
* https://github.com/wix/react-native-navigation - (https://github.com/wix/react-native-navigation/issues/410)
* https://github.com/APSL/react-native-keyboard-aware-scroll-view
* https://www.npmjs.com/package/@yfuks/react-native-action-sheet

`node_modules/react-native-nagvigation/android/src/main/java/com/reactnativenavigation/react/JsDevReloadListenerReplacer.java`
### replace import DevSupportManager -> import com.facebook.react.devsupport.interfaces.DevSupportManager;

##Step 3
```
react-native run-[ios|android]
```