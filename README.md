# Shared Spaces

## Release Notes 1.0.1

#### New Features
* Added messaging system
* Can now add an item from the a list's detail screen

#### Bug Fixes
* Fixed an issue where when chosing a picture for an item it would show the picture and a blank icon.
* FIxed an issue where items were not showing up in the "Shared" item page.

#### Known Bugs and Defects
* When creating a list, the icon chosen is not updated.
* Depending on the resolution of your device, when making an item, after chosing an image, the toggle to decide whether or not an item is shared gets covered by the "Create Item" button.
* Recently Added Items part was showing duplicates, so we temporarily removed funcitonality.
* When typing, you sometimes have to close the keyboard to access parts of the app. 

## Installation Guide

#### Pre-requisites
1. Some sort of text editor or IDE is required, we recommend [Visual Studio Code][1]
2. [Node.js][2] is Required
3. [Expo][3] is required to run the application. 
    * ```npm install expo-cli --global```
4. In order to run the application with Expo, you can either download the Expo app, run in your browser, or use an [Android][4] emulator or iPhone emulator (if you're on a Mac).

#### Dependent Libraries
Here is a list of the dependencies used in Shared Spaces:

~~~~
  "dependencies": {
    "@ant-design/icons": "^4.4.0",
    "@react-native-community/masked-view": "0.1.10",
    "@react-native-firebase/app": "^10.8.1",
    "@react-navigation/native": "^5.9.2",
    "@react-navigation/stack": "^5.14.2",
    "expo": "~40.0.0",
    "expo-cli": "^4.3.4",
    "expo-image-picker": "^9.2.1",
    "expo-status-bar": "~1.0.3",
    "feather-icons": "^4.28.0",
    "firebase": "^7.9.0",
    "formik": "^2.2.6",
    "react": "16.13.1",
    "react-alphabet-list": "^0.1.8",
    "react-dom": "16.13.1",
    "react-native": "https://github.com/expo/react-native/archive/sdk-40.0.1.tar.gz",
    "react-native-alphabetlistview": "^0.3.1",
    "react-native-dropdown-picker": "^4.0.2",
    "react-native-elements": "^3.2.0",
    "react-native-feather": "^1.0.2",
    "react-native-gesture-handler": "^1.8.0",
    "react-native-gifted-chat": "^0.16.3",
    "react-native-image-crop-picker": "^0.36.0",
    "react-native-image-picker": "^3.3.2",
    "react-native-keyboard-aware-scroll-view": "^0.9.3",
    "react-native-material-buttons": "^0.5.0",
    "react-native-material-dropdown-v2-fixed": "^0.11.3",
    "react-native-paper": "^4.7.2",
    "react-native-reanimated": "^1.13.2",
    "react-native-safe-area-context": "3.1.9",
    "react-native-screens": "^2.15.2",
    "react-native-section-alphabet-list": "^2.0.4",
    "react-native-svg": "^12.1.0",
    "react-native-upload-photo-button": "^1.0.0",
    "react-native-vector-icons": "^8.0.0",
    "react-native-web": "^0.15.7",
    "react-navigation": "^4.4.3"
  }
 ~~~~

For each one, you can use 
```bash
npm install ____
```
Where ____ is the name of the dependency

#### Download Instructions
You can download the source code from our GitHub and unzip the file to your disired location on your machine.

#### Run Instructions
Once you have downloaded the source code and also ```npm install``` all of the dependencies, in order to run the application you should go to into the directory and run ```expo start```. This should open up a tab in your default browser that then gives you options on how you would like to run Shared Spaces. If you would like to run Shared Spaces in your browser (not recommended) you can choose the option "Run in web browser" to do so. We recommend the "Run on Android device/emulator" option. You should open up the [Android Studio][4] that you downloaded and start up an emulator. Once the emulator is up and running, you then can press the "Run on Android device/emulator" button. Additionally, you can download the [Expo][3] app to run Shared Spaces on your phone. There is a QR code on the browser tab that can be scanned from inside the Expo app. Once you have done one of the three options, the app should be up and running and you should be able to use the app as you please.

[1]: https://code.visualstudio.com/download
[2]: https://nodejs.org/en/
[3]: https://expo.io/tools
[4]: https://developer.android.com/studio
 
