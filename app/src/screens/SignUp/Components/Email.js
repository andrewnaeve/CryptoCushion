import React from 'react';
import { View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Field } from './Field';

export const Email = props => (
	<View>
		<Field keyboardType="default" placeholder="Email" onChangeText={props.handleChange} />
		<EmailIcon name="email" size={25} color="#D7D7D7" />
	</View>
);

const EmailIcon = styled(Icon)`
	position: absolute;
	top: 5px;
	left: 7px;
	background-color: transparent;
`;

// const styles = StyleSheet.create({
// 	icon: {
// 		position: 'absolute',
// 		top: 5,
// 		left: 7,
// 		backgroundColor: 'transparent'
// 	}
// });
