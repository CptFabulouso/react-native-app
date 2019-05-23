import { StyleSheet } from 'react-native';

import { Colors, Metrics } from 'src/themes';

export default StyleSheet.create({
	container: {
		padding: Metrics.spacing.small,
		borderWidth: 2,
		borderColor: Colors.border,
		backgroundColor: Colors.white,
		borderRadius: Metrics.borderRadius,
	},
});
