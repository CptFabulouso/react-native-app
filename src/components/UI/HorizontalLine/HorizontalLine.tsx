import { View } from 'react-native';
import React from 'react';

import { ReactNode, Style } from 'src/types';
import styles from './styles';

type Props = {
	style?: Style;
	label?: string;
	children?: ReactNode;
	margin?: number;
};

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
