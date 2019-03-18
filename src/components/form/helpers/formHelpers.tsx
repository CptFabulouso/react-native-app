// FIXME: fix types with <any>

import * as yup from 'yup';
import {
	Field,
	FormikProps,
	FormikValues,
	WithFormikConfig,
	withFormik,
} from 'formik';
import { TextInput } from 'react-native';
import React from 'react';

import { FloatingLabelTextInputFormik } from '../Fields/FloatingLabelTextInput/FloatingLabelTextInput';
import {
	// ComponentType,
	Style,
} from 'src/types';

export type ConfigField<V> = {
	name: keyof V;
	validate: yup.StringSchema; //
	disabled?: boolean;
	hidden?: boolean;
	component?: any; //
	defaultValue?: string; //
	componentProps?: {
		label: string;
		style?: Style;
		placeholder?: string;
		onSubmitEditing?: () => void;
		returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
		secureTextEntry?: boolean;
		keyboardType?:
			| 'default'
			| 'number-pad'
			| 'decimal-pad'
			| 'numeric'
			| 'email-address'
			| 'phone-pad';
	};
};

export type FormConfig<V> = {
	fields: Array<ConfigField<V>>;
	style?: Style;
};

function extractOnlyFormikProps<P>(formikProps: FormikProps<P>) {
	return {
		isValid: formikProps.isValid,
		isSubmitting: formikProps.isSubmitting,
		handleSubmit: formikProps.handleSubmit,
	};
}

export function getInputsFromConfig<P, V extends FormikValues>(
	formikProps: FormikProps<P>,
	config: FormConfig<V>
) {
	const refs: any = {};

	const focusNextInputOrSubmit = (nextField: ConfigField<V> | null) => (
		ev: any
	) => {
		if (nextField) {
			const nextFieldName = nextField.name;
			refs[nextFieldName] && refs[nextFieldName].focus();
		} else {
			if (formikProps.isValid) {
				formikProps.handleSubmit && formikProps.handleSubmit(ev);
			}
		}
	};

	return (
		<React.Fragment>
			{config.fields.map((fieldConfig, index) => {
				if (fieldConfig.hidden) {
					return null;
				}
				let nextField = null;
				if (config.fields.length !== index - 1) {
					nextField = config.fields[index + 1];
				}
				const style = [config.style];
				if (fieldConfig.componentProps && fieldConfig.componentProps.style) {
					style.push(fieldConfig.componentProps.style);
				}

				return (
					<Field
						key={fieldConfig.name}
						disabled={fieldConfig.disabled}
						component={fieldConfig.component || FloatingLabelTextInputFormik}
						name={fieldConfig.name}
						style={style}
						getRef={(ref: TextInput) => {
							refs[fieldConfig.name] = ref;
						}}
						blurOnSubmit={nextField ? false : true}
						onSubmitEditing={focusNextInputOrSubmit(nextField)}
						returnKeyType={nextField ? 'next' : 'done'}
						{...fieldConfig.componentProps}
						{...extractOnlyFormikProps(formikProps)}
					/>
				);
			})}
		</React.Fragment>
	);
}

export function getValidationSchema<V extends FormikValues>(
	config: FormConfig<V>
) {
	const shape = {} as { [key: string]: yup.StringSchema };
	for (const k in config.fields) {
		if (config.fields.hasOwnProperty(k)) {
			shape[k] = config.fields[k].validate;
		}
	}

	return yup.object().shape(shape);
}

export function getDefaultValues<V extends FormikValues>(
	config: FormConfig<V>
): V {
	const values = {} as V;
	for (const k in config.fields) {
		if (config.fields.hasOwnProperty(k)) {
			values[k] = config.fields[k].defaultValue || '';
		}
	}
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
