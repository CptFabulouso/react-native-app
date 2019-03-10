// @flow

import { View } from 'react-native';
import React from 'react';

import { ReactNode, Style } from 'flow-types';

import styles from './styles';

type Props = {|
	wrapperStyle?: Style,
	containerStyle?: Style,
	children: ReactNode,
|};

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
