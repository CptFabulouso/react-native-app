// @flow

import { StyleSheet, View } from 'react-native';
import React, { Component, ReactNode } from 'react';

import { ViewStyle } from 'src/types';
import { addOpacityToHexColor } from 'src/utils/common';
import styleCreator from '../styleCreator';
import styles from './styles';

type Props = {
	style?: ViewStyle;
	children: ReactNode;
	opacityBackground?: boolean | number;
	bordered?: boolean;
	rounded: boolean;
	shadow?: boolean;
};

class Card extends Component<Props> {
	static defaultProps = {
		rounded: true,
	};

	render() {
		const { opacityBackground } = this.props;
		const containerStyle = [styles.container, this.props.style];
		if (opacityBackground !== undefined) {
			const opacityValue =
				typeof opacityBackground === 'boolean' ? 0.8 : opacityBackground;
			const style = StyleSheet.flatten(containerStyle);

			let backgroundColorWithOpacity;
			if (style.backgroundColor) {
				backgroundColorWithOpacity = addOpacityToHexColor(
					style.backgroundColor,
					opacityValue
				);
			}
			containerStyle.push({ backgroundColor: backgroundColorWithOpacity });
		}
		containerStyle.push(styleCreator.getContainerBorder(this.props));
		containerStyle.push(styleCreator.getContainerRoundness(this.props));
		containerStyle.push(styleCreator.getContainerShadow(this.props));

		return <View style={containerStyle}>{this.props.children}</View>;
	}
}

export { Card };
