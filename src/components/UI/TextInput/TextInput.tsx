import {
	Platform,
	TextInput as RNTextInput,
	TextInputProps,
	View,
} from 'react-native';
import React from 'react';

import { Style } from 'src/types';
import styles from './styles';

type Props = TextInputProps & {
	containerStyle?: Style;
};

type Ref = RNTextInput;

// eslint-disable-next-line
const TextInput = React.forwardRef<Ref, Props>((props, ref) => {
	const { containerStyle, ...textInputProps } = props;

	const style: Array<Style> = [styles.container];
	const inputStyle: Array<Style> = [styles.input];
	if (textInputProps.multiline) {
		const numberOfLines = textInputProps.numberOfLines || 1;
		const height = Math.max(45, numberOfLines * 30);
		style.push({ height });
		inputStyle.push({
			height: Platform.OS === 'ios' ? height - 15 : height + 30,
		});
	}

	return (
		<View style={[style, containerStyle]}>
			<RNTextInput
				underlineColorAndroid="transparent"
				{...textInputProps}
				ref={ref}
				style={[inputStyle, props.style]}
			/>
		</View>
	);
});

export { TextInput };
