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

export type CreateAccountFormValues = {
	email: string;
	password: string;
};

type Props = FormikProps<CreateAccountFormValues>;

const formConfig: FormConfig<CreateAccountFormValues> = {
	fields: [FormPresets.email, FormPresets.password],
};

class CreateAccountForm extends Component<Props> {
	render() {
		const { isSubmitting, isValid, handleSubmit } = this.props;
		return (
			<React.Fragment>
				<FormikFieldsFromConfig config={formConfig} formikProps={this.props} />
				<Button
					loading={isSubmitting}
					disabled={!isValid || isSubmitting}
					onPress={handleSubmit}
					label={i18n.t('auth.createAccount')}
					block
					shadow
					style={styles.button}
				/>
			</React.Fragment>
		);
	}
}

export default CreateAccountForm;

export const CreateAccountFormFormik = withFormikFromConfig(formConfig, {
	handleSubmit: (
		values: CreateAccountFormValues,
		{ props, ...formActions }: FormFormikBag<CreateAccountFormValues>
	) => {
		props.onSubmit(values, formActions);
	},
})(CreateAccountForm);
