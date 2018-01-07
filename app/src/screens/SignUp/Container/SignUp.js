import React, { Component } from 'react';
import { Text } from 'react-native';
import { graphql } from 'react-apollo';
import styled from 'styled-components/native';
import { height } from '../../../utils/styleConstants';
import { FirstName } from '../components/FirstName';
import { LastName } from '../components/LastName';
import { Email } from '../components/Email';
import { Password } from '../components/Password';
import { ErrorMessage } from '../components/ErrorMessage';
import { SubmitButton } from '../components/SubmitButton';
import { signUpMutation } from '../graphql/SignUpMutations';

class SignUp extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		errorMessage: ''
	};

	comonentDidUpdate(nextProps, nextState) {
		const { errorMessage } = this.state;
		const nextError = nextState.errorMessage;
		if (errorMessage !== nextError) {
			this.setState({
				showError: true
			});
		}
	}

	render() {
		const { firstName, lastName, email, password, errorMessage } = this.state;
		return (
			<SignUpContainer>
				<FirstName handleChange={this._handleFirstNameChange} value={firstName} />
				<LastName handleChange={this._handleLastNameChange} value={lastName} />
				<Email handleChange={this._handleEmailChange} value={email} />
				<Password handleChange={this._handlePasswordChange} value={password} />
				<ErrorMessage error={errorMessage} />
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
		const { mutate } = this.props;
		const { firstName, lastName, email, password } = this.state;
		mutate({
			variables: {
				first_name: firstName,
				last_name: lastName,
				email: email,
				password: password
			}
		}).then(data => {
			const { email, id, result } = data.data.signUp;
			this._handleResult(email, id, result);
			console.log(result);
		});
		// this._resetForm();
	};
	_resetForm = () => {
		this.setState({
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		});
	};
	_handleResult = (email, id, result) => {
		const { navigation: { navigate: { goBack } } } = this.props;
		switch (result) {
			case 'success':
				return goBack();
			case 'ER_DUP_ENTRY':
				return this.setState({
					errorMessage: 'There is already an account registered to this email.'
				});
			default:
				return;
		}
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

export default graphql(signUpMutation)(SignUp);
