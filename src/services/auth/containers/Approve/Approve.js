import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import ApproveForm from './ApproveForm';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { request } from '../../../api';
import get from 'lodash/get';
import actions from '../../actions';
import isEqual from 'lodash/isEqual';
import Loader from '../../../../components/Loader';
class Approve extends Component {
	state = {
		token: null,
		tokenAuth: null,
		isFetchedToken: false,
		isFetchedConfirm: false,
	};

	componentDidUpdate(prevProps, prevState) {
		if (
			!isEqual(prevState.isFetchedConfirm, this.state.isFetchedConfirm) &&
			!isEqual(prevState.tokenAuth, this.state.tokenAuth)
		) {
			const { loginByToken } = this.props;
			const { tokenAuth } = this.state;
			const { history } = this.props;
			if (tokenAuth.type === 1) {
				history.push('/auth/link/employee');
				loginByToken(tokenAuth);
			}
			if (tokenAuth.type === 3) {
				const { history } = this.props;
				history.push('/home');
			}
		}

		if (
			!isEqual(prevProps.isFetched, this.props.isFetched) &&
			!isEqual(prevProps.isAuthenticated, this.props.isAuthenticated)
		) {
			const { isFetched, isAuthenticated, history } = this.props;
			if (isFetched && isAuthenticated) {
				history.push('/home'); // home edi
				// ozi / ni ozi edi
			}
		}
	}

	componentDidMount() {
		const { token } = this.props;
		this.getToken(token);
	}

	getToken = (token) => {
		let _request = request.get(`auth/default/get-token-by-token/${token}`, {
			params: {
				include: 'user',
			},
		});
		_request
			.then((success) => {
				const { data } = success;
				this.setState({
					...this.state,
					token: data,
					isFetchedToken: true,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	submitForm = (values, { setSubmitting, setFieldError }) => {
		const { token } = this.state;
		let _request = request.post('auth/default/token-confirm?include=user.lastToken', {
			token: get(token, 'token'),
			...values,
		});
		_request
			.then((success) => {
				const { data } = success;
				this.setState({
					...this.state,
					isFetchedConfirm: true,
					tokenAuth: data,
				});
			})
			.catch((error) => {
				const data = error.response.data;
				data.map((item) => {
					return setFieldError('secret', item.message);
				});
				setSubmitting(false);
			});
	};

	render() {
		//const { t } = this.props;
		const { isFetchedToken, token } = this.state;
		return (
			<React.Fragment>
				{isFetchedToken ? <ApproveForm submitForm={this.submitForm} token={token} /> : <Loader />}
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loginByToken: (token) => {
			dispatch({
				type: actions.LOGIN_BY_TOKEN.REQUEST,
				payload: {
					token,
				},
			});
		},
	};
};

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		isAuthenticated: get(state.auth, 'isAuthenticated', false),
		isFetched: get(state.auth, 'isFetched', false),
	};
};
export default withTranslation('app')(connect(mapStateToProps, mapDispatchToProps)(withRouter(Approve)));
