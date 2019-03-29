import { FieldProps } from 'formik';
import { Subtract } from 'utility-types';
import { TextInputProps } from 'react-native';
import React, { Component, ComponentType } from 'react';

import { DynamicFieldProps } from '../DynamicFormTypes';

export type InjectedProps = TextInputProps & {
	error?: string | null;
	touched?: boolean;
};

export type OwnProps = DynamicFieldProps<any> &
	Partial<FieldProps<any>> &
	TextInputProps;

export default function formikToTextInput<P extends InjectedProps>(
	WrappedComponent: ComponentType<P>
) {
	return class Wrapper extends Component<
		Subtract<P, InjectedProps> & OwnProps
		> {
		render() {
			const { field, form, dynamic, ...props } = this.props;

			if (!field || !form || !dynamic) {
				return;
			}
			const { onBlur, onChangeText } = props;
			const handleBlur = onBlur
				? (event: any) => {
					onBlur && onBlur(event);
					return field.onBlur(field.name)(event);
				  }
				: field.onBlur(field.name);

			const handleTextChange = onChangeText
				? (value: string) => {
					onChangeText && onChangeText(value);
					field.onChange(field.name)(value);
				  }
				: field.onChange(field.name);

			return (
				<WrappedComponent
					{...props as P}
					value={field.value}
					onBlur={handleBlur}
					onChangeText={handleTextChange}
					error={form.errors[field.name]}
					touched={form.touched[field.name]}
					//
					style={dynamic.style}
					editable={dynamic.editable}
					blurOnSubmit={dynamic.blurOnSubmit}
					onSubmitEditing={dynamic.onSubmitEditing}
					returnKeyType={dynamic.isLast ? 'done' : 'next'}
					getRef={dynamic.getRef}
				/>
			);
		}
	};
}
