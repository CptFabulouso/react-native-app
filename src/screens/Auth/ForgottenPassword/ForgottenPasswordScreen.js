// @flow

import { Field, Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { Button, FormWrapper, InputFieldFormik, Text } from 'components';
import { getResetCodeState } from 'my-redux/selectors';
import {
	resetResetPasswordState,
	sendResetPasswordCode,
} from 'my-redux/actions';
import i18n from 'i18n';
import styles from './styles';
import type { FormikActions, State } from 'flow-types';

type DispatchProps = {|
	sendResetPasswordCode: (email: string, formActions: FormikActions) => void,
	resetResetPasswordState: () => void,
|};

type StateProps = {|
	sending: boolean,
	sent: boolean,
	error: string,
|};

type Props = {
	...StateProps,
	...DispatchProps,
};

type FormInputs = {|
	email: string,
|};

class ForgottenPassword extends Component<Props> {
	onSubmit: any => void;

	constructor(props: Props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit({ email }: FormInputs, formActions: FormikActions) {
		this.props.sendResetPasswordCode(email, formActions);
	}

	componentWillUnmount() {
		this.props.resetResetPasswordState();
	}

	render() {
		return (
			<SafeAreaView>
				<KeyboardAwareScrollView
					contentContainerStyle={styles.contentContainer}
				>
					<View style={styles.container}>
						<Text>Enter your email address</Text>
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
												onSubmitEditing={handleSubmit}
												returnKeyType="send"
											/>
											<Button
												loading={isSubmitting}
												disabled={!isValid || isSubmitting}
												onPress={handleSubmit}
												label={i18n.t('auth.sendResetCode')}
											/>
										</View>
									);
								}}
							/>
						</FormWrapper>
						{this.props.sent && (
							<Text>{i18n.t('auth.instructionOnEmail')}</Text>
						)}
					</View>
				</KeyboardAwareScrollView>
			</SafeAreaView>
		);
	}
}

const validate = ({ email }: FormInputs) => {
	const errors = {};
	if (email === undefined || email.trim() === '') {
		errors.email = 'Required';
	}
	return errors;
};

const mapStateToProps = (state: State) => ({
	...getResetCodeState(state),
});

export default connect(
	mapStateToProps,
	{ sendResetPasswordCode, resetResetPasswordState }
)(ForgottenPassword);
