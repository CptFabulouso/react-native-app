import { FormikActions } from 'formik';
import { connect } from 'react-redux';

import { LoginFormFormik, LoginFormValues } from 'src/components/Forms';

import { Dispatch } from 'src/types';
import { loginWithEmailAndPassword } from '@actions';

type DispatchProps = {
	onSubmit: (
		email: string,
		password: string,
		formActions: FormikActions<LoginFormValues>
	) => void;
};

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
