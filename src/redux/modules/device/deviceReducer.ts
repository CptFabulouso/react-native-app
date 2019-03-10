// @flow

import * as React from 'react';
import { Metrics } from 'themes';
import { Action, Exact } from 'flow-types';

type State = Exact<{
	screenWidth: number,
	screenHeight: number,
	overallModalVisible: boolean,
	overallModalComponent: React.Node,
}>;

const INITIAL_STATE = {
	screenWidth: Metrics.screenWidth,
	screenHeight: Metrics.screenHeight,
	overallModalVisible: false,
	overallModalComponent: null,
};

const settings = (state: State = INITIAL_STATE, action: Action): State => {
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
