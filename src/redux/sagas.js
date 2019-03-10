import { all } from 'redux-saga/effects';
import { Saga } from 'redux-saga';

export default function* rootSaga(): Saga {
	yield all([]);
}
