import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { coinbase } from '../../../../config.json';
import { AuthSession } from 'expo';
import styled from 'styled-components/native';
import { width } from '../../../utils/styleConstants';

class Coinbase extends Component {
	state = {
		result: null
	};

	render() {
		console.log('result:', this.state.result);
		return (
			<Container>
				<Body />
				<Button onPress={this._handlePressAsync}>
					<Text>Auth-0</Text>
				</Button>
			</Container>
		);
	}

	_handlePressAsync = async () => {
		const { COINBASE_CLIENT_ID } = coinbase.development;
		let redirectUrl = encodeURIComponent(AuthSession.getRedirectUrl());
		console.log(redirectUrl);
		let no = encodeURIComponent('https://auth.expo.io/@andrewnaeve/cryptocushion');
		// let hi = 'urn:ietf:wg:oauth:2.0:oob';
		let url = `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${COINBASE_CLIENT_ID}&redirect_uri=${no}&scope=wallet:user:read,wallet:accounts:read`;
		console.log(AuthSession.getRedirectUrl());
		let result = await AuthSession.startAsync({
			authUrl: url
		});
		this.setState({ result });
	};
}

// <WebView
// 	source={{
// 		uri: `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${COINBASE_CLIENT_ID}&scope=wallet:user:read,wallet:accounts:read`
// 	}}
// />
const Container = styled.View`
	flex: 1;
	align-items: center;
	background-color: white;
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

export default connect()(Coinbase);
