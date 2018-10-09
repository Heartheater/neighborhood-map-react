// eslint-disable-next-line
import React, { Component } from 'react';

export default class ErrorHandler extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error, info) {
		this.setState({ hasError: true });
		console.error(error, info);
	}

	render() {

		return this.props.children;
	}
}