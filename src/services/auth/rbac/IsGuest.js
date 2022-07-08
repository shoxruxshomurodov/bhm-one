import React, { Component } from 'react';
import Consumer from './Consumer';

class IsGuest extends Component {
	render() {
		const { children, fallback } = this.props;
		return (
			<Consumer>
				{({ isAuthenticated = false }) => {
					return !isAuthenticated ? children : fallback;
				}}
			</Consumer>
		);
	}
}

export default IsGuest;
