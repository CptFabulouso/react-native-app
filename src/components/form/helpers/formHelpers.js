// @flow

// FIXME: fix types with <any>

import * as yup from 'yup';
import { Field, withFormik } from 'formik';
import React from 'react';

import { FloatingLabelTextInputFormik } from '../Fields/FloatingLabelTextInput/FloatingLabelTextInput';
import type {
	// ComponentType,
	FormikProps,
	Style,
	WithFormikConfig,
} from 'flow-types';

export type ConfigField = {|
	name: string,
	validate: string => ?string, //
	disabled?: boolean,
	hidden?: boolean,
	component?: any, //
	defaultValue?: string, //
	componentProps: ?{|
		label: string,
		style?: Style,
		placeholder?: string,
		onSubmitEditing?: () => void,
		returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send',
		secureTextEntry?: boolean,
		keyboardType?:
			| 'default'
			| 'number-pad'
			| 'decimal-pad'
			| 'numeric'
			| 'email-address'
			| 'phone-pad',
	|},
|};

export type FormConfig = {|
	fields: Array<ConfigField>,
	style?: Style,
|};

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

	const focusNextInputOrSubmit = (nextField: ?ConfigField) => (ev: any) => {
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
				let nextField: ?ConfigField = null;
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
						getRef={ref => {
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
	const shape = config.fields.reduce((shape, fieldConfig) => {
		shape[fieldConfig.name] = fieldConfig.validate;
		return shape;
	}, {});

	return yup.object().shape(shape);
}

export function getValuesSchema(config: FormConfig) {
	return config.fields.reduce((values, fieldConfig) => {
		values[fieldConfig.name] = fieldConfig.defaultValue || '';
		return values;
	}, {});
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
