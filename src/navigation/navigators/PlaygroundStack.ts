import { createStackNavigator } from 'react-navigation';

import PGMenu from 'src/screens/PlayGround/Menu';
import PGModal from 'src/screens/PlayGround/PGModal';
import i18n from 'src/i18n';

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
