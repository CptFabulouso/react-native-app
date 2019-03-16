import { FormikActions } from 'formik';
import { connect } from 'react-redux';

import {
	CreateAccountFormFormik,
	CreateAccountFormValues,
} from 'src/components/Forms';

import { Dispatch } from 'src/types';
import { createAccountWithEmailAndPassword } from '@actions';

type DispatchProps = {
	onSubmit: (
		email: string,
		password: string,
		formActions: FormikActions<CreateAccountFormValues>
	) => void;
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
	return {
		onSubmit: (
			email: string,
			password: string,
			formActions: FormikActions<CreateAccountFormValues>
		) => {
			dispatch(createAccountWithEmailAndPassword(email, password, formActions));
		},
	};
};

export default connect(
	null,
	mapDispatchToProps
)(CreateAccountFormFormik);
