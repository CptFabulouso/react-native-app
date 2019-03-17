import { TextInput, TextInputProps, View } from 'react-native';
import React from 'react';

import { Style } from 'src/types';
import { Text } from '../../UI/Text/Text';
import formikToTextInput from '../helpers/formikToTextInput';
import styles from './styles';

type Props = TextInputProps & {
	style?: Style;
	// name?: string;
	label?: string;
	getRef?: (ref: TextInput | null) => void;
	error?: string;
	touched?: boolean;
};

const InputField = (props: Props) => {
	const {
		style,
		// name,
		label,
		getRef,
		error,
		touched,
		...textInputProps
	} = props;

	return (
		<View>
			<Text>{label}</Text>
			<View style={[styles.container, style]}>
				<TextInput
					{...textInputProps}
					ref={ref => {
						getRef && getRef(ref);
					}}
				/>
			</View>
			{error && touched && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

const InputFieldFormik = formikToTextInput(InputField);

export { InputField, InputFieldFormik };
