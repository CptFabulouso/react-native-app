import { Action } from 'src/types';
import { Metrics } from 'src/themes';
import { ReactNode } from 'react';

type DeviceState = {
	screenWidth: number;
	screenHeight: number;
	overallModalVisible: boolean;
	overallModalComponent: ReactNode;
};

const INITIAL_STATE: DeviceState = {
	screenWidth: Metrics.screenWidth,
	screenHeight: Metrics.screenHeight,
	overallModalVisible: false,
	overallModalComponent: null,
};

const settings = (state = INITIAL_STATE, action: Action): DeviceState => {
	switch (action.type) {
		case 'SHOW_OVERALL_MODAL':
			return {
				...state,
				overallModalVisible: true,
				overallModalComponent: action.payload.Component,
			};
		case 'HIDE_OVERALL_MODAL':
			return {
				...state,
				overallModalVisible: false,
			};
		default:
			return state;
	}
};

export default settings;
