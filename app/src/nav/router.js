import { StackNavigator } from 'react-navigation';
import Home from '../screens/Home/container/Home';
import Plaid from '../screens/Plaid/container/Plaid';
import Coinbase from '../screens/Coinbase/container/Coinbase';
import SignUp from '../screens/Auth/SignUpContainer';
import SignIn from '../screens/Auth/SignInContainer';

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
		SignUp: { screen: SignUp },
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
