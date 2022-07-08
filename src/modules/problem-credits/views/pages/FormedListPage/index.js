import React, { Component } from 'react';
import FormedList from '../../../container/FormedList';
import { withRouter } from "react-router";
class index extends Component {
	render() {
		const { address } = this.props.match.params;
		return <FormedList address={address} />;
	}
}

export default withRouter(index);
