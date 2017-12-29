import React, { Component } from 'react';
import { Text, View, WebView, Linking } from 'react-native';
import styled from 'styled-components/native';
import { width } from '../../../utils/styleConstants';
import { coinbase } from '../../../../config.json';
class Coinbase extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		Linking.addEventListener('url', this.handleLinking);
	}

	handleLinking = event => {
		console.log('please god work', event);
	};

	onMessage = e => {
		console.log('sup', e);
	};

	render() {
		console.log('hey');
		const { COINBASE_CLIENT_ID } = coinbase.development;
		let bummer = 'urn:ietf:wg:oauth:2.0:oob';
		let url = `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${COINBASE_CLIENT_ID}&redirect_uri=${bummer}&scope=wallet:user:read,wallet:accounts:read`;
		return (
			<Container>
				<WebView
					source={{
						uri: url
					}}
					onMessage={e => this.onMessage(e)}
				/>
			</Container>
		);
	}
}

export default Coinbase;

const Container = styled.View`
	flex: 1;
`;
