import React, { Component } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { width } from '../../../utils/styleConstants';

class Coinbase extends Component {
	render() {
		const { handlePress } = this.props;
		return (
			<Button onPress={handlePress}>
				<Text>Open Coinbase</Text>
			</Button>
		);
	}
}

const Button = styled.TouchableOpacity`
	width: ${width * 0.8};
	height: 50;
	margin-bottom: 30;
	border-width: 2;
	border-color: blue;
	border-radius: 10;
	align-items: center;
	justify-content: center;
`;

export default Coinbase;
