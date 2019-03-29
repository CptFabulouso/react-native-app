import {
	NativeModules,
	PanResponder,
	Platform,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { Component } from 'react';

import styles from './styles';

type Props = {
	style: any;
	children: Array<any>;
	visibleTime: number;
	persistor?: {
		purge: () => Promise<any>;
	};
	visibleOnStartup: boolean;
};

type State = {
	visible: boolean;
};

class DevMenuTrigger extends Component<Props, State> {
	timeout: any;

	static defaultProps = {
		visibleTime: 3000,
		visibleOnStartup: false,
	};

	constructor(props: Props) {
		super(props);

		this.timeout;

		this.state = {
			visible: this.props.visibleOnStartup,
		};
	}

	shouldComponentUpdate(_: Props, nextState: State) {
		if (this.state.visible !== nextState.visible) {
			return true;
		}
		return false;
	}

	componentDidMount() {
		if (this.props.visibleOnStartup) {
			this.toggleVisible();
		}
	}

	toggleVisible() {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}

		this.setState({ visible: true });
		this.timeout = setTimeout(() => {
			this.setState({ visible: false });
			this.timeout = null;
		}, this.props.visibleTime);
	}

	toggleDev(devEnabled: boolean) {
		const { DevSettings } = NativeModules;
		if (devEnabled) {
			DevSettings.setIsDebuggingRemotely(false);
		} else {
			DevSettings.setIsDebuggingRemotely(true);
		}
	}

	showMenu() {
		const { DevMenu } = NativeModules;
		DevMenu.show();
	}

	renderIOSButtons() {
		const { DevSettings } = NativeModules;
		// @ts-ignore
		const devEnabled = typeof atob !== 'undefined';
		const debugColor = devEnabled ? 'red' : 'green';
		const { persistor } = this.props;
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.close}
					onPress={() => this.setState({ visible: false })}
				>
					<Text style={styles.text}>x</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.devmenu]}
					onPress={() => this.showMenu()}
				>
					<Text style={styles.text}>Men</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.reload]}
					onPress={() => DevSettings.reload()}
				>
					<Text style={styles.text}>Rel</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: debugColor }]}
					onPress={() => this.toggleDev(devEnabled)}
				>
					<Text style={styles.text}>Deb</Text>
				</TouchableOpacity>
				{persistor && persistor.purge && (
					<TouchableOpacity
						style={[styles.button, { backgroundColor: 'red' }]}
						onPress={() => {
							persistor.purge();
						}}
					>
						<Text style={styles.text}>Purge</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	}

	renderAndroidButtons() {
		const { persistor } = this.props;
		if (!persistor || !persistor.purge) {
			return null;
		}
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: 'red' }]}
					onPress={() => {
						persistor.purge();
					}}
				>
					<Text style={styles.text}>Purge</Text>
				</TouchableOpacity>
			</View>
		);
	}

	renderButtons() {
		if (!__DEV__ || !this.state.visible) {
			return null;
		}
		if (Platform.OS === 'ios') {
			return this.renderIOSButtons();
		}
		return this.renderAndroidButtons();
	}

	render() {
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (_, gestureState) => {
				if (gestureState.numberActiveTouches === 3) {
					this.toggleVisible();
				}
				return false;
			},
		});
		return (
			<View style={this.props.style} {...panResponder.panHandlers}>
				{this.props.children}
				{this.renderButtons()}
			</View>
		);
	}
}

export default DevMenuTrigger;
