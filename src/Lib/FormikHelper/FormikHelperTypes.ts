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

export type FormConfig<V> = {
	fields: Array<ConfigField<V>>;
	style?: any;
};

type FieldType = 'floatLabelTextInput' | 'textInput' | 'hidden';

type CommonFieldValues<V> = {
	name: string;
	validate: yup.StringSchema;
	component?: any;
	defaultValue?: string;
	disabled?: boolean;
};

type CreateFieldType<V, TYPE extends FieldType> = CommonFieldValues<V> & {
	type: TYPE;
	componentProps: TextInputProps & {
		label?: string;
		getRef?: (ref: any) => void;
		error?: string;
		touched?: boolean;
	};
};

type HiddenType<V> = {
	type: 'hidden';
	name: keyof V;
};

export type FloatingLabelTextInputType<V> = CreateFieldType<
	V,
	'floatLabelTextInput'
>;
export type SimpleTextInputType<V> = CreateFieldType<V, 'textInput'>;

export type ConfigField<V extends FormikValues> =
	| FloatingLabelTextInputType<V>
	| SimpleTextInputType<V>
	| HiddenType<V>;
