// @flow

import { View } from 'react-native';
import React, { Component } from 'react';

import {
	Button,
	FormWrapper,
	KeyboardDismissView,
	Logo,
	Title,
} from 'components';
import { CreateAccountForm } from 'containers';
import {
	type KeyboardListenerProps,
	withKeyboardListener,
} from 'lib/KeyboardAccessoryView';
import NavigationActions from 'navigation/NavigationActions';
import i18n from 'i18n';
import styles from './styles';
import { ComponentType } from 'flow-types';

type Props = {|
	...KeyboardListenerProps,
|};

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

		const pageStyle = [styles.page];
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

const withListener: ComponentType<*> = withKeyboardListener(CreateAccount);

export default withListener;
