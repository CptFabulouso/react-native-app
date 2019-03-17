import { Dispatch, bindActionCreators } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { AppState, ComponentType, ViewStyle } from 'src/types';
import { ForgottenPasswordForm } from 'src/containers';
import {
	FormWrapper,
	KeyboardDismissView,
	Logo,
	Text,
	Title,
} from 'src/components';
import {
	InjectedKeyboardListenerProps,
	withKeyboardListener,
} from 'src/Lib/KeyboardAccessoryView';
import { getResetCodeState } from 'src/redux/selectors';
import { resetResetPasswordState } from '@actions';
import i18n from 'src/i18n';
import styles from './styles';

type DispatchProps = {
	resetResetPasswordState: () => void;
};

type StateProps = {
	sending: boolean;
	sent: boolean;
	error: string;
};

type Props = StateProps & DispatchProps & InjectedKeyboardListenerProps;

class ForgottenPassword extends Component<Props> {
	componentWillUnmount() {
		this.props.resetResetPasswordState();
	}

	renderContent() {
		return (
			<View style={styles.content}>
				<FormWrapper>
					<Title>{i18n.t('auth.enterEmail')}</Title>
					<ForgottenPasswordForm />
					{this.props.sent && <Text>{i18n.t('auth.instructionOnEmail')}</Text>}
				</FormWrapper>
			</View>
		);
	}

	render() {
		const { isKeyboardVisible, visibleHeight } = this.props;

		const pageStyle: Array<ViewStyle> = [styles.page];
		if (isKeyboardVisible) {
			pageStyle.push(...[{ flex: 0, height: visibleHeight }]);
		}

		return (
			<KeyboardDismissView style={pageStyle}>
				<Logo />
				{this.renderContent()}
			</KeyboardDismissView>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	...getResetCodeState(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
	bindActionCreators(
		{ resetResetPasswordState: resetResetPasswordState },
		dispatch
	);

// @ts-ignore FIXME: should be ComponentType, not any
const withListener: ComponentType = withKeyboardListener(ForgottenPassword);

export default connect<StateProps, DispatchProps, {}, AppState>(
	mapStateToProps,
	mapDispatchToProps
)(withListener);
