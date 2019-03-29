import * as yup from 'yup';
import { TextInputProps } from 'react-native';

import { CreateFieldType } from '../DynamicFormTypes';
import i18n from 'src/i18n';

const password: CreateFieldType<
'password',
'floatLabelTextInput',
TextInputProps
> = {
	type: 'floatLabelTextInput',
	name: 'password',
	label: i18n.t('auth.password'),
	placeholder: i18n.t('auth.password'),
	validate: yup
		.string()
		.min(8, i18n.t('forms.passwordShortLength', { length: 8 }))
		.required(i18n.t('forms.passwordRequired')),
	componentProps: {
		secureTextEntry: true,
	},
};

const email: CreateFieldType<'email', 'floatLabelTextInput', TextInputProps> = {
	type: 'floatLabelTextInput',
	name: 'email',
	label: i18n.t('auth.email'),
	placeholder: i18n.t('auth.email'),
	validate: yup
		.string()
		.email(i18n.t('forms.emailNotValid'))
		.required(i18n.t('forms.emailRequired')),
	componentProps: {
		keyboardType: 'email-address',
	},
};

export default {
	password,
	email,
};
