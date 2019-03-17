import { FormikActions, FormikBag, FormikProps } from 'formik';
import React, { Component } from 'react';

import { Button } from '../../UI/Button/Button';
import { Form } from '../../Form/Form';
import { FormConfig } from 'src/types';
import { withFormikFromConfig } from '../../Form/helpers/formHelpers';
import i18n from 'src/i18n';
import styles from './styles';

export type ForgottenPasswordFormValues = {
	email: string;
};

type Props = FormikProps<ForgottenPasswordFormValues>;

type SubmitProps = {
	onSubmit: (
		email: string,
		formActions: FormikActions<ForgottenPasswordFormValues>
	) => void;
};

const formConfig: FormConfig = {
	fields: [Form.Presets.email],
};

class ForgottenPasswordForm extends Component<Props> {
	render() {
		const { isSubmitting, isValid, handleSubmit } = this.props;
		return (
			<React.Fragment>
				{Form.getInputsFromConfig(this.props, formConfig)}
				<Button
					loading={isSubmitting}
					disabled={!isValid || isSubmitting}
					onPress={handleSubmit}
					label={i18n.t('auth.sendResetCode')}
					block
					shadow
					style={styles.button}
				/>
			</React.Fragment>
		);
	}
}

export default ForgottenPasswordForm;

export const ForgottenPasswordFormFormik = withFormikFromConfig(formConfig, {
	handleSubmit: (
		values: ForgottenPasswordFormValues,
		{
			props,
			...formActions
		}: FormikBag<SubmitProps, ForgottenPasswordFormValues>
	) => {
		props.onSubmit(values.email, formActions);
	},
})(ForgottenPasswordForm);
