import React, { Component } from 'react';
import LinkedLoans from '../../../container/LinkedLoans';
import { withRouter } from 'react-router';
class index extends Component {
	render() {
		const { type } = this.props.match.params;
		return <LinkedLoans type={type} />;
	}
}
export default withRouter(index);
