// @flow

import { NavigationActions, StackActions } from 'react-navigation';
import type {
	NavigationNavigateAction,
	NavigationParams,
	NavigationRoute,
} from 'react-navigation';

let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
	_navigator = navigatorRef;
}

const dispatch = (params: NavigationNavigateAction) =>
	_navigator.dispatch(params);

function push(routeName: string, params?: NavigationParams) {
	_navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		})
	);
}

function reset(routeName: string) {
	const resetAction = StackActions.reset({
		index: 0,
		key: null,
		actions: [NavigationActions.navigate({ routeName })],
	});
	_navigator.dispatch(resetAction);
}

function resetTo(
	routeNames: Array<string> | string,
	index: number,
	key: string
) {
	let actions;
	if (Array.isArray(routeNames)) {
		actions = routeNames.map(screen =>
			NavigationActions.navigate({ routeName: screen })
		);
	} else {
		actions = [NavigationActions.navigate({ routeName: routeNames })];
		index = 0;
	}
	const resetAction = StackActions.reset({
		index,
		key: key || null,
		actions,
	});

	_navigator.dispatch(resetAction);
}

function back() {
	_navigator.dispatch(NavigationActions.back());
}

function pop() {
	back();
}

function popTo(routeName: string) {
	_navigator.dispatch(NavigationActions.back({ key: routeName }));
}

function replace(routeName: string, params?: NavigationParams) {
	_navigator.dispatch(
		StackActions.replace({
			routeName,
			params,
		})
	);
}

function getCurrentRouteName(): string {
	function findFinalRoute(route: NavigationRoute): string {
		if (route.hasOwnProperty('index') && route.hasOwnProperty('routes')) {
			//$FlowFixMe nedaří se mi flow přesvědčit, že sem NavigationLeafRoute neprojde
			const currentNavigation: NavigationRoute = route.routes[route.index];
			return findFinalRoute(currentNavigation);
		}
		return route.routeName;
	}
	return findFinalRoute(_navigator.state.nav);
}

export default {
	setTopLevelNavigator,
	push,
	replace,
	reset,
	resetTo,
	pop,
	popTo,
	back,
	getCurrentRouteName,
	dispatch,
};
