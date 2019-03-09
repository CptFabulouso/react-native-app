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
		const { isKeyboardVisible, visibleHeight } = this.props;

		const contentStyle = [styles.content];
		if (isKeyboardVisible) {
			contentStyle.push(...[{ flex: 0, height: visibleHeight }]);
		}
		const token = this.props.navigation.getParam('token', undefined);
		const email = this.props.navigation.getParam('email') || 'fixme@mail.com';

		return (
			<View style={contentStyle}>
				<FormWrapper>
					<Title>{i18n.t('auth.enterNewPassword')}</Title>
					<ChangePasswordForm token={token} email={email} />
				</FormWrapper>
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

const withListener: ComponentType<*> = withKeyboardListener(ChangePassword);

export default withListener;
