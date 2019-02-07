// @flow

import 'react-native';
import React from 'react';

import { Text } from 'components';

import renderer from 'react-test-renderer';

describe('<Text />', () => {
	it('renders correctly', () => {
		renderer.create(<Text />);
	});
});
