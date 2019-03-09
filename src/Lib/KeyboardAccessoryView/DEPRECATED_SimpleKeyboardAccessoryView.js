// @flow

import React, { Component } from 'react';
import type { ComponentType, Node } from 'react';

import { StyleSheet, View } from 'react-native';
import withKeyboardListener, {
	type KeyboardListenerProps,
} from './withKeyboardListener';

type Props = KeyboardListenerProps & {|
	bumperHeight: number,
	visibleOpacity: number,
	hiddenOpacity: number,
	alwaysVisible: boolean,
	hideBorder: boolean,
	inSafeAreaView: boolean,
	avoidKeyboard: boolean,
	style?: any,
	children: Node,
	keyboardHeight: number,
	isSafeAreaSupported: boolean,
|};

type State = {|
	visibleAccessoryHeight: number,
|};

class SimpleKeyboardAccessoryView extends Component<Props, State> {
	static defaultProps = {
		bumperHeight: 15,
		visibleOpacity: 1,
		hiddenOpacity: 0,
		alwaysVisible: false,
		hideBorder: false,
		inSafeAreaView: false,
		avoidKeyboard: false,
	};

	constructor(props: Props) {
		super(props);

		this.state = {
			visibleAccessoryHeight: 50,
		};
	}

	handleChildrenLayout = (layoutEvent: any) => {
		this.setState({
			visibleAccessoryHeight: layoutEvent.nativeEvent.layout.height,
		});
	};

	render() {
		// const { accessoryHeight } = this.state;

		const {
			isKeyboardVisible,
			keyboardHeight,
			bumperHeight,
			alwaysVisible,
			visibleOpacity,
			hiddenOpacity,
			hideBorder,
			style,
			inSafeAreaView,
			isSafeAreaSupported,
			// safeAreaBumper,
			// avoidKeyboard,
		} = this.props;

		// const visibleHeight =
		// 	accessoryHeight + (avoidKeyboard ? keyboardHeight : 0);
		const applySafeArea = isSafeAreaSupported && inSafeAreaView;
		const accessoryHeight = isKeyboardVisible
			? this.state.visibleAccessoryHeight
			: alwaysVisible
				? this.state.visibleAccessoryHeight
				: 0;

		const opacity =
			isKeyboardVisible || alwaysVisible ? visibleOpacity : hiddenOpacity;
		const bottom = keyboardHeight - bumperHeight - (applySafeArea ? 20 : 0);
		const height =
			accessoryHeight +
			bumperHeight +
			(applySafeArea ? (!isKeyboardVisible ? 20 : -10) : 0);

		return (
			<View>
				<View
					style={[
						styles.accessory,
						!hideBorder && styles.accessoryBorder,
						style,
						{
							opacity,
							bottom,
							height,
						},
					]}
				>
					<View onLayout={this.handleChildrenLayout}>
						{this.props.children}
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	accessory: {
		position: 'absolute',
		right: 0,
		left: 0,
		backgroundColor: '#EFF0F1',
	},
	accessoryBorder: {
		borderTopWidth: 1,
		borderTopColor: 'rgba(0,0,0,0.2)',
	},
});

const withListener: ComponentType<*> = withKeyboardListener(
	SimpleKeyboardAccessoryView
);

export default withListener;
