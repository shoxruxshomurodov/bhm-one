import React, { Component } from 'react';
import View from '../../../component/View';
import { withRouter } from 'react-router';
class ViewPage extends Component {
	render() {
		const { loan_id, type } = this.props.match.params;
		return <View loan_id={loan_id} type={type} />;
	}
}

export default withRouter(ViewPage);
