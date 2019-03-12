import { TouchableOpacity, View } from 'react-native';
import React from 'react';

import { Style } from 'src/types';
import styles from './styles';

type Props = {
	style?: Style;
	checked: boolean;
	onPress: () => void;
	disabled?: boolean;
};

const Checkbox = ({ style, checked, onPress, disabled }: Props) => {
	const checkboxStyle: Array<Style> = [styles.checkbox];
	if (checked) {
		checkboxStyle.push(styles.checked);
	} else {
		checkboxStyle.push(styles.unchecked);
	}
	return (
		<TouchableOpacity onPress={onPress} disabled={disabled}>
			<View style={[checkboxStyle, style]} />
		</TouchableOpacity>
	);
};

export { Checkbox };
