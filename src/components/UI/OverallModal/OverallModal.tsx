import { BackHandler, View } from 'react-native';
import React, { Component, ReactNode } from 'react';

import Modal from 'src/Lib/ModalContainer/ModalContainer';
import styles from './styles';

type Props = {
	overallModalContent: ReactNode;
	visible: boolean;
	hideOverallModal: () => void;
};

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

export { OverallModal };
