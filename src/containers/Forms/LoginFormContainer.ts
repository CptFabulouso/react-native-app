import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { LoginForm } from 'src/components/Forms';

import { loginWithEmailAndPassword } from '@redux/actions';

type DispatchProps = {
	onSubmit: typeof loginWithEmailAndPassword;
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
	bindActionCreators({ onSubmit: loginWithEmailAndPassword }, dispatch);

export default connect(
	null,
	mapDispatchToProps
)(LoginForm);
