import { Field, FormikProps, FormikValues } from 'formik';
import React from 'react';

import { ConfigField, FormConfig } from './FormikHelperTypes';
import { FloatingLabelTextInputFormik } from 'src/components/Form/Fields/FloatingLabelTextInput/FloatingLabelTextInput';
import { SimpleTextInputFormik } from 'src/components/Form/Fields/SimpleTextInput/SimpleTextInput';

type Props<T> = {
	formikProps: FormikProps<T>;
	config: FormConfig<T>;
	autoFocusNextInputs?: boolean;
};

function getNextField<V extends FormikValues>(
	config: FormConfig<V>,
	index: number
): ConfigField<V> | null {
	let nextField: ConfigField<V> | null = null;
	if (config.fields.length !== index - 1) {
		nextField = config.fields[index + 1];
	}
	return nextField;
}

// combine global style with field style
function getStyle<V extends FormikValues>(
	formConfig: FormConfig<V>,
	fieldConfig: ConfigField<V>
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

function getIsEditable<V extends FormikValues>(
	fieldConfig: ConfigField<V>
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

function FormikFieldsFromConfig<V extends FormikValues>({
	autoFocusNextInputs = true,
	...props
}: Props<V>) {
	const refs: any = {};

	const { formikProps, config } = props;

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
				if (fieldConfig.type === 'hidden') {
					return null;
				}

				const style = getStyle(config, fieldConfig);
				const editable = getIsEditable(fieldConfig);

				let blurOnSubmit = undefined;
				let onSubmitEditing = undefined;
				let returnKeyType = undefined;
				if (autoFocusNextInputs) {
					const nextField: ConfigField<V> | null = getNextField(config, index);
					blurOnSubmit = nextField ? false : true;
					onSubmitEditing = autoFocusNextInputs
						? focusNextInputOrSubmit(nextField)
						: undefined;
					returnKeyType = nextField ? 'next' : 'done';
				}
				console.log('fieldConfig', fieldConfig);
				switch (fieldConfig.type) {
					case 'floatLabelTextInput':
					case 'textInput': {
						const Component =
							fieldConfig.type === 'floatLabelTextInput'
								? FloatingLabelTextInputFormik
								: SimpleTextInputFormik;
						return (
							<Field
								// Formik Field props
								key={fieldConfig.name}
								name={fieldConfig.name}
								validate={fieldConfig.validate}
								component={Component}
								// injected props
								style={style}
								getRef={(ref: any) => {
									refs[fieldConfig.name] = ref;
								}}
								blurOnSubmit={blurOnSubmit}
								onSubmitEditing={onSubmitEditing}
								returnKeyType={returnKeyType}
								{...fieldConfig.componentProps}
								editable={editable}
							/>
						);
					}
					default:
						return null;
				}
			})}
		</React.Fragment>
	);
}

export { FormikFieldsFromConfig };
