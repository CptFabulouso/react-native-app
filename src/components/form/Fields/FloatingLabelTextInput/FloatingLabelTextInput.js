// @flow

import { Animated, Easing, View } from 'react-native';
import React, { Component } from 'react';

import { Text } from '../../../UI/Text/Text';
import { TextInput } from '../../../UI/TextInput/TextInput';
import formikToTextInput from '../../helpers/formikToTextInput';
import styles, { TITLE_WIDTH } from './styles';
import type { Style } from 'flow-types';

type Props = {|
	//text input
	value: string,
	onChangeText: (value: string) => void,
	disabled?: boolean,
	onSubmitEditing?: () => void,
	secureTextEntry?: boolean,
	returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send',
	onBlur?: (ev?: any) => void,
	onFocus?: (ev?: any) => void,
	multiline?: boolean,
	style?: Style,
	numberOfLines?: number,
	keyboardType?:
		| 'default'
		| 'number-pad'
		| 'decimal-pad'
		| 'numeric'
		| 'email-address'
		| 'phone-pad',
	blurOnSubmit?: boolean,

	//other
	name?: string,
	placeholder?: string,
	label?: string,
	getRef?: any => void,
	error?: string,
	touched?: boolean,
|};

type State = {|
	focused: boolean,
|};

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

	componentDidUpdate(prevProps: Props, prevState: State) {
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
			label,
			multiline,
			numberOfLines,
			disabled,
			placeholder,
			onSubmitEditing,
			returnKeyType,
			secureTextEntry,
			getRef,
			onFocus,
			blurOnSubmit,
			onBlur,
			value,
			onChangeText,
			touched,
			error,
			keyboardType,
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

		const open = focused || value;

		const disabledStyle = disabled ? styles.disabled : {};
		const inputContainer = [styles.inputContainer];
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
							multiline={multiline}
							numberOfLines={numberOfLines}
							editable={!disabled}
							selectTextOnFocus={!disabled}
							placeholder={placeholder}
							onSubmitEditing={onSubmitEditing}
							returnKeyType={returnKeyType}
							secureTextEntry={secureTextEntry}
							ref={ref => {
								getRef && getRef(ref);
							}}
							value={value}
							onChangeText={onChangeText}
							onFocus={(ev: any) => {
								this.setState({ focused: true });
								onFocus && onFocus(ev);
							}}
							onBlur={(ev: any) => {
								this.setState({ focused: false });
								onBlur && onBlur(ev);
							}}
							keyboardType={keyboardType}
							blurOnSubmit={blurOnSubmit}
						/>
					</View>
				</View>
				{error && touched && <Text style={styles.error}>{error}</Text>}
			</View>
		);
	}
}

const FloatingLabelTextInputFormik = formikToTextInput(FloatingLabelTextInput);

export { FloatingLabelTextInput, FloatingLabelTextInputFormik };
