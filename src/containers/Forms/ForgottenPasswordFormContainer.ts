// @flow

import { connect } from 'react-redux';

import { Dispatch, FormikActions } from 'flow-types';
import { ForgottenPasswordFormFormik } from 'components/Forms';
import { ForgottenPasswordFormValues } from 'components/Forms';
import { sendResetPasswordCode } from 'my-redux/actions';

type DispatchProps = {
	onSubmit: (
		email: string,
		formActions: FormikActions<ForgottenPasswordFormValues>
	) => void;
};

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
