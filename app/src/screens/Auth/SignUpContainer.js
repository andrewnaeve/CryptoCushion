import React, { Component } from 'react';
import Auth from './Auth';
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
		return (
			<Auth
				render={props => (
					<Container>
						<FirstName handleChange={props.handleFirstNameChange} value={props.firstName} />
						<LastName handleChange={props.handleLastNameChange} value={props.lastName} />
						<Email
							handleChange={props.handleEmailChange}
							handleEmailBlur={props.handleEmailBlur}
							value={props.email}
						/>
						<Password
							handleChange={props.handlePasswordChange}
							handleBlur={props.handlePasswordBlur}
							value={props.password}
						/>
						<Password
							handleChange={props.handleConfirmationPasswordChange}
							handleBlur={props.handleConfirmationPasswordBlur}
							value={props.confirmationPassword}
						/>
						<ErrorMessage error={props.error} resetError={props.resetError} />
						<Separator />
						<SubmitButton
							handlePress={() =>
								this._handleSubmit(
									props.firstName,
									props.lastName,
									props.email,
									props.password,
									props.validEmail,
									props.validPassword,
									props.handleErrorChange
								)
							}
							label={'Sign Up'}
						/>
					</Container>
				)}
			/>
		);
	}

	_handleSubmit = (firstName, lastName, email, password, validEmail, validPassword, handleErrorChange) => {
		const { mutate } = this.props;
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

export default graphql(signUpMutation)(SignUpContainer);
