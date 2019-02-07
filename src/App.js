// @flow

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar, View } from 'react-native';
import React, { Component } from 'react';
// import SplashScreen from 'react-native-splash-screen';

import { Colors } from 'themes';
import { OverallModal } from 'containers';
import { persistor, store } from 'my-redux/store';
import { runStartupActions } from 'my-redux/actions';
import DevMenuTrigger from 'lib/DevMenuTrigger';
import NavigationRouter from 'navigation/NavigationRouter';

type Props = {};
export default class App extends Component<Props> {
	loadAppAsync() {
		// SplashScreen.hide();
		store.dispatch(runStartupActions());
	}

	shouldComponentUpdate() {
		//never update this component
		return false;
	}

	render() {
		return (
			<Provider store={store}>
				<DevMenuTrigger style={{ flex: 1 }} persistor={persistor}>
					<OverallModal />
					<PersistGate
						onBeforeLift={this.loadAppAsync}
						loading={null}
						persistor={persistor}
					>
						<NavigationRouter />
					</PersistGate>
					<StatusBar backgroundColor={Colors.statusBar} />
				</DevMenuTrigger>
			</Provider>
		);
	}
}
