/* @flow */

import { Formik } from 'formik';
import React, { Component, type ComponentType } from 'react';

export type PassedProps = {||};

type Values = any;
type FormikBag = any;
type FormikErrors = any;
type Promise = any;
type Schema = any;

export type FormikProps = {|
	component?: ComponentType<*>,
	enableReinitialize?: boolean,
	isInitialValid?: boolean,
	initialStatus?: any,
	initialValues: Values,
	onReset?: (values: Values, formikBag: FormikBag) => void,
	onSubmit: (values: Values, formikBag: FormikBag) => void,
	validate?: (values: Values) => FormikErrors | Promise,
	validateOnBlur?: boolean,
	validateOnChange?: boolean,
	validationSchema?: Schema | (() => Schema),
|};

type State = {||};

export default function withFormik<Config: any>(
	WrappedComponent: ComponentType<Config>
): ComponentType<$Diff<Config, PassedProps>> {
	return class Wrapper extends Component<$Diff<Config, PassedProps>, State> {
		render() {
			return <Formik {...this.props} render={WrappedComponent} />;
		}
	};
}
