import { View } from 'react-native';
import React, { Component } from 'react';

import {
	Button,
	FormWrapper,
	KeyboardDismissView,
	Logo,
	Title,
} from 'src/components';
import { CreateAccountForm } from 'src/containers';
import {
	InjectedKeyboardListenerProps,
	withKeyboardListener,
} from 'src/Lib/KeyboardAccessoryView';
import { ViewStyle } from 'src/types';
import NavigationActions from 'src/navigation/NavigationActions';
import i18n from 'src/i18n';
import styles from './styles';

type Props = InjectedKeyboardListenerProps;

class CreateAccount extends Component<Props> {
	renderContent() {
		const { isKeyboardVisible } = this.props;

		return (
			<View style={styles.content}>
				<FormWrapper>
					<Title>{i18n.t('auth.createNewAccount')}</Title>
					<CreateAccountForm />
				</FormWrapper>
				<Button
					label="Or log in"
					onPress={() => {
						NavigationActions.pop();
					}}
					transparent
					small
					hidden={isKeyboardVisible}
				/>
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

export default withKeyboardListener(CreateAccount);
