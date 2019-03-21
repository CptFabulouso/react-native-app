import {
	// CustomFormConfig,
	FormConfig,
	FormConfigField,
} from './DynamicFormTypes';
// import { Subtract } from 'utility-types';

import {
	Field,
	Formik,
	FormikActions,
	FormikProps,
	FormikValues,
} from 'formik';
import {
	getInitialValues,
	getIsEditable,
	getNextField,
	getStyle,
	getValidationSchema,
} from './formHelpers';
import React, { Component, ComponentType, ReactNode } from 'react';

import { SimpleTextInputFormik } from 'src/components';

export type Props<V extends FormikValues> = {
	config: FormConfig<V>;
	onSubmit: (values: V, formActions: FormikActions<V>) => void;
	autoFocusNextInputs?: boolean;
	customFields?: CustomField<V>;
	children?: (props: FormikProps<V>) => ReactNode;
};

//TODO: how to use FieldProps type from Formik?
type FieldProps<V = any> = {
	field?: {
		onChange: (name: string) => (val: string) => void;
		onBlur: (name: string) => (e: any) => void;
		value: any;
		name: string;
	};
	form?: FormikProps<V>;
};

export type CustomFieldProps<V = any> = FieldProps<V> & {
	// props: FormikProps<V>;
	dynamic?: FieldInjectedProps<V>;
};

export type CustomField<V> = {
	[fieldName: string]: ComponentType<CustomFieldProps<V>>;
	// [fieldName: string]: (
	// props: FormikProps<V>,
	// field: FormConfigField<keyof V>,
	// index: number
	// ) => ReactNode;
};

type FieldInjectedProps<V> = {
	index: number;
	style: any;
	editable: boolean | undefined;
	blurOnSubmit: boolean | undefined;
	onSubmitEditing: ((ev: any) => void) | undefined;
	isLast: boolean;
	nextField: FormConfigField<keyof V> | null;
};

class DynamicForm<V> extends Component<Props<V>> {
	refs: any = {};

	focusNextInputOrSubmit = (
		formikProps: FormikProps<V>,
		nextField: FormConfigField<keyof V> | null
	) => (ev: any) => {
		if (nextField) {
			const nextFieldName = nextField.name;
			// eslint-disable-next-line
			this.refs[nextFieldName] && this.refs[nextFieldName].focus();
		} else {
			if (formikProps.isValid) {
				formikProps.handleSubmit && formikProps.handleSubmit(ev);
			}
		}
	};

	renderTextInput(
		props: FormikProps<V>,
		field: FormConfigField<keyof V>,
		index: number
	) {
		if (field.type === 'hidden') {
			return null;
		}

		return (
			<Field
				// Formik Field props
				key={field.name}
				name={field.name}
				component={SimpleTextInputFormik}
				// injected props
				dynamic={this.getInjectedProps(props, field, index)}
			/>
		);
	}

	getInjectedProps(
		props: FormikProps<V>,
		field: FormConfigField<keyof V>,
		index: number
	): FieldInjectedProps<V> {
		const { autoFocusNextInputs, config } = this.props;

		const style = getStyle(config, field);
		const editable = getIsEditable(field);

		let blurOnSubmit = undefined;
		let onSubmitEditing = undefined;
		let isLast = false;
		let nextField: FormConfigField<keyof V> | null = null;
		if (autoFocusNextInputs) {
			nextField = getNextField(config, index);
			blurOnSubmit = nextField ? false : true;
			onSubmitEditing = autoFocusNextInputs
				? this.focusNextInputOrSubmit(props, nextField)
				: undefined;
			isLast = nextField ? false : true;
		}

		return {
			index,
			style,
			editable,
			blurOnSubmit,
			onSubmitEditing,
			isLast,
			nextField,
		};
	}

	renderForm(props: FormikProps<V>) {
		const { config, customFields, children } = this.props;

		return (
			<React.Fragment>
				{config.fields.map((fieldConfig, index) => {
					if (fieldConfig.type === 'hidden') {
						return null;
					}
					if (customFields && customFields[fieldConfig.type]) {
						const CustomField = customFields[fieldConfig.type];
						return (
							<Field
								// Formik Field props
								key={fieldConfig.name}
								name={fieldConfig.name}
								component={CustomField}
								// injected props
								dynamic={this.getInjectedProps(props, fieldConfig, index)}
							/>
						);
					}

					switch (fieldConfig.type) {
						case 'textInput':
							return this.renderTextInput(props, fieldConfig, index);
						default:
							console.warn('received unknown form type ' + fieldConfig.type);
							return null;
					}
				})}
				{children && children({ ...props })}
			</React.Fragment>
		);
	}

	render() {
		const { config, onSubmit } = this.props;

		const initialValues = getInitialValues(config);
		const validationSchema = getValidationSchema(config);

		return (
			<div className="app">
				<h1>Dynamic International Form</h1>
				<Formik
					onSubmit={onSubmit}
					validationSchema={validationSchema}
					initialValues={initialValues}
					render={this.renderForm}
				/>
			</div>
		);
	}
}

export default DynamicForm;
