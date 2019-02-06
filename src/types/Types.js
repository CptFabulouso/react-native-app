// @flow
import type { Action } from '../redux/modules/types';
import type { ComponentType, Element, Node } from 'react';
import type { Reducers } from '../redux/reducers';
export type {
	ImageStyleProp,
	TextStyleProp,
	ViewStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
export type {
	NavigationAction,
	NavigationState,
	NavigationStateRoute,
	NavigationLeafRoute,
	NavigationRoute,
	NavigationScreenProp,
} from 'react-navigation';

type ReactNode = Node;
type ReactElement<T> = Element<T>;
export type { ReactNode, ReactElement, ComponentType };
export type { SupportedLanguage, TranslateProps } from '../i18n/I18n';
// export * from 'tools/api/apiTypes';
export type Style = any;

/* Redux */
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type { Action };
export type GetState = () => State;
export type ActionCreator = (
	dispatch: Dispatch,
	getState: GetState
) => VoidOrPromise;

export type State = $ObjMap<Reducers, $ExtractFunctionReturn>; // eslint-disable-line

export type Store = {
	dispatch: Dispatch,
	subscribe: (listener: () => void) => () => void,
	getState: () => State,
	getReducer: () => Reducers,
};

/* misc */
export type Exact<T> = T & $Shape<T>; // eslint-disable-line
export type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V; // eslint-disable-line
type VoidOrPromise = void | Promise<void>;
export type ImageSource = number | {| uri: string |};
export type Layout = {
	x: number,
	y: number,
	width: number,
	height: number,
};

/* Loading API */
export type FetchingState = {|
	loading: boolean,
	loaded: boolean,
	error: ?string,
|};

export type LoadDataState = 'start' | 'success' | 'error';

type LoadDataStart<TYPE> = {|
	type: TYPE,
	phase: 'start',
|};

type LoadDataStartOptimistic<TYPE, DATA> = {|
	type: TYPE,
	phase: 'start',
	newData: DATA,
|};

type LoadDataSuccess<TYPE, DATA> = {|
	type: TYPE,
	phase: 'success',
	newData: DATA,
|};

type LoadDataErrorOptimistic<TYPE, DATA> = {|
	type: TYPE,
	phase: 'error',
	oldData: DATA,
	error: string,
|};

type LoadDataError<TYPE> = {|
	type: TYPE,
	phase: 'error',
	error: string,
|};

export type LoadData<TYPE: string, DATA> =
	| LoadDataStart<TYPE>
	| LoadDataSuccess<TYPE, DATA>
	| LoadDataError<TYPE>;

export type LoadDataOptimistic<TYPE: string, DATA> =
	| LoadDataStartOptimistic<TYPE, DATA>
	| LoadDataSuccess<TYPE, DATA>
	| LoadDataErrorOptimistic<TYPE, DATA>;
