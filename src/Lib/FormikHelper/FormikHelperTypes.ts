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
	fields: Array<ConfigField<keyof V>>;
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

type CreateFieldType<K, TYPE extends FieldType> = CommonFieldValues<K> & {
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

export type ConfigField<K> =
	| FloatingLabelTextInputType<K>
	| SimpleTextInputType<K>
	| HiddenType<K>;
