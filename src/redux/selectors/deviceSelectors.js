// @flow
import { createSelector } from 'reselect';

import type { ReactNode, State } from 'flow-types';

const getDeviceOrientation = (state: State) => state.device.orientation;
const getDeviceDimensions = (state: State) => ({
	screenWidth: state.device.screenWidth,
	screenHeight: state.device.screenHeight,
});

export const isOverallModalVisible = (state: State): boolean =>
	state.device.overallModalVisible;
export const getOverallModalComponent = (state: State): ReactNode =>
	state.device.overallModalComponent;

export const getDeviceScreenProps = createSelector(
	[getDeviceOrientation, getDeviceDimensions],
	(orientation, dimensions) => {
		return {
			orientation,
			screenWidth: dimensions.screenWidth,
			screenHeight: dimensions.screenHeight,
		};
	}
);
