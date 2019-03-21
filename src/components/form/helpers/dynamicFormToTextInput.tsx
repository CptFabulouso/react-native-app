import { CustomFieldProps } from 'src/Lib/DynamicForm';
import { Subtract } from 'utility-types';
import { TextInputProps } from 'react-native';
import React, { Component, ComponentType } from 'react';

export default function formikToTextInput<P extends TextInputProps>(
	WrappedComponent: ComponentType<P>
) {
	return class Wrapper extends Component<
		Subtract<P, TextInputProps> & CustomFieldProps & TextInputProps
		> {
		render() {
			const { field, form, dynamic, ...props } = this.props;

			if (!field || !form || !dynamic) {
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
					//
					style={dynamic.style}
					editable={dynamic.editable}
					blurOnSubmit={dynamic.blurOnSubmit}
					onSubmitEditing={dynamic.onSubmitEditing}
					returnKeyType={dynamic.isLast ? 'done' : 'next'}
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
