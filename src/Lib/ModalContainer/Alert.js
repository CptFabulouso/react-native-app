// @flow
import { AlertController, ModalController } from './controllers';
import { Alert as RNAlert } from 'react-native';

type Button = {
	text?: string,
	onPress?: ?() => void,
	style?: 'default' | 'cancel' | 'destructive',
};
type Options = {|
	cancelable?: ?boolean,
	onDismiss?: ?() => void,
|};

const Alert = {
	alert(
		title: string,
		message?: string,
		buttons?: Array<Button>,
		options?: Options,
	) {
		const now = Date.now();
		const lastlyClosed = ModalController.getClosedTime();

		if (lastlyClosed && now - lastlyClosed < 500) {
			const timeout = 500 - (now - lastlyClosed);
			setTimeout(() => {
				AlertController.setShown(true);
				showAlert(title, message, buttons, options);
			}, timeout);
		} else {
			AlertController.setShown(true);
			showAlert(title, message, buttons, options);
		}
	},
};

function showAlert(title, message, buttons, options) {
	RNAlert.alert(
		title,
		message,
		buttons &&
			buttons.map(button => {
				return {
					...button,
					onPress: () => {
						AlertController.setShown(false);
						button.onPress && button.onPress();
					},
				};
			}),
		{
			...options,
			onDismiss() {
				AlertController.setShown(false);
				options && options.onDismiss && options.onDismiss();
			},
		},
	);
}

export default Alert;
