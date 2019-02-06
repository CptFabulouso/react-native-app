// @flow

import { put, takeEvery } from 'redux-saga/effects';

import type { Action } from 'flow-types';

function* runStartupSaga() {
	try {
		yield put(
			({
				type: 'RUN_STARTUP_SAGAS_SUCCEEDED',
			}: Action)
		);
	} catch (er) {
		yield put(({ type: 'RUN_STARTUP_SAGAS_FAILED', payload: er }: Action));
	}
}

export default [takeEvery('RUN_STARTUP_SAGAS_REQUESTED', runStartupSaga)];
