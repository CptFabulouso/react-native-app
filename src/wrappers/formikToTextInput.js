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

			return (
				<WrappedComponent
					{...this.props}
					name={field.name}
					value={field.value}
					onBlur={() => {
						onBlur && onBlur();
						field.onBlur(field.name);
					}}
					onChangeText={value => {
						onChangeText && onChangeText();
						field.onChange(field.name)(value);
					}}
					error={form.errors[field.name]}
					touched={form.touched[field.name]}
				/>
			);
		}
	};
}
