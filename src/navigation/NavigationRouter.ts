import { connect } from 'react-redux';
import {
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator,
} from 'react-navigation';
import React, { Component } from 'react';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import { callbackPathPrefix } from 'utils/constants';
import NavigationActions from './NavigationActions';

import AuthStack from './navigators/AuthStack';
import PlaygroundStack from './navigators/PlaygroundStack';
import UnAuthStack from './navigators/UnAuthStack';

import LoadingScreen from 'screens/Loading/LoadingScreen';
import OverallModal from 'containers/OverallModal/OverallModal';
import { SupportedLanguage } from 'flow-types';

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

const verticalModalRoutes = [];

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

type Props = {
	language: SupportedLanguage,
};
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

const mapStateToProps = state => {
	return {
		language: state.settings.language,
	};
};

export default connect(mapStateToProps)(App);
