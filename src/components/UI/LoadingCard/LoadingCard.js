// @flow

import { ActivityIndicator, Text, View } from 'react-native';
import React, { Component } from 'react';

import styles from './styles';

type Props = {|
	title: string,
	style?: any,
|};

class LoadingCard extends Component<Props> {
	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				<ActivityIndicator />
				<Text style={styles.title}>{this.props.title}</Text>
			</View>
		);
	}
}

export { LoadingCard };
