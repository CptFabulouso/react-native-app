import React, { Component } from 'react';

import { Button } from '../../UI/Button/Button';
import {
	DynamicForm,
	FormConfig,
	FormPresets,
	FormSubmitProps,
} from '../../DynamicForm';
import i18n from 'src/i18n';
import styles from './styles';

export type ChangePasswordFormValues = {
	email: string;
	token: string;
	password: string;
};

type Props = FormSubmitProps<ChangePasswordFormValues> & {
	email: string;
	token: string;
};

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
		return (
			<DynamicForm
				config={formConfig}
				onSubmit={this.props.onSubmit}
				isInitialValid={true}
				defaultValues={{
					email: this.props.email,
					token: this.props.token,
				}}
			>
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
			</DynamicForm>
		);
	}
}

export default ChangePasswordForm;
