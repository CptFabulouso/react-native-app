// @flow

import * as React from 'react';
import { BackHandler, View } from 'react-native';
import { connect } from 'react-redux';
import type { ComponentType } from 'react';

import { Modal } from 'components';
import {
	getOverallModalComponent,
	isOverallModalVisible,
} from 'my-redux/selectors';
import { hideOverallModal } from 'my-redux/actions';
import styles from './styles';
import type { Dispatch, State } from 'flow-types';

type DispatchProps = {|
	showOverallModal: () => void,
	hideOverallModal: () => void,
|};

type StateProps = {|
	overallModalContent: React.Node,
	visible: boolean,
|};

type Props = {|
	...DispatchProps,
	...StateProps,
|};

class OverallModal extends React.Component<Props> {
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

const mapStateToProps = (state: State) => {
	return {
		visible: isOverallModalVisible(state),
		overallModalContent: getOverallModalComponent(state),
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		hideOverallModal: () => dispatch(hideOverallModal()),
	};
};

const connected: ComponentType<{}> = connect(
	mapStateToProps,
	mapDispatchToProps
)(OverallModal);

export default connected;
