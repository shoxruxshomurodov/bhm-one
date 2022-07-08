import React, { Component } from 'react';
import Monitoring from '../../../container/Monitoring';
import { withRouter } from 'react-router';
class index extends Component {
	render() {
		const { address } = this.props.match.params;
		return <Monitoring address={address} />;
	}
}

export default withRouter(index);
