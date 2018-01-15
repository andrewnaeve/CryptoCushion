import React, { Component } from 'react';
import { isEmail, arePasswordsEqual, isPasswordValid } from '../utils/validation';

export const withAuth = Form => {
	class Auth extends Component {
		constructor() {
			super();
			this._handleFirstNameChange = this._handleFirstNameChange.bind(this);
			this._handleLastNameChange = this._handleLastNameChange.bind(this);
			this._handleEmailChange = this._handleEmailChange.bind(this);
			this._handlePasswordChange = this._handlePasswordChange.bind(this);
			this._handleConfirmationPasswordChange = this._handleConfirmationPasswordChange.bind(this);
			this._handleErrorChange = this._handleErrorChange.bind(this);
			this._resetPassword = this._resetPassword.bind(this);
			this._resetError = this._resetError.bind(this);
			this._handleEmailBlur = this._handleEmailBlur.bind(this);
			this._handlePasswordBlur = this._handlePasswordBlur.bind(this);
			this._handleConfirmationPasswordBlur = this._handleConfirmationPasswordBlur.bind(this);
		}
		state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmationPassword: '',
			error: '',
			validEmail: false,
			validPassword: false
		};
		render() {
			return (
				<Form
					{...this.state}
					handleFirstNameChange={this._handleFirstNameChange}
					handleLastNameChange={this._handleLastNameChange}
					handleEmailChange={this._handleEmailChange}
					handlePasswordChange={this._handlePasswordChange}
					handleConfirmationPasswordChange={this._handleConfirmationPasswordChange}
					handleErrorChange={this._handleErrorChange}
					resetPassword={this._resetPassword}
					resetError={this._resetError}
					handleEmailBlur={this._handleEmailBlur}
					handlePasswordBlur={this._handlePasswordBlur}
					handleConfirmationPasswordBlur={this._handleConfirmationPasswordBlur}
				/>
			);
		}

		_handleFirstNameChange(character) {
			this.setState({
				firstName: character
			});
		}
		_handleLastNameChange(character) {
			this.setState({
				lastName: character
			});
		}
		_handleEmailChange(character) {
			this.setState({
				email: character
			});
		}
		_handlePasswordChange(character) {
			this.setState({
				password: character
			});
		}
		_handleConfirmationPasswordChange(character) {
			this.setState({
				confirmationPassword: character
			});
		}
		_handleErrorChange(error) {
			this.setState({
				error: error
			});
		}
		_resetPassword() {
			this.setState({
				password: '',
				confirmationPassword: ''
			});
		}
		_resetError() {
			this.setState({
				error: ''
			});
		}
		_handleEmailBlur() {
			const { email } = this.state;
			const isValidEmail = isEmail(email);
			if (email && !isValidEmail) {
				this.setState({
					validEmail: false,
					error: 'Please enter a valid email address'
				});
			} else if (isValidEmail) {
				this.setState({ validEmail: true });
			}
		}
		_handlePasswordBlur() {
			const { password } = this.state;
			const passwordIsValid = isPasswordValid(password);
			if (password && !passwordIsValid) {
				this.setState({
					validPassword: false,
					error: 'Password must be at least 8 characters.'
				});
			}
		}
		_handleConfirmationPasswordBlur() {
			const { password, confirmationPassword } = this.state;
			const passwordsAreEqual = arePasswordsEqual(password, confirmationPassword);
			if (password && confirmationPassword && !passwordsAreEqual) {
				this.setState({
					validPassword: false,
					error: 'Passwords do not match'
				});
			} else {
				this.setState({
					validPassword: true
				});
			}
		}
	}
	Auth.displayName = 'WithAuth()';
	return Auth;
};
