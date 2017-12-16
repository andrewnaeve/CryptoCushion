import React from 'react';
import {
	StyleSheet,
	WebView,
	TouchableOpacity,
	Text,
	View,
	Modal
} from 'react-native';
import PlaidAuthenticator from 'react-native-plaid-link';

const PLAID_PUBLIC_KEY = '51714a53c9375443b3156193601f62';
const PLAID_ENV = 'sandbox';
const PLAID_PRODUCT = 'auth,transactions';

export class Plaid extends React.Component {
	state = {
		data: {}
	};

	componentDidUpdate(prevProps, prevState) {
		const { data: { eventName } } = prevState;
		const { closePlaid } = this.props;
		if (eventName === 'EXIT') {
			closePlaid();
		}
	}

	onMessage = e => {
		this.setState({
			data: JSON.parse(e.nativeEvent.data)
		});
	};

	render() {
		const { visible } = this.props;
		return (
			<Modal visible={visible}>
				<View style={styles.container}>
					<WebView
						source={{
							uri: `https://cdn.plaid.com/link/v2/stable/link.html?key=${PLAID_PUBLIC_KEY}&env=${PLAID_ENV}&product=${PLAID_PRODUCT}&clientName=CatalinMiron&isWebView=true&webhook=http://google.com`
						}}
						onMessage={e => this.onMessage(e)}
					/>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
