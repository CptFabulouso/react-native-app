// @flow
import * as React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

import { getFontStyleForWeight } from './getFontStyleForWeight';
import styles from './styles';
import type { Style } from 'flow-types';

type Props = {|
	style?: Style,
	children?: React.Node,
|};

const Text = (props: Props) => {
	const flatStyle = StyleSheet.flatten(props.style);
	let fontStyle = null;
	if (flatStyle) {
		fontStyle = getFontStyleForWeight(
			flatStyle.fontFamily,
			flatStyle.fontWeight
		);
	}

	return (
		<RNText {...props} style={[styles.text, props.style, fontStyle]}>
			{props.children}
		</RNText>
	);
};

export { Text };
