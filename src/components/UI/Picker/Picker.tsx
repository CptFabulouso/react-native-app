import * as React from 'react';
import { View } from 'react-native';

import { Checkbox } from '../Checkbox/Checkbox';
import { Style } from 'src/types';
import { Text } from '../Text/Text';

import styles from './styles';

type Props = {
	style?: Style;
	onSelect: (value: boolean) => void;
	checked: boolean;
	label: string;
	disabled?: boolean;
};

const Picker = (props: Props) => {
	const containerStyle: Array<Style> = [styles.itemContainer];
	if (props.disabled) {
		containerStyle.push({ opacity: 0.5 });
	}

	return (
		<View style={containerStyle}>
			<Checkbox
				disabled={props.disabled}
				checked={props.checked}
				onPress={() => props.onSelect(!props.checked)}
			/>
			<Text style={styles.label}>{props.label}</Text>
		</View>
	);
};

export { Picker };
