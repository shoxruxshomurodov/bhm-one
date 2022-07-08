import React, { Component } from 'react';
import ExpiredCredits from '../../../container/ExpiredCredits';
import { withRouter } from 'react-router';
class ExpiredCreditsPage extends Component {
	render() {
		const { type } = this.props.match.params;
		return <ExpiredCredits type={type} />;
	}
}

export default withRouter(ExpiredCreditsPage);
