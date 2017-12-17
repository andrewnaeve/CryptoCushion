import React, { Component } from 'react';
import {
	StyleSheet,
	WebView,
	TouchableOpacity,
	Text,
	View,
	Modal
} from 'react-native';

const PLAID_PUBLIC_KEY = '51714a53c9375443b3156193601f62';
const PLAID_ENV = 'sandbox';
const PLAID_PRODUCT = 'auth,transactions';

class Plaid extends Component {
	state = {
		data: {}
	};

	componentDidUpdate(prevProps, prevState) {
		const { data: { action, eventName } } = this.state;
		const prevEventName = prevState.data.eventName;
		const prevAction = prevState.data.action;
		const { navigation: { goBack } } = this.props;
		const { closePlaid } = this.props;

		if (eventName === 'EXIT' && eventName !== prevEventName) {
			goBack();
		}

		if (action !== undefined && action !== prevAction) {
			const actionType = action.split('::')[1];
			if (actionType === 'connected') {
				console.log(this.state.data.metadata);
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
		console.log(this.state);
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

export default Plaid;
