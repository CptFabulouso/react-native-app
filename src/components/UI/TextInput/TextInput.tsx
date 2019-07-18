import {
	Platform,
	TextInput as RNTextInput,
	TextInputProps,
} from 'react-native';
import React from 'react';

type Props = TextInputProps & {
	underlineColor?: string;
};

type Ref = RNTextInput;

// eslint-disable-next-line
const TextInput = React.forwardRef<Ref, Props>((props, ref) => {
	const { underlineColor, ...textInputProps } = props;

	let height = 28;
	if (textInputProps.multiline && textInputProps.numberOfLines) {
		const numberOfLines = textInputProps.numberOfLines || 3;
		height = 24 + (numberOfLines - 1) * 17;
	}

	return (
		<RNTextInput
			{...props}
			style={[
				props.style,
				{
					height,
					...Platform.select({
						ios: {
							borderBottomWidth: underlineColor ? 1 : 0,
							borderColor: underlineColor,
						},
						android: {
							left: -4,
							paddingTop: props.multiline ? 4 : 0,
							paddingBottom: 0,
							borderBottomWidth:
								props.underlineColorAndroid || underlineColor ? 1 : 0,
							borderColor: underlineColor || props.underlineColorAndroid,
						},
					}),
				},
			]}
			textAlignVertical={props.multiline ? 'top' : 'center'}
			underlineColorAndroid="transparent"
			ref={ref}
		/>
	);
});

export { TextInput };
