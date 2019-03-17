import { TextInput as RNTextInput, TextInputProps, View } from 'react-native';
import React from 'react';

import { Style } from 'src/types';
import { TextInput } from '../../../UI/TextInput/TextInput';
import formikToTextInput from '../../helpers/formikToTextInput';
import styles from './styles';

type Props = TextInputProps & {
	style?: Style;
	// name?: string;
	// label?: string;
	getRef?: (ref: RNTextInput | null) => void;
	// error?: string;
	// touched?: boolean;
};

const SimpleTextInput = (props: Props) => {
	const {
		style,
		// name,
		// label,
		getRef,
		// error,
		// touched,
		...textInputProps
	} = props;

	return (
		<View style={[styles.container, style]}>
			<View style={styles.background} />
			<TextInput
				{...textInputProps}
				ref={ref => {
					getRef && getRef(ref);
				}}
			/>
		</View>
	);
};

const SimpleTextInputFormik = formikToTextInput(SimpleTextInput);

export { SimpleTextInput, SimpleTextInputFormik };
