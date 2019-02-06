// @flow

import { all } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';

import startupSagas from './modules/startup/startupSagas';

export default function* rootSaga(): Saga {
	yield all([...startupSagas]);
}
