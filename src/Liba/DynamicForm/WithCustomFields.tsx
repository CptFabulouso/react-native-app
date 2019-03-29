import { FormConfigField } from './DynamicFormTypes';

import DynamicForm, { FieldInjectedProps, Props } from './DynamicForm';
import React, { Component, ReactNode } from 'react';

// export function withCustomFields<F extends CustomField<any>>(customFields: F) {
// 	return class DynamicFormWithCustomField<V> extends Component<
// 		// Props<V>>
// 		Subtract<Props<V>, { config: FormConfig<V> }> & {
// 		config: CustomFormConfig<F, V>;
// 		}
// 		> {
// 		render() {
// 			return <DynamicForm {...this.props} customFields={customFields} />;
// 		}
// 	};
// 	// return function renderForm<V>(props: Props<V>) {
// 	// 	return <DynamicForm {...props} customFields={customFields} />;
// 	// };
// }

export function withCustomFields(
	customFields: (
		injectedProps: FieldInjectedProps<any>,
		field: FormConfigField<any>
	) => ReactNode
) {
	return class DynamicFormWithCustomField<V> extends Component<Props<V>> {
		render() {
			return <DynamicForm {...this.props} customFields={customFields} />;
		}
	};
	// return function renderForm<V>(props: Props<V>) {
	// 	return <DynamicForm {...props} customFields={customFields} />;
	// };
}
