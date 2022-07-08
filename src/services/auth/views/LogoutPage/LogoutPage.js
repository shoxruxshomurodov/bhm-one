import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import get from 'lodash/get';
import storage from '../../../storage';
import { connect } from 'react-redux';
import actions from '../../actions';
import { withRouter } from 'react-router';

class LogoutPage extends Component {
	constructor(props) {
		super(props);
		const { phone } = this.props.user;
		const { logout, history } = this.props;
		logout({ phone });
		history.push(`/auth/login/${btoa(phone)}`);
	}
	render() {
		const { user } = this.props;
		return <Redirect to={`/auth/login/${btoa(user.phone)}`} />;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: ({ phone }) => {
			dispatch({ type: actions.LOGOUT.REQUEST, payload: phone });
		},
	};
};

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		isAuthenticated: get(state.auth, 'isAuthenticated', false),
		isFetched: get(state.auth, 'isFetched', false),
		hasEmployee: get(state.auth, 'user.employee', false) ? true : false,
		employee: get(state.auth, 'user.employee', false),
		access: get(state.auth, 'user.access', {}),
		lang: get(state.translation, 'lang', storage.get('lang')),
		user: get(state, 'auth.user', {}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogoutPage));
