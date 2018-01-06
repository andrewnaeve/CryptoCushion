import React from 'react';
import styled from 'styled-components/native';
import { width } from '../../../utils/styleConstants';

export const SubmitButton = props => (
	<Button onPress={props.handlePress}>
		<SubmitText>Sign Up</SubmitText>
	</Button>
);

const Button = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	height: 40px;
	width: ${width * 0.8};
	background-color: transparent;
	border-color: #c8c8c8;
	border-radius: 5px;
	border-width: 1px;
	margin-bottom: 50px;
`;
const SubmitText = styled.Text`
	color: #c8c8c8;
	font-size: 20px;
	font-family: Arial;
`;
