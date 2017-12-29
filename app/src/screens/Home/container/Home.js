import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Text, Linking } from 'react-native';
import { width } from '../../../utils/styleConstants';
import { coinbase } from '../../../../config.json';
import Coinbase from '../../Coinbase/container/Coinbase';

class Home extends Component {
	componentDidMount() {
		Linking.addEventListener('url', this._handleOpenURL);
	}

	componentWillUnmount() {
		Linking.removeEventListener('url', this._handleOpenURL);
	}
	_handleOpenURL(event) {
		const url = event.url;
		const regex = /=(.+)/;
		const code = url.match(regex);
		if (code) {
			console.log('code', code[1]);
		}
	}
	render() {
		return (
			<HomeContainer>
				<Body />
				<Button onPress={this.launchPlaid}>
					<Text>Launch Plaid</Text>
				</Button>
				<Button onPress={this._launchCoinbase}>
					<Text>Launch Plaid</Text>
				</Button>
			</HomeContainer>
		);
	}

	_launchCoinbase = () => {
		const { COINBASE_CLIENT_ID } = coinbase.development;
		let callbackUrl = 'cryptocushion://auth';
		let url = `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${COINBASE_CLIENT_ID}&redirect_uri=${callbackUrl}&scope=wallet:user:read,wallet:accounts:read`;
		Linking.openURL(url).catch(err => console.error('An error occurred', err));
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
