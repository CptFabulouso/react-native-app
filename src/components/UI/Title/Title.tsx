import { Text } from '../Text/Text';
import React, { ReactNode } from 'react';

import { Style } from 'src/types';

import styles from './styles';

type Props = {
	style?: Style;
	children?: ReactNode;
};

const Title = (props: Props) => {
	return <Text {...props} style={[styles.title, props.style]} />;
};

export { Title };
