import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ChangePasswordFormFormik } from 'src/components/Forms';
import { changePassword } from '@actions';

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
)(ChangePasswordFormFormik);
