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

export type ChangePasswordFormValues = {
	email: string;
	token: string;
	password: string;
};

type Props = FormikProps<ChangePasswordFormValues>;

const formConfig: FormConfig<ChangePasswordFormValues> = {
	fields: [
		{
			type: 'hidden',
			name: 'token',
		},
		{
			type: 'floatLabelTextInput',
			...FormPresets.email,
			disabled: true,
		},
		FormPresets.password,
	],
};

class ChangePasswordForm extends Component<Props> {
	render() {
		const { isSubmitting, isValid, handleSubmit } = this.props;
		return (
			<React.Fragment>
				<FormikFieldsFromConfig config={formConfig} formikProps={this.props} />
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
		{ props, ...formActions }: FormFormikBag<ChangePasswordFormValues>
	) => {
		props.onSubmit(values, formActions);
	},
})(ChangePasswordForm);
