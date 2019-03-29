// @flow

import * as yup from 'yup';
import { FormikActions, FormikBag, FormikValues } from 'formik';
import { TextInputProps } from 'react-native';

/* Form Types */

export type FormSubmitProps<Values extends FormikValues> = {
	onSubmit: (values: Values, formActions: FormikActions<Values>) => void;
};

export type FormFormikBag<Values extends FormikValues> = FormikBag<
	FormSubmitProps<Values>,
	Values
>;

export type FormConfig<V extends FormikValues> = {
	fields: Array<FormConfigField<keyof V>>;
	style?: any;
};

export type DynamicFieldProps<V> = {
	dynamic?: {
		index: number;
		style: any;
		editable: boolean | undefined;
		blurOnSubmit: boolean | undefined;
		onSubmitEditing: ((ev: any) => void) | undefined;
		isLast: boolean;
		nextField: FormConfigField<keyof V> | null;
		getRef: (ref: any) => void;
	};
};

// /* Field Type Creators */

export type CreateFieldType<K, TYPE extends FieldType, CP> = {
	type: TYPE;
	name: K;
	label?: string;
	placeholder?: string;
	validate: yup.StringSchema;
	defaultValue?: string;
	disabled?: boolean;
	componentProps?: CP;
};

// /* Field Types */

export type FieldType = 'floatLabelTextInput' | 'textInput' | 'hidden';

type HiddenType<K> = {
	type: 'hidden';
	name: K;
};

export type FormConfigField<K> =
	| CreateFieldType<K, 'floatLabelTextInput', TextInputProps>
	| CreateFieldType<K, 'textInput', TextInputProps>
	| HiddenType<K>;
