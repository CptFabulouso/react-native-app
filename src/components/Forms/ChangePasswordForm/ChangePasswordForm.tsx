import * as yup from 'yup';
import { FormikActions, FormikBag, FormikProps } from 'formik';
import React, { Component } from 'react';

import { Button } from '../../UI/Button/Button';
import { Form } from '../../Form/Form';
import { FormConfig } from 'src/types';
import { withFormikFromConfig } from '../../Form/helpers/formHelpers';
import i18n from 'src/i18n';
import styles from './styles';

export type ChangePasswordFormValues = {
	email: string;
	token: string;
	password: string;
};

type Props = FormikProps<ChangePasswordFormValues>;

type SubmitProps = {
	email: string;
	token: string;
	onSubmit: (
		values: ChangePasswordFormValues,
		formActions: FormikActions<ChangePasswordFormValues>
	) => void;
};

const formConfig: FormConfig<ChangePasswordFormValues> = {
	fields: [
		{
			name: 'token',
			disabled: true,
			validate: yup.string(),
			hidden: true,
			componentProps: {
				label: i18n.t('auth.password'),
				placeholder: i18n.t('auth.password'),
				secureTextEntry: true,
			},
		},
		{ ...Form.Presets.email, disabled: true },
		Form.Presets.password,
	],
};

class ChangePasswordForm extends Component<Props> {
	render() {
		const { isSubmitting, isValid, handleSubmit } = this.props;
		return (
			<React.Fragment>
				{Form.getInputsFromConfig(this.props, formConfig)}
				<Button
					loading={isSubmitting}
					disabled={!isValid || isSubmitting}
					onPress={handleSubmit}
					label={i18n.t('auth.changePassword')}
					block
					shadow
					style={styles.button}
				/>
			</React.Fragment>
		);
	}
}

export default ChangePasswordForm;

export const ChangePasswordFormFormik = withFormikFromConfig(formConfig, {
	mapPropsToValues: props => ({
		email: props.email,
		token: props.token,
		password: '',
	}),
	handleSubmit: (
		values: ChangePasswordFormValues,
		{ props, ...formActions }: FormikBag<SubmitProps, ChangePasswordFormValues>
	) => {
		props.onSubmit(values, formActions);
	},
})(ChangePasswordForm);
