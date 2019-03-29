import * as yup from 'yup';
import { FormikActions, FormikBag, FormikValues } from 'formik';

import { TextInputProps } from 'react-native';

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

export type CustomFormConfig<
F extends Array<string>,
V extends FormikValues
> = {
	fields: Array<
		HiddenType<keyof V> | CreateCustomFieldType<keyof V, F[number]>
	>;
	style?: any;
};

type FieldType = 'floatLabelTextInput' | 'textInput' | 'hidden';

type CommonFieldValues<K> = {
	name: K;
	validate: yup.StringSchema;
	component?: any;
	defaultValue?: string;
	disabled?: boolean;
};

export type CreateFieldType<K, TYPE extends FieldType> = CommonFieldValues<
	K
> & {
	type: TYPE;
	componentProps: TextInputProps & {
		label?: string;
		getRef?: (ref: any) => void;
		error?: string;
		touched?: boolean;
	};
};

export type CreateCustomFieldType<K, TYPE extends string> = CommonFieldValues<
	K
> & {
	type: TYPE;
	componentProps: TextInputProps & {
		label?: string;
		getRef?: (ref: any) => void;
		error?: string;
		touched?: boolean;
	};
};

type HiddenType<K> = {
	type: 'hidden';
	name: K;
};

export type FloatingLabelTextInputType<K> = CreateFieldType<
	K,
	'floatLabelTextInput'
>;
export type SimpleTextInputType<K> = CreateFieldType<K, 'textInput'>;

export type FormConfigField<K> =
	| FloatingLabelTextInputType<K>
	| SimpleTextInputType<K>
	| HiddenType<K>;
