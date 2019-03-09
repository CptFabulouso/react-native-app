// @flow

import { View } from 'react-native';
import React, { Component } from 'react';
import type { NavigationScreenProp, NavigationState } from 'react-navigation';

import { ChangePasswordForm } from 'containers';
import {
	FormWrapper,
	KeyboardDismissView,
	Logo,
	SafeAreaView,
	Title,
} from 'components';
import {
	type KeyboardListenerProps,
	withKeyboardListener,
} from 'lib/KeyboardAccessoryView';
import i18n from 'i18n';
import styles from './styles';
import type { ComponentType } from 'flow-types';

type Props = {
	...KeyboardListenerProps,
	navigation: NavigationScreenProp<NavigationState>,
};

class ChangePassword extends Component<Props> {
	renderContent() {
		const token = this.props.navigation.getParam('token', undefined);
		const email = this.props.navigation.getParam('email') || 'fixme@mail.com';

		return (
			<View style={styles.content}>
				<FormWrapper>
					<Title>{i18n.t('auth.enterNewPassword')}</Title>
					<ChangePasswordForm token={token} email={email} />
				</FormWrapper>
			</View>
		);
	}

	render() {
		const { isKeyboardVisible, visibleHeight } = this.props;

		const pageStyle = [styles.page];
		if (isKeyboardVisible) {
			pageStyle.push(...[{ flex: 0, height: visibleHeight }]);
		}

		return (
			<SafeAreaView>
				<KeyboardDismissView style={pageStyle}>
					<Logo />
					{this.renderContent()}
				</KeyboardDismissView>
			</SafeAreaView>
		);
	}
}

const withListener: ComponentType<*> = withKeyboardListener(ChangePassword);

export default withListener;
