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

export type ForgottenPasswordFormValues = {
	email: string;
};

type Props = FormSubmitProps<ForgottenPasswordFormValues>;

const formConfig: FormConfig<ForgottenPasswordFormValues> = {
	fields: [FormPresets.email],
};

class ForgottenPasswordForm extends Component<Props> {
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
							label={i18n.t('auth.sendResetCode')}
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

export default ForgottenPasswordForm;
