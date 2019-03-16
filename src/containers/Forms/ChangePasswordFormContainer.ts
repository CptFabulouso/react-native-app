import { FormikActions } from 'formik';
import { connect } from 'react-redux';

import {
	ChangePasswordFormFormik,
	ChangePasswordFormValues,
} from 'src/components/Forms';
import { Dispatch } from 'src/types';
import { changePassword } from '@actions';

type DispatchProps = {
	onSubmit: (
		email: string,
		password: string,
		token: string,
		formActions: FormikActions<ChangePasswordFormValues>
	) => void;
};

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
