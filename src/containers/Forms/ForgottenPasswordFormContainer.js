// @flow

import { connect } from 'react-redux';

import { ForgottenPasswordFormFormik } from 'components/Forms';
import { sendResetPasswordCode } from 'my-redux/actions';
import type { Dispatch, FormikActions } from 'flow-types';
import type { ForgottenPasswordFormValues } from 'components/Forms';

type DispatchProps = {|
	onSubmit: (
		email: string,
		formActions: FormikActions<ForgottenPasswordFormValues>
	) => void,
|};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
	return {
		onSubmit: (
			email: string,
			formActions: FormikActions<ForgottenPasswordFormValues>
		) => {
			dispatch(sendResetPasswordCode(email, formActions));
		},
	};
};

export default connect(
	null,
	mapDispatchToProps
)(ForgottenPasswordFormFormik);
