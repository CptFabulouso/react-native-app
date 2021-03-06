/* Imports and exports */
// dependency imports
import { ComponentType, ReactNode } from 'react';
import { ThunkAction as ReduxThunkAction } from 'redux-thunk';

// project imports
import { Action } from '@redux/modules/ActionTypes';
import { AppState } from '@redux/reducers';
export { Action, AppState };

// dependency exports
export { ImageStyle, TextStyle, ViewStyle } from 'react-native';
export {
	NavigationAction,
	NavigationState,
	NavigationStateRoute,
	NavigationLeafRoute,
	NavigationRoute,
	NavigationScreenProp,
} from 'react-navigation';

// project exports
export * from 'src/utils/api/apiTypes';
export { SupportedLanguage } from '../i18n/I18n';

/* React */
export { ReactNode, ComponentType };
export type Style = any;

/* Redux */
export type ThunkAction = ReduxThunkAction<
	void,
	AppState,
	null,
	Action
	// ReduxAction<string>
>;
export type PromiseAction = Promise<Action>;
// export type Dispatch = ReduxDispatch<Action>;
export type Dispatch = (action: Action | ActionCreator) => void;
export type GetState = () => AppState;
export type ActionCreator = ThunkAction;

/* misc */
export type Exact<T> = T & Partial<T>; // eslint-disable-line
export type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V; // eslint-disable-line
export type ImageSource = number | { uri: string };
export type Layout = {
	x: number;
	y: number;
	width: number;
	height: number;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/* Loading API */
export type FetchingState = {
	loading: boolean;
	loaded: boolean;
	error?: string;
};

export type LoadDataState = 'start' | 'success' | 'error';

type LoadDataStart<TYPE> = {
	type: TYPE;
	phase: 'start';
};

type LoadDataStartOptimistic<TYPE, DATA> = {
	type: TYPE;
	phase: 'start';
	newData: DATA;
};

type LoadDataSuccess<TYPE, DATA> = {
	type: TYPE;
	phase: 'success';
	newData: DATA;
};

type LoadDataErrorOptimistic<TYPE, DATA> = {
	type: TYPE;
	phase: 'error';
	oldData: DATA;
	error: string;
};

type LoadDataError<TYPE> = {
	type: TYPE;
	phase: 'error';
	error: string;
};

export type LoadData<TYPE, DATA> =
	| LoadDataStart<TYPE>
	| LoadDataSuccess<TYPE, DATA>
	| LoadDataError<TYPE>;

export type LoadDataOptimistic<TYPE, DATA> =
	| LoadDataStartOptimistic<TYPE, DATA>
	| LoadDataSuccess<TYPE, DATA>
	| LoadDataErrorOptimistic<TYPE, DATA>;
