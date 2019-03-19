// FIXME: fix types with <any>

import * as yup from 'yup';
import { FormikValues, WithFormikConfig, withFormik } from 'formik';

import { FormConfig } from './FormikHelperTypes';

export function getValidationSchema<V extends FormikValues>(
	config: FormConfig<V>
) {
	const shape = {} as { [key: string]: yup.StringSchema };

	config.fields.forEach(field => {
		if (field.type !== 'hidden') {
			shape[field.name] = field.validate;
		}
	});

	return yup.object().shape(shape);
}

export function getDefaultValues<V extends FormikValues>(
	config: FormConfig<V>
): V {
	const values = {} as V;
	config.fields.forEach(field => {
		if (field.type !== 'hidden') {
			values[field.name] = field.defaultValue || '';
		}
	});

	return values;
}

export function withFormikFromConfig<P, V extends FormikValues>(
	formConfig: FormConfig<V>,
	formikConfig: WithFormikConfig<P, V>
) {
	return function(Component: any) {
		return withFormik({
			mapPropsToValues: () => getDefaultValues(formConfig),
			validationSchema: getValidationSchema(formConfig),
			...formikConfig,
		})(Component);
	};
}

export function configToWithFormik<P, V extends FormikValues>(
	formConfig: FormConfig<V>,
	otherFormikConfig: WithFormikConfig<P, V>
): WithFormikConfig<P, V> {
	return {
		mapPropsToValues: () => getDefaultValues(formConfig),
		validationSchema: getValidationSchema(formConfig),
		...otherFormikConfig,
	};
}
