import React, { Component } from 'react';
import { withAuth } from './AuthHOC';
import { graphql } from 'react-apollo';
import styled from 'styled-components/native';
import { height } from '../../utils/styleConstants';
import { FirstName } from './components/FirstName';
import { LastName } from './components/LastName';
import { Email } from './components/Email';
import { Password } from './components/Password';
import { ErrorMessage } from './components/ErrorMessage';
import { SubmitButton } from './components/SubmitButton';
import { signUpMutation } from './authMutations';

class SignUpContainer extends Component {
	render() {
		const {
			firstName,
			handleFirstNameChange,
			lastName,
			handleLastNameChange,
			email,
			handleEmailChange,
			handleEmailBlur,
			password,
			handlePasswordChange,
			handlePasswordBlur,
			confirmationPassword,
			handleConfirmationPasswordChange,
			handleConfirmationPasswordBlur,
			error,
			resetError
		} = this.props;
		return (
			<Container>
				<FirstName handleChange={handleFirstNameChange} value={firstName} />
				<LastName handleChange={handleLastNameChange} value={lastName} />
				<Email handleChange={handleEmailChange} handleEmailBlur={handleEmailBlur} value={email} />
				<Password
					handleChange={handlePasswordChange}
					handleBlur={handlePasswordBlur}
					value={password}
				/>
				<Password
					handleChange={handleConfirmationPasswordChange}
					handleBlur={handleConfirmationPasswordBlur}
					value={confirmationPassword}
				/>
				<ErrorMessage error={error} resetError={resetError} />
				<Separator />
				<SubmitButton handlePress={this._handleSubmit} label={'Sign Up'} />
			</Container>
		);
	}

	_handleSubmit = () => {
		const {
			mutate,
			firstName,
			lastName,
			email,
			password,
			validEmail,
			validPassword,
			handleErrorChange
		} = this.props;
		if (firstName && lastName && validEmail && validPassword) {
			mutate({
				variables: {
					first_name: firstName,
					last_name: lastName,
					email: email,
					password: password
				}
			}).then(response => {
				const { email, id, result } = response.data.signUp;
				this._handleResult(email, id, result, handleErrorChange);
			});
		} else if (!validEmail || !validPassword) {
			handleErrorChange('Email or password is invalid.');
		} else if (!firstName || !lastName || !email || !password) {
			handleErrorChange('Please fill out the form completely.');
		}
	};
	_handleResult = (email, id, result, handleErrorChange) => {
		const { navigation: { goBack } } = this.props;
		switch (result) {
			case 'success':
				return goBack();
			case 'ER_DUP_ENTRY':
				return handleErrorChange('There is already an account registered to this email.');
			default:
				return;
		}
	};
}

const Container = styled.View`
	flex: 1;
	padding-top: ${height * 0.2};
	align-items: center;
	justify-content: flex-start;
	background-color: #fff;
`;
const Separator = styled.View`
	flex: 1;
`;

const SignUp = withAuth(graphql(signUpMutation)(SignUpContainer));

export default SignUp;
