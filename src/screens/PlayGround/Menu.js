// @flow

import { ScrollView, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

import { Button } from 'components';
import NavigationActions from 'navigation/NavigationActions';

type Props = {||};

const PGPaths = ['PGModal'];

class Menu extends Component<Props> {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.contentContainer}
				>
					{PGPaths.map(screen => {
						return (
							<Button
								key={screen}
								label={screen}
								onPress={() => {
									NavigationActions.push(screen);
								}}
							/>
						);
					})}
				</ScrollView>
				<Button
					label={'Back to Main'}
					onPress={() => {
						NavigationActions.push('UnAuth');
					}}
				/>
			</View>
		);
	}
}

export default Menu;

const styles = StyleSheet.create({
	container: {
		paddingTop: 60,
	},
	contentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},

	item: {
		fontSize: 24,
		paddingVertical: 20,
	},
});
