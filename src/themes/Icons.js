// @flow
import React from 'react';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Foundation from 'react-native-vector-icons/Foundation';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import Zocial from 'react-native-vector-icons/Zocial';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import type { Style } from 'flow-types';

type IconProps = {
	size?: number,
	color?: string,
	style?: Style,
};

const basicProps: IconProps = {
	size: 30,
	color: 'black',
};

const createIcon = (
	Comp,
	name,
	props: IconProps,
	defaultProps: IconProps = basicProps
) => {
	return <Comp name={name} {...defaultProps} {...props} />;
};

const icons = {
	Social: {
		Facebook: (props: IconProps) => createIcon(EvilIcons, 'sc-facebook', props),
		Twitter: (props: IconProps) => createIcon(EvilIcons, 'sc-twitter', props),
		Google: (props: IconProps) =>
			createIcon(EvilIcons, 'sc-google-plus', props),
	},
	Main: (props: IconProps) => createIcon(Ionicons, 'ios-thumbs-up', props),
	Settings: (props: IconProps) => createIcon(Ionicons, 'ios-settings', props),
};

export default icons;
