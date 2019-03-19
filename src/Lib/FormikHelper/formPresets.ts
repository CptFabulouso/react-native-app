import * as yup from 'yup';
import { FloatingLabelTextInputType } from './FormikHelperTypes';

import i18n from 'src/i18n';

const password: FloatingLabelTextInputType<{ password: string }> = {
	type: 'floatLabelTextInput',
	name: 'password',
	validate: yup
		.string()
		.min(8, i18n.t('forms.passwordShortLength', { length: 8 }))
		.required(i18n.t('forms.passwordRequired')),
	componentProps: {
		label: i18n.t('auth.password'),
		placeholder: i18n.t('auth.password'),
		secureTextEntry: true,
	},
};

const email: FloatingLabelTextInputType<{ email: string }> = {
	type: 'floatLabelTextInput',
	name: 'email',
	validate: yup
		.string()
		.email(i18n.t('forms.emailNotValid'))
		.required(i18n.t('forms.emailRequired')),
	componentProps: {
		label: i18n.t('auth.email'),
		placeholder: i18n.t('auth.email'),
		keyboardType: 'email-address',
	},
};

export default {
	password,
	email,
};
