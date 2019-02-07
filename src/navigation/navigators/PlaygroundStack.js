// @flow

import { createStackNavigator } from 'react-navigation';

import PGMenu from 'screens/PlayGround/Menu';
import PGModal from 'screens/PlayGround/PGModal';
import i18n from 'i18n';

const CreatePlaygroundStack = createStackNavigator({
	pgMenu: {
		screen: PGMenu,
		navigationOptions: () => ({
			headerBackTitle: i18n.t('navigation.back'),
		}),
	},
	PGModal: PGModal,
});

export default CreatePlaygroundStack;
