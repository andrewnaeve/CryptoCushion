import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import { width } from '../../../utils/styleConstants';
import { FirstName } from './components/FirstName';
import { LastName } from './components/LastName';
import { Email } from './components/Email';
import { Password } from './components/password';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		};
	}
	render() {
		return (
			<SignUpContainer>
				<FirstName handleChange={this._handleFirstNameChange} />
				<LastName handleChange={this._handleLastNameChange} />
				<Email handleChange={this._handleEmailChange} />
				<Password handleChange={this._handlePasswordChange} />
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
}

const SignUpContainer = styled.View`
	flex: 1;
	background-color: #fff;
	align-items: center;
	justify-content: center;
`;

export default connect(state => state, null)(Home);
