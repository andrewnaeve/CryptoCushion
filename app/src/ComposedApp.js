import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import { Router } from './nav/router';

export class ComposedApp extends React.Component {
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
