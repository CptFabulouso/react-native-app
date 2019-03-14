// @flow

import { TextInput as RNTextInput, TextInputProps, View } from 'react-native';
import React from 'react';

import { Style } from 'src/types';
import styles from './styles';

type Props = TextInputProps & {
	containerStyle?: Style;
};

type Ref = RNTextInput;

const TextInput = React.forwardRef<Ref, Props>((props, ref) => {
	const { containerStyle, ...textInputProps } = props;

	return (
		<View style={[styles.container, containerStyle]}>
			<RNTextInput
				underlineColorAndroid="transparent"
				{...textInputProps}
				ref={ref}
				style={[styles.input, props.style]}
			/>
		</View>
	);
});

export { TextInput };
