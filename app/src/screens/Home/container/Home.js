import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/native';
import { Text, Linking } from 'react-native';
import { width } from '../../../utils/styleConstants';
import { coinbaseConnected, isBase64 } from '../../../redux/actions/coinbaseActions';

class Home extends Component {
	constructor() {
		super();
		Linking.addEventListener('url', this._handleDeepLinkAuth);
	}

	componentDidMount() {
		Linking.getInitialURL()
			.then(url => {
				if (url) {
					this._handleDeepLinkAuth(url);
				}
			})
			.catch(err => console.error('An error occurred', err));
	}

	render() {
		return (
			<HomeContainer>
				<Body />
				<Button onPress={this._launchPlaid}>
					<Text>Launch Plaid</Text>
				</Button>
				<Button onPress={this._launchCoinbase}>
					<Text>Launch Coinbase</Text>
				</Button>
			</HomeContainer>
		);
	}

	_launchPlaid = () => {
		const { navigation: { navigate } } = this.props;
		navigate('Plaid');
	};

	_launchCoinbase = () => {
		const { navigation: { navigate } } = this.props;
		navigate('Coinbase');
	};

	_handleDeepLinkAuth = url => {
		const code = url.split('+')[1];
		const codeInUrl = isBase64(code);
		if (codeInUrl) {
			coinbaseConnected(code);
		}
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

const mapDispatchToProps = dispatch => bindActionCreators({ coinbaseConnected }, dispatch);

export default connect(({ coinbase }) => ({ coinbase }), mapDispatchToProps)(Home);
