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
import { plaidConnected } from '../../../redux/actions/plaidActions';
import { PLAID_PUBLIC_KEY, PLAID_ENV, PLAID_PRODUCT } from './plaidConfig';

class Plaid extends Component {
	state = {
		data: {}
	};

	componentDidUpdate(prevProps, prevState) {
		const { data: { action, eventName, metadata } } = this.state;
		const { navigation: { goBack }, plaidConnected } = this.props;
		const prevEventName = prevState.data.eventName;
		const prevAction = prevState.data.action;

		if (eventName === 'EXIT' && eventName !== prevEventName) {
			goBack();
		}

		if (action !== undefined && action !== prevAction) {
			const actionType = action.split('::')[1];
			if (actionType === 'connected') {
				const responseObj = {
					public_token: metadata.public_token,
					accounts: metadata.accounts,
					institution: metadata.institution,
					link_session_id: metadata.link_session_id
				};
				plaidConnected(responseObj);
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
		console.log('plaid state', this.props.plaid);
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

const mapStateToProps = ({ plaid }) => {
	return { plaid };
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ plaidConnected }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Plaid);
