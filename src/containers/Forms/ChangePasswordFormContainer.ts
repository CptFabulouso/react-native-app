import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ChangePasswordForm } from 'src/components/Forms';
import { changePassword } from '@redux/actions';

type DispatchProps = {
	onSubmit: typeof changePassword;
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
	bindActionCreators(
		{
			onSubmit: changePassword,
		},
		dispatch
	);

export default connect(
	null,
	mapDispatchToProps
)(ChangePasswordForm);
