import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Home } from '../screens/Home/container/Home';
import { Plaid } from '../screens/Plaid/container/Plaid';

export const HomeNavigator = StackNavigator(
	{
		Home: {
			screen: Home
		}
	},
	{
		headerMode: 'modal'
	}
);
