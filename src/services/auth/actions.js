import { createRoutine } from 'redux-saga-routines';

const LOGIN_OR_SIGN_UP = createRoutine('LOGIN_OR_SIGN_UP');
const TOKEN_ONE = createRoutine('TOKEN_ONE');
const TOKEN_CONFIRM = createRoutine('TOKEN_CONFIRM');
const USER_ONE = createRoutine('USER_ONE');
const LOGIN = createRoutine('LOGIN');
const PASSWORD_RESET = createRoutine('PASSWORD_RESET');
const LINK_PROFILE = createRoutine('LINK_PROFILE');
const CHECK_AUTH = createRoutine('CHECK_AUTH');
const LOGOUT_AUTH = createRoutine('LOGOUT_AUTH');
/// TEPASI YANGI

const LOGIN_BY_TOKEN = createRoutine('LOGIN_BY_TOKEN');
const CHECK = createRoutine('CHECK');
const LINK_EMPLOYEE = createRoutine('LINK_EMPLOYEE');
const LOGOUT = createRoutine('LOGOUT');
const WELCOME_HOME = createRoutine('WELCOME_HOME');
const GOOD_BYE_HOME = createRoutine('GOOD_BYE_HOME');
const CANCEL_GOOD_BYE_HOME = createRoutine('CANCEL_GOOD_BYE_HOME');
const CHANGE_MODE = createRoutine('CHANGE_MODE');
const CERT_SIGN = createRoutine("CERT_SIGN")
export default {
	LOGIN_OR_SIGN_UP,
	TOKEN_ONE,
	TOKEN_CONFIRM,
	USER_ONE,
	LOGIN,
	PASSWORD_RESET,
	LINK_PROFILE,
	CHECK_AUTH,
	LOGOUT_AUTH,
	// TEPASI YANGI
	LOGIN_BY_TOKEN,
	CHECK,
	LINK_EMPLOYEE,
	LOGOUT,
	WELCOME_HOME,
	GOOD_BYE_HOME,
	CANCEL_GOOD_BYE_HOME,
	CHANGE_MODE,
	CERT_SIGN
};
