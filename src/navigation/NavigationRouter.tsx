import { connect } from 'react-redux';
import {
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator,
} from 'react-navigation';
import React, { Component } from 'react';
// @ts-ignore
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import { callbackPathPrefix } from 'src/utils/constants';
import NavigationActions from './NavigationActions';

import AuthStack from './navigators/AuthStack';
import PlaygroundStack from './navigators/PlaygroundStack';
import UnAuthStack from './navigators/UnAuthStack';

import { AppState, SupportedLanguage } from 'src/types';
import { getDeviceLanguage } from 'src/redux/selectors';
import LoadingScreen from 'src/screens/Loading/LoadingScreen';
import OverallModal from 'src/containers/OverallModal/OverallModal';

const AppSwitcher = createSwitchNavigator(
	{
		LoadingScreen: LoadingScreen,
		UnAuth: {
			screen: UnAuthStack,
			path: 'unauth',
		},
		Auth: AuthStack,
		Playground: PlaygroundStack,
	},
	{
		initialRouteName: 'LoadingScreen',
	}
);

const verticalModalRoutes: Array<string> = [];

const AppNavigator = createStackNavigator(
	{
		mainApp: {
			screen: AppSwitcher,
			path: '',
		},
		overallModal: {
			screen: OverallModal,
		},
	},
	{
		initialRouteName: 'mainApp',
		mode: 'modal',
		defaultNavigationOptions: {
			gesturesEnabled: false,
			header: null,
		},
		transitionConfig: () => {
			return {
				screenInterpolator: sceneProps => {
					if (
						sceneProps.scenes[1] &&
						verticalModalRoutes.includes(sceneProps.scenes[1].route.routeName)
					) {
						return StackViewStyleInterpolator.forVertical(sceneProps);
					}
					return StackViewStyleInterpolator.forFade(sceneProps);
				},
			};
		},
	}
);

const AppRouter = createAppContainer(AppNavigator);

type StateProps = {
	language: SupportedLanguage;
};

type Props = StateProps;

class App extends Component<Props> {
	render() {
		return (
			<AppRouter
				ref={navigatorRef => {
					NavigationActions.setTopLevelNavigator(navigatorRef);
				}}
				screenProps={this.props.language}
				uriPrefix={`${callbackPathPrefix}://`}
			/>
		);
	}
}

const mapStateToProps = (state: AppState): StateProps => {
	return {
		language: getDeviceLanguage(state),
	};
};

export default connect<StateProps, {}, {}, AppState>(mapStateToProps)(App);
