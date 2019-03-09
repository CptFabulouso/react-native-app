// @flow

// import * as LogInForm from './LogInForm/LogInForm';
import ChangePasswordForm, {
	ChangePasswordFormFormik,
} from './ChangePasswordForm/ChangePasswordForm';
import CreateAccountForm, {
	CreateAccountFormFormik,
} from './CreateAccountForm/CreateAccountForm';
import ForgottenPasswordForm, {
	ForgottenPasswordFormFormik,
} from './ForgottenPasswordForm/ForgottenPasswordForm';
import LoginForm, { LoginFormFormik } from './LogInForm/LogInForm';

export type { LoginFormValues } from './LogInForm/LogInForm';
export type {
	CreateAccountFormValues,
} from './CreateAccountForm/CreateAccountForm';
export type {
	ForgottenPasswordFormValues,
} from './ForgottenPasswordForm/ForgottenPasswordForm';
export type {
	ChangePasswordFormValues,
} from './ChangePasswordForm/ChangePasswordForm';

export {
	LoginForm,
	LoginFormFormik,
	CreateAccountForm,
	CreateAccountFormFormik,
	ForgottenPasswordForm,
	ForgottenPasswordFormFormik,
	ChangePasswordForm,
	ChangePasswordFormFormik,
};
