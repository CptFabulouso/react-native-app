// @flow

import { Field, Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { Button, FormWrapper, InputFieldFormik, Text } from 'components';
import { createAccountWithEmailAndPassword } from 'my-redux/actions';
import NavigationActions from 'navigation/NavigationActions';
import i18n from 'i18n';
import styles from './styles';
import type { FormikActions } from 'flow-types';

type DispatchProps = {|
	createAccountWithEmailAndPassword: (
		email: string,
		password: string,
		formActions: FormikActions
	) => void,
|};

type Props = {
	...DispatchProps,
};

type FormInputs = {|
	email: string,
	password: string,
|};

class CreateAccount extends Component<Props> {
	onSubmit: any => void;
	inputRefs: any = {};

	constructor(props: Props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit({ email, password }: FormInputs, formActions: FormikActions) {
		this.props.createAccountWithEmailAndPassword(email, password, formActions);
	}

	focusNextInput(nextFocus: string) {
		this.inputRefs[nextFocus] && this.inputRefs[nextFocus].focus();
	}

	render() {
		return (
			<SafeAreaView>
				<KeyboardAwareScrollView
					contentContainerStyle={styles.contentContainer}
				>
					<View style={styles.container}>
						<Text>Create new Account</Text>
						<FormWrapper>
							<Formik
								validate={validate}
								onSubmit={this.onSubmit}
								render={({ handleSubmit, isValid, isSubmitting }) => {
									return (
										<View>
											<Field
												disabled={isSubmitting}
												component={InputFieldFormik}
												name="email"
												label={i18n.t('auth.email')}
												onSubmitEditing={() => {
													this.focusNextInput('password');
												}}
												returnKeyType="next"
											/>
											<Field
												disabled={isSubmitting}
												component={InputFieldFormik}
												name="password"
												label={i18n.t('auth.password')}
												getRef={ref => {
													this.inputRefs['password'] = ref;
												}}
												onSubmitEditing={handleSubmit}
												returnKeyType="done"
												secureTextEntry={true}
											/>
											<Button
												loading={isSubmitting}
												disabled={!isValid || isSubmitting}
												onPress={handleSubmit}
												label={i18n.t('auth.createAccount')}
											/>
										</View>
									);
								}}
							/>
						</FormWrapper>
						<Button
							label="Or log in"
							onPress={() => {
								NavigationActions.pop();
							}}
						/>
					</View>
				</KeyboardAwareScrollView>
			</SafeAreaView>
		);
	}
}

const validate = ({ email, password }: FormInputs) => {
	const errors = {};
	if (email === undefined || email.trim() === '') {
		errors.email = 'Required';
	}
	if (password === undefined || password.trim() === '') {
		errors.password = 'Required';
	}
	return errors;
};

export default connect(
	null,
	{ createAccountWithEmailAndPassword }
)(CreateAccount);
