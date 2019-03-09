// @flow

import { View } from 'react-native';
import React, { Component } from 'react';

import { Button, FormWrapper, KeyboardDismissView, Logo } from 'components';
import {
	type KeyboardListenerProps,
	withKeyboardListener,
} from 'lib/KeyboardAccessoryView';
import { LoginForm } from 'containers';
import NavigationActions from 'navigation/NavigationActions';
import i18n from 'i18n';
import styles from './styles';
import type { ComponentType } from 'flow-types';

type Props = {|
	...KeyboardListenerProps,
|};

class LoginScreen extends Component<Props> {
	renderPlaygroundBtn() {
		if (__DEV__) {
			return (
				<View style={{ position: 'absolute', bottom: 0, right: 0 }}>
					<Button
						label={'PLAYGROUND'}
						onPress={() => NavigationActions.push('Playground')}
						transparent
						small
					/>
				</View>
			);
		}
		return null;
	}

	render() {
		const { isKeyboardVisible, visibleHeight } = this.props;

		const pageStyle = [styles.page];
		if (isKeyboardVisible) {
			pageStyle.push(...[{ flex: 0, height: visibleHeight }]);
		}
		return (
			<KeyboardDismissView style={pageStyle}>
				<Logo />
				<View style={styles.content}>
					<FormWrapper wrapperStyle={styles.formContainer}>
						<LoginForm />
					</FormWrapper>
					<Button
						label={i18n.t('auth.createAccount')}
						onPress={() => NavigationActions.push('createAccount')}
						transparent
						small
						style={{ marginVertical: 15 }}
					/>
					<Button
						label={i18n.t('auth.forgottenPassword')}
						onPress={() => NavigationActions.push('forgottenPassword')}
						transparent
						small
					/>
					{this.renderPlaygroundBtn()}
				</View>
			</KeyboardDismissView>
		);
	}
}

const withListener: ComponentType<*> = withKeyboardListener(LoginScreen);

export default withListener;
