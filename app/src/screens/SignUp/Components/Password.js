import React from 'react';
import { View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { width } from '../../../utils/styleConstants';
import Icon from 'react-native-vector-icons/Ionicons';

export const Password = props => (
	<View>
		<Input
			keyboardType={'default'}
			placeholder="Password"
			secureTextEntry
			onChangeText={props.handleChange}
		/>
		<Icon style={[styles.icon, styles.lock]} name="md-lock" size={25} color="#D7D7D7" />
	</View>
);

const Input = styled.TextInput`
	height: 35px;
	width: ${width} * 0.8;
	background-color: white;
	border-radius: 5px;
	padding-left: 35px;
	border-width: 1px;
	border-color: #c8c8c8;
`;

const styles = StyleSheet.create({
	icon: {
		position: 'absolute',
		top: 5,
		left: 7,
		backgroundColor: 'transparent'
	},
	lock: {
		left: 10
	}
});
