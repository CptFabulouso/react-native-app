import { CustomFormConfig, FormConfig } from './DynamicFormTypes';
import { Subtract } from 'utility-types';

import DynamicForm, { CustomField, Props } from './DynamicForm';
import React, { Component } from 'react';

type ValuesOf<T extends any[]> = T[number];

export function withCustomFields<F extends CustomField<any>>(customFields: F) {
	return class DynamicFormWithCustomField<V> extends Component<
		// Props<V>>
		Subtract<Props<V>, { config: FormConfig<V> }> & {
		config: CustomFormConfig<F, V>;
		}
		> {
		render() {
			return <DynamicForm {...this.props} customFields={customFields} />;
		}
	};
	// return function renderForm<V>(props: Props<V>) {
	// 	return <DynamicForm {...props} customFields={customFields} />;
	// };
}
