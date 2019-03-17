import { Text, View } from 'react-native';
import React, { Component } from 'react';

import styles from './styles';

type Props = {};

class SettingsScreen extends Component<Props> {
	render() {
		return (
			<View style={styles.container}>
				<Text>SettingsScreen</Text>
			</View>
		);
	}
}

export default SettingsScreen;
