import React, { Component } from 'react';
import Intentional from '../../../container/Intentional';
import { withRouter } from 'react-router';
class index extends Component {
	render() {
		const { type } = this.props.match.params;
		return <Intentional type={type} />;
	}
}

export default withRouter(index);
