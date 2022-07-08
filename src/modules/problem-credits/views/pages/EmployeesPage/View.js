import React, { Component } from 'react';
import View from "../../../component/View"

import { withRouter } from 'react-router';
class EmployeeCreditViewPage extends Component {
	render() {
		const { user_id ,loan_id} = this.props.match.params;
		return <View user_id={user_id} loan_id={loan_id} />;
	}
}

export default withRouter(EmployeeCreditViewPage);
