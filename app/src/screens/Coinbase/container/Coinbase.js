import React, { Component } from 'react';
import { WebView } from 'react-native';
import styled from 'styled-components/native';
import { coinbase } from '../../../../config.json';
class Coinbase extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { COINBASE_CLIENT_ID } = coinbase.development;
		// let redirectUrl = encodeURIComponent(AuthSession.getRedirectUrl());
		let url = `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${COINBASE_CLIENT_ID}&scope=wallet:user:read,wallet:accounts:read`;
		return (
			<Container>
				<WebView
					source={{
						uri: url
					}}
					onNavigationStateChange={this._onNavigationStateChange}
				/>
			</Container>
		);
	}

	_onNavigationStateChange = event => {
		console.log('event', event.title);
	};
}

const Container = styled.View`
	flex: 1;
`;

export default Coinbase;
