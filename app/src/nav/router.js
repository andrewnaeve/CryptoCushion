import { StackNavigator } from 'react-navigation';
import Home from '../screens/Home/container/Home';
import Plaid from '../screens/Plaid/container/Plaid';
import Coinbase from '../screens/Coinbase/container/Coinbase';
import SignIn from '../screens/Auth/SignInContainer';
import SignUpWithAuth from '../screens/Auth/SignUpContainer';

export const MainNavigator = StackNavigator(
	{
		Home: {
			screen: Home
		}
	},
	{
		headerMode: 'none'
	}
);

export const Router = StackNavigator(
	{
		Main: { screen: MainNavigator },
		Plaid: { screen: Plaid },
		Coinbase: { screen: Coinbase },
		SignUp: { screen: SignUpWithAuth },
		SignIn: { screen: SignIn }
	},
	{
		headerMode: 'none',
		mode: 'modal',
		navigationOptions: {
			gesturesEnabled: true
		}
	}
);
