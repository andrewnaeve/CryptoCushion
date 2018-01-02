import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { width } from '../../../utils/styleConstants';

export const FirstName = props => (
	<View>
		<Input keyboardType={'default'} placeholder="First Name" onChangeText={props.handleChange} />
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
