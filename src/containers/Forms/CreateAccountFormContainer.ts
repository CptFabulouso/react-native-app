import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { CreateAccountForm } from 'src/components/Forms';

import { createAccountWithEmailAndPassword } from '@actions';

type DispatchProps = {
	onSubmit: typeof createAccountWithEmailAndPassword;
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
	bindActionCreators({ onSubmit: createAccountWithEmailAndPassword }, dispatch);

export default connect(
	null,
	mapDispatchToProps
)(CreateAccountForm);
