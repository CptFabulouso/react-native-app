# App Setup

## install

- run `yarn` or `npm install`

## postinstall setup

### Change app name

#### Android

- change app_name in `./android/app/src/main/res/values/strings.xml`

#### iOS

- change Display name in xCode

### Change bundle id and package name

#### Android

- change every occurrence of `com.app` to your desired package name
- change the folder structure to location of `MainActivity.java` and `MainApplication.java` according to your package name

#### iOS

- change bundle Identifier in xCode

### Setting up colors

- modify color string in `./android/app/src/main/res/values/colors.xml`

### Setting up splash screen

- example of logo files are in `./tempAssets/splashscreen`
- replace logo.png files in `./android/app/src/main/res/mipmap-xxxx/`
- logo will be shown in the center of screen
- modify background color in `./android/app/src/main/res/values/colors.xml`

#### More splash screen customization

- if you want to show splash screen differently
- modify the `res/drawable/splash.xml`, `res/layout/launch_screen.xml` files to your liking
- look at `res/values/styles.xml`. When app starts, it's going to use the AppTheme, after that the react-native-splash-screen will kick in and show the exact same splash screen using SplashScreenTheme

## Post setting up

- delete ./tempAssets folder

## Debugging

### Debugging redux

project is using [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension), to use this, install:

- [react-native-debugger](https://github.com/jhen0409/react-native-debugger), on macOS can be installed with `brew cask install react-native-debugger`
  - open with command `open "rndebugger://set-debugger-loc?host=localhost&port=8081"`
- possibly can be used in chrome with [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd), but I was unable to run it from there

## Available scrips

`npm run eslint` - run eslint check

`npm run flow` - run flow check

## Git hooks

if git hooks are not installed, run `./node_modules/git-hooks/bin/git-hooks install`
