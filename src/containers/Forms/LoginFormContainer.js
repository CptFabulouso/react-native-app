// @flow

import { connect } from 'react-redux';

import { LoginFormFormik } from 'components/Forms';
import type { LoginFormValues } from 'components/Forms';

import { loginWithEmailAndPassword } from 'my-redux/actions';
import type { Dispatch, FormikActions } from 'flow-types';

type DispatchProps = {|
	onSubmit: (
		email: string,
		password: string,
		formActions: FormikActions<LoginFormValues>
	) => void,
|};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
	return {
		onSubmit: (
			email: string,
			password: string,
			formActions: FormikActions<LoginFormValues>
		) => {
			dispatch(loginWithEmailAndPassword(email, password, formActions));
		},
	};
};

export default connect(
	null,
	mapDispatchToProps
)(LoginFormFormik);
