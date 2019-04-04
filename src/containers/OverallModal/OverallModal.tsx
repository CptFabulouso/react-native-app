import { Dispatch, bindActionCreators } from 'redux';
import { ReactNode } from 'react';
import { connect } from 'react-redux';

import { AppState } from 'src/types';
import { OverallModal } from 'src/components';
import {
	getOverallModalComponent,
	isOverallModalVisible,
} from '@redux/selectors';
import { hideOverallModal } from '@redux/actions';

interface StateProps {
	overallModalContent: ReactNode;
	visible: boolean;
}

interface DispatchProps {
	hideOverallModal: typeof hideOverallModal;
}

const mapStateToProps = (state: AppState): StateProps => {
	return {
		visible: isOverallModalVisible(state),
		overallModalContent: getOverallModalComponent(state),
	};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
	bindActionCreators({ hideOverallModal: hideOverallModal }, dispatch);

export default connect<StateProps, DispatchProps, {}, AppState>(
	mapStateToProps,
	mapDispatchToProps
)(OverallModal);
