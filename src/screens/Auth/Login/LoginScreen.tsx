import { View } from 'react-native';
import React, { Component } from 'react';

import { Button, FormWrapper, KeyboardDismissView, Logo } from 'src/components';
import {
	InjectedKeyboardListenerProps,
	withKeyboardListener,
} from 'src/Lib/KeyboardAccessoryView';
import { LoginForm } from 'src/containers';
import { ViewStyle } from 'src/types';
import NavigationActions from 'src/navigation/NavigationActions';
import i18n from 'src/i18n';
import styles from './styles';

type Props = InjectedKeyboardListenerProps;

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

		const pageStyle: Array<ViewStyle> = [styles.page];
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

export default withKeyboardListener(LoginScreen);
