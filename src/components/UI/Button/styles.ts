import { StyleSheet } from 'react-native';

import { Colors, Fonts } from 'src/themes';

export default {
	container: StyleSheet.create({
		default: {
			flexDirection: 'row',
			height: 55,
			justifyContent: 'center',
			alignItems: 'center',
			paddingHorizontal: 40,
		},

		noPadding: {
			paddingHorizontal: 0,
		},

		small: {
			height: 25,
		},

		block: {
			width: '100%',
		},

		hidden: {
			opacity: 0,
		},

		disabled: {
			opacity: 0.5,
		},
	}),

	label: StyleSheet.create({
		default: {
			color: Colors.white,
			fontSize: Fonts.size.h5,
			// fontWeight: 'bold',
		},

		disabled: {
			backgroundColor: '#ddd',
		},

		iconLeft: {
			marginLeft: 10,
		},

		iconRight: {
			marginRight: 10,
		},

		loading: {
			opacity: 0,
		},

		transparent: {
			color: Colors.black,
		},

		small: {
			fontSize: Fonts.size.small,
		},
	}),

	other: StyleSheet.create({
		fill: {
			overflow: 'hidden',
			...StyleSheet.flatten(StyleSheet.absoluteFill),
		},

		center: {
			justifyContent: 'center',
			alignItems: 'center',
		},
	}),
};
