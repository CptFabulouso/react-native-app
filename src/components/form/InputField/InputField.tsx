import { TextInput, TextInputProps, View } from 'react-native';
import React from 'react';

import { Style } from 'src/types';
import { Text } from '../../UI/Text/Text';
import formikToTextInput from '../helpers/formikToTextInput';
import styles from './styles';

type Props = TextInputProps & {
	style?: Style;
	name?: string;
	placeholder?: string;
	label?: string;
	getRef?: (ref: TextInput | null) => void;
	error?: string;
	touched?: boolean;
};

const InputField = (props: Props) => {
	const {
		style,
		name,
		placeholder,
		label,
		getRef,
		error,
		touched,
		...textInputProps
	} = props;

	return (
		<View>
			<Text>{props.label}</Text>
			<View style={[styles.container, props.style]}>
				<TextInput
					{...textInputProps}
					ref={ref => {
						props.getRef && props.getRef(ref);
					}}
				/>
			</View>
			{props.error && props.touched && (
				<Text style={styles.error}>{props.error}</Text>
			)}
		</View>
	);
};

const InputFieldFormik = formikToTextInput(InputField);

export { InputField, InputFieldFormik };
