import React, { Component } from 'react';
import styled from 'styled-components/native';
import { height } from '../../../utils/styleConstants';
import { FirstName } from '../components/FirstName';
import { LastName } from '../components/LastName';
import { Email } from '../components/Email';
import { Password } from '../components/Password';
import { SubmitButton } from '../components/SubmitButton';

class SignUp extends Component {
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
				<SubmitButton handlePress={this._handleSubmit} />
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

export default SignUp;
