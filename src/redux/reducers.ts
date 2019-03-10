import account from './modules/account/accountReducer';
import device from './modules/device/deviceReducer';
import settings from './modules/settings/settingsReducer';
import startup from './modules/startup/startupReducer';

const reducers = {
	account,
	startup,
	settings,
	device,
};

export default reducers;

export type Reducers = typeof reducers;
