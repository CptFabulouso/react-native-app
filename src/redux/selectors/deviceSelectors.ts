import { createSelector } from 'reselect';

import { AppState, ReactNode } from 'src/types';

const getDeviceDimensions = (state: AppState) => ({
	screenWidth: state.device.screenWidth,
	screenHeight: state.device.screenHeight,
});

export const isOverallModalVisible = (state: AppState): boolean =>
	state.device.overallModalVisible;
export const getOverallModalComponent = (state: AppState): ReactNode =>
	state.device.overallModalComponent;

export const getDeviceScreenProps = createSelector(
	[getDeviceDimensions],
	dimensions => {
		return {
			screenWidth: dimensions.screenWidth,
			screenHeight: dimensions.screenHeight,
		};
	}
);
