// @flow
import {
	createBottomTabNavigator,
	createStackNavigator,
} from 'react-navigation';
import React from 'react';

import { Colors, Icons } from 'themes/';
import LogOutButton from '../navComponents/LogOutButton/LogOutButton';
import TabIcon from '../navComponents/TabIcon/TabIcon';

import MainScreen from 'screens/Main/MainScreen';
import SettingsScreen from 'screens/Settings/SettingsScreen';
import i18n from 'i18n';
import styles from '../styles/NavigationRouterStyle';

const MainStack = createStackNavigator({
	main: {
		screen: MainScreen,
		navigationOptions: () => ({
			title: i18n.t('navigation.main'),
			// eslint-disable-next-line
		}),
	},
});

const SettingsStack = createStackNavigator({
	account: {
		screen: SettingsScreen,
		navigationOptions: () => ({
			title: i18n.t('navigation.settings'),
			// eslint-disable-next-line
			headerRight: <LogOutButton />,
		}),
	},
});

const TabNavigator = createBottomTabNavigator(
	{
		mainStack: {
			screen: MainStack,
			navigationOptions: () => ({
				tabBarLabel: i18n.t('navigation.main'),
				// eslint-disable-next-line
				tabBarIcon: props => <TabIcon {...props} Icon={Icons.Main} />,
			}),
		},
		settings: {
			screen: SettingsStack,
			navigationOptions: () => ({
				tabBarLabel: i18n.t('navigation.settings'),
				// eslint-disable-next-line
				tabBarIcon: props => <TabIcon {...props} Icon={Icons.Settings} />,
			}),
		},
	},
	{
		defaultNavigationOptions: {
			gesturesEnabled: false,
		},
		tabBarOptions: {
			activeTintColor: Colors.secondary,
			inactiveTintColor: Colors.secondaryDark,
			tabStyle: styles.tabBarStyle,
			style: styles.tabStyle,
		},
	}
);

const AuthStack = createStackNavigator(
	{
		tabs: {
			screen: TabNavigator,
			navigationOptions: () => ({
				header: null,
			}),
		},
	},
	{
		defaultNavigationOptions: {
			gesturesEnabled: false,
		},
	}
);

export default AuthStack;
