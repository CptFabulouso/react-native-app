// @flow

import { applyMiddleware, compose, createStore } from 'redux';
import {
	persistCombineReducers,
	persistStore,
	// createMigrate
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk'; // defaults to localStorage for web and AsyncStorage for react-native

// import myTransform from './PersistTransforms';
import mySaga from '../sagas';
import reducers from '../reducers';
import type { Action, State } from 'flow-types';

const unAuthWhiteList: Array<$Keys<State>> = ['settings'];
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['account', 'common'],
	version: 1,
	// transforms: [myTransform],
	// migrate: createMigrate(migrations, { debug: false }),
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	: compose;

const combinedReducers = persistCombineReducers(persistConfig, reducers);

const createMyStore = () => {
	const rootReducer = (state: State | void, action: Action) => {
		let newState = state || {};
		//if user is not authorized, reset store to initial values
		if (action.type === 'USER_UNAUTHORIZED') {
			newState = {};
			//We need to keep _persist, this is flow workaround
			[...unAuthWhiteList, '_persist'].forEach(reducerName => {
				// $FlowFixMe
				newState[reducerName] = state[reducerName];
			});
		}
		return combinedReducers(newState, action);
	};

	//middleWare setup
	const sagaMiddleware = createSagaMiddleware();
	const middleware = [thunkMiddleware, sagaMiddleware];

	// const persistedReducer = persistReducer(persistConfig, rootReducer);
	const store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(...middleware))
	);
	sagaMiddleware.run(mySaga);

	const persistor = persistStore(store);
	// persistor.purge();
	return { store, persistor };
};

const { store, persistor } = createMyStore();

export { store, persistor };
