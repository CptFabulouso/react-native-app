import { StyleSheet } from 'react-native';

import { Colors } from 'src/themes';

type Props = {
	bordered?: boolean;
	rounded?: boolean;
	shadow?: boolean;
};

const getContainerBorder = (props: Props) => {
	const { bordered } = props;
	if (bordered) {
		return styles.bordered;
	}
	return;
};
const getContainerRoundness = (props: Props) => {
	const { rounded } = props;
	if (rounded) {
		return styles.rounded;
	}
	return;
};

const getContainerShadow = (props: Props, color?: string) => {
	const { shadow } = props;
	if (shadow) {
		if (color) {
			return { ...StyleSheet.flatten(styles.shadow), shadowColor: color };
		} else {
			return styles.shadow;
		}
	}
	return;
};

const styles = StyleSheet.create({
	bordered: {
		borderWidth: 1,
		borderColor: Colors.black,
	},

	rounded: {
		borderRadius: 7,
	},

	shadow: {
		shadowOffset: { width: 0, height: 14 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
		elevation: 5,
	},
});

export default {
	getContainerBorder,
	getContainerRoundness,
	getContainerShadow,
};
