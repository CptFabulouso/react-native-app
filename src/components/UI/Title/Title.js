// @flow
import * as React from 'react';
import { Text } from '../Text/Text';

import type { Style } from 'flow-types';

import styles from './styles';

type Props = {|
	style?: Style,
	children?: React.Node,
|};

const Title = (props: Props) => {
	return <Text {...props} style={[styles.title, props.style]} />;
};

export { Title };
