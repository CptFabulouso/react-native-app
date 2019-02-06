// @flow

import Scales from './Scales';

const size = {
	h1: 38,
	h2: 34,
	h3: 30,
	h4: 26,
	h5: 20,
	h6: 19,
	regular: 17,
	input: 16,
	medium: 14,
	small: 12,
	tiny: 8.5,
};

const scaledFonts = Scales.fontScaleAll(size);

export default {
	size: scaledFonts,
};
