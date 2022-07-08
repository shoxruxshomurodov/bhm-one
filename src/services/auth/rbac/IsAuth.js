import React, { Component } from 'react';
import Consumer from './Consumer';

class IsAuth extends Component {
	render() {
		const { children, fallback } = this.props;
		return (
			<Consumer>
				{({ isAuthenticated = false }) => {
					return isAuthenticated ? children : fallback;
				}}
			</Consumer>
		);
	}
}

export default IsAuth;
