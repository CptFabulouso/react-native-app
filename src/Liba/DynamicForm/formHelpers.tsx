import * as yup from 'yup';
import { FormikValues, WithFormikConfig, withFormik } from 'formik';

import { FormConfig, FormConfigField } from './DynamicFormTypes';

export function getNextField<V extends FormikValues>(
	config: FormConfig<V>,
	index: number
): FormConfigField<keyof V> | null {
	let nextField: FormConfigField<keyof V> | null = null;
	if (config.fields.length !== index - 1) {
		nextField = config.fields[index + 1];
	}
	return nextField;
}

// combine global style with field style
export function getStyle<V extends FormikValues>(
	formConfig: FormConfig<V>,
	fieldConfig: FormConfigField<keyof V>
) {
	if (fieldConfig.type === 'hidden') {
		return;
	}
	const style = [formConfig.style];
	if (fieldConfig.componentProps && fieldConfig.componentProps.style) {
		style.push(fieldConfig.componentProps.style);
	}
	return style;
}

export function getIsEditable<V extends FormikValues>(
	fieldConfig: FormConfigField<keyof V>
): boolean | undefined {
	/*
		used disabled prop in fieldConfig,
		if disabled prop is not defined, use editable prop from fieldConfig component props
  */
	if (fieldConfig.type === 'hidden') {
		return;
	}

	let editable = null;
	if (typeof fieldConfig.disabled === 'boolean') {
		editable = !fieldConfig.disabled;
	} else {
		editable =
			fieldConfig.componentProps && fieldConfig.componentProps.editable;
	}
	return editable;
}

export function getValidationSchema<V extends FormikValues>(
	config: FormConfig<V>
) {
	const shape = {} as { [K in keyof V]: yup.MixedSchema };

	config.fields.forEach(field => {
		if (field.type !== 'hidden') {
			shape[field.name] = field.validate;
		}
	});

	return yup.object().shape(shape);
}

export function getInitialValues<V extends FormikValues>(
	config: FormConfig<V>
): V {
	const values = {} as { [K in keyof V]: any };
	config.fields.forEach(field => {
		if (field.type !== 'hidden') {
			values[field.name] = field.defaultValue || '';
		}
	});

	return values;
}

/*
 * @deprecated
 */
export function withFormikFromConfig<P, V extends FormikValues>(
	formConfig: FormConfig<V>,
	formikConfig: WithFormikConfig<P, V>
) {
	// FIXME: fix component as any
	return function(Component: any) {
		return withFormik({
			mapPropsToValues: () => getInitialValues(formConfig),
			validationSchema: getValidationSchema(formConfig),
			...formikConfig,
		})(Component);
	};
}

/*
 * @deprecated
 */
export function configToWithFormik<P, V extends FormikValues>(
	formConfig: FormConfig<V>,
	otherFormikConfig: WithFormikConfig<P, V>
): WithFormikConfig<P, V> {
	return {
		mapPropsToValues: () => getInitialValues(formConfig),
		validationSchema: getValidationSchema(formConfig),
		...otherFormikConfig,
	};
}
