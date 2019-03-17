import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { View } from 'react-native';
import React, { Component } from 'react';

import { ChangePasswordForm } from 'src/containers';
import {
	FormWrapper,
	KeyboardDismissView,
	Logo,
	SafeAreaView,
	Title,
} from 'src/components';
import {
	InjectedKeyboardListenerProps,
	withKeyboardListener,
} from 'src/Lib/KeyboardAccessoryView';
import { ViewStyle } from 'src/types';
import i18n from 'src/i18n';
import styles from './styles';

type Props = InjectedKeyboardListenerProps & {
	navigation: NavigationScreenProp<NavigationState>;
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

		const pageStyle: Array<ViewStyle> = [styles.page];
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

export default withKeyboardListener(ChangePassword);
