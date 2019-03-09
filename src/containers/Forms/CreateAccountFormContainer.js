// @flow

import { connect } from 'react-redux';

import { CreateAccountFormFormik } from 'components/Forms';
import type { CreateAccountFormValues } from 'components/Forms';

import { createAccountWithEmailAndPassword } from 'my-redux/actions';
import type { Dispatch, FormikActions } from 'flow-types';

type DispatchProps = {|
	onSubmit: (
		email: string,
		password: string,
		formActions: FormikActions<CreateAccountFormValues>
	) => void,
|};

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
