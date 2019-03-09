// @flow
import { StyleSheet } from 'react-native';

import type { FormikActions } from 'flow-types';

export default StyleSheet.create({
	wrapperStyle: {
		marginBottom: 30,
		justifyContent: 'center',
		width: '100%',
	},

	button: {
		marginTop: 10,
	},
});

export type FormikBag<P, V> = { props: P } & FormikActions<V>;
