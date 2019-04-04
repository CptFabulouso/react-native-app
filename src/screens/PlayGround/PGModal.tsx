import { Dispatch, bindActionCreators } from 'redux';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import React, { ReactNode } from 'react';

import { Alert, Button, LoadingCard, Modal } from 'src/components';
import { hideOverallModal, showOverallModal } from '@redux/actions';
import NavigationActions from 'src/navigation/NavigationActions';

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
						this.props.showOverallModal(<LoadingCard title="logging out" />);
					}}
				/>

				<Button
					label="Open RN modal"
					onPress={() => {
						this.setState({ visible: true });
					}}
				/>

				<Button
					label="Open navigation modal"
					onPress={() => {
						NavigationActions.push('overallModal');
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
					<View style={styles.modalContainer}>
						<Button
							label="Close modal container - OK"
							onPress={() => {
								this.setState({ visible: false });
							}}
						/>
						<Button
							label="show alert - OK"
							onPress={() => {
								showAlert();
							}}
						/>
						<Button
							label="close and show alert - Breaks"
							onPress={() => {
								this.setState({ visible: false });
								showAlert();
							}}
						/>
						<Button
							label="close and time alert 500ms - OK"
							onPress={() => {
								this.setState({ visible: false });
								setTimeout(() => {
									showAlert();
								}, 500);
							}}
						/>
						<Button
							label="show alert and close - Breaks"
							onPress={() => {
								showAlert();
								this.setState({ visible: false });
							}}
						/>
						<Button
							label="show alert and time close - Breaks"
							onPress={() => {
								showAlert();
								setTimeout(() => {
									this.setState({ visible: false });
								}, 500);
							}}
						/>
						<Button
							label="show alert and ok close - OK"
							onPress={() => {
								showAlert(() => {
									this.setState({ visible: false });
								});
							}}
						/>
					</View>
				</Modal>
			</View>
		);
	}
}

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
