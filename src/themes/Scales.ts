import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor: number = 0.5) =>
	size + (scale(size) - size) * factor;

//FONTS
// Calculating ratio from iPhone breakpoints
const ratioX = width < 375 ? (width < 320 ? 0.75 : 0.875) : 1;

// We're simulating EM by changing font size according to Ratio
const fontScale = (value: number) => {
	return value * ratioX;
};

// FIXME: get return values
function fontScaleAll(o: { [key: string]: number }) {
	return Object.keys(o).reduce(
		(acc, k) => Object.assign(acc, { [k]: fontScale(o[k]) }),
		{}
	);
}

export default {
	scale,
	verticalScale,
	moderateScale,
	fontScale,
	fontScaleAll,
};
