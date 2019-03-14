import { SafeAreaView as RNSafeAreaView } from 'react-native';
import React, { ReactNode } from 'react';

import { Style } from 'src/types';

import styles from './styles';

type Props = {
	style?: Style;
	children?: ReactNode;
};

const SafeAreaView = (props: Props) => {
	return <RNSafeAreaView {...props} style={[styles.container, props.style]} />;
};

export { SafeAreaView };
