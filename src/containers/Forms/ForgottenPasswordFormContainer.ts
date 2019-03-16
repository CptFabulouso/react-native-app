import { FormikActions } from 'formik';
import { connect } from 'react-redux';

import { Dispatch } from 'src/types';
import {
	ForgottenPasswordFormFormik,
	ForgottenPasswordFormValues,
} from 'src/components/Forms';
import { sendResetPasswordCode } from '@actions';

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
