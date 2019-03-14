import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import React, { ReactNode } from 'react';

import { Style } from 'src/types';

type Props = {
	style?: Style;
	children: ReactNode;
};

class KeyboardDismissView extends React.Component<Props> {
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
