import React, { Component } from 'react';
import { Button, Result } from 'antd';

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			hasError: true,
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				<Result
					status="500"
					title="500"
					subTitle="Sorry, something went wrong."
					extra={<Button type="primary">Back Home</Button>}
				/>
			);
		}
		return this.props.children;
	}
}
