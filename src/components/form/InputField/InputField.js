// @flow

import { TextInput, View } from 'react-native';
import React from 'react';

import { Text } from '../../UI/Text/Text';
import { formikToTextInput } from 'wrappers';
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

	//other
	name?: string,
	placeholder?: string,
	label?: string,
	getRef?: any => void,
	error?: string,
	touched?: boolean,
|};

const InputField = (props: Props) => {
	return (
		<View>
			<Text>{props.label}</Text>
			<View style={[styles.container, props.style]}>
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
