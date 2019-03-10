// @flow

import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import { Style } from 'flow-types';

type Props = {|
	style?: Style,
	children: React.Node,
|};

type State = {||};

class KeyboardDismissView extends React.Component<Props, State> {
	render() {
		const { children } = this.props;
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<View style={this.props.style}>{children}</View>
			</TouchableWithoutFeedback>
		);
	}
}

export { KeyboardDismissView };
