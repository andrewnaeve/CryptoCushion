import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlaidAuthenticator from 'react-native-plaid-link';

export class Plaid extends React.Component {
	state = {
		data: {},
		showPlaid: false
	};

	onLoadStart = props => {
		console.log('onLoadStart', props);
	};

	onLoad = props => {
		console.log('onLoad', props);
	};

	onLoadEnd = props => {
		console.log('onLoadEnd', props);
		this.setState({
			showPlaid: false
		});
	};

	launchPlaid = () => {
		this.setState({
			showPlaid: true
		});
	};

	renderLogin() {
		console.log('dot', process.env.PLAID_PUBLIC_KEY);
		return (
			<PlaidAuthenticator
				onMessage={this.onMessage}
				publicKey={process.env.PLAID_PUBLIC_KEY}
				env="sandbox"
				product="auth,transactions"
				onLoad={this.onLoad}
				onLoadStart={this.onLoadStart}
				onLoadEnd={this.onLoadEnd}
			/>
		);
	}

	render() {
		const { showPlaid } = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.body} />
				<View style={styles.button} onPress={this.handlePress}>
					<Text>Launch Plaid</Text>
					{showPlaid && this.renderLogin()}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	body: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	button: {
		width: 300,
		height: 50,
		borderColor: 'blue',
		borderWidth: 2,
		borderRadius: 10,
		backgroundColor: 'transparent',
		marginBottom: 40,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
