import React, { Component } from 'react';
import Loader from '../../../components/Loader/Loader';
import Consumer from './Consumer';

class AuthLoader extends Component {
	render() {
		const { children } = this.props;
		return (
			<Consumer>
				{({ isFetched = false }) => {
					return isFetched ? children : <Loader />;
				}}
			</Consumer>
		);
	}
}

export default AuthLoader;
