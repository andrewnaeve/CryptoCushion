import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import { width } from '../../../utils/styleConstants';

class Home extends Component {
	launchPlaid = () => {
		const { navigation: { navigate } } = this.props;
		navigate('Plaid');
	};
	launchCoinbase = () => {
		const { navigation: { navigate } } = this.props;
		navigate('Coinbase');
	};

	render() {
		return (
			<HomeContainer>
				<Body />
				<Button onPress={this.launchPlaid}>
					<Text>Launch Plaid</Text>
				</Button>
				<Button onPress={this.launchCoinbase}>
					<Text>Launch Coinbase</Text>
				</Button>
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

export default Home;
