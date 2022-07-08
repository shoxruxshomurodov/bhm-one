import React, { Component } from 'react';
import Consumer from './Consumer';

class WithUser extends Component {
	render() {
		const { children } = this.props;
		return (
			<Consumer>
				{({ isAuthenticated, ...consumerProps }) => {
					return children(consumerProps);
				}}
			</Consumer>
		);
	}
}

export default WithUser;
