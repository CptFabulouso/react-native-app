// @flow

import React from 'react';

import { Button } from '../Button';
import { Icons } from 'themes';
import styles from './styles';
import { Style } from 'flow-types';

type Props = {|
	style?: Style,
	onPress: () => void,
	loading?: boolean,
	disabled?: boolean,
|};

const Facebook = (props: Props) => {
	return (
		<Button
			label="Facebook"
			style={styles.container}
			labelStyle={styles.label}
			color="#425EAC"
			iconLeft
			{...props}
		>
			<Icons.Social.Facebook size={25} style={{ width: 30, paddingTop: 3 }} />
		</Button>
	);
};

const Twitter = (props: Props) => {
	return (
		<Button
			label="Twitter"
			style={styles.container}
			labelStyle={styles.label}
			color="#1DADEB"
			iconLeft
			{...props}
		>
			<Icons.Social.Twitter size={25} style={{ width: 30, paddingTop: 2 }} />
		</Button>
	);
};

const Google = (props: Props) => {
	return (
		<Button
			label="Google+"
			style={styles.container}
			labelStyle={styles.label}
			color="#DD4B38"
			iconLeft
			{...props}
		>
			<Icons.Social.Google size={20} style={{ width: 30, paddingTop: 3 }} />
		</Button>
	);
};

const SocialButton = {
	Facebook,
	Twitter,
	Google,
};

export { SocialButton };
