import React, { Component } from 'react';
import SixtyNinty from '../../../container/SixtyNinty';
import { withRouter } from 'react-router';
class index extends Component {
	render() {
		const { address } = this.props.match.params;
		return <SixtyNinty address={address} />;
	}
}

export default withRouter(index);
