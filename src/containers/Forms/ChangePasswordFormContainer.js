// @flow

import { connect } from 'react-redux';

import { ChangePasswordFormFormik } from 'components/Forms';
import { changePassword } from 'my-redux/actions';
import type { ChangePasswordFormValues } from 'components/Forms';
import type { Dispatch, FormikActions } from 'flow-types';

type DispatchProps = {|
	onSubmit: (
		email: string,
		password: string,
		token: string,
		formActions: FormikActions<ChangePasswordFormValues>
	) => void,
|};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
	return {
		onSubmit: (
			email: string,
			password: string,
			token: string,
			formActions: FormikActions<ChangePasswordFormValues>
		) => {
			dispatch(changePassword(email, password, token, formActions));
		},
	};
};

export default connect(
	null,
	mapDispatchToProps
)(ChangePasswordFormFormik);
