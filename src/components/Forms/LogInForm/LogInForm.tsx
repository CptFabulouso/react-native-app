import { FormikProps } from 'formik';
import React, { Component } from 'react';

import { Button } from '../../UI/Button/Button';
import {
	FormConfig,
	FormFormikBag,
	FormPresets,
	FormSubmitProps,
	FormikFieldsFromConfig,
	withFormikFromConfig,
} from 'src/Lib/FormikHelper';
import i18n from 'src/i18n';
import styles from './styles';

export type LoginFormValues = {
	email: string;
	password: string;
};

type Props = FormikProps<LoginFormValues> & FormSubmitProps<LoginFormValues>;

const formConfig: FormConfig<LoginFormValues> = {
	fields: [
		{ ...FormPresets.email /* , defaultValue: 'pavelgric@gmail.com'  */ },
		{ ...FormPresets.password /* , defaultValue: 'password' */ },
	],
};

class LogInForm extends Component<Props> {
	render() {
		const { isSubmitting, isValid, handleSubmit } = this.props;
		return (
			<React.Fragment>
				<FormikFieldsFromConfig config={formConfig} formikProps={this.props} />
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
		{ props, ...formActions }: FormFormikBag<LoginFormValues>
	) => {
		props.onSubmit(values, formActions);
	},
	// isInitialValid: true,
})(LogInForm);
