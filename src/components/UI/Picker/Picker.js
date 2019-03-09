// @flow

import * as React from 'react';
import { Text, View } from 'react-native';

import { Checkbox } from '../Checkbox/Checkbox';

import styles from './styles';

type Props = {|
	style?: any,
	onSelect: (value: boolean) => void,
	checked: boolean,
	label: string,
	disabled?: boolean,
|};

const Picker = (props: Props) => {
	const containerStyle = [styles.itemContainer];
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
