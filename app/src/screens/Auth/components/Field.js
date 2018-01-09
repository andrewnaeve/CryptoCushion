import React from 'react';
import styled from 'styled-components/native';
import { width } from '../../../utils/styleConstants';

export const Field = props => <Input autoCorrect={false} {...props} />;

const Input = styled.TextInput`
	height: 35px;
	width: ${width * 0.8};
	background-color: transparent;
	border-radius: 5px;
	padding-left: 40px;
	border-width: 1px;
	border-color: #c8c8c8;
	margin-bottom: 10px;
`;
