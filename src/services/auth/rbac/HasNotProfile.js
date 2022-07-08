import React, { Component } from 'react';
import Consumer from './Consumer';

class HasNotProfile extends Component {
	render() {
		const { children, fallback } = this.props;
		return (
			<Consumer>
				{({ isAuthenticated = false, profile = false }) => {
					return isAuthenticated && !profile ? children : fallback;
				}}
			</Consumer>
		);
	}
}

export default HasNotProfile;
