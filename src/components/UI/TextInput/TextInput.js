// @flow

import { TextInput as RNTextInput, View } from 'react-native';
import React, { Component } from 'react';

import styles from './styles';
import { Style } from 'flow-types';

type Props = {
	style?: Style,
	containerStyle?: Style,
};

type ForwardedRef = {
	forwardedRef: any,
};

class TextInputComponent extends Component<Props & ForwardedRef> {
	render() {
		const { containerStyle, forwardedRef, ...textInputProps } = this.props;

		return (
			<View style={[styles.container, containerStyle]}>
				<RNTextInput
					underlineColorAndroid="transparent"
					{...textInputProps}
					ref={forwardedRef}
					style={[styles.input, this.props.style]}
				/>
			</View>
		);
	}
}

/* eslint-disable */
// $FlowFixMe
const TextInput = React.forwardRef((props: Props, ref) => {
	return <TextInputComponent {...props} forwardedRef={ref} />;
});
/* eslint-enable */

export { TextInput };
