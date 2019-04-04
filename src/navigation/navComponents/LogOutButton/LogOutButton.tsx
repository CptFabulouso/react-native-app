import { Dispatch, bindActionCreators } from 'redux';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import React, { Component, ComponentType } from 'react';

import { Alert } from 'src/components';
import { logOut } from '@redux/actions';
import i18n from 'src/i18n';
import styles from './styles';

type DispatchProps = {
	logOut: () => void;
};

type Props = DispatchProps;

class LogOutButton extends Component<Props> {
	showLogOutAlert() {
		Alert.alert(
			i18n.t('alerts.logOutTitle'),
			i18n.t('alerts.logOutDesc'),
			[
				{
					text: i18n.t('alerts.stay'),
					onPress: () => {},
					style: 'cancel',
				},
				{
					text: i18n.t('auth.logOut'),
					onPress: () => {
						this.props.logOut();
					},
				},
			],
			{
				cancelable: true,
			}
		);
	}

	render() {
		return (
			<TouchableOpacity
				style={styles.container}
				onPress={() => {
					this.showLogOutAlert();
				}}
			>
				<Text style={styles.label}>{i18n.t('auth.logOut')}</Text>
			</TouchableOpacity>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
	bindActionCreators({ logOut }, dispatch);

const connected: ComponentType<{}> = connect(
	null,
	mapDispatchToProps
)(LogOutButton);

export default connected;
