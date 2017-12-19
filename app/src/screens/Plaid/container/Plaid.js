import React, { Component } from 'react';
import {
	StyleSheet,
	WebView,
	TouchableOpacity,
	Text,
	View
} from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cashInToken } from '../../../redux/actions/plaid-actions';

const PLAID_PUBLIC_KEY = '65ae65b2025490e611b70fb2854d95';
const PLAID_ENV = 'sandbox';
const PLAID_PRODUCT = 'auth,transactions';

class Plaid extends Component {
	state = {
		data: {}
	};

	componentDidUpdate(prevProps, prevState) {
		const { data: { action, eventName, metadata } } = this.state;
		const { navigation: { goBack }, cashInToken } = this.props;
		const prevEventName = prevState.data.eventName;
		const prevAction = prevState.data.action;

		if (eventName === 'EXIT' && eventName !== prevEventName) {
			goBack();
		}

		if (action !== undefined && action !== prevAction) {
			const actionType = action.split('::')[1];
			if (actionType === 'connected') {
				const { public_token } = metadata;
				cashInToken(public_token);
				goBack();
			}
		}
	}

	onMessage = e => {
		this.setState({
			data: JSON.parse(e.nativeEvent.data)
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<WebView
					source={{
						uri: `https://cdn.plaid.com/link/v2/stable/link.html?key=${PLAID_PUBLIC_KEY}&env=${PLAID_ENV}&product=${PLAID_PRODUCT}&clientName=Bit Cushion&isWebView=true&webhook=http://google.com`
					}}
					onMessage={e => this.onMessage(e)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ cashInToken }, dispatch);
};

export default connect(null, mapDispatchToProps)(Plaid);
