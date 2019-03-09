// @flow

import { View } from 'react-native';
import React from 'react';

type Props = {|
	width?: number,
	height?: number,
|};

const Space = ({ width, height }: Props) => {
	return <View style={{ width, height }} />;
};

export { Space };
