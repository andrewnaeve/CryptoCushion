import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Home } from '../screens/Home/container/Home';

export const HomeNavigator = StackNavigator(
	{
		Home: {
			screen: Home
		}
	},
	{
		headerMode: 'none'
	}
);
