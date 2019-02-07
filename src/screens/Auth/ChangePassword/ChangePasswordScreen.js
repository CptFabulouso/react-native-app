// @flow

import { Field, Formik } from 'formik';
import { KeyboardAwareScrollView as KASV } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import type { NavigationScreenProp, NavigationState } from 'react-navigation';

import { Button, FormWrapper, InputFieldFormik, Text } from 'components';
import { changePassword } from 'my-redux/actions';
import i18n from 'i18n';
import styles from './styles';
import type { ComponentType, FormikActions } from 'flow-types';

const KeyboardAwareScrollView: ComponentType<*> = KASV;

type DispatchProps = {|
	changePassword: (
		email: string,
		token: string,
		formActions: FormikActions
	) => void,
|};

type Props = {
	navigation: NavigationScreenProp<NavigationState>,
	...DispatchProps,
};

type FormInputs = {|
	password: string,
|};

class ChangePassword extends Component<Props> {
	onSubmit: any => void;

	constructor(props: Props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit({ password }: FormInputs, formActions: FormikActions) {
		const token = this.props.navigation.getParam('token', undefined);
		if (token) {
			this.props.changePassword(password, token, formActions);
		} else {
			//TODO: handle missing token
		}
	}

	render() {
		return (
			<SafeAreaView>
				<KeyboardAwareScrollView
					contentContainerStyle={styles.contentContainer}
				>
					<View style={[styles.container]}>
						<Text>Enter new password</Text>
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
												name="password"
												label={i18n.t('auth.password')}
												secureTextEntry={true}
											/>
											<Button
												loading={isSubmitting}
												disabled={!isValid || isSubmitting}
												onPress={handleSubmit}
												label={i18n.t('auth.changePassword')}
											/>
										</View>
									);
								}}
							/>
						</FormWrapper>
					</View>
				</KeyboardAwareScrollView>
			</SafeAreaView>
		);
	}
}

const validate = ({ password }: FormInputs) => {
	const errors = {};
	if (password === undefined || password.trim() === '') {
		errors.password = 'Required';
	}
	return errors;
};

export default connect(
	null,
	{ changePassword }
)(ChangePassword);
