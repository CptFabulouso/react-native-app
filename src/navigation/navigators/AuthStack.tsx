import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

import { Colors, Icons } from 'src/themes';
import LogOutButton from '../navComponents/LogOutButton/LogOutButton';
import MainScreen from 'src/screens/Main/MainScreen';
import SettingsScreen from 'src/screens/Settings/SettingsScreen';
import TabIcon from '../navComponents/TabIcon/TabIcon';
import i18n from 'src/i18n';
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
				// FIXME: any type
				// eslint-disable-next-line
				tabBarIcon: (props: any) => <TabIcon {...props} Icon={Icons.Main} />,
			}),
		},
		settings: {
			screen: SettingsStack,
			navigationOptions: () => ({
				tabBarLabel: i18n.t('navigation.settings'),
				// FIXME: any type
				// eslint-disable-next-line
				tabBarIcon: (props: any) => (
					<TabIcon {...props} Icon={Icons.Settings} />
				),
			}),
		},
	},
	{
		defaultNavigationOptions: {
			// gesturesEnabled: false,
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
