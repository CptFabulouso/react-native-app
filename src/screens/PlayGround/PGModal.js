// @flow

import * as React from 'react';
import {
	//Alert,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { connect } from 'react-redux';
import type { ComponentType } from 'react';

import { Alert, Button, LoadingCard, Modal } from 'components';
import { hideOverallModal, showOverallModal } from 'my-redux/actions';
import NavigationActions from 'navigation/NavigationActions';
import type { Dispatch } from 'flow-types';

type DispatchProps = {|
	showOverallModal: (Component: React.Node) => void,
	hideOverallModal: () => void,
|};

type Props = {|
	...DispatchProps,
|};

type State = {|
	visible: boolean,
|};

const showAlert = onOk => {
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

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		showOverallModal: (Component: React.Node) => dispatch(showOverallModal(Component)),
		hideOverallModal: () => dispatch(hideOverallModal()),
	};
};

const connected: ComponentType<{}> = connect(
	null,
	mapDispatchToProps
)(PGModal);

export default connected;

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
