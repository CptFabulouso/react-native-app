// @flow

import { StyleSheet } from 'react-native';

import { Colors } from 'themes/';

export default StyleSheet.create({
	tabStyle: {
		backgroundColor: Colors.primary,
	},

	tabBarStyle: {
		borderColor: Colors.primaryDark,
		backgroundColor: Colors.primary,
	},

	transparentHeader: {
		backgroundColor: 'transparent',
		borderBottomWidth: 0,
		elevation: 0,
	},
});
