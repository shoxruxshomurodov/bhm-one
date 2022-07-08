import React, { Component } from 'react';
import JudgeProcess from '../../../container/JudgeProcess';
import { withRouter } from "react-router";
class index extends Component {
	render() {
		const { address } = this.props.match.params;
		return <JudgeProcess address={address} />;
	}
}

export default withRouter(index);
