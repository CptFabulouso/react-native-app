import 'react-native';
import React from 'react';

import { Button } from 'src/components';

import renderer from 'react-test-renderer';

describe('<Button />', () => {
	it('renders correctly', () => {
		renderer.create(<Button onPress={() => {}} />);
	});
});
