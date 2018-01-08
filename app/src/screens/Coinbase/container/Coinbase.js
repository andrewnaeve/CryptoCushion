import React, { Component } from 'react';
import { WebView } from 'react-native';
import styled from 'styled-components/native';
import { coinbase } from '../../../../config.json';
import { isBase64 } from '../../utils/helpers';
const { development: { COINBASE_CLIENT_ID } } = coinbase;

class Coinbase extends Component {
	render() {
		let url = `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${COINBASE_CLIENT_ID}&scope=wallet:user:read,wallet:accounts:read`;
		return (
			<WebContainer
				source={{
					uri: url
				}}
				onLoadEnd={() => console.log('loaded')}
				onNavigationStateChange={this._onNavigationStateChange}
			/>
		);
	}

	_onNavigationStateChange = event => {
		const code = event.title;
		const { navigation: { goBack } } = this.props;
		const titleIsCode = isBase64(code);
		if (titleIsCode) {
			goBack();
		}
	};
}

const WebContainer = styled.WebView`
	flex: 1;
	background: #164a7c;
`;

export default Coinbase;
