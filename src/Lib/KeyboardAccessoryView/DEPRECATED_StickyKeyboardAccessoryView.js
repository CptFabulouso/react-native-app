// @flow

import React, { Component } from 'react';
import type { ComponentType, Node } from 'react';

import { Platform, StyleSheet, View } from 'react-native';
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
	children: Node,
	keyboardHeight: number,
	isKeyboardVisible: boolean,
	isSafeAreaSupported: boolean,
	renderRest?: RestProps => Node,
	renderSticky?: StickyProps => Node,
|};

type RenderInjectedProps = {|
	stick: boolean,
	enableStick: () => void,
	disableStick: () => void,
|};

export type StickyProps = {|
	...Props,
	...State,
	...RenderInjectedProps,
|};

export type RestProps = {|
	...Props,
	...State,
	...RenderInjectedProps,
|};

type State = {|
	visibleAccessoryHeight: number,
	accessoryBottom: number,
	accessoryHeight: number,
	visibleBottom: number,
|};

class StickyKeyboardAccessoryView extends Component<Props, State> {
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
		} = nextProps;

		const applySafeArea = isSafeAreaSupported && inSafeAreaView;
		const accessoryHeight = isKeyboardVisible
			? nexState.visibleAccessoryHeight
			: alwaysVisible
				? nexState.visibleAccessoryHeight
				: 0;

		const bottom = keyboardHeight - bumperHeight - (applySafeArea ? 20 : 0);
		const height =
			accessoryHeight +
			bumperHeight +
			(applySafeArea ? (!isKeyboardVisible ? 20 : -10) : 0);

		return {
			accessoryBottom: bottom,
			accessoryHeight: height,
			visibleBottom: bottom + height,
		};
	}

	handleKAVLayout = (layoutEvent: any) => {
		this.setState({
			visibleAccessoryHeight: layoutEvent.nativeEvent.layout.height,
		});
	};

	renderRest() {
		if(!this.props.renderRest){
			return null;
		}
		return this.props.renderRest({
			...this.props,
			...this.state,
			stick: this.stick,
			enableStick: () => {
				this.stick = true;
			},
			disableStick: () => {
				this.stick = false;
			},
		});
	}

	renderSticky() {
		if (!this.props.renderSticky) {
			return null;
		}
		const { visibleBottom } = this.state;
		const { isKeyboardVisible, keyboardHeightAndroid } = this.props;

		let stickyBottom;
		if (Platform.OS === 'ios') {
			if (isKeyboardVisible && this.stick) {
				stickyBottom = visibleBottom;
			} else {
				stickyBottom = 0;
			}
		} else {
			if (isKeyboardVisible) {
				if (this.stick) {
					stickyBottom = visibleBottom;
				} else {
					stickyBottom = -keyboardHeightAndroid;
				}
			} else {
				stickyBottom = 0;
			}
		}

		return (
			<View style={{ bottom: stickyBottom }}>
				{this.props.renderSticky({
					...this.props,
					...this.state,
					stick: this.stick,
					enableStick: () => {
						this.stick = true;
					},
					disableStick: () => {
						this.stick = false;
					},
				})}
			</View>
		);
	}

	renderKAV() {
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
				<View onLayout={this.handleKAVLayout}>{this.props.children}</View>
			</View>
		);
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					{this.renderRest()}
					{this.renderSticky()}
				</View>
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
	StickyKeyboardAccessoryView
);

export default withListener;
