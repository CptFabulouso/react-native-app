import { combineReducers } from 'redux';

import account from './modules/account/accountReducer';
import device from './modules/device/deviceReducer';
// import settings from './modules/settings/settingsReducer';
// import startup from './modules/startup/startupReducer';

const reducers = {
	account,
	device,
	// settings,
	// startup
};

const combinedReducers = combineReducers(reducers);

export default combinedReducers;

export type AppState = ReturnType<typeof combinedReducers>;
