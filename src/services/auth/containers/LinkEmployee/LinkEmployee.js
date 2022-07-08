import React, { Component } from 'react';
import LinkEmployeeForm from './LinkEmployeeForm';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import actions from '../../actions';
import { withRouter } from 'react-router';

class LinkEmployee extends Component {
	link = (profile_id, agree, { setSubmitting, setFieldError }) => {
		const { linkEmployee } = this.props;
		linkEmployee(profile_id, agree, setSubmitting, setFieldError, () => {
			const { checkAuth } = this.props;
			checkAuth();
		});
	};

	render() {
		return <LinkEmployeeForm link={this.link} />;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		checkAuth: () =>
			dispatch({
				type: actions.CHECK.REQUEST,
			}),
		linkEmployee: (profile_id, agree, setSubmitting, setFieldError, cbSuccess) => {
			dispatch({
				type: actions.LINK_EMPLOYEE.REQUEST,
				payload: {
					profile_id,
					agree,
					setSubmitting,
					setFieldError,
					cbSuccess,
				},
			});
		},
	};
};

export default withTranslation('app')(connect(null, mapDispatchToProps)(withRouter(LinkEmployee)));
