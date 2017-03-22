# Santiment Mobile

## Requirements
- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Install [Node](https://nodejs.org/en/download/package-manager/)
- Install [Yarn](https://yarnpkg.com/en/docs/install)
- Install [Brew](https://brew.sh/) (iOS-only)
- Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/) (iOS-only)
- Install [Cocoapods](https://guides.cocoapods.org/using/getting-started.html) (iOS-only)
- Setup [ReactNative](https://facebook.github.io/react-native/docs/getting-started.html) for iOS/Android

## Setup
- Clone Git repository
  - `$ git clone https://github.com/santiment-admin/SantimentMobile.git`
- Install dependencies
  - `$ yarn install`
- Set your private keys in `ios/Secrets.plist` file
- Set your private keys in `android/app/src/main/assets/secrets.properties` file

## Running on iOS 
- `$ cd SantimentMobile/ios`
- `$ pod install`
- TODO

## Runnion on Android
- TODO

## Linked dependencies
- `react-native-svg`. Unlink before uninstalling `react-native-pathjs-charts` package.
- `react-native-vector-icons`. Unlink before uninstalling `react-native-elements` package.
- `bugsnag-react-native`. Unlink before uninstalling `bugsnag-react-native` package.

## Files under `git update-index --assume-unchanged`
- `ios/Secrets.plist`
- `android/app/src/main/assets/secrets.properties`