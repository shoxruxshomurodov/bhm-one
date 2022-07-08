import Actions from './actions';

export default (state = {}, action) => {
	switch (action.type) {
		case Actions.LOGIN_BY_TOKEN.REQUEST:
			return {
				...state,
				isFetched: false,
			};
		case Actions.LOGIN_BY_TOKEN.FAILURE:
			return {
				...state,
				isFetched: true,
				isAuthenticated: false,
			};
		case Actions.LOGIN_BY_TOKEN.SUCCESS:
			let { token, user } = action.payload;
			return {
				...state,
				isFetched: true,
				enter_home: true,
				token,
				user: {
					...user,
				},
				isAuthenticated: true,
			};

		case Actions.CHECK.REQUEST:
			return {
				...state,
				isFetched: false,
			};
		case Actions.CHECK.FAILURE:
			return {
				...state,
				isFetched: true,
				isAuthenticated: false,
				user: false,
			};
		case Actions.CHECK.SUCCESS:
			return {
				...state,
				isFetched: true,
				isAuthenticated: true,
				enter_home: false,
				user: action.payload.user,
			};

		case Actions.LINK_EMPLOYEE.REQUEST:
			return {
				...state,
				isFetched: false,
			};
		case Actions.LINK_EMPLOYEE.FAILURE:
			return {
				...state,
				isFetched: true,
				user: { ...state.user, profile: false },
			};
		case Actions.LINK_EMPLOYEE.SUCCESS:
			return {
				...state,
				isFetched: true,
				user: { ...state.user, profile: action.payload.employee },
			};
		case Actions.LOGOUT.REQUEST:
			return {
				...state,
				isFetched: false,
				phone: action.payload,
			};
		case Actions.LOGOUT.FAILURE:
			return {
				...state,
				isFetched: true,
			};
		case Actions.LOGOUT.SUCCESS:
			return {
				...state,
				isFetched: true,
				employee: false,
				isAuthenticated: false,
				user: false,
			};
		case Actions.WELCOME_HOME.REQUEST:
			return {
				...state,
				enter_home: false,
			};
		case Actions.WELCOME_HOME.SUCCESS:
			return {
				...state,
				enter_home: false,
			};
		case Actions.GOOD_BYE_HOME.REQUEST:
			return {
				...state,
				exit_home: false,
			};
		case Actions.GOOD_BYE_HOME.SUCCESS:
			return {
				...state,
				exit_home: true,
			};

		case Actions.CANCEL_GOOD_BYE_HOME.REQUEST:
			return {
				...state,
			};
		case Actions.CANCEL_GOOD_BYE_HOME.SUCCESS:
			return {
				...state,
				exit_home: false,
			};
		case Actions.CHANGE_MODE.SUCCESS:
			let { mode } = action.payload;
			return {
				...state,
				mode,
			};
		default:
			return state;
	}
};
