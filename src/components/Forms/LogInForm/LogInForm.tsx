import { FormikActions, FormikBag, FormikProps } from 'formik';
import React, { Component } from 'react';

import { Button } from '../../UI/Button/Button';
import { Form } from '../../Form/Form';
import { withFormikFromConfig } from '../../Form/helpers/formHelpers';
import i18n from 'src/i18n';
import styles from './styles';
import { FormConfig } from 'src/types';

export type LoginFormValues = {
	email: string,
	password: string,
};

type Props = FormikProps<LoginFormValues>;

type SubmitProps = {
	onSubmit: (
		email: string,
		password: string,
		formActions: FormikActions<LoginFormValues>
	) => void,
};

const formConfig: FormConfig = {
	fields: [
		{ ...Form.Presets.email /* , defaultValue: 'pavelgric@gmail.com'  */ },
		{ ...Form.Presets.password /* , defaultValue: 'password' */ },
	],
};

class LogInForm extends Component<Props> {
	render() {
		const { isSubmitting, isValid, handleSubmit } = this.props;
		return (
			<React.Fragment>
				{Form.getInputsFromConfig(this.props, formConfig)}
				<Button
					loading={isSubmitting}
					disabled={!isValid || isSubmitting}
					onPress={handleSubmit}
					label={i18n.t('auth.login')}
					block
					shadow
					style={styles.button}
				/>
			</React.Fragment>
		);
	}
}

export default LogInForm;

export const LoginFormFormik = withFormikFromConfig(formConfig, {
	handleSubmit: (
		values: LoginFormValues,
		{ props, ...formActions }: FormikBag<SubmitProps, LoginFormValues>
	) => {
		props.onSubmit(values.email, values.password, formActions);
	},
	// isInitialValid: true,
})(LogInForm);
