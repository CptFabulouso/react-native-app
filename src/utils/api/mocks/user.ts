import { User } from '../apiTypes';
import { generateRandomId } from './helpers';

const user = (email: string): User => ({
	id: generateRandomId(),
	email,
	refreshToken: 'refreshToken',
});

export { user };
