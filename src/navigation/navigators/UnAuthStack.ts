import { createStackNavigator } from 'react-navigation';

import ChangePasswordScreen from 'src/screens/Auth/ChangePassword/ChangePasswordScreen';
import CreateAccountScreen from 'src/screens/Auth/CreateAccount/CreateAccountScreen';
import ForgottenPasswordScreen from 'src/screens/Auth/ForgottenPassword/ForgottenPasswordScreen';
import LoginScreen from 'src/screens/Auth/Login/LoginScreen';
import i18n from 'src/i18n';

const UnAuthStack = createStackNavigator({
	login: {
		screen: LoginScreen,
		navigationOptions: () => ({
			header: null,
			title: i18n.t('navigation.logIn'),
		}),
	},
	createAccount: {
		screen: CreateAccountScreen,
		navigationOptions: {
			header: null,
		},
	},
	forgottenPassword: {
		screen: ForgottenPasswordScreen,
		navigationOptions: () => ({
			title: i18n.t('navigation.resetPassword'),
		}),
	},
	changePassword: {
		screen: ChangePasswordScreen,
		path: 'changePassword/:token',
		navigationOptions: () => ({
			title: i18n.t('navigation.changePassword'),
		}),
	},
});

export default UnAuthStack;
