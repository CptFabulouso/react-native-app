/* @flow */

import React, { Component, type ComponentType } from 'react';

export type PassedProps = {|
	name: string,
	value: string,
	onBlur: () => void,
	onChangeText: (val: string) => void,
	error: ?string,
	touched: boolean,
|};

export type FormikProps = {|
	field: {|
		name: string,
		value: string,
		onChange: (name: string) => void,
		onBlur: (name: string) => void,
	|},
	form: {|
		errors: { [key: string]: string },
		touched: { [key: string]: boolean },
	|},
	onBlur: () => void,
	onChangeText: (val: string) => void,
|};

type State = {||};

export default function formikToTextInput<Config: any>(
	WrappedComponent: ComponentType<Config>
): ComponentType<$Diff<Config, PassedProps>> {
	return class Wrapper extends Component<$Diff<Config, PassedProps>, State> {
		render() {
			const { field, form, onBlur, onChangeText } = this.props;

			const handleBlur = onBlur
				? event => {
					onBlur && onBlur();
					field.onBlur(field.name)(event);
				  }
				: field.onBlur(field.name);

			const handleTextChange = onChangeText
				? value => {
					onChangeText && onChangeText(value);
					field.onChange(field.name)(value);
				  }
				: field.onChange(field.name);

			return (
				<WrappedComponent
					{...this.props}
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
