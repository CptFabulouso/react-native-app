// @flow

import { generateRandomId } from './helpers';
import type { User } from '../apiTypes';

const user = (email: string): User => ({
	id: generateRandomId(),
	email,
});

export { user };
