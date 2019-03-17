import React, { Component, ComponentType } from 'react';

import styles from './styles';

type Props = {
	Icon: ComponentType<any>;
	focused: boolean;
	horizontal: boolean;
	tintColor: string;
};

class TabIcon extends Component<Props> {
	render() {
		const { Icon, tintColor } = this.props;
		return (
			<Icon size={25} color={tintColor} style={styles.icon} {...this.props} />
		);
	}
}

export default TabIcon;
