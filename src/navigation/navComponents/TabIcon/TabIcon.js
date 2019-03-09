// @flow

import * as React from 'react';

import styles from './styles';

type Props = {|
	Icon: () => React.Element<any>,
	focused: boolean,
	horizontal: boolean,
	tintColor: string,
|};

class TabIcon extends React.Component<Props> {
	render() {
		const { Icon, tintColor } = this.props;
		return (
			<Icon size={25} color={tintColor} style={styles.icon} {...this.props} />
		);
	}
}

export default TabIcon;
