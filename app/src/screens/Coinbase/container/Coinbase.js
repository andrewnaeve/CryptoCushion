import React, { Component } from 'react';
import { WebView } from 'react-native';
import styled from 'styled-components/native';
import { coinbase } from '../../../../config.json';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { coinbaseConnected, isBase64 } from '../../../redux/actions/coinbaseActions';

class Coinbase extends Component {
	render() {
		const { COINBASE_CLIENT_ID } = coinbase.development;
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
		const code = event.title;
		const { navigation: { goBack }, coinbaseConnected } = this.props;
		const titleIsCode = isBase64(code);
		if (titleIsCode) {
			coinbaseConnected({ code: code });
			goBack();
		}
	};
}

const Container = styled.View`
	flex: 1;
	background-color: #164a7c;
`;

const mapDispatchToProps = dispatch => bindActionCreators({ coinbaseConnected }, dispatch);

export default connect(({ coinbase }) => ({ coinbase }), mapDispatchToProps)(Coinbase);
