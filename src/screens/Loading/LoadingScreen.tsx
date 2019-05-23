import { View } from 'react-native';
import React, { Component } from 'react';

import { Text } from 'src/components';
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
