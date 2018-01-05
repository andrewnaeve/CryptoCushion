import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { height } from '../../../utils/styleConstants';
import { FirstName } from '../components/FirstName';
import { LastName } from '../components/LastName';
import { Email } from '../components/Email';
import { Password } from '../components/Password';
import { width } from '../../../utils/styleConstants';

class Home extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	};

	render() {
		return (
			<SignUpContainer>
				<FirstName handleChange={this._handleFirstNameChange} />
				<LastName handleChange={this._handleLastNameChange} />
				<Email handleChange={this._handleEmailChange} />
				<Password handleChange={this._handlePasswordChange} />
				<Separator />
				<SubmitButton>
					<SubmitText onPress={this._handleSubmit}>Sign Up</SubmitText>
				</SubmitButton>
			</SignUpContainer>
		);
	}

	_handleFirstNameChange = character => {
		this.setState({
			firstName: character
		});
	};
	_handleLastNameChange = character => {
		this.setState({
			lastName: character
		});
	};
	_handleEmailChange = character => {
		this.setState({
			email: character
		});
	};
	_handlePasswordChange = character => {
		this.setState({
			password: character
		});
	};
	_handleSubmit = () => {
		console.log('pressed submit');
	};
}

const SignUpContainer = styled.View`
	flex: 1;
	padding-top: ${height * 0.2};
	align-items: center;
	justify-content: flex-start;
	background-color: #fff;
`;
const Separator = styled.View`
	flex: 1;
`;
const SubmitButton = styled.TouchableOpacity`
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

export default connect(state => state, null)(Home);
