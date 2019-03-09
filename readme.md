# App Setup

- run `yarn` or `npm install`

## debugging

### debugging redux

project is using [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension), to use this, install:

- [react-native-debugger](https://github.com/jhen0409/react-native-debugger), on macOS can be installed with `brew cask install react-native-debugger`
  - open with command `open "rndebugger://set-debugger-loc?host=localhost&port=8081"`
- possibly can be used in chrome with [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd), but I was unable to run it from there

## available scrips

`npm run eslint`

run eslint check

`npm run flow`

run flow check

## git hooks

if git hooks are not installed, run `./node_modules/git-hooks/bin/git-hooks install`
