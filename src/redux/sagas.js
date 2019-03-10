import { all } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';

export default function* rootSaga(): Saga {
	yield all([]);
}
