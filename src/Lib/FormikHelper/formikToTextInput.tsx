import { FormikProps } from 'formik';
import { Subtract } from 'utility-types';
import { TextInputProps } from 'react-native';
import React, { Component, ComponentType } from 'react';

//TODO: how to use FieldProps type from Formik?
export interface FieldProps<V = any> {
	field?: {
		onChange: (name: string) => (val: string) => void;
		onBlur: (name: string) => (e: any) => void;
		value: any;
		name: string;
	};
	form?: FormikProps<V>;
}

export default function formikToTextInput<P extends TextInputProps>(
	WrappedComponent: ComponentType<P>
) {
	return class Wrapper extends Component<
		Subtract<P, TextInputProps> & FieldProps & TextInputProps
		> {
		render() {
			const { field, form, ...props } = this.props;
			if (!field || !form) {
				return;
			}
			const handleBlur = props.onBlur
				? (event: any) => {
					props.onBlur && props.onBlur(event);
					return field.onBlur(field.name)(event);
				  }
				: field.onBlur(field.name);

			const handleTextChange = props.onChangeText
				? (value: string) => {
					props.onChangeText && props.onChangeText(value);
					field.onChange(field.name)(value);
				  }
				: field.onChange(field.name);

			return (
				<WrappedComponent
					{...props as P}
					name={field.name}
					value={field.value}
					onBlur={handleBlur}
					onChangeText={handleTextChange}
					error={form.errors[field.name]}
					touched={form.touched[field.name]}
				/>
			);
		}
	};
}
/*
style?: Style;
	name?: string;
	placeholder?: string;
	label?: string;
	getRef?: (ref: TextInput | null) => void;
	error?: string;
	touched?: boolean;
*/
