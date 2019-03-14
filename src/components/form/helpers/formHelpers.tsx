// FIXME: fix types with <any>

import * as yup from 'yup';
import { Field, FormikProps, WithFormikConfig, withFormik } from 'formik';
import { StringSchema } from 'yup';
import { TextInput } from 'react-native';
import React from 'react';

import { FloatingLabelTextInputFormik } from '../Fields/FloatingLabelTextInput/FloatingLabelTextInput';
import {
	// ComponentType,
	Style,
} from 'src/types';

export type ConfigField = {
	name: string;
	validate: StringSchema; //
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

export type FormConfig = {
	fields: Array<ConfigField>;
	style?: Style;
};

function extractOnlyFormikProps(formikProps: FormikProps<any>) {
	return {
		isValid: formikProps.isValid,
		isSubmitting: formikProps.isSubmitting,
		handleSubmit: formikProps.handleSubmit,
	};
}

export function getInputsFromConfig(
	formikProps: FormikProps<any>,
	config: FormConfig
) {
	const refs: any = {};

	const focusNextInputOrSubmit = (nextField: ConfigField | null) => (
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

export function getValidationSchema(config: FormConfig) {
	const shape = {} as { [key: string]: StringSchema };
	for (const k in config.fields) {
		if (config.fields.hasOwnProperty(k)) {
			shape[k] = config.fields[k].validate;
		}
	}

	return yup.object().shape(shape);
}

export function getValuesSchema(config: FormConfig) {
	const values = {} as { [key: string]: string };
	for (const k in config.fields) {
		if (config.fields.hasOwnProperty(k)) {
			values[k] = config.fields[k].defaultValue || '';
		}
	}
	return values;
}

export function withFormikFromConfig(
	formConfig: FormConfig,
	formikConfig: WithFormikConfig<any, any>
) {
	return function(Component: any) {
		return withFormik({
			mapPropsToValues: () => getValuesSchema(formConfig),
			validationSchema: getValidationSchema(formConfig),
			...formikConfig,
		})(Component);
	};
}
