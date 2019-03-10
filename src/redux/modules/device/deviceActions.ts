// @flow

import * as React from 'react';
import { Action } from 'flow-types';

export type DeviceActions =
	| {|
			type: 'SHOW_OVERALL_MODAL',
			payload: { Component: React.Node },
	  |}
	| {|
			type: 'HIDE_OVERALL_MODAL',
	  |};

export const showOverallModal = (Component: React.Node): Action => ({
	type: 'SHOW_OVERALL_MODAL',
	payload: { Component },
});

export const hideOverallModal = (): Action => ({
	type: 'HIDE_OVERALL_MODAL',
});
