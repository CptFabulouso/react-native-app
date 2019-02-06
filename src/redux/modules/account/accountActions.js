// @flow

import React from 'react';

// import { LoadingCard } from 'components';

import { hideOverallModal, showOverallModal } from '../device/deviceActions';
import { sleep } from 'utils/common';
import i18n from 'i18n';
import type { Action, ActionCreator, LoadData } from 'flow-types';

export type AccountActions =
	| {|
			type: 'USER_AUTHORIZED',
	  |}
	| {|
			type: 'USER_UNAUTHORIZED',
	  |};

export const userAuthorized = (): Action => ({
	type: 'USER_AUTHORIZED',
});

export const userUnauthorized = (): Action => ({
	type: 'USER_UNAUTHORIZED',
});
