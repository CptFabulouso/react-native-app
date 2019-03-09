// @flow

import { Dimensions, Platform } from 'react-native';

import Scales from './Scales';

const { width, height } = Dimensions.get('window');

//spočítej výšku imageHeader pro ScreenDetails
const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

const icons = {
	tiny: 10,
	small: 15,
	medium: 20,
	mediumLarge: 25,
	large: 30,
	xLarge: 35,
};

const spacing = {
	xxTiny: 5,
	xTiny: 8,
	tiny: 12,
	small: 15,
	medium: 20,
	mediumLarge: 25,
	large: 30,
	xLarge: 35,
};

const metrics = {
	screenWidth: screenWidth,
	screenHeight: screenHeight,
	headerHeight: 56,
	footerHeight: 70,
	maxInputWidth: 400,
	navBarHeight: Platform.OS === 'ios' ? 64 : 84,
	pagePadding: 20,

	icons,
	scaledIcons: Scales.fontScaleAll(icons),
	spacing,
	scaledSpacing: Scales.fontScaleAll(spacing),
};

export default metrics;
