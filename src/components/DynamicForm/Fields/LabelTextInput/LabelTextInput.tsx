import {
	Animated,
	Easing,
	TextInput as RNTextInput,
	TextInputProps,
	View,
	ViewStyle,
} from 'react-native';
import React, { Component, ReactNode } from 'react';

import { Text } from '../../../UI/Text/Text';
import { TextInput } from '../../../UI/TextInput/TextInput';
import formikToTextInput from '../../helpers/formikToTextInput';
import styles, { TITLE_WIDTH } from './styles';

type Props = TextInputProps & {
	containerStyle?: ViewStyle;
	inputContainerStyle?: ViewStyle;
	// name?: string;
	placeholder?: string;
	label?: string;
	description?: string;
	getRef?: (ref: RNTextInput | null) => void;
	error?: string;
	touched?: boolean;
	floatingLabel: boolean;
	renderRight?: () => ReactNode;
};

type State = {
	focused: boolean;
};

const ANIMATION_TIME = 300;

class LabelTextInput extends Component<Props, State> {
	animValue: Animated.Value;

	static defaultProps = {
		floatingLabel: true,
	};

	constructor(props: Props) {
		super(props);

		const focused = !!this.props.value;

		this.animValue = new Animated.Value(
			props.floatingLabel ? (focused ? 1 : 0) : 1
		);

		this.state = {
			focused,
		};
	}

	componentDidUpdate(_: Props, prevState: State) {
		const wasOpened = prevState.focused;
		const isOpened = this.state.focused || this.props.value;

		if (!wasOpened && isOpened) {
			this.focus();
		} else if (wasOpened && !isOpened) {
			this.unFocus();
		}
	}

	focus() {
		if (!this.props.floatingLabel) {
			return;
		}
		Animated.timing(this.animValue, {
			toValue: 1,
			duration: ANIMATION_TIME,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start();
	}

	unFocus() {
		if (!this.props.floatingLabel) {
			return;
		}
		Animated.timing(this.animValue, {
			toValue: 0,
			duration: ANIMATION_TIME,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start();
	}

	render() {
		const {
			containerStyle,
			inputContainerStyle,
			getRef,
			error,
			touched,
			label,
			floatingLabel,
			renderRight,
			description,
			...textInputProps
		} = this.props;

		const { focused } = this.state;

		const textScale = this.animValue.interpolate({
			inputRange: [0, 1],
			outputRange: [1, 0.8],
		});

		const textTranslationX = this.animValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0, -TITLE_WIDTH * 0.1],
		});

		const textTranslationY = this.animValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0, -13],
		});

		const open = focused || textInputProps.value;

		const disabledStyle =
			textInputProps.editable !== false ? {} : styles.disabled;
		const inputLabelContainer: Array<ViewStyle> = [styles.inputLabelContainer];
		if (error && touched) {
			inputLabelContainer.push(styles.inputContainerInvalid);
		}

		return (
			<View style={[styles.container, containerStyle]}>
				<View style={[inputLabelContainer, inputContainerStyle, disabledStyle]}>
					<View style={styles.labelContainer}>
						<Animated.Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={[
								styles.label,
								{
									transform: [
										{ translateX: textTranslationX },
										{ translateY: textTranslationY },
										{ scale: textScale },
									],
								},
							]}
						>
							{label}
						</Animated.Text>
					</View>
					<View style={styles.inputWrapper}>
						<TextInput
							{...textInputProps}
							ref={ref => {
								getRef && getRef(ref);
							}}
							onFocus={(ev: any) => {
								this.setState({ focused: true });
								textInputProps.onFocus && textInputProps.onFocus(ev);
							}}
							onBlur={(ev: any) => {
								this.setState({ focused: false });
								textInputProps.onBlur && textInputProps.onBlur(ev);
							}}
							style={{ opacity: floatingLabel ? (open ? 1 : 0) : 1 }}
						/>
					</View>
					{renderRight && renderRight()}
				</View>
				{error !== '' && touched && <Text style={styles.error}>{error}</Text>}
				{description !== '' && (
					<Text style={styles.description}>{description}</Text>
				)}
			</View>
		);
	}
}

const LabelTextInputFormik = formikToTextInput(LabelTextInput);

export { LabelTextInput, LabelTextInputFormik };
