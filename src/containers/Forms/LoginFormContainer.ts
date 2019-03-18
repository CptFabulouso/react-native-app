import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { LoginFormFormik } from 'src/components/Forms';

import { loginWithEmailAndPassword } from '@actions';

type DispatchProps = {
	onSubmit: typeof loginWithEmailAndPassword;
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
	bindActionCreators({ onSubmit: loginWithEmailAndPassword }, dispatch);

export default connect(
	null,
	mapDispatchToProps
)(LoginFormFormik);
