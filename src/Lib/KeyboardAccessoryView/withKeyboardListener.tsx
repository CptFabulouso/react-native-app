import {
	Dimensions,
	Keyboard,
	KeyboardEvent,
	LayoutAnimation,
	Platform,
} from 'react-native';
import { Subtract } from 'utility-types';
import React, { Component, ComponentType } from 'react';

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

interface Config {
	animateOn?: 'ios' | 'android' | 'all' | 'none';
	androidAdjustResize?: boolean;
	onKeyboardShowDelay?: number | boolean;
	animationConfig?: AnimationConfig;
}

interface OwnState {
	visibleHeight: number;
	keyboardHeight: number;
	keyboardHeightAndroid: number;
	isKeyboardVisible: boolean;
}

export interface InjectedKeyboardListenerProps extends OwnState {
	isSafeAreaSupported: boolean;
}

const accessoryAnimation = (
	duration: number,
	easing: EasingOption,
	animationConfig: AnimationConfig | null = null
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

export default function withKeyboardListener<
P extends InjectedKeyboardListenerProps
>(
	WrappedComponent: ComponentType<P>,
	{
		animateOn = 'all',
		androidAdjustResize = true,
		onKeyboardShowDelay = 0,
		animationConfig = undefined,
	}: Config
) {
	return class Wrapper extends Component<
		Subtract<P, InjectedKeyboardListenerProps>,
		OwnState
		> {
		static defaultProps = {
			animateOn: 'ios',
			androidAdjustResize: true,
		};

		state = {
			visibleHeight: screenHeight,
			keyboardHeight: 0,
			keyboardHeightAndroid: 0,
			isKeyboardVisible: false,
		};

		keyboardShowEventListener: any;
		keyboardHideEventListener: any;

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

		handleKeyboardShow = (keyboardEvent: KeyboardEvent) => {
			if (!keyboardEvent.endCoordinates) {
				return;
			}

			const keyboardHeight = Platform.select({
				ios: keyboardEvent.endCoordinates.height,
				android: androidAdjustResize ? 0 : keyboardEvent.endCoordinates.height,
			});

			const keyboardHeightAndroid = keyboardEvent.endCoordinates.height;

			const keyboardAnimate = () => {
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

			if (Platform.OS === 'ios' || typeof onKeyboardShowDelay !== 'number') {
				keyboardAnimate();
			} else {
				setTimeout(() => {
					keyboardAnimate();
				}, onKeyboardShowDelay);
			}

			this.setState({
				visibleHeight: screenHeight - keyboardHeightAndroid,
				isKeyboardVisible: true,
				keyboardHeight: keyboardHeight,
				keyboardHeightAndroid,
			});
		};

		handleKeyboardHide = (keyboardEvent: KeyboardEvent) => {
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
					{...this.props as P}
					{...this.state}
					animateOn={animateOn}
					androidAdjustResize={androidAdjustResize}
					onKeyboardShowDelay={onKeyboardShowDelay}
					animationConfig={animationConfig}
					isSafeAreaSupported={isSafeAreaSupported}
				/>
			);
		}
	};
}
