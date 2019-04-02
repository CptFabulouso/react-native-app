/** @format */

import { AppRegistry, YellowBox } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';

if (!__DEV__) {
	console.log = () => {};
}

YellowBox.ignoreWarnings(['Remote debugger', 'Require cycle:']);

AppRegistry.registerComponent(appName, () => App);
