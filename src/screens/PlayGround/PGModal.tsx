import { Dispatch, bindActionCreators } from 'redux';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import React, { ReactNode } from 'react';

import { Alert, Button, LoadingCard, Modal, Text } from 'src/components';
import { hideOverallModal, showOverallModal } from '@redux/actions';
import { sleep } from 'src/utils/common';

type DispatchProps = {
	showOverallModal: (Component: ReactNode) => void;
	hideOverallModal: () => void;
};

type Props = DispatchProps;

type State = {
	visible: boolean;
};

const showAlert = (onOk?: () => void) => {
	Alert.alert(
		'title',
		'message',
		[{ text: 'OK', onPress: () => onOk && onOk() }],
		{ cancelable: true }
	);
};

class PGModal extends React.Component<Props, State> {
	state = {
		visible: false,
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>PGModal</Text>
				<Button
					label="Open Overall modal - redux"
					onPress={() => {
						this.props.showOverallModal(
							<ModalContent
								onDismissModal={() => {
									this.props.hideOverallModal();
								}}
							/>
						);
					}}
				/>
				<Button
					label="Open Overall modal - redux and dismiss"
					onPress={async () => {
						this.props.showOverallModal(<LoadingCard title={'testing...'} />);
						await sleep(2000);
						this.props.hideOverallModal();
						showAlert();
					}}
				/>
				<Button
					label="Open RN modal"
					onPress={() => {
						this.setState({ visible: true });
					}}
				/>

				<Modal
					onSwipe={() => this.setState({ visible: false })}
					isVisible={this.state.visible}
					// useRNModal={false}
					// swipeDirection="down"
					animationIn={'fadeIn'}
					animationOut={'fadeOut'}
				>
					<ModalContent
						onDismissModal={() => {
							this.setState({ visible: false });
						}}
					/>
				</Modal>
			</View>
		);
	}
}

type ModalProps = {
	onDismissModal: () => void;
};

const ModalContent = ({ onDismissModal }: ModalProps) => {
	return (
		<View style={styles.modalContainer}>
			<Button label="Close modal container - OK" onPress={onDismissModal} />
			<Button
				label="show alert - OK"
				onPress={() => {
					showAlert();
				}}
			/>
			<Button
				label="close and show alert - Breaks"
				onPress={() => {
					onDismissModal();
					showAlert();
				}}
			/>
			<Button
				label="close and time alert 500ms - OK"
				onPress={() => {
					onDismissModal();
					setTimeout(() => {
						showAlert();
					}, 500);
				}}
			/>
			<Button
				label="show alert and close - Breaks"
				onPress={() => {
					showAlert();
					onDismissModal();
				}}
			/>
			<Button
				label="show alert and time close - Breaks"
				onPress={() => {
					showAlert();
					setTimeout(() => {
						onDismissModal();
					}, 500);
				}}
			/>
			<Button
				label="show alert and ok close - OK"
				onPress={() => {
					showAlert(() => {
						onDismissModal();
					});
				}}
			/>
		</View>
	);
};
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
	bindActionCreators({ showOverallModal, hideOverallModal }, dispatch);

export default connect(
	null,
	mapDispatchToProps
)(PGModal);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
	},
});
