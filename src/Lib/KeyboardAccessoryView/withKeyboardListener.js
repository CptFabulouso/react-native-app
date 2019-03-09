// @flow

import React, { Component } from 'react';
import type { ComponentType, ElementConfig } from 'react';

import { Dimensions, Keyboard, LayoutAnimation, Platform } from 'react-native';

type EasingOption =
	| 'easeIn'
	| 'easeInEaseOut'
	| 'easeOut'
	| 'keyboard'
	| 'linear'
	| 'spring';
type AnimationConfig =
	| Object
	| ((duration: number, easing: EasingOption) => void);

type OwnProps = {|
	animateOn: 'ios' | 'android' | 'all' | 'none',
	androidAdjustResize: boolean,
	onKeyboardShowDelay?: number | boolean,
	animationConfig?: AnimationConfig,
|};

type OwnState = {|
	visibleHeight: number,
	keyboardHeight: number,
	keyboardHeightAndroid: number,
	isKeyboardVisible: boolean,
|};

type InjectedProps = {|
	...OwnState,
	isSafeAreaSupported: boolean,
|};

export type KeyboardListenerProps = {| ...OwnProps, ...InjectedProps |};

const accessoryAnimation = (
	duration: number,
	easing: EasingOption,
	animationConfig: ?AnimationConfig = null
): any => {
	if (animationConfig) {
		if (typeof animationConfig === 'function') {
			return animationConfig(duration, easing);
		}
		return animationConfig;
	}

	if (Platform.OS === 'android') {
		return {
			duration: 200,
			create: {
				duration: 200,
				type: LayoutAnimation.Types.linear,
				property: LayoutAnimation.Properties.opacity,
			},
			update: {
				type: LayoutAnimation.Types.linear,
			},
		};
	}

	return LayoutAnimation.create(
		duration,
		LayoutAnimation.Types[easing],
		LayoutAnimation.Properties.opacity
	);
};

const { height, width } = Dimensions.get('window');
const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

const isSafeAreaSupported =
	Platform.OS === 'ios' && (screenWidth > 800 || screenHeight > 800);

export default function withKeyboardListener<PassedProps: any>(
	WrappedComponent: ComponentType<PassedProps>
): ComponentType<
	ElementConfig<ComponentType<$Diff<PassedProps, KeyboardListenerProps>>>
> {
	return class Wrapper extends Component<
		$Diff<PassedProps, OwnProps>,
		OwnState
	> {
		static defaultProps = {
			animateOn: 'ios',
			androidAdjustResize: true,
		};

		handleKeyboardShow: any;
		handleKeyboardHide: any;
		keyboardShowEventListener: any;
		keyboardHideEventListener: any;

		constructor(props: PassedProps) {
			super(props);

			this.state = {
				visibleHeight: screenHeight,
				keyboardHeight: 0,
				keyboardHeightAndroid: 0,
				isKeyboardVisible: false,
			};
		}

		componentDidMount() {
			const keyboardShowEvent =
				Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
			const keyboardHideEvent =
				Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

			this.keyboardShowEventListener = Keyboard.addListener(
				keyboardShowEvent,
				this.handleKeyboardShow
			);
			this.keyboardHideEventListener = Keyboard.addListener(
				keyboardHideEvent,
				this.handleKeyboardHide
			);
		}

		componentWillUnmount() {
			this.keyboardShowEventListener.remove();
			this.keyboardHideEventListener.remove();
		}

		handleKeyboardShow = (keyboardEvent: any) => {
			if (!keyboardEvent.endCoordinates) {
				return;
			}

			const keyboardHeight = Platform.select({
				ios: keyboardEvent.endCoordinates.height,
				android: this.props.androidAdjustResize
					? 0
					: keyboardEvent.endCoordinates.height,
			});

			const keyboardHeightAndroid = keyboardEvent.endCoordinates.height;

			const keyboardAnimate = () => {
				const { animationConfig, animateOn } = this.props;

				if (animateOn === 'all' || Platform.OS === animateOn) {
					LayoutAnimation.configureNext(
						accessoryAnimation(
							keyboardEvent.duration,
							keyboardEvent.easing,
							animationConfig
						)
					);
				}

				this.setState({
					visibleHeight: screenHeight - keyboardHeightAndroid,
					isKeyboardVisible: true,
					keyboardHeight: keyboardHeight,
					keyboardHeightAndroid,
				});
			};

			if (
				Platform.OS === 'ios' ||
				typeof this.props.onKeyboardShowDelay !== 'number'
			) {
				keyboardAnimate();
			} else {
				setTimeout(() => {
					keyboardAnimate();
				}, this.props.onKeyboardShowDelay);
			}

			this.setState({
				visibleHeight: screenHeight - keyboardHeightAndroid,
				isKeyboardVisible: true,
				keyboardHeight: keyboardHeight,
				keyboardHeightAndroid,
			});
		};

		handleKeyboardHide = (keyboardEvent: any) => {
			const { animateOn, animationConfig } = this.props;

			if (animateOn === 'all' || Platform.OS === animateOn) {
				LayoutAnimation.configureNext(
					accessoryAnimation(
						keyboardEvent.duration,
						keyboardEvent.easing,
						animationConfig
					)
				);
			}

			this.setState({
				isKeyboardVisible: false,
				keyboardHeight: 0,
				visibleHeight: screenHeight,
			});
		};

		render() {
			return (
				<WrappedComponent
					{...this.props}
					{...this.state}
					isSafeAreaSupported={isSafeAreaSupported}
				/>
			);
		}
	};
}
