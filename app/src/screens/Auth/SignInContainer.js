import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components/native';
import { height } from '../../utils/styleConstants';
import { Email } from './components/Email';
import { Password } from './components/Password';
import { ErrorMessage } from './components/ErrorMessage';
import { SubmitButton } from './components/SubmitButton';
import { signInMutation } from './authMutations';

class SignIn extends Component {
	state = {
		email: '',
		password: '',
		errorMessage: ''
	};

	render() {
		const { email, password, errorMessage } = this.state;
		return (
			<SignInContainer>
				<Email handleChange={this._handleEmailChange} value={email} />
				<Password handleChange={this._handlePasswordChange} value={password} />
				<ErrorMessage error={errorMessage} resetError={this._resetError} />
				<Separator />
				<SubmitButton handlePress={this._handleSubmit} label={'Sign In'} />
			</SignInContainer>
		);
	}

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
		const { email, password } = this.state;
		if (email && password) {
			mutate({
				variables: {
					email: email,
					password: password
				}
			}).then(response => {
				const { result } = response.data.signIn;
				this._handleResult(result);
			});
		} else {
			this.setState({
				errorMessage: 'Please fill out the form completely.'
			});
		}
	};
	_handleResult = result => {
		const { navigation: { goBack } } = this.props;
		if (result === true) {
			goBack();
			this._resetPassword();
		} else if (result === false) {
			this.setState({
				errorMessage: 'Your email or password is incorrect.'
			});
		}
	};
	_resetPassword = () => {
		this.setState({
			password: ''
		});
	};
	_resetError = () => {
		this.setState({
			errorMessage: ''
		});
	};
}

const SignInContainer = styled.View`
	flex: 1;
	padding-top: ${height * 0.2};
	align-items: center;
	justify-content: flex-start;
	background-color: #fff;
`;
const Separator = styled.View`
	flex: 1;
`;

export default graphql(signInMutation)(SignIn);
