// // @flow
// import React from 'react';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import type { Style } from 'flow-types';

// type IconProps = {
// 	size?: number,
// 	color?: string,
// 	style?: Style,
// };

// const basicProps: IconProps = {
// 	size: 30,
// 	color: 'black',
// };

// const createIcon = (
// 	Comp,
// 	name,
// 	props: IconProps,
// 	defaultProps: IconProps = basicProps
// ) => {
// 	return <Comp name={name} {...defaultProps} {...props} />;
// };

// const icons = {
// 	Person: (props: IconProps) => createIcon(Ionicons, 'ios-person', props),
// 	Play: (props: IconProps) => createIcon(Ionicons, 'ios-play', props),
// 	Pause: (props: IconProps) => createIcon(Ionicons, 'ios-pause', props),
// 	Stop: (props: IconProps) => createIcon(MaterialIcons, 'stop', props),
// 	Close: (props: IconProps) => createIcon(Ionicons, 'ios-close', props),
// 	Info: (props: IconProps) =>
// 		createIcon(Ionicons, 'ios-information-circle-outline', props),
// };

// export default icons;
