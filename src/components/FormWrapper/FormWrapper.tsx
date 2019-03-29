import { View, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';

import styles from './styles';

type Props = {
	wrapperStyle?: ViewStyle;
	containerStyle?: ViewStyle;
	children: ReactNode;
};

const FormWrapper = (props: Props) => {
	return (
		<View style={[styles.wrapper, props.wrapperStyle]}>
			<View style={[styles.container, props.containerStyle]}>
				{props.children}
			</View>
		</View>
	);
};

export { FormWrapper };
