import * as React from 'react';
import { View } from 'react-native';

import { Picker } from '../Picker/Picker';

import styles from './styles';

export type SelectorItem = {
	value: string;
	label: string;
	disabled?: boolean;
};

type Props = {
	style?: any;
	items: Array<SelectorItem>;
	onItemSelect: (values: Array<string>) => void;
	selectedValues: Array<string>;
	multiSelect: boolean;
	allowNoValue: boolean;
};

class Selector extends React.Component<Props> {
	static defaultProps = {
		multiSelect: false,
		allowNoValue: true,
	};

	constructor(props: Props) {
		super(props);

		this.renderItem = this.renderItem.bind(this);
		this.onValueSelect = this.onValueSelect.bind(this);
	}

	getSelectedValues(item: SelectorItem, checked: boolean): Array<string> {
		if (!this.props.multiSelect) {
			if (checked) {
				return [item.value];
			} else {
				if (this.props.allowNoValue) {
					return [];
				} else {
					return [item.value];
				}
			}
		} else {
			if (checked) {
				return this.props.selectedValues.concat(item.value);
			} else {
				if (this.props.selectedValues.length > 1) {
					return this.props.selectedValues.filter(val => val !== item.value);
				} else {
					return [item.value];
				}
			}
		}
	}

	onValueSelect(item: SelectorItem, checked: boolean) {
		this.props.onItemSelect(this.getSelectedValues(item, checked));
	}

	renderItem(item: SelectorItem) {
		return (
			<Picker
				key={item.value}
				label={item.label}
				checked={this.props.selectedValues.includes(item.value)}
				disabled={item.disabled}
				onSelect={checked => {
					this.onValueSelect(item, checked);
				}}
			/>
		);
	}

	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				{this.props.items.map(this.renderItem)}
			</View>
		);
	}
}

export { Selector };
