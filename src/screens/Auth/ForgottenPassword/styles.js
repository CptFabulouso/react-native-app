// @flow

import { StyleSheet } from 'react-native';

import { Metrics } from 'themes';

export default StyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: Metrics.pagePadding,
	},

	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	loginFormContainer: {
		marginBottom: 30,
		justifyContent: 'center',
		width: '100%',
	},
});
