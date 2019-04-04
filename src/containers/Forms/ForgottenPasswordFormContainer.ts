import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ForgottenPasswordForm } from 'src/components/Forms';
import { sendResetPasswordCode } from '@redux/actions';

type DispatchProps = {
	onSubmit: typeof sendResetPasswordCode;
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
	bindActionCreators(
		{
			onSubmit: sendResetPasswordCode,
		},
		dispatch
	);

export default connect(
	null,
	mapDispatchToProps
)(ForgottenPasswordForm);
