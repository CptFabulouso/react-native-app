import {
	Animated,
	Easing,
	TextInput as RNTextInput,
	TextInputProps,
	View,
} from 'react-native';
import React, { Component } from 'react';

import { Style } from 'src/types';
import { Text } from '../../../UI/Text/Text';
import { TextInput } from '../../../UI/TextInput/TextInput';
// import formikToTextInput from '../../helpers/formikToTextInput';
import styles, { TITLE_WIDTH } from './styles';

type Props = TextInputProps & {
	style?: Style;
	// name?: string;
	placeholder?: string;
	label?: string;
	getRef?: (ref: RNTextInput | null) => void;
	error?: string;
	touched?: boolean;
};

type State = {
	focused: boolean;
};

const ANIMATION_TIME = 300;

class FloatingLabelTextInput extends Component<Props, State> {
	animValue: Animated.Value;

	constructor(props: Props) {
		super(props);

		const focused = !!this.props.value;

		this.animValue = new Animated.Value(focused ? 1 : 0);

		this.state = {
			focused,
		};
	}

	componentDidUpdate(_prevProps: Props, prevState: State) {
		const wasOpened = prevState.focused;
		const isOpened = this.state.focused || this.props.value;
		if (!wasOpened && isOpened) {
			this.focus();
		} else if (wasOpened && !isOpened) {
			this.unFocus();
		}
	}

	focus() {
		Animated.timing(this.animValue, {
			toValue: 1,
			duration: ANIMATION_TIME,
			easing: Easing.linear,
		}).start();
	}

	unFocus() {
		Animated.timing(this.animValue, {
			toValue: 0,
			duration: ANIMATION_TIME,
			easing: Easing.linear,
		}).start();
	}

	render() {
		const {
			style,
			// name,
			label,
			getRef,
			error,
			touched,
			...textInputProps
		} = this.props;

		const { focused } = this.state;

		const textScale = this.animValue.interpolate({
			inputRange: [0, 1],
			outputRange: [1, 0.9],
		});

		const textTranslationX = this.animValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0, -TITLE_WIDTH * 0.05],
		});

		const textTranslationY = this.animValue.interpolate({
			inputRange: [0, 1],
			outputRange: [22, 10],
		});

		const open = focused || textInputProps.value;

		const disabledStyle = textInputProps.editable ? styles.disabled : {};
		const inputContainer: Array<Style> = [styles.inputContainer];
		if (error && touched) {
			inputContainer.push(styles.inputContainerInvalid);
		}

		return (
			<View style={[styles.container, style, disabledStyle]}>
				<View style={inputContainer}>
					<View style={styles.background} />
					<Animated.View
						style={[
							styles.labelContainer,
							{
								transform: [{ translateX: textTranslationX }],
							},
						]}
					>
						<Animated.View
							style={[
								styles.labelContainer,
								{
									transform: [
										{ scale: textScale },
										{ translateY: textTranslationY },
									],
								},
							]}
						>
							<Text>{label}</Text>
						</Animated.View>
					</Animated.View>
					<View style={{ opacity: open ? 1 : 0 }}>
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
						/>
					</View>
				</View>
				{error && touched && <Text style={styles.error}>{error}</Text>}
			</View>
		);
	}
}

// const FloatingLabelTextInputFormik = formikToTextInput(FloatingLabelTextInput);

export { FloatingLabelTextInput /* , FloatingLabelTextInputFormik */ };
