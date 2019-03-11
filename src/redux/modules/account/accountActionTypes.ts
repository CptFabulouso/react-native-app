import { LoadData, User } from 'src/types';

export const LOGIN_EMAIL_PASSWORD = 'LOGIN_EMAIL_PASSWORD';
export const RE_LOGIN_USER = 'RE_LOGIN_USER';
export const SEND_RESET_PASSWORD_CODE = 'SEND_RESET_PASSWORD_CODE';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CREATE_EMAIL_ACCOUNT = 'CREATE_EMAIL_ACCOUNT';
export const LOGOUT_USER = 'LOGOUT_USER';
export const RESET_RESET_PASSWORD_CODE = 'RESET_RESET_PASSWORD_CODE';
export const USER_AUTHORIZED = 'USER_AUTHORIZED';
export const USER_UNAUTHORIZED = 'USER_UNAUTHORIZED';

export type AccountActions =
  | LoadData<typeof LOGIN_EMAIL_PASSWORD, User>
  | LoadData<typeof RE_LOGIN_USER, User>
  | LoadData<typeof SEND_RESET_PASSWORD_CODE, {}>
  | LoadData<typeof CHANGE_PASSWORD, {}>
  | LoadData<typeof CREATE_EMAIL_ACCOUNT, User>
  | LoadData<typeof LOGOUT_USER, {}>;

interface ResetPasswordAction {
  type: typeof RESET_RESET_PASSWORD_CODE;
}

interface UserAuthorizedAction {
  type: typeof USER_AUTHORIZED;
  user: User;
}

interface UserUnAuthorizedAction {
  type: typeof USER_UNAUTHORIZED;
}

export type AccountActionTypes =
  | AccountActions
  | ResetPasswordAction
  | UserAuthorizedAction
  | UserUnAuthorizedAction;
