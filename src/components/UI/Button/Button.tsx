import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import React, { Component, ReactNode, SyntheticEvent } from 'react';
import styleCreator from '../styleCreator';

import { Style } from 'src/types';
import { Text } from '../Text/Text';
import styles from './styles';

const containerStyles = styles.container;
const labelStyles = styles.label;
const otherStyles = styles.other;

export type Props = {
	style?: Style;
	children?: ReactNode;
	labelStyle?: Style;
	onPress: (e: SyntheticEvent<any>) => void;
	label?: string;
	disabled?: boolean;
	loading?: boolean;
	transparent?: boolean;
	bordered?: boolean;
	rounded: boolean;
	block?: boolean;
	shadow?: boolean;
	// full?: boolean,
	small?: boolean;
	// large?: boolean,
	iconRight?: boolean;
	iconLeft?: boolean;
	// light?: boolean,
	// primary?: boolean,
	// success?: boolean,
	// info?: boolean,
	// warning?: boolean,
	// danger?: boolean,
	// dark?: boolean,
	hidden?: boolean;
	// App specific
	noisyBG: boolean;
	color: string;
};

class Button extends Component<Props> {
	static defaultProps = {
		rounded: true,
		noisyBG: true,
		color: '#339B27',
	};

	getContainerColor() {
		const { color, transparent, bordered } = this.props;
		if (transparent || bordered) {
			return;
		}
		return { backgroundColor: color };
	}

	getContainerSize() {
		const { block, small } = this.props;

		const styles = [];

		if (block) {
			styles.push(containerStyles.block);
		}
		if (small) {
			styles.push(containerStyles.small);
		}
		return styles;
	}

	getContainerOpacity() {
		const { disabled, hidden } = this.props;
		if (hidden) {
			return containerStyles.hidden;
		}
		if (disabled) {
			return containerStyles.disabled;
		}
		return;
	}

	getContainerPadding() {
		const { transparent, bordered } = this.props;
		if (transparent && !bordered) {
			return containerStyles.noPadding;
		}
		return;
	}

	getLabelPadding() {
		const { iconLeft, iconRight } = this.props;

		if (iconLeft) {
			return labelStyles.iconLeft;
		}
		if (iconRight) {
			return labelStyles.iconRight;
		}
		return;
	}

	getLabelOpacity() {
		const { loading } = this.props;

		if (loading) {
			return labelStyles.loading;
		}
		return;
	}

	getLabelColor() {
		const { transparent } = this.props;

		if (transparent) {
			return labelStyles.transparent;
		}
		return;
	}

	getLabelSize() {
		const { small } = this.props;

		if (small) {
			return labelStyles.small;
		}
		return;
	}

	renderLeftIcon() {
		if (!this.props.iconLeft) {
			return null;
		}
		return this.props.children;
	}

	renderRightIcon() {
		if (!this.props.iconRight) {
			return null;
		}
		return this.props.children;
	}

	renderLabelOrLoading() {
		const { loading } = this.props;

		const labelStyle: Array<Style | undefined> = [labelStyles.default];
		labelStyle.push(this.getLabelPadding());
		labelStyle.push(this.getLabelOpacity());
		labelStyle.push(this.getLabelColor());
		labelStyle.push(this.getLabelSize());

		return (
			<View>
				{loading && (
					<View style={[otherStyles.fill, otherStyles.center]}>
						<ActivityIndicator
							// style={{ position: 'absolute', opacity: loading ? 1 : 0 }}
							color="white"
						/>
					</View>
				)}
				<Text style={[labelStyle, this.props.labelStyle]}>
					{this.props.label}
				</Text>
			</View>
		);
	}

	render() {
		const containerStyle: Array<Style | undefined> = [containerStyles.default];
		containerStyle.push(this.getContainerColor());
		containerStyle.push(styleCreator.getContainerBorder(this.props));
		containerStyle.push(...this.getContainerSize());
		containerStyle.push(this.getContainerOpacity());
		containerStyle.push(styleCreator.getContainerRoundness(this.props));
		containerStyle.push(this.getContainerPadding());
		containerStyle.push(
			styleCreator.getContainerShadow(this.props, this.props.color)
		);

		return (
			<TouchableOpacity
				style={[containerStyle, this.props.style]}
				onPress={this.props.onPress}
				disabled={this.props.disabled || this.props.hidden}
			>
				{this.renderLeftIcon()}
				{this.renderLabelOrLoading()}
				{this.renderRightIcon()}
			</TouchableOpacity>
		);
	}
}

export { Button };
