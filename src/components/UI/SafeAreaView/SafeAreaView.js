// @flow
import * as React from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native';

import { Style } from 'flow-types';

import styles from './styles';

type Props = {|
	style?: Style,
	children?: React.Node,
|};

const SafeAreaView = (props: Props) => {
	return <RNSafeAreaView {...props} style={[styles.container, props.style]} />;
};

export { SafeAreaView };
