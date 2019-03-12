import { loadLanguage } from '../settings/settingsActions';
import { reLogin } from '../account/accountThunks';

import { ActionCreator } from 'src/types';

export const runStartupActions = (): ActionCreator => async dispatch => {
	dispatch(reLogin());
	dispatch(loadLanguage());
};
