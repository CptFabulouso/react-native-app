// @flow

import { View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { ForgottenPasswordForm } from 'containers';
import {
	FormWrapper,
	KeyboardDismissView,
	Logo,
	SafeAreaView,
	Text,
	Title,
} from 'components';
import {
	type KeyboardListenerProps,
	withKeyboardListener,
} from 'lib/KeyboardAccessoryView';
import { getResetCodeState } from 'my-redux/selectors';
import { resetResetPasswordState } from 'my-redux/actions';
import i18n from 'i18n';
import styles from './styles';
import type { ComponentType, State } from 'flow-types';

type DispatchProps = {|
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
	...KeyboardListenerProps,
};

class ForgottenPassword extends Component<Props> {
	componentWillUnmount() {
		this.props.resetResetPasswordState();
	}

	renderContent() {
		const { isKeyboardVisible, visibleHeight } = this.props;

		const contentStyle = [styles.content];
		if (isKeyboardVisible) {
			contentStyle.push(...[{ flex: 0, height: visibleHeight }]);
		}

		return (
			<View style={contentStyle}>
				<FormWrapper>
					<Title>{i18n.t('auth.enterEmail')}</Title>
					<ForgottenPasswordForm />
				</FormWrapper>
				{this.props.sent && <Text>{i18n.t('auth.instructionOnEmail')}</Text>}
			</View>
		);
	}

	render() {
		return (
			<SafeAreaView>
				<KeyboardDismissView style={styles.page}>
					<Logo />
					{this.renderContent()}
				</KeyboardDismissView>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = (state: State) => ({
	...getResetCodeState(state),
});

const withListener: ComponentType<*> = withKeyboardListener(ForgottenPassword);

export default connect(
	mapStateToProps,
	{ resetResetPasswordState }
)(withListener);
