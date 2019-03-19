import { FormikProps } from 'formik';
import React, { Component } from 'react';

import { Button } from '../../UI/Button/Button';
import {
	FormConfig,
	FormFormikBag,
	FormPresets,
	FormikFieldsFromConfig,
	withFormikFromConfig,
} from 'src/Lib/FormikHelper';
import i18n from 'src/i18n';
import styles from './styles';

export type ForgottenPasswordFormValues = {
	email: string;
};

type Props = FormikProps<ForgottenPasswordFormValues>;

const formConfig: FormConfig<ForgottenPasswordFormValues> = {
	fields: [FormPresets.email],
};

class ForgottenPasswordForm extends Component<Props> {
	render() {
		const { isSubmitting, isValid, handleSubmit } = this.props;
		return (
			<React.Fragment>
				<FormikFieldsFromConfig config={formConfig} formikProps={this.props} />
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
		{ props, ...formActions }: FormFormikBag<ForgottenPasswordFormValues>
	) => {
		props.onSubmit(values, formActions);
	},
})(ForgottenPasswordForm);
