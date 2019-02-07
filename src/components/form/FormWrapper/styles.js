// @flow
import { StyleSheet } from 'react-native';

import { Metrics } from 'themes';

export default StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
	},

	container: {
		flex: 1,
		maxWidth: Metrics.maxInputWidth,
	},
});
