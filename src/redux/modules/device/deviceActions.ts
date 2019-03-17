import { Action, ActionCreator } from 'src/types';
import { HIDE_OVERALL_MODAL, SHOW_OVERALL_MODAL } from './deviceActionTypes';
import { ReactNode } from 'react';

export const showOverallModal = (Component: ReactNode): Action => ({
	type: SHOW_OVERALL_MODAL,
	payload: {
		Component,
	},
});

export const hideOverallModal = (): Action => ({
	type: HIDE_OVERALL_MODAL,
});

export const hideOverallModalAsync = (): ActionCreator => async dispatch => {
	dispatch(hideOverallModal());
};
