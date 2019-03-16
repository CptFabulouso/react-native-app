import { BackHandler, View } from 'react-native';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, ReactNode } from 'react';

import { AppState } from 'src/types';
import { Modal } from 'src/components';
import {
	getOverallModalComponent,
	isOverallModalVisible,
} from 'src/redux/selectors';
import { hideOverallModal } from '@actions';
import styles from './styles';

interface StateProps {
	overallModalContent: ReactNode;
	visible: boolean;
}

interface DispatchProps {
	hideOverallModal: typeof hideOverallModal;
}

type Props = DispatchProps & StateProps;

class OverallModal extends Component<Props> {
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleBackPress = () => {
		return true;
	};

	render() {
		return (
			<Modal
				isVisible={this.props.visible}
				animationIn={'fadeIn'}
				animationOut={'fadeOut'}
			>
				<View style={styles.container}>{this.props.overallModalContent}</View>
			</Modal>
		);
	}
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
