// @flow

import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

import { Text } from '../Text/Text';
import styles from './styles';
import type { Style } from 'flow-types';

export type Props = {|
	style?: Style,
	labelStyle?: Style,
	label?: string,
	disabled?: boolean,
	loading?: boolean,
	onPress: () => void,
|};

class Button extends Component<Props> {
	render() {
		const containerStyle = [styles.container];
		if (this.props.disabled) {
			containerStyle.push(styles.containerDisabled);
		}
		if (this.props.style) {
			containerStyle.push(this.props.style);
		}

		return (
			<TouchableOpacity
				style={containerStyle}
				onPress={this.props.onPress}
				disabled={this.props.disabled}
			>
				<View style={{ flexDirection: 'row' }}>
					{this.props.loading && <ActivityIndicator />}
					<Text style={styles.label}>{this.props.label}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

export { Button };
