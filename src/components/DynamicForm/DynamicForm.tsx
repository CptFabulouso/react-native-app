import {
	Field,
	Formik,
	FormikActions,
	FormikProps,
	FormikValues,
} from 'formik';
import { View, ViewStyle } from 'react-native';
import {
	getInitialValues,
	getIsEditable,
	getNextField,
	getStyle,
	getValidationSchema,
} from './helpers/formHelpers';
import React, { Component, ReactNode } from 'react';

import {
	DynamicFieldProps,
	FieldType,
	FormConfig,
	FormConfigField,
} from './DynamicFormTypes';
import { LabelTextInputFormik } from './Fields/LabelTextInput/LabelTextInput';
import { SimpleTextInputFormik } from './Fields/SimpleTextInput/SimpleTextInput';

type Props<V extends FormikValues> = {
	config: FormConfig<V>;
	onSubmit: (values: V, formActions: FormikActions<V>) => void;
	defaultValues?: Partial<V>;
	autoFocusNextInputs: boolean;
	children?: (props: FormikProps<V>) => ReactNode;
	isInitialValid?: boolean;
	style?: ViewStyle;
};

class DynamicForm<V extends FormikValues> extends Component<Props<V>> {
	fieldRefs: any = {};

	static defaultProps = {
		autoFocusNextInputs: true,
	};

	focusNextInputOrSubmit = (
		formikProps: FormikProps<V>,
		nextField: FormConfigField<keyof V> | undefined
	) => (ev: any) => {
		if (nextField) {
			const nextFieldName = nextField.name;
			this.fieldRefs[nextFieldName] && this.fieldRefs[nextFieldName].focus();
		} else {
			if (formikProps.isValid) {
				formikProps.handleSubmit && formikProps.handleSubmit(ev);
			}
		}
	};

	getInjectedProps(
		props: FormikProps<V>,
		field: FormConfigField<keyof V>,
		index: number
	): DynamicFieldProps<V> {
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
			onSubmitEditing = nextField
				? this.focusNextInputOrSubmit(props, nextField)
				: undefined;
			isLast = nextField ? false : true;
		}

		return {
			dynamic: {
				index,
				style,
				editable,
				blurOnSubmit,
				onSubmitEditing,
				isLast,
				nextField,
				getRef: ref => {
					this.fieldRefs[field.name] = ref;
				},
			},
		};
	}

	getComponent(type: FieldType) {
		switch (type) {
			case 'floatLabelTextInput':
				return LabelTextInputFormik;
			case 'textInput':
				return SimpleTextInputFormik;
		}
		return null;
	}

	renderForm = (props: FormikProps<V>) => {
		const { config, children } = this.props;

		return (
			<View style={this.props.style}>
				{config.fields.map((fieldConfig, index) => {
					if (fieldConfig.type === 'hidden') {
						return null;
					}

					const Component = this.getComponent(fieldConfig.type);
					if (!Component) {
						console.warn('received unknown form type ' + fieldConfig.type);
						return null;
					}

					const injectedProps = this.getInjectedProps(
						props,
						fieldConfig,
						index
					);

					return (
						<Field
							// Formik Field props
							key={fieldConfig.name}
							name={fieldConfig.name}
							component={Component}
							// injected props
							label={fieldConfig.label}
							placeholder={fieldConfig.placeholder}
							{...injectedProps}
							{...fieldConfig.componentProps}
						/>
					);
				})}
				{children && children({ ...props })}
			</View>
		);
	};

	render() {
		const { config, onSubmit, isInitialValid, defaultValues } = this.props;

		const initialValues = getInitialValues(config, defaultValues);
		const validationSchema = getValidationSchema(config);

		return (
			<Formik
				onSubmit={onSubmit}
				validationSchema={validationSchema}
				initialValues={initialValues}
				isInitialValid={isInitialValid}
				render={this.renderForm}
			/>
		);
	}
}

export default DynamicForm;
