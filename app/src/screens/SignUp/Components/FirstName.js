import React from 'react';
import { View } from 'react-native';
import { Field } from './Field';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const FirstName = props => (
	<View>
		<Field placeholder="First Name" onChangeText={props.handleChange} />
		<PersonIcon name="person" size={25} color="#D7D7D7" />
	</View>
);

const PersonIcon = styled(Icon)`
	position: absolute;
	top: 5px;
	left: 7px;
	background-color: transparent;
`;
