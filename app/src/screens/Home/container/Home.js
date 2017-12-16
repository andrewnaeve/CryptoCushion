import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View } from 'react-native';
import { Plaid } from '../../Plaid/container/Plaid';
export class Home extends React.Component {
	render() {
		return (
			<HomeContainer>
				<Plaid />
			</HomeContainer>
		);
	}
}

const HomeContainer = styled.View`
	flex: 1;
	background-color: transparent;
`;
