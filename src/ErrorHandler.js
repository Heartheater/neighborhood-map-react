// eslint-disable-next-line
import React, { Component } from 'react';

export default class ErrorHandler extends Component {
    state = {
        hasError: false
    }

	componentDidCatch(error, info) {
		this.setState({ hasError: true });
		console.error(`Error handler: ${error}`, info);
	}

	render() {

		return this.props.children;
	}
}