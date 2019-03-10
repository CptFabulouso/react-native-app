// @flow

import React, { Component } from 'react';
import { ComponentType, Node } from 'react';

import { StyleSheet, View } from 'react-native';
import withKeyboardListener, {
	type KeyboardListenerProps,
} from './withKeyboardListener';

type Props = {|
	...KeyboardListenerProps,
	bumperHeight: number,
	visibleOpacity: number,
	hiddenOpacity: number,
	alwaysVisible: boolean,
	hideBorder: boolean,
	inSafeAreaView: boolean,
	avoidKeyboard: boolean,
	style?: any,
	children: ?(KAVRenderProps) => Node,
	renderKAV: () => Node,
	keyboardHeight: number,
	isKeyboardVisible: boolean,
	isSafeAreaSupported: boolean,
|};

export type KAVRenderProps = {| ...Props, ...State |};

type State = {|
	visibleAccessoryHeight: number,
	accessoryBottom: number,
	accessoryHeight: number,
	visibleBottom: number,
|};

class KeyboardAccessoryView extends Component<Props, State> {
	static defaultProps = {
		bumperHeight: 15,
		visibleOpacity: 1,
		hiddenOpacity: 0,
		alwaysVisible: false,
		hideBorder: false,
		inSafeAreaView: false,
		avoidKeyboard: false,
	};

	stick: boolean;

	constructor(props: Props) {
		super(props);
		this.stick = true;

		this.state = {
			visibleAccessoryHeight: 50,
			accessoryBottom: 0,
			accessoryHeight: 0,
			visibleBottom: 0,
		};
	}

	static getDerivedStateFromProps(nextProps: Props, nexState: State) {
		const {
			isKeyboardVisible,
			keyboardHeight,
			bumperHeight,
			alwaysVisible,
			inSafeAreaView,
			isSafeAreaSupported,
			visibleOpacity,
			hiddenOpacity,
		} = nextProps;

		const applySafeArea = isSafeAreaSupported && inSafeAreaView;
		const accessoryHeight = isKeyboardVisible
			? nexState.visibleAccessoryHeight
			: alwaysVisible
				? nexState.visibleAccessoryHeight
				: 0;

		const opacity =
			isKeyboardVisible || alwaysVisible ? visibleOpacity : hiddenOpacity;
		const bottom = keyboardHeight - bumperHeight - (applySafeArea ? 20 : 0);
		const height =
			accessoryHeight +
			bumperHeight +
			(applySafeArea ? (!isKeyboardVisible ? 20 : -10) : 0);

		return {
			accessoryBottom: bottom,
			accessoryHeight: height,
			accessoryOpacity: opacity,
			visibleBottom: bottom + height,
		};
	}

	handleKAVLayout = (layoutEvent: any) => {
		this.setState({
			visibleAccessoryHeight: layoutEvent.nativeEvent.layout.height,
		});
	};

	renderKAV() {
		if (!this.props.renderKAV) {
			return null;
		}
		const { accessoryBottom, accessoryHeight } = this.state;

		const {
			isKeyboardVisible,
			alwaysVisible,
			visibleOpacity,
			hiddenOpacity,
			hideBorder,
			style,
		} = this.props;

		const opacity =
			isKeyboardVisible || alwaysVisible ? visibleOpacity : hiddenOpacity;
		const bottom = accessoryBottom;
		const height = accessoryHeight;

		return (
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
				<View onLayout={this.handleKAVLayout}>{this.props.renderKAV()}</View>
			</View>
		);
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{this.props.children &&
					this.props.children({
						...this.props,
						...this.state,
					})}
				{this.renderKAV()}
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
	KeyboardAccessoryView
);

export default withListener;
