import React, { Component } from 'react';
import get from 'lodash/get';
import Provider from './Provider';
import { connect } from 'react-redux';
import Utils from '../../helpers/Utils';
import Actions from '../actions';
class Auth extends Component {
	componentDidMount() {
		const { checkAuth } = this.props;
		checkAuth();
	}
	render() {
		const { children, isAuthenticated, isFetched, user, profile, rolesNames } = this.props;
		return (
			<Provider
				value={{
					isAuthenticated,
					isFetched,
					user,
					profile,
					rolesNames,
					userCan: (can = '', cant = '', exceptCant = '') => {
						return Utils.hasAccess({
							roles: rolesNames ?? [],
							can,
							cant,
							exceptCant,
						});
					},
				}}
			>
				{children}
			</Provider>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		isAuthenticated: get(state.auth, 'isAuthenticated', false),
		isFetched: get(state.auth, 'isFetched', false),
		user: get(state.auth, 'user', {}),
		profile: get(state.auth, 'user.profile', false),
		rolesNames: get(state.auth, 'user.roles', []),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		checkAuth: () =>
			dispatch({
				type: Actions.CHECK.REQUEST,
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
