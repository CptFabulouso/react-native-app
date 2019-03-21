import * as yup from 'yup';
import { FormConfigField } from 'src/Lib/DynamicForm';

import i18n from 'src/i18n';

const password: FormConfigField<'password'> = {
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

const email: FormConfigField<'email'> = {
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
