// @flow

import { View } from 'react-native';
import React from 'react';

import { TextInput } from '../../../UI/TextInput/TextInput';
import formikToTextInput from '../../helpers/formikToTextInput';
import styles from './styles';
import type { Style } from 'flow-types';

type Props = {|
	//text input
	value: string,
	onChangeText: (value: string) => void,
	disabled?: boolean,
	onSubmitEditing?: () => void,
	secureTextEntry?: boolean,
	returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send',
	onBlur?: () => void,
	onFocus?: () => void,
	multiline?: boolean,
	style?: Style,
	numberOfLines?: number,
	keyboardType?:
		| 'default'
		| 'number-pad'
		| 'decimal-pad'
		| 'numeric'
		| 'email-address'
		| 'phone-pad',
	blurOnSubmit?: boolean,

	//other
	name?: string,
	placeholder?: string,
	label?: string,
	getRef?: any => void,
	error?: string,
	touched?: boolean,
|};

const SimpleTextInput = (props: Props) => {
	return (
		<View style={[styles.container, props.style]}>
			<View style={styles.background} />
			<TextInput
				multiline={props.multiline}
				numberOfLines={props.numberOfLines}
				editable={!props.disabled}
				selectTextOnFocus={!props.disabled}
				placeholder={props.placeholder}
				onSubmitEditing={props.onSubmitEditing}
				returnKeyType={props.returnKeyType}
				secureTextEntry={props.secureTextEntry}
				onFocus={props.onFocus}
				ref={ref => {
					props.getRef && props.getRef(ref);
				}}
				value={props.value}
				onBlur={props.onBlur}
				onChangeText={props.onChangeText}
				keyboardType={props.keyboardType}
				blurOnSubmit={props.blurOnSubmit}
			/>
		</View>
	);
};

const SimpleTextInputFormik = formikToTextInput(SimpleTextInput);

export { SimpleTextInput, SimpleTextInputFormik };
