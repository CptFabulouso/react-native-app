// @flow

import { Field, Formik } from 'formik';
import { SafeAreaView, View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import {
	Button,
	FormWrapper,
	InputFieldFormik,
	KeyboardDismissView,
} from 'components';
import { loginWithEmailAndPassword } from 'my-redux/actions';
import NavigationActions from 'navigation/NavigationActions';
import i18n from 'i18n';
import styles from './styles';
import type { ActionCreator, FormikActions } from 'flow-types';

type DispatchProps = {|
	loginWithEmailAndPassword: (
		email: string,
		password: string,
		formActions: FormikActions
	) => ActionCreator,
|};

type Props = {
	...DispatchProps,
};

type FormInputs = {|
	email: string,
	password: string,
|};

class LoginScreen extends Component<Props> {
	onSubmit: any => void;
	inputRefs: any = {};

	constructor(props: Props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit({ email, password }: FormInputs, formActions: FormikActions) {
		this.props.loginWithEmailAndPassword(email, password, formActions);
	}

	focusNextInput(nextFocus: string) {
		this.inputRefs[nextFocus] && this.inputRefs[nextFocus].focus();
	}

	render() {
		return (
			<SafeAreaView style={{flex:1}}>
				<KeyboardDismissView style={styles.page}>
					<FormWrapper>
						<Formik
							initialValues={{
								email: 'no create',
								password: 'password',
							}}
							isInitialValid={true}
							validate={validate}
							onSubmit={this.onSubmit}
							render={({ handleSubmit, isValid, isSubmitting }) => {
								return (
									<View>
										<Field
											disabled={isSubmitting}
											component={InputFieldFormik}
											name="email"
											placeholder={i18n.t('auth.email')}
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
											placeholder={i18n.t('auth.password')}
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
											label={i18n.t('auth.login')}
										/>
									</View>
								);
							}}
						/>
					</FormWrapper>
					<Button
						label={i18n.t('auth.createAccount')}
						onPress={() => NavigationActions.push('createAccount')}
					/>
					<Button
						label={i18n.t('auth.forgottenPassword')}
						onPress={() => NavigationActions.push('forgottenPassword')}
					/>
					<Button
						label={'PLAYGROUND'}
						onPress={() => NavigationActions.push('Playground')}
					/>
				</KeyboardDismissView>
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
	{ loginWithEmailAndPassword }
)(LoginScreen);
