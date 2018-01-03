import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Field } from './Field';

export const Password = props => (
	<View>
		<Field placeholder="Password" secureTextEntry onChangeText={props.handleChange} />
		<LockIcon name="lock" size={25} color="#D7D7D7" />
	</View>
);

const LockIcon = styled(Icon)`
	position: absolute;
	top: 5px;
	left: 7px;
	background-color: transparent;
`;
