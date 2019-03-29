import {
	Animated,
	DeviceEventEmitter,
	Dimensions,
	KeyboardAvoidingView,
	PanResponder,
	Platform,
	Modal as RNModal,
	TouchableWithoutFeedback,
} from 'react-native';
import {
	View,
	createAnimation,
	initializeRegistryWithDefinitions,
	registerAnimation,
} from 'react-native-animatable';
import React, { ReactNode } from 'react';

import * as ANIMATION_DEFINITIONS from './animations';
import { AlertController, ModalController } from './controllers';
import styles from './styles';

// Override default animations
initializeRegistryWithDefinitions(ANIMATION_DEFINITIONS);

// Utility for creating custom animations
const makeAnimation = (name: string, obj: AnimationDirections | Object) => {
	// @ts-ignore //FIXME: obj
	registerAnimation(name, createAnimation(obj));
};

const isObject = (obj: any) => {
	return obj !== null && typeof obj === 'object';
};

type AnimationDirections =
	| 'fadeIn'
	| 'fadeOut'
	| 'slideInDown'
	| 'slideInUp'
	| 'slideInLeft'
	| 'slideInRight'
	| 'slideOutDown'
	| 'slideOutUp'
	| 'slideOutLeft'
	| 'slideOutRight';

type Props = {
	disableAnimation: boolean;
	animationIn: AnimationDirections | Object;
	animationInTiming: number;
	animationOut: AnimationDirections | Object;
	animationOutTiming: number;
	avoidKeyboard: boolean;
	backdropColor: string;
	backdropOpacity: number;
	backdropTransitionInTiming: number;
	backdropTransitionOutTiming: number;
	children: ReactNode;
	isVisible: boolean;
	hideModalContentWhileAnimating: boolean;
	onModalShow: () => void;
	onModalHide: () => void;
	onBackButtonPress: () => void;
	onBackdropPress: () => void;
	onSwipe?: () => void;
	swipeThreshold: number;
	swipeDirection?: 'up' | 'down' | 'left' | 'right';
	useNativeDriver: boolean;
	style?: any;
	scrollTo: ({ y, animated }: { y: number; animated: boolean }) => void;
	scrollOffset: number;
	scrollOffsetMax: number;
	supportedOrientations: Array<
		| 'portrait'
		| 'portrait-upside-down'
		| 'landscape'
		| 'landscape-left'
		| 'landscape-right'
	>;
	useRNModal: boolean;
};

type State = {
	showContent: boolean;
	isVisible: boolean;
	deviceWidth: number;
	deviceHeight: number;
	isSwipeable: boolean;
};

type GestureState = { dx: number; dy: number };

class Modal extends React.Component<Props, State> {
	backdropRef: any;
	panResponder: any;
	animationIn: any;
	animationOut: any;
	contentRef: any;
	pan: any;

	static defaultProps = {
		disableAnimation: false,
		animationIn: 'slideInUp',
		animationInTiming: 300,
		animationOut: 'slideOutDown',
		animationOutTiming: 300,
		avoidKeyboard: false,
		backdropColor: 'black',
		backdropOpacity: 0.7,
		backdropTransitionInTiming: 300,
		backdropTransitionOutTiming: 300,
		onModalShow: () => {},
		onModalHide: () => {},
		hideModalContentWhileAnimating: false,
		onBackdropPress: () => {},
		onBackButtonPress: () => {},
		swipeThreshold: 100,
		useNativeDriver: false,
		scrollTo: () => {},
		scrollOffset: 0,
		scrollOffsetMax: 0,
		supportedOrientations: ['portrait', 'landscape'],
		useRNModal: true,
	};

	// We use an internal state for keeping track of the modal visibility: this allows us to keep
	// the modal visibile during the exit animation, even if the user has already change the
	// isVisible prop to false.
	// We store in the state the device width and height so that we can update the modal on
	// device rotation.
	state = {
		showContent: true,
		isVisible: false,
		deviceWidth: Dimensions.get('window').width,
		deviceHeight: Dimensions.get('window').height,
		isSwipeable: this.props.swipeDirection ? true : false,
	};

	transitionLock: boolean | null = null;
	inSwipeClosingState = false;

	constructor(props: Props) {
		super(props);
		if (!this.props.disableAnimation) {
			this.buildAnimations(props);
		}
		this.pan = new Animated.ValueXY();
		if (this.state.isSwipeable) {
			this.state = { ...this.state };
			this.buildPanResponder();
		}
		if (this.props.isVisible) {
			this.state = {
				...this.state,
				isVisible: true,
				showContent: true,
			};
		}
	}

	static getDerivedStateFromProps(nextProps: Props, prevState: State) {
		if (!prevState.isVisible && nextProps.isVisible) {
			ModalController.setIsOpened(true);
			return { isVisible: true, showContent: true };
		}
		return null;
	}

	componentDidMount() {
		if (this.state.isVisible) {
			this.open();
		}
		DeviceEventEmitter.addListener(
			'didUpdateDimensions',
			this.handleDimensionsUpdate
		);
	}

	componentWillUnmount() {
		DeviceEventEmitter.removeListener(
			'didUpdateDimensions',
			this.handleDimensionsUpdate
		);
	}

	componentDidUpdate(prevProps: Props) {
		if (
			!prevProps.disableAnimation &&
			(prevProps.animationIn !== this.props.animationIn ||
				prevProps.animationOut !== this.props.animationOut)
		) {
			this.buildAnimations(this.props);
		}
		if (
			prevProps.backdropOpacity !== this.props.backdropOpacity &&
			this.backdropRef
		) {
			this.backdropRef.transitionTo(
				{ opacity: this.props.backdropOpacity },
				prevProps.backdropTransitionInTiming
			);
		}

		// On modal open request, we slide the view up and fade in the backdrop
		if (this.props.isVisible && !prevProps.isVisible) {
			this.open();
		} else if (!this.props.isVisible && prevProps.isVisible) {
			// On modal close request, we slide the view down and fade out the backdrop
			this._close();
		}
	}

	buildPanResponder = () => {
		let animEvt: any = null;

		if (
			this.props.swipeDirection === 'right' ||
			this.props.swipeDirection === 'left'
		) {
			animEvt = Animated.event([null, { dx: this.pan.x }]);
		} else {
			animEvt = Animated.event([null, { dy: this.pan.y }]);
		}

		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (_, gestureState: GestureState) => {
				return !(gestureState.dx === 0 && gestureState.dy === 0);
			},
			onStartShouldSetPanResponder: () => {
				if (this.props.scrollTo) {
					if (this.props.scrollOffset > 0) {
						return false; // user needs to be able to scroll content back up
					}
				}
				return true;
			},
			onPanResponderMove: (evt, gestureState: GestureState) => {
				// Dim the background while swiping the modal
				const accDistance = this.getAccDistancePerDirection(gestureState);
				const newOpacityFactor = 1 - accDistance / this.state.deviceWidth;
				if (this.isSwipeDirectionAllowed(gestureState)) {
					this.backdropRef &&
						this.backdropRef.transitionTo({
							opacity: this.props.backdropOpacity * newOpacityFactor,
						});
					animEvt && animEvt(evt, gestureState);
				} else {
					if (this.props.scrollTo) {
						let offsetY = -gestureState.dy;
						if (offsetY > this.props.scrollOffsetMax) {
							offsetY -= (offsetY - this.props.scrollOffsetMax) / 2;
						}
						this.props.scrollTo({ y: offsetY, animated: false });
					}
				}
			},
			onPanResponderRelease: (_, gestureState) => {
				// Call the onSwipe prop if the threshold has been exceeded
				const accDistance = this.getAccDistancePerDirection(gestureState);
				if (accDistance > this.props.swipeThreshold) {
					if (this.props.onSwipe) {
						this.inSwipeClosingState = true;
						this.props.onSwipe();
						return;
					}
				}
				//Reset backdrop opacity and modal position
				if (this.backdropRef) {
					this.backdropRef.transitionTo(
						{ opacity: this.props.backdropOpacity },
						this.props.backdropTransitionInTiming
					);
				}
				Animated.spring(this.pan, {
					toValue: { x: 0, y: 0 },
					bounciness: 0,
				}).start();
				if (this.props.scrollOffset > this.props.scrollOffsetMax) {
					this.props.scrollTo({
						y: this.props.scrollOffsetMax,
						animated: true,
					});
				}
			},
		});
	};

	getAccDistancePerDirection = (gestureState: GestureState) => {
		switch (this.props.swipeDirection) {
			case 'up':
				return -gestureState.dy;
			case 'down':
				return gestureState.dy;
			case 'right':
				return gestureState.dx;
			case 'left':
				return -gestureState.dx;
			default:
				return 0;
		}
	};

	isSwipeDirectionAllowed = ({ dy, dx }: GestureState) => {
		const draggedDown = dy > 0;
		const draggedUp = dy < 0;
		const draggedLeft = dx < 0;
		const draggedRight = dx > 0;

		if (this.props.swipeDirection === 'up' && draggedUp) {
			return true;
		} else if (this.props.swipeDirection === 'down' && draggedDown) {
			return true;
		} else if (this.props.swipeDirection === 'right' && draggedRight) {
			return true;
		} else if (this.props.swipeDirection === 'left' && draggedLeft) {
			return true;
		}
		return false;
	};

	// User can define custom react-native-animatable animations, see PR #72
	buildAnimations = (props: Props) => {
		let animationIn = props.animationIn;
		let animationOut = props.animationOut;

		if (isObject(animationIn)) {
			const animationName = JSON.stringify(animationIn);
			makeAnimation(animationName, animationIn);
			animationIn = animationName;
		}

		if (isObject(animationOut)) {
			const animationName = JSON.stringify(animationOut);
			makeAnimation(animationName, animationOut);
			animationOut = animationName;
		}

		this.animationIn = animationIn;
		this.animationOut = animationOut;
	};

	handleDimensionsUpdate = () => {
		// Here we update the device dimensions in the state if the layout changed (triggering a render)
		const deviceWidth = Dimensions.get('window').width;
		const deviceHeight = Dimensions.get('window').height;
		if (
			deviceWidth !== this.state.deviceWidth ||
			deviceHeight !== this.state.deviceHeight
		) {
			this.setState({ deviceWidth, deviceHeight });
		}
	};

	open = () => {
		if (this.transitionLock) {
			return;
		}
		this.transitionLock = true;
		if (this.backdropRef) {
			this.backdropRef.transitionTo(
				{ opacity: this.props.backdropOpacity },
				this.props.backdropTransitionInTiming
			);
		}

		// This is for reset the pan position, if not modal get stuck
		// at the last release position when you try to open it.
		// Could certainly be improve - no idea for the moment.
		if (this.state.isSwipeable) {
			this.pan.setValue({ x: 0, y: 0 });
		}

		if (this.contentRef && !this.props.disableAnimation) {
			this.contentRef[this.animationIn](this.props.animationInTiming).then(
				() => {
					this.transitionLock = false;
					if (!this.props.isVisible) {
						this._close();
					} else {
						this.props.onModalShow();
					}
				}
			);
		}
	};

	_close = async () => {
		if (AlertController.isShown()) {
			await AlertController.onClose();
		}
		if (this.transitionLock) {
			return;
		}
		this.transitionLock = true;
		if (this.backdropRef) {
			this.backdropRef.transitionTo(
				{ opacity: 0 },
				this.props.backdropTransitionOutTiming
			);
		}

		let animationOut = this.animationOut;

		if (this.inSwipeClosingState) {
			this.inSwipeClosingState = false;
			if (this.props.swipeDirection === 'up') {
				animationOut = 'slideOutUp';
			} else if (this.props.swipeDirection === 'down') {
				animationOut = 'slideOutDown';
			} else if (this.props.swipeDirection === 'right') {
				animationOut = 'slideOutRight';
			} else if (this.props.swipeDirection === 'left') {
				animationOut = 'slideOutLeft';
			}
		}

		if (this.contentRef && !this.props.disableAnimation) {
			this.contentRef[animationOut](this.props.animationOutTiming).then(() => {
				this.transitionLock = false;
				if (this.props.isVisible) {
					this.open();
				} else {
					ModalController.setIsOpened(false);
					ModalController.setClosedTime(Date.now());

					this.setState(
						{
							showContent: false,
						},
						() => {
							this.setState({
								isVisible: false,
							});
						}
					);
					this.props.onModalHide();
				}
			});
		}
	};

	render() {
		const {
			avoidKeyboard,
			backdropColor,
			children,
			onBackdropPress,
			useNativeDriver,
			style,
			onBackButtonPress,
			...otherProps
		} = this.props;
		const { deviceWidth, deviceHeight } = this.state;

		const computedStyle = [
			{ margin: deviceWidth * 0.05, transform: [{ translateY: 0 }] },
			styles.content,
			style,
		];

		let panHandlers = {};
		let panPosition = {};
		if (this.state.isSwipeable) {
			panHandlers = { ...this.panResponder.panHandlers };
			panPosition = this.pan.getLayout();
		}

		let _children;
		if (
			this.props.hideModalContentWhileAnimating &&
			this.props.useNativeDriver &&
			!this.state.showContent
		) {
			_children = <View />;
		} else {
			_children = children;
		}
		const containerView = (
			<View
				{...panHandlers}
				ref={ref => (this.contentRef = ref)}
				style={[panPosition, computedStyle]}
				pointerEvents="box-none"
				useNativeDriver={useNativeDriver}
				{...otherProps}
			>
				{_children}
			</View>
		);

		let Wrapper: any;
		let wrapperProps;
		if (this.props.useRNModal) {
			Wrapper = RNModal;
			wrapperProps = {
				transparent: true,
				animationType: 'none',
				visible: this.state.isVisible,
				onRequestClose: onBackButtonPress,
				...otherProps,
			};
		} else {
			if (!this.state.isVisible) {
				return null;
			}
			Wrapper = View;
			wrapperProps = { style: styles.container };
		}

		return (
			<Wrapper {...wrapperProps}>
				<TouchableWithoutFeedback onPress={onBackdropPress}>
					<View
						ref={ref => (this.backdropRef = ref)}
						useNativeDriver={useNativeDriver}
						style={[
							styles.backdrop,
							{
								backgroundColor: this.state.showContent
									? backdropColor
									: 'transparent',
								width: deviceWidth,
								height: deviceHeight,
							},
						]}
					/>
				</TouchableWithoutFeedback>

				{avoidKeyboard && (
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : undefined}
						pointerEvents="box-none"
						style={computedStyle.concat([{ margin: 0 }])}
					>
						{containerView}
					</KeyboardAvoidingView>
				)}

				{!avoidKeyboard && containerView}
			</Wrapper>
		);
	}
}

export default Modal;
