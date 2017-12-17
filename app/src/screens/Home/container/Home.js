import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View } from 'react-native';
import { Plaid } from '../../Plaid/container/Plaid';
import { height, width } from '../../../utils/styleConstants';

export class Home extends React.Component {
	state = {
		showPlaid: false
	};

	launchPlaid = () => {
		this.setState({
			showPlaid: true
		});
	};

	closePlaid = () => {
		this.setState({
			showPlaid: false
		});
	};

	render() {
		const { showPlaid } = this.state;
		return (
			<HomeContainer>
				<Body />
				<Button onPress={this.launchPlaid}>
					<Text>Launch Plaid</Text>
				</Button>
				<Plaid visible={showPlaid} closePlaid={this.closePlaid} />
			</HomeContainer>
		);
	}
}

const HomeContainer = styled.View`
	flex: 1;
	background-color: #fff;
	align-items: center;
`;

const Body = styled.View`
	flex: 1;
`;

const Button = styled.TouchableOpacity`
	width: ${width * 0.8};
	height: 50;
	margin-bottom: 30;
	border-width: 2;
	border-color: blue;
	border-radius: 10;
	align-items: center;
	justify-content: center;
`;
