import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import { Router } from './nav/router';

class ComposedApp extends React.Component {
	componentWillReceiveProps(nextProps) {
		const { publicToken } = this.props;
		if (publicToken !== '' && publicToken !== nextProps.publicToken) {
			console.log(publicToken);
		}
	}

	render() {
		return (
			<App>
				<Router />
			</App>
		);
	}
}

const App = styled.View`
	flex: 1;
`;

const mapStateToProps = ({ plaid: { publicToken } }) => {
	return { publicToken };
};

export default connect(mapStateToProps)(ComposedApp);
