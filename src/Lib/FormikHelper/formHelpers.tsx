import * as yup from 'yup';
import { FormikValues, WithFormikConfig, withFormik } from 'formik';

import { FormConfig } from './FormikHelperTypes';

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

export function getDefaultValues<V extends FormikValues>(
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

export function withFormikFromConfig<P, V extends FormikValues>(
	formConfig: FormConfig<V>,
	formikConfig: WithFormikConfig<P, V>
) {
	// FIXME: fix component as any
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
