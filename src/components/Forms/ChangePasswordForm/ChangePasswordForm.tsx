import React, { Component } from 'react';

import { Button } from '../../UI/Button/Button';
import { CustomFormConfig, DynamicForm, FormPresets } from '../../Form/Form';
import { FormSubmitProps } from 'src/Lib/DynamicForm';
import i18n from 'src/i18n';
import styles from './styles';

export type ChangePasswordFormValues = {
	email: string;
	token: string;
	password: string;
};

type Props = FormSubmitProps<ChangePasswordFormValues>;

const formConfig: CustomFormConfig<ChangePasswordFormValues> = {
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

class Form extends DynamicForm<ChangePasswordFormValues> {}

class ChangePasswordForm extends Component<Props> {
	render() {
		const { onSubmit } = this.props;

		return (
			<Form config={formConfig} onSubmit={onSubmit}>
				{({ isSubmitting, isValid, handleSubmit }) => {
					return (
						<Button
							loading={isSubmitting}
							disabled={!isValid || isSubmitting}
							onPress={handleSubmit}
							label={i18n.t('auth.changePassword')}
							block
							shadow
							style={styles.button}
						/>
					);
				}}
			</Form>
		);
	}
}

export default ChangePasswordForm;
