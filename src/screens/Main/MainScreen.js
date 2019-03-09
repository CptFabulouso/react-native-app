// @flow

import { Text, View } from 'react-native';
import React, { Component } from 'react';

import styles from './styles';

type Props = {|
	style?: any,
|};

class MainScreen extends Component<Props> {
	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				<Text>MainScreen</Text>
			</View>
		);
	}
}

export default MainScreen;