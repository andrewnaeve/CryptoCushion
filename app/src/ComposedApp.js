import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Router } from './nav/router';

export default class ComposedApp extends Component {
	render() {
		return (
			<App>
				<Router />
			</App>
		);
	}
}

const App = styled.View`
	flex: 1;
`;
