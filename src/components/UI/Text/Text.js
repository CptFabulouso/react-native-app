// @flow
import * as React from 'react';
import { Text as RNText } from 'react-native';

import type { Style } from 'flow-types';

import styles from './styles';

type Props = {|
	style?: Style,
	children?: React.Node,
|};

const Text = (props: Props) => {
	return (
		<RNText {...props} style={[styles.text, props.style]}>
			{props.children}
		</RNText>
	);
};

export { Text };
