import { Text, View } from 'react-native';
import React, { Component } from 'react';

import styles from './styles';

type Props = {};

class LoadingScreen extends Component<Props> {
	render() {
		return (
			<View style={styles.container}>
				<Text>LoadingScreen</Text>
			</View>
		);
	}
}

export default LoadingScreen;
