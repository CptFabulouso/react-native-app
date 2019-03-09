// @flow

import { TouchableOpacity, View } from 'react-native';
import React from 'react';

import styles from './styles';

type Props = {|
	style?: any,
	checked: boolean,
	onPress: () => void,
	disabled?: boolean,
|};

const Checkbox = ({ style, checked, onPress, disabled }: Props) => {
	const checkboxStyle = [styles.checkbox];
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
