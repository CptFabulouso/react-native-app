import { Text, View } from 'react-native';
import React, { Component } from 'react';

import styles from './styles';

type Props = {};

class MainScreen extends Component<Props> {
	render() {
		return (
			<View style={styles.container}>
				<Text>MainScreen</Text>
			</View>
		);
	}
}

export default MainScreen;
