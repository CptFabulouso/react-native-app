import { applyMiddleware, compose, createStore } from 'redux';
import {
	persistReducer,
	persistStore,
	// createMigrate
} from 'redux-persist';
// import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk'; // defaults to localStorage for web and AsyncStorage for react-native
//FIXME: use saga

// import myTransform from './PersistTransforms';
// import mySaga from '../sagas';
import { Action, AppState } from 'src/types';
import reducers from '../reducers';

const unAuthWhiteList: Array<keyof AppState> = ['device'];
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['account', 'common'],
	version: 1,
	// transforms: [myTransform],
	// migrate: createMigrate(migrations, { debug: false }),
};

let composeEnhancers = compose;
// @ts-ignore
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
	// @ts-ignore
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // @ts-ignore : compose;
}

// @ts-ignore FIXME: ts-ignore
const combinedReducers = persistReducer(persistConfig, reducers);

const createMyStore = () => {
	const rootReducer = (state: AppState | void, action: Action) => {
		let newState = state || {};
		//if user is not authorized, reset store to initial values
		if (action.type === 'USER_UNAUTHORIZED') {
			newState = {};
			[...unAuthWhiteList, '_persist'].forEach(reducerName => {
				// @ts-ignore FIXME: ts-ignore
				newState[reducerName] = state[reducerName];
			});
		}

		// @ts-ignore FIXME: ts-ignore
		return combinedReducers(newState, action);
	};

	//middleWare setup
	// const sagaMiddleware = createSagaMiddleware();
	const middleware = [thunkMiddleware /* , sagaMiddleware */];

	const store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(...middleware))
	);
	// sagaMiddleware.run(mySaga);

	const persistor = persistStore(store);
	// persistor.purge();
	return { store, persistor };
};

const { store, persistor } = createMyStore();

export { store, persistor };
