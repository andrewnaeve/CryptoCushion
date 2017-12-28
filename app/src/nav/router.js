import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from '../screens/Home/container/Home';
import Plaid from '../screens/Plaid/container/Plaid';
import Coinbase from '../screens/Coinbase/container/Coinbase';

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
		Plaid: { screen: Plaid }
	},
	{
		headerMode: 'none',
		mode: 'modal',
		navigationOptions: {
			gesturesEnabled: false
		}
	}
);
