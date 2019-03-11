// @flow

import { ReactNode } from 'react';
import { Action, ActionCreator } from 'src/types';
import { SHOW_OVERALL_MODAL, HIDE_OVERALL_MODAL } from './deviceActionTypes';

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
