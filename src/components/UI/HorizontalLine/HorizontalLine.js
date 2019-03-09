// @flow

import { View } from 'react-native';
import React from 'react';

import styles from './styles';
import type { ReactNode, Style } from 'flow-types';

type Props = {|
	style?: Style,
	label?: string,
	children?: ReactNode,
	margin?: number,
|};

const HorizontalLine = ({ margin = 0, ...props }: Props) => {
	if (!props.children) {
		return (
			<View style={[styles.container, props.style]}>
				<View style={styles.horizontalLine} />
			</View>
		);
	}

	return (
		<View style={[styles.container, { marginVertical: margin }, props.style]}>
			<View style={styles.horizontalLine} />
			{props.children}
			<View style={styles.horizontalLine} />
		</View>
	);
};

export { HorizontalLine };
