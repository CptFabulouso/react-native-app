// @flow

import { Text, View } from 'react-native';
import React, { Component } from 'react';

import styles from './styles';

type Props = {|
	style?: any,
|};

class LoadingScreen extends Component<Props> {
	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				<Text>LoadingScreen</Text>
			</View>
		);
	}
}

export default LoadingScreen;
