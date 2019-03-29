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

export type LoginFormValues = {
	email: string;
	password: string;
};

type Props = FormSubmitProps<LoginFormValues>;

const formConfig: FormConfig<LoginFormValues> = {
	fields: [
		{ ...FormPresets.email /* , defaultValue: 'pavelgric@gmail.com'  */ },
		{ ...FormPresets.password /* , defaultValue: 'password' */ },
	],
};

class LogInForm extends Component<Props> {
	render() {
		return (
			<DynamicForm
				config={formConfig}
				onSubmit={this.props.onSubmit}
				isInitialValid={true}
			>
				{({ isSubmitting, isValid, handleSubmit }) => {
					return (
						<Button
							loading={isSubmitting}
							disabled={!isValid || isSubmitting}
							onPress={handleSubmit}
							label={i18n.t('auth.login')}
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

export default LogInForm;
