// @flow

import React, { Component } from 'react';

import { Button } from '../../UI/Button/Button';
import { Form } from '../../Form/Form';
import { withFormikFromConfig } from '../../Form/helpers/formHelpers';
import i18n from 'i18n';
import styles from './styles';
import type { FormConfig, FormikActions, FormikProps } from 'flow-types';

// needs to be defined here, otherwise flow shows problems..
type FormikBag<P, V> = { props: P } & FormikActions<V>;

export type CreateAccountFormValues = {|
	email: string,
	password: string,
|};

type Props = FormikProps<CreateAccountFormValues>;

type SubmitProps = {|
	onSubmit: (
		email: string,
		password: string,
		formActions: FormikActions<CreateAccountFormValues>
	) => void,
|};

const formConfig: FormConfig = {
	fields: [Form.Presets.email, Form.Presets.password],
};

class CreateAccountForm extends Component<Props> {
	render() {
		const { isSubmitting, isValid, handleSubmit } = this.props;
		return (
			<React.Fragment>
				{Form.getInputsFromConfig(this.props, formConfig)}
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
		{ props, ...formActions }: FormikBag<SubmitProps, CreateAccountFormValues>
	) => {
		props.onSubmit(values.email, values.password, formActions);
	},
})(CreateAccountForm);
