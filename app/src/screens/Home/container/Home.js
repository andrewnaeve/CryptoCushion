import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import { width } from '../../../utils/styleConstants';
import { coinbase } from '../../../../config.json';
import { AuthSession } from 'expo';
import Coinbase from '../../Coinbase/container/Coinbase';

class Home extends Component {
	linkListener = event => {
		console.log('event', event.url);
	};

	launchPlaid = () => {
		const { navigation: { navigate } } = this.props;
		navigate('Plaid');
	};

	render() {
		return (
			<HomeContainer>
				<Body />
				<Button onPress={this.launchPlaid}>
					<Text>Launch Plaid</Text>
				</Button>
				<Coinbase handlePress={this._handlePressAsync} />
			</HomeContainer>
		);
	}

	_handlePressAsync = async () => {
		const { COINBASE_CLIENT_ID } = coinbase.development;
		// let redirectUrl = encodeURIComponent(AuthSession.getRedirectUrl());
		let bummer = 'exp://localhost:19000/urn:ietf:wg:oauth:2.0:oob';
		let url = `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${COINBASE_CLIENT_ID}&redirect_uri=${bummer}&scope=wallet:user:read,wallet:accounts:read`;
		let result = await AuthSession.startAsync({
			authUrl: url
		});
		this.setState({ result });
	};
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
