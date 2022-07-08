import React, { Component } from 'react';
import EmployeesCredits from '../../../container/EmployeesList/EmployeesCredits';

import { withRouter } from 'react-router';
class EmployeesCreditsPage extends Component {
	render() {
		const { user_id } = this.props.match.params;
		return <EmployeesCredits user_id={user_id} />;
	}
}

export default withRouter(EmployeesCreditsPage);
