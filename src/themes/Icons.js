// @flow
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
  defaultProps: IconProps = basicProps,
) => {
  return <Comp name={name} {...defaultProps} {...props} />;
};

const icons = {
  Main: (props: IconProps) => createIcon(Ionicons, 'ios-thumbs-up', props),
  Settings: (props: IconProps) => createIcon(Ionicons, 'ios-settings', props),
};

export default icons;
