import { ReactNode } from 'react';

export const SHOW_OVERALL_MODAL = 'SHOW_OVERALL_MODAL';
export const HIDE_OVERALL_MODAL = 'HIDE_OVERALL_MODAL';

interface ShowOverallModalAction {
  type: typeof SHOW_OVERALL_MODAL;
  payload: { Component: ReactNode };
}

interface HideOverallModalAction {
  type: typeof HIDE_OVERALL_MODAL;
}

export type DeviceActionTypes = ShowOverallModalAction | HideOverallModalAction;
