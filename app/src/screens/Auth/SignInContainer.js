import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components/native';
import { height } from '../../utils/styleConstants';
import { Email } from './components/Email';
import { Password } from './components/Password';
import { ErrorMessage } from './components/ErrorMessage';
import { SubmitButton } from './components/SubmitButton';
import { signInMutation } from './authMutations';
import { withAuth } from './AuthHOC';

class SignIn extends Component {
	render() {
		const {
			email,
			password,
			error,
			handleEmailChange,
			handlePasswordChange,
			resetError,
			handleEmailBlur
		} = this.props;
		return (
			<SignInContainer>
				<Email handleChange={handleEmailChange} handleEmailBlur={handleEmailBlur} value={email} />
				<Password handleChange={handlePasswordChange} value={password} />
				<ErrorMessage error={error} resetError={resetError} />
				<Separator />
				<SubmitButton handlePress={this._handleSubmit} label={'Sign In'} />
			</SignInContainer>
		);
	}

	_handleSubmit = () => {
		const { mutate, email, password } = this.props;
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
			this._updateError('Please fill out the form completely.');
		}
	};
	_handleResult = result => {
		const { navigation: { goBack }, handleErrorChange } = this.props;
		if (result === true) {
			goBack();
		} else if (result === false) {
			handleErrorChange('Your email or password is incorrect.');
		}
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

export default withAuth(graphql(signInMutation)(SignIn));
